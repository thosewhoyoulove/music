<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-16 22:44:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-11 10:42:53
-->
<template>
  <div class="w-100% h-100% flex justify-between items-center relative">
    <div @click="show = true" class="text-xl absolute left-0 top-0 z-5">
      <van-icon name="bars" />
    </div>
    <!-- 侧边弹出框 -->
    <van-popup
      v-model:show="show"
      position="left"
      :style="{ height: '100%', width: '70%' }"
    >
      <div class="w-100% h-100% col p-2 bg-hex-F4F5F5">
        <div class="flex px-2 justify-between items-center">
          <div v-if="token" class="flex items-center">
            <img class="flex rounded-full w-10 h-10" :src="user.avatar" alt="">
            <div class="flex mx-1">{{user.name}}</div>
            <div class="flex"><van-icon size="12px" name="arrow" /></div>
          </div>
          <div v-if="!token" class="flex items-center" @click="router.push({path:'/login'})">
            <div class="flex"><van-icon name="user-o" /></div>
            <div class="flex mx-1 text-xs">立即登录</div>
            <div class="flex"><van-icon size="12px" name="arrow" /></div>
          </div>
          <div class="flex">
            <van-icon size="25px" name="scan" />
          </div>
        </div>
        <div
          class="
            flex-col
            w-100%
            text-sm text-left
            p-2
            mt-5
            rounded-lg
            items-center
            bg-white
          "
        >
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
        <div
          class="
            flex-col
            w-100%
            text-sm text-left
            p-2
            mt-5
            rounded-lg
            items-center
            bg-white
          "
        >
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
        <div
          class="
            flex-col
            w-100%
            text-sm text-left
            p-2
            mt-5
            rounded-lg
            items-center
            bg-white
          "
        >
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
        <div
          class="
            flex-col
            w-100%
            text-sm text-left
            p-2
            mt-5
            rounded-lg
            items-center
            bg-white
          "
        >
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
    <div
      class="
        flex
        h-100%
        mx-auto
        mt-5
        justify-between
        items-center
        text-md
        font-500
      "
    >
      <van-tabs
        class="bg-hex-F6F7F9"
        mx-auto
        background="#F6F7F9"
        v-model:active="activeName"
      >
        <van-tab title="我的" name="a">
          <div class="w-90vw"></div>
        </van-tab>
        <van-tab title="发现" name="b">
          <div class="w-50vw">
            <Swiper />
          </div>
          <div class="w-90vw">
            <IconList />
          </div>
          <div class="w-90vw">
            <FindMusic />
          </div>
        </van-tab>
        <van-tab title="云村" name="c">
          <div class="w-90vw"></div>
        </van-tab>
        <van-tab title="视频" name="d">
          <div class="w-90vw"></div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="text-xl absolute top-0 right-0 w-250px" @click="toSearch">
      <van-cell-group inset>
        <van-field
          input-align="center"
          left-icon="search"
          center
          v-model="value"
          :placeholder="showKeyword"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSearchKeyWord } from "~/api/Search";
import { storeToRefs } from "pinia";
import { useStore,userStore } from "~/store/index";
const router = useRouter();
const store = useStore();
const userInfo = userStore()
const {token} = storeToRefs(store);
const {user} = storeToRefs(userInfo)//获得用户信息
//弹出框是否展示
const show = ref(false);
//搜索建议关键词
const showKeyword = ref(""); //输入框的内容
const realkeyword = ref(""); //搜索关键词
//默认展示发现tab
const activeName = ref('b');
onMounted(async () => {
  let res = await getSearchKeyWord();
  console.log(res.data);
  console.log(user.value);
  
  showKeyword.value = res.data.showKeyword;
  realkeyword.value = res.data.realkeyword;
});
const toSearch = () => {
  router.push({
    path: "/Search",
    query: {
      showKeyword: showKeyword.value,
      realkeyword: realkeyword.value,
    },
  });
};
</script>

<style scoped>
.van-cell {
  padding: 2px 4px;
}
.van-field__control {
  color: #fff;
}
.van-tab {
  padding: 10px;
  --van-padding-base: 6px;
}
:root {
  --van-padding-base: 6px;
}
</style>