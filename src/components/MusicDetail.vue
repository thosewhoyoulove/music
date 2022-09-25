<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-25 17:42:28
-->
<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import { getMusicComment } from "~/api/SongDetail";
import "vue3-marquee/dist/style.css";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";

const props = defineProps<{
  musicList: CurrentMusic;
  play: () => void;
  addDuration: Function;
}>();
const router = useRouter();
const store = useStore();
const isLyricShow = ref(false); // 歌词是否显示
const totalComment = ref(0);

const { playList, playListIndex, duration } = storeToRefs(store);

const transformTime = (time: string | number): string => {
  const minRes =
    typeof time == "string" ? Math.floor(parseInt(time) / 60) : Math.floor(time / 60);

  let secRes = typeof time == "string" ? parseInt(time) % 60 : time % 60;

  secRes = Number(secRes.toFixed(0));
  // console.log(secRes)
  let res = "";

  if (secRes < 10) {
    res = minRes + ":" + "0" + secRes;
  } else {
    res = `${minRes}:${secRes}`;
  }

  return res;
};

const nowTime = ref(transformTime(store.currentTime)); //获取当前时间
const totalTime = ref(transformTime(duration.value)); //获取总时长
// console.log(totalTime, "totalTime");

const { isShow, isDetailShow } = storeToRefs(store);

onMounted(async () => {
  const res = await getMusicComment(props.musicList.id);
  totalComment.value = res.total;
  console.log(totalComment.value, "音乐评论数");
  totalTime.value = transformTime(duration.value); //有时候接口数据获取不到的话就会丢失响应式，再赋值一次
  // console.log(store.lyricList.lyric);
  props.addDuration();
  setInterval(() => {
    nowTime.value = transformTime(store.currentTime); //每隔一秒更改一次当前时间
    // console.log(transformTime(store.currentTime), "currentTime");
  }, 1000); //上下两个定时器第一个将时间每秒变化，第二个暂停的时候停止计时
});

let timer = setInterval(() => {
  nowTime.value = transformTime(store.currentTime); //每隔一秒更改一次当前时间
  // console.log(transformTime(store.currentTime), "currentTime");
}, 1000);

