<template>
    <div class="form">
        <el-col :span="24" class='actions-top'>
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
                    <el-button type="primary" @click='addExpertGroup()'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="ExpertGroup_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="expertsName"
                    label="专家组名称"
                    align="center">
            </el-table-column>
            
            <el-table-column
                    prop="expertsLevel"
                    label="专家级别"
                    align="center"
                    :sortable="true">
            </el-table-column>

            <el-table-column
                    prop="Region"
                    label="所属区域"
                    align="center">
            </el-table-column>

            <el-table-column
                    label="详情"
                    align="center"
                    :context="_self">
                <template scope="scope">
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditExperGroup(scope.row)'>编辑</el-button>
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
                            @click='onDeleteExpertGroup(scope.row,scope.$index)'>删除</el-button>

                </template>
            </el-table-column>
        </el-table>
<div class="block" v-show="!searchFlag" style="margin:20px 35px; float:right;">
    <el-pagination
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
         @current-change="handleCurrentChange2">
    </el-pagination>
</div> <!--  分页的div -->
        <!-- 添加专家 -->
      <el-dialog title="设定专家组" v-if="dialog.show" v-model="dialog.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"
                     label-width="100px"
                     :model="dialog.exgroup_info">
                <el-form-item
                              label="专家组名称"
                              prop='expertsName'>
                              <el-input
                        v-model="dialog.exgroup_info.expertsName" ></el-input>
                </el-form-item>
                <el-form-item
                              label="专家层次"
                              prop='expertsLevel'>
                     <el-select v-model="dialog.exgroup_info.expertsLevel" @change="changeExpertLevel" placeholder="请选择">
                       <el-option v-for="item in levelData" :value='item' :label="item"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                              label="所属区域"
                              prop='Region'>
                 <el-select v-if="dialog.exgroup_info.expertsLevel=='省级专家' || dialog.exgroup_info.expertsLevel==''" v-model="dialog.exgroup_info.Region[0]" style="float:left;">
                  <el-option v-for="item in province" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                  </el-select>
                  <!-- v-show="dialog.exgroup_info.expertsLevel=='基层专家'" -->
                  <el-cascader
                    v-else
                    :props="areaList"
                    :options="area_list"
                    change-on-select
                    v-model="dialog.exgroup_info.Region">
                </el-cascader>
                </el-form-item>
                <el-form-item style="width:100%;"
                        label="专家成员"
                        prop='expertsPerson'>
                    <el-checkbox-group v-model="dialog.exgroup_info.expertsPerson">
                        <el-checkbox v-for="item in people_list" :label="item.ExpertNo">{{item.Expertname}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addGroup(dialog.exgroup_info)">提 交</el-button>
                <el-button @click="dialog.show = false">返 回</el-button>
            </span>
        </el-dialog> 
        <!-- 添加专家结束 -->
        <!-- 编辑专家 -->
        <el-dialog title="设定专家组" v-show="dialog1.show" v-model="dialog1.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"
                     label-width="100px"
                     :model="dialog1.exgroup_info"
                     ref="dialog1.exgroup_info">
                <el-form-item
                              label="专家组名称"
                              prop='expertsName'>
                              <el-input
                        v-model="dialog1.exgroup_info.expertsName" ></el-input>
                </el-form-item>
                <el-form-item 
                              label="专家层次"
                              prop='expertsLevel'>
                     <el-select v-model="dialog1.exgroup_info.expertsLevel"@change="changeExpertLevel" placeholder="请选择">
                       <el-option v-for="item in levelData" :value='item' :label="item"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item 
                              label="所属区域"
                              prop='Region'>
                <el-select v-if="dialog1.exgroup_info.expertsLevel=='省级专家' || dialog1.exgroup_info.expertsLevel==''" v-model="dialog1.exgroup_info.Region[0]" style="float:left;">
                  <el-option v-for="item in province" :value='item.CuitMoon_AreaName' :label="item.CuitMoon_AreaName"></el-option>
                </el-select>

                   <el-cascader
                    v-else
                    :props="areaList"
                    :options="area_list"
                    change-on-select
                    v-model="dialog1.exgroup_info.Region"
                    >
                </el-cascader>
                </el-form-item>

                <el-form-item
                      label="专家成员"
                      prop='expertsPerson'>
                    <el-checkbox-group v-model="dialog1.exgroup_info.expertsPerson">
                        <el-checkbox v-for="item in people_list" :label="item.ExpertNo">{{item.Expertname}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateGroup(dialog1.exgroup_info)">提 交</el-button>
                <el-button @click="dialog1.show = false">返 回</el-button>
            </span>
        </el-dialog> 
    <!-- 编辑专家结束 -->
    </div>
</template>

<script>
	import SetExGroupJs from './SetExGroup.js';
	module.exports = SetExGroupJs;
</script>
<style scoped lang='less'>
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
