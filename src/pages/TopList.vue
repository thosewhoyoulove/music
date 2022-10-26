<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-06 10:48:40
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-26 20:06:16
-->
<script setup lang="ts">
import { getTopListDetail } from "~/api/TopList";
const loading = ref(true);
const list: any = ref([]);
const router = useRouter();
onMounted(async () => {
  const res = await getTopListDetail();
  list.value = res.list;
  loading.value = false;
  console.log(list.value, "所有榜单内容摘要");
});
const toTopDetail = (item: any, index: any) => {
  router.push({
    path: "/TopListDetail",
    query: {
      id: item.id,
    },
  });
};
</script>

<template>
  <div class="bg-hex-eee p-1 font-sans-serif pb-20">
    <div class="text-left ml-3 mt-2 font-extrabold text-sm">官方榜</div>
    <van-skeleton :row="13" round :loading="loading" />
    <div
      v-for="(item, index) in list.slice(0, 4)"
      :key="index"
      class="flex m-2 bg-hex-fff rounded-lg p-1 relative"
      @click="toTopDetail(item, index)"
    >
      <img
        class="w-21 h-21 rounded-lg p-1"
        :src="item.coverImgUrl"
        alt="这是排行榜官方榜的封面"
      />
      <div class="flex-col text-left items-center text-12px font-600 ml-1 py-1">
        <ul v-for="(item, index) in list[index].tracks" :key="index" class="py-.5 pt-1">
          <div class="flex">
            <div class="w-3 text-center">{{ index + 1 }}.</div>
            <div class="text-style">{{ item.first }} - {{ item.second }}</div>
          </div>
        </ul>
      </div>
      <div class="absolute text-xs font-700 w-20 text-hex-fff bottom-3 text-center">
        {{ item.updateFrequency }}
      </div>
    </div>
    <div class="text-left ml-3 mt-2 font-extrabold text-sm">精选榜</div>
    <van-skeleton :row="10" round :loading="loading" />
    <div
      v-for="(item, index) in list.slice(4, list.length)"
      :key="index"
      class="inline-block px-1.5 mt-1 relative"
      @click="toTopDetail(item, index)"
    >
      <img
        class="w-20 h-20 rounded-lg"
        :src="item.coverImgUrl"
        alt="这是精选榜官方榜的封面"
      />
      <div class="w-20 absolute bottom-2 text-hex-fff text-xs text-center">
        {{ item.updateFrequency }}
      </div>
    </div>
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
</style>
