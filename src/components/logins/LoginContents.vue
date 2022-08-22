<script setup>
import { ref } from 'vue'
import store from '@/js/store';

const loginForm = ref({})

const login = () => {
  store.dispatch('login', loginForm.value)
}
</script>

<template>
  <article id="login_contents">
    <h1>나의 <em>로그인</em></h1>

    <div class="input_wrap">
      <input type="text" v-model="loginForm.id" placeholder="아이디를 입력해주세요." />
    </div>
    <div class="input_wrap">
      <input type="password" v-model="loginForm.pass" placeholder="비밀번호를 입력해주세요." />
    </div>

    <div class="button_wrap">
      <button @click="login">로그인</button>
    </div>

    <div class="sign_wrap">
      <em>
        <router-link to="/join">회원가입</router-link>
      </em> 하러가기
    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>