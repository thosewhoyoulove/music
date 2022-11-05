<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 15:26:41
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-11-04 18:36:31
-->
<script setup lang="ts">
import { Notify } from "vant";
import { storeToRefs } from "pinia";
import { getCodeByKey, getCodeKey, testCodeByKey } from "~/api/login";
import { getUserAccount } from "~/api/user";
import { useStore, userStore } from "~/store/index";
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
const loading = ref(true);
onBeforeMount(() => {
  isFooterShow.value = false;
});
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
const key = ref("");
const qrimg = ref("");
const qrurl = ref("");
let timer: any = null;
onMounted(async () => {
  const res = await getCodeKey();
  console.log(res, "获得key");
  key.value = res.data.unikey;
  const res1 = await getCodeByKey(key.value);
  console.log(res1, "生成二维码图片");
  qrimg.value = res1.data.qrimg;
  qrurl.value = res1.data.qrurl;
  timer = setInterval(async () => {
    console.log(key.value, "UNikey");

    const statusRes = await testCodeByKey(key.value);
    if (statusRes.code !== 800) {
      console.log(statusRes, "失败了");

      Notify({ type: "warning", message: statusRes.message });
      // clearInterval(timer);
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      Notify({ type: "success", message: "授权登录成功，即将跳转首页" });
      console.log(statusRes.cookie, "成功了");
      localStorage.setItem("cookie", statusRes.cookie);
      const AccountRes = await getUserAccount();
      console.log(AccountRes, "用户账户信息");
      userInfo.updateIsLogin(true);
      userInfo.updateUserInfo(AccountRes);
      //在登录成功后设置定时器定期使cookie过期
      setTimeout(() => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cookie");
        userInfo.updateIsLogin(false);
        userInfo.removeUserInfo();
        store.updateIsShow(store.$state, true); // 修改为暂停图标
        Notify({ type: "warning", message: "登录已过期，请重新登陆" });
        router.push({
          path: "/LoginOrReg",
        });
      }, 2 * 24 * 60 * 60 * 1000);
      router.push({
        path: "/",
      });
    }
  }, 10000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <van-loading v-if="loading" class="h-100vh w-100vw bg-hex-f5f5f5" color="#1989fa"
    >正在加载</van-loading
  >
  <div v-else class="h-100vh w-100vw bg-hex-f5f5f5 relative">
    <div
      class="w-100% flex justify-center items-center justify-around mt-8 absolute -translate-1/2 top-50% left-50%"
    >
      <img
        class="h-13.76rem w-7.8125rem inline-block"
        src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png"
        alt=""
      />
      <div class="flex-col">
        <div class="text-center mb-5">扫码登录</div>
        <img class="w-35 h-35 rounded-xl inline-block" :src="qrimg" alt="" />
        <div class="text-xs mt-2">
          使用<a
            class="text-hex-0c73c2 px-2"
            href="https://music.163.com/#/download"
            target="_blank"
            >网易云音乐APP</a
          >扫码登录
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
<route lang="yaml">
meta:
  layout: default
  title: 二维码登录
</route>
