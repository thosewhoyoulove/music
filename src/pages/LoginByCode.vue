<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-09 15:26:41
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-09 17:15:16
-->
<template>
    <div class="h-100vh">
        这是二维码登录页面
        <iframe class="w-100% h-100%" :src="qrurl" frameborder="0"></iframe>
    </div>
</template>

<script setup lang="ts">
import {getCodeKey,getCodeByKey,testCodeByKey} from '~/api/login'
const key = ref('')
const qrurl = ref('')
const result = ref('')
onMounted(async() => {
    let res = await getCodeKey()
    console.log(res);
    key.value = res.data.data.unikey
    let res1 = await getCodeByKey(key.value)
    console.log(res1);
    qrurl.value = res1.data.data.qrurl
    let res2 = await testCodeByKey(key.value)
    console.log(res2);
    
})
</script>

<style scoped>

</style>