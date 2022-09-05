<script setup>
import MainSideBar from '@/components/mains/MainSideBar.vue';
import MainContents from '@/components/mains/MainContents.vue';
import MainHeader from '@/components/headers/MainHeader.vue';
import { onMounted, ref } from 'vue'
import { db } from '@/js/db';
import { collection, getDoc, doc } from '@firebase/firestore';

const user = ref()

onMounted(async () => {
  if (localStorage.getItem('blog')) {
    const fsDoc = doc(collection(db, "users"), localStorage.getItem('blog'))
    user.value = await getDoc(fsDoc)
  }
})

</script>

<template>
  <section id="main">
    <div class="container">
      <div class="row" v-if="user">
        
        <MainHeader :user="user" />

        <div class="main_section">
          <MainSideBar :user="user" />
          <MainContents />
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped lang='scss'>
@import '@/assets/main.scss';

</style>