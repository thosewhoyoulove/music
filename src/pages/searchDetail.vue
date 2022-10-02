<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-29 16:04:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-02 16:33:37
-->
<template>
  <van-tabs v-model:active="active" @change="change">
    <van-tab
      v-for="(item, index) in tabs"
      :key="index"
      :title="item"
      @click="change(item, index)"
    >
      <van-list class="pb-20" v-show="index == 0">
        <div
          v-for="(item, index) in searchList"
          :key="index"
          class="flex justify-between pb-1"
          @click="updateIndex(item, index)"
        >
          <div class="flex justify-between items-center">
            <div class="flex w-10 justify-center text-xs items-center">
              {{ index + 1 }}
            </div>

            <div class="col text-left m-2">
              <div class="flex text-md text-left text-style">
                {{ item.name }}
              </div>

              <div class="flex text-left">
                <div
                  class="flex text-style"
                  v-for="(ar, index) in searchList[index].ar"
                  :key="index"
                >
                  <div class="text-xs text-gray-500">
                    {{ item.ar[index].name }}
                  </div>
                </div>

                <div v-if="item.al.name" class="text-xs px-1 text-gray-500">-</div>
                <div class="text-xs w-30 text-style text-gray-500">
                  {{ item.al.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mr-5" v-if="item.mv !== 0">
              <van-icon name="tv-o" />
            </div>
          </div>
        </div>
      </van-list>
      <van-list class="pb-20" v-show="index == 1">
        <div
          v-for="(item, index) in searchList"
          :key="index"
          class="flex justify-between pb-1"
        >
          <div class="flex justify-between items-center pl-1">
            <img class="w-13 h-13 rounded" :src="item.al.picUrl" alt="" />
            <div class="col text-left m-2 text-style">
              <div class="flex text-sm w-45 text-left text-style break-all">
                {{ item.name }}
              </div>
              <div class="flex w-45 text-left">
                <div v-for="(ar, index) in searchList[index].ar" :key="index">
                  <div class="text-xs text-style text-gray-500 pr-1">
                    {{ item.ar[index].name }}
                  </div>
                </div>

                <div class="text-xs ml-1" v-if="item.publishTime">
                  {{ formatMsToDate(item.publishTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <van-list class="pb-20" v-show="index == 2">
        <div class="mx-2 flex justify-between items-center">
          <div @click="toArtistDetail" class="flex items-center">
            <img class="w-10 h-10 rounded-full" :src="artistDetail.cover" alt="" />
            <div class="flex ml-2">{{ artistDetail.name }}</div>
          </div>
          <div v-if="!isSub" class="flex">
            <van-button icon="plus" color="#f00" plain size="mini" type="primary"
              >关注</van-button
            >
          </div>
          <div v-if="isSub" class="flex">
            <van-button icon="success" color="#bbb" plain size="mini" type="primary"
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
import { getArtistDetail } from "~/api/artist";
import { getArtistSublist } from "~/api/user";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
const router = useRouter();
const active = ref();
const isSub = ref(false); //是否关注该歌手
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
const artistId = ref(-1); //歌手id,只有一个歌手
let searchKey = route.query.searchKey;
const searchList = ref([]);
let artistIdSubList = reactive([]); //关注的歌手列表
let artistDetail = ref({});
onMounted(async () => {
  console.log(searchKey, "searchKey");
  let res = await getCloudSearch(searchKey, type.value);
  searchList.value = res?.result?.songs;
  console.log(searchList.value);
  let artistSubListRes = await getArtistSublist();
  console.log(artistSubListRes, "artistSubListRes");
  artistIdSubList = artistSubListRes.data.map((item) => item.id);
  console.log(artistIdSubList, "artistSubList");
});
// 点击列表播放歌曲
const updateIndex = (item: any, index: any): any => {
  store.updatePlayList(store.$state, searchList.value);
  store.updatePlayListIndex(index);
  store.updateIsShow(store.$state, true);
};
const change = async (item, index) => {
  console.log(item, index);
  if (item === 0) {
    //标签为单曲
    type.value = 1;
    let res = await getCloudSearch(searchKey, 1);
    searchList.value = res?.result?.songs;
  } else if (item === 1) {
    //标签为专辑
    type.value = 10;
    let res = await getCloudSearch(searchKey, 1);
    searchList.value = res?.result?.songs;
    console.log(res, "专辑");
  } else if (item === 2) {
    //标签为歌手
    type.value = 100;
    let res = await getSearch(searchKey, type.value);
    console.log(res, "res");
    artistId.value = res.result.songs[0].artists[0].id;
    isSub.value = artistIdSubList.includes(artistId.value); //在用户关注的列表寻找这个歌手的id
    let artistRes = await getArtistDetail(artistId.value);
    artistDetail.value = artistRes.data.artist;
    console.log(artistId.value, artistRes, "歌手的id");
    console.log(artistDetail.value, "artistDetail.value");
    console.log(isSub.value, "是否关注");
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
const addZero = (num) => {
  if (parseInt(num) < 10) num = `0${num}`;
  return num;
};
const formatMsToDate = (ms) => {
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
const toArtistDetail = () => {
  router.push({
    path: "/Artist",
    query: {
      artistId: artistId.value,
      isSub: Number(isSub.value),
    },
  });
};
</script>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
