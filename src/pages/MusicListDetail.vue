<!--
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-08-18 21:41:05
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-08-19 12:42:59
-->
<template>
    <div>
        <DetailTop :playlist="state.playlist"></DetailTop>
    </div>
</template>

<script setup lang="ts">
import { getSongListDetail } from "~/api/SongListDetail"
const router = useRouter()
const route = useRoute()
const state = reactive({
  playlist:{}
})
let id = route.query.id
onMounted(async () =>{
  console.log(id)

  let res = await getSongListDetail(id)
  state.playlist = res.data.playlist
  console.log(state.playlist,2222222);
  
})
</script>

<style scoped>

</style>
<route lang="yaml">
meta:
  layout: default
  title: 歌单详情
</route>