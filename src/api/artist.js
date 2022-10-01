/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-29 21:20:28
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-01 20:07:34
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
// 歌手粉丝数量
// 说明: 调用此接口, 传入歌手 id, 可获取歌手粉丝数量

// 必选参数: id: 歌手 id

// 可选参数: limit: 取出粉丝数量, 默认为 20

// offset: 偏移数量, 用于分页, 如: (评论页数 - 1) * 10, 其中 10 为 limit 的值

// 接口地址: /artist/follow / count

// 调用例子: /artist/follow / count ? id = 2116
export function getArtistFollowCount(id) {
    return request({
        method: 'post',
        url: `/artist/follow/count?id=${id}`,
    })
}
// 歌手热门 50 首歌曲
// 说明: 调用此接口, 可获取歌手热门 50 首歌曲

// 必选参数:

//     id: 歌手 id

// 接口地址: /artist/top / song

// 调用例子: /artist/top / song ? id = 6452

export function getArtistTopSong(id) {
    return request({
        method: 'post',
        url: `/artist/top/song?id=${id}`,
    })
}