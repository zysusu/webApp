<template>
    <section class="chart">
    <template>
      <el-select v-model="Type" @change="typeChange" placeholder="请选择">
                  <el-option v-for="(item,index) in Brunch" :value="item.LabelApplicationId" :label="'第'+(index+1)+'批次'">
                  </el-option>
        </el-select>
    </template>
        <el-row>
            <el-col :span="24">
                <div id="chartColumn" style="width:100%; height:300px;"></div>
            </el-col>
             <el-col :span="24">
                <div id="chartColumn1" style="width:100%; height:300px;"></div>
            </el-col>
             <el-col :span="24">
                <div id="chartColumn2" style="width:100%; height:300px;"></div>
            </el-col>
             <el-col :span="24">
                <div id="chartColumn3" style="width:100%; height:300px;"></div>
            </el-col>
           
          <!--   <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col> -->
        </el-row>
    </section>
</template>
<script>
    import LineEchartsJs from './LineEcharts.js';
    module.exports=LineEchartsJs;
</script>
<style scoped>
    
</style>
