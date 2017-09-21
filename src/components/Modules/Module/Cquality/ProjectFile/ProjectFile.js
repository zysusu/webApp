module.exports = {
	name   : 'projectFile',
	data() {
		return {
			 totalNum:0,
			 pageSize:10,
			 searchFlag:false,
			 addFlag:false,
			addChild:false,
			fileData:[],
			lookAll:false,  //详情页面
			Apply:{},
			noFileList:[],  //未归档项目
			BearInfo:[],
			fileInfo:{
				FileCode: "",
				ApplyBh: "",
				ProjectName: "",
				ArchivePeople: "",
				Remark: "",
			},
			productInfo:{},
			QualityIdentification:{},  //实施方案信息
			ClimateQuality:{},  //专家组信息
			IdentificationRecord:{},  //归档信息
			expertmark:{},  //专家打分
			search_data:{
				Name:'',
			},
			add_data:{
				addName:'',  //选中的未归档项目
			},
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
			this.axios.post('/index.php?r=ClimateQuality/dividefile/index',{pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.fileData = hh.data.IdentificationRecord;
				 _this.totalNum = parseInt(hh.data.total);
			});
			//获取未归档信息
			this.axios.post('/index.php?r=ClimateQuality/dividefile/not-gd')
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.noFileList = hh.data;
			});
		},
		handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/dividefile/index',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.fileData = hh.data.IdentificationRecord;
        	});
		}, 
		showMore(obj){
			//this.addChild = true;
			var _this = this;
			var num = obj.Record_Num;
			this.lookAll = true;
			this.axios.post('/index.php?r=ClimateQuality/dividefile/view',{Record_Num:num})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				//_this.noFileList = hh.data;
				_this.Apply = hh.data.Apply;
				_this.QualityInfo = hh.data.QualityIdentification;
				_this.QualityIdentification = hh.data.QualityIdentification;
				_this.ClimateQuality = hh.data.ClimateQuality;
				_this.IdentificationRecord = hh.data.IdentificationRecord;
				_this.expertmark = hh.data.expertmark;

			});
		},
		onAdd(){
			var id = this.add_data.addName;
			if(id){
				 this.fileInfo.FileCode = "",
				 this.fileInfo.ProjectName = '',
				 this.fileInfo.ArchivePeople = '',
				 this.fileInfo.Remark = '',
				 this.addChild = true;
				 this.fileInfo.ApplyBh = id;
				 this.addFlag = true;
			}else{
				this.$message({
					type:'error',
					message:'请先选择待归档的项目！'
				});
			}	
		},
		addFile(obj){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/dividefile/add',_this.fileInfo)
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status===200){
					this.$message({
						type:'success',
						message:hh.msg,
					});
					_this.addChild = false;
					_this.lookAll = false;
					_this.getView();
					//window.location.reload();
				}else{
					this.$message({
						type:'error',
						message:hh.msg,
					});
				}
			});
		},
		updateFile(obj){
			this.addChild = true;
			this.fileInfo = obj;
			this.addFlag = false;
			this.fileInfo.Record_Num = obj.Record_Num;
			//this.fileInfo.GetTime = obj.FilingTime;
		},
		update_File(info){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/dividefile/update2',info)
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status===200){
					this.$message({
						type:'success',
						message:hh.msg,
					});
					_this.addChild = false;
					_this.lookAll = false;
					_this.getView();
				//	window.location.reload();
				}else{
					this.$message({
						type:'error',
						message:hh.msg,
					});
				}
			});
		},
		deleteFile(obj,index){
			var id = obj.Record_Num;
			this.$confirm('你确定删除项目'+obj.ProjectName+'吗？', '删除新闻', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				this.axios.post('/index.php?r=ClimateQuality/dividefile/delete',{Record_Num:id})
				.then((res)=>{
					var hh = JSON.parse(res.request.response);
					if(hh.status===200){
						this.$message({
							type:'success',
							message:hh.msg,
						});
						this.fileData.splice(index,1);
					}else{
						this.$message({
							type:'error',
							message:hh.msg,
						});
					}
				});	
			});
		},
		onSearch(val) {
            var name = this.search_data.Name;
            this.searchFlag = true;
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/dividefile/search',{ProjectName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                    	_this.totalNum = parseInt(hh.data.total);
                        _this.fileData = hh.data.IdentificationRecord;
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
            this.axios.post('/index.php?r=ClimateQuality/dividefile/search',{ProjectName:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.fileData = hh.data.IdentificationRecord;
        	});
		}, 
		getTime(val){
			this.fileInfo.GetTime = val;
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
			this.addChild = false;
			this.lookAll = false;
			//this.$router.push('/module/sys/userManage');
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