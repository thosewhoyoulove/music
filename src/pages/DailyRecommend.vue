<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 19:07:49
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-19 20:35:33
-->
<script setup lang="ts">
import {
  getDailyRecommendSongList,
  getDailyRecommendSongs,
} from '~/api/RecommendSongList'
import { useStore } from '~/store/index'
const store = useStore()
const loading = ref(true)
const router = useRouter()
// 获取时间
const day = new Date()
const Day = ref(day.getUTCDate())
const month = new Date()
const Month = ref(month.getMonth() + 1)
const choice = ref(['推荐歌曲', '推荐歌单'])
const active = ref(0)
const state = reactive({
  songs: [],
  songList: [],
})
onMounted(async () => {
  const recSongRes = await getDailyRecommendSongs()
  state.songs = recSongRes.data.dailySongs
  console.log(recSongRes, '推荐歌曲')
  loading.value = false
  const recSongListRes = await getDailyRecommendSongList()
  console.log(recSongListRes, '推荐歌单')
  state.songList = recSongListRes.recommend
})
const filter = (num: number) => {
  if (num > 100000000)
    return `${(num / 100000000).toFixed(1)}亿`
  else if (num > 10000)
    return `${(num / 10000).toFixed(0)}万`
  else return num
}
// 修改歌曲信息并进行播放
const updateSongList = (index: number) => {
  store.updatePlayList(store.$state, state.songs) // 将歌单列表传进默认列表
  store.updatePlayListIndex(index) // 将索引值传给默认索引
  store.updateIsShow(store.$state, true) // 修改为暂停图标
}
const toMusicDetail = (id: number) => {
  router.push({
    path: '/TopListDetail',
    query: {
      id,
    },
  })
}
</script>

<template>
  <div class="w-100% h-30vh relative bg-hex-DB2C1F">
    <img
      class="w-10 h-10 rounded-xl absolute left-50% top-40% -translate-x-1/2"
      src="/logo.png"
      alt="背景图"
    >
    <div class="flex w-50 items-center text-white pt-34">
      <div class="text-3xl font-500 ml-3">
        {{ Month }}
      </div>
      /
      <div>{{ Day }}</div>
    </div>
  </div>
  <div class="w-100% pb-10">
    <van-tabs v-model:active="active" @click-tab="tabChange">
      <van-tab v-for="(item, index) in choice" :key="index" :title="item">
        <div v-show="active == 0">
          <div class="w-100% mb-15">
            <van-list>
              <div class="flex h-3rem leading-12 text-md">
                <span><van-icon name="play-circle-o" /></span>
                <span class="flex">全部播放</span>
              </div>
              <van-skeleton :row="15" round :loading="loading" />
              <ul
                v-for="(item, index) in state.songs"
                :key="index"
                class="flex justify-between h-3rem my-1 text-sm"
              >
                <div class="flex justify-between">
                  <img
                    class="w-3rem h-3rem rounded"
                    :src="item.al.picUrl"
                    alt="这是每日推荐歌曲图片"
                  >
                  <div
                    class="flex-col ml-2 text-style"
                    @click="updateSongList(index)"
                  >
                    <div class="flex">
                      <div
                        class="flex text-md font-extrabold text-style break-all"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="text-style">
                      <span class="text-xs text-gray-500">{{
                        item.ar[0].name
                      }}</span>
                      <span class="text-xs text-gray-500 px-1">-</span>
                      <span class="text-xs text-gray-500">{{
                        item.al.name
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div v-if="item.mv" class="right-2rem">
                    <van-icon size="1.3rem" name="play-circle-o" />
                  </div>
                </div>
              </ul>
            </van-list>
          </div>
        </div>
        <div v-show="active == 1" class="mb-15">
          <div
            v-for="(item, index) in state.songList"
            :key="index"
            class="inline-block pt-1 px-2"
            @click="toMusicDetail(item.id)"
          >
            <div class="relative">
              <img
                class="w-21 h-21 rounded-xl p-1"
                :src="item.picUrl"
                alt="这是歌单广场的封面"
              >
              <div class="text-style w-20 text-left text-13px px-1">
                {{ item.name }}
              </div>
              <div
                class="flex play-icon text-10px px-2 py-0.5 rounded-xl absolute"
              >
                <div><van-icon name="play-circle-o" /></div>
                <div class="mx-.5">
                  {{ filter(item.playcount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
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
