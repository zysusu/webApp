 import {
    gbs
 } from 'config/settings.js';
module.exports = {
	name   : 'qualityFile',
	data() {
		return {
			 totalNum:0,
			 pageSize:10,
			 searchFlag:false,
			 fileInfomation:{},  //查看详情
			 fileList1: [
				{name: '认证报告.doc', 
				url: '',}
			 ],
			downUrl:'',
			fileData:[],
			imageUrl:'',
			imageUrl1:'',
            imgAction:'',
            imageSrc:'',
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
        names:[
       		{name1:'111',
              	name2:'222'},
              	{name1:'1212',
              	name2:'222232'},],
		}
	},
	methods: {
		getView(){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/buildfile/index',{pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status==200){
					_this.totalNum = parseInt(hh.data.total);
					_this.fileData = hh.data.Reportinfomation;
				}
			});
		},
		handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=ClimateQuality/buildfile/index',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
                _this.totalNum = parseInt(hh.data.total);
                _this.fileData = hh.data.Reportinfomation;
              }
       	  });
		}, 
		showMore(obj){
			this.imageUrl = '';
			this.imageUrl1 = '';
			this.showChild = true;
			var id = obj.ApplyBh;
			this.fileInfo.ApplyBh = obj.ApplyBh;
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/buildfile/add1',{ApplyBh:id})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status==200){
					_this.threeNames = hh.data.Apply;  //此处后台返回值不应该为数组
					_this.BearInfo = hh.data.Bearinginfo;
				}
			});
		},
		showAll(obj){
			this.lookAll = true;
			var id = obj.ApplyBh;
			this.fileInfo.ApplyBh = obj.ApplyBh;
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/buildfile/view',{ApplyBh:id})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status==200){
					_this.fileInfomation = hh.data.Apply;  //此处后台返回值不应该为数组
					_this.BearInfo = hh.data.Bearinginfo;
					_this.downUrl = hh.data.Apply.certificateAttachment;
					_this.fileList1[0].url = imageSrc+hh.data.Apply.certificateAttachment;
				}
			});

		},
		save_info(info){
			this.axios.post('/index.php?r=ClimateQuality/buildfile/add2',this.fileInfo)
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
	            if(hh.status===200){
	                this.$message({
	                    showClose: true,
	                    message  : hh.msg,
	                    type     : 'success'
	                });
	                this.lookAll = false;
	                this.showChild = false;
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
		 	this.searchFlag = true;
		 	var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=ClimateQuality/buildfile/search',{ProductName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                    	_this.totalNum = parseInt(hh.data.total);
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
        handleCurrentChange2(val){
            var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=ClimateQuality/buildfile/search',{ProductName:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
	                _this.totalNum = parseInt(hh.data.total);
	                _this.fileData = hh.data.Reportinfomation;
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
		},
		downLoad(){
			window.location.href = this.imageSrc + this.downUrl;
		},
		// 上传照片
		handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          if(file.response.data.url){
          	 this.fileInfo.AttachmentURL = file.response.data.url;
          }else{
          	  this.$message({
                showClose: true,
                message  : '照片上传失败！',
                type     : 'error'
              });
          }
       },
       // 上传认证证书
       handleAvatarSuccess1(res, file) {
          this.imageUrl1 = URL.createObjectURL(file.raw);
          this.fileInfo.certificateImage = file.response.data.url;
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
		this.imageSrc = gbs.host;
		this.getView();
	},

	watch: {
		$route(to, from){
			this.getView();
		}
	}
}