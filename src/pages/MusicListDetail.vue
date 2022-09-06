<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:13:33
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 21:33:13
-->
<template>
    <div>
        <van-tabs v-model:active="active">
        <van-tab v-for="(item,index) in songList" :title="item.name" :key="index"  @click="change(item,index)">
         {{item.playlistTag.name}}
         <div>{{index}}</div>
        </van-tab>
    </van-tabs>
    </div>
</template>

<script setup lang="ts">
import {getSongList,getPlayListTags} from '~/api/SongList'
const songList = ref([])
onMounted(async() => {
    let res = await getSongList()
    songList.value = res.data.tags
    console.log(songList.value,'歌单广场');
    
})
const change = (item,index) =>{
    console.log(item.id,'我被点击了');
}
</script>

<style scoped>

</style>