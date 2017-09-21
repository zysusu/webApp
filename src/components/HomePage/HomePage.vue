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
                    <li><a>首页</a></li>
                    <li><a @click="toContent('认证动态')">认证动态</a></li>
                    <li><a @click="toContent('认证公告')">认证公告</a></li>
                    <li><a @click="toContent('认证查询')">认证查询</a></li>
                    <li><a @click="toContent('资料下载')">资料下载</a></li>
                    <li><a @click="toContent('关于我们')">关于我们</a></li>
                    <li><a @click="toContent('联系我们')">联系我们</a></li>
                </ul>
            </nav>
        <!-- 产品信息 -->
            <article class="mainContent">
                <template>
                  <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item>
                      <img class="bigImg" src="../../assets/img01.jpg"/>
                    </el-carousel-item>
                    <el-carousel-item>
                      <img class="bigImg" src="../../assets/img02.jpg"/>
                    </el-carousel-item>
                    <el-carousel-item>
                      <img class="bigImg" src="../../assets/img03.jpg"/>
                    </el-carousel-item>
                     <el-carousel-item>
                      <img class="bigImg" src="../../assets/img04.jpg"/>
                    </el-carousel-item>
                     <el-carousel-item>
                      <img class="bigImg" src="../../assets/img05.jpg"/>
                    </el-carousel-item>
                  </el-carousel>
                </template>
                <section class="newsPart">
                    <div class="newsBox">
                        <header class="newsTop">
                            <span class="newsType">认证动态</span>
                            <span class="more">更多&gt;&gt;</span>
                        </header>
                        <ul class="titleList" v-for="item in dynamicList">
                            <li v-cloak @click="showText(item.NewsNumber)">{{item.NewsTitle}}</li>
                            <!-- <li>兴文猕猴桃获得宜宾首家农产品气候品质认证</li>
                            <li>广安龙安柚成四川首个获农产品</li>
                            <li>兴文猕猴桃获得宜宾首家农产品气候品质认证</li>
                            <li>广安龙安柚成四川首个获农产品</li> -->
                        </ul>
                    </div>
                    <div class="newsBox" style="float:right;">
                        <header class="newsTop">
                            <span class="newsType">认证公告</span>
                            <span class="more">更多&gt;&gt;</span>
                        </header>
                        <ul class="titleList" v-for="item in noticeList">
                            <li v-cloak @click="showText(item.NewsNumber)">{{item.NewsTitle}}</li>
                        </ul>
                    </div>
                    <div class="newsBox">
                        <header class="newsTop">
                            <span class="newsType">认证查询</span>
                            <span class="more">更多&gt;&gt;</span>
                        </header>
                        <ul class="titleList" v-for="item in queryList">
                             <li v-cloak @click="showText(item.NewsNumber)">{{item.NewsTitle}}</li>
                        </ul>
                    </div>
                    <div class="newsBox" style="float:right;">
                        <header class="newsTop">
                            <span class="newsType">资料下载</span>
                            <span class="more">更多&gt;&gt;</span>
                        </header>
                        <ul class="titleList" v-for="item in downLoadList">
                             <li v-cloak @click="showText(item.NewsNumber)">{{item.NewsTitle}}</li>
                        </ul>
                    </div>
                </section>
            </article>

            <aside class="rightSide">
                <div class="loginDiv">
                    <img class="btnImg" src="../../assets/registerbtn.png"/>
                    <img class="btnImg" @click="toLogin" src="../../assets/loginbtn.png"/>
                </div>
                <div class="checkDiv">
                    <img src="../../assets/wb3sy.jpg" style="width:100%; height:auto;"/>
                    <div class="btnDiv">
                        <input type="text" v-model="productCode" style="width:98%;
                        height: 33px;line-height: 33px; border-radius: 0px;"/>
                        <input type="button" value="提交" @click="searchProduct()" class="myBtn"/>
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
	import HomePageJs from './HomePage.js';
	module.exports = HomePageJs;
</script>

<style scoped lang='less'>
    @import url(HomePage.less);
    .imgClass{
        margin:10px auto;
        width:80%;
        margin-left:10%;
    }
[v-cloak] {
  display: none;
}
</style>
