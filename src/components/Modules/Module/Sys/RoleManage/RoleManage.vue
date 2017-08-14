<template>
<div class="form">
   <div v-if="!show_add" id="mainText">
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
                    <el-button type="primary" @click='show_add = true'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

   <el-table
    :data="tableData"
    :module="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="role"
      label="角色"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="description"
      label="角色描述"
      align='center'>
    </el-table-column>
    <el-table-column
      label="操作"
      align='center'>
      <template scope="scope">
            <el-button
            size="small"
            @click="getPermission(scope.$index,tableData)">权限</el-button>
            <el-button
            size="small"
            type="danger"
            @click="deleteRole(scope.$index,tableData)">删除</el-button>
      </template>

    </el-table-column>

  </el-table>
</div>

<div>
    <template>
    <el-dialog title="权限" :visible.sync="dialogTableVisible">
        <el-tree
        :data="data2"
        show-checkbox
        ref="Tree"
        node-key="CuitMoon_ModuleURL"
        :default-checked-keys="can"
        :indent='50'
        :default-expanded-keys="can"
        :props="defaultProps">

      </el-tree>
      <br>
      <el-button :plain="true" type="success"
      @click="savePermission()">确定</el-button>
    </el-dialog>
    </template>
</div>
<div v-if="show_add" class="form">
        <el-form label-width="100px" style="margin:20px;width:90%;min-width:600px;"
            :model="roleinfo"
            :rules="rules"
            ref='refArticle'>
            <el-form-item label="角色名" prop='role' style="width:600px;">
                <el-input v-model="roleinfo.role"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" style="width:600px;" prop='content'>
                <el-input v-model="roleinfo.descript"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click='onSubmit(roleinfo)'>立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>

</div>
</template>

<script>
    import RoleManageJs from './RoleManage.js';
    module.exports = RoleManageJs;
</script>
<style scoped lang='less'>
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
</style>
