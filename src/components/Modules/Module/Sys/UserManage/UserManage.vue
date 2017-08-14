<template>
    <div class="form">
    <el-col :span="4" class="treeMenu">
    <el-tree
          class="leftTree"
          :data="area_list"
          :props="menuProps"
          accordion
          @node-click="handleNodeClick">
    </el-tree>
    </el-col>
    <div id="mainText">
        <el-col :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="姓名"
                              v-model='search_data.username'
                              clear></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="default" @click='onSearch'>查询</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-button class="primary" type="primary" @click='showAdd'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table v-if="!add_flag" border style="width: 100%" align='center'
                  :data="userData"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="CuitMoon_UserName"
                    label="用户名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="CuitMoon_UserRealName"
                    label="姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="CuitMoon_UserCellphone    "
                    label="手机号码"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="CuitMoon_UserQQ"
                    label="QQ号码"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    label="注册时间"
                    align="center">
            </el-table-column>
           <!--  <el-table-column
                    prop=""
                    label="状态"
                    align="center">
            </el-table-column> -->
            <el-table-column
                    prop=""
                    label="分配角色"
                    align="center"
                    :context="_self">
                <template scope="scope">
                    <el-button
                        type="info"
                        size="mini"
                        @click='addRole(scope.row)'>分配角色</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    align="center"
                    :context="_self">
                <template scope="scope">
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditUser(scope.row)'></el-button>
                     <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDeleteUser(scope.row,scope.$index)'></el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-form v-show="add_flag" style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="user_list"
            :rules='users_rules'
            ref='user_list'>
            <el-form-item class='edit-form' 
                :disabled='true'
                label="用户名" 
                prop='CuitMoon_UserName'>
                <el-input
                        v-if="!editFlag"
                        v-model="user_list.CuitMoon_UserName" 
                        @blur="checkName()"
                        placeholder='登录名'></el-input>
                <el-input
                        v-else
                        disabled="disabled"
                        v-model="user_list.CuitMoon_UserName" 
                        placeholder='登录名'></el-input>
            </el-form-item>

             <el-form-item class='edit-form'
                :disabled='true' 
                label="密码" 
                v-if="!editFlag" 
                prop='CuitMoon_UserPassWord'>
                <el-input
                        type='password'
                        v-model="user_list.CuitMoon_UserPassWord"></el-input>
            </el-form-item>
            <el-form-item class='edit-form'
                v-if="!editFlag"
                :disabled='true'
                label="确认密码"
                prop='checkPassword'>
                <el-input
                        type='password'
                        v-model="user_list.checkPassword"></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="姓名" 
                prop='CuitMoon_UserRealName'>
                <el-input 
                    v-model="user_list.CuitMoon_UserRealName"></el-input>
            </el-form-item>
             <el-form-item class='edit-form'
                :disabled='true' 
                label="性别" 
                prop='CuitMoon_UserSex'>
                <template>
                  <el-select v-model="user_list.CuitMoon_UserSex" placeholder="请选择">
                    <el-option
                        value="1"
                      label="男">
                    </el-option>
                    <el-option
                        value="0"
                      label="女">
                    </el-option>
                  </el-select>
                </template>
            </el-form-item>
            <el-form-item  
                label="地区" 
                prop='CuitMoon_AreaID'>
                <el-cascader
                    v-model="user_list.CuitMoon_AreaID" 
                    :props="areaList"
                    :options="area_list">
                </el-cascader>
                <!-- 传所在地区的code -->
               <!--  <el-cascader
                  :options="options"
                  :show-all-levels="false"></el-cascader> -->
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
                prop='CuitMoon_UserCellphone'>
                <el-input 
                    v-model="user_list.CuitMoon_UserCellphone" 
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
            <el-form-item>
                <el-button v-if="user_list.CuitMoon_UserID" type="primary" @click='updateUser(user_list)'>确定</el-button>
                <el-button v-else type="primary" @click='addUser(user_list)'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="添加角色" v-model="dialog1.show">
        <template>
            <el-checkbox-group v-model="dialog1.role">
                <el-checkbox v-for="item in roleList" :label="item.role" :value="item.role"></el-checkbox>
            </el-checkbox-group>
        </template>
            <el-button 
                style="float:right; margin:20px;"
                type="primary"
                @click="roleBack">返回</el-button>
            <el-button 
                style="float:right; margin:20px;"
                type="success"
                @click='saveRole()'>添加</el-button>
           <!--  </el-form> -->
        </el-dialog>
<!-- 
        <el-dialog title="用户信息" v-model="dialog.show" size="tiny">
            <el-form style="margin:20px;width:60%;min-width:100%"
                     label-width="100px"
                     :model="dialog.user_info">
                <el-form-item class='edit-form'
                              label="邮箱"
                              prop='email'>
                    {{dialog.user_info.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="专家名称"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="专家层次"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="专家类别"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="所属气象局"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                 <el-form-item class='edit-form'
                              label="身份证号码"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="工作单位"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="毕业学校"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="手机号码"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                 <el-form-item class='edit-form'
                              label="学历"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="Email"
                              prop='email'>
                    {{dialog.user_info.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="联系地址"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>

                <el-form-item label="邮编">
                    {{dialog.user_info.birthday}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='QQ'>
                    {{dialog.user_info.address}}
                </el-form-item>
            
                <el-form-item label="专家简介">
                    {{dialog.user_info.create_time}}
                </el-form-item>
                <el-form-item label="备注信息">
                    {{dialog.user_info.update_time}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">返回</el-button>
                <el-button type="primary" @click="dialog.show = false">确 定</el-button>
            </span>
        </el-dialog>
 -->
    </div>
    </div>
</template>

<script>
	import UserManageJs from './UserManage.js';
	module.exports = UserManageJs;
</script>
<style scoped lang='less'>
/*.parent_ul ul li{
    display: none;
}*/
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
#mainText{
        width:82%;
        float: right;
        border:1px solid #f1f1f1;
        padding:5px;
        min-height: 100%;
        height:auto;
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
</style>
