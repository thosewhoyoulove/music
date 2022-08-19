<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-19 12:26:25
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-19 13:56:24
-->
<template>
    <div class="bg-white w-100% h-70 relative">
        <img class="w-100% h-100% rounded-xl absolute blur-xl" :src="props.playlist.coverImgUrl" alt="">
        <div class="flex justify-between pt-5 items-center px-2 text-white">
            <span class="z-1">歌单</span>
            <div class="w-25% h-100% flex justify-between">
                <span class=" text-7"><van-icon name="search" /></span>
                <span class=" text-7"><van-icon name="ellipsis" /></span>
            </div>
        </div>
        <div>
            <img class="w-40 h-40 z-1 absolute rounded-2xl" :src="props.playlist.coverImgUrl" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    playlist:Object
})
onMounted(() => {
    console.log(props.playlist,11111)
})
</script>

<style scoped>

</style>