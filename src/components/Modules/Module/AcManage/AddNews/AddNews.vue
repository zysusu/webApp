<template>
    <div class="form">
        <el-form label-width="100px" style="margin:20px;width:90%;min-width:600px;"
            :model="article_data"
            :rules="rules"
            ref='refArticle'>
            <el-form-item label="新闻标题" prop='NewsTitle' style="width:600px;">
                <el-input v-model="article_data.NewsTitle"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop='NewsKey' style="width:600px;">
                <el-input v-model="article_data.NewsKey"></el-input>
            </el-form-item>
             <el-form-item label="新闻类别" prop='NewsCategory'>
                <el-select v-model="article_data.NewsCategory" placeholder="请选择新闻分类">
                    <el-option v-for="item in newsType" :value="item.CuitMoon_DictionaryName" :label="item.CuitMoon_DictionaryName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="新闻内容" style="width:986px;" prop='Text'>
                <div id="article" style="min-height:350px; max-height:650px;"></div>
            </el-form-item>
           

            <el-form-item label="状态">
                <el-switch on-text="发布" off-text="禁用" v-model="article_data.status" style="width:100%"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click='onSubmit("refArticle")'>立即{{article_data.id ? '修改' : '添加'}}</el-button>
                <el-button @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import AddNewsJs from './AddNews.js';
    module.exports=AddNewsJs;
</script>
<style scoped>
    
</style>
