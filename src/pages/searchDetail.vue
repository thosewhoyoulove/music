<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-29 16:04:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-31 14:07:50
-->
<template>
  <van-tabs v-model:active="active" @change="change" sticky>
    <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
      <van-list class="pb-20 mt-2" v-show="index == 0">
        <div v-if="loading"><van-loading size="24px">加载中...</van-loading></div>
        <div
          v-if="!loading"
          class="flex items-center h-5 border-b border-hex-F5F5F5 mx-2"
        >
          <van-icon color="#f00" name="play-circle-o" />
          <div class="text-sm ml-1">播放全部</div>
        </div>
        <div
          v-if="!loading"
          v-for="(item, index) in searchList"
          :key="index"
          class="flex justify-between border-b border-hex-F5F5F5 mx-2"
          @click="updateIndex(item, index)"
        >
          <div class="flex justify-between items-center">
            <div class="flex-col text-left m-2">
              <div class="flex text-left mb-1 max-w-80vw text-style">
                {{ item.name }}
              </div>
              <!-- 这是歌手以及专辑的盒子 -->
              <div class="flex text-left text-xs">
                <div
                  class="pr-.5"
                  v-for="(ar, index) in searchList[index]?.ar"
                  :key="item.id"
                >
                  <div class="text-gray-500">{{ item?.ar[index]?.name }}</div>
                </div>

                <div v-if="item.al.name" class="px-1 text-gray-500">-</div>
                <div class="text-gray-500">
                  {{ item.al.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div @click="toMv(item)" class="mr-5" v-if="item.mv !== 0">
              <van-icon size="large" name="tv-o" />
            </div>
          </div>
        </div>
      </van-list>
      <van-list class="pb-20 mt-2" v-show="index == 1">
        <div v-if="loading"><van-loading size="24px">加载中...</van-loading></div>
        <div
          v-if="!loading"
          v-for="(item, index) in searchList"
          :key="index"
          class="flex justify-between text-xs"
          @click="toAlbum(item)"
        >
          <div class="flex justify-between items-center pl-1">
            <img class="w-13 h-13 rounded-lg p-1" :src="item.al.picUrl" alt="" />
            <div class="col text-left m-2 text-style">
              <div class="flex text-sm w-auto text-left text-style break-all">
                {{ item.name }}
              </div>
              <div class="flex w-auto text-left items-center text-style">
                <div v-for="(ar, index) in searchList[index].ar" :key="index">
                  <div class="flex text-xs text-gray-500 pr-.5">
                    {{ item.ar[index].name }}
                  </div>
                </div>

                <div class="flex scale-80" v-if="item.publishTime">
                  {{ formatMsToDate(item.publishTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <van-list class="pb-20 mt-2" v-show="index == 2">
        <div v-if="loading"><van-loading size="24px">加载中...</van-loading></div>
        <div
          v-if="!loading"
          v-for="(item, index) in state.artistList"
          :key="index"
          class="flex justify-between mb-2"
        >
          <div @click="toArtistDetail(item)" class="flex items-center">
            <img class="w-10 h-10 rounded-full p-1" :src="item.picUrl" alt="" />
            <div class="flex-col ml-2">{{ item.name }}</div>
          </div>
          <div v-if="!item.followed" class="flex mr-3">
            <van-button icon="plus" round color="#f00" plain size="small" type="primary"
              >关注</van-button
            >
          </div>
          <div v-if="item.followed" class="flex mr-3">
            <van-button icon="success" round color="#bbb" plain size="mini" type="primary"
              >已关注</van-button
            >
          </div>
        </div>
      </van-list>

      <van-list
        v-show="index == 3"
        v-model:loading="listLoading"
        :finished="finished"
        @load="onLoad"
        class="pb-20 mt-2"
      >
        <div
          v-for="(item, index) in playlists"
          :key="index"
          class="relative inline-block pt-1 px-2"
        >
          <img class="w-21 h-21 rounded-xl p-1" :src="item.coverImgUrl" alt="加载失败" />
          <div class="text-style w-20 text-left text-12px px-1">
            {{ item.name }}
          </div>
          <div class="flex play-icon px-.5 text-12px rounded-xl absolute">
            <div><van-icon name="play-circle-o" /></div>
            <div class="mx-1">
              {{ filter(item.playCount) }}
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { getCloudSearch } from "~/api/Search";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
const router = useRouter();
const active = ref();
const listLoading = ref(false); //歌单标签页的加载
const finished = ref(false);
let playlistCount = ref(0);
const tabs = ref([
  "单曲",
  "专辑",
  "歌手",
  "歌单",
  "用户",
  "MV",
  "歌词",
  "电台",
  "视频",
  "综合",
  "声音",
]); // 所有搜索标签
let limit = ref(30);
let type = ref(1);
const loading = ref(true);
let searchKey = route.query.searchKey;
const searchList: any = ref([]);
const playlists: any = ref([]);
let state = reactive({
  artistIdSubList: [] as any[], //关注的歌手列表
  artistList: [] as any[], //搜索的歌手id列表
  isSubMap: [] as any[], //是否关注的map
});
onMounted(async () => {
  console.log(searchKey, "searchKey");
  let res = await getCloudSearch(searchKey, type.value, limit.value);
  searchList.value = res?.result?.songs;
  console.log(searchList.value);
  loading.value = false;
});
// 点击列表播放歌曲
const updateIndex = (item: any, index: any): any => {
  store.updatePlayList(store.$state, searchList.value);
  store.updatePlayListIndex(index);
  store.updateIsShow(store.$state, true);
};
const change = async (item: any, index: any) => {
  console.log(searchList.value, "searchList.value");
  console.log(item, "item", index, "index");
  searchList.value = [];
  loading.value = true;
  limit.value = 30;
  console.log(item, index);

  if (index === 0 || item === 0) {
    //标签为单曲
    type.value = 1;
    let res = await getCloudSearch(searchKey, 1, limit.value);
    searchList.value = res?.result?.songs;
    loading.value = false;
  } else if (index === 1 || item === 1) {
    //标签为专辑
    type.value = 10;
    let res = await getCloudSearch(searchKey, 1, limit.value);
    searchList.value = res?.result?.songs;
    console.log(res, "专辑");
    loading.value = false;
  } else if (index === 2 || item === 2) {
    //标签为歌手
    type.value = 100;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res);
    state.artistList = res.result.artists;
    console.log(state.artistList, "这是请求得到的歌手信息");
    loading.value = false;
  } else if (item === 3) {
    //标签为歌单

    type.value = 1000;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    playlists.value = res.result.playlists;
    playlistCount.value = res.result.playlistCount;
    onLoad();
    loading.value = false;
  } else if (item === 4) {
    //标签为用户
    type.value = 1002;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "用户");
  } else if (item === 5) {
    //标签为MV
    type.value = 1004;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "MV");
  } else if (item === 6) {
    //标签为歌词
    type.value = 1006;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "歌词");
  } else if (item === 7) {
    //标签为电台
    type.value = 1009;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "电台");
  } else if (item === 8) {
    //标签为视频
    type.value = 1014;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "视频");
  } else if (item === 9) {
    //标签为综合
    type.value = 1018;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "综合");
  } else if (item === 10) {
    //标签为声音
    type.value = 2000;
    let res = await getCloudSearch(searchKey, type.value, limit.value);
    console.log(res, "声音");
  }
};
//格式化专辑出版时间
const addZero = (num: any) => {
  if (parseInt(num) < 10) num = `0${num}`;
  return num;
};
const formatMsToDate = (ms) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDate();
    const oTime = `${oYear}.${addZero(oMonth)}.${addZero(oDay)}`;
    return oTime;
  } else {
    return "";
  }
};
//跳转歌手主页
const toArtistDetail = (item: any) => {
  console.log(item);
  router.push({
    path: "/Artist",
    query: {
      artistId: item.id,
    },
  });
};
//跳转MV界面
const toMv = (item: any) => {
  console.log(item.ar[0].id); //暂时只传一个歌手的i,后续有需要再设计多个歌手
  router.push({
    path: "/MV",
    query: {
      mvId: item.mv,
      artistId: item.ar[0].id,
    },
  });
};
//跳转专辑界面
const toAlbum = (item: any) => {
  console.log(item.al.id);
  router.push({
    path: "/Album",
    query: {
      albumId: item.al.id,
    },
  });
};
const filter = (num: any) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(0)}万`;
  else return num;
};
const onLoad = async () => {
  //最开始自动加载
  console.log("进入了加载");
  limit.value += 5;
  let res = await getCloudSearch(searchKey, type.value, limit.value);
  console.log(res, "这是加载的res");
  if (res.code === 400) {
    console.log("加载完了");

    finished.value = true;
    return;
  }
  playlists.value = res.result.playlists;
  listLoading.value = false;
  console.log(playlistCount.value, "playlistCount.value");
};
</script>

<style>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
:root {
  --van-button-small-height: 1.5rem;
}
.play-icon {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  top: 0.5rem;
  right: 1rem;
}
</style>
