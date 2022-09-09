<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 15:16:22
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 20:11:06
-->
<template>
  <div class="bg-hex-f4f5f5 w-95vw h-100vh p-5">
    <div class="w-100% text-left">
      <div class="font-550">登录体验更多精彩</div>
      <div class="text-xs text-hex-aaa">未注册的手机号登录后将自动创建账号</div>
    </div>
    <div class="w-100% flex items-center mt-5">
      <van-form class="flex-col" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            label-width="3rem"
            v-model="phoneNumber"
            name="手机号"
            label="+86"
            @focus="show = true"
            placeholder="请输入手机号"
            :maxlength="11"
            clearable
            :rules="[
              { validator, message: '请输入正确的手机号', trigger: 'blur' },
            ]"
            show-error-message
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="danger" @click="submit">
            下一步
          </van-button>
        </div>
        <div>
          <div class="text-xs text-hex-1A73E9">找回账号</div>
        </div>
      </van-form>
    </div>
    <div class="w-20 h-20 z-1000">
      <van-number-keyboard
        v-model="phoneNumber"
        :show="show"
        @blur="show = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify,Toast } from "vant";
const router = useRouter();
const phoneNumber = ref("");
//校验规则
let regExp = new RegExp("^1[3578]\\d{9}$");
// let validator = (phoneNumber:any) =>{
//     regExp.test(phoneNumber)
// }
const submit = () => {
  if (!phoneNumber.value) {
    Notify({ type: "warning", message: "请输入手机号" });
  } else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: "warning", message: "请输入11位的手机号" });
  } else if (regExp.test(phoneNumber.value)) {
    console.log("通过了验证");
    router.push({
      path: "/VerificationCode",
      query: {
        phoneNumber: phoneNumber.value,
      },
    });
  }
};
const show = ref(true);
</script>

<style scoped>
.van-field__label {
  margin-right: 0;
}
:root {
  --van-field-label-margin-right: 0px;
}
</style>