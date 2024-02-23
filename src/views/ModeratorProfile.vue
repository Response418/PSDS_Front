<template>
  <div>
    <HeaderModerator />
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-12">
          <div class="profile-info mb-4">
            <h1 class="profile-title">{{ profile.title }}</h1>
            <p class="profile-description">{{ profile.description }}</p>
            <h5>Список добавленных тем:</h5>
          </div>

          <div class="mt-4">

            <div v-if="profile && profile.themes && profile.themes.length === 0">
              <p>Добавленных тем нет (необходимо добавить темы)</p>
            </div>

            <div v-else>
              <div v-for="(theme, index) in profile.themes" :key="index" class="mb-4"
                   @click="$router.push(`/moderator/materials/profiles/${profile.id}/themes/${theme.id}`)">

                <div class="card custom-card">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ theme.title }}
                    </h5>
                    <p class="card-text">{{ theme.description }}</p>
                    <p class="small-text mb-0 text-muted">Уроков: {{ theme.lessons.length }}</p>

                    <div class="cards">
                      <div class="card lesson-card" v-if="theme.showLessons" v-for="(lesson, lessonIndex) in theme.lessons"
                           :key="lessonIndex" @click="$router.push(`/lesson/${lesson.id}`)">
                        <div class="card-body">
                          <p class="card-text">
                            {{ lesson.title }}
                          </p>
                          <p class="small-text mb-0 text-muted">Сложность: {{ lesson.level }}</p>
                          <p v-if="lesson.grade !== 0" class="small-text mb-0 text-muted">
                            Оценка: {{ lesson.grade }}
                          </p>
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
  </div>

  <div class="container mt-3" style="background-color: #6623cc; color: white;">
    <div class="row">
      <div class="col-md-12">
        <h2>Список тем для добавления</h2>

        <div>
          <button @click="$router.push('/moderator/materials/theme')" class="btn mt-3 my-custom-button">Добавить новую тему</button>
        </div>


        <div class="mt-4">
          <div v-for="(theme, index) in listThemes" :key="theme.id" class="mb-4">
            <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
              <div class="card custom-card" @click="toggleAddTheme(index)">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ theme.title }}
                  </h5>
                  <p class="card-text">{{ theme.description }}</p>
                  <p class="small-text mb-0 text-muted">Уроков: {{ theme.lessons.length }}</p>

                  <div class="cards">
                    <div
                        class="card lesson-card"
                        v-if="theme.showLessons"
                        v-for="(lesson, lessonIndex) in theme.lessons"
                        :key="lessonIndex"
                        @click="$router.push(`/lesson/${lesson.id}`)"
                    >
                      <div class="card-body">
                        <p class="card-text">
                          {{ lesson.title }}
                        </p>
                        <p class="small-text mb-0 text-muted">Сложность: {{ lesson.level }}</p>
                        <p v-if="lesson.grade !== 0" class="small-text mb-0 text-muted">
                          Оценка: {{ lesson.grade }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeTheme(index)"></span>
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
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  name: "ModeratorProfile",
  components: { HeaderModerator },
  data() {
    return {
      profile: {},
      listThemes: [],
      selectedThemes: [],
      isDeleteIconVisible: [],
    };
  },
  created() {
    Psds.getProfileDetails(this.$route.params.id).then((profile) => {
      if (profile != null) this.profile = profile;
    });

    Psds.getAllThemes().then((listThemes) => {
      if (listThemes != null) this.listThemes = listThemes;
    });
  },


  methods: {
    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },

    removeTheme(index) {
      const themeId = this.profile.themes[index].id;
      Psds.deleteThemes(themeId)
          .then(() => {
            this.$router.go(0);
          })
          .then(() => {
            console.log('Удаление темы с id:', themeId);
          })
          .catch((error) => {
            console.error('Ошибка при удалении темы', error);
          });
    },

    // toggleLessonList(index) {
    //   const selectedTheme = this.profile.themes[index];
    //   const isThemeSelected = this.selectedThemes.some((theme) => theme.id === selectedTheme.id);
    //
    //   if (!isThemeSelected) {
    //     this.selectedThemes.push(selectedTheme);
    //     this.saveSelectedThemes();
    //   } else {
    //     this.selectedThemes = this.selectedThemes.filter((theme) => theme.id !== selectedTheme.id);
    //   }
    // },
    toggleAddTheme(index) {
      const selectedTheme = this.listThemes[index];
      const isThemeAlreadyAdded = this.profile.themes.some((theme) => theme.id === selectedTheme.id);

      if (this.profile.themes.length === 0 || !isThemeAlreadyAdded) {
        this.profile.themes.push(selectedTheme);
        this.selectedThemes.push(selectedTheme);
        this.saveSelectedThemes();
        this.$router.go(0);
      } else {
        console.log('Тема уже добавлена в список');
      }
    },
    saveSelectedThemes() {
      Psds.editSpecialistProfiles(
          this.profile.id,
          this.profile.title,
          this.profile.description,
          this.selectedThemes
      )
          .then(() => {
            console.log("Изменения сохранены");
            this.selectedThemes.splice(0, this.selectedThemes.length);
          })
          .catch((error) => {
            console.error("Ошибка при сохранении изменений", error);
          });
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

.my-custom-button {
  background-color: white;
  color: black;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738; /* Замените на оранжевый цвет при наведении */
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

.lesson-card {
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
</style>