import { createRouter, createWebHistory } from "vue-router";
import { auth } from '@/js/firebase'

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
      path: "/information",
      component: () => import("@/pages/InformationPage.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log("auth.currentUser", auth.currentUser)
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return
  }

  to.matched.some(test => {
    console.log("test.meta.requiresAuth", test.meta.requiresAuth)
    console.log("!auth.currentUser", !auth.currentUser)
  })

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    
    // next('/login')
    // return
  }

  next()
})

export default router