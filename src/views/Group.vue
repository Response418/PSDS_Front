<template>
  <div class="container mt-5">
    <h2>Добавление группы</h2>
    <div class="mb-3">
      <label for="name" class="form-label">Название</label>
      <input type="text" class="form-control" id="name" v-model="name" >

    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Описание</label>
      <input type="text" class="form-control" id="description" v-model="description">
    </div>
    <button type="submit" class="btn btn-primary" @click="Group">{{ ModeViewAuthForm }}</button>
  </div>
</template>

<script>

import Psds from "@/services/Psds.js";
export default {
  name: "Group",
  data() {
    return {
      ModeViewAuthForm: 'Добавить',
      name: '',
      description: '',
    };
  },
  methods: {

    async Group() {
      const group = {
        name: this.name,
        description: this.description
      };

      console.log(group)

      try {
        await Psds.createGroup(this.name, this.description);
        this.$router.push('/api/groups/moderator');
      } catch (error) {
        console.error('Ошибка при добавлении группы', error);
      }
    },
  }
}
</script>


<style scoped>

</style>