<template>
  <div>
    <HeaderUser />
    <div class="container mt-3">
      <h1 class="mb-3">Профили специалистов</h1>
      <div class="d-flex justify-content-end mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск учебного плана">
      </div>

      <AlertMessages ref="AddAlertMess" />

      <div class="row">
        <div v-for="(profile, index) in filteredProfiles" :key="index" class="mb-4" @click="$router.push(`/profile/${profile.id}`)">
          <div class="card custom-card">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 class="card-title mb-3">{{ profile.title }}</h4>
                <p class="card-text">{{ profile.description }}</p>
                <p class="small-text mb-0 text-muted">Темы:{{ profile.themes.length }}, Уроки:{{ getTotalLessons(profile.themes) }}</p>
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
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "Profiles",
  components: {HeaderUser, AlertMessages},
  data() {
    return {
      profiles: [],
      showSearch: false,
      searchQuery: "",
      hoverIndex: null,
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
      if (profiles != null) this.profiles = profiles;
    });
  },
  methods: {
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