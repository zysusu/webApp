 import {
    gbs
 } from 'config/settings.js';

module.exports = {
	name   : 'addExpert',
	data() {
		return {
            checkFlag:true,
			imageUrl:'',
            imgAction:'',
			province:[],
            city_list:[],
            side_list:[],
            area_data:{
                Province:'',
                City:'',
                Area:''
            },
            levelData:[], //专家级别
			expert_list : {
				Username : '',
				LoginPassword : '',
				Expertname : '',
				BelongToMeteorology : [],
				ExpertLevel : '',
				ExpertIntroduction : '',
				ExpertCategory : [],
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
				LoginPassword: [{
					required: true,
					message : '密码不能为空！',
					trigger : 'blur'
				}],
				checkPassword:[{
                    validator:(rule, value, callback)=>{
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.expert_list.LoginPassword) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
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
			}
		}
	},
	methods: {
        checkName(val){
            var name = this.expert_list.Username;
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
		  getCategory(){
            var _this = this;
                this.axios.post("/index.php?r=AuthCenter/expert-manage/get-expert-category")
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                    _this.Category = hh.data;
                });

                this.axios.post("/index.php?r=AuthCenter/expert-manage/add-expert-level")
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                    _this.levelData = hh.data;
                });
        },
		 getProvince(){
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/sheng")
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.province = hh.data;
            });
        },
        changeExpertLevel(val){
           
        },
        changeExpertProvince(val){
             // 选中省获取市/区
            this.area_data.City = '';
            this.expert_list.BelongToMeteorology[0] = this.area_data.Province;
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/shi",{CuitMoon_AreaName:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.city_list = hh.data;
            });
        },
        changeExpertCity(val){
             //选中市/区,获取街道
            this.area_data.Area = '';
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/xian",{CuitMoon_AreaName:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.side_list = hh.data;
            });
            this.expert_list.BelongToMeteorology[0] = this.area_data.Province;
            this.expert_list.BelongToMeteorology[1] = this.area_data.City;
        },
        changeExpertArea(val){
            // 选中获取街道
            this.expert_list.BelongToMeteorology[0] = this.area_data.Province;
            this.expert_list.BelongToMeteorology[1] = this.area_data.City;
            this.expert_list.BelongToMeteorology[2] = this.area_data.Area;
            console.log(this.expert_list.BelongToMeteorology);    
        },
		save_expert(expertlist) {
            if(this.checkFlag){
                this.$message({
                        showClose: false,
                        message  : "登录名已存在，请重新输入！",
                        type     : 'error'
                });
            }else{
                this.axios.post("/index.php?r=AuthCenter/expert-manage/add-expert",expertlist)
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'success'
                });
                this.$router.push('/module/acManage/speManage');
            }else{
                this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'error'
                });
            }
         });
            }
		},
		reBack(){
			this.$router.push('/module/acManage/speManage');
		},
		handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.expert_list.Photo = file.response.data.url;
        //  this.expert_list.Photo = URL.createObjectURL(file.raw);
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
		this.imgAction = gbs.host+"/index.php?r=common/upload";
        this.getProvince();
        this.getCategory();
        this.initRouters();
    },
	watch: {
		$route(to, from){
			this.getView();
		}
	}
}
