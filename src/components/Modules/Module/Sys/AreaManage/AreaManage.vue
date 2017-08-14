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
                    <el-input placeholder="地区名称"
                              v-model='search_data.username'
                              clear></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="default" @click='onSearch'>查询</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-button class="primary" type="primary" @click='addArea()'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table v-if="!show_user" border style="width: 100%" align='center'
                  :data="area_data"
                  :module="area_data"
                  @selection-change='onSelectionChange'>

            <el-table-column
                    prop="CuitMoon_AreaName"
                    label="地区名称"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="CuitMoon_AreaCode"
                    label="地区编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="CuitMoon_AreaRemarks"
                    label="备注"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    :context="_self">
                <template scope="scope">
                     <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelectArea(scope.row)'>编辑</el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='deleteArea(scope.row,scope.$index)'></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form v-if="show_user" style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="add_area"
            :rules='add_rules'
            ref='add_area'>
            <h4 style="text-align: center; margin:30px;">添加地区</h4>
            <el-form-item class='edit-form' 
                :disabled='true'
                label="地区名称" 
                prop='CuitMoon_AreaName'>
                <el-input
                        v-model="add_area.CuitMoon_AreaName"></el-input>
            </el-form-item>

            <el-form-item class='edit-form' 
                label="地区编号" 
                prop='CuitMoon_AreaCode'>
                <el-input 
                    v-model="add_area.CuitMoon_AreaCode"></el-input>
            </el-form-item>
    
            <el-form-item  
                label="上级地区" 
                prop='CuitMoon_ParentAreaCode'>
                <el-select v-for="item in area_list" v-model="add_area.CuitMoon_ParentAreaCode" placeholder='未选择'>
                 <el-option
                  :key="item.CuitMoon_AreaCode"
                  :label="item.CuitMoon_AreaName"
                  :value="item.CuitMoon_AreaCode">
                  <span style="float: left">{{ item.CuitMoon_AreaName}}</span>
                </el-option> 

                <el-option
                  v-for="list in item.child"
                  :key="list.CuitMoon_AreaCode"
                  :label="list.CuitMoon_AreaName"
                  :value="list.CuitMoon_AreaCode">
                  <span style="float: left">&nbsp;&nbsp;{{ list.CuitMoon_AreaName}}</span>
                </el-option>
                    
                </el-select>
            </el-form-item>

            <el-form-item class="edit-form"
                label='备注信息'
                prop="CuitMoon_AreaRemarks">
                <el-input type='textarea'
                v-model="add_area.CuitMoon_AreaRemarks"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click='save_area(add_area)'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="地区信息" v-model="dialog.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px"
                     label-width="100px"
                     :model="dialog.add_area">
               <el-form-item class='edit-form'
                              label="地区名称"
                              prop='CuitMoon_AreaName'>
                              <el-input
                        v-model="dialog.add_area.CuitMoon_AreaName" ></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="地区名称"
                              prop='CuitMoon_AreaCode'>
                              <el-input
                        v-model="dialog.add_area.CuitMoon_AreaCode" ></el-input>
                </el-form-item>

                <el-form-item  
                label="上级地区" 
                prop='CuitMoon_ParentAreaCode'>
                <el-select v-for="item in area_list" v-model="add_area.CuitMoon_ParentAreaCode" placeholder='未选择'>
                 <el-option
                  :key="item.CuitMoon_AreaCode"
                  :label="item.CuitMoon_AreaName"
                  :value="item.CuitMoon_AreaCode">
                  <span style="float: left">{{ item.CuitMoon_AreaName}}</span>
                </el-option> 

                <el-option
                  v-for="list in item.child"
                  :key="list.CuitMoon_AreaCode"
                  :label="list.CuitMoon_AreaName"
                  :value="list.CuitMoon_AreaCode">
                  <span style="float: left">&nbsp;&nbsp;{{ list.CuitMoon_AreaName}}</span>
                </el-option> 
                </el-select>
            </el-form-item>
             <el-form-item class='edit-form'
                              label="备注"
                              prop='CuitMoon_AreaRemarks'>
                              <el-input
                        v-model="dialog.add_area.CuitMoon_AreaRemarks" ></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">返回</el-button>
                <el-button type="primary" @click="updateArea(dialog.add_area)">确 定</el-button>
            </span>
        </el-dialog>


    </div>
    </div>
</template>
<script>
   $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
          alert("hide");
          children.hide('fast');
          $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
          }else{
          alert("show");
          children.show('fast');
          $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
           }
         e.stopPropagation();
   });
</script>
<script>
    import AreaManageJs from './AreaManage.js';
    module.exports = AreaManageJs;
</script>
<style scoped lang='less'>
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
