<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 17:07:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-19 20:37:40
-->
<script setup lang="ts">
import { getAllSong, getSongListDetail } from '~/api/SongListDetail'
import { useStore } from '~/store/index'
const store = useStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  playlist: {}, // 歌单信息
  songlist: [], // 歌曲信息
})
const loading = ref(true)
const id = parseInt(route.query.id)
onMounted(async () => {
  const res = await getSongListDetail(id)
  state.playlist = res.playlist // 歌单信息
  console.log(state.playlist, '歌单信息')
  const songlist = await getAllSong(id)
  state.songlist = songlist.songs
  loading.value = false
  console.log(state.songlist, '歌曲信息')
})
// 修改歌曲信息并进行播放
const updateSongList = (index) => {
  store.updatePlayList(store.$state, state.songlist) // 将歌单列表传进默认列表
  store.updatePlayListIndex(index) // 将索引值传给默认索引
  store.updateIsShow(store.$state, true) // 修改为暂停图标
}
// 点击评论按钮跳转
const toCommentDetail = () => {
  router.push({
    path: '/SongListComment',
    query: {
      id,
    },
  })
}
</script>

<template>
  <div class="bg-white w-100% h-50vh relative">
    <img
      class="w-100% h-100% rounded-xl absolute blur-xl"
      :src="state.playlist.coverImgUrl"
      alt="这是排行榜详情的底片阴影"
    >
    <div class="justify-between pt-5 items-center px-5 text-white text-right">
      <span class="text-7 mr-2"><van-icon size="25px" name="search" /></span>
      <span class="text-7"><van-icon name="ellipsis" /></span>
    </div>
    <div class="">
      <img
        class="h-8rem m-1 rounded-xl p-1 relative inline-block"
        :src="state.playlist.coverImgUrl"
        alt="这是排行榜详情的封面"
      >
    </div>
    <div
      class="
        flex
        absolute
        text-white text-xs
        pt-1
        px-4
        text-left
        w-100%
        h-5
        overflow-hidden
      "
    >
      <span class="text-style">
        {{ state.playlist.description }}
      </span>
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="relative flex mt-6 text-light-900 justify-around">
      <span class="flex mx-1 items-center justify-between"><van-button style="background: transparent" round><van-icon color="#ccc" size="1rem" name="share-o" /><span
        class="px-1 text-light-900"
      >{{ state?.playlist?.shareCount }}</span></van-button>
      </span>
      <span @click="toCommentDetail"><van-button style="background: transparent" round><van-icon color="#ccc" size="1rem" name="chat-o" /><span
        class="px-1 text-light-900"
      >{{ state?.playlist?.commentCount }}</span></van-button></span>
      <span class="mx-1"><van-button color="#FE3641" round><van-icon size="1rem" name="add-o" /><span class="px-1">{{
        state?.playlist?.subscribedCount
      }}</span></van-button></span>
    </div>
  </div>
  <div class="w-100% pb-16">
    <van-list>
      <div class="flex h-3rem leading-12 text-md">
        <span><van-icon name="play-circle-o" /></span>
        <span class="flex">全部播放</span>
      </div>
      <van-skeleton :row="15" round :loading="loading" />
      <ul
        v-for="(item, index) in state.songlist"
        :key="index"
        class="flex justify-between h-3rem my-1 text-sm px-1"
      >
        <div class="flex justify-between">
          <img
            class="w-3rem h-3rem rounded"
            :src="item.al.picUrl"
            alt="这是排行榜详情的歌曲专辑图片"
          >
          <div class="flex-col ml-2 text-style" @click="updateSongList(index)">
            <div class="flex">
              <div class="flex text-md font-extrabold text-style break-all">
                {{ item.name }}
              </div>
            </div>
            <div class="text-style">
              <span class="text-xs text-gray-500">{{ item.ar[0].name }}</span>
              <span class="text-xs text-gray-500 px-1">-</span>
              <span class="text-xs text-gray-500">{{ item.al.name }}</span>
            </div>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mv" class="mr-5">
            <van-icon size="1rem" name="tv-o" />
          </div>
        </div>
      </ul>
    </van-list>
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
  left: 1rem;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 歌单详情
</route>
