/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-09 21:11:29
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-09 21:11:36
 */
// 获取专辑内容
// 说明: 调用此接口, 传入专辑 id, 可获得专辑内容

// 必选参数: id: 专辑 id

// 接口地址: /album

// 调用例子: /album?id=32311
import request from '~/utils/request'

export function getAlbumDetail(id) {
    return request({
        method: 'post',
        url: `album?id=${id}`,
    })
}