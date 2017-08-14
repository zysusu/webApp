<template>
<!-- 数据展示 -->
<div>
	<el-select v-model="type" @change="typeChange" placeholder="请选择" v-if="active==1">
		<el-option v-for="item in applyType" :key="item.CuitMoon_DictionaryCode" :label="item.CuitMoon_DictionaryName" :value="item.CuitMoon_DictionaryCode">
		</el-option>
	</el-select>

	<div style="width:100%" v-if="active==1" >
		<el-table :data="productsData" stripe style="min-width: 100%">
			<el-table-column prop="ProductName" label="产品名称">
			</el-table-column>
			<el-table-column prop="ProductBrand" label="产品品牌">
			</el-table-column>
			<el-table-column prop="applyTime" label="申请时间">
			</el-table-column>
            <!-- <el-table-column prop="resType" label="认证类型" min-width="25%">
			</el-table-column> -->
			<el-table-column prop="" label="管理申请">
				<template scope="scope">
                       <el-button
                       size="small"
                       type="primary"
                       @click="viewApply(scope.$index,productsData)">管理申请</el-button>
                 </template>
			</el-table-column>

			<el-table-column prop="" label="管理领用">
				<template scope="scope">
                       <el-button
                       size="small"
                       type="primary"
                       @click="getManage(scope.$index,productsData)">管理领用</el-button>
                 </template>
			</el-table-column>

			<el-table-column prop="" label="管理标签">
				<template scope="scope">
                       <el-button
                       size="small"
                       type="primary"
                       @click="manageLabel(scope.$index,productsData)">管理标签</el-button>
                 </template>
			</el-table-column>

		</el-table>
		<el-pagination 
      layout="prev, pager, next" 
      :total="total" 
      :current-page="pagenum"
		@current-change="getProducts" :page-size="pagesize">
		</el-pagination>


	</div>

	<el-button
	:plain="true"
	type="success"
	v-if="active!=1 && active!=5"
	@click="active=1">返回</el-button>
	<el-button
	:plain="true"
	type="success"
	v-if="active==5"
	@click="active=4">返回</el-button>

	<el-table :data="LabelApplicationData" stripe border style="width: 100%" v-if="active==2">
		<el-table-column prop="ApplyPerson" label="申请商家">
		</el-table-column>
		<el-table-column prop="applyType" label="标签类型">
		</el-table-column>
		<el-table-column prop="Confirmor" label="申请数量">
		</el-table-column>
		<el-table-column prop="piCi" label="申请批次">
		</el-table-column>

		<el-table-column prop="ApplyTime" label="申请时间">
		</el-table-column>
		<el-table-column prop="LabelMakeStatus" label="制作状态">
		</el-table-column>
		<el-table-column prop="" class="longBtn" style="min-width:190px !important;" label="管理标签">
			<template scope="scope">
				   <el-button
				   size="small"
				   type="primary"
				   v-if="LabelApplicationData[scope.$index].LabelMakeStatus=='制作完成'"
				   @click="downloadLabel(scope.$index,LabelApplicationData)">下载</el-button>
				   <el-button
				  size="small"
				  type="danger"
				  v-if="LabelApplicationData[scope.$index].LabelMakeStatus=='未制作'"
				  @click="makeLabel(scope.$index,LabelApplicationData)">制作</el-button>
				  <el-button
				  size="small"
				  type="primary"
				  @click="updateLabel(scope.$index,LabelApplicationData)">编辑</el-button>
				  <el-button
				  size="small"
				  type="danger"
				  @click="deleteLabel(scope.$index,LabelApplicationData)">删除</el-button>
			 </template>
		</el-table-column>
	</el-table>
	<el-pagination layout="prev, pager, next" v-if="active==2" :total="totalLabel" :current-page="pagenumLabel"
	@current-change="" :page-size="pagesizeLabel">
	</el-pagination>

	<el-table :data="LYdata" stripe border style="min-width: 100%" v-if="active==3">
		<el-table-column prop="ReceivePerson" label="领用人">
		</el-table-column>
		<el-table-column prop="ReceiveAmount" label="领用数量">
		</el-table-column>
		<el-table-column prop="ReceiveTime" label="领用时间">
		</el-table-column>

		<el-table-column prop="" label="管理标签">
			<template scope="scope">
				  <el-button
				  size="small"
				  type="primary"
				  @click="updateLY(scope.$index,LYdata)">编辑</el-button>
				  <el-button
				  size="small"
				  type="danger"
				  @click="deleteLY(scope.$index,LYdata)">删除</el-button>
			 </template>
		</el-table-column>
	</el-table>
	<el-pagination layout="prev, pager, next" v-if="active==3" :total="totalLY" :current-page="pagenumLY"
	@current-change="getLYManage" :page-size="pagesizeLY">
	</el-pagination>


	<el-table :data="recordData" border stripe style="width: 100%" v-if="active==4">
		<el-table-column prop="LabelQueryID" label="标签编号">
		</el-table-column>
		<el-table-column prop="MakeTime" label="制作时间">
		</el-table-column>
		<el-table-column prop="LabelStatus" label="标签状态">
		</el-table-column>
		<el-table-column prop="ScanNum" label="扫描次数">
		</el-table-column>
		<el-table-column prop="Abnormal" label="是否异常">
		</el-table-column>

		<el-table-column prop="AbnormalType" label="异常类型">
		</el-table-column>

		<el-table-column prop="" label="查看扫描记录">
			<template scope="scope">
				  <el-button
				  size="small"
				  type="primary"
				  @click="viewRecord(scope.$index,recordData)">查看</el-button>
			 </template>
		</el-table-column>
		<el-table-column prop="" label="操作">
			<template scope="scope">
				  <el-button
				  size="small"
				  type="primary"
          style="float:left"
				  @click="updateRecord(scope.$index,recordData)">编辑</el-button>
				  <el-button
				  size="small"
				  type="danger"
           style="float:left"
				  @click="deleteRecord(scope.$index,recordData)">删除</el-button>
			 </template>
		</el-table-column>
	</el-table>
	<el-pagination layout="prev, pager, next" v-if="active==4" :total="totalRecord" :current-page="pagenumRecord"
	@current-change="getRecord" :page-size="pagesizeRecord">
	</el-pagination>


	<!-- 管理标签 -->
	<el-table :data="scanData" stripe border align='center' style="min-width: 100%" v-if="active==5">
		<el-table-column prop="ScanID" label="扫描序号">
		</el-table-column>
		<el-table-column prop="ScanTime" label="扫描时间">
		</el-table-column>
		<el-table-column prop="ScanPlace" label="扫描地点">
		</el-table-column>
	</el-table>
	<el-pagination layout="prev, pager, next" v-if="active==5" :total="totalScan"
	:current-page="pagenumScan"
	@current-change="getRecord" :page-size="pagesizeScan">
	</el-pagination>

	<el-dialog title="编辑申请" :visible.sync="dialogTableVisible">
		<el-form :label-position="a" label-width="80px" :model="Labelapplication">
		<el-form-item label="申请商家">
		<el-input v-model="Labelapplication.ApplyPerson"></el-input>
		</el-form-item>
		<el-form-item label="标签类型">
		<el-input v-model="Labelapplication.applyType"></el-input>
		</el-form-item>
		<el-form-item label="申请数量">
		<el-input v-model="Labelapplication.inTotal"></el-input>
		</el-form-item>
		<el-form-item label="标签规格">
		<el-input v-model="Labelapplication.Format"></el-input>
		</el-form-item>
		<el-form-item label="申请时间">
		<!-- <el-input v-model="Labelapplication.ApplyTime"></el-input> -->
		<el-date-picker
	      v-model="Labelapplication.ApplyTime"
	      type="datetime"
	      placeholder="选择日期"
	      :picker-options="pickerOptions0">
	    </el-date-picker>
		</el-form-item>
		<!-- <el-form-item label="制作状态">
		<el-input v-model="Labelapplication.LabelMakeStatus"></el-input>
		</el-form-item> -->
		<el-form-item label="申请理由">
		<el-input v-model="Labelapplication.ApplyReason"></el-input>
		</el-form-item>

		</el-form>
	  <br>
	  <el-button
	  :plain="true"
	  type="success"
	  @click="saveApply()">修改</el-button>
	</el-dialog>

	<el-dialog title="编辑领用" :visible.sync="cansee">
		<el-form :label-position="a" label-width="80px" :model="Labelproviderecord">
		<el-form-item label="领用人">
		<el-input v-model="Labelproviderecord.ReceivePerson"></el-input>
		</el-form-item>
		<el-form-item label="领用数量">
		<el-input v-model="Labelproviderecord.ReceiveAmount"></el-input>
		</el-form-item>
		<el-form-item label="领用时间">
		<!-- <el-input v-model="Labelproviderecord.ReceiveTime"></el-input> -->
		<el-date-picker
	      v-model="Labelproviderecord.ReceiveTime"
	      type="datetime"
	      placeholder="选择日期"
	      :picker-options="pickerOptions0">
	    </el-date-picker>
		</el-form-item>
		</el-form>
	  <br>
	  <el-button
	  :plain="true"
	  type="success"
	  @click="saveLY()">修改</el-button>
	</el-dialog>

	<el-dialog title="编辑标签" :visible.sync="recordCansee">
		<el-form :label-position="a" label-width="80px" :model="Labermanagement">
		<el-form-item label="扫描次数">
		<el-input v-model="Labermanagement.ScanNum"></el-input>
		</el-form-item>
		<el-form-item label="标签状态">
			<el-select v-model="Labermanagement.LabelStatus" placeholder="请选择">
			   <el-option
				 v-for="item in optionss"
				 :key="item.value"
				 :label="item.value"
				 :value="item.value">
			   </el-option>
			 </el-select>
		<!-- <el-input v-model="Labermanagement.LabelStatus"></el-input> -->
		</el-form-item>
		<el-form-item label="是否正常">
		<!-- <el-input v-model="Labermanagement.Abnormal"></el-input> -->
		<el-select v-model="Labermanagement.Abnormal" placeholder="请选择">
		   <el-option
			 v-for="item in options"
			 :key="item.value"
			 :label="item.value"
			 :value="item.value">
		   </el-option>
		 </el-select>
		</el-form-item>
		<el-form-item label="异常类型">
		<el-input v-model="Labermanagement.AbnormalType"></el-input>
		</el-form-item>

		</el-form>
	  <br>
	  <el-button
	  :plain="true"
	  type="success"
	  @click="saveRecord()">修改</el-button>
	</el-dialog>
</div>
</template>
<script>
import LabelManageJS from './LabelManage.js';
module.exports = LabelManageJS;
</script>
<style>
table tr,table td,table th{
  text-align: center;
}
table th{
  text-align: center!important;
}

</style>
