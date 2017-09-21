module.exports = {
    name: 'meteorElement',
    data() {
        return {
            station_list:[],
            element_list:[],
            element_data:{
            },
            show_add:false,
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
            //详情弹框信息
            dialog1: {
                show: false,
                element_data: {
                    ElementType:'',
                },
            },
            dialog2: {
                show:false,
                element_info:{
                }
            },
        }
    },

    methods: {
        showDiv(){
            this.dialog1.show = true;  
            this.dialog1.element_data = {ElementType:'',}; 
        },
         showUpdate(module) {
            this.dialog1.show = true;
            this.dialog1.element_data = module;
        },
        showInfo(ele){
            this.dialog2.show = true;   
            this.dialog2.element_info = ele;
        },
        addElement(element){
             this.axios.post('/index.php?r=AuthModel/weather-element/add',element)
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
                    this.$message({
                        showClose: true,
                        type:'success',
                        message:hh.msg
                    });
                    this.dialog1.show=false;
                    this.getElemets();
                 }else{
                    this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                 }
            });

        },
        updateElement(obj){
             this.axios.post('/index.php?r=AuthModel/weather-element/edit-commit',obj)
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status===200){
                    this.$message({
                        showClose: true,
                        type:'success',
                        message:hh.msg
                    });
                    this.dialog1.show=false;
                    this.getElemets();
                 }else{
                    this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                 }
            });
        },
        onDelete(ele,index){
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
                this.element_list.splice(index,1);
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
        getElemets(){
            let _this = this;
            this.axios.post('/index.php?r=AuthModel/weather-element/view')
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 _this.element_list = hh.data;
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
            this.axios.post('/index.php?r=AuthModel/weather-element/search',{key:name})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.element_list = hh.data;
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
        this.getElemets();
        this.initRouters();  //请求的函数丶放在它后面
    },
    watch: {
        '$route' (to, from) {
        }
    }
}