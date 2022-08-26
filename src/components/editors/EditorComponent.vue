<script setup>
import { ref, onMounted } from 'vue'
import { Editor } from '@/js/editor'

  const editorRef = ref()
  const content = ref('')
  
  onMounted(() => {
    editorRef.value = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "markdown",
      initialValue: content.value,
      previewStyle: 'vertical',
      language: 'ko'
    })
  })


  const save = () => {
    console.log(editorRef.value.getMarkdown())


  }


</script>

<template>
  <article>
    <v-subheader>
      <button @click="save">Save</button>
    </v-subheader>
    <div id="editor" :initialValue="content.value" ref="editorRef" />
  </article>
</template>

<style scoped lang='scss'>

</style>