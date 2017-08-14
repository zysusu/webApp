<template>
    <div class="form">
        <div id="mainText">
          <el-col v-if="!showAll" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的产品名称">
                    <el-input
                        v-model='search_data.username'
                        clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch'>查询</el-button>
                </el-form-item>
          </el-form>
        </el-col>

   <el-table
    v-if="!showAll"
    :data="applica"
    :module="applica"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="ApplyPerson"
      label="申请人"
      align='center'>
    </el-table-column>
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
      label="受理状态"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="HandleResult"
      label="受理结果"
      align='center'>
    </el-table-column>

    <el-table-column
      label="数据操作"
      align='center'>
      <template scope="scope">
           <!--  <el-button
            size="small"
            @click="getPermission(scope.$index)">{{scope.row.HandleResult=='受理成功'?'通过':'失败'}}</el-button> -->
            <el-button
              v-if="scope.row.HandleResult=='受理成功'"
              size="small"
              @click="getPermission(scope.$index)">通过</el-button>
            <el-button
              v-else-if="scope.row.HandleResult=='受理中'"
              size="small"
              type="warning"
              @click="editView(scope.row)">审核</el-button>
            <el-button
              v-else-if="scope.row.HandleResult=='未上报'"
              size="small"
              @click="getPermission(scope.$index)">未知</el-button>
            <el-button
              v-else
              size="small"
              style="color:red;"
              @click="getPermission(scope.$index)">失败</el-button>
            <el-button
            size="small"
            type="success"
            @click="showMore(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block" v-show="!showAll" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
  </div> <!--  分页的div -->

   <el-row>
      <el-col v-if="showAll" :span="24">
        <!-- 企业信息 -->
        <el-card :body-style="{ padding: '0px' }">
              <header class="infoTop">企业信息</header>
            <el-form
                  label-width="100px" 
                  :model="applyData">
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="单位名称：" 
                      prop='unityName'>
                   {{applyData.unityName}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="法人代表：" 
                      prop='repersentative'>
                         {{applyData.repersentative}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="业务联系人：" 
                      prop='counterMan'>
                        {{applyData.counterMan}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="手机号码：" 
                      prop='Phone'>
                        {{applyData.Phone}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="申请人类型 ：" 
                      prop='applicationType'>
                         {{applyData.applicationType}}
                  </el-form-item>
              </div>
              <div class="info2">
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="通讯地址 ：" 
                      prop='location'>
                         {{applyData.location}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="单位性质：" 
                      prop='unitProperty'>
                        {{applyData.unitProperty}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="业务电话：" 
                      prop='countermanPhone'>
                       {{applyData.countermanPhone}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="商家邮箱：" 
                      prop='ProducountermanFaxctNum'>
                        {{applyData.countermanFax}}
                  </el-form-item>
              </div>
             </el-form>
      </el-card>
      <!-- 企业信息结束 -->

      <!-- 产地信息 -->
      <el-card :body-style="{ padding: '0px' }">
            <header class="infoTop">产地信息</header>
            <el-form
                  label-width="100px" 
                  :model="applyData">
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="生产基地：" 
                      prop='ProduceBase'>
                   {{applyData.ProduceBase}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产地负责人：" 
                      prop='ProductionCharger'>
                         {{applyData.ProductionCharger}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="手机：" 
                      prop='Phone'>
                        {{applyData.Phone}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="是否申请标签：" 
                      prop='Phone'>
                        {{applyData.Phone}}
                  </el-form-item>
              </div>
              <div class="info2">
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="地址 ：" 
                      prop='location'>
                         {{applyData.location}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="生产基地联系电话：" 
                      prop='Contact'>
                        {{applyData.Contact}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="传真：" 
                      prop='Email'>
                       {{applyData.Email}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="e-mail：" 
                      prop='Email'>
                       {{applyData.Email}}
                  </el-form-item>
              </div>
             </el-form>
      </el-card>
      <!-- 产地信息结束 -->

      <el-card :body-style="{ padding: '0px' }">
        <header class="infoTop">已获得的资质，认证，荣誉，注册商标</header>
         <el-table
              :data="tableData"
              text-align="center"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="证书图片"
                min-width="20%">
                <template scope="scope">
                    <img v-if="scope.row.picUrl" :src="imageSrc+scope.row.picUrl" class="avatar">
                </template>
              </el-table-column>
              <el-table-column
                prop="Name"
                label="证书名称"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="publishUnit"
                label="颁发机构"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="awardTime"
                label="获得时间"
                min-width="20%">
              </el-table-column>
            </el-table>
      </el-card>

      <!-- 申报产品情况 -->
      <el-card :body-style="{ padding: '0px' }">
            <header class="infoTop">申报产品情况</header>
                      <el-form
                  label-width="100px" 
                  :model="applyData">
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="产品名称：" 
                      prop='ProductName'>
                   {{applyData.ProductName}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="农产品品牌：" 
                      prop='ProductBrand'>
                         {{applyData.ProductBrand}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产量：" 
                      prop='ProdutOutput'>
                        {{applyData.ProdutOutput}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="规模：" 
                      prop='scale'>
                        {{applyData.scale}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="标签数量：" 
                      prop='Number'>
                         {{applyData.Number}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="申请类别：" 
                      prop='ApplyOriginType'>
                         {{applyData.ApplyOriginType}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="气候控制措施：" 
                      prop='ControlImplement'>
                         {{applyData.ControlImplement}}
                  </el-form-item>
              </div>
              <div class="info2">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="产地概况：" 
                      prop='ProductOverview'>
                         {{applyData.ProductOverview}}
                   </el-form-item>
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="产品类别：" 
                      prop='ApplyOriginType'>
                         {{applyData.ApplyOriginType}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="保质期：" 
                      prop='ProductBrand'>
                        {{applyData.ProductBrand}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产值：" 
                      prop='OutputValue'>
                       {{applyData.OutputValue}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="包装规格：" 
                      prop='Format'>
                        {{applyData.Format}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="费用：" 
                      prop='inTotal'>
                        {{applyData.inTotal}}
                  </el-form-item>
                  <el-form-item class='edit-form' 
                      label="产品特征、特性描述：" 
                      prop='ProductDescription'>
                        {{applyData.ProductDescription}}
                  </el-form-item>
              </div>
             </el-form>
      </el-card>
      <!-- 申报产品情况 -->

      <!-- 基层专家意见 -->
       <!-- <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">基层专家意见</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="125px" 
                :model="localInfo">
            <div class="info1">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    label="组长签名：" 
                    prop='BasicPanel_Sign'>
                 {{localInfo.BasicPanel_Sign}}
                </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='edit-form' 
                    label="基层专家组意见：" 
                    prop='BasicPanel_AuditOpinion'>
                       {{localInfo.BasicPanel_AuditOpinion}}
                </el-form-item>
          </div>
        </el-form> -->
      </el-card>
      <!-- 基层专家意见结束 -->

       <!-- 省级专家意见 -->
     <!--   <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
              <header class="infoTop">省级专家意见</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="125px" 
                :model="localInfo">
            <div class="info1">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    label="组长签名：" 
                    prop='ProvincialPanel_Sign'>
                 {{localInfo.ProvincialPanel_Sign}}
                </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='edit-form' 
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
      -->
      <!-- 省级专家意见结束 -->

        <!-- 审核时编写省级专家意见 -->
       <el-card :body-style="{ padding: '0px' }">
          <header class="infoTop">专家意见</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="125px" 
                :model="applyData">
            <div class="info1">
                <el-form-item class='edit-form' 
                label="县级审核人签名：" 
                prop='RegionHeader'>
                  {{applyData.RegionHeader}}
            </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='edit-form' 
                label="县级审核意见：" 
                prop='RegionManageOpinion'>
                   {{applyData.RegionManageOpinion}}
                </el-form-item>
          </div>
          <div class="info1">
                <el-form-item class='edit-form' 
                label="市级审核人签名：" 
                prop='CityHeader'>
                  {{applyData.CityHeader}}
            </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='edit-form' 
                label="市级审核意见：" 
                prop='CityManageAudit'>
                    {{applyData.CityManageAudit}}
                </el-form-item>
          </div>
          <div class="info1">
                <el-form-item class='edit-form' 
                label="省级审核人签名：" 
                prop='ProvinceHeader'>
                {{applyData.ProvinceHeader}}
            </el-form-item>
            </div>
            <div class="info2">
                <el-form-item class='edit-form' 
                label="省级审核意见：" 
                prop='ProvinceManageOpinion'>
                   {{applyData.ProvinceManageOpinion}}
                </el-form-item>
          </div>
           <div class="info1" v-if="editFlag">
                <el-form-item class='edit-form' 
                label="审核人签名：" 
                prop='Header'>
                  <el-input 
                    v-model="expertView.Header"></el-input>
            </el-form-item>
            </div>
            <div class="info2" v-if="editFlag">
                <el-form-item class='edit-form' 
                label="审核意见：" 
                prop='Opinion'>
                    <el-input 
                    v-model="expertView.Opinion"></el-input>
                </el-form-item>
          </div>
        </el-form>
        <div class="btn" v-if="showAll">
            <el-button type="success" @click='submitView(expertView,1)'>通过</el-button>
            <el-button type="danger" @click='submitView(expertView,0)'>打回</el-button>
            <!-- <el-button type="warning" @click='submitView(expertView)'>打回</el-button> -->
            <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
      </el-card>     
      <!-- 审核的省级专家意见结束 -->
    </el-col>
  </el-row>
</div>
</div>
</template>
<script>
    import ExamApplicaJs from './ExamApplica.js';
    module.exports = ExamApplicaJs;
</script>
<style scoped>
label{
  font-weight: bold;
}
.eleDivs{
  width:96%;
  margin:15px auto;
  height:auto;
  overflow-y: auto;
  border:1px solid #c1c1c1;
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
.edit-form{
  width:500px;
}
.btn{
  background-color: transparent;
  border:none;
}
</style>
