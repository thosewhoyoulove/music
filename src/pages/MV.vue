<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 14:58:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-06 16:54:36
-->
<template>
  <div class="relative">
    <div>
      <video class="h-200px max-w-100%" :src="videoSrc" controls></video>
    </div>
    <div class="flex justify-between p-1 items-center">
      <div class="flex items-center text-xs">
        <img class="h-10 w-10 rounded-full" :src="artistDetail?.artist?.cover" alt="" />
        <div class="col text-left ml-2">
          <div>{{ artistDetail?.artist?.name }}</div>
          <div class="flex justify-between">
            <div>{{filter(fansCnt)}}粉丝</div>
            <div class="ml-1">{{videoCount}}视频</div>
          </div>
        </div>
      </div>
      <div
        shadow="~ md gray-400/15"
        class="flex"
        v-if="!isFollow"
        @click="Follow"
      >
        <van-button icon="plus" color="#f00" plain size="mini" type="primary"
          >关注</van-button
        >
      </div>
      <div
        shadow="~ md gray-400/15"
        v-if="isFollow"
        class="flex items-center flex py-1 px-2 text-xs border-hex-eeb border rounded-2xl text-hex-aab bg-hex-ddd"
        @click="Follow"
      >
        <div>已关注</div>
        <div class="font-thin ml-1">{{ follow?.followDay?.slice(3) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArtistDetail,getArtistFollowCount } from "~/api/artist";
import { getMvUrl, getMvDetail, getSimiMv } from "~/api/MV";
const route = useRoute();
let mvId: any = parseInt(route.query.mvId as string);
let videoSrc = ref();
let mvDetail: any = ref({});
let artistId = ref(0);
let artistDetail: any = ref({});
let videoCount = ref(0)
let fansCnt = ref(0)//歌手的粉丝数
let isFollow = ref(false)
onMounted(async () => {
  let res = await getMvUrl(mvId); //获取MV播放地址
  console.log(res, "res");
  videoSrc.value = res.data.url;
  let mvDetailRes = await getMvDetail(mvId); //获取MV详情
  console.log(mvDetailRes, "mvDetailRes");
  mvDetail.value = mvDetailRes.data;
  artistId.value = mvDetailRes.data.artistId; //获取歌手ID
  console.log(mvDetail.value, "mvDetail");
  let artistDetailRes = await getArtistDetail(artistId.value); //获取歌手详情
  console.log(artistDetailRes, "artistDetailRes");
  artistDetail.value = artistDetailRes.data;
  videoCount.value  = artistDetailRes.data.videoCount
  console.log(artistDetail.value, "歌手详情");
  let artistFollowRes = await getArtistFollowCount(artistId.value)
  console.log(artistFollowRes,'歌手的粉丝数');
  fansCnt.value = artistFollowRes.data.fansCnt
  isFollow.value = artistFollowRes.data.isFollow
  let simiMvRes = await getSimiMv(mvId);
  console.log(simiMvRes, "相似MV");
});

//格式化粉丝数
const filter = (num: number) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(1)}万`;
  else return num;
};
</script>

<style scoped></style>
