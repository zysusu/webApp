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
                    <el-button type="primary" @click="showDiv">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table border style="width: 100%" align='center'
                  :data="element_list"
                  :model="element_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="ElementName"
                    label="要素名称"
                    align="center"
                    @click="showEleInfo()">
            </el-table-column>
            <el-table-column
                    prop="Remark"
                    label="气象指标"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Unit"
                    label="要素单位"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="TyepName"
                    label="要素类别"
                    align="center">
            </el-table-column>
                   <el-table-column
                    prop="AddTime"
                    label="添加时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="要素详情"
                    align="center"
                    :context="_self">
                <template scope="scope">
                     <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='showInfo(scope.row)'>查看</el-button>
                   
                </template>
            </el-table-column>

            <el-table-column
                    label="删除"
                    align="center"
                    :context="_self">
                <template scope='scope'>

                 <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='showUpdate(scope.row)'></el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row)'></el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="气象要素" v-if="dialog1.show" v-model="dialog1.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"        label-width="100px"
                     :model="dialog1.element_data">
                <el-form-item class='edit-form'
                              label="要素名称"
                              prop='ElementName'>
                              <el-input
                        v-model="dialog1.element_data.ElementName" ></el-input>
                </el-form-item>

            <el-form-item
                        label="要素类型"
                        prop="TyepName">
                <el-select 
                       v-model="dialog1.element_data.TyepName">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option> 
                </el-select>
            </el-form-item>

                <el-form-item class='edit-form'
                              label="要素单位"
                              prop='Unit'>
                              <el-input
                        v-model="dialog1.element_data.Unit" ></el-input>
                </el-form-item>

                <el-form-item class='edit-form'
                              label="气象指标"
                              prop='Remark'>
                              <el-input
                        v-model="dialog1.element_data.Remark" ></el-input>
                </el-form-item>

            <el-form-item class="edit-form" 
                label='要素描述'
                prop="ElementDecription">
                <el-input type='textarea'               
                    v-model="dialog1.element_data.ElementDecription"></el-input>
            </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addElement(dialog1.element_data)">提交</el-button>
                <el-button @click="dialog1.show = false">取 消</el-button>
                
            </span>
        </el-dialog> 
     <!--    第二个 -->
          <el-dialog title="模块信息" v-if="dialog2.show" v-model="dialog2.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"        label-width="100px"
                     :model="dialog2.element_info">
                <el-form-item class='edit-form'
                              label="要素名称："
                              prop='ElementName'>
                              {{dialog2.element_info.ElementName}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="气象指标："
                              prop='Remark'>
                              {{dialog2.element_info.Remark}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="要素单位："
                              prop='Unit'>
                              {{dialog2.element_info.Unit}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="要素类别："
                              prop='TyepName'>
                              {{dialog2.element_info.TyepName}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="添加时间："
                              prop='AddTime'>
                              {{dialog2.element_info.AddTime}}
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog2.show = false">返回</el-button>        
            </span>
        </el-dialog> 
    </div>
</template>

<script>
	import MeteorElementJs from './MeteorElement.js';
	module.exports = MeteorElementJs;
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
