<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';

const route = useRoute()

const store = useStore()

onBeforeMount(() => {
  console.log('로그인 여부 확인')
  console.log(route.fullPath)
  store.dispatch('fetchUser')
})
</script>

<template>
<div>
  <router-view />
</div>
</template>

<style lang='scss'>
@import '@/assets/reset';
@import '@/assets/layout';
@import '@/assets/cards';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>