<template>
    <div class="form">
        <el-form style="margin:20px;width:100%;min-width:600px;"
            label-width="100px"
            :model="business_list"
            :rules='business_rules'
            ref='business_list'>
            <div class="info1">
                <el-form-item class='edit-form'
                    :disabled='true'
                    label="用户名称"
                    prop='UserName'>
                    <el-input
                        @blur="checkName()"
                        v-model="business_list.UserName" placeholder='登录名'></el-input>
                </el-form-item>

                 <el-form-item class='edit-form'
                    :disabled='true'
                    v-if="!business_list.CampanyNo"
                    label="密码"
                    prop='LoginPassword'>
                    <el-input
                            type='password'
                            v-model="business_list.LoginPassword"></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    :disabled='true'
                    v-if="!business_list.CampanyNo"
                    label="确认密码"
                    prop='checkPassword'>
                    <el-input
                            type='password'
                            v-model="business_list.checkPassword"></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="单位名称"
                    prop='CampanyName'>
                    <el-input
                        v-model="business_list.CampanyName"></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="单位性质"
                    prop='CampanyType'>
                    <el-select v-model="business_list.CampanyType">
                        <el-option v-for="item in unit_type" :value='item.CuitMoon_DictionaryName' :label='item.CuitMoon_DictionaryName'></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="企业类型"
                    prop='CompanyType'>
                    <el-select v-model="business_list.CompanyType">
                        <el-option v-for="item in company_type" :value='item.CuitMoon_DictionaryName'></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="商家类型"
                    prop='BusinessType'>
                    <el-select v-model="business_list.BusinessType">
                        <el-option v-for="item in boss_type" :value='item.CuitMoon_DictionaryName'></el-option>
                    </el-select>
                </el-form-item>
                <!-- prop='BusinessArea' -->
                <el-form-item style="min-width:600px;" class='edit-form'
                    label="商家所在地">
                     <!-- <el-select @change="changeExpertProvince" v-model="area_data.Province" placeholder='请选择省' style="float:left;">
                        <el-option v-for="item in province" :value='item.CuitMoon_AreaCode' :label="item.CuitMoon_AreaName"></el-option>
                    </el-select>
                    <el-select @change="changeExpertCity" v-model="area_data.City" placeholder='请选择市/县' style="float:left;">
                        <el-option v-for="list in city_list" :value='list.CuitMoon_AreaCode' :label="list.CuitMoon_AreaName"></el-option>
                    </el-select>
                    <el-select @change="changeExpertArea" v-model="area_data.Area" placeholder='请选择区' style="float:left;">
                       <el-option v-for="item in side_list" :value='item.CuitMoon_AreaCode' :label="item.CuitMoon_AreaName"></el-option>
                    </el-select> -->
                    <el-cascader
                        :props="areaList"
                        :options="area_list"
                        change-on-select
                        v-model="business_list.BusinessArea"
                        >
                    </el-cascader>
                </el-form-item>
                 
                <el-form-item
                    label="注册商标"
                    prop="Logo">
                    <el-upload
                      class="avatar-uploader"
                      :action="imgAction"
                      name="WorkURL"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="info2">
                <el-form-item  class='edit-form'
                    label="法人"
                    prop='LegalPerson'>
                     <el-input
                        v-model="business_list.LegalPerson"
                        ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="法人代表码"
                    prop='LegalPresentCode'>
                    <el-input
                        v-model="business_list.LegalPresentCode"
                        ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="通讯地址"
                    prop='Address'>
                    <el-input
                        v-model="business_list.Address">
                      </el-input>
                </el-form-item>

                    <el-form-item class='edit-form'
                    label="业务联系人"
                    prop='CantactPerson'>
                    <el-input
                        v-model="business_list.CantactPerson" ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="联系电话"
                    prop='TEL'>
                    <el-input
                        v-model="business_list.TEL"
                        ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="手机"
                    prop='MobilePhone'>
                    <el-input
                        v-model="business_list.MobilePhone"
                        ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="传真"
                    prop='Fax'>
                    <el-input
                        v-model="business_list.Fax"
                        ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                    label="企业邮箱"
                    prop='MailBox'>
                    <el-input
                        v-model="business_list.MailBox"
                        ></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                    label="商家简介"
                    prop='Remark'>
                    <el-input type='textarea'
                        v-model="business_list.Remark"
                        ></el-input>
                </el-form-item>
            </div>
        </el-form>
            <!--  插入证书上传表单 -->
    <div class="info3" style="min-height: 100px; height:auto;">
    <label>已上传的证书:</label>
     <el-table
        :data="business_list.Certificate"
        border
        stripe
        align="center"
        style="min-width: 100%">
        <el-table-column
                label="证书图片"
                min-width="20%">
                <template scope="scope">
                    <img v-if="scope.row.PictureUrl" :src="imageSrc+scope.row.PictureUrl" class="avatar">
                </template>
        </el-table-column>
              <el-table-column
                prop="CertificateName"
                label="证书名称"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="AwardDepart"
                label="颁发机构"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="GetTime"
                label="获得时间"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop=""
                min-width="20%"
                label="操作">
                <template scope="scope">
                      <el-button
                      size="small"
                      type="danger"
                      @click="deleteCertificate(scope.$index)">删除证书</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>

      <el-form style="margin:20px;width:100%;min-width:600px;"
          label-width="100px"
          :model="certificate_list"
          ref='certificate_list'>
             <!--  此处插入按钮可上传证书照片 并将其URL存于certificate的PictureUrl字段中 -->
            <div class="info1">
              <el-form-item class="edit-form"
                label="上传证书："
                prop="PictureUrl">
                <el-upload
                  class="avatar-uploader"
                  :action="imgAction"
                  name="WorkURL"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>

            <div class="info2">
            <el-form-item class='edit-form'
                label="证书名称："
                prop='CertificateName'>
                <el-input
                    v-model="certificate_list.CertificateName"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="颁发部门："
                prop='AwardDepart'>
                <el-input
                    v-model="certificate_list.AwardDepart"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="颁发时间："
                prop='GetTime'>
                <el-date-picker
                  @change="updateTime"
                    v-model="certificate_list.GetTime"
                    type="date"
                    placeholder="颁发时间">
                </el-date-picker>
            </el-form-item>
        </div>
        <div class="info3" style="margin-left: 26%; margin-top: -30px;">
            <el-form-item>
              <el-button type="success" @click='save_pic(certificate_list)'>保存证书</el-button>
            </el-form-item>
        </div>
      </el-form>

         
        <div class="info3" style="margin-left: 35%;">
            <el-button v-if="business_list.CampanyNo" type="primary" @click='update_business(business_list,certificate_list)'>确认</el-button>
            <el-button v-else type="primary" @click='save_business(business_list,certificate_list)'>提交</el-button>
            <el-button type="default" @click='reBack()'>返回</el-button>
        </div>
    </div>
</template>
<script>
    import AddBusinessJS from './AddBusiness.js';
    module.exports = AddBusinessJS;
</script>
<style scoped>
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
/*    border:1px solid pink;*/
}
.info3{
    float:left;
    width:100%;
    height: 30px;
    margin:25px auto;
    /*margin-left: 35%;*/
    /*text-align: center;*/
}
    .edit-form{
        width:500px;
       /* width:50%;
        float:left;*/
    }
</style>
