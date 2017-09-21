module.exports = {
    name: 'productInfo',
    data() {
        return {
             totalNum:0,
             pageSize:10,
             searchFlag:false,
             pageFlag:true,
            productType:[],
            productProps:{
                children:'productType',
                label:'CuitMoon_DictionaryName'
            },
            product_list:[],
            product_data:{
                ProductNumber:'',
                ProductName: "",
                Remark: "",
                ProductDescription: "",
                AddTime: "",
                ProductType:''
            },
            menu_list:[
            ],
             module_data : {
                CuitMoon_ModuleID : '',
                CuitMoon_ModuleName : '',
                CuitMoon_ModuleURL : '',
                CuitMoon_ParentModuleID : '',
                CuitMoon_ParentModuleName : '',
                CuitMoon_ModuleDescription : '',
                CuitMoon_ModuleStatus : '',
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
                CuitMoon_ModuleDescription: [{
                    required: true,
                    message : '模块描述不能为空！',
                    trigger : 'blur'
                }]
            },
            modules_list: [{
                        CuitMoon_ModuleID: "AF6B9A11B326B5E87BAAEC842ACD8879",
                        CuitMoon_ModuleName: "添加模块",
                        CuitMoon_ModuleURL: "System/module/addmodule",
                        CuitMoon_ParentModuleID: "99CFF591115814CFA780F97749F6D273",
                        CuitMoon_ModuleStatus: "1",
                        CuitMoon_ModuleDescription: "",
                        child: null   
            }], //用户列表数组
            parentID:'',
            showList : false,
            addChild : false,  //判断是否是添加子模块
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            showChild : false,
            //搜索表单信息
            search_data: {
                Name: ''
            },
            //详情弹框信息
            dialog: {
                show: false,
                product_data:{},
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
        handleNodeClick(obj){
            var type = obj.CuitMoon_DictionaryName;
            this.showList = true;
            this.addChild = false;
            this.pageFlag = false;
             var _this = this;
                this.axios.post("/index.php?r=AuthModel/produce-info/view-chose",{ProductType:type})
                .then((res) => {  
                var hh = JSON.parse(res.request.response); 
                    _this.showList = true;        
                    _this.product_list = hh.data;
                    _this.product_list.ProductType = type;

                });

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
                   //$(this).find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              }else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                    //$(this).find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
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

       onAdd(){
            this.addChild = true;
            this.showList = false;
            this.module_data.CuitMoon_ParentModuleID = parentID;
            this.module_data.CuitMoon_ParentModuleName = parentName;
         },
         addProduct(prodata) {
                    var _this = this;
                    this.axios.post("/index.php?r=AuthModel/produce-info/add",prodata)
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status==200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.addChild = false;
                        this.getData();
                        this.showList = true;
                        this.pageFlag = true;
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
         * 点击搜索按钮事件
         */
        onSearch(val) {
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthModel/produce-info/search',{key:name})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.product_list = hh.data;
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
        getType(){
                var _this = this;
                this.axios.post("/index.php?r=AuthModel/produce-info/get-type")
                .then((res) => {  
                console.log("res:"); 
                var hh = JSON.parse(res.request.response); 
                    _this.showList = true;        
                    _this.productType = hh.data;
                });
            },
        getData(){
                var _this = this;
                this.axios.post("/index.php?r=AuthModel/produce-info/view-all",{pagesize:_this.pageSize,pagenum:1})
                .then((res) => {  
                var hh = JSON.parse(res.request.response); 
                    _this.showList = true;        
                    _this.product_list = hh.data.info;
                    _this.totalNum = parseInt(hh.data.total);
                    _this.product_list.ProductType = type;
                });
        },
        handleCurrentChange(val){
            var _this = this;
            this.axios.post("/index.php?r=AuthModel/produce-info/view-all",{pagesize:_this.pageSize,pagenum:val})
                .then((res) => {  
                var hh = JSON.parse(res.request.response); 
                    _this.showList = true;        
                    _this.product_list = hh.data.info;
                    _this.totalNum = parseInt(hh.data.total);
                    _this.product_list.ProductType = type;
                });
        },
        /**
         * 删除事件
         */
        onDelete(product,index) {
            var delId = product.ProductNumber;
			this.$confirm('你确定删除产品 '+ product.ProductName+' 么?', '删除用户', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
                 var _this = this;
                    this.axios.post("/index.php?r=AuthModel/produce-info/delete",{"ProductNumber":delId})
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                       _this.product_list.splice(index,1);
                       _this.totalNum =this.totalNum-1;
                    }
                });		
			});

        },
        reBack(){
            this.addChild = false;
            this.showList = true;
        },

        /**
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        showUpdate(theData) {
            this.dialog.show = true;
            this.dialog.product_data = theData;
        },
        update(product){
            this.dialog.show = false;
            var _this = this;
                    this.axios.post("/index.php?r=AuthModel/produce-info/edit-commit",{
                        ProductNumber:product.ProductNumber,
                        ProductName:product.ProductName,
                        Remark:product.Remark,
                        ProductType:product.ProductTypeName,
                        ProductDescription:product.ProductDescription
                    })
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                    }
            });
        }
    },

    mounted() {
        this.getType();
        this.getData();
        this.initRouters();
    },
    watch: {
        '$route' (to, from) {
            this.getType();
        }
    }
}