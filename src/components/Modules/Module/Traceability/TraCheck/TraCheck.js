import {
   gbs
} from 'config/settings.js';
module.exports = {
	name   : 'traCheck',
	data() {
		return {
			 totalNum:0,
			 pageSize:10,
			 searchFlag:false,
			 imageSrc:'',
			scoreData:[],
			tableData:[],
			showCheck:false,
			product_list:[],
			productInfo:{},
			credenInfo:{},//证书信息
			originID:'',
			opinion:{
				'Person':'',
				'Advice':''
			}, //审核意见
			initOpinion:{
				'Person':'',
				'Advice':''
			},
			search_data:{
				Name:'',
			},
			showAdd:false,
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
		},
		getView(){
			let _this = this;
			 this.axios.post("/index.php?r=origin/approval/index",{pagesize:_this.pageSize,pagenum:1})
	         .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            	if(hh.status==200){
		            	_this.product_list = hh.data.Productapply;	
		             	_this.totalNum = parseInt(hh.data.total);	
	            	} 
	            });
		},
		handleCurrentChange(val){
		 	let _this = this;
			 this.axios.post("/index.php?r=origin/approval/index",{pagesize:_this.pageSize,pagenum:val})
	         .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	             	if(hh.status==200){
	            	_this.product_list = hh.data.Productapply;	
	             	_this.totalNum = parseInt(hh.data.total);	
	            } 	
	            });
		 },
		onShow(){
			this.showCheck = true;
		},
		showInfo(info){
			this.showCheck = true;
			this.originID = info.OriginID;
			this.productInfo = info;
			this.credenInfo = info;
			var _this = this;
			var User = info.ApplyPerson;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-certificate',{user:User})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.tableData = hh.data;
			});
		},
		onSearch() {
			this.searchFlag = true;
			var _this = this;
			var name = _this.search_data.Name;
            this.axios.post("/index.php?r=origin/approval/search",{OriginName:name,pagesize:_this.pageSize,pagenum:1})
             .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                	_this.product_list = hh.data.Productapply;	
	             	_this.totalNum = parseInt(hh.data.total);	
                }
                else{
 					this.$message({ 
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
               	}
                   
            });
		},
		handleCurrentChange2(val){
			var _this = this;
			var name = _this.search_data.Name;
            this.axios.post("/index.php?r=origin/approval/search",{OriginName:name,pagesize:_this.pageSize,pagenum:val})
             .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                	_this.product_list = hh.data.Productapply;	
	             	_this.totalNum = parseInt(hh.data.total);	
                }
                else{
 					this.$message({ 
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
               	}
                   
            });
		},
		save_info(info,val){
			var _this = this;
			 this.axios.post("/index.php?r=origin/approval/approval",
			 {
			 	Advice:info.Advice, 
			 	Person:info.Person, 
			 	OrignStatus:val,
			 	OriginID:_this.originID
			 })
	         .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	             	if(hh.status===200){
	             		this.showCheck = false;
	             		this.$message({
                            showClose: true,
                            message  : "审核成功",
                            type     : 'success'
                        });
                       this.getView(); 
	             	}else{
	             		this.$message({
                            showClose: true,
                            message  : "审核失败",
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
			this.showCheck = false;
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