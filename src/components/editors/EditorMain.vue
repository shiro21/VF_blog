<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { Editor } from '@/js/editor'
import { uploadFile } from '@/js/db'

  const editor = ref()
  const editorRef = ref()
  const imageArray = ref([])
  const props = defineProps({
    textEditor: String,
    mainImage: String
  })
  const emits = defineEmits(['update:textEditor', 'update:mainImage'])


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

    if (!blob) return
    // const { snapshot, downloadUrl, metadata } = await uploadFile(blob)
    const { downloadUrl } = await uploadFile(blob)

    imageArray.value.push(downloadUrl)
    console.log(imageArray.value)
    // emits('update:mainImage', downloadUrl)

    // emits('update:addImage', snapshot, downloadUrl, metadata)

    callback(downloadUrl, 'alt text')
    return false;
  }

  const imageSelect = (item) => {
    console.log(item)

    emits('update:mainImage', item)
  }

</script>

<template>
  <div id="editor" ref="editorRef" />

  <div class="preview" v-if="imageArray.length > 0">
    <h2>대표 이미지 선택하기</h2>
    <div class="image_wrap">
      <div class="image_box" v-for="(item, i) of imageArray" :key="'a' + i">
        <img @click="imageSelect(item)" :src="item" alt="대표 이미지" />
      </div>
    </div>
  </div>

</template>

<style scoped lang='scss'>

</style>