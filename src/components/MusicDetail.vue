<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-17 09:19:04
-->
<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import { getMusicComment } from "~/api/SongDetail";
import "vue3-marquee/dist/style.css";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const props = defineProps<{
  musicList: Object;
  play: Function;
  addDuration: Function;
}>();
const router = useRouter();
const store = useStore();
const isLyricShow = ref(false); // 歌词是否显示
const totalComment = ref(0);

const { playList, playListIndex, currentTime, duration } = storeToRefs(store);

const timeFilter = (time) => {
  const minRes = Math.floor(parseInt(time) / 60);
  const secRes = parseInt(time) % 60;
  let res;
  if (minRes < 10) {
    res = "0" + minRes + ":" + secRes;
  }
  if (secRes < 10) {
    res = minRes + ":" + "0" + secRes;
  } else {
    res = `${minRes}:${secRes}`;
  }

  // console.log(minRes, secRes);
  return res;
};
const nowTime = ref(timeFilter(store.currentTime)); //获取当前时间
const totalTime = ref(timeFilter(duration.value)); //获取总时长
// console.log(totalTime, "totalTime");

const { isShow, isDetailShow } = storeToRefs(store);
onMounted(async () => {
  const res = await getMusicComment(props.musicList.id);
  totalComment.value = res.total;
  console.log(totalComment.value, "音乐评论数");
  totalTime.value = timeFilter(duration.value);//有时候接口数据获取不到的话就会丢失响应式，再赋值一次
  // console.log(store.lyricList.lyric);
  props.addDuration();
  setInterval(() => {
    nowTime.value = timeFilter(store.currentTime);//每隔一秒更改一次当前时间
    // console.log(timeFilter(store.currentTime), "currentTime");
  }, 1000);
});
const change = (target) => {
  // console.log(timeFilter(target.target.value), "value");
  console.log(target.target.value,'value');
  // timeValue.value = Number(target.target.value)
  nowTime.value = timeFilter(target.target.value)
};
const back = () => {
  isDetailShow.value = false;
  console.log(111111111111111);
};
const toCommentDetail = () => {
  isDetailShow.value = false;
  router.push({
    path: "/SongComment",
    query: {
      id: playList.value[playListIndex.value].id,
    },
  });
};
// 下一首上一首操作
const goPlay = (num) => {
  console.log("点击了切换歌曲");

  // 如果是第一首，上一首应该是最后一首
  // 如果是最后一首，下一首应该是第一首
  let index = playListIndex.value + num;
  if (index < 0) index = playList.value.length - 1;
  else if (index == playList.value.length) index = 0;

  store.updatePlayListIndex(index);
};
// 计算属性歌词处理
// let curMin = ref(0)
// let curSec = ref(0)
const lyric = computed(() => {
  let arr;
  if (store.lyricList.lyric) {
    /* 将歌词进行换行符分割 */
    /* 1.先用数组split方法对歌词的换行进行分割
    2.用map方法，遍历数组并对其进行操作返回一个新数组
    3.以对象形式返回为新数组
    */
    arr = store.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
      // 分钟，切割第一到第三
      const min = item.slice(1, 3);
      // 秒钟切割
      const sec = item.slice(4, 6);
      // 毫秒切割
      let mill = item.slice(7, 10);
      // 歌词切割
      let lrc = item.slice(11, item.length);
      // 每句歌词显示的时间,要与audio标签的currentTime对应才能显示active的歌词
      let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      // 因为两句歌词后面的毫秒为两位数，则要进行处理
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9);
        lrc = item.slice(10, item.length);
        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      }
      // console.log(min, sec, Number(mill), lrc)
      // curMin.value = min
      // curSec.value = sec
      // 返回对象组成数组
      return { min, sec, mill, lrc, time };
    });
    // 遍历拿到pre，即后一句歌词的时间
    arr.forEach((item: any, i: any) => {
      // 获取第一的item.pre为0的索引就可以获得总时长了
      // let singleArr = Array.from(item)
      // let res = singleArr.findIndex(s => s.pre == 0)
      // console.log(res);
      // console.log(Array.isArray(singleArr),i);

      if (i === arr.length - 1 || isNaN(arr[i + 1].time)) item.pre = 0;
      else item.pre = arr[i + 1].time;
    });
  }
  // console.log(arr);
  return arr;
});
// this.$refs的vue3写法
const musicLyric = ref(null);
// 监听歌词时间
watch(
  () => store.currentTime,
  (newValue) => {
    const p = document.querySelector("p.active");
    if (p) {
      if (p.offsetTop > 150) musicLyric.value.scrollTop = p.offsetTop - 150;
    }
    if (newValue === store.duration?.value) {
      if (store.playListIndex === store.playList.length - 1) {
        store.updatePlayListIndex(0);
        props.play();
      } else {
        store.updatePlayListIndex(store.playListIndex + 1);
      }
    }
  }
);
</script>

