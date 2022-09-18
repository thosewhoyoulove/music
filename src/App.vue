<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-18 14:40:07
-->
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { isFooterShow } = storeToRefs(store);
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
  <main font-sans-serif text="center gray-700 dark:gray-200">
    <router-view />
  </main>
  <!-- 全局增加一个回到顶端的按钮 -->
  <div v-show="isShow" class="fixed -right-1px bottom-70px pt-2 mr-1.5 z-1000">
    <van-sticky>
      <img class="icon bg-transparent" style="background: transparent" @click="toTop" src="public/rocket.jpg" alt="" />
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
  color:#d81e06;
  width: 1.0rem;
  height: 1.2rem;
  background: transparent;
}
</style>
