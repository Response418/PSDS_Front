<template>
  <div class="card-deck">
    <div v-for="(profile, index) in specialistProfiles" :key="index" class="card">
      <div class="card-body">
        <h3 class="card-title">{{ profile.title }}</h3>
        <p class="card-text">{{ profile.description }}</p>
        <button @click="$router.push(`${linkId}/profile/${profile.id}`)" class="btn btn-primary">Перейти к профилю</button>
      </div>
    </div>
  </div>
</template>


<script>
import HeaderUser from "@/components/HeaderUser.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";
import router from "@/router/index.js";

export default {
  name: "CardStudentProfile",
  methods: {
    router() {
      return router
    }
  },
  components: {HeaderUser, AlertMessages},
  props: {
    studentId: 0,
  },
  data() {
    return {
      specialistProfiles: [],
      linkId: 0,
    }
  },
  created() {
    const userId = this.studentId;
    const groupId = localStorage.getItem("groupId");
    Psds.getLink(userId, groupId).then(link => {
      this.linkId = link.id;
      Psds.getPlan(link.id).then(plan => {
        this.specialistProfiles = plan.specialistProfiles;
      })
    })
  },
};
</script>

<style scoped>

.card{
  margin: 1rem 0;
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

</style>


