<template>
 <div class="modManage">
    <div id="mainText">
        <el-col v-if="!showChange && !lookInfo" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入要查询的标题"
                        v-model='search_data.Name'
                        clear></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="default" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onAdd()'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table v-if="!showChange && !lookInfo" border align='center'
                  :data="data_list"
                  :module="data_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="productname"
                    label="产品名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="cretime"
                    label="发布时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="添加人"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作" 
                    align="center"           
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="warning"
                            icon='view'
                            size="mini"
                            @click='showInfo(scope.row)'></el-button>
                    <el-button
                            type="primary"
                            icon="edit"
                            size="mini"
                            @click='showUpdate(scope.row)'>编辑</el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row,scope.$index)'></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="block" v-show="!showChange && !lookInfo && !searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="!showChange && !lookInfo && searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->
            <!-- 下面是添加页面 -->
     <div class="form" v-show="showChange">
        <el-form label-width="100px" style="margin:20px;width:100%;min-width:600px;"
            :model="productData"
            :rules="rules"
            ref='productData'>
            <el-form-item label="产品名称" prop='productname' style="max-width:600px;">
                <el-input v-model="productData.productname"></el-input>
            </el-form-item>
             <el-form-item label="照片" prop='productimg' style="min-width:600px;">
               <!--  <img v-if="productData.productId" v-for="item in productData.productimg" :src="imageSrc+item" class="avatar Image"> -->
              <div v-if="productData.productId" v-model="productData.productimg" style="width:150px; float:left; height:190px; margin-right:10px;" v-for="(item,index) in productData.productimg" :class="theImg+index">
                <el-upload
                  class="avatar-uploader Image"
                  :action="imgAction"
                  v-model="productData.productimg[index]"
                  :show-file-list="false"
                  :on-remove="handleRemove">
                  <img :src="imageSrc+productData.productimg[index]" class="avatar Image">
                </el-upload>
                 <el-button type="danger" size="mini" class="deBtn" @click='deleteImg(index)'>删除照片</el-button>
              </div>
              <el-upload
                  v-if="productData.productId && !flag"
                  :action="imgAction"
                  list-type="picture-card"
                  :file-list="fileList3"
                  :on-success="handleAvatarSuccess2"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemoveOld">
                  <i class="el-icon-plus"></i>
              </el-upload>
              <el-upload
                  v-else-if="productData.productId && flag"
                  :action="imgAction"
                  :file-list="fileList4"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess2"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
              </el-upload>
              <el-upload
                  v-else
                  :action="imgAction"
                  :file-list="fileList5"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess2"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
              </el-upload>
        <!--  <el-upload
                      class="avatar-uploader"
                      :action="imgAction"
                      name="WorkURL"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->

               <!--  <el-upload
                  class="avatar-uploader Image"
                  v-for="(item,index) in productData.productimg"
                  :url="item"
                  :action="imgAction"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload> -->
               <!--  <el-upload
                  v-if="productData.productId"
                  :action="imgAction"
                  list-type="picture-card"
                  :file-list="fileList2"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemoveOld">
                  <i class="el-icon-plus"></i>
                </el-upload>
                 <el-upload
                  v-else
                  :action="imgAction"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload> -->

            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
            <el-form-item label="内容" style="width:986px;" prop='productcontent'>
            <div id="Content" style="min-height:400px; max-height:750px;"></div>
            </el-form-item>  

            <el-form-item>
            <el-button v-if="productData.productId" type="primary" @click='updateNews(productData)'>确认修改</el-button>
            <el-button v-else type="primary" @click='addProduct(productData)'>提交</el-button>
              <el-button @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 修改页面结束 -->
    <div class="form" v-show="lookInfo">
    <el-card class="box-card" style="padding:0; width:94%; margin-left: 3%; background-color: #f9f9f9;">
        <el-form label-width="100px" style="margin:20px;width:100%;min-width:600px;"
            :model="productData"
            :rules="rules"
            ref='productData'>
            <el-form-item label="产品名称：" prop='productname' style="max-width:600px;">
          {{ productData.productname}}
            </el-form-item>
             <el-form-item label="照片：" prop='productimg' style="min-width:600px;">
                 <img v-if="productData.productId" v-for="item in productData.productimg" :src="imageSrc+item" class="avatar Image">
            </el-form-item>
            <el-form-item label="内容：" style="width:986px;" prop='productcontent'>
            <div id="Content2" style="min-height:400px; max-height:750px;"></div>
            </el-form-item>  

            <el-form-item>
              <el-button type="primary" @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
      </el-card>
    </div>

 </div>
</template>
<script>
	import ProductCenterJs from './ProductCenter.js';
	module.exports = ProductCenterJs;
</script>

<style scoped lang='less'>
.Image{
  float:left;
  width: 148px;
  height:148px;
  margin:0 5px;
}
.deBtn{
  float:left;
  margin-left: 45px;
  margin-top: 10px;
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
    .el-dialog__body{

    }
input[type="text"], input[type="password"]{
    width:220px !important;
}
</style>
