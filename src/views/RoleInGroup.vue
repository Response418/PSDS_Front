<template>
  <div class="container mt-5">
    <h2>Select Roles In Group</h2>

    <form @submit.prevent="submitForm">

<!--      &lt;!&ndash; Выбор группы &ndash;&gt;-->
<!--      <div class="mb-3">-->
<!--        <label for="groupSelect" class="form-label">Select Group:</label>-->
<!--        <select v-model="selectedGroup" id="groupSelect" class="form-select">-->
<!--          <option v-for="group in groupList" :key="group.id" :value="group.id">{{ group.name }}</option>-->
<!--        </select>-->
<!--      </div>-->

<!--      &lt;!&ndash; Выбор роли &ndash;&gt;-->
<!--      <div class="mb-3">-->
<!--        <label for="roleSelect" class="form-label">Select Role:</label>-->
<!--        <select v-model="selectedRole" id="roleSelect" class="form-select">-->
<!--          <option v-for="role in roleList" :key="role.id" :value="role.id">{{ role.name }}</option>-->
<!--        </select>-->
<!--      </div>-->
      <div class="mb-3">
        <label for="groupSelect" class="form-label">Select Group:</label>
        <div class="dropdown">
          <input v-model="searchGroupQuery" type="text" id="groupSelect" class="form-control" placeholder="Search..." @click="toggleGroupDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" role="button">
          <div class="dropdown-menu" aria-labelledby="groupSelect" :class="{ show: isGroupDropdownOpen }">
            <a v-for="group in filteredGroupList" :key="group.id" class="dropdown-item" @click="selectGroup(group)">
              {{ group.name }}
            </a>
          </div>
        </div>
      </div>

      <!-- Выбор роли с помощью поиска -->
      <div class="mb-3">
        <label for="roleSelect" class="form-label">Select Role:</label>
        <div class="dropdown">
          <input v-model="searchRoleQuery" type="text" id="roleSelect" class="form-control" placeholder="Search..." @click="toggleRoleDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" role="button">
          <div class="dropdown-menu" aria-labelledby="roleSelect" :class="{ show: isRoleDropdownOpen }">
            <a v-for="role in filteredRoleList" :key="role.id" class="dropdown-item" @click="selectRole(role)">
              {{ role.name }}
            </a>
          </div>
        </div>
      </div>

      <!-- Выбор пользователя с помощью поиска -->
      <div class="mb-3">
        <label for="userSelect" class="form-label">Select User:</label>
        <div class="dropdown">
          <input v-model="searchQuery" type="text" id="userSelect" class="form-control" placeholder="Search..." @click="toggleDropdown" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" role="button">
          <div class="dropdown-menu" aria-labelledby="userSelect" :class="{ show: isDropdownOpen }">
            <a v-for="user in filteredUserList" :key="user.id" class="dropdown-item" @click="selectUser(user)">
              {{ user.lastName + " " + user.firstName + " " + user.fatherName }}
            </a>
          </div>
        </div>
      </div>

      <!-- Кнопка для отправки формы -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>

import Psds from "@/services/Psds.js";
export default {
  name: "RolesInGroup",
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