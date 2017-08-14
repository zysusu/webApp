<template>

    <div>
        <div class="block">
            <div>
                <el-table
                  :data="tableData"
                  stripe
                  style="min-width: 100%">
                  <el-table-column
                    prop="CuitMoon_LogOperationIPv4"
                    label="IPV4地址"
                    min-width="25%">
                  </el-table-column>
                  <el-table-column
                    prop="CuitMoon_LogOperationName"
                    label="操作名称"
                    min-width="25%">
                  </el-table-column>
                  <el-table-column
                    prop="CuitMoon_LogOperationURL"
                    label="页面地址"
                    min-width="25%">
                  </el-table-column>
                  <el-table-column
                    prop="CuitMoon_LogRemarks"
                    label="备注"
                    min-width="25%">
                  </el-table-column>
                  <el-table-column
                    prop="CuitMoon_LogOperationUserName"
                    label="操作用户"
                    min-width="25%">
                  </el-table-column>
                  <el-table-column
                    prop="CuitMoon_LogOperationTime"
                    label="操作时间"
                    min-width="25%">
                  </el-table-column>

                </el-table>
            </div>
            <el-pagination
            layout="prev, pager, next"
            :total="total"
            :current-page="pagenum"
            @current-change="getLog"
            :page-size="pagesize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import LogManageJS from './LogManage.js';
    module.exports = LogManageJS;
</script>
<style scoped>

</style>
