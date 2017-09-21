module.exports = {
    name: 'setModule',
    data() {
        return {
            mod_data:[],
            addElets:[],
          //  editData:[],
            theKey:'',
            editData:{
                ProductApproModelId:"",
                ModelName: "",
                ModelType: "",
                ProductNumber: "",
                ModelDescription: "",
                growth:[],
            },
            product_type:[],
            productProps:{
                children:'product_type',
                label:'CuitMoon_DictionaryName',
            },
            Growthperiod:[],  //editData里面的生育期
            module_data : {         
                ModelName: "",
                ModelType: "",
                ProductNumber: "",
                ModelDescription: "",
                growth:[],
            },
            GrowthData:{
                    Gname:'',
                    element_list:[],
                },
            elementList:[{elementNumber:'',elementValue:''},{elementNumber:'',elementValue:''},{elementNumber:'',elementValue:''},{elementNumber:'',elementValue:''}],
            Growth_data:[
                {
                    Gname:'',
                    elementNumber:'',
                    elementValue:'',
                    element:[]
                }
            ],
            submit_data:[],
            module_rules: {
                CuitMoon_ModuleName: [{
                    required: true,
                    message : '模型名称不能为空！',
                    trigger : 'blur'
                }]
            },
            modules_list: [{
                        CuitMoon_ModuleID: "AF6B9A11B326B5E87BAAEC842ACD8879",
                        CuitMoon_ModuleName: "添加模块",
                        CuitMoon_ModuleURL: "System/module/addmodule",
                        CuitMoon_ParentModuleID: "99CFF591115814CFA780F97749F6D273",
                        CuitMoon_ModuleStatus: "1",
                        CuitMoon_ModuleDescription: "",
                        child: null   
            }], //用户列表数组
            testEle: [],
            parentID:'',
            showList : false,
            addChild : false,  //判断是否是添加子模块
            showEdit : false,
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            //搜索表单信息
            search_data: {
                Name: ''
            },
            product_list:[],
            elements:[],
            Growthperiod: [
 /*           {
                "growthId": "387F17DCA73347128DE02CF1417C047F", 
                "growthName": "第一阶段", 
                "produceApproModelId": "76e86a154493455c893dd374d0bf11e4", 
                "Growthelement": [
                    {
                        "growthElemId": "4CBB3694D6344B7BB5753A9EAAA910EF", 
                        "growthId": "387F17DCA73347128DE02CF1417C047F", 
                        "elementNumber": "b465b417d7d842b9a917db40bf3b0ec7", 
                        "elementValue": "111", 
                        "ElementName": {
                            "ElementNumber": "0f13197868b445bca4c519571c2699a6", 
                            "Unit": "   0.1℃，扩大10倍", 
                            "ElementName": "150 cm 地温", 
                            "ElementType": "100041", 
                            "ElementDecription": "Z_O_AWS_ST_C5_CQ", 
                            "AddTime": "2017-07-12 19:33:42", 
                            "Remark": "GroundTemp15 ", 
                            "climateStation": null
                        }
                    }, 
                    {
                        "growthElemId": "63DAC33D822B4E4BA499CF68176A37AF", 
                        "growthId": "387F17DCA73347128DE02CF1417C047F", 
                        "elementNumber": "0f13197868b445bca4c519571c2699a6", 
                        "elementValue": "111"
                    }, 
                    {
                        "growthElemId": "C45045D766AF44959D947EE6127793AC", 
                        "growthId": "387F17DCA73347128DE02CF1417C047F", 
                        "elementNumber": "2aeb7e9ed9534abe90916e5782f54c93", 
                        "elementValue": "111"
                    }
                ]
            }, 
            {
                "growthId": "BCBD61815C7C4F1B9F590BBEB71DCBBE", 
                "growthName": "第三阶段", 
                "produceApproModelId": "76e86a154493455c893dd374d0bf11e4", 
                "Growthelement": [
                    {
                        "growthElemId": "64EA08C0A67B4E0790CF163364BD5D8C", 
                        "growthId": "BCBD61815C7C4F1B9F590BBEB71DCBBE", 
                        "elementNumber": "0f13197868b445bca4c519571c2699a6", 
                        "elementValue": "333"
                    }, 
                    {
                        "growthElemId": "9C86B0B0DD4445DDB04372A3C3B1195E", 
                        "growthId": "BCBD61815C7C4F1B9F590BBEB71DCBBE", 
                        "elementNumber": "2aeb7e9ed9534abe90916e5782f54c93", 
                        "elementValue": "333", 
                        "ElementName": {
                            "ElementNumber": "2aeb7e9ed9534abe90916e5782f54c93", 
                            "Unit": "232", 
                            "ElementName": "22", 
                            "ElementType": "100042", 
                            "ElementDecription": "2342", 
                            "AddTime": null, 
                            "Remark": "3242", 
                            "climateStation": null
                        }
                    }
                ]
            }*/
        ],
        checkAll: true,
        isIndeterminate: true,
        accesss: [],
        checkeds: [],
        defaultProps: {
        children: 'children',
        label: 'name'
        }      
    }
    },
    methods: {
        cloneDiv(){
            var list = {
                    Gname:'',
                    element:[]
                };
            this.Growth_data.push(list);
            var height = 55*(this.elements.length+1);
            this.$nextTick(function(){
                $(".addBear").height(height);
            });
        },
        cloneUpDiv(){
            var item = {
                    growthName:'',
                    elementNumber:[],
                    growthElemId:[],
                    elementValue:[],
            };
            this.Growthperiod.push(item);
            var height = 55*(this.elements.length+1);
            this.$nextTick(function(){
                $(".updateBear").height(height);
            });
        },
         deleteDiv(index){
          this.Growth_data.splice(index,1);
        },
        deleteUpDiv(index){
            this.Growthperiod.splice(index,1);
        },
        onAdd(){
            this.addChild = true;
            this.showList = false;
            this.showEdit = false;
            this.Growth_data = [];
            this.submit_data = [];
         },
        showMod(id,child,name){
            this.modules_list = child;
            //this.addChild = true;
            this.showList = true;
            this.addChild = false;
            this.parentID = id;
            this.parentName = name;
        },
        delete(){

        },
        upate_module(editData){
             let _this = this;
                this.axios.post('/index.php?r=AuthModel/formulate-modle/edit-commit',{editData})
                .then((res)=>{
                   var hh = JSON.parse(res.request.response);
                    _this.editData = hh.data.Modelformulate;
            });
        },
        initLeftTree(){
            $(document).on('click','.tree li.parent_li > span',function(e){
                $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if(children.is(":visible")){
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                   //$(this).find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              }else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                    //$(this).find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                e.stopPropagation();
            });
           /* $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
           $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
              }else{
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                e.stopPropagation();
            });*/
        },
         showUpdate(productObj){
            this.Growth_data = [];
            this.submit_data = [];
            var _this = this;
            this.axios.post('/index.php?r=AuthModel/formulate-modle/edit-view',{ProductApproModelId:productObj.ProductApproModelId})
            .then((res)=>{
               var hh = JSON.parse(res.request.response);
               if(hh.status==200){
                _this.Growthperiod = hh.data.Growthperiod;
                _this.editData = hh.data.Modelformulate;

                _this.showEdit = true;
                _this.addChild = false;
                _this.showList = false;
                var height = 55*(_this.elements.length+1);
                this.$nextTick(function(){
                    $(".updateBear").height(height);
                 });
               }else{
                   this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
               }
            });
           //$(".updateBear").height(height);
         },
         choose(index,number){
             var parent = this.Growthperiod[index].elementNumber;
            for(var i = 0; i<parent.length;i++)
            {
                if(number.trim()==parent[i].trim()){
                    return true;
                }
            }
            return false;
         },
         putValue(index,number){
            var parent = this.Growthperiod[index].elementNumber;
            var value = this.Growthperiod[index].elementValue;
            if(parent && value){
                for(var i = 0; i<parent.length;i++)
                {
                    if(number.trim()==parent[i].trim()){
                      return value[i];
                    } 
                }
                return " ";
            }else{
                 return " ";
            }
         },
         getEleId(index,number){
            var parent = this.Growthperiod[index].elementNumber;
            var eleId = this.Growthperiod[index].growthElemId;
            for(var i = 0; i<parent.length;i++)
            {
                if(number.trim()==parent[i].trim()){
                    return eleId[i];
                }
            }
            return "";
         },
         reBack(){
             this.addChild = false;
             this.showEdit = false;
             this.showList = true;
        },
        getBearEle(){
                var _this = this;
                this.axios.post('/index.php?r=AuthModel/formulate-modle/view-growth')
                .then((res)=>{
                     var hh = JSON.parse(res.request.response);
                     _this.elements = hh.data;

                });
                 this.axios.post('/index.php?r=AuthModel/formulate-modle/get-type')
                .then((res)=>{
                     var hh = JSON.parse(res.request.response);
                     _this.product_type = hh.data;
                });

                this.axios.post('/index.php?r=AuthModel/formulate-modle/view-product')
                .then((res)=>{
                    var hh = JSON.parse(res.request.response);
                    _this.product_list = hh.data;
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
        save_module(moduledata){
             var _this = this;
             let len = $('.addBear').length;
            // this.addElets = [];
             this.submit_data = [];
            $('.addBear').each(function(index){
                var _self = this;
               // _this.addElets = [];
               var addElets = [];
              //  _this.submit_data = [];
                var gname =$(this).find('.gname').val();
                $(this).find('input[name="element"]:checked').each(function(e){
                    var key = $(this).val();
                    var value = $(this).parents('tr').find('input[name="eleValue"]').val();
                    var list = {"elementNumber":key,"elementValue":value};
                        //_this.addElets.push(list);
                    addElets.push(list);
                 })
                 var item = {Gname: gname,element_list:addElets};
                _this.submit_data.push(item);
            });  //addBear
                
                this.module_data.growth = this.submit_data;
                this.axios.post("/index.php?r=AuthModel/formulate-modle/add-commit",moduledata)
                .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.addChild = false;
                        this.showList = true;
                        this.handleNodeClick();
                        
                    }else{
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                    }
            });
        },
        /**
         * 点击搜索按钮事件
         */
        onSearch(val) {
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthModel/formulate-modle/search',{key:name})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                        this.mod_data = hh.data;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                    });
                }
            });
        },
        handleNodeClick(obj){
                this.addChild = false;
                this.showEdit = false;
                if(obj){
                    this.theKey = obj.CuitMoon_DictionaryName; 
                };
                var _this = this;
                this.axios.post("/index.php?r=AuthModel/formulate-modle/view-chose",{key:_this.theKey})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);       
                     _this.mod_data = hh.data;
                })
            },
       
        onDelete(obj,index) {
			this.$confirm('你确定删除模型 '+obj.ModelName+' 么?', '删除模型', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
                 var _this = this;
                    this.axios.post("/index.php?r=AuthModel/formulate-modle/delete",{ProductApproModelId:obj.ProductApproModelId})
                    .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                       this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                    _this.mod_data.splice(index,1);
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
      /*  getEleId(growthId,number){
            alert(growthId);
            alert(number);
        },*/
        updateModule(editData){
             var _this = this;
             let len = $('.updateBear').length;
            // this.addElets = [];
             this.submit_data = [];
            $('.updateBear').each(function(index){
                var _self = this;
               // _this.addElets = [];
               var addElets = [];
              //  _this.submit_data = [];
                var gname =$(this).find('.gname').val();
                var gnameId = $(this).find('.GnameId').html();
                $(this).find('input[name="element"]:checked').each(function(e){
                    var key = $(this).val();
                    var value = $(this).parents('tr').find('input[name="eleValue"]').val();
                    var eleId = $(this).parents('tr').find('input[name="elementId"]').val();
                    if(!eleId){
                        eleId = '';
                    };
                    var list = {"elementNumber":key,"elementValue":value,"growthElemId":eleId};
                        //_this.addElets.push(list);
                    addElets.push(list);
                 })
                 var item = {Gname: gname,growthId:gnameId,element_list:addElets};
                _this.submit_data.push(item);
            });  //addBear
                
                this.editData.growth = this.submit_data;
                this.axios.post("/index.php?r=AuthModel/formulate-modle/edit-commit",editData)
                .then((res) => {  
                    var hh = JSON.parse(res.request.response);
                    if(hh.status===200){
                        this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'success'
                        });
                        this.addChild = false;
                        this.showList = true;
                        this.handleNodeClick();
                    }else{

                    }
            });
        },

    },

    mounted() {
        this.getBearEle();
       
        $(".addBear").css('border','1px solid red');
         $(".addBear").css('height','300');
    },
    watch: {
        '$route' (to, from) {
        }
    }
}