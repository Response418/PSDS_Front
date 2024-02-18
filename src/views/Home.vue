<template>
  <section class="vh-100" style="background-color: #861cec;">
<!--  <AuthForm/>-->
  <div>
    <HeaderUser />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4 text-white">Система развития профессиональных навыков</h1>
      <p class="lead">Настройка и редактирование необходимых материалов.</p>
    </section>

    <section id="gallery">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 mb-4" v-for="(card, index) in cards" :key="index">
            <div class="card h-100 d-flex flex-column">
              <img :src="card.imgSrc" alt="" class="card-img-top">
              <div class="card-body flex-grow-1 bg-white">
                <h5 class="card-title text-center">{{ card.title }}</h5>
                <p class="card-text">{{ card.description }}</p>
              </div>
              <div class="card-footer bg-white">
                <div class="d-flex justify-content-center">
                  <a class="btn btn-outline-success btn-sm" @click="$router.push(card.route)">Настроить</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </section>

  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Profile from "@/components/Profile.vue";
import Plan from "@/components/Plan.vue";
import Team from "@/components/Team.vue";

import HeaderUser from "@/components/HeaderUser.vue";
import miroLessonPlanningImg from "@/components/images/miro-lesson-planning.jpeg";
import materialImg from "@/components/images/material.jpg";
import userImg from "@/components/images/user.png";

export default {
  name: "HomeMain",
  components: {HeaderUser, Plan, Profile, AuthForm, AlertMessages, Team },
  data() {
    return {
      width: window.innerWidth,
      profileSearch: "",
      cards: [
        {
          imgSrc: miroLessonPlanningImg,
          title: "Учебные материалы",
          description: "Поиск, просмотр и добавление учебных материалов, необходимых для усвоения технологии!",
          route: "/profile",
        },
        {
          imgSrc: materialImg,
          title: "Учебный план",
          description: "Добавление тем, необходимых для обучения специалистов, создание уроков и добавление материалов для обеспечения эффективного обучения!",
          route: "/plan",
        },
        {
          imgSrc: materialImg,
          title: "Учебный план студентов",
          description: "Просмотривай учебные планы студентов!",
          route: "/mentor/plan",
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
