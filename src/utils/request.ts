/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:49:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-10 08:53:19
 */
import axios from 'axios'
import { getToken, removeToken,  removeName, removeAvatar } from './cookie'
import { useStore } from "~/store/index";
import { storeToRefs } from "pinia";
// 创建axios实例
const service = axios.create({
        // 请求路由
        // baseURL: 'http://localhost:3000/', //本地开启后端服务
        baseURL: 'https://netease-cloud-music-7lnmd0dbn-thosewhoyoulove.vercel.app/', //线上测试
        // 请求超时时间
        timeout: 10000,
        withCredentials: true,
    })
    // 请求拦截器
service.interceptors.request.use(
        (config: any) => {
            const store = useStore()//在setup之外使用useStore(),在需要用的时候再引入，不要到顶端直接引入
            const token = store.token;
            if (token) config.headers["X-Token"] = token;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
    // 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        return res;

    },
    (error) => {
        if (error.response && error.response.status === 401) {
            removeToken()
            removeName()
            removeAvatar()
            location.reload()
        }
        return Promise.reject(error);
    }
)
export default service