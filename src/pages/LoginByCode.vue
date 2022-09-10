<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 15:26:41
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-10 19:50:33
-->
<template>
    <div class="h-100vh">
        这是二维码登录页面
        <iframe class="w-100% h-100%" :src="qrurl" frameborder="0"></iframe>
    </div>
</template>

<script setup lang="ts">
import {getCodeKey,getCodeByKey,testCodeByKey} from '~/api/login'
import { useStore } from "~/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
const { isFooterShow } = storeToRefs(store);
onMounted(() => {
  isFooterShow.value = false;
});
const key = ref('')
const qrurl = ref('')
const result = ref('')
onMounted(async() => {
    let res = await getCodeKey()
    console.log(res,'获得key');
    key.value = res.data.unikey
    console.log(key.value);
    
    let res1 = await getCodeByKey(key.value)
    console.log(res1,'生成二维码图片');
    qrurl.value = res1.data.qrurl
    // let res2 = await testCodeByKey(key.value)
    // console.log(res2);
    
})
</script>

<style scoped>

</style>