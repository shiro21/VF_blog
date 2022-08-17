import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name : 'main',
      path: "/",
      component: () => import("@/pages/MainPage.vue"),
    }
  ]
});

export default router;