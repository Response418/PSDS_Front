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
    path: "/auth/login",
    name: "AuthPage",
    component: () => import("@/views/Auth.vue"),
  },

  {
    path: "/auth/registration",
    name: "Registration",
    component: () => import("@/views/Registration.vue"),
  },

  {
    path: "/moderator",
    name: "Moderator",
    component: () => import("@/views/Moderator.vue"),
  },

  {
    path: "/api/groups/moderator/group",
    name: "Group",
    component: () => import("@/views/Group.vue"),
  },

  {
    path: "/api/groups/moderator",
    name: "GroupsModerator",
    component: () => import("@/views/GroupsModerator.vue"),
  },


  {
    path: "/api/roleInGroup",
    name: "RoleInGroup",
    component: () => import("@/views/RoleInGroup.vue"),
  },

  {
    path: "/api/groups",
    name: "UserGroup",
    component: () => import("@/views/UserGroup.vue"),
  },

  {
    path: "/moderator/materials",
    name: "ModeratorMaterials",
    component: () => import("@/views/ModeratorMaterials.vue"),
  },

  {
    path: "/moderator/materials/lessons",
    name: "ModeratorLessons",
    component: () => import("@/views/ModeratorLessons.vue"),
  },

  {
    path: "/moderator/materials/lessons/lesson",
    name: "ModeratorLesson",
    component: () => import("@/views/ModeratorLesson.vue"),
  },



  {
    path: "/moderator/work",
    name: "UserModerator",
    component: () => import("@/views/UserModerator.vue"),
  },

  {
    path: "/moderator/work/users",
    name: "UserModeratorWork",
    component: () => import("@/views/UserModeratorWork.vue"),
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

  // {
  //   path: "/moderator",
  //   name: "Moderator",
  //   component: () => import("@/views/Moderator.vue"),
  // },
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
