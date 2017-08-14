import {
    gbs
} from 'config/settings.js';

module.exports = {
    name: 'productCenter',
    data() {
        return {
            flag:false,
            totalNum:0,
            pageSize:10,
            searchFlag:false,
            lookInfo:false,
            imgList:[],  //修改页面新加的图片
            fileList2: [],
            fileList3:[],  //imgList
            fileList4:[],  //添加
            changeFlag:false,
            imageUrl:'',
            imageSrc:'',
            imgAction:'',
            dialogImageUrl:'',
            dialogVisible:false,
            newsType:[],
            data_list:[],
            menu_list:[],
            productData:{},  
            initProduct:{
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
                NewsCategory: ''
            },
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
        showMod(id,child,name){
            this.modules_list = child;
            this.addChild = false;
            this.parentID = id;
            this.parentName = name;
        },
        reBack(){
            this.addChild = false;
        },
        getNews(name){
            var _this = this;
            this.search_data.NewsCategory = name;
            this.axios.post('/index.php?r=AuthCenter/news/get-news-group',{NewsCategory:name})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);  
                _this.data_list = hh.data;
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
            $('#Content').html('');
            this.showChange = true;
            this.imgList= [];
            this.fileList3 = [];
            this.productData = this.initProduct;
            this.productData.productimg = [];
            this.productData.productname = '';
         },
         addProduct(obj){
            for(var i=0;i<this.imgList.length;i++){
                this.productData.productimg.push(this.imgList[i]);
            }
            var cont = $('#Content').html();
            this.productData.productcontent = cont;
            var _this = this;
            this.axios.post('/index.php?r=Information/productcenter/add',_this.productData)
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                       _this.showChange = false;
                       _this.getList();
                    // window.location.reload();
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
            var id = obj.productId;
            this.$confirm('你确定删除该条内容吗？', '删除内容', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 var _this = this;
                    this.axios.post("/index.php?r=Information/productcenter/delete",{productId:id})
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                       _this.data_list.splice(num,1);
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
            var name = this.search_data.Name;
            var _this = this;
            this.axios.post('/index.php?r=Information/productcenter/search',{productname:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.data_list = hh.data.TbncpQiyeProduct;
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
            var _this = this;
            this.axios.post('/index.php?r=Information/productcenter/search',{productname:name,pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.data_list = hh.data.TbncpQiyeProduct;
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
        showInfo(obj){
            var _this = this;
            var id= obj.productId;
            this.imgList= [];
            this.axios.post("/index.php?r=Information/productcenter/view",{productId:id})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                    _this.lookInfo = true;
                    _this.productData.productimg = [];
                    _this.productData = hh.data;
                    $("#Content2").html(hh.data.productcontent);
                    /*for(var j=0;j<_this.productData.productimg.length;j++){
                        var item ={
                            name:'imgname',
                            url:_this.imageSrc+_this.productData.productimg[j],
                        };
                        _this.fileList2.push(item);
                    }*/
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
           this.flag = !this.flag;
            var _this = this;
            var id= obj.productId;
            this.imgList= [];
            this.axios.post("/index.php?r=Information/productcenter/view",{productId:id})
            .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                    _this.showChange = true;
                    _this.productData.productimg = [];
                    _this.productData = hh.data;
                    $("#Content").html(hh.data.productcontent);
                    for(var j=0;j<_this.productData.productimg.length;j++){
                        var item ={
                            name:'imgname',
                            url:_this.imageSrc+_this.productData.productimg[j],
                        };
                        _this.fileList2.push(item);
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
                }
            });
        },
        updateNews(news){
            for(var i=0;i<this.imgList.length;i++){
                this.productData.productimg.push(this.imgList[i]);
            }
            var cont = $('#Content').html();
            this.productData.productcontent = cont;
            var _this = this;
        
            this.axios.post("/index.php?r=Information/productcenter/update",_this.productData)
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                       _this.showChange = false;
                       _this.getList();
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
            this.lookInfo = false;
        },
        getList() {
            var _this = this;
            this.axios.post("/index.php?r=Information/productcenter/index",{pagesize:_this.pageSize,pagenum:1})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
            if(hh.status==200){
                _this.totalNum = parseInt(hh.data.total);
                _this.data_list = hh.data.TbncpQiyeProduct;
            }
            })
        },
         handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=Information/productcenter/index',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
                 _this.totalNum = parseInt(hh.data.total);
                _this.data_list = hh.data.TbncpQiyeProduct;
            }
        });
    }, 
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
          //this.productData.productimg.push(file.response.data.url);
       },
        handleAvatarSuccess2(res, file) {
          this.imgList.push(file.response.data.url);
          //this.productData.productimg.push(file.response.data.url);
       },
        handleRemove(file, fileList) {
         console.log(fileList);
           var Url = fileList.response.data.url;
      }, 
      deleteImg(index){
        $(".theImg"+index).hide(300);
           this.productData.productimg.splice(index,1);
      },
    handleRemoveOld(){

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
        this.imageSrc = gbs.host;
        this.imgAction = gbs.host+"/index.php?r=common/upload";
        this.getList();
        this.getNewsTree();
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