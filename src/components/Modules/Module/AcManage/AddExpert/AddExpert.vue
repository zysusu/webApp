<template>
    <div class="form">
    <el-card class="box-card" style="padding: 0; background-color: #f9f9f9;">
        <el-form style="margin:10px;width:100%;min-width:600px;"
            label-width="100px"
            :model="expert_list"
            :rules='expert_rules'
            ref='expert_list'>
            <div class="info1">
            <el-form-item
                :disabled='true'
                label="用户名称："
                prop='Username'>
                <el-input 
                        class="checkname"
                        @blur="checkName()"
                        v-model="expert_list.Username"
                        placeholder='登录名'></el-input>
            </el-form-item>

             <el-form-item
                :disabled='true'
                label="密码："
                prop='LoginPassword'>
                <el-input
                        type='password'
                        v-model="expert_list.LoginPassword"></el-input>
            </el-form-item>
            <el-form-item
                :disabled='true'
                label="确认密码："
                prop='checkPassword'>
                <el-input
                        type='password'
                        v-model="expert_list.checkPassword"></el-input>
            </el-form-item>
            <el-form-item
                label="专家姓名："
                prop='Expertname'>
                <el-input
                    v-model="expert_list.Expertname"></el-input>
            </el-form-item>
            <el-form-item
                label="专家级别："
                prop='ExpertLevel'>
                <el-select v-model="expert_list.ExpertLevel" @change="changeExpertLevel" placeholder='请选择'>
                    <el-option v-for="item in levelData" :value='item' :label="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="专家类别："
                prop='ExpertCategory'>
                <el-select v-model="expert_list.ExpertCategory" multiple placeholder="请选择">
                    <el-option v-for="item in Category" :value='item.CuitMoon_DictionaryName' :label="item.CuitMoon_DictionaryName"></el-option>
                    <!--此处因为多选框，内容从字典中父级编号为100011的字段获得-->
                </el-select>
            </el-form-item>


            <!--此处格式由上面的专家分类决定，省级专家则只需要选择省名，基层专家要精确到街道，即三级地区都要选择-->
            <el-form-item v-if="expert_list.ExpertLevel=='基层专家'" 
                label="所属气象局："
                prop="BelongToMeteorology">
                 <!-- <el-select @change="changeExpertProvince" v-model="expert_list.BelongToMeteorology[0]" placeholder='请选择'>
                    <el-option v-for="item in province" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>

                <el-select @change="changeExpertCity" v-model="expert_list.BelongToMeteorology[1]" placeholder='请选择'>
                    <el-option v-for="list in city_list" :value='list.CuitMoon_AreaName' :label="list.CuitMoon_AreaName"></el-option>
                </el-select>

                <el-select @change="changeExpertArea" v-model="expert_list.BelongToMeteorology[2]" placeholder='请选择'>
                   <el-option v-for="item in side_list" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select> -->
             <el-select @change="changeExpertProvince" v-model="area_data.Province" placeholder='请选择'>
                    <el-option v-for="item in province" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>

                <el-select @change="changeExpertCity" v-model="area_data.City" placeholder='请选择'>
                    <el-option v-for="list in city_list" :value='list.CuitMoon_AreaName' :label="list.CuitMoon_AreaName"></el-option>
                </el-select>

                <el-select @change="changeExpertArea" v-model="area_data.Area" placeholder='请选择'>
                   <el-option v-for="item in side_list" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="expert_list.ExpertLevel=='省级专家'" 
                label="所属气象局："
                prop='BelongToMeteorology'>
                <el-select v-model="expert_list.BelongToMeteorology" placeholder='请选择'>
                    <el-option v-for="item in province" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item 
               :disabled='true'
                label="工作单位："
                prop='WorkUnits'>
                <el-input
                    v-model="expert_list.WorkUnits"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="照片："
                prop=''>
               <el-upload
                  class="avatar-uploader"
                  :action="imgAction"
                  name="WorkURL"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item
                label="专家简介："
                prop='ExpertIntroduction'>
                <el-input type='textarea'
                    v-model="expert_list.ExpertIntroduction"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="备注信息："
                prop='Remark'>
                <el-input type='textarea'
                    v-model="expert_list.Remark"
                    ></el-input>
            </el-form-item>
            </div>
            <div class="info2">
             <el-form-item 
                label="身份证号码："
                prop='IDNumber'>
                <el-input
                    v-model="expert_list.IDNumber"
                    ></el-input>
            </el-form-item>
                <el-form-item 
                label="毕业院校："
                prop='Schools'>
                <el-input
                    v-model="expert_list.Schools" ></el-input>
            </el-form-item>

            <el-form-item
                label="学历："
                prop='EducationalBackground'>
                <el-input
                    v-model="expert_list.EducationalBackground"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="联系地址："
                prop='Address'>
                <el-input
                    v-model="expert_list.Address"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="手机号码："
                prop='TEL'>
                <el-input
                    v-model="expert_list.TEL"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="邮编："
                prop='PostCode'>
                <el-input
                    maxlength='6'
                    v-model="expert_list.PostCode"
                    placeholder="邮编应不超过6位"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="Email："
                prop='MailBox'>
                <el-input
                    v-model="expert_list.MailBox"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="QQ："
                prop='QQ'>
                <el-input
                    v-model="expert_list.QQ"
                    ></el-input>
            </el-form-item>
            </div>
            <!--此处需要添加一个按钮点击上传照片，然后将照片存放的url存在Photo这个字段里-->
            <div class="info1 info3">
            <el-form-item>
                <el-button v-if="!editFlag" type="primary" @click='save_expert(expert_list)'>提交</el-button>
                 <el-button v-if="editFlag" type="primary" @click='update_expert(expert_list)'>确定</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
            </div>
        </el-form>
    </el-card>
    </div>
</template>
<script>
    import AddExpertJs from './AddExpert.js';
    module.exports = AddExpertJs;
</script>
<style scoped>
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
  /*  border:1px solid pink;*/
}
.info3{
    width:100%;
    margin-left: 35%;
    /*text-align: center;*/
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
    background-color: #fff;
  }
    .edit-form{
        width:500px;
    }
</style>
