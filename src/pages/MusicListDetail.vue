<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 21:41:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-22 14:56:56
-->
<script setup lang="ts">
import { getSongListDetail, getAllSong } from "~/api/SongListDetail"
import { useStore } from "~/store/index"
const router = useRouter()
const route = useRoute()
const state = reactive({
  playlist:{},//歌单信息
  songlist:[]//歌曲信息
})
let id = route.query.id
onMounted(async () =>{
  console.log(id)

  let res = await getSongListDetail(id)
  state.playlist = res.data.playlist//歌单信息
  console.log(state.playlist,'歌单信息')
  let songlist = await getAllSong(id)
  
  state.songlist = songlist.data.songs
  console.log(state.songlist)
  
  
})
const filter = num =>{
    if(num >100000000) return (num/100000000).toFixed(0) + '亿'
    else if(num>10000) return (num/10000).toFixed(0) + '万'
}
const store = useStore()
//修改歌曲信息并进行播放
const updateSongList = index =>{
    store.updatePlayList(store.$state,state.songlist)//将歌单列表传进默认列表
    store.updatePlayListIndex(store.$state,index)//将索引值传给默认索引
    store.updateIsShow(store.$state,false)//修改为播放图标
    
}
</script>
<template>
    <div class="bg-white w-100% h-50vh relative">
        <img class="w-100% h-100% rounded-xl absolute blur-xl" :src="state.playlist.coverImgUrl" alt="">
        <div class="flex justify-between pt-5 items-center px-2 text-white">
            <span class="z-1">歌单</span>
            <div class="w-25% h-100% flex justify-between">
                <span class=" text-7"><van-icon name="search" /></span>
                <span class=" text-7"><van-icon name="ellipsis" /></span>
            </div>
        </div>
        <span class="relative flex justify-between">
                    <img class="h-8rem m-1 rounded-xl p-1 relative inline-block " :src="state.playlist.coverImgUrl" alt="">
                    <span class="play-icon text-12px px-2 py-0.5 rounded-xl absolute">
                        <span><van-icon name="play-circle-o" /></span>
                        <span class="mx-1">{{filter(state.playlist.playCount)}}</span>
                    </span> 
                    
                    <div class="flex-col items-center">
                        <span class="music-detail text-left text-13px m-1 p-1">{{state.playlist.name}}</span>
                        <span class="flex items-center">
                            <img class="w-10 h-10 rounded-1/2" :src="state?.playlist?.creator?.avatarUrl" alt="">
                            <span class="text-light-900 text-xs ml-2">{{state?.playlist?.creator?.nickname}}</span>
                        </span>
                    </div>
        </span>
        <div class="flex absolute text-white text-xs pt-1 text-left w-100% h-5 overflow-hidden">
             <span>
                {{state.playlist.description}}
             </span>
             <span>
                 <van-icon name="arrow" />
             </span>
        </div>
        <div class="relative flex mt-6 text-light-900 justify-around">
            <span class="flex items-center justify-between"><van-button color="#C8C6C6"  round ><van-icon size="1rem" name="share-o" /><span class="px-1">{{state?.playlist?.shareCount}}</span></van-button></span>
            <span><van-button color="#C8C6C6"  round ><van-icon size="1rem" name="chat-o" /><span class="px-1">{{state?.playlist?.commentCount}}</span></van-button></span>
            <span><van-button color="#FE3641"  round ><van-icon size="1rem" name="add-o" /><span class="px-1">{{state?.playlist?.subscribedCount}}</span></van-button></span>
        </div>
    </div>
    <div class="w-100% h-50vh">
        <van-list>
        <ul
          class="
            flex
            h-3rem
            leading-12
            text-md
            "
        >
          <span><van-icon name="play-circle-o" /></span>
          <span class="flex">全部播放</span>
          
        </ul>
        <ul
          v-for="(item,index) in state.songlist"
          :key="index"
          class="flex justify-between h-3rem leading-8 my-1 text-sm"
        >
        <span class="flex">
          <img class="w-3rem h-3rem rounded" :src="item.al.picUrl" alt="">
          <span class="flex-col ml-2 music-detail" @click="updateSongList(index)">
            <span class="flex ">
              <span class="flex text-md font-extrabold">{{ item.name }}</span>
              <!-- <span class="px-1" v-if="item.alia.length">({{item.alia[0]}})</span> -->
            </span>
            
            <span class="flex">
              <span class="text-xs text-gray-500">{{item.ar[0].name}}</span>
              <span class="text-xs text-gray-500 px-1">-</span>
              <span class="text-xs text-gray-500">{{item.al.name}}</span>
            </span>
          </span>
        </span>
          <span>
            <span v-if="item.mv" class="absolute right-2rem"><van-icon size="1.3rem" name="play-circle-o" /></span>
            <span class="rotate-90 absolute right-1rem"><van-icon name="ellipsis" /></span>
          </span>
          
        </ul>
      </van-list>
    </div>
    
</template>



<style scoped>
.music-detail{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.play-icon {
    background: rgba(0,0,0,.3);
    color: #fff;
    top: .5rem;
    left: 1rem
}
</style>
<route lang="yaml">
meta:
  layout: default
  title: 歌单详情
</route>