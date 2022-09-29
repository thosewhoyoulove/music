<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-29 16:04:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-29 19:59:36
-->
<template>
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
          <div class="flex text-md w-45 text-left font-extrabold text-style break-all">
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
</template>

<script setup lang="ts">
import { getSearchMusic } from "~/api/Search";
import { useStore } from "~/store/index";
const store = useStore();
const route = useRoute();
let searchKey = route.query.searchKey;
const searchList = ref([]);
onMounted(async () => {
  console.log(searchKey, "searchKey");
  const res = await getSearchMusic(searchKey);
  searchList.value = res?.result?.songs;
  console.log(searchList.value);
});
// 点击列表播放歌曲
const updateIndex = (item: any, index: any): any => {
  store.updatePlayList(store.$state, searchList.value);
  store.updatePlayListIndex(index);
  store.updateIsShow(store.$state, true);
};
</script>

<style scoped></style>
