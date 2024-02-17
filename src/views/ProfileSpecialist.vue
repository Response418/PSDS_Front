<template>
  <div>
    <HeaderUser />
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-12">
          <div class="profile-info mb-4">
            <h1 class="profile-title">{{ profile.title }}</h1>
            <p class="profile-description">{{ profile.description }}</p>
            <button class="btn btn-primary float-right" @click="addProfile">
              Добавить в учебный план
            </button>
          </div>

          <div class="mt-4">
            <div v-for="(theme, index) in profile.themes" :key="index" class="mb-4">
              <div class="card custom-card" @click="toggleLessonList(index)">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ theme.title }}
                  </h5>
                  <p class="card-text">{{ theme.description }}</p>
                  <p class="small-text mb-0 text-muted">Уроков: {{ theme.lessons.length }}</p>

                  <div class="cards">
                    <div class="card lesson-card"
                         v-if="theme.showLessons"
                         v-for="(lesson, lessonIndex) in theme.lessons" :key="lessonIndex"
                         @click="$router.push(`/lesson/${lesson.id}`)">
                      <div class="card-body">
                        <p class="card-text" @click="toggleLessonList(index)">
                          {{ lesson.title }}
                        </p>
                        <p class="small-text mb-0 text-muted">Сложность: {{ lesson.level }}</p>
                        <p v-if="lesson.grade !== 0" class="small-text mb-0 text-muted">Оценка: {{ lesson.grade }}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderUser from "@/components/HeaderUser.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "ProfileSpecialist",
  components: { HeaderUser },
  data() {
    return {
      profile: {},
    };
  },
  created() {
    Psds.getProfileDetails(this.$route.params.id).then((profile) => {
      if (profile != null) this.profile = profile;
    });
  },
  methods: {
    addProfile() {
      // Логика добавления профиля
      console.log("Добавление профиля");
    },
    toggleLessonList(index) {
      this.profile.themes[index] = {
        ...this.profile.themes[index],
        showLessons: !this.profile.themes[index].showLessons,
      };

    },
  },
};
</script>


<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.profile-info {
  margin-bottom: 1.5rem;
}

.profile-title {
  margin-bottom: 0.5rem;
}

.profile-description {
  color: #6c757d;
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

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.lesson-card{
  width: 30%;
  margin: 1rem;
}

.lesson-card:hover {
  transform: scale(1.02);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
</style>