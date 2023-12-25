<template>
  <div id="main">
    个人中心
    <el-descriptions  direction="vertical" :column="3" border
                      style="width: 1000px;font-size: 18px"
    >
      <el-descriptions-item label="编号">{{user.id}}</el-descriptions-item>
      <el-descriptions-item label="ID">{{user.rootId}}</el-descriptions-item>
      <el-descriptions-item label="性別" :span="20">{{user.rootGender}}</el-descriptions-item>

      <el-descriptions-item label="姓名">{{user.rootName}}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{user.idCard}}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{user.phoneNumber}}</el-descriptions-item>

      <el-descriptions-item label="入职时间">{{user.insertTime}}</el-descriptions-item>
      <el-descriptions-item label="最近更新时间">{{user.updateTime}}</el-descriptions-item>
    </el-descriptions><br>

    <el-divider border-style="double" /><br>

    <div id="btn">
      <el-button  @click="handleEdit()" size="large">
        <el-icon style="vertical-align: middle">
          <Edit />
        </el-icon>
        <span style="vertical-align: middle"> 编辑 </span>
      </el-button>

      <el-button  @click="dialogVisiblePassword = true" size="large" type="warning" plain >
        <el-icon style="vertical-align: middle">
          <Edit />
        </el-icon>
        <span style="vertical-align: middle"> 修改密码 </span>
      </el-button>
    </div>

<!--    修改个人信息对话框-->
    <el-dialog
        title="修改个人信息"
        v-model="dialogVisible"
        width="30%"
    >
      <h2>ID</h2>
      <el-input v-model="user.rootId" disabled></el-input><br><br>
      <h2>姓名</h2>
      <el-input v-model="edit.rootName" placeHolder="请输入姓名" clearable></el-input><br><br>
      <h2>性别</h2>
      <el-radio v-model="edit.rootGender" label="男">男</el-radio>
      <el-radio v-model="edit.rootGender" label="女">女</el-radio><br><br>
      <h2>身份证号</h2>
      <el-input v-model="edit.idCard" placeHolder="请输入身份证号" clearable></el-input><br><br>
      <h2>联系电话</h2>
      <el-input v-model="edit.phoneNumber" placeHolder="请输入电话" clearable></el-input><br><br>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateRoot">确 定</el-button>
          </span>
    </el-dialog>



    <el-dialog
        title="修改密碼"
        v-model="dialogVisiblePassword"
        width="30%"
    >
      <h2>ID</h2>
      <el-input v-model="user.rootId" disabled></el-input><br><br>
      <h2>旧密码</h2>
      <el-input v-model="editPassword.oldPassword" placeHolder="请输入旧密码" show-password clearable></el-input><br><br>
      <h2>新密码</h2>
      <el-input v-model="editPassword.password" placeHolder="请输入新密码" show-password clearable></el-input><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePassword = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script name="RootInfo" lang="ts" setup>
import {onMounted,reactive, ref} from "vue"
import type {root, pwd} from '@/types'
import useRoot from "@/hooks/useRoot"
const {info, update, updatePwd} = useRoot();
import {ElNotification} from 'element-plus'

let dialogVisible = ref(false)
let dialogVisiblePassword = ref(false)
let user:root = reactive({
  id: '',
  rootId: '',
  rootName: '',
  rootGender:'',
  idCard: '',
  phoneNumber: '',
  insertTime: '',
  updateTime: '',
})

onMounted(()=>{
    info().then(res=>{
      if (res.body == null) {
        ElNotification({
          title:'警告',
          message:'请尽快完善个人信息',
          type:'warning'
        });
      }
      user.id = res.body.id;
      user.rootId = res.body.rootId;
      user.rootName = res.body.rootName;
      user.rootGender = res.body.rootGender;
      user.idCard = res.body.idCard;
      user.phoneNumber = res.body.phoneNumber;
      user.insertTime = res.body.insertTime;
      user.updateTime = res.body.updateTime;
    })
})

//编辑个人信息begin
let edit: root = reactive({
  id: '',
  rootId: '',
  rootName: '',
  rootGender:'',
  idCard: '',
  phoneNumber: '',
  insertTime: '',
  updateTime: '',
})
const handleEdit = ()=>{
  dialogVisible.value = true;
  edit.id = user.id;
  edit.rootName = user.rootName;
  edit.rootGender = user.rootGender;
  edit.idCard = user.idCard;
  edit.phoneNumber = user.phoneNumber;
}
const updateRoot = ()=>{
  update(edit).then(res=>{
    if(res.body == true) {
      dialogVisible.value = false;
      ElNotification({
        title:'成功',
        message:'修改成功',
        type:'success'
      });
      info().then(res=>{
        user.id = res.body.id;
        user.rootId = res.body.rootId;
        user.rootName = res.body.rootName;
        user.rootGender = res.body.rootGender;
        user.idCard = res.body.idCard;
        user.phoneNumber = res.body.phoneNumber;
        user.insertTime = res.body.insertTime;
        user.updateTime = res.body.updateTime;
      })
      Object.keys(edit).forEach(key => (edit[key] = ''));
      return;
    }
    ElNotification({
      title:'失败',
      message:'修改失败',
      type:'error'
    })
    return;
  })
}
//编辑个人信息end

//配置密码begin
let editPassword: pwd = reactive({
  id:'',
  oldPassword:'',
  password:'',
})
const updatePassword = ()=>{
  editPassword.id = user.rootId;
  updatePwd(editPassword).then(res=>{
    if(res.body == true) {
      dialogVisiblePassword.value = false;
      ElNotification({
        title:'成功',
        message:'修改成功',
        type:'success'
      });
      Object.keys(editPassword).forEach(key => (editPassword[key] = ''));
      return;
    }
    ElNotification({
      title:'失败',
      message:'修改失败',
      type:'error'
    })
    return;
  })
}
//配置密码end

</script>

<style scoped>
#main{
  margin-left: 80px;
  font-size: 25px;
  justify-content: center;
  margin-top: 80px;
}
#btn{
  float: right;
  margin-right: 60px;
}
</style>
