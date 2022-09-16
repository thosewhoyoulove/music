<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:00:33
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '~/store/index'
const store = useStore()
const { isFooterShow } = storeToRefs(store)
const router = useRouter()
const route = useRoute()
const isShow = ref(false) // 控制回到顶部的箭头的展示
// 点击按钮回到顶部
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const handleScroll = () => {
  if (document.documentElement.scrollTop > 100)
    isShow.value = true
  else
    isShow.value = false

  // 往下滑超过20则显示 否则则不显示按钮
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main font-sans-serif p=".5rem" text="center gray-700 dark:gray-200">
    <router-view />
  </main>
  <!-- 全局增加一个回到顶端的按钮 -->
  <div v-show="isShow" class="fixed -right-1px bottom-70px pt-2 mr-1.5 z-1000">
    <van-sticky>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--ic color-hex-0C75A1 b-hex-0C75A1"
        width="22"
        height="30"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        @click="toTop"
      >
        <path
          fill="currentColor"
          d="M11.41 2.87a.99.99 0 0 1 1.18 0c1.22.88 3.91 3.59 3.91 10.13c0 2.16-.78 4.76-1.36 6.35c-.14.39-.51.65-.93.65H9.8c-.42 0-.8-.26-.94-.65C8.28 17.76 7.5 15.16 7.5 13c0-6.54 2.69-9.25 3.91-10.13zM14 11c0-1.1-.9-2-2-2s-2 .9-2 2s.9 2 2 2s2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87l-1.13.75c-.56.38-.89 1-.89 1.67v4.45c0 .71.71 1.19 1.37.93l2.32-.93zm12.31 0v-4.45c0-.67-.33-1.29-.89-1.66l-1.13-.75c-.15 2.69-1.2 5.64-1.67 6.87l2.32.93c.66.25 1.37-.23 1.37-.94z"
        />
      </svg>
    </van-sticky>
  </div>
  <Footer v-if="isFooterShow" />
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: 2rem;
  height: 2rem;
}
</style>
