<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 19:21:17
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:46:40
-->
<script setup lang="ts">
import { Notify } from 'vant'
import { nanoid } from 'nanoid'
import { isRegister, loginByPhone, verifyCode } from '~/api/login'
import { Register } from '~/api/register'
const route = useRoute()
const router = useRouter()
const phoneNumber = ref(route.query.phoneNumber)
onMounted(async () => {
  Notify({ type: 'success', message: '验证码已发送，请注意查收' })
})
const showKeyboard = ref(true)
const veryCode = ref()
// 当验证码通过验证
watch(veryCode, async (newVal) => {
  if (newVal.length === 4) {
    const res = await verifyCode(phoneNumber.value, newVal)// 验证验证码
    console.log(res)

    if (res.code === 200) {
      const res = await isRegister(phoneNumber.value)// 账号是否已经注册过
      console.log(res)

      if (res.code === 200) {
        Notify({ type: 'success', message: '该账号已经注册，即将为你自动登录' })
        const res = await loginByPhone(phoneNumber.value, newVal)
        console.log(res, '自动登录')
      }
      else {
        // 没有注册但是要传密码和昵称作为参数
        // Register(phone, password, captcha, nickname)
        const phone = ref(route.query.phoneNumber)
        const password = ref(nanoid().slice(0, 11))
        const captcha = ref(newVal)
        const nickname = ref(`云音乐用户${nanoid().slice(0, 6)}`)
        const res = await Register(phone.value, password.value, captcha.value, nickname.value)
        console.log(res, '用户注册信息')
      }
    }
  }
})
</script>

<template>
  <div class="bg-hex-f4f5f5 w-95vw h-100vh pt-5 pl-4">
    <div class="w-100% text-left">
      <div class="font-550">
        请输入验证码
      </div>
      <div class="flex justify-between items-center">
        <div class="flex justify-between items-center">
          <div class="text-xs text-hex-aaa">
            已发送至+86{{ phoneNumber }}
          </div>
          <div class="ml-2" @click="router.back()">
            <van-icon name="edit" />
          </div>
        </div>

        <div class="flex text-xs text-hex-1A73E9 mr-2">
          重新发送
        </div>
      </div>
    </div>
    <div class="mt-5 h-5">
      <van-password-input
        :value="veryCode"
        :gutter="10"
        :length="4"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
    </div>
    <div class="w-20 h-20 z-1000">
      <van-number-keyboard
        v-model="veryCode"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
