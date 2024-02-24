<template>
  <div>
    <HeaderUser />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4 text-black">Система развития профессиональных навыков</h1>
    </section>

    <section id="gallery">
      <div class="container mt-3 rounded" style="background-color: #8145e0;">
        <div class="row justify-content-center" :style="{ flexWrap: getFlexWrapStyle() }">

          <div  class="col-lg-4 mb-4" v-for="(card, index) in cards" :key="index"  @click="$router.push(card.route)">
            <div class="card border-0 rounded custom-card mx-auto d-flex flex-column align-items-stretch" style="height: 100%;">
              <img :src="card && card.imgSrc ? card.imgSrc : ''" alt="" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title text-center">{{ card && card.title ? card.title : '' }}</h5>
                <p class="card-text">{{ card && card.description ? card.description : '' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
import Psds from "@/services/Psds.js";

export default {
  name: "HomeMain",
  components: {HeaderUser, Plan, Profile, AuthForm, AlertMessages, Team },
  data() {
    return {
      width: window.innerWidth,
      profileSearch: "",
      roleLevel: -1,


      roles: [],
      cards: [
        {
          imgSrc: materialImg,
          title: "Учебные материалы",
          description: "Поиск, просмотр и добавление учебных материалов, необходимых для усвоения технологии!",
          route: "/profile",
          roleAccess: "ROLE_STUDENT"
        },
        {
          imgSrc: userImg,
          title: "Учебный план",
          description: "Содержит список всех выбранных учебных материалов необходимых для усвоения технологии!",
          route: "/plan",
          roleAccess: "ROLE_STUDENT"
        },
        {
          imgSrc: userImg,
          title: "Проверка учебных плана",
          description: "Просмотр учебных планов студентов, выставление оценок за усвоенный учебный материал!",
          route: "/mentor/plan",
          roleAccess: "ROLE_MENTOR"
        },
        {
          imgSrc: miroLessonPlanningImg,
          title: "Руководитель группы",
          description: "Назначение наставника для студента!",
          route: "/group-leader",
          roleAccess: "ROLE_DIRECTOR"
        },
        // {
        //   imgSrc: materialImg,
        //   title: "Only модер",
        //   description: "Ты не должен этого видеть!!!!",
        //   route: "/mentor/plan",
        //   roleAccess: "3"
        // },
      ],
    }
  },
  created() {

    Psds.getDataSession().then(data => {
      this.roles = data.roles;
      console.log(this.roles)
    });
  },
  methods: {
    ifRoleAccess(role) {
      return this.roles.includes(role);
    },
    getFlexWrapStyle() {
      const totalCards = this.cards.length;
      return totalCards === 4 ? 'wrap' : 'nowrap';
    },

  },
}
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
}

.mb-3 {
  margin-bottom: 1.5rem !important;
}

.form-control {
  background-color: #fff;
  border-color: #a281d2;
  color: #495057;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.custom-card:hover {
  transform: scale(1.05);
}

.card-text {
  color: #495057;
}

.card-title {
  font-size: 1.5rem;
}

.row {
  flex-wrap: wrap;
}

</style>
