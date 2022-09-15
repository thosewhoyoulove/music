<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-12 17:02:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-15 18:35:32
-->
<template>
  <div v-if="cookie" class="w-100% pt-2">
    <img
      class="absolute h-50 w-95% rounded-lg"
      :src="user?.profile?.backgroundUrl"
      alt=""
    />
    <div class="relative w-95% h-30 top-30 rounded bg-white">
      <img
        class="
          absolute
          h-15
          w-15
          rounded-full
          -top-20%
          left-50%
          -translate-x-1/2
        "
        :src="user?.profile?.avatarUrl"
        alt=""
      />
      <div
        class="absolute font-sans font-650 top-30% left-50% -translate-x-1/2"
      >
        {{ user.profile?.nickname }}
      </div>
      <div
        @click="toMyFollows"
        class="
          absolute
          font-sans
          text-10px text-hex-aab
          top-50%
          left-30%
          -translate-x-1/2
        "
      >
        {{ userDetail.profile?.follows }} 关注
      </div>
      <div
        @click="toMyFolloweds"
        class="
          absolute
          font-sans
          text-10px text-hex-aab
          top-50%
          left-50%
          -translate-x-1/2
        "
      >
        {{ userDetail.profile?.followeds }} 粉丝
      </div>
      <div
        class="
          absolute
          font-sans
          text-10px text-hex-aab
          top-50%
          left-70%
          -translate-x-1/2
        "
      >
        lv{{ userDetail.level }}
      </div>
      <div
        class="
          absolute
          font-sans
          text-10px text-hex-aab
          top-70%
          left-20%
          -translate-x-1/2
        "
      >
        累积听歌数：{{ userDetail.listenSongs }}
      </div>
      <div
        class="
          w-40
          absolute
          font-sans
          text-10px text-hex-aab
          top-70%
          left-70%
          -translate-x-1/2
        "
      >
        创建时间：{{ createTime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getUserAcount,
  getUserDetail,
  getUserPlaylist,
  getUserFollows,
} from "~/api/user";
import { useStore, userStore } from "~/store/index";
import { Notify, Dialog } from "vant";
import { storeToRefs } from "pinia";
const VanDialog = Dialog.Component;
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const cookie = ref(localStorage.getItem("cookie"));
const createTime = ref("");
const { isFooterShow } = storeToRefs(store);
const { isLogin, user } = storeToRefs(userInfo);
let userDetail = ref({}); //存储用户详情信息
let uid = ref(0);
onMounted(async () => {
  if (!cookie.value) {
    router.push({
      path: "/LoginOrReg",
    });
  } else {
    user.value = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.value, "本地用户信息");
    uid.value = user.value.account.id;
    let res = await getUserAcount(); //获取账号信息
    console.log(res, "这是用户账号信息");
    let res1 = await getUserDetail(uid.value); //获取用户详细信息-关注
    userDetail.value = res1;
    createTime.value = formatMsToDate(res1.createTime); //获取创建时间
    console.log(userDetail, "用户详情对象");
    let res2 = await getUserPlaylist(uid.value); //获取用户歌单
    console.log(uid.value, res2, "用户歌单");
  }
});
const addZero = (num) => {
  if (parseInt(num) < 10) {
    num = "0" + num;
  }
  return num;
};
const formatMsToDate = (ms) => {
  if (ms) {
    var oDate = new Date(ms),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      // oDay = oDate.getDate(),
      // oHour = oDate.getHours(),
      // oMin = oDate.getMinutes(),
      // oSen = oDate.getSeconds(),
      oTime = oYear + "年" + addZero(oMonth) + "月";
    console.log(oTime);
    return oTime;
  } else {
    return "";
  }
};
const toMyFollows = () => {
  router.push({
    path: "/MyFollows",
    query: {
      id: uid.value,
      active: 0,
    },
  });
};
const toMyFolloweds = () =>{
  router.push({
    path: "/MyFollows",
    query: {
      id: uid.value,
      active: 1,
    },
  });
}
</script>

<style scoped>
</style>