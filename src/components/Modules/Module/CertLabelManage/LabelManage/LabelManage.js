 import {
    gbs
 } from 'config/settings.js';

module.exports = {
	name:'labelManage',
	data() {
		return {
			FrontURL:'',
            options:[{value:"是"},{value:"否"}],
            optionss:[{value:"有效"},{value:"无效"}],
            cansee:false,
            activeApp:'',
            activeApplicationid:'',
            totalLabel:0,
            pagenumLabel:1,
            pagesizeLabel:10,
            pagenumLY:1,
            pagesizeLY:10,
            totalLY:0,
            active:1,
            LYdata:[],
            LabelApplicationData:[],
            // Labelapplication: {
        	// 	"ApplyBh": "",
        	// 	"applyType": "",
        	// 	"piCi": "",
        	// 	"Format": "",
        	// 	"inTotal": "",
        	// 	"ApplyReason": "",
        	// 	"Image": ""
        	// },
        	Labelproviderecord:{},
            Labelapplication: {
        		"LabelApplicationId": "",
        		"ApplyBh": "",
        		"applyType": "",
        		"pici": "",
        		"Format": "",
        		"inTotal": "",
        		"ApplyReason": "",
        		"Image": "",
        		"ApplyTime": "",
        		"LabelMakeStatus": "",
        		"ApplyPerson": ""
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
            totalRecord:0,
            pagenumRecord:1,
            pagesizeRecord:10,
            recordData:[],
            activeRecord:'',
            scanData:[],
            pagenumScan:1,
            pagesizeScan:10,
            totalScan:0,
            recordCansee:false,
            Labermanagement:{},
		}
    },
    methods: {
        getTypes(){
            this.axios.post("/index.php?r=System/dic/get-dic",{CuitMoon_ParentDictionaryCode:"100016"})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.applyType = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
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
        saveApply(){
            // Label/labelapply/add-label-apply
            var Labelapplication = this.Labelapplication;
            this.axios.post("/index.php?r=Label/labelmanage/update-label-apply",{Labelapplication})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
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
        viewApply(index,row){

            // LabelApplicationData
            this.activeApp = row[index].ApplyBh;
            this.activeApplicationid = row[index].LabelApplicationId;

            this.getApplylabel(1);
        },
        getManage(index,row){

            this.activeApp = row[index].ApplyBh;
            this.activeApplicationid = row[index].LabelApplicationId;
            this.getLYManage(1);
        },
        getLYManage(pagenum){
            var pagesize = this.pagesizeLY;
            // var pagenum = this.pagenumLY;
            var id = this.activeApp;
            this.axios.post("/index.php?r=Label/labelmanage/get-record",{pagesize:pagesize,pagenum:pagenum,id:id})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.active=3;
                this.pagesizeLY = hh.data.pagesize;
                this.totalLY = hh.data.total;

                this.LYdata = hh.data.record;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        getApplylabel(pagenum){
            var pagesize = this.pagesizeLabel;
            // var pagenum = this.pagenumLabel;
            var app = this.activeApp;
            this.axios.post("/index.php?r=Label/labelapply/get-labels",{pagesize:pagesize,pagenum:pagenum,ApplyBh:app})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.active=2;
                this.pagesizeLabel = hh.data.pagesize;
                this.totalLabel = hh.data.total;

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
        getRecord(pagenum){
            var pagesize = this.pagesizeRecord;
            var applyBh = this.activeApp;
            this.axios.post("/index.php?r=Label/labelmanage/get-label",{pagesize:pagesize,pagenum:pagenum,applyBh:applyBh})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.active = 4;
                this.pagesizeRecord = hh.data.pagesize;
                this.totalRecord = hh.data.total;

                this.recordData = hh.data.label;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        deleteLabel(index,row){
            this.axios.post("/index.php?r=Label/labelmanage/delete-labelapplication",{LabelApplicationId:row[index].LabelApplicationId})
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
        downloadLabel(index,row){
            window.location.href=gbs.host+"/index.php?r=Label/labelmanage/download-label"+
            "&LabelApplicationId="+row[index].LabelApplicationId+"&frontUrl="+this.FrontURL;
        },
        makeLabel(index,row){
            this.axios.post("/index.php?r=Label/labelmanage/make-label",{LabelApplicationId:row[index].LabelApplicationId})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                row[index].LabelMakeStatus = '制作完成';
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
        updateLabel(index,row){
            var self = this;
            this.axios.post("/index.php?r=Label/labelmanage/get-label-apply-by-id",{LabelApplicationId:row[index].LabelApplicationId})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                self.dialogTableVisible = true;
                this.Labelapplication = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        deleteLY(index,row){
            this.axios.post("/index.php?r=Label/labelmanage/delete-record",{ReceiveId:row[index].ReceiveId})
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
        updateLY(index,row){

            // Labelproviderecord
            this.axios.post("/index.php?r=Label/labelmanage/get-record-by-id",{ReceiveId:row[index].ReceiveId})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.cansee = true;
                this.Labelproviderecord = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        saveLY(){
            var Labelproviderecord = this.Labelproviderecord;
            this.axios.post("/index.php?r=Label/labelmanage/update-record",{Labelproviderecord})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.getLYManage(1);
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
        manageLabel(index,row){

            this.activeApp = row[index].ApplyBh;
            this.activeApplicationid = row[index].LabelApplicationId;
            this.getRecord(1);
        },
        viewRecord(index,row){

            this.activeRecord = row[index];
            this.getScan(1);
        },
        deleteRecord(index,row){
            this.axios.post("/index.php?r=Label/labelmanage/delete-label",{LabelID:row[index].LabelID})
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
        getScan(pagenum){
            // scanData
            var pagesize = this.pagesizeScan;
            var LabelID = this.activeRecord.LabelID;
            this.axios.post("/index.php?r=Label/labelmanage/get-label-scan-record",{pagesize:pagesize,pagenum:pagenum,LabelID:LabelID})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.active = 5;
                this.pagesizeScan = hh.data.pagesize;
                this.totalScan = hh.data.total;

                this.scanData = hh.data.label;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        updateRecord(index,row){
            this.axios.post("/index.php?r=Label/labelmanage/get-label-by-id",{LabelID:row[index].LabelID})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.recordCansee = true;
                this.Labermanagement = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        saveRecord(){
            var Labermanagement = this.Labermanagement;
            this.axios.post("/index.php?r=Label/labelmanage/update-label",{Labermanagement})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.getRecord(1);
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
        },

    },
	mounted() {
		this.FrontURL = gbs.host;
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
