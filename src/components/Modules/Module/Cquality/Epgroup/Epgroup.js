module.exports = {
	name   : 'epgroup',
	data() {
		return {
			pageSize:10,
			totalNum:0,
			treeList:[],   //左侧产品树
			groupList:[],  //首页显示的数组
			search_data:{
				username:'',
			},
			rightFlag:false,  //是否有添加权限
			addBtn:true,
			add_flag:0,
			ExpertLevel:'',
			groupInfo:{
				ExpertLevel:'',
				expertsID: "",
				groupMember: [],
				grouper: "",
				ApplyBh: "",
				Remark: ""
			},
			level_Lists:[],  //级别的数组
			peopleList:[],  //选择专家组后获取成员
			add_Lists:[],
			group_rules: {
				CuitMoon_UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}]
			},
			groups:[],   //专家组下拉框
		}
	},
	methods: {
		getView(){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/allocation-expertsgroup/get-apply-list')
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status===200){
					_this.treeList = hh.data;
				}
			});
		}, 
		onAdd(){
			var Bh = this.groupInfo.ApplyBh;
			var _this = this;
			if(Bh){
				this.axios.post('index.php?r=ClimateQuality/allocation-expertsgroup/add-expertsgroup-view',{ApplyBh:Bh})
				.then((res)=>{
				var hh = JSON.parse(res.request.response);
					_this.level_Lists = hh.data.expertsLevel;
					if(hh.data.expertsLevel =='没有权限'){
						_this.add_flag = 0;
						this.$message({
	                    showClose: true,
	                    message  : '没有权限',
	                    type     : 'error'
                	});
					}else{
						_this.add_flag = 1;
						//_this.groupInfo.ExpertLevel = hh.data.expertsLevel[0];
					}
				});
			}else{
				this.$message({
                    showClose: true,
                    message  : '请先选择认证产品！',
                    type     : 'error'
                });
			}
		},
		showGroups(val){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/allocation-expertsgroup/get-expertsgroup-by-level',{ExpertLevel:val})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
					_this.add_Lists = hh.data;	
					//_this.groupInfo.expertsID = hh.data[0].expertsName;
			});
		},
		showPeople(val){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/allocation-expertsgroup/get-experts',{expertsID:val})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
					_this.peopleList = hh.data.expertsPerson;	
			});
		},
		getGroups(Bh){
			var _this = this;
			this.add_flag = 0;
			this.groupInfo.ApplyBh = Bh;
			this.axios.post('/index.php?r=ClimateQuality/allocation-expertsgroup/get-apply',{ApplyBh:Bh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
					_this.groupList = hh.data.climate;
				if(hh.data.roleAdd=='无添加权限'){
					_this.addBtn = false;
				}else{
					_this.addBtn = true;
				}
			});
		},
		handleCurrentChange(val){
            var _this = this;
            var Bh = this.groupInfo.ApplyBh;
            this.axios.post('/index.php?r=ClimateQuality/allocation-expertsgroup/get-apply',{ApplyBh:Bh,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                this.totalNum = hh.data.total;
                this.groupList = hh.data.businessList;
            });
        },  
		updateGroup(obj){
			this.axios.post("/index.php?r=ClimateQuality/allocation-expertsgroup/get-edit",{Experts_Num:obj.Experts_Num})
                .then((res) => {  
                	var _this = this;
                var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                       _this.groupInfo = hh.data.climate;
                       _this.add_flag = 1;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
                })
		},
		save_info(obj){
			/*console.log(obj);
			alert(obj.groupMember);
			alert(obj.grouper);*/
			this.axios.post("/index.php?r=ClimateQuality/allocation-expertsgroup/add-expertsgroup",obj)
                .then((res) => {  
                var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.add_flag = 0;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
                })
		},
		deleteGroup(obj,index){
			var num = obj.Experts_Num;
			this.$confirm('你确定删除 '+obj.Experts_Class+' 么?', '删除专家组', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.axios.post("/index.php?r=ClimateQuality/allocation-expertsgroup/delete-expertsgroup",{Experts_Num:num})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.groupList.splice(index, 1);
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
		onChangeDate(val) {
			this.user_list.CuitMoon_UserBirthday = val;
		},
		reset_user(userdata) {
			this.$refs[userdata].resetFields();
		},
		reBack(){
			this.add_flag = 0;
			//this.$router.push('/module/sys/userManage');
		},
	},
	mounted() {
		this.getView();
		//this.getGroups();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}