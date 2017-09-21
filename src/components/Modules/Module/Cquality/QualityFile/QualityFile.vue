<template>
<div class="form">
    <div id="mainText">
        <el-col v-if="!showChild && !lookAll" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的产品名称">
                    <el-input
                        v-model='search_data.Name'
                        clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

   <el-table
    v-if="!showChild && !lookAll"
    :data="fileData"
    :module="fileData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="unityName"
      label="公司名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ProductName"
      label="产品名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ProductBrand"
      label="产品品牌"
      align='center'>
    </el-table-column> 
    <el-table-column
      prop="location"
      label="产地地址"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="HeadleAgency"
      label="受理机构"
      align='center'>
    </el-table-column>

    <el-table-column
      label="数据操作"
      align='center'
      prop="DeclareStatus">
      <template scope="scope">
          <el-button
            v-if="scope.row.DeclareStatus=='项目归档成功'"
            size="small">已归档</el-button>
            <el-button
            v-else
            size="small"
            type="warning"
            @click="showMore(scope.row)">建&nbsp;&nbsp;&nbsp;&nbsp;档</el-button>
            <el-button
            size="small"
            type="primary"
            @click="showAll(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!-- 查看页面 -->
     <el-row>
      <el-col :span="24">
      <el-card v-if="showChild || lookAll" :body-style="{ padding: '0px' }">
        <header class="infoTop">产品信息</header>
          <div style="padding: 14px;" class="bottom">
             <table v-if="showMore" :data="BearInfo" :module="BearInfo" class="picTable">
          <tr>
            <th>生育期</th>
            <th>时间范围</th>
            <th>气象因子</th>
            <th>最适范围</th>
            <th>实测气象条件</th>
            <th>专家评级</th>
            <th>具体分值</th>
          </tr>

        <tr v-for="(item,index) in BearInfo">
          <td>{{item.Bearinginfo2.cropGrowthPeriod}}</td>
          <td>{{item.Bearinginfo2.startCollectionTime}} ~ {{item.Bearinginfo2.endCollectionTime}}</td>

          <td>
            <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.Crop_growth_period}}</td>
            </tr>
          </td>
          <td>
            <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.OptimalRange}}</td>
            </tr>
          </td>
          <td>
            <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.RealCondition}}</td>
            </tr>
          </td>
          <td>
           <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.gradeLevel}}</td>
            </tr>
          </td>
          <td>
              <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.expertsgradecol}}</td>
            </tr>
          </td>
          </tr>
       </table>
          <!--  <el-table
            :data="BearInfo"
            :module="BearInfo"
            border
            style="width: 100%">
            <el-table-column
              prop="cropGrowthPeriod"
              label="生育期"
              align='center'>
            </el-table-column>
            <el-table-column
              prop="startCollectionTime"
              label="时间范围"
              align='center'>
            </el-table-column>
            <el-table-column
                prop="name1"
                label="气象因子"
                align='center'>
              </el-table-column> 
              <el-table-column
                prop="name2"
                label="最适范围"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="HeadleAgency"
                label="实测气象条件"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="location"
                label="专家评级"
                align='center'>
              </el-table-column>
              <el-table-column
                prop="HeadleAgency"
                label="具体分值"
                align='center'>
              </el-table-column>
          </el-table> -->
    </div>
  </el-card>

      <el-card v-if="showChild" :body-style="{ padding: '0px' }">
          <div>
                <header class="infoTop">填写品种档案报告</header>
          <div style="padding: 14px;" class="bottom">
        <el-form
            label-width="100px" 
            :model="fileInfo"
            :rules="add_rules"
            ref='fileInfo'>
        <div class="info1">
            <el-form-item class='edit-form' 
                :disabled='true'
                label="产地名称：" >
                {{threeNames.location}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="公司名称：">
                 {{threeNames.unityName}}
            </el-form-item>
             <el-form-item class='edit-form' 
                :disabled='true'
                label="产品名称：">
                 {{threeNames.ProductName}}
            </el-form-item>
        </div>
        <div class="info2">
            <el-form-item class='edit-form' 
                label="受理机构：" 
                prop='HeadleAgency'>
                <el-input 
                    v-model="fileInfo.HeadleAgency" 
                    placeholder=''></el-input>
            </el-form-item>
              <el-form-item class='edit-form' 
                label="认证机构：" 
                prop='ApproveAgency'>
                <el-input 
                    v-model="fileInfo.ApproveAgency" 
                    placeholder=''></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="认证等级：" 
                prop='Approvelevel'>
                <el-select v-model="fileInfo.Approvelevel" placeholder="请选择">
                    <el-option
                      value="特优">
                    </el-option>
                    <el-option
                      value="优">
                    </el-option>
                    <el-option
                      value="良">
                    </el-option>
                  </el-select>
            </el-form-item>
        </div>
        <div lass="info1">
            <el-form-item
                label="认证结论：" 
                style="width:50%;"
                prop='ApproveConclusion'>
                <el-input 
                    type="textarea"
                    v-model="fileInfo.ApproveConclusion" 
                    placeholder=''></el-input>
            </el-form-item>
        </div>
        <div lass="info2">
            <el-form-item
                label="备注："
                style="width:50%;" 
                prop='Remark'>
                <el-input 
                    type="textarea"
                    v-model="fileInfo.Remark" 
                    placeholder=''></el-input>
            </el-form-item>
        </div>
        <div class="info1">
         <el-form-item
                :disabled='true'
                label="专家签名照：" 
                prop='AttachmentURL'>
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
         <!--  <el-form-item class='edit-form' 
                label="认证证书：" 
                prop='certificateImage'>
              <el-upload
                class="upload-demo"
                :action="imgAction"
                :on-success="upSuccess1"
                :file-list="fileList1"
                :on-preview="handlePreview"
                :on-remove="handleRemove">
                <el-button size="small" type="primary">点击上传</el-button>
              
              </el-upload>
          </el-form-item> -->
        </div>
        <div class="info2">
            <el-form-item
                :disabled='true'
                label="认证证书：" 
                prop='AttachmentURL'>
                  <el-upload
                  class="avatar-uploader"
                  :action="imgAction"
                  name="WorkURL"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </div>
        <div class="info1 info3">
        <div class="info1">
         <el-form-item class='edit-form' 
                label="认证报告：" 
                prop='certificatAttachment'>
              <el-upload
                class="upload-demo"
                :action="imgAction"
                :on-success="upSuccess2"
                :file-list="fileList2"
                :on-preview="handlePreview"
                :on-remove="handleRemove">  <!-- file-list对应下面要显示的文件 -->
                <el-button size="small" type="primary">点击上传</el-button>
               <!--  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
          </el-form-item>
           <!--  <el-form-item class='edit-form' 
                :disabled='true'
                label="专家签名照：" 
                prop='AttachmentURL'>
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
            </el-form-item> -->
        </div>
        <div class="info2">
           <el-form-item class='edit-form' 
                :disabled='true'
                label="添加人：">
                 {{threeNames.ApplyPerson}}
            </el-form-item>
        </div>
        </div>
        <div class="info1">
          <el-form-item style="width:100%; margin-top:20px;">
                  <el-button type="primary" @click='save_info(fileInfo)'>提交</el-button>
                  <el-button type="default"
                      @click='reBack()'>返回</el-button>
          </el-form-item>
        </div>
        </el-form>
          </div>
          </div>
        </el-card>
        <!-- 查看详情的页面 -->
        <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
          <div>
                <header class="infoTop">品种档案报告</header>
          <div style="padding: 14px;" class="bottom">
        <el-form
            label-width="100px" 
            :model="fileInfomation"
            ref='fileInfomation'>
        <div class="info1">
            <el-form-item class='edit-form' 
                :disabled='true'
                label="产地名称：" >
                {{fileInfomation.location}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="公司名称：">
                 {{fileInfomation.unityName}}
            </el-form-item>
             <el-form-item class='edit-form' 
                :disabled='true'
                label="产品名称：">
                 {{fileInfomation.ProductName}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="认证结论：" 
                prop='ApproveConclusion'>
                {{fileInfomation.ApproveConclusion}}
            </el-form-item>
        </div>
        <div class="info2">
            <el-form-item class='edit-form' 
                label="受理机构：" 
                prop='HeadleAgency'>
                 {{fileInfomation.HeadleAgency}}
            </el-form-item>
              <el-form-item class='edit-form' 
                label="认证机构：" 
                prop='ApproveAgency'>
                {{fileInfomation.ApproveAgency}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="认证等级：" 
                prop='Approvelevel'>
                <el-select v-model="fileInfomation.Approvelevel" placeholder="请选择">
                    <el-option
                      value="特优">
                    </el-option>
                    <el-option
                      value="优">
                    </el-option>
                    <el-option
                      value="良">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="备注：" 
                prop='Remark'>
                {{fileInfomation.Remark}}
            </el-form-item>
        </div>
      
        <div class="info1">
         <el-form-item
            :disabled='true'
            label="专家签名照：" 
            prop='AttachmentURL'>
           <img :src="imageSrc+fileInfomation.AttachmentURL" class="avatar">
        </el-form-item>
        </div>
        <div class="info2">
         <el-form-item
                :disabled='true'
                label="认证证书：" 
                prop='certificateImage'>
              <img :src="imageSrc+fileInfomation.certificateImage" class="avatar">
            </el-form-item>
        </div>
        <div class="info1 info3">
        <div class="info1">
         <el-form-item class='edit-form' 
                label="认证报告：" 
                prop='certificateAttachment'>
                 <el-button size="small" type="primary" @click="downLoad()">点击下载</el-button>
              <!--   <a :href="imageSrc+fileInfomation.certificateAttachment" target="_blank">{{fileInfomation.certificateAttachment}}</a> -->
             <el-upload
                style="margin-top: -40px;"
                class="upload-demo"
                :action="imgAction"
                :file-list="fileList1">
            </el-upload>
          </el-form-item>
  
        </div>
        <div class="info2">
           <el-form-item class='edit-form' 
                :disabled='true'
                label="添加人：">
                 {{fileInfomation.ApplyPerson}}
            </el-form-item>
        </div>
        </div>
        <div class="info1">
          <el-form-item style="width:100%; margin-top:20px;">
                  <el-button type="success"
                      @click='reBack()'>返回</el-button>
          </el-form-item>
        </div>
        </el-form>
          </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
<div class="block" v-show="!showChild && !lookAll && !searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <!-- <div class="block" v-show="!showChild && !lookAll && searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
    </el-pagination>
</div> --> <!--  分页的div -->
</div>
</div>
</template>
<script>
  import {
    gbs
  } from 'config/settings.js';

    import QualityFileJs from './QualityFile.js';
    module.exports = QualityFileJs;
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
 /* width:14%;*/
 padding:8px 13px;
  text-align: center;
  border:1px solid #dfe6ec;
  min-height: 40px;
}
.picTable td tr td{
  border:none;
}
.picTable th{
  background-color: #96CB33;
}
.picTable tr:hover{
  background-color: #eef1f6;
}
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
}
.info3{
  width:100%;
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
.avatar-uploader, .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d2d2d2;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    .edit-form{
        width:500px;
        height:25px;
    }
</style>
