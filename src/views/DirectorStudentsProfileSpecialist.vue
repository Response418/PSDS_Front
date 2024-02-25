<template>
  <div>
    <HeaderUser />
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-12">
          <div class="profile-info mb-4">
            <h1 class="profile-title">{{ profile.title }}</h1>
            <p class="profile-description">{{ profile.description }}</p>
          </div>

          <div class="mt-4">
            <div v-for="(theme, index) in profile.themes" :key="index" class="mb-4">
              <div class="card custom-card" @click="toggleLessonList(index)">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ theme.title }}
                  </h5>
                  <p class="card-text">{{ theme.description }}</p>
                  <p class="small-text mb-0 text-muted">Уроков: {{ theme.lessons.length }}</p>

                  <div class="cards">
                    <div class="card lesson-card"
                         v-if="theme.showLessons"
                         v-for="(lesson, lessonIndex) in theme.lessons" :key="lessonIndex"
                         @click="$router.push(`/group-leader/students/` + this.$route.params.studentId +
                         `/profiles/` + this.$route.params.profileId +  `/lesson/${lesson.id}`)">
                      <div class="card-body">

                        <p class="card-text" @click="toggleLessonList(index)">
                          {{ lesson.title }}
                        </p>
                        <p class="small-text mb-2 text-muted"> {{ lesson.description }}</p>

                        <div class="difficulty-card text-center rounded wider"  :style="getDifficultyStyle(lesson.level)">
                          <p class="mb-0 font-weight-bold" style="font-weight: 700;">Уровень: {{ getLevelName(lesson.level) }}</p>
                        </div>

                        <p v-if="lesson.grade !== 0" class="small-text mb-0 text-muted">Оценка: {{ lesson.grade }}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderUser from "@/components/HeaderUser.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "ProfileSpecialist",
  components: { HeaderUser },
  data() {
    return {
      profile: {},
      isAdded: false,
    };
  },
  created() {
    Psds.getProfileDetails(this.$route.params.profileId).then((profile) => {
      if (profile != null) this.profile = profile;
    });

    const userId = this.$route.params.studentId;
    const groupId = localStorage.getItem("groupId");
    Psds.getLink(userId, groupId).then(link => {
      console.log(link)
      Psds.getPlan(link.profileId).then(plan => {
        plan.specialistProfiles.forEach(profile => {
          if(profile.id == this.$route.params.profileId){
            this.isAdded = true;
          }
        })
      })
    })
  },
  methods: {

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
    toggleLessonList(index) {
      this.profile.themes[index] = {
        ...this.profile.themes[index],
        showLessons: !this.profile.themes[index].showLessons,
      };

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

.custom-card:hover {
  transform: scale(1.025);
}

.card-text {
  color: #495057;
}

.card-title {
  font-size: 1.5rem;
}

.profile-info {
  margin-bottom: 1.5rem;
}

.profile-title {
  margin-bottom: 0.5rem;
}

.profile-description {
  color: #6c757d;
}

.row {
  flex-wrap: wrap;
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

.small-text {
  font-size: 0.85rem;
  opacity: 0.5;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
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

.lesson-card{
  width: 30%;
  margin: 1rem;
}

.lesson-card:hover {
  transform: scale(1.06);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.wider {
  width: 200px;
}

</style>

