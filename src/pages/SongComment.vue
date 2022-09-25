<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-25 12:42:09
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-25 11:45:32
-->
<script setup lang="ts">
import { getMusic, getMusicComment } from "~/api/SongDetail";
const route = useRoute();
const id = route.query.id;
const state = reactive({
  songDetail: [], // 歌曲信息
  comment: [], // 歌曲评论
});
const total = ref(0); // 评论数
// 控制展示最新还是最热评论
const active = ref(0);
const choice = ref(["最新", "最热"]);
const showLoading = ref(true); // 展示加载的图标
onMounted(async () => {
  // 获取歌曲信息
  const res = await getMusic(id);
  state.songDetail = res.songs;
  console.log(res, "歌曲信息");
  // 获取歌曲评论
  const comment = await getMusicComment(id);
  console.log(comment, "歌曲评论");
  active.value = 1;
  total.value = comment.total;
  state.comment = comment.hotComments;
  setTimeout(() => {
    showLoading.value = false;
  }, 700);
});
const tabChange = async () => {
  showLoading.value = true;
  if (active.value == 0) {
    state.comment = [];
    const res = await getMusicComment(id);
    state.comment = res.comments;
    setTimeout(() => {
      showLoading.value = false;
    }, 1000);
  } else if (active.value == 1) {
    state.comment = [];
    const res = await getMusicComment(id);
    state.comment = res.hotComments;
    setTimeout(() => {
      showLoading.value = false;
    }, 700);
  }
};
const filter = (num) => {
  if (num < 10000) return num;
  else if (num > 10000) return `${(num / 10000).toFixed(1)}万`;
};
</script>

<template>
  <div class="w-100% h-100% bg-white text-sm pb-15">
    <div class="text-left ml-5 mt-3">评论({{ total }})</div>
    <div class="flex break-all m-1 px-1">
      <img
        class="h-4.5rem rounded-xl ml-2"
        :src="state.songDetail[0]?.al?.picUrl"
        alt="这是歌曲评论的专辑图片"
      />
      <div class="text-left ml-2">
        <div class="text-style text-xs font-600">
          {{ state.songDetail[0]?.name }}
        </div>
        <div
          v-for="(item, index) in state.songDetail[0]?.ar"
          :key="index"
          class="flex items-center"
        >
          <div class="text-xs text-hex-ccc pt-1">
            {{ item.name }}
          </div>
          <div class="text-xs text-hex-aaa">
            <van-icon color="#ccc" name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-list>
        <div class="text-left font-600 ml-5">评论区</div>
        <van-tabs v-model:active="active" @click-tab="tabChange">
          <van-tab v-for="(item, index) in choice" :key="index" :title="item">
            <div v-show="active == 0">
              <van-loading
                v-show="showLoading"
                color="#666"
                type="spinner"
                class="mt-5"
                size="1.5rem"
                vertical
              >
                加载中...
              </van-loading>
              <div v-show="!state.comment.length">暂无评论</div>
              <div v-show="!showLoading">
                <ul
                  v-for="(item, index) in state.comment"
                  :key="index"
                  class="mt-3 break-all relative"
                >
                  <div class="flex justify-between border-b border-hex-ddd">
                    <div class="flex px-2">
                      <img
                        class="w-2rem h-2rem rounded-full"
                        :src="item.user?.avatarUrl"
                        alt="这是歌曲评论用户的头像"
                      />
                      <div class="col ml-2 text-left">
                        <div class="text-xs">
                          {{ item?.user?.nickname }}
                        </div>
                        <div class="text-0.625rem text-hex-ccc">
                          {{ item.timeStr }}
                        </div>
                        <div class="text-.9rem my-3">
                          {{ item.content }}
                        </div>
                      </div>
                    </div>

                    <div class="flex absolute right-3">
                      <div class="text-0.625rem mr-.5 color-#ccc">
                        {{ item.likedCount }}
                      </div>
                      <div class="flex my-1">
                        <van-icon size="0.625rem" name="thumb-circle-o" />
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
            <div v-show="active == 1">
              <van-loading
                v-show="showLoading"
                color="#666"
                type="spinner"
                class="mt-5"
                size="1.5rem"
                vertical
              >
                加载中...
              </van-loading>
              <div v-show="!state.comment.length">暂无评论</div>
              <div v-show="!showLoading">
                <ul
                  v-for="(item, index) in state.comment"
                  :key="index"
                  class="mt-3 break-all"
                >
                  <div class="flex justify-between relative border-b border-hex-ddd">
                    <div class="flex px-2">
                      <img
                        class="w-2rem h-2rem rounded-full"
                        :src="item.user?.avatarUrl"
                        alt="这是歌曲评论用户的头像"
                      />
                      <div class="col ml-2 text-left">
                        <div class="text-xs">
                          {{ item?.user?.nickname }}
                        </div>
                        <div class="text-0.625rem text-hex-ccc">
                          {{ item.timeStr }}
                        </div>
                        <div class="text-.9rem my-3">
                          {{ item.content }}
                        </div>
                      </div>
                    </div>

                    <div class="flex absolute z-10 right-3">
                      <div class="text-0.625rem mr-.5 color-#ccc">
                        {{ filter(item.likedCount) }}
                      </div>
                      <div class="flex my-1">
                        <van-icon size="0.625rem" name="thumb-circle-o" />
                      </div>
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
