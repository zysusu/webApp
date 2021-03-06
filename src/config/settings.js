var env = process.env;
var settings = {
	//全局设置
	gbs: {
		//host:'http://210.41.228.124:9999/WebApp/basic/web',
		host: 'http://exam.cuit.edu.cn:9999/WebApp/basic/web',
		//host: '/slsAdminApi', //接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
		db_prefix: 'sls_admin_', //本地存储的key
	},
	//回调
	cbs: {
		/**
		 * ajax请求成功，返回的状态码不是200时调用
		 * @param  {object} err 返回的对象，包含错误码和错误信息
		 */
		statusError(err) {
			// alert(1);
			if (err.status !== 404) {
				this.$message({
					showClose: true,
					message: '返回错误：' + err.msg,
					type: 'error'
				});
			} else {
				this.$store.dispatch('remove_userinfo').then(() => {
					this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
						confirmButtonText: '确定',
						callback: action => {
							this.$router.push('/login');
						}
					});
				});
			}
		},
		/**
		 * ajax请求网络出错时调用
		 */
		/*requestError(err) {
			this.$message({
				showClose: true,
				message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
				type: 'error'
			});
		}*/
		requestError(err){
			// alert(2);
			if(err.response.data.status==401){
				this.$message({
				showClose: true,
				message: '登录已过期，请重新登录！',
				type: 'error'
			});
			this.$router.push("/login");
		  }
		}
	}
};

module.exports = settings;
