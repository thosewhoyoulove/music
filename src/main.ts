/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-14 19:28:11
 */
// import { ViteSSG } from 'vite-ssg' 不知道有什么用
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'


import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import { Dialog, DatetimePicker } from 'vant'
import Vant from 'vant';
import { ConfigProvider } from 'vant';
import 'vant/lib/index.css';
import Vue3Marquee from 'vue3-marquee'
import 'animate.css';

const app = createApp(App)
const store = createPinia()
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.use(store)
app.use(Vue3Marquee)
app.use(ConfigProvider);
app.use(DatetimePicker);
app.use(Dialog)
app.mount('#app')
app.use(Vant)

