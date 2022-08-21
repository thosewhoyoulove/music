<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-21 20:43:23
-->
<template>
 <div class="w-100% h-20vw bottom-0 fixed items-center  justify-between mx-2 bg-white border-t border-hex-ccc flex">
   <span class="flex items-center">
     <img class="w-3rem h-3rem rounded" :src="playList[playListIndex].al.picUrl" alt="">
     <span class="px-2">{{playList[playListIndex].al.name}}</span>
   </span>
   <span class="flex pr-1.5rem">
     <span class="text-lg px-2"><van-icon name="play-circle-o" /></span>
     <span class="text-xl"><van-icon name="bars" /></span>
   </span>
 </div>
</template>
<script setup lang="ts">
import { mapState, storeToRefs } from "pinia";
import { useStore } from "~/store/index"
// computed:{
//   ...mapState(['playList','playListIndex'])
// }
    const store = useStore()
    const {playList,playListIndex} = storeToRefs(store)
    
    onMounted(() => {
        console.log(playList);
        console.log(playListIndex);
    })
    
</script>

