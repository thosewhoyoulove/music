<!-- 
    歌手主页
 -->

<template>
  <div>这是歌手主页</div>
</template>

<script setup lang="ts">
import { getArtistDetail } from "~/api/artist";
const route = useRoute();
let artistId = parseInt(route.query.artistId);
let isSub = route.query.isSub;
onMounted(async () => {
  console.log(artistId, isSub);
  let artistDetailRes = await getArtistDetail(artistId);
  console.log(artistDetailRes, "artistDetailRes");
});
</script>

<style scoped></style>
