module.exports = {
    name: 'bussManage',
    data() {
        return {
            totalNum:0,
            pageSize:10,
            searchFlag:false,
            BussManager_list: [{
                UserName : '',
                LoginPassword : '',
                CampanyName : '',
                LoginPassword : '',
                CampanyType : '',
                CompanyType : '',
                BusinessArea : [],
                LegalPresentCode : '',
                Address : '',
                CantactPerson : '',
                TEL : '',
                MobilePhone : '',
                Fax : '',
                MailBox : '',
                Remark : '',
                Qualification : '',
                Logo : '',
                BusinessType : ''
            }],

            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false

            //搜索表单信息
            search_data: {
                Name: '',
            },

            //详情弹框信息
            dialog: {
                show: false,
                business_info: {
                    BusinessArea:[],
                }
            },

            dialog_access:{
                show:false,
                userinfo:{},
                web_routers:[],
                api_routers:[]
            },

            bussiness_rules: {
              UserName: [{
                required: true,
                message : '登录名不能为空！',
                trigger : 'blur'
              }],
              LoginPassword: [{
                required: true,
                message : '密码不能为空！',
                trigger : 'blur'
              }],
              CampanyName: [{
                required: true,
                message : '单位名称不能为空！',
                trigger : 'blur'
              }],
              CampanyType: [{
                required: true,
                message : '单位性质不能为空！',
                trigger : 'blur'
              }],
              CompanyType: [{
                required: true,
                message : '企业类型不能为空！',
                trigger : 'blur'
              }],
              BusinessArea: [{
                required: true,
                message : '商家所在地不能为空！',
                trigger : 'blur'
              }],
              LegalPerson: [{
                required: true,
                message : '法人不能为空！',
                trigger : 'blur'
              }],
              LegalPresentCode: [{
                required: true,
                message : '法人代表码不能为空！',
                trigger : 'blur'
              }],
              BusinessType: [{
                required: true,
                message : '商家类型不能为空！',
                trigger : 'blur'
              }]
           }
        }
    },
    methods: { 
        handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/business-manage/get-all',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                this.totalNum = hh.data.total;
                this.BussManager_list = hh.data.businessList;
            });
        },   
        addBussiness(){          
            this.$router.push('/module/acManage/addBusiness');
        },
         getBuss(){
                var _this = this;
                this.axios.post("/index.php?r=AuthCenter/business-manage/get-all",{pagesize:_this.pageSize,pagenum:1})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);    
                    _this.BussManager_list = hh.data.businessList;
                    _this.totalNum = hh.data.total;
                })
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

        setUserAccess() {
            var flag = false;
            for (var i = 0; i < this.checkeds.length; i++) {
                var arr = this.checkeds[i].split('/');

                if (arr.length === 4) {
                    flag = true;
                    var rootPath = '/' + arr[1],
                        twoPath = rootPath + '/' + arr[2];

                    if (this.checkeds.indexOf(rootPath) === -1) {
                        this.checkeds.push(rootPath);
                    }
                    if (this.checkeds.indexOf(twoPath) === -1) {
                        this.checkeds.push(twoPath);
                    }
                }
            }

            //当前所选中的节点
            if (flag === false) {
                this.checkeds = [];
            }

            // console.log(this.checkeds.join(','));
            // console.log(this.user_id.join(','));


            if (this.business_id.length) {
                UserApi.setAccessUser.call(this, {
                    user_id: this.business_id.join(','),
                    user_accesss: this.checkeds.join(',')
                }, data => {
                    this.$message.success('设置成功');
                });
            } else {
                this.$message.error('用户不能为空');
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
         * 点击搜索按钮事件
         */
        onSearch(val) {
            var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthCenter/business-manage/search-business',{CampanyName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.totalNum = hh.data.total;
                        _this.BussManager_list = hh.data.businessList;
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
            this.axios.post('/index.php?r=AuthCenter/business-manage/search-business',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = hh.data.total;
                _this.BussManager_list = hh.data.businessList;
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
         * 设置状态
         */
        onSetStatusUser(user, index, list) {
            this.$$api_user_updateUserStatus({
                id: user.id
            }, (data) => {
                user.status = user.status == 1 ? 2 : 1;
            });
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

            // this.dialog_access.userinfo=user;
            // this.dialog_access.show=true;
        },


        /**
         * 删除用户事件
         * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前用户列表索引
         * @param  {array} list  当前用户列表数组
         */
        onDeleteBusiness(bussiness, index, list) {
            var idd = bussiness.CampanyNo;
            this.$confirm('你确定删除 '+bussiness.CampanyName+' 么?', '删除商家', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.axios.post("/index.php?r=AuthCenter/business-manage/delete-business",{CampanyNo:idd})
                .then((res) => {  
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
                })
            });

        },


        /**
         * 修改商家
         * @param  {object} bussiness 当前商家信息对象
         */
        onEditBusiness(bussiness) {
            if (bussiness && bussiness.CampanyNo) {
                this.$router.push('/module/acManage/addBusiness?' + bussiness.CampanyNo);
            } else {
                this.$message({
                    showClose: true,
                    message: 'ID跑哪去了？',
                    type: 'error'
                });
            }
        },


        /**
         * 查看用户信息事件
         * @param  {object} bussiness 当前用户信息对象
         */
        onSelectBusiness(bussiness) {
            this.dialog.show = true;
            this.dialog.business_info = bussiness;
        },


        /**
         * 获取用户信息列表方法
         */
        getList() {
            var data = {};

            var query = this.$route.query;
            for (var k in query) {
                if (this.search_data[k] !== undefined) {
                    this.search_data[k] = query[k];
                    data[k] = query[k];
                }
            }

            this.$$api_business_selectBusiness(data, (data) => {
                this.BussManager_list = data.list;
            });
        }
    },

    mounted() {
        this.getBuss();
        this.initRouters();
        this.getList();
    },
    watch: {
        '$route' (to, from) {
            this.getList();
        }
    }
}
