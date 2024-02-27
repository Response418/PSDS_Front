<template>
  <div>
    <HeaderGroup />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h2 class="display-4">Выбор учебной группы</h2>
      <p class="lead">Выберите группы из списка.</p>
    </section>
    <div class="container mt-3 rounded" style="background-color: #6623cc; color: white;">
      <div v-if="groupList.length === 0">
        <h2 class="mb-3" > Для Вас нет учебных групп (дождитесь добавления в учебную группу) </h2>
      </div>
      <div v-else >
        <AlertMessages ref="AddAlertMess" />
        <div class="row">
          <div v-if="groupList.length === 0">
            <p>Для вас еще нет учебных групп.</p>
          </div>
          <div v-for="(group, index) in groupList" :key="index" class="mb-4" @click="handleGroupClick(group.id, group.userRoles)">
            <div class="card custom-card">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="card-title mb-2">{{ group.name }}</h4>
                  <p class="card-text">{{ group.description }}</p>

                  <div class="d-flex">
                    <p class="card-text" style="font-weight: 800;">Ваши Роли в группе:&nbsp;</p>
                    <div v-for="(role, roleIndex) in group.userRoles" :key="roleIndex" class="role-card">
                      <div class="difficulty-card text-center rounded wider" :style="getRoleStyle(role)">
                        <p class="mb-0 font-weight-bold" style="font-weight: 750;"> &nbsp;{{ getRole(role) }}&nbsp;</p>
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
      userRole: '',
    };
  },


  created() {
    this.loadGroupList();
  },


  methods: {
    loadGroupList() {
      Psds.getGroupForUser().then((groupList) => {
        if (groupList != null) this.groupList = groupList;
      });
    },

    handleGroupClick(groupId, roles) {
      Psds.selectGroup(groupId).then(() => {
        console.log('Выбрана группа с id:', groupId);
        console.log(groupId);
        console.log(roles);
        localStorage.setItem('role', roles)
        // localStorage.setItem('userId', data.userId)
        localStorage.setItem('groupId', groupId)
        this.$router.push('/');
      }).catch((error) => {
        console.error("Ошибка при выборе группы:", error);
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

</style>