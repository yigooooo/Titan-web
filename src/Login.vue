<template>
  <div id="bck">
    <div id="login">
      <h1 style="margin-left: 70px"><b>TITAN Hospital System</b></h1><br>
      <el-form ref="form" :model="loginUser" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="loginUser.id" clearable placeholder="請輸入用戶ID" style="height: 40px;"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginUser.password" clearable show-password placeholder="請輸入密碼" style="height: 40px;"></el-input>
        </el-form-item><br>
        <el-radio-group v-model="radio" style="margin-left: 70px">
          <el-radio :label="0">管理員</el-radio>
          <el-radio :label="1">醫生</el-radio>
          <el-radio :label="4">护士</el-radio>
          <el-radio :label="2">患者</el-radio>
        </el-radio-group><br><br>
        <el-button type="primary" :loading="bo" @click="loginAdmin" id="btn" style="
        margin-left: 70px; width: 100px; height: 50px">
          登录
        </el-button>
        <el-button type="success" :loading="bo" @click="visible = true" id="btn" style="
        margin-left: 70px; width: 100px; height: 50px">
          注册
        </el-button>
      </el-form>
    </div>

  <!-- 注册对话框 -->
<el-dialog
        title="患者账号注册"
        v-model="visible"
        width="30%">
      <h2>ID</h2>
      <el-input v-model="register.id" placeHolder="请输入用户名" clearable></el-input><br><br>
      <h2>密码</h2>
      <el-input v-model="register.password" placeHolder="请输入密码" show-password clearable></el-input><br><br>
      <h2>确认密码</h2>
      <el-input v-model="register.oldPassword" placeHolder="请再次输入密码" clearable show-password @blur="verify"></el-input><br><br>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="registerCount">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script name="Login" setup lang="ts">
import {ref,reactive} from 'vue'
import type {User, Register} from '../types'
import useLogin from './hooks/useLogin'
import {ElNotification} from 'element-plus'
import { ElLoading } from 'element-plus'
import {useRouter} from 'vue-router'
//初始化数据
const {login, regist, verifyCount} = useLogin()
//初始化路由
const router = useRouter()
let visible = ref(false);
let bo = ref(false);
let radio = ref('');

//登录角色
let loginUser:User = reactive({
    id:"",
    password:'',
})

//登錄
function loginAdmin() {
  const loading = ElLoading.service();
  if (radio.value == '0') {
    login(loginUser).then(res=>{
      if (res.resultCode == '200' && res.body != null){
            localStorage.setItem("token", res.body);
            router.replace({
              name:'RootIndex',
            });
            loading.close();
            return;
          }
        })
  }


}

//注册角色
let register: Register = reactive({
    id: "",
    password: "",
    oldPassword: ""
})

function registerCount() {
    regist({
      id: register.id,
      password: register.password,
      oldPassword: register.oldPassword
    }).then(res=>{
      if (res.body == true){
        ElNotification({
              title:'成功',
              message:'注册成功',
              type:"success"
            })
            visible.value = false;
            register.id = "";
            register.password = "";
            register.oldPassword = "";
      }
    })
}


//验证两次输入密码是否一致
function verify() {
  verifyCount({
    password:register.password,
    oldPassword:register.oldPassword
  }).then(res=>{
    if (res.body == false) {
      ElNotification({
            title:'警告',
            message:'密码输入不一致',
            type:'warning'
          })
          return;
        }
  })
}

</script>

<style>
#bck{
  background: url("./img/login.jpg") no-repeat;
  height: 100%;
  width: 100%;
  position:absolute;
  top: 10px;
  right: 10px;
}
#login{
  width: 500px;
  height: 200px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 250px;
  margin: auto;
}
</style>
