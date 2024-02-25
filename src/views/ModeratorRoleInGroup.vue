<template>

  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">Добавление пользователя в группу</h1>
    </section>
    <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
      <div class="container mt-1 rounded" style="background-color: white; color: black;">

        <div v-if="successMessage" class="text-center alert alert-success mt-3" role="alert" style="background-color: #e55a30; color: white; font-weight: bold; font-size: 20px;">
          {{ successMessage }}
          <div class="text-center">
            <button @click="resetAndReload" type="submit" class="btn btn-primary1 mt-3">Продолжить добавление пользователей</button>
          </div>
        </div>


        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="groupSelect" class="form-label">Выберите группу:</label>
            <div class="dropdown">
              <input v-model="searchGroupQuery" type="text" id="groupSelect" class="form-control" placeholder="Поиск..."
                     @click="toggleGroupDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" role="button">
              <div class="dropdown-menu" aria-labelledby="groupSelect" :class="{ show: isGroupDropdownOpen }">
                <a v-for="group in filteredGroupList" :key="group.id" class="dropdown-item" @click="selectGroup(group)">
                  {{ group.name }}
                </a>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="roleSelect" class="form-label">Выберите Роль в группе:</label>
            <div class="dropdown">
              <input v-model="searchRoleQuery" type="text" id="roleSelect" class="form-control" placeholder="Поиск..."
                     @click="toggleRoleDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" role="button">
              <div class="dropdown-menu" aria-labelledby="roleSelect" :class="{ show: isRoleDropdownOpen }">
                <a v-for="role in filteredRoleList" :key="role.id" class="dropdown-item" @click="selectRole(role)">
                  {{ role.name }}
                </a>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="userSelect" class="form-label">Выберите пользователя:</label>
            <div class="dropdown">
              <input v-model="searchQuery" type="text" id="userSelect" class="form-control" placeholder="Поиск..."
                     @click="toggleDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" role="button">
              <div class="dropdown-menu" aria-labelledby="userSelect" :class="{ show: isDropdownOpen }">
                <a v-for="user in filteredUserList" :key="user.id" class="dropdown-item" @click="selectUser(user)">
                  {{ user.lastName + " " + user.firstName + " " + user.fatherName }}
                </a>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";
export default {
  name: "ModeratorRoleInGroup",
  components: {HeaderModerator},
  data() {
    return {
      userList: [],
      groupList: [],
      roleList: [],
      searchQuery: '',
      isDropdownOpen: false,
      selectedUser: null,
      selectedGroup: null,
      selectedRole: null,

      searchGroupQuery: '',
      isGroupDropdownOpen: false,

      searchRoleQuery: '',
      isRoleDropdownOpen: false,

      successMessage: null,

    };
  },

  computed: {
    filteredUserList() {
      return this.userList.filter(user =>
          (user.lastName + " " + user.firstName + " " + user.fatherName)
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
      );
    },

    filteredGroupList() {
      return this.groupList.filter(group =>
          group.name.toLowerCase().includes(this.searchGroupQuery.toLowerCase())
      );
    },

    filteredRoleList() {
      return this.roleList.filter(role =>
          role.name.toLowerCase().includes(this.searchRoleQuery.toLowerCase())
      );
    },

  },

  async created() {
    await this.getRolesInGroup();
  },

  methods: {
    async getRolesInGroup() {
      try {
        const { userList, groupList, roleList } = await Psds.getRolesInGroup();

        this.userList = userList;
        this.groupList = groupList;
        this.roleList = roleList;
      } catch (error) {
        console.error('Ошибка при получении данных с сервера', error);
      }
    },

    async submitForm() {
      try {
        if (!this.selectedUser || !this.selectedGroup || !this.selectedRole) {
          console.error('Не все значения выбраны');
          return;
        }

        const response = await Psds.createRoleInGroup(
            this.selectedUser.id,
            this.selectedRole.id,
            this.selectedGroup.id
        );

        if (response.message) {
          // Сообщение присутствует, вы можете получить его значение
          const message = response.message;
          console.log(`Получено сообщение: ${message}`);
          this.successMessage = message;
        }else {
          const userName = this.selectedUser ? this.selectedUser.lastName + ' ' + this.selectedUser.firstName + ' ' + this.selectedUser.fatherName : '';
          const groupName = this.selectedGroup ? this.selectedGroup.name : '';
          const userRole = this.selectedRole ? this.selectedRole.name : '';
          this.successMessage = `${userName} успешно добавлен в группу ${groupName} c ролью ${userRole}!`;
          console.log('Добавлена роль в группе', response);
        }

        this.selectedUser = null;
        this.selectedGroup = null;
        this.selectedRole = null;

      } catch (error) {
        console.error('Ошибка при добавлении роли в группу', error);
      }
    },

    resetAndReload() {
      this.selectedUser = null;
      this.selectedGroup = null;
      this.selectedRole = null;
      this.successMessage = null;
      window.location.reload();
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    toggleGroupDropdown() {
      this.isGroupDropdownOpen = !this.isGroupDropdownOpen;
    },

    toggleRoleDropdown() {
      this.isRoleDropdownOpen = !this.isRoleDropdownOpen;
    },

    selectUser(user) {
      this.selectedUser = user;
      this.searchQuery = `${user.lastName} ${user.firstName} ${user.fatherName}`;
      this.isDropdownOpen = false;
    },

    selectGroup(group) {
      this.selectedGroup = group;
      this.searchGroupQuery = group.name;
      this.isGroupDropdownOpen = false;
    },

    selectRole(role) {
      this.selectedRole = role;
      this.searchRoleQuery = role.name;
      this.isRoleDropdownOpen = false;
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

.btn-primary {
  background-color: #854dd2;
  border-color: #a281d2;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ee6738;
  border-color: #ee6738;
}


.btn-primary1 {
  background-color: white;
  border-color: #af2f06;
  transition: background-color 0.3s ease;
}

.btn-primary1:hover {
  background-color: #854dd2;
  border-color: #a281d2;
}
</style>