<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-28 16:18:24
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-28 21:06:00
-->
<template>
  <div class="bg-hex-ddd" style="min-height: calc(100vh - 1px)">
    <van-list
      v-model:loading="listLoading"
      :finished="finished"
      @load="onLoad"
      direction="down"
      class="p-2 pb-20 flex flex-col-reverse overflow-scroll"
    >
      <div v-for="(item, index) in msgs" :key="index" class="w-100%">
        <div class="scale-50">{{ formatMsToDate(item.time) }}</div>
        <div :class="[item?.fromUser?.userId == id ? 'avatar-right' : 'avatar-left']">
          <img class="w-7 h-7 rounded-full" :src="item?.fromUser?.avatarUrl" alt="" />
          <div
            style="
              position: relative;
              font-size: 0.75rem;
              word-break: break-all;
              --tw-bg-opacity: 1;
              background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
              border-radius: 0.5rem;
              width: auto;
              max-width: 77vw;
              margin-bottom: 1.5rem;
              word-break: break-all;
            "
            :class="[item?.fromUser?.userId == id ? 'word-right' : 'word-left']"
          >
            <div
              :class="[item?.fromUser?.userId == id ? 'sharp-right' : 'sharp-left']"
            ></div>
            <div class="mx-1 my-1 px-1">
              {{ JSON.parse(item?.msg)?.msg }}
            </div>
          </div>
        </div>
      </div></van-list
    >
    <div class="fixed mr-1.7 right-4px bottom-42px" @click="toBottom">
      <van-icon size="10px" name="arrow-down" />
    </div>
  </div>
  <div class="bg-hex-fff h-8vh fixed bottom-0 w-100% flex justify-between items-center">
    <van-field
      v-model="message"
      clearable
      placeholder="发送消息"
      @keyup.enter="sendAMessage(message, uid)"
    />
    <van-icon class="mx-2" name="add-o" />
    <div @click.enter="sendAMessage(message, uid)" class="text-left text-xs flex w-10">
      发送
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
import { getUserAcount } from "~/api/user";
import { getMsgDetail, sendMsg } from "~/api/message";
const store = useStore();
const { isFooterShow } = storeToRefs(store);
const route = useRoute();
let uid = parseInt(route.query.uid as any); //对方id
//通过判断自己的id与发消息的id是否一致来判断左边还是右边
let id = ref(0); //自己id
let limit = ref(10);
let msgs: any = ref([] as any[]); //所有的消息数组
let more: any = ref(false);
const listLoading = ref(false); //下拉刷新加载提示
const finished = ref(false); //是否结束
let message = ref("");
let avatarUrl = ref("");
onMounted(async () => {
  isFooterShow.value = false;

  let res = await getUserAcount();
  console.log(res, "用户信息");
  id.value = res.profile.userId;
  avatarUrl.value = res.profile.avatarUrl;
  let res2 = await getMsgDetail(uid, limit.value);
  window.scrollTo({
    top: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
    behavior: "smooth",
  });
  console.log(JSON.parse(res2.msgs[0].msg).msg);
  console.log(res2, "新加载的");
  msgs.value = res2.msgs;
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
    const oDay = oDate.getDay();
    const oHour = oDate.getHours();
    const oMinute = oDate.getMinutes();
    const oTime = `${oYear}年${addZero(oMonth)}月${addZero(oDay)}日 ${addZero(
      oHour
    )}:${addZero(oMinute)}`;
    return oTime;
  } else {
    return "";
  }
};
const onLoad = async () => {
  //最开始自动加载
  console.log("进入了加载");
  limit.value += 10;
  let res = await getMsgDetail(uid, limit.value);
  console.log(JSON.parse(res.msgs[0].msg).msg);
  console.log(res, "新加载的");
  msgs.value = res.msgs;
  more.value = res.more;
  listLoading.value = false;
  if (more.value == false) {
    finished.value = true;
  }
};
const toBottom = () => {
  window.scrollTo({
    top: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
    behavior: "smooth",
  });
};
const sendAMessage = async (msg: any, uid: any) => {
  message.value = "";
  console.log(msg, uid);
  let res = await sendMsg(uid, msg);

  console.log(res, "发消息");

  nextTick(() => {
    msgs.value.unshift(res.newMsgs[0]);
  });
  console.log(msgs.value);
};
</script>

<style lang="css" scoped>
/* .space {
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
  justify-items: first baseline;
} */
.sharp-left {
  position: absolute;
  margin-left: 2rem;
  top: 6px;
  left: -40px;
  border-width: 4px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
}
.sharp-right {
  position: absolute;
  top: 6px;
  right: -8px;
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent transparent#fff;
}
.avatar-left {
  display: flex;
}
.avatar-right {
  display: flex;
  flex-direction: row-reverse;
}
.word-left {
  text-align: left;
  margin-left: 0.5rem;
}
.word-right {
  text-align: right;
  margin-right: 0.5rem;
}
</style>
