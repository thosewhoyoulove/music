<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-10-05 14:58:36
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-10-05 15:13:34
-->
<template>
  <div>
    <video :src="videoSrc" controls></video>
  </div>
</template>

<script setup lang="ts">
import { getMvUrl } from "~/api/MV";
const route = useRoute();
let mvId: any = parseInt(route.query.mvId);
let videoSrc = ref()
onMounted(async () => {
  let res = await getMvUrl(mvId);
  console.log(res, "res");
  videoSrc.value = res.data.url
});
</script>

<style scoped></style>
