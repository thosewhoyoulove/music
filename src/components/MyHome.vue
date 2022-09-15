<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-12 17:02:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-15 23:00:54
-->
<template>
  <div v-if="cookie" class="w-100% pt-2">
    <img
      class="absolute h-50 w-95% rounded-lg"
      :src="user?.profile?.backgroundUrl"
      alt=""
    />
    <div class="relative w-95% h-35 top-30 rounded bg-white">
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
        {{ nickname }}
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
          rounded-2xl
          items-center
          flex
          justify-center
          border border-hex-ccc
          w-20
          h-7
          font-semibold
          tracking-widest
          absolute
          font-sans
          text-10px
          top-70%
          left-50%
          -translate-x-1/2
        "
      >
        编辑资料
      </div>
    </div>
    <div class="w-95% mt-30 rounded">
      <van-tabs
        background="#f6f7f9"
        v-model:active="active"
        @click-tab="tabChange"
      >
        <van-tab v-for="(item, index) in choice" :key="index" :title="item">
          <div
            v-show="active == 0"
            class="bg-white rounded-lg relative pl-3 w-100% text-left"
          >
            <div class="font-550 mt-2 pt-5">基本信息</div>
            <div class="text-10px text-hex-bcb py-2">
              村龄: {{ age }}年({{ createTime }}注册)
            </div>
            <div v-if="gender == 0" class="text-10px text-hex-bcb pb-2">
              性别: 未知
            </div>
            <div v-if="gender == 1" class="text-10px text-hex-bcb pb-2">
              性别: 男
            </div>
            <div v-if="gender == 2" class="text-10px text-hex-bcb pb-2">
              性别: 女
            </div>
            <div class="text-10px text-style text-hex-bcb">
              简介: {{ signature }}
            </div>
            <div class="text-10px text-hex-bcb py-2">
              累积听歌数: {{ userDetail.listenSongs }}
            </div>
          </div>
          <div
            v-show="active == 1"
            class="bg-white rounded-lg relative pl-3 w-100% text-left"
          >
            <ul
              v-for="(item, index) in events"
              :key="index"
              class="mt-3 border-b border-gray-500 break-all relative"
            >
              <div  class="flex justify-between">
                <div class="flex">
                  <img
                    class="w-3rem h-3rem rounded-full"
                    :src="user?.profile?.avatarUrl"
                    alt="这是歌曲评论用户的头像"
                  />
                  <div class="col ml-1 text-left w-60">
                    <div class="text-sm font-600">
                      {{ nickname }}
                    </div>
                    <div class="text-10px">{{ formatMsToDate(item.eventTime) }}</div>
                    <div class="font-serif text-13px">
                      {{ item.info?.commentThread?.resourceTitle}}
                    </div>
                    <div v-if="item.pics.length">
                      <div class="flex " v-for="(pic,index) in events[index].pics" :key="index">
                          <img class="w-20 h-20 rounded p-.5" :src="pic.originUrl" alt="">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex absolute right-0">
                  <div class="text-10px mr-.5 color-#ccc">
                    {{ item.info?.likedCount }}
                  </div>
                  <div v-if="!item.info?.liked" class="flex my-1">
                    <van-icon size="10px" name="thumb-circle-o" />
                  </div>
                  <div v-else class="flex my-1">
                    <van-icon size="10px" name="good-job" />
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getUserAcount,
  getUserDetail,
  getUserPlaylist,
  getUserFollows,
  getUserEvent,
} from "~/api/user";
import { useStore, userStore } from "~/store/index";
import { Notify, Dialog } from "vant";
import { storeToRefs } from "pinia";
const VanDialog = Dialog.Component;
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const cookie = ref(localStorage.getItem("cookie"));
const nickname = ref("");
const createTime = ref("");
const { isFooterShow } = storeToRefs(store);
const { isLogin, user } = storeToRefs(userInfo);
let userDetail = ref({}); //存储用户详情信息
let uid = ref(0);
const choice = ref(["主页", "动态"]);
const active = ref(0);
const gender = ref();
let age = ref(0);
let signature = ref("");
const events = ref([]);
const pics = ref([])
onMounted(async () => {
  if (!cookie.value) {
    router.push({
      path: "/LoginOrReg",
    });
  } else {
    isFooterShow.value = false;
    user.value = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.value, "本地用户信息");
    uid.value = user.value.account.id;
    nickname.value = user.value.profile?.nickname;
    gender.value = user.value.profile?.gender;
    signature.value = user.value.profile?.signature;
    let res = await getUserAcount(); //获取账号信息
    console.log(res, "这是用户账号信息");
    let res1 = await getUserDetail(uid.value); //获取用户详细信息-关注
    userDetail.value = res1;
    createTime.value = formatMsToDate(res1.createTime); //获取创建时间
    age.value = getAge(res1.createTime); //获取村龄
    console.log(userDetail, "用户详情对象");
    let res2 = await getUserPlaylist(uid.value); //获取用户歌单
    console.log(uid.value, res2, "用户歌单");
    let eventRes = await getUserEvent(uid.value);
    console.log(eventRes, "用户动态");
    events.value = eventRes.events;
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
      oDay = oDate.getDay(),
      oTime = oYear + "年" + addZero(oMonth) + "月" +addZero(oDay)+"日";
    console.log(oTime);
    return oTime;
  } else {
    return "";
  }
};
const getAge = (ms) => {
  if (ms) {
    var date = new Date();
    var oDate = new Date(ms),
      year = date.getFullYear(),
      oYear = oDate.getFullYear(),
      age = year - oYear;
    console.log(age);
    return age;
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
const toMyFolloweds = () => {
  router.push({
    path: "/MyFollows",
    query: {
      id: uid.value,
      active: 1,
    },
  });
};
</script>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>