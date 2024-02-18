<template>
  <div>
    <HeaderUser />

    <div class="container mt-3">
      <h1 class="mb-3">Учебный план студентов</h1>

      <div v-for="student in students" :key="student.id">
        <h3>{{ student.student.lastName }} {{ student.student.firstName }} {{student.student.fatherName}}</h3>
        <CardStudentProfile :student-id="student.student.id"/>
        <hr />
      </div>
    </div>

    <AlertMessages ref="AddAlertMess" />
  </div>
</template>


<script>
import HeaderUser from "@/components/HeaderUser.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";
import CardStudentProfile from "@/components/CardStudentProfile.vue";

export default {
  name: "MentorPlan",
  components: {CardStudentProfile, HeaderUser, AlertMessages},
  data() {
    return {
      students: [],
    };
  },
  created() {
    Psds.getStudentsByMentor().then(students => {
      this.students = students;
    });
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


