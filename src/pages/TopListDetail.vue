<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 17:07:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-10 17:12:10
-->
<script setup lang="ts">
import { getAllSong, getSongListDetail } from "~/api/SongListDetail";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { playList } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
const state: any = reactive({
  playlist: {}, // 歌单信息
  songList: [] as any[], // 歌曲信息
});
const offset = ref(0); //偏移量
const totalSong = ref(0); //总的歌曲数
const SongNum = ref(20); //开始获取歌曲的数量
const listLoading = ref(false); //下拉刷新
const finished = ref(false); //是否结束
const id = parseInt(route.query.id as string);
onMounted(async () => {
  const res = await getSongListDetail(id);
  state.playlist = res.playlist; // 歌单信息

  console.log(state.playlist, "歌单信息");
  const totalRes = await getAllSong(id, 10000); //获取歌单歌曲总数
  totalSong.value = totalRes.songs.length;
  const songListRes = await getAllSong(id, SongNum.value, offset.value);
  state.songList = songListRes.songs;
  console.log(state.songList, "歌曲信息");
});
//加载页面
const onLoad = async () => {
  offset.value += 10;
  SongNum.value += 10;
  const songListRes = await getAllSong(id, SongNum.value, offset.value);
  console.log(songListRes, "歌曲信息");
  state.songList = songListRes.songs;
  playList.value = songListRes.songs;
  listLoading.value = false;
  if (state.songList.length == totalSong.value) {
    finished.value = true;
  }
};
// 修改歌曲信息并进行播放
const updateSongList = (index: any) => {
  store.updatePlayList(store.$state, state.songList); // 将歌单列表传进默认列表
  store.updatePlayListIndex(index); // 将索引值传给默认索引
  store.updateIsShow(store.$state, true); // 修改为暂停图标
};
// 点击评论按钮跳转
const toCommentDetail = () => {
  router.push({
    path: "/SongListComment",
    query: {
      id,
    },
  });
};
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
  <div class="bg-white w-100vw h-50vh relative">
    <img
      class="w-100% h-100% rounded-xl absolute blur-xl"
      :src="state.playlist.coverImgUrl"
      alt="这是排行榜详情的底片阴影"
    />
    <div class="justify-between pt-10 items-center px-5 text-white text-right">
      <span class="text-7 mr-2"><van-icon size="25px" name="search" /></span>
      <span class="text-7"><van-icon name="ellipsis" /></span>
    </div>
    <div class="">
      <img
        class="h-8rem m-1 rounded-xl p-1 relative inline-block"
        :src="state.playlist.coverImgUrl"
        alt="正在加载"
      />
    </div>
    <div
      v-if="state.playlist.description"
      class="flex absolute text-white text-xs pt-1 px-4 text-left w-100% h-5 overflow-hidden"
    >
      <span class="text-style">
        {{ state.playlist.description }}
      </span>
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <div
      class="relative flex mt-10 text-hex-aaa bg-white justify-around mx-auto w-80vw h-5vh rounded-full"
    >
      <div class="flex items-center justify-between">
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
  top: 0.5rem;
  left: 1rem;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 榜单详情
</route>
