<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-10 17:08:38
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:46:16
-->
<script setup lang="ts">
import { Notify } from 'vant'
import { storeToRefs } from 'pinia'
import { useStore, userStore } from '~/store/index'
import {
  loginByPhone,
  refreshLoginStu,
  sendVeryCode,
  verifyCode,
} from '~/api/login'
const router = useRouter()
const phoneNumber = ref('')
const veryCode = ref()
const store = useStore()
const userInfo = userStore()
const { isFooterShow } = storeToRefs(store)
const { isLogin, token, user } = storeToRefs(userInfo)
onMounted(() => {
  isFooterShow.value = false
})
const showKeyboard = ref(true) // 数字键盘是否展示
const showVeryboard = ref(false) // 验证码键盘是否展示
// 校验规则
const regExp = new RegExp('^1[3578]\\d{9}$')
// 获取验证码
const getVeryCode = async () => {
  if (!phoneNumber.value) {
    Notify({ type: 'warning', message: '请输入手机号' })
  }
  else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: 'warning', message: '请输入11位的手机号' })
  }
  else if (regExp.test(phoneNumber.value)) {
    console.log('点击了获取验证码')
    const res = await sendVeryCode(phoneNumber.value)
    if (res.code === 200)
      Notify({ type: 'success', message: '验证码已发送，请注意查收' })
    else
      Notify({ type: 'danger', message: res.message })

    console.log(res)
  }
}
const submit = async () => {
  if (!phoneNumber.value) {
    Notify({ type: 'warning', message: '请输入手机号' })
  }
  else if (!veryCode.value) {
    Notify({ type: 'warning', message: '请输入验证码' })
  }
  else if (!regExp.test(phoneNumber.value)) {
    Notify({ type: 'warning', message: '请输入11位的手机号' })
  }
  else if (veryCode.value.length !== 4) {
    Notify({ type: 'warning', message: '请输入4位的验证码' })
  }
  else if (regExp.test(phoneNumber.value) && veryCode.value.length === 4) {
    console.log('正在核查验证码')
    const res = await verifyCode(phoneNumber.value, veryCode.value)
    console.log(res)
    if (res.code === 200) {
      const res1 = await loginByPhone(phoneNumber.value, veryCode.value)
      console.log(res1, '验证码登录的方式') // 验证码登录成功
      if (res1.code === 200) {
        userInfo.updateIsLogin(true)
        userInfo.updateToken(res1.token)
        userInfo.updateUserInfo(res1)
        console.log(userInfo.$state)

        Notify({ type: 'success', message: '登录成功，即将跳转到首页' })
        router.push({
          path: '/',
        })
      }
      else {
        Notify({ type: 'danger', message: res.message })
      }
    }
    else {
      Notify({ type: 'danger', message: res.message })
    }
  }
}
</script>

<template>
  <div>
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
            @focus="showKeyboard = true"
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
            @focus="showVeryboard = true"
          >
            <template #button>
              <van-button size="small" type="primary" plain @click="getVeryCode">
                获取验证码
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="my-10 m-10px">
          <van-button round block type="danger" @click="submit">
            登录
          </van-button>
        </div>
        <div
          class="flex w-20 items-center mx-auto text-12px text-hex-ccc"
          @click="router.push({ path: '/login' })"
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

<style scoped>
</style>
