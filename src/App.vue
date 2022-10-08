<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-08 16:40:05
-->
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { isFooterShow, isPlayListShow } = storeToRefs(store);
const router = useRouter();
const route = useRoute();
const isShow = ref(false); // 控制回到顶部的箭头的展示
// 点击按钮回到顶部
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const handleScroll = () => {
  if (document.documentElement.scrollTop > 100) isShow.value = true;
  else isShow.value = false;

  // 往下滑超过20则显示 否则则不显示按钮
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <main text="center gray-700 dark:gray-200 font-mono">
    <router-view />
  </main>
  <!-- 全局增加一个回到顶端的按钮 -->
  <div v-show="isShow" class="fixed right-4px bottom-70px pt-2 mr-1.5 z-1000">
    <van-sticky>
      <svg
        t="1663468028574"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5093"
        width="22"
        height="30"
        @click="toTop"
      >
        <path
          d="M864 736c0-111.6-65.4-208-160-252.9V317.3c0-15.1-5.3-29.7-15.1-41.2L536.5 95.4C530.1 87.8 521 84 512 84s-18.1 3.8-24.5 11.4L335.1 276.1c-9.7 11.5-15.1 26.1-15.1 41.2v165.8C225.4 528 160 624.4 160 736h156.5c-2.3 7.2-3.5 15-3.5 23.8 0 22.1 7.6 43.7 21.4 60.8 11.3 14 26.2 24.6 43.1 30.6 23.1 54 75.6 88.8 134.5 88.8 29.1 0 57.3-8.6 81.4-24.8 23.6-15.8 41.9-37.9 53-64 16.9-6 31.8-16.5 43.1-30.5 13.8-17.2 21.4-38.8 21.4-60.8 0-8.4-1.1-16.4-3.1-23.8H864zM762.3 621.4c9.4 14.6 17 30.3 22.5 46.6H700V558.7c24.8 16.2 46.1 37.5 62.3 62.7zM388 483.1V318.8l124-147 124 147V668H388V483.1zM239.2 668c5.5-16.3 13.1-32 22.5-46.6 16.3-25.2 37.5-46.5 62.3-62.7V668h-84.8z m388.9 116.2c-5.2 3-11.2 4.2-17.1 3.4l-19.5-2.4-2.8 19.4c-5.4 37.9-38.4 66.5-76.7 66.5-38.3 0-71.3-28.6-76.7-66.5l-2.8-19.5-19.5 2.5c-1 0.1-2.1 0.2-3.3 0.2-4.9 0-9.6-1.3-13.8-3.7-8.7-5-14.1-14.3-14.1-24.4 0-10.6 5.9-19.4 14.6-23.8h231.3c8.8 4.5 14.6 13.3 14.6 23.8-0.1 10.2-5.5 19.6-14.2 24.5z"
          p-id="5094"
        ></path>
        <path d="M464 400a48 48 0 1 0 96 0 48 48 0 1 0-96 0z" p-id="5095"></path>
      </svg>
    </van-sticky>
  </div>
  <PlayList v-show="isPlayListShow">111</PlayList>
  <Footer v-if="isFooterShow" />
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  color: #d81e06;
  width: 1rem;
  height: 1.2rem;
  background: transparent;
}
</style>
