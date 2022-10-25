<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-25 20:46:43
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-25 20:46:47
-->
<template>
  <div v-for="(item, index) in msgs" :key="index" class="flex w-100%">
    <div class="relative">
      <img class="rounded-full w-11 h-11 m-2" :src="item?.fromUser?.avatarUrl" alt="" />
      <img
        v-if="item?.fromUser?.avatarDetail?.identityIconUrl"
        class="w-5 h-5 absolute rounded-full left-10 bottom-1"
        :src="item?.fromUser?.avatarDetail?.identityIconUrl"
        alt=""
      />
    </div>
    <!-- <div class="col h-10 w-15.625rem text-left ml-3 mt-3">
      <div class="text-sm">
        {{ item.nickname }}
      </div>
      <div class="text-style text-10px">
        {{ item.signature }}
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { getPrivateMsg } from "~/api/message";
let msgs = ref([]);
onMounted(async () => {
  let res = await getPrivateMsg(10);
  msgs.value = res.msgs;
  console.log(msgs.value);
});
</script>

<style scoped></style>
