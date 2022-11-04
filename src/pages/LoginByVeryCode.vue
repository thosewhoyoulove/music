<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-10 17:08:38
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-11-04 19:17:33
-->
<script setup lang="ts">
import { Notify } from "vant";
import { storeToRefs } from "pinia";
import { useStore, userStore } from "~/store/index";
import { loginByPhone, sendVeryCode, verifyCode } from "~/api/login";
const router = useRouter();
const phoneNumber = ref("");
const veryCode = ref();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
let disabled = ref(true);
let showTime = ref(false);
let time = ref(60 * 1000);
onMounted(() => {
  isFooterShow.value = false;
});

// 校验规则
const regExp = new RegExp("^1[3578]\\d{9}$");
// 获取验证码
const getVeryCode = async () => {
  console.log("发送了验证码");
  showTime.value = true;
  if (!phoneNumber.value) {
    Notify({ type: "warning", message: "请输入手机号" });
  } else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: "warning", message: "请输入11位的手机号" });
  } else if (regExp.test(phoneNumber.value)) {
    console.log("点击了获取验证码");
    const res = await sendVeryCode(phoneNumber.value);
    if (res.code === 200)
      Notify({ type: "success", message: "验证码已发送，请注意查收" });
    else Notify({ type: "danger", message: res.message });

    console.log(res);
  }
};
const CountDownFinish = () => {
  console.log("倒计时结束了");
  showTime.value = false;
};
const submit = async () => {
  if (!phoneNumber.value) {
    Notify({ type: "warning", message: "请输入手机号" });
  } else if (!veryCode.value) {
    Notify({ type: "warning", message: "请输入验证码" });
  } else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: "warning", message: "请输入正确的的手机号" });
  } else if (veryCode.value.length !== 4) {
    Notify({ type: "warning", message: "请输入4位的验证码" });
  } else if (regExp.test(phoneNumber.value) && veryCode.value.length === 4) {
    console.log("正在核查验证码");
    const res = await verifyCode(phoneNumber.value, veryCode.value);
    console.log(res);
    if (res.code === 200) {
      const res1 = await loginByPhone(phoneNumber.value, veryCode.value);
      console.log(res1, "验证码登录的方式"); // 验证码登录成功
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
watch(
  () => phoneNumber.value,
  (newVal) => {
    if (newVal.length && regExp.test(newVal)) {
      disabled.value = false;
      console.log(newVal);
    } else {
      disabled.value = true;
    }
  }
);
</script>

<template>
  <div class="w-100vw h-100vh relative bg-hex-f5f5f5">
    <div class="w-100% text-left ml-5 mt-5">
      <div class="font-550">登录体验更多精彩</div>
    </div>
    <div class="w-100% flex items-center mt-5">
      <van-form class="flex-col">
        <van-cell-group inset>
          <van-field
            v-model="phoneNumber"
            label-width="3rem"
            name="手机号"
            label="+86"
            placeholder="请输入手机号"
            :maxlength="11"
            clearable
            center
          />
          <van-field
            v-model="veryCode"
            class="items-center"
            label-width="3rem"
            label="验证码"
            type="digit"
            placeholder="请输入验证码"
            :maxlength="15"
            center
            clearable
          >
            <template #button>
              <van-button
                v-if="!showTime"
                :disabled="disabled"
                size="mini"
                plain
                @click="getVeryCode"
              >
                获取验证码
              </van-button>
              <van-count-down
                v-if="showTime"
                @finish="CountDownFinish"
                :time="time"
                format=" ss s"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div class="my-10 m-10px">
          <van-button round block type="danger" @click="submit"> 登录 </van-button>
        </div>
        <div
          class="flex w-20 items-center mx-auto text-xs text-hex-ccc"
          @click="router.push({ path: '/login' })"
        >
          使用密码登录
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
:deep(.van-field__label) {
  width: 40px;
}
:deep(.van-field__button) {
  display: flex;
  align-items: center;
}
:deep(.van-button--default) {
  border: 0 solid #fff;
}
:deep(.van-count-down) {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}
</style>
