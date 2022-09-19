<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 19:13:33
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:35:42
-->
<script setup lang="ts">
import { getSingleCatPlayList, getSongList } from '~/api/SongList'
const allSongList = ref([]) // 所有的热门歌单
const router = useRouter()
const singleSongList = ref([])
const active = ref()
const loading = ref(true)
onMounted(async () => {
  const category = await getSongList()
  allSongList.value = category.tags // 获取热门歌单的标签
  const res = await getSingleCatPlayList('华语') // 获取华语标签的歌单
  singleSongList.value = res.playlists
  loading.value = false
  console.log(singleSongList.value)
})
const change = async (item, index) => {
  loading.value = true
  // 点击不同的标签切换不同的歌单，这里的index才是标签
  console.log(item, index)
  singleSongList.value = []
  console.log(singleSongList.value)
  const res = await getSingleCatPlayList(index)
  singleSongList.value = res.playlists
  console.log(singleSongList.value, `歌单种类:${index}!!!`)
  loading.value = false
}
const filter = (num) => {
  if (num > 100000000)
    return `${(num / 100000000).toFixed(1)}亿`
  else if (num > 10000)
    return `${(num / 10000).toFixed(0)}万`
  else return num
}
const toMusicDetail = (id) => {
  router.push({
    path: '/TopListDetail',
    query: {
      id,
    },
  })
}
</script>

<template>
  <div class="pb-15">
    <van-tabs v-model:active="active" @change="change">
      <van-tab
        v-for="(item, index) in allSongList"
        :key="index"
        :title="item.name"
        @click="change(item, index)"
      >
        <div
          v-for="(item, index) in singleSongList"
          :key="index"
          class="inline-block pt-1 px-2"
          @click="toMusicDetail(item.id)"
        >
          <div class="relative">
            <img
              class="w-20 h-20 rounded-xl p-1"
              :src="item.coverImgUrl"
              alt="这是歌单广场的封面"
            >
            <div class="text-style w-20 text-left text-13px px-1">
              {{ item.name }}
            </div>
            <div
              class="
                flex play-icon text-12px px-2 py-0.5 rounded-xl absolute
              "
            >
              <div><van-icon name="play-circle-o" /></div>
              <div class="mx-1">
                {{ filter(item.playCount) }}
              </div>
            </div>
          </div>
        </div>
        <van-skeleton :row="20" round :loading="loading" />
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
  top: 8px;
  right: 5px;
}
</style>
