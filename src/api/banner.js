/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-18 18:51:18
 */
import request from '~/utils/request'

export function getBanner() {
    return request({
        method: 'get',
        url: '/banner?type=2',
    })
}