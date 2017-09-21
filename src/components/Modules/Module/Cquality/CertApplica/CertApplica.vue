<template>
    <div class="form">
         <div id="mainText">
            <el-col v-if="!showChild" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的产品名称">
                    <el-input
                        v-model='search_data.Name'
                        clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click='onSearch'>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onAdd()'>新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
   <el-table
    v-if="!showChild"
    :data="applyList"
    :module="applyList"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="unityName"
      label="产品名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ProductBrand"
      label="产品品牌"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="unityName"
      label="公司名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ApplyTime"
      label="申请时间"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="DeclareStatus"
      label="受理结果"
      align='center'>
    </el-table-column>

    <el-table-column
      label="数据操作"
      align='center'
      min-width="100">
      <template scope="scope">
            <el-button
            size="small" 
            type="primary"
            v-if="scope.row.DeclareStatus=='未上报' || scope.row.DeclareStatus =='被打回，请完善数据，重新上报'"
            @click="showUpdate(scope.row.ApplyBh)">编辑</el-button>
            <el-button
            size="small" 
            type="info"
            v-else
            @click="showMore(scope.row)">查看</el-button>
            <el-button
            v-if="scope.row.DeclareStatus=='未上报' || scope.row.DeclareStatus =='被打回，请完善数据，重新上报'"
            size="small" 
            type="warning"
            @click="upData(scope.row.ApplyBh)">上&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
            <el-button
            size="small" 
            type="warning"
            v-else>已上报</el-button>
            <!-- <el-button
            size="small" 
             @click="showMore(scope.row.ApplyBh)">已上报</el-button> -->
            <!-- <span>申核中</span> -->
            <el-button
            size="small"
            type="danger"
            @click="deleteData(scope.row,scope.$index)">删除</el-button>
           
      </template>
    </el-table-column>
  </el-table>
      <div class="block" style="margin:20px 35px; float:right;" v-if="!showChild">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="10"
        :total="totalNum"
         @current-change="handleCurrentChange">
      </el-pagination>
     </div> <!--  分页的div -->

     <!-- 查看页面 -->
     <el-row v-if="showChild">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
              <header class="infoTop">企业信息</header>
              <div style="padding:0 14px;" class="bottom">
              <el-form
                  label-width="120px" 
                  :model="applyData">
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="单位名称：" 
                      prop='unityName'>
                   {{applyData.unityName}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="法人代表：" 
                      prop='repersentative'>
                         {{applyData.repersentative}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="业务联系人：" 
                      prop='counterMan'>
                        {{applyData.counterMan}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="手机号码：" 
                      prop='Phone'>
                        {{applyData.Phone}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="申请人类型 ：" 
                      prop='applicationType'>
                         {{applyData.applicationType}}
                  </el-form-item>
              </div>
              <div class="info2">
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="通讯地址 ：" 
                      prop='location'>
                         {{applyData.location}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="单位性质：" 
                      prop='unitProperty'>
                        {{applyData.unitProperty}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="业务电话：" 
                      prop='countermanPhone'>
                       {{applyData.countermanPhone}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="商家邮箱：" 
                      prop='ProducountermanFaxctNum'>
                        {{applyData.countermanFax}}
                  </el-form-item>
              </div>
             </el-form>
            </div>
        </el-card>

        <el-card :body-style="{ padding: '0px' }">
              <header class="infoTop">产地信息</header>
              <div style="padding: 14px;" class="bottom">
              <el-form
                  label-width="120px" 
                  :model="applyData">
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="生产基地：" 
                      prop='ProduceBase'>
                   {{applyData.ProduceBase}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产地负责人：" 
                      prop='ProductionCharger'>
                         {{applyData.ProductionCharger}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="手机号码：" 
                      prop='Phone'>
                        {{applyData.Phone}}
                  </el-form-item>
              </div>
              <div class="info2">
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="地址 ：" 
                      prop='location'>
                         {{applyData.location}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产地联系电话：" 
                      prop='Contact'>
                        {{applyData.Contact}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="e-mail：" 
                      prop='Email'>
                       {{applyData.Email}}
                  </el-form-item>
              </div>
             </el-form>
            </div>
        </el-card>

        <el-card :body-style="{ padding: '0px' }">
        <header class="infoTop">已获得的资质，认证，荣誉，注册商标</header>
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
            </el-table>
      </el-card>

        <el-card :body-style="{ padding: '0px' }">
              <header class="infoTop">申报产品情况</header>
              <div style="padding:0 14px;" class="bottom">
              <el-form
                  label-width="120px" 
                  :model="applyData">
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="产品名称：" 
                      prop='ProductName'>
                   {{applyData.ProductName}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="农产品品牌：" 
                      prop='ProductBrand'>
                         {{applyData.ProductBrand}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产量：" 
                      prop='ProdutOutput'>
                        {{applyData.ProdutOutput}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="规模：" 
                      prop='scale'>
                        {{applyData.scale}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="标签数量：" 
                      prop='Number'>
                         {{applyData.Number}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="申请类别：" 
                      prop='ApplyOriginType'>
                         {{applyData.ApplyOriginType}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="气候控制措施：" 
                      prop='ControlImplement'>
                         {{applyData.ControlImplement}}
                  </el-form-item>
              </div>
              <div class="info2">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="产地概况：" 
                      prop='ProductOverview'>
                         {{applyData.ProductOverview}}
                   </el-form-item>
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="产品类别：" 
                      prop='commodityType'>
                         {{applyData.commodityType}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="保质期：" 
                      prop='ProductBrand'>
                        {{applyData.ProductBrand}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产值：" 
                      prop='OutputValue'>
                       {{applyData.OutputValue}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="包装规格：" 
                      prop='Format'>
                        {{applyData.Format}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="费用：" 
                      prop='inTotal'>
                        {{applyData.inTotal}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="产品特征、特性描述：" 
                      prop='ProductDescription'>
                        {{applyData.ProductDescription}}
                  </el-form-item>
              </div>
              <el-form-item style="width:100%; margin-top: 20px; text-align:right; padding-right: 50% !important;">
                      <el-button type="primary"
                                 @click='reBack()'>返回</el-button>
              </el-form-item>
             </el-form>
            </div>
        </el-card>
      </el-col>
    </el-row>

</div>
</div>
</template>
<script>
    import CertApplicaJs from './CertApplica.js';
    module.exports = CertApplicaJs;
</script>
<style scoped>
.picTable{
  width:100%;
  border-top: 1px solid #ccc;
  margin-top: 0px;
}
.picTable th{
  height:40px;
}
.picTable th,.picTable td{
  width:24%;
  text-align: center;
  border:1px solid #ccc;
  min-height: 40px;
}
.picTable th{
  background-color: #96CB33;
}
.infoTop{
    height:40px;
    background-color: #96CB33;
    color:#fff;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 18px;
    padding:10px 14px;
}
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
}
.edit-form{
    width:500px;
}
.block{
  float:right;
  margin-right: 20px;
}
.el-card{
  background-color: rgb(249, 249, 249);
  margin-bottom: 10px;
}
</style>
