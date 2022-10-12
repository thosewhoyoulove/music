<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-12 16:02:17
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-12 21:29:50
-->
<template>
  <div class="w-100vw h-100vh">
    <div v-if="flag == 0">
      <van-form>
        <van-cell-group>
          <van-field
            name="昵称"
            label="修改昵称"
            v-model="nickname"
            placeholder="请输入昵称"
          />
        </van-cell-group>
      </van-form>
      <div v-if="candidateNicknames.length" class="text-left ml-2.5 relative my-2">
        <div class="text-xs">可选:</div>
        <div
          v-for="(item, index) in candidateNicknames"
          :key="index"
          class="text-xs inline-block mt-1 mx-1 py-.2rem px-.6rem bg-white rounded-full border"
          @click="select(item)"
        >
          {{ item }}
        </div>
      </div>
      <div @click="save(nickname)" class="absolute top-50% left-50% -translate-1/2">
        <van-button plain type="primary">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as _ from "lodash";
import { Notify } from "vant";
import { nicknameCheck, getUserAcount, updateUser } from "~/api/user";
const route = useRoute();
const router = useRouter();
let nickname = ref();
let gender = ref();
let birthday = ref("");
let signature = ref("");
let msg = ref("");
let candidateNicknames = ref([]);
let isDuplicated = ref(false);
let flag = parseInt(route.query.flag as string);
//为每次输入增加防抖函数，并进行动态检测名称的合法性
const handleEnter = _.debounce(async (nickname: any) => {
  let res = await nicknameCheck(nickname);
  isDuplicated.value = res.duplicated;
  console.log(res);
  if (res.code == 200) {
    if (res.duplicated == true) {
      msg.value = "该昵称已经被注册，可以选择下列名称";
      Notify({ type: "warning", message: msg.value });
      candidateNicknames.value = res.candidateNicknames;
    } else if (res.duplicated == false) {
      msg.value = "改昵称可用";
      Notify({ type: "warning", message: msg.value });
    }
  }
  if (res.code !== 200) {
    Notify({ type: "warning", message: res.message });
  }
}, 1000);

onMounted(async () => {
  console.log(flag);
  let infoRes = await getUserAcount();
  console.log(infoRes, "用户数据");
  nickname.value = infoRes.profile.nickname;
  gender.value = infoRes.profile.gender;
  birthday.value = infoRes.profile.birthday;
  signature.value = infoRes.profile.signature;
});
//选择可选值
const select = (item: any) => {
  nickname.value = item;
};
watch(
  () => nickname.value,
  (newVal) => {
    handleEnter(newVal);
  }
);
const save = async (nickname: any, isDuplicated: any) => {
  console.log(nickname);
  let infoRes = await getUserAcount();
  let oldNickname = infoRes.profile.nickname;
  if (nickname === oldNickname) {
    Notify({ type: "success", message: "修改成功" });
    router.back();
  } else {
    //如果该名称可以用,调用接口使其变化
    if (!isDuplicated) {
      let res = await updateUser(nickname, gender.value, birthday.value, signature.value);
      if (res.code !== 200) {
        Notify({ type: "warning", message: res.message });
      } else if (res.code === 200) {
        Notify({ type: "success", message: "修改成功" });
        router.back();
      }
    }
  }
};
</script>

<style scoped></style>
