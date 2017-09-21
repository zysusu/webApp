import {
   gbs
} from 'config/settings.js';
module.exports = {
	name   : 'certApplica',
	data() {
		return {
			imageSrc:'',
			applyList:[],
			applyData:{},  //查看详情
			scoreData:[],
			search_data:{
				Name:'',
			},
			tableData:[],  //证书列表
			showChild:false,
			totalNum:0,
			pageSize:10,
			users_rules: {
				CuitMoon_UserName: [{
					required: true,
					message : '登录名不能为空！',
					trigger : 'blur'
				}]
			}
		}
	},
	methods: {
		onAdd(){
			this.$router.push('/module/cquality/apply');
		},
		getView(){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply',{pagesize:_this.pageSize,pagenum:1})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.totalNum = hh.data.total;
				_this.applyList = hh.data.apply;
			});
		},
		handleCurrentChange(val){
			var _this = this;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply',{pagesize:_this.pageSize,pagenum:val})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.totalNum = hh.data.total;
				_this.applyList = hh.data.apply;
			});
		},
		upData(applyBh){	
			this.axios.post('/index.php?r=ClimateQuality/authentication/report-apply',{ApplyBh:applyBh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        //window.location.reload();
                        this.getView();
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                  }
			});
		},
		showMore(obj){
			var applyBh = obj.ApplyBh;
			var _this = this;
			this.showChild = true;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-apply-one',{ApplyBh:applyBh})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.applyData = hh.data;
			});
			var User = obj.ApplyPerson;
			this.axios.post('/index.php?r=ClimateQuality/authentication/get-certificate-by-user',{user:User})
			.then((res)=>{
				var hh = JSON.parse(res.request.response);
				_this.tableData = hh.data;
			});
		},
		showUpdate(applyBh){
			this.$router.push('/module/cquality/apply?'+applyBh);
		},
		deleteData(obj,index){
            this.$confirm('你确定删除 '+obj.unityName+' 么?', '删除申请', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.axios.post("/index.php?r=ClimateQuality/authentication/delete-apply",{ApplyBh:obj.ApplyBh})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.applyList.splice(index,1);
                        this.totalNum = this.totalNum-1;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
                })
            });
		},
		onSearch(val) {
            var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthCenter/business-manage/search-business',{CampanyName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        _this.totalNum = hh.data.total;
                        _this.BussManager_list = hh.data.businessList;
                        _this.searchFlag = true;
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
            this.axios.post('/index.php?r=AuthCenter/business-manage/search-business',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = hh.data.total;
                _this.BussManager_list = hh.data.businessList;
        	});
    	},      
		onChangeDate(val) {
			this.user_list.CuitMoon_UserBirthday = val;
		},
		reBack(){
			this.showChild = false;
		},
	},
	mounted() {
		this.imageSrc = gbs.host;
		this.getView();
	},

	watch: {
		$route(to, from){
			//this.getView(1);
		}
	}
}