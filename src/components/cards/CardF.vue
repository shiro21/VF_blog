<script setup>
import { onMounted, defineProps } from 'vue'
import router from '@/js/routes'

  const props = defineProps({
    items: {}
  })
  onMounted(async () => {
  })

  const moveViewer = () => {
    router.push(`/viewer/${props.items._uid}`)
  }
</script>

<template>
  <div id="card_first" @click="moveViewer">
    <div class="card_image">
      <img v-if="!props.items.image" src="@/assets/image/paca.png" alt="카드 이미지 - 제목">
      <img v-if="props.items.image" :src="props.items.image" alt="카드 이미지 - 제목">
    </div>
    <div class="card_title">
      {{props.items.title}}
    </div>
    <div class="card_created">
      {{props.items.createdAt.toDate().toLocaleTimeString('ko')}} <em>댓글 3</em>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>