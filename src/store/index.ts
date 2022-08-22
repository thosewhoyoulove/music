/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-21 19:43:23
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-22 10:20:56
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
        }
    },
    actions: {
        updateIsShow(state: { isShow: any; },value: any){
            state.isShow = value
        },
        updatePlayList(state: { playList: any; },value: any){
            state.playList = value
        },
        updatePlayListIndex(state: { playListIndex: any; },value: any){
            state.playListIndex = value
        }
    }
})