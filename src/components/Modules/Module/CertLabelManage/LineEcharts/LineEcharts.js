import echarts from 'echarts';
module.exports = {
    name: 'lineEcharts',
    data() {
        return {
            Brunch:[],
            ID:'',
            Type:'',
            chartColumn: null,
            chartBar: null,
            chartLine: null,
            chartPie: null,
            brunchValue:[0],
            brunchX:[],
            timeValue:[0],
            timeX:[],
            MonthValue:[0],
            MonthX:[],
            ProvinceValue:[0],
            ProvinceX:[],

        }
    },
    created(){
        this.getTypes();
    },
    methods:{
        getTypes(){
            var url = window.location.href;
            var ID = url.split("?");
            var id= ID[1];
            this.axios.post("/index.php?r=Label/scanmanage/get-batch",{ApplyBh:id})
            .then((res) => {
            var hh = JSON.parse(res.request.response);
            if(hh.status==200){
                this.Brunch = hh.data;
                this.Type = hh.data[0].LabelApplicationId
                 var _this = this;
                this.axios.post("/index.php?r=Label/scanmanage/get-scan-record",{LabelApplicationId:hh.data[0].LabelApplicationId})
                .then((res) => {  
                    var obj = JSON.parse(res.request.response);
                    _this.brunchValue = obj.data.byBatch.num;
                    for(var i = 0;i<obj.data.byBatch.num.length;i++){
                        var item = '第'+(i+1)+'批';
                        _this.brunchX.push(item);
                    }
                     _this.timeValue= obj.data.byTime.num;
                     _this.timeX= obj.data.byTime.time;
                     _this.MonthValue= obj.data.byMonth.num;
                     _this.MonthX= obj.data.byMonth.month;
                     _this.ProvinceValue= obj.data.byProvince.num;
                     _this.ProvinceX= obj.data.byProvince.Province;
                     _this.initPic();
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
        typeChange(val){
            var _this = this;
            var type = val;
            this.axios.post("/index.php?r=Label/scanmanage/get-scan-record",{LabelApplicationId:type})
            .then((res) => {  
            var obj = JSON.parse(res.request.response);
                _this.brunchValue = obj.data.byBatch.num;
                _this.brunchX=[];
                    for(var i = 0;i<obj.data.byBatch.num.length;i++){
                        var item = '第'+(i+1)+'批';
                        _this.brunchX.push(item);
                    }
                     _this.timeValue= obj.data.byTime.num;
                     _this.timeX= obj.data.byTime.time;
                     _this.MonthValue= obj.data.byMonth.num;
                     _this.MonthX= obj.data.byMonth.month;
                     _this.ProvinceValue= obj.data.byProvince.num;
                    _this.ProvinceX= obj.data.byProvince.Province;
                   _this.initPic();
            });
        },
        initPic(){
        var _this = this;
        //基于准备好的dom，初始化echarts实例
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartColumn1 = echarts.init(document.getElementById('chartColumn1'));
        this.chartColumn2 = echarts.init(document.getElementById('chartColumn2'));
        this.chartColumn3 = echarts.init(document.getElementById('chartColumn3'));
        
        var _this = this;
        this.chartColumn.setOption({
            title: {
                text: '每个月的扫描量分析'
            },
            tooltip: {},
            xAxis: {
                data: _this.MonthX
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: _this.MonthValue
            }]
        });
        this.chartColumn1.setOption({
            title: {
                text: '各省的扫描量分析'
            },
            tooltip: {},
            xAxis: {
                data: _this.ProvinceX
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: _this.ProvinceValue
            }]
        });
        this.chartColumn2.setOption({
            title: {
                text: '标签扫描次数分析'
            },
            tooltip: {},
            xAxis: {
                data: _this.timeX
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: _this.timeValue
            }]
        });
        this.chartColumn3.setOption({
            title: {
                text: '标签批次扫描分析'
            },
            tooltip: {},
            xAxis: {
                data: _this.brunchX
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: _this.brunchValue
            }]
        });
        },
    },
    mounted: function() {
         this.$nextTick(function(){
            var _this = this;
            $(document).ready(function(){
        
            })
        });
        
    }
}