/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 19:17:40
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 19:18:31
 */
import request from '~/utils/request'

export function getSongList() {
    return request({
        method: 'get',
        url: '/playlist/catlist',
    })
}