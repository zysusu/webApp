module.exports = {
	name   : 'progressCheck',
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
			dialogVisible:false,
		}
	},
	methods: {
		onSearch(val) {
			var _this = this;
			var name = _this.search_data.Name;
            this.axios.post("/index.php?r=origin/schedule/search",{OriginName:name,pagesize:_this.pageSize,pagenum:1})
             .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                	 _this.totalNum = parseInt(hh.data.total);
                	_this.productInfo = hh.data.Productapply;
                	_this.searchFlag = true;
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
			var name = _this.search_data.Name;
			var _this = this;
			 this.axios.post("/index.php?r=origin/schedule/search",{OriginName:name,pagesize:_this.pageSize,pagenum:val})
	            .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            _this.totalNum = parseInt(hh.data.total);
	          	_this.productInfo = hh.data.Productapply;
	        });
		},
		lookMore(obj){
			 this.dialogVisible = true;
			 this.stape = obj.Remark;
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
			 this.axios.post("/index.php?r=origin/schedule/index",{pagesize:_this.pageSize,pagenum:1})
	            .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            _this.totalNum = parseInt(hh.data.total);
	          	_this.productInfo = hh.data.Productapply;
	        });
		},
		handleCurrentChange(val){
			 this.axios.post("/index.php?r=origin/schedule/index",{pagesize:_this.pageSize,pagenum:val})
	            .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            _this.totalNum = parseInt(hh.data.total);
	          	_this.productInfo = hh.data.Productapply;
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