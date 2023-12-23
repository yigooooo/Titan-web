<template>
  <div>
    <br>
    <div id="main">
      <div><h1>人员信息总览</h1></div>
      <br>
      <br>
      <el-row :gutter="20">
        <el-col :span="4">
          <div>
            <el-statistic
                group-separator=","
                :precision="0"
                :value="doctorCount"
                title="医生數量"
            ></el-statistic>
          </div>
        </el-col>

        <el-col :span="5">
          <div>
            <el-statistic title="医生男女比例">
              <template slot="formatter">
                {{sexRatio}}
              </template>
            </el-statistic>
          </div>
        </el-col>

        <el-col :span="5">
          <div>
            <el-statistic
                group-separator=","
                :precision="0"
                :value="nurseCount"
                title="护士数量"
            ></el-statistic>
          </div>
        </el-col>

        <el-col :span="5">
          <div>
            <el-statistic
                group-separator=","
                :precision="0"
                :value="departmentCount"
                title="科室数量"
            ></el-statistic>
          </div>
        </el-col>

        <el-col :span="5">
          <div>
            <el-statistic
                group-separator=","
                :precision="0"
                :value="count"
                title="病房數量"
            ></el-statistic>
          </div>
        </el-col>

      </el-row><br><br>
    </div>
  </div>
</template>

<script name="Main" setup lang="ts">

</script>



<style>
#main{
  text-align: center;
  border-radius: 40px;
  border: #ffffff 1px solid;
  box-shadow: 0 0 5px;
  width: 100%;
}
</style>
