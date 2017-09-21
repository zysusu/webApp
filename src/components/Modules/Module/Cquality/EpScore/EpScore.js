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
			realElements:[],  //返回的实测气象
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
			/*var num = this.scoreTable.length;
			var submitData = [];
			for(var i=0;i<num;i++){
				var eleData = [];
				var elements = this.scoreTable[i].element;

				for(var j=0; j<elements.length;j++){
					eleData.push(elements[j].ElementName);
				};
				var list =  {
		            "startCollectionTime": this.scoreTable[i].startCollectionTime,
		            "endCollectionTime": this.scoreTable[i].endCollectionTime,
		            "climateStationName":  this.scoreTable[i].climateStationName,
		            "element": eleData
		        }
		        submitData.push(list);
			};*/
			/*this.axios.post("/index.php?r=ClimateQuality/expert-rating/add-climatopeinfo",{submitData})
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
	        });*/
			 /*for(var i=0;i<4;i++){
	        	$(".realEle:eq("+i+")").html(i);
	        }*/
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/add-climatopeinfo",_this.scoreTable)
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	            if(hh.status===200){
	               _this.subFlag = false;
	               _this.realElements = hh.data;
	               var Data = hh.data;
	                for(var i=0;i<Data.length;i++){
	                	if(hh.data[i]!="暂无数据"){
	                		$(".realEle:eq("+i+")").html(hh.data[i]);
	                	}
			        }
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
			var subData = this.scoreTable;
			//因为后台就是这样返回的数据，所以我只能用这种方式加了，哈哈，我也是没办法啦
			//就是把生成要素返回的数组再添加为realEle字段加到原来的数据中，发回给后台
			var k=-1;
			for(var i=0;i<subData.length;i++){
				var theEle = subData[i].element;
				for(var j=0;j<theEle.length;j++){
					k++;
					/*if(i==0){
						var k = i*theEle.length+j;
					}else{
						var k = i*subData[i-1].element.length+j;
					}*/
					theEle[j].realEle = _this.realElements[k];
				}
			};
			this.axios.post("/index.php?r=ClimateQuality/expert-rating/add-expertgrade",{ApplyBh:_this.subAppBh,data:subData})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        _this.showMore = false;
						_this.addScore = false;
                        _this.getView();
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