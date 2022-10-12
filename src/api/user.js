/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-11 21:16:20
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
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/playlist?uid=${uid}&cookie=${encodeURIComponent(cookie)}`,
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

// 收藏的歌手列表
// 说明: 调用此接口, 可获取收藏的歌手列表

// 接口地址: /artist/sublist

// 调用例子: /artist/sublist
export function getArtistSublist() {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'get',
        url: `/artist/sublist?cookie=${encodeURIComponent(cookie)}`,
    })
}

// 收藏 / 取消收藏歌手
// 说明: 调用此接口, 可收藏歌手

// 必选参数:

//     id: 歌手 id

// t: 操作, 1 为收藏, 其他为取消收藏

// 接口地址: /artist/sub

// 调用例子: /artist/sub ? id = 6452 & t = 1
export function isFollow(id, t) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/artist/sub?id=${id}&t=${t}&cookie=${encodeURIComponent(cookie)}`,
    })
}
// 更新用户信息
// 说明: 登录后调用此接口, 传入相关信息, 可以更新用户信息

// 必选参数:

//     gender: 性别 0: 保密 1: 男性 2: 女性

// birthday: 出生日期, 时间戳 unix timestamp

// nickname: 用户昵称

// province: 省份id

// city: 城市id

// signature： 用户签名
// 接口地址: /user/update

// 调用例子: /user/update ? gender = 0 & signature = 测试签名 & city = 440300 & nickname = binary & birthday = 1525918298004  & province = 440000

export function updateUser(nickname, gender, birthday, signature) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/user/update?gender=${gender}&signature=${signature}&nickname=${nickname}&birthday=${birthday}&cookie=${encodeURIComponent(cookie)}`,
    })
}
// 重复昵称检测
// 说明: 调用此接口, 可检测昵称是否重复, 并提供备用昵称 必选参数: nickname: 昵称

// 接口地址: /nickname/check

// 调用例子: /nickname/check ? nickname = binaryify

export function nicknameCheck(nickname) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/nickname/check?nickname=${nickname}&cookie=${encodeURIComponent(cookie)}`,
    })
}