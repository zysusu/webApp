module.exports = {
    name: 'areaManage',
    data() {
        return {
            user_data:{

            },
            menuProps:{
                children:'child',
                label:'CuitMoon_AreaName'
            },
            area_list:[],
            area_data:[{
                CuitMoon_AreaID: "058FE40BBF2046799A4AFFAF5129737D",
                CuitMoon_AreaName:   "綦江区",
                CuitMoon_AreaCode :  "500110",
                CuitMoon_ParentAreaCode :"1012",
                CuitMoon_AreaOrderNum:  "1",
                CuitMoon_AreaRemarks:  "",
                child:null
            }], //右边列表数组
            add_area : {
                CuitMoon_AreaName:   "",
                CuitMoon_AreaCode :  "",
                CuitMoon_ParentAreaCode :"",
                CuitMoon_AreaRemarks  :  ""
            },         
            add_rules: {
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
                CuitMoon_AreaID: [{
                    required: true,
                    message : '所在地区不能为空！',
                    trigger : 'blur'
                }]
            },
            show_user:false,
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false

            //搜索表单信息
            search_data: {
                username: '',
                email: '',
            },

            //详情弹框信息
            dialog: {
                show: false,
                add_area: {}
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
                this.axios.post("/index.php?r=System/area/get-area",{"CuitMoon_ParentAreaCode":''})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                
                    _this.area_list = hh.data;
                    _this.area_data = hh.data;
                });
            },
            save_area(areadata){
                this.dialog.show = false;
                this.show_user = true;
                var _this = this;
                this.axios.post("/index.php?r=System/area/add-area",areadata)
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.$router.push('/module/sys/areaManage');
                         parent.location.reload();
                    }
                })
            },
            updateArea(areadata){
                this.dialog.show = false;
                this.show_user = true;
                var _this = this;
                this.axios.post("/index.php?r=System/area/update-area",areadata)
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.$router.push('/module/sys/areaManage');
                        //window.location.reload();
                        parent.location.reload();
                    }
                })
            },
        addArea(areaid){
            this.show_user = true;
        },
        handleNodeClick(obj){
            this.show_user = false;
            this.area_data = obj.child;
        },
        toggleTree(){
            alert(0);
           $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    alert("hide");
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              }else{
                alert("show");
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


            if (this.user_id.length) {
                UserApi.setAccessUser.call(this, {
                    user_id: this.user_id.join(','),
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
        deleteArea(obj,index){
            //alert(obj);
            let id = obj.CuitMoon_AreaID;
             this.$confirm('你确定删除该地区吗?', '删除地区', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
             this.axios.post("/index.php?r=System/area/delete-area",{"CuitMoon_AreaID":id})
                .then((res) => {  
                    var _this = this;
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        _this.area_data.splice(index,1);
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
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        onSelectArea(area) {
            this.dialog.show = true;
            this.dialog.add_area = area;
        },
    },

    mounted() {
        this.initRouters();
        this.getArea();
        //test dialog

        /* setTimeout(() => {
             this.onSelectUser(this.user_list[0]);
         }, 600);*/
    },
    watch: {
        '$route' (to, from) {
            this.getList();
        }
    }
}