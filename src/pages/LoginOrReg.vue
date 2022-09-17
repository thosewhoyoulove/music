<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-10 14:01:20
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-17 19:30:02
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Notify } from 'vant/es'
import { useStore } from '~/store/index'
const router = useRouter()
const store = useStore()
const { isFooterShow } = storeToRefs(store)
const checked = ref(false)
onMounted(() => {
  isFooterShow.value = false
})
const toLogin = () => {
  if (!checked.value)
    Notify({ type: 'warning', message: '请勾选同意条款和政策' })
  else
    router.push({ path: '/login' })
}
const toEmailLogin = () => {
  if (!checked.value)
    Notify({ type: 'warning', message: '请勾选同意条款和政策' })
  else
    router.push({ path: '/LoginByEmail' })
}
const toQrCodeLogin = () => {
  if (!checked.value)
    Notify({ type: 'warning', message: '请勾选同意条款和政策' })
  else
    router.push({ path: '/LoginByCode' })
}
</script>

<template>
  <div class="h-100vh w-99% bg-hex-DB2C1F relative">
    <img
      class="h-15 w-15 left-50% top-30% absolute -translate-x-1/2"
      src="/logo.png"
      alt=""
    >
    <div class="myBtn flex-col absolute -translate-x-1/2 left-50% top-60% w-55">
      <div class="mb-2 text-hex-FF4843" @click="toLogin">
        <van-button class="w-55 btn1" round size="large" type="default">
          手机号登录
        </van-button>
      </div>
      <div @click="router.push({path:'register'})">
        <van-button
          class="btn2"
          round
          size="large"
          type="danger"
          hairline="true"
        >
          注册
        </van-button>
      </div>
    </div>
    <div
      class="
        flex
        items-center
        text-white text-12px
        w-60
        mt-4
        left-50%
        top-75%
        absolute
        -translate-x-1/2
      "
    >
      <div class="flex">
        <van-checkbox v-model="checked" checked-color="#ee0a24" icon-size="14px">
          同意
        </van-checkbox>
      </div>
      <div class="ml-2">
        服务条款 隐私政策 儿童隐私政策
      </div>
    </div>
    <img
      class="h-8 w-8 mt-5 left-30% top-81% absolute -translate-x-1/2"
      src="/email.png"
      alt=""
      @click="toEmailLogin"
    >
    <div class="mt-5 left-70% top-81% absolute -translate-x-1/2" @click="toQrCodeLogin">
      <van-icon size="1.8rem" color="#f3f4f5" name="qr" />
    </div>
  </div>
</template>

<style scoped>
/* .van-button[data-v-17368a3c]{
    border:1px;
    border-color:white;
    background: white;
} */
.myBtn .btn1 {
  color: #ff4843;
  height: 2.5rem;
}
.myBtn .btn2 {
  border: 1px solid white;
  height: 2.5rem;
}
</style>
