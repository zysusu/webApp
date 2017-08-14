import {
    gbs
} from 'config/settings.js';

module.exports = {
    name: 'imgManage',
    data() {
        return {
            totalNum:0,
            pageSize:10,
            searchFlag:false,
            theType:'',
            category:false,
            tableData:[],  //图片数组
            applyType:[],
            imageUrl:'',
            imageSrc:'',
            imgAction:'',
            imgInfo:{},
            AppBh:'',
            newsType:[],
            data_list:[],
            menu_list:[],
            productData:{
	            productname: "",
                productimg: [],
                productcontent: ""
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
                Category: ''
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
         showMore(obj){
            this.AppBh = obj.ApplyBh;
            this.showChange = true;
            var _this = this;
            this.axios.post('/index.php?r=Information/pic-manage/get-pic-list',{ApplyBh:obj.ApplyBh})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                      _this.tableData = hh.data;
                    }else{
                        _this.tableData = [];
                    }
            });
         },
         addImage(imgObj){
            var list = {
                PicContent:this.imgInfo.PicContent,
                PicName:this.imgInfo.PicName,
                PicSrc:this.imgInfo.PicSrc,
                ApplyBh:this.AppBh
            };
            var _this = this;  
            this.axios.post('/index.php?r=Information/pic-manage/add-pic',list)
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.axios.post('/index.php?r=Information/pic-manage/get-pic-list',{ApplyBh:_this.AppBh})
                        .then((res)=>{
                            var hh = JSON.parse(res.request.response);
                                if(hh.status===200){
                                  _this.tableData = hh.data;
                                  _this.imgInfo.PicContent = '';
                                  _this.imgInfo.PicName = '';
                                  _this.imgInfo.PicSrc = '',
                                  _this.imageUrl = '';


                                }
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
         deleteImg(obj,num){
            var id = obj.Id;
            this.$confirm('你确定删除该图片吗？', '删除图片', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 var _this = this;
                    this.axios.post("/index.php?r=Information/pic-manage/delete-pic",{Id:id})
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                       _this.tableData.splice(num,1);
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
            this.typeFlag = false;
            this.searchFlag = true;
            var Name = this.search_data.Name;
            var Category = this.search_data.Category;
            var _this = this;
            if(Category){
                this.axios.post('/index.php?r=Information/pic-manage/search',{name:Name,category:Category,pagesize:_this.pageSize,pagenum:1})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    if(hh.status===200){
                         _this.totalNum = parseInt(hh.data.total);
                        _this.data_list = hh.data.apply;       
                    }else{
                         this.$message({
                                showClose: true,
                                message  : hh.msg,
                                type     : 'error'
                        });
                    }
                });
            }else{
               this.$message({
                    showClose: true,
                    message  : "请先选择你想查询的类别！",
                    type     : 'error'
                }); 
            }  
        },
         handleCurrentChange2(val){
             var Name = this.search_data.Name;
            var Category = this.search_data.Category;
            var _this = this;
            if(Category){
                 this.axios.post('/index.php?r=Information/pic-manage/search',{name:Name,category:Category,pagesize:_this.pageSize,pagenum:val})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    if(hh.status===200){
                         _this.totalNum = parseInt(hh.data.total);
                        _this.data_list = hh.data.apply;       
                    }else{
                         this.$message({
                                showClose: true,
                                message  : hh.msg,
                                type     : 'error'
                        });
                    }
                });
            }else{
               this.$message({
                    showClose: true,
                    message  : "请先选择你想查询的类别！",
                    type     : 'error'
                }); 
            }  
        },
        typeChange(val){
            this.typeFlag = true;
            this.searchFlag = false;
            var _this = this;
            this.axios.post('/index.php?r=Information/pic-manage/get-list',{category:val,pagesize:_this.pageSize,pagenum:1})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    if(hh.status===200){
                         _this.totalNum = parseInt(hh.data.total);
                        _this.data_list = hh.data.apply;       
                    }else{
                         this.$message({
                                showClose: true,
                                message  : hh.msg,
                                type     : 'error'
                        });
                    }
            });
        },
        handleCurrentChange3(val){
            this.searchFlag = false;
            this.axios.post('/index.php?r=Information/pic-manage/get-list',{category:val,pagesize:_this.pageSize,pagenum:val})
                .then((res)=>{
                    var hh = JSON.parse(res.request.response); 
                    if(hh.status===200){
                         _this.totalNum = parseInt(hh.data.total);
                        _this.data_list = hh.data.apply;       
                    }else{
                         this.$message({
                                showClose: true,
                                message  : hh.msg,
                                type     : 'error'
                        });
                    }
            });
        },
        getNewsTree(){
                let _this = this;
                this.axios.post('/index.php?r=AuthCenter/news/get-all-news-group')
                .then((res)=>{
                var hh = JSON.parse(res.request.response); 
                if(hh.status===200){
                    _this.newsType = hh.data;
                }else{
                    this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                }
                });
         },
        reBack(){
            this.showChange = false;
        },
        getList() {
            var _this = this;
            this.axios.post("/index.php?r=Information/pic-manage/get-all",{pagesize:_this.pageSize,pagenum:1})
            .then((res) => {  
             var hh = JSON.parse(res.request.response);
             if(hh.status==200){
                _this.totalNum = parseInt(hh.data.total);
                _this.data_list = hh.data.apply;
             }
            })
        },
        handleCurrentChange(val){
            var _this = this;
            this.axios.post("/index.php?r=Information/pic-manage/get-all",{pagesize:_this.pageSize,pagenum:val})
            .then((res) => {  
             var hh = JSON.parse(res.request.response);
             if(hh.status==200){
                _this.totalNum = parseInt(hh.data.total);
                _this.data_list = hh.data.apply;
             }
            })
        },
        getTypes(){
            var _this = this;
            this.axios.post("/index.php?r=Information/pic-manage/get-category")
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status==200){
                _this.applyType = hh.data;
            }else if(hh.status==404){
                _this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'error'
                });
            }
            });
        },
         handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=Information/pic-manage/get-all',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.data_list = hh.data.apply;
        });
    }, 
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.imgInfo.PicSrc = file.response.data.url;
         // this.productData.productimg.push(file.response.data.url);
        //  this.expert_list.Photo = URL.createObjectURL(file.raw);
       },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        alert(fileList.response.data.url);
      },
      initEditor(){
            var self   = this;
            var editor = new wangEditor('Content');
            editor.config.uploadImgFileName = 'Content';
            editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
        // 配置自定义参数（举例）
        /*editor.config.uploadParams = {
            token   : this.$store.state.user.userinfo.token,
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

            self.setContent(html, text);
        };
        editor.config.hideLinkImg = true;

        //自定义上传图片错误事件
        editor.create();
        },
      
    },
    mounted() {
        this.imgAction = gbs.host+"/index.php?r=common/upload";
        this.imageSrc = gbs.host;
        this.getList();
        this. getTypes();
    //    this.getNewsTree();

        var self   = this;
        var editor = new wangEditor('Content');
        editor.config.uploadImgFileName = 'Content';
        editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
        // 配置自定义参数（举例）
        /*editor.config.uploadParams = {
            token   : this.$store.state.user.userinfo.token,
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

            self.setContent(html, text);
        };
        editor.config.hideLinkImg = true;

        //自定义上传图片错误事件
        editor.create();
     //   editor.$txt.append('1313');
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