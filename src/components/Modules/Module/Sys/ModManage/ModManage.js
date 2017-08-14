module.exports = {
    name: 'modManage',
    data() {
        return {
            menu_list:[],
            menuProps:{
                children:'child',
                label:'CuitMoon_ModuleName'
            },
            module_data : {
                CuitMoon_ModuleID : '',
                CuitMoon_ModuleName : '',
                CuitMoon_ModuleURL : '',
                CuitMoon_ParentModuleID : '',
                CuitMoon_ParentModuleName : '',
                CuitMoon_ModuleDescription : '',
                CuitMoon_ModuleStatus : '1',
                CuitMoon_ModuleRemarks : ''
            },
            initModule:{
                CuitMoon_ModuleID : '',
                CuitMoon_ModuleName : '',
                CuitMoon_ModuleURL : '',
                CuitMoon_ParentModuleID : '',
                CuitMoon_ParentModuleName : '',
                CuitMoon_ModuleDescription : '',
                CuitMoon_ModuleStatus : '1',
                CuitMoon_ModuleRemarks : ''
            },
            module_rules: {
                CuitMoon_ModuleName: [{
                    required: true,
                    message : '模块名称不能为空！',
                    trigger : 'blur'
                }],
                CuitMoon_ModuleURL: [{
                    required: true,
                    message : '模块URL不能为空！',
                    trigger : 'blur'
                }],
               /* CuitMoon_ParentModuleID: [{
                    required: true,
                    message : '父模块不能为空！',
                    trigger : 'blur'
                }],*/
                CuitMoon_ModuleDescription: [{
                    required: true,
                    message : '模块描述不能为空！',
                    trigger : 'blur'
                }]
            },
            modules_list: [], //列表数组
            parentID:'',
            showList : false,
            addChild : false,  //判断是否是添加子模块
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            showChild : false,
            //搜索表单信息
            search_data: {
                username: '',
                email: '',
            },

            //详情弹框信息
            dialog: {
                show: false,
                module_data:{},
                //user_info: {}
            },

            //列表过滤性别
            sex_filters: {
                list: [{
                    text: '男',
                    value: '1'
                }, {
                    text: '女',
                    value: 2
                }, {
                    text: '保密',
                    value: 3
                }],
                multiple: false
            },

            //列表过滤状态
            status_filters: {
                list: [{
                    text: '启用',
                    value: '1'
                }, {
                    text: '禁用',
                    value: '0'
                }],
                multiple: false
            },

            checkAll: true,
            checkedCities: ['上海', '北京'],
            cities: ['上海', '北京', '广州', '深圳'],
            isIndeterminate: true,

            accesss: [],
            checkeds: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
            
        }
    },
    methods: {
        showMod(id,child,name,index){
            this.modules_list = child;
            //this.addChild = true;
            this.showList = true;
            this.addChild = false;
            this.parentID = id;
            this.parentName = name;
            $(".childUl:eq(index)").hide();
        },
        /*  showMod(list.CuitMoon_ModuleID,list.child,list.CuitMoon_ModuleName)*/
        handleNodeClick(obj){
            var children = obj.child;
              this.modules_list = obj.child; 
                this.parentID = obj.CuitMoon_ModuleID;
                this.parentName = obj.CuitMoon_ModuleName; 
           /* if(children){
                this.modules_list = obj.child; 
                this.parentID = obj.CuitMoon_ModuleID;
                this.parentName = obj.CuitMoon_ModuleName;    
            }else{
                alert(2);
            }*/
            this.showList = true;
            this.addChild = false;  
        },
        initLeftTree(){
            var _this = this;
            $(document).on('click','.tree li.parent_li > span',function(e){
                _this.showChild = true;
                $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if(children.is(":visible")){
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              }else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                e.stopPropagation();
            });

           $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
           $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              }else{
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                e.stopPropagation();
            });
        },
        handleCheckAllChange(event) {
            this.checkedCities = event.target.checked ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        reBack(){
            this.showList = true;
            this.addChild = false;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        currentChange(data, node) {
            // console.log(data, node);
        },

        nodeClick(data, node, self) {
            // console.log(node);
        },

        checkChange(data, selfIsChecked, childHasChecked) {
            if (selfIsChecked === true && data.access.split('/').length == 4 && this.checkeds.indexOf(data.access) === -1) {
                this.checkeds.push(data.access);
            } else {
                var index = this.checkeds.indexOf(data.access);
                if (index !== -1) {
                    this.checkeds.splice(index, 1);
                }
            }
        },
        initRouters(){
            var routes = this.$router.options.routes;
            for (var i = 0; i < routes.length; i++) {
                if (routes[i].hidden !== true && routes[i].children && routes[i].children.length) {
                    var tempObj = {},
                        module = routes[i],
                        menus = module.children;
                    tempObj.name = module.name;
                    tempObj.path = module.path;
                    tempObj.access = module.path;
                    tempObj.children = [];
                    for (var j = 0; j < menus.length; j++) {
                        if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
                            var tempChildObj = {},
                                menu = menus[j],
                                pages = menu.children;
                            tempChildObj.name = menu.name;
                            tempChildObj.path = '/' + menu.path;
                            tempChildObj.access = tempObj.path + '/' + menu.path;
                            tempChildObj.children = [];
                            for (var k = 0; k < pages.length; k++) {
                                if (pages[k].hidden !== true) {
                                    var tempPageObj = {},
                                        page = pages[k];
                                    tempPageObj.name = page.name;
                                    tempPageObj.path = '/' + page.path;
                                    tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
                                    tempChildObj.children.push(tempPageObj);
                                }
                            }
                            tempObj.children.push(tempChildObj);
                        }
                    }
                    this.accesss.push(tempObj);
                }
            }
        },
        onAdd(parentID,parentName){
            this.addChild = true;
            this.showList = false;
            this.module_data = this.initModule;
            this.module_data.CuitMoon_ParentModuleID = parentID;
            this.module_data.CuitMoon_ParentModuleName = parentName;
        },
        save_module(moduledata) {
            var _this = this;
            this.axios.post("/index.php?r=System/module/add-module",_this.module_data)
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.$router.push('/module/sys/modManage');
                        parent.location.reload();
                    }
                    });
        },
        /**
         * 点击搜索按钮事件
         */
        onSearch() {
            // console.log(this.search_data);

            var sd = {};

            var query = this.$route.query;
            for (var p in query) {
                sd[p] = query[p];
            }

            for (var s in this.search_data) {
                sd[s] = this.search_data[s];

                if (!sd[s]) {
                    delete sd[s];
                }
            }


            this.$router.push({
                path: this.$route.path,
                query: sd
            });
        },


        /**
         * 表格列表触发CheckBox的事件
         * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
         */
        onSelectionChange(val) {
            // console.log(val);
            if (val.length) {
                this.batch_flag = false;
                var ids = [];
                for (var i = 0; i < val.length; i++) {
                    ids.push(val[i].id);
                }
                this.batch_id = ids.join(',');
            } else {
                this.batch_flag = true;
                this.batch_id = '';
            }
        },

        onChangePageSize(size) {
            this.setPath('page_size', size);
        },

        getTheMenu(){
                var _this = this;
                this.axios.post("/index.php?r=System/module/get-menu")
                .then((res) => {  
                console.log("res:"); 
                var hh = JSON.parse(res.request.response); 
                    _this.showList = true;        
                    _this.menu_list = hh.data;
                    _this.modules_list = hh.data;

                });
            },
        /**
         * 删除用户事件
         * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前用户列表索引
         * @param  {array} list  当前用户列表数组
         */
        onDeleteUser(modules,index) {
             var _this = this;
            this.batch_id = modules.CuitMoon_ModuleID;
			this.$confirm('你确定删除模块 '+modules.CuitMoon_ModuleName+' 么?', '删除用户', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
               this.axios.post("/index.php?r=System/module/delete-module",{"CuitMoon_ModuleID":_this.batch_id})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                      //  this.$router.push('/module/sys/modManage');
                      _this.modules_list.splice(index,1);
                    }
                });
				
			});

        },

        /**
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        showUpdate(module) {
            this.dialog.show = true;
            this.dialog.module_data = module;
        },
        updateModule(module){
            this.dialog.show = false;
            var _this = this;
                    this.axios.post("/index.php?r=System/module/update-module",module)
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.$router.push('/module/sys/modManage');
                    }
            });
        },

    },

    mounted() {
        this.initRouters();
        this.getTheMenu();
        //this.initLeftTree();

        /* setTimeout(() => {
             this.onSelectUser(this.user_list[0]);
         }, 600);*/
    },
    watch: {
        '$route' (to, from) {
            this.getList();
            this.getTheMenu();
            //this.initLeftTree();
        }
    }
}