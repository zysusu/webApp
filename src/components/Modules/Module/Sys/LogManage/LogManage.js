module.exports = {
	name:'logManage',
	data() {
		return {
			total:0,
			pagesize:20,
			pagenum:1,
			tableData:[]
		};
    },
    methods: {
		getLog(pagenum){
			var total = this.total;
			var pagesize = this.pagesize;
			// var pagenum = this.pagenum;
			this.axios.post("/index.php?r=System/log/get-logs",{pagenum:pagenum,pagesize:pagesize})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
            	this.tableData = hh.data.log;
				this.pagesize = hh.data.pagesize;
				this.total = hh.data.total;
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
		this.getLog(1);
	},
};
