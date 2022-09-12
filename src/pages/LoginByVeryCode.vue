<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-10 17:08:38
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-12 15:03:26
-->
<template>
  <div>
    <div class="w-100% flex items-center mt-5">
      <van-form class="flex-col">
        <van-cell-group inset>
          <van-field
            label-width="3rem"
            v-model="phoneNumber"
            name="手机号"
            label="+86"
            @focus="showKeyboard = true"
            placeholder="请输入手机号"
            :maxlength="11"
            clearable
            center
          />
          <van-field
            class="items-center"
            label-width="3rem"
            v-model="veryCode"
            label="验证码"
            type="digit"
            @focus="showVeryboard = true"
            placeholder="请输入验证码"
            :maxlength="15"
            center
            clearable
          >
            <template #button>
              <van-button @click="getVeryCode" size="small" type="primary" plain
                >获取验证码</van-button
              >
            </template>
          </van-field>
        </van-cell-group>
        <div class="my-10 m-10px">
          <van-button round block type="danger" @click="submit">
            登录
          </van-button>
        </div>
        <div
          @click="router.push({ path: '/login' })"
          class="flex w-20 items-center mx-auto text-12px text-hex-ccc"
        >
          使用密码登录
        </div>
      </van-form>
    </div>
    <div class="w-20 h-20 z-1000">
      <van-number-keyboard
        v-model="phoneNumber"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </div>
    <div class="w-20 h-20 z-1000">
      <van-number-keyboard
        v-model="veryCode"
        :show="showVeryboard"
        @blur="showVeryboard = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify } from "vant";
import { useStore, userStore } from "~/store/index";
import { storeToRefs } from "pinia";
import {
  sendVeryCode,
  verifyCode,
  refreshLoginStu,
  loginByPhone,
} from "~/api/login";
const router = useRouter();
const phoneNumber = ref("");
const veryCode = ref();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
const { isLogin, token, user } = storeToRefs(userInfo);
onMounted(() => {
  isFooterShow.value = false;
});
const showKeyboard = ref(true); //数字键盘是否展示
const showVeryboard = ref(false); //验证码键盘是否展示
//校验规则
let regExp = new RegExp("^1[3578]\\d{9}$");
//获取验证码
const getVeryCode = async () => {
  if (!phoneNumber.value) {
    Notify({ type: "warning", message: "请输入手机号" });
  } else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: "warning", message: "请输入11位的手机号" });
  } else if (regExp.test(phoneNumber.value)) {
    console.log("点击了获取验证码");
    let res = await sendVeryCode(phoneNumber.value);
    if (res.code === 200) {
      Notify({ type: "success", message: "验证码已发送，请注意查收" });
    } else {
      Notify({ type: "danger", message: res.message });
    }
    console.log(res);
  }
};
const submit = async () => {
  if (!phoneNumber.value) {
    Notify({ type: "warning", message: "请输入手机号" });
  } else if (!veryCode.value) {
    Notify({ type: "warning", message: "请输入验证码" });
  } else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: "warning", message: "请输入11位的手机号" });
  } else if (veryCode.value.length !== 4) {
    Notify({ type: "warning", message: "请输入4位的验证码" });
  } else if (regExp.test(phoneNumber.value) && veryCode.value.length === 4) {
    console.log("正在核查验证码");
    let res = await verifyCode(phoneNumber.value, veryCode.value);
    console.log(res);
    if (res.code === 200) {
      let res1 = await loginByPhone(phoneNumber.value, veryCode.value);
      console.log(res1, "验证码登录的方式"); //验证码登录成功
      if (res1.code === 200) {
        userInfo.updateIsLogin(true);
        userInfo.updateToken(res1.token);
        userInfo.updateUserInfo(res1);
        console.log(userInfo.$state);

        Notify({ type: "success", message: "登录成功，即将跳转到首页" });
        router.push({
          path: "/",
        });
      } else {
        Notify({ type: "danger", message: res.message });
      }
    } else {
      Notify({ type: "danger", message: res.message });
    }
  }
};
</script>

<style scoped>
</style>