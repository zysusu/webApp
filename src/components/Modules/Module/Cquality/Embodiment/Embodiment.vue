<template>
    <div class="form">
         <div id="mainText">
            <el-col v-if="showFirst" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的申请的名称">
                    <el-input
                              v-model='search_data.Name'
                              clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch'>搜 索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
  <!-- 数据展示 -->
   <el-table
    v-if="showFirst"
    :data="project_list"
    :module="project_list"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="ProductName"
      label="产品名称"
      align='center'>
    </el-table-column>
   
    <el-table-column
      prop="ApplyTime"
      label="申请时间"
      align='center'>
    </el-table-column>

     <el-table-column
      prop="DeclareStatus"
      label="是否建立方案"
      :formatter="yesNo"
      align='center'><!-- {{scope.row.DeclareStatus=='待建立实施方案' ? '否':'是'}} -->
    </el-table-column>
    <el-table-column
      prop="DeclareStatus"
      label="审核状态"
      align='center'>
    </el-table-column>
    <el-table-column
      label="审核方案"
      align='center'>
      <template scope="scope">
            <el-button
            v-if="scope.row.DeclareStatus=='受理成功'"
            size="small">通过</el-button>
            <el-button
            v-if="scope.row.DeclareStatus=='待建立实施方案'"
            size="small">待建</el-button>
            <el-button
            type="warning"
            v-if="scope.row.DeclareStatus=='待基层专家组审核'"
            @click="checkProject(scope.row)"
            size="small">审核</el-button>
            <el-button
            type="warning"
            v-if="scope.row.DeclareStatus=='待省级专家组审核'"
            @click="checkProject(scope.row)"
            size="small">审核</el-button>
      </template>

    </el-table-column>
    <el-table-column
      label="数据操作"
      align='center'>
      <template scope="scope">
            <el-button
            v-if="scope.row.DeclareStatus=='受理成功'"
            size="small">通过</el-button>
            <el-button
            v-if="scope.row.DeclareStatus=='待基层专家组审核'"
            size="small">待审</el-button>
            <el-button
            v-if="scope.row.DeclareStatus=='待省级专家组审核'"
            size="small">待审</el-button>
            <el-button
            v-if="scope.row.DeclareStatus=='待建立实施方案'"
            size="small"
            type="info"
            @click="addProject(scope.row)">新建</el-button>
            <el-button
            size="small"
            type="primary"
            @click="showAll(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 数据展示结束 -->

   <el-row>
      <el-col :span="24">
        <!-- 产品信息 -->
        <el-card v-if="showAdd || lookAll || checkAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">产品信息</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="productInfo"
                :model="productInfo">
            <div class="info1">
                <el-form-item class='myClass' 
                    label="产品名称：" 
                    prop='ProductName'>
                       {{productInfo.ProductName}}
                </el-form-item>
                <el-form-item class='myClass' 
                label="产品品牌：" 
                prop='ProductBrand'>
                  {{productInfo.ProductBrand}}
            </el-form-item>

                <el-form-item class='myClass' 
                    label="所属商家：" 
                    prop='unityName'>
                      {{productInfo.unityName}}
                </el-form-item>
        </div>
        <div class="info2">
            <!--  <el-form-item class='myClass' 
                    :disabled='true'
                    label="认证项目编号：" 
                    prop='ApplyBh'>
                 {{productInfo.ApplyBh}}
                </el-form-item> -->
             <el-form-item class='myClass' 
                :disabled='true'
                label="认证申请时间：" 
                prop='ApplyTime'>
                   {{productInfo.ApplyTime}}
            </el-form-item>
            <el-form-item class='myClass' 
                label="产地：" 
                prop='Address'>
                 {{productInfo.Address}}
            </el-form-item>

        </div>
        </el-form>
      </el-card>
      <!-- 产品信息结束 -->
      <!-- 要素信息 -->
      <el-card v-if="lookAll || checkAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">要素信息</header>
            <div class="eleDivs" v-for="(item,i) in elementInfo">
            <el-form 
                style="padding:8px 15px;"
                label-width="145px" 
                :model="item">
            <div class="info1">
                <el-form-item class='myClass' 
                    :disabled='true'
                    label="气象站：" 
                    prop='stationId'>
                 {{item.stationId}}
                </el-form-item>

                <el-form-item class='myClass' 
                    label="气象指标：" 
                    prop='meteIndicators'>
                     <span v-for="list in item.meteIndicators">
                        {{list}}&nbsp;&nbsp;&nbsp;&nbsp;
                     </span>
                </el-form-item>

                <el-form-item class='myClass' 
                    label="农作物生育期：" 
                    prop='cropGrowthPeriod'>
                      {{item.cropGrowthPeriod}}
                </el-form-item>
        </div>
        <div class="info2">
             <el-form-item class='myClass' 
                :disabled='true'
                label="理由：" 
                prop='meteIndicatorsReason'>
                   {{item.meteIndicatorsReason}}
            </el-form-item>

            <el-form-item class='myClass' 
                label="数据采集时间：" >
                  {{item.startCollectionTime}}&nbsp;&nbsp;~&nbsp;&nbsp;{{item.endCollectionTime}}
            </el-form-item>
        </div>
        </el-form>
        </div>
      </el-card>
      <!-- 要素信息结束 -->
      <!-- 产地信息 -->
      <el-card v-if="lookAll || checkAll" :body-style="{ padding: '0px' }">
            <header class="infoTop">产地信息</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="140px" 
                :model="localInfo">
            <div class="info1">
                <el-form-item class='myClass' 
                    :disabled='true'
                    label="产地概况：" 
                    prop='Origin_Situation'>
                 {{localInfo.Origin_Situation}}
                </el-form-item>

                <el-form-item class='myClass' 
                    label="产地主要气象灾害：" 
                    prop='Meteorological_Disaster'>
                       {{localInfo.Meteorological_Disaster}}
                </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='myClass' 
                    label="农产品主要病虫害：" 
                    prop='Diseases_InsectPests'>
                      {{localInfo.Diseases_InsectPests}}
                </el-form-item>
        </div>
        </el-form>
      </el-card>
      <!-- 产地信息结束 -->

      <!-- 基层专家意见 -->
       <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">基层专家意见</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="125px" 
                :model="localInfo">
            <div class="info1">
                <el-form-item class='myClass' 
                    :disabled='true'
                    label="组长签名：" 
                    prop='BasicPanel_Sign'>
                 {{localInfo.BasicPanel_Sign}}
                </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='myClass' 
                    label="基层专家组意见：" 
                    prop='BasicPanel_AuditOpinion'>
                       {{localInfo.BasicPanel_AuditOpinion}}
                </el-form-item>
          </div>
        </el-form>
      </el-card>
      <!-- 基层专家意见结束 -->

       <!-- 省级专家意见 -->
       <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">省级专家意见</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="125px" 
                :model="localInfo">
            <div class="info1">
                <el-form-item class='myClass' 
                    :disabled='true'
                    label="组长签名：" 
                    prop='ProvincialPanel_Sign'>
                 {{localInfo.ProvincialPanel_Sign}}
                </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='myClass' 
                    label="省级专家组意见：" 
                    prop='ProvincialPanel_AuditOpinion'>
                       {{localInfo.ProvincialPanel_AuditOpinion}}
                </el-form-item>
          </div>
        </el-form>
      </el-card>

        <div class="btn" v-if="lookAll">
            <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
     
      <!-- 省级专家意见结束 -->

        <!-- 审核时编写省级专家意见 -->
       <el-card v-if="checkAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">专家意见</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="125px" 
                :model="expertView">
            <div class="info1">
                <el-form-item class='myClass' 
                label="组长签名：" 
                prop='cropGrowthPeriod'>
                    <el-input 
                    v-if="checkFlag==1 || checkFlag==2"
                    v-model="expertView.sign"></el-input>
            </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='myClass' 
                label="基层专家意见：" 
                v-if="checkFlag==1"
                prop='cropGrowthPeriod'>
                    <el-input 
                    v-model="expertView.opinion"></el-input>
                </el-form-item>
                <el-form-item class='myClass' 
                v-if="checkFlag==2"
                label="省级专家意见：" 
                prop='cropGrowthPeriod'>
                    <el-input 
                    v-model="expertView.opinion"></el-input>
               </el-form-item>
               <el-form-item class='myClass' 
                v-if="checkFlag==3"
                label="省级专家意见：" 
                prop='cropGrowthPeriod'>
               </el-form-item>
          </div>
        </el-form>
        <div class="btn" v-if="checkAll">
            <el-button type="primary" @click='submitView(expertView)'>提交</el-button>
            <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
      </el-card>     
      <!-- 审核的省级专家意见结束 -->

        <!-- 新建方案 -->
        <el-card v-if="showAdd" :body-style="{ padding: '0px' }">
            <header class="infoTop">添加方案信息</header>
               <!--  动态生成生育期 -->
            <el-card v-for="(item,num) in total_bear" class="newChild" style="margin:15px 20px; border:1px solid #96CB33;" :body-style="{ padding: '0px' }">              
            <el-form
                label-width="125px">
            <div class="info1">
                <el-form-item class='myClass' 
                    :disabled='true'
                    label="气象站：">
                 {{item.stationId}}
                </el-form-item>

                <el-form-item class='myClass' 
                    label="气象指标：" >
                  <span v-for="list in item.meteIndicators">{{list}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      
                </el-form-item>

                <el-form-item class='myClass' 
                    label="农作物生育期：" 
                    prop='cropGrowthPeriod'>
                      {{item.cropGrowthPeriod}}
                </el-form-item>
        </div>
        <div class="info2">
             <el-form-item class='myClass'
                format="yyyy-MM-dd"
                type="datetime" 
                :disabled='true'
                label="数据采集时间：">
                 {{item.startCollectionTime}}&nbsp;&nbsp;~&nbsp;&nbsp;{{item.endCollectionTime}}
            </el-form-item>

            <el-form-item class='myClass' 
                label="理由：" 
                prop='meteIndicatorsReason'>
                  {{item.meteIndicatorsReason}}
            </el-form-item>
             <el-form-item style="width:100%; text-align: right;">
               <el-button type="danger" class="deleteBtn" @click="deleteChild(num)">删除</el-button>
             </el-form-item>
          </div>
          </el-form>
        </el-card>

      <div style="padding: 14px;" class="bottom">
        <el-form
            label-width="120px" 
            :model="bearing"
            :rules="bear_rules"
            ref='bearing'>
        <div class="info1">
            <el-form-item class='myClass' 
                :disabled='true'
                label="气象站：" 
                prop='stationId'>
                <el-select v-model="bearing.stationId">
                    <el-option
                      v-for="item in station_list"
                      :key="item.Name"
                      :label="item.Name"
                      :value="item.Name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class='myClass' 
                label="气象指标：" 
                prop='meteIndicators'>
                <template>
                <el-checkbox-group v-model="bearing.meteIndicators">
                  <el-checkbox v-for="item in elements" :label="item.ElementName" :value="item.ElementName"></el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>

            <el-form-item class='myClass' 
                label="农作物生育期：" 
                prop='cropGrowthPeriod'>
             <el-input 
                    v-model="bearing.cropGrowthPeriod" 
                    placeholder='如：开花期，结果期'></el-input>
            </el-form-item>
             <el-form-item 
                style="text-align: left; margin-top:10px;"
                label="理由：" 
                prop='meteIndicatorsReason'>
             <el-input 
                    type="textarea"
                    v-model="bearing.meteIndicatorsReason" 
                    placeholder='选择上述指标的理由'></el-input>
             <el-button type="info" @click="create_bear(bearing)">添加生育期</el-button>
             
          </el-form-item>
        </div>
        <div class="info2">
            <el-form-item class='myClass' 
                label="数据采集时间：">
                <el-date-picker
                v-model="bearing.startCollectionTime"
                type="date"
                @change="dateChange1"
                placeholder="开始时间"
                :picker-options="pickerOptions0">
              </el-date-picker> ~
              <el-date-picker
                v-model="bearing.endCollectionTime"
                type="date"
                @change="dateChange2"
                placeholder="结束时间"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
        </div>
        </el-form>

        <el-form
            label-width="120px" 
            :model="projectInfo"
            :rules="project_rules"
            ref='projectInfo'>
             <div class="info1 info3">
           <el-form-item 
                style="text-align: left; margin-top:10px;"
                label="产地概况：" 
                prop='Origin_Situation'>
             <el-input 
                    type="textarea"
                    v-model="projectInfo.Origin_Situation" 
                    placeholder=''></el-input>
          </el-form-item>
           <el-form-item style="text-align:left;" class='myClass' 
                :disabled='true'
                label="申请频率：" 
                prop='ApplyFrequency'>
                <el-select v-model="projectInfo.ApplyFrequency">
                    <el-option
                      key="第一次申请"
                      label="第一次申请"
                      value="第一次申请">
                    </el-option>
                    <el-option
                      key="再次申请"
                      label="再次申请"
                      value="再次申请">
                    </el-option>
                </el-select>
            </el-form-item>
           <el-form-item 
                style="text-align: left; margin-top:10px;"
                label="产地气象灾害：" 
                prop='Meteorological_Disaster'>
             <el-input 
                    type="textarea"
                    v-model="projectInfo.Meteorological_Disaster" 
                    placeholder=''></el-input>
          </el-form-item>
           <el-form-item 
                style="text-align: left; margin-top:10px;"
                label="病虫灾害：" 
                prop='Diseases_InsectPests'>
             <el-input 
                    type="textarea"
                    v-model="projectInfo.Diseases_InsectPests" 
                    placeholder=''></el-input>
          </el-form-item>
           <el-form-item style="width:100%; margin-top: 20px; text-align: right;">
              <el-button type="success" @click="submitData(projectInfo)">提交</el-button>
              <el-button type="primary" @click='reBack()'>返回</el-button>
          </el-form-item>
        </div>
        </el-form>     
        </div>
    </el-card>

      </el-col>
    </el-row>
  <!-- 新建方案结束 -->
  </div> <!--  mainText -->
    <div class="block" v-show="showFirst" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
</div> <!--  分页的div -->
</div>
</template>
<script>
    import EmbodimentJs from './Embodiment.js';
    module.exports = EmbodimentJs; 
</script>
<style scoped>
label{
  font-weight: bold;
}
.eleDivs{
  width:97%;
  margin:15px auto;
  height:auto;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 3px #e3e3e3;
  background-color: #fff;
}
.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
}
.info3{
  float:left;
  width:66%;
  min-width: 350px;
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
.newChild{
  margin:0 auto;
 /* min-height: 130px;*/
  height:auto;
}
.box-card{
 /* border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
  width:100%;*/
  min-height: 800px;
  zoom:1;
  overflow:hidden;
  height:auto;
  overflow:visible;
}
.el-card{
  background-color: rgb(249, 249, 249);
  margin-bottom: 10px;
}
    .myClass{
     /* margin:20px;*/
      
    }
    .btn{
      width:100%;
      background: transparent;
      border:none;
      margin:25px auto;
      margin-bottom: 35px;
      text-align: center;
    }
.el-form-item{
  margin-bottom: 0px;
}
.el-textarea{
  max-width: 500px;
}
</style>
