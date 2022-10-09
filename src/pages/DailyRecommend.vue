<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 19:07:49
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-09 16:52:03
-->
<script setup lang="ts">
import {
  getDailyRecommendSongList,
  getDailyRecommendSongs,
} from "~/api/RecommendSongList";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const router = useRouter();
const { playList } = storeToRefs(store);
const finished = ref(false); //是否结束
// 获取时间
const day = new Date();
const Day = ref(day.getUTCDate());
const month = new Date();
const Month = ref(month.getMonth() + 1);
const choice = ref(["推荐歌曲", "推荐歌单"]);
const active = ref(0);
const state: any = reactive({
  songs: [],
  songList: [],
});
onMounted(async () => {
  const recSongRes = await getDailyRecommendSongs();
  state.songs = recSongRes.data.dailySongs;
  playList.value = recSongRes.data.dailySongs;
  console.log(recSongRes, "推荐歌曲");
  const recSongListRes = await getDailyRecommendSongList();
  console.log(recSongListRes, "推荐歌单");
  state.songList = recSongListRes.recommend;
  finished.value = true;
});
const filter = (num) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(0)}万`;
  else return num;
};
// 修改歌曲信息并进行播放
const updateSongList = (index: any) => {
  store.updatePlayList(store.$state, state.songs); // 将歌单列表传进默认列表
  store.updatePlayListIndex(index); // 将索引值传给默认索引
  store.updateIsShow(store.$state, true); // 修改为暂停图标
};
const toMusicDetail = (id) => {
  router.push({
    path: "/TopListDetail",
    query: {
      id,
    },
  });
};
const toMv = (item: any) => {
  console.log(item);
  router.push({
    path: "MV",
    query: {
      mvId: item.mv,
      artistId: item.ar[0].id,
    },
  });
};
</script>

<template>
  <div class="w-auto h-30vh relative bg-hex-DB2C1F">
    <img
      class="w-10 h-10 rounded-xl absolute left-50% top-40% -translate-x-1/2"
      src="/logo.png"
      alt="背景图"
    />
    <div class="flex w-auto items-center text-white pt-34">
      <div class="font-500 ml-3">
        {{ Month }}
      </div>
      /
      <div>{{ Day }}</div>
    </div>
  </div>
  <div class="w-100vw pb-5">
    <van-tabs v-model:active="active">
      <van-tab v-for="(item, index) in choice" :key="index" :title="item">
        <div v-show="active == 0">
          <div v-if="!state.songList.length">
            <van-loading size="24px">加载中...</van-loading>
          </div>
          <div v-if="state.songList.length" class="w-100vw mb-15">
            <van-list :finished="finished" finished-text="没有更多了">
              <div class="flex h-3rem text-md ml-2 items-center">
                <div><van-icon size="1.5rem" name="play-circle-o" /></div>
                <div class="flex ml-2">全部播放</div>
              </div>
              <div
                v-for="(item, index) in state.songs"
                :key="index"
                class="flex justify-between text-xs"
                @click="updateSongList(index)"
              >
                <div class="flex justify-between items-center">
                  <div class="flex mx-3 w-5 justify-center items-center">
                    {{ index + 1 }}
                  </div>

                  <div class="col text-left m-2 w-auto">
                    <div class="flex text-left text-style mb-1">
                      {{ item.name }}
                    </div>

                    <div class="flex text-left">
                      <div
                        class="flex text-style"
                        v-for="(ar, index) in state.songs[index].ar"
                        :key="index"
                      >
                        <div class="text-gray-500 mr-1">
                          {{ item.ar[index].name }}
                        </div>
                      </div>

                      <div v-if="item.al.name" class="px-1 text-gray-500">-</div>
                      <div class="w-auto text-style text-gray-500">
                        {{ item.al.name }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div @click="toMv(item)" class="mr-5" v-if="item.mv !== 0">
                    <van-icon name="tv-o" />
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </div>
        <div v-show="active == 1" class="mb-15">
          <div
            v-for="(item, index) in state.songList"
            :key="index"
            class="inline-block pt-1 px-2"
            @click="toMusicDetail(item.id)"
          >
            <div class="relative">
              <img class="w-21 h-21 rounded-xl p-1" :src="item.picUrl" alt="正在加载" />
              <div class="text-style w-20 text-left text-xs px-1">
                {{ item.name }}
              </div>
              <div class="flex play-icon text-10px px-2 py-0.5 rounded-xl absolute">
                <div><van-icon name="play-circle-o" /></div>
                <div class="mx-.5">
                  {{ filter(item.playcount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.play-icon {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  top: 8px;
  right: 5px;
}
</style>
