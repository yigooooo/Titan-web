<template>
  <div><br><br>
    <el-row style="margin-left: 50px" >
      <el-select v-model="value" class="m-2" placeholder="请选择重置密码的角色" clearable>
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-form ref="search" :model="form" label-width="80px">
        <div class="search">
          <el-form-item label="ID">
            <el-input v-model="form.id" clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-button @click="searchInfo" style="margin-left: 50px">
        <el-icon style="vertical-align: middle">
          <Search />
        </el-icon>
        <span style="vertical-align: middle"> 查询 </span>
      </el-button>
      <br><br><br><br><br>
    </el-row>
    <el-descriptions title="User Info" style="margin-left: 150px">
      <el-descriptions-item label="ID">{{id}}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{userId}}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{name}}</el-descriptions-item>
      <el-descriptions-item label="性别">{{gender}}</el-descriptions-item>
      <el-descriptions-item label="科室">{{department}}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{idCard}}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{phoneNumber}}</el-descriptions-item>
      <el-descriptions-item label="job">
        <el-tag size="small">{{job}}</el-tag>
      </el-descriptions-item>
    </el-descriptions><br><br><br><br>

    <el-form ref="search" :model="updateForm" label-width="80px" style="margin-left: 100px">
      <div class="search">
        <el-form-item label="旧用户名">
          <el-input v-model="updateForm.oldId" disabled></el-input>
        </el-form-item>

        <el-form-item label="新用户名" style="margin-left: 20px">
          <el-input v-model="updateForm.id" clearable></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="updateForm.password" clearable></el-input>
        </el-form-item>
      </div>
    </el-form>
    <br>
    <el-button  @click="updatePwd" type="warning" plain style="margin-left: 850px;height: 40px">
      <el-icon style="vertical-align: middle">
        <Edit />
      </el-icon>
      <span style="vertical-align: middle"> 重置密码 </span>
    </el-button>

  </div>
</template>

<script name="ResetPassword" setup lang="ts">
import {ElNotification} from 'element-plus'
import {ref,reactive} from 'vue'
import type {} from '@/types'
import useDoctor from "@/hooks/useDoctor";
import useNurse from "@/hooks/useNurse";

const {info, resetCount} = useDoctor();
const {nurseInfo} = useNurse();

let form = reactive({
  id:''
})
const value = ref();
const options = [
  {
    value: '1',
    label: '医生',
  },
  {
    value: '2',
    label: '护士',
  },
  {
    value: '3',
    label: '患者',
  },
]

let updateForm = reactive({
  oldId:'',
  id:'',
  password:''
})
let job = ref()
let id = ref()
let userId = ref()
let name = ref()
let gender = ref()
let idCard = ref()
let phoneNumber = ref()
let department = ref()
const searchInfo = ()=>{
  if (value.value == '1') {
    info(form).then(res=>{
      job.value = '医生';
      id.value = res.body.id;
      userId.value = res.body.doctorId;
      name.value = res.body.doctorName;
      gender.value = res.body.doctorGender;
      idCard.value = res.body.idCard;
      phoneNumber.value = res.body.phoneNumber;
      department.value = res.body.department;
      updateForm.oldId = res.body.doctorId;
    })
    return;
  }
  if (value.value == '2') {
    nurseInfo(form).then(res=>{
      job.value = '护士';
      id.value = res.body.id;
      userId.value = res.body.nurseId;
      gender.value = res.body.nurseGender;
      idCard.value = res.body.idCard;
      phoneNumber.value = res.body.phoneNumber;
      department.value = res.body.department;
      updateForm.oldId = res.body.nurseId;
    })
    return;
  }

}

const updatePwd = ()=>{
  if (value.value == '1') {
    resetCount(updateForm).then(res=>{
      if (res.body == true) {
        ElNotification({
          title:'成功',
          message:'重置密码成功',
          type:'success'
        })
        Object.keys(updateForm).forEach(key => (updateForm[key] = ''));
        return;
      }
      ElNotification({
        title:'失败',
        message:'重置密码失败',
        type:'error'
      })
      Object.keys(updateForm).forEach(key => (updateForm[key] = ''));
      return;
    })
  }
}
</script>

<style scoped>
.search {
  height: 50px;
  display: flex;
  flex-direction: row;
}
</style>
