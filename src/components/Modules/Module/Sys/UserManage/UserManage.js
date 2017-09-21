module.exports = {
    name: 'userManage',
    data() {
        return {
            editFlag:false,   //判断是否是编辑页面
            user_data:{
            },
            area_list:[],
            areaList:{
                value : 'CuitMoon_AreaCode',
                label : 'CuitMoon_AreaName',
                children : 'child'
            },
            roleList:[],
            roleData:{
                role:[],
                user:'',
            },
            menuProps:{
                children:'child',
                label:'CuitMoon_AreaName'
            },
            area_list:[],
            userData: [], //用户列表数组
            checkFlag:true,
            user_list:{
                CuitMoon_UserBirthday : '',
                CuitMoon_AreaID:[],
            },
            initUser : {
                CuitMoon_UserName : '',
                CuitMoon_UserPassWord : '',
                CuitMoon_AreaID : [],
                CuitMoon_UserMSN : '',
                CuitMoon_UserQQ : '',
                CuitMoon_UserEmail : '',
                CuitMoon_UserAddress : '',
                CuitMoon_UserCellphone : '',
                CuitMoon_UserBirthday : '',
                CuitMoon_UserSex : '',
                CuitMoon_UserRealName : ''
            },
            users_rules: {
                CuitMoon_UserName: [{
                    required: true,
                    message : '登录名不能为空！',
                    trigger : 'blur'
                }],
                CuitMoon_UserPassWord: [{
                    required: true,
                    message : '密码不能为空！',
                    trigger : 'blur'
                }],
                CuitMoon_UserBirthday:[{
                    validator:(rule, value, callback)=>{
                        if (value === '') {
                            callback(new Error('生日不能为空！'));
                        }else {
                            callback();
                        }
                    },
                    trigger : 'blur'
                }],
                checkPassword:[{
                    validator:(rule, value, callback)=>{
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.user_list.CuitMoon_UserPassWord) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }],
                CuitMoon_AreaID: [{
                    required: true,
                    message : '所在地区不能为空！',
                    trigger : 'blur'
                }]
            },
            add_flag:false,
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false

            //搜索表单信息
            search_data: {
                Name: '',
            },

            //详情弹框信息
            dialog: {
                show: false,
                user_info: {}
            },
            dialog1:{
                show:false,
                role:[],
                user:'',
            },
            dialog_access:{
                show:false,
                userinfo:{},
                web_routers:[],
                api_routers:[]
            },

            //列表过滤性别
            sex_filters: {
                list: [{
                    text: '男',
                    value: 1
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
                    value: 1
                }, {
                    text: '禁用',
                    value: 2
                }],
                multiple: false
            },
            checkAll: true,
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
        getArea(){
            var _this = this;
            //获取全部地区
            this.axios.post("/index.php?r=System/area/get-area",{"CuitMoon_ParentAreaCode": ""})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);          
                _this.area_list = hh.data;
            });
        },
        addRole(obj){
            this.dialog1.show = true;
            this.dialog1.user = obj.CuitMoon_UserName;
            var _this = this;
            this.axios.post('/index.php?r=System/role/get-roles')
            .then((res)=>{
                var hh = JSON.parse(res.request.response); 
                _this.roleList = hh.data;
            });
            var id = obj.CuitMoon_UserName;
            this.axios.post('/index.php?r=System/role/get-role-by-user',{user:id})
            .then((res)=>{
                var mm = JSON.parse(res.request.response); 
                _this.dialog1.role = mm.data;
            });
        },
        saveRole(){
            var _this = this;
            this.axios.post('/index.php?r=System/role/assign-user',{user:_this.dialog1.user,role:_this.dialog1.role})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                   if(hh.status==200){
                        this.$message({
                            showClose: false,
                            message  : '添加成功',
                            type     : 'success'
                        });
                        this.dialog1.show = false;
                   }else{
                     this.$message({
                            showClose: false,
                            message  : '添加失败',
                            type     : 'error'
                        });
                   }
            });
        },
        roleBack(){
            this.dialog1.show = false;
        },  
        showAdd(){
            this.add_flag = true;
           // var initUser = 
            this.user_list = this.initUser;

            this.editFlag = false;
        },
        handleNodeClick(obj){
            var children = obj.child;
           // if(!children[0].CuitMoon_AreaID){
                var areaCode = obj.CuitMoon_AreaCode;
                var _this = this;
                this.add_flag = false;
                this.axios.post('/index.php?r=/System/user/get-user-by-area',{CuitMoon_AreaID:areaCode})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    _this.userData = hh.data;
                });
            //}
        },
         checkName(val){
            var name = this.user_list.CuitMoon_UserName;
            var _this = this;
             this.axios.post("/index.php?r=AuthCenter/expert-manage/is-one",{Username:name})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.msg=='exist'){
                    this.$message({
                        showClose: false,
                        message  : "登录名已存在，请重新输入！",
                        type     : 'error'
                    });
                }else{
                    _this.checkFlag = false;
                }
            });
        },
        addUser(user){
            if(this.checkFlag){
                this.$message({
                    showClose: false,
                    message  : "登录名已存在，请重新输入！",
                    type     : 'error'
                });
            }else{
                this.axios.post('/index.php?r=System/user/add-user',user)
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
            }
        },
      //  lookUser(list.CuitMoon_ModuleID,list.child,list.CuitMoon_ModuleName)
        //  lookUser(id,child,name){
        //     //alert(id);
        //     this.modules_list = child;
        //     //this.addChild = true;
        //     this.showList = true;
        //     this.addChild = false;
        //     this.parentID = id;
        //     this.parentName = name;
        // },
    
        reBack(){
            this.add_flag = false;
        },
        onChangeDate(val){
            this.user_list.CuitMoon_UserBirthday = val;
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

        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
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


        /**
         * 列表性别格式化事件
         * @param  {object} item 当前用户信息
         * @return {string}      根据定义的类型转换文本描述值
         */
        formatterSex(item) {
            return item.sex == 1 ? '男' : (item.sex == 2 ? '女' : '保密');
        },


        /**
         * 列表状态格式化事件
         * @param  {object} item 当前用户信息
         * @return {string}      根据定义的类型转换文本描述值
         */
        formatterStatus(item) {
            return item.status == 1 ? '启用' : '禁用';
        },


        /**
         * 列表过滤性别事件
         * @param  {number} value 状态码
         * @param  {object} item  当前用户信息
         * @return {boolean}       匹配成功为true,否则为false
         */
        filterSex(value, item) {
            return item.sex == value;
        },


        /**
         * 列表过滤状态事件
         * @param  {number} value 状态码
         * @param  {object} item  当前用户信息
         * @return {boolean}       匹配成功为true,否则为false
         */
        filterStatus(value, item) {
            return item.status == value;
        },


        /**
         * 点击搜索按钮事件
         */
        onSearch() {
           
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


        /**
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        setPath(field, value) {
            var path = this.$route.path,
                query = Object.assign({}, this.$route.query);

            query[field] = value;

            this.$router.push({
                path: path,
                query: query
            });
        },


        /**
         * 改变当前页事件
         * @param  {number} page 当前页码
         */
        onChangeCurrentPage(page) {
            this.setPath('page', page);
        },


        /**
         * 改变每页显示数量事件
         * @param  {number} size 当前每页显示数量
         */
        onChangePageSize(size) {
            this.setPath('page_size', size);
        },

        /**
         * 设置权限
         */
        onSetAccess(user,index,list){
            this.$router.push({
                path:'/demo/user/access',
                query:{
                    id:user.id
                }
            });
        },


        /**
         * 删除用户事件
         * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前用户列表索引
         * @param  {array} list  当前用户列表数组
         */
        onDeleteUser(user, index) {
           var id = user.CuitMoon_UserID;
			this.$confirm('你确定删除用户 '+user.CuitMoon_UserName+' 么?', '删除用户', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
                var _this = this;
				this.axios.post('/index.php?r=System/user/delete-user',{CuitMoon_UserID:id})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                     _this.userData.splice(index,1);
                    }else{
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                   }
                });
			});

        },
        /**
         * 修改用户
         * @param  {object} user 当前用户信息对象
         */
        onEditUser(user) {
           this.add_flag = true;
           this.user_list = user;
           this.editFlag = true;
        },
        updateUser(newInfo){
                //newInfo.CuitMoon_AreaID = newInfo.CuitMoon_AreaID[2];
                this.axios.post('/index.php?r=System/user/update-user',newInfo)
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                     this.add_flag = false;
                    }else{
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                   }
                });
        },

        /**
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        onSelectUser(user) {
            this.dialog.show = true;
            this.dialog.user_info = user;
        },

    },

    mounted() {
        this.initRouters();
        this.getArea();
        //this.initLeftTree();

        /* setTimeout(() => {
             this.onSelectUser(this.user_list[0]);
         }, 600);*/
    },
    watch: {
        '$route' (to, from) {
            this.getArea();
        }
    }
}