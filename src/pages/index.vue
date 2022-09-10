<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-10 19:51:44
-->
<template>
  <div>
    <TopNav />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
const { isFooterShow } = storeToRefs(store);
onMounted(() => {
  isFooterShow.value = true;
});
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