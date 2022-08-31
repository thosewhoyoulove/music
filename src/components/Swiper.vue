<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:49:56
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-31 10:39:24
-->
<template>
  <div class="pt-2">
    <van-swipe class="w-100%" :autoplay="3000" lazy-render>
      <van-swipe-item
        class="w-100% h-40"
        v-for="image in state.image"
        :key="image"
      >
        <img class="h-30 w-100% h-100% rounded-xl" :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { getBanner } from "~/api/banner.js";

const state = reactive({
  image: [],
});
onMounted(async () => {
  let res = await getBanner();
  state.image = res.data.banners;
});
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #da1717;
}
</style>