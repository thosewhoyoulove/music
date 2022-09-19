<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-19 20:52:39
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-19 21:43:44
-->
<script setup lang="ts">
import { getFm } from "~/api/fm";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const playListIndex = ref(0);
const state = reactive({
  playList: [
    {
      album: {
        id: 73326637,
        name: "中国新说唱 第10期",
        pic: 109951163551410660,
        picUrl:
          "https://p2.music.126.net/D-mpVLLwMrA-hPu0QPYUNQ==/109951163551410648.jpg",
        pic_str: "109951163551410648",
      },
      name: "飘向北方 (Live)",
      id: 1308818967, //歌曲id
      ar: [
        { id: 12514278, name: "那吾克热-NW" },
        { id: 13058503, name: "尤长靖" },
      ],
    },
  ],
});
onMounted(async () => {
  let FmRes = await getFm();
  state.playList = FmRes.data;
  console.log(FmRes);
});
// 下一首上一首操作
const goPlay = (num) => {
  console.log("点击了切换歌曲");
  // 如果是第一首，上一首应该是最后一首
  // 如果是最后一首，下一首应该是第一首
  let index = playListIndex.value + num;
  if (index < 0) index = state.playList.length - 1;
  else if (index == state.playList.length) index = 0;
  playListIndex.value = index;
};
</script>

<template>
  <div class="w-95vw">
    私人FM
    <img
      class="inline-block w-20 h-20 rounded-lg mt-30 left-20% -translate-x-1/2"
      :src="state.playList[playListIndex]?.album.picUrl"
      alt=""
    />
    <audio
      ref="audio"
      loop
      controls
      :src="` https://music.163.com/song/media/outer/url?id=${state.playList[playListIndex]?.id}.mp3`"
    />

    <div class="flex justify-around">
      <div @click="goPlay(-1)">
        <van-button>上一首</van-button>
      </div>
      <div @click="goPlay(-1)">
        <van-button>下一首</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
