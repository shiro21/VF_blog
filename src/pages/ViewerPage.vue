<script setup>
import { onMounted, ref } from 'vue'
// import { editorConfirm } from '@/js/editor'
import { getDoc, doc } from '@firebase/firestore'
import { useRoute } from 'vue-router'
import { db } from '@/js/db'
import { Viewer } from '@/js/editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

  const route = useRoute()
  const item = ref({})
  const viewer = ref()
  const viewerRef = ref()
  
  onMounted(async () => {
    console.log(route.params.id)
    const docRef = doc(db, "edits", route.params.id)
    const data = await getDoc(docRef)

    item.value = data.data()

    initialize(item.value)
  })

  const initialize = async (itemData) => {
    console.log(itemData.contents)
    // console.log(viewerRef.value)

    viewer.value = new Viewer({
      el: viewerRef.value,
      initialEditType: "markdown",
      previewStyle: 'vertical',
      initialValue: itemData.contents
    })
    console.log(await viewer.value.getMarkdown())
  }
</script>

<template>
  <section id="viewer_wrap">
    {{item.title}}
    {{item.contents}}

    <div id="viewer" ref="viewerRef"></div>
  </section>
</template>

<style scoped lang='scss'>

</style>