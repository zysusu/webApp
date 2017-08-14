<template>
    <div class="form">
        <el-form style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="user_list"
            :rules='users_rules'
            ref='user_list'>
            <el-form-item class='edit-form' 
                :disabled='true'
                label="用户名称" 
                prop='CuitMoon_UserName'>
                <el-input
                        v-model="user_list.CuitMoon_UserName" placeholder='登录名'></el-input>
            </el-form-item>

             <el-form-item class='edit-form'
                :disabled='true' 
                label="密码" 
                prop='CuitMoon_UserPassWord'>
                <el-input
                        type='password'
                        v-model="user_list.CuitMoon_UserPassWord"></el-input>
            </el-form-item>

            <el-form-item class='edit-form' 
                :disabled='true'
                label="确认密码" 
                prop='CuitMoon_UserPassWord'>
                <el-input
                        type='password'
                        v-model="user_list.CuitMoon_UserPassWord"></el-input>
            </el-form-item>

            <el-form-item class='edit-form' 
                label="姓名" 
                prop='CuitMoon_UserRealName'>
                <el-input 
                    v-model="user_list.CuitMoon_UserRealName"></el-input>
            </el-form-item>
        
            <el-form-item class='edit-form' 
                label="生日" 
                prop='CuitMoon_UserBirthday'>
                <el-col :span="11">
                    <el-date-picker style="width: 100%;" type="date" placeholder="选择日期" v-model="user_list.CuitMoon_UserBirthday" format='yyyy-MM-dd' @change='onChangeDate'></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item class='edit-form' 
                label="手机" 
                prop='CuitMoon_ModuleURL'>
                <el-input 
                    v-model="user_list.CuitMoon_ModuleURL" 
                    ></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="QQ" 
                prop='CuitMoon_UserQQ'>
                <el-input 
                    v-model="user_list.CuitMoon_UserQQ" 
                    ></el-input>
            </el-form-item>

                <el-form-item class='edit-form' 
                label="MSN" 
                prop='CuitMoon_UserMSN'>
                <el-input 
                    v-model="user_list.CuitMoon_UserMSN" ></el-input>
            </el-form-item>
        
            <el-form-item class='edit-form' 
                label="Eamil" 
                prop='CuitMoon_UserEmail'>
                <el-input 
                    v-model="user_list.CuitMoon_UserEmail" 
                    ></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="地址" 
                prop='CuitMoon_UserAddress'>
                <el-input 
                    v-model="user_list.CuitMoon_UserAddress" 
                    ></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="邮编" 
                prop='CuitMoon_ModuleURL'>
                <el-input 
                    v-model="user_list.CuitMoon_ModuleURL" 
                    ></el-input>
            </el-form-item>
            <el-form-item  
                label="地区" 
                prop='CuitMoon_AreaID'>
                <el-select v-model="user_list.CuitMoon_AreaID" placeholder='重庆'>
                    <el-option value='1' label="待支付"></el-option>
                    <el-option value='2' label="待配送"></el-option>
                    <el-option value='3' label="待收货"></el-option>
                    <el-option value='4' label="已完成"></el-option>
                    <el-option value='5' label="已取消"></el-option>
                    <el-option value='6' label="退单"></el-option>
                </el-select>
            </el-form-item>

             <!--  <el-form-item label="状态">
                <el-switch on-text="启用" off-text="禁用"
                    v-model="module_data.status"></el-switch>
            </el-form-item> -->

            <el-form-item class="edit-form" 
                label='备注信息'>
                <el-input type='textarea'               
                    placeholder='前端url'></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click='save_user(user_list)'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import AddWeStationJs from './AddWeStation.js';
    module.exports = AddWeStationJs;
</script>
<style scoped>
    .edit-form{
        width:500px;
    }
</style>
