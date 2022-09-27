<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 17:07:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-27 09:48:08
-->
<script setup lang="ts">
import { getAllSong, getSongListDetail } from "~/api/SongListDetail";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
const router = useRouter();
const state = reactive({
  playlist: {}, // 歌单信息
  songlist: [], // 歌曲信息
});
const offset = ref(0);
const limit = route.query.limit; //接收个人主页我的歌单歌曲的数量
const totalSong = ref(0);//总的歌曲数
const loading = ref(true); //骨架屏是否显示
const SongNum = ref(20); //开始获取歌曲的数量
const listLoading = ref(false); //下拉刷新
const finished = ref(false); //是否结束
const id = parseInt(route.query.id);
onMounted(async () => {
  const res = await getSongListDetail(id);
  state.playlist = res.playlist; // 歌单信息
  console.log(state.playlist, "歌单信息");
  const totalRes = await getAllSong(id, 10000);//获取歌单歌曲总数
  totalSong.value = totalRes.songs.length;
  const songlistRes = await getAllSong(id, SongNum.value, offset.value);
  state.songlist = songlistRes.songs;
  loading.value = false;
  console.log(state.songlist, "歌曲信息");
});
//加载页面
const onLoad = async () => {
  offset.value += 10;
  SongNum.value += 10;
  const songlistRes = await getAllSong(id, SongNum.value, offset.value);
  console.log(songlistRes, "歌曲信息");
  state.songlist = songlistRes.songs;
  listLoading.value = false;
  if (state.songlist.length == limit || state.songlist.length == totalSong.value) {
    finished.value = true;
  }
};
// 修改歌曲信息并进行播放
const updateSongList = (index) => {
  store.updatePlayList(store.$state, state.songlist); // 将歌单列表传进默认列表
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
const filterTotal = (num) => {
  if (num > 1000000) return "100w+";
  else if (num > 100000) return "10w+";
  else if (num > 10000) return "1w+";
  else if (num > 1000) return "999+";
  else return num;
};
</script>

<template>
  <div class="bg-white w-100% h-42vh relative">
    <img
      class="w-100% h-100% rounded-xl absolute blur-xl"
      :src="state.playlist.coverImgUrl"
      alt="这是排行榜详情的底片阴影"
    />
    <div class="justify-between pt-5 items-center px-5 text-white text-right">
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
      class="relative flex mt-6 text-hex-aaa bg-white justify-around mx-auto w-80vw h-5vh rounded-full"
    >
      <div class="flex items-center justify-between z-10">
        <div class="flex items-center">
          <van-icon size="1rem" name="add" color="#FE3641" />
          <div class="px-1 text-10px">
            {{ filterTotal(state?.playlist?.subscribedCount) }}
          </div>
        </div>
      </div>
      <div class="-mx-8 flex items-center">|</div>
      <div class="flex items-center justify-between z-10" @click="toCommentDetail">
        <div class="flex items-center" style="background: transparent">
          <van-icon color="#aaa" size="1rem" name="chat" />
          <div class="px-1 text-10px text-hex-aaa">
            {{ filterTotal(state?.playlist?.commentCount) }}
          </div>
        </div>
      </div>
      <div class="-mx-8 flex items-center">|</div>
      <div class="flex items-center justify-between z-10">
        <div class="flex items-center" style="background: transparent">
          <van-icon color="#aaa" size="1rem" name="share" />
          <div class="px-1 text-10px text-hex-aaa">
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
      <ul
        v-for="(item, index) in state.songlist"
        :key="index"
        class="flex justify-between h-3rem my-1 text-sm pr-1"
      >
        <div class="flex justify-between items-center">
          <div class="flex w-10 justify-center text-.1rem items-center">
            {{ index + 1 }}
          </div>
          <div class="flex-col ml-2 text-style" @click="updateSongList(index)">
            <div class="flex text-left text-md font-extrabold text-style break-all w-45">
              {{ item.name }}
            </div>

            <div class="flex text-left">
              <div class="text-xs text-style text-gray-500">
                {{ item.ar[0].name }}
              </div>
              <div class="text-xs text-gray-500 px-1">-</div>
              <div class="text-xs text-style text-gray-500">{{ item.al.name }}</div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mv" class="mr-5">
            <van-icon size="1rem" name="tv-o" />
          </div>
        </div>
      </ul>
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
  title: 歌单详情
</route>
