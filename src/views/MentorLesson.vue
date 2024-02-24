<template>
  <div>
    <HeaderUser />

    <div class="container">
      <div class="row col-md-12">
        <div class="col-md-9">
          <h1>{{ lesson.title }}</h1>
          <p>{{ lesson.description }}</p>

          <h5>Материалы урока</h5>
          <div class="cards">
            <div
                class="card material-card"
                v-for="(material, index) in materials"
                :key="index"
            >
              <a :href="material.description">
                <div class="card-body">
                  <p class="card-text">{{ material.title }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card mt-3">
            <div class="card-body">
              <div class="difficulty-card text-center rounded wider mb-2"  :style="getDifficultyStyle(lesson.level)">
                <p class="mb-0 font-weight-bold" style="font-weight: 700;">Уровень: {{ getLevelName(lesson.level) }}</p>
              </div>
<!--              <h5 class="card-title">Сложность урока: {{ lesson.level }}</h5>-->

              <div class="form-group">
                <label class="form-group" for="inputGrade">Ваша оценка:</label>
                <input
                    type="number"
                    class="form-control"
                    id="inputGrade"
                    v-model="userGrade"
                />
              </div>

              <button class="btn btn-primary" @click="rateLesson">Оценить</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AlertMessages ref="AddAlertMess" />
  </div>
</template>

<script>
import HeaderUser from "@/components/HeaderUser.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "MentorLesson",
  components: { HeaderUser, AlertMessages },
  data() {
    return {
      lesson: {},
      materials: [],
      userGrade: null,
    };
  },
  created() {
    const lessonId = this.$route.params.lessonId;
    const linkId = this.$route.params.linkId;

    Psds.getLesson(lessonId).then((lesson) => {
      if (lesson != null) {
        this.lesson = lesson;
      }
    });

    Psds.getGrade(lessonId, linkId).then((grade) => {
      if (grade) this.userGrade = grade.value;
    });

    Psds.getMaterials(lessonId).then((materials) => {
      if (materials != null) {
        this.materials = materials;
      }
    });
  },
  methods: {
    rateLesson() {
      if (this.userGrade !== null) {
        const lessonId = this.$route.params.lessonId;
        const linkId = this.$route.params.linkId;
        Psds.saveGrade(linkId, lessonId, this.userGrade)
      }
    },

    getDifficultyStyle(level) {
      switch (level) {
        case 1:
          return { backgroundColor: '#17944f', color: 'white' };
        case 2:
          return { backgroundColor: '#ffdc4d', color: 'white' };
        case 3:
          return { backgroundColor: '#ee6738', color: 'white' };
        default:
          return { backgroundColor: 'lightgray', color: 'black' };
      }
    },

    getLevelName(level) {
      switch (level) {
        case 1:
          return 'Базовый';
        case 2:
          return 'Средний';
        case 3:
          return 'Продвинутый';
        default:
          return 'Неизвестный';
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card-text {
  color: #495057;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.material-card {
  width: 70%;
  margin: 0.5rem 1rem;
}

.material-card:hover {
  transform: scale(1.02);
}

.cards {
  margin-top: 0.5rem;
}

a {
  text-decoration: none;
  color: inherit;
}

.btn-primary {
  background-color: #a281d2;
  border-color: #a281d2;
  transition: background-color 0.3s ease;
  margin: 1rem;
}

.btn-primary:hover {
  background-color: #ee6738;
  border-color: #ee6738;
}
</style>



