<template>
    <div class="form">
        <el-col :span="4" class="treeMenu">
        <span style="font-weight: bold; color:red; margin-left: 10px;">模型类别</span>
        <el-tree
          class="leftTree"
          :data="product_type"
          :props="productProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
        </el-col>
    <div class="wrap">
        <div id="mainText">
        <el-col v-show="!addChild && !showEdit" :span="24" class='actions-top'>
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
                    <el-button type="primary" @click='onAdd()'>添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table v-if="!addChild && !showEdit" border align='center'
                  :data="mod_data"
                  :module="mod_data"
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
                    label="操作"            
                    :context="_self"
                    align="center">
                <template scope='scope'>
                    <el-button
                            type="primary"
                            icon='view'
                            size="mini"
                            @click='showUpdate(scope.row)'>修改</el-button>
                </template>
            </el-table-column>
             <el-table-column
                    label="删除"           
                    :context="_self"
                    align="center">
                <template scope='scope'>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row,scope.$index)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
     <!--  添加的div -->
        <el-form class="bigForm" v-if="addChild" style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="module_data"
            :rules="module_rules"
            ref='module_data'>
            <el-form-item class='edit-form' 
                :disabled='true'
                label="模型名称" 
                prop='ModelName'>
                <el-input
                        v-model="module_data.ModelName" placeholder='模块名称'></el-input>
            </el-form-item>

            <el-form-item class='edit-form' 
                label="模型类别" 
                prop='ModelType'>
                <el-select v-model="module_data.ModelType">
                    <el-option
                      v-for="item in product_type"
                      :label="item.CuitMoon_DictionaryName"
                      :value="item.CuitMoon_DictionaryCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="所属产品" 
                prop='ProductNumber'>
                  <el-select v-model="module_data.ProductNumber" placeholder="请选择">
                  <el-option
                  v-for="item in product_list" 
                  :label="item.ProductName"
                  :value="item.ProductNumber">
                </el-option>
            </el-select>
            </el-form-item>

        <el-form-item
                label='生育期'
                prop='growth'><i @click="cloneDiv" class="el-icon-plus add" style="color:#26b2d8; cursor:pointer;"></i>
         <div class="creatTo">
            <div class="addBear" v-for="(item,index) in Growth_data">
              <span style="float:right;"><i @click="deleteDiv(index)" class="el-icon-close deleteDiv1" style="color:red; cursor:pointer; margin-right:8px; margin-top:-8px;"></i></span>
              <table class="bearTable">
                    <tr>
                        <th><span>名称</span></th>
                        <th><input class="gname" v-model="item.Gname" type="text"/></th>
                    </tr>
                    <tr v-for="(ele,index) in elements">    
                      <td><input name="element" type="checkbox" :value='ele.ElementNumber'/>{{ele.ElementName}}</td>
                      <td><input name="eleValue" type="text"/></td>
                    </tr>
              </table>
            </div>
         
        </div>  <!-- creatTo -->
        </el-form-item>
        <el-form-item 
                label='最优生长环境描述'
                prop='ModelDescription'>
                <el-input type='textarea' 
                    v-model="module_data.ModelDescription"
                    ></el-input>
        </el-form-item>
        <el-form-item>
                <!-- <div class="bottomBtn"> -->
                <el-button type="primary" @click='save_module(module_data)'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
                <!-- </div> -->
        </el-form-item>
    </el-form>
             <!--  添加的div结束 -->

             <!--  编辑的div -->
        <el-form class="bigForm" v-if="showEdit" style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="editData"
            ref='editData'>
            <el-form-item class='edit-form' 
                :disabled='true'
                label="模型名称" 
                prop='ModelName'>
                <el-input
                    v-model="editData.ModelName" placeholder='名称'></el-input>
            </el-form-item>
            <el-form-item class='edit-form' 
                label="模型类别" 
                prop='ModelType'>
                <el-select v-model="editData.ModelType">
                <el-option
                  v-for="item in product_type"
                  :label="item.CuitMoon_DictionaryName"
                  :value="item.CuitMoon_DictionaryCode">
                </el-option>
                </el-select>
            </el-form-item>
        <el-form-item class='edit-form' 
                label="所属产品" 
                prop='ProductNumber'>
                  <el-select v-model="editData.ProductNumber" placeholder="请选择">
                  <el-option
                  v-for="item in product_list" 
                  :label="item.ProductName"
                  :value="item.ProductNumber">
                </el-option>
                  </el-select>
        </el-form-item>
        <el-form-item
                label='生育期'
                prop='growth'><i @click="cloneUpDiv" class="el-icon-plus add" style="color:#26b2d8; cursor:pointer;"></i>  
         <div class="creatTo">
            <div v-for="(item,index) in Growthperiod" class="updateBear">
              <span style="float:right;"><i @click="deleteUpDiv(index)" class="el-icon-close deleteDiv1" style="color:red; cursor:pointer;"></i></span>
                <table class="bearTable">
                    <tr>
                        <th><span>名称</span></th>
                        <th><input class="gname" type="text" v-model="item.growthName" :value="item.growthName"/><span class="GnameId" v-show="false">{{item.growthId}}</span></th>
                    </tr>
                    <tr v-for="ele in elements">    
                      <td><input name="element" type="checkbox" :checked="choose(index,ele.ElementNumber)" :value='ele.ElementNumber'/>{{ele.ElementName}}</td>
                      <td v-show="false"><input name="elementId" :value="getEleId(index,ele.ElementNumber)" type="text"/></td>
                      <td><input name="eleValue" :value="putValue(index,ele.ElementNumber)" type="text"/></td>
                    </tr>
              </table>
            </div>
        </div>  <!-- creatTo -->
        </el-form-item>
             <el-form-item 
                label='最优生长环境描述'
                prop='ModelDescription'>
                <el-input type='textarea' 
                    v-model="editData.ModelDescription"
                    ></el-input>
            </el-form-item>
          
            <el-form-item>
                <el-button type="primary" @click='updateModule(editData)'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form> <!--  编辑的div结束 -->
    </div>  <!-- "mainText" -->
