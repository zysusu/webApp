 import {
    gbs
 } from 'config/settings.js';
module.exports = {
	name   : 'traApply',
	data() {
		return {
			totalNum:0,
            pageSize:10,
            searchFlag:false,
			imageSrc:'',
			imageUrl:'',
			tableData:[],  //证书表格
			apply_data: [],
			apply_list:[],
			area_list:[],
			lookInfo:false,
			productInfo:{},
			showDuctInfo:{},
			credenInfo:{
				GetTime:'',
				PictureUrl:''
			},//证书信息
			Businessqualification:{
				Name:"",
				awardTime:"",
				publishUnit:"",
				picUrl:"",
			},
			tableInfo:'',
			province:{},
			city:{},
			country:{},
			areaList:{
				value : 'CuitMoon_AreaCode',
				label : 'CuitMoon_AreaName',
				children : 'child'
			},
			initProductInfo:{
				"ApplyCompany": "",
				"OriginName": "",
				"OriginAddress":[],
				"ProductValue": "",
				"ProductBrand": "",
				"PersonAdress":'',
				"ProductNum": "",
				"Constract": "",
				"LabelNum": "",
				"OriginDescription": ""
			},
			initCreden:{
				"CertificateName": "",
				"AwardDepart": "",
				"GetTime": "",
				"PictureUrl": ""
			},
			batch_id  : '', //批量删除时这是多个用逗号隔开的id字符串
			batch_flag: true, //符合批量删除为true,否则为false
			//需要给分页组件传的信息
			paginations: {
				current_page: 1,
				total       : 0,
				page_size   : 12,
				page_sizes  : [3, 9, 12, 24],
				layout      : "total, sizes, prev, pager, next, jumper"
			},
			showAdd:false,
			search_data: {
				Name: ''
			},
			add_rules:{
				ApplyCompany : [{
					required: true,
					message : '单位名称不能为空！',
					trigger : 'blur'
				}],
				OriginName : [{
					required: true,
					message : '产品名称不能为空！',
					trigger : 'blur'
				}],
				OriginAddress : [{
					required: true,
					message : '生产基地不能为空！',
					trigger : 'blur'
				}],
				ProductValue : [{
					required: true,
					message : '产品产值不能为空！',
					trigger : 'blur'
				}],
				ProductBrand : [{
					required: true,
					message : '产品品牌不能为空！',
					trigger : 'blur'
				}],
				PersonAdress : [{
					required: true,
					message : '联系地址不能为空！',
					trigger : 'blur'
				}],
				ProductNum : [{
					required: true,
					message : '产品产量不能为空！',
					trigger : 'blur'
				}],
				Constract : [{
					required: true,
					message : '联系方式不能为空！',
					trigger : 'blur'
				}],
				LabelNum : [{
					required: true,
					message : '申请标签数量不能为空！',
					trigger : 'blur'
				}],
				OriginDescription : [{
					required: true,
					message : '产品描述不能为空！',
					trigger : 'blur'
				}],
				CertificateName : [{
					required: true,
					message : '证书名称不能为空！',
					trigger : 'blur'
				}],
				AwardDepart : [{
					required: true,
					message : '颁发部门不能为空！',
					trigger : 'blur'
				}],
				PictureUrl : [{
					required: true,
					message : '证书照片不能为空！',
					trigger : 'blur'
				}]
			},
			//详情弹框信息
			dialog: {
				show        : false,
				apply_info: {}
			},

			fields: {			
				OriginID: {
					info  : {
						prop    : 'OriginID',
						label   : '溯源ID',					
					},
					filter: {},
					style : {
						width: '260',
						align: 'center'
					}
				},				
				OriginName: {
					info  : {
						prop    : 'OriginName',
						label   : '产品名称',						
					},
					filter: {},
					style : {
						width: '260',
						align: 'center'
					}
				},
				ProductBrand      : {
					info  : {
						prop    : 'ProductBrand',
						label   : '产品品牌',
						sortable: true
					},
					filter: {},
					style : {
						width: '150',
						align: 'center'
					}
				},
				ApplyCompany      : {
					info  : {
						prop    : 'ApplyCompany',
						label   : '申请商家',
						sortable: true
					},
					filter: {},
					style : {
						width: '150',
						align: 'center'
					}
				},
				ApplyPerson      : {
					info  : {
						prop    : 'ApplyPerson',
						label   : '申请人',
						sortable: true
					},
					filter: {},
					style : {
						width: '150',
						align: 'center'
					}
				},
				ApplyTime      : {
					info  : {
						prop    : 'ApplyTime',
						label   : '申请时间',
						sortable: true
					},
					filter: {},
					style : {
						width: '150',
						align: 'center'
					}
				},
				OrignStatus      : {
					info  : {
						prop    : 'OrignStatus',
						label   : '审核状态',
						sortable: true
					},
					filter: {},
					style : {
						width: '150',
						align: 'center'
					}
				},
			}
		}
	},
	methods: {
		save_info(product){
			var _this = this;
			this.axios.post('/index.php?r=origin/apply/create',{product:product})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status===200){
					this.$message({
						showClose: true,
						type:"success",
						message:hh.msg,
					});
					window.location.reload();
				}else{
					this.$message({
						showClose: true,
						type:"error",
						message:hh.msg,
					});
				}
			});	
		},
		updateTime(val){
        	this.credenInfo.GetTime = val;
        },
        upApply(obj){
        	var id = obj.OriginID;
        	var _this = this;
        	  this.axios.post("/index.php?r=origin/apply/report",{OriginID:id})
             .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
                	this.$message({ 
                        showClose: true,
                        message  : hh.msg,
                        type     : 'success'
                    });
                    this.getData();
                }
                else{
 					this.$message({ 
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
               	}    
            });
        },
		/**
		 * 搜索事件
		 */
		onSearch() {
			this.searchFlag = true;
			var _this = this;
			var name = _this.search_data.Name;
            this.axios.post("/index.php?r=origin/apply/search",{OriginName:name,pagesize:_this.pageSize,pagenum:1})
             .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                	_this.apply_list = hh.data.Productapply;
                	_this.totalNum = parseInt(hh.data.total);
                }
                else{
 					this.$message({ 
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
               	}    
            });
		},
		//上传证书
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
		},
		//保存证书
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
		/**
		 * 改变页码和当前页时需要拼装的路径方法
		 * @param {string} field 参数字段名
		 * @param {string} value 参数字段值
		 */
		setPath(field, value) {
			var path  = this.$route.path,
				query = Object.assign({}, this.$route.query);

			if (typeof field === 'object') {
				query = field;
			} else {
				query[field] = value;
			}

			this.$router.push({
				path,
				query
			});
		},


		onSelectArticle(apply) {
			this.dialog.show         = true;
			this.dialog.apply_info = apply;
		},
		onShowApply(info){
			var ID = info.OriginID;
			this.lookInfo = true;
			var _this = this;
			this.axios.post('/index.php?r=origin/apply/view',{OriginID:ID})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.showDuctInfo = hh.data;
			});
			var User = info.ApplyPerson;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-certificate',{user:User})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.tableInfo = hh.data;
			});
		},
		onCloseView() {
		},
		/**
		 *添加
		 */
		onAdd(){
			this.showAdd = true;
			this.productInfo = initProductInfo;
			this.credenInfo = initCreden;
		},
		reBack(){
			this.showAdd = false;
			this.lookInfo = false;
		},
		getData(){
	            var _this = this;
	            this.axios.post('/index.php?r=origin/apply/index',{pagesize:_this.pageSize,pagenum:1})
	            .then((res)=>{
	                 var hh = JSON.parse(res.request.response);
	                 _this.apply_list = hh.data.Apply;
	            });
              //获取省级地区
                this.axios.post("/index.php?r=System/area/get-area",{"CuitMoon_ParentAreaCode": ""})
                .then((res) => {  
               		var hh = JSON.parse(res.request.response); 
               		_this.totalNum = hh.data.total;         
                    _this.area_list = hh.data;
               });
        },
        handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=origin/apply/index',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.apply_list = hh.data.Apply;
            });
        },
        handleCurrentChange2(val){
			var _this = this;
			var name = _this.search_data.Name;
            this.axios.post("/index.php?r=origin/apply/search",{OriginName:name,pagesize:_this.pageSize,pagenum:val})
             .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                	_this.apply_list = hh.data.Productapply;
                	_this.totalNum = parseInt(hh.data.total);
                }
                else{
 					this.$message({ 
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
               	}   
            });
		}, 
       /* handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.credenInfo.PictureUrl = file.response.data.url;
       },*/
       handleAvatarSuccess1(res, file) {
        	this.imageUrl = URL.createObjectURL(file.raw);
			this.Businessqualification.picUrl = res.data.url;
		},
     	beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;

     	 }
	},
	mounted() {
		this.imageSrc = gbs.host;
		this.imgAction = gbs.host+"/index.php?r=common/upload";
		this.getData();
		this.getCertificate();
	},
	 watch: {
        '$route' (to, from) {
            this.getData();
        }
    }
}