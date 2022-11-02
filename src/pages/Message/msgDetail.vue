<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-28 16:18:24
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-31 20:21:25
-->
<template>
  <div class="bg-hex-F5F5F5" style="height: 100vh">
    <van-list
      v-model:loading="listLoading"
      :finished="finished"
      @load="onLoad"
      direction="down"
      :immediate-check="false"
      id="listContainer"
      class="px-2 flex flex-col-reverse overflow-scroll h-92vh pt-30"
    >
      <div v-for="(item, index) in msgs" :key="index" class="w-100%">
        <div class="scale-50">{{ formatMsToDate(item.time) }}</div>
        <div :class="[item?.fromUser?.userId == id ? 'avatar-right' : 'avatar-left']">
          <img
            @click="toArtistDetail(item)"
            class="w-7 h-7 rounded-full"
            :src="item?.fromUser?.avatarUrl"
            alt=""
          />
          <div
            style="
              position: relative;
              font-size: 0.75rem;
              word-break: break-all;
              --tw-bg-opacity: 1;
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
  </div>
  <div class="bg-hex-fff h-8vh fixed bottom-0 w-100% flex justify-between items-center">
    <van-field
      @focus="toBottom"
      v-model="message"
      clearable
      placeholder="发送消息"
      @keyup.enter="sendAMessage(message, uid)"
    >
      <template class="flex items-center" #button>
        <van-icon class="mx-2 flex items-center" name="add-o" />
        <van-button
          @click="sendAMessage(message, uid)"
          class="flex items-center"
          :disabled="disabled"
          size="mini"
          :hairline="false"
          >发送</van-button
        >
      </template></van-field
    >
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
import { getUserAccount } from "~/api/user";
import { getMsgDetail, sendMsg } from "~/api/message";
const store = useStore();
const { isFooterShow } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
let uid = parseInt(route.query.uid as any); //对方id
//通过判断自己的id与发消息的id是否一致来判断左边还是右边
let disabled = ref(true);
let id = ref(0); //自己id
let limit = ref(30);
let msgs: any = ref([] as any[]); //所有的消息数组
let more: any = ref(false);
const listLoading = ref(false); //下拉刷新加载提示
const finished = ref(false); //是否结束
let message = ref("");
let listContainer: any = null; //获取van-list的元素对象，然后用来跳转到最底部
onMounted(async () => {
  isFooterShow.value = false;
  listContainer = document.getElementById("listContainer");
  toBottom();
  let res = await getUserAccount();
  console.log(res, "用户信息");
  id.value = res.profile.userId;

  let res2 = await getMsgDetail(uid, limit.value);
  console.log(JSON.parse(res2.msgs[0].msg).msg);
  console.log(res2, "新加载的");
  msgs.value = res2.msgs;
  onLoad();
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
  limit.value += 5;
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
const sendAMessage = async (msg: any, uid: any) => {
  toBottom();
  message.value = "";
  console.log(msg, uid);
  let res = await sendMsg(uid, msg);

  console.log(res, "发消息");

  nextTick(() => {
    msgs.value.unshift(res.newMsgs[0]);
  });
  console.log(msgs.value);
};
//跳转歌手主页,跳转不了，没有歌手id，只有歌手的userId
const toArtistDetail = (item: any) => {
  console.log(item);
  // router.push({
  //   path: "/Artist",
  //   query: {
  //     artistId: item.fromUser.userId,
  //   },
  // });
};
//filed获取焦点以及发送消息的时候跳转到最底部
const toBottom = () => {
  console.log("回到了最底部");

  listContainer.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
watch(
  () => message.value,
  (newVal) => {
    if (newVal.length !== 0) {
      disabled.value = false;
      console.log(disabled.value);
    } else {
      disabled.value = true;
    }
  }
);
</script>

<style lang="css" scoped>
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
  border-color: transparent transparent transparent#6495ED;
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
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.word-right {
  color: #fff;
  text-align: right;
  margin-right: 0.5rem;
  background-color: rgba(100, 149, 237, var(--tw-bg-opacity));
}
:deep(.van-field__button) {
  display: flex;
  align-items: center;
}
:deep(.van-button--default) {
  border: 0 solid #fff;
}
</style>
