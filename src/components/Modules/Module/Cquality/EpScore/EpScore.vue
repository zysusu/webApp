<template>
    <div class="form">
      <div id="mainText">
        <el-col :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的产品名称">
                    <el-input
                              v-model='search_data.Name'
                              clear></el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button type="primary" @click='onSearch'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
   <el-table
   v-if="!showMore && !addScore"
    :data="scoreData"
    :module="scoreData"
    border
    style="width: 100%">
    <el-table-column
      prop="ProductName"
      label="产品名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ProductBrand"
      label="产品品牌"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="unityName"
      label="公司名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ApplyTime"
      label="申请时间"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ProductScoreStatus"
      label="受理结果"
      align='center'>
    </el-table-column>

    <el-table-column
      label="数据操作"
      align='center'>
      <template scope="scope">
            <el-button
            v-if="scope.row.ProductScoreStatus=='已评分'"
            size="small">已评</el-button>
            <el-button
            size="small"
            v-else
            type="warning"
            @click="preScore(scope.row)">评分</el-button>
            <el-button
            size="small"
            type="primary"
            @click="showAll(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="block" style="margin:20px 35px; float:right;">
      <el-pagination
      v-show="!showMore && !addScore && !searchFlag"
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
         @current-change="handleCurrentChange">
      </el-pagination>
     </div> <!--  分页的div -->
   <div class="block" style="margin:20px 35px; float:right;">
      <el-pagination
      v-show="!showMore && !addScore && searchFlag"
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
         @current-change="handleCurrentChange2">
      </el-pagination>
     </div> <!--  分页的div -->
  <!--  <el-card v-if="showMore" :body-style="{ padding: '0px' }">
          <header class="infoTop">已获得的资质，认证，荣誉，注册商标</header> -->
        <table v-if="showMore" :data="tableData" :module="tableData" class="picTable">
          <tr>
            <th>生育期</th>
            <th>时间范围</th>
            <th>气象因子</th>
            <th>最适范围</th>
            <th>实测气象条件</th>
            <th>专家评级</th>
            <th>具体分值</th>
          </tr>

        <tr v-for="(item,index) in tableData">
          <td>{{item.cropGrowthPeriod}}</td>
          <td>{{item.startCollectionTime}} ~ {{item.endCollectionTime}}</td>

          <td>
            <tr v-for="(list,index) in item.element">
              <td>{{list.element}}</td>
            </tr>
          </td>

          <td>
            <tr v-for="(list,index) in item.element">
              <td>{{list.OptimalRange}}</td>
            </tr>
          </td>
          <td>
            <tr v-for="(list,index) in item.element">
              <td>{{list.RealCondition}}</td>
            </tr>
          </td>
          <td>
           <tr v-for="(list,index) in item.element">
              <td>{{list.gradeLevel}}</td>
            </tr>
          </td>
          <td>
              <tr v-for="(list,index) in item.element">
              <td>{{list.gradeValue}}</td>
            </tr>
          </td>
          </tr>
       </table>

       <div class="btn" v-if="showMore">
            <!-- <el-button type="primary" @click='submitView(expertView)'>提交</el-button> -->
            <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
  <!--  </el-card> -->
  <div v-if="addScore">
    <table class="picTable" :data="scoreTable">
          <tr>
            <th>生育期</th>
            <th>时间范围</th>
            <th>气象因子</th>
            <th>最适范围</th>
            <th>实测气象条件</th>
            <th>专家评级</th>
            <th>具体分值</th>
          </tr>

        <tr v-for="(item,index) in scoreTable">
          <td>{{item.cropGrowthPeriod}}</td>
          <td>{{item.startCollectionTime}} ~ {{item.endCollectionTime}}</td>
          <td>
            <tr v-for="(list,index) in item.element">
              <td>{{list.ElementName}}</td>
            </tr>
          </td>

          <td>
            <tr v-for="(list,index) in item.element">
              <td><input v-model="list.OptimalRange" style="width: 120px; height:30px; margin:0;" type="text"/></td>
            </tr>
          </td>
          <td>
            <tr v-for="(list,index) in item.element">
              <td>{{list.Unit}}</td>
            </tr>
          </td>
          <td>
           <tr v-for="(list,index) in item.element">
              <td><el-select style="width: 115px; height:30px; margin:0;" v-model="list.gradeLevel" placeholder="请选择">
                <el-option
                  value="最适宜">
                </el-option>
                <el-option
                  value="适宜">
                </el-option>
                <el-option
                  value="次适宜">
                </el-option>
              </el-select></td>
            </tr>
          </td>
          <td>
              <tr v-for="(list,index) in item.element">
              <td><input v-model="list.gradeValue" style="width: 65px; height:30px; margin:0;" type="text"/></td>
            </tr>
          </td>
          </tr>
       </table>
       <div class="btn">
             <el-button type="success" @click='saveTable(scoreTable)'>生成气候要素信息</el-button>
             <el-button type="success" :disabled="subFlag" @click='submitTable(scoreTable)'>提交</el-button>
            <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import EpScoreJs from './EpScore.js';
    module.exports = EpScoreJs;
</script>
<style scoped>
.picTable{
  width:100%;
  border-top: 1px solid #ccc;
  margin-top: 0px;
}
.picTable th{
  height:40px;
}
.picTable th,.picTable td{
 /* width:14%;*/
 padding:8px 13px;
  text-align: center;
  border:1px solid #dfe6ec;
  min-height: 40px;
}
.picTable td tr td{
  border:none;
}
.picTable th{
  background-color: #96CB33;
}
.picTable tr:hover{
  background-color: #eef1f6;
}
.infoTop{
    height:40px;
    background-color: #96CB33;
    color:#fff;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 18px;
    padding:10px 14px;
}
.edit-form{
    width:500px;
}
.btn{
      width:100%;
      background: transparent;
      border:none;
      margin:25px auto;
      margin-bottom: 35px;
      text-align: center;
    }
</style>
