<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-08-16 22:44:19
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-07 19:47:38
-->
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Dialog, Notify } from "vant";
import { getSearchKeyWord } from "~/api/Search";
import { useStore, userStore } from "~/store/index";
import { getPrivateMsg } from "~/api/message";
const VanDialog = Dialog.Component;
const router = useRouter();
const store = useStore();
const userInfo = userStore();
const { isFooterShow } = storeToRefs(store);
const { user }: any = storeToRefs(userInfo); // 获得用户信息
const cookie = ref(localStorage.getItem("cookie"));
let newMsgCount = ref(0);
// 弹出框是否展示
const show = ref(false);
// 搜索建议关键词
const showKeyword = ref(""); // 输入框的内容
const realkeyword = ref(""); // 搜索关键词
// 默认展示发现tab
const activeName = ref("b");
onMounted(async () => {
  let msgRes = await getPrivateMsg(10);
  console.log(msgRes, "总的");

  newMsgCount.value = msgRes.newMsgCount;
  const res = await getSearchKeyWord();
  isFooterShow.value = true;
  console.log(res.data);
  showKeyword.value = res.data.showKeyword;
  realkeyword.value = res.data.realkeyword;
  console.log(JSON.parse(localStorage.getItem("userInfo") as any), "解析后的数据");
  if (user.value) user.value = JSON.parse(localStorage.getItem("userInfo") as any);
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
const closePopup = () => {
  show.value = false;
  activeName.value = "a";
};
// 展示是否退出登录
const isDialogShow = ref(false);
const onDialogCancel = () => {
  isDialogShow.value = false;
};
const onDialogConfirm = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cookie");
  userInfo.updateIsLogin(false);
  userInfo.removeUserInfo();
  store.updateIsShow(store.$state, true); // 修改为暂停图标
  isDialogShow.value = false;
  show.value = false;
  console.log("点击了退出登录按钮");
  router.push({
    path: "/LoginOrReg",
  });
  setTimeout(() => {
    Notify({ type: "success", message: "退出登录成功" });
  }, 1000);
};
//彩蛋
const caidan = () => {
  Notify({ type: "success", message: "祝你开心每一天" });
};
const toMyMessage = () => {
  router.push({
    path: "/Message",
  });
};
</script>

<template>
  <div class="w-100% h-100% flex justify-between items-center relative">
    <div class="text-xl pt-1 pl-1 absolute left-0 top-0 z-5" @click="show = true">
      <van-icon name="bars" />
    </div>
    <!-- 侧边弹出框 -->
    <van-popup
      v-model:show="show"
      position="left"
      :style="{ height: '100vh', width: '70vw' }"
    >
      <div class="w-100% h-100% col p-2 bg-hex-F4F5F5">
        <div class="flex px-2 justify-between items-center">
          <div v-if="cookie" class="flex items-center" @click="closePopup">
            <img
              class="flex rounded-full w-10 h-10"
              :src="user?.profile?.avatarUrl"
              alt=""
            />
            <div class="flex mx-1 text-style">
              {{ user?.profile?.nickname }}
            </div>
            <div class="flex">
              <van-icon size="12px" name="arrow" />
            </div>
          </div>
          <div
            v-if="!cookie"
            class="flex items-center"
            @click="router.push({ path: '/loginorreg' })"
          >
            <div class="flex">
              <van-icon name="user-o" />
            </div>
            <div class="flex mx-1 text-xs">立即登录</div>
            <div class="flex">
              <van-icon size="12px" name="arrow" />
            </div>
          </div>
          <div class="flex">
            <van-icon size="25px" name="scan" />
          </div>
        </div>
        <div
          class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white"
        >
          <div
            @click="toMyMessage"
            class="flex justify-between border-b border-hex-ccc py-1"
          >
            <div class="flex">
              <div class="pr-1">
                <van-icon name="envelop-o" />
              </div>
              <div class="flex">我的消息</div>
            </div>
            <div class="flex items-center">
              <div
                v-if="newMsgCount !== 0"
                class="flex bg-hex-f00 text-hex-fff scale-80 rounded-full w-6 text-center"
              >
                <div class="w-100% text-center">{{ newMsgCount }}</div>
              </div>
              <div class="flex items-center">
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="points" />
              </div>
              <div>写点什么好呢</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flex justify-between py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="user-circle-o" />
              </div>
              <div>那就祝你开心每一天吧</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div
          class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white"
        >
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="envelop-o" />
              </div>
              <div class="">呜呜呜</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="points" />
              </div>
              <div>今天是疯狂星期四</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flex justify-between py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="user-circle-o" />
              </div>
              <div>我很疯狂</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div
          class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white"
        >
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="envelop-o" />
              </div>
              <div>别点我</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="points" />
              </div>
              <div>点了也没用</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div @click="caidan" class="flex justify-between py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="user-circle-o" />
              </div>
              <div>点击我</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div
          class="flex-col w-100% text-sm text-left p-2 mt-5 rounded-lg items-center bg-white"
        >
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="envelop-o" />
              </div>
              <div class="">马上就要国庆咯</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flex justify-between border-b border-hex-ccc py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="points" />
              </div>
              <div>放几天假好呢</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="flex justify-between py-1">
            <div class="flex">
              <div class="pr-1">
                <van-icon name="user-circle-o" />
              </div>
              <div>那就七天吧</div>
            </div>
            <div class="flex items-center">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div
          class="w-100% font-550 text-16px p-2 mt-5 rounded-lg items-center bg-white color-red py-2"
          @click="isDialogShow = true"
        >
          <div class="w-100% text-center">退出登录</div>
        </div>
        <VanDialog
          v-model:show="isDialogShow"
          title="是否确定退出登录"
          show-cancel-button
          width="200px"
          @cancel="onDialogCancel"
          @confirm="onDialogConfirm"
        />
      </div>
    </van-popup>
    <div class="flex mx-auto mt-7 justify-between items-center text-md font-500">
      <van-tabs v-model:active="activeName" background="#F6F7F9" sticky>
        <van-tab title="我的" name="a">
          <div class="w-100vw">
            <my-home />
          </div>
        </van-tab>
        <van-tab title="发现" name="b">
          <div class="w-100vw">
            <Swiper />
          </div>
          <div class="w-100vw">
            <IconList />
          </div>
          <div class="w-100vw">
            <FindMusic />
          </div>
        </van-tab>
        <van-tab title="声明" name="c">
          <div class="w-100vw">
            <read></read>
          </div>
        </van-tab>
        <!-- <van-tab title="视频" name="d">
          <div class="w-90vw"></div>
        </van-tab> -->
      </van-tabs>
    </div>
    <div class="text-xl absolute top-0 right-0 w-90vw pt-1" @click="toSearch">
      <van-cell-group inset>
        <van-field
          input-align="center"
          left-icon="search"
          center
          disabled
          :placeholder="showKeyword"
        />
      </van-cell-group>
    </div>
  </div>
</template>

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
.text-style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
