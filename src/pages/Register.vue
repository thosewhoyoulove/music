<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-10 09:57:18
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-17 19:31:57
-->
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { isFooterShow } = storeToRefs(store);
onBeforeMount(() => {
  isFooterShow.value = false;
});
</script>

<template>
  <div class="h-100vh w-100vw bg-hex-white text-center text-xs pt-10">
    <p class="mt-10">遗憾的告诉你，网易云的注册接口暂时用不了>_&lt</p>
  </div>
</template>

<style scoped></style>
<route lang="yaml">
meta:
  layout: default
  title: 注册
</route>
