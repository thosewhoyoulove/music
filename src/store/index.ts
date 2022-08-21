/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-21 19:43:23
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-21 22:31:16
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
        }
    },
    actions: {
        updatePlayList(state,value: any){
            state.playList = value
        }
    }
})