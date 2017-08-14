<template>
    <div class="modManage">
        <el-col :span="4" class="treeMenu">
        <span style="font-weight: bold; color:red;margin-left: 25px;">产品类别</span>
        <el-tree
          class="leftTree"
          :data="productType"
          :props="productProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>

        <!-- <div class="tree">
            <ul>
               <li class="parent_li" @click="initLeftTree()">
                    <span class="badge"><i class="icon-plus-sign"></i><a style="color:red; text-shadow: none;">产品类别</a></span>
                    <ul>
                        <li v-if="showChild" v-for="list in productType">
                            <a @click='findList(list.CuitMoon_DictionaryName)'><i class="icon-leaf"></i>{{list.CuitMoon_DictionaryName}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>  --><!-- tree -->
        </el-col>

        <div id="mainText">
        <el-col v-if="!addChild" :span="24" class='actions-top'>
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
        <el-table v-if="showList" border align='center'
                  :data="product_list"
                  :module="product_list"
                  @selection-change='onSelectionChange'>

            <el-table-column
                    prop="ProductName"
                    label="产品名称"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="Remark"
                    label="商品码"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="ProductTypeName"
                    label="产品类型"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="ProductDescription"
                    label="产品描述"
                    align="center">
            </el-table-column>

            <el-table-column
                    prop="AddTime"
                    label="添加时间"
                    align="center">
            </el-table-column>

            <el-table-column
                    label="操作" 
                    align="center"         
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="primary"
                            icon='view'
                            size="mini"
                            @click='showUpdate(scope.row)'>编辑</el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row)'></el-button>
                </template>
            </el-table-column>
        </el-table>
<div class="block" v-show="showList" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
</div> <!--  分页的div -->


        <el-form v-if="addChild" style="margin:20px;width:60%;min-width:600px;" 
            label-width="100px" 
            :model="product_data"
            :rules="product_rules"
            ref='product_data'>

            <el-form-item class='edit-form' 
                :disabled='true'
                label="产品名称" 
                prop='ProductName'>
                <el-input
                        v-model="product_data.ProductName"></el-input>
            </el-form-item>

            <el-form-item class='edit-form' 
                label="商品码" 
                prop='Remark'>
                <el-input 
                    v-model="product_data.Remark" 
                    placeholder=''></el-input>
            </el-form-item>

            <el-form-item  
                label="产品类别" 
                prop='ProductType'>
                <el-select v-model="product_data.ProductType" placeholder='未选择'>
                 <el-option
                  v-for="item in productType" 
                  :key="item.CuitMoon_DictionaryName"
                  :label="item.CuitMoon_DictionaryName"
                  :value="item.CuitMoon_DictionaryName">
                
                </el-option>    
                  <!-- <span>{{ item.CuitMoon_DictionaryName}}</span> -->    
                </el-select>
            </el-form-item>
           
            <el-form-item
                label='产品描述'
                prop='ProductDescription'>
                <el-input type='textarea' 
                    v-model="product_data.ProductDescription"
                    placeholder='产品描述'></el-input>
            </el-form-item>
          
          <el-form-item>
                <el-button type="primary" @click='addProduct(product_data)'>提交</el-button>
                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="产品信息" v-if="dialog.show" v-model="dialog.show">
            <el-form style="margin:20px;width:60%;min-width:100%; padding-right: 50px;"
                     label-width="100px"
                     :model="dialog.product_data">
                <el-form-item class='edit-form'
                              label="产品名称"
                              prop='ProductName'>
                              <el-input
                        v-model="dialog.product_data.ProductName" ></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="商品码"
                              prop='Remark'>
                              <el-input
                        v-model="dialog.product_data.Remark" ></el-input>
                </el-form-item>
                <el-form-item class='edit-form'
                              label="产品类别"
                              prop='ProductTypeName'>
                              <el-input
                        v-model="dialog.product_data.ProductTypeName" ></el-input>
                </el-form-item>
               <!--  <el-form-item class='edit-form'
                              label="添加时间"
                              prop='AddTime'>
                    <el-col :span="24">
                    <el-date-picker
                      v-model="dialog.product_data.AddTime"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-col>
                </el-form-item> -->

                <el-form-item class='edit-form'
                              label="描述"
                              prop='ProductDescription'>
                              <el-input type="textarea"
                        v-model="dialog.product_data.ProductDescription" ></el-input>
                </el-form-item>
     
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="update(dialog.product_data)">确 定</el-button>
            </span>
        </el-dialog> 
    </div>
    </div>
</template>

<script>
	import ProductInfoJs from './ProductInfo.js';
	module.exports = ProductInfoJs;
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
    /*border-right:3px solid #324157;*/
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
        width:83%;
        float: right;
        border:1px solid #f1f1f1;
        padding:5px;
        min-height: 100%;
        height:auto;
        padding-left: 10px;
        border-left:3px solid #324157;
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
