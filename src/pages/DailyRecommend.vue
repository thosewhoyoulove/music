<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:07:49
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-11 10:04:09
-->
<template>
    <div class="w-100% h-30vh relative bg-hex-DB2C1F">
        <img class="w-10 h-10 rounded-xl absolute left-50% top-40% -translate-x-1/2" src="/logo.png" alt="背景图">
        <div class="flex w-50 items-center text-white pt-34">
            <div class="text-3xl font-500 ml-3">{{Month}}</div> / <div>{{Day}}</div>
        </div>
    </div>
    <div class="w-100%">
        <van-tabs v-model:active="active" @click-tab="tabChange">
        <van-tab v-for="(item, index) in choice" :key="index" :title="item">

        </van-tab>
    </van-tabs>
    </div>
    
</template>

<script setup lang="ts">
import { getDailyRecommendSongs, getDailyRecommendSongList } from '~/api/RecommendSongList'
import { useStore } from "~/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
const { isFooterShow } = storeToRefs(store);

//获取时间
const day = new Date()
let Day = ref(day.getUTCDate())
const month = new Date()
let Month = ref(month.getMonth() + 1)
const choice = ref(['推荐歌曲','推荐歌单'])
const active = ref(0)
// onMounted(async() => {
//   isFooterShow.value = false;
//   let res = await getDailyRecommendSongs()
//   console.log(res);
// });
</script>

<style scoped>

</style>