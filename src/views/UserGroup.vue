<template>

  <div>
    <HeaderUser />
    <div class="container mt-3 rounded" style="background-color: #6623cc; color: white;">
      <div v-if="groupList.length === 0">
        <h2 class="mb-3" > Для Вас нет учебных групп (дождитесь добавления в учебную группу) </h2>
      </div>
      <div v-else >
        <h1 class="mb-3" > Учебные группы </h1>
        <AlertMessages ref="AddAlertMess" />
        <div class="row">
          <div v-if="groupList.length === 0">
            <p>Для вас еще нет учебных групп.</p>
          </div>

          <div v-for="(group, index) in groupList" :key="index" class="mb-4" @click="handleGroupClick(group.id)">
            <div class="card custom-card">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="card-title mb-3">{{ group.name }}</h4>
                  <p class="card-text">{{ group.description }}</p>
                  <ul>
                    <li v-for="(role, roleIndex) in group.userRoles" :key="roleIndex">
                      <span v-if="role === 'ROLE_STUDENT'">Студент</span>
                      <span v-else-if="role === 'ROLE_DIRECTOR'">Руководитель группы</span>
                      <span v-else-if="role === 'ROLE_MENTOR'">Наставник</span>
                      <span v-else>{{ role }}</span>
                    </li>
                  </ul>
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
import HeaderUser from "@/components/HeaderUser.vue";
import AlertMessages from "@/components/AlertMessages.vue";

export default {
  components: {AlertMessages, HeaderUser},
  data() {
    return {
      groupList: [],
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

    handleGroupClick(groupId) {
      Psds.selectGroup(groupId).then(() => {
        console.log('Выбрана группа с id:', groupId);
        this.$router.push('/');
      }).catch((error) => {
        console.error("Ошибка при выборе группы:", error);
      });
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