import { createStore } from "vuex";
import router from '@/js/routes'
import { auth } from '@/js/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db } from '@/js/db'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      console.log('CLEAR USER')
      state.user = null
    }
  },
  actions: {
    async login ({ commit }, details) {
      const { id, pass } = details

      try {
        await signInWithEmailAndPassword(auth, id, pass)
      } catch (err) {
        switch (err.code) {
          case 'auth/user-not-found' :
            alert('유저가 없습니다.')
            break
          case 'auth/wrong-password' :
            alert('비밀번호가 틀렸습니다.')
            break
          default :
            alert(err.message)
            break
        }

        return
      }
      
      commit('SET_USER', auth.currentUser)

      const querySnapshot = await getDocs(collection(db, "users"))

      querySnapshot.forEach(doc => {
        if (doc.data().id === auth.currentUser.uid) {
          localStorage.setItem('blog', doc.data()._uid)
        }
      })

      router.push('/')
    },
    async join ({ commit }, details) {

      const { id, pass, nick } = details

      try {
        await createUserWithEmailAndPassword(auth, id, pass)
        const authId = auth.currentUser.uid

        await addDoc(collection(db, "users"), {
          id: authId,
          email: id,
          nick: nick,
          blogName: '',
          description: '',
          profile: '/img/paca.f07159b0.png',
          createdAt: new Date(),
          isDeleted: false
        })
        .then(async docRef => {
          await updateDoc(doc(db, "users", docRef.id), {
            _uid: docRef.id
          })

          localStorage.setItem('blog', docRef.id)

          commit('SET_USER', auth.currentUser)

          router.push('/')
        })
        .catch(err => console.log(err))

      } catch (err) {
        switch (err.code) {
          case 'auth/email-already-in-use' :
            alert('이미 사용중인 이메일 입니다.')
            break
          case 'auth/operation-not-allowed' :
            alert('허용되지 않습니다.')
            break
          case 'auth/invalid-email' :
            alert('잘못된 이메일입니다.')
            break
          case 'auth/weak-password' :
            alert('비밀번호가 부실합니다.')
            break
          default :
            alert(err.message)
            break
        }

        return
      }


    },
    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      localStorage.removeItem('blog')

      router.push('/login')
    },

    fetchUser ({ commit }) {

      auth.onAuthStateChanged(async user => {
        console.log('fetchUser')
        console.log(user)
        if (user === null) {
          router.push('/login')
          commit('CLEAR_USER')
        } else if (!localStorage.getItem('blog')) {
          router.push('/login')
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
  },
  modules: {

  },
  getters: {

  }
})