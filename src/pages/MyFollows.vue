<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-15 15:07:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-11-09 18:04:13
-->
<script setup lang="ts">
import { getUserFolloweds, getUserFollows } from "~/api/user";
const route = useRoute();
const router = useRouter();
const uid = parseInt(route.query.id as string);
const choice = ref(["关注", "粉丝"]);
const active = ref(Number(route.query.active));
const followsList: any = ref([]);
const followedList: any = ref([]);
let listLoading = ref(false);
onMounted(async () => {
  if (active.value == 1) {
    const res = await getUserFolloweds(uid);
    console.log(res, "粉丝列表");
    followedList.value = res.followeds;
    listLoading.value = true;
  } else if (active.value == 0) {
    const res = await getUserFollows(uid);
    console.log(res, "关注列表");
    followsList.value = res.follow;
    listLoading.value = true;
  }
  console.log(uid, "uid");
});
const tabChange = async () => {
  listLoading.value = false;
  if (active.value == 1) {
    const res = await getUserFolloweds(uid);
    console.log(res, "粉丝列表");
    followedList.value = res.followeds;
    listLoading.value = true;
  } else if (active.value == 0) {
    const res = await getUserFollows(uid);
    console.log(res, "关注列表");
    followsList.value = res.follow;
    listLoading.value = true;
  }
};
//跳转歌手主页,暂时不能通过用户id跳转到歌手主页
const toArtistDetail = (item: any) => {
  console.log(item);
  // router.push({
  //   path: "/Artist",
  //   query: {
  //     artistId: item.userId,
  //   },
  // });
};
</script>

<template>
  <div>
    <van-tabs v-model:active="active" @click-tab="tabChange" class="pb-20" sticky>
      <van-tab v-for="(item, index) in choice" :key="index" :title="item">
        <van-loading
          v-show="!listLoading"
          color="#666"
          type="spinner"
          class="mt-5"
          size="24px"
          vertical
        >
          加载中...
        </van-loading>
        <div
          v-for="(item, index) in followsList"
          v-show="active == 0"
          :key="index"
          class="flex w-100vw"
          @click="toArtistDetail(item)"
        >
          <div class="relative">
            <img class="rounded-full w-15 h-15 m-3" :src="item.avatarUrl" alt="" />
            <img
              v-if="item?.avatarDetail?.identityIconUrl"
              class="w-5 h-5 absolute rounded-full left-12 bottom-1.5"
              :src="item?.avatarDetail?.identityIconUrl"
              alt=""
            />
          </div>
          <div
            class="col h-13 w-100vw max-w-80vw text-left ml-3 mt-5 border-b border-hex-f5f5f5"
          >
            <div v-if="item.remarkName" class="text-sm">
              {{ item.remarkName }}
            </div>
            <div v-else class="text-sm">
              {{ item.nickname }}
            </div>
            <div class="text-style text-xs mt-2">
              {{ item.signature }}
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in followedList"
          v-show="active == 1"
          :key="index"
          class="flex w-100vw"
        >
          <div class="relative">
            <img class="rounded-full w-15 h-15 m-3" :src="item.avatarUrl" alt="" />
            <img
              v-if="item?.avatarDetail?.identityIconUrl"
              class="w-5 h-5 absolute rounded-full left-12 bottom-1.5"
              :src="item?.avatarDetail?.identityIconUrl"
              alt=""
            />
          </div>
          <div
            class="col h-13 w-100vw max-w-80vw text-left ml-3 mt-5 border-b border-hex-f5f5f5"
          >
            <div v-if="item.remarkName" class="text-sm">
              {{ item.remarkName }}
            </div>
            <div v-else class="text-sm">
              {{ item.nickname }}
            </div>
            <div class="text-style text-xs mt-2">
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
