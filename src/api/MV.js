/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 15:07:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-05 15:07:30
 */
import request from '~/utils/request'

export function getMvUrl(id) {
    return request({
        method: 'post',
        url: `/mv/url?id=${id}`,
    })
}