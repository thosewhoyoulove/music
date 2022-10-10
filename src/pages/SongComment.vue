~
<!--;  
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-25 12:42:09
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-27 15:05:45
-->
<script setup lang="ts">
import { getMusic, getMusicComment } from "~/api/SongDetail";
const route = useRoute();
const limit = ref(15); //下拉刷新加载提示
const offset = ref(1); //分页数
const listLoading = ref(false); //下拉刷新加载提示
const finished = ref(false); //是否结束
const id = route.query.id;
const totalHot = ref(0); //热门评论的数量
const state: any = reactive({
  songDetail: [], // 歌曲信息
  comment: [], // 歌曲评论
});
const total = ref(0); // 评论数
// 控制展示最新还是最热评论
const active = ref(0);
const choice = ref(["最新", "最热"]);
const showLoading = ref(true); // 展示加载的图标
onMounted(async () => {
  active.value = 1;
  // 获取歌曲信息
  const res = await getMusic(id);
  state.songDetail = res.songs;
  console.log(res, "歌曲信息");
  // 获取歌曲评论
  const comment = await getMusicComment(id, limit.value, 0);
  console.log(comment, "歌曲评论");
  total.value = comment.total;
  state.comment = comment.hotComments;
  totalHot.value = comment.hotComments.length; //获取热门评论
  showLoading.value = false;
});
const tabChange = async () => {
  finished.value = false;
  showLoading.value = true;
  if (active.value == 0) {
    state.comment = [];
    const res = await getMusicComment(id, limit.value, offset.value);
    state.comment = res.comments;
    showLoading.value = false;
  } else if (active.value == 1) {
    limit.value = 15; //将获取值评论数为15
    state.comment = [];
    const res = await getMusicComment(id, limit.value, 0);
    state.comment = res.hotComments;
    showLoading.value = false;
  }
};
const filter = (num: any) => {
  if (num < 10000) return num;
  else if (num > 10000) return `${(num / 10000).toFixed(1)}万`;
};
const onLoad = async () => {
  if (active.value == 0) {
    finished.value = false;
    offset.value += 1;
    const res = await getMusicComment(id, limit.value * offset.value, offset.value);
    state.comment = state.comment.concat(
      res.comments.slice(state.comment.length, limit.value * offset.value)
    );
    listLoading.value = false;
    if (res.more === false) {
      finished.value = true;
    }
  } else if (active.value == 1) {
    finished.value = false;
    offset.value = 0;
    const res = await getMusicComment(id, limit.value * offset.value, offset.value);
    state.comment = state.comment.concat(res.hotComments.slice(state.comment.length, 15));
    listLoading.value = false;
    if (state.comment.length == totalHot.value) {
      finished.value = true;
    }
  }
};
</script>

<template>
  <div class="w-100% h-100% bg-white text-sm pb-20">
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
                size="1.5rem"
                vertical
              >
                加载中...
              </van-loading>
              <div v-show="!showLoading">
                <div v-show="!state.comment?.length">暂无评论</div>
                <van-list
                  v-model:loading="listLoading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                  <div
                    v-for="(item, index) in state.comment"
                    :key="index"
                    class="flex justify-between  mt-3 break-all relative"
                  >
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
                        <div v-if="item.beReplied.length" class="flex items-center mb-2">
                          <div class="text-12px text-hex-0284c7">
                            {{ item.beReplied.length }}条回复
                          </div>
                          <div class="ml-1">
                            <van-icon size=".8125rem" color="#0284c7" name="arrow" />
                          </div>
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
                </van-list>
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
              <div v-show="!showLoading">
                <div v-show="!state.comment?.length">暂无评论</div>
                <van-list
                  v-model:loading="listLoading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                  <div
                    v-for="(item, index) in state.comment"
                    :key="index"
                    class="flex justify-between relative mt-3 break-all"
                  >
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
                        <div v-if="item.beReplied.length" class="flex items-center mb-2">
                          <div class="text-12px text-hex-0284c7">
                            {{ item.beReplied.length }}条回复
                          </div>
                          <div class="ml-1">
                            <van-icon size=".8125rem" color="#0284c7" name="arrow" />
                          </div>
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
                </van-list>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
