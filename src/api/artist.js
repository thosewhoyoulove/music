/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-29 21:20:28
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-29 21:55:05
 */
// 获取歌手详情
// 说明: 调用此接口, 传入歌手 id, 可获得获取歌手详情

// 必选参数: id: 歌手 id

// 接口地址: /artist/detail

// 调用例子: /artist/detail ? id = 11972054(Billie Eilish)
import request from '~/utils/request'

export function getArtistDetail(id) {
    return request({
        method: 'post',
        url: `artist/detail?id=${id}`,
    })
}