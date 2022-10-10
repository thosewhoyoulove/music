<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-15 15:07:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-10 20:04:56
-->
<script setup lang="ts">
import { getUserFolloweds, getUserFollows } from "~/api/user";
const route = useRoute();
const router = useRouter()
const uid = parseInt(route.query.id as string);
const choice = ref(["关注", "粉丝"]);
const active = ref(Number(route.query.active));
const followsList:any = ref([]);
const followedList:any = ref([]);
onMounted(async () => {
  if (active.value == 1) {
    const res = await getUserFolloweds(uid);
    console.log(res, "粉丝列表");
    followedList.value = res.followeds;
  } else if (active.value == 0) {
    const res = await getUserFollows(uid);
    console.log(res, "关注列表");
    followsList.value = res.follow;
  }
  console.log(uid, "uid");
});
const tabChange = async () => {
  if (active.value == 1) {
    const res = await getUserFolloweds(uid);
    console.log(res, "粉丝列表");
    followedList.value = res.followeds;
  } else if (active.value == 0) {
    const res = await getUserFollows(uid);
    console.log(res, "关注列表");
    followsList.value = res.follow;
  }
};
//跳转歌手主页
const toArtistDetail = (item:any) => {
  console.log(item);
  router.push({
    path: "/Artist",
    query: {
      artistId: item.userId
    },
  });
};
</script>

<template>
  <div>
    <van-tabs v-model:active="active" @click-tab="tabChange" class="pb-20" sticky>
      <van-tab v-for="(item, index) in choice" :key="index" :title="item">
        <div
          v-for="(item, index) in followsList"
          v-show="active == 0"
          :key="index"
          class="flex w-100%"
          @click="toArtistDetail(item)"
        >
          <div class="relative">
            <img class="rounded-full w-11 h-11 m-2" :src="item.avatarUrl" alt="" />
            <img
              v-if="item?.avatarDetail?.identityIconUrl"
              class="w-5 h-5 absolute rounded-full left-10 bottom-1 "
              :src="item?.avatarDetail?.identityIconUrl"
              alt=""
            />
          </div>
          <div class="col h-10 w-15.625rem text-left ml-3 mt-3">
            <div class="text-sm">
              {{ item.nickname }}
            </div>
            <div class="text-style text-10px">
              {{ item.signature }}
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in followedList"
          v-show="active == 1"
          :key="index"
          class="flex w-100%"
        >
          <div class="relative">
            <img class="rounded-full w-11 h-11 m-2" :src="item.avatarUrl" alt="" />
            <img
              v-if="item?.avatarDetail?.identityIconUrl"
              class="w-5 h-5 absolute rounded-full left-10 bottom-1"
              :src="item?.avatarDetail?.identityIconUrl"
              alt=""
            />
          </div>
          <div class="col h-10 w-15.625rem text-left ml-3 mt-3">
            <div class="text-sm">
              {{ item.nickname }}
            </div>
            <div class="text-style text-10px">
              {{ item.signature }}
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
