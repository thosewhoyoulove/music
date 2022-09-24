<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 17:49:56
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-24 17:09:09
-->
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getBanner } from '~/api/banner.js'
const loading = ref(true)
const state = reactive({
  image: [],
})
onMounted(async () => {
  const res = await getBanner()
  state.image = res.banners
  loading.value = false
})
</script>

<template>
  <div class="pt-2 w-100vw">
    <van-skeleton :row="4" round :loading="loading" />
    <van-swipe class="w-100vw rounded-xl" :autoplay="3000" lazy-render>
      <van-swipe-item
        v-for="image in state.image"
        :key="image"
        class="w-100vw h-40"
      >
        <img
          class="h-30 w-95vw h-100% rounded-xl"
          :src="image.pic"
          alt="这是首页轮播图"
        >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>
</style>
