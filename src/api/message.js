/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-25 20:43:11
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-28 16:33:58
 */
import request from '~/utils/request'
// 通知 - 私信
// 说明: 登录后调用此接口, 可获取私信

// 可选参数:

//     limit: 返回数量, 默认为 30

// offset: 偏移数量， 用于分页, 如: (页数 - 1) * 30, 其中 30 为 limit 的值, 默认为 0

// 接口地址: /msg/private

// 调用例子: /msg/private ? limit = 3
export function getPrivateMsg(limit) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/msg/private?limit=${limit}&cookie=${encodeURIComponent(cookie)}`,
    })
}

// 私信内容
// 说明: 登录后调用此接口, 可获取私信内容

// 必选参数: uid: 用户 id

// 可选参数: limit: 返回数量, 默认为 30

// before: 分页参数, 取上一页最后一项的 time 获取下一页数据

// 接口地址: /msg/private / history

// 调用例子: /msg/private / history ? uid = 9003(云音乐小秘书)
export function getMsgDetail(uid, limit) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/msg/private/history?uid=${uid}&limit=${limit}&cookie=${encodeURIComponent(cookie)}`,
    })
}