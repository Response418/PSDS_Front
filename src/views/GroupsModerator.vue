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
      <button @click="$router.push('/moderator/groups/group')" class="btn btn-success mt-3">Добавить новую группу</button>
    </div>
  </div>
</template>

<script>
import Psds from "@/services/Psds.js";
import HeaderModerator from "@/components/HeaderModerator.vue";

export default {
  name: "GroupsModerator",
  components: {HeaderModerator},
  data() {
    return {
      groupList: [],
      ModeViewAuthForm: 'Редактировать',
    };
  },

  created() {
    this.getListGroups();
  },


  methods: {
    getListGroups() {
      Psds.getListGroups()
          .then((groupList) => {
            if (groupList != null) {
              this.groupList = groupList.map(group => ({
                ...group,
                editing: false,
                updatedName: group.name,
                updatedDescription: group.description,
              }));
            }
          })
          .catch((error) => {
            console.error("Ошибка при получении данных с сервера", error);
          });
    },

    EditGroup(index) {
      const group = this.groupList[index];
      Psds.editGroupModerator(group.id, group.updatedName, group.updatedDescription)
          .then(() => {
            console.log('Успешное редактирование группы');
          })
          .catch((error) => {
            console.error('Ошибка при редактировании группы', error);
          });
    },

    deleteGroup(groupId) {
      Psds.deleteGroup(groupId)
          .then(() => {
            return this.getListGroups();
          })
          .then(() => {
            console.log('Удаление группы с id:', groupId);
          })
          .catch((error) => {
            console.error('Ошибка при удалении группы', error);
          });
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