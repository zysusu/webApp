import echarts from 'echarts';
 import {
    gbs
 } from 'config/settings.js';
module.exports = {
    name: 'homePage',
    data() {
        return {
            preImg:'../../assets/img0',
            nextImg:'.jpg',
            typeFlag:0,
            imgUrl:'',
            dynamicList:[],
            noticeList:[],
            queryList:[],
            downLoadList:[],
            productCode:'',  //溯源查询
        }
    },
    methods: {
        setSize() {
        },
        getTitle(){
            var _this = this;
            this.axios.post("/index.php?r=site/get-news",{"type":"认证动态"})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.dynamicList = hh.data.new;
            });
            this.axios.post("/index.php?r=site/get-news",{"type":"认证公告"})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.noticeList = hh.data.new;
            });
            this.axios.post("/index.php?r=site/get-news",{"type":"认证查询"})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.queryList = hh.data.new;
            });
            this.axios.post("/index.php?r=site/get-news",{"type":"资料下载"})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                _this.downLoadList = hh.data.new;
            });
        },
        toLogin(){
            this.$router.push("/login");
        },
        //导航跳转显示标题列表
        toContent(name){
            this.$router.push("/contentPg?"+11+"&"+name);
        },
        //新闻标题跳转显示内容
        showText(id){
            this.$router.push("/contentPg?"+12+"&"+id);
        },
        searchProduct(){
            this.$router.push("/codePage?"+this.productCode);
        },
        resetCode(){
            this.productCode = '';
        }
    },
    created() {
        this.getTitle();
        /*this.getTitle("认证动态",this.dynamicList);
        this.getTitle("认证公告",this.noticeList);
        this.getTitle("认证查询",this.queryList);
        this.getTitle("资料下载",this.downLoadList);*/
    },
    mounted() {
        this.imgUrl = gbs.host;
        this.getTitle("认证动态",this.dynamicList);
       // alert(this.dynamicList);
    },
    watch: {
        showList(){
          /*  this.$nextTick(function(){
                this.showFirst();
            });*/
        }
    }
}
