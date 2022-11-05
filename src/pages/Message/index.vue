<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-25 20:46:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-28 19:55:46
-->
<template>
  <van-list v-model:loading="listLoading" :finished="finished" @load="onLoad" class="pb-3"
    ><div
      v-for="(item, index) in msgs"
      :key="index"
      class="flex w-100vw px-3"
      @click="toMsgDetail(item, index)"
    >
      <div class="relative">
        <img class="rounded-full w-15 h-15 m-3" :src="item?.fromUser?.avatarUrl" alt="" />
        <img
          v-if="item?.fromUser?.avatarDetail?.identityIconUrl"
          class="w-5 h-5 absolute rounded-full left-12 bottom-1.5"
          :src="item?.fromUser?.avatarDetail?.identityIconUrl"
          alt=""
        />
      </div>
      <div
        class="col h-15 w-100% text-left ml-4 mt-4 relative border-b border-hex-f5f5f5"
      >
        <div class="flex max-w-60vw text-style">
          <div v-if="item.fromUser.remarkName" class="text-sm">
            {{ item.fromUser.remarkName }}
          </div>
          <div v-else class="text-sm">
            {{ item.fromUser.nickname }}
          </div>
          <div class="text-xs absolute top-0 right-0">
            {{ formatMsToDate(item.lastMsgTime) }}
          </div>
          <div
            v-if="item.newMsgCount !== 0"
            class="flex bg-hex-f00 text-hex-fff scale-60 rounded-full w-6 text-center absolute bottom-3 right-5"
          >
            <div class="w-100% text-center">{{ item.newMsgCount }}</div>
          </div>
        </div>

        <div class="text-style text-xs mt-4 max-w-60vw text-hex-ccc">
          {{ JSON.parse(item.lastMsg).msg }}
        </div>
      </div>
    </div></van-list
  >
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
import { getPrivateMsg } from "~/api/message";
const store = useStore();
const router = useRouter();
const { isFooterShow } = storeToRefs(store);
const listLoading = ref(false); //下拉刷新加载提示
const finished = ref(false); //是否结束
let msgs: any = ref([]); //所有的消息数组
let limit = ref(10);
let more: any = ref(false);
onBeforeMount(async () => {
  isFooterShow.value = false;
  console.log(msgs.value);
});
//注册时间
const addZero = (num: any) => {
  if (parseInt(num) < 10) num = `0${num}`;
  return num;
};
//格式化时间
const formatMsToDate = (ms: any) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDate();
    const oTime = `${oYear}年${addZero(oMonth)}月${addZero(oDay)}日`;
    return oTime;
  } else {
    return "";
  }
};
const onLoad = async () => {
  //最开始自动加载
  console.log("进入了加载");
  limit.value += 10;
  let res = await getPrivateMsg(limit.value);
  console.log(res, "新加载的");
  msgs.value = res.msgs;
  more.value = res.more;
  listLoading.value = false;
  if (more.value == false) {
    finished.value = true;
  }
};
const toMsgDetail = (item: any, index: any) => {
  console.log(index, "第几项");
  console.log(msgs.value);
  // newMsgCount = 0;
  Object.defineProperty(msgs.value[index], "newMsgCount", {
    value: 0,
    writable: true,
  });
  console.log(msgs.value[index]);
  router.push({
    path: "Message/msgDetail",
    query: {
      uid: item.fromUser.userId,
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
<route lang="yaml">
meta:
  layout: default
  title: 我的私信
</route>
