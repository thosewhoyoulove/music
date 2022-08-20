/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-20 17:38:16
 */
import request from '~/utils/request'
//获取歌单详情
export function getSongListDetail(data) {
    return request({
        method: 'get',
        url: `/playlist/detail?id=${data}`,
    })
}
//获取歌单所有歌曲
// 必选参数 : id : 歌单 id

// 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量

// 可选参数 : offset : 默认值为0
export function getAllSong(data) {
    return request({
        method: 'get',
        url: `/playlist/track/all?id=${data}&limit=10&offset=1`
    })
}