 import {
    gbs
 } from 'config/settings.js';

module.exports = {
	name : 'addBusiness',
	data() {
		return {
			imageUrl1:'',
			imageUrl2:'',
            imgAction:'',
            imageSrc:'',
			province:[],
            city_list:[],
            side_list:[],
            area_data:{
                Province:'',
                City:'',
                Area:''
            },
            picsData:[],  //证书图片信息
            area_list:[],
	        areaList:{
	            value : 'CuitMoon_AreaName',
	            label : 'CuitMoon_AreaName',
	            children : 'child'
	        },
			unit_type:[],  //单位性质
			company_type:[],   //企业性质
			boss_type:[],   //商家类型
			business_list : {
				UserName : '',
				LoginPassword : '',
				CampanyName : '',
				CampanyType : '',
				CompanyType : '',
				BusinessType : '',
				BusinessArea : '',
				LegalPerson : '',
				LegalPresentCode : '',
				Address : '',
				CantactPerson : '',
				TEL : '',
				MobilePhone : '',
				Fax : '',
				MailBox : '',
				Logo : '',
				Remark : '',
				Qualification : '',
				Certificate:[],
			},
			business_rules: {
				UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}],
				LoginPassword: [{
					required: true,
					message : '密码不能为空！',
					trigger : 'blur'
				}],
				 checkPassword:[{
                    validator:(rule, value, callback)=>{
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.business_list.LoginPassword) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }],
				CampanyName: [{
					required: true,
					message : '单位名称不能为空！',
					trigger : 'blur'
				}],
				CampanyType: [{
					required: true,
					message : '单位性质不能为空！',
					trigger : 'blur'
				}],
				CompanyType: [{
					required: true,
					message : '企业类型不能为空！',
					trigger : 'blur'
				}],
				BusinessType: [{
					required: true,
					message : '商家类型不能为空！',
					trigger : 'blur'
				}],
				BusinessArea: [{
					required: true,
					message : '商家所在地不能为空！',
					trigger : 'blur'
				}],
				LegalPerson: [{
					required: true,
					message : '法人不能为空！',
					trigger : 'blur'
				}],
				LegalPresentCode: [{
					required: true,
					message : '法人代表码不能为空！',
					trigger : 'blur'
				}]
			},
			certificate_list : {
				CertificateName : '',
				PictureUrl : '',
				GetTime : '',
				AwardDepart : '',
				Remark : ''
			},
			initCertFicate:{
				CertificateName : '',
				PictureUrl : '',
				GetTime : '',
				AwardDepart : '',
				Remark : ''
			},
			certificate_rules : {
			},
		}
	},
	methods: {
		checkName(val){
            var name = this.business_list.UserName;
            var _this = this;
             this.axios.post("/index.php?r=AuthCenter/expert-manage/is-one",{Username:name})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.msg=='exist'){
                    this.$message({
                        showClose: false,
                        message  : "登录名已存在，请重新输入！",
                        type     : 'error'
                    });
                }else{
                    _this.checkFlag = false;
                }
            });
        },
		getOldInfo(){
			var url = window.location.href;
			var ID = url.split("?");
			var id= ID[1];
			var _this = this;
			if(id){
				this.axios.post("/index.php?r=AuthCenter/business-manage/get-business",{CampanyNo:id})
	            .then((res) => {  
	            var hh = JSON.parse(res.request.response);
	             _this.business_list = hh.data;
	            // _this. = business_list.Certificate;
	            });
			}
		 },
		getProvince(){
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/sheng")
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.province = hh.data;
           });
        },
        changeExpertProvince(val){
             //alert(val);  选中省获取市/区
            this.area_data.City = '';
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/shi",{CuitMoon_AreaCode:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.city_list = hh.data;
            });
        },
        save_pic(obj){
        	//var picInfo = obj;
        	var list = {
        		CertificateName: obj.CertificateName,
				PictureUrl: obj.PictureUrl,
				AwardDepart: obj.AwardDepart,
				GetTime: obj.GetTime
        	};
        	this.business_list.Certificate.push(list);
        	this.certificate_list = this.initCertFicate;
        	// this.certificate_list.CertificateName = '';
        	// this.certificate_list.PictureUrl = '';
        	// this.certificate_list.AwardDepart = '';
        	// this.certificate_list.GetTime = '';
        },
        deleteCertificate(index){
        	this.business_list.Certificate.splice(index,1);
        },
        updateTime(val){
        	this.certificate_list.GetTime = val;
        },
        handleAvatarSuccess1(res, file) {
          this.imageUrl1 = URL.createObjectURL(file.raw);
          this.business_list.Logo = file.response.data.url;
        //  this.expert_list.Photo = URL.createObjectURL(file.raw);
       },
       handleAvatarSuccess2(res, file) {
          this.imageUrl2 = URL.createObjectURL(file.raw);
          this.certificate_list.PictureUrl = file.response.data.url;
        //  this.expert_list.Photo = URL.createObjectURL(file.raw);
       },
        changeExpertCity(val){
             //alert(val);  选中市/区,获取街道
            this.area_data.Area = '';
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/xian",{CuitMoon_AreaCode:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.side_list = hh.data;
            });
        },
        changeExpertArea(val){
            //alert(val);  选中获取街道
            // this.expert_list.BelongToMeteorology.push(this.area_data.Province);
            // this.expert_list.BelongToMeteorology.push(this.area_data.City);
            // this.expert_list.BelongToMeteorology.push(this.area_data.Area);
            // console.log(this.expert_list.BelongToMeteorology);    
        },
		getData(){
			var _this = this;
			this.axios.post('/index.php?r=AuthCenter/business-manage/get-category')
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.unit_type = hh.data.unit_type;
				_this.company_type = hh.data.company_type;
				_this.boss_type = hh.data.boss_type;
			});
			//获取全部地区
	        this.axios.post("/index.php?r=System/area/get-area",{"CuitMoon_ParentAreaCode": ""})
	        .then((res) => {  
	            var hh = JSON.parse(res.request.response);          
	            _this.area_list = hh.data;
	        });
		},
		save_business(businesslist,certificate_list) {
			var _this = this;
            this.axios.post("/index.php?r=AuthCenter/business-manage/add-business",_this.business_list)
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
            	this.$message({
            		showClose:true,
            		message:hh.msg,
            		type:"success"
            	});
            this.$router.push('/module/acManage/bussManage');
            }else{
            	this.$message({
            		showClose:true,
            		message:hh.msg,
            		type:"error"
            	});
             }
          });
		},
		reBack(){
			this.$router.push('/module/acManage/bussManage');
		},
	},
	mounted() {
		this.imageSrc = gbs.host;
		this.imgAction = gbs.host+"/index.php?r=common/upload";
		this.getProvince();
		this.getData();
		this.getOldInfo();
	},
	watch: {
		$route(to, from){
			this.getView();
		}
	}
}
