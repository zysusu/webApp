<template>
<div class="form">
    <div id="mainText">
        <el-col :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="产品名称">
                    <el-input
                          v-model='search_data.Name'
                          clear></el-input>
                </el-form-item>
                  <el-select v-model="search_data.Type" @change="typeChange" placeholder="请选择">
                  <el-option v-for="item in applyType" :key="item.CuitMoon_DictionaryCode" :label="item.CuitMoon_DictionaryName" :value="item.CuitMoon_DictionaryCode">
                  </el-option>
                </el-select>
                <el-form-item>
                    <el-button type="primary" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

   <el-table
    :data="fileData"
    :module="fileData"
    border
    stripe
    style="width: 100%">
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
      prop="unityName"
      label="所属商家"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="applyTime"
      label="认证申请时间"
      align='center'>
    </el-table-column>

    <el-table-column
      prop="HeadleAgency"
      label="认证类型"
      align='center'>
    </el-table-column>

    <el-table-column
      label="二维码扫描情况"
      align='center'
      prop="DeclareStatus">
      <template scope="scope">
            <el-button
              size="small"
              type="warning"
              @click="showMore(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
<div class="block" v-show="!searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->

    <!-- 查看页面 -->
    <!--  <el-row>
      <el-col :span="24">
      <el-card v-if="showChild || lookAll" :body-style="{ padding: '0px' }">
        <header class="infoTop">产品信息</header>
      </el-card>
    
      </el-col>
    </el-row> -->
    <!-- <section v-show="showChild || lookAll" class="chart"> -->
        
    <!-- </section> -->
</div>  
</div>
</template>
<script>
    import CodeAnalyzeJs from './CodeAnalyze.js';
    module.exports = CodeAnalyzeJs;
</script>
<style scoped>
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
