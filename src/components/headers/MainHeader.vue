<script setup>
import { ref, onMounted, defineProps } from 'vue'
import store from '@/js/store'
import { auth } from '@/js/firebase'

  const props = defineProps(['user', 'msg'])
  const user = ref({})


  onMounted(() => {
    auth.onAuthStateChanged(async user => {
      if (user) loginList.value = true
      else loginList.value = false
    })
  })

  onMounted(async () => {
    console.log(props.user)
    user.value = props.user.data()
    console.log(user.value)
  })

  const menuList = ref(false)
  const profileList = ref(false)
  const loginList = ref(false)


  function menu () {
    if(menuList.value === false) menuList.value = true
    else menuList.value = false
  }

  function profile () {
    if (profileList.value === false) profileList.value = true
    else profileList.value = false
  }

function close () {
  menuList.value = false
  profileList.value = false
}

</script>

<template>
  <section id="main_header">
    <ul class="menu_list">
      <li>
        <a href="javascript:void(0)" @click="menu">MENU</a>
        <div class="menu_card" v-if="menuList && loginList">
          <div class="profile">
            <!-- <img src="@/assets/image/paca.png" alt="프로필" /> -->
            <img :src="user.profile" alt="프로필" />
          </div>
          <div class="information">
            <div class="nickname"><em><router-link :to="`/information/${user._uid}`">{{user.nick}}</router-link></em></div>
            <div class="email">{{user.email}}</div>
            <button @click="store.dispatch('logout')">로그아웃</button>
          </div>
        </div>

        <div class="menu_card" v-if="menuList && !loginList">
          <router-link to="/login">로그인 하러가기</router-link>
        </div>
      </li>

      <li>
        <a href="javascript:void(0)" @click="profile">Profile</a>
        <div class="menu_card" v-if="profileList">
          <ul>
            <li>
              <router-link to="/editor">글쓰기</router-link>
            </li>
            <li>
              <router-link to="/">관리</router-link>
            </li>
            <li>
              <router-link to="/">통계</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li><a href="javascript:void(0)">내 메뉴</a></li>
      <li><a href="javascript:void(0)">블로그 홈</a></li>
      <li><a href="javascript:void(0)">이웃블로그</a></li>
    </ul>

    <h1>블로그 제목 나의 닉네임</h1>
    <div class="bg_color" v-if="menuList || profileList" @click="close"></div>
  </section>
</template>

<style scoped lang='scss'>

</style>