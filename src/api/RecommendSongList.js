/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-18 20:56:09
 */
import request from '~/utils/request'

export default function getRecommendSongList() {
    return request({
        method: 'get',
        url: '/personalized?limit=10',
    })
}