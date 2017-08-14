<template>
    <div class="backGround" :style="winSize">
    <div class="wrap">
        <el-row>
            <el-col :span='24'>
            <img class="topImg" src="../../assets/logo1.jpg"/>

                 <!-- 产地信息 -->
      <!--   <el-card class="dataCard" :body-style="{ padding: '0px' }">
            <header class="infoTop">标签信息</header>
            <el-form 
                style="padding:8px 15px;" 
                :model="localInfo">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    label="标签查询码：" 
                    prop='Origin_Situation'>
                 {{localInfo.Origin_Situation}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="标签状态：" 
                    prop='Meteorological_Disaster'>
                       {{localInfo.Meteorological_Disaster}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="标签规格：" 
                    prop='Diseases_InsectPests'>
                      {{localInfo.Diseases_InsectPests}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    :disabled='true'
                    label="被扫描的次数：" 
                    prop='Origin_Situation'>
                 {{localInfo.Origin_Situation}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="第一次扫描的时间：" 
                    prop='Meteorological_Disaster'>
                       {{localInfo.Meteorological_Disaster}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="地点：" 
                    prop='Diseases_InsectPests'>
                      {{localInfo.Diseases_InsectPests}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="第二次扫描的时间：" 
                    prop='Diseases_InsectPests'>
                      {{localInfo.Diseases_InsectPests}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    :disabled='true'
                    label="地点：" 
                    prop='Origin_Situation'>
                 {{localInfo.Origin_Situation}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="最后一次扫描的时间：" 
                    prop='Meteorological_Disaster'>
                       {{localInfo.Meteorological_Disaster}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="地点：" 
                    prop='Diseases_InsectPests'>
                      {{localInfo.Diseases_InsectPests}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="该批次共发放溯源标签：" 
                    prop='Diseases_InsectPests'>
                      {{localInfo.Diseases_InsectPests}}
                </el-form-item>
                 <span>请检查产品外包装二维码下方的防伪码是否与本页“标签查询码”相同，或登录四川农村信息网溯源网站http://zs.scnjw.gov.cn 进行输码查询以辨别标签真伪。</span>
         </el-form>
        </el-card> -->

        <el-card class="dataCard" :body-style="{ padding: '0px' }">
            <header class="infoTop">标签信息</header>
            <form style="padding:6px 10px; padding-bottom: 0px; margin-bottom: 0px;" >
                <span class="myRow"><label class="Label">标签查询码：</label>{{labelInfo.LabelQueryID}}</span>
                <span class="myRow"><label class="Label">标签状态：</label>{{labelInfo.LabelStatus}}</span>
                <span class="myRow"><label class="Label">标签规格：</label>{{labelInfo.format}}</span>
                <span class="myRow"><label class="Label">被扫描的次数：</label>{{labelInfo.labelNum}}</span>
                 <span class="myRow"><label class="Label">第一次扫描的时间：</label>{{firstTime.ScanTime}}</span>
                <span class="myRow"><label class="Label">地点：</label>{{firstTime.ScanPlace}}</span>
                <span class="myRow"><label class="Label">第二次扫描的时间：</label>{{secondTime.ScanTime}}</span>
                <span class="myRow"><label class="Label">地点：</label>{{secondTime.ScanPlace}}</span>
                <span class="myRow"><label class="Label">最后一次扫描的时间：</label>{{Last.ScanTime}}</span>
                <span class="myRow"><label class="Label">地点：</label>{{Last.ScanPlace}}</span>
                <span class="myRow"><label class="Label">该批次共发放溯源标签：</label>{{labelInfo.format}}枚</span>
                <p>*请检查产品外包装二维码下方的防伪码是否与本页“标签查询码”相同，或登录四川农村信息网溯源网站http://zs.scnjw.gov.cn 进行输码查询以辨别标签真伪。</p>
         </form>
        </el-card>
      <!-- 产地信息结束 -->
        <!-- 产品信息 -->
        <el-card class="dataCard" :body-style="{ padding: '0px' }">
            <header class="infoTop">产品信息</header>
            <form style="padding:6px 10px;" >
                <span class="myRow"><label class="Label">产品名称：</label>{{product.ProductName}}</span>
                <span class="myRow"><label class="Label">产品品牌：</label>{{product.ProductBrand}}</span>
                <span class="myRow"><label class="Label">所属商家：</label>{{product.unityName}}</span>
                <span class="myRow"><label class="Label">联系电话：</label>{{product.Contact}}</span>
                <span class="myRow"><label class="Label">产地：</label>{{product.ProduceBase}}</span>
                <span class="myRow"><label class="Label">通讯地址：</label>{{product.Address}}</span>
                <span class="myRow"><label class="Label">产品典型特征：</label>{{product.ProductDescription}}</span>
         </form>
        </el-card>
            <!-- 产品信息 -->
        <el-card class="dataCard" :body-style="{ padding: '0px' }">
            <header class="infoTop">品质认证</header>
            <form style="padding:6px 10px;" >
                <span class="myRow"><label class="Label">产品名称：</label>23113</span>
                <span class="myRow"><label class="Label">产地：</label>23113</span>
                <span class="myRow"><label class="Label">认证等级：</label>23113</span>
                <span class="myRow"><label class="Label">认证时间：</label>23113</span>
                <span class="myRow"><label class="Label">认证机构：</label>23113</span>
                <span class="myRow"><label class="Label">认证结论：</label>23113</span>
         </form>
        </el-card>

    <section class="chart">
        <el-row>
            <el-col v-for="(item,index) in LineDiv" :span="24">
                <div :id="LineImg+index" style="width:96%; height:310px !important;"></div>
            </el-col>
        </el-row>
    </section>
    
    </el-col>
    </el-row>
        <div class="footer">
            <p>蜀ICP备11018099号-1</p>
            <p>版权所有：四川农村经济综合信息中心</p>
            <p>业务咨询电话：028-87360982 028-87345251</p>
            <p>邮箱：scnjw@sina.com scnjw@foxmail.com</p>
            <p>地址：四川省成都市青羊区光华村街20号（四川省气象局塔楼）</p>
        </div>
</div>
</div>
</template>
 <script type="text/javascript" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
<script>
	import CodePageJs from './CodePage.js';
	module.exports = CodePageJs;
</script>

<style scoped lang='less'>
    @import url(CodePage.less);
</style>
