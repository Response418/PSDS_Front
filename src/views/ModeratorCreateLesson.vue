<template>

  <HeaderModerator />

  <div class="container-fluid mt-3">
    <div class="text-center">
      <h2>Добавление урока</h2>
    </div>
    <div class="row">
      <div class="col-md-12 mx-auto">
        <div class="card">
          <div class="card-body">
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
      </div>
    </div>

    <div class="text-center mt-4">
      <h2>Добавление необходимых материалов для урока</h2>
    </div>
    <div class="row mt-2">
      <div class="col-md-12 mx-auto">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <div v-if="materialList.length > 0" class="row mt-4">
                <div class="col-md-12 mx-auto">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="text-center">Добавленные материалы к уроку</h4>
                      <div class="row">
                        <div v-for="(material, index) in materialList" :key="index" class="col-md-4 mb-3">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">{{ material.title }}</h5>
                              <p class="card-text">{{ material.description }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button v-if="!isMaterialFormVisible" class="btn btn-primary mt-3" @click="toggleMaterialForm">Добавить материал</button>
            </div>

            <div v-if="isMaterialFormVisible" class="mt-3">
              <div class="mb-3">
                <input type="text" class="form-control" id="materialTitle" v-model="materialTitle" placeholder="Введите название материала">
              </div>
              <div class="mb-3">
                <input class="form-control" id="materialDescription" v-model="materialDescription" placeholder="Введите ссылку на материал"></input>
              </div>
              <div class="text-center">
                <button class="btn btn-success" @click="saveMaterial">Сохранить материал</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button type="submit" class="btn mt-3" style="background-color: #6623cc; color: white;" @click="Lesson">{{ ModeViewAuthForm }}</button>
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

</style>