module.exports = {
	name   : 'progress',
	data() {
		return {
			 totalNum:0,
			 pageSize:10,
			 searchFlag:false,
			productInfo:[],
			scoreData:[],
			search_data:{
				Name:'',
			},
			stape:2,
			errFlag:false,  //判断是否显示申请失败
			dialogVisible:false,
		}
	},
	methods: {
		save_user(userlist) {
	                this.axios.post("/index.php?r=System/user/add-user",userlist)
	                .then((res) => {  
	                var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
	                	alert("添加成功！");
	                	  this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
	                }
	                });

		},
		lookMore(obj){
			 this.dialogVisible = true;
			// this.stape = obj.Remark;
			 var _this = this;
			 var Bh = obj.ApplyBh;
			 this.axios.post("/index.php?r=ClimateQuality/progresscheck/view",{ApplyBh:Bh})
	                .then((res) => {  
	                var hh = JSON.parse(res.request.response);
	                {
	                	if(hh.data.DeclareStatus=='2'){
	                		_this.errFlag = true;
	                		_this.stape = hh.data.DeclareStatus;
	                	}else{
	                		_this.stape = hh.data.DeclareStatus;
	                	}
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
			this.$router.push('/module/sys/userManage');
		},
		getView(){
			var _this = this;
			 this.axios.post("/index.php?r=ClimateQuality/progresscheck/index",{pagesize:_this.pageSize,pagenum:1})
	                .then((res) => {  
	                var hh = JSON.parse(res.request.response);
	                	_this.productInfo = hh.data.Apply;
	                	_this.totalNum = parseInt(hh.data.total);
	              });
		  },
		 handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/progresscheck/index',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.productInfo = hh.data.Apply;
        	});
		},
		onSearch(val) {
            var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=ClimateQuality/progresscheck/search',{ProductName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.totalNum = parseInt(hh.data.total);
                		_this.productInfo = hh.data.Apply;
                        _this.searchFlag = true;
                    }else{
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
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=ClimateQuality/progresscheck/search',{ProductName:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.totalNum = parseInt(hh.data.total);
                		_this.productInfo = hh.data.Apply;
                        _this.searchFlag = true;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                       });
                }
            });
        },
	},
	mounted() {
		this.getView();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}