import {
   gbs
} from 'config/settings.js';
module.exports = {
    name:'dataManage',
	data() {
		return {
            weatherModal:false,
            weatherData:[],
            addPic:true,
            addWeather:true,
            DataOrigins:[],
            originProps:{
                label:"CuitMoon_AreaName",
                value: 'CuitMoon_AreaCode',
                children: 'child'
              },
            activeQualityIdentificationNum:"",
            bearing:[],
            dataOrigin:[],
            Prictureinfomation:{
                ApproveDataCode:"",
                ProctureUrl:"",
                CollectionTime:"",
                Remark:"",
                DataOrigin:"",
                cropGrowthPeriod:"",
            },
            Disastoursdata:{
                ApproveDataCode:"",
                DataOrigin:"",
                DisastoursDescription:"",
                Remark:"",
            },
            activeApproveDataCode:"",
            start:"",
            end:"",
            imageSrc:"",
            picData:[],
            active:1,
            total:0,
			pagesize:10,
			pagenum:1,
            tableData:[],
            dialogTableVisible: false,
            imageAction:"",
            imageUrl:"",
            activeArea:"",
		}
    },
    methods: {
        addBtn(){
            this.Prictureinfomation.ApproveDataCode = '';
            this.Prictureinfomation.ProctureUrl = '';
            this.Prictureinfomation.CollectionTime = '';
            this.Prictureinfomation.Remark = '';
            this.Prictureinfomation.DataOrigin = '';
            this.Prictureinfomation.cropGrowthPeriod = '';
            this.dialogTableVisible = true;
            this.addPic = true;
        },
        addWeatherBtn(){
            this.Disastoursdata.ApproveDataCode = '';
            this.Disastoursdata.DataOrigin = '';
            this.Disastoursdata.DisastoursDescription = '';
            this.Disastoursdata.Remark = '';
            this.addWeather = true;
            this.weatherModal = true;
        },
        getOrigins(){
            var area = this.activeArea;
            this.axios.post("/index.php?r=ClimateQuality/data/get-weather-by-area",{BelongTo:area})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.DataOrigins = hh.data;

            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        getBear(){
            this.bearing = [];
            var QualityIdentificationNum = this.activeQualityIdentificationNum;
            this.axios.post("/index.php?r=ClimateQuality/data/get-bearing",{QualityIdentificationNum:QualityIdentificationNum})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.bearing = hh.data;

            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        weatherManage(index,row){
            this.active = 3;
            this.activeApproveDataCode = row[index].ApproveDataCode;
            this.getWeather();
        },
        picManage(index,row){
            this.imageSrc = gbs.host;
            this.active = 2;
            this.activeApproveDataCode = row[index].ApproveDataCode;
            this.activeQualityIdentificationNum = row[index].QualityIdentificationNum;
            this.getPic();
            this.getBear();
        },
        getPic(){
            var activeApproveDataCode = this.activeApproveDataCode;
            this.axios.post("/index.php?r=ClimateQuality/data/get-image",{ApproveDataCode:activeApproveDataCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.picData = hh.data;

            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        getWeather(){
            var activeApproveDataCode = this.activeApproveDataCode;
            this.axios.post("/index.php?r=ClimateQuality/data/get-weather-info",{ApproveDataCode:activeApproveDataCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.weatherData = hh.data;

            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        deletePic(index,row){
            this.axios.post("/index.php?r=ClimateQuality/data/delete-image",{PictureCode:row[index].PictureCode})
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
        deleteWeather(index,row){
            this.axios.post("/index.php?r=ClimateQuality/data/delete-weather",{DataCode:row[index].DataCode})
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
        search(){
            var start = this.start;
            var end = this.end;
            var activeApproveDataCode = this.activeApproveDataCode;
            this.imageSrc = gbs.host;
            var _this = this;
            this.active = 2;
            this.axios.post("/index.php?r=ClimateQuality/data/get-image",{start:start,end:end,ApproveDataCode:activeApproveDataCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                _this.picData = hh.data;

            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        searchWeather(){
            var start = this.start;
            var end = this.end;
            var activeApproveDataCode = this.activeApproveDataCode;
            this.active = 3;
            this.axios.post("/index.php?r=ClimateQuality/data/get-weather-info",{start:start,end:end,ApproveDataCode:activeApproveDataCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.weatherData = hh.data;

            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        getData(pagenum){
			var pagesize = this.pagesize;
            this.axios.post("/index.php?r=ClimateQuality/data/get-data",{pagesize:pagesize,pagenum:pagenum})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.pagesize = hh.data.pagesize;
				this.total = hh.data.total;
                this.tableData = hh.data.Data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        addWeatherSave(){
            var Disastoursdata = this.Disastoursdata;
            Disastoursdata.ApproveDataCode = this.activeApproveDataCode;
            this.axios.post("/index.php?r=ClimateQuality/data/add-weather",{Disastoursdata})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.getWeather();
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
        addPicSave(){
            var Prictureinfomation = this.Prictureinfomation;
            Prictureinfomation.ApproveDataCode = this.activeApproveDataCode;
            this.axios.post("/index.php?r=ClimateQuality/data/add-image",{Prictureinfomation})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.getPic();
                this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
                this.dialogTableVisible = false; 
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
			this.Prictureinfomation.ProctureUrl = res.data.url;
			// alert(this.Businessqualification.picUrl);
		},
        getArea(){
            // dataOrigin
            this.axios.post("/index.php?r=System/area/get-area",{CuitMoon_ParentAreaCode:0})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){

                this.dataOrigin = hh.data;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        saveDate(val){
            this.Prictureinfomation.CollectionTime = val;
        },
        updatePic(index,row){
            this.axios.post("/index.php?r=ClimateQuality/data/get-image-one",{PictureCode:row[index].PictureCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.addPic = false;
                this.dialogTableVisible = true;
                this.Prictureinfomation = hh.data;
                this.imageUrl = gbs.host +hh.data.ProctureUrl;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        updateWeather(index,row){
            this.axios.post("/index.php?r=ClimateQuality/data/get-weather-one",{DataCode:row[index].DataCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.addWeather = false;
                this.weatherModal = true;
                this.Disastoursdata = hh.data;
                // this.imageUrl = gbs.host +hh.data.ProctureUrl;
            }else if(hh.status==404){
            	this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'error'
            	});
            }
            });
        },
        updateWeatherSave(){
            var Disastoursdata = this.Disastoursdata;
            this.axios.post("/index.php?r=ClimateQuality/data/update-weather",{Disastoursdata})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.getWeather();
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
        updatePicSave(){
            var Prictureinfomation = this.Prictureinfomation;
            this.axios.post("/index.php?r=ClimateQuality/data/update-image",{Prictureinfomation})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.getPic();
                this.$message({
            		showClose: true,
            		message  : hh.msg,
            		type     : 'success'
            	});
                this.dialogTableVisible = false; 
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
        this.getArea();
        this.imageAction = gbs.host+"/index.php?r=common/upload";
        this.getData(1);
	},
};
