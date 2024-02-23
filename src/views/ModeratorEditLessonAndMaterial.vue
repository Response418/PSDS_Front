<template>
  <div>
    <HeaderModerator />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h2 class="display-4">Редактирование урока и материалов</h2>
      <p class="lead">Редактирование урока, добавление, редактирование и удаление материалов.</p>
    </section>

    <div class="container mt-3" style="background-color: white; color: white;">
      <div class="row">
        <div class="col-md-12 mx-auto">
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <label for="title">Название урока:</label>
                <input type="text" class="form-control" id="title" v-model="lesson.title">
              </div>

              <div class="mb-3">
                <label for="description">Описание урока:</label>
                <textarea class="form-control" id="description" v-model="lesson.description"></textarea>
              </div>

              <div class="mb-3 dropdown">
                <label for="level">Уровень сложности:</label>
                <select class="form-control" id="level" v-model="lesson.level">
                  <option value="1">Базовый</option>
                  <option value="2">Средний</option>
                  <option value="3">Продвинутый</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12 mx-auto">
          <div class="card" style="background-color: #8145e0; color: white;">
            <div class="card-body">
              <div class="text-center">
                <h5>Материалы урока</h5>
              </div>


              <div class="cards">
                <div class="card material-card mt-3" v-for="(material, index) in materials" :key="index"
                     @mouseover="showDeleteIcon(index)"
                     @mouseleave="hideDeleteIcon(index)">
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="materialTitle">Описание материала:</label>
                      <input type="text" class="form-control" id="materialTitle" v-model="materialChanges[index].title" @input="handleMaterialChange(index, 'title', $event)">
                    </div>
                    <div class="mb-3">
                      <label for="materialDescription">Ссылка на материал:</label>
                      <input class="form-control" id="materialDescription" v-model="materialChanges[index].description" @input="handleMaterialChange(index, 'description', $event)" />
                    </div>
                    <span class="bi bi-trash delete-icon" v-if="isDeleteIconVisible[index]" @click="removeMaterial(index)"></span>
                  </div>
                </div>
              </div>


              <button v-if="!isMaterialFormVisible" class="btn btn-primary mt-3" @click="toggleMaterialForm">Добавить материал</button>

              <div v-if="isMaterialFormVisible" class="mt-3">
                <div class="mb-3">
                  <textarea type="text" class="form-control" id="materialTitle" v-model="materialTitle" placeholder="Введите описание материала"></textarea>
                </div>
                <div class="mb-3">
                  <input class="form-control" id="materialDescription" v-model="materialDescription" placeholder="Введите ссылку на материал">
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
        <button type="submit" class="btn mt-3" style="background-color: #6623cc; color: white;" @click="saveChanges">{{ ModeViewAuthForm }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderModerator from "@/components/HeaderModerator.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "ModeratorEditLessonAndMaterial",
  components: { HeaderModerator, AlertMessages },
  data() {
    return {
      ModeViewAuthForm: 'Сохранить изменения',
      lesson: {
        title: '',
        description: '',
        level: '',
      },
      theme: {},
      materials: [],
      isDeleteIconVisible: [],
      materialChanges: [],
      isMaterialFormVisible: false,
      materialList: [],
    };
  },


  created() {
    const lessonId = this.$route.params.lessonId;

    Psds.getLesson(lessonId).then((lesson) => {
      if (lesson != null) {
        this.lesson = lesson;
      }
    });

    Psds.getThemeDetails(this.$route.params.themeId).then((theme) => {
      if (theme != null) this.theme = theme;
    });

    Psds.getMaterials(lessonId).then((materials) => {
      if (materials != null) {
        this.materials = materials;
        this.materialChanges = materials.map((material) => ({ ...material }));
      }
    });


  },

  methods: {

    saveMaterial() {
      if (this.materialTitle.trim() !== "") {
        const newMaterial = {
          title: this.materialTitle,
          description: this.materialDescription,
        };
        this.materialList.push(newMaterial);

        this.materialTitle = "";
        this.materialDescription = "";

        const themeId = this.theme.id;

        const lessonDTO = { id: this.lesson.id, ...this.lesson };
        const materialDTO = this.materialList.map(material => ({
          title: material.title,
          description: material.description
        }));

        Psds.addLessonAndMaterialForTheme(themeId, lessonDTO, materialDTO)
            .then(() => {
              console.log('Успешное добавление материала');
              this.materialList = [];
            })
            .catch((error) => {
              console.error('Ошибка при добавлении материала', error);
            });
        this.isMaterialFormVisible = false;
        this.$router.go(0);
      } else {
        alert("Введите название материала");
      }
    },

    toggleMaterialForm() {
      this.isMaterialFormVisible = !this.isMaterialFormVisible;
    },


    saveChanges() {
      const themeId = this.theme.id;

      const lessonDTO = { id: this.lesson.id, ...this.lesson };

      const materialDTO = this.materialChanges.map((material, index) => ({
        ...material,
        id: material.id,
      }));

      console.log('Изменения для урока:', lessonDTO);
      console.log('Изменения для материалов:', materialDTO);


      Psds.addLessonAndMaterialForTheme(themeId, lessonDTO, materialDTO)
          .then(() => {
            console.log('Успешное добавление урока и материалов');
            this.$router.go(-1);
          })
          .catch((error) => {
            console.error('Ошибка при добавлении урока и материалов', error);
          });
    },

    handleMaterialChange(index, field, event) {
      this.materialChanges = this.materialChanges.map((material, i) => {
        if (i === index) {
          return {
            ...material,
            [field]: event.target.value,
          };
        }
        return material;
      });
    },


    showDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: true });
    },
    hideDeleteIcon(index) {
      this.isDeleteIconVisible = Object.assign([], this.isDeleteIconVisible, { [index]: false });
    },


    removeMaterial(index) {
      const materialId = this.materials[index].id;
      Psds.deleteMaterial(materialId)
          .then(() => {
            console.log('Удаление материала с id:', materialId);
            this.$router.go(0);
          })
          .catch((error) => {
            console.error('Ошибка при удалении урока', error);
          });
    },

  }
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
  transform: scale(1.05);
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
  background-color: #6623cc;
  color: white;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738;
}

.btn-primary {
  background-color: #a281d2;
  border-color: #a281d2;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ee6738;
  border-color: #ee6738;
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
  transition: color 0.3s ease;
}

.delete-icon:hover {
  color: #ee6738;
}


</style>


