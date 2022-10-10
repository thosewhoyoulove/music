/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-09 21:11:29
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-10 12:58:05
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
// 专辑评论
// 说明: 调用此接口, 传入音乐 id 和 limit 参数, 可获得该专辑的所有评论(不需要 登录)

// 必选参数: id: 专辑 id

// 可选参数: limit: 取出评论数量, 默认为 20

// offset: 偏移数量, 用于分页, 如: (评论页数 - 1) * 20, 其中 20 为 limit 的值

// before: 分页参数, 取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)

// 接口地址: /comment/album

// 调用例子: /comment/album ? id = 32311
export function getAlbumComment(id, limit, offset = 0) {
    return request({
        method: 'post',
        url: `comment/album?id=${id}&limit=${limit}&offset=${offset}`,
    })
}