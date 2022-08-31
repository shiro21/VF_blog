<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { largeCategory, smallCategory } from '@/js/manager'
import { getDocs } from '@firebase/firestore';

  const props = defineProps(['user', 'msg'])
  const user = ref({})

  const dataLoad = ref([])
  const dataLoad2 = ref([])

  const emits = defineEmits(['data'])

  onMounted(async () => {
    user.value = props.user.data()
    console.log(emits('data'))

    managerData()
  })

  const categoryList = ref(true)

  function category () {
    if (categoryList.value === false) categoryList.value = true
    else categoryList.value = false
  }

  async function managerData() {
    const querySnapshot = await getDocs(largeCategory)
    
    let managerDataPut = []

    querySnapshot.forEach((doc) => {
      if (doc.data().owner === localStorage.getItem('blog')) {
        managerDataPut.push(doc.data())
      }
    })
    dataLoad.value = managerDataPut.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })

    managerData2()

    console.log(dataLoad.value)
  }

  async function managerData2() {
    const querySnapshot = await getDocs(smallCategory)

    let managerDataPut = []

    querySnapshot.forEach((doc) => {
      if (doc.data().owner === localStorage.getItem('blog')) {
        managerDataPut.push(doc.data())
      }
    })
    dataLoad2.value = managerDataPut.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })

    console.log(dataLoad2.value)
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
          <h4>{{ user.nick }}</h4>
          <h5>{{ user.email }}</h5>
        </figcaption>
      </figure>
    </article>

    <article class="main_side_information">
      <em>{{ user.description }}</em>
      <router-link :to="`/information/${user._uid}`">프로필 변경</router-link>
    </article>

    <article class="main_side_management">
      <ul class="management">
        <li><router-link to="/editor">글쓰기</router-link></li>
        <li><router-link :to="`/manager/${user._uid}`">관리 통계</router-link></li>
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
            <li class="depth1">
              <router-link to="/" class="depth_active">전체보기(61)</router-link>
            </li>

            <hr />

            <li v-for="(item, i) of dataLoad" :key="'a' + i">
              <div class="large_category" :class="i === selectColor ? 'select' : ''">{{item.category}}</div>

              <div class="small_category" v-for="(item2, j) of dataLoad2" :key="'b' + j" >
                <div v-if="item._uid === item2.parent">{{item2.category}}</div>
              </div>
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