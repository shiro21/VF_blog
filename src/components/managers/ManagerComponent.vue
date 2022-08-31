<script setup>
import { ref, onMounted } from 'vue'
import { largeCategory, smallCategory } from '@/js/manager'
import { addDoc, doc, updateDoc, getDocs } from '@firebase/firestore';
import { useRoute } from 'vue-router';

  const route = useRoute()
  const lCategory = ref('')
  const sCategory = ref('')
  
  const lCategoryData = ref({})
  const sCategoryData = ref({})

  const dataLoad = ref([])
  const dataLoad2 = ref([])

  // 대 카테고리 선택하기
  const lCategorySelect = ref({})
  const selectColor = ref()

  onMounted(async () => {

    managerData()
  })

  async function managerData() {
    const querySnapshot = await getDocs(largeCategory)
    
    let managerDataPut = []

    querySnapshot.forEach((doc) => {
      if (doc.data().owner === route.params.id) {
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
      if (doc.data().owner === route.params.id) {
        managerDataPut.push(doc.data())
      }
    })
    dataLoad2.value = managerDataPut.sort(function(a, b) {
      return b.createdAt - a.createdAt
    })

    console.log(dataLoad2.value)
  }

  const lCategoryCreate = async () => {
    if (lCategory.value.length < 2) return alert('글자수 부족')

    lCategoryData.value = {
      category: lCategory.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      step: 1,
      isDeleted: false,
      owner: route.params.id
    }

    const create = await addDoc(largeCategory, lCategoryData.value)

    await updateDoc(doc(largeCategory, create.id), {
      _uid: create.id
    })
    alert('카테고리 생성 성공')

    managerData()
  }

  const sCategoryCreate = async () => {
    console.log(lCategorySelect.value.category)
    if (!lCategorySelect.value.category) return alert('대 카테고리를 선택해주세요.')
    
    sCategoryData.value = {
      category: sCategory.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      step: 2,
      isDeleted: false,
      owner: route.params.id,
      parent: lCategorySelect.value._uid
    }

    const create = await addDoc(smallCategory, sCategoryData.value)

    await updateDoc(doc(smallCategory, create.id), {
      _uid: create.id
    })

    alert('소 카테고리 생성')

    managerData2()
  }

  const subCategoryCreate = (item, i) => {
    lCategorySelect.value = item
    selectColor.value = i
  }

</script>

<template>
  <article id="manager_contents">
    <h2>관리자 페이지</h2>
    
    <div class="input_wrap">
      <input type="text" v-model="lCategory" />
      <button @click="lCategoryCreate">대 카테고리 생성</button>
    </div>

    <div class="input_wrap">
      <input type="text" v-model="sCategory" />
      <button @click="sCategoryCreate">소 카테고리 생성</button>
    </div>

    <div class="category_wrap">
      <ul class="category_list">
        <li v-for="(item, i) of dataLoad" :key="'a' + i">
          <span @click="subCategoryCreate(item, i)">
            <div class="large_category" :class="i === selectColor ? 'select' : ''">{{item.category}}</div>
            <div class="small_category" v-for="(item2, j) of dataLoad2" :key="'b' + j" >
              <div v-if="item._uid === item2.parent">{{item2.category}}</div>
            </div>
          </span>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>