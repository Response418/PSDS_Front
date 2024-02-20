<template>
  <div>
    <HeaderModerator />
    <div class="container mt-5">
      <div class="container mt-5 text-center">
        <h2 class="fw-bold mb-4">Настройка пользователей</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Имя</th>
            <th scope="col">Отчество</th>
            <th scope="col">Город</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in usersModerList" :key="user.id">
            <th scope="row">{{ index + 1 }}</th>
            <td class="text-start">{{ user.lastName }}</td>
            <td class="text-start">{{ user.firstName }}</td>
            <td class="text-start">{{ user.fatherName }}</td>
            <td class="text-start">{{ user.city }}</td>
            <td>
              <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm ms-2">Удалить</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
<!--    <div>v-model="usersList.get(0).lastName" </div>-->
  </div>
</template>

<script>
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  components: {HeaderModerator},
  data() {
    return {
      usersModerList: [],
    };
  },

  created() {
    this.getUsersForModerator();
  },

  methods: {
    getUsersForModerator() {
      Psds.getUsersForModerator().then((usersModerList) => {
        if (usersModerList != null) this.usersModerList = usersModerList;
      });
    },

    deleteUser(userId) {
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

.max-width-100 {
  max-width: 20%;
}
</style>