<template>
  <div class="w-100% h-604px relative">
    <div class="absolute -z-1 blur-3xl h-100% w-100% bg-red"></div>
    <img
      class="absolute -z-1 blur-100px h-100% w-100% bg-pink brightness-50"
      :src="props?.musicList?.al?.picUrl"
      alt="背景虚化"
    />
    <div class="flex justify-between mt-5 px-2 relative">
      <div class="text-xl text-hex-ccc" @click="back">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <!-- 歌名跑马灯 -->
      <div class="col mr-15 py-2">
        <Vue3Marquee class="text-sm my-2 text-hex-ccc w-30">{{
          props?.musicList?.name
        }}</Vue3Marquee
        ><!-- 艺人名字 -->
        <div
          class="flex items-center"
          v-for="(item, index) in props?.musicList?.ar"
          :key="index"
        >
          <div class="text-xs text-hex-ccc px-1">{{ item.name }}</div>
          <div class="text-xs text-hex-aaa">
            <van-icon color="#fff" name="arrow"></van-icon>
          </div>
        </div>
      </div>
      <div class="text-xl text-hex-ccc"><van-icon name="share-o"></van-icon></div>
    </div>
    <!-- 磁盘大图 --><img
      class="rounded-1/2 w-40 h-40 absolute top-30% left-25% -translate-x-1/2 animate__animated animate__bounceIn"
      v-show="!isLyricShow"
      :src="props?.musicList?.al?.picUrl"
      alt="这是歌曲详情的磁盘图"
      @click="isLyricShow = true"
    />
    <div
      class="musiclyricList animate__animated animate__backInDown"
      v-show="isLyricShow"
      ref="musicLyric"
      @click="isLyricShow = false"
    >
      <p
        class="ml-6"
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            store.currentTime * 1000 >= item.time && store.currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <!-- 点击展示歌词，并增加了动画效果 -->
    <div class="flex justify-around mt-320px text-xl items-center" v-show="!isLyricShow">
      <span><van-icon name="like-o"></van-icon></span
      ><span style="transform: rotate(180deg)"><van-icon name="upgrade"></van-icon></span
      ><span><van-icon name="close"></van-icon></span
      ><span class="relative" @click="toCommentDetail"
        ><van-icon name="comment-o"></van-icon
        ><van-badge
          class="absolute top-6px -right-3"
          v-if="totalComment > 0"
          style="background: transparent; border-width: 0"
          color="#ccfc"
          :content="totalComment"
          max="999"
        ></van-badge></span
      ><span style="transform: rotate(90deg)"><van-icon name="ellipsis"></van-icon></span>
    </div>
    <div
      class="mx-2 flex mt-6 w-95% bg-transparent justify-around items-center text-xs text-hex-bbb"
    >
      <div class="flex w-5 mr-1">{{ nowTime }}</div>
      <input
        class="flex justify-between mx-1"
        v-model="store.currentTime"
        type="range"
        min="0"
        :max="store.duration"
        step="0.01"
        @change="change"
      />
      <div class="flex w-5 mx-1">{{ totalTime }}</div>
    </div>
    <div class="fixed w-100% flex justify-around mt-40px text-xl items-center">
      <div><van-icon name="replay"></van-icon></div>
      <div @click="goPlay(-1)"><van-icon name="arrow-left"></van-icon></div>
      <div class="text-3xl" v-if="isShow" @click="play">
        <van-icon name="play-circle-o"></van-icon>
      </div>
      <div class="text-3xl" v-else @click="play">
        <van-icon name="pause-circle-o"></van-icon>
      </div>
      <div @click="goPlay(1)"><van-icon name="arrow"></van-icon></div>
      <div><van-icon name="bars"></van-icon></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.van-badge--top-right {
  top: 6px;
  right: -5px;
  color: #003248;
}

input[type="range"] {
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 100%;
  background: -webkit-linear-gradient(#ccc) no-repeat, #ccc; /*设置左边颜色为#61bd12，右边颜色为#ddd*/
  background-size: 75% 100%; /*设置左右宽度比例*/
  height: 3px; /*横条的高度*/
}
/*拖动块的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 0.6rem; /*拖动块高度*/
  width: 0.6rem; /*拖动块宽度*/
  background: #fff; /*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}
/* 歌词 */
.musiclyricList {
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  //溢出滚动
  overflow: scroll;
  p {
    width: 200px;
    font-size: 10px;
    color: rgb(195, 239, 244);
    margin-bottom: 1rem;
  }
  //高亮显示的歌词
  .active {
    color: white;
    font-size: 1.1rem;
    overflow-wrap: break-word;
  }
}
</style>
