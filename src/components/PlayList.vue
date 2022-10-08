<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-08 14:46:58
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-08 17:17:34
-->
<template>
  <van-action-sheet
    v-model:show="isPlayListShow"
    title=""
    @click="isPlayListShow = false"
  >
    <div class="relative h-100vh w-100vw mt-5 px-3">
      <van-list
        v-model:loading="listLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="absolute bg-white col items-center"
        @click.stop
      >
        <div class="mt-2 text-lg">当前播放</div>
        <div
          class="flex text-left items-center justify-between my-2"
          v-for="(item, listIndex) in playList"
          :key="listIndex"
        >
          <div class="flex w-auto h-5 items-center">
            <div class=" text-style">{{ item.name }}</div>
            <div class="mx-1">-</div>
            <div v-for="arItem in playList[listIndex].ar" :key="index">
              <div class="flex items-center w-auto">
                <div class="text-hex-bbb text-xs text-style">{{ arItem.name }}</div>
              </div>
            </div>
          </div>

          <div><van-icon size="mini" color="#ccc" name="cross" /></div>
        </div>
      </van-list>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { isPlayListShow, playList, playListIndex } = storeToRefs(store);
const listLoading = ref(false);
const finished = ref(false);
onMounted(() => {
  console.log(playList.value);
});
const onLoad = () => {
  listLoading.value = true;
};
</script>

<style>
:root {
  --van-overlay-background-color: rgba(0, 0, 0, 0.4);
}
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
