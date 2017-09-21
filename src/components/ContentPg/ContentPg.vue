<template>
<div class="backGround" :style="winSize">
    <div class="wrap" id="google_translate_element">
    <header class="topNav">
        <span style="float:left; line-height: 30px;">咨询电话： 028-87360982 </span>
        <span style="float:right;"><a style="margin-right: 20px;" @click="toLogin">登录</a>    <a>注册</a></span>
    </header>
    <el-row>
        <el-col :span='24'>
            <img class="topImg" src="../../assets/rzwb3.jpg"/>
            <nav class="pageNav">
                <ul>
                    <li><a @click="toHome">首页</a></li>
                    <li><a @click="changeType('认证动态')">认证动态</a></li>
                    <li><a @click="changeType('认证公告')">认证公告</a></li>
                    <li><a @click="changeType('认证查询')">认证查询</a></li>
                    <li><a @click="changeType('资料下载')">资料下载</a></li>
                    <li><a @click="changeType('关于我们')">关于我们</a></li>
                    <li><a @click="changeType('联系我们')">联系我们</a></li>
                </ul>
            </nav>
        <!-- 产品信息 -->
            <aside class="leftSide">
                <div class="checkDiv">
                    <img src="../../assets/wb3sy.jpg" style="width:100%; height:auto;"/>
                    <div class="btnDiv">
                        <input type="text" v-model="productCode" style="width:100%; border-radius: 0;"/>
                        <input type="button" value="提交" @click="searchProduct()"  class="myBtn"/>
                        <input type="button" value="重置" @click="resetCode" class="myBtn"/>
                    </div>
                    <article class="certInfo">
                         <span style="color: #368bcf; font-size: 20px;
                            font-weight: 600;">认证简介:</span> 天气气候对农产品品质有什么影响呢？影响的优劣等级怎么评定呢？想不想给您的鲜活农产品增添新的气候身份证明呢？交给四川省气候品质认证为您解决吧！<br>
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;◆《农产品气候品质认证报告》，给您的农产品一份专业的气候评价！<br>
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;◆《农产品气候品质认证证书》，给您的农产品独一无二的身份证明！<br>
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;◆产品气候品质认证标志——气候身份证，您的每件商品都有哦！<br>
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;◆产品气候品质认证二维码标签，亲，扫一扫，一切都在这里哦！<br>
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;现在，您只需要向当地县气象局提出申请，剩下的就交给我们吧！ <br>
                    </article>
                </div>
                <div>
                    <img src="../../assets/contact.gif"/>
                    <div style="margin-left: 15px;">电话：028-87360982 &nbsp;&nbsp;&nbsp;&nbsp;028-87345251</div>
                    <div style="margin-left: 15px;">邮箱: scnjw@sina.com</div>
                </div>
            </aside>

            <article class="mainContent" v-if='showAll'>
                <section class="newsPart">
                    <div class="newsBox">
                        <header class="newsTop">
                            <span class="newsType">认证动态</span>
                        </header>
                        <nav class="checkByKey">搜索-->>关键词：
                            <input name="Input" class="searchInput" style="border-radius: 0;" type="text">
                           <!--  <input style="float:right;" value="点击查询" type="button"> -->
                           <el-button type="primary" style="width:76px;height:28px; float:right; margin-top: 3px;" icon="search">搜索</el-button>
                        </nav>
                        <ul class="titleList" v-for="item in listData">
                            <li><a v-cloak @click="showText(item.NewsTitle,item.Text,item.NewsKey,item.ReportTime)">{{item.NewsTitle}}</a><span class="theDate">{{item.ReportTime}}</span></li>
                           <!--  <li><a>兴文猕猴桃获得宜宾首家农产品气候品质认证</a><span class="theDate">2015/8/24 13:11:01</span></li>
                            <li><a>广安龙安柚成四川首个获农产品</a><span class="theDate">2015/8/24 13:11:01</span></li>
                            <li><a>兴文猕猴桃获得宜宾首家农产品气候品质认证</a><span class="theDate">2015/8/24 13:11:01</span></li>
                            <li><a>广安龙安柚成四川首个获农产品</a><span class="theDate">2015/8/24 13:11:01</span></li> -->
                        </ul>
                    </div>
                </section>
                <br>

                <div class="block" style="width:100%; height:40px; margin:10px 0px;float:left;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[10, 15, 20, 25]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next"
                      :total="totalNum">
                    </el-pagination>   <!-- jumper直接跳转 -->
                </div>
            </article>

            <article class="mainContent" style="padding-top: 10px;" v-if='!showAll'>
                <h2 v-html="NewsTitle" style="font-size: 22px; font-family: '宋体';
text-align: center;"></h2>
                <div class="litterKey" style="width:96%; margin: 10px auto; border-top: 1px dashed black; padding-top: 10px; height:25px;"> <!-- 新闻类别:认证动态 | -->发布时间：<span v-text="ReportTime"></span></div>
                <div class="litterKey">关键字：<span v-text="NewsKey"></span></div>
                <div id="content" v-html="Text"></div>
            </article>

        <!-- 产品信息 -->
           <!--  <footer class="footer">
                <p>蜀ICP备11018099号-1</p>
                <p>版权所有：四川农村经济综合信息中心</p>
                <p>业务咨询电话：028-87360982 028-87345251</p>
                <p>E-mail：scnjw@sina.com scnjw@foxmail.com</p>
                <p>地址：四川省成都市青羊区光华村街20号（四川省气象局塔楼）</p>
            </footer>    -->     
        </el-col>
    </el-row>
    <footer>
        <p>蜀ICP备11018099号-1</p>
        <p>版权所有：四川农村经济综合信息中心</p>
        <p>业务咨询电话：028-87360982 028-87345251</p>
        <p>邮箱：scnjw@sina.com scnjw@foxmail.com</p>
        <p>地址：四川省成都市青羊区光华村街20号（四川省气象局塔楼）</p>
    </footer>
    </div>
</div>
</template>
 <script type="text/javascript" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
<script>
	import ContentPgJs from './ContentPg.js';
	module.exports = ContentPgJs;
</script>

<style scoped lang='less'>
    @import url(ContentPg.less);
    .imgClass{
        margin:10px auto;
        width:80%;
        margin-left:10%;
    }
[v-cloak] {
  display: none;
}
</style>
