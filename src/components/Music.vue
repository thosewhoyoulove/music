<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 20:03:07
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-05 18:37:49
-->
<template>
  <div class="w-100% h-5rem p-.2rem">
    <div
      class="flex justify-between items-center mt-2 w-100% h-1.8rem mb-.2rem"
    >
      <div class="font-900">推荐歌单</div>
      <div
        class="text-13px border border-hex-bbb pl-2.5 pr-1.5 rounded-xl pt-.5"
      >
        查看更多<van-icon name="arrow" />
      </div>
    </div>
    <div class="w-100% h-14.5rem">
      <van-swipe
        class="h-100%"
        :loop="false"
        :width="130"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="item in state.musicList"
          :key="item"
          @click="toMusicDetail(item.id)"
        >
          <div class="relative">
            <img class="h-8rem m-1 rounded-xl p-1" :src="item.picUrl" alt="" />
            <div class="music-name text-left text-13px px-1">
              {{ item.name }}
            </div>
            <span class="play-icon text-12px px-2 py-0.5 rounded-xl absolute">
              <span><van-icon name="play-circle-o" /></span>
              <span class="mx-1">{{ filter(item.playCount) }}</span>
            </span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import getRecommendSongList from "~/api/RecommendSongList";
const router = useRouter();
let state = reactive({
  musicList: [],
});
onMounted(async () => {
  let res = await getRecommendSongList();
  console.log(res.data.result);
  state.musicList = res.data.result;
});
const filter = (num) => {
  if (num > 100000000) return (num / 100000000).toFixed(0) + "亿";
  else if (num > 10000) return (num / 10000).toFixed(0) + "万";
};
const toMusicDetail = (id) => {
  router.push({
    path: "/MusicListDetail",
    query: {
      id: id,
    },
  });
};
</script>

<style scoped>
.more {
  line-height: 1.8rem;
}
.music-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.play-icon {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  top: 10px;
  right: 5px;
}
</style>