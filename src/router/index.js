import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import Concurs from "@/services/Concurs";

const routes = [
  {
    path: "/",
    name: "HomeMain",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "AuthPage",
    component: () => import("@/views/Auth.vue"),
  },
  {
    path: "/profile",
    name: "Profiles",
    component: () => import("@/views/Profiles.vue"),
  },
  {
    path: "/profile/special",
    name: "ProfileSpecialist",
    component: () => import("@/views/ProfileSpecialist.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.inc(); // увеличение прогресса на случайный процент
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     Concurs.isAuthenticated().then((res) => {
//       if (!res.data.login) {
//         next({
//           path: '/auth',
//           query: { redirect: to.fullPath } // сохраняем URL для перенаправления после регистрации
//         })
//       } else {
//         next() // продолжаем навигацию
//       }
//     })
//   } else {
//     next() // продолжаем навигацию
//   }
// })

export default router;
