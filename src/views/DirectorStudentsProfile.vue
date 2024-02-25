<template>
  <div>
    <HeaderUser />

    <div class="container mt-3">

      <h1 class="mb-3">Учебный план студента</h1>
      <div v-for="profile in specialistProfiles" :key="profile.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ profile.title }}</h5>
          <p class="card-text">{{ profile.description }}</p>
          <router-link :to="'/group-leader/students/' + this.$route.params.studentId + '/profiles/' + profile.id" class="btn btn-primary mt-2">
            Перейти к профилю
          </router-link>
        </div>
      </div>
    </div>

    <AlertMessages ref="AddAlertMess" />
  </div>
</template>

<script>
import HeaderUser from "@/components/HeaderUser.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "Plan",
  components: { HeaderUser, AlertMessages },
  data() {
    return {
      specialistProfiles: [],
    };
  },
  created() {
    const userId = this.$route.params.studentId;
    const groupId = localStorage.getItem("groupId");
    Psds.getLink(userId, groupId).then(link => {
      Psds.getPlan(link.id).then(plan => {
        this.specialistProfiles = plan.specialistProfiles;
      })
    })
  },
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
</style>