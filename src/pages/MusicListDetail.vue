<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 21:41:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-20 17:41:01
-->
<script setup lang="ts">
import { getSongListDetail, getAllSong } from "~/api/SongListDetail"
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
  console.log(state.playlist,'创建者的头像');
  console.log(state.playlist.creator.nickname,'创建者的nickname');
  let songlist = await getAllSong(id)
  console.log(songlist)
  state.songlist = songlist.data.songs
  console.log(state.songlist[0].name);
  
  
 
  
})
const filter = num =>{
    if(num >100000000) return (num/100000000).toFixed(0) + '亿'
    else if(num>10000) return (num/10000).toFixed(0) + '万'
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
                        <span class="music-name text-left text-13px m-1 p-1 overflow-hidden">{{state.playlist.name}}</span>
                        <span class="flex items-center">
                            <img class="w-10 h-10 rounded-1/2" :src="state?.playlist?.creator?.avatarUrl" alt="">
                            <span class="text-light-900 text-xs ml-2">{{state?.playlist?.creator?.nickname}}</span>
                        </span>
                    </div>
        </span>
        <div class="flex absolute text-light-900 text-xs pt-1 text-left w-100% h-5 overflow-hidden">
             <span>
                {{state.playlist.description}}
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
    <div class="w-100% h-50vw">
        <van-list>
        <ul
          class="
            flex
            justify-around
            h-3em
            leading-12
            border-b border-b-hex-E4E4E4
            text-sm
            list_top
            "
        >
          <span class="flex-1">学号/工号</span>
          <span class="flex-1">姓名</span>
          <span class="flex-1">角色</span>
        </ul>
        <ul
          v-for="item in member_list"
          :key="item"
          class="flex justify-around h-3em leading-12 border-b border-b-hex-E4E4E4 text-sm"
        >
          <span class="flex-1">{{ item.userId }}</span>
          <span class="flex-1">{{ item.name }}</span>
          <span class="flex-1">
            <van-tag v-if="item.memberRank===2" color="#38bdf8">负责人</van-tag>
            <van-tag v-if="item.memberRank===1" color="#10b981">管理员</van-tag>
            <van-tag v-if="item.memberRank===0" plain color="#78716c">成员</van-tag>
          </span>
        </ul>
      </van-list>
    </div>
    
</template>



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
<route lang="yaml">
meta:
  layout: default
  title: 歌单详情
</route>