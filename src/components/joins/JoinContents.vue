<script setup>
import { ref } from 'vue'
import store from '@/js/store';

// login_form register_form store
const joinForm = ref({})

const join = () => {
  if(joinForm.value.pass !== joinForm.value.passConfirm || joinForm.value.pass.length < 7) {
    return alert('비밀번호를 확인해주세요.')
  }
  store.dispatch('join', joinForm.value)
}
</script>

<template>
  <article id="join_contents">
    <h1><em>회원가입</em></h1>

    <div class="input_wrap">
      <input type="text" v-model="joinForm.id" placeholder="이메일을 입력해주세요." />
    </div>
    <div class="input_wrap">
      <input type="password" v-model="joinForm.pass" placeholder="비밀번호를 입력해주세요." />
    </div>
    <div class="input_wrap">
      <input type="password" v-model="joinForm.passConfirm" placeholder="비밀번호를 확인해주세요." />
    </div>
    <div class="input_wrap">
      <input type="text" v-model="joinForm.nick" placeholder="이름을 입력해주세요." />
    </div>

    <div class="button_wrap">
      <button @click="join">회원가입</button>
    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>