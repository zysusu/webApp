module.exports = {
	name   : 'embodiment',
	data() {
		return {
            totalNum:0,
            pageSize:10,
			project_list:[{
				name :'',
			}], //首页方案列表
            lookAll:false,  //详情
            showFirst:true,
            checkAll:false,  //审核
            checkFlag:3,
            viewBh:'',  //审核时需要传的ID
			projectInfo:{
                ApplyBh:'',
                Bearinginfo:[],
                Origin_Situation:'',
                ApplyFrequency:'',//申请频率
                Meteorological_Disaster:'',
                Diseases_InsectPests:''
			},  //添加方案信息
			productInfo:{}, //产品信息
            elementInfo:[],  //要素信息
            localInfo:{},  //产地信息
			station_list:[],  //气象站下拉选项
			apply_frequecy:[],  //申请频率选项
			elements:[],  //气象指标选项
			total_bear:[
			// 	{
			// 		station:'',
			// 		Element:[],
			// 		bear:'',
			// 		time1:'',
			// 		time2:'',
			// 		reason:''
			// }
            ],  //生育期的数组
            bearing:{
                    stationId:'',
                    meteIndicators:[],
                    cropGrowthPeriod:'',
                   // ApplyFrequency:'',
                    startCollectionTime:'',
                    endCollectionTime:'',
                    meteIndicatorsReason:''
                }, 
            initBear:{
                    stationId:'',
                    meteIndicators:[],
                    cropGrowthPeriod:'',
                  //  ApplyFrequency:'',
                    startCollectionTime:'',
                    endCollectionTime:'',
                    meteIndicatorsReason:''
            },
			scoreData:[],

			search_data:{
				Name:'',
			},
            expertView:{
                sign:'',
                opinion:''
            },    //专家意见
			showAdd:false,
			project_rules: {
				CuitMoon_UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}]
			},
	   }
	},
	methods: {
        yesNo(row,column){
            var No = row[column.property];
            if(No=='待建立实施方案'){
                return '否';
            }else{
                return '是';
            }
        },
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
        checkProject(info){
            this.viewBh = info.ApplyBh;
            this.checkAll = true;
            this.showAll = false;
            this.showFirst = false;
            var apply = info.ApplyBh;
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/identification/get-review',{ApplyBh:apply})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status==200){
                    _this.productInfo = hh.data.apply;
                    _this.elementInfo = hh.data.Bearinginfo;
                    _this.localInfo =  hh.data.identifictionInfo;

                    // _this.checkAll = true;
                    // _this.lookAll = true;
                    // _this.showFirst = false;
                    if(hh.data.isrole=='基层专家组组长审核'){
                        _this.checkFlag = 1;
                    }else if(hh.data.isrole=='省级专家组组长审核'){
                        _this.checkFlag = 2;
                    }else if(hh.data.isrole=='没有权限'){
                        _this.checkFlag = 2;  //这里需要修改为3
                    }
                   
                 } 
            });
        },
        showAll(info){
            var apply = info.ApplyBh;
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/identification/get-identification',{ApplyBh:apply})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                 if(hh.status==200){
                    _this.showFirst = false;
                    _this.checkAll = false;
                    _this.lookAll = true;
                    _this.productInfo = hh.data.identifictionInfo;
                    _this.elementInfo = hh.data.Bearinginfo;
                    if(hh.data.QualityIdentification==null){
                        _this.localInfo = {};
                    }else{
                         _this.localInfo =  hh.data.QualityIdentification;
                    }
                 }else{
                    this.$message({
                            showClose: true,
                            message  : "查询失败",
                            type     : 'error'
                    });
                 }   
            });   
        },
        
        submitView(obj){
            if(this.checkFlag == 1){
                var thLev = "基层专家";
            }else if(this.checkFlag ==2){
                var thLev = '省级专家';
            }
            var id = this.viewBh;
            this.axios.post('/index.php?r=ClimateQuality/identification/review-pass',{sign:obj.sign,opinion:obj.opinion,ApplyBh:id,level:thLev})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
                    this.$message({
                            showClose: true,
                            message  : "审核成功！",
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
        },
        dateChange1(val){
            this.bearing.startCollectionTime = val;
        },
        dateChange2(val){
            this.bearing.endCollectionTime = val;
        },
		getView(){
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/identification/get-all',{pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);
                _this.project_list = hh.data.apply;
                _this.totalNum = parseInt(hh.data.total);
            });
		},
        handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/identification/get-all',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.project_list = hh.data.apply;
                _this.totalNum = perseInt(hh.data.total);
            });
        }, 
		addProject(obj){
            var _this = this;
            var Bh = obj.ApplyBh;
            this.projectInfo.ApplyBh = Bh; 
            this.axios.post('/index.php?r=ClimateQuality/identification/add-identification-view',{ApplyBh:Bh})
            .then((res)=>{
                var hh = JSON.parse(res.request.response).data;
                _this.productInfo = hh.identifictionInfo;
                _this.station_list = hh.weatherstation;  //气象站下拉选项
               // _this.apply_frequecy = hh.ApplyFrequency;   //申请频率选项
                _this.elements = hh.Element; //气象指标选项
            });
            this.showFirst = false;
			this.showAdd = true;
		},
        create_bear(info){
            var list = {
                   stationId:info.stationId,
                    meteIndicators:info.meteIndicators,
                    cropGrowthPeriod:info.cropGrowthPeriod,
                  //  ApplyFrequency:info.ApplyFrequency,
                    startCollectionTime:info.startCollectionTime,
                    endCollectionTime:info.endCollectionTime,
                    meteIndicatorsReason:info.meteIndicatorsReason
                };
            this.total_bear.push(list);
            this.bearing = this.initBear;
        },
        deleteChild(info){
           this.total_bear.splice(info, 1);
        },
        submitData(project){
            this.projectInfo.Bearinginfo = this.total_bear;
            var _this = this;
            this.axios.post("/index.php?r=ClimateQuality/identification/add-identification",_this.projectInfo)
                    .then((res) => {  
                     var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.showCheck = false;
                        this.$message({
                            showClose: true,
                            message  : "添加成功",
                            type     : 'success'
                        });
                       // window.location.reload();
                       _this.lookAll = false;
                        _this.checkAll = false;
                       _this.showAdd = false;
                       _this.showFirst = true;
                       _this.getView();
                    }else{
                        this.$message({
                            showClose: true,
                            message  : "添加失败",
                            type     : 'error'
                        });
                    }
            });
        },
		onChangeDate(val) {
			this.user_list.CuitMoon_UserBirthday = val;
		},
		reset_user(userdata) {
			this.$refs[userdata].resetFields();
		},
		reBack(){
			this.showFirst = true;
            this.checkAll = false;
            this.showAdd = false;
            this.lookAll = false;
		}
	},
	mounted() {
		this.getView();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}