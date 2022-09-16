<!--
 * @Description:
 * @Author: 曹俊
 * @Date: 2022-09-09 15:16:22
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-16 19:46:14
-->
<script setup lang="ts">
import { Notify, Toast } from 'vant'
import { storeToRefs } from 'pinia'
import { loginByEmail } from '~/api/login'
import { useStore, userStore } from '~/store/index'
const router = useRouter()
const eamil = ref('')
const password = ref('')
const store = useStore()
const userInfo = userStore()
const { isFooterShow } = storeToRefs(store)
const { isLogin, token, user } = storeToRefs(userInfo)
onMounted(() => {
  isFooterShow.value = false
})
// 校验规则
const regExp = new RegExp(
  '^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\\.){1,4}[a-z]{2,4}$',
)
const submit = async () => {
  console.log(eamil.value, password.value)

  if (!eamil.value) {
    Notify({ type: 'warning', message: '请输入邮箱地址' })
  }
  else if (!password.value) {
    Notify({ type: 'warning', message: '请输入密码' })
  }
  else if (!regExp.test(eamil.value)) {
    Notify({ type: 'warning', message: '请输入正确的邮箱地址' })
  }
  else if (password.value.length < 6) {
    Notify({ type: 'warning', message: '密码的长度不小于6位' })
  }
  else if (regExp.test(eamil.value) && password.value.length >= 6) {
    const res = await loginByEmail(eamil.value, password.value)
    console.log(res)

    if (res.code === 200) {
      userInfo.updateIsLogin(true)
      userInfo.updateToken(res.token)
      userInfo.updateUserInfo(res)
      console.log(userInfo.$state)
      Notify({ type: 'success', message: '登陆成功，即将跳转到首页' })
      router.push({
        path: '/',
      })
    }
    else {
      Notify({ type: 'danger', message: res.message })
    }
  }
}
const showKeyboard = ref(true) // 数字键盘是否展示
const showPassboard = ref(false) // 密码键盘是否展示
</script>

<template>
  <div class="bg-hex-f4f5f5 w-95vw h-100vh p-5">
    <div class="w-100% text-left ml-5">
      <div class="font-550">
        登录体验更多精彩
      </div>
    </div>
    <div class="w-100% flex items-center mt-5">
      <van-form class="flex-col" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="eamil"
            label-width="3rem"
            name="邮箱地址"
            label="邮箱"
            placeholder="请输入邮箱地址"
            :maxlength="20"
            clearable
            @focus="showKeyboard = true"
          />
          <van-field
            v-model="password"
            label-width="3rem"
            type="password"
            label="密码"
            placeholder="请输入邮箱登录密码"
            :maxlength="15"
            clearable
            @focus="showPassboard = true"
          />
        </van-cell-group>
        <div class="mt-10 mb-3 m-10px">
          <van-button round block type="danger" @click="submit">
            登录
          </van-button>
        </div>
        <div class="flex items-center justify-between">
          <div
            class="text-12px text-hex-ccc"
            @click="router.push({ path: '/Login' })"
          >
            使用密码登录
          </div>
          <div class="text-xs text-hex-1A73E9">
            找回密码
          </div>
        </div>
      </van-form>
    </div>
    <div class="w-20 h-20 z-1000">
      <van-number-keyboard
        v-model="eamil"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </div>
    <div class="w-20 h-20 z-1000">
      <van-number-keyboard
        v-model="password"
        :show="showPassboard"
        @blur="showPassboard = false"
      />
    </div>
  </div>
</template>

<style scoped>
.van-field__label {
  margin-right: 0;
}
:root {
  --van-field-label-margin-right: 0px;
}
</style>
