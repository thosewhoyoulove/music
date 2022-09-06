<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 10:48:40
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 14:30:47
-->
<template>
    <div class="bg-hex-eee p-1 font-sans-serif">
        <div class="text-left ml-3 mt-2 font-extrabold text-sm">官方榜</div>
        <div class="flex m-2 bg-hex-fff justify-between rounded-lg p-1" v-for="(item,index) in list.slice(0,4)" :key="index">
            <img class="w-20 h-20 rounded" :src="item.coverImgUrl" alt="">
            <div class="text-left justify-between text-xs font-600 ml-1 py-1">
                <ul class="text-style" v-for="(item,index) in list[index].tracks" :key="index">
                    <div class="justify-between">{{index+1}}.{{item.first}} - {{item.second}}</div>
                </ul>
            </div>
            <div class="top-0 text-xs font-100 w-20">{{item.updateFrequency}}</div>
        </div>
        <div class="text-left ml-3 mt-2 font-extrabold text-sm">精选榜</div>
        <div class="inline-block px-1.5 mt-1"  v-for="(item,index) in list.slice(4,list.length)" :key="index">
            <img class="w-20 h-20 rounded-lg relative" :src="item.coverImgUrl" alt="">
            <div class="absolute top-5 z-10">{{item.updateFrequency}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {getTopListDetail} from '~/api/TopList'
const list = ref([])

onMounted(async () => {
    let res_listDetail = await getTopListDetail()
    list.value = res_listDetail.data.list
    console.log(list.value,'所有榜单内容摘要');
   
})
</script>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>