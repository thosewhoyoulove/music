<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 15:16:22
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-11-04 18:30:43
-->
<script setup lang="ts">
import { Notify } from "vant";
import { storeToRefs } from "pinia";
import { loginByEmail } from "~/api/login";
import { useStore, userStore } from "~/store/index";
const router = useRouter();
const email = ref("");
const password = ref("");
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
onMounted(() => {
  isFooterShow.value = false;
});
// 校验规则
const regExp = new RegExp(
  "^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\\.){1,4}[a-z]{2,4}$"
);
const submit = async () => {
  console.log(email.value, password.value);

  if (!email.value) {
    Notify({ type: "warning", message: "请输入邮箱地址" });
  } else if (!password.value) {
    Notify({ type: "warning", message: "请输入密码" });
  } else if (!regExp.test(email.value)) {
    Notify({ type: "warning", message: "请输入正确的邮箱地址" });
  } else if (password.value.length < 6) {
    Notify({ type: "warning", message: "密码的长度不小于6位" });
  } else if (regExp.test(email.value) && password.value.length >= 6) {
    const res = await loginByEmail(email.value, password.value);
    console.log(res);

    if (res.code === 200) {
      userInfo.updateIsLogin(true);
      userInfo.updateToken(res.token);
      userInfo.updateUserInfo(res);
      console.log(userInfo.$state);
      Notify({ type: "success", message: "登陆成功，即将跳转到首页" });
      router.push({
        path: "/",
      });
    } else {
      Notify({ type: "danger", message: "系统错误，请稍后再试" });
    }
  }
};
</script>

<template>
  <div class="bg-hex-f4f5f5 h-100vh w-100vw p-5 relative">
    <div class="w-100% text-left ml-5 mt-5">
      <div class="font-550">登录体验更多精彩</div>
    </div>
    <div class="w-100% items-center mt-5 absolute -translate-x-1/2 left-50%">
      <van-form class="flex-col">
        <van-cell-group inset>
          <van-field
            v-model="email"
            name="邮箱号"
            label="邮箱"
            placeholder="请输入邮箱地址"
            :maxlength="20"
            clearable
          />
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入邮箱登录密码"
            :maxlength="15"
            clearable
          />
        </van-cell-group>
        <div class="mt-10 px-3">
          <van-button round block type="danger" @click="submit"> 登录 </van-button>
        </div>
        <div class="flex items-center justify-between mt-5 px-5">
          <div class="text-xs text-hex-ccc" @click="router.push({ path: '/Login' })">
            使用密码登录
          </div>
          <div class="text-xs text-hex-1A73E9">找回密码</div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
:deep(.van-field__label) {
  width: 40px;
}
</style>
