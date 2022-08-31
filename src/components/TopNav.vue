<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-16 22:44:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-31 10:39:29
-->
<template>
  <div class="w-100% h-10 flex justify-between items-center">
    <span class="text-xl">
      <van-icon name="bars" />
    </span>

    <div class="flex w-70% justify-between items-center text-md font-500">
      <span>我的</span>
      <span class="font-900">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <span class="text-xl" @click="toSearch">
      <van-icon name="search" />
    </span>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const toSearch = () => {
  router.push({
    path: "/Search",
  });
};
</script>

<style scoped>
</style>