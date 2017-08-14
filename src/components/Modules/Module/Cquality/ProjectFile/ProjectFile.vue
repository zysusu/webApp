<template>
<div class="form">
    <div id="mainText">
        <el-col style="margin-top: 20px;" v-if="!addChild && !lookAll" :span="24" class='actions-top'>
            <el-form style="float:left;" :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="项目名称：">
                    <el-input
                          v-model='search_data.Name'
                          clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
            </el-form>

             <el-form style="float:left; margin-left:46px;" :model='add_data' :inline="true" class="demo-form-inline">
                <el-form-item label="待归档的项目：">
                  <el-select v-model="add_data.addName" placeholder="请选择">
                    <el-option
                      v-for="item in noFileList"
                      :label="item.ProductInfomantion"
                      :value="item.ApplyBh">
                    </el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click='onAdd'>添加归档</el-button>
                </el-form-item>
              </el-form>
        </el-col>
   <el-table
    v-if="!addChild && !lookAll"
    :data="fileData"
    :module="fileData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="ProjectName"
      label="项目名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="FileCode"
      label="档案编号"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ArchivePeople"
      label="归档人"
      align='center'>
    </el-table-column> 
    <el-table-column
      prop="FilingTime"
      label="归档时间"
      align='center'>
    </el-table-column>

    <el-table-column
      label="数据操作"
      align='center'
      prop="DeclareStatus">
      <template scope="scope">
        <el-button
            size="small"
            type="primary"
            @click="showMore(scope.row)">详情</el-button>
        <el-button
            size="small"
            @click="updateFile(scope.row)">编辑</el-button>
        <el-button
            size="small"
            type="warning"
            @click="deleteFile(scope.row,scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div class="block" v-show="!addChild && !lookAll && !searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
     </div> <!--  分页的div -->
     <div class="block" v-show="!addChild && !lookAll && searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
