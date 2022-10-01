<!-- 
    歌手主页
 -->

<template>
  <div class="h-55vh bg-hex-eee w-100vw">
    <img class="absolute h-50 w-100vw" :src="artistDetail?.artist?.cover" alt="" />
    <div class="relative h-40 top-40 rounded-lg bg-white mx-3">
      <img
        v-if="artistDetail?.user?.avatarUrl"
        class="absolute h-15 w-15 rounded-full -top-20% left-50% -translate-x-1/2"
        :src="artistDetail?.user?.avatarUrl"
        alt=""
      />
      <div class="absolute flex items-center top-30% left-50% -translate-x-1/2">
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
        class="absolute top-50% left-50% -translate-x-1/2 flex items-center font-sans text-10px text-hex-aab"
      >
        <div class="">{{ follow?.followCnt }} 关注</div>
        <div class="mx-1">|</div>
        <div class="">{{ filter(follow?.fansCnt) }} 粉丝</div>
      </div>
      <div
        v-if="artistDetail?.identify?.imageDesc"
        class="absolute top-65% left-50% -translate-x-1/2 flex items-center font-sans text-10px text-hex-aab"
      >
        {{ artistDetail?.identify?.imageDesc }}
      </div>

      <div
        shadow="~ md gray-400/15"
        class="absolute top-75% left-50% -translate-x-1/2 flex items-center"
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
        class="absolute top-80% left-50% -translate-x-1/2 flex items-center flex py-1 px-2 text-xs border-hex-eeb border rounded-2xl text-hex-aab bg-hex-ddd"
        @click="Follow"
      >
        <div>已关注</div>
        <div class="font-thin ml-1">{{ follow?.followDay?.slice(3) }}</div>
      </div>
    </div>
  </div>
  <van-tabs class="pb-20" background="#eee" v-model:active="active" @change="change">
    <van-tab class=""
      v-for="(item, index) in tabs"
      :key="index"
      :title="item"
      @click="change(item, index)"
    >
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
        <div class="font-sans text-xs mt-1">
          艺人名：{{ artistDetail?.artist?.name }}
        </div>
        <div class="text-xs">
        歌手简介：{{artistDetail?.artist?.briefDesc}}
        </div>
    </div>
    
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { Notify } from "vant";
import { getArtistDetail, getArtistFollowCount } from "~/api/artist";
import { isFollow } from "~/api/user";
const route = useRoute();
const router = useRouter();
let artistId = parseInt(route.query.artistId); //接收的是字符串的id
let artistDetail = ref({});
let isSub = ref(Number(route.query.isSub)); //接收的是数字0或1
let follow = ref({}); //获取用户对歌手的关注信息
const tabs = ref(["主页", "歌曲", "专辑", "动态", "视频"]);
const active = ref(0);
onMounted(async () => {
  console.log(artistId, isSub.value);
  let artistDetailRes = await getArtistDetail(artistId);
  artistDetail.value = artistDetailRes.data;
  console.log(artistDetail.value, "artistDetail.value");
  let followCountRes = await getArtistFollowCount(artistId);
  follow.value = followCountRes.data;
  console.log(follow.value, "follow.value");
});
//格式化粉丝数
const filter = (num) => {
  if (num > 100000000) return `${(num / 100000000).toFixed(1)}亿`;
  else if (num > 10000) return `${(num / 10000).toFixed(1)}万`;
  else return num;
};
//点击关注或者已关注
const Follow = async () => {
  if (isSub.value == 0) {
    //未关注
    let res = await isFollow(artistId, 1);
    console.log(res);

    if (res.code == 200) {
      // console.log(res);
      isSub.value = 1;
      Notify({ type: "success", message: "关注成功" });
      console.log(isSub.value, "isSub");
      // router.go(0);
    } else {
      Notify({ type: "danger", message: res.message });
    }
  } else if (isSub.value == 1) {
    let res = await isFollow(artistId, 0);
    if (res.code == 200) {
      isSub.value = 0;
      Notify({ type: "success", message: "取消关注成功" });
      console.log(isSub.value, "isSub");
      // router.go(0);
    } else {
      Notify({ type: "danger", message: res.message });
    }
  }
};
</script>

<style scoped></style>
