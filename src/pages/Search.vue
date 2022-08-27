<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-27 11:27:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-27 12:40:01
-->
<template>
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
</template>

<script setup lang="ts">
import { getSearchMusic } from "~/api/Search"; 
</script>

<style scoped>

</style>