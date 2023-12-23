<template>
    <div>
        <div id="header">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
            >
                <el-menu-item index="1"><h1>Titan Hospital System</h1></el-menu-item>

                <div>
                    <el-row>
                        <el-menu-item index="main">首页</el-menu-item>

                        <el-sub-menu>
                        <template #title>人员配置</template>
                        <el-menu-item index="doctor">医生配置</el-menu-item>
                        <el-menu-item index="nurse">护士配置</el-menu-item>
                        </el-sub-menu>

                        <el-sub-menu index="3">
                        <template #title>设施管理</template>
                        <el-menu-item index="3-1">科室管理</el-menu-item>
                        <el-menu-item index="3-2">病房管理</el-menu-item>
                        <el-menu-item index="3-2">床位管理</el-menu-item>
                        </el-sub-menu>
                    </el-row>
                </div>
                
                <el-sub-menu index="4">
                        <template #title>个人中心</template>
                        <div style="margin-left: 15px;margin-bottom: 5px;">
                          <el-avatar> user </el-avatar>
                        </div>
                        <el-menu-item index="4-1">个人中心</el-menu-item>
                        <el-menu-item index="login" @click="loginOut">退出登录</el-menu-item>
                        </el-sub-menu>
            </el-menu>
        </div>
    </div>
    
</template>

<script setup lang="ts" name="RootHeader">
import {useRouter} from 'vue-router'
import {ref} from 'vue'

const router = useRouter()

let activeIndex = ref("main");

//路由跳转
function handleSelect(key: string) {
    router.push({
        name:key
    })
}

//退出登录
function loginOut() {
    router.push({
        name:'login',
    })
    localStorage.removeItem("token");
}

</script>

<style>
.el-menu-demo{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
#header{
  box-shadow:0 20px 20px rgba(0, 0, 0, .12);
  width: 1650px;
  position: absolute;
  right: 5px;
  top: 10px;
}
.mainHeader, .loginOut{
  display: flex;
}
.mainHeader{
  justify-content: center;
  flex: 1;
  height: 80px;
}
.loginOut{
  margin-right: 50px;
}
.menuItem{
  height: 80px;
  display: flex;
  align-items: center;
}
</style>