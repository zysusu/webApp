<template>
    <div class="form">
<!--          <div id="mainText"> -->
            <el-col v-if="!showCheck" :span="24" class='actions-top'>

            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item label="请输入要查找的产品名称">
                    <el-input
                              v-model='search_data.Name'
                              clear></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

   <el-table
    v-if="!showCheck"
    :data="product_list"
    :module="product_list"
    border
    style="width: 100%">
    <el-table-column
      prop="OriginName"
      label="产品名称"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ProductBrand"
      label="产品品牌"
      align='center'>
    </el-table-column>

    <el-table-column
      prop="ApplyCompany"
      label="申请商家"
      align='center'>
    </el-table-column>

    <el-table-column
      prop="ApplyPerson"
      label="申请人"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="ApplyTime"
      label="申请时间"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="OrignStatus"
      v-if="OrignStatus==='100084' ? false:true" 
      label="操作"
      align='center'>
      <template scope="scope">
            <el-button
            size="small"
            type="warning"
            @click="showInfo(scope.row)">审核</el-button>
      </template>
    </el-table-column>

    <el-table-column
      prop="OrignStatus"
      v-if="OrignStatus==='100084' ? true:false" 
      label="操作"
      align='center'>
      <template scope="scope">
            <el-button
            size="small"
            type="success">通过</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-row>
<div class="block" v-show="!showCheck && !searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange'>
      </el-pagination>
</div> <!--  分页的div -->
<div class="block" v-show="!showCheck && searchFlag" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
</div> <!--  分页的div -->
</el-row>

   <el-row v-if="showCheck">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div>
              <header class="infoTop">产品信息</header>
              <div style="padding: 14px;" class="bottom">
              <el-form
                  label-width="100px" 
                  :model="productInfo"
                  :rules="add_rules"
                  ref='productInfo'>
              <div class="info1">
                  <el-form-item class='edit-form' 
                      :disabled='true'
                      label="单位名称：" 
                      prop='ApplyCompany'>
                   {{productInfo.ApplyCompany}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产品名称：" 
                      prop='OriginName'>
                         {{productInfo.OriginName}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产品产值：" 
                      prop='ProductValue'>
                        {{productInfo.productvalue}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="手机号码：" 
                      prop='Constract'>
                        {{productInfo.Constract}}
                  </el-form-item>
                  <el-form-item class="edit-form" 
                      label='产品描述：'
                      prop='OriginDescription'>
                        {{productInfo.OriginDescription}}
                  </el-form-item>
              </div>
              <div class="info2">
                   <el-form-item class='edit-form' 
                      :disabled='true'
                      label="申请人：" 
                      prop='ApplyPerson'>
                         {{productInfo.ApplyPerson}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产品品牌：" 
                      prop='ProductBrand'>
                        {{productInfo.ProductBrand}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="生产地址：" 
                      prop='OriginAddress'>
                       {{productInfo.OriginAddress}}
                  </el-form-item>

                  <el-form-item class='edit-form' 
                      label="产品产量：" 
                      prop='ProductNum'>
                        {{productInfo.ProductNum}}
                  </el-form-item>
                     <el-form-item class='edit-form' 
                      label="申请标签数量：" 
                      prop='LabelNum'>
                        {{productInfo.LabelNum}}
                  </el-form-item>
              </div>
              </el-form>
              </div>
          </div>
        </el-card>
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

      <el-card :body-style="{ padding: '0px' }">
        <div>
            <header class="infoTop">审核意见</header>
            <div style="padding: 14px;" class="bottom">
            <el-form
                label-width="100px" 
                :model="opinion"
                ref='opinion'>

              <span class="info1">
                  <el-form-item class='edit-form' 
                      label="审核人签名：" 
                      prop='Person'>
                      <el-input
                              v-model="opinion.Person"></el-input>
                  </el-form-item>
              </span>
              <span class="info2">
                   <el-form-item class='edit-form' 
                      label="审核意见：" 
                      prop='Advice'>
                      <el-input
                              v-model="opinion.Advice"></el-input>
                  </el-form-item>
                   <!-- <el-form-item style="width:100%; margin-top: 20px; text-align: center;">
                      <el-button type="success" @click='save_info(opinion,"通过")'>通过</el-button>
                      <el-button type="danger" @click='save_info(opinion,"不通过")'>不通过</el-button>
                      <el-button type="primary"
                                 @click='reBack()'>返回</el-button>
                    </el-form-item> -->
              </span>
            </el-form>
              <div style="width:100%; margin: 20px; margin-bottom: 30px;
              float:left; text-align: center;">
                 <el-button type="success" @click='save_info(opinion,"通过")'>通过</el-button>
                      <el-button type="danger" @click='save_info(opinion,"不通过")'>不通过</el-button>
                      <el-button type="primary"
                                 @click='reBack()'>返回</el-button>
              </div>
           </div>
           </div>
         </el-card>

      </el-col>
    </el-row>
<!--   </div> --> <!-- mainText -->
</div>
</template>
<script>
    import TraCheckJs from './TraCheck.js';
    module.exports = TraCheckJs;
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
  width:24%;
  text-align: center;
  border:1px solid #ccc;
  min-height: 40px;
}
.picTable th{
  background-color: #96CB33;
}

.info1,.info2{
    float:left;
    margin:10px;
    width:46%;
    min-width:300px;
}
.info3{
  width:100%;
  margin:20px;
  text-align: center;
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
    }
.el-card{
  margin-bottom: 10px;
}
</style>
