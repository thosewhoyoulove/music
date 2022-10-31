<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-31 21:05:38
-->
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
import { Notify } from "vant";
import { type } from "os";
const audio = ref<
  HTMLElement & {
    paused: boolean;
    pause: () => void;
    play: () => void;
    currentTime: number;
    duration: number;
  }
>(); // 获取audio属性
let myAudio: any = ref(null);
const store = useStore();
let interVal = ref<any>(); // 设置定时器
const {
  playList,
  playListIndex,
  isShow,
  isDetailShow,
  shouldNext,
  isPlayListShow,
} = storeToRefs(store);
onMounted(async () => {
  store.getLyric(playList.value[playListIndex.value]?.id);
  myAudio.value = document.getElementById("myAudio");
  console.log(myAudio.value.currentTime, "myAudio");
  console.log(audio.value?.currentTime);
  // let res = await isMusicAvailable(playList.value[playListIndex.value]?.id);
}); // 开始获取歌词

//这个是用来动态更改歌曲时间
const timeupdate = (e: any) => {
  store.currentTime = e.target.currentTime;
};
//当发生错误的时候，自动将playListIndex加1，跳转到能够正常播放的歌曲再停下来
const onError = (Event: any) => {
  console.log(Event.type, "发生错误了");
  if (Event.type === "error") {
    nextTick(() => {
      store.updatePlayListIndex(++store.playListIndex);
    });
    console.log(store.playListIndex, "当前歌曲的index");
  }
  // shouldNext.value = true;
  // Notify({ type: "primary", message: "当前歌曲为VIP专享音乐，即将播放下一首" });
  // store.updatePlayListIndex(store.playListIndex++);
  // store.currentTime = 0;
};
const play = () => {
  /* 判断是否已暂停 */
  if (audio.value && audio.value.paused) {
    // console.log('点击了播放')
    store.currentTime = audio.value.currentTime;
    /* 调用audio的播放功能方法 */
    audio.value.play();
    // 让其显示播放按钮
    store.updateIsShow(store.$state, false);
    // 触发定时器
    // updateTime();
  } else if (audio.value && !audio.value.paused) {
    // console.log(audio);
    store.updateCurrentTime(audio.value.currentTime);
    /* 调用暂停方法 */
    audio.value.pause();
    // 让其隐藏播放按钮
    store.updateIsShow(store.$state, true);
    // 清除定时器
    clearInterval(interVal.value);
  }
};

const toMusicDetail = () => {
  store.updateDetailShow(store.$state);
};
const addDuration = () => {
  if (audio.value) {
    store.updateDuration(store.$state, audio.value.duration);
  }
};
onUpdated(() => {
  /* 将id传给获取歌词的方法 */
  store.getLyric(store.playList[store.playListIndex]?.id);
  // 渲染的时候也需要同步歌词时间
  addDuration();
});
</script>

<template>
  <div
    class="w-100vw h-5rem bottom-0 fixed items-center justify-between bg-white flex px-1"
  >
    <div class="flex items-center" @click="toMusicDetail">
      <div
        :class="[isShow ? 'animate-spin-paused' : 'animate-spin-active']"
        style="
          position: relative;
          width: 2.7rem;
          height: 2.7rem;
          background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
          --tw-bg-opacity: 1;
          border-radius: 9999px;
        "
      >
        <img
          class="w-2rem h-2rem rounded-full absolute z-10 left-50% top-50% -translate-x-1/2 -translate-y-1/2"
          :src="playList[playListIndex]?.al?.picUrl"
          alt="这是底部播放组件专辑的封面"
        />
      </div>
      <Vue3Marquee class="text-xs my-2 px-2 w-30">
        {{ playList[playListIndex]?.name }}
      </Vue3Marquee>
    </div>
    <div class="flex pr-1.5rem">
      <div v-if="isShow" class="text-lg mx-2" @click="play">
        <van-icon size="1.8rem" name="play-circle-o" />
      </div>
      <div v-if="!isShow" class="text-lg mx-2" @click="play">
        <van-icon size="1.8rem" name="pause-circle-o" />
      </div>
      <div @click="isPlayListShow = true" class="text-xl">
        <van-icon size="1.8rem" name="bars" />
      </div>
    </div>
    <audio
      ref="audio"
      id="myAudio"
      loop
      @error="onError"
      @timeupdate="timeupdate"
      :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    />
  </div>
  <van-popup
    v-model:show="isDetailShow"
    position="right"
    :style="{ height: '100%', width: '100%' }"
  >
    <music-detail
      :music-list="playList[playListIndex]"
      :play="play"
      :myAudio="myAudio"
      :add-duration="addDuration"
      :onError="onError"
    />
  </van-popup>
</template>
<style scoped>
@keyframes rotate_ar {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}

.animate-spin-active {
  animation: rotate_ar 10s linear infinite;
  animation-play-state: running;
}
.animate-spin-paused {
  animation: rotate_ar 10s linear infinite;
  animation-play-state: paused;
}
</style>
