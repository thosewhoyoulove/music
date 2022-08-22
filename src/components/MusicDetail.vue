<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-22 22:10:45
-->
<template>
    <div>
        <img class="absolute -z-1 blur-3xl h-100% w-100%" :src="props?.musicList?.al?.picUrl" alt="">
        <div class="flex justify-between mt-5 px-2">
            <div class="text-hex-aaa"><van-icon name="arrow-left" /></div>
            <div class="col mr-15 py-2">
                <Vue3Marquee class="text-sm my-2 text-hex-ccc">
                    {{props?.musicList?.name}}
                </Vue3Marquee>
                <div class="flex items-center">
                    <div class="text-xs text-hex-ccc">{{props?.musicList?.ar[0]?.name}}</div>
                    <div class="text-xs text-hex-aaa"><van-icon name="arrow" /></div>
                </div>
                
            </div>
            
            <div class="text-hex-aaa"><van-icon name="share-o" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
const props = defineProps<{
    musicList:Object
}>()
onMounted(() => {
    console.log(props.musicList)
})
</script>

<style scoped>

</style>