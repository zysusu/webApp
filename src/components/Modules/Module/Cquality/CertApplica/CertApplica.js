import {
   gbs
} from 'config/settings.js';
module.exports = {
	name   : 'certApplica',
	data() {
		return {
			imageSrc:'',
			applyList:[],
			applyData:{},  //查看详情
			scoreData:[],
			search_data:{
				username:'',
			},
			tableData:[],  //证书列表
			showChild:false,
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
		onAdd(){
			this.$router.push('/module/cquality/apply');
		},
		getView(){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply',{pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.totalNum = hh.data.total;
				_this.applyList = hh.data.apply;
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
				_this.applyList = hh.data.apply;
			});
		},
		upData(applyBh){	
			this.axios.post('/index.php?r=ClimateQuality/authentication/report-apply',{ApplyBh:applyBh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        window.location.reload();
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                  }
			});
		},
		showMore(applyBh){
			var _this = this;
			this.showChild = true;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply-one',{ApplyBh:applyBh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.applyData = hh.data;
				// this.totalNum = hh.data.total;
				// this.applyList = hh.data.apply;
			});
		},
		showUpdate(applyBh){
			this.$router.push('/module/cquality/apply?'+applyBh);
		},
		deleteData(obj){
            this.$confirm('你确定删除 '+obj.unityName+' 么?', '删除申请', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.axios.post("/index.php?r=ClimateQuality/authentication/delete-apply",{ApplyBh:obj.ApplyBh})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        window.location.reload();
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
                })
            });
		},
		save_user(userlist) {
			console.log(userlist);
			 		//var _this = this;
			 		alert(1);
	                this.axios.post("/index.php?r=System/user/add-user",userlist)
	                .then((res) => {  
	                var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
	                	alert("添加成功！");
	                	this.$router.push('/module/sys/modManage');
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
			this.showChild = false;
		},
	},
	mounted() {
		this.imageSrc = gbs.host;
		this.getView();
	},

	watch: {
		$route(to, from){
			//this.getView(1);
		}
	}
}