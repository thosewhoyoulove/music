/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-15 21:53:08
 */
import request from '~/utils/request'
import { storeToRefs } from "pinia";
import { useStore, userStore } from "~/store/index";

// 获取用户详情
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情

// 必选参数 : uid : 用户 id

// 接口地址 : /user/detail

// 调用例子 : /user/detail?uid=32953014
export function getUserDetail(uid) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'get',
        url: `/user/detail?uid=${uid}?cookie=${encodeURIComponent(cookie)}`,
    })
}
// 获取账号信息
// 说明 : 登录后调用此接口 ,可获取用户账号信息

// 接口地址 : /user/account

// 调用例子 : /user/account
export function getUserAcount() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/account?cookie=${encodeURIComponent(cookie)}`,
    })
}

// 获取用户歌单
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单

// 必选参数 : uid : 用户 id

// 可选参数 :

// limit : 返回数量 , 默认为 30

// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

// 接口地址 : /user/playlist

// 调用例子 : /user/playlist?uid=32953014

export function getUserPlaylist(uid) {
    return request({
        method: 'post',
        url: `/user/playlist?uid=${uid}`,
    })
}

// 获取用户关注列表
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户关注列表

// 必选参数 : uid : 用户 id

// 可选参数 :

// limit : 返回数量 , 默认为 30

// offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

// 接口地址 : /user/follows

// 调用例子 : /user/follows?uid=32953014

export function getUserFollows(uid) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/follows?uid=${uid}`,
    })
}
// 获取用户粉丝列表
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户粉丝列表

// 必选参数 : uid : 用户 id

// 可选参数 : limit : 返回数量 , 默认为 30

// offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

// 接口地址 : /user/followeds

// 调用例子 : /user/followeds?uid=32953014 /user/followeds?uid=416608258&limit=1 /user/followeds?uid=416608258&limit=1&offset=1
export function getUserFolloweds(uid) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/followeds?uid=${uid}`,
    })
}

// 获取用户动态
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户动态

// 必选参数 : uid : 用户 id

// 可选参数 : limit : 返回数量 , 默认为 30

// lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据

// 接口地址 : /user/event

// 调用例子 : /user/event?uid=32953014 /user/event?uid=32953014&limit=1&lasttime=1558011138743
export function getUserEvent(uid) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/event?uid=${uid}`,
    })
}
// 获取用户等级信息
// 说明: 登录后调用此接口, 可以获取用户等级信息, 包含当前登录天数, 听歌次数, 下一等级需要的登录天数和听歌次数, 当前等级进度, 对应 https: //music.163.com/#/user/level

//     接口地址: /user/level

// 调用例子: /user/level
export function getUserLevel() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/level?cookie=${encodeURIComponent(cookie)}`,
    })
}