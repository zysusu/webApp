<template>
    <div class="form">
         <div id="mainText">
            <el-col :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的产品名称">
                    <el-input
                              v-model='search_data.Name'
                              clear></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" @click='onSearch'>搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
   <el-table
    :data="productInfo"
    :module="productInfo"
    border
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
      label="公司名称"
      align='center'>
    </el-table-column>

    <el-table-column
      prop="ApplyTime"
      label="申请时间"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="HandleResult"
      label="进度情况"
      align='center'>
    </el-table-column>
    <el-table-column
      label="进度查询"
      align='center'>
      <template scope="scope">
            <el-button
            size="small"
            type="warning"
            @click="lookMore(scope.row)">查看</el-button>
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
   <el-dialog
            title="进度查询"
            :visible.sync="dialogVisible"
            style="height:500px;">
                <el-steps :space="100" :active="stape" finish-status="success" style="text-align: center;">
                  <el-step title="提交申请"></el-step>
                  <el-step v-if="errFlag" title="申请失败"></el-step>
                  <el-step v-if="!errFlag" title="审核中"></el-step>
                  <el-step v-if="!errFlag" title="待建立实施方案"></el-step>
                  <el-step v-if="!errFlag" title="待实施方案审核"></el-step>
                  <el-step v-if="!errFlag" title="生成品质档案"></el-step>
                  <el-step v-if="!errFlag" title="待档案"></el-step>
                  <el-step v-if="!errFlag" title="归档成功"></el-step>
                </el-steps>
   </el-dialog>
</div>
    </div>
</template>
<script>
    import ProgressJs from './Progress.js';
    module.exports = ProgressJs;
</script>
<style scoped>
    .edit-form{
        width:500px;
    }
</style>
