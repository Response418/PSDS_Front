<template>
  <HeaderModerator />
  <section id="header" class="jumbotron text-center mt-4 mb-4">
    <h1 class="display-4">ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ В ГРУППУ</h1>
    <p class="lead">Добавление пользователя в группу.</p>
  </section>
  <div class="container mt-5">

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="groupSelect" class="form-label">Выберите группы:</label>
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

      <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
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

        console.log('Добавлена роль в группе', response);
      } catch (error) {
        console.error('Ошибка при добавлении роли в группу', error);
      }
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

</style>