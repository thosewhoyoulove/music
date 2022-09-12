/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-12 20:47:22
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
    return request({
        method: 'get',
        url: `/user/detail?uid=${uid}`,
    })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
// 说明 : 登录后调用此接口 , 可以获取用户信息

// 接口地址 : /user/subcount

// 调用例子 : /user/subcount
export function getUserAcount() {
    const store = useStore();
    const userInfo = userStore()
    const { user } = storeToRefs(userInfo) //获得用户信息
    return request({
        method: 'post',
        withCredentials: true,
        url: `/user/subcount?cookie=${encodeURIComponent(user.value.cookie)}`,
    })
}