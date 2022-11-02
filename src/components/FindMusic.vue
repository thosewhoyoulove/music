<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 20:03:07
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-12 14:31:39
-->
<script setup lang="ts">
import getFindSongList from "~/api/RecommendSongList";
const router = useRouter();
const loading = ref(true);
// 定义歌单列表
let playListSet: any = reactive({
  state: [],
});

onMounted(async () => {
  const res = await getFindSongList();
  console.log(res.result, "components/FindMusic....res.result");
  playListSet.state = res.result;
  console.log(playListSet, "playListSet");

  loading.value = false;
});
const transform = (num: number) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(0)}万`;
  else return num;
};
const toMusicDetail = (id: number) => {
  router.push({
    path: "/RecMusicListDetail",
    query: {
      id,
    },
  });
};
</script>

<template>
  <div class="w-100vw h-50vh">
    <div class="flex justify-between items-center mt-2 w-100% h-1.8rem mb-.2rem px-2">
      <div class="font-900">发现歌单</div>
      <div
        @click="router.push({ path: '/TopList' })"
        class="text-.5rem border border-hex-bbb pl-2.5 mr-2 rounded-xl pt-.5"
      >
        查看更多<van-icon name="arrow" />
      </div>
    </div>
    <div class="w-100vw bg-hex-F6F7F9 z-10 px-2">
      <van-skeleton :row="6" round :loading="loading" />
      <van-swipe class="h-100%" :loop="false" :width="110" :show-indicators="false">
        <van-swipe-item
          v-for="playList in playListSet.state"
          :key="playList.id"
          @click="toMusicDetail(playList.id)"
        >
          <div class="relative">
            <img
              class="h-7rem w-7rem rounded-xl p-1"
              :src="playList.picUrl"
              alt="这是首页推荐歌单的封面"
            />
            <div class="text-style text-left text-xs px-1">
              {{ playList.name }}
            </div>
            <div class="play-icon flex text-.5rem px-2 rounded-xl absolute">
              <div><van-icon name="play-circle-o" /></div>
              <div class="mx-1">{{ transform(playList.playCount) }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <a class="scale-70 pt-5 inline-block" href="https://beian.miit.gov.cn/" target="_blank">备案号：湘ICP备2022020251号-1</a>
  </div>

  <router-view />
</template>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.play-icon {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  top: 0.5rem;
  right: 1rem;
}
</style>
