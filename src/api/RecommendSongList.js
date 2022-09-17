/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-11 10:41:38
 */
import request from '~/utils/request'
//获取发现歌曲，不需要登录
export default function getFindSongList() {
    return request({
        method: 'get',
        url: '/personalized?limit=10',
    })
}
// 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )

// 接口地址 : /recommend/resource

// 调用例子 : /recommend/resource
//获取每日推荐歌单
export function getDailyRecommendSongList() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'get',
        url: `/recommend/resource?cookie=${encodeURIComponent(cookie)}`,
    })
}
//获取每日推荐歌曲，需要登录
export function getDailyRecommendSongs() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'get',
        url: `/recommend/songs?cookie=${encodeURIComponent(cookie)}`,
    })
}