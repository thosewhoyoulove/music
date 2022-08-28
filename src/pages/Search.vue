<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-27 11:27:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-28 11:00:04
-->
<script setup lang="ts">
import { getSearchMusic } from "~/api/Search"; 
const  keyWordList = ref([])
let  keyWord = ref('')
const onSearch = () =>{
        keyWordList.value.push(keyWord.value)
        localStorage.setItem('keyWordList',JSON.stringify(keyWordList.value))
        keyWord.value = ""
        console.log(keyWordList.value,'数据数组');
        
}
onMounted(() =>{
    keyWordList.value = JSON.parse(localStorage.getItem('keyWordList')) || []
})
</script>

<template>
    <div class="w-100% h-100% bg-hex-eee p-1">
        <div>
            <van-search
            v-model="keyWord"
            show-action
            placeholder="奇妙能力歌 - 陈粒"
            @search="onSearch"
            class="rounded"
            >
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
        </div>
        <div class="text-left ml-2.5">
            <span class="text-sm font-700">历史记录:</span>
            <span class="text-xs inline-block mt-1 mx-1 py-.2rem px-.6rem bg-white rounded-full border " v-for="(item,index) in keyWordList" :key="index">{{item}}</span>
        </div>
    </div>
</template>


<style scoped>

</style>