module.exports = {
  name: 'expertGroup',
  data () {
    return {
      pageSize:10,
      totalNum:0,
      searchFlag:false,
        province:[],
        area_list:[],
        areaList:{
            value : 'CuitMoon_AreaName',
            label : 'CuitMoon_AreaName',
            children : 'child'
        },
       ExpertGroup_list: [{
        expertsID: '',
        expertsLevel: '',
        Region: '',
        expertsName: '',
        expertsPerson: [],
      }],
      people_list:[],  //可选成员
      levelData:[],  //专家级别
      exgroup_info:{},
      initGroup:{
            expertsLevel: "",
            Region:[],
            expertsName: "",
            expertsPerson: []
        },
      search_data:{
        Name:''
      },
      batch_id: '',
      batch_flag: true,

      //搜索表单信息
      sezarch_data: {
        expertsID: '',
        expertsLevel: '',
        Region: '',
        expertsName: '',
        expertsPerson: []
      },

    //添加弹框信息
      dialog: {
        show: false,
        exgroup_info: {
            expertsLevel:'',
            Region:[],
            expertsPerson:[]
        }
      },
    //详情弹框信息
       dialog1: {
        show: false,
        exgroup_info: {
            expertsLevel:'',
            Region:[],
            expertsPerson:[]
        }
      },
    }
  },
  methods: {
    addExpertGroup () {
        this.dialog.show = true;
  },
  addGroup(info){
    this.axios.post('/index.php?r=AuthCenter/expertsgroup-manage/add-expertsgroup',info)
    .then((res)=>{
        var hh = JSON.parse(res.request.response);
        if(hh.status===200){
         this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
        });
         window.location.reload();
    }else{
        this.$message({
                showClose: true,
                 message: hh.msg,
                 type: 'error'
            });
        }
               
    });
  },
  updateGroup(obj){
     this.axios.post('/index.php?r=AuthCenter/expertsgroup-manage/update',obj)
    .then((res)=>{
        var hh = JSON.parse(res.request.response);
        if(hh.status===200){
         this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
        });
         window.location.reload();
    }else{
        this.$message({
                showClose: true,
                 message: hh.msg,
                 type: 'error'
            });
        }
               
    });
  },
  getProvince(){
            var _this = this;
            this.axios.post("/index.php?r=origin/schedule/sheng")
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.province = hh.data;
            });
        },
    getView(){
      var _this = this;
      this.axios.post("/index.php?r=AuthCenter/expertsgroup-manage/get-all",{pagesize:_this.pageSize,pagenum:1})
      .then((res)=>{
        var hh = JSON.parse(res.request.response);
        if(hh.status===200){
            _this.totalNum = parseInt(hh.data.total);
            _this.ExpertGroup_list = hh.data.ExpergrouptList;
        }
      });

       this.axios.post("/index.php?r=AuthCenter/expert-manage/add-expert-level")
        .then((res) => {  
            var hh = JSON.parse(res.request.response);
            _this.levelData = hh.data;
        });

     //获取全部地区
        this.axios.post("/index.php?r=System/area/get-area",{"CuitMoon_ParentAreaCode": ""})
        .then((res) => {  
            var hh = JSON.parse(res.request.response);          
            _this.area_list = hh.data;
        });

    },
    handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/expertsgroup-manage/get-all',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
            var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.ExpertGroup_list = hh.data.ExpergrouptList;
            });
        },
    changeExpertLevel(val){
        var _this = this;
            this.axios.post("/index.php?r=AuthCenter/expertsgroup-manage/get-all-expert",{level:val})
            .then((res) => {  
            var hh = JSON.parse(res.request.response);
             _this.people_list = hh.data;
          });
    },
    /**
     * 点击搜索按钮事件
     */
     onSearch(val) {
         var _this = this;
            var name = this.search_data.Name;
            this.axios.post('/index.php?r=AuthCenter/expertsgroup-manage/search-expertsgroup',{expertsName:name,pagesize:_this.pageSize,pagenum:1})
            .then((res)=>{
                 var hh = JSON.parse(res.request.response);    
                    if(hh.status===200){
                         _this.totalNum = parseInt(hh.data.total);
                        _this.ExpertGroup_list = hh.data.ExpergrouptList;
                        _this.searchFlag = true;
                    }else{
                         this.$message({
                            showClose: true,
                            message  : hh.msg,
                            type     : 'error'
                        });
                }
            });
        },

 handleCurrentChange(val){
            var _this = this;
            this.axios.post('/index.php?r=AuthCenter/expertsgroup-manage/search-expertsgroup',{pagesize:_this.pageSize,pagenum:val})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                _this.totalNum = parseInt(hh.data.total);
                _this.ExpertGroup_list = hh.data.ExpergrouptList;
        });
}, 
    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
     */
    onSelectionChange (val) {
        // console.log(val);
        if (val.length) {
            this.batch_flag = false;
            var ids = [];
            for (var i = 0; i < val.length; i++) {
                ids.push(val[i].id);
            }
            this.batch_id = ids.join(',');
        } else {
            this.batch_flag = true;
            this.batch_id = '';
        }
    },
    /**
     * 改变页码和当前页时需要拼装的路径方法
     * @param {string} field 参数字段名
     * @param {string} value 参数字段值
     */
    setPath(field, value) {
        var path = this.$route.path,
            query = Object.assign({}, this.$route.query);

        query[field] = value;

        this.$router.push({
            path: path,
            query: query
        });
    },


    /**
     * 改变当前页事件
     * @param  {number} page 当前页码
     */
    onChangeCurrentPage(page) {
        this.setPath('page', page);
    },


    /**
     * 改变每页显示数量事件
     * @param  {number} size 当前每页显示数量
     */
    onChangePageSize(size) {
        this.setPath('page_size', size);
    },

    /**
     * 设置权限
     */
    onSetAccess (user,index,list){
        this.$router.push({
            path:'/demo/user/access',
            query:{
                id:user.id
            }
        });
    },


    /**
     * 删除专家组事件
     * @param  {object || boolean} user  当前用户信息对象或者为布尔值,为布尔值时，代表是批量删除
     * @param  {number} index 当前用户列表索引
     * @param  {array} list  当前用户列表数组
     */
    onDeleteExpertGroup (obj,index) {
      var _this = this;
      	this.$confirm('你确定删除专家组 '+obj.expertsName+' 么?', '删除专家组', {
      		confirmButtonText: '确定',
      		cancelButtonText: '取消',
      		type: 'warning'
      	}).then(() => {
      		this.axios.post('/index.php?r=AuthCenter/expertsgroup-manage/delete-expertsgroup',{expertsID:obj.expertsID})
            .then((res)=>{
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){
                     this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                     _this.ExpertGroup_list.splice(index,1);
                }else{
                    this.$message({
                        showClose: true,
                        message: '删除失败',
                        type: 'error'
                    });
                }
               
            });
      	});

    },
    /**
     * 查看用户信息事件
     * @param  {object} exgroup 当前用户信息对象
     */
    onEditExperGroup(exgroup) {
        this.dialog1.show = true;
        this.dialog1.exgroup_info = exgroup;
        this.dialog1.exgroup_info.Region = exgroup.LongArea;
        var Level = exgroup.expertsLevel;
        var _this = this;
        this.axios.post("/index.php?r=AuthCenter/expertsgroup-manage/get-all-expert",{level:Level})
        .then((res) => {  
        var hh = JSON.parse(res.request.response);
            _this.people_list = hh.data;
        });
        
    },
  },

    mounted() {
        this.getView();
        this.getProvince();
        this.initRouters();

    },
    watch: {
        '$route' (to, from) {
            this.getView();
        }
    }
}
