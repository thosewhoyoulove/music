<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-10 14:01:20
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-10 16:18:47
-->
<template>
  <div class="h-100vh w-99% bg-hex-DB2C1F relative">
    <img
      class="h-15 w-15 left-50% top-30% absolute -translate-x-1/2"
      src="/logo.png"
      alt=""
    />
    <div class="myBtn flex-col absolute -translate-x-1/2 left-50% top-68% w-55">
      <div @click="toLogin" class="mb-2 text-hex-FF4843">
        <van-button class="w-55 btn1" round size="large" type="default"
          >手机号登录</van-button
        >
      </div>
      <div>
        <van-button
          class="btn2"
          round
          size="large"
          type="danger"
          hairline="true"
          >注册</van-button
        >
      </div>
    </div>
    <div class="flex items-center text-white text-12px w-60 mt-4 left-50% top-85% absolute -translate-x-1/2">
      <div class="flex">
        <van-checkbox  v-model="checked" checked-color="#ee0a24" icon-size="14px">同意</van-checkbox>
      </div>
      <div class="ml-2">服务条款 隐私政策 儿童隐私政策</div>
    </div>
    <img
      class="h-8 w-8 mt-5 left-50% top-89% absolute -translate-x-1/2"
      src="/email.png"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/index";
import { storeToRefs } from "pinia";
import { Notify } from "vant/es";
const router = useRouter()
const store = useStore();
const { isFooterShow } = storeToRefs(store);
const checked = ref(false)
onMounted(() => {
  isFooterShow.value = false;
});
const toLogin = ()=>{
    if(!checked.value){
        Notify({type:'warning',message:'请勾选同意条款和政策'})
    }else{
        router.push({path:'/login'})
    }
}
</script>

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