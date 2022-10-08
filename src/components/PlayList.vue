<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-08 14:46:58
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-08 21:09:24
-->
<template>
  <van-action-sheet
    v-model:show="isPlayListShow"
    title=""
    @click="isPlayListShow = false"
  >
    <div class="relative h-100vh mt-5">
      <van-list class="absolute w-100vw bg-white col items-center px-8" @click.stop>
        <div class="flex items-center mt-2">
          <div class="text-lg scale-75 -ml-2">当前播放</div>
          <div class="text-xs text-hex-bbb">({{ playList.length }})</div>
        </div>

        <div
          class="flex text-left items-center justify-between my-6"
          v-for="(item, listIndex) in playList"
          :key="listIndex"
          @click="updateSongList(listIndex)"
        >
          <div class="flex w-auto h-5 items-center">
            <div class="text-style text-sm">{{ item.name }}</div>
            <div class="mx-1">-</div>
            <div v-for="arItem in playList[listIndex].ar" :key="listIndex">
              <div class="flex items-center w-auto">
                <div class="text-hex-bbb text-xs text-style">{{ arItem.name }}</div>
              </div>
            </div>
          </div>

          <div @click="deleteItem(item,listIndex)"><van-icon size="mini" color="#ccc" name="cross" /></div>
        </div>
      </van-list>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const store = useStore();
const { isPlayListShow, playList,isDetailShow } = storeToRefs(store);
onMounted(() => {
  console.log(playList.value);
});
//删除某一项
const deleteItem = (item:any,listIndex:number) =>{
  console.log(item,listIndex);
  playList.value.splice(listIndex,1)
}
// 修改歌曲信息并进行播放
const updateSongList = (index: any) => {
  store.updatePlayList(store.$state, playList.value); // 将歌单列表传进默认列表
  store.updatePlayListIndex(index); // 将索引值传给默认索引
  store.updateIsShow(store.$state, true); // 修改为暂停图标
  isPlayListShow.value = false
  isDetailShow.value = true
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
