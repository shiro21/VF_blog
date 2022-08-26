<script setup>
import { ref, onMounted } from 'vue'
import { editorTest } from '@/js/editor';
import { getDocs, deleteDoc, doc } from '@firebase/firestore'

const readArray = ref()

// 데이터 불러오기 함수
const readData = async () => {
  const testSnapshot = await getDocs(editorTest)
  let temporary = []

  testSnapshot.forEach(data => {
    let readData = data.data()

    readData._uid = data.id
    
    temporary.push(readData)
  })
  readArray.value = temporary
  console.log(readArray.value)
}

onMounted(async () => {
  await readData()
})

const deleted = async (_uid) => {
  await deleteDoc(doc(editorTest, _uid))

  await readData()
}

</script>

<template>
<section>
  <router-link to="/create">Create Router  </router-link>
  <router-link to="/update">Update Router</router-link>
  <h1>Read</h1>

  <ul>
    <li v-for="item of readArray" :key="item.id">
      {{item.title}}
      <button><router-link :to="`/update/${item._uid}`">수정</router-link></button>
      <button @click="deleted(item._uid)">삭제</button>
    </li>
  </ul>
</section>
</template>

<style scoped lang='scss'>

</style>