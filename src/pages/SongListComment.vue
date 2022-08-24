<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-24 19:17:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-24 20:13:14
-->

<script setup lang="ts">
import { getSongListComment, getSongListDetail } from "~/api/SongListDetail";
const route = useRoute()
const state = reactive({
  playlist:{},//歌单信息
  comment:{}
})
let id = route.query.id
onMounted( async() => {
    let data = await getSongListDetail(id)//歌单信息
    state.playlist = data.data.playlist
    let res = await getSongListComment(id)//歌单评论
    state.comment = res.data
    console.log(res.data.total)
})
</script>


<template>
    <div class="w-100% h-100% bg-white">
        <div class="font-700 text-left ml-5">评论({{state.comment.total}})</div>
        <div class="flex break-all m-1 p-1">
            <img class="h-4.5rem rounded-xl " :src="state.playlist.coverImgUrl" alt="">
            <div class="text-left ml-2">
                <div class="text-style text-sm font-600">{{state.playlist.name}}</div>
                <div class="text-xs mt-1">by:{{state.playlist?.creator?.nickname}}</div>
            </div>
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