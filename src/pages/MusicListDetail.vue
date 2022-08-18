<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 21:41:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-18 22:43:18
-->
<template>
    <div>
        这是歌单详情页面
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
onMounted(() => {
  console.log(router.currentRoute.value.name)
})
</script>

<style scoped>

</style>