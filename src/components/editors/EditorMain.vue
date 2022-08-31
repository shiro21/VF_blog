<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { Editor } from '@/js/editor'
import { uploadFile } from '@/js/db'

  const editor = ref()
  const editorRef = ref()
  const props = defineProps({
    textEditor: String
  })
  const emits = defineEmits(['update:textEditor', 'addImage', 'fileChange'])


  onMounted(() => {
    initialize()
  })

  const initialize = () => {
    editor.value = new Editor({
      // el: document.querySelector("#editor"),
      el: editorRef.value,
      height: "500px",
      initialEditType: "markdown",
      initialValue: props.textEditor,
      previewStyle: 'vertical',
      language: 'ko',
      events: {
        change: () => {
          emits('update:textEditor', editor.value.getMarkdown())
        }
      },
      hooks: {
        addImageBlobHook: addImageBlobHook
      }
    })
    // console.log('onMon', editorRef.value.getMarkdown())
  }

  const addImageBlobHook = async (blob, callback) => {

    let files = blob
    console.log(files)
    if (!files.length) return
    const { snapshot, downloadUrl, metadata } = await uploadFile(files)

    emits('fileChange', snapshot, downloadUrl, metadata)

    callback(downloadUrl, 'alt text');
    return false;
  }

</script>

<template>
  <div id="editor" ref="editorRef" />
</template>

<style scoped lang='scss'>

</style>