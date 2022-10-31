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
          v-for="(item, index) in searchList"
          :key="index"
          class="flex justify-between text-xs"
          @click="updateIndex(item, index)"
        >
          <div class="flex justify-between items-center">
            <div class="flex w-10 justify-center text-xs items-center">
              {{ index + 1 }}
            </div>

            <div class="col text-left m-2 w-50">
              <div class="flex text-left text-style mb-1">
                {{ item.name }}
              </div>

              <div class="flex text-left">
                <div
                  class="flex text-style"
                  v-for="(ar, index) in searchList[index].ar"
                  :key="index"
                >
                  <div class="text-gray-500">
                    {{ item.ar[index].name }}
                  </div>
                </div>

                <div v-if="item.al.name" class="px-1 text-gray-500">-</div>
                <div class="w-30 text-style text-gray-500">
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
              <div class="flex w-auto text-left items-center">
                <div v-for="(ar, index) in searchList[index].ar" :key="index">
                  <div class="flex text-xs text-style text-gray-500 pr-.5">
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
            <img class="w-10 h-10 rounded-full p-1" :src="item.imgPic" alt="" />
            <div class="flex-col ml-2">{{ item.name }}</div>
          </div>
          <div v-if="!item.isSub" class="flex mr-3">
            <van-button icon="plus" round color="#f00" plain size="small" type="primary"
              >关注</van-button
            >
          </div>
          <div v-if="item.isSub" class="flex mr-3">
            <van-button icon="success" round color="#bbb" plain size="mini" type="primary"
              >已关注</van-button
            >
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { getCloudSearch, getSearch } from "~/api/Search";
import { getArtistDetail, getArtistFollowCount } from "~/api/artist";
import { getArtistSublist } from "~/api/user";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
const router = useRouter();
const active = ref();
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
let type = ref(1);
const loading = ref(true);
let searchKey = route.query.searchKey;
const searchList: any = ref([]);
let state = reactive({
  artistIdSubList: [] as any[], //关注的歌手列表
  artistList: [] as any[], //搜索的歌手id列表
  isSubMap: [] as any[], //是否关注的map
});
let artistCover: any = ref();
onMounted(async () => {
  console.log(searchKey, "searchKey");
  let res = await getCloudSearch(searchKey, type.value);
  searchList.value = res?.result?.songs;
  console.log(searchList.value);
  let artistSubListRes = await getArtistSublist();
  state.artistIdSubList = artistSubListRes.data.map((item: any) => item.id); //关注歌手的id列表
  loading.value = false;
});
// 点击列表播放歌曲
const updateIndex = (item: any, index: any): any => {
  store.updatePlayList(store.$state, searchList.value);
  store.updatePlayListIndex(index);
  store.updateIsShow(store.$state, true);
};
const change = async (item, index) => {
  loading.value = true;
  console.log(item, index);
  if (index === 0 || item === 0) {
    //标签为单曲
    type.value = 1;
    let res = await getCloudSearch(searchKey, 1);
    searchList.value = res?.result?.songs;
    loading.value = false;
  } else if (index === 1 || item === 1) {
    //标签为专辑
    type.value = 10;
    let res = await getCloudSearch(searchKey, 1);
    searchList.value = res?.result?.songs;
    console.log(res, "专辑");
    loading.value = false;
  } else if (index === 2 || item === 2) {
    //标签为歌手
    type.value = 100;
    let res = await getSearch(searchKey, type.value);

    let songsRes = res.result.songs.map((item: any) => item.artists);
    console.log(songsRes, "songsRes");
    state.artistList = songsRes.flat(); //将歌手的数组扁平化
    console.log(state.artistList, "state.artistList");

    let map = new Map();
    for (let item of state.artistList) {
      // console.log(item.name, "item");
      if (!map.has(item.name)) {
        map.set(item.name, item);
      }
    } //将数组进行去重
    console.log(map.values(), "map");
    state.artistList = [...map.values()]; //将map转化为数组
    console.log(state.artistList, "state.artistIdList");
    //遍历歌手数组，调用获取粉丝量的接口可以获得是否关注
    for (let i = 0; i < state.artistList.length; i++) {
      let followCountRes = await getArtistFollowCount(state.artistList[i].id);
      console.log(followCountRes, "歌手的关注信息");
      if (followCountRes.data.isFollow) {
        Object.defineProperty(state.artistList[i], "isSub", {
          value: true,
        });
      } else {
        Object.defineProperty(state.artistList[i], "isSub", {
          value: false,
        });
      }
    }
    //遍历歌手数组，如果用户的关注列表有这个歌手id就添加isSub属性为true，否则为false
    // if (state.artistIdSubList.includes(state.artistList[i].id)) {
    //   Object.defineProperty(state.artistList[i], "isSub", {
    //     value: true,
    //   });
    // } else {
    //   Object.defineProperty(state.artistList[i], "isSub", {
    //     value: false,
    //   });
    // }

    for (let i = 0; i < state.artistList.length; i++) {
      //遍历歌手数组，调用接口对每一个歌手进行详情请求得到头像URI并添加imgPic属性
      let artistRes = await getArtistDetail(state.artistList[i].id);
      console.log(artistRes, "artistRes");
      artistCover.value = artistRes.data.artist.cover;
      Object.defineProperty(state.artistList[i], "imgPic", {
        value: artistCover.value,
      });
    }
    loading.value = false;
    console.log(state.artistList, "这是新的state.artistList");
  } else if (item === 3) {
    //标签为歌单
    type.value = 1000;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "歌单");
  } else if (item === 4) {
    //标签为用户
    type.value = 1002;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "用户");
  } else if (item === 5) {
    //标签为MV
    type.value = 1004;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "MV");
  } else if (item === 6) {
    //标签为歌词
    type.value = 1006;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "歌词");
  } else if (item === 7) {
    //标签为电台
    type.value = 1009;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "电台");
  } else if (item === 8) {
    //标签为视频
    type.value = 1014;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "视频");
  } else if (item === 9) {
    //标签为综合
    type.value = 1018;
    let res = await getCloudSearch(searchKey, 1);
    console.log(res, "综合");
  } else if (item === 10) {
    //标签为声音
    type.value = 2000;
    let res = await getCloudSearch(searchKey, 1);
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
</style>
