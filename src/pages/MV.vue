<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 14:58:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-06 21:05:10
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
            <div>{{ filter(fansCnt) }}粉丝</div>
            <div class="ml-1">{{ videoCount }}视频</div>
          </div>
        </div>
      </div>
      <div shadow="~ md gray-400/15" class="flex" v-if="!isFollow" @click="Follow">
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
    <van-list class="pb-20">
      <div
        class="flex"
        v-for="{ name, artistName, cover, id, duration, playCount } in mvList"
        :key="id"
        @click="switchId(id)"
      >
        <img class="flex w-40 h-20 rounded-lg my-1 ml-2 relative" :src="cover" alt="" />
        <div class="absolute left-32 mt-15 text-hex-fff scale-50">
          {{ formatMsToDate(duration) }}
        </div>
        <div class="flex-col text-left text-xs">
          <div class="flex ml-1 mb-4 mt-1">
            <div class="scale-70"><van-tag color="#f00" plain>MV</van-tag></div>
            <div>{{ name }}</div>
          </div>
          <div class="ml-2 text-hex-bbb">
            <div>{{ artistName }}</div>
            <div class="mt-3">{{ filter(playCount) }}播放</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { getArtistDetail, getArtistFollowCount } from "~/api/artist";
import { getMvUrl, getMvDetail, getSimiMv } from "~/api/MV";
const route = useRoute();
const router = useRouter()
let mvId: any = parseInt(route.query.mvId as string);
let videoSrc = ref();
let mvDetail: any = ref({});
let artistId = ref(0);
let artistDetail: any = ref({});
let videoCount = ref(0);
let fansCnt = ref(0); //歌手的粉丝数
let isFollow = ref(false);
let mvList = ref([]); //推荐的MV列表
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
  videoCount.value = artistDetailRes.data.videoCount;
  console.log(artistDetail.value, "歌手详情");
  let artistFollowRes = await getArtistFollowCount(artistId.value);
  console.log(artistFollowRes, "歌手的粉丝数");
  fansCnt.value = artistFollowRes.data.fansCnt;
  isFollow.value = artistFollowRes.data.isFollow;
  let simiMvRes = await getSimiMv(mvId);
  mvList.value = simiMvRes.mvs;
  console.log(mvList.value, "相似MV");
});

//格式化粉丝数h和播放量
const filter = (num: number) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(1)}万`;
  else return num;
};
//格式化MV时长
const addZero = (num: string) => {
  if (parseInt(num) < 10) num = `0${num}`;
  return num;
};
const formatMsToDate = (ms: number) => {
  if (ms) {
    ms = ms / 1000;
    const min = ((ms / 60) as number).toFixed(0);
    const sec = ((ms % 60) as number).toFixed(0);
    const oTime = `${addZero(min)}:${addZero(sec)}`;
    return oTime;
  } else {
    return "";
  }
};
//跳转MV详情页面
const switchId = async(id:any) =>{
  mvId = parseInt(id)
  let res = await getMvUrl(id); //获取MV播放地址
  console.log(res, "res");
  nextTick(() =>{
    videoSrc.value = res.data.url;
    console.log(videoSrc.value,'新地址');
  })
  
}
</script>

<style scoped></style>
