/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:49:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-23 17:30:18
 */
import axios from 'axios'
// 创建axios实例
const service = axios.create({
    // 请求路由
    baseURL: 'https://netease-cloud-music-9aqed2u7k-thosewhoyoulove.vercel.app',
    // 请求超时时间
    timeout: 10000,
    withCredentials: true,
})

export default service