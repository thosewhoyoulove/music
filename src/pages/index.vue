<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 13:24:40
-->
<template>
  <div>
    <TopNav />
    
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
</script>

<style scoped>
</style>
<route lang="yaml">
meta:
  layout: home
</route>

function beforeCreate() {
  throw new Error('Function not implemented.')
}