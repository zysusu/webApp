<template>
<div>
	<el-form v-if="active==1" :inline="true" style="margin-left: 30px; margin-bottom: 0px;" :model="formInline" class="demo-form-inline">
	  <el-form-item label="认证类型：">
	   <el-select v-model="type" @change="typeChange" placeholder="请选择" v-if="active==1">
		<el-option v-for="item in applyType" :key="item.CuitMoon_DictionaryCode" :label="item.CuitMoon_DictionaryName" :value="item.CuitMoon_DictionaryCode">
		</el-option>
	 </el-select>
	  </el-form-item>
	</el-form>

	<div style="width:100%" v-if="active==1" >
		<el-table :data="productsData" stripe style="min-width: 100%">
			<el-table-column prop="ProductName" label="产品名称" min-width="25%">
			</el-table-column>
			<el-table-column prop="ProductBrand" label="产品品牌" min-width="25%">
			</el-table-column>
			<el-table-column prop="applyTime" label="申请时间" min-width="25%">
			</el-table-column>
            <!-- <el-table-column prop="resType" label="认证类型" min-width="25%">
			</el-table-column> -->
			<el-table-column prop="" min-width="25%" label="申请">
				<template scope="scope">
                       <el-button
                       size="small"
                       type="warning"
                       @click="addApply(scope.$index,productsData)">申请</el-button>
                 </template>
			</el-table-column>

			<el-table-column prop="" min-width="25%" label="查看">
				<template scope="scope">
                       <el-button
                       size="small"
                       type="primary"
                       @click="viewApply(scope.$index,productsData)">查看</el-button>
                 </template>
			</el-table-column>

			<el-table-column prop="" min-width="25%" label="溯源预览" v-if="type==1000161">
				<template scope="scope">
                       <el-button
                       size="small"
                       type="primary"
                       @click="originView(scope.$index,productsData)">溯源预览</el-button>
                 </template>
			</el-table-column>

		</el-table>
		<!-- <el-pagination layout="prev, pager, next" :total="total" :current-page="pagenum"
		@current-change="getProducts" :page-size="pagesize">
		</el-pagination> -->
	<div class="block" style="margin:20px 35px; float:right;">
     <el-pagination
        layout="total,prev, pager, next"
        :page-size="pagesize"
        :total="total"
        :current-page="pagenum"
        @current-change='getProducts'>
      </el-pagination>
    </div> <!--  分页的div -->
		<el-dialog title="申请标签" :visible.sync="dialogTableVisible">
			<el-form :label-position="labelPosition" label-width="100px" :model="Labelapplication">
			<el-form-item label="申请数量：">
			<el-input v-model="Labelapplication.inTotal"></el-input>
			</el-form-item>
			<el-form-item label="申请批次：">
			<el-input v-model="Labelapplication.piCi"></el-input>
			</el-form-item>
			<el-form-item label="标签规格：">
			<el-input v-model="Labelapplication.Format"></el-input>
			</el-form-item>
			<el-form-item label="示例图片：">
			<el-upload
			  class="avatar-uploader"
			  :action="imageAction"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			</el-form-item>

			<el-form-item label="申请理由：">
			<el-input type="textarea" v-model="Labelapplication.ApplyReason"></el-input>
			</el-form-item>
			</el-form>
		  <el-button
		  type="primary"
		  style="float:right;"
		  @click="saveApply()">添加</el-button>
		</el-dialog>
	</div>

	<el-button
	style="float:right; margin:10px 30px;"
	type="success"
	v-if="active==2"
	@click="active=1">返回</el-button>
	<el-table :data="LabelApplicationData" stripe style="min-width: 100%" v-if="active==2">
		<el-table-column prop="ApplyPerson" label="申请商家" min-width="25%">
		</el-table-column>
		<el-table-column prop="applyType" label="标签类型" min-width="25%">
		</el-table-column>
		<el-table-column prop="Confirmor" label="申请数量" min-width="25%">
		</el-table-column>
		<el-table-column prop="piCi" label="申请批次" min-width="25%">
		</el-table-column>

		<el-table-column prop="ApplyTime" label="申请时间" min-width="25%">
		</el-table-column>
		<el-table-column prop="LabelMakeStatus" label="制作状态" min-width="25%">
		</el-table-column>
		<!-- <el-table-column prop="" min-width="25%" label="管理标签">
			<template scope="scope">
				   <el-button
				   size="small"
				   type="primary"
				   @click="manageLabel(scope.$index,productsData)">管理标签</el-button>
			 </template>
		</el-table-column> -->

	</el-table>
</div>
</template>
<script>
  import LabelApplyJS from './LabelApply.js';
  module.exports = LabelApplyJS;
</script>

<style scoped>

</style>
