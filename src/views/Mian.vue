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
            <el-statistic
                group-separator=","
                :precision="0"
                :value="ratio"
                title="男女医生比例"
            ></el-statistic>
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
import { reactive, ref, onMounted} from "vue"
import useDoctor from '@/hooks/useDoctor'
import useDepartment from "@/hooks/useDepartment";
import useNurse from "@/hooks/useNurse";
import useWard from "@/hooks/useWard";
import type {} from '@/types'

const {getCount, sexRatio} = useDoctor();
const {counts} = useDepartment();
const {getNurseCount} = useNurse();
const {wardCount} = useWard();


let doctorCount = ref();
let ratio = ref();
let departmentCount = ref();
let nurseCount = ref();
let count = ref();

onMounted(()=>{
  getCount().then(res=>{
    doctorCount.value = res.body;
  });
  sexRatio().then(res=>{
    ratio.value = res.body;
  });
  counts().then(res=>{
    departmentCount.value = res.body;
  });
  getNurseCount().then(res=>{
    nurseCount.value = res.body;
  });
  wardCount().then(res=>{
    count.value = res.body;
  })
})
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
