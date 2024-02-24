<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h2 class="display-4">Добавление урока</h2>
    </section>

    <div v-if="!isMaterialFormVisible" class="container mt-3 rounded" style="background-color: #faf9f9; color: white;">
      <div class="container mt-1 rounded" style="background-color: white; color: black;">
        <div class="mb-3">
          <input type="text" class="form-control" id="title" v-model="title" placeholder="Введите название урока">
        </div>

        <div class="mb-3">
          <textarea class="form-control" id="description" v-model="description" placeholder="Введите описание урока"></textarea>
        </div>

        <div class="mb-3 dropdown">
          <select class="form-control" id="level" v-model="level">
            <option value="" disabled selected hidden>Выберите уровень сложности</option>
            <option value="1">Базовый</option>
            <option value="2">Средний</option>
            <option value="3">Продвинутый</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container mt-3 rounded" style="background-color: #8145e0; color: black;">
    <div class="row mt-2">
      <div class="col-md-12 mx-auto">
          <h4 v-if="!isMaterialFormVisible" class="text-white mt-2">Добавленные материалы к уроку:</h4>
          <div class="card-body">
            <div class="">
              <div v-if="materialList.length > 0 && !isMaterialFormVisible" class="row mt-0">

                      <div class="card custom-card mt-2" v-for="(material, index) in materialList" :key="index">
                        <div class="card-body">
                          <h5 class="card-title">{{ material.title }}</h5>
                          <p class="card-text">{{ material.title }}</p>
                        </div>
                      </div>
              </div>

              <div class="text-center">
              <button v-if="!isMaterialFormVisible" class="btn btn-primary1 mt-3" @click="toggleMaterialForm">Добавить материал</button>
              </div>
            </div>

            <div v-if="isMaterialFormVisible" class="mt-3">
              <h3 class="text-white mb-4">Добавьте материал к уроку:</h3>
              <div class="mb-3">
                <textarea type="text" class="form-control" id="materialTitle" v-model="materialTitle" placeholder="Введите описание материала"></textarea>
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="materialDescription" v-model="materialDescription" placeholder="Введите ссылку на материал"></textarea>
              </div>
              <div class="text-center">
                <button class="btn btn-primary1" @click="saveMaterial">Сохранить материал</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button v-if="!isMaterialFormVisible" type="submit" class="btn btn-primary mt-3" @click="Lesson">{{ ModeViewAuthForm }}</button>
    </div>
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
      ModeViewAuthForm: 'Сохранить урок',
      title: '',
      description: '',
      level: '',
      grade: 0,
      theme: {},
      isMaterialFormVisible: false,
      materialTitle: "",
      materialDescription: "",
      materialList: [],
    };
  },


  created() {
    Psds.getThemeDetails(this.$route.params.themeId).then((theme) => {
      if (theme != null) this.theme = theme;
    });
  },

  methods: {

    toggleMaterialForm() {
      this.isMaterialFormVisible = !this.isMaterialFormVisible;
    },

    saveMaterial() {
      if (this.materialTitle.trim() !== "") {
        const newMaterial = {
          title: this.materialTitle,
          description: this.materialDescription,
        };
        this.materialList.push(newMaterial);

        this.materialTitle = "";
        this.materialDescription = "";

        this.isMaterialFormVisible = false;
      } else {
        alert("Введите название материала");
      }
    },

    Lesson() {
      const themeId = this.theme.id;
      const lessonDTO = {
        title: this.title,
        description: this.description,
        level: parseInt(this.level),
      };
      const materialDTO = this.materialList.map(material => ({
        title: material.title,
        description: material.description
      }));

      Psds.addLessonAndMaterialForTheme(themeId, lessonDTO, materialDTO)
          .then(() => {
            console.log('Успешное добавление урока и материалов');
            this.materialList = [];
            this.$router.go(-1);
          })
          .catch((error) => {
            console.error('Ошибка при добавлении урока и материалов', error);
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
  transform: scale(1.00);
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

.my-custom-button {
  background-color: #faf9f9;
  color: black;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #6c21dc;
  border-color: #a281d2;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ee6738;
  border-color: #ee6738;
}

.btn-primary1 {
  background-color: #faf9f9;
  border-color: #a281d2;
  color: black;
  transition: background-color 0.3s ease;
}

.btn-primary1:hover {
  background-color: #ee6738;
  border-color: #ee6738;
  color: white;
}

.small-text {
  font-size: 0.85rem;
  opacity: 0.5;
}

.delete-icon {
  cursor: pointer;
  font-size: 35px;
  color: rgb(72, 3, 138);
  text-shadow: rgb(231, 107, 69) 0px 0px 0px;
  opacity: 1;
  -webkit-text-stroke-width: 0px;
  transition: color 0.3s ease; /* добавляем анимацию перехода цвета */
}

.delete-icon:hover {
  color: #ee6738; /* цвет при наведении */
}
</style>