<template>
    <div class="speManage">
        <el-col v-if="!showAdd" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input
                            v-model='search_data.Name'
                            clear></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="default" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>

                 <el-form-item>
                    <el-button type="primary" @click='addExpert()'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table v-if="!showAdd" border style="width: 100%" align='center'
                  :data="speManager_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="Expertname"
                    label="专家名称"
                    align="center"
                    width="150"
                    :sortable="true">
            </el-table-column>

            <el-table-column
                    prop="ExpertLevel"
                    label="专家级别"
                    align="center"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="Schools"
                    label="毕业学校"
                    align="center"
                    width="130"
                    sortable="true">
            </el-table-column>
            <el-table-column
                    prop="EducationalBackground"
                    label="学历"
                    align="center"
                    width="180"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    label="详情"
                    align="center"
                    width="130"
                    :context="_self">
                <template scope="scope">
                    <!--  <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelectUser(scope.row)'></el-button> -->
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditExpert(scope.row)'>编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="删除"
                    align="center"
                    :context="_self">
                <template scope='scope'>        
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row,scope.$index)'></el-button>

                </template>
            </el-table-column>
        </el-table>
    <div class="block" v-show="!showAdd && !searchFlag" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="!showAdd && searchFlag" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->

        <el-dialog title="专家信息" v-model="dialog.show" size="tiny">
            <el-form style="margin:20px;width:60%;min-width:100%"
                     label-width="100px"
                     :model="dialog.spe_data">
                <el-form-item class='edit-form'
                              label="邮箱："
                              prop='email'>
                    {{dialog.spe_data.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="专家名称："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="专家层次："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="专家类别："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="所属气象局："：
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                 <el-form-item class='edit-form'
                              label="身份证号码："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="工作单位："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="毕业学校："
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="手机号码："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                 <el-form-item class='edit-form'
                              label="学历："
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="Email："
                              prop='email'>
                    {{dialog.spe_data.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="联系地址:"
                              prop='username'>
                    {{dialog.spe_data.username}}
                </el-form-item>

                <el-form-item label="邮编:">
                    {{dialog.spe_data.birthday}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='QQ:'>
                    {{dialog.spe_data.address}}
                </el-form-item>
            
                <el-form-item label="专家简介:">
                    {{dialog.spe_data.create_time}}
                </el-form-item>
                <el-form-item label="备注信息:">
                    {{dialog.spe_data.update_time}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">返回</el-button>
                <el-button type="primary" @click="dialog.show = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 下面为修改专家信息 -->
        <el-form v-if="showAdd"  style="margin:20px;width:100%;min-width:600px;"
            label-width="120px"
            :model="expert_list"
            :rules='expert_rules'
            ref='expert_list'>
            <div class="info1">
            <el-form-item class='edit-form'
                :disabled='true'
                label="用户名称"
                prop='Username'>
                <el-input
                        v-model="expert_list.Username" placeholder='登录名'></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="专家姓名"
                prop='Expertname'>
                <el-input
                    v-model="expert_list.Expertname"></el-input>
            </el-form-item>
            <el-form-item class='edit-form'
                label="专家级别"
                prop='ExpertLevel'>
                <el-select v-model="expert_list.ExpertLevel" @change="changeExpertLevel" placeholder='请选择'>
                   <el-option v-for="item in levelData" :value='item' :label="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class='edit-form'
                label="专家类别"
                prop='ExpertCategory'>
                <el-select v-model="expert_list.ExpertCategory" multiple placeholder="请选择">
                    <el-option v-for="item in Category" :value='item.CuitMoon_DictionaryName' :label="item.CuitMoon_DictionaryName"></el-option>
                    <!--此处因为多选框，内容从字典中父级编号为100011的字段获得-->
                </el-select>
            </el-form-item>


            <!--此处格式由上面的专家分类决定，省级专家则只需要选择省名，基层专家要精确到街道，即三级地区都要选择-->
            <el-form-item class='edit-form'
                label="专家所属气象局">
                <el-select @change="changeExpertProvince" v-model="area_data.Province" placeholder='请选择'>
                    <el-option v-for="item in province" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>

                <el-select @change="changeExpertCity" v-if="expert_list.ExpertLevel=='基层专家'"v-model="area_data.City" placeholder='请选择'>
                    <el-option v-for="list in city_list" :value='list.CuitMoon_AreaName' :label="list.CuitMoon_AreaName"></el-option>
                </el-select>

                <el-select @change="changeExpertArea" v-if="expert_list.ExpertLevel=='基层专家'"v-model="area_data.Area" placeholder='请选择'>
                   <el-option v-for="item in side_list" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class='edit-form'
                label="身份证号码"
                prop='IDNumber'>
                <el-input
                    v-model="expert_list.IDNumber"
                    ></el-input>
            </el-form-item>
            <el-form-item class='edit-form'
                label="工作单位"
                prop='WorkUnits'>
                <el-input
                    v-model="expert_list.WorkUnits"
                    ></el-input>
            </el-form-item>
            <el-form-item
                label="照片"
                prop='Photo'>
                 <el-upload
                  class="avatar-uploader"
                  :action="imgAction"
                  name="WorkURL"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="expert_list.Photo" :src="imageUrl+expert_list.Photo" class="avatar">
                 <!--  <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item
                label="专家简介"
                prop='ExpertIntroduction'>
                <el-input type='textarea'
                    v-model="expert_list.ExpertIntroduction"
                    ></el-input>
            </el-form-item>

            <el-form-item
                label="备注信息"
                prop='Remark'>
                <el-input type='textarea'
                    v-model="expert_list.Remark"
                    ></el-input>
            </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='edit-form'
                label="毕业院校"
                prop='Schools'>
                <el-input
                    v-model="expert_list.Schools" ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="学历"
                prop='EducationalBackground'>
                <el-input
                    v-model="expert_list.EducationalBackground"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="联系地址"
                prop='Address'>
                <el-input
                    v-model="expert_list.Address"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="手机号码"
                prop='TEL'>
                <el-input
                    v-model="expert_list.TEL"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="邮编"
                prop='PostCode'>
                <el-input
                    v-model="expert_list.PostCode"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="Email"
                prop='MailBox'>
                <el-input
                    v-model="expert_list.MailBox"
                    ></el-input>
            </el-form-item>

            <el-form-item class='edit-form'
                label="QQ"
                prop='QQ'>
                <el-input
                    v-model="expert_list.QQ"
                    ></el-input>
            </el-form-item>
            </div>
        <div class="info3">
            <el-form-item>
                 <el-button type="primary" @click='update_expert(expert_list)'>确 定</el-button>
                <el-button type="default"
                           @click='reBack()'>返 回</el-button>
            </el-form-item>
        </div>
    </el-form>
    </div>
</template>

<script>
	import SpeManageJs from './SpeManage.js';
	module.exports = SpeManageJs;
</script>
<style scoped lang='less'>
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
  /*  border:1px solid pink;*/
}
.info3{
    float:left;
    width:100%;
    height: 30px;
    margin:25px auto;
    margin-left: 35%;
    /*text-align: center;*/
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
  }
</style>
