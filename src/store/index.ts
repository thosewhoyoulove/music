/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-21 19:43:23
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-23 10:57:58
 */
import { defineStore} from 'pinia'
import { Names } from "./store-name";
export const useStore = defineStore(Names.playList, {
    state:()=> {
        return {
            playList:[{
                al:{
                    id: 122474433,//专辑id
                    name: "借月",
                    pic: 109951165690872270,
                    picUrl: "https://p1.music.126.net/nA775k6j7ofdb-mMxjHMIA==/109951165690872270.jpg",
                    pic_str: "109951165690872270"
                },
                id:1817431690//歌曲id
            }],
            playListIndex:0,//播放歌曲的默认下标为0
            isShow:true,//暂停,false为播放
            isDetailShow:false,//歌曲详情页的展示，false为隐藏
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
        }
    }
})