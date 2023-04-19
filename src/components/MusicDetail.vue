<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-19 22:41:29
-->
<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import { getMusicComment, getMusic } from "~/api/SongDetail";
import "vue3-marquee/dist/style.css";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
import { Notify } from "vant";
import Lyric from '~/components/Lyric.vue'

const props = defineProps<{
  musicList: CurrentMusic;
  play: () => void;
  addDuration: Function;
  myAudio: any;
}>();

const router = useRouter();
const store = useStore();

const isLyricShow = ref(false); // 歌词是否显示
const totalComment = ref(0);
const fee = ref(0); //歌曲是 0: 免费或无版权
// 1: VIP 歌曲
// 4: 购买专辑
// 8: 非会员可免费播放低音质，会员可播放高音质及下载
// const lrcList = ref(null)
const { playList, playListIndex, duration,lyricList } = storeToRefs(store);
//格式化歌曲时间变为xx:xx
const transformTime = (time: string | number): string => {
  const timeNumber = typeof time === "string" ? parseInt(time) : time;
  const minRes = Math.floor(timeNumber / 60);
  const secRes = (timeNumber % 60).toFixed(0).padStart(2, "0");

  return `${minRes}:${secRes}`;
};
const parseTime = (timeStr: string) => {
    let time = timeStr.split(':')
    return parseInt(time[0]) * 60 + parseInt(time[1])
};
//歌词转化为一个对象
const parseLrc = (lrc: string): Array => {
    let lines = lrc.split('\n')

    let lrcData: any = ref([])
    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(']')

        if (parts.length > 1) {
            let timeStr = parts[0].split('[')

            let obj = {
                time: parseTime(timeStr[1]),
                words: parts[1]
            }
            lrcData.value.push(obj)

        }

    }
    return lrcData.value

}
let lrcData = ref(parseLrc(lyricList.value.lyric))//获取歌词
const nowTime = ref(transformTime(store.currentTime)); //获取当前时间
const totalTime = ref(transformTime(props.myAudio.duration)); //获取总时长
// console.log(totalTime, "totalTime");

const { isShow, isDetailShow } = storeToRefs(store);

//设置歌曲的偏移量
function getAudioDuration(audio) {
  return new Promise((resolve) => {
    if (audio.duration) {
      resolve(audio.duration);
    } else {
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
      };
    }
  }).catch(() => 0);
}
onMounted(async () => {
  console.log(lrcData.value,'歌词');
  
  
 nextTick(()=>{
  console.log(props.myAudio.duration,transformTime(props.myAudio.duration),'duration');
 })
  // console.log(props.myAudio, "我是传过来的myAudio");
  //获取歌曲评论
  const res = await getMusicComment(props.musicList.id, 100, 0); //参数有三个
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
//点击进度条更改歌曲时间：首先在外部获取到audio元素，然后传到子组件，子组件的进度条是type为range的input元素，最小值为0，最大值为歌曲的总时间，然后绑定input的change事件
//接收一个event参数，event参数的target.value值就是点击到的或者拖动到的进度条的时间数，将这个时间数赋值给传过来的audio元素的currentTime，就可以实现点击切换歌曲时间的功能了
const change = (event: Event) => {
  console.log(event);
  const value = (event.target as HTMLInputElement).value;
  nowTime.value = transformTime(value);
  props.myAudio.currentTime = Number(value);
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
    const res = await getMusicComment(props.musicList.id, 10, 0);
    totalComment.value = res.total;
    console.log(totalComment.value, "更新后的评论总数");
    store.shouldUpdate = false;
  }
};
// 下一首上一首操作
const goPlay = async (num: number) => {
  console.log(playListIndex.value,'第几首歌');
  let index = playListIndex.value + num;
  if (index < 0) index = playList.value.length - 1;
  else if (index == playList.value.length) index = 0;
  store.updatePlayListIndex(index);
  isLyricShow.value = false; // 隐藏歌词显示页面中的“歌词”按钮控件。
  console.log("点击了下一首",playList.value,playListIndex.value);
  //在nextTick外获取数据，在里面赋值
  let res = await store.getLyric(playList.value[playListIndex.value]?.id);
  nextTick(()=>{
    console.log(playListIndex.value,'第几首歌的歌词');
    lrcData.value = parseLrc(res?.lyric)
    console.log(lrcData.value,'歌词');
  })
 
  // console.log("点击了切换歌曲",lrcData.value,'切换后的lrcData');
  // console.log(store.lyricList.lyric,'切换后的store.lyricList.lyric');
  
  // console.log(props.myAudio.duration,'props.myAudio.duration');
  
  // nextTick(()=>{
  //   totalTime.value = transformTime(props.myAudio.duration)
  // })
  store.updateIsShow(store.$state, true);
  // let musicDetailRes = await getMusic(props.musicList.id);
  // fee.value = musicDetailRes.songs[0].fee;
  // console.log(fee.value, "歌曲类别");
  // 如果是第一首，上一首应该是最后一首
  // 如果是最后一首，下一首应该是第一首
  

  
};


//过滤评论数
const transform = (num: number) => {
  if (num > 1000000) return "100w+";
  else if (num > 100000) return "10w+";
  else if (num > 10000) return "1w+";
  else if (num > 1000) return "999+";
  else return num;
};
//跳转歌手主页
const toArtistDetail = (item: any) => {
  console.log(item);
  isDetailShow.value = false;
  router.push({
    path: "/Artist",
    query: {
      artistId: item.id,
    },
  });
};
</script>

<template>
  <div class="w-100vw h-100vh relative bg-black">
    <div class="flex justify-between top-20px px-5 relative">
      <div class="text-xl text-hex-ccc" @click="back">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <!-- 歌名跑马灯 -->
      <div class="col absolute left-10 -top-0.25rem">
        <Vue3Marquee class="text-sm my-2 text-hex-ccc w-30">{{
          props.musicList.name
        }}</Vue3Marquee><!-- 艺人名字 -->
        <div v-for="(item, index) in props.musicList.ar" :key="index">
          <div class="flex items-center ml-5" @click="toArtistDetail(item)">
            <div class="text-xs text-hex-ccc px-1">{{ item.name }}</div>
            <div class="text-xs text-hex-aaa">
              <van-icon color="#fff" name="arrow"></van-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="text-xl text-hex-ccc"><van-icon name="share-o"></van-icon></div>
    </div>
    <!-- 磁盘大图 -->
    <div v-if="!isLyricShow" :class="[
      isShow ? '' : '',
      'top-40%',
      'left-50%',
      '-translate-y-1/2',
      '-translate-x-1/2',
    ]" style="
                            position: absolute; 
                            width: 14rem;
                            height: 14rem;
                            background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
                            --tw-bg-opacity: 1;
                            border-radius: 50%;
                          ">
      <img class="rounded-1/2 w-11rem h-11rem animate__animated animate__bounceIn ml-6 mt-6" v-show="!isLyricShow"
        :src="props.musicList.al.picUrl" alt="这是歌曲详情的磁盘图" @click="isLyricShow = true" />
    </div>
      <Lyric :lrcData="lrcData" v-show="isLyricShow" @click="isLyricShow = false"></Lyric>
   

    <!-- 点击展示歌词，并增加了动画效果 -->
    <div class="flex h-2.5rem justify-around mt-65vh text-md items-center" v-show="!isLyricShow">
      <div><van-icon color="#fff" size="1.125rem" name="like-o"></van-icon></div>
      <div>
        <van-icon color="#fff" style="transform: rotate(180deg)" size="1.125rem" name="upgrade"></van-icon>
      </div>
      <div><van-icon color="#fff" size="1.125rem" name="music-o"></van-icon></div>
      <div class="relative bottom-0" @click="toCommentDetail">
        <van-icon color="#fff" size="1.125rem" name="comment-o"></van-icon>
        <div class="absolute text-hex-fff text-.1rem -top-1vh -right-7vw scale-x-75 w-11vw text-center justify-center"
          v-show="totalComment > 0" style="background: transparent; border-width: 0">
          {{ transform(totalComment) }}
        </div>
      </div>
      <div style="transform: rotate(90deg)">
        <van-icon color="#fff" size="1.125rem" name="ellipsis"></van-icon>
      </div>
    </div>
    <div class="absolute top-78vh mx-2 flex w-95vw bg-transparent justify-around items-center text-xs text-hex-bbb">
      <div class="flex w-5 mr-2">{{ nowTime }}</div>
      <input class="flex justify-between" v-model="store.currentTime" type="range" min="0" :max="store.duration"
        step="0.01" @change="change" />
      <div class="flex w-5 mx-2">{{ totalTime }}</div>
    </div>
    <div class="absolute top-85vh w-100vw flex justify-around text-xl items-center">
      <div><van-icon color="#fff" name="replay"></van-icon></div>
      <div @click="goPlay(-1)"><van-icon color="#fff" name="arrow-left"></van-icon></div>
      <div class="text-4xl" v-show="isShow" @click="playMusic">
        <van-icon color="#fff" name="play-circle-o"></van-icon>
      </div>
      <div class="text-4xl" v-show="!isShow" @click="play">
        <van-icon color="#fff" name="pause-circle-o"></van-icon>
      </div>
      <div @click="goPlay(1)"><van-icon color="#fff" name="arrow"></van-icon></div>
      <div><van-icon color="#fff" name="bars"></van-icon></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
input[type="range"] {
  -webkit-appearance: none;
  /*清除系统默认样式*/
  width: 100%;
  background: -webkit-linear-gradient(#ccc) no-repeat, #ccc;
  /*设置左边颜色为#61bd12，右边颜色为#ddd*/
  background-size: 75% 100%;
  /*设置左右宽度比例*/
  height: 3px;
  /*横条的高度*/
}

/*拖动块的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  /*清除系统默认样式*/
  height: 0.6rem;
  /*拖动块高度*/
  width: 0.6rem;
  /*拖动块宽度*/
  background: #fff;
  /*拖动块背景*/
  border-radius: 50%;
  /*外观设置为圆形*/
  border: solid 1px #ddd;
  /*设置边框*/
}

/* 歌词 */
.musicLyricList {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  //溢出滚动
  overflow: scroll;

  p {
    width: 60vw;
    font-size: 0.625rem;
    color: rgb(195, 239, 244);
    margin-bottom: 1rem;
  }

  //高亮显示的歌词

}

.lrcList li .active {
  color: #fff;
  transform: scale(1.2);
  // overflow-wrap: break-word;
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
