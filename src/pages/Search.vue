<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-27 11:27:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-28 10:14:05
-->
<template>
    <div>
        <div>
            <van-search
            v-model="value"
            show-action
            placeholder="奇妙能力歌 - 陈粒"
            @search="onSearch"
            >
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
        </van-search>
        </div>
        <div class="text-left ml-2.5 flex">
            <div>历史记录:</div>
            <div v-for="(item,index) in keyWordList" :key="index"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSearchMusic } from "~/api/Search"; 
const keyWordList = reactive([])
</script>

<style scoped>

</style>