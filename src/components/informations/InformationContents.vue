<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'

import {
  doc, getDoc, setDoc, updateDoc
  // , deleteField 
} from "firebase/firestore"
import { ref as fsRef, deleteObject } from 'firebase/storage'
import { db, storage, uploadFile } from '@/js/db'
import { defaultImage } from '@/js/editor'
import router from '@/js/routes'

  const route = useRoute()
  const user = ref()
  const updateData = ref()

  const fsEmits = defineEmits(['fileChange'])


  onMounted(async () => {
    const id = route.params.id
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    updateData.value = docRef

    if (docSnap.exists()) {
      user.value = docSnap.data()
    } else {
      console.log("No such document!");
    }
  })

  const getImg = async (e) => {

    // 이미지가 기본 이미지가 아닐 경우
    if (user.value.profile !== '/img/paca.f07159b0.png') {
      let str = user.value.profile
      
      // 주소 자르기 ( 정규식 % ? )
      let array = str.split(/[%?]/)
      let profileUrl = array[1].substr(2)
  
      const storageRef = fsRef(storage, 'images/' + profileUrl)
      deleteObject(storageRef)
      .then(() => console.log('이미지 삭제 완료'))
      .catch(err => console.log(err))
    }
    
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return

    const { snapshot, downloadUrl, metadata } = await uploadFile(files[0])

    fsEmits('fileChange', snapshot, downloadUrl, metadata)

    preview(downloadUrl)

    await updateDoc(updateData.value, {
      profile: downloadUrl
    })
  }

  function preview(downloadUrl) {
    user.value.profile = downloadUrl
  }

  const information = async () => {

    await setDoc(updateData.value, user.value)
    
    alert('등록완료')

    router.push('/')
  }

  const deletedImage = async () => {
    await updateDoc(updateData.value, {
      // 필드 자체를 삭제
      // profile: deleteField(),
      profile: defaultImage
    })

    previewNon()
  }

  function previewNon() {
    user.value.profile = defaultImage
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
        <div class="right d_f between">
          <div class="image_preview">
            <img :src="user.profile" :alt="'유저닉네임 - ' + user.nick" />
            <input type="file" accept="image/jpeg, image/jpg" @change="getImg" />
          </div>

          <div class="image_button">
            <button @click="deletedImage">삭제</button>
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