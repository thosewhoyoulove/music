<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 22:54:08
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-08 20:57:15
-->
<template>
  <main class=" text-center text-gray-700 dark:text-gray-200 h-100% ">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />
  </main>
  <router-view></router-view>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped>

</style>