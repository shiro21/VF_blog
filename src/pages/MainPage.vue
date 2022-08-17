<script setup>
import MainSideBar from '@/components/mains/MainSideBar.vue';
import MainContents from '@/components/mains/MainContents.vue';
import MainHeader from '@/components/headers/MainHeader.vue';

</script>

<template>
  <section id="main">
    <div class="container">
      <div class="row">

        <MainHeader />

        <div class="main_section">
          <MainSideBar />
          <MainContents />
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped lang='scss'>
@import '@/assets/main.scss';

</style>