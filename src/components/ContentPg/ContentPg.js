import echarts from 'echarts';
 import {
    gbs
 } from 'config/settings.js';
module.exports = {
    name: 'contentPg',
    data() {
        return {
            productCode:'',   //溯源查询
            pageSize:20,
            showAll:true,   //判断显示单条新闻还是新闻列表（默认）
            totalNum:0,
            currentPage:1,
            preImg:'../../assets/img0',
            nextImg:'.jpg',
            typeFlag:0,
            imgUrl:'',
            listData:[],
            Type:'',
            Text:'',
            NewsTitle:'',
            NewsKey:'',
            ReportTime:''
        }
    },
    methods: {
        setSize() {
        },
        toHome(){
            this.$router.push("/homePage");
        },
        changeType(name){
            var _this = this;
            this.Type = name;
            this.axios.post("/index.php?r=site/get-news",{"type":name,"pagenum":1,"pagesize":this.pageSize})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(name=="关于我们" || name=="联系我们"){
                    var theData = hh.data.new[0];
                     _this.Text =theData.Text;
                     _this.NewsTitle = theData.NewsTitle;
                     _this.ReportTime = theData.ReportTime;
                     _this.NewsKey = theData.NewsKey;
                     _this.showAll = false;
                    }else{
                        _this.showAll = true;
                        _this.listData = hh.data.new;
                        _this.totalNum = parseInt(hh.data.total);    
                    }
            });
        },
        toLogin(){
            this.$router.push("/login");
        },
        handleCurrentChange(val){
            var _this = this;
            this.axios.post("/index.php?r=site/get-news",{"type":this.Type,"pagenum":val,"pagesize":this.pageSize})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.listData = hh.data.new;
                _this.totalNum = parseInt(hh.data.total);
            });
        },
        handleSizeChange(val){
           this.pageSize = val;
            var _this = this;
            this.axios.post("/index.php?r=site/get-news",{"type":this.Type,"pagenum":1,"pagesize":val})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.listData = hh.data.new;
                _this.totalNum = parseInt(hh.data.total);
            });
        },
        showText(newsTitle,text,newsKey,time){
            this.showAll = false;
            this.Text = text;
            this.NewsTitle = newsTitle;
            this.ReportTime = time;
            this.NewsKey = newsKey;
        },
        //溯源查询
        searchProduct(){
            this.$router.push("/codePage?"+this.productCode);
        },
        resetCode(){
            this.productCode = '';
        }
    },
    created() {
        /* var url = window.location.href;
         var ID = url.split("?");
         var id = ID[1];
         var _this = this;
         this.Type = id;
         this.axios.post("/index.php?r=site/get-news",{"type":id,"pagenum":1,"pagesize":this.pageSize})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.listData = hh.data.new;
                _this.totalNum = parseInt(hh.data.total);
        });*/

         var totalUrl = window.location.href;
         var theUrl = totalUrl.split("?");
         var url = theUrl[1].split("&");
         var urlType = url[0];    //判断是11导航跳转还是12新闻跳转
         var Idd = url[1];       //导航跳转对应导航的中文，新闻跳转则是新闻id
         var id = decodeURI(Idd);   //解码成中文
         var _this = this;
        if(urlType==11){
                this.Type = id;
                this.axios.post("/index.php?r=site/get-news",{"type":id,"pagenum":1,"pagesize":this.pageSize})
                .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.data.new.length==1){
                        _this.showAll = false;
                        /*_this.NewsTitle = hh.data.new.NewsTitle;
                        _this.ReportTime = hh.data.new.ReportTime;
                        _this.NewsKey = hh.data.new.NewsKey;*/
                        var theData = hh.data.new[0];
                         _this.Text =theData.Text;
                         _this.NewsTitle = theData.NewsTitle;
                         _this.ReportTime = theData.ReportTime;
                         _this.NewsKey = theData.NewsKey;
                    }else{
                         _this.listData = hh.data.new;
                         _this.totalNum = parseInt(hh.data.total); 
                    }
                });
         }else if(urlType==12){
            this.axios.post("/index.php?r=site/get-new-by-id",{"id":id})
                .then((res) => { 
                    var hh = JSON.parse(res.request.response);
                     _this.showAll = false;
                     _this.Text = hh.data.new.Text;
                     _this.NewsTitle = hh.data.new.NewsTitle;
                     _this.ReportTime = hh.data.new.ReportTime;
                     _this.NewsKey = hh.data.new.NewsKey;
            });
         }
    },
    mounted() {
        this.imgUrl = gbs.host;
    },
    watch: {
        showList(){
           /* this.$nextTick(function(){
                this.showFirst();
            });*/
        }
    }
}
