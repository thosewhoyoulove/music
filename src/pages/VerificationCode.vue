<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 19:21:17
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 19:33:41
-->
<template>
  <div class="bg-hex-f4f5f5 w-95vw h-100vh pt-5 pl-4">
    <div class="w-100% text-left">
      <div class="font-550">请输入验证码</div>
      <div class="flex justify-between  items-center">
          <div class="flex justify-between items-center">
              <div class="text-xs text-hex-aaa">已发送至+86{{ phoneNumber }}</div>
              <div @click="router.back()" class="ml-2"><van-icon name="edit" /></div>
          </div>
        
        <div class="flex text-xs text-hex-1A73E9 mr-2">重新发送</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify } from "vant";
const route = useRoute();
const router = useRouter()
let phoneNumber = ref(route.query.phoneNumber);
onMounted(async () => {
  Notify({ type: "success", message: "验证码已发送，请注意查收" });
});
</script>

<style scoped>
</style>