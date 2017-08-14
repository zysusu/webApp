<template>
    <div>
        <span class="wrapper">
    <el-button type="success" @click="addDic()">添加</el-button>
    <el-button type="success" @click="view()">查看所有字典</el-button>
  </span>
  <el-dialog title="字典" :visible.sync="viewDicFlag">
  <div id="app">
    <el-tree :data="dicData" :props="defaultProps" ></el-tree>
    </div>

</el-dialog>
  <br>
  <br>
        <template>
            <div style="width:100%">
            <el-table
              :data="tableData"
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="CuitMoon_DictionaryName"
                label="字典名字"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="CuitMoon_DictionaryCode"
                label="字典编码"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="CuitMoon_DictionaryRemarks"
                label="描述"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop=""
                min-width="25%"
                label="操作">
                <template scope="scope">
                      <el-button
                      size="small"
                      @click="updateDic(scope.$index,tableData)">编辑</el-button>
                      <el-button
                      size="small"
                      @click="childDic(tableData[scope.$index])">子字典</el-button>
                      <el-button
                      size="small"
                      v-if="tableData[scope.$index].CuitMoon_ParentDictionaryCode != 0"
                      @click="backFather(tableData[scope.$index])">父字典</el-button>
                      <el-button
                      size="small"
                      type="danger"
                      @click="deleteDic(scope.$index,tableData)">删除</el-button>

                </template>

              </el-table-column>

            </el-table>
        </div>
        </template>
        <div>
            <template>
            <el-dialog title="字典" :visible.sync="dialogTableVisible">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="字典名字">
                <el-input v-model="formLabelAlign.CuitMoon_DictionaryName"></el-input>
                </el-form-item>
                <el-form-item label="字典编码">
                <el-input v-model="formLabelAlign.CuitMoon_DictionaryCode"></el-input>
                </el-form-item>
                <el-form-item label="字典描述">
                <el-input v-model="formLabelAlign.CuitMoon_DictionaryRemarks"></el-input>
                </el-form-item>

                </el-form>
              <br>
              <el-button
              :plain="true"
              type="success"
              v-if="isAdd"
              @click="addSaveDic()">添加</el-button>
              <el-button
              :plain="true"
              type="success"
              v-else="isAdd"
              @click="updateSaveDic()">修改</el-button>
            </el-dialog>

            </template>
        </div>
    </div>
</template>

<script>
    import DictManageJS from './DictManage.js';
    module.exports = DictManageJS;
</script>
<style scoped>

</style>
