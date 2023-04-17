/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-24 20:05:34
 * @LastEditors: 曹俊
 * @LastEditTime: 2023-04-17 23:54:59
 */
import { defineStore } from 'pinia'
import { Names } from "../names";
import { getMusicLyric } from '~/api/SongDetail'
import { generateState, State, Play, LyricList } from "./state"
import { userStore } from '../user/index'


export const useStore = defineStore(Names.playList, {
    state: generateState,
    actions: {
        updateIsShow(state: State, value: boolean) {
            this.isShow = value
        },//底部组件的播放按钮与暂停按钮
        updatePlayList(state: State, value: Play[]) {
            this.playList = value
        },//播放歌曲的列表
        updatePlayListIndex(value: number) {
            this.playListIndex = value
        },//播放歌曲的索引值
        updateDetailShow(state: State) {
            this.isDetailShow = !state.isDetailShow
        },//歌曲详情页
        updateDuration(state: State, value: number) {
            this.duration = value
        },//歌曲的总时长
        async updateCurrentTime(value: number) {
            // console.log(value, typeof value, "更改时间")
            this.currentTime = value
        },//歌曲的现在时长
        async updateAudioTime(value: number) {
            // console.log(value, typeof value, "更改时间")
            this.audioTime = value
        },//歌曲的现在时长
        pushPlayList(value: any) {
            this.playList = value
        },// 搜索出来的歌曲，点击播放，将整首歌数据追加到播放列表内
        async getLyric(id: any) {
            let res = await getMusicLyric(id)
            nextTick(()=>{
                this.lyricList = res.lrc
            })
                // this.updateLyric(res.lrc)
                return this.lyricList	// 返回歌词的列表格式，格式如下：[0]:歌词内容，

            
             

        },//异步获取歌词的方法,要用nextTick将更新后的歌词渲染到页面上，否则歌词不会显示出来

        updateLyric(value: LyricList) {
           
                this.lyricList = value
                

        },

    }
})