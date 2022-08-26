import { createRouter, createWebHistory } from "vue-router";
// import { auth } from '@/js/firebase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name : 'main',
      path: "/",
      component: () => import("@/pages/MainPage.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      name : 'login',
      path: "/login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      name : 'join',
      path: "/join",
      component: () => import("@/pages/JoinPage.vue"),
    },
    {
      name : 'information',
      path: "/information/:id",
      component: () => import("@/pages/InformationPage.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      name : 'editor',
      path: "/editor",
      component: () => import("@/pages/EditorPage.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      name : 'create',
      path: "/create",
      component: () => import("@/pages/tests/CreateC.vue")
    },
    {
      name : 'read',
      path: "/read",
      component: () => import("@/pages/tests/ReadC.vue")
    },
    {
      name : 'update',
      path: "/update/:id",
      component: () => import("@/pages/tests/UpdateC.vue")
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  // if (to.path === '/login' && auth.currentUser) {
  //   next('/')
  //   return
  // }
  // console.log(localStorage.getItem('blog'))
  // if (localStorage.getItem('blog')) {
  //   const q = query(collection(db, "users"))

  //   const querySnapshot = await getDocs(q)

  //   querySnapshot.forEach((doc) => {
  //     if (localStorage.getItem('blog') === doc.data().id) {
  //       console.log(doc.data())
  //         const userData = doc.data()
  //         userData
  //     }
  //   })
  // }

  // if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
  //   next('/login')
  //   return
  // }

  next()
})

export default router