/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-06 10:47:17
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-06 13:03:54
 */
// 所有榜单
// 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist

// 调用例子 : /toplist
import request from '~/utils/request'

export function getTopList(data) {
    return request({
        method: 'get',
        url: '/toplist',
    })
}
// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要

// 接口地址 : /toplist/detail

// 调用例子 : /toplist/detail
export function getTopListDetail(data) {
    return request({
        method: 'get',
        url: '/toplist/detail',
    })
}