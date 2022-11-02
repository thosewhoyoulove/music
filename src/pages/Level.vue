<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-18 11:43:10
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-18 14:47:41
-->
<template>
  <div>
    <div class="w-20 font-550 ml-5 mt-10">我的等级</div>
    <div class="w-15 h-15 mx-auto">
      <van-image round :src="avatarUrl">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div>当前等级：Lv{{ level }}</div>

    <!-- 等级进度条 -->
    <div class="flex w-80 items-center h-10 mx-auto mt-5">
      <div class="ml-1">0</div>
      <div class="w-65 mx-3 h-6.9 mt-5">
        <van-progress color="#ee0a24" stroke-width="8px" :percentage="percentage" />
      </div>
      <div>10</div>
    </div>
    <div class="w-40 text-10px text-left text-hex-ccc">等级数据每天下午两点更新</div>
    <van-divider></van-divider>
    <div class="w-50 text-left ml-2">
      <div class="text-12px font-600">当前等级特权</div>
      <div class="text-10px my-1" v-for="(item, index) in info" :key="index">
        - {{ item }}
      </div>
    </div>
  </div>
  <van-divider></van-divider>
  <div class="mt-2">
    <div class="w-50 text-left text-10px text-hex-ccc">
      距离下一个等级：Lv{{ level + 1 }}
    </div>
    <div class="flex">
      <div class="w-50%">
        <van-circle
          v-model:current-rate="songCurrentRate"
          :rate="30"
          :speed="100"
          :text="nextSong"
          color="#ee0a24"
          layer-color="#ebedf0"
        />
        <div class="text-10px">听歌量：还需{{ nextSong }}首</div>
      </div>
      <div class="w-50%">
        <van-circle
          v-model:current-rate="dayCurrentRate"
          :rate="30"
          :speed="100"
          :text="nextDay"
          color="#ee0a24"
          layer-color="#ebedf0"
        />
        <div class="text-10px">登录天数：还需{{ nextDay }}天</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserLevel, getUserAccount } from "~/api/user";
const route = useRoute();
let id = parseInt(route.query.id); //用户id
const avatarUrl = ref(""); //用户头像
const level = ref(0); //用户等级
const progress = ref(0); //升下一级的进度
let percentage = ref(0); //当前等级占总等级(10)的百分比
const songCurrentRate = ref(0); //升级需要听歌曲的进度
const dayCurrentRate = ref(0); //升级需要登录的进度
const info = ref([]); //等级特权的信息，用$分隔
const nextSong = ref(0); //升级听歌数
const nextDay = ref(0); //升级登录数
onMounted(async () => {
  const AcountRes = await getUserAccount(); //获取用户信息
  avatarUrl.value = AcountRes.profile.avatarUrl;
  console.log(id, "id");
  let levelRes = await getUserLevel(id); //获取用户等级
  level.value = levelRes.data.level;
  progress.value = levelRes.data.progress; //升级的进度
  console.log(levelRes, "等级");
  percentage.value = parseInt(level.value * 10 + progress.value * 10); //获取进度条的进度
  if (levelRes.data.nowPlayCount - levelRes.data.nextPlayCount == 0) {
    songCurrentRate.value = 100;
  } else {
    songCurrentRate.value =
      Number(levelRes.data.nowPlayCount / levelRes.data.nextPlayCount) * 100;
  }

  if (levelRes.data.nextLoginCount - levelRes.data.nowLoginCount == 0) {
    dayCurrentRate.value = 100;
  } else {
    dayCurrentRate.value =
      Number(levelRes.data.nowLoginCount / levelRes.data.nextLoginCount) * 100;
  }
  nextSong.value = parseInt(levelRes.data.nextPlayCount - levelRes.data.nowPlayCount);
  nextDay.value = String(levelRes.data.nextLoginCount - levelRes.data.nowLoginCount);
  console.log(nextDay.value);
  info.value = levelRes.data.info.split("$");
});
</script>

<style scoped>
#id {
  display: inline-block;
}
</style>
