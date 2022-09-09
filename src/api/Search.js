/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-27 11:44:35
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 14:35:34
 */
//搜索歌曲
//必选参数 : keywords : 关键词

// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
import request from '~/utils/request'

export function getSearchMusic(data) {
    return request({
        method: 'get',
        url: `/cloudsearch?keywords=${data}`,
    })
}

// 默认搜索关键词
// 说明 : 调用此接口 , 可获取默认搜索关键词

// 接口地址 : /search/default
export function getSearchKeyWord(data) {
    return request({
        method: 'get',
        url: '/search/default',
    })
}