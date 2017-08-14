<template>
 <div class="modManage">
    <el-col v-show="!showChange" :span="4" class="treeMenu">
        <div class="tree">
            <ul @click="showNews()">            
                <li v-for="item in newsType" @click="getNews(item.CuitMoon_DictionaryName)" style="cursor: pointer;">
                    <span><a><i class="icon-leaf"></i>{{item.CuitMoon_DictionaryName}}</a></span>
                </li>
            </ul>
        </div> <!-- tree -->
    </el-col>
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
                    prop="NewsTitle"
                    label="标题"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ReportTime"
                    label="发布时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="NewsKey"
                    label="关键字"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"  
                    width="160"           
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="primary"
                            icon='view'
                            size="mini"
                            @click='showUpdate(scope.row)'>修改</el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row,scope.$index)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    <div class="block" v-show="!showChange && !searchFlag && !typeFlag" style="margin:20px 35px; float:right;">
            <el-pagination
                layout="total,prev, pager, next"
                :page-size="pageSize"
                :total="totalNum"
                 @current-change="handleCurrentChange">
            </el-pagination>
        </div> <!--  分页的div -->
    </div>
    <div class="block" v-show="!showChange && searchFlag && !typeFlag" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="!showChange && !searchFlag && typeFlag" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange3'>
      </el-pagination>
     </div> <!--  分页的div -->
            <!-- 下面是修改页面 -->
  <div class="form" v-show="showChange">
        <el-form label-width="100px" style="margin:20px;width:100%;min-width:600px;"
            :model="news_data"
            :rules="rules"
            ref='news_data'>
            <el-form-item label="新闻标题" prop='NewsTitle' style="width:600px;">
                <el-input v-model="news_data.NewsTitle"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop='NewsKey' style="width:600px;">
                <el-input v-model="news_data.NewsKey"></el-input>
            </el-form-item>
             <el-form-item label="新闻类别" prop='NewsCategory'>
                <el-select v-model="news_data.NewsCategory" placeholder="请选择新闻分类">
                    <el-option v-for="item in newsType" :value="item.CuitMoon_DictionaryName" :label="item.CuitMoon_DictionaryName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="新闻内容" style="width:986px;" prop='Text'>
                <div id="newsContent" style="min-height:350px; max-height:650px;"></div>
            </el-form-item>         

            <el-form-item label="状态">
                <el-switch on-text="发布" off-text="禁用" v-model="news_data.status" style="width:100%"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click='updateNews(news_data)'>确认修改</el-button>
                <el-button @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 修改页面结束 -->
 </div>
</template>
<script>
	import NewsManageJs from './NewsManage.js';
	module.exports = NewsManageJs;
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
   /* border-right:3px solid #324157;*/
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
#mainText{
        width:83%;
        float: right;
        border:1px solid #f1f1f1;
        padding:5px;
        min-height: 100%;
        height:auto;
        padding-left: 10px;
        border-left:3px solid #324157;
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
