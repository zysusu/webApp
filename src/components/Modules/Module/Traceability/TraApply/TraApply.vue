<template>
    <div class="list">
        <el-col v-if="!showAdd && !lookInfo" :span="24" class='actions-top'>            
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input v-model='search_data.Name' placeholder="请输入商品名称" clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch'>查询</el-button>
                    <el-button type="primary" @click='onAdd'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table v-if="!showAdd && !lookInfo" border style="width: 100%" align='center'
            :data="apply_list" 
            @selection-change='onSelectionChange'>
            <el-table-column
              prop="OriginName"
              label="溯源ID"
              align='center'>
            </el-table-column>
             <el-table-column
              prop="OriginName"
              label="产品名称"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="ProductBrand"
              label="产品品牌"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="ApplyCompany"
              label="申请商家"
              align='center'>
            </el-table-column>

            <el-table-column
              prop="ApplyTime"
              label="申请时间"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="OrignStatus"
              label="审核状态"
              align='center'>
            </el-table-column>
			<!--  <el-table-column
                :prop="fields.OriginID.info.prop"
                :label="fields.OriginID.info.label"
                :align="fields.OriginID.style.align"
				:display="fields.OriginID.style.display"
                :sortable="fields.OriginID.info.sortable">
            </el-table-column>

            <el-table-column
                :prop="fields.OriginName.info.prop"
                :label="fields.OriginName.info.label"
                :align="fields.OriginName.style.align"
                :sortable="fields.OriginName.info.sortable">
            </el-table-column>
            <el-table-column
                :prop="fields.ProductBrand.info.prop"
                :label="fields.ProductBrand.info.label"
                :align="fields.ProductBrand.style.align"
                >
            </el-table-column>
             <el-table-column
                :prop="fields.ApplyCompany.info.prop"
                :label="fields.ApplyCompany.info.label"
                :align="fields.ApplyCompany.style.align"
                >
            </el-table-column>
            <el-table-column
                :prop="fields.ApplyTime.info.prop"
                :label="fields.ApplyTime.info.label"
                :align="fields.ApplyTime.style.align"
                >
            </el-table-column>
            <el-table-column
                :prop="fields.OrignStatus.info.prop"
                :label="fields.OrignStatus.info.label"
                :align="fields.OrignStatus.style.align"
                >
            </el-table-column> -->
        
            <el-table-column
                label="操作"
                align="center"
                :context="_self">
                <template scope='scope'>
                    <el-button 
                        type="info" 
                        icon='view' 
                        size="mini"
                        @click='onShowApply(scope.row)'>查看</el-button>
                        <el-button 
                        type="warning" 
                        size="mini"
                        v-if="scope.row.OrignStatus=='未上报'"
                        @click='upApply(scope.row)'>上&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
                        <el-button 
                        type="success" 
                        size="mini"
                        v-else>已上报</el-button>
                </template>
            </el-table-column>
        </el-table>
    <div class="block" style="margin:20px 35px; float:right;">
      <el-pagination
        v-if="!showAdd && !lookInfo && !searchFlag" 
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div> <!--  分页的div -->
    <div class="block" style="margin:20px 35px; float:right;">
      <el-pagination
        v-if="!showAdd && !lookInfo && searchFlag" 
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change="handleCurrentChange2">
      </el-pagination>
    </div> <!--  分页的div -->
        <!-- <el-col :span="24" class='btm-action'>
            <el-pagination
                v-if='paginations.total>0'
                class='pagination'
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page='paginations.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
        </el-col> -->
   <!-- 添加页面 -->
    <el-row>
      <el-col v-if="showAdd" :span="24">
        <el-card :body-style="{ padding: '0px' }">
            <header class="infoTop">产品信息</header>
          <div style="padding: 14px;" class="bottom">
        <el-form
            label-width="100px" 
            :model="productInfo"
            :rules="add_rules"
            ref='productInfo'>
        <div class="info1">
            <el-form-item class='myClass' 
                :disabled='true'
                label="单位名称：" 
                prop='ApplyCompany'>
                <el-input
                        v-model="productInfo.ApplyCompany"></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="产品名称：" 
                prop='OriginName'>
                <el-input 
                    v-model="productInfo.OriginName" 
                    placeholder=''></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="生产基地：" 
                prop='OriginAddress'>
                 <el-cascader
                    :props="areaList"
                    :options="area_list"
                    change-on-select
                    v-model="productInfo.OriginAddress"
                    >
                </el-cascader>
            </el-form-item>

            <el-form-item class='myClass' 
                label="产品产值" 
                prop='ProductValue'>
                <el-input 
                    v-model="productInfo.ProductValue" 
                    placeholder=''></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="手机号码" 
                prop='Constract'>
                <el-input 
                    v-model="productInfo.Constract" 
                    placeholder=''></el-input>
            </el-form-item>
            <el-form-item
                label='产品描述'
                prop='OriginDescription'>
                <el-input type='textarea' 
                    v-model="productInfo.OriginDescription"
                    placeholder='描述信息'></el-input>
            </el-form-item>
        </div>
        <div class="info2">
             <el-form-item class='myClass' 
                :disabled='true'
                label="申请人" 
                prop='ApplyPerson'>
                <el-input
                        v-model="productInfo.ApplyPerson"></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="产品品牌" 
                prop='ProductBrand'>
                <el-input 
                    v-model="productInfo.ProductBrand" 
                    placeholder=''></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="地址" 
                prop='PersonAdress'>
                <el-input 
                    v-model="productInfo.PersonAdress" 
                    placeholder=''></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="产品产量" 
                prop='ProductNum'>
                <el-input 
                    v-model="productInfo.ProductNum" 
                    placeholder=''></el-input>
            </el-form-item>
               <el-form-item class='myClass' 
                label="申请标签数量" 
                prop='LabelNum'>
                <el-input 
                    v-model="productInfo.LabelNum" 
                    placeholder=''></el-input>
            </el-form-item>
        </div>
        </el-form>
        </div>
        </el-card>

        <el-card :body-style="{ padding: '0px' }">
            <header class="infoTop">已获得的资质，认证，荣誉，注册商标</header>
            <div style="padding: 14px;" class="bottom">
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
                      :action="imgAction"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
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
                
         <!--  <el-form
            label-width="100px" 
            :model="credenInfo"
            :rules="add_rules"
            ref='credenInfo'>
            <el-form-item
                label="上传证书"
                prop='PictureUrl'>
               <el-upload
                  class="avatar-uploader"
                  :action="imgAction"
                  name="WorkURL"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
    
            <el-form-item class='myClass' 
                :disabled='true'
                label="证书名称" 
                prop='CertificateName'>
                <el-input
                        v-model="credenInfo.CertificateName"></el-input>
            </el-form-item>

            <el-form-item class='myClass' 
                label="颁发部门" 
                prop='AwardDepart'>
                <el-input 
                    v-model="credenInfo.AwardDepart" 
                    placeholder=''></el-input>
            </el-form-item>
            <el-form-item
                label="颁发时间" 
                prop='GetTime'>
                <template scope="scope">
                 <el-date-picker
                 @change="updateTime"
                  v-model="credenInfo.GetTime"
                  type="date"
                  placeholder="选择日期">
                 </el-date-picker>
                </template>
            </el-form-item>
        
            <el-form-item style="width:100%; margin:20px auto;">
                    <el-button type="primary" @click='save_info(productInfo,credenInfo)'>提交</el-button>
                    <el-button type="default"
                               @click='reBack()'>返回</el-button>
            </el-form-item>
            </el-form> -->
        </div>
         <div style="width:100%; text-align: center; float:left; margin:10px auto; margin-bottom: 30px;">
                    <el-button type="success" @click='save_info(productInfo)'>提交</el-button>
                    <el-button type="default"
                               @click='reBack()'>返回</el-button>
        </div>
        </el-card>
      </el-col>

    <el-col v-if="lookInfo" :span="24">
        <!-- 查看产品信息 -->
        <el-card :body-style="{ padding: '0px' }">
            <header class="infoTop">产品信息</header>
          <div style="padding: 14px;" class="bottom">
        <el-form
            label-width="120px" 
            :model="showDuctInfo"
            :rules="add_rules"
            ref='showDuctInfo'>
        <div class="info1">
            <el-form-item
                class="letHeight"
                :disabled='true'
                label="单位名称：" 
                prop='ApplyCompany'>
               {{ showDuctInfo.ApplyCompany}}
            </el-form-item>
            <el-form-item 
              class="letHeight"
                label="产品名称：" 
                prop='OriginName'>
                {{ showDuctInfo.OriginName}}
            </el-form-item>

            <el-form-item 
               class="letHeight"
                label="生产基地：" 
                prop='OriginAddress'>
                {{ showDuctInfo.OriginAddress}}
            </el-form-item>

            <el-form-item 
             class="letHeight"
                label="产品产值：" 
                prop='ProductValue'>
                {{ showDuctInfo.ProductValue}}
            </el-form-item>

            <el-form-item 
             class="letHeight"
                label="手机号码：" 
                prop='Constract'>
                {{ showDuctInfo.Constract}}
            </el-form-item>
            <el-form-item 
             class="letHeight"
                label='产品描述：'
                prop='OriginDescription'>
                {{ showDuctInfo.OriginDescription}}
            </el-form-item>
        </div>
        <div class="info2">
             <el-form-item 
              class="letHeight"
                :disabled='true'
                label="申请人：" 
                prop='ApplyPerson'>
                {{ showDuctInfo.ApplyPerson}}
            </el-form-item>

            <el-form-item 
             class="letHeight"
                label="产品品牌：" 
                prop='ProductBrand'>
                {{ showDuctInfo.ProductBrand}}
            </el-form-item>

            <el-form-item
             class="letHeight"
                label="地址：" 
                prop='PersonAdress'>
                {{ showDuctInfo.PersonAdress}}
            </el-form-item>

            <el-form-item
             class="letHeight"
                label="产品产量：" 
                prop='ProductNum'>
                {{ showDuctInfo.ProductNum}}
            </el-form-item>
               <el-form-item
                class="letHeight"
                label="申请标签数量：" 
                prop='LabelNum'>
                {{ showDuctInfo.LabelNum}}
            </el-form-item>
        </div>
        </el-form>
        </div>
        </el-card>

        <el-card :body-style="{ padding: '0px' }">
        <header class="infoTop">已获得的资质、认证、荣誉、注册商标</header>
         <el-table
            :data="tableInfo"
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
        <div class="btn">
            <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
    </el-col>
     <!-- 查看产品信息 -->
  </el-row>
</div>
</template>

<script>
    import TraApplyJs from './TraApply.js';
    module.exports = TraApplyJs;
</script>
<style scoped lang='less'>
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
}
.infoTop{
    height:40px;
    background-color:#96CB33;
    color:#fff;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 18px;
    padding:10px 14px;
}
.myClass{
    margin:0px;
    margin-bottom: 16px;
    max-width: 550px;
}
.letHeight{
    margin:0px;
    padding:0px;
}
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
.btn{
  width:100%;
  background: transparent;
  border:none;
  margin:25px auto;
  text-align: center;
}
.el-card{
  margin-bottom: 10px;
}
</style>
