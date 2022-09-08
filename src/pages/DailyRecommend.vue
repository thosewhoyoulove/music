<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:07:49
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-08 21:21:55
-->
<template>
    <div class="w-100% h-30vh relative">
        <img class="w-100% h-100% rounded-xl absolute blur-xl" src="../public/Reco-bg.jpg" alt="背景图">
        <div class="flex w-50 items-center text-blue-500 pt-34">
            <div class="text-3xl font-500">{{Month}}月</div> / <div>{{Day}}日</div>
        </div>
    </div>
    <div class="w-100% mt-10">这个需要登录</div>
</template>

<script setup lang="ts">
import { getDailyRecommendSongs } from '~/api/RecommendSongList'
//获取时间
const day = new Date()
let Day = ref(day.getUTCDate())
const month = new Date()
let Month = ref(month.getMonth() + 1)
// onMounted(async() => {
//     let res = await getDailyRecommendSongs()
//     console.log(res);
    
// })
</script>

<style scoped>

</style>