<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 14:58:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-05 20:37:14
-->
<template>
  <div>
    <video :src="videoSrc" controls></video>
  </div>
  <div>
    <img class="h-10 w-10 rounded-full" :src="artistDetail?.artist?.cover" alt="" />
    <div>{{ artistDetail?.artist?.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { getArtistDetail } from "~/api/artist";
import { getMvUrl, getMvDetail } from "~/api/MV";
const route = useRoute();
let mvId: any = parseInt(route.query.mvId as string);
let videoSrc = ref();
let mvDetail: any = ref({});
let artistId = ref(0)
let artistDetail:any = ref({})
onMounted(async () => {
  let res = await getMvUrl(mvId);
  console.log(res, "res");
  videoSrc.value = res.data.url;
  let mvDetailRes = await getMvDetail(mvId);
  console.log(mvDetailRes, "mvDetailRes");
  mvDetail.value = mvDetailRes.data;
  artistId.value = mvDetailRes.data.artistId
  console.log(mvDetail.value,'mvDetail');
  
  let artistDetailRes = await getArtistDetail(artistId.value)
  console.log(artistDetailRes,'artistDetailRes');
  
  artistDetail.value = artistDetailRes.data
  console.log(artistDetail.value,'歌手详情');
  
});
</script>

<style scoped></style>
