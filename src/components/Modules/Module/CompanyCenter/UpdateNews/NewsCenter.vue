<template>
 <div class="modManage">

    <div id="mainText">
        <el-col v-if="!showChange" :span="24" class='actions-top'>
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

        <el-table v-if="!showChange" border align='center'
                  :data="news_list"
                  :module="news_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="newstitle"
                    label="新闻标题"
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
                            @click='showUpdate(scope.row)'></el-button>
                    <el-button
                            type="primary"
                            icon="edit"
                            size="mini"
                            @click='showUpdate(scope.row)'>修改</el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row,scope.$index)'></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
<div class="block" v-show="!showChange && !searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="!showChange && searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->
            <!-- 下面是修改页面 -->
  <div class="form" v-show="showChange">
        <el-form label-width="100px" style="margin:20px;width:100%;min-width:600px;"
            :model="NewsData"
            :rules="rules"
            ref='NewsData'>
            <el-form-item label="新闻标题" prop='newstitle' style="width:600px;">
                <el-input v-model="NewsData.newstitle"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容" style="width:986px;" prop='newscontent'>
            <div id="NewContent" style="min-height:260px; max-height:600px;"></div>
            </el-form-item>         

            <el-form-item>
            <el-button v-if="NewsData.newsID" type="primary" @click='updateNews(NewsData)'>确认修改</el-button>
              <el-button v-else type="primary" @click='addNews(NewsData)'>提交</el-button>
            
                <el-button @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 修改页面结束 -->
 </div>
</template>
<script>
	import UpdateNewsJs from './UpdateNews.js';
	module.exports = UpdateNewsJs;
</script>

<style scoped lang='less'>
.friend h4{
    text-align: center;
    width:96%;
    margin:50px auto;
    height:140px;
    line-height: 140px;
    border:1px solid #e1e1e1;

}
.treeMenu{
    margin:0;
    padding:0;
    min-height:520px;
    height:100%;
    overflow: visible;
    float:left;
    border-right:3px solid #324157;
}
.tree{
    border:none;
    background-color: transparent;
    float:left;
    padding: 0;
    margin-left:-26px;
}
.badge{
    background-color: transparent;
}
.badge:hover{
    background-color: transparent;
}
/*#mainText{
        border:1px solid #f1f1f1;
        padding:5px;
        min-height: 100%;
        height:auto;
}
  */  .demo-form-inline {
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
