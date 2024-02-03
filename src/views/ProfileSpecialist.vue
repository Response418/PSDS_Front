<template>
  <AuthForm/>
  <GoPrev :path="'/profile'"/>
  <div class="empty"></div>

  <div>

    <div class="title">
      <p>
        {{profile.title}}
      </p>

      <div class="description">
        {{profile.description}}
      </div>
    </div>

    <div v-for="(theme,key) in profile.themes" :key="key">
      <Themes :theme="theme"/>
    </div>

  </div>

  <AlertMessages ref="AddAlertMess"/>
</template>


<script>
import AuthForm from "@/components/AuthForm.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Profile from "@/components/Profile.vue";
import GoPrev from "@/components/GoPrev.vue";
import Themes from "@/components/Theme.vue";

export default {
  name: "ProfileSpecialist",
  components: {Themes, GoPrev, AuthForm, AlertMessages },
  data() {
    return {
      profile: {
          title: "Front-end разработчик",
          description: "Очень крутое описание про специальность и профиль специалиста это описание может быть больше, интересно что будет. Пробую его увеличить ",
          themes: [
            {
              title: "Тема 1. Делаем что-то",
              description: "Очень крутое описание темы, где мы делаем что-то",
              lessons: [
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 8,
                  materials: [
                    {
                      title: "Material 1",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    }
                  ]
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 8,
                  materials: [
                    {
                      title: "Material 1",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    }
                  ]
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 8,
                  materials: [
                    {
                      title: "Material 1",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    }
                  ]
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 8,
                  materials: [
                    {
                      title: "Material 1",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    }
                  ]
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 8,
                  materials: [
                    {
                      title: "Material 1",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    }
                  ]
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 8,
                  materials: [
                    {
                      title: "Material 1",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    },
                    {
                      title: "Material 2",
                      description: "https://metanit.com/"
                    }
                  ]
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 2,
                  grade: 5
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 3,
                  grade: 1
                }
              ]
            },
            {
              title: "Тема 1. Делаем что-то",
              description: "Очень крутое описание темы, где мы делаем что-то",
              lessons: [
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 0
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 2,
                  grade: 2
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 3,
                  grade: 2
                }
              ]
            },
            {
              title: "Тема 1. Делаем что-то",
              description: "Очень крутое описание темы, где мы делаем что-то",
              lessons: [
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 4,
                  grade: 2
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 2,
                  grade: 2
                },
                {
                  title: "Урок 1. Делаем что-то",
                  description: "Очень крутое описание темы, где мы делаем что-то",
                  level: 3,
                  grade: 2
                }
              ]
            }
          ]
        },
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.title{
  width: 60vw;
}

.title p {
  font-size: 100px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.description{
  font-size: 20px;
  margin: 0 10px;
}

.empty{
  height: 70px;
  width: 100%;
}

</style>
