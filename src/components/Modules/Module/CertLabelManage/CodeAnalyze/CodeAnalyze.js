 import {
    gbs
 } from 'config/settings.js';
 import echarts from 'echarts';

module.exports = {
	name   : 'codeAnalyze',
	data() {
		return {
			 totalNum:0,
			 pageSize:10,
			 searchFlag:false,
			 applyType:[],
			 fileData:[],
			imageUrl:'',
			imageUrl1:'',
            imgAction:'',
			BearInfo:[],
			fileInfo:{
				ApplyBh:'',
				HeadleAgency:'',
				ApproveConclusion:'',
				Approvelevel:'',
				ApproveAgency:'',
				Remark:'',
				AttachmentURL:'',
				certificateImage:'',
				certificatAttachment:''
			},
			productInfo:{},
			showChild:false,
			lookAll:false,
			search_data:{
				Name:'',
				Type:'',
			},
			threeNames:{

			},
			users_rules: {
				CuitMoon_UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}]
			},
			bearinginfo: [                              
            {
                "cropGrowthPeriod": "发顺丰", 
                startCollectionTime: "2017-06-06 00:00:00",
                "endCollectionTime": "2017-06-06 00:00:00",
                name:[
                	{name1:'111',
                	name2:'222'},
                	{name1:'1212',
                	name2:'222232'},
                ]
            }, 
            {
                "cropGrowthPeriod": "结果期", 
                "startCollectionTime": "2017-06-07 00:00:00", 
                "endCollectionTime": "2017-06-13 00:00:00",
                name:[
                	{name1:'111',
                	name2:'222'},
                	{name1:'1212',
                	name2:'222232'},
                ]
            }
        ],
        names:[
       				{name1:'111',
                	name2:'222'},
                	{name1:'1212',
                	name2:'222232'},],
		}
	},
	methods: {
		 getTypes(){
            this.axios.post("/index.php?r=System/dic/get-dic",{CuitMoon_ParentDictionaryCode:"100016"})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.applyType = hh.data;
                this.search_data.Type = hh.data[0].CuitMoon_DictionaryCode;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        typeChange(val){
        	this.search_data.Type = val;
        	var _this = this;
			var Type = val;
        	this.axios.post('/index.php?r=Label/labelapply/get-products',{type:Type,pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.fileData = hh.data.labels;
				if(hh.data.total){
					_this.totalNum = hh.data.total;
				}
			});
        },
		getView(){
			var _this = this;
			var Type = this.search_data.Type;
			this.axios.post('/index.php?r=Label/labelapply/get-products',{type:Type,pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.fileData = hh.data.labels;
			});
		},
		showMore(obj){
			var id = obj.ApplyBh;
			this.$router.push('/module/certLabelManage/lineEcharts?'+id);
		},
		showAll(obj){
			this.lookAll = true;
		},
		save_info(info){
			this.axios.post('/index.php?r=ClimateQuality/buildfile/add',info)
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
	            if(hh.status===200){
	                this.$message({
	                    showClose: true,
	                    message  : hh.msg,
	                    type     : 'success'
	                });
	               // this.$router.push('/module/acManage/speManage');
	            }else{
	                this.$message({
	                    showClose: true,
	                    message  : hh.msg,
	                    type     : 'error'
	                });
	            }
			});
		},
		 onSearch(val) {
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=ClimateQuality/buildfile/search',{ProductName:name})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.fileData = hh.data;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
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
			this.showChild = false;
			this.lookAll = false;
			//this.$router.push('/module/sys/userManage');
		},
		// 上传照片
		handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.fileInfo.AttachmentURL = file.response.data.url;
        //  this.expert_list.Photo = URL.createObjectURL(file.raw);
       },
       // 上传认证证书
       handleAvatarSuccess1(res, file) {
          this.imageUrl1 = URL.createObjectURL(file.raw);
          this.fileInfo.certificateImage = file.response.data.url;
        //  this.expert_list.Photo = URL.createObjectURL(file.raw);
       },
       upSuccess1(response, file, fileList){
       	  this.fileInfo.certificateImage = response.data.url;
       },
       upSuccess2(response,file,fileList){
       	  this.fileInfo.certificatAttachment = response.data.url;
       },
	},
	mounted() {
		this.imgAction = gbs.host+"/index.php?r=common/upload";
		this.getView();
		this.getTypes();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}