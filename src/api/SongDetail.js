/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-24 18:35:26
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-05 18:21:44
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