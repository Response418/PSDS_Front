<template>

  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">Настройка пользователей</h1>
      <p class="lead">Удаление пользователей.</p>
    </section>
    <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
      <div class="d-flex justify-content-end mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск пользователя">
      </div>
      <div class="row mt-3">
        <div v-for="(user, index) in filteredUsers" :key="index" class="mb-4">
          <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="text-container">
                <h5 class="card-title mb-2">{{ user.lastName }} {{ user.firstName }} {{ user.fatherName }}</h5>
                <p class="card-text">Город: {{ user.city }}</p>
              </div>
              <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="deleteUser(index)"></span>
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
  components: {HeaderModerator},
  data() {
    return {
      usersList: [],
      isDeleteIconVisible: [],
      searchQuery: '',
    };
  },

  created() {
    this.getUsersForModerator();
  },

  computed: {
    filteredUsers: function () {
      const query = this.searchQuery.toLowerCase();
      return this.usersList.filter((user) => {
        const lastName = (user.lastName || '').toLowerCase();
        const firstName = (user.firstName || '').toLowerCase();
        const fatherName = (user.fatherName || '').toLowerCase();
        const city = (user.city || '').toLowerCase();
        return lastName.includes(query) || firstName.includes(query) || fatherName.includes(query) || city.includes(query);
      });
    },
  },

  methods: {

    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },

    getUsersForModerator() {
      Psds.getUsersForModerator().then((usersList) => {
        if (usersList != null) this.usersList = usersList;
      });
    },

    deleteUser(index) {
      const userId = this.usersList[index].id;
      Psds.deleteUser(userId)
          .then(() => {
            return this.getUsersForModerator();
          })
          .then(() => {
            console.log('Удаление пользователя с id:', userId);
          })
          .catch((error) => {
            console.error('Ошибка при удалении пользователя', error);
          });
    },
  }
};
</script>

<style scoped>
input.form-control {
  width: 100%;
}

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