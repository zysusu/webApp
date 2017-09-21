 import {
    gbs
 } from 'config/settings.js';
module.exports = {
	name   : 'labelApply',
	data() {
		return {
            active:1,
            LabelApplicationData:[],
            Labelapplication: {
        		"ApplyBh": "",
        		"applyType": "",
        		"piCi": "",
        		"Format": "",
        		"inTotal": "",
        		"ApplyReason": "",
        		"Image": ""
        	},
            imageUrl:"",
            imageAction:"",
            dialogTableVisible:false,
            applyType:[],
            type:"",
            resType:"",
            productsData:[],
            pagenum:1,
            pagesize:10,
            total:0,
		}
    },
    methods: {
        getTypes(){
            this.axios.post("/index.php?r=System/dic/get-dic",{CuitMoon_ParentDictionaryCode:"100016"})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.applyType = hh.data;
                this.type = hh.data[0].CuitMoon_DictionaryCode;
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
			this.Labelapplication.Image = res.data.url;
		},
        getProducts(pagenum){
            // var pagenum = this.pagenum;
            var pagesize = this.pagesize;
            var seType = this.type;
            this.axios.post("/index.php?r=Label/labelapply/get-products",{type:seType,pagesize:pagesize,pagenum:pagenum})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.productsData = hh.data.labels;
                this.resType = hh.data.type;
                this.pagesize = hh.data.pagesize;
                this.total = hh.data.total;
                this.Labelapplication.applyType = hh.data.type;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        typeChange(value){
            this.getProducts(1);
        },
        addApply(index,row){
            this.Labelapplication.ApplyBh = row[index].ApplyBh;
            this.dialogTableVisible = true;
        },
        saveApply(){
            var Labelapplication = this.Labelapplication;
            this.axios.post("/index.php?r=Label/labelapply/add-label-apply",{Labelapplication})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
             this.dialogTableVisible = false;
             this.getProducts(1);
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        viewApply(index,row){
            this.active=2;
            var app = row[index].ApplyBh;
            this.axios.post("/index.php?r=Label/labelapply/get-labels",{pagesize:10,pagenum:1,ApplyBh:app})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                    this.LabelApplicationData = hh.data.labels;
                }else if(hh.status==404){
                	this.$message({
                		showClose: true,
                		message  : hh.msg,
                		type     : 'error'
                	});
                }
            });
        },
            initRouters(){
            var routes = this.$router.options.routes;
            for (var i = 0; i < routes.length; i++) {
                if (routes[i].hidden !== true && routes[i].children && routes[i].children.length) {
                    var tempObj = {},
                        module = routes[i],
                        menus = module.children;
                    tempObj.name = module.name;
                    tempObj.path = module.path;
                    tempObj.access = module.path;
                    tempObj.children = [];
                    for (var j = 0; j < menus.length; j++) {
                        if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
                            var tempChildObj = {},
                                menu = menus[j],
                                pages = menu.children;
                            tempChildObj.name = menu.name;
                            tempChildObj.path = '/' + menu.path;
                            tempChildObj.access = tempObj.path + '/' + menu.path;
                            tempChildObj.children = [];
                            for (var k = 0; k < pages.length; k++) {
                                if (pages[k].hidden !== true) {
                                    var tempPageObj = {},
                                        page = pages[k];
                                    tempPageObj.name = page.name;
                                    tempPageObj.path = '/' + page.path;
                                    tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
                                    tempChildObj.children.push(tempPageObj);
                                }
                            }
                            tempObj.children.push(tempChildObj);
                        }
                    }
                    this.accesss.push(tempObj);
                }
            }
        }

    },
	mounted() {
        this.imageAction = gbs.host+"/index.php?r=common/upload";
        this.getTypes();
        this.initRouters();
	},
	watch: {
		$route(to, from){
			//this.getView();
		}
	}
}
