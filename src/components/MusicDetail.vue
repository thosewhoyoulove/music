<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-31 10:52:32
-->
<template>
  <div class="w-100% h-604px">
    <img
      class="absolute -z-1 blur-3xl h-100% w-100%"
      :src="props?.musicList?.al?.picUrl"
      alt=""
    />
    <div class="flex justify-between mt-5 px-2">
      <div @click="back" class="text-xl text-hex-ccc">
        <van-icon name="arrow-left" />
      </div>
      <div class="col mr-15 py-2">
        <Vue3Marquee class="text-sm my-2 text-hex-ccc w-30">
          {{ props?.musicList?.name }}
        </Vue3Marquee>
        <div
          class="flex items-center"
          v-for="(item, index) in props?.musicList?.ar"
          :key="index"
        >
          <div class="text-xs text-hex-ccc px-1">{{ item.name }}</div>
          <div class="text-xs text-hex-aaa">
            <van-icon color="#fff" name="arrow" />
          </div>
        </div>
      </div>
      <div class="text-xl text-hex-ccc"><van-icon name="share-o" /></div>
    </div>
    <img
      class="al-img rounded-1/2 w-50 h-50"
      :src="props?.musicList?.al?.picUrl"
      alt=""
    />
    <div class="flex justify-around mt-320px text-xl items-center">
      <span><van-icon name="like-o" /></span>
      <span style="transform: rotate(180deg)"><van-icon name="upgrade" /></span>
      <span><van-icon name="close" /></span>
      <span @click="toCommentDetail" class="relative"
        ><van-icon name="comment-o" /><van-badge
          class="absolute top-6px -right-3"
          style="background: transparent; border-width: 0"
          color="#ccc"
          :content="200"
          max="99"
        ></van-badge
      ></span>
      <span style="transform: rotate(90deg)"><van-icon name="ellipsis" /></span>
    </div>
    <div>
      <van-field
        class="bg-transparent"
        type="range"
        min="0"
        :max="store.duration"
        v-model="store.currentTime"
        step="0.05"
      />
    </div>
    <div class="flex justify-around mt-80px text-xl items-center">
      <span><van-icon name="replay" /></span>
      <span @click="goPlay(-1)"><van-icon name="arrow-left" /></span>
      <span v-if="isShow" @click="playMusic" class="text-3xl"
        ><van-icon name="play-circle-o"
      /></span>
      <span v-else @click="pauseMusic" class="text-3xl"
        ><van-icon name="pause-circle-o"
      /></span>
      <span @click="goPlay(1)"><van-icon name="arrow" /></span>
      <span><van-icon name="bars" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const router = useRouter();
const store = useStore();
const { playList, playListIndex } = storeToRefs(store);
const props = defineProps<{
  musicList: Object;
  playMusic: Function;
  pauseMusic: Function;
  addDuration: Function;
}>();
let { isShow, isDetailShow } = storeToRefs(store);
onMounted(() => {
  console.log(props.musicList);
  props.addDuration();
});
const back = () => {
  isDetailShow.value = false;
  console.log(111111111111111);
};
const toCommentDetail = () => {
  isDetailShow.value = false;
  router.push({
    path: "/SongComment",
    query: {
      id: playList.value[playListIndex.value].id,
    },
  });
};
// 下一首上一首操作
const goPlay = (num) => {
  let index = playListIndex.value + num;
  if (index < 0) {
    index = playList.value.length - 1;
  } else if (index === playList.value.length) {
    index = 0;
  }
  store.updateplayListIndex(index);
};
</script>

<style scoped>
.al-img {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.van-badge--top-right {
  top: 6px;
  right: -5px;
  color: #003248;
}
</style>