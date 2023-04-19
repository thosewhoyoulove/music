<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 21:41:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-19 23:35:50
-->
<script setup lang="ts">
import { getAllSong, getSongListDetail } from "~/api/SongListDetail";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { playList,playListIndex } = storeToRefs(store);
const router = useRouter();
const route = useRoute();
const state: any = reactive({
  playlist: {}, // 歌单信息
  songList: [], // 歌曲信息
});
const offset = ref(0);
const limit = route.query.limit; //接收个人主页我的歌单歌曲的数量
const totalSong = ref(0); //总的歌曲数
const SongNum = ref(20); //开始获取歌曲的数量
const listLoading = ref(false); //下拉刷新加载提示
const finished = ref(false); //是否结束
const id = route.query.id;
onMounted(async () => {
  console.log(id);
  const res = await getSongListDetail(id);
  state.playlist = res.playlist; // 歌单信息
  // console.log(state.playlist, "歌单信息");
  const totalRes = await getAllSong(id, 10000); //获取歌单歌曲总数
  // console.log(totalRes, "totalRes");
  totalSong.value = totalRes.songs.length;
  const songListRes = await getAllSong(id, SongNum.value, offset.value);
  state.songList = songListRes.songs;
  if (state.songList.length == limit || state.songList.length == totalSong.value) {
    finished.value = true;
  }
});
const filter = (num: any) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(0)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(0)}万`;
};
//加载页面
const onLoad = async () => {
  offset.value += 10;
  SongNum.value += 10;
  const songListRes = await getAllSong(id, SongNum.value, offset.value);
  // console.log(songListRes, "歌曲信息");
  state.songList = songListRes.songs;
  
  // playList.value = songListRes.songs
  console.log(playList.value, "播放列表");
  listLoading.value = false;
  if (state.songList.length == limit || state.songList.length == totalSong.value) {
    finished.value = true;
  }
};
// 修改歌曲信息并进行播放

const updateSongList = async(index: any) => {
  playList.value.length = 0
  state.songList.map((item:any)=>{
    playList.value.push(item)
  })
  console.log("点击了推荐歌单的歌曲",playList.value,playListIndex.value);
  let res = await store.getLyric(playList.value[playListIndex.value]?.id);
  console.log(res,'res');
  
  // nextTick(()=>{
  //   console.log(playListIndex.value,'第几首歌的歌词');
  // })
  
  store.updatePlayList(store.$state, state.songList); // 将歌单列表传进默认列表
  store.updatePlayListIndex(index); // 将索引值传给默认索引
  store.updateIsShow(store.$state, true); // 修改为暂停图标
};
const toCommentDetail = () => {
  router.push({
    path: "/SongListComment",
    query: {
      id,
    },
  });
};
//
const filterTotal = (num: any) => {
  if (num > 1000000) return "100w+";
  else if (num > 100000) return "10w+";
  else if (num > 10000) return "1w+";
  else if (num > 1000) return "999+";
  else return num;
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
  <div class="bg-white w-100% h-42vh relative">
    <img
      class="w-100% h-100% rounded-xl absolute blur-xl"
      :src="state.playlist.coverImgUrl"
      alt="这是推荐歌单底部阴影"
    />
    <div class="flex justify-between pt-5 items-center px-2 text-white">
      <div class="z-1 text-.5rem">歌单</div>
      <div class="w-25% h-100% flex justify-around">
        <div class="text-5"><van-icon name="search" /></div>
        <div class="text-5"><van-icon name="ellipsis" /></div>
      </div>
    </div>
    <div class="relative flex">
      <img
        class="h-8rem w-8rem m-1 rounded-xl p-1 relative inline-block"
        :src="state.playlist.coverImgUrl"
        alt="正在加载"
      />
      <div
        v-if="!state.playlist.playCount"
        class="play-icon text-xs px-1 py-0.5 rounded-xl absolute flex"
      >
        <div><van-icon name="play-circle-o" /></div>
        <div class="mx-1">{{ filter(state.playlist.playCount) }}</div>
      </div>

      <div class="flex-col ml-2 items-center text-left">
        <div class="flex text-hex-fff text-.8rem my-1 py-1">
          {{ state.playlist.name }}
        </div>
        <div class="flex items-center">
          <img
            class="w-7 h-7 rounded-1/2"
            :src="state?.playlist?.creator?.avatarUrl"
            alt="正在加载"
          />
          <div class="text-hex-ccc text-xs ml-2">
            {{ state?.playlist?.creator?.nickname }}
          </div>
        </div>
        <div
          v-if="state.playlist.description"
          class="flex text-hex-ccc text-xs mt-3 text-left w-100% h-4 leading-1rem pr-2"
        >
          <div class="text-style">
            {{ state.playlist.description }}
          </div>
          <div class="mr-1">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative flex mt-6 text-hex-aaa bg-white justify-around mx-auto w-80vw h-5vh rounded-full"
    >
      <div class="flex items-center justify-between z-10">
        <div class="flex items-center">
          <van-icon size="1rem" name="add" color="#FE3641" />
          <div class="px-1 text-xs">
            {{ filterTotal(state?.playlist?.subscribedCount) }}
          </div>
        </div>
      </div>
      <div class="-mx-8 flex items-center">|</div>
      <div class="flex items-center justify-between z-10" @click="toCommentDetail">
        <div class="flex items-center" style="background: transparent">
          <van-icon color="#aaa" size="1rem" name="chat" />
          <div class="px-1 text-xs text-hex-aaa">
            {{ filterTotal(state?.playlist?.commentCount) }}
          </div>
        </div>
      </div>
      <div class="-mx-8 flex items-center">|</div>
      <div class="flex items-center justify-between z-10">
        <div class="flex items-center" style="background: transparent">
          <van-icon color="#aaa" size="1rem" name="share" />
          <div class="px-1 text-xs text-hex-aaa">
            {{ filterTotal(state?.playlist?.shareCount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-100% pb-18">
    <van-list
      v-model:loading="listLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="flex h-3rem text-md ml-2 items-center">
        <div><van-icon size="1.5rem" name="play-circle-o" /></div>
        <div class="flex ml-2">全部播放</div>
      </div>
      <div
        v-for="(item, index) in state.songList"
        :key="index"
        class="flex justify-between"
        @click="updateSongList(index)"
      >
        <div class="flex justify-between items-center">
          <div class="flex mx-3 w-5 justify-center items-center">
            {{ index + 1 }}
          </div>

          <div class="col text-left m-2">
            <div class="flex text-left text-style mb-1 max-w-80vw">
              {{ item.name }}
            </div>

            <div class="text-left text-xs text-style">
              <span
                class="pr-.5"
                v-for="(ar, index) in state.songList[index].ar"
                :key="index"
              >
                <span class="text-gray-500">
                  {{ item.ar[index].name }}
                </span>
              </span>

              <span v-if="item.al.name" class="px-1 text-gray-500">-</span>
              <span class="text-gray-500">
                {{ item.al.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div @click.stop="toMv(item)" class="mr-5" v-if="item.mv !== 0">
            <van-icon size="large" name="tv-o" />
          </div>
        </div>
      </div>
    </van-list>
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
  top: 0.6rem;
  left: 3.6rem;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 歌单详情
</route>
