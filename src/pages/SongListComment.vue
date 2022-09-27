<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-24 19:17:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-25 11:45:45
-->

<script setup lang="ts">
import { getSongListComment, getSongListDetail } from "~/api/SongListDetail";
const route = useRoute();
const state = reactive({
  playlist: {}, // 歌单信息
  comment: [], // 歌单评论
});
const total = ref(0); // 评论数
// 控制展示最新还是最热评论
const active = ref(0);
const choice = ref(["最新", "最热"]);
const showLoading = ref(true);
const id = route.query.id;
onMounted(async () => {
  const data = await getSongListDetail(id); // 歌单信息
  state.playlist = data.playlist;
  const res = await getSongListComment(id); // 歌单评论
  active.value = 1;
  total.value = res.total;
  state.comment = res.hotComments;
  console.log(state.comment, total);
  setTimeout(() => {
    showLoading.value = false;
  }, 1000);
});
const tabChange = async () => {
  showLoading.value = true;
  if (active.value == 0) {
    state.comment = [];
    const res = await getSongListComment(id);
    state.comment = res.comments;
    setTimeout(() => {
      showLoading.value = false;
    }, 1000);
  } else if (active.value == 1) {
    state.comment = [];
    const res = await getSongListComment(id);
    state.comment = res.hotComments;
    setTimeout(() => {
      showLoading.value = false;
    }, 1000);
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
        :src="state.playlist.coverImgUrl"
        alt="这是歌单评论的歌单封面"
      />
      <div class="text-left ml-2">
        <div class="text-style text-xs font-600">
          {{ state.playlist.name }}
        </div>
        <div class="text-xs mt-1">by:{{ state.playlist?.creator?.nickname }}</div>
      </div>
    </div>
    <div>
      <van-list>
        <div>
          <div class="text-left font-600 ml-5">评论区</div>
          <van-tabs v-model:active="active" @click-tab="tabChange">
            <van-tab v-for="(item, index) in choice" :key="index" :title="item">
              <div v-show="active == 0">
                <van-loading
                  v-show="showLoading"
                  color="#666"
                  type="spinner"
                  class="mt-5"
                  size="24px"
                  vertical
                >
                  加载中...
                </van-loading>
                
                <div v-show="!showLoading">
                  <div v-show="!state.comment.length">暂无评论</div>
                  <ul
                    v-for="(item, index) in state.comment"
                    :key="index"
                    class="mt-3 break-all relative"
                  >
                    <div class="flex justify-between border-b border-hex-ddd">
                      <div class="flex px-2">
                        <img
                          class="w-2rem h-2rem rounded-full border-0"
                          :src="item.user?.avatarUrl"
                          alt="这是歌单评论的用户头像"
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
                        <div class="flex text-10px mr-.5 color-#ccc">
                          {{ item.likedCount }}
                        </div>
                        <div class="flex my-1">
                          <van-icon size="10px" name="thumb-circle-o" />
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
                  size="24px"
                  vertical
                >
                  加载中...
                </van-loading>
                
                <div v-show="!showLoading">
                  <div v-show="!state.comment.length">暂无评论</div>
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
                          alt="这是歌单评论的用户头像"
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

                      <div class="flex absolute right-0">
                        <div class="flex text-10px mr-.5 color-#ccc">
                          {{ filter(item.likedCount) }}
                        </div>
                        <div class="flex my-1">
                          <van-icon size="10px" name="thumb-circle-o" />
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </van-list>
    </div>
  </div>
</template>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
