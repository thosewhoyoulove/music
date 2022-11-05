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
              <div class="text-left text-xs text-style">
                <span
                  class="pr-.5"
                  v-for="(ar, index) in searchList[index]?.ar"
                  :key="item.id"
                >
                  <span class="text-gray-500">{{ item?.ar[index]?.name }}</span>
                </span>

                <span v-if="item.al.name" class="px-1 text-gray-500">-</span>
                <span class="text-gray-500">
                  {{ item.al.name }}
                </span>
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
          class="flex justify-between"
          @click="toAlbum(item)"
        >
          <div class="flex justify-between items-center pl-1">
            <img class="w-13 h-13 rounded-lg p-1" :src="item.al.picUrl" alt="" />
            <div class="flex-col text-left m-2">
              <div class="text-left text-style break-all max-w-80vw">
                {{ item.name }}
              </div>
              <div class="text-left items-center text-style text-xs">
                <span v-for="(ar, index) in searchList[index].ar" :key="index">
                  <span class="text-gray-500 pr-.5">
                    {{ item.ar[index].name }}
                  </span>
                </span>
                <span class="text-xs scale-90 inline-block" v-if="item.publishTime">
                  - {{ formatMsToDate(item.publishTime) }}
                </span>
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
        v-model:loading="playListLoading"
        :finished="playListFinished"
        @load="playlistLoad"
        class="pb-20 mt-2"
      >
        <div
          v-for="(item, index) in playlists"
          :key="index"
          @click="toMusicDetail(item.id)"
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
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        v-show="index == 4"
        description="还在开发"
      />
      <van-list
        v-show="index == 5"
        v-model:loading="mvListLoading"
        :finished="mvListFinished"
        @load="mvListLoad"
        class="pb-20 mt-2"
      >
        <div
          class="flex"
          v-for="{
            name,
            artistName,
            cover,
            id,
            duration,
            playCount,
            artistId,
          } in state.mvList"
          :key="id"
          @click="toMvDetail(id, artistId)"
        >
          <img class="flex w-40 h-20 rounded-lg my-1 ml-2 relative" :src="cover" alt="" />
          <div class="absolute left-32 mt-15 text-hex-fff scale-50">
            {{ formatMvTime(duration) }}
          </div>
          <div class="flex-col text-left text-xs max-w-30rem">
            <div class="flex ml-1 mb-4 mt-1">
              <div class="scale-70"><van-tag color="#f00" plain>MV</van-tag></div>
              <div class="text-style">{{ name }}</div>
            </div>
            <div class="ml-2 text-hex-bbb">
              <div>{{ artistName }}</div>
              <div class="mt-3">{{ filter(playCount) }}播放</div>
            </div>
          </div>
        </div>
      </van-list>
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        v-show="index == 6"
        description="还在开发"
      />
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        v-show="index == 7"
        description="还在开发"
      />
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        v-show="index == 8"
        description="还在开发"
      />
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        v-show="index == 9"
        description="还在开发"
      />
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        v-show="index == 10"
        description="还在开发"
      />
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
//歌单标签页的加载的变量
const playListLoading = ref(false);
const playListFinished = ref(false);
//MV标签页的加载的变量
const mvListLoading = ref(false);
const mvListFinished = ref(false);

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
  mvList: [] as any[], //关注的歌手列表
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
    playlistLoad();
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
    state.mvList = res.result.mvs;
    mvListLoad();
    loading.value = false;
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
//单曲标签页跳转MV界面
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
//歌单加载
const playlistLoad = async () => {
  //最开始自动加载
  console.log("进入了加载");
  limit.value += 5;
  let res = await getCloudSearch(searchKey, type.value, limit.value);
  console.log(res, "这是加载的res");
  if (res.code === 400) {
    console.log("加载完了");
    playListFinished.value = true;
    return;
  }
  playlists.value = res.result.playlists;
  playListLoading.value = false;
  console.log(playlistCount.value, "playlistCount.value");
};
//跳转到歌单详情
const toMusicDetail = (id: any) => {
  router.push({
    path: "/TopListDetail",
    query: {
      id,
    },
  });
};
//MV标签页加载
//MV加载
const mvListLoad = async () => {
  //最开始自动加载
  console.log("进入了加载");
  limit.value += 5;
  let res = await getCloudSearch(searchKey, type.value, limit.value);
  console.log(res, "这是加载的res");
  if (res.code === 400) {
    console.log("加载完了");
    mvListFinished.value = true;
    return;
  }
  state.mvList = res.result.mvs;
  mvListLoading.value = false;
  console.log(state.mvList, "state.mvList");
};
//MV标签页跳转MV
const toMvDetail = (id: any, artistId: any) => {
  console.log(id);
  router.push({
    path: "/MV",
    query: {
      mvId: id,
      artistId: artistId,
    },
  });
};
//格式化mv的时间
const formatMvTime = (ms: number) => {
  if (ms) {
    ms = ms / 1000;
    const min = ((ms / 60) as number).toFixed(0);
    const sec = ((ms % 60) as number).toFixed(0);
    const oTime = `${addZero(min)}:${addZero(sec)}`;
    return oTime;
  } else {
    return "";
  }
};
</script>

<style>
.text-style {
  /* display: -webkit-box; */
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
<route lang="yaml">
meta:
  layout: default
  title: 搜索详情
</route>
