<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 15:26:41
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-17 19:41:25
-->
<script setup lang="ts">
import { Notify } from "vant";
import { storeToRefs } from "pinia";
import { getCodeByKey, getCodeKey, testCodeByKey } from "~/api/login";
import { getUserAcount } from "~/api/user";
import { useStore, userStore } from "~/store/index";
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
const loading = ref(true);
onMounted(() => {
  isFooterShow.value = false;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
const key = ref("");
const qrimg = ref("");
const qrurl = ref("");
const result = ref("");
onMounted(async () => {
  const res = await getCodeKey();
  console.log(res, "获得key");
  key.value = res.data.unikey;
  const res1 = await getCodeByKey(key.value);
  console.log(res1, "生成二维码图片");
  qrimg.value = res1.data.qrimg;
  qrurl.value = res1.data.qrurl;
  const timer = setInterval(async () => {
    console.log(key.value, "UNikey");

    const statusRes = await testCodeByKey(key.value);
    if (statusRes.code !== 800) {
      console.log(statusRes, "失败了");

      Notify({ type: "warning", message: statusRes.message });
      clearInterval(timer);
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      Notify({ type: "success", message: "授权登录成功，即将跳转首页" });
      console.log(statusRes.cookie, "成功了");
      localStorage.setItem("cookie", statusRes.cookie);
      const AcountRes = await getUserAcount();
      console.log(AcountRes, "用户账户信息");
      userInfo.updateIsLogin(true);
      userInfo.updateUserInfo(AcountRes);
      router.push({
        path: "/",
      });
    }
  }, 5000);
});
</script>

<template>
  <div class="h-100vh relative w-100%">
    <div class="w-100% text-center">请使用网易云音乐APP扫码登录</div>
    <van-loading v-if="loading" class="mt-10" color="#1989fa" />
    <img
      v-else
      class="w-50 h-50 rounded-xl absolute left-50% top-10% -translate-x-1/2"
      :src="qrimg"
      alt=""
    />
    <div class="w-100% mt-60 text-left">
      温馨提示：如果二维码失效了的话，请刷新页面，谢谢合作！！！
    </div>
  </div>
</template>

<style scoped></style>
