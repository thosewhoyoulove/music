<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-31 10:38:55
-->
<template>
  <div
    class="
      w-100%
      h-20vw
      bottom-0
      fixed
      items-center
      justify-between
      mx-2
      bg-white
      border-t border-hex-ccc
      flex
    "
  >
    <span class="flex items-center" @click="toMusicDetail">
      <img
        class="w-3rem h-3rem rounded"
        :src="playList[playListIndex].al.picUrl"
        alt=""
      />
      <span class="px-2">{{ playList[playListIndex].name }}</span>
    </span>
    <span class="flex pr-1.5rem">
      <span v-if="isShow" @click="playMusic" class="text-lg px-2"
        ><van-icon name="play-circle-o"
      /></span>
      <span v-else @click="pauseMusic" class="text-lg px-2"
        ><van-icon name="pause-circle-o"
      /></span>
      <span class="text-xl"><van-icon name="bars" /></span>
    </span>
    <audio
      ref="audio"
      loop
      autoplay
      :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
  </div>
  <van-popup
    v-model:show="isDetailShow"
    position="right"
    :style="{ height: '100%', width: '100%' }"
  >
    <music-detail
      :musicList="playList[playListIndex]"
      :playMusic="playMusic"
      :pauseMusic="pauseMusic"
      :addDuration="addDuration"
    ></music-detail>
  </van-popup>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const audio = ref(null); //获取audio属性
const store = useStore();
const {
  lyric,
  playList,
  playListIndex,
  isShow,
  isDetailShow,
  duration,
  currentTime,
} = storeToRefs(store);
onMounted(() => {
  store.getLyric(playList.value[playListIndex.value]?.id);
  console.log(lyric, "----------");
});

const playMusic = () => {
  audio.value.play();
  isShow.value = !isShow.value;
  store.updateIsShow(store.$state, isShow.value);
};
const pauseMusic = () => {
  audio.value.pause();
  isShow.value = !isShow.value;
  store.updateIsShow(store.$state, isShow.value);
};
watch(playListIndex, () => {
  if (audio?.value?.paused) {
    isShow.value = false;
    console.log(111);
  }
});
const toMusicDetail = () => {
  store.updateDetailShow(store.$state);
};
const addDuration = () => {
  store.updateDuration(store.$state, audio?.value?.duration);
};
onUpdated(() => {
  store.getLyric(playList.value[playListIndex.value]?.id); //获取对应歌曲的歌词
  addDuration();
});
</script>

