<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-09 21:08:11
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-10 12:32:46
-->

<script setup lang="ts">
import { getAlbumDetail } from "~/api/album";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
const router = useRouter();
let albumId = parseInt(route.query.albumId as string);
let state: any = reactive({
  album: {},
  songs: [],
});
onMounted(async () => {
  console.log(albumId, "接收专辑id ");

  let albumRes = await getAlbumDetail(albumId);
  state.album = albumRes.album;
  state.songs = albumRes.songs;
  console.log(albumRes, "专辑的内容");
});
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
// 修改歌曲信息并进行播放
const updateSongList = (index: any) => {
  store.updatePlayList(store.$state, state.songs); // 将歌单列表传进默认列表
  store.updatePlayListIndex(index); // 将索引值传给默认索引
  store.updateIsShow(store.$state, true); // 修改为暂停图标
};
//格式化专辑出版时间
const addZero = (num: any) => {
  if (parseInt(num) < 10) num = `0${num}`;
  return num;
};
const formatMsToDate = (ms: any) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDay();
    const oTime = `${oYear}.${addZero(oMonth)}.${addZero(oDay)}`;
    return oTime;
  } else {
    return "";
  }
};
//跳转歌手主页
const toArtistDetail = (id:any) => {
  console.log(id);
  router.push({
    path: "/Artist",
    query: {
      artistId: id,
    },
  });
};
</script>
<template>
  <div class="bg-white w-100vw h-42vh relative">
    <img
      class="w-100% h-100% rounded-xl absolute blur-xl"
      :src="state.album.blurPicUrl"
      alt="这是排行榜详情的底片阴影"
    />
    <div class="flex justify-between pt-5 items-center px-2 text-white">
      <div class="z-1 pl-2">专辑</div>
      <div class="w-25% h-100% flex justify-around">
        <div class="text-5"><van-icon name="search" /></div>
        <div class="text-5"><van-icon name="ellipsis" /></div>
      </div>
    </div>
    <div class="relative flex">
      <img
        class="h-8rem w-8rem m-1 rounded-xl p-1 relative inline-block"
        :src="state?.songs[0]?.al?.picUrl"
        alt="正在加载"
      />

      <div class="flex-col ml-2 items-center text-left">
        <div class="flex text-hex-fff text-.8rem my-1 py-1">
          {{ state?.album?.name }}
        </div>

        <div class="flex items-center" @click="toArtistDetail(state.album.artists[0].id)">
          <img
            class="w-7 h-7 rounded-1/2"
            :src="state?.album?.artist?.img1v1Url"
            alt="正在加载"
          />

          <div class="text-hex-ccc text-xs ml-2">
            {{ state?.album?.artist?.name }}
          </div>
          <div class="ml-1 flex text-hex-ccc">
            <van-icon size="10px" name="arrow" />
          </div>
        </div>

        <div class="flex text-hex-ccc text-xs mt-6">
          发行时间:{{ formatMsToDate(state.album.publishTime) }}
        </div>

        <div
          v-if="state.album.description"
          class="flex text-hex-ccc text-xs mt-1 text-left w-100% h-4 leading-1rem pr-2"
        >
          <div class="text-style">
            {{ state.album.description }}
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
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <van-icon size="1rem" name="add" color="#FE3641" />
          <div class="px-1 text-10px">
           null
          </div>
        </div>
      </div>
      <div class="-mx-8 flex items-center">|</div>
      <div class="flex items-center justify-between z-10" @click="toCommentDetail">
        <div class="flex items-center" style="background: transparent">
          <van-icon color="#aaa" size="1rem" name="chat" />
          <div class="px-1 text-10px text-hex-aaa">
            {{ filterTotal(state?.album?.info?.commentCount) }}
          </div>
        </div>
      </div>
      <div class="-mx-8 flex items-center">|</div>
      <div class="flex items-center justify-between z-10">
        <div class="flex items-center" style="background: transparent">
          <van-icon color="#aaa" size="1rem" name="share" />
          <div class="px-1 text-10px text-hex-aaa">
            {{ filterTotal(state?.album?.info?.shareCount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-100% pb-18">
    <van-list>
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

          <div class="col text-left m-2">
            <div class="flex text-left text-style mb-1">
              {{ item.name }}
            </div>

            <div class="flex text-left">
              <div
                class="flex text-style"
                v-for="(ar, index) in state.songs[index].ar"
                :key="index"
              >
                <div class="text-xs text-gray-500 mr-1 w-auto">
                  {{ item.ar[index].name }}
                </div>
              </div>

              <div v-if="item.al.name" class="text-xs px-1 text-gray-500">-</div>
              <div class="text-xs w-auto text-style text-gray-500">
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
</template>

<style scoped></style>
