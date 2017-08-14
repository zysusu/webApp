module.exports = {
    name: 'modGrade',
    data() {
        return {
            modGrade:[],
            modLevel:[],  //查看等级页面
            ProductApproModelid:'',  //查看等级时复制，添加模型等级时使用
            element_data:{
                 "ElementNumber": "2aeb7e9ed9534abe90916e5782f54c93", 
                    "Unit": "232", 
                    "ElementName": "22", 
                    "ElementType": "100042", 
                    "ElementDecription": "2342", 
                    "AddTime": null, 
                    "Remark": "3242", 
                    "climateStation": null, 
                    "TyepName": "不常用指标"
            },
            show_add:false,
            showLevel:false,
            station_data:{
                WeatherStationInfoID: "11",
                WeatherStationID: "22",
                Name: "",
                BelongTo: "",
                Longitude: "",
                Latitude: "",
                Measuringelements: [],
                Remark: ""
            },
            //搜索表单信息
            search_data: {
                Name: ''
            },
             options: [{
                  value: '常用指标',
                  label: '常用指标'
                }, {
                  value: '不常用指标',
                  label: '不常用指标'
                }],
            gradeOption:[{
                  value: '特优',
                  label: '特优'
                }, {
                  value: '优',
                  label: '优'
                },{
                  value: '良',
                  label: '良'
                }],
            //详情弹框信息
            dialog1: {
                show: false,
                mod_data: {},
            },
            dialog2: {
                show:false,
                mod_info:{}
            },
            dialog3: {
                show: false,
                mod_news: {
                    ApproveLevelName:'',
                    ModelName:''
                },
            }
        }
    },

    methods: {
        showDiv(){
            this.dialog1.show = true;   
        },
         showUpdate(module) {
            this.dialog1.show = true;
            this.dialog1.mod_data = module;
        },
        newGrade(){
            this.dialog3.show = true;
        },
        backToList(){
            this.showLevel = false;
        },
        showInfo(ele){
            this.dialog2.show = true;   
            this.dialog2.mod_info = ele;
        },
        showLev(obj){
            this.showLevel = true;
            this.ProductApproModelid = obj.ProductApproModelId;
            this.dialog3.mod_news.ModelName = obj.ModelName;
            let _this = this;
            this.axios.post('/index.php?r=AuthModel/garge-modle/grade-view',{ProductApproModelId:obj.ProductApproModelId})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 _this.modLevel = hh.data;
            });
        },
        // 添加模型等级
        addGrade(obj){
            var _this = this;
            this.axios.post('/index.php?r=AuthModel/garge-modle/grade-add-commit',{
                ProductApproModelId:_this.ProductApproModelid,
                ApproveLevelName:obj.ApproveLevelName,
                ApproveLevelDescription:obj.ApproveLevelDescription
            })
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
                    this.$message({
                        showClose: true,
                        type:'success',
                        message:hh.msg
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
        },
        updateEle(element){
             this.axios.post('/index.php?r=AuthModel/weather-element/add',element)
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
                    this.$message({
                        showClose: true,
                        type:'success',
                        message:hh.msg
                    });
                   // window.location.reload();
                 }else{
                    this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                 }
            });

        },
        updateGrade(obj){
            this.axios.post('/index.php?r=AuthModel/garge-modle/grade-edit-commit',obj)
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
                    this.$message({
                        showClose: true,
                        type:'success',
                        message:hh.msg
                    });
                   this.dialog1.show = false;
                 }else{
                    this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                 }
            });
        }, 
      //  模型等级页面的删除
        deleteGrade(id){
             this.$confirm('你确定删除该条数据吗?', '删除数据', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
             this.axios.post('/index.php?r=AuthModel/garge-modle/delete',{ApproveLevelId:id})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
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
            });
         });
        },
        onDelete(ele){
            var number = ele.ElementNumber;
             this.$confirm('你确定删除该条数据吗?', '删除数据', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
             this.axios.post('/index.php?r=AuthModel/weather-element/delete',{ElementNumber:number})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
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
            });
         });
        },
        getData(){
            let _this = this;
            this.axios.post('/index.php?r=AuthModel/garge-modle/view')
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 _this.modGrade = hh.data;
            });
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

        reBack(){

        },
        /**
         * 点击搜索按钮事件
         */
        onSearch(val) {
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthModel/garge-modle/search',{key:name})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.modGrade = hh.data;
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
    },

    mounted() {
        this.getData();
        this.initRouters();  //请求的函数丶放在它后面
    },
    watch: {
        '$route' (to, from) {
            this.getData();
        }
    }
}