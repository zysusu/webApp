<template>
    <div class="form">
        <el-col v-if="!showLevel" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input
                              v-model='search_data.Name'
                              clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        
        <el-table border v-if="!showLevel" style="width: 100%" align='center'
                  :data="modGrade"
                  :model="modGrade"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="ModelName"
                    label="模型名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="TypeName"
                    label="模型类别"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ModelDescription"
                    label="模型描述"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="模型等级"
                    align="center"
                    :context="_self">
                    <template scope='scope'>
                     <el-button
                            type="warning"
                            size="mini"
                            @click='showLev(scope.row)'>查看等级</el-button>
                  </template>
            </el-table-column>

             <el-table-column
                    label="模型详情"
                    align="center"
                    :context="_self">
                    <template scope='scope'>
                     <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='showInfo(scope.row)'>查看</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <!-- 查看等级 -->
         <el-col v-if="showLevel" :span="4" class='actions-top' style="float:left;">
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
              <el-form-item>
                    <el-button type="success" @click='newGrade'>添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='backToList'>返回</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         <el-table v-if="showLevel" border style="width: 100%" align='center'
                  :data="modLevel"
                  :model="modLevel"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="ModelName"
                    label="所属模型"
                    align="center">
            </el-table-column>
             <el-table-column
                    prop="GradeName"
                    label="等级名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ApproveLevelDescription"
                    label="等级描述"
                    align="center">
            </el-table-column>
             <el-table-column
                    label="操作"
                    align="center"
                    :context="_self">
                    <template scope='scope'>
                     <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='showUpdate(scope.row)'>编辑</el-button>
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
                            @click='deleteGrade(scope.row.ApproveLevelId)'></el-button>
                  </template>
            </el-table-column>
        </el-table>

       <!--  修改模型等级 -->
        <el-dialog title="编辑模型等级" v-if="dialog1.show" v-model="dialog1.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"        label-width="100px"
                     :model="dialog1.mod_data">
                <el-form-item class='edit-form'
                              label="模型名称："
                              prop='ModelName'>
                          {{dialog1.mod_data.ModelName}}
                </el-form-item>

                <el-form-item class='edit-form'
                              label="模型等级："
                              prop='GradeName'>
                             {{dialog1.mod_data.GradeName}}
                </el-form-item>

            <el-form-item class="edit-form" 
                label='等级描述：'
                prop="ApproveLevelDescription">
                <el-input type='textarea'               
                    v-model="dialog1.mod_data.ApproveLevelDescription"></el-input>
            </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateGrade(dialog1.mod_data)">提交</el-button>
                <el-button @click="dialog1.show = false">取 消</el-button>
                
            </span>
        </el-dialog> 
        <!--  修改模型等级结束 -->

          <!--  添加模型等级 -->
        <el-dialog title="添加模型等级" v-if="dialog3.show" v-model="dialog3.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"        label-width="100px"
                     :model="dialog3.mod_news">
                <el-form-item class='edit-form'
                              label="模型名称："
                              prop='ModelName'>
                        {{dialog3.mod_news.ModelName}}
                </el-form-item>

                <el-form-item class='edit-form'
                              label="模型等级："
                              prop='ApproveLevelName'>
                         <el-select v-model="dialog3.mod_news.ApproveLevelName" placeholder="请选择">
                          <el-option
                            v-for="item in gradeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                </el-form-item>

            <el-form-item class="edit-form" 
                label='等级描述：'
                prop="ApproveLevelDescription">
                <el-input type='textarea'               
                    v-model="dialog3.mod_news.ApproveLevelDescription"></el-input>
            </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addGrade(dialog3.mod_news)">提交</el-button>
                <el-button @click="dialog3.show = false">取 消</el-button>              
            </span>
        </el-dialog> 
        <!--  添加模型等级结束 -->

     <!--    第二个 -->
          <el-dialog title="模型详情" v-if="dialog2.show" v-model="dialog2.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"        label-width="100px"
                     :model="dialog2.mod_info">
                <el-form-item class='edit-form'
                              label="模型名称：">
                              {{dialog2.mod_info.ModelName}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="模型类别：">
                              {{dialog2.mod_info.TypeName}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="所属产品：">
                              {{dialog2.mod_info.TypeName}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="生育期：">
                             <!--  {{dialog2.mod_info.TypeName}} -->
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="最优生长环境描述：">
                              {{dialog2.mod_info.ModelDescription}}
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog2.show = false">返回</el-button>        
            </span>
        </el-dialog> 
    </div>
</template>

<script>
	import ModGradeJs from './ModGrade.js';
	module.exports = ModGradeJs;
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
    .XSDFXPage,.container{
            width: 300px;
            height: 300px;
            border:1px solid black;
            margin-left: 20px;
            font-family: "微软雅黑";
        }
</style>