</div> <!--  分页的div -->
    <!-- 添加页面 -->
     <el-row v-if="addChild">
      <el-col :span="24">
      <el-card :body-style="{ padding: '0px' }">
          <div>
                <header class="infoTop">填写项目档案信息</header>
          <div style="padding: 14px;" class="bottom">
        <el-form
            label-width="100px" 
            :model="fileInfo"
            :rules="add_rules"
            ref='fileInfo'>
       <!--    <div class="info1"> -->
              <el-form-item class='edit-form' 
                  label="项目名称：" 
                  prop='ProjectName'>
                   <el-input 
                      v-model="fileInfo.ProjectName" 
                      placeholder=''></el-input>
              </el-form-item>

              <el-form-item class='edit-form' 
                  label="档案编号：" 
                  prop='FileCode'>
                  <el-input 
                      v-model="fileInfo.FileCode" 
                      placeholder=''></el-input>
              </el-form-item>
    <!--       </div> -->
         <!--  <div class="info2"> -->
              <el-form-item class='edit-form' 
                  label="归档人：" 
                  prop='ArchivePeople'>
                  <el-input 
                      v-model="fileInfo.ArchivePeople" 
                      placeholder=''></el-input>
              </el-form-item>
            <!--   <el-form-item class='edit-form' 
                  label="归档时间：" 
                  prop='GetTime'>
                  <el-date-picker
                    v-model="fileInfo.GetTime"
                    type="date"
                    @change="getTime"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item> -->
      <!--     </div> -->
          <div lass="info1">
              <el-form-item style="width:500px;"
                  label="备注：" 
                  prop='Remark'>
                  <el-input 
                      type="textarea"
                      v-model="fileInfo.Remark" 
                      placeholder=''></el-input>
              </el-form-item>
          </div>
          <div>
            <el-form-item style="width:100%; margin-top: 20px; float: right;">
                    <el-button v-if="addFlag" type="primary" @click='addFile(fileInfo)'>确定</el-button>
                     <el-button v-else type="primary" @click='update_File(fileInfo)'>提交</el-button>
                    <el-button type="default"
                        @click='reBack()'>返回</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      </div>
      </el-card>
      </el-col>
    </el-row>

      <!-- 产品信息 -->
        <el-card v-if="lookAll" class="myHeight" :body-style="{ padding: '0px' }">
          <header class="infoTop">认证申请信息</header>
            <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="Apply"
                :model="Apply">
            <div class="info1">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    label="申请商家：" 
                    prop='counterMan'>
                 {{Apply.counterMan}}
                </el-form-item>

                <el-form-item class='edit-form' 
                    label="商家类型：" 
                    prop='applicationType'>
                       {{Apply.applicationType}}
                </el-form-item>

                <el-form-item class='edit-form' 
                    label="联系电话：" 
                    prop='countermanPhone'>
                      {{Apply.countermanPhone}}
                </el-form-item>
                <el-form-item class='edit-form' 
                    label="手机：" 
                    prop='countermanPhone'>
                       {{Apply.countermanPhone}}
                </el-form-item>

                <el-form-item class='edit-form' 
                    label="地址：" 
                    prop='location'>
                      {{Apply.location}}
                </el-form-item>

              <el-form-item class='edit-form' 
                    :disabled='true'
                    label="产品名称：" 
                    prop='ApplyBh'>
                 {{Apply.ProductName}}
                </el-form-item>

                <el-form-item class='edit-form' 
                    label="产地：" 
                    prop='ProduceBase'>
                       {{Apply.ProduceBase}}
                </el-form-item>

                <el-form-item class='edit-form' 
                    label="保质期：" 
                    prop='Remark'>
                       {{Apply.Remark}}
                </el-form-item>

                <el-form-item class='edit-form' 
                    label="产品描述：" 
                    prop='ProductDescription'>
                      {{Apply.ProductDescription}}
                </el-form-item>
        </div>
        <div class="info2">
             <el-form-item class='edit-form' 
                :disabled='true'
                label="申请时间：" 
                prop='ApplyTime'>
                   {{Apply.ProvinceAuditTime}}
            </el-form-item>

            <el-form-item class='edit-form' 
                label="业务联系人：" 
                prop='counterMan'>
                  {{Apply.counterMan}}
            </el-form-item>

            <el-form-item class='edit-form' 
                label="传真：" 
                prop='Fax'>
                 {{Apply.Fax}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="邮箱：" 
                prop='Email'>
                 {{Apply.Email}}
            </el-form-item>

           <el-form-item class='edit-form' 
                :disabled='true'
                label="产品品牌：" 
                prop='ProductBrand'>
                   {{Apply.ProductBrand}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="规模：" 
                prop='scale'>
                  {{Apply.scale}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="产值：" 
                prop='Address'>
                 {{Apply.Address}}
            </el-form-item>
            <el-form-item class='edit-form' 
                label="产量：" 
                prop='unityName'>
                  {{Apply.unityName}}
            </el-form-item>
        </div>
        </el-form>
      </el-card>
      <!-- 产品信息结束 -->
      <el-card v-if="lookAll" class="myHeight" :body-style="{ padding: '0px' }">
          <header class="infoTop">认证申请审核信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="QualityInfo"
                :model="QualityInfo">
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 县级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='RegionHeader'>
                   {{Apply.RegionHeader}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='RegionAuditTime'>
                   {{Apply.RegionAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='RegionManageOpinion'>
                   {{Apply.RegionManageOpinion}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 市级申核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='CityHeader'>
                  {{Apply.CityHeader}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='CityAuditTime'>
                   {{Apply.CityAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='CityManageAudit'>
                   {{Apply.CityManageAudit}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 省级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='ProvinceHeader  '>
                   {{Apply.ProvinceHeader}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='ProvinceAuditTime'>
                   {{Apply.ProvinceAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='ProvinceManageOpinion'>
                  {{Apply.ProvinceManageOpinion}}
              </el-form-item>
            </div>
        </el-form>
    </el-card>

  <!--   <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
          <header class="infoTop">认证申请审核信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="QualityInfo"
                :model="QualityInfo">
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 县级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='BasicPanel_Sign'>
                  {{QualityInfo.BasicPanel_Sign}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='BasicAuditTime  '>
                  {{QualityInfo.BasicAuditTime  }}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='BasicPanel_AuditOpinion'>
                  {{QualityInfo.BasicPanel_AuditOpinion}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 市级申核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 省级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='ProvincialPanel_Sign  '>
                  {{QualityInfo.ProvincialPanel_Sign  }}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='ProvincialAuditTime'>
                  {{QualityInfo.ProvincialAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='ProvincialPanel_AuditOpinion'>
                  {{QualityInfo.ProvincialPanel_AuditOpinion}}
              </el-form-item>
            </div>
        </el-form>
    </el-card> -->

    <el-card v-if="lookAll" class="myHeight" :body-style="{ padding: '0px' }">
          <header class="infoTop">实施方案信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="QualityInfo"
                :model="QualityInfo">
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 县级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='BasicPanel_Sign'>
                  {{QualityInfo.BasicPanel_Sign}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='BasicAuditTime  '>
                  {{QualityInfo.BasicAuditTime  }}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='BasicPanel_AuditOpinion'>
                  {{QualityInfo.BasicPanel_AuditOpinion}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 市级申核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 省级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='ProvincialPanel_Sign  '>
                  {{QualityInfo.ProvincialPanel_Sign  }}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='ProvincialAuditTime'>
                  {{QualityInfo.ProvincialAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='ProvincialPanel_AuditOpinion'>
                  {{QualityInfo.ProvincialPanel_AuditOpinion}}
              </el-form-item>
            </div>
        </el-form>
    </el-card>

    <el-card v-if="lookAll" class="myHeight" :body-style="{ padding: '0px' }">
          <header class="infoTop">实施方案审核信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="QualityIdentification"
                :model="QualityIdentification">
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 基层专家组
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="组长签名：" 
                  prop='BasicPanel_Sign'>
                  {{QualityIdentification.BasicPanel_Sign}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='BasicAuditTime  '>
                  {{QualityIdentification.BasicAuditTime  }}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='BasicPanel_AuditOpinion'>
                  {{QualityIdentification.BasicPanel_AuditOpinion}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 省级专家组
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="组长签名：" 
                  prop='unityName'>
                  {{QualityIdentification.ProvincialPanel_Sign}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='unityName'>
                  {{QualityIdentification.ProvincialAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='unityName'>
                  {{QualityIdentification.ProvincialPanel_AuditOpinion}}
              </el-form-item>
            </div>
        </el-form>
    </el-card>

  <!--   <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
          <header class="infoTop">专家组信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="ClimateQuality"
                :model="ClimateQuality">
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 基层专家组
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="专家组名称：" 
                  prop='BasicPanel_Sign'>
                  {{ClimateQuality.ClimateQualitycertificationExperts.Experts_Class}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="组长：" 
                  prop='BasicAuditTime  '>
                  {{ClimateQuality.BasicAuditTime  }}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="成员：" 
                  prop='BasicPanel_AuditOpinion'>
                  {{ClimateQuality.BasicPanel_AuditOpinion}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 省级专家组
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="专家组名称：" 
                  prop='unityName'>
                  {{ClimateQuality.unityName}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="组长：" 
                  prop='unityName'>
                  {{ClimateQuality.unityName}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="成员：" 
                  prop='unityName'>
                  {{ClimateQuality.unityName}}
              </el-form-item>
            </div>
        </el-form>
    </el-card>
 -->
    <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
          <header class="infoTop">专家打分信息</header>
          <table v-if="showMore" :data="expertmark" :module="expertmark" class="picTable">
          <tr>
            <th>生育期</th>
            <th>时间范围</th>
            <th>气象因子</th>
            <th>最适范围</th>
            <th>实测气象条件</th>
            <th>专家评级</th>
            <th>具体分值</th>
          </tr>
        <tr v-for="(item,index) in expertmark">
          <td>{{item.Bearinginfo2.cropGrowthPeriod}}</td>
          <td>{{item.Bearinginfo2.startCollectionTime}} ~ {{item.Bearinginfo2.endCollectionTime}}</td>

          <td>
            <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.element}}</td>
            </tr>
          </td>

          <td>
            <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.OptimalRange}}</td>
            </tr>
          </td>
          <td>
            <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.RealCondition}}</td>
            </tr>
          </td>
          <td>
           <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.gradeLevel}}</td>
            </tr>
          </td>
          <td>
              <tr v-for="(list,index) in item.Elementmodel2">
              <td>{{list.gradeValue}}</td>
            </tr>
          </td>
          </tr>
       </table>
    </el-card>

        <el-card v-if="lookAll" :body-style="{ padding: '0px' }">
          <header class="infoTop">品质档案信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="QualityInfo"
                :model="QualityInfo">
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 县级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='BasicPanel_Sign'>
                  {{QualityInfo.BasicPanel_Sign}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='BasicAuditTime  '>
                  {{QualityInfo.BasicAuditTime  }}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='BasicPanel_AuditOpinion'>
                  {{QualityInfo.BasicPanel_AuditOpinion}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 市级申核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='unityName'>
                  {{QualityInfo.unityName}}
              </el-form-item>
            </div>
            <div class="info3">
                <el-form-item class='edit-form' 
                    :disabled='true'
                    prop='counterMan'>
                 省级审核
                </el-form-item>
                <el-form-item class='edit-form' 
                  label="审核人：" 
                  prop='ProvincialPanel_Sign  '>
                  {{QualityInfo.ProvincialPanel_Sign  }}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核时间：" 
                  prop='ProvincialAuditTime'>
                  {{QualityInfo.ProvincialAuditTime}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="审核意见：" 
                  prop='ProvincialPanel_AuditOpinion'>
                  {{QualityInfo.ProvincialPanel_AuditOpinion}}
              </el-form-item>
            </div>
        </el-form>
      </el-card>

        <el-card v-if="lookAll" class="myHeight" :body-style="{ padding: '0px' }">
          <header class="infoTop">归档信息</header>
          <el-form 
                style="padding:8px 15px;"
                label-width="110px" 
                :data="IdentificationRecord"
                :model="IdentificationRecord">
            <div class="info3">
                <el-form-item class='edit-form' 
                  label="项目名称：" 
                  prop='ProjectName'>
                  {{IdentificationRecord.ProjectName}}
               </el-form-item>
              <el-form-item class='edit-form' 
                  label="档案编号：" 
                  prop='FileCode  '>
                  {{IdentificationRecord.FileCode}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="归档人：" 
                  prop='ArchivePeople'>
                  {{IdentificationRecord.ArchivePeople}}
              </el-form-item>
              <el-form-item class='edit-form' 
                  label="归档时间：" 
                  prop='FilingTime'>
                  {{IdentificationRecord.FilingTime}}
              </el-form-item>
            </div>
        </el-form>
        <div class="btn" v-if="lookAll">
         <!--  <el-button type="primary" @click='submitView()'>提交</el-button> -->
          <el-button type="primary" @click='reBack()'>返回</el-button>
        </div>
    </el-card>
</div>
</div>
</template>
<script>
  import ProjectFileJs from './ProjectFile.js';
  module.exports = ProjectFileJs;
</script>
<style>
.myHeoght{
  min-height: 180px;
  height:auto;
}
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

.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
}
.info3{
  width:33%;
  text-align: left;
  float:left;
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
  height: 20px;
}
 .btn{
      width:100%;
      height: 40px;
      float: left;
      background: transparent;
      border:none;
      margin:100px auto;
      margin-bottom: 35px;
      text-align: center;
    }
</style>
