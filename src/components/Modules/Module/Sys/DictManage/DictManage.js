module.exports = {
    name: 'dictManage',
    data() {
      return {
        data: [],
        tableData: [],
        dicData:[],
        formLabelAlign: {
      },
      defaultProps: {
          children: 'child',
          label: 'CuitMoon_DictionaryName',
      },
      labelPosition: 'right',
      dialogTableVisible: false,
      viewDicFlag: false,
      isAdd: false,
      parent:'',
      };
    },
    methods: {
        view(){
            this.viewDicFlag = true;
        },
        updateDicInfo() {
            var parent = this.parent;
            this.axios.post("/index.php?r=System/dic/get-dic",{CuitMoon_ParentDictionaryCode:parent})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){

                this.axios.post("/index.php?r=System/dic/get-dic-all",{})
                .then((res) => {
                var hh = JSON.parse(res.request.response);
                if(hh.status===200){


                    this.dicData = hh.data;
                }else if(hh.status==404){
                    this.$message({
                        showClose: true,
                        message  : hh.msg,
                        type     : 'error'
                    });
                }
                });
                this.tableData = hh.data;
            }else if(hh.status==404){
                this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'error'
                });
            }
            });
        },
        childDic(data){
            this.parent = data.CuitMoon_DictionaryCode;
            this.updateDicInfo();
        },
        backFather(data){
            this.axios.post("/index.php?r=System/dic/get-father",{CuitMoon_DictionaryCode:data.CuitMoon_DictionaryCode})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.tableData = hh.data;
                this.parent = hh.data[0].CuitMoon_ParentDictionaryCode;
            }else if(hh.status==404){
                this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'error'
                });
            }
            });
        },
        deleteDic(index,row){
            this.$confirm('你确定删除该字典吗?', '删除字典', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.axios.post("/index.php?r=System/dic/delete-dic",{CuitMoon_DictionaryID:row[index].CuitMoon_DictionaryID})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){

                this.updateDicInfo();
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
         });
    },
        updateDic(index,row){

            this.axios.post("/index.php?r=System/dic/get-dic-one",{CuitMoon_DictionaryID:row[index].CuitMoon_DictionaryID})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.isAdd = false;
                this.dialogTableVisible = true;
                this.formLabelAlign = hh.data[0];
            }else if(hh.status==404){
                this.$message({
                    showClose: true,
                    message  : hh.msg,
                    type     : 'error'
                });
            }
            });
        },
        updateSaveDic(){
            var dic = this.formLabelAlign

            this.axios.post("/index.php?r=System/dic/update-dic",{
            CuitMoon_DictionaryID:dic.CuitMoon_DictionaryID,
            CuitMoon_DictionaryName:dic.CuitMoon_DictionaryName,
            CuitMoon_DictionaryCode:dic.CuitMoon_DictionaryCode,
            CuitMoon_ParentDictionaryCode:dic.CuitMoon_ParentDictionaryCode,
            CuitMoon_DictionaryRemarks:dic.CuitMoon_DictionaryRemarks})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.updateDicInfo();
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
        addDic(){
            this.dialogTableVisible = true;
            this.formLabelAlign = {
                CuitMoon_DictionaryID:'',
                CuitMoon_DictionaryName:'',
                CuitMoon_DictionaryCode:'',
                CuitMoon_ParentDictionaryCode:'',
                CuitMoon_DictionaryRemarks:''
            };
            this.isAdd = true;
        },
        addSaveDic()
        {
            var dic = this.formLabelAlign
            var parent = this.parent;
            this.axios.post("/index.php?r=System/dic/add-dic",{
            CuitMoon_DictionaryID:dic.CuitMoon_DictionaryID,
            CuitMoon_DictionaryName:dic.CuitMoon_DictionaryName,
            CuitMoon_DictionaryCode:dic.CuitMoon_DictionaryCode,
            CuitMoon_ParentDictionaryCode:parent,
            CuitMoon_DictionaryRemarks:dic.CuitMoon_DictionaryRemarks})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status===200){
                this.updateDicInfo();
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

        }

    },
    mounted() {
        this.parent = 0;
        this.updateDicInfo();
    },
};
