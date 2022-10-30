<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 22:54:08
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-08 20:57:15
-->
<template>
  <main class="text-center text-gray-700 dark:text-gray-200">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.back()"
      style="position: fixed; height: 5vh; width: 100%; margin-bottom: 10vh"
    />
  </main>
  <router-view class="pt-50px"></router-view>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style></style>
