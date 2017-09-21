import {
   gbs
} from 'config/settings.js';
module.exports = {
	name:'apply',
	data() {
		return {
			imageSrc:"",
			imageAction:"",
			imageUrl:"",
			tableData:'',
			Businessqualification:{
				Name:"",
				awardTime:"",
				publishUnit:"",
				picUrl:"",
			},
			types:[],
			step:1,
			num:0,
			applyTypes:[],
			areas:[],
			defaultProps: {
	            children: 'child',
	            label: 'CuitMoon_AreaName',
				value: 'CuitMoon_AreaCode'
	  	  	},
			typeProps:{
				children: 'child',
	            label: 'name',
				value: 'id'
			},
			productType:[],
			Apply:{
				//企业信息*法人代表
				repersentative:"",
				//企业信息*单位性质
				unitProperty:"",
				//企业信息*业务联系人
				counterMan:"",
				//企业信息*业务电话
				countermanPhone:"",
				Phone:'', //手机
				//企业信息*商家邮箱
				countermanFax:"",
				//企业信息*通讯地址
				Address:"",
				//企业信息*单位名称
				unityName:"",
				//申请人类型	**
				applicationType:[],
				//
				//产地信息*地址
				location:"",
				//产地信息*产地负责人
				ProductionCharger:"",
				//产地信息*生产基地联系电话
				Contact:"",
				//产地信息*手机
				Phone:"",
				//产地信息*E_MAIL
				Email:"",
				//生产基地
				ProduceBase:[],
				//
				//申报产品情况*保质期
				Remark:"",
				//申报产品情况*包装规格
				Format:"",
				//申报产品情况*气候控制措施
				ControlImplement:"",
				//申报产品情况*规模
				scale:"",
				//申报产品情况*产值
				OutputValue:"",
				//申报产品情况*产量
				ProdutOutput:"",
				//申报产品情况*产地概况
				ProductOverview:"",
				//申报产品情况*产品特征、特性描述
				ProductDescription:"",
				//申报产品情况*农产品品牌
				ProductBrand:"",
				//申报产品情况*产品名称
				ProductName:"",
				//暂不收费
				inTotal:"暂不收费",
				//产品类别
				commodityType:[],
				//申请类别
				ApplyOriginType:1000161,
				//标签数量
				Number:""
			},
			rules: {
				repersentative: [
					{ required: true, message: '请输入法人代表', trigger: 'blur' },
				],
				unitProperty: [
					{ required: true, message: '请输入单位性质', trigger: 'blur' },
				],
				countermanPhone: [
					{ required: true, message: '请输入业务电话', trigger: 'blur' },

				],
				countermanFax: [
					{ required: true, message: '请输入商家邮箱', trigger: 'blur' },
					{validator:(rule, value, callback)=>{
                        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
                            callback(new Error('邮箱格式不正确'));
                        }else {
                            callback();
                        }
                      }
                	}
				],
				Address: [
					{ required: true, message: '请输入通讯地址', trigger: 'blur' },
				],
				unityName: [
					{ required: true, message: '请输入单位名称', trigger: 'blur' },
				],
				applicationType: [
					{ required: true, message: '请输入申请人类型', trigger: 'blur' },
				],
				location: [
					{ required: true, message: '请输入地址', trigger: 'blur' },
				],
				ProductionCharger: [
					{ required: true, message: '请输入产地负责人', trigger: 'blur' },
				],
				Contact: [
					{ required: true, message: '请输入生产基地联系电话', trigger: 'blur' },
				],
				Phone: [
					{ required: true, message: '请输入手机', trigger: 'blur' },
						{
						 validator:(rule, value, callback)=>{
	                        if (!/^[0-9]*$/.test(value)) {
	                            callback(new Error('输入格式不正确，仅支持全数字'));
	                        }else if(value.length!=11){
	                            callback(new Error('输入的手机号应为11位'));
	                        } else {
	                            callback();
	                        }
	                    }
                	}
				],
				Email: [
					{ required: true, message: '请输入E-mail', trigger: 'blur' },
					{validator:(rule, value, callback)=>{
                        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
                            callback(new Error('E-mail格式不正确'));
                        }else {
                            callback();
                        }
                    }
                	}
				],
				counterMan: [
					{ required: true, message: '请输入业务联系人', trigger: 'blur' },
				],
				ProduceBase: [
					{ required: true, message: '请输入生产基地', trigger: 'blur' },
				],

				Remark: [
					{ required: true, message: '请输入保质期', trigger: 'blur' },
				],
				//申报产品情况*包装规格
				Format:[
					{ required: true, message: '请输入包装规格', trigger: 'blur' },
				],
				//申报产品情况*气候控制措施
				ControlImplement:[
					{ required: true, message: '请输入气候控制措施', trigger: 'blur' },
				],
				//申报产品情况*规模
				scale:[
					{ required: true, message: '请输入规模', trigger: 'blur' },
				],
				//申报产品情况*产值
				OutputValue:[
					{ required: true, message: '请输入产值', trigger: 'blur' },
				],
				//申报产品情况*产量
				ProdutOutput:[
					{ required: true, message: '请输入产量', trigger: 'blur' },
				],
				//申报产品情况*产地概况
				ProductOverview:[
					{ required: true, message: '请输入产地概况', trigger: 'blur' },
				],
				//申报产品情况*产品特征、特性描述
				ProductDescription:[
					{ required: true, message: '请输入产品特征、特性描述', trigger: 'blur' },
				],
				//申报产品情况*农产品品牌
				ProductBrand:[
					{ required: true, message: '请输入农产品品牌', trigger: 'blur' },
				],
				//申报产品情况*产品名称
				ProductName:[
					{ required: true, message: '请输入产品名称', trigger: 'blur' },
				],
				//暂不收费
				inTotal:[
					{ required: true, message: '请输入', trigger: 'blur' },
				],
				//产品类别
				commodityType:[
					{ required: true, message: '请输入产品类别', trigger: 'blur' },
				],
				//申请类别
				ApplyOriginType:[
					{ required: true, message: '请输入申请类别', trigger: 'blur' },
				],
				//标签数量
				Number:[
					{ required: true, message: '请输入标签数量', trigger: 'blur' },
					{validator:(rule, value, callback)=>{
                        if (isNaN(value)) {
                            callback(new Error('请输入正整数！'));
                        }else {
                            callback();
                        }
                    }
                	}
				],
			}
		}
    },
    methods: {
    	checkNum(val){
    		if(isNaN(val)){
    			this.$message({
    				showClose: true,
            		message  : '请输入整数！',
            		type     : 'error'
    			});
    		}
    	},
		start(){
		},
		next(){
			this.step = this.step+1;
			this.num = this.num+25;
		},
		pro(){
			this.step = this.step-1;
			this.num = this.num-25;
		},
		initData(){
			var url = window.location.href;
			var ID = url.split("?");
			var id = ID[1];
			if(id){
				var _this = this;
				this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply-by-id',{ApplyBh:id})
				.then((res)=>{
					var hh = JSON.parse(res.request.response);
					_this.Apply = hh.data;
					if(!hh.data.commodityType){
						_this.commodityType = [];
					}
					_this.Apply.ApplyOriginType = 1000161;
			});
			}
		},
		addApply(){
			//this.step +=1;
			var apply = this.Apply;
			this.axios.post("/index.php?r=ClimateQuality/authentication/add-apply",{Apply:apply})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
            	this.$router.push('/module/cquality/certApplica');
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},
		updateApply(obj){
			var apply = this.Apply;
			this.axios.post("/index.php?r=ClimateQuality/authentication/update-apply",{Apply:apply})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status==200){
				this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
            	this.$router.push('/module/cquality/certApplica');
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
              }
            });
		},
		getType(){
			// 100017
			this.axios.post("/index.php?r=System/dic/get-dic",{CuitMoon_ParentDictionaryCode:'100017'})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.types = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},
		getArea(){
			// r=System/area/get-area
			this.axios.post("/index.php?r=System/area/get-area",{CuitMoon_ParentAreaCode:''})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.areas = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},

		addCertificate(){
			var _self = this;
			var Businessqualification = this.Businessqualification;
			this.axios.post("/index.php?r=ClimateQuality/authentication/add-certificate",{Businessqualification})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				_self.getCertificate();
				this.$message({

            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
            	var initBusiness = {
					Name:"",
					awardTime:"",
					publishUnit:"",
					picUrl:"",
				};
				_self.Businessqualification = initBusiness;
				_self.imageUrl = '';
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},
		handleAvatarSuccess(res, file) {
        	this.imageUrl = URL.createObjectURL(file.raw);
			this.Businessqualification.picUrl = res.data.url;
		},
		getProductType(){
			// productType
			/*this.axios.post("/index.php?r=System/dic/get-dic-by-recursive",{CuitMoon_ParentDictionaryCode:'10005'})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.productType = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });*/
            this.axios.post("/index.php?r=ClimateQuality/authentication/get-models")
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.productType = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},
		getApplyType(){
			// 100016
			this.axios.post("/index.php?r=System/dic/get-dic",{CuitMoon_ParentDictionaryCode:'100016'})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.applyTypes = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		},
		getCertificate(){
			this.axios.post("/index.php?r=ClimateQuality/authentication/get-certificate",{})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				this.tableData = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
			// tableData
		},
		deleteCertificate(index,row){
			this.axios.post("/index.php?r=ClimateQuality/authentication/delete-certificate",{BusinessID:row[index].BusinessID})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
				row.splice(index, 1);
                this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
		}


    },
	mounted() {
		this.imageSrc = gbs.host;
		this.imageAction = gbs.host+"/index.php?r=common/upload";
		this.getCertificate();
		// this.getApplyType();
		this.getProductType();
		this.getArea();
		this.getType();
		// this.addNum();
		this.start();
		this.initData();
	},
};
