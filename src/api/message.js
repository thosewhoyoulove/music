/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-25 20:43:11
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-29 15:45:47
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
// 发送私信
// 说明: 登录后调用此接口, 传入用户 id 和要发送的信息, 可以发送私信, 返回内容为历史私信, 包含带歌单的私信信息(注: 不能发送私信给自己)

// 必选参数:

//     user_ids: 用户 id, 多个需用逗号隔开

// msg: 要发送的信息

// 接口地址: /send/text

// 调用例子: /send/text ? user_ids = 32953014 & msg = test, /send/text ? user_ids = 32953014, 475625142 & msg = test5142 & msg = test
export function sendMsg(user_ids, msg) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/send/text?user_ids=${user_ids}&msg=${msg}&cookie=${encodeURIComponent(cookie)}`,
    })
}