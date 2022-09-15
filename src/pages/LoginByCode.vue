<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 15:26:41
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-15 09:38:45
-->
<template>
  <div class="h-100vh">
    这是二维码登录页面
    <img :src="qrimg" alt="" />
  </div>
</template>

<script setup lang="ts">
import { getCodeKey, getCodeByKey, testCodeByKey } from "~/api/login";
import {getUserAcount} from '~/api/user'
import { useStore,userStore } from "~/store/index";
import { Notify } from "vant";
import { storeToRefs } from "pinia";
const router = useRouter()
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
onMounted(() => {
  isFooterShow.value = false;
});
const key = ref("");
const qrimg = ref("");
const qrurl = ref("");
const result = ref("");
onMounted(async () => {
  let res = await getCodeKey();
  console.log(res, "获得key");
  key.value = res.data.unikey;
  let res1 = await getCodeByKey(key.value);
  console.log(res1, "生成二维码图片");
  qrimg.value = res1.data.qrimg;
  qrurl.value = res1.data.qrurl;
  const timer = setInterval(async () => {
    console.log(key.value, "UNikey");

    let statusRes = await testCodeByKey(key.value);
    if (statusRes.code === 800) {
      console.log(statusRes, "失败了");

      Notify({ type: "warning", message: statusRes.message });
      clearInterval(timer);
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      Notify({ type: "success", message: '授权登录成功，即将跳转首页' });
      console.log(statusRes.cookie, "成功了");
      localStorage.setItem("cookie", statusRes.cookie);
      const AcountRes  = await getUserAcount()
      console.log(AcountRes,'用户账户信息');
      userInfo.updateIsLogin(true);
      userInfo.updateUserInfo(AcountRes);
      router.push({
        path:'/'
      })
      
    }
  }, 5000);
});
</script>

<style scoped>
</style>