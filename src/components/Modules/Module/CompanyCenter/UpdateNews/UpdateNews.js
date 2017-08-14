import {
    gbs
} from 'config/settings.js';

module.exports = {
    name: 'updateNews',
    data() {
        return {
             totalNum:0,
             pageSize:10,
             searchFlag:false,
             theId:'',
            NewsData:{
	            newstitle: "",
	            newscontent:'',
                newsID:''
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
            parentID:'',
            wangEditor  : {
				bar: [
					'source', '|',
					'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
					'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
					'link', 'unlink', 'table', 'emotion', '|',
					'img',
					'video',
					'insertcode', '|',
					'undo', 'redo', 'fullscreen'
				]
			},
        }
    },
    methods: {
        Back(){
            this.$router.push("/module/companyCenter/newsCenter");
        },
        getData(){
                var url = window.location.href;
                var ID = url.split("?");
                var id= ID[1];
                this.NewsData.newsID = ID[1];
                var _this = this;
                this.axios.post("/index.php?r=Information/news/view",{newsID:id})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                var data = hh.data.newscontent;
                var content = hh.data.newstitle;
                var editor = new wangEditor('NewsContent');
                editor.config.uploadImgFileName = 'NewsContent';
                editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
                // 自定义load事件
                editor.config.uploadImgFns.onload = (data) => {
                    if (data.status === 200) {
                        var originalName = editor.uploadImgOriginalName || '';
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
                    self.setContent(html, text);
                };
                editor.config.hideLinkImg = true;
                editor.create();
                _this.NewsData.newstitle = content;
                editor.$txt.html(data);
            });
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
        updateNews(news){
             var _this = this;
            // var id = this.theId;
            this.NewsData.newscontent = $('#NewsContent').html();
            this.axios.post('/index.php?r=Information/news/update',_this.NewsData)
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                      _this.$router.push("/module/companyCenter/newsCenter");
                    }else{
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
            });
        },
        initEditor(){
            var self   = this;
            var editor = new wangEditor('NewsContent');
            editor.config.uploadImgFileName = 'NewsContent';
            editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
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

            self.setContent(html, text);
        };
        editor.config.hideLinkImg = true;

        //自定义上传图片错误事件
        editor.create();
        },
    },
    created:function(){
            var _this = this;
            this.$nextTick(function(){
            $(document).ready(function(){
             _this.getData();
            })
        });
    },
    mounted() {
       // this.getData();
         var _this = this;
         this.$nextTick(function(){
            $(document).ready(function(){
          //   _this.getData();
            })
        });
        this.initRouters();
    },
    watch: {
        '$route' (to, from) {
           
        }
    }
}