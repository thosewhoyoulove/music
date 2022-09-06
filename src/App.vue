<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 15:14:45
-->
<template>
  <main font-sans-serif p=".5rem" text="center gray-700 dark:gray-200">
    <router-view />
  </main>
  <Footer></Footer>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: 2rem;
  height: 2rem;
}
</style>

