/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-21 19:43:23
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-24 21:07:08
 */
import { defineStore} from 'pinia'
import { Names } from "./store-name";
import { getMusicLyric } from '~/api/SongDetail'
export const useStore = defineStore(Names.playList, {
    state:()=> {
        return {
            playList:[{
                al:{
                    id: 73326637,
                    name: "中国新说唱 第10期",
                    pic: 109951163551410660,
                    picUrl: "https://p2.music.126.net/D-mpVLLwMrA-hPu0QPYUNQ==/109951163551410648.jpg",
                    pic_str: "109951163551410648"
                },
                name: "飘向北方 (Live)",
                id:1308818967,//歌曲id
                ar:[{id: 12514278, name: '那吾克热-NW'},{id: 13058503, name: '尤长靖'}]
            }],
            playListIndex:0,//播放歌曲的默认下标为0
            isShow:true,//暂停,false为播放
            isDetailShow:false,//歌曲详情页的展示，false为隐藏
            duration:0,//歌曲的总时间
            currentTime:0,//歌曲现在的时间
            lyric:{},//歌词
        }
    },
    actions: {
        updateIsShow(state: { isShow: any; },value: any){
            state.isShow = value
        },//底部组件的播放按钮与暂停按钮
        updatePlayList(state: { playList: any; },value: any){
            state.playList = value
        },
        updatePlayListIndex(state: { playListIndex: any; },value: any){
            state.playListIndex = value
        },
        updateDetailShow(state: { isDetailShow: boolean; }){
            state.isDetailShow = !state.isDetailShow
        },
        updateDuration(state: { duration: any; },value: any){
            state.duration = value
        },
        updateCurrentTime(state: { duration: any; },value: any){
            state.duration = value
        },
        async getLyric(value: any) {
            let res =await  getMusicLyric(value)
            this.lyric = res
            
        }
    }
})