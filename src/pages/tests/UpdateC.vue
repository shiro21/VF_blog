<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { editorTest } from '@/js/editor';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import router from '@/js/routes'

const route = useRoute()
const data = ref()
const updateData = ref()
const formData = ref({})


onMounted(async () => {
  let update = doc(editorTest, route.params.id)
  data.value = await getDoc(update)

  updateData.value = update
  formData.value.email = data.value.data().email
  formData.value.title = data.value.data().title
  formData.value.contents = data.value.data().contents

  console.log(formData.value)
})

const updateEdit = async () => {
  await setDoc(updateData.value, formData.value)
  alert('업데이트 성공')
  router.push('/read')
}

</script>

<template>
<section>
  <router-link to="/read">Read Router</router-link>
  <h1>Update</h1>

  <form @submit.prevent="updateEdit">
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