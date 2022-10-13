<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-11 16:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-13 15:35:37
-->
<template>
  <div class="w-100vw h-100vh bg-hex-eee">
    <div class="text-hex-eee items-center">
      <van-cell-group class="title" inset title="我的资料">
        <van-cell  @click="toEditInfo((flag = 0))" class="cell" v-model:value="nickname" title="昵称"
          ><template #right-icon>
            <van-icon
              name="edit"
              class="flex item-center"
             
            /> </template
        ></van-cell>
        <van-cell v-model:value="gender" title="性别" />
        <van-cell @click="showCalendar = true" v-model:value="birthday" title="生日" />
        <van-cell
          @click="toEditInfo((flag = 1))"
          v-model:value="signature"
          title="简介"
        />
      </van-cell-group>
    </div>
  </div>
  <van-cell title="选择单个日期" :value="birthday" @click="showCalendar = true" />
  <van-calendar
    v-model:show="showCalendar"
    @confirm="onConfirm"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>

<script setup lang="ts">
import { getUserAcount, updateUser } from "~/api/user";
const router = useRouter();
const nickname = ref("");
const gender = ref();
const birthday = ref("");
const signature = ref("");
let flag = ref(-1);
let profile: any = ref({});
const minDate = new Date(1970, 0, 1);
const maxDate = new Date(2024, 0, 1);
const showCalendar = ref(false); //日历组件的展示
const formatDate = (birthday: any) =>
  `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`; //将选择值转化为yy-mm-dd
//修改生日
const onConfirm = async (value: any) => {
  if (gender.value == "保密") {
    gender.value = 0;
  } else if (gender.value == "男") {
    gender.value = 1;
  } else if (gender.value == "女") {
    gender.value = 2;
  }
  console.log(value.valueOf()); //获取指定日期的时间戳
  showCalendar.value = false;
  birthday.value = formatDate(value);
  let updateRes = await updateUser(
    nickname.value,
    gender.value,
    value.valueOf(),
    signature.value
  );
  console.log(updateRes);
};
onMounted(async () => {
  let infoRes = await getUserAcount();
  console.log(infoRes, "用户详情");
  profile.value = infoRes.profile;
  nickname.value = profile.value.nickname;
  gender.value = profile.value.gender;
  if (gender.value == 0) {
    gender.value = "保密";
  } else if (gender.value == 1) {
    gender.value = "男";
  } else if (gender.value == 2) {
    gender.value = "女";
  }
  birthday.value = formatMsToDate(profile.value.birthday);
  signature.value = profile.value.signature;
});
//生日时间
const addZero = (num: any) => {
  if (parseInt(num) < 10) num = `0${num}`;

  return num;
};
const formatMsToDate = (ms: any) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDate();
    const oTime = `${oYear}-${addZero(oMonth)}-${addZero(oDay)}`;
    return oTime;
  } else {
    return "";
  }
};
const toEditInfo = (flag: any) => {
  router.push({
    path: "/EditInfo",
    query: {
      flag,
    },
  });
};
</script>

<style scoped>
:deep(.title) {
  text-align: left;
}
:deep(.cell) {
  align-items: center;
}
</style>
