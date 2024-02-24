<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h2 class="display-4">Настройка профиля специалиста</h2>
      <p class="lead">Добавление, редактирование и удаление тем.</p>
    </section>

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



  <div class="container mt-3" style="background-color: #8145e0; color: white;">
    <h3 class="mb-1">Список тем для добавления:</h3>
    <div class="mb-3 text-center">
      <button @click="$router.push('/moderator/materials/theme')" class="btn mt-1 my-custom-button">Добавить новую тему</button>
    </div>
    <div class="d-flex justify-content-end mb-3">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск темы...">
    </div>

    <div class="row">
      <div v-for="(theme, index) in filteredTheme" :key="theme.id" class="mb-4" @click="toggleAddTheme(index)">
<!--      <div v-for="(profile, index) in filteredProfiles" :key="index" class="mb-4" @click="$router.push(`/moderator/materials/profile/${profile.id}`)">-->
        <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4 class="card-title mb-1">{{ theme.title }}</h4>
              <p class="card-text">{{ theme.description }}</p>
              <p class="small-text mb-0 text-muted mb-0"> Уроки:{{ theme.lessons.length }}</p>
            </div>
            <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeTheme(theme.id, $event)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>




<!--  <div class="container mt-3" style="background-color: #6623cc; color: white;">-->
<!--    <div class="row">-->
<!--      <div class="col-md-12">-->
<!--        <h2>Список тем для добавления</h2>-->

<!--        <div>-->
<!--          <button @click="$router.push('/moderator/materials/theme')" class="btn mt-3 my-custom-button">Добавить новую тему</button>-->
<!--        </div>-->


<!--        <div class="mt-4">-->
<!--          <div v-for="(theme, index) in listThemes" :key="theme.id" class="mb-4">-->
<!--            <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">-->
<!--              <div class="card custom-card" @click="toggleAddTheme(index)">-->
<!--                <div class="card-body">-->
<!--                  <h5 class="card-title">-->
<!--                    {{ theme.title }}-->
<!--                  </h5>-->
<!--                  <p class="card-text">{{ theme.description }}</p>-->
<!--                  <p class="small-text mb-0 text-muted">Уроков: {{ theme.lessons.length }}</p>-->

<!--                  <div class="cards">-->
<!--                    <div-->
<!--                        class="card lesson-card"-->
<!--                        v-if="theme.showLessons"-->
<!--                        v-for="(lesson, lessonIndex) in theme.lessons"-->
<!--                        :key="lessonIndex"-->
<!--                        @click="$router.push(`/lesson/${lesson.id}`)"-->
<!--                    >-->
<!--                      <div class="card-body">-->
<!--                        <p class="card-text">-->
<!--                          {{ lesson.title }}-->
<!--                        </p>-->
<!--                        <p class="small-text mb-0 text-muted">Сложность: {{ lesson.level }}</p>-->
<!--                        <p v-if="lesson.grade !== 0" class="small-text mb-0 text-muted">-->
<!--                          Оценка: {{ lesson.grade }}-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeTheme(index, $event)"></span>-->
<!--                </div>-->
<!--              </div>-->

<!--            </div>-->

<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";
import AlertMessages from "@/components/AlertMessages.vue";

export default {
  name: "ModeratorProfile",
  components: {AlertMessages, HeaderModerator },
  data() {
    return {
      profile: {},
      listThemes: [],
      selectedThemes: [],
      isDeleteIconVisible: [],
      searchQuery: "",
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

  computed: {
    filteredTheme: function () {
      const query = this.searchQuery.toLowerCase();
      return this.listThemes.filter(
          (theme) =>
              theme.title.toLowerCase().includes(query) ||
              theme.description.toLowerCase().includes(query)
      );
    },
  },


  methods: {
    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },

    removeTheme(themeId, event) {
      event.stopPropagation();
      // const themeId = this.profile.themes[index].id;
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
  color: black;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738;
  color: white;
  transition: background-color 0.3s ease;
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
  transition: color 0.3s ease; /* добавляем анимацию перехода цвета */
}

.delete-icon:hover {
  color: #ee6738; /* цвет при наведении */
}
</style>