</div>
    </div>
</template>
<script>
	import SetModuleJs from './SetModule.js';
	module.exports = SetModuleJs;
</script>

<style scoped lang='less'>
.growthId,.elementId{
    display: none;
}
.bottomBtn{
    width:100%;
    height:40px;
    border:1px solid red;
    float:left;
    text-align: center;
}
input[name="element"]{
    margin-top:-2px;
}
.creatTo{
    margin-top: -30px;
    padding:5px;
    height:auto;
    /*border:1px solid red;*/
}
.addBear,.updateBear{
    width: 460px;
    display: block;
    min-height: 280px;
    height:auto;
    border:1px solid #e0e0e0;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #e6efef;
}
.bearName{
    width:440px;
/*    height:30px;*/
    height:auto;
    margin:10px;
    border:1px solid #ccc;
    float:right;
}
.bearTable{
    float:left;
}
.bearTable td,.bearTable th{
/*    border-bottom:1px solid #e2e2e2;*/
    padding:5px 10px;
}
/*.bearTable th{
    border-bottom: 2px solid #c1c1c1;
}*/
.bigForm{
    border:1px solid #ccc;
    padding:20px 10px;
    padding-left:20px;
}
.friend h4{
    text-align: center;
    width:96%;
    margin:50px auto;
    height:140px;
    line-height: 140px;
    border:1px solid #e1e1e1;

}
.leftTree{
  margin-left:-10px;
  margin-right: 10px;
}
.el-tree{
  border:2px solid #d1dbe5;
}
.treeMenu{
    margin:0;
    padding:0;
    min-height:520px;
    height:100%;
    overflow: visible;
    float:left;
    /*border-right:3px solid #324157;*/
}
.tree{
    border:none;
    background-color: transparent;
    float:left;
    padding: 0;
    margin-left:-26px;
}
.add{
    position: relative;
    top: 25px;
    left: -45px;
    font-weight: bold;
}
.badge{
    background-color: transparent;
}
.badge:hover{
    background-color: transparent;
}
.wrap{
    float:left;
    width:83%;
    min-height: 550px;
    height:auto;
    border-left:3px solid #324157;
}
#mainText{
        width:99%;
        margin-left: 10px;
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
input[type="text"], input[type="password"]{
    width:220px !important;
}
</style>
