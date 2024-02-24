<template>
    <div>
      <HeaderModerator />
      <section id="header" class="jumbotron text-center mt-4 mb-4">
        <h2 class="display-4">Настройка уроков</h2>
        <p class="lead">Добавление, редактирование, удаление уроков и их материалов.</p>
      </section>

      <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
        <h3 class="profile-title" style="font-weight: 700;">Профиль специалиста: {{ profile.title }}</h3>
        <h3 class="profile-title" style="font-weight: 700;">Тема: {{ theme.title }}</h3>
          <div class="d-flex justify-content-center">
            <button @click="$router.push(`/moderator/materials/theme/${theme.id}/lesson`)" class="btn mt-3 my-custom-button">Добавить новый урок</button>
          </div>
        <AlertMessages ref="AddAlertMess" />

        <div class="row mt-3">
          <div v-for="(lesson, index) in theme.lessons" :key="index" class="mb-4"
               @click="$router.push(`/moderator/materials/theme/${theme.id}/lesson/${lesson.id}`)">

            <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="text-container">
                  <h4 class="card-title mb-2">{{ lesson.title }}</h4>
                  <p class="card-text">{{ lesson.description }}</p>
                    <div class="difficulty-card text-center rounded wider"  :style="getDifficultyStyle(lesson.level)">
                      <p class="mb-0 font-weight-bold" style="font-weight: 700;">Уровень: {{ getLevelName(lesson.level) }}</p>
                    </div>
                </div>
                <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeLesson(index, $event)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import HeaderModerator from "@/components/HeaderModerator.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";
import http from "@/http-common.js";

export default {
  name: "ModeratorTheme",
  components: { HeaderModerator, AlertMessages },
  data() {
    return {
      profile: {},
      theme: {},
      lesson: {},
      grade: 0,
      materials: [],
      listLessons: [],
      isDeleteIconVisible: [],
      selectedLesson: [],
    };
  },


  created() {
    Psds.getProfileDetails(this.$route.params.profileId).then((profile) => {
      if (profile != null) this.profile = profile;
    });

    Psds.getThemeDetails(this.$route.params.themeId).then((theme) => {
      if (theme != null) this.theme = theme;
    });
  },

  methods: {

    getDifficultyStyle(level) {
      switch (level) {
        case 1:
          return { backgroundColor: '#17944f', color: 'white' };
        case 2:
          return { backgroundColor: '#ffdc4d', color: 'white' };
        case 3:
          return { backgroundColor: '#ee6738', color: 'white' };
        default:
          return { backgroundColor: 'lightgray', color: 'black' };
      }
    },

    getLevelName(level) {
      switch (level) {
        case 1:
          return 'Базовый';
        case 2:
          return 'Средний';
        case 3:
          return 'Продвинутый';
        default:
          return 'Неизвестный';
      }
    },

    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },

    removeLesson(index, event) {
      event.stopPropagation();
      const lessonId = this.theme.lessons[index].id;
      console.log(lessonId);
      Psds.deleteLesson(lessonId)
          .then(() => {
            this.$router.go(0);
          })
          .then(() => {
            console.log('Удаление урока с id:', lessonId);
          })
          .catch((error) => {
            console.error('Ошибка при удалении урока', error);
          });
    },

  }
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
  transform: scale(1.02);
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

.my-custom-button {
  background-color: #faf9f9;
  color: #09090a;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738;
  color: white;
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

.delete-icon {
  cursor: pointer;
  font-size: 35px;
  color: rgb(72, 3, 138);
  text-shadow: rgb(231, 107, 69) 0px 0px 0px;
  opacity: 1;
  -webkit-text-stroke-width: 0px;
  transition: color 0.3s ease;
}

.delete-icon:hover {
  color: #ee6738;
}

.wider {
  width: 200px;
}

</style>


