<template>
 <div class="modManage">

    <div id="mainText">
    
    </div>
            <!-- 下面是修改页面 -->
  <div class="form">
        <el-form label-width="100px" style="margin:20px;width:100%;min-width:600px;"
            :model="NewsData"
            :rules="rules"
            ref='NewsData'>
            <el-form-item label="新闻标题" prop='newstitle' style="width:600px;">
                <el-input v-model="NewsData.newstitle"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容" style="width:986px;" prop='newscontent'>
            <div id="NewsContent" style="min-height:400px; max-height:750px;"></div>
            </el-form-item>         

            <el-form-item>
            <el-button type="primary" @click='updateNews(NewsData)'>确认修改</el-button>
            
                <el-button @click='Back()'>返回</el-button>
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
</style>
