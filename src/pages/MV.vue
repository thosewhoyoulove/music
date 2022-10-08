<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 14:58:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-08 20:40:11
-->
<template>
  <div class="relative">
    <div>
      <video class :src="videoSrc" controls></video>
    </div>
    <div class="flex justify-between p-1 items-center">
      <div @click="toArtistDetail(artistId)" class="flex items-center">
        <img class="h-10 w-10 rounded-full" :src="artistDetail?.artist?.cover" alt="" />
        <div class="col text-left ml-2">
          <div class="scale-60 -translate-x-1/5">{{ artistDetail?.artist?.name }}</div>
          <div class="flex justify-between scale-60 -translate-x-1/5">
            <div>{{ filter(fansCnt) }}粉丝</div>
            <div class="ml-1">{{ videoCount }}视频</div>
          </div>
        </div>
      </div>
      <div shadow="~ md gray-400/15" class="flex" v-if="!isSub" @click="Follow">
        <van-button icon="plus" color="#f00" plain size="mini" type="primary"
          >关注</van-button
        >
      </div>
      <div
        shadow="~ md gray-400/15"
        v-if="isSub"
        class="flex items-center flex py-1 px-2 text-xs border-hex-eeb border rounded-2xl text-hex-aab bg-hex-ddd"
        @click="Follow"
      >
        <div>已关注</div>
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
        <div class="flex-col text-left text-xs w-40">
          <div class="flex ml-1 mb-4 mt-1">
            <div class="scale-70"><van-tag color="#f00" plain>MV</van-tag></div>
            <div class="text-style">{{ name }}</div>
          </div>
          <div class="ml-2 text-hex-bbb">
            <div>{{ artistName }}</div>
            <div class="mt-3">{{ filter(playCount) }}播放</div>
          </div>
        </div>
      </div>
    </van-list>

    <VanDialog
      class="text-xs"
      v-model:show="isDialogShow"
      title="取消关注后，'关注时长'将重新计算"
      show-cancel-button
      width="18.75rem"
      confirmButtonColor="#f00"
      confirmButtonText="继续关注"
      cancelButtonText="仍要取消"
      @cancel="onDialogCancel"
      @confirm="onDialogConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { getArtistDetail, getArtistFollowCount } from "~/api/artist";
import { getMvUrl, getMvDetail, getSimiMv } from "~/api/MV";
import { isFollow } from "~/api/user";
import { Notify, Dialog } from "vant";
const VanDialog = Dialog.Component;
const route = useRoute();
const router = useRouter();
let mvId: any = parseInt(route.query.mvId as string);
let videoSrc = ref(
  "http://vodkgeyttp8.vod.126.net/cloudmusic/MTAwMDAiMCQ4ICUgOCFhZg==/mv/420144/abbd384e937b34ee7c22eebdd238dbb9.mp4?wsSecret=f62101e3bed0acaf2a8e6581fbc208b0&wsTime=1665127998"
);
let mvDetail: any = ref({});
let artistId = parseInt(route.query.artistId as string);
let artistDetail: any = ref({});
let videoCount = ref(0);
let fansCnt = ref(0); //歌手的粉丝数
let isSub = ref();
let mvList = ref([]); //推荐的MV列表
let isDialogShow = ref(false);
onMounted(async () => {
  console.log(artistId, "歌手id");

  let res = await getMvUrl(mvId); //获取MV播放地址
  console.log(res, "mv播放地址");
  if (res.data.url == null) {
    console.log(111);
    Notify({ type: "warning", message: res.data.msg });
    let artistDetailRes = await getArtistDetail(artistId); //获取歌手详情
    artistDetail.value = artistDetailRes.data;
    videoCount.value = artistDetailRes.data.videoCount;
    let artistFollowRes = await getArtistFollowCount(artistId);
    console.log(artistFollowRes, "歌手的粉丝数");
    fansCnt.value = artistFollowRes.data.fansCnt;
    isSub.value = artistFollowRes.data.isFollow;
    let simiMvRes = await getSimiMv(mvId);
    mvList.value = simiMvRes.mvs;
  } else {
    videoSrc.value = res.data.url;
    let mvDetailRes = await getMvDetail(mvId); //获取MV详情
    console.log(mvDetailRes, "mv详情");
    mvDetail.value = mvDetailRes.data;
    artistId = mvDetailRes.data.artistId; //获取歌手ID
    console.log(mvDetail.value, "mvDetail");
    let artistDetailRes = await getArtistDetail(artistId); //获取歌手详情
    console.log(artistDetailRes, "artistDetailRes");
    artistDetail.value = artistDetailRes.data;
    videoCount.value = artistDetailRes.data.videoCount;
    console.log(artistDetail.value, "歌手详情");
    let artistFollowRes = await getArtistFollowCount(artistId);
    console.log(artistFollowRes, "歌手的粉丝数");
    fansCnt.value = artistFollowRes.data.fansCnt;
    isSub.value = artistFollowRes.data.isFollow;
    let simiMvRes = await getSimiMv(mvId);
    mvList.value = simiMvRes.mvs;
    console.log(mvList.value, "相似MV");
  }
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
const switchId = async (id: any) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  mvId = parseInt(id);
  let res = await getMvUrl(id); //获取MV播放地址
  console.log(res, "res");
  nextTick(() => {
    if (res.data.url == null) {
      console.log(111);
      Notify({ type: "warning", message: res.data.msg });
    } else {
      videoSrc.value = res.data.url;
      console.log(videoSrc.value, "新地址");
    }
  });
};
//跳转歌手主页
const toArtistDetail = (artistId: any) => {
  console.log(artistId);
  router.push({
    path: "/Artist",
    query: {
      artistId: artistId,
    },
  });
};
//点击关注或者已关注
const Follow = async () => {
  if (isSub.value == false) {
    //未关注
    let res = await isFollow(artistId, 1);
    console.log(res);

    if (res.code == 200) {
      // console.log(res);
      nextTick(() => {
        isSub.value = true;
      });

      let followCountRes = await getArtistFollowCount(artistId); //获取歌手的关注数
      Notify({ type: "success", message: "关注成功" });
      console.log(isSub.value, "isSub");
      // router.go(0);
    } else {
      Notify({ type: "danger", message: res.message });
    }
  } else if (isSub.value == true) {
    isDialogShow.value = true;
  }
};
//继续关注
const onDialogConfirm = () => {
  isDialogShow.value = false;
};
//仍要取消
const onDialogCancel = async () => {
  let res = await isFollow(artistId, 0);
  if (res.code == 200) {
    nextTick(() => {
      isSub.value = false;
    });
    Notify({ type: "success", message: "取消关注成功" });
    console.log(isSub.value, "isSub");
    // router.go(0);
  } else {
    Notify({ type: "danger", message: res.message });
  }
  isDialogShow.value = false;
};
</script>

<style scoped>
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
