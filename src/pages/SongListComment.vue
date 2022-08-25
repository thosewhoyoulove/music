<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-24 19:17:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-25 12:23:48
-->

<script setup lang="ts">
import { getSongListComment, getSongListDetail } from "~/api/SongListDetail";
const route = useRoute()
const state = reactive({
  playlist:{},//歌单信息
  comment:[]
})
const total = ref(0)
let id = route.query.id
onMounted( async() => {
    let data = await getSongListDetail(id)//歌单信息
    state.playlist = data.data.playlist
    let res = await getSongListComment(id)//歌单评论
    total.value = res.data.total
    state.comment = res.data.comments
    console.log(state.comment,total)
})
</script>


<template>
    <div class="w-100% h-100% bg-white">
        <div class="font-700 text-left ml-5">评论({{total}})</div>
        <div class="flex break-all m-1 p-1">
            <img class="h-4.5rem rounded-xl ml-2" :src="state.playlist.coverImgUrl" alt="">
            <div class="text-left ml-2">
                <div class="text-style text-sm font-600">{{state.playlist.name}}</div>
                <div class="text-xs mt-1">by:{{state.playlist?.creator?.nickname}}</div>
            </div>
        </div>
        <div>
            <van-list class="h-1652px">
                <div class="text-left ml-5">评论区</div>
                <ul v-for="(item,index) in state.comment" :key="index" class="mt-3 border-b border-gray-500">
                    <div class="flex justify-between">
                        <div class="flex">
                            <img class="w-3rem h-3rem rounded-full" :src="item.user?.avatarUrl" alt="">
                            <div class="col ml-1 text-left">
                                <div class="text-sm font-600">{{item?.user?.nickname}}</div>
                                <div class="text-xs">{{item.timeStr}}</div>
                                <div class="font-serif">{{item.content}}</div>
                            </div>
                        </div>
                        
                        <div class="flex">
                            <div class="text-sm mt-.5 mr-.5 color-#ccc">{{item.likedCount}}</div>
                            <div class=""><van-icon name="thumb-circle-o" /></div>
                        </div>
                       
                    </div>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<style scoped>
.text-style{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>