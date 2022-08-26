<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'

import { doc, getDoc } from "firebase/firestore";
import { db, uploadFile } from '@/js/db'

  const router = useRoute()
  const user = ref()

  const fsEmits = defineEmits(['fileChange'])


  onMounted(async () => {
    const id = router.params.id
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      user.value = docSnap.data()
    } else {
      console.log("No such document!");
    }
  })

  const getImg = async (e) => {
    // const image = e.target.files[0]
    // console.log(image)
    
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return

    const { snapshot, downloadUrl, metadata } = await uploadFile(files[0])

    fsEmits('fileChange', snapshot, downloadUrl, metadata)

    preview(downloadUrl)
  }

  function preview(downloadUrl) {
    user.value.profile = downloadUrl
  }

  const information = async () => {
    const _id = router.params.id
    user.value._uid = _id
    
    console.log(user.value)
  }

</script>

<template>
  <div id="info_contents">
    <h2><em>블로그 정보</em></h2>

    <div class="blog_information" v-if="user">
      <div class="items">
        <div class="left">블로그 주소</div>
        <div class="right">{{user.email}}</div>
      </div>

      <div class="items">
        <div class="left">이름</div>
        <div class="right">
          <input type="text" v-model="user.nick" />
        </div>
      </div>

      <div class="items">
        <div class="left">블로그 소개</div>
        <div class="right">
          <textarea type="text" v-model="user.description" />
        </div>
      </div>

      <div class="items">
        <div class="left">프로필</div>
        <div class="right d_f">
          <div class="image_preview">
            <img :src="user.profile" :alt="'유저닉네임 - ' + user.nick" />
            <input type="file" accept="image/jpeg, image/jpg" @change="getImg" />
          </div>

          <div class="image_button">
            <button>등록</button>
            <button>삭제</button>
          </div>
        </div>
      </div>

      <div class="item_button">
        <button @click="information">등록</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
// @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>