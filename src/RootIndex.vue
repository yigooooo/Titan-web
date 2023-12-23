<template>
  <div>
    <div>
      <RootHeader></RootHeader>
    </div>
    <div id="line">
      <el-divider border-style="double"/>
    </div>
    <div id="page">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="RootIndex">
import {RouterView} from 'vue-router'
import {createApp} from 'vue'
import RootHeader from './nav/RootHeader.vue';
//组件注册
const app = createApp({});
app.component({
    RootHeader,
})
</script>


<style>
#line{
  width: 1650px;
  position: absolute;
  right: 5px;
  top: 100px;
}
#page{
  position: absolute;
  top: 150px;
  width: 1630px;
  right: 5px;
  top: 100px;
  top: 150px;
}
</style>