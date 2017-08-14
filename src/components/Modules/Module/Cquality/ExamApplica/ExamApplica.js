import {
   gbs
} from 'config/settings.js';
module.exports = {
	name   : 'examApplica',
	data() {
		return {
			imageSrc:'',
			editFlag:false,  //判断是否为审批
			viewBh:'',  //审核要传的ID
			showAll:false,
			applica:[{ApplyPerson:'测试数据'}],
			search_data:{
				username:'',
			},
			tableData:{},  //证书表格
			applyData:{}, //企业信息
			productInfo:{},  //企业信息
			localInfo:{},  //产地信息
			expertView:{},  //专家审核
			totalNum:0,
			pageSize:10,
			users_rules: {
				CuitMoon_UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}]
			}
		}
	},
	methods: {
		save_user(userlist) {
			var _this = this;
	            this.axios.post("/index.php?r=System/user/add-user",userlist)
	            .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
	                	alert("添加成功！");
	                	//this.$router.push('/module/sys/modManage');
	            }
	        });
		},
		/*showMore(obj,index){
			this.showAll = true;
		},*/
		showMore(obj){
			var bh = obj.ApplyBh;
			var _this = this;
			this.editFlag = false;
			this.showChild = true;
			this.showAll = true;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply-one',{ApplyBh:bh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.applyData = hh.data;
			});
		},
		editView(obj){
			var bh = obj.ApplyBh;
			this.viewBh = obj.ApplyBh;
			var _this = this;
			this.editFlag = true;
			this.showChild = true;
			this.showAll = true;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply-one',{ApplyBh:bh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.applyData = hh.data;
			});
		},
		submitView(obj,num){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/authentication/pass-apply',
				{ApplyBh:_this.viewBh,Opinion:obj.Opinion,Header:obj.Header,pass:num})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status==200){
					_this.showAll = false;
					_this.getView();
				}else{
					this.$message({
                        showClose: true,
                        message  : '审核失败',
                        type     : 'error'
                    });
				}
			});
		},
		onChangeDate(val) {
			this.user_list.CuitMoon_UserBirthday = val;
		},
		reset_user(userdata) {
			this.$refs[userdata].resetFields();
		},
		reBack(){
			this.showAll = false;
		},
		getView(){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply',{pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.totalNum = hh.data.total;
				_this.applica = hh.data.apply;
			});
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-certificate')
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.tableData = hh.data;
			});
		},
		handleCurrentChange(val){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply',{pagesize:_this.pageSize,pagenum:val})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.totalNum = hh.data.total;
				_this.applica = hh.data.apply;
			});
		},
	},
	mounted() {
		this.imageSrc = gbs.host;
		this.getView();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}