/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-19 20:50:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-21 10:51:35
 */
import request from '~/utils/request'
export function getFm() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/personal_fm?cookie=${encodeURIComponent(cookie)}?timestamp=${Date.now()}` //增加时间戳保证每次获取的歌曲都不重复,
    })
}

export function deleteFm(id) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/fm_trash?id=${id}`,
    })
}