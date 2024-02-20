<template>
  <div>
    <HeaderUser />
    <h2>Студенты:</h2>
    <ul>
      <li v-for="student in data.studentList" :key="student.id">
        {{ student.lastName }} {{ student.firstName }} {{ student.fatherName }}
      </li>
    </ul>

    <h2>Наставники:</h2>
    <ul>
      <li v-for="mentor in data.mentorList" :key="mentor.id">
        {{ mentor.lastName }} {{ mentor.firstName }} {{ mentor.fatherName }}
      </li>
    </ul>

    <h2>Отношения:</h2>
    <ul>
      <li v-for="relation in data.listRelation" :key="relation.id">
        <p v-if="relation.student">
          Студент: {{ relation.student.lastName }} {{ relation.student.firstName }} {{ relation.student.fatherName }}
        </p>
        <p v-if="relation.mentor">
          Наставник: {{ relation.mentor.lastName }} {{ relation.mentor.firstName }} {{ relation.mentor.fatherName }}
        </p>
        <p v-else>
          Наставник не назначен
        </p>
        <p>Группа: {{ relation.group.name }}</p>
      </li>
    </ul>
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
      data: {
        listRelation: [],
        groupId: '',
        studentList: [],
        mentorList: [],
      },
    };
  },

  created() {
    Psds.getListRelationUserDTO().then((data) => {
      if (data != null) this.data = data;
    });
  },


  methods: {

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