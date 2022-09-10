/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-10 08:57:40
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-10 08:57:46
 */
import * as axios from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}