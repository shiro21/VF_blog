<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { Editor } from '@/js/editor'
import { addDoc } from '@firebase/firestore'
import { editorConfirm } from '@/js/editor'

  const editorRef = ref()
  const content = ref('')
  const title = ref('')
  // const comprehensive = ref({})
  // const contents = ref()
  const editorContents = ref({})
  const state = reactive({
    message: 'hello'
  })

  const onInput = ({ target: { value } }) => {
    state.message = value
    title.value = value
  }
  
  onMounted(() => {
    initialize()
  })

  // const initialize = () => {
  //   editorRef.value = new Editor({
  //     el: document.querySelector("#editor"),
  //     height: "500px",
  //     initialEditType: "markdown",
  //     initialValue: content.value,
  //     previewStyle: 'vertical',
  //     language: 'ko'
  //   })
  // }

  const initialize = () => {
    editorRef.value = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "markdown",
      initialValue: content.value,
      previewStyle: 'vertical',
      language: 'ko'
    })
  }

  watch(() => {})

  const save = async () => {
    let toastUi = editorRef.value.getMarkdown()

    editorContents.value = {
      title: title.value,
      edit: toastUi
    }
    const edit = await addDoc(editorConfirm, editorContents.value)
    console.log(edit)
  }

</script>

<template>
  <article>
    <div class="input_wrap">
      <input type="text" @input="onInput" />
    </div>
    <div id="editor" :initialValue="content.value" ref="editorRef" />
    <div>
      <button @click="save">Save</button>
    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>