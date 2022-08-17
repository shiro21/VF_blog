<script setup>
import { ref } from 'vue'

  const menuList = ref(false)
  const profileList = ref(false)

  function menu () {
    console.log('들어옴')
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
        <div class="menu_card" v-if="menuList">
          <div class="profile">
            <img src="@/assets/image/paca.png" alt="프로필" />
          </div>
          <div class="information">
            <div class="nickname"><em>나의 닉네임</em></div>
            <div class="email">shiro21@tistory</div>
            <button>로그아웃</button>
          </div>
        </div>
      </li>

      <li>
        <a href="javascript:void(0)" @click="profile">Profile</a>
        <div class="menu_card" v-if="profileList">
          <ul>
            <li>
              <router-link to="/">글쓰기</router-link>
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