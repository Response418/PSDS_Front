<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">Добавление группы</h1>
    </section>
    <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
      <div class="container mt-1 rounded" style="background-color: white; color: black;">
        <div class="mb-3">
          <label for="name" class="form-label">Название группы</label>
          <input type="text" class="form-control" id="name" v-model="name" >
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Описание группы</label>
          <textarea type="text" class="form-control" id="description" v-model="description"></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="Group">{{ ModeViewAuthForm }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";
export default {
  name: "Group",
  components: {HeaderModerator},
  data() {
    return {
      ModeViewAuthForm: 'Добавить',
      name: '',
      description: '',
    };
  },
  methods: {

    Group() {
      const group = {
        name: this.name,
        description: this.description
      };

      Psds.createGroup(group.name, group.description)
          .then(() => {
            console.log('Успешное добавление группы');
            this.$router.push('/moderator/groups');
          })
          .catch((error) => {
            console.error('Ошибка при добавлении группы', error);
          });
    },
  }
}
</script>


<style scoped>
input.form-control {
  width: 100%;
}
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