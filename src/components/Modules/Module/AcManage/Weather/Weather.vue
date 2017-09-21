<template>
    <div class="form">
        <el-col v-show="!showAdd" :span="24" class='actions-top'>
            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="气象站名称或者编号"
                        v-model='search_data.Name'
                        clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click='onSearch(search_data)'>查询</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="showDiv">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table v-if="!showAdd" border style="width: 100%" align='center'
                  :data="station_list"
                  :model="station_list"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    prop="WeatherStationID"
                    label="气象站编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="Name"
                    label="气象站名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="AreaName"
                    label="所属气象局"
                    align="center">
            </el-table-column>
           <!--  <el-table-column
                    prop="Measuringelements"
                    label="要素"
                    align="center">
            </el-table-column> -->
             <el-table-column
                    label="要素"
                    align="center">
                <template scope="scope">
                    <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelect(scope.row)'>查询</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="编辑"
                    align="center"
                    :context="_self">
                    
                <template scope="scope">
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEdit(scope.row)'>编辑</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    label="删除"
                    align="center"
                    :context="_self">
                <template scope='scope'> 
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDelete(scope.row.WeatherStationInfoID,scope.$index)'></el-button>
                </template>
            </el-table-column>
        </el-table>
 <div class="block" v-if="!showAdd && !searchFlag" style="margin:20px 35px; float:right;">
    <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
         @current-change="handleCurrentChange">
    </el-pagination>
</div> <!--  分页的div -->
<div class="block" v-if="!showAdd && searchFlag" style="margin:20px 35px; float:right;">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="totalNum"
        @current-change='handleCurrentChange2'>
      </el-pagination>
</div> <!--  分页的div -->

<!--    第二个 -->
          <el-dialog title="要素信息" v-if="dialog2.show" v-model="dialog2.show">
            <el-form v-for="item in dialog2.element_info" style="margin:20px 15px; width:45%; float:left; border:3px solid #aedd7d; padding-left:10px;" label-width="90px"
                     :model="item">
                <el-form-item class='edit-form'
                              label="要素名称："
                              prop='ElementName'>
                              {{item.ElementName}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="气象指标："
                              prop='Remark'>
                              {{item.Remark}}
                </el-form-item>

                    <el-form-item class='edit-form'
                              label="要素单位："
                              prop='Unit'>
                              {{item.Unit}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="要素类别："
                              prop='ElementType'>
                              {{item.ElementType}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="添加时间："
                              prop='AddTime'>
                              {{item.AddTime}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="备注："
                              prop='Remark'>
                              {{item.Remark}}
                </el-form-item>
            </el-form>
            <div slot="footer" style="width:100%; float:right; margin-bottom: 20px;" class="dialog-footer">
                <el-button type="success" @click="dialog2.show = false">返回</el-button>        
            </div>
        </el-dialog> 

    <div class="addDiv">
        <el-form style="margin:20px;width:60%;min-width:600px;"
            label-width="120px"
            :data="station_data"
            :model="station_data"
            :rules='station_rules'
            ref='station_data'>
            <el-form-item 
                :disabled='true'
                label="气象站编号："
                prop="WeatherStationID">
                <el-input
                        v-model="station_data.WeatherStationID"></el-input>
                <span>(S开头的气象站号，请将s改为83，如s207改为83207)</span>
            </el-form-item>

            <el-form-item 
                :disabled='true'
                label="气象站名称："
                prop="Name">
                <el-input
                        v-model="station_data.Name"></el-input><!-- <button @click="findStation">在地图上查找</button> -->
            </el-form-item>

             <el-form-item 
                :disabled='true'
                label="所属气象局："
                prop="BelongTo">
                <!-- <el-input
                        v-model="station_data.BelongTo"></el-input> -->
                <el-cascader
                    :props="areaList"
                    :options="area_list"
                    change-on-select
                    v-model="station_data.BelongTo">
                </el-cascader>
            </el-form-item>
             <el-form-item 
                :disabled='true'
                label="请选择气象站所在位置："
                prop="WeatherStationInfoID">
            </el-form-item>

              <div id="allmap" class="map"></div>

            <el-form-item 
                :disabled='true'
                label="所在经度："
                prop="Longitude">
                <el-input
                        v-model="station_data.Longitude"></el-input>
            </el-form-item>

            <el-form-item 
                :disabled='true'
                label="所在纬度："
                prop="Latitude">
                <el-input
                        v-model="station_data.Latitude"></el-input>
            </el-form-item>
            <el-form-item 
                :disabled='true'
                label="测量要素："
                prop="Measuringelements">
                  <el-checkbox-group v-model="station_data.Measuringelements">
                    <el-checkbox v-for="item in elements" :label="item.ElementNumber" :key="item.ElementNumber">{{item.ElementName}}</el-checkbox>
                  </el-checkbox-group>
            </el-form-item>
            <el-form-item 
                :disabled='true'
                label="备注："
                prop="Remark">
                <el-input
                        v-model="station_data.Remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if="!station_data.WeatherStationInfoID" type="primary" @click='save_station(station_data)'>提交</el-button>

                <el-button v-if="station_data.WeatherStationInfoID" type="primary" @click='update_station(station_data)'>确定</el-button>

                <el-button type="default"
                           @click='reBack()'>返回</el-button>
            </el-form-item>
        </el-form>
    </div>  <!-- add_end -->
    </div>
</template>
<!-- 
 <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=lYZBeQf4N70KiPjHabOe2HMI988q4yYU"></script> -->

<script>
	import WeatherJs from './Weather.js';
	module.exports = WeatherJs;
</script>

<style scoped lang='less'>
.map{
    width:500px;
    height:400px;
    border:1px solid black;
    overflow: hidden;
    margin-left: 100px;
    margin-top: -70px;
    margin-bottom: 30px;
}
    .demo-form-inline {
        display: inline-block;
        float: right;
    }
    .addDiv{
      display: none;
    }
    .btm-action {
        margin-top: 20px;
        text-align: center;
    }

    .actions-top {
        height: 46px;
    }

    .pagination {
        display: inline-block;
    }
/*    .XSDFXPage,.container{
            width: 300px;
            height: 300px;
            border:1px solid black;
            margin-left: 20px;
            font-family: "微软雅黑";
        }*/
</style>
