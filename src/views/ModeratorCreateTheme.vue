<template>

  <HeaderModerator />

  <div class="container mt-5">
    <h2>Добавление темы</h2>
    <div class="mb-3">
      <label for="title" class="form-label">Название</label>
      <input type="text" class="form-control" id="title" v-model="title" >

    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Описание</label>
      <input type="text" class="form-control" id="description" v-model="description">
    </div>
    <button type="submit" class="btn mt-3"
            style="background-color: #6623cc; color: white;" @click="Theme">{{ ModeViewAuthForm }}</button>
  </div>
</template>

<script>

import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";
export default {
  name: "ModeratorCreateTheme",
  components: {HeaderModerator},
  data() {
    return {
      ModeViewAuthForm: 'Добавить',
      title: '',
      description: '',
    };
  },
  methods: {

    Theme() {
      const theme = {
        title: this.title,
        description: this.description
      };

      Psds.createTheme(theme.title, theme.description)
          .then(() => {
            console.log('Успешное добавление профиля специалиста');
            this.$router.go(-1);
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