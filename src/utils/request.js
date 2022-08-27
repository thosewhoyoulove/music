/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:49:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-27 11:25:43
 */
import axios from 'axios'
// 创建axios实例
const service = axios.create({
    // 请求路由
    baseURL: 'http://localhost:3000/',
    // 请求超时时间
    timeout: 10000,
    withCredentials: true,
})

export default service