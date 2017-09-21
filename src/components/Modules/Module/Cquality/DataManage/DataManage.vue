<template>
    <!-- 数据展示 -->
    <div>
        <div style="width:100%" v-if="active==1">
            <el-table
              :data="tableData"
              stripe
              border
              style="min-width: 100%">
              <el-table-column
                prop="productName"
                label="产品名称"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="productBrand"
                label="产品品牌"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="applyTime"
                label="申请时间"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop=""
                min-width="25%"
                label="要素过程">
                <template scope="scope">
                      <el-button
                      size="small"
                      type="info"
                      @click="findProcess(scope.$index,tableData)">查询</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop=""
                min-width="25%"
                label="图片采集">
                <template scope="scope">
                      <el-button
                      size="small"
                      type="primary"
                      @click="picManage(scope.$index,tableData)">管理</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop=""
                min-width="25%"
                label="气象数据">
                <template scope="scope">
                      <el-button
                      size="small"
                      type="primary"
                      @click="weatherManage(scope.$index,tableData)">管理</el-button>
                </template>
              </el-table-column>
            </el-table>

          <div class="block" style="margin:20px 35px; float:right;">
            <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :current-page="pagenum"
            @current-change="getData"
            :page-size="pagesize">
            </el-pagination>
          </div>
        </div>
    <!-- 图片采集 -->
            <div class="block" v-if="active==2 || active==3">
                <span class="demonstration">日期范围</span>
                <!-- <el-date-picker v-model="dateValue"
                type="daterange"
                placeholder="选择日期范围">
                </el-date-picker> -->
                <el-date-picker
                  v-model="start"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                --
                <el-date-picker
                  v-model="end"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                <el-button
                v-if="active==2"
                size="small"
                type="success"
                @click="search"
                >搜索</el-button>

                <el-button
                v-if="active==3"
                size="small"
                type="primary"
                @click="searchWeather"
                >搜索</el-button>

                <el-button
                size="small"
                type="primary"
                @click="active=1">返回</el-button>

                <el-button
                v-if="active==2"
                size="small"
                type="info"
                @click="addBtn">添加</el-button>

                <el-button
                v-if="active==3"
                size="small"
                type="primary"
                @click="addWeatherBtn">添加</el-button>
            </div>

            <br>
            <br>
            <el-table
            v-if="active==2"
              :data="picData"
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="ProctureUrl"
                label="图片"
                min-width="25%">
                <template scope="scope">
                    <img :src="imageSrc+scope.row.ProctureUrl" class="avatar">
                </template>
              </el-table-column>
              <el-table-column
                prop="DataOrigin"
                label="数据来源"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="cropGrowthPeriod"
                label="生育期"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="CollectionTime"
                label="采集时间"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="Remark"
                label="描述"
                min-width="25%">
              </el-table-column>
              <el-table-column

                min-width="25%"
                label="操作">
                <template scope="scope">
                    <el-button
                    size="small"
                    type="primary"
                    @click="updatePic(scope.$index,picData)">修改</el-button>

                      <el-button
                      size="small"
                      type="danger"
                      @click="deletePic(scope.$index,picData)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>

            <el-table
            v-if="active==3"
              :data="weatherData"
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="AddTime"
                label="采集时间"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="DataOrigin"
                label="数据来源"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="DisastoursDescription"
                label="气象灾害数据描述"
                min-width="25%">
              </el-table-column>
              <el-table-column
                prop="Remark"
                label="备注"
                min-width="25%">
              </el-table-column>
              <el-table-column

                min-width="25%"
                label="操作">
                <template scope="scope">
                    <el-button
                    size="small"
                    type="primary"
                    @click="updateWeather(scope.$index,weatherData)">修改</el-button>

                      <el-button
                      size="small"
                      type="danger"
                      @click="deleteWeather(scope.$index,weatherData)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>

            <el-dialog title="添加图片" :visible.sync="dialogTableVisible">
                <el-form :label-position="labelPosition" label-width="110px" :model="Prictureinfomation">

                    <el-form-item label="生长周期：">
                        <el-select v-model="Prictureinfomation.cropGrowthPeriod" placeholder="请选择">
                           <el-option
                             v-for="item in bearing"
                             :key="item.cropGrowthPeriod"
                             :label="item.cropGrowthPeriod"
                             :value="item.cropGrowthPeriod">
                           </el-option>
                         </el-select>
                    </el-form-item>

                    <el-form-item label="地区：">
                        <el-cascader
                        v-model="activeArea"
                        :options="dataOrigin"
                        :props="originProps"
                        :show-all-levels="false"
                        @change="getOrigins"
                        ></el-cascader>
                        <!-- <el-input v-model="Prictureinfomation.DataOrigin"></el-input> -->
                    </el-form-item>

                    <el-form-item label="数据来源：">
                        <el-select v-model="Prictureinfomation.DataOrigin" placeholder="请选择">
                           <el-option
                             v-for="item in DataOrigins"
                             :key="item.Name"
                             :label="item.Name"
                             :value="item.Name">
                           </el-option>
                         </el-select>
                    </el-form-item>

                    <el-form-item label="采集时间：">
                        <el-date-picker
                          v-model="Prictureinfomation.CollectionTime"
                          type="datetime"
                          @change="saveDate"
                          placeholder="选择日期"
                          :picker-options="pickerOptions0">
                        </el-date-picker>
                    <!-- <el-input v-model="Prictureinfomation.CollectionTime"></el-input> -->
                    </el-form-item>
                    <el-form-item label="图片：">
                        <el-upload
                          class="avatar-uploader"
                          :action="imageAction"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注：">
                    <el-input style="width:450px;" v-model="Prictureinfomation.Remark"></el-input>
                    </el-form-item>
                </el-form>
              <br>
              <el-button
              type="success"
              v-if="addPic"
              @click="addPicSave">添加图片</el-button>
              <el-button
              type="success"
              v-else="addPic"
              @click="updatePicSave">修改</el-button>
            </el-dialog>



            <el-dialog title="添加数据" :visible.sync="weatherModal">
                <el-form :label-position="labelPosition" label-width="80px" :model="Disastoursdata">


                    <el-form-item label="地区：">
                        <el-cascader
                        v-model="activeArea"
                        :options="dataOrigin"
                        :props="originProps"
                        :show-all-levels="false"
                        @change="getOrigins"
                        ></el-cascader>
                        <!-- <el-input v-model="Prictureinfomation.DataOrigin"></el-input> -->
                    </el-form-item>

                    <el-form-item label="数据来源：">
                        <el-select v-model="Disastoursdata.DataOrigin" placeholder="请选择">
                           <el-option
                             v-for="item in DataOrigins"
                             :key="item.Name"
                             :label="item.Name"
                             :value="item.Name">
                           </el-option>
                         </el-select>
                    </el-form-item>

                    <el-form-item label="气象灾害描述：">
                        <el-input v-model="Disastoursdata.DisastoursDescription"></el-input>
                    </el-form-item>

                    <el-form-item label="备注：">
                        <el-input v-model="Disastoursdata.Remark"></el-input>
                    </el-form-item>
                </el-form>
              <br>
              <el-button
              type="info"
              v-if="addWeather"
              @click="addWeatherSave">添加</el-button>
              <el-button
              type="success"
              v-else="addWeather"
              @click="updateWeatherSave">修改</el-button>
            </el-dialog>
        </div>
</template>
<script>
    import DataManageJS from './DataManage.js';
    module.exports = DataManageJS;
</script>
<style>

</style>
