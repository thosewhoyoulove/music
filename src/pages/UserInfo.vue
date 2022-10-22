<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-11 16:12:27
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-22 15:40:08
-->
<template>
  <div class="w-100vw h-100vh bg-hex-eee relative">
    <div class="text-hex-eee items-center pt-5">
      <van-cell-group class="title" inset>
        <van-cell title="头像" title-class="inline-block"
          ><template #right-icon> <van-icon :name="avatarUrl" /> </template
        ></van-cell>
      </van-cell-group>
      <van-cell-group class="title" inset title="我的资料">
        <van-cell
          @click="toEditInfo((flag = 0))"
          class="cell"
          v-model:value="nickname"
          title="昵称"
          ><template #right-icon>
            <van-icon name="edit" class="flex item-center" /> </template
        ></van-cell>
        <van-cell @click="showCheckBox = true" v-model:value="gender" title="性别" />
        <van-cell
          v-if="haveBirthday"
          @click="showDatetimePicker = true"
          v-model:value="birthday"
          title="生日"
        />
        <van-cell
          v-if="!haveBirthday"
          @click="showDatetimePicker = true"
          value="未设置"
          title="生日"
        />
        <van-cell
          v-if="signature.length"
          @click="toEditInfo((flag = 1))"
          v-model:value="signature"
          title="简介"
        />
        <van-cell
          v-if="!signature.length"
          @click="toEditInfo((flag = 1))"
          value="还没有简介"
          title="简介"
        />
      </van-cell-group>
    </div>
  </div>

  <div class="absolute bottom-0 w-100vw z-1">
    <van-datetime-picker
      v-show="showDatetimePicker"
      @confirm="onConfirm"
      @cancel="onCancel"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>

  <van-overlay class="overlay" :show="showCheckBox" @click="showCheckBox = false">
    <div class="flex items-center justify-center w-100vw h-100vh relative">
      <van-radio-group v-model="gender">
        <van-cell-group
          class="flex-col items-center justify-between text-left w-90vw h-15vh"
          inset
        >
          <van-cell title="男" clickable @click="checkGender(gender)">
            <template #right-icon>
              <van-radio name="男" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="checkGender(gender)">
            <template #right-icon>
              <van-radio name="女" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div @click="showCheckBox = false" class="absolute top-62% left-50% -translate-1/2">
      <van-button size="mini" round icon="cross" />
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { Notify, DatetimePicker } from "vant";
import { getUserAcount, updateUser } from "~/api/user";
const showDatetimePicker = ref(false);
const router = useRouter();
const nickname = ref("");
const gender = ref();
const birthday = ref("");
const haveBirthday = ref(false);
const signature = ref("");
const avatarUrl = ref("");
let flag = ref(-1);
let profile: any = ref({});
const minDate = new Date(1970, 0, 1);
const maxDate = new Date(2024, 0, 1);
const showCalendar = ref(false); //日历组件的展示
const showCheckBox = ref(false);
//生日时间
const addZero = (num: any) => {
  if (parseInt(num) < 10) num = `0${num}`;

  return num;
};
//将毫秒数转化为yy-mm-dd
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
//将当前时间转化为yy,mm,dd
const getCurrentDate = (ms: any) => {
  if (ms) {
    const oDate = new Date(ms);
    const oYear = oDate.getFullYear();
    const oMonth = oDate.getMonth() + 1;
    const oDay = oDate.getDate();
    const oTime = `${oYear},${addZero(oMonth)},${addZero(oDay)}`;
    return oTime;
  } else {
    return "";
  }
};
const nowDate = getCurrentDate(Date.now()); //获取yy,mm,dd
const currentDate = ref(new Date(nowDate)); //定义时间选择器的当前时间,只能读取yy,mm,dd
const toEditInfo = (flag: any) => {
  router.push({
    path: "/EditInfo",
    query: {
      flag,
    },
  });
};
const formatDate = (birthday: any) =>
  `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`; //将选择值转化为yy-mm-dd
//修改生日
const onConfirm = async (value: any) => {
  //将汉字转化为代码
  if (gender.value == "保密") {
    gender.value = 0;
  } else if (gender.value == "男") {
    gender.value = 1;
  } else if (gender.value == "女") {
    gender.value = 2;
  }
  console.log(value, "测试"); //Sun Oct 16 2022 00:00:00 GMT+0800 (中国标准时间) '测试'
  console.log(value.valueOf()); //获取指定日期的时间戳:1665849600000
  showCalendar.value = false;
  birthday.value = formatDate(value);
  let updateRes = await updateUser(
    nickname.value,
    gender.value,
    value.valueOf(),
    signature.value
  );
  //将gender转化为汉字
  if (gender.value == 0) {
    gender.value = "保密";
  } else if (gender.value == 1) {
    gender.value = "男";
  } else if (gender.value == 2) {
    gender.value = "女";
  }
  if (updateRes.code === 200) {
    Notify({ type: "success", message: "修改成功" });
    showDatetimePicker.value = false;
  } else {
    Notify({ type: "warning", message: "系统故障，请稍后再试" });
    showDatetimePicker.value = false;
  }
  console.log(updateRes);
};
//修改生日点击取消
const onCancel = () => {
  showDatetimePicker.value = false;
};
onMounted(async () => {
  let infoRes = await getUserAcount();
  console.log(infoRes, "用户详情");
  profile.value = infoRes.profile;
  nickname.value = profile.value.nickname;
  gender.value = profile.value.gender;
  avatarUrl.value = profile.value.avatarUrl;
  if (gender.value == 0) {
    gender.value = "保密";
  } else if (gender.value == 1) {
    gender.value = "男";
  } else if (gender.value == 2) {
    gender.value = "女";
  }
  if (Number(birthday.value) < 0) {
    haveBirthday.value = false;
  } else {
    haveBirthday.value = true;
  }
  console.log(haveBirthday.value, "haveBirthday.value的值");

  birthday.value = formatMsToDate(profile.value.birthday);

  signature.value = profile.value.signature;
});
//选择性别
const checkGender = async (gender: any) => {
  let infoRes = await getUserAcount();
  let oldGender = infoRes.profile.gender;
  birthday.value = infoRes.profile.birthday;
  console.log(birthday.value.valueOf());
  console.log(formatMsToDate(birthday.value.valueOf()));
  if (oldGender == gender) {
    showCheckBox.value = false;
    Notify({ type: "success", message: "修改成功" });
  } else {
    if (gender == "男") {
      gender = 1;
      let res = await updateUser(nickname.value, gender, birthday.value, signature.value);
      if (res.code !== 200) {
        Notify({ type: "warning", message: res.message });
      } else if (res.code === 200) {
        Notify({ type: "success", message: "修改成功" });
      }
    } else if (gender == "女") {
      gender = 2;
      let res = await updateUser(nickname.value, gender, birthday.value, signature.value);
      if (res.code !== 200) {
        Notify({ type: "warning", message: res.message });
      } else if (res.code === 200) {
        Notify({ type: "success", message: "修改成功" });
      }
    }
  }
  birthday.value = formatMsToDate(birthday.value);
};
</script>

<style scoped>
:deep(.title) {
  text-align: left;
  align-items: center;
}
:deep(.cell) {
  align-items: center;
}

:deep(.overlay) {
  background-color: rgba(0, 0, 0, 0.3);
}
:deep(.van-icon__image) {
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
}
:deep(.van-cell__title) {
  display: flex;
  height: 2rem;
  align-items: center;
}
</style>
