<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-19 20:52:39
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-21 10:41:02
-->
<script setup lang="ts">
import { getFm, deleteFm } from "~/api/FM";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const playListIndex = ref(0);
const state = reactive({
  playList: [
    {
      album: {
        blurPicUrl:
          "https://p2.music.126.net/D-mpVLLwMrA-hPu0QPYUNQ==/109951163551410648.jpg",
        id: 73326637,
        name: "中国新说唱 第10期",
        pic: 109951163551410660,
        picUrl:
          "https://p2.music.126.net/D-mpVLLwMrA-hPu0QPYUNQ==/109951163551410648.jpg",
        pic_str: "109951163551410648",
      },
      name: "飘向北方 (Live)",
      id: 1308818967, //歌曲id
      artists: [
        { id: 12514278, name: "那吾克热-NW" },
        { id: 13058503, name: "尤长靖" },
      ],
    },
  ],
});
onMounted(async () => {
  store.isFooterShow = false;
  let FmRes = await getFm();
  state.playList = FmRes.data;
});
// 下一首上一首操作
const goPlay = (num: number) => {
  console.log("点击了切换歌曲");
  // 如果是第一首，上一首应该是最后一首
  // 如果是最后一首，下一首应该是第一首
  let index = playListIndex.value + num;
  console.log(playListIndex.value, num, index);
  if (index < 0) index = state.playList.length - 1;
  else if (index == state.playList.length) index = 0;
  playListIndex.value = index;
};
const deleteFmItem = async (id) => {
  console.log(state.playList[playListIndex.value].id);

  let res = await deleteFm(state.playList[playListIndex.value].id); //加入到垃圾箱
  if (playListIndex.value == state.playList.length - 1) {
    console.log("去除了最后一位");

    state.playList.splice(playListIndex.value, 1);
    playListIndex.value--;
  } else {
    state.playList.splice(playListIndex.value, 1); //从当前歌单列表删除
  }

  console.log(res);

  console.log(state.playList);
};
watch(
  () => state.playList.length,
  async (newVal) => {
    if (newVal == 1) {
      console.log("清除完了");
      let FmRes = await getFm();
      state.playList = state.playList.concat(FmRes.data); //还剩一个数据的时候就直接请求新数据然后将新数据跟旧数据连接起来
      console.log("执行了");
    }
  }
);
</script>

<template>
  <img
    class="absolute -z-1 blur-3xl h-100% w-100% bg-pink brightness-50"
    :src="state.playList[playListIndex]?.album.blurPicUrl"
    alt="背景虚化"
  />
  <div class="w-100vw relative">
    <div class="text-lg text-hex-eef pt-5">私人FM</div>
    <img
      class="absolute inline-block w-17.5rem h-17.5rem rounded-lg top-4.375rem left-50% -translate-x-1/2"
      :src="state.playList[playListIndex]?.album.picUrl"
      alt=""
    />
    <div
      class="col absolute left-55% -translate-x-1/2 top-22.375rem z-10 w-100% text-left"
    >
      <div class="text-xs my-1 text-hex-fff">
        {{ state.playList[playListIndex]?.name }}
      </div>
      <!-- 艺人名字 -->
      <div
        class="flex items-center my-1"
        v-for="(item, index) in state.playList[playListIndex]?.artists"
        :key="index"
      >
        <div class="text-10px text-hex-ccc x-1">{{ item.name }}</div>
        <div class="text-10px text-hex-aaa">
          <van-icon color="#fff" name="arrow"></van-icon>
        </div>
      </div>
    </div>
    <div class="absolute top-29.125rem left-50% -translate-x-1/2">
      <audio
        ref="audio"
        loop
        controls
        :src="` https://music.163.com/song/media/outer/url?id=${state.playList[playListIndex]?.id}.mp3`"
      />

      <div class="flex absolute w-100% -bottom-17 justify-around items-center">
        <div>
          <van-icon color="#fff" name="like-o" />
        </div>
        <div @click="deleteFmItem(id)">
          <van-icon color="#fff" name="delete-o" />
        </div>
        <div class="text-10px" @click="goPlay(-1)">
          <van-button
            size="small"
            style="background: transparent; border-width: 0"
            type="primary"
            >上一首</van-button
          >
        </div>
        <div class="text-10px" @click="goPlay(1)">
          <van-button
            size="small"
            style="background: transparent; border-width: 0"
            type="primary"
            >下一首</van-button
          >
        </div>
        <div>
          <van-icon color="#fff" name="comment-o" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
