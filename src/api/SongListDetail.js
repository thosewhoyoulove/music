/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-19 12:08:21
 */
import request from '~/utils/request'

export function getSongListDetail(data) {
    return request({
        method: 'get',
        url: `/playlist/detail?id=${data}`,
    })
}