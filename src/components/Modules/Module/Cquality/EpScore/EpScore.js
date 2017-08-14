module.exports = {
	name   : 'ePscore',
	data() {
		return {
			scoreData:[],
			search_data:{
				Name:'',
			},
			subAppBh:'',  //提交时需要传的bh
			subFlag:true,
			pageSize:10,
			totalNum:0,
			ProductName:false,
			tableData:[],
			showMore:false,
			addScore:false,
			scoreTable:[],
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
		getView(){
			var _this = this;
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/get-apply-list",{pagesize:_this.pageSize,pagenum:1})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
	                	_this.totalNum = parseInt(hh.data.total);
	                	_this.scoreData = hh.data.apply;
	                }
	        });
		},
		 handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/expert-rating/get-apply-list',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.scoreData = hh.data.apply;
            });
        },   
		showAll(obj){
			var _this = this;
			var Bh = obj.ApplyBh;
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/get-expertgrade",{ApplyBh:Bh})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            if(hh.status===200){
	               _this.tableData = hh.data;
	            }
	        });
			this.showMore = true;
		},
		onSearch(){
			var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=ClimateQuality/expert-rating/search',{ProductName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.totalNum = parseInt(hh.data.total);
	                	_this.scoreData = hh.data.apply;
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
            this.axios.post('/index.php?r=ClimateQuality/expert-rating/search',{ProductName:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.totalNum = parseInt(hh.data.total);
	                	_this.scoreData = hh.data.apply;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                }
            });
		},
		saveTable(obj){
			var _this = this;
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/add-climatopeinfo",{data:_this.scoreTable})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            if(hh.status===200){
	               _this.subFlag = false;
	                this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
	            }else{
	            	this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
	            }
	        });
		},
		submitTable(obj){
			var _this = this;
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/add-expertgrade",{ApplyBh:_this.subAppBh,data:_this.scoreTable})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        window.location.reload();
                       //this.addScore = false;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
	        });
		},
		preScore(obj){
			var _this = this;
			var Bh = obj.ApplyBh;
			this.subFlag = true;
			this.subAppBh = Bh;
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/add-expertgrade-view",{ApplyBh:Bh})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            if(hh.status===200){
	               _this.scoreTable = hh.data;
	            }
	        });
			this.addScore = true;
		},
		
		onChangeDate(val) {
			this.user_list.CuitMoon_UserBirthday = val;
		},
		reBack(){
			this.showMore = false;
			this.addScore = false;
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