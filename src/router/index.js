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
    meta: { requiresAuth: true },
  },


  {
    path: "/group-leader",
    name: "Director",
    component: () => import("@/views/Director.vue"),
    meta: { requiresAuth: true },
  },



  {
    path: "/moderator/groups/group",
    name: "Group",
    component: () => import("@/views/Group.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/groups",
    name: "GroupsModerator",
    component: () => import("@/views/GroupsModerator.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/groups/:groupId",
    name: "GroupsEditModerator",
    component: () => import("@/views/GroupsEditModerator.vue"),
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
    path: "/moderator/materials/profiles/:profileId/themes/:themeId",
    name: "ModeratorTheme",
    component: () => import("@/views/ModeratorTheme.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/materials/theme",
    name: "ModeratorCreateTheme",
    component: () => import("@/views/ModeratorCreateTheme.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/materials/theme/:themeId/lesson",
    name: "ModeratorCreateLesson",
    component: () => import("@/views/ModeratorCreateLesson.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/moderator/materials/theme/:themeId/lesson/:lessonId",
    name: "ModeratorEditLessonAndMaterial",
    component: () => import("@/views/ModeratorEditLessonAndMaterial.vue"),
    meta: { requiresAuth: true },
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
