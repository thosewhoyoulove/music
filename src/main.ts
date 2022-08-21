/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-21 20:25:59
 */
// import { ViteSSG } from 'vite-ssg' 不知道有什么用
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import {createPinia} from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'


import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
const store = createPinia()
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.use(store)
app.mount('#app')
app.use(Vant)

