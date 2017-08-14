import echarts from 'echarts';

module.exports = {
    name: 'codePage',
    data() {
        return {
            LineDiv:[],  //有几个折线图
            LineImg:'chartLine',  //折线图div的共同前缀
            Province:'',
            City:'',
            District:'',
            Address:'',
            localInfo:{},
            product:{},  //产品信息
            labelInfo:{},  //标签信息
            testYdata:[],
            testXdata:[],
            chartLine0: null,
            chartLine1: null,
            chartLine2: null,
            chartLine3: null,
            chartLine4: null,
            chartLine5: null,
            address:'',
            firstTime:{},
            secondTime:{},
            Last:{},
            winSize: {
                width: '',
                height: ''
            },
            formOffset: {
                position: 'absolute',
                left: '',
                top: ''
            },
        }
    },
    methods: {
        setSize() {
            // this.winSize.width = $(window).width() + "px";
            // this.winSize.height = $(window).height() + "px";
            // this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
            // this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
        },
        setLocal(){ 
            var id = '11B8EE50260C1B8E19309CFEB33EEFDA';
                var _this = this;
                this.axios.post("/index.php?r=Label/scan/save-record",{id:id,province:_this.Province,city:_this.City,district:_this.District,address:_this.Address})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                 
             });
        },
        initData(){
            var id = '11B8EE50260C1B8E19309CFEB33EEFDA';
                var _this = this;
                this.axios.post("/index.php?r=Label/scan/scan",{id:id})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                 _this.labelInfo = hh.data.labelInfo;
                 _this.firstTime = hh.data.labelInfo.first[0];
                 _this.secondTime = hh.data.labelInfo.first[1];
                 _this.Last = hh.data.labelInfo.last;
                 _this.LineDiv = hh.data.climate;  //给几个折线图赋值
             });
        },
        showFirst(){
                var id = '11B8EE50260C1B8E19309CFEB33EEFDA';
                var _this = this;
                this.axios.post("/index.php?r=Label/scan/scan",{id:id})
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                 _this.labelInfo = hh.data.labelInfo;
                 _this.product = hh.data.product;
                 _this.firstTime = hh.data.labelInfo.first[0];
                 _this.secondTime = hh.data.labelInfo.first[1];
                 _this.Last = hh.data.labelInfo.last;
                 _this.LineDiv = hh.data.climate;  //给几个折线图赋值
                 _this.testYdata = hh.data.climate[1].avg_values;
                 _this.testXdata = hh.data.climate[1].months;
                 for(var i=0;i<hh.data.climate.length;i++){
                    if(i==0){
                        var obj1 = this.chartLine0;
                    }else if(i==1){
                        var obj1 = this.chartLine1;
                     }else if(i==2){
                        var obj1 = this.chartLine2;
                     }else if(i==3){
                        var obj1 = this.chartLine3;
                     }else if(i==4){
                        var obj1 = this.chartLine4;
                     }else if(i==5){
                        var ovj1 = this.chartLine5;
                     }
                     obj1 = echarts.init(document.getElementById('chartLine'+i));
                      obj1.setOption({
                        title: {
                            text: hh.data.climate[i].meteorologicalfactor 
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['气候环境信息']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: hh.data.climate[i].months
                        },
                        yAxis: {
                            type: 'value'
                        },
                         series: [{
                            name: hh.data.climate[i].meteorologicalfactor,
                            type: 'line',
                            stack: '总量',
                            data: hh.data.climate[i].avg_values
                        }]
                        });
                 }
            });
        }
    },
    created() {
        
        this.initData();
        var geolocation = new qq.maps.Geolocation("3RZBZ-6Y5KF-AJ7JK-NY5WH-LTEIS-X4FA6", "ysApp");
        var positionNum = 0;
        var options = {timeout: 8000};
        var _this = this;
        geolocation.getLocation(function(position) {
            positionNum ++;
            console.log(position);
            _this.Province = position.province;
            _this.City = position.city;
            _this.District = position.district;
            _this.Address = position.province+position.city+position.addr;
           _this.setLocal();  //发送保存当前位置信息
        }, function(position) {
            positionNum ++;
           // alert("获取当前位置失败！");
        }, options);
       /* this.setSize();
        $(window).resize(() => {
            this.setSize();
        });*/
    },
    mounted() {
        var _this = this;
        var xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六','周一', '周二', '周三', '周四', '周五', '周六'];
        var yTestData1 = [ 132, 101, 134, 120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,190,220,210];
       
        this.$nextTick(function(){
            var _this = this;
            $(document).ready(function(){
                _this.showFirst();
            })
        });
    },
    watch: {
        showList(){
            this.$nextTick(function(){
                this.showFirst();
            });
        }
    }
}