//暂停停止计时
const playMusic = () => {
  clearInterval(timer);
  props.play();
};
const change = (event: Event) => {
  // console.log(transformTime(target.target.value), "value");
  // console.log((event.target as HTMLInputElement).value, "value");
  // timeValue.value = Number(target.target.value)
  const value = (event.target as HTMLInputElement).value;
  nowTime.value = transformTime(value);
  store.updateCurrentTime(Number(value));
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

//切换歌曲更新评论数
const getNewComment = async (id: number) => {
  if (store.shouldUpdate) {
    const res = await getMusicComment(props.musicList.id);
    totalComment.value = res.total;
    console.log(totalComment.value, "更新后的评论总数");
    store.shouldUpdate = false;
  }
};
// 下一首上一首操作
const goPlay = (num: number) => {
  console.log("点击了切换歌曲");
  store.updateIsShow(store.$state, true);
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
const lyric = computed<LyricItem[]>(() => {
  let arr: Array<LyricItem> = [];
  console.log(store.lyricList, "components/MusicDetail....lyricList");
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

      let pre = 0;
      // 因为两句歌词后面的毫秒为两位数，则要进行处理
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9);
        lrc = item.slice(10);
        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      }
      // console.log(min, sec, Number(mill), lrc)
      // curMin.value = min
      // curSec.value = sec
      // 返回对象组成数组
      return { min, sec, mill, lrc, time, pre };
    });
    // 遍历拿到pre，即后一句歌词的时间
    arr.forEach((item: LyricItem, i: number) => {
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
const musicLyric = ref<HTMLElement>();
// 监听歌词时间
watch(
  () => store.currentTime,
  (newValue) => {
    const p = document.querySelector<HTMLElement>("p.active");
    if (p && p.offsetTop > 150 && musicLyric.value) {
      musicLyric.value.scrollTop = p.offsetTop - 150;
    }
    if (newValue === store.duration) {
      if (store.playListIndex === store.playList.length - 1) {
        store.updatePlayListIndex(0);
        props.play();
      } else {
        store.updatePlayListIndex(store.playListIndex + 1);
      }
    }
  }
);
watch(
  () => store.playListIndex,
  (newVal) => {
    store.shouldUpdate = true;
    getNewComment(props.musicList.id);
  }
);
//过滤评论数
const transform = (num: number) => {
  if (num > 1000000) return "100w+";
  else if (num > 100000) return "10w+";
  else if (num > 10000) return "1w+";
  else if (num > 1000) return "999+";
  else return num;
};
</script>

<template>
  <div class="w-100% h-100vh relative">
    <div class="absolute -z-1 blur-3xl h-100% w-100% bg-red"></div>
    <img
      class="absolute -z-1 blur-100px h-100% w-100% bg-pink brightness-50"
      :src="props.musicList.al.picUrl"
      alt="背景虚化"
    />
    <div class="flex justify-between mt-4 px-5 relative">
      <div class="text-xl text-hex-ccc" @click="back">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <!-- 歌名跑马灯 -->
      <div class="col absolute left-10 -top-0.25rem">
        <Vue3Marquee class="text-sm my-2 text-hex-ccc w-30">{{
          props.musicList.name
        }}</Vue3Marquee
        ><!-- 艺人名字 -->
        <div v-for="(item, index) in props.musicList.ar" :key="index">
          <router-link class="flex items-center ml-5" :to="`artist/${item.id}`">
            <div class="text-xs text-hex-ccc px-1">{{ item.name }}</div>
            <div class="text-xs text-hex-aaa">
              <van-icon color="#fff" name="arrow"></van-icon>
            </div>
          </router-link>
        </div>
      </div>
      <div class="text-xl text-hex-ccc"><van-icon name="share-o"></van-icon></div>
    </div>
    <!-- 磁盘大图 -->
    <div
      v-show="!isLyricShow"
      :class="[
        isShow ? '' : '',
        'top-40%',
        'left-50%',
        '-translate-y-1/2',
        '-translate-x-1/2',
      ]"
      style="
        position: absolute;
        width: 14rem;
        height: 14rem;
        background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
        --tw-bg-opacity: 1;
        border-radius: 50%;
      "
    >
      <img
        class="rounded-1/2 w-11rem h-11rem animate__animated animate__bounceIn ml-6 mt-6"
        v-show="!isLyricShow"
        :src="props.musicList.al.picUrl"
        alt="这是歌曲详情的磁盘图"
        @click="isLyricShow = true"
      />
    </div>
    <div
      class="musicLyricList animate__animated animate__backInDown"
      v-show="isLyricShow"
      ref="musicLyric"
      @click="isLyricShow = false"
    >
      <p
        class="ml-6"
        v-for="(item, index) in lyric"
        :key="index"
        :class="{
          active:
            store.currentTime * 1000 >= item.time && store.currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <!-- 点击展示歌词，并增加了动画效果 -->
    <div
      class="flex h-2.5rem justify-around mt-65vh text-md items-center"
      v-show="!isLyricShow"
    >
      <div><van-icon size="1.125rem" name="like-o"></van-icon></div>
      <div>
        <van-icon
          style="transform: rotate(180deg)"
          size="1.125rem"
          name="upgrade"
        ></van-icon>
      </div>
      <div><van-icon size="1.125rem" name="music-o"></van-icon></div>
      <div class="relative bottom-0" @click="toCommentDetail">
        <van-icon size="1.125rem" name="comment-o"></van-icon>
        <div
          class="absolute bg-hex-ccf text-.1rem -top-1vh -right-7vw scale-x-75 w-11vw text-center justify-center"
          v-if="totalComment > 0"
          style="background: transparent; border-width: 0"
        >
          {{ transform(totalComment) }}
        </div>
      </div>
      <div style="transform: rotate(90deg)">
        <van-icon size="1.125rem" name="ellipsis"></van-icon>
      </div>
    </div>
    <div
      class="absolute top-78vh mx-2 flex w-95vw bg-transparent justify-around items-center text-xs text-hex-bbb"
    >
      <div class="flex w-5 mr-2">{{ nowTime }}</div>
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
    <div class="absolute top-85vh w-100vw flex justify-around text-xl items-center">
      <div><van-icon name="replay"></van-icon></div>
      <div @click="goPlay(-1)"><van-icon name="arrow-left"></van-icon></div>
      <div class="text-3xl" v-show="isShow" @click="playMusic">
        <van-icon name="play-circle-o"></van-icon>
      </div>
      <div class="text-3xl" v-show="!isShow" @click="play">
        <van-icon name="pause-circle-o"></van-icon>
      </div>
      <div @click="goPlay(1)"><van-icon name="arrow"></van-icon></div>
      <div><van-icon name="bars"></van-icon></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
.musicLyricList {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  //溢出滚动
  overflow: scroll;
  p {
    width: 60vw;
    font-size: 0.625rem;
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

@keyframes rotate_ar {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}

.animate-active {
  animation: rotate_ar 10s linear infinite;
  animation-play-state: running;
}
.animate-paused {
  animation: rotate_ar 10s linear infinite;
  animation-play-state: paused;
}
</style>
