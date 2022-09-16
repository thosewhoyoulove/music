<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 15:16:22
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:46:11
-->
<script setup lang="ts">
import { Notify, Toast } from 'vant'
import { storeToRefs } from 'pinia'
import { loginByPassword, sendVeryCode } from '~/api/login'
import { useStore, userStore } from '~/store/index'
const router = useRouter()
const phoneNumber = ref('')
const password = ref('')
const veryCode = ref()
const store = useStore()
const userInfo = userStore()
const { isFooterShow } = storeToRefs(store)
const { isLogin, token, user } = storeToRefs(userInfo)
onMounted(() => {
  isFooterShow.value = false
})
// 校验规则
const regExp = new RegExp('^1[3578]\\d{9}$')
// let validator = (phoneNumber:any) =>{
//     regExp.test(phoneNumber)
// }
const submit = async () => {
  if (!phoneNumber.value) {
    Notify({ type: 'warning', message: '请输入手机号' })
  }
  else if (!password.value) {
    Notify({ type: 'warning', message: '请输入密码' })
  }
  else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: 'warning', message: '请输入11位的手机号' })
  }
  else if (password.value.length < 6) {
    Notify({ type: 'warning', message: '密码的长度不小于6位' })
  }
  else if (regExp.test(phoneNumber.value) && password.value.length >= 6) {
    const res = await loginByPassword(phoneNumber.value, password.value)
    console.log(res)

    if (res.code === 200) {
      userInfo.updateIsLogin(true)
      userInfo.updateToken(res.token)
      userInfo.updateUserInfo(res)
      console.log(userInfo.$state)
      Notify({ type: 'success', message: '登陆成功，即将跳转到首页' })
      router.push({
        path: '/',
      })
    }
    else {
      Notify({ type: 'danger', message: res.message })
    }
  }
}
const showKeyboard = ref(true) // 数字键盘是否展示
const showPassboard = ref(false) // 密码键盘是否展示
</script>

<template>
  <div class="bg-hex-f4f5f5 w-95vw h-100vh p-5">
    <div class="w-100% text-left ml-5">
      <div class="font-550">
        登录体验更多精彩
      </div>
    </div>
    <div class="w-100% flex items-center mt-5">
      <van-form class="flex-col" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="phoneNumber"
            label-width="3rem"
            name="手机号"
            label="+86"
            placeholder="请输入手机号"
            :maxlength="11"
            clearable
            @focus="showKeyboard = true"
          />
          <van-field
            v-model="password"
            label-width="3rem"
            type="password"
            label="密码"
            placeholder="输入密码"
            :maxlength="15"
            clearable
            @focus="showPassboard = true"
          />
        </van-cell-group>
        <div class="mt-10 mb-3 m-10px">
          <van-button round block type="danger" @click="submit">
            登录
          </van-button>
        </div>
        <div class="flex items-center justify-between">
          <div
            class="text-12px text-hex-ccc"
            @click="router.push({ path: '/LoginByVeryCode' })"
          >
            使用验证码登录
          </div>
          <div class="text-xs text-hex-1A73E9">
            重设密码
          </div>
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
        v-model="password"
        :show="showPassboard"
        @blur="showPassboard = false"
      />
    </div>
  </div>
</template>

<style scoped>
.van-field__label {
  margin-right: 0;
}
:root {
  --van-field-label-margin-right: 0px;
}
</style>
