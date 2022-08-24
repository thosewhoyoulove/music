/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-24 18:35:26
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-24 18:36:36
 */
import request from '~/utils/request'

//获取歌曲的歌词

export function getMusicLyric(data) {
    return request({
        method: 'get',
        url: `/lyric?id=${data}`
    })
}