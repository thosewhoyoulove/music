<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 17:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-18 17:51:14
-->
<template>
  <main font-sans p=".5rem" text="center gray-700 dark:gray-200">
    <router-view />
    <TopNav />
    <Swiper/>
  </main>
</template>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: 2rem;
  height: 2rem;
}
</style>