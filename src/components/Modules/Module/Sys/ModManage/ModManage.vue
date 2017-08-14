<template>
    <div class="modManage">
        <el-col :span="4" class="treeMenu">
        <div class="tree">
        <el-tree
          class="leftTree"
          :data="menu_list"
          :props="menuProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>

        </div> <!-- tree -->
        </el-col>
        <div id="mainText">
        <el-col v-if="!addChild" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input
                        v-model='search_data.username'
                      clear></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="default" @click='onSearch'>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onAdd(parentID,parentName)'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- <div v-if="!showList && !addChild" class="friend"><h4>请先选择右边模块</h4></div> -->
        <el-table v-if="showList" border stripe align='center'
                  :data="modules_list"
                  :module="modules_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="CuitMoon_ModuleName"
                    label="模块名称"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="CuitMoon_ModuleURL"
                    label="链接地址"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="CuitMoon_ParentModuleName"
                    label="父级模块"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="CuitMoon_ModuleDescription"
                    label="描述"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="CuitMoon_ModuleStatus"
                    label="状态"
                    align="center"         
                    :sortable="true"
                    :filter-method="filterStatus"
                    :filters="status_filters.list"
                    :formatter="formatterStatus"
                    :filter-multiple="status_filters.multiple"
                    >
            </el-table-column>
             <el-table-column
                    label="排序"
                    align="center"         
                    :sortable="true">
            </el-table-column>
        <!-- :width="$store.state.user.userinfo.pid==0 ? 280 : 260" -->
            <el-table-column
                    label="操作"  
                    width="160"           
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="primary"
                            icon='view'
                            size="mini"
                            @click='showUpdate(scope.row)'>修改</el-button>
                   <!--  <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditUser(scope.row)'></el-button> -->
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDeleteUser(scope.row,scope.$index)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form v-if="addChild" style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="module_data"
            :rules="module_rules"
            ref='module_data'>

            <el-form-item class='edit-form' 
                :disabled='true'
                label="模块名称" 
                prop='CuitMoon_ModuleName'>
                <el-input
                        v-model="module_data.CuitMoon_ModuleName" placeholder='模块名称'></el-input>
            </el-form-item>

            <el-form-item class='edit-form' 
                label="链接地址" 
                prop='CuitMoon_ModuleURL'>
                <el-input 
                    v-model="module_data.CuitMoon_ModuleURL" 
                    placeholder=''></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="上级模块" 
                prop='CuitMoon_ParentModuleID'>
                <el-input 
                    v-model="module_data.CuitMoon_ParentModuleName" 
                    placeholder=''></el-input>
            </el-form-item>
              <el-form-item label="状态">
            <el-switch v-model="module_data.CuitMoon_ModuleStatus" on-text="启用" off-text="禁用" on-value="1" off-value="0"></el-switch>
            </el-form-item>
           
            <el-form-item 
                label='描述信息'
                prop='CuitMoon_ModuleStatus'>
                <el-input type='textarea' 
                    v-model="module_data.CuitMoon_ModuleDescription"
                    placeholder='描述信息'></el-input>
            </el-form-item>

             <el-form-item 
                label='备注信息'
                prop='CuitMoon_ModuleRemarks'>
                <el-input type='textarea' 
                    v-model="module_data.CuitMoon_ModuleRemarks"
                    placeholder='前端url'></el-input>
            </el-form-item>
          
          <!--   <el-form-item label="备注">
                <strong>这里可以写备注信息</strong>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click='save_module("module_data")'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="模块信息" v-if="dialog.show" v-model="dialog.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"
                     label-width="100px"
                     :model="dialog.module_data">
                <el-form-item
                              label="模块名称"
                              prop='CuitMoon_ModuleName'>
                              <el-input
                        v-model="dialog.module_data.CuitMoon_ModuleName" ></el-input>
                </el-form-item>
                <el-form-item
                              label="链接地址"
                              prop='CuitMoon_ModuleURL'>
                              <el-input
                        v-model="dialog.module_data.CuitMoon_ModuleURL" ></el-input>
                </el-form-item>
                <el-form-item
                              label="父级模块"
                              prop='CuitMoon_ParentModuleID'>
                              <el-input
                        v-model="dialog.module_data.CuitMoon_ParentModuleID" ></el-input>
                </el-form-item>
                <el-form-item
                              label="描述"
                              prop='CuitMoon_ModuleDescription'>
                              <el-input
                              type="textarea"
                        v-model="dialog.module_data.CuitMoon_ModuleDescription" ></el-input>
                </el-form-item>
                <el-form-item
                              label="状态"
                              prop='CuitMoon_ModuleStatus'>
                    <el-switch v-model="dialog.module_data.CuitMoon_ModuleStatus" on-text="启用" off-text="禁用" on-value="1" off-value="0"></el-switch>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="updateModule(dialog.module_data)">确 定</el-button>
            </span>
        </el-dialog> 
    </div>
    </div>
</template>

<script>
	import ModManageJs from './ModManage.js';
	module.exports = ModManageJs;
</script>

<!-- <script>$('.tree li.child > span').parent('li.parent_li').find(' > ul > li').hide()</script> -->
<style scoped lang='less'>
.friend h4{
    text-align: center;
    width:96%;
    margin:50px auto;
    height:140px;
    line-height: 140px;
    border:1px solid #e1e1e1;
}
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
    width:100%;
    border:none;
    background-color: transparent;
    float:left;
    padding: 0;
    margin-left:-15px;
}
.leftTree{
    border:none;
    color:#6aaee9;
    color:#ea1616;
    font-weight: bold;
/*    background-color: #d1dbe5;*/
    /*border:1px solid pink;
    background-color: pink;*/
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
    .el-dialog__body{

    }
input[type="text"], input[type="password"]{
    width:220px !important;
}
</style>
