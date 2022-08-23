<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-23 11:00:04
-->
<template>
    <div class="w-100% h-604px">
        <img class="absolute -z-1 blur-3xl h-100% w-100%" :src="props?.musicList?.al?.picUrl" alt="">
        <div class="flex justify-between mt-5 px-2">
            <div  @click="back" class="text-xl text-hex-ccc"><van-icon name="arrow-left" /></div>
            <div class="col mr-15 py-2">
                <Vue3Marquee class="text-sm my-2 text-hex-ccc">
                    {{props?.musicList?.name}}
                </Vue3Marquee>
                <div class="flex items-center">
                    <div class="text-xs text-hex-ccc">{{props?.musicList?.ar[0]?.name}}</div>
                    <div class="text-xs text-hex-aaa"><van-icon name="arrow" /></div>
                </div>
            </div>
            <div class="text-xl text-hex-ccc"><van-icon name="share-o" /></div>
        </div>
        <img class="al-img rounded-1/2 w-50 h-50" :src="props?.musicList?.al?.picUrl" alt="">
        <div class="flex justify-around mt-320px text-xl items-center">
            <span><van-icon name="like-o" /></span>
            <span style="transform: rotate(180deg)"><van-icon name="upgrade" /></span>
            <span><van-icon name="close" /></span>
            <span><van-icon name="comment-o" /></span>
            <span style="transform: rotate(90deg)"><van-icon name="ellipsis" /></span>
        </div>
        <div class="flex justify-around mt-100px text-xl items-center">
            <span><van-icon name="replay" /></span>
            <span><van-icon name="arrow-left" /></span>
            <span v-if="isShow" @click="playMusic"  class="text-3xl"><van-icon name="play-circle-o" /></span>
            <span v-else @click="pauseMusic" class="text-3xl"><van-icon name="pause-circle-o" /></span>
            <span><van-icon name="arrow" /></span>
            <span><van-icon name="bars" /></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index"
const store = useStore()
const props = defineProps<{
    musicList:Object,
    playMusic:Function,
    pauseMusic:Function
}>()
let {isShow, isDetailShow} = storeToRefs(store)
onMounted(() => {
    console.log(props.musicList)
})
const back = () =>{
    isDetailShow.value = false
    console.log(111111111111111);
    
}
</script>

<style scoped>
.al-img{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>