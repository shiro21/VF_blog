<script setup>
import { ref } from 'vue'
import { editorTest } from '@/js/editor'
import { addDoc, updateDoc, doc } from '@firebase/firestore';
import router from '@/js/routes'

const formData = ref({
})

const createEdit = async () => {
  // 중요
  const edit = await addDoc(editorTest, formData.value)
  console.log(edit.id)
  await updateDoc(doc(editorTest, edit.id), {
    _uid: edit.id
  })
  alert('성공')
  router.push('/read')
  console.log(edit)
}
</script>

<template>
<section>
  <router-link to="/read">Read Router</router-link>
  <h1>Create</h1>

  <form @submit.prevent="createEdit">
    <div class="form-group">
      <label for="input_email">Email 등록</label>
      <input type="email" v-model="formData.email" class="form-control" id="input_email" />
    </div>

    <div class="form-group">
      <label for="input_title">Title 등록</label>
      <input type="text" v-model="formData.title" class="form-control" id="input_title" />
    </div>

    <div class="form-group">
      <label for="input_contents">Contents 등록</label>
      <input type="text" v-model="formData.contents" class="form-control" id="input_contents" />
    </div>

    <button type="submit">Submit</button>
  </form>
</section>
</template>

<style scoped lang='scss'>

</style>