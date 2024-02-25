<template>

  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h2 class="display-4">Учебные группы пользователя</h2>
      <p class="lead">Удаление пользователя из группы.</p>
    </section>

    <div class="container mt-3 rounded" style="background-color: #6623cc; color: white;">
      <div v-if="groupList.length === 0">
        <h2 class="mb-3" >У данного пользователя нет учебных групп </h2>
      </div>
      <div v-else >
        <AlertMessages ref="AddAlertMess" />
        <div class="row">
          <div v-for="(group, index) in groupList" :key="index" class="mb-4">
            <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="card-title mb-2">{{ group.name }}</h4>
                  <p class="card-text">{{ group.description }}</p>

                  <div class="d-flex">
                    <p class="card-text" style="font-weight: 800;">Роли пользователя в группе:&nbsp;</p>
                    <div v-for="(role, roleIndex) in group.userRoles" :key="roleIndex" class="role-card">
                      <div class="difficulty-card text-center rounded wider" :style="getRoleStyle(role)">
                        <p class="mb-0 font-weight-bold" style="font-weight: 750;"> &nbsp;{{ getRole(role) }}&nbsp;</p>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="deleteUser(index)"></span>
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
import HeaderGroup from "@/components/HeaderGroup.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  components: {HeaderModerator, AlertMessages, HeaderGroup},
  data() {
    return {
      groupList: [],
      isDeleteIconVisible: [],
    };
  },

  created() {
    this.loadGroupList();
  },



  methods: {

    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },

    deleteUser(index) {
      const userId = this.$route.params.userId;
      const groupId = this.groupList[index].id;
      console.log(userId, groupId)
      Psds.deleteUsersForGroup(groupId, userId)
          .then(() => {
            console.log('Удаление пользователя с id:', userId);
            this.$router.go(0);
          })
          .catch((error) => {
            console.error('Ошибка при удалении пользователя', error);
          });
    },


    loadGroupList() {
      const userId = this.$route.params.userId;
      Psds.getGroupUserForModerator(userId).then((groupList) => {
        if (groupList != null) this.groupList = groupList;
      });
    },

    getRole(role) {
      switch (role) {
        case 'ROLE_STUDENT':
          return 'Студент';
        case 'ROLE_DIRECTOR':
          return 'Руководитель группы';
        case 'ROLE_MENTOR':
          return 'Наставник';
        default:
          return role;
      }
    },

    getRoleStyle(role) {
      switch (role) {
        case 'ROLE_STUDENT':
          return { backgroundColor: '#bd6ac9', color: 'white' };
        case 'ROLE_DIRECTOR':
          return { backgroundColor: '#551bab', color: 'white' };
        case 'ROLE_MENTOR':
          return { backgroundColor: '#7c13bb', color: 'white' };
        default:
          return { backgroundColor: 'lightgray', color: 'black' };
      }
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


.role-card {
  margin-right: 6px;
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