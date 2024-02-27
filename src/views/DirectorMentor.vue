<template>
  <div>
    <HeaderUser />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">Выбор наставника для студента</h1>
    </section>

    <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
      <div class="d-flex justify-content-end mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск студента">
      </div>
      <div class="row mt-3">
        <div v-for="(relation, index) in filteredStudent" :key="index" class="mb-4">
          <div class="card custom-card">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="text-container">
                <h5 class="lead mb-2">Студент: {{ relation.student.lastName }} {{ relation.student.firstName }} {{ relation.student.fatherName }}</h5>
                <div class="d-flex align-items-center">
                  <h5 class="lead mb-2 mr-4">Наставник:&nbsp; </h5>
                  <div v-if="relation.master" class="mr-4">
                    <h5 class="lead mb-2"> {{ relation.master.lastName }} {{ relation.master.firstName }} {{ relation.master.fatherName }}</h5>
                  </div>
                  <div v-else>
                    <h5 class="lead mb-2"> наставник не выбран</h5>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between align-items-center">
                  <h5 class="lead mb-2 mr-4">Выберите наставника для изменения: &nbsp;&nbsp;</h5>
                  <div class="form-group">
                    <select id="mentorSelect" class="form-control" v-model="relation.selectedMentor" style="width: 300px;">
                      <option v-for="mentor in data.mentorList" :key="mentor.id" :value="mentor.id">
                        {{ mentor.lastName }} {{ mentor.firstName }} {{ mentor.fatherName }}
                      </option>
                    </select>
                  </div>
                  &nbsp;
                  <button @click="saveRelation(relation)"  class="btn btn-primary">Изменить</button>
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
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  components: {HeaderModerator, AlertMessages, HeaderUser},
  data() {
    return {
      data: {
        listRelation: [],
        groupId: '',
        studentList: [],
        mentorList: [],
      },

      temporarySelectedMentor: {},
      searchQuery: "",


    };
  },

  created() {
    const groupId = parseInt(localStorage.getItem('groupId'), 10);
    Psds.getListRelationUserDTO(groupId).then((data) => {
      if (data != null) this.data = data;
    });
  },

  computed: {
    filteredStudent: function () {
      const query = this.searchQuery.toLowerCase();
      return this.data.listRelation.filter(
          (relation) =>
              relation.student.lastName.toLowerCase().includes(query) ||
              relation.student.firstName.toLowerCase().includes(query) ||
              relation.student.fatherName.toLowerCase().includes(query)
      );
    },
  },


  methods: {
    saveRelation(relation) {
      const mentorId = relation.selectedMentor;
      const relationId = relation.id;

      Psds.editMentorForGroup(mentorId, relationId)
          .then(() => {
            console.log('Успешное изменение наставника для студента');
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
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
  transform: scale(1.02);
}

.row {
  flex-wrap: wrap;
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



</style>