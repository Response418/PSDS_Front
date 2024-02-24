<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4">Настройка учебных групп</h1>
      <p class="lead">Добавление, редактирование и удаление учебных групп.</p>
      <div>
        <button @click="$router.push('/moderator/groups/group')" class="btn mt-3 my-custom-button">Добавление учебной группы</button>
      </div>
    </section>

    <div class="container mt-3 rounded" style="background-color: #8145e0; color: white;">
      <div class="d-flex justify-content-end mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Поиск учебной группы">
      </div>
    <div class="row mt-3">
      <div v-for="(group, index) in filteredGroups" :key="index" class="mb-4"
           @click="$router.push(`/moderator/groups/${group.id}`)">
          <div class="card custom-card" @mouseover="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="text-container">
                <h4 class="card-title mb-2">{{ group.name }}</h4>
                <p class="card-text">{{ group.description }}</p>
              </div>
              <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeGroup(index, $event)"></span>
            </div>
          </div>
        </div>
      </div>
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
      isDeleteIconVisible: [],
      searchQuery: '',
    };
  },

  created() {
    this.getListGroups();
  },

  computed: {
    filteredGroups: function () {
      const query = this.searchQuery.toLowerCase();
      return this.groupList.filter((group) => {
        const name = (group.name || '').toLowerCase(); // добавляем проверку
        const description = (group.description || '').toLowerCase(); // добавляем проверку
        return name.includes(query) || description.includes(query);
      });
    },
  },


  methods: {

    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },

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

    removeGroup(index) {
      event.stopPropagation();
      const groupId = this.groupList[index].id;
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

.my-custom-button {
  background-color: #6623cc;
  color: white;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738;
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

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.custom-card:hover {
  transform: scale(1.02);
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


.delete-icon {
  cursor: pointer;
  font-size: 35px;
  color: rgb(72, 3, 138);
  text-shadow: rgb(231, 107, 69) 0px 0px 0px;
  opacity: 1;
  -webkit-text-stroke-width: 0px;
  transition: color 0.3s ease;
}

.delete-icon:hover {
  color: #ee6738;
}
</style>