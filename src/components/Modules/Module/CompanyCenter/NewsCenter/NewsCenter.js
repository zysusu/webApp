import {
    gbs
} from 'config/settings.js';

module.exports = {
    name: 'newsCenter',
    data() {
        return {
             totalNum:0,
             pageSize:10,
             searchFlag:false,
             showNews:false,  //查看新闻
            newsType:[],
            news_list:[],
            menu_list:[],
            disFlag:false,
            NewsData:{
	            newstitle: "",
	            newscontent:"",
            },
            NewsInfo:{
                newstitle: "",
                newscontent:"",
            },
            temp : {
                newscontent: ''
            },     
            news_rules: {
                NewsTitle: [{
                    required: true,
                    message : '新闻标题不能为空！',
                    trigger : 'blur'
                }],
                NewsKey: [{
                    required: true,
                    message : '关键字不能为空！',
                    trigger : 'blur'
                }],
                newscontent:[{
                    required: true,
                    message : '新闻内容不能为空！',
                    trigger : 'blur'
                }]
            },
            modules_list: [], //用户列表数组
            parentID:'',
            showList : false,
            addChild : false,  //判断是否是添加子模块
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            showChange:false,
            //搜索表单信息
            search_data: {
                Name: '',
            },
            wangEditor  : {
				bar: [
					'source', '|',
					'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
					'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
					'link', 'unlink', 'table', 'emotion', '|',
					'img',
					'video',
					// 'location',
					'insertcode', '|',
					'undo', 'redo', 'fullscreen'
				]
			},
        }
    },
    methods: {
        showMod(id,child,name){
            this.modules_list = child;
            this.addChild = false;
            this.parentID = id;
            this.parentName = name;
        },
        reBack(){
            this.showNews = false;
            this.showChange = false;
        },
        getNews(name){
            var _this = this;
            this.search_data.NewsCategory = name;
            this.axios.post('/index.php?r=AuthCenter/news/get-news-group',{NewsCategory:name})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);  
                _this.news_list = hh.data;
            });
            this.addChild = false;
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
       onAdd(parentID,parentName){
            this.showChange = true;
         },
         addNews(news){
            var _this = this;
            var data = $('#NewContent').html();
            this.axios.post('/index.php?r=Information/news/add',{newstitle:news.newstitle,newscontent:data})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                  this.showChange = false;
                  this.getList();
                    }else{
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
            });
         },
         onDelete(obj,num){
            var id = obj.newsID;
            this.$confirm('你确定删除该条新闻吗？', '删除新闻', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 var _this = this;
                    this.axios.post("/index.php?r=Information/news/delete",{newsID:id})
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                       _this.news_list.splice(num,1);
                        //this.$router.push('/module/sys/modManage');
                    }else{
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
                });
                
            });
         },
        /**
         * 点击搜索按钮事件
         */
         onSearch(val) {
            var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=Information/news/search',{newstitle:name,pagenum:1,pagesize:_this.pageSize})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);    
                if(hh.status==200){
                    var hh = JSON.parse(res.request.response);
                    this.news_list = hh.data.TbncpQiyeNews;
                    this.totalNum = parseInt(hh.data.total);
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
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=Information/news/search',{newstitle:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        var hh = JSON.parse(res.request.response);
                        this.news_list = hh.data.TbncpQiyeNews;
                        this.totalNum = parseInt(hh.data.total);
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                }
            });
        },
        showUpdate(obj) {
            var id = obj.newsID;
            this.$router.push('/module/companyCenter/updateNews?'+id);
            // this.showChange = true;
            // this.NewsData = obj;
           // alert(obj.newscontent);
          // editor.$txt.append('1313');
          // editor.$txt.html(obj.newscontent);
        },
        lookNews(news){
           this.showNews = true;
           this.NewsInfo = news;
           $('#NewCont').html(news.newscontent);
        },
        updateNews(news){
            var _this = this;
            this.axios.post("/index.php?r=Information/news/update",news)
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                    this.$message({
                        showClose: true,
                        message  : hh.msg,
                        type     : 'success'
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
                }
            });
        },
        getList() {
            var _this = this;
            this.axios.post("/index.php?r=Information/news/index",{pagesize:_this.pageSize,pagenum:1})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
            if(hh.status==200){
                 _this.news_list = hh.data.news;
                this.totalNum = parseInt(hh.data.total);
            }  
            })
        },
         handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=Information/news/index',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                 if(hh.status==200){
                 _this.news_list = hh.data.news;
                this.totalNum = parseInt(hh.data.total);
            }  
            });
        }, 
        initEditor(){
            var self = this;
            var editor = new wangEditor('NewContent');
            editor.config.uploadImgFileName = 'NewContent';
            editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
        // 配置自定义参数（举例）
        /*editor.config.uploadParams = {
            username: this.$store.state.user.userinfo.username
        };*/

        // 自定义load事件
        editor.config.uploadImgFns.onload = (data) => {
            if (data.status === 200) {
                //alert(data.data.url);
                // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            //  var originalName = editor.uploadImgOriginalName || '';
                var originalName = editor.uploadImgOriginalName || '';
                // 如果 resultText 是图片的url地址，可以这样插入图片：
                editor.command(null, 'insertHtml', '<img src="' + gbs.host + data.data.url + '" alt="' + originalName + '" style="max-width:80%;"/>');
            } else {
                if (data.status === 404) {
                    this.$message.error('上传错误信息：token无效！');
                } else {
                    this.$message.error('上传错误信息：' + data.msg);
                }
            }

        };

        editor.config.uploadImgFns.onerror = (xhr) => {
            this.$message.error('上传错误信息：网络错误！');
        };

        editor.config.menus = this.wangEditor.bar;

        //编辑器改变事件时，同步更新文章内容
        editor.onchange = function () {
            var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
                html = this.$txt.html();
            /*console.log(text);
             console.log(html);*/
            self.setContent(html, text);
        };
        editor.config.hideLinkImg = true;

        //自定义上传图片错误事件
        editor.create();
        },
    },
    mounted() {
        this.getList();
        var _self = this;
        var editor = new wangEditor('NewContent');
        editor.config.uploadImgFileName = 'NewContent';
        editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
        
        editor.config.uploadImgFns.onload = (data) => {
            if (data.status === 200) {
                //alert(data.data.url);
                // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            //  var originalName = editor.uploadImgOriginalName || '';
                var originalName = editor.uploadImgOriginalName || '';
                // 如果 resultText 是图片的url地址，可以这样插入图片：
                editor.command(null, 'insertHtml', '<img src="' + gbs.host + data.data.url + '" alt="' + originalName + '" style="max-width:80%;"/>');
            } else {
                if (data.status === 404) {
                    this.$message.error('上传错误信息：token无效！');
                } else {
                    this.$message.error('上传错误信息：' + data.msg);
                }
            }
        };

        editor.config.uploadImgFns.onerror = (xhr) => {
            this.$message.error('上传错误信息：网络错误！');
        };
        editor.config.menus = this.wangEditor.bar;
        //编辑器改变事件时，同步更新文章内容
        editor.onchange = function () {
            var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
                html = this.$txt.html();
            _self.setContent(html, text);
             alert(1);
        };
        editor.config.hideLinkImg = true;
        //自定义上传图片错误事件
        editor.create();
        this.initRouters();
    },
    watch: {
        '$route' (to, from) {
            this.getList();
            this.getTheMenu();
            //this.initLeftTree();
        }
    }
}