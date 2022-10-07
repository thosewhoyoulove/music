/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:53:02
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-07 20:54:50
 */
import request from '~/utils/request'
//获取歌单详情 (包括推荐歌单和热门歌单)
export function getSongListDetail(data) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/playlist/detail?id=${data}&cookie=${encodeURIComponent(cookie)}`,
    })
}
//获取歌单所有歌曲
// 必选参数 : id : 歌单 id

// 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量

// 可选参数 : offset : 默认值为0
export function getAllSong(data, limit, offset = 0) {
    const cookie = localStorage.getItem('cookie')
    return request({
        method: 'post',
        url: `/playlist/track/all?id=${data}&limit=${limit}&offset${offset}&cookie=${encodeURIComponent(cookie)}`
    })
}


// 歌单评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )

// 必选参数 : id: 歌单 id

// 可选参数 : limit: 取出评论数量 , 默认为 20

// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值

// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
export function getSongListComment(data, limit, offset = 0) {
    return request({
        method: 'post',
        url: `/comment/playlist?id=${data}&limit=${limit}&offset=${offset}` //搜索的是100条，但渲染的值是热门评论，只有15条
    })
}