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
    meta: { requiresAuth: true },
  },


  {
    path: "/group-leader",
    name: "Director",
    component: () => import("@/views/Director.vue"),
    meta: { requiresAuth: true },
  },

  // path: "/profile",
  //   name: "Profiles",
  //   component: () => import("@/views/Profiles.vue"),
  //   meta: { requiresAuth: true },

  {
    path: "/moderator/groups/group",
    name: "Group",
    component: () => import("@/views/Group.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/groups/moderator",
    name: "GroupsModerator",
    component: () => import("@/views/GroupsModerator.vue"),
    meta: { requiresAuth: true },
  },


  {
    path: "/moderator/work/role-in-group",
    name: "ModeratorRoleInGroup",
    component: () => import("@/views/ModeratorRoleInGroup.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/groups",
    name: "UserGroup",
    component: () => import("@/views/UserGroup.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/materials",
    name: "ModeratorMaterials",
    component: () => import("@/views/ModeratorMaterials.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/materials/profile",
    name: "ModeratorCreateProfile",
    component: () => import("@/views/ModeratorCreateProfile.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/materials/profile/:id",
    name: "ModeratorProfile",
    component: () => import("@/views/ModeratorProfile.vue"),
    meta: { requiresAuth: true },
  },


  {
    path: "/moderator/materials/theme",
    name: "ModeratorCreateTheme",
    component: () => import("@/views/ModeratorCreateTheme.vue"),
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/work/users",
    name: "UserModeratorWork",
    component: () => import("@/views/UserModeratorWork.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/profile",
    name: "Profiles",
    component: () => import("@/views/Profiles.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id",
    name: "ProfileSpecialist",
    component: () => import("@/views/ProfileSpecialist.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/lesson/:id",
    name: "Lesson",
    component: () => import("@/views/Lesson.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'AuthPage',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
