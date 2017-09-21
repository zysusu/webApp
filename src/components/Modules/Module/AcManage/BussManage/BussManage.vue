<template>
    <div class="BussManage">
        <el-col :span="24" class='actions-top'>

            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="单位名称"
                              v-model='search_data.Name'
                              clear></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="default" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>

                 <el-form-item>
                    <el-button type="primary" @click='addBussiness()'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="BussManager_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="CampanyName"
                    label="单位名称"
                    align="center"
                    width="150"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="UserName"
                    label="用户名称"
                    align="center"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="BusinessArea"
                    label="商家所在区域"
                    align="center"
                    sortable="true">
            </el-table-column>
            <el-table-column
                    prop="CompanyType"
                    label="企业类型"
                    align="center"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    label="详情"
                    align="center"
                    :context="_self">
                <template scope="scope">
                     <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelectBusiness(scope.row)'></el-button>
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditBusiness(scope.row)'></el-button>
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
                            @click='onDeleteBusiness(scope.row,scope.$index,BussManager_list)'></el-button>

                </template>
            </el-table-column>
        </el-table>
    <div class="block" style="margin:20px 35px; float:right;">
      <el-pagination
      v-show="!searchFlag"
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
         @current-change="handleCurrentChange">
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="searchFlag" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
     </div> <!--  分页的div -->
        <el-dialog title="商家信息" style="margin-bottom: 20px;" v-model="dialog.show">
            <el-form style="margin:20px;width:100%"
                     label-width="100px"
                     :model="dialog.business_info">
                <el-form-item class='edit-form'
                              label="用户名称："
                              prop='UserName'>
                    {{dialog.business_info.UserName}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="单位名称："
                              prop='CampanyName'>
                    {{dialog.business_info.CampanyName}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="单位性质："
                              prop='CampanyType'>
                    {{dialog.business_info.CampanyType}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="企业类型："
                              prop='CompanyType'>
                    {{dialog.business_info.CompanyType}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="商家类型："
                              prop='BusinessType'>
                    {{dialog.business_info.BusinessType}}
                </el-form-item>
                 <el-form-item class='edit-form'
                              label="商家所在地：">
                    {{dialog.business_info.BusinessArea[0]+dialog.business_info.BusinessArea[1]+dialog.business_info.BusinessArea[2]}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="法人："
                              prop='LegalPerson'>
                    {{dialog.business_info.LegalPerson}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="法人代表码："
                              prop='LegalPresentCode'>
                    {{dialog.business_info.LegalPresentCode}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="通讯地址："
                              prop='Address'>
                    {{dialog.business_info.Address}}
                </el-form-item>
                 <el-form-item class='edit-form'
                              label="业务联系人："
                              prop='CantactPerson'>
                    {{dialog.business_info.CantactPerson}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="联系电话："
                              prop='TEL'>
                    {{dialog.business_info.TEL}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="手机："
                              prop='MobilePhone'>
                    {{dialog.business_info.MobilePhone}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='传真：'
                              prop='Fax'>
                    {{dialog.business_info.Fax}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='企业邮箱：'
                              prop='MailBox'>
                    {{dialog.business_info.MailBox}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='商家简介：'
                              prop='Remark'>
                    {{dialog.business_info.Remark}}
                </el-form-item>
              <!--   <el-form-item class="edit-form"
                              label='相关资质：'
                              prop='Qualification'>
                    {{dialog.business_info.Qualification}}
                </el-form-item> -->
               
                <el-form-item
                              label='Logo：'
                              prop='Logo'>
                  <img :src="imgSrc+dialog.business_info.Logo" style="width:150px; border:1px solid #e1e1e1; margin-top:10px;"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialog.show = false">返 回</el-button>
            </span>
        </el-dialog>


        <el-dialog title="设置权限" v-model="dialog_access.show" size="small">
            <el-form style="margin:20px;width:60%;min-width:100%"
                     label-width="100px"
                     :model="dialog_access.userinfo">
                <el-form-item class='edit-form'
                              label="邮箱"
                              prop='email'>
                    {{dialog_access.userinfo.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称"
                              prop='username'>
                    {{dialog_access.userinfo.username}}
                </el-form-item>

                <el-form-item class='edit-form'
                              label="前端页面">
                    <!-- CheckBox选项列表 -->
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item class='edit-form'>
                    <el-tree
                            class="filter-tree"
                            show-checkbox
                            default-expand-all
                            node-key="path"
                            :data="accesss"
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                            @check-change='checkChange'
                            @current-change='currentChange'
                            @node-click='nodeClick'
                            ref="accesss">
                    </el-tree>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialog_access.show = false">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import BussManageJs from './BussManage.js';
    module.exports = BussManageJs;
</script>
<style scoped lang='less'>
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
  /*  border:1px solid pink;*/
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
