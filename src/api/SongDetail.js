/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-24 18:35:26
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-08 13:28:10
 */
import request from '~/utils/request'

//获取歌曲的歌词

export function getMusicLyric(data) {
    return request({
        method: 'get',
        url: `/lyric?id=${data}`
    })
}
//获取歌曲信息
export function getMusic(data) {
    return request({
        method: 'get',
        url: `/song/detail?ids=${data}`
    })
}
//获取歌曲的评论
export function getMusicComment(data) {
    return request({
        method: 'get',
        url: `/comment/music?id=${data}&limit=100&offset=0`
    })
}

// 音乐是否可用
// 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }

// 必选参数 : id : 歌曲 id

// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推

// 接口地址 : /check/music

// 调用例子 : /check/music?id=33894312
export function isMusicAvailable(data) {
    return request({
        method: 'get',
        url: `/check/music?id=${data}`
    })
}