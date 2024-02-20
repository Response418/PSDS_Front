<template>

  <HeaderModerator />

  <div class="container mt-5">
    <h2>Добавление профиля специалиста</h2>
    <div class="mb-3">
      <label for="name" class="form-label">Название</label>
      <input type="text" class="form-control" id="name" v-model="title" >

    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Описание</label>
      <input type="text" class="form-control" id="description" v-model="description">
    </div>
    <button type="submit" class="btn mt-3"
            style="background-color: #6623cc; color: white;" @click="Profile">{{ ModeViewAuthForm }}</button>
  </div>
</template>

<script>

import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";
export default {
  name: "Profile",
  components: {HeaderModerator},
  data() {
    return {
      ModeViewAuthForm: 'Добавить',
      title: '',
      description: '',
    };
  },
  methods: {

    Profile() {
      const profile = {
        title: this.title,
        description: this.description
      };

      Psds.createSpecialistProfiles(profile.title, profile.description)
          .then(() => {
            console.log('Успешное добавление профиля специалиста');
            this.$router.push('/moderator/materials');
          })
          .catch((error) => {
            console.error('Ошибка при добавлении профиля специалиста', error);
          });
    },
  }
}
</script>


<style scoped>

</style>