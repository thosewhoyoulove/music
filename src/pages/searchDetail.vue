<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-29 16:04:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-29 20:24:44
-->
<template>
  <van-tabs v-model:active="active" @change="change">
    <van-tab
      v-for="(item, index) in tabs"
      :key="index"
      :title="item"
      @click="change(item, index)"
    >
      <van-list class="pb-20">
        <div
          v-for="(item, index) in searchList"
          :key="index"
          class="flex border-b-hex-ccc border-b justify-between pb-1"
          @click="updateIndex(item, index)"
        >
          <div class="flex justify-between">
            <div class="flex w-10 justify-center text-.1rem items-center">
              {{ index + 1 }}
            </div>
            <div class="col text-left m-2 text-style">
              <div
                class="flex text-md w-45 text-left font-extrabold text-style break-all"
              >
                {{ item.name }}
              </div>
              <div class="flex w-45 text-left">
                <div v-for="(ar, index) in searchList[index].ar" :key="index">
                  <div class="text-xs text-style text-gray-500">
                    {{ item.ar[index].name }}
                  </div>
                </div>
                <div v-if="item.al.name" class="text-xs pr-1 text-gray-500">-</div>
                <div class="text-xs w-30 text-style text-gray-500">
                  {{ item.al.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div v-if="item.mv !== 0">
              <van-icon name="tv-o" />
            </div>
            <div style="transform: rotate(90deg)">
              <van-icon name="ellipsis" />
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { getSearchMusic } from "~/api/Search";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
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
let searchKey = route.query.searchKey;
const searchList = ref([]);
onMounted(async () => {
  console.log(searchKey, "searchKey");
  let res = await getSearchMusic(searchKey, type.value);
  searchList.value = res?.result?.songs;
  console.log(searchList.value);
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
    let res = await getSearchMusic(searchKey, type.value);
    searchList.value = res?.result?.songs;
  } else if (item === 1) {
    //标签为专辑
    type.value = 10;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'专辑');
    
  } else if (item === 2) {
    //标签为歌手
    type.value = 100;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'歌手');
  } else if (item === 3) {
    //标签为歌单
    type.value = 1000;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'歌单');
  } else if (item === 4) {
    //标签为用户
    type.value = 1002;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'用户');
  } else if (item === 5) {
    //标签为MV
    type.value = 1004;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'MV');
  } else if (item === 6) {
    //标签为歌词
    type.value = 1006;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'歌词');
  } else if (item === 7) {
    //标签为电台
    type.value = 1009;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'电台');
  } else if (item === 8) {
    //标签为视频
    type.value = 1014;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'视频');
  } else if (item === 9) {
    //标签为综合
    type.value = 1018;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'综合');
  } else if (item === 10) {
    //标签为声音
    type.value = 2000;
    let res = await getSearchMusic(searchKey, type.value);
    console.log(res,'声音');
  }
};
</script>

<style scoped></style>
