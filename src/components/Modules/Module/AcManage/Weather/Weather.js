module.exports = {
    name: 'weather',
    data() {
        return {
            totalNum:0,
            pageSize:10,
            searchFlag:false,
            station_list:[],
            area_list:[],
            areaList:{
                value : 'CuitMoon_AreaCode',
                label : 'CuitMoon_AreaName',
                children : 'child'
            },
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            showAdd:false,
            elements:[],
            station_data:{
            },
            init_station:{
                WeatherStationID: "",
                Name: "",
                BelongTo: [],
                Longitude: "",
                Latitude: "",
                Measuringelements: [],
                Remark: ""
            },
            //搜索表单信息
            search_data: {
                Name: ''
            },
            //详情弹框信息
            dialog: {
                show: false,
                user_info: {}
            },
            //详情弹框信息
           dialog2: {
                show:false,
                element_info:[],
            },
            dialog_access:{
                show:false,
                userinfo:{},
                web_routers:[],
                api_routers:[]
            },
            station_rules:{
                WeatherStationID: [{
                    required: true,
                    message : '气象站编号不能为空！',
                    trigger : 'blur'
                }],
                 Name: [{
                    required: true,
                    message : '气象站名称不能为空！',
                    trigger : 'blur'
                }],
                 BelongTo: [{
                    required: true,
                    message : '所属气象局不能为空！',
                    trigger : 'blur'
                }],
                 Longitude: [{
                    required: true,
                    message : '经度不能为空！',
                    trigger : 'blur'
                }],
                 Latitude: [{
                    required: true,
                    message : '纬度不能为空！',
                    trigger : 'blur'
                }]
            },
            checkAll: true,
            isIndeterminate: true,
            checkeds: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }   
        }
    },
    methods: {
        showDiv(){
            $('.addDiv').show();
            this.showAdd = true; 
            var initStation = {
                WeatherStationID: "",
                Name: "",
                BelongTo: [],
                Longitude: "",
                Latitude: "",
                Measuringelements: [],
                Remark: ""
            };
            this.station_data = initStation;  
        },
        initMap(){
                 // var local = "重庆";
                 // let _this = this;
                 //  var map = new BMap.Map("allmap");            
                 //  map.centerAndZoom(local,12); 
                 var _this = this;
                 var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398,39.897445);
                map.centerAndZoom(point,12);

                function myFun(result){
                    var cityName = result.name;
                    map.setCenter(cityName);
                   // alert("当前定位城市:"+cityName);
                }
                var myCity = new BMap.LocalCity();
                myCity.get(myFun);

                map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
                //单击获取点击的经纬度
                 map.addEventListener("click",function(e){
                    _this.station_data.Longitude = e.point.lng;
                    _this.station_data.Latitude = e.point.lat;
                });
        },
        getStation(){
                var _this = this;
                this.axios.post("/index.php?r=AuthCenter/weather-station-manage/get-all",{pagesize:_this.pageSize,pagenum:1})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);   
                    if(hh.status==200){ 
                        _this.station_list = hh.data.WeatherStationList;
                        _this.totalNum = parseInt(hh.data.total);
                    }
                });

                this.axios.post('/index.php?r=AuthModel/formulate-modle/view-growth')
                .then((res)=>{
                     var hh = JSON.parse(res.request.response);
                     _this.elements = hh.data;
                });
        },
        getArea(){
            var _this = this;
             //获取全部地区
            this.axios.post("/index.php?r=System/area/get-area",{"CuitMoon_ParentAreaCode": ""})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);          
                _this.area_list = hh.data;
            });
        },
        handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/weather-station-manage/get-all',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
            var hh = JSON.parse(res.request.response);
                _this.station_list = hh.data.WeatherStationList;
                _this.totalNum = parseInt(hh.data.total);
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
        save_station(data){
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/weather-station-manage/add-weather-station',data)
            .then((res)=>{
                 var hh = JSON.parse(res.request.response); 
                 if(hh.status===200){
                   this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                    });
                    _this.showAdd = false;
                     $('.addDiv').hide();
                    _this.getStation();
                 }else{
                    this.$message({
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
                 }  
            });
        },
        update_station(data){
            var _this = this;
             this.axios.post('/index.php?r=AuthCenter/weather-station-manage/update',data)
            .then((res)=>{
                 var hh = JSON.parse(res.request.response); 
                 if(hh.status===200){
                     _this.showAdd = false;
                   this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                    });
                 _this.showAdd = false;
                    $('.addDiv').hide();
                _this.getStation();
                 }else{
                    this.$message({
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
                 }   
            });
        },
        onEdit(station){
            this.station_data = station;
            if(!this.station_data.BelongTo){
                this.station_data.BelongTo = [];
            };
            if(!this.station_data.Measuringelements){
                this.station_data.Measuringelements = [];
            }
            this.showAdd = true;
            $('.addDiv').show();
        },
        reBack(){
            $('.addDiv').hide();
            this.showAdd = false;
        },
        onDelete(id,index){
            this.$confirm('你确定删除改气象站吗?', '删除气象站', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.axios.post('/index.php?r=AuthCenter/weather-station-manage/delete-weather-station',{WeatherStationInfoID:id})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response); 
                 if(hh.status===200){
                    // this.showAdd = false;
                    // $('.addDiv').hide();
                    this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.station_list.splice(index, 1);
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
         * 点击搜索按钮事件
         */
         onSearch() {
            var name = this.search_data.Name;
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/weather-station-manage/search-weather-station',{NameOrID:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status==200){
                        _this.searchFlag = true;
                        _this.totalNum = parseInt(hh.data.total);
                        _this.station_list = hh.data.WeatherStationList;
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
            this.axios.post('/index.php?r=AuthCenter/weather-station-manage/search-weather-station',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.station_list = hh.data.WeatherStationList;
                _this.totalNum = parseInt(hh.data.total);
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
         * 查看用户信息事件
         * @param  {object} user 当前用户信息对象
         */
        onSelect(obj) {
            this.dialog2.show = true;
            var _this = this;
            var id = obj.WeatherStationInfoID;
             this.axios.post('/index.php?r=AuthCenter/weather-station-manage/get-weather-station',{WeatherStationInfoID:id})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.dialog2.element_info = hh.data;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                }
            });
            //this.dialog.user_info = user;
        },
    },
    mounted() {
        this.getStation();
        this.initMap();
        this.getArea();
        this.initRouters();  //请求的函数丶放在它后面
        // var map = new BMap.Map("container");    //创建地图实例，注意在调用此构造函数时应确保容器元素已经添加到地图上
        // var point = new BMap.Point(116.404, 39.915); //创建点坐标， 地图必须经过初始化才可以执行其他操作
    },
    watch: {
        '$route' (to, from) {
            this.getStation();
           // this.initMap();
        }
    }
}