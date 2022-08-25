<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-25 12:42:09
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-25 13:02:00
-->
<template>
    <div>
        这是歌曲评论
    </div>
</template>

<script setup lang="ts">
import { getMusicComment } from "~/api/SongDetail";
const route = useRoute()
const id = route.query.id
onMounted(async () => {
    let res = await getMusicComment(id)
    console.log(res);
    
})
</script>

<style scoped>

</style>