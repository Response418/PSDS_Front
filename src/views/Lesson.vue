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
            <div class="card material-card"
                v-for="(material, index) in materials" :key="index">
              <a :href="material.description">
                <div class="card-body">
                  <p class="card-text">
                    {{ material.title }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Сложность урока: {{ lesson.level }}</h5>
              <h5 class="card-title" v-if="grade !== -1">Оценка за урок: {{ grade !== 0 ? grade : 'Нет' }}</h5>
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
  name: "Profiles",
  components: { HeaderUser, AlertMessages },
  data() {
    return {
      lesson: {},
      grade: -1,
      materials: [],
    };
  },
  created() {
    const lessonId = this.$route.params.id;

    Psds.getLesson(lessonId).then((lesson) => {
      if (lesson != null) {
        this.lesson = lesson;
      }
    });

    Psds.getUserIdByLink(1).then(userId => {
      Psds.getListLinkByUserId(userId).then(links => {
        links.forEach(link => {
          Psds.getGrade(lessonId, link.id).then(grade => {
            if(grade) this.grade = grade.value;
          })
        })
      })
    })

    Psds.getMaterials(this.$route.params.id).then((materials) => {
      if (materials != null) {
        this.materials = materials;
      }
    });
  },
  methods: {},
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

.material-card{
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

</style>


