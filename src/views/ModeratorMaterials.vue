<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h2 class="display-4">Настрока учебных материалов</h2>
      <p class="lead">Добавление, редактирование и удаление учебных материалов.</p>
      <div>
        <button @click="$router.push('/moderator/materials/profile')" class="btn mt-3 my-custom-button">Добавление профиля специалиста</button>
      </div>
    </section>


    <div class="container mt-3" style="background-color: #8145e0; color: white;">
      <h3 class="mb-3">Профили специалиста</h3>
      <div class="d-flex justify-content-end mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск профиля специалиста">
      </div>

      <AlertMessages ref="AddAlertMess" />

      <div class="row">
        <div v-for="(profile, index) in filteredProfiles" :key="index" class="mb-4" @click="$router.push(`/moderator/materials/profile/${profile.id}`)">
          <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 class="card-title mb-3">{{ profile.title }}</h4>
                <p class="card-text">{{ profile.description }}</p>
                <p class="small-text mb-0 text-muted">
                  Темы:{{ profile.themes.length }}, Уроки:{{ getTotalLessons(profile.themes) }}
                </p>
              </div>
              <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeProfile(index)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderUser from "@/components/HeaderUser.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  name: "Profiles",
  components: {HeaderModerator, HeaderUser, AlertMessages},
  data() {
    return {
      profiles: [],
      showSearch: false,
      searchQuery: "",
      hoverIndex: null,

      isDeleteIconVisible: [],
    };
  },
  computed: {
    filteredProfiles: function () {
      const query = this.searchQuery.toLowerCase();
      return this.profiles.filter(
          (profile) =>
              profile.title.toLowerCase().includes(query) ||
              profile.description.toLowerCase().includes(query)
      );
    },
  },
  created() {
    Psds.getSpecialistProfile().then((profiles) => {
      if (profiles != null){
        this.profiles = profiles;
        this.updateDeleteIconsVisibility();
      }
    });
  },
  methods: {

    updateDeleteIconsVisibility() {
      this.isDeleteIconVisible = new Array(this.filteredProfiles.length).fill(false);
    },

    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },
    removeProfile(index) {
      const specialistProfileId = this.filteredProfiles[index].id;
        Psds.deleteSpecialistProfiles(specialistProfileId)
            .then(() => {
              this.$router.push('/moderator/materials');
            })
            .then(() => {
              console.log('Удаление профиля специалиста с id:', specialistProfileId);
            })
            .catch((error) => {
              console.error('Ошибка при удалении профиля специалиста', error);
            });
      },


    hoverButton(index) {
      this.hoverIndex = index;
    },
    resetButton(index) {
      this.hoverIndex = null;
    },
    getTotalLessons(themes) {
      return themes.reduce((total, theme) => total + theme.lessons.length, 0);
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
  background-color: #6623cc;
  color: white;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738; /* Замените на оранжевый цвет при наведении */
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
