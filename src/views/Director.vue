<template>
  <div>
    <HeaderUser />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">РУКОВОДИТЕЛЬ ГРУППЫ</h1>
      <p class="lead">Настройка и редактирование наставников. Добавление пользователей в группу и отслеживание их результатов.</p>
    </section>

    <section id="gallery">
      <div class="container mt-3 rounded" style="background-color: #8145e0;">
        <div class="row justify-content-center">
          <div class="col-lg-4 mb-4" v-for="(card, index) in cards" :key="index" @click="$router.push(card.route)">
            <div class="card border-0 rounded custom-card mx-auto d-flex flex-column align-items-stretch" style="height: 100%;">
              <img :src="card.imgSrc" alt="" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title text-center">{{ card.title }}</h5>
                <p class="card-text">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import mentor from "@/components/images/mentor.png";
import students from "@/components/images/students.jpg";

import HeaderUser from "@/components/HeaderUser.vue";

export default {
  components: {HeaderUser},
  data() {
    return {
      cards: [
        {
          imgSrc: mentor,
          title: "Назначение наставника",
          description: "Назначить наставника для студента, отслеживающего процесс его обучения!",
          route: "/group-leader/mentor",
        },
        {
          imgSrc: students,
          title: "Студенты группы",
          description: "Добавление студентов в учебную группы. Просмотр результатов их обучения!",
          route: "/group-leader/students",
        },
      ],
    };
  },
};
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

.btn-primary {
  background-color: #a281d2;
  border-color: #a281d2;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ee6738;
  border-color: #ee6738;
}

.small-text {
  font-size: 0.85rem;
  opacity: 0.5;
}
</style>