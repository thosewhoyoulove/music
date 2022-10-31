<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-27 11:27:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-31 14:52:20
-->
<script setup lang="ts">
import { Dialog, Notify } from "vant";
import { getSearchHotDetail, getSearchHot } from "~/api/Search";
const route = useRoute();
const router = useRouter();
const VanDialog = Dialog.Component;
const keyWordList = ref([]); // 历史记录存放数组
const keyWord: any = ref(""); // 搜索关键词
const searchList = ref([]); // 存放搜索结果的数组;
const searchHotList = ref([
  { first: "他只是经过" },
  { first: "会不会" },
  { first: "永不失联的爱" },
]); //热门搜索列表(简略)
const searchHotDetailList: any = ref([]); //热门搜索列表(详细)
const defaultSearchKeyWord = ref(route.query.showKeyword);
const onSearch = async () => {
  // 如果输入为空，则直接搜索默认值
  if (keyWord.value == "") {
    keyWord.value = route.query.realkeyword;
    // 数组向前追加元素
    keyWordList.value.unshift(keyWord.value);
    // 去重,这里用到Set语法
    keyWordList.value = [...new Set(keyWordList.value)];
    localStorage.setItem("keyWordList", JSON.stringify(keyWordList.value));
    // keyWord.value = ""
    console.log(keyWord.value);

    searchHistory(keyWord.value);
    console.log(searchList.value);
  } else {
    console.log(keyWord.value);

    // 数组向前追加元素
    keyWordList.value.unshift(keyWord.value);
    // 去重,这里用到Set语法
    keyWordList.value = [...new Set(keyWordList.value)];
    localStorage.setItem("keyWordList", JSON.stringify(keyWordList.value));
    // keyWord.value = ""
    searchHistory(keyWord.value);
  }
  // 固定长度
  if (keyWordList.value.length > 10)
    keyWordList.value.splice(keyWordList.value.length - 1);
};
onMounted(async () => {
  keyWordList.value = JSON.parse(localStorage.getItem("keyWordList") as any) || [];
  let hotList = await getSearchHot(); //获取热门搜索列表(简略)
  searchHotList.value = hotList.result.hots;
  console.log(searchHotList.value, "searchHotList.value");

  let hotDetailList = await getSearchHotDetail(); // 获取热门搜索列表(详细)
  searchHotDetailList.value = hotDetailList.data;
  console.log(searchHotDetailList.value, "searchHotDetailList.value");
});

// 点击删除按钮展示弹出框
const isDialogShow = ref(false);
const showDelete = () => {
  isDialogShow.value = true;
};
const onDialogCancel = () => {
  isDialogShow.value = false;
};
const onDialogConfirm = () => {
  localStorage.removeItem("keyWordList");
  keyWordList.value = [];
  isDialogShow.value = false;
  Notify({ type: "success", message: "删除成功" });
};
// 点击搜索历史,推荐实现搜索
const searchHistory = async (item: string) => {
  keyWord.value = item;
  keyWordList.value.unshift(keyWord.value);
  // 去重,这里用到Set语法
  keyWordList.value = [...new Set(keyWordList.value)];
  localStorage.setItem("keyWordList", JSON.stringify(keyWordList.value));
  router.push({
    path: "/searchDetail/",
    query: {
      searchKey: item,
    },
  });
};
</script>

<template>
  <div class="w-100% rounded bg-hex-eee pt-10">
    <div>
      <van-search
        v-model="keyWord"
        show-action
        :placeholder="defaultSearchKeyWord"
        class="rounded"
        @keydown.enter="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 历史记录 -->
    <div v-if="keyWordList.length" class="text-left ml-2.5 relative my-2">
      <div class="text-xs">历史记录:</div>
      <div
        v-for="(item, index) in keyWordList"
        :key="index"
        class="text-xs inline-block mt-1 mx-1 py-.2rem px-.6rem bg-white rounded-full border"
        @click="searchHistory(item)"
      >
        {{ item }}
      </div>
      <div class="absolute top-.15rem right-1rem" @click="showDelete">
        <van-icon name="delete-o" />
      </div>
    </div>
    <!-- 推荐(简略) -->
    <div class="text-left ml-2.5 my-2">
      <div class="text-xs">推荐:</div>
      <div
        v-for="{ first } in searchHotList.slice(0, 3)"
        class="text-xs inline-block mt-1 mx-1 py-.2rem px-.6rem bg-white rounded-full border"
        @click="searchHistory(first)"
      >
        {{ first }}
      </div>
    </div>
    <!-- 热搜榜 -->
    <div class="bg-white rounded-lg text-left relative my-2 pb-20 text-xs">
      <div class="flex mx-4 h-8 items-center border-b border-hex-ccc">热搜榜</div>
      <!-- 前三个 -->
      <div
        class="mx-2 my-1 flex font-600"
        v-for="(item, index) in searchHotDetailList.slice(0, 3)"
        :key="index"
        @click="searchHistory(item.searchWord)"
      >
        <div class="w-10 text-center text-red">
          {{ index + 1 }}
        </div>

        <div class="text-left">
          {{ item.searchWord }}
        </div>
      </div>
      <!-- 后17个 -->
      <div
        class="mx-2 my-1 flex"
        v-for="(item, index) in searchHotDetailList.slice(3, 20)"
        :key="index"
        @click="searchHistory(item.searchWord)"
      >
        <div class="w-10 text-center">
          {{ index + 4 }}
        </div>

        <div class="text-left">
          {{ item.searchWord }}
        </div>
      </div>
    </div>

    <div v-if="searchList.length" class="bg-white mt-5 rounded-lg p-1">
      <div class="flex justify-between p-1 m-1 border-b-hex-ccc border-b">
        <div>单曲</div>
        <div class="flex justify-between items-center">
          <van-icon name="play-circle-o" />
          <div>播放全部</div>
        </div>
      </div>
    </div>
  </div>

  <VanDialog
    v-model:show="isDialogShow"
    title="是否删除所有历史记录"
    show-cancel-button
    @cancel="onDialogCancel"
    @confirm="onDialogConfirm"
  />
</template>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
