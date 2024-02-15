<template>
  <div>
    <div class="container mt-5">
      <h2>Список ваших групп</h2>
      <div v-for="(group, index) in groupList" :key="group.id" class="card-container mt-3">
        <router-link :to="{ path: '/' }" class="card h-100 d-flex flex-column" :style="{ 'background-image': group.hasGradient ? 'linear-gradient(45deg, #efe5e2, #6e0f0f)' : '' }">
          <div class="card-body flex-grow-1">
            <h5 class="card-title text-center font-weight-bold font-italic" :style="{ color: group.hasGradient ? 'white' : 'black' }">{{ group.name }}</h5>
          </div>
          <div class="card-footer bg-white">
            <p class="card-text">{{ group.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>


<!--  <div>-->
<!--    <HeaderModerator />-->
<!--    <div class="container mt-5">-->
<!--      <h2>Список ваших групп</h2>-->
<!--      <ul>-->
<!--        <li v-for="(group, index) in groupList" :key="group.id">-->
<!--          <strong>{{ group.name }}</strong>: {{ group.description }}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import Psds from "@/services/Psds.js";

export default {
  data() {
    return {
      groupList: [],
    };
  },

  async created() {
    await this.getGroupForUser();
  },

  methods: {
    async getGroupForUser() {
      try {
        const groupList = await Psds.getGroupForUser();
        this.groupList = groupList;
      } catch (error) {
        console.error("Ошибка при получении списка групп", error);
      }
    },

    getCardClass(group) {
      // Возвращаем класс в зависимости от данных в groupList
      return group.hasGradient ? 'bg-gradient' : '';
    },
  },
};
</script>


<style scoped>

.card.h-100 {
  border-radius: 10px;
  overflow: hidden;
  background-size: cover; /* Добавьте это, чтобы градиент занимал всю площадь карточки */
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  margin: 0;
}
bg-gradient {
  background: linear-gradient(45deg, #c04824, #6e0f0f);
}

</style>