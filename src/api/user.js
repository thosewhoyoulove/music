/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-15 10:01:43
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
    const store = useStore();
    const userInfo = userStore()
    const { user } = storeToRefs(userInfo) //获得用户信息
    return request({
        method: 'post',
        url: `/user/playlist?uid=${uid}`,
    })
}