<script setup>
import CardF from '@/components/cards/CardF.vue'

</script>

<template>
  <main id="main_contents">
    <article class="main_contents_list">
      <ul class="menu_list">
        <li>
          <router-link to="/">guest</router-link>
        </li>
        <li>
          <router-link to="/">memo</router-link>
        </li>
        <li>
          <router-link to="/">library</router-link>
        </li>
        <li>
          <router-link to="/">map</router-link>
        </li>
      </ul>
    </article>

    <article class="main_contents_famous_say">
      <strong>From. 회원님</strong>
      <div class="famous_say">
        모든 실패는 성공으로 이어지는 과정에 지나지 않는다. <strong>- 윌리엄 휴얼</strong>
      </div>
    </article>

    <article class="main_contents_notice">
      <ul class="notice">
        <li>
          <router-link to="/">
            <em>공지</em>
            <div class="contents">공지사항입니다. @@공지사항입니다. @@공지사항입니다. @@공지사항입니다. @@공지사항입니다. @@공지사항입니다. @@공지사항입니다. @@공지사항입니다.
              @@공지사항입니다. @@</div>
            <div class="date">2022.08.08</div>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <em>공지</em>
            <div class="contents">공지사항입니다.</div>
            <div class="date">2022.08.08</div>
          </router-link>
        </li>
      </ul>
    </article>

    <article class="main_contents_card">
      <h3><em>나의 닉네임</em> 30개의 글</h3>
      <div class="card_list">
        <CardF v-for="item of [0,1,2,3,4]" :key="item" />
      </div>
    </article>
  </main>
</template>

<style scoped lang='scss'>

</style>