<script setup>
import { ref } from 'vue'
import EditorMain from './EditorMain.vue'
import { addDoc, updateDoc, doc } from '@firebase/firestore'
import { editorConfirm } from '@/js/editor'
import router from '@/js/routes'

  const title = ref('')
  const content = ref('')
  const imageContent = ref()
  const editorContents = ref({})

  const save = async () => {
    if (!imageContent.value) {
      imageContent.value = '/img/paca.f07159b0.png'
    }
    editorContents.value = {
      title: title.value,
      contents: content.value,
      image: imageContent.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      id: localStorage.getItem('blog')
    }

    const edit = await addDoc(editorConfirm, editorContents.value)
    await updateDoc(doc(editorConfirm, edit.id), {
      _uid: edit.id
    })

    router.push('/')
  }

</script>

<template>
  <article id="editor_contents">
    <div class="input_wrap">
      <input type="text" v-model="title" />
    </div>
    <EditorMain v-model:text-editor="content" v-model:main-image="imageContent" />
    <div>
      <button @click="save">Save</button>
    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>