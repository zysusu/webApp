<template>

    <div style="margin:auto;text-align:center !important;">
        <el-steps :space="100" :active="step" finish-status="success">
          <el-step title="企业信息"></el-step>
          <el-step title="产地信息"></el-step>
          <el-step title="资质情况"></el-step>
          <el-step title="申报产品情况"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <br><br>
        <!-- <el-progress type="circle" :percentage="num" @click="addNum()"></el-progress> -->

        <el-form :rules="rules" :model="Apply" label-width="105px">
        <!-- //step 1 class="demo-form-inline"-->
        <div v-if="step==1" style="width:100%;">
            <!-- <h2>企业信息</h2> -->
            <div class='info1'>
            <el-form-item label="单位名称：" prop="unityName">
                <el-input v-model="Apply.unityName" placeholder="单位名称"></el-input>
            </el-form-item>

            <el-form-item label="通讯地址：" prop="Address">
                <el-input v-model="Apply.Address" placeholder="通讯地址"></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="repersentative" label="法人代表：">
                <el-input v-model="Apply.repersentative" placeholder="法人代表"></el-input>
            </el-form-item>

            <el-form-item prop="unitProperty" label="单位性质：">
                <el-input v-model="Apply.unitProperty" placeholder="单位性质"></el-input>
            </el-form-item>
            <!-- <br> -->
            </div>
            <div class="info2">
            <el-form-item prop="counterMan" label="业务联系人：">
                <el-input v-model="Apply.counterMan" placeholder="业务联系人"></el-input>
            </el-form-item>

            <el-form-item prop="countermanPhone" label="业务电话：">
                <el-input v-model="Apply.countermanPhone" placeholder="业务电话"></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="Phone" label="手机：">
                <el-input v-model="Apply.Phone" placeholder="手机"></el-input>
            </el-form-item>

            <el-form-item prop="countermanFax" label="商家邮箱：">
                <el-input v-model="Apply.countermanFax" placeholder="商家邮箱"></el-input>
            </el-form-item>
            <!-- <br> -->
            </div>
            <div class="info1">
            <el-form-item prop="applicationType" label="申请人类型：">
                <el-checkbox-group
                v-model="Apply.applicationType"
                >
                <el-checkbox v-for="type in types"
                :key="type.CuitMoon_DictionaryCode" :label="type.CuitMoon_DictionaryCode"
                >{{type.CuitMoon_DictionaryName}}</el-checkbox>
              </el-checkbox-group>
                <!-- <el-input v-model="Apply.applicationType" placeholder="申请人类型"></el-input> -->
            </el-form-item>
            </div>
        </div>
        <!-- //step 2 -->
        <div v-if="step==2" style="width:100%;">
            <!-- <h2>产地信息</h2> -->
            <div class="info1">
            <el-form-item style="text-align:left;" prop="ProduceBase" label="生产基地：">
                <el-cascader change-on-select :options="areas" :props="defaultProps" v-model="Apply.ProduceBase">
                  </el-cascader>
            </el-form-item>

            <el-form-item prop="location" label="地址：">
                <el-input v-model="Apply.location" placeholder="地址"></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="ProductionCharger" label="产地负责人：">
                <el-input v-model="Apply.ProductionCharger" placeholder="产地负责人"></el-input>
            </el-form-item>
            </div>
            <div class="info2">
            <el-form-item prop="Contact" label="生产基地联系电话：">
                <el-input v-model="Apply.Contact" placeholder="生产基地联系电话"></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="Phone" label="手机：">
                <el-input v-model="Apply.Phone" placeholder="手机"></el-input>
            </el-form-item>

            <el-form-item prop="Email" label="e-mail：">
                <el-input v-model="Apply.Email" placeholder="E_MAIL"></el-input>
            </el-form-item>
            </div>
        </div>
        <div v-if="step==3" style="width:100%;">
            <el-table
              :data="tableData"
              text-align="center"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="证书图片"
                min-width="20%">
                <template scope="scope">
                    <img v-if="scope.row.picUrl" :src="imageSrc+scope.row.picUrl" class="avatar">
                </template>
              </el-table-column>
              <el-table-column
                prop="Name"
                label="证书名称"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="publishUnit"
                label="颁发机构"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="awardTime"
                label="获得时间"
                min-width="20%">
              </el-table-column>

              <el-table-column
                prop=""
                min-width="20%"
                label="操作">
                <template scope="scope">
                      <el-button
                      size="small"
                      type="danger"
                      @click="deleteCertificate(scope.$index,tableData)">删除证书</el-button>
                </template>

              </el-table-column>

            </el-table>
            <br>
                <el-form label-width="100px" :model="Businessqualification" style="width:100%;">
                <div class="info1">
                  <el-form-item style="text-align:left;" label="上传证书：">
                    <el-upload
                      class="avatar-uploader"
                      :action="imageAction"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </div>
                <div class="info2">
                    <el-form-item style="text-align:left;" label="颁发时间：">
                        <el-date-picker
                        v-model="Businessqualification.awardTime"
                        type="date"
                        placeholder="颁发时间">
                      </el-date-picker>
                      <!-- <el-input v-model="Businessqualification.awardTime"></el-input> -->
                    </el-form-item>
                  <el-form-item label="证书名称：">
                    <el-input v-model="Businessqualification.Name"></el-input>
                  </el-form-item>

                  <el-form-item label="颁发部门：">
                    <el-input v-model="Businessqualification.publishUnit"></el-input>
                  </el-form-item>
                </div>
                </el-form>
                <span class="centerInfo">
                <el-button type="primary" style="width:140px;" @click="addCertificate">保存证书</el-button>
                </span>
                <br><br><br><br>
        </div>
        <div v-if="step==4" style="width:100%;margin:auto;">
            <!-- <h2>申报产品情况</h2> -->
            <div class="info1">
            <el-form-item prop="ProductName" label="产品名称：">
              <el-input v-model="Apply.ProductName" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item prop="commodityType" style="text-align:left;" label="产品类别：">
                <el-cascader change-on-select :show-all-levels="false"
                 :options="productType"
                 :props="typeProps" v-model="Apply.commodityType">
                </el-cascader>
                <!-- <el-input v-model="Apply.commodityType" placeholder="产品类别"></el-input> -->
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="ProductBrand" label="农产品品牌：">
                <el-input v-model="Apply.ProductBrand" placeholder="农产品品牌"></el-input>
            </el-form-item>

            <el-form-item prop="Remark" label="保质期：">
                <el-input v-model="Apply.Remark" placeholder="保质期"></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="ProdutOutput" label="产量：">
                <el-input @change="checkNum" v-model="Apply.ProdutOutput" placeholder="产量"></el-input>
            </el-form-item>
          
             <el-form-item prop="ControlImplement" label="气候控制措施：">
                <el-input v-model="Apply.ControlImplement" type="textarea" placeholder=""></el-input>
            </el-form-item>
             <el-form-item prop="ProductOverview" label="产地概况：">
                <el-input v-model="Apply.ProductOverview" type="textarea" placeholder=""></el-input>
            </el-form-item>
            </div>
            <div class="info2">
             <el-form-item prop="OutputValue" label="产值：">
                <el-input @change="checkNum" v-model="Apply.OutputValue" placeholder="产值"></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item prop="scale" label="规模：">
                <el-input v-model="Apply.scale" placeholder="规模"></el-input>
            </el-form-item>

            <el-form-item prop="Format" label="包装规格：">
                <el-input v-model="Apply.Format" placeholder="包装规格"></el-input>
            </el-form-item>

            <!-- <br> -->
            <el-form-item prop="Number" label="标签数量：">
                <el-input @change="checkNum" v-model="Apply.Number" placeholder="标签数量"></el-input>
            </el-form-item>

            <el-form-item prop="ApplyOriginType" style="text-align:left;" label="申请类别：">
                <el-radio-group v-model="Apply.ApplyOriginType">
                    <!-- <el-radio v-for="applyType in applyTypes"
                    :label="applyType.CuitMoon_DictionaryCode">{{applyType.CuitMoon_DictionaryName}}</el-radio> -->
                    <el-radio
                    value="1000161">气候品质认证</el-radio>
                  </el-radio-group>
                <!-- <el-input v-model="Apply.ApplyOriginType" placeholder="申请类别"></el-input> -->
            </el-form-item>

            <!-- <br> -->
            <el-form-item prop="inTotal" label="费用：">
                <el-input v-model="Apply.inTotal"  disabled></el-input>
            </el-form-item>
              <el-form-item prop="ProductDescription" label="产品特征、特性描述：">
                <el-input v-model="Apply.ProductDescription" type="textarea" placeholder="产品特征、特性描述"></el-input>
            </el-form-item>
            </div>
        </div>
        </el-form>
         <div class="centerInfo">
          <span class="wrapper">
            <el-button type="success" v-if="step>1" @click="pro()">上一步</el-button>
            <el-button type="success" v-if="step<4" @click="next()">下一步</el-button>
            <el-button type="primary" v-if="step==4 && Apply.ApplyBh" @click="updateApply()">提交</el-button>
            <el-button type="primary" v-if="step==4 &&!Apply.ApplyBh" @click="addApply()">添加</el-button>
          </span>
    </div>
    </div>
</template>
<script>
    import ApplyJS from './Apply.js';
    module.exports = ApplyJS;
</script>
<style>

.info1,.info2{
    float:left;
    margin:10px;
    width:47%;
    min-width:300px;
}
.centerInfo{
/*  float:left;*/
float:right;
  display: block;
  text-align: center;
  width:100%;
  height:40px;
  margin: 20px auto;
  margin-top: 30px;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    /*text-align: center;*/
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
   .edit-form{
        width:500px;
    }
</style>
