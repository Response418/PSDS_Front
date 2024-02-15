<template>
  <div>
    <HeaderModerator />
    <div class="container mt-5">
      <div class="container mt-5 text-center">
        <h2 class="fw-bold mb-4">Настройка учебных групп</h2>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Описание</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(group, index) in groupList" :key="group.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <input v-model="group.updatedName" class="form-control" />
          </td>
          <td>
            <input v-model="group.updatedDescription" class="form-control" />
          </td>
          <td>
            <button class="btn btn-success btn-sm" @click="EditGroup(index)">{{ ModeViewAuthForm }}</button>
            <button @click="deleteGroup(group.id)" class="btn btn-danger btn-sm ms-2">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
      <button @click="$router.push('/api/groups')" class="btn btn-success mt-3">Добавить новую группу</button>
    </div>
  </div>
</template>

<script>
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  components: {HeaderModerator},
  data() {
    return {
      groupList: [],
      ModeViewAuthForm: 'Редактировать',
    };
  },

  async created() {
    await this.getListGroups();
  },

  methods: {
    async getListGroups() {
      try {
        const groupList = await Psds.getListGroups();
        this.groupList = groupList.map(group => ({ ...group, editing: false, updatedName: group.name, updatedDescription: group.description }));
      } catch (error) {
        console.error("Ошибка при получении данных с сервера", error);
      }
    },

    async EditGroup(index) {
      try {
        const group = this.groupList[index];
        await Psds.editGroupModerator(group.id, group.updatedName, group.updatedDescription);
        console.log('Успешное редактирование группы');
      } catch (error) {
        console.error('Ошибка при редактировании группы', error);
      }
    },

    async deleteGroup(groupId) {
      try {
        await Psds.deleteGroup(groupId);
        await this.getListGroups();
        console.log('Удаление группы с id:', groupId);
      } catch (error) {
        console.error('Ошибка при удалении группы', error);
      }
    },
  }
};
</script>

<style scoped>
input.form-control {
  width: 100%;
}

.max-width-100 {
  max-width: 20%;
}
</style>