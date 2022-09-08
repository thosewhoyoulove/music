/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-08 21:20:43
 */
import request from '~/utils/request'
//获取推荐歌曲，不需要登录
export default function getRecommendSongList() {
    return request({
        method: 'get',
        url: '/personalized?limit=10',
    })
}
//获取每日推荐歌曲，需要登录
export function getDailyRecommendSongs() {
    return request({
        method: 'get',
        url: '/recommend/songs',
    })
}