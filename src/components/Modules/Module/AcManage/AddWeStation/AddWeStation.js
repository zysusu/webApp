module.exports = {
	name   : 'addWeStation',
	data() {
		return {
		/*	user_data : {
			},*/
			// module_data : {			
			// },
			user_list : {
				CuitMoon_UserName : '',
				CuitMoon_UserPassWord : '123456',
				CuitMoon_AreaID : '',
				CuitMoon_UserMSN : '',
				CuitMoon_UserQQ : '',
				CuitMoon_UserEmail : '',
				CuitMoon_UserAddress : '',
				CuitMoon_UserCellphone : '',
				CuitMoon_UserBirthday : '',
				CuitMoon_UserSex : '',
				CuitMoon_ModuleStatus : '',
				CuitMoon_UserRealName : ''
			},
			users_rules: {
				CuitMoon_UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}],
				CuitMoon_UserPassWord: [{
					required: true,
					message : '密码不能为空！',
					trigger : 'blur'
				}],
				CuitMoon_AreaID: [{
					required: true,
					message : '所在地区不能为空！',
					trigger : 'blur'
				}]
			}
		}
	},
	methods: {
		save_user(userlist) {
			console.log(userlist);
			 		//var _this = this;
			 		alert(1);
	                this.axios.post("/index.php?r=System/user/add-user",userlist)
	                .then((res) => {  
	                var hh = JSON.parse(res.request.response);
	                if(hh.status===200){
	                	alert("添加成功！");
	                	this.$router.push('/module/sys/modManage');
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
			this.$router.push('/module/sys/userManage');
		},
		getView(){
			
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