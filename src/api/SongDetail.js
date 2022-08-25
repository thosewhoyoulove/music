/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-24 18:35:26
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-25 13:00:00
 */
import request from '~/utils/request'

//获取歌曲的歌词

export function getMusicLyric(data) {
    return request({
        method: 'get',
        url: `/lyric?id=${data}`
    })
}

export function getMusicComment(data) {
    return request({
        method: 'get',
        url: `/comment/music?id=${data}&limit=2`
    })
}