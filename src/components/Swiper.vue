<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 17:49:56
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-04 16:30:27
-->
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getBanner } from "~/api/banner.js";
const loading = ref(true);
const state = reactive({
  image: [] as any[],
});
onMounted(async () => {
  const res = await getBanner();
  console.log(res, "res");

  state.image = res.banners;
  loading.value = false;
});
</script>

<template>
  <div class="pt-2 w-100vw px-2">
    <van-empty image-size="7.5rem" v-if="loading" />
    <van-swipe class="rounded-xl" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.image" :key="image" class="">
        <img class="h-30 w-100vw rounded-xl" :src="image.pic" alt="这是首页轮播图" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>
:deep(.van-empty) {
  padding: 0;
}
</style>
