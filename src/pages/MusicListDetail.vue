<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 19:13:33
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-10 20:04:18
-->
<script setup lang="ts">
import { getSingleCatPlayList, getSongList } from "~/api/SongList";
const allSongList: any = ref([]); // 所有的热门歌单
const router = useRouter();
const singleSongList = ref([]);
const active = ref();
const loading = ref(true); //切换页面加载提示
const limit = ref(15); //获取歌曲总量
const offset = ref(1); //偏移量
const totalSong = ref(0); //总的歌曲数
const listLoading = ref(false); //下拉刷新加载提示
const finished = ref(false); //是否结束
const cat = ref("华语");
onMounted(async () => {
  const category = await getSongList();
  allSongList.value = category.tags; // 获取热门歌单的标签
  const res = await getSingleCatPlayList(limit.value, cat.value, offset.value); // 获取华语标签的歌单
  totalSong.value = res.total;
  console.log(res, "res");
  singleSongList.value = res.playlists;
  loading.value = false;
  console.log(singleSongList.value);
});
//加载页面
const onLoad = async () => {
  offset.value += 1;
  const res = await getSingleCatPlayList(
    limit.value * offset.value,
    cat.value,
    offset.value
  ); // 获取华语标签的歌单
  singleSongList.value = singleSongList.value.concat(
    res.playlists.slice(singleSongList.value.length, limit.value * offset.value)
  ); //每次只需要后面加载的，将最新加载的连接在原来的数组后面
  listLoading.value = false;
  console.log(singleSongList.value);
  if (singleSongList.value.length == 100) {
    finished.value = true;
  }
};
const change = async (item: any, index: any) => {
  cat.value = index; //切换的时候变换种类
  console.log(cat.value, "cat.value");
  loading.value = true;
  singleSongList.value = [];
  finished.value = false;
  limit.value = 15;
  offset.value = 1;
  // 点击不同的标签切换不同的歌单，这里的index才是标签
  console.log(item, index);
  console.log(singleSongList.value);
  const res = await getSingleCatPlayList(limit.value, cat.value, offset.value);
  singleSongList.value = res.playlists;
  console.log(singleSongList.value, `歌单种类:${index}!!!`);
  loading.value = false;
};
const filter = (num: any) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(0)}万`;
  else return num;
};
const toMusicDetail = (id: any) => {
  router.push({
    path: "/TopListDetail",
    query: {
      id,
    },
  });
};
</script>

<template>
  <div class="pb-20">
    <van-tabs v-model:active="active" @change="change" sticky>
      <van-tab
        v-for="(item, index) in allSongList"
        :key="index"
        :title="item.name"
        @click="change(item, index)"
      >
        <van-loading v-show="loading" size="24px">加载中...</van-loading>
        <van-list
          v-show="!loading"
          v-model:loading="listLoading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in singleSongList"
            :key="index"
            @click="toMusicDetail(item.id)"
            class="relative inline-block pt-1 px-2"
          >
            <img
              class="w-21 h-21 rounded-xl p-1"
              :src="item.coverImgUrl"
              alt="加载失败"
            />
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
  </div>
</template>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.play-icon {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  top: 0.5rem;
  right: 1rem;
}
</style>
