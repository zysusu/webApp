module.exports = {
    name: 'roleManage',
    data() {
      return {
        user_list:[],
        defaultProps: {
          children: 'child',
          label: 'CuitMoon_ModuleName',
        //   id: 'CuitMoon_ModuleID',
      },
      roleinfo: {
                role  : '',
                descript   : '',
            },
            rules : {
                role : [{
                    required: true,
                    message : '角色名不能为空！',
                    trigger : 'blur'
                }],

        },
        show_add:false,
        can:[],
        tableData: [{
            role:"11",
            description:"222"
        },{
            role:"11",
            description:"222"
        }],
        search_data:[],
        role:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
  },
  methods: {
		getList() {
    		this.axios.post("/index.php?r=System/role/get-roles")
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
            	this.tableData = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},
        /**
         * 删除角色操作
         * @param  {[type]} index 索引
         * @param  {[type]} row   所有role
         * @return {[type]}       [description]
         */
		deleteRole(index,row) {
            this.$confirm('你确定删除该角色吗?', '删除角色', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post("/index.php?r=System/role/delete-role",{role:row[index].role})
                .then((res) => {
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
                    row.splice(index, 1);
                    this.$message({
                		showClose: true,
                		message  : hh.msg,
                		type     : 'success'
                	});
                }else if(hh.status==404){
                	this.$message({
                		showClose: true,
                		message  : hh.msg,
                		type     : 'error'
                	});
                }
                });
            });
		},
        getPermission(index,row){
            this.role = row[index].role;
            this.axios.post("/index.php?r=System/role/get-permission",{role:row[index].role})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){

                this.dialogTableVisible = true;
                this.data2 = hh.data;
                this.can.length = 0;
                this.addCan(hh.data);
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        addCan(data)
        {
            for(var key in data)
            {
                this.addCan(data[key].child);
                if(data[key].permission == 1)
                    this.can[this.can.length] = data[key].CuitMoon_ModuleURL;
            }

        },
        savePermission(){
            var data = this.$refs.Tree.getCheckedNodes();
            var arr = new Array();
            for(var key in data)
            {
                arr[arr.length] = data[key].CuitMoon_ModuleURL;
            }
            this.axios.post("/index.php?r=System/role/create-empowerment",{role:this.role,empowerment:arr})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        onSubmit(role){
            this.axios.post("/index.php?r=System/role/create-role",role)
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'success'
                });
                this.$router.push('/module/sys/roleManage');
                window.location.reload();
            }else if(hh.status==404){
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
		this.getList();
	},
    watch: {
        '$route' (to, from) {
            this.getList();
            //this.getTheMenu();
            //this.initLeftTree();
        }
    }
  }
