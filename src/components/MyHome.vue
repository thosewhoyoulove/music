<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-12 17:02:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-12 19:44:05
-->
<template>
  <div>
      <div class="relative w-95% h-30 rounded mt-10 bg-white">
          <img class="absolute h-15 w-15 rounded-full -top-20% left-50% -translate-x-1/2" :src="user?.profile?.avatarUrl" alt="">
          <div class="absolute font-sans font-650 top-30% left-50% -translate-x-1/2"></div>
          <div class="absolute font-sans text-10px text-hex-aab top-50% left-30% -translate-x-1/2">{{user.profile?.follows}} 关注</div>
          <div class="absolute font-sans text-10px text-hex-aab top-50% left-50% -translate-x-1/2">{{user.profile?.followeds}} 粉丝</div>
          <div class="absolute font-sans text-10px text-hex-aab top-50% left-70% -translate-x-1/2">等级</div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {getUserAcount} from '~/api/user'
import { useStore, userStore } from "~/store/index";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
const { isLogin, token, user } = storeToRefs(userInfo);

onMounted(async() => {
    user.value = JSON.parse(localStorage.getItem("userInfo"));
    token.value = user.value.token;
    let uid = ref(user.value.account.id)
    let res = await getUserAcount()
    console.log(res,'这是用户账号信息');
    
    if(!token.value.length){router.push({
        path:'/LoginOrReg'
    })
    }
  
});
</script>

<style scoped>
</style>