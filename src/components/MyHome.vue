<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-12 17:02:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-14 20:31:43
-->
<template>
  <div class="w-100% pt-2">
      <img class="absolute h-50 w-95% rounded-lg" :src="user?.profile?.backgroundUrl" alt="">
      <div class="relative w-95% h-30 top-30 rounded  bg-white">
          <img class="absolute h-15 w-15 rounded-full -top-20% left-50% -translate-x-1/2" :src="user?.profile?.avatarUrl" alt="">
          <div class="absolute font-sans font-650 top-30% left-50% -translate-x-1/2">{{user.profile?.nickname}}</div>
          <div class="absolute font-sans text-10px text-hex-aab top-50% left-30% -translate-x-1/2">{{user.profile?.follows}} 关注</div>
          <div class="absolute font-sans text-10px text-hex-aab top-50% left-50% -translate-x-1/2">{{user.profile?.followeds}} 粉丝</div>
          <div class="absolute font-sans text-10px text-hex-aab top-50% left-70% -translate-x-1/2">lv{{level}}</div>
          <div class="absolute font-sans text-10px text-hex-aab top-70% left-20% -translate-x-1/2">累积听歌数：{{listenSongs}}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {getUserAcount,getUserDetail,getUserPlaylist} from '~/api/user'
import { useStore, userStore } from "~/store/index";
import { Notify, Dialog } from "vant";
import { storeToRefs } from "pinia";
const VanDialog = Dialog.Component;
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
const { isLogin, token, user } = storeToRefs(userInfo);
const level = ref(0)
const listenSongs = ref(0)
onMounted(async() => {
    user.value = JSON.parse(localStorage.getItem("userInfo"));
    token.value = user.value.token;
    console.log(user.value,'本地用户信息');
    
    let uid = ref(user.value.account.id)
    let res = await getUserAcount()//获取账号信息
    console.log(res,'这是用户账号信息');
    let res1 = await getUserDetail(uid.value)//获取用户详细信息
    console.log(res1,'用户详情');
    level.value = res1.level
    listenSongs.value = res1.listenSongs
    let res2 = await getUserPlaylist(286940473)
    console.log(uid.value,res2,'用户歌单');
    
    if(!token.value.length){router.push({
        path:'/LoginOrReg'
    })
    }
  
});
const addZero = num =>{
    
    if (parseInt(num) < 10) {
        num = "0" + num
    }
    return num
}
 const formatMsToDate = ms => {
    if (ms) {
        var oDate = new Date(ms),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            // oDay = oDate.getDate(),
            // oHour = oDate.getHours(),
            // oMin = oDate.getMinutes(),
            // oSen = oDate.getSeconds(),
            oTime = oYear + '年' + addZero(oMonth) +'月'
        console.log(oTime);
    } else {
        return ""
    }
}
formatMsToDate(1470022073239)
</script>

<style scoped>
</style>