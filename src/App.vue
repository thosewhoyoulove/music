<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-18 22:44:31
-->
<template>
  <main font-sans p=".5rem" text="center gray-700 dark:gray-200">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
      v-if="flag"
    />
    <router-view />
  </main>
</template>
<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const flag = ref(false)
onMounted(() => {
  if(router.currentRoute.value.name=='undefined')
  flag = !flag
})
onMounted(() => {
  console.log(router.currentRoute.value.name)
})
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