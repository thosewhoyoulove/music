<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 20:03:07
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-18 22:03:03
-->
<template>
    <div class="w-100% h-5rem p-.2rem">
        <div class="flex justify-between mt-2 w-100% h-1.8rem mb-.2rem">
            <div class="font-900">发现好歌单</div>
            <div class="more rounded-lg border text-xs text-center px-2">查看更多</div>
        </div>
        <div class="w-100% h-14.5rem">
        <van-swipe class="h-100%" :loop="false" :width="150" :show-indicators="false">
            <van-swipe-item v-for="item in state.musicList" :key="item" @click="toMusicDetail(item.id)">
                <img class="w-100% h-8rem m-1 rounded-xl p-1" :src="item.picUrl" alt="">
                <span class=" text-light-900"><svg t="1660829092090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6872" width="15" height="15"><path d="M224 938.713333a53.58 53.58 0 0 1-53.333333-53.433333V138.72a53.333333 53.333333 0 0 1 80.886666-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046667-810.666666a10.98 10.98 0 0 0-5.333334 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446666-1.586667z" fill="#5C5C66" p-id="6873"></path></svg>{{filter(item.playCount)}}</span>
                <span class="">{{item.name}}</span>
            </van-swipe-item>  
        </van-swipe>
        </div>
    </div>
    <router-view />
</template>

<script setup lang="ts">
import getRecommendSongList from '~/api/RecommendSongList'
const router = useRouter()
let state = reactive({
    musicList:[]
})
onMounted(async () => {
     let res = await getRecommendSongList()
     console.log(res);
     state.musicList = res.data.result
     
 })
const filter = num =>{
    if(num >100000000) return (num/100000000).toFixed(1) + '亿'
    else if(num>10000) return (num/10000).toFixed(1) + '万'
}
const toMusicDetail = id =>{
    router.push({
        path:'/MusicListDetail',
        query:{
            id:id
        }
    })
}
</script>

<style scoped>
.more {
    line-height: 1.8rem;
}
</style>