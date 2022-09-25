import { defineStore} from 'pinia'
import { Names } from "../names";
import { getMusicLyric } from '~/api/SongDetail'
import { generateState, State, Play, LyricList } from "./state"

export const useStore = defineStore(Names.playList, {
    state: generateState,
    actions: {
        updateIsShow(state: State,value: boolean){
            this.isShow = value
        },//底部组件的播放按钮与暂停按钮
        updatePlayList(state: State,value: Play[]){
            this.playList = value
        },//播放歌曲的列表
        updatePlayListIndex (value: number) {
            this.playListIndex = value
        },//播放歌曲的索引值
        updateDetailShow(state: State){
            this.isDetailShow = !state.isDetailShow
        },//歌曲详情页
        updateDuration(state: State,value: number){
            this.duration = value
        },//歌曲的总时长
        async updateCurrentTime(value: number){
            console.log(value, typeof value, "更改时间")
            this.currentTime = value
        },//歌曲的现在时长
        pushPlayList (value:any) {
            this.playList = value
        },// 搜索出来的歌曲，点击播放，将整首歌数据追加到播放列表内
        async getLyric(value: Object) {
            let res =await  getMusicLyric(value)
            // console.log(res);
            this.updateLyric(res.lrc)
        },//异步获取歌词的方法
        updateLyric(value: LyricList){
            this.lyricList = value
        },//修改歌词
        // updateUserInfo(name?:string,password?:string,phoneNumber?:string|number,avatar?:string,email?:string){
        //     this.user.name = name
        // }
    }
})