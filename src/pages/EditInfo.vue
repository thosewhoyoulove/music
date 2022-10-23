<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-12 16:02:17
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-14 20:01:05
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
      <div
        @click="saveNickname(nickname, isDuplicated)"
        class="absolute top-50% left-50% -translate-1/2"
      >
        <van-button plain type="primary">保存</van-button>
      </div>
    </div>
    <div v-if="flag == 1">
      <van-cell-group inset>
        <van-field
          v-model="signature"
          rows="2"
          autosize
          label="简介"
          type="textarea"
          maxlength="300"
          placeholder="一句话介绍"
          show-word-limit
        />
      </van-cell-group>

      <div
        @click="saveSignature(signature)"
        class="absolute top-50% left-50% -translate-1/2"
      >
        <van-button plain type="primary">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { areaList } from "@vant/area-data";
import * as _ from "lodash";
import { Notify } from "vant";
import { nicknameCheck, getUserAcount, updateUser } from "~/api/user";
const route = useRoute();
const router = useRouter();
let nickname = ref();
let gender = ref();
let birthday = ref("");
let signature = ref("");
let province: any = ref();
let city: any = ref();
let msg = ref("");
let candidateNicknames: any = ref([]);
let isDuplicated: any = ref(false);
let flag = parseInt(route.query.flag as string);
onMounted(async () => {
  console.log(flag);
  let infoRes = await getUserAcount();
  console.log(infoRes, "用户数据");
  nickname.value = infoRes.profile.nickname;
  gender.value = infoRes.profile.gender;
  birthday.value = infoRes.profile.birthday;
  signature.value = infoRes.profile.signature;
  city.value = infoRes.profile.city;
  province.value = infoRes.profile.province;
});
//进入修改昵称界面
if (flag == 0) {
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

  watch(
    () => nickname.value,
    (newVal) => {
      handleEnter(newVal);
    }
  );
}
//选择可选值
const select = (item: any) => {
  nickname.value = item;
};
const saveNickname = async (nickname: any, isDuplicated: any) => {
  console.log(nickname);
  let infoRes = await getUserAcount();
  let oldNickname = infoRes.profile.nickname;
  if (nickname === oldNickname) {
    router.back();
  } else {
    //如果该名称可以用,调用接口使其变化
    if (!isDuplicated) {
      let res = await updateUser(
        nickname,
        gender.value,
        birthday.value,
        signature.value,
        province.value,
        city.value
      );
      if (res.code !== 200) {
        Notify({ type: "warning", message: res.message });
      } else if (res.code === 200) {
        Notify({ type: "success", message: "修改成功" });
        router.back();
      }
    }
  }
};
//进入修改简介界面

const saveSignature = async (signature: any) => {
  let infoRes = await getUserAcount();
  let oldSignature = infoRes.profile.signature;
  if (signature === oldSignature) {
    router.back();
  } else {
    let res = await updateUser(
      nickname.value,
      gender.value,
      birthday.value,
      signature,
      province.value,
      city.value
    );
    if (res.code !== 200) {
      Notify({ type: "warning", message: res.message });
    } else if (res.code === 200) {
      router.back();
    }
  }
};
</script>

<style scoped></style>
