<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">ПАНЕЛЬ АДМИНИСТРАТОРА</h1>
      <p class="lead">Настройка и редактирование необходимых материалов.</p>
    </section>

    <section id="gallery">
      <div class="container">
        <div class="row">
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
</template>

<script>
import HeaderModerator from "@/components/HeaderModerator.vue";

import miroLessonPlanningImg from "@/components/images/miro-lesson-planning.jpeg";
import materialImg from "@/components/images/material.jpg";
import userImg from "@/components/images/user.png";

export default {
  components: {
    HeaderModerator,
  },
  data() {
    return {
      cards: [
        {
          imgSrc: materialImg,
          title: "Уроки",
          description: "Добавление уроков!",
          route: "/moderator/materials/lessons",
        },
        {
          imgSrc: userImg,
          title: "Темы",
          description: "Добавление тем!",
          route: "/moderator/materials/themes",
        },

        {
          imgSrc: userImg,
          title: "Профиль специалиста",
          description: "Добавление профилей специалиста!",
          route: "/moderator/materials/specialist-profiles",
        },
      ],
    };
  },
};
</script>


<style scoped>

</style>