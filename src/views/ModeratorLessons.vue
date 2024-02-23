<template>
  <div>
    <HeaderModerator />
    <div class="container mt-5">
      <div class="container mt-5 text-center">
        <h2 class="fw-bold mb-4">Настройка уроков</h2>

        <div>
          <button @click="$router.push('/moderator/materials/lessons/lesson')" class="btn btn-success mt-3">Добавить новый урок</button>
        </div>

        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Описание</th>
            <th scope="col">Уровень сложности</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(lesson, index) in lessonList" :key="lesson.id">
            <th scope="row">{{ index + 1 }}</th>
            <td class="text-start">{{ lesson.title }}</td>
            <td class="text-start">{{ lesson.description }}</td>
            <td class="text-start">{{ lesson.level}}</td>
            <!--            <td>-->
            <!--              <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm ms-2">Удалить</button>-->
            <!--            </td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  components: {HeaderModerator},
  data() {
    return {
      lessonList: [],

      // ModeViewAuthForm: 'Редактировать',
    };
  },

  async created() {
    await this.getAllLessons();
  },

  methods: {
    async getAllLessons(){
      try {
        const lessonList = await Psds.getAllLessons();
        this.lessonList = lessonList;
      } catch (error) {
        console.error("Ошибка при получении списка уроков", error);
      }
    },


  }
};
</script>

<style scoped>
input.form-control {
  width: 100%;
}

.max-width-100 {
  max-width: 20%;
}
</style>