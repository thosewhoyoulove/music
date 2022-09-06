<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-25 12:42:09
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 15:15:20
-->
<template>
  <div class="w-100% h-100% bg-white text-sm">
    <div class="font-700 text-left ml-5">评论({{ total }})</div>
    <div class="flex break-all m-1 p-1">
      <img
        class="h-4.5rem rounded-xl ml-2"
        :src="state.songDetail[0]?.al?.picUrl"
        alt=""
      />
      <div class="text-left ml-2">
        <div class="text-style text-sm font-600">
          {{ state.songDetail[0]?.name }}
        </div>
        <div
          class="flex items-center"
          v-for="(item, index) in state.songDetail[0]?.ar"
          :key="index"
        >
          <div class="text-xs text-hex-ccc p-1">{{ item.name }}</div>
          <div class="text-xs text-hex-aaa">
            <van-icon color="#ccc" name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-list class="h-1652px">
        <div class="text-left ml-5">评论区</div>
        <ul
          v-for="(item, index) in state.comment"
          :key="index"
          class="mt-3 border-b border-gray-500"
        >
          <div class="flex justify-between">
            <div class="flex">
              <img
                class="w-3rem h-3rem rounded-full"
                :src="item.user?.avatarUrl"
                alt=""
              />
              <div class="col ml-1 text-left">
                <div class="text-sm font-600">{{ item?.user?.nickname }}</div>
                <div class="text-xs">{{ item.timeStr }}</div>
                <div class="font-serif">{{ item.content }}</div>
              </div>
            </div>

            <div class="flex">
              <div class="text-sm mt-.5 mr-.5 color-#ccc">
                {{ item.likedCount }}
              </div>
              <div class=""><van-icon name="thumb-circle-o" /></div>
            </div>
          </div>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMusicComment, getMusic } from "~/api/SongDetail";
const route = useRoute();
const id = route.query.id;
const total = ref(0);
const state = reactive({
  songDetail: [], //歌曲信息
  comment: [], //歌曲评论
});
onMounted(async () => {
  //获取歌曲信息
  let res = await getMusic(id);
  state.songDetail = res.data.songs;
  console.log(res, "歌曲信息");
  //获取歌曲评论
  let comment = await getMusicComment(id);
  console.log(comment, "歌曲评论");
  total.value = comment.data.total;
  state.comment = comment.data.hotComments;
});
</script>