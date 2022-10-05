/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 15:07:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-05 20:04:47
 */
import request from '~/utils/request'

// mv 地址
// 说明: 调用此接口, 传入 mv id, 可获取 mv 播放地址

// 必选参数: id: mv id

// 可选参数: r: 分辨率, 默认 1080, 可从 / mv / detail 接口获取分辨率列表

// 接口地址: /mv/url

// 调用例子:

//     /mv/url ? id = 5436712 / mv / url ? id = 10896407 & r = 1080
export function getMvUrl(id) {
    return request({
        method: 'post',
        url: `/mv/url?id=${id}`,
    })
}

// 获取 mv 数据
// 说明: 调用此接口, 传入 mvid(在搜索音乐的时候传 type = 1004 获得), 可获取对应 MV 数据, 数据包含 mv 名字, 歌手, 发布时间, mv 视频地址等数据, 其中 mv 视频 网易做了防盗链处理, 可能不能直接播放, 需要播放的话需要调用 ' mv 地址'
// 接口

// 必选参数: mvid: mv 的 id

// 接口地址: /mv/detail

// 调用例子: /mv/detail ? mvid = 5436712

export function getMvDetail(id) {
    return request({
        method: 'post',
        url: `/mv/detail?mvid=${id}`,
    })
}