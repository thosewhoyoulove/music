<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-12 17:02:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-07 20:52:05
-->
<script setup lang="ts">
import { Dialog, Loading, Notify } from "vant";
import { storeToRefs } from "pinia";
import {
  getUserAcount,
  getUserDetail,
  getUserEvent,
  getUserFollows,
  getUserPlaylist,
} from "~/api/user";
import { useStore, userStore } from "~/store/index";
const VanDialog = Dialog.Component;
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const cookie: any = ref(localStorage.getItem("cookie"));
const nickname = ref("");
const createTime = ref("");
const { user }: any = storeToRefs(userInfo);
const userDetail: any = ref({}); // 存储用户详情信息
const showLoading = ref(true);
const uid = ref(0);
const choice = ref(["主页", "动态"]);
const active = ref(0);
const gender = ref();
const age: any = ref(0);
const signature:any = ref("");
const events:any = ref([]);
//个人歌单
const activeNames: any = ref("创建的歌单");
const createdList: any = ref([]); //
const subList: any = ref([]);
onMounted(async () => {
  if (!cookie.value) {
    store.updateIsShow(store.$state, true);
    router.push({
      path: "/LoginOrReg",
    });
  } else {
    user.value = JSON.parse(localStorage.getItem("userInfo") as string);
    console.log(user.value, "本地用户信息");
    uid.value = user.value.account.id;
    nickname.value = user.value.profile?.nickname;
    gender.value = user.value.profile?.gender;
    signature.value = user.value.profile?.signature;
    const res = await getUserAcount(); // 获取账号信息
    console.log(res, "这是用户账号信息");
    const res1 = await getUserDetail(uid.value); // 获取用户详细信息-关注
    userDetail.value = res1;
    createTime.value = formatMsToDate(res1.createTime); // 获取创建时间
    age.value = getAge(res1.createTime); // 获取村龄
    console.log(userDetail, "用户详情对象");
    const res2 = await getUserPlaylist(uid.value); // 获取用户歌单
    console.log(uid.value, res2, "用户歌单");
    createdList.value = res2.playlist.filter((item: any) => item.subscribed === false); //获取创建的歌单
    subList.value = res2.playlist.filter((item: any) => item.subscribed === true); //获取收藏的歌单
    console.log(createdList.value, "创建的歌曲列表");

    const eventRes = await getUserEvent(uid.value);
    console.log(eventRes, "用户动态");
    events.value = eventRes.events;
    showLoading.value = false;
  }
});
const addZero = (num: any) => {
  if (parseInt(num) < 10) num = `0${num}`;

  return num;
};
const formatMsToDate = (ms: any) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDay();
    const oTime = `${oYear}年${addZero(oMonth)}月${addZero(oDay)}日`;
    return oTime;
  } else {
    return "";
  }
};
const getAge = (ms: any) => {
  if (ms) {
    const date = new Date();
    const oDate = new Date(ms);
    const year = date.getFullYear();
    const oYear = oDate.getFullYear();
    const age = year - oYear;
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
const toDetail = (item: any) => {
  router.push({
    path: "/RecMusicListDetail",
    query: {
      id: item.id,
      limit: parseInt(item.trackCount),
      name: item.name,
    },
  });
};
</script>

<template>
  <div v-if="cookie" class="w-100vw">
    <img
      class="absolute h-50 w-100vw pt-2 px-3"
      :src="user?.profile?.backgroundUrl"
      alt=""
    />
    <div class="relative w-100vw h-35 top-30 rounded bg-white px-3">
      <img
        class="absolute h-15 w-15 rounded-full -top-20% left-50% -translate-x-1/2"
        :src="user?.profile?.avatarUrl"
        alt=""
      />
      <div class="absolute font-sans font-650 top-30% left-50% -translate-x-1/2">
        {{ nickname }}
      </div>
      <div
        class="absolute font-sans text-10px text-hex-aab top-50% left-30% -translate-x-1/2"
        @click="toMyFollows"
      >
        {{ userDetail.profile?.follows }} 关注
      </div>
      <div
        class="absolute font-sans text-10px text-hex-aab top-50% left-50% -translate-x-1/2"
        @click="toMyFolloweds"
      >
        {{ userDetail.profile?.followeds }} 粉丝
      </div>
      <div
        @click="router.push({ path: 'level', query: { id: uid } })"
        class="absolute font-sans text-10px text-hex-aab top-50% left-70% -translate-x-1/2"
      >
        lv{{ userDetail.level }}
      </div>

      <div
        class="rounded-2xl items-center flex justify-center border border-hex-ccc w-20 h-7 font-semibold tracking-widest absolute font-sans text-10px top-70% left-50% -translate-x-1/2"
      >
        编辑资料
      </div>
    </div>
    <div class="w-100vw mt-30 mb-15 rounded px-2">
      <van-tabs v-model:active="active" background="#f6f7f9" sticky>
        <van-tab v-for="(item, index) in choice" :key="index" :title="item">
          <div v-show="active == 0" class="bg-white rounded-lg px-2 text-left">
            <div class="font-550 mt-2 pt-5">基本信息</div>
            <div class="text-10px text-hex-bcb py-2">
              村龄: {{ age }}年({{ createTime }}注册)
            </div>
            <div v-if="gender == 0" class="text-10px text-hex-bcb pb-2">性别: 未知</div>
            <div v-if="gender == 1" class="text-10px text-hex-bcb pb-2">性别: 男</div>
            <div v-if="gender == 2" class="text-10px text-hex-bcb pb-2">性别: 女</div>
            <div class="text-10px text-style text-hex-bcb">简介: {{ signature }}</div>
            <div class="text-10px text-hex-bcb py-2">
              累积听歌数: {{ userDetail.listenSongs }}
            </div>

            <div class="bg-white rounded-lg px-.5 text-left mt-5">
              <van-collapse v-model="activeNames" accordion>
                <van-collapse-item name="创建的歌单">
                  <template #title>
                    <div>创建的歌单({{ createdList.length }})</div>
                  </template>
                  <div
                    @click="toDetail(item)"
                    class="flex pb-1"
                    v-for="(item, index) in createdList.slice(0, 1)"
                    :key="index"
                  >
                    <img class="w-10 h-10 rounded-lg" :src="item.coverImgUrl" alt="" />
                    <div class="ml-2 col">
                      <div class="text-hex-000 text-xs">我喜欢的音乐</div>
                      <div class="text-xs mt-1">{{ item.trackCount }}首</div>
                    </div>
                  </div>
                  <div
                    @click="toDetail(item)"
                    class="flex pb-1"
                    v-for="(item, index) in createdList.slice(1, createdList.length - 1)"
                    :key="index"
                  >
                    <img class="w-10 h-10 rounded-lg" :src="item.coverImgUrl" alt="" />
                    <div class="ml-2 col">
                      <div class="text-style text-hex-000 text-xs">{{ item.name }}</div>
                      <div class="text-xs mt-1.5">{{ item.trackCount }}首</div>
                    </div>
                  </div>
                </van-collapse-item>
                <van-collapse-item name="收藏的歌单">
                  <template #title>
                    <div>收藏的歌单({{ subList.length }})</div>
                  </template>
                  <div
                    class="flex pb-1"
                    @click="toDetail(item)"
                    v-for="(item, index) in subList"
                    :key="index"
                  >
                    <img class="w-10 h-10 rounded-lg" :src="item.coverImgUrl" alt="" />
                    <div class="ml-2 col">
                      <div class="text-style text-hex-000 text-xs">{{ item.name }}</div>
                      <div class="text-xs mt-1.5">{{ item.trackCount }}首</div>
                    </div>
                  </div>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>

          <div
            v-show="active == 1"
            class="bg-white rounded-lg relative pl-3 w-100% text-left"
          >
            <van-loading
              v-show="showLoading"
              color="#666"
              type="spinner"
              class="mt-5"
              size="24px"
              vertical
            >
              加载中...
            </van-loading>
            <ul
              v-for="(item, index) in events"
              :key="index"
              class="mt-2 border-b border-gray-500 break-all relative pt-5 pb-3"
            >
              <div class="flex justify-between">
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
                    <div class="text-10px">
                      {{ formatMsToDate(item.eventTime) }}
                    </div>
                    <div class="text-13px">
                      {{ item.info?.commentThread?.resourceTitle }}
                    </div>
                    <div v-if="item.pics.length">
                      <div
                        v-for="(pic, index) in events[index].pics"
                        :key="index"
                        class="flex"
                      >
                        <img class="w-20 h-20 rounded p-.5" :src="pic.originUrl" alt="" />
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

<style>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-cell {
  padding: 0.25rem;
}
.van-collapse-item__content {
  padding: 0.25rem 0.1rem;
}
</style>
