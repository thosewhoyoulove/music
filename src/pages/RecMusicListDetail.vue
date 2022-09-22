<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-18 21:41:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-22 11:45:43
-->
<script setup lang="ts">
import { getAllSong, getSongListDetail } from "~/api/SongListDetail";
import { useStore } from "~/store/index";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = reactive({
  playlist: {}, // 歌单信息
  songlist: [], // 歌曲信息
});
const limit = route.query.limit || ref(25); //接收我的歌单歌曲的数量，默认为25
const loading = ref(true);
const id = route.query.id;
onMounted(async () => {
  console.log(id);
  const res = await getSongListDetail(id);
  state.playlist = res.playlist; // 歌单信息
  console.log(state.playlist, "歌单信息");
  const songlist = await getAllSong(id, limit);

  state.songlist = songlist.songs;
  loading.value = false;
  console.log(state.songlist, "歌曲信息");
});
const filter = (num) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(0)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(0)}万`;
};
// 修改歌曲信息并进行播放

const updateSongList = (index) => {
  store.updatePlayList(store.$state, state.songlist); // 将歌单列表传进默认列表
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
</script>

<template>
  <div class="bg-white w-100% h-50vh relative">
    <img
      class="w-100% h-100% rounded-xl absolute blur-xl"
      :src="state.playlist.coverImgUrl"
      alt="这是推荐歌单底部阴影"
    />
    <div class="flex justify-between pt-5 items-center px-2 text-white">
      <span class="z-1">歌单</span>
      <div class="w-25% h-100% flex justify-between">
        <span class="text-7"><van-icon name="search" /></span>
        <span class="text-7"><van-icon name="ellipsis" /></span>
      </div>
    </div>
    <span class="relative flex justify-between">
      <img
        class="h-8rem m-1 rounded-xl p-1 relative inline-block"
        :src="state.playlist.coverImgUrl"
        alt="正在加载"
      />
      <span class="play-icon text-12px px-2 py-0.5 rounded-xl absolute">
        <span><van-icon name="play-circle-o" /></span>
        <span class="mx-1">{{ filter(state.playlist.playCount) }}</span>
      </span>

      <div class="flex-col items-center">
        <span class="text-left flex text-13px my-1 py-1">{{ state.playlist.name }}</span>
        <span class="flex items-center">
          <img
            class="w-10 h-10 rounded-1/2"
            :src="state?.playlist?.creator?.avatarUrl"
            alt="正在加载"
          />
          <span class="text-light-900 text-xs ml-2">{{
            state?.playlist?.creator?.nickname
          }}</span>
        </span>
      </div>
    </span>
    <div
      v-if="state.playlist.description"
      class="flex absolute text-white text-xs pt-1 text-left w-100% h-5 overflow-hidden"
    >
      <span class="text-style">
        {{ state.playlist.description }}
      </span>
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="relative flex mt-6 text-light-900 justify-around">
      <span class="flex items-center justify-between"
        ><van-button style="background: transparent" round
          ><van-icon color="#ccc" size="1rem" name="share-o" /><span
            class="px-1 text-light-900"
            >{{ state?.playlist?.shareCount }}</span
          ></van-button
        ></span
      >
      <span @click="toCommentDetail"
        ><van-button style="background: transparent" round
          ><van-icon color="#ccc" size="1rem" name="chat-o" /><span
            class="px-1 text-light-900"
            >{{ state?.playlist?.commentCount }}</span
          ></van-button
        ></span
      >
      <span
        ><van-button color="#FE3641" round
          ><van-icon size="1rem" name="add-o" /><span class="px-1">{{
            state?.playlist?.subscribedCount
          }}</span></van-button
        ></span
      >
    </div>
  </div>
  <div class="w-100%">
    <van-list>
      <ul class="flex h-3rem leading-12 text-md ml-2">
        <span><van-icon name="play-circle-o" /></span>
        <span class="flex">全部播放</span>
      </ul>
      <van-skeleton :row="20" round :loading="loading" />
      <ul
        v-for="(item, index) in state.songlist"
        :key="index"
        class="flex justify-between h-3rem my-1 text-sm"
      >
        <div class="flex justify-between">
          <div class="flex w-10 justify-center text-.1rem items-center">
            {{ index + 1 }}
          </div>
          <img class="w-3rem h-3rem rounded" :src="item.al.picUrl" alt="图片加载失败" />
          <div class="flex-col ml-2 text-style" @click="updateSongList(index)">
            <div class="flex">
              <div class="flex w-45 text-left text-md font-extrabold text-style break-all">
                {{ item.name }}
              </div>
            </div>

            <div class="flex w-45 text-left">
              <div class="text-xs w-10 text-style text-gray-500">
                {{ item.ar[0].name }}
              </div>
              <div class="text-xs text-gray-500 px-1">-</div>
              <div class="text-xs w-30 text-style text-gray-500">{{ item.al.name }}</div>
            </div>
          </div>
        </div>

        <div class="flex mr-5" v-if="item.mv">
          <van-icon size="1rem" name="tv-o" />
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
