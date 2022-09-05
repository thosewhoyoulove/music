<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-05 18:30:38
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
        :src="playList[playListIndex]?.al?.picUrl"
        alt=""
      />
      <Vue3Marquee class="text-sm my-2 px-2 w-30">
          {{ playList[playListIndex]?.name }}
        </Vue3Marquee>
    </span>
    <span class="flex pr-1.5rem">
      <span v-if="isShow" @click="play" class="text-lg px-2"
        ><van-icon name="play-circle-o"
      /></span>
      <span v-else @click="play" class="text-lg px-2"
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
      :play="play"
      :addDuration="addDuration"
    ></music-detail>
  </van-popup>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const audio = ref(null); //获取audio属性
const store = useStore();
let interVal = ref(0)//设置定时器
const {
  lyricList,
  playList,
  playListIndex,
  isShow,
  isDetailShow
} = storeToRefs(store);
onMounted(() => {
  store.getLyric(playList.value[playListIndex.value]?.id);
  // 渲染的时候也需要同步歌词时间
  updateTime()
  // console.log(lyricList, "----------");
  console.log(audio,'1111111111111111111');
  
});//开始获取歌词
const updateTime = () => {
  interVal = setInterval(() => { store.updateCurrentTime(store.$state,audio.value?.currentTime) }, 50)
}
const play = () => {
  /* 判断是否已暂停 */
  if (audio.value.paused) {
    /* 调用audio的播放功能方法 */
    audio.value.play()
    // 让其显示播放按钮
    store.updateIsShow(store.$state, false);
    // 触发定时器
    updateTime()
  } else {
    /* 调用暂停方法 */
    audio.value.pause()
    // 让其隐藏播放按钮
    store.updateIsShow(store.$state, true);
    // 清除定时器
    clearInterval(interVal)
  }
}

const toMusicDetail = () => {
  store.updateDetailShow(store.$state);
};
const addDuration = () => {
  store.updateDuration(store.$state, audio?.value?.duration);
};
onUpdated(() => {
  /* 将id传给获取歌词的方法 */
  store.getLyric(store.playList[store.playListIndex].id)
  // 渲染的时候也需要同步歌词时间
  updateTime()
  addDuration()
})


</script>

