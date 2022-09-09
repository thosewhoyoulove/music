<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:49:56
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 21:16:52
-->
<template>
  <div class="pt-2 w-100%">
    <van-swipe class="w-85vw rounded-xl" :autoplay="3000" lazy-render>
      <van-swipe-item
        class="w-100vw h-40"
        v-for="image in state.image"
        :key="image"
      >
        <img class="h-30 w-380px h-100% rounded-xl" :src="image.pic" alt="这是首页轮播图" />
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