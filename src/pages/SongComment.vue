<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-25 12:42:09
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-25 12:47:02
-->
<template>
    <div>
        这是歌曲评论
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.query.id
onMounted(() => {
    console.log(id)
})
</script>

<style scoped>

</style>