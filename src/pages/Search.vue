<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-27 11:27:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-30 11:24:44
-->
<script setup lang="ts">
import { getSearchMusic } from "~/api/Search"; 
import { Notify } from 'vant';
const  keyWordList = ref([])//历史记录存放数组
let  keyWord = ref('')//搜索关键词
const onSearch = () =>{
        keyWordList.value.push(keyWord.value)
        localStorage.setItem('keyWordList',JSON.stringify(keyWordList.value))
        keyWord.value = ""
        console.log(keyWordList.value,'数据数组');     
}
onMounted(() =>{
    keyWordList.value = JSON.parse(localStorage.getItem('keyWordList')) || []
})

//点击删除按钮展示弹出框
const isDialogShow = ref(false)
const showDelete = () =>{
    isDialogShow.value = true
}
const onDialogCancel = () =>{
    isDialogShow.value = false
}
const onDialogConfirm = () =>{
    localStorage.removeItem('keyWordList')
    keyWordList.value = []
    isDialogShow.value = false
    Notify({ type: 'success', message: '删除成功' });
}
</script>

<template>
    <div class="w-100% h-100% bg-hex-eee p-1">
        <div>
            <van-search
            v-model="keyWord"
            show-action
            placeholder="奇妙能力歌 - 陈粒"
            class="rounded"
            >
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
        </div>
        <div v-if="keyWordList.length" class="text-left ml-2.5 relative">
            <span class="text-sm font-700">历史记录:</span>
            <span class="text-xs inline-block mt-1 mx-1 py-.2rem px-.6rem bg-white rounded-full border " v-for="(item,index) in keyWordList" :key="index">{{item}}</span>
            <span class="absolute top-.15rem right-.4" @click="showDelete"><van-icon name="delete-o" /></span>
        </div>
    </div>
    <van-dialog v-model:show="isDialogShow" title="是否删除历史记录" show-cancel-button @cancel="onDialogCancel" @confirm="onDialogConfirm">
        是否删除所有历史记录
    </van-dialog>
</template>


<style scoped>

</style>