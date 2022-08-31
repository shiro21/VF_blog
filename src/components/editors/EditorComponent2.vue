<script setup>
import { ref } from 'vue'
import EditorMain from './EditorMain.vue';

  const content = ref('')

  const save = async () => {
    console.log(content.value)
  }

</script>

<template>
  <article>
    <div class="input_wrap">
      <input type="text" />
    </div>
    <EditorMain v-model:text-editor="content" @add-image="addImage" />
    <div>
      <button @click="save">Save</button>
    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>