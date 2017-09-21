<template>
 <div class="modManage">
    <div id="mainText">
        <el-col v-if="!showChange" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                <el-input
                    v-model='search_data.Name'
                    clear></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-select v-model="search_data.Category" @change="typeChange" placeholder="请选择">
                        <el-option v-for="item in applyType" :key="item.CuitMoon_DictionaryID" :label="item.CuitMoon_DictionaryName" :value="item.CuitMoon_DictionaryName">
                        </el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item>
                    <el-button type="default" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table v-if="!showChange" border align='center'
                  :data="data_list"
                  :module="data_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="ProductName"
                    label="产品名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="unityName"
                    label="所属商家"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ApplyTime"
                    label="认证申请时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ApplyOriginType"
                    label="认证类型"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作" 
                    align="center"           
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            size="mini"
                            @click='showMore(scope.row)'>管理图片</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
<div class="block" v-show="!showChange && !searchFlag && !typeFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="!showChange && searchFlag && !typeFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->
 <div class="block" v-show="!showChange && searchFlag && typeFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange3'>
      </el-pagination>
     </div> <!--  分页的div -->

            <!-- 下面是添加页面 -->
    <div v-if="showChange" style="width:100%;">
            <el-table
              :data="tableData"
              text-align="center"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="图片"
                min-width="20%">
                <template scope="scope">
                    <img v-if="scope.row.PicSrc" :src="imageSrc+scope.row.PicSrc" class="avatar">
                </template>
              </el-table-column>
              <el-table-column
                prop="PicName"
                label="图片名称"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="Time"
                label="上传时间"
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
                      @click="deleteImg(scope.row,scope.$index)">删除图片</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br>
          <el-card :body-style="{ padding: '0px' }">
            <header class="infoTop">添加图片</header>
                <el-form label-width="100px" :model="imgInfo" style="width:100%; margin:15px;">
                <div class="info1">
                  <el-form-item label="上传图片：">
                    <el-upload
                      class="avatar-uploader"
                      :action="imgAction"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </div>
                <div class="info2">
                  <el-form-item label="图片名称：">
                    <el-input v-model="imgInfo.PicName"></el-input>
                  </el-form-item>

                  <el-form-item label="图片描述：">
                    <el-input type="textarea" v-model="imgInfo.PicContent"></el-input>
                  </el-form-item>
                </div>
                </el-form>
                <div style="width:100%; float:left; text-align: center; margin-bottom: 30px;">
                    <el-button type="primary" @click="addImage(imgInfo)">保存图片</el-button>
                    <el-button type="primary" @click="reBack()">返回</el-button>
                </div>
            </el-card>
          </div>
<!-- 添加页面结束 -->
<!--     <el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog> -->
 </div>
</template>
<script>
	import ImgManageJs from './ImgManage.js';
	module.exports = ImgManageJs;
</script>

<style scoped lang='less'>
.infoTop{
    height:35px;
    background-color: #96CB33;
    color:#fff;
    font-weight: bold;
    letter-spacing: 2px;
}
.info1,.info2{
  width: 47%;
  float: left;
}
.badge{
    background-color: transparent;
}
.badge:hover{
    background-color: transparent;
}
 .demo-form-inline {
        display: inline-block;
        float: right;
    }

    .btm-action {
        margin-top: 20px;
        text-align: center;
    }

    .actions-top {
        height: 46px;
    }

    .pagination {
        display: inline-block;
    }
 
.edit-form{
        width:500px;
    }
</style>
