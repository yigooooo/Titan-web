<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">-->
                  <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu
                    default-active="/RootIndex/rootWorkSpace/rootInfo"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    :router="true"
                >
                  <el-menu-item index="/RootIndex/rootWorkSpace/rootInfo">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>个人中心</template>
                  </el-menu-item>

                  <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>新增管理员账号</template>
                  </el-menu-item>

                  <el-menu-item index="/RootIndex/rootWorkSpace/resetPassword">
                    <el-icon><document /></el-icon>
                    <template #title>密码重置</template>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <el-icon><setting /></el-icon>
                    <template #title>消息审批</template>
                  </el-menu-item>
                </el-menu>
      </el-aside>
      <el-main>
        <div id="passage">
          <RouterView></RouterView>
        </div>
      </el-main>
    </el-container>
    <br>
    <br>
    <el-divider border-style="double" />
  </div>
</template>

<script name="WorkSpace" lang="ts" setup>
import {RouterView} from 'vue-router'
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const isCollapse = ref(true)
import {useRouter} from 'vue-router'
const router = useRouter();


</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#passage{
  float: left;
  margin-left: 80px;
  border: 1px #9ed0e3 solid;
  width: 85%;
  height: 600px;
  border-radius: 40px;
  box-shadow:0 20px 20px rgba(0, 0, 0, .12);
}
</style>
