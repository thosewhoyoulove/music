/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:17:40
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 20:17:57
 */
import request from '~/utils/request'
//获取热门歌单
export function getSongList() {
    return request({
        method: 'get',
        url: '/playlist/hot',
    })
}
// 精品歌单标签列表
// 说明 : 调用此接口 , 可获取精品歌单标签列表

// 接口地址 : /playlist/highquality/tags

// 调用例子 : /playlist/highquality/tags
export function getPlayListTags() {
    return request({
        method: 'get',
        url: '/playlist/highquality/tags',
    })
}