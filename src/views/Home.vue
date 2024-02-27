<template>
  <div>
    <HeaderUser />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4 text-black">Система развития профессиональных навыков</h1>
    </section>

    <section id="gallery">
      <div class="container mt-3 rounded" style="background-color: #8145e0;">
        <div class="row justify-content-center">
            <div  class="col-lg-4 mb-4" v-for="(card, index) in cardsStudent" :key="index"  @click="$router.push(card.route)" v-if="ifRoleAccess('ROLE_STUDENT')">
              <div class="card border-0 rounded custom-card mx-auto d-flex flex-column align-items-stretch" style="height: 100%;" >
                <img :src="card && card.imgSrc ? card.imgSrc : ''" alt="" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title text-center">{{ card && card.title ? card.title : '' }}</h5>
                  <p class="card-text">{{ card && card.description ? card.description : '' }}</p>
                </div>
              </div>
            </div>
          <div  class="col-lg-4 mb-4" v-for="(card, index) in cardsMentor" :key="index"  @click="$router.push(card.route)" v-if="ifRoleAccess('ROLE_MENTOR')">
            <div class="card border-0 rounded custom-card mx-auto d-flex flex-column align-items-stretch" style="height: 100%;" >
              <img :src="card && card.imgSrc ? card.imgSrc : ''" alt="" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title text-center">{{ card && card.title ? card.title : '' }}</h5>
                <p class="card-text">{{ card && card.description ? card.description : '' }}</p>
              </div>
            </div>
          </div>
          <div  class="col-lg-4 mb-4" v-for="(card, index) in cardsDirector" :key="index"  @click="$router.push(card.route)" v-if="ifRoleAccess('ROLE_DIRECTOR')">
            <div class="card border-0 rounded custom-card mx-auto d-flex flex-column align-items-stretch" style="height: 100%;" >
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
import AlertMessages from "@/components/AlertMessages.vue";

import HeaderUser from "@/components/HeaderUser.vue";
import miroLessonPlanningImg from "@/components/images/miro-lesson-planning.jpeg";
import materialImg from "@/components/images/material.jpg";
import userImg from "@/components/images/user.png";
import plan from "@/components/images/plan.png";

export default {
  name: "HomeMain",
  components: {HeaderUser, AlertMessages },
  data() {
    return {
      width: window.innerWidth,
      profileSearch: "",
      roleLevel: -1,


      roles: [],
      cardsStudent: [
        {
          imgSrc: materialImg,
          title: "Учебные материалы",
          description: "Поиск, просмотр и добавление учебных материалов, необходимых для усвоения технологии!",
          route: "/profile",
          roleAccess: "ROLE_STUDENT"
        },
        {
          imgSrc: plan,
          title: "Учебный план",
          description: "Содержит список всех выбранных учебных материалов, необходимых для освоения технологии!",
          route: "/plan",
          roleAccess: "ROLE_STUDENT"
        },
      ],

      cardsMentor: [
        {
          imgSrc: userImg,
          title: "Проверка учебных планов",
          description: "Просмотр учебных планов студентов, выставление оценок за усвоенный учебный материал!",
          route: "/mentor/plan",
          roleAccess: "ROLE_MENTOR"
        },
      ],

      cardsDirector: [
        {
          imgSrc: miroLessonPlanningImg,
          title: "Руководитель группы",
          description: "Назначение наставника для студента. Добавление студента в группу. Просмотр результатов обучения студентов!",
          route: "/group-leader",
          roleAccess: "ROLE_DIRECTOR"
        },
      ],
    }
  },

  mounted() {
    const storedRole = localStorage.getItem('role');
    if (storedRole === 'ROLE_ADMIN') {
      this.$router.push('/moderator');
    }
  },

  created() {
    this.roles = localStorage.getItem('role');
  },
  methods: {
    ifRoleAccess(role) {
      return this.roles.includes(role);
    },
  },
}
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
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
