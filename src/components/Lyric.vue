<template>
    <div ref="lyric_container" class="container h-60vh w-100% absolute top-25 mt-5 overflow-hidden text-center border">
        <ul ref="lrcUl" class="leading-8  text-hex-666 transition-0.2 ">
            <li ref="lrcLi" v-for="(item) in props.lrcData" class="text-xs h-64px w-100%  break-words">{{ item?.words }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from 'vue'
import { useStore } from "~/store/index";
const store = useStore();
const { playList, playListIndex } = storeToRefs(store);
let props = defineProps<{
    lrcData: any[]; 	// 歌曲歌词列表，每个元素包含歌词和歌词在歌曲中的起始时间。格式为{ words: string, time: string }。

}>();
let lyric_container = ref<HTMLDivElement | null>(null)  // container for the lyrics div element. 创建一个元素div来存放歌曲歌词。
let lrcUl = ref<HTMLUListElement | null>(null)
let lrcLi = ref<HTMLOListElement | null>(null)
let parseTime = (timeStr: string) => {
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
    return props.value

}
// let lrcData = ref(parseLrc(store.lyricList.lyric))
//计算出当前播放器放到第几秒的情况下，lrcData数组中应该高亮的歌词下标
const findIndex = (time) => {
    for (let i = 0; i < props.lrcData.length; i++) {
        if (time < props.lrcData[i].time) {
            return i - 1
        }
    }
    return props.lrcData.length - 1; //如果没有找到该时间的歌词，则返回最后一个元素的下
}
const containerHeight = ref(0)
const liHeight = ref(0)
onMounted(() => {
    window.addEventListener('touchmove', () => {
        console.log(1111111111);
    });
}),//todo,监听用户滑动事件
    //监听playListIndex变化,重新获取歌词
    // watch(() => store.playListIndex, (index) => {
    //     if (index) {
    //         nextTick(() => {


    //             props.lrcData = parseLrc(store.lyricList.lyric)
    //             store.getLyric(playList.value[playListIndex.value]?.id);


    //         })

    //     }
    // }, { immediate: true })
// 监听歌词时间
watch(
    () => store.currentTime,
    (newVal) => {
        // console.log(newVal, "newVal");
        let liHeight = lrcUl?.value?.children[0].clientHeight
        let containerHeight = lyric_container.value?.clientHeight
        if (newVal && liHeight && containerHeight) {
            nextTick(() => {
                // console.log(lyric_container.value?.clientHeight, 'lrcUl.value');
                // console.log(lyric_container.value?.clientHeight);
                let offset = liHeight * findIndex(newVal) + liHeight / 2 - containerHeight / 2;
                let maxOffset = liHeight - containerHeight;
                if (offset < 0) {
                    offset = 0
                }
                // if (offset > maxOffset) {
                //     offset = maxOffset;
                // }
                lrcUl.value.style.transform = `translateY(-${offset}px) `
                let li = lrcUl.value.querySelector('.active');

                if (li) {
                    li.classList.remove('active');
                }
                li = lrcUl.value.children[findIndex(newVal)];
                if (li) {
                    li.classList.add('active');

                }

            })


        }
    }, { immediate: true }
);

</script>

<style scoped>
.container ul {
    /* border: 2px solid #fff; */
    transition: 0.6s;
}

.container li {
    /* border: 1px solid #fff; */
    transition: 0.6s;
}

.container li.active {
    color: #fff;
    /* font-size: ; */
    transform: scale(1.2);
}
</style>