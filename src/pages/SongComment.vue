<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-25 12:42:09
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-08 20:37:22
-->
<template>
  <div class="w-100% h-100% bg-white text-sm">
    <div class="font-700 text-left ml-5">评论({{ total }})</div>
    <div class="flex break-all m-1 p-1">
      <img
        class="h-4.5rem rounded-xl ml-2"
        :src="state.songDetail[0]?.al?.picUrl"
        alt="这是歌曲评论的专辑图片"
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
      <van-list class="mb-15">
        <div class="text-left font-600 ml-5">评论区</div>
        <van-tabs v-model:active="active" @click-tab="tabChange">
          <van-tab v-for="(item, index) in choice" :key="index" :title="item">
            <div v-show="active == 0">
              <van-loading
                v-if="showLoading"
                color="#666"
                type="spinner"
                class="mt-5"
                size="24px"
                vertical
              >
                加载中...
              </van-loading>
              <div v-if="!state.comment.length">暂无评论</div>
              <div v-if="!showLoading">
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
                        alt="这是歌曲评论用户的头像"
                      />
                      <div class="col ml-1 text-left">
                        <div class="text-sm font-600">
                          {{ item?.user?.nickname }}
                        </div>
                        <div class="text-10px">{{ item.timeStr }}</div>
                        <div class="font-serif text-13px">
                          {{ item.content }}
                        </div>
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
              </div>
            </div>
            <div v-show="active == 1">
              <van-loading
                v-if="showLoading"
                color="#666"
                type="spinner"
                class="mt-5"
                size="24px"
                vertical
              >
                加载中...
              </van-loading>
              <div v-if="!state.comment.length">暂无评论</div>
              <div v-if="!showLoading">
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
                        alt="这是歌曲评论用户的头像"
                      />
                      <div class="col ml-1 text-left">
                        <div class="text-sm font-600">
                          {{ item?.user?.nickname }}
                        </div>
                        <div class="text-10px">{{ item.timeStr }}</div>
                        <div class="font-serif text-13px">
                          {{ item.content }}
                        </div>
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
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMusicComment, getMusic } from "~/api/SongDetail";
const route = useRoute();
const id = route.query.id;
const state = reactive({
  songDetail: [], //歌曲信息
  comment: [], //歌曲评论
});
const total = ref(0); //评论数
//控制展示最新还是最热评论
const active = ref(0);
const choice = ref(["最新", "最热"]);
const showLoading = ref(true);//展示加载的图标
onMounted(async () => {
  //获取歌曲信息
  let res = await getMusic(id);
  state.songDetail = res.data.songs;
  console.log(res, "歌曲信息");
  //获取歌曲评论
  let comment = await getMusicComment(id);
  console.log(comment, "歌曲评论");
  active.value = 1;
  total.value = comment.data.total;
  state.comment = comment.data.hotComments;
  setTimeout(() => {
    showLoading.value = false;
  }, 1000);
});
const tabChange = async () => {
  showLoading.value = true;
  if (active.value == 0) {
    state.comment = [];
    let res = await getMusicComment(id);
    state.comment = res.data.comments;
    setTimeout(() => {
      showLoading.value = false;
    }, 1000);
  } else if (active.value == 1) {
    state.comment = [];
    let res = await getMusicComment(id);
    state.comment = res.data.hotComments;
    setTimeout(() => {
      showLoading.value = false;
    }, 1000);
  }
};
</script>