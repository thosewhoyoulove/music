<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:13:33
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-07 10:56:08
-->
<template>
  <div class="mb-15">
    <van-tabs v-model:active="active" @change="change">
      <van-tab
        v-for="(item, index) in allSongList"
        :title="item.name"
        :key="index"
        @click="change(item, index)"
      >
        <div class="inline-block pt-1 px-2" v-for="(item, index) in singleSongList" :key="index" @click="toMusicDetail(item.id)">
          <div class="relative">
            <img class="w-21 h-21 rounded-xl p-1" :src="item.coverImgUrl" alt="" />
            <div class="text-style w-20 text-left text-13px px-1">
              {{ item.name }}
            </div>
            <div class="w-15 flex play-icon text-10px top-1 left-8 rounded-xl text-white absolute z-100">
              <div><van-icon name="play-circle-o" /></div>
              <div class="mx-1">{{ filter(item.playCount) }}</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { getSongList, getSingleCatPlayList } from "~/api/SongList";
import { getSongListDetail } from "~/api/SongListDetail";
const allSongList = ref([]); //所有的热门歌单
const router = useRouter()
const singleSongList = ref([])
const active = ref();
onMounted(async () => {
  let category = await getSongList(); 
  allSongList.value = category.data.tags;//获取热门歌单的标签
  let res = await getSingleCatPlayList("华语");//获取华语标签的歌单
  singleSongList.value = res.data.playlists;
  console.log(singleSongList.value);
});
const change = async (item, index) => {
  //点击不同的标签切换不同的歌单，这里的index才是标签
  console.log(item,index);   
  singleSongList.value = []
  console.log(singleSongList.value);
  let res = await getSingleCatPlayList(index);
  singleSongList.value = res.data.playlists;
  console.log(singleSongList.value, "歌单种类:" + index + "!!!");
};
const filter = (num) => {
  if (num > 100000000) return (num / 100000000).toFixed(0) + "亿";
  else if (num > 10000) return (num / 10000).toFixed(0) + "万";
};
const toMusicDetail = (id) => {
  router.push({
    path: "/TopListDetail",
    query: {
      id: id,
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