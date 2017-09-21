<template>
    <div class="form">
       <el-col :span="4" class="treeMenu">
        <div class="tree">
            <ul @click="showNews()">            
                <li v-for="item in treeList" @click="getGroups(item.ApplyBh)" style="cursor: pointer;">
                    <span><a><i class="icon-leaf"></i>{{item.ProductName}}</a></span>
                </li>
            </ul>
        </div> 
    </el-col>
    <div id="mainText">
        <el-col :span="24" v-if="add_flag==0" class='actions-top'>
          <el-form :inline="true" :model='search_data' class="demo-form-inline">
              <el-form-item label="请输入要查找的专家组名称">
                  <el-input 
                      v-model='search_data.username'
                      clear></el-input>
              </el-form-item>
            
              <el-form-item>
              <el-button type="primary" @click='onSearch'>查询</el-button>
              <el-button type="primary" v-if="addBtn" @click='onAdd'>添加</el-button>
            </el-form-item>
          </el-form>
        </el-col>
   <el-table
    v-if="add_flag==0"
    :data="groupList"
    :module="groupList"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="unityName"
      label="申请人"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ApplyTime"
      label="申请时间"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="Experts_Class"
      label="专家组名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="expertsLevel"
      label="专家组层次"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="Remark"
      label="备注"
      align='center'>
    </el-table-column>

    <el-table-column
      label="数据操作"
      align='center'>
      <template scope="scope">
            <el-button
            size="small"
            @click="updateGroup(scope.row)">编辑</el-button>
            <el-button
            size="small"
            type="danger"
            @click="deleteGroup(scope.row,scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 <!-- <div class="block" v-show="add_flag==0" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
         @current-change="handleCurrentChange">
      </el-pagination>
 </div> --> <!--  分页的div -->
 <!--  <el-card v-if="add_flag==1" :body-style="{padding: '0px' }">
        <header class="infoTop">填写品种档案报告</header>
          <div style="padding: 14px;" class="bottom"> -->
        <el-form
            v-if="add_flag==1"
            label-width="115px" 
            :model="groupInfo"
            :rules="add_rules"
            ref='groupInfo'
            style="margin:20px 35px;">
            <el-form-item
                :disabled='true'
                label="提示：" >
                <strong>该项目已经通过省局审核，已在进行专家组分配</strong>
            </el-form-item>
           <!--  <el-form-item class='edit-form' 
                label="专家组名称：">
                 {{groupInfo.expertsID}}
            </el-form-item> -->
             <el-form-item
                :disabled='true'
                label="专家组层称：">
                 <el-select v-model="groupInfo.ExpertLevel" @change="showGroups" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in level_Lists"
                      :value="item"
                      :label="item">
                    </el-option>
                  </el-select>
            </el-form-item>

            <el-form-item 
                label="请选择专家组：" 
                prop='expertsID'>
                 <el-select v-model="groupInfo.expertsID" @change="showPeople" placeholder="请选择">
                  <el-option
                      v-for="(item,index) in add_Lists"
                      :key="item.expertsName"
                      :value="item.expertsID"
                      :label="item.expertsName">
                    </el-option>
                  </el-select>
            </el-form-item>
              <el-form-item
                label="专家组成员：" 
                prop='groupMember'>
                 <el-checkbox-group v-model="groupInfo.groupMember">
                    <el-checkbox v-for="item in peopleList" :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
            </el-form-item>
            <el-form-item 
                label="专家组组长：" 
                prop='grouper'>
                <el-radio-group v-model="groupInfo.grouper">
                    <el-radio v-for="item in peopleList" :label="item.id">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="备注："
                style="width:50%;" 
                prop='Remark'>
                <el-input 
                    type="textarea"
                    v-model="groupInfo.Remark" 
                    placeholder=''></el-input>
            </el-form-item> 
        <el-form-item style="width:100%; margin-top:20px;">
            <el-button type="primary" @click='save_info(groupInfo)'>提交</el-button>
            <el-button type="default"
                      @click='reBack()'>返回</el-button>
        </el-form-item>
        </el-form>
       <!--    </div>
        </el-card> -->
        <el-form
            v-if="add_flag==2"
            label-width="115px" 
            :model="groupInfo2"
            :rules="add_rules"
            ref='groupInfo2'
            style="margin:20px 35px;">
            <el-form-item
                :disabled='true'
                label="提示：" >
                <strong>该项目已经通过省局审核，已在进行专家组分配</strong>
            </el-form-item>
           <!--  <el-form-item class='edit-form' 
                label="专家组名称：">
                 {{groupInfo.expertsID}}
            </el-form-item> -->
             <el-form-item
                :disabled='true'
                label="专家组层称：">
                 <el-select v-model="groupInfo2.expertsLevel" @change="showGroups" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in level_Lists"
                      :value="item"
                      :label="item">
                    </el-option>
                  </el-select>
            </el-form-item>

            <el-form-item 
                label="请选择专家组：" 
                prop='expertsID'>
                 <el-select v-model="groupInfo2.Experts_Class" @change="showPeople" placeholder="请选择">
                  <el-option
                      v-for="(item,index) in add_Lists2"
                      :key="item.expertsID"
                      :label="item.expertsName"
                      :value="item.expertsID">
                    </el-option>
                  </el-select>
            </el-form-item>
              <el-form-item
                label="专家组成员：" 
                prop='groupMember'>
                 <el-checkbox-group v-model="groupInfo2.groupMember">
                    <el-checkbox v-for="item in peopleList" :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
            </el-form-item>
            <el-form-item 
                label="专家组组长：" 
                prop='grouper'>
                <el-radio-group v-model="groupInfo2.grouper">
                    <el-radio v-for="item in peopleList" :label="item.id">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="备注："
                style="width:50%;" 
                prop='Remark'>
                <el-input 
                    type="textarea"
                    v-model="groupInfo2.Remark" 
                    placeholder=''></el-input>
            </el-form-item> 
        <el-form-item style="width:100%; margin-top:20px;">
            <el-button type="primary" @click='update_info(groupInfo2)'>提交</el-button>
            <el-button type="default"
                      @click='reBack()'>返回</el-button>
        </el-form-item>
        </el-form>
  </div>
</div>
</template>
<script>
    import EpgroupJs from './Epgroup.js';
    module.exports = EpgroupJs;
</script>
<style scoped>
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
.tree ul li span{
  min-width: 150px;
}
#mainText{
        width:82%;
        float: right;
        border:1px solid #f1f1f1;
        padding:5px;
        min-height: 100%;
        height:auto;
}
.badge{
    background-color: transparent;
}
.badge:hover{
    background-color: transparent;
}
    .edit-form{
        width:500px;
    }
</style>
