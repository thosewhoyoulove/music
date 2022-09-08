<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-16 22:44:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-08 21:49:14
-->
<template>
  <div class="w-100% h-10 flex justify-between items-center">
    <span @click="show = true" class="text-xl">
      <van-icon name="bars" />
    </span>
    <van-popup v-model:show="show" position="left" :style="{ height: '100%', width:'70%' }">
      <div class="w-100% h-100% col p-2 bg-hex-F4F5F5">
        <div class="flex px-2 justify-between items-center">
          <div class="flex">
              <div>头像</div>
              <div>昵称</div>
              <div><van-icon name="arrow" /></div>
          </div>
          <div class="flex">
            <van-icon size="25px" name="scan" />
          </div>
        </div>
        <div class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white">
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="envelop-o" /></div>
              <div class="">我的消息</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="points" /></div>
              <div>云贝中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="user-circle-o" /></div>
              <div>创作者中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
        </div>
        <div class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white">
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="envelop-o" /></div>
              <div class="">我的消息</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="points" /></div>
              <div>云贝中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="user-circle-o" /></div>
              <div>创作者中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
        </div>
        <div class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white">
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="envelop-o" /></div>
              <div class="">我的消息</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="points" /></div>
              <div>云贝中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="user-circle-o" /></div>
              <div>创作者中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
        </div>
        <div class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white">
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="envelop-o" /></div>
              <div class="">我的消息</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="points" /></div>
              <div>云贝中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1"><van-icon name="user-circle-o" /></div>
              <div>创作者中心</div>
            </div>
            <div class="flex"><van-icon name="arrow" /></div>
          </div>
        </div>
      </div>
    </van-popup>
    <div class="flex w-70% justify-between items-center text-md font-500">
      <span>我的</span>
      <span class="font-900">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <span class="text-xl" @click="toSearch">
      <van-icon name="search" />
    </span>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
//弹出框是否展示
const show = ref(false)
const toSearch = () => {
  router.push({
    path: "/Search",
  });
};
</script>

<style scoped>
</style>