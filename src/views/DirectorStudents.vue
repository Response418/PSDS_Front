<template>

  <div>
    <HeaderUser />

    <div v-if="showGroupUsers">
      <section id="header" class="jumbotron text-center mt-4 mb-4">
        <h1 class="display-4">Пользователи в группе</h1>
        <p class="lead">Просмотр и удаление пользователей, состоящих в группе.</p>
        <div>
          <button @click="toggleView" class="btn btn-primary mt-3">Добавить студента в группу</button>
        </div>
      </section>
       <div class="container mt-3 rounded" style="background-color: #8145e0; color: black;">


      <div class="d-flex justify-content-end mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск пользователя...">
      </div>
      <div class="row mt-3">
        <div v-for="(item, index) in filteredUsers" :key="index" class="mb-4"
             @click="$router.push(`/group-leader/students/${item.users.id}/profiles`)">
          <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="text-container">
                <h5 class="card-title mb-0">{{ item.users.lastName }} {{ item.users.firstName }} {{ item.users.fatherName }}</h5>
              </div>
              <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="deleteUser(index, $event)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div v-else>
      <section id="header" class="jumbotron text-center mt-4 mb-4">
        <h1 class="display-4">Добавление студента в группу</h1>
      </section>
      <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
        <div class="d-flex justify-content-end mb-3">
          <input v-model="searchUser" type="text" class="form-control" placeholder="Поиск студента...">
        </div>
        <div class="row mt-3">
          <div v-for="(user, index) in filteredUser" :key="index" class="mb-4">
            <div class="card custom-card" @mouseover="showAddUserIcon(index)" @mouseleave="hideAddUserIcon(index)">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="text-container">
                  <h5 class="card-title mb-2">{{ user.lastName }} {{ user.firstName }} {{ user.fatherName }}</h5>
                  <p class="card-text">Город: {{ user.city }}</p>
                </div>
                <span class="bi bi-person-plus add-user-icon" v-if="isAddUserIconVisible[index]" @click="addUser(index)"></span><span class="bi bi-person-plus add-user-icon" v-if="isDeleteIconVisible[index]" @click="deleteUser(index)"></span>
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
import HeaderUser from "@/components/HeaderUser.vue";
import http from "@/http-common.js";

export default {
  components: {HeaderUser, HeaderModerator},
  data() {
    return {
      users: [],
      usersList: [],
      role: [],
      isDeleteIconVisible: [],
      isAddUserIconVisible: [],
      searchQuery: '',
      showGroupUsers: true,
      searchUser: '',
    };
  },

  created() {
    const groupId = localStorage.getItem('groupId');
    Psds.getUsersForGroup(groupId).then((users) => {
      console.log(users)
      if (users != null) {
        this.users = users;
      }
    });


    Psds.getUsersForModerator().then((usersList) => {
      if (usersList != null) this.usersList = usersList;
    });

    Psds.getRoleUser().then((role) => {
      if (role != null) this.role = role;
    });
  },


  computed: {
    filteredUsers: function () {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter((item) => {
        const user = item.users || {};
        const lastName = (user.lastName || '').toLowerCase();
        const firstName = (user.firstName || '').toLowerCase();
        const fatherName = (user.fatherName || '').toLowerCase();
        return lastName.includes(query) || firstName.includes(query) || fatherName.includes(query);
      });
    },

    filteredUser: function () {
      const query = this.searchUser.toLowerCase();
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

    showAddUserIcon(index) {
      this.isAddUserIconVisible = Object.assign([], this.isAddUserIconVisible, { [index]: true });
    },
    hideAddUserIcon(index) {
      this.isAddUserIconVisible = Object.assign([], this.isAddUserIconVisible, { [index]: false });
    },
    addUser(index) {
      const roleId = this.role.id;
      const groupId = parseInt(localStorage.getItem('groupId'), 10);
      const userId =  this.usersList[index].id;
      console.log(roleId, groupId, userId);

      Psds.createRoleInGroup(userId, roleId, groupId)
          .then(() => {
            console.log('Успешное добавление студента в группу');
            this.$router.go(0);
          })
          .catch((error) => {
            console.error('Ошибка при добавлении студента в группу', error);
          });
    },


    toggleView() {
      this.showGroupUsers = !this.showGroupUsers;
      if (!this.showGroupUsers) {
      }
    },

    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },


    deleteUser(index, event) {
      event.stopPropagation();
      const userId = this.users[index].users.id;
      const groupId = parseInt(localStorage.getItem('groupId'), 10);
      Psds.deleteUsersForGroup(groupId, userId)
          .then(() => {
            console.log('Удаление пользователя с id:', userId);
            this.$router.go(0);
          })
          .catch((error) => {
            console.error('Ошибка при удалении пользователя', error);
          });
    },
  }
};
</script>

<style scoped>

.btn-primary {
  background-color: #854dd2;
  border-color: #a281d2;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ee6738;
  border-color: #ee6738;
}

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
  font-size: 1.2rem;
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

.add-user-icon {
  cursor: pointer;
  font-size: 35px;
  color: rgb(72, 3, 138);
  text-shadow: rgb(231, 107, 69) 0px 0px 0px;
  opacity: 1;
  -webkit-text-stroke-width: 0px;
  transition: color 0.3s ease;
}

.add-user-icon:hover {
  color: #ee6738;
}

</style>