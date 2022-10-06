import { Cookies } from 'js-cookie';
/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-17 15:49:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-06 16:16:15
 */
import axios from 'axios'
import { getToken, removeToken, removeName, removeAvatar } from './cookie'
import { userStore } from "~/store/index";
import { Notify } from "vant";
import { storeToRefs } from "pinia";
// 创建axios实例
const service = axios.create({
    // 请求路由
    // baseURL: 'http://localhost:3000/', //本地开启后端服务
    baseURL: 'https://netease-cloud-music-api-five-ebon.vercel.app/', //线上测试
    // baseURL: 'https://www.caojunshuaige.top/',//将vercel的地址解析到自己的域名
    // 请求超时时间
    timeout: 10000,
    withCredentials: true

})
// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        // config.headers['cookie'] ='__remember_me=true; NMTID=00O12_ftYzTNqRugkWPkrPfXeAHhS4AAAGDO_srTA'
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
        if (error.response && error.response.code !== 200) {
            console.log(error, '错误信息');

            removeToken()
            removeName()
            removeAvatar()
            // location.reload()
        }
        return Promise.reject(error);
    }
)
export default service