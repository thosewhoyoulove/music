<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-19 12:26:25
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-20 00:20:09
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
        <span class="relative flex justify-between">
                    <img class="h-8rem m-1 rounded-xl p-1 relative inline-block " :src="props.playlist.coverImgUrl" alt="">
                    <span class="play-icon text-12px px-2 py-0.5 rounded-xl absolute">
                        <span><van-icon name="play-circle-o" /></span>
                        <span class="mx-1">{{filter(props.playlist.playCount)}}</span>
                    </span> 
                    
                    <div class="flex-col items-center">
                        <span class="music-name text-left text-13px m-1 p-1 overflow-hidden">{{props.playlist.name}}</span>
                        <span class="flex items-center">
                            <!-- <img class="w-10 h-10 rounded-1/2" :src="props.creator.avatarUrl" alt="">
                            <span class="text-light-900 text-xs ml-2">{{props.creator.nickname}}</span> -->
                        </span>
                    </div>
        </span>
        <div class="flex absolute text-light-900 text-xs pt-1 text-left w-100% h-5 overflow-hidden">
             <span>
                {{props.playlist.description}}
             </span>
             <span>
                 <van-icon name="arrow" />
             </span>
        </div>
        <div class="relative flex mt-6 text-light-900 justify-around">
            <span><van-button color="#ccc" bg-opacity-5  round ><van-icon size="1rem" name="share-o" /></van-button></span>
            <span><van-button color="#ccc" bg-opacity-5  round ><van-icon size="1rem" name="chat-o" /></van-button></span>
            <span><van-button color="#FE3641"  round ><van-icon size="1rem" name="add-o" /></van-button></span>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    playlist:Object,
    creator:Object
})
// onMounted(() => {
//     if(!props.playlist.creator){
//         props.playlist.creator = JSON.parse(sessionStorage.getItem('playlistDetail')).creator
//     } 
    
// })
const filter = num =>{
    if(num >100000000) return (num/100000000).toFixed(0) + '亿'
    else if(num>10000) return (num/10000).toFixed(0) + '万'
}
</script>

<style scoped>
.music-name{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #ccc;
}
.play-icon {
    background: rgba(0,0,0,.3);
    color: #fff;
    top: .5rem;
    left: 1rem
}
</style>