<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-22 21:03:00
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-05 18:22:30
-->
<template>
  <div class="w-100% h-604px">
    <img
      class="absolute -z-1 blur-3xl h-100% w-100%"
      :src="props?.musicList?.al?.picUrl"
      alt=""
    />
    <div class="flex justify-between mt-5 px-2">
      <div @click="back" class="text-xl text-hex-ccc">
        <van-icon name="arrow-left" />
      </div>
      <div class="col mr-15 py-2">
        <Vue3Marquee class="text-sm my-2 text-hex-ccc w-30">
          {{ props?.musicList?.name }}
        </Vue3Marquee>
        <div
          class="flex items-center"
          v-for="(item, index) in props?.musicList?.ar"
          :key="index"
        >
          <div class="text-xs text-hex-ccc px-1">{{ item.name }}</div>
          <div class="text-xs text-hex-aaa">
            <van-icon color="#fff" name="arrow" />
          </div>
        </div>
      </div>
      <div class="text-xl text-hex-ccc"><van-icon name="share-o" /></div>
    </div>
    <img
      class="al-img rounded-1/2 w-50 h-50 animate__animated animate__bounceIn"
      :src="props?.musicList?.al?.picUrl"
      alt=""
      v-show="!isLyricShow"
      @click="isLyricShow=true"
    />
    <div class="musiclyricList  animate__animated animate__backInDown" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
      <p v-for="item in lyric" :key="item" :class="{active:(store.currentTime*1000)>=item.time&&store.currentTime*1000<item.pre}">{{item.lrc}}</p>
    </div>
    <div v-show="!isLyricShow" class="flex justify-around mt-320px text-xl items-center">
      <span><van-icon name="like-o" /></span>
      <span style="transform: rotate(180deg)"><van-icon name="upgrade" /></span>
      <span><van-icon name="close" /></span>
      <span @click="toCommentDetail" class="relative"
        ><van-icon name="comment-o" /><van-badge
          class="absolute top-6px -right-3"
          style="background: transparent; border-width: 0"
          color="#ccc"
          :content="200"
          max="99"
        ></van-badge
      ></span>
      <span style="transform: rotate(90deg)"><van-icon name="ellipsis" /></span>
    </div>
    <div class="mx-2 flex mt-6 w-95% bg-transparent justify-around items-center text-xs text-hex-bbb">
      <div class="flex">00:00</div>
      <input
        class="flex justify-between mx-1"
        type="range"
        min="0"
        :max="store.duration"
        v-model="store.currentTime"
        step="0.05"
      />
      <div class="flex">04:30</div>
    </div>
    <div class="fixed w-100% flex justify-around mt-40px text-xl items-center">
      <div><van-icon name="replay" /></div>
      <div @click="goPlay(-1)"><van-icon name="arrow-left" /></div>
      <div v-if="isShow" @click="play" class="text-3xl"
        ><van-icon name="play-circle-o"
      /></div>
      <div v-else @click="play" class="text-3xl"
        ><van-icon name="pause-circle-o"
      /></div>
      <div @click="goPlay(1)"><van-icon name="arrow" /></div>
      <div><van-icon name="bars" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { storeToRefs } from "pinia";
import { useStore } from "~/store/index";
const router = useRouter();
const store = useStore();
const isLyricShow = ref(false);//歌词是否显示
const { playList, playListIndex, currentTime, duration } = storeToRefs(store);
const props = defineProps<{
  musicList: Object;
  play: Function;
  addDuration: Function;
}>();
let { isShow, isDetailShow } = storeToRefs(store);
onMounted(() => {
  console.log(props.musicList,'音乐信息');
  console.log(store.lyricList.lyric);
  props.addDuration();
});
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
  //如果是第一首，上一首应该是最后一首
  //如果是最后一首，下一首应该是第一首
  let index = playListIndex.value + num;
  if (index < 0) {
    index = playList.value.length - 1;
  } else if (index === playList.value.length) {
    index = 0;
  }
  store.updatePlayListIndex(index);
};
// 计算属性歌词处理
// let curMin = ref(0)
// let curSec = ref(0)
const lyric = computed(() => {
  let arr
  if (store.lyricList.lyric) {
    /* 将歌词进行换行符分割 */
    /* 1.先用数组split方法对歌词的换行进行分割
    2.用map方法，遍历数组并对其进行操作返回一个新数组
    3.以对象形式返回为新数组
    */
    arr = store.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
      // 分钟，切割第一到第三
      const min = item.slice(1, 3)
      // 秒钟切割
      const sec = item.slice(4, 6)
      // 毫秒切割
      let mill = item.slice(7, 10)
      // 歌词切割
      let lrc = item.slice(11, item.length)
      // 每句歌词显示的时间,要与audio标签的currentTime对应才能显示active的歌词
      let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      // 因为两句歌词后面的毫秒为两位数，则要进行处理
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9)
        lrc = item.slice(10, item.length)
        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      }
      console.log(min, sec, Number(mill), lrc)
      // curMin.value = min
      // curSec.value = sec
      // 返回对象组成数组
      return { min, sec, mill, lrc, time }
    })
    // 遍历拿到pre，即后一句歌词的时间
    arr.forEach((item:any, i:any) => {
      if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
        item.pre = 0
      } else {
        item.pre = arr[i + 1].time
      }
    })
  }
  return arr
}
)
// this.$refs的vue3写法
const musicLyric = ref(null)
// 监听歌词时间
watch(() => store.currentTime, (newValue) => {
  const p = document.querySelector('p.active')
  if (p) {
    if (p.offsetTop > 150) {
      musicLyric.value.scrollTop = p.offsetTop - 150
    }
  }
  if (newValue === store.duration?.value) {
    if (store.playListIndex === store.playList.length - 1) {
      store.updatePlayListIndex(0)
      props.play()
    } else {
      store.updatePlayListIndex(store.playListIndex + 1)
    }
  }
})

</script>

<style lang="less" scoped>
.al-img {
  position: absolute;
  top: 25%;
  left: 20%;
  transform: translate(-50%, -50%);
}
.van-badge--top-right {
  top: 6px;
  right: -5px;
  color: #003248;
}

input[type=range] {
  -webkit-appearance: none;/*清除系统默认样式*/
  width: 100%;
  background: -webkit-linear-gradient(#ccc) no-repeat, #ccc;/*设置左边颜色为#61bd12，右边颜色为#ddd*/
  background-size: 75% 100%;/*设置左右宽度比例*/
  height: 3px;/*横条的高度*/
}
/*拖动块的样式*/
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;/*清除系统默认样式*/
  height: .6rem;/*拖动块高度*/
  width: .6rem;/*拖动块宽度*/
  background: #fff;/*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}
/* 歌词 */
.musiclyricList{
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  //溢出滚动
  overflow: scroll;
  p{
    font-size: 1rem;
    color:rgb(195, 239, 244);
    margin-bottom: 1rem;
  }
  //高亮显示的歌词
  .active{
    color: white;
    font-size: 1.3rem;
  }
}
</style>