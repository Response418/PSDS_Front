import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Psds from "@/services/Psds.js";
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
  {
    path: "/plan",
    name: "Plan",
    component: () => import("@/views/Plan.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mentor/plan",
    name: "MentorPlan",
    component: () => import("@/views/MentorPlan.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mentor/:linkId/profile/:profileId",
    name: "MentorProfile",
    component: () => import("@/views/MentorProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mentor/:linkId/lesson/:lessonId",
    name: "MentorLesson",
    component: () => import("@/views/MentorLesson.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'AuthPage',
        query: { redirect: to.fullPath }
      });
    } else {
      Psds.getDataSession().then(data => {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('groupId', data.groupId)
        localStorage.setItem('role', data.role)
      });
      next();
    }
  } else {
    next();
  }
});

export default router;
