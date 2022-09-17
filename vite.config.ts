/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-17 11:07:43
 */
/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers';
import Layouts from 'vite-plugin-vue-layouts';
import viteCompression from 'vite-plugin-compression'//开启gzip压缩
import legacyPlugin from '@vitejs/plugin-legacy'


export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    viteCompression({
      verbose:true,
      disable:false,
      threshold:10240,
      algorithm:'gzip',//开启gzip静态压缩
      ext:'.gz'
    }),
    legacyPlugin({
      targets:['chrome 52'],//需要兼容的浏览器列表
      additionalLegacyPolyfills:['regenerator-runtime/runtime']//兼容IE11
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    Layouts({
      layoutsDirs: 'src/layout',
      defaultLayout: 'default'
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [VantResolver()],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
  build:{
    // assetsDir: './static',
    //css代码分离
    // cssCodeSplit: true,
    minify: 'terser',
    terserOptions:{
      compress:{
        drop_console:true,
        drop_debugger:true,
      },
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
