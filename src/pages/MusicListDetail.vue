<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:13:33
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 19:21:56
-->
<template>
    <div>
        歌单广场
    </div>
</template>

<script setup lang="ts">
import {getSongList} from '~/api/SongList'
onMounted(async() => {
    let res = await getSongList()
    console.log(res);
    
})
</script>

<style scoped>

</style>