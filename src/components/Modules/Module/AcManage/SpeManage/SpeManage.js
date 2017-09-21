 import {
    gbs
 } from 'config/settings.js';

module.exports = {
    name: 'speManage',
    data() {
        return {
            pageSize:10,
            totalNum:0,
            imageUrl:'',
            imgAction:'',
            levelData:[], //级别
            province:[],
            city_list:[],
            side_list:[],
            area_data:{
                Province:'',
                City:'',
                Area:''
            },
            changeFlag:true,
            speManager_list: [], //用户列表数组
            spe_data:{},
            Category:[],
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            showAdd:false,

            expert_list:{},  //提交的数据
            initExpert : {
                Username : '',
                Expertname : '',
                BelongToMeteorology : [],  //所属气象局
                ExpertLevel : '',
                ExpertIntroduction : '',
                ExpertCategory :[],
                IDNumber : '',
                WorkUnits : '',
                Schools : '',
                EducationalBackground : '',
                Address : '',
                TEL : '',
                PostCode : '',
                MailBox : '',
                QQ : '',
                Photo : '',
                AddTime : '',
                Remark : ''
            },
            expert_rules: {
                Username: [{
                    required: true,
                    message : '登录名不能为空！',
                    trigger : 'blur'
                }],
                Expertname: [{
                    required: true,
                    message : '专家名不能为空！',
                    trigger : 'blur'
                }],
                BelongToMeteorology: [{
                    required: true,
                    message : '所属页面不能为空！',
                    trigger : 'blur'
                }],
                ExpertLevel: [{
                    required: true,
                    message : '专家级别不能为空！',
                    trigger : 'blur'
                }],
                ExpertCategory: [{
                    required: true,
                    message : '专家类别不能为空！',
                    trigger : 'blur'
                }],
                TEL:[{
                     validator:(rule, value, callback)=>{
                        if (!/^[0-9]*$/.test(value)) {
                            callback(new Error('输入格式不正确，仅支持全数字'));
                        }else if(value.length!=11){
                            callback(new Error('输入的手机号应为11位'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }],
                MailBox:[{
                    validator:(rule, value, callback)=>{
                        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
                            callback(new Error('邮箱格式不对，请重新输入'));
                        }else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }],

            },
            //搜索表单信息
            search_data: {
                Name: '',
            },
            searchFlag:false,
            //详情弹框信息
            dialog: {
                show: false,
                user_info: {},
                spe_data:{}
            },

            dialog_access:{
                show:false,
                userinfo:{},
                web_routers:[],
                api_routers:[]
            },

            accesss: [],
            checkeds: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
            
        }
    },
    methods: {
        getProvince(){
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/sheng")
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.province = hh.data;
            });
             this.axios.post("/index.php?r=AuthCenter/expert-manage/add-expert-level")
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                    _this.levelData = hh.data;
            });
        },
        changeExpertLevel(val){
            //alert(val);  获取市/区
            // var _this = this;
            // this.axios.post("/index.php?r=origin/schedule/shi",{CuitMoon_AreaCode:val})
            // .then((res) => {  
            // var hh = JSON.parse(res.request.response);
            //  _this.area_list = hh.data;
            // });
        },
        changeExpertProvince(val){
             //alert(val);  //选中省获取市/区
            this.expert_list.BelongToMeteorology[0] = this.area_data.Province;
            this.area_data.City = '';
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/shi",{CuitMoon_AreaName:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.city_list = hh.data;
            });
        },
        changeExpertCity(val){
             //alert(val);  选中市/区,获取街道
            this.expert_list.BelongToMeteorology[0] = this.area_data.Province;
            this.expert_list.BelongToMeteorology[1] = this.area_data.City;
            this.area_data.Area = '';
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/xian",{CuitMoon_AreaName:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.side_list = hh.data;
            });
        },
        changeExpertArea(val){
            //alert(val);  选中获取街道
            this.expert_list.BelongToMeteorology[0] = this.area_data.Province;
            this.expert_list.BelongToMeteorology[1] = this.area_data.City;
            this.expert_list.BelongToMeteorology[2] = this.area_data.Area;   
        },
    
        addExpert(){
            this.$router.push('/module/acManage/addExpert');
        },
         /*修改*/
        onEditExpert(expert) {
            var ExpertID = expert.ExpertNo; 
            this.showAdd = true;
            var _this = this;
            this.axios.post("/index.php?r=AuthCenter/expert-manage/get-expert",{ExpertNo:ExpertID})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                 _this.expert_list = hh.data;
                 _this.area_data.Province = hh.data.BelongToMeteorology[0];
                 if(hh.data.BelongToMeteorology[1]){
                    _this.area_data.City = hh.data.BelongToMeteorology[1];
                 };
                 if(hh.data.BelongToMeteorology[2]){
                    _this.area_data.Area = hh.data.BelongToMeteorology[2]; 
                 } 
            });
        },
        handleAvatarSuccess(res, file) {
         // this.imageUrl = URL.createObjectURL(file.raw);
          this.expert_list.Photo = file.response.data.url;
       }, 
        update_expert(obj){
            var _this = this;
            this.axios.post("/index.php?r=AuthCenter/expert-manage/update",obj)
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                        if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : "修改成功",
                            type     : 'success'
                        });
                        _this.showAdd = false;
                        _this.getExpert();
                    }else{
                         this.$message({
                            showClose: true,
                            message  :hh.msg,
                            type     : 'error'
                        });
                    }
                })
        },
        reBack(){
            this.showAdd = false;
        },
        getExpert(){
             var _this = this;
            this.axios.post("/index.php?r=AuthCenter/expert-manage/get-all",{pagesize:_this.pageSize,pagenum:1})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
            if(hh.status==200){
                _this.speManager_list = hh.data.ExpertList;
                _this.totalNum = parseInt(hh.data.total);
                }
            });
        },
        handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/expert-manage/get-all',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
            var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.speManager_list = hh.data.ExpertList;
            });
        },
        getCategory(){
            var _this = this;
                this.axios.post("/index.php?r=AuthCenter/expert-manage/get-expert-category")
                .then((res) => {  
                console.log("res:"); 
                var hh = JSON.parse(res.request.response);
                    _this.Category = hh.data;
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
                if (routes[i].hidden !== true && routes[i].children && routes[i].children.length){
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
        onSearch(val) {
            var _this = this;
            this.searchFlag = true;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthCenter/expert-manage/search-expert',{Expertname:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.speManager_list = hh.data.ExpertList;
                        _this.totalNum = parseInt(hh.data.total);
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
            alert(val);
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/expert-manage/search-expert',{Expertname:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.speManager_list = hh.data.ExpertList;
                        _this.totalNum = parseInt(hh.data.total);
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
        handlePreview(file){
            alert(file.response);
        },
        upSuccess(response, file, fileList){
            alert(response.data.msg);
            this.initExpert.Photo = response.data.msg;
            console.log(response);
            console.log(file);
            console.log(fileList);
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
         * 删除用户事件
         * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前用户列表索引
         * @param  {array} list  当前用户列表数组
         */
        onDelete(expert,index) {
            var name = expert.Username;
            this.$confirm('你确定删除 '+expert.Username+' 么?', '删除专家', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.axios.post("/index.php?r=AuthCenter/expert-manage/delete-expert",{Username:name})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.speManager_list.splice(index, 1);
                      //  window.location.reload();
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
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        onSelectUser(user) {
            this.dialog.show = true;
            this.dialog.user_info = user;
        },
    },

    mounted() {
        this.imgAction = gbs.host+"/index.php?r=common/upload";
        this.imageUrl = gbs.host;
        this.getExpert();
        this.getProvince();
        this.getCategory();
        this.initRouters();

        //test dialog
    },
    watch: {
        '$route' (to, from) {
            this.getList();
        }
    }
}