<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 10:48:40
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-08 10:57:41
-->
<template>
    <div class="bg-hex-eee p-1 font-sans-serif mb-15">
        <div class="text-left ml-3 mt-2 font-extrabold text-sm">官方榜</div>
        <div class="flex m-2 bg-hex-fff justify-between rounded-lg p-1" v-for="(item,index) in list.slice(0,4)" :key="index" @click="toTopDetail(item,index)" >
            <img class="w-21 h-21 rounded-lg p-1" :src="item.coverImgUrl" alt="">
            <div class="flex-col text-left justify-between items-center text-xs font-600 ml-1 py-1">
                <ul class="text-style py-.5 pt-1" v-for="(item,index) in list[index].tracks" :key="index">
                    <div class="justify-between">{{index+1}}.{{item.first}} - {{item.second}}</div>
                </ul>
            </div>
            <div class="top-0 text-xs font-700 w-20 text-hex-ccc">{{item.updateFrequency}}</div>
        </div>
        <div class="text-left ml-3 mt-2 font-extrabold text-sm">精选榜</div>
        <div  class="inline-block px-1.5 mt-1 relative"  v-for="(item,index) in list.slice(4,list.length)" :key="index" @click="toTopDetail(item,index)">
            <img class="w-21 h-21 rounded-lg" :src="item.coverImgUrl" alt="">
            <div class="w-20 absolute bottom-2 z-10 text-hex-fff text-xs text-center">{{item.updateFrequency}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {getTopListDetail} from '~/api/TopList'
const list = ref([])
const router = useRouter()
onMounted(async () => {
    let res_listDetail = await getTopListDetail()
    list.value = res_listDetail.data.list
    console.log(list.value,'所有榜单内容摘要');
   
})
const toTopDetail = (item,index) =>{
    router.push({
        path:'/TopListDetail',
        query:{
            id:item.id
        }
    })
}

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