<!-- 
    歌手主页
 -->

<template>
  <div class="h-55vh bg-hex-eee w-100vw">
    <img class="absolute h-50 w-100vw" :src="artistDetail?.artist?.cover" alt="" />
    <div class="relative h-50 top-40 rounded-lg bg-white mx-3">
      <img
        v-if="artistDetail?.user?.avatarUrl"
        class="absolute h-15 w-15 rounded-full -top-15% left-50% -translate-x-1/2"
        :src="artistDetail?.user?.avatarUrl"
        alt=""
      />
      <div class="absolute flex items-center top-20% left-50% -translate-x-1/2">
        <div class="font-sans font-650">
          {{ artistDetail?.artist?.name }}
        </div>
        <img
          v-if="artistDetail?.user?.avatarDetail?.identityIconUrl"
          class="w-4 h-4 ml-1"
          :src="artistDetail?.user?.avatarDetail?.identityIconUrl"
          alt=""
        />
      </div>

      <div
        class="absolute top-35% left-50% -translate-x-1/2 flex font-sans text-10px text-hex-aab"
      >
        <div class="">{{ follow?.followCnt }} 关注</div>
        <div class="mx-1">|</div>
        <div class="">{{ filter(follow?.fansCnt) }} 粉丝</div>
      </div>
      <div
        v-if="artistDetail?.identify?.imageDesc"
        class="absolute top-45% left-50% -translate-x-1/2 flex font-sans text-10px text-hex-aab"
      >
        {{ artistDetail?.identify?.imageDesc }}
      </div>

      <div
        shadow="~ md gray-400/15"
        class="absolute top-65% left-50% -translate-x-1/2 flex items-center"
        v-if="!isSub"
        @click="Follow"
      >
        <van-button icon="plus" color="#f00" plain size="mini" type="primary"
          >关注</van-button
        >
      </div>
      <div
        shadow="~ md gray-400/15"
        v-if="isSub"
        class="absolute top-65% left-50% -translate-x-1/2 flex items-center flex py-1 px-2 text-xs border-hex-eeb border rounded-2xl text-hex-aab bg-hex-ddd"
        @click="Follow"
      >
        <div>已关注</div>
        <div class="font-thin ml-1">{{ follow?.followDay?.slice(3) }}</div>
      </div>
    </div>
  </div>
  <van-tabs class="pb-20" background="#eee" v-model:active="active" sticky>
    <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
      <div class="text-left mt-2 pl-4" v-show="index == 0">
        <div class="font-600">艺人百科</div>
        <div class="flex items-center text-xs mt-1">
          <img
            v-if="artistDetail?.user?.avatarDetail?.identityIconUrl"
            class="w-3 h-3 mr-1"
            :src="artistDetail?.user?.avatarDetail?.identityIconUrl"
            alt=""
          />
          <div>
            {{ artistDetail?.identify?.imageDesc }}
          </div>
        </div>
        <div class="font-sans text-xs mt-1">艺人名：{{ artistDetail?.artist?.name }}</div>
        <div class="text-xs">歌手简介：{{ artistDetail?.artist?.briefDesc }}</div>
      </div>
      <van-list v-show="index == 1">
        <div class="text-left ml-4 pt-4 font-550 text-sm">热门五十首</div>
        <div
          v-for="(item, index) in artistTopSong"
          :key="index"
          class="flex justify-between text-xs"
          @click="updateSongList(index)"
        >
          <div class="flex justify-between items-center">
            <div class="flex mx-2 w-5 justify-center items-center">
              {{ index + 1 }}
            </div>

            <div class="col text-left m-2 w-auto">
              <div class="flex text-left text-style mb-1">
                {{ item.name }}
              </div>

              <div class="flex text-left w-auto">
                <div
                  class="flex text-style"
                  v-for="(ar, index) in artistTopSong[index].ar"
                  :key="index"
                >
                  <div class="text-gray-500 mr-1">
                    {{ item.ar[index].name }}
                  </div>
                </div>

                <div v-if="item.al.name" class="px-1 text-gray-500">-</div>
                <div class="w-auto text-style text-gray-500">
                  {{ item.al.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div @click="toMv(item)" class="mr-5" v-if="item.mv !== 0">
              <van-icon name="tv-o" />
            </div>
          </div>
        </div>

        <div class="text-sm flex justify-center items-center h-10 text-hex-bbb">
          <div class="mr-1">全部演唱</div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </van-list>
      <van-list class="" v-show="index == 2">
        <div class="text-left ml-4 pt-4 mb-3 font-550 text-sm">专辑</div>
        <div
          v-for="(item, index) in albumList"
          :key="index"
          class="flex justify-between p-1"
          @click="toAlbum(item)"
        >
          <div class="flex justify-between items-center pl-1">
            <img class="w-13 h-13 rounded" :src="item.picUrl" alt="" />
            <div class="col text-left m-2 text-style">
              <div class="flex text-sm text-left text-style break-all">
                <div class="text-style">
                  {{ item.name }}
                </div>
                <div class="text-style ml-2 text-hex-bbb" v-if="item.alias.length">
                  ({{ item.alias[0] }})
                </div>
              </div>

              <div class="flex w-45 text-left text-xs">
                <div>{{ formatMsToDate(item.publishTime) }}</div>
                <div class="ml-1">{{ item.size }}首</div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
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
</template>

<script setup lang="ts">
import { Notify, Dialog } from "vant";
import {
  getArtistDetail,
  getArtistFollowCount,
  getArtistTopSong,
  getArtistAlbum,
} from "~/api/artist";
import { isFollow, getArtistSublist } from "~/api/user";
import { useStore } from "~/store/index";
const VanDialog = Dialog.Component;
const store = useStore();
const route = useRoute();
const router = useRouter();
let artistId = parseInt(route.query.artistId as any); //接收的是字符串的id
let artistDetail: any = ref({});
let isDialogShow = ref(false);
let state:any = reactive({
  artistIdSubList: [] as any[],
}); //关注的歌手列表
let isSub = ref(false); //是否关注该歌手
let follow: any = ref({ followDay: "已关注1天" }); //获取用户对歌手的关注信息
const tabs: any = ref(["主页", "歌曲", "专辑", "动态", "视频"]);
const active = ref(0);
let artistTopSong: any = ref([]);
let albumList: any = ref([]);
onMounted(async () => {
  console.log(artistId, isSub.value);
  //通过判断用户的关注列表有没有给歌手的ID来判断用户是否关注改歌手，有点不及时，可以直接用粉丝数那个接口带上用户信息即可获取用户的关注信息
  // let artistSubListRes = await getArtistSublist();
  // state.artistIdSubList = artistSubListRes.data.map((item: any) => item.id);
  // console.log(state.artistIdSubList, "state.artistIdSubList");

  // isSub.value = state.artistIdSubList.includes(artistId); //在用户关注的列表寻找这个歌手的id
  // console.log(isSub.value, "hoisahiodhoaishd");

  let artistDetailRes = await getArtistDetail(artistId); //获取歌手详情
  artistDetail.value = artistDetailRes.data;
  console.log(artistDetail.value, "artistDetail.value");
  let followCountRes = await getArtistFollowCount(artistId); //获取歌手的关注数
  follow.value = followCountRes.data;
  console.log(follow.value, "用户的关注信息");

  isSub.value = followCountRes.data.isFollow; //是否关注该歌手

  console.log(follow.value, "follow.value");
  let artistTopSongRes = await getArtistTopSong(artistId); //获取歌手热门的五十首
  artistTopSong.value = artistTopSongRes.songs;
  console.log(artistTopSongRes, "歌手热门五十");
  let res = await getArtistAlbum(artistId);
  console.log(res, "res");

  albumList.value = res?.hotAlbums;
});
//格式化粉丝数
const filter = (num: number) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(1)}万`;
  else return num;
};
//格式化专辑出版时间
const addZero = (num: string | number) => {
  if (parseInt(num) < 10) num = `0${num}`;
  return num;
};
const formatMsToDate = (ms: string | number | Date) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDay();
    const oTime = `${oYear}-${addZero(oMonth)}-${addZero(oDay)}`;
    return oTime;
  } else {
    return "";
  }
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
        follow.value.followDay = "已关注1天";
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
//跳转MV详情页面
const toMv = (item: any) => {
  console.log(item);
  router.push({
    path: "MV",
    query: {
      mvId: item.mv,
      artistId: item.ar[0].id,
    },
  });
};
// 修改歌曲信息并进行播放
const updateSongList = (index: any) => {
  store.updatePlayList(store.$state, artistTopSong.value); // 将歌单列表传进默认列表
  store.updatePlayListIndex(index); // 将索引值传给默认索引
  store.updateIsShow(store.$state, true); // 修改为暂停图标
};
//跳转专辑界面
const toAlbum = (item: any) => {
  console.log(item);
  router.replace({
    path: "/Album",
    query: {
      albumId: item.id,
    },
  });
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
