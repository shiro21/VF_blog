<script setup>
import { ref } from 'vue'

const categoryList = ref(true)

function category () {
  if (categoryList.value === false) categoryList.value = true
  else categoryList.value = false
}
</script>

<template>
  <nav id="main_side">
    <ul class="list_change">
      <li><a href="javascript:void(0)">Prologue</a></li>
      <li><a href="javascript:void(0)">blog</a></li>
    </ul>

    <article class="main_side_image">
      <figure>
        <img src="@/assets/image/paca.jpeg" alt="프로필" />
        <figcaption>
          <h4>닉네임</h4>
          <h5>junhyeok403@naver.com</h5>
        </figcaption>
      </figure>
    </article>

    <article class="main_side_information">
      <em>안녕하세요 언제나 코딩을 하며 즐겁게 하루하루를 살아가는 코딩러 입니다. 자기소개부분</em>
      <span>프로필 변경</span>
    </article>

    <article class="main_side_management">
      <ul class="management">
        <li>글쓰기</li>
        <li>관리 통계</li>
      </ul>
    </article>

    <article class="main_side_category">
      <div class="category_wrap">
        <h3 class="category_top" @click="category">
          <em>Category
            <img src="@/assets/icons/up.svg" alt="UP" v-if="!categoryList" />
            <img src="@/assets/icons/down.svg" alt="DOWN" v-if="categoryList" />
          </em>
        </h3>

        <div class="main_category_contents" v-if="categoryList">
          <ul class="category">
            <li class="depth1 depth_active">
              <router-link to="/">전체보기(61)</router-link>
            </li>
            <li class="depth1">
              <router-link to="/">일상(10)</router-link>
            </li>
            <hr />
            <li class="depth1">
              <router-link to="/">뎁스1(50)</router-link>
            </li>
            <li class="depth2">
              <router-link to="/">뎁스2(0)</router-link>
            </li>
          </ul>
        </div>
      </div>
    </article>

    <article class="main_side_connect">
      내 자료들 github, tistory, 포트폴리오 등등
    </article>
  </nav>
</template>

<style scoped lang='scss'>

</style>