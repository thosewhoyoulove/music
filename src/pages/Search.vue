<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-27 11:27:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-30 20:42:50
-->
<script setup lang="ts">
import { getSearchMusic } from "~/api/Search"; 
import { Notify, Dialog } from 'vant';
import { log } from "console";
const VanDialog = Dialog.Component
const  keyWordList = ref([])//历史记录存放数组
let  keyWord = ref('')//搜索关键词
const defaultSearchKeyWord = ref('奇妙能力歌')
const onSearch = async() =>{
        
        //如果输入为空，则直接搜索默认值
        if(keyWord.value == ''){
            keyWord.value = defaultSearchKeyWord.value
            // 数组向前追加元素
            keyWordList.value.unshift(keyWord.value)
            // 去重,这里用到Set语法
            keyWordList.value = [...new Set(keyWordList.value)]
            localStorage.setItem('keyWordList',JSON.stringify(keyWordList.value))
            keyWord.value = ""
            let res = await getSearchMusic(keyWord.value)
            console.log(res,'搜索到的数据'); 
        }else{
            // 数组向前追加元素
            keyWordList.value.unshift(keyWord.value)
            // 去重,这里用到Set语法
            keyWordList.value = [...new Set(keyWordList.value)]
            localStorage.setItem('keyWordList',JSON.stringify(keyWordList.value))
            keyWord.value = ""
            let res = await getSearchMusic(keyWord.value)
            console.log(res,'搜索到的数据'); 
        }
        // 固定长度
        if (keyWordList.value.length > 10) {
            keyWordList.value.splice(keyWordList.value.length - 1)
        }
        
        
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
            :placeholder="defaultSearchKeyWord"
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
    <van-dialog v-model:show="isDialogShow" title="是否删除所有历史记录" show-cancel-button @cancel="onDialogCancel" @confirm="onDialogConfirm">
    </van-dialog>
</template>


<style scoped>

</style>