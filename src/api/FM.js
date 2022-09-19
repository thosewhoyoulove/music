/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-19 20:50:32
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-19 20:50:44
 */
import request from '~/utils/request'
export function getFm() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/personal_fm?cookie=${encodeURIComponent(cookie)}`,
    })
}