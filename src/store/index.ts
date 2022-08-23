/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-21 19:43:23
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-23 11:51:38
 */
import { defineStore} from 'pinia'
import { Names } from "./store-name";
export const useStore = defineStore(Names.playList, {
    state:()=> {
        return {
            playList:[{
                al:{
                    id: 126837556,
                    name: "这世界那么多人",
                    pic: 109951165944804130,
                    picUrl: "https://p2.music.126.net/LOTxqRjFm03VJEOHJbUqMw==/109951165944804127.jpg",
                    pic_str: "109951165944804127"
                },
                name: "这世界那么多人",
                id:1817431690,//歌曲id
                ar:[{id: 8926, name: '莫文蔚'}]
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