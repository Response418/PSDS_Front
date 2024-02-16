<template>
  <section class="vh-100" style="background-color: #861cec;">
<!--  <AuthForm/>-->
  <div>
    <HeaderUser />
    <section id="header" class="jumbotron text-center mt-4 mb-4">
      <h1 class="display-4 text-white">Система развития профессиональных навыков</h1>
      <p class="lead">Настройка и редактирование необходимых материалов.</p>
    </section>

    <section id="gallery">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 mb-4" v-for="(card, index) in cards" :key="index">
            <div class="card h-100 d-flex flex-column">
              <img :src="card.imgSrc" alt="" class="card-img-top">
              <div class="card-body flex-grow-1 bg-white">
                <h5 class="card-title text-center">{{ card.title }}</h5>
                <p class="card-text">{{ card.description }}</p>
              </div>
              <div class="card-footer bg-white">
                <div class="d-flex justify-content-center">
                  <a class="btn btn-outline-success btn-sm" @click="$router.push(card.route)">Настроить</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </section>
<!--    <div class="lapsha">-->
<!--      The Professional Skills Development System, abbreviated as PSDS, is a comprehensive platform designed for the assessment of professional competencies. In this innovative system, individuals have the opportunity to join teams where they can collaborate with friends and mentors to evaluate their knowledge and skills.-->
<!--      PSDS goes beyond a traditional assessment framework by fostering a collaborative environment that promotes continuous learning and skill development. The platform enables users to form teams, creating a supportive network of peers and mentors who actively participate in the evaluation process. This dynamic approach not only enhances the individual's understanding of their strengths and weaknesses but also provides valuable insights for improvement.-->
<!--      One of the distinctive features of PSDS is its focus on teamwork. Users can choose their team members, consisting of both friends and mentors, creating a diverse group with varied perspectives. This collaborative effort ensures a well-rounded evaluation process, where different viewpoints contribute to a comprehensive understanding of the individual's professional capabilities.-->
<!--      The platform's evaluation process involves a systematic and objective assessment of the user's knowledge and skills. Through a series of targeted exercises, projects, and assessments, individuals can showcase their expertise in specific domains. The evaluators, comprising friends and mentors, bring a wealth of experience to the process, providing constructive feedback and valuable insights for growth.-->
<!--      Participating in a PSDS team offers numerous benefits. It encourages a sense of camaraderie and shared goals, motivating individuals to excel in their professional development. The diverse backgrounds of team members contribute to a rich learning experience, fostering an environment where knowledge-sharing and skill enhancement become integral components.-->
<!--      The PSDS platform incorporates a user-friendly interface, making it accessible and intuitive for individuals of varying technological backgrounds. The seamless navigation enhances the overall user experience, ensuring that the focus remains on skill development rather than struggling with the platform itself.-->
<!--      In addition to assessments and evaluations, PSDS offers a range of resources to support continuous learning. These resources include tutorials, articles, and webinars covering various professional domains. The goal is to empower users with the tools they need to enhance their knowledge and skills, ultimately contributing to their overall professional growth.-->
<!--      The PSDS community plays a crucial role in the success of the system. Users can engage in forums, discussions, and networking opportunities, creating a vibrant ecosystem of professionals dedicated to their ongoing development. The exchange of ideas and experiences within the community enriches the learning journey for everyone involved.-->
<!--      As individuals progress within the PSDS framework, they have the chance to earn badges and certifications. These achievements serve as tangible evidence of their growth and proficiency in specific areas. The recognition adds a layer of motivation, encouraging users to strive for excellence and continuously advance their professional capabilities.-->
<!--      In conclusion, the Professional Skills Development System (PSDS) stands as a pioneering platform that transcends traditional assessment methods. By combining collaborative teamwork, objective evaluations, and a wealth of resources, PSDS empowers individuals to take control of their professional development journey. This innovative approach not only assesses current skills but also propels users towards ongoing growth and excellence in their respective fields.-->
<!--      The Professional Skills Development System, abbreviated as PSDS, is a comprehensive platform designed for the assessment of professional competencies. In this innovative system, individuals have the opportunity to join teams where they can collaborate with friends and mentors to evaluate their knowledge and skills.-->
<!--      PSDS goes beyond a traditional assessment framework by fostering a collaborative environment that promotes continuous learning and skill development. The platform enables users to form teams, creating a supportive network of peers and mentors who actively participate in the evaluation process. This dynamic approach not only enhances the individual's understanding of their strengths and weaknesses but also provides valuable insights for improvement.-->
<!--      One of the distinctive features of PSDS is its focus on teamwork. Users can choose their team members, consisting of both friends and mentors, creating a diverse group with varied perspectives. This collaborative effort ensures a well-rounded evaluation process, where different viewpoints contribute to a comprehensive understanding of the individual's professional capabilities.-->
<!--      The platform's evaluation process involves a systematic and objective assessment of the user's knowledge and skills. Through a series of targeted exercises, projects, and assessments, individuals can showcase their expertise in specific domains. The evaluators, comprising friends and mentors, bring a wealth of experience to the process, providing constructive feedback and valuable insights for growth.-->
<!--      Participating in a PSDS team offers numerous benefits. It encourages a sense of camaraderie and shared goals, motivating individuals to excel in their professional development. The diverse backgrounds of team members contribute to a rich learning experience, fostering an environment where knowledge-sharing and skill enhancement become integral components.-->
<!--      The PSDS platform incorporates a user-friendly interface, making it accessible and intuitive for individuals of varying technological backgrounds. The seamless navigation enhances the overall user experience, ensuring that the focus remains on skill development rather than struggling with the platform itself.-->
<!--      In addition to assessments and evaluations, PSDS offers a range of resources to support continuous learning. These resources include tutorials, articles, and webinars covering various professional domains. The goal is to empower users with the tools they need to enhance their knowledge and skills, ultimately contributing to their overall professional growth.-->
<!--      The PSDS community plays a crucial role in the success of the system. Users can engage in forums, discussions, and networking opportunities, creating a vibrant ecosystem of professionals dedicated to their ongoing development. The exchange of ideas and experiences within the community enriches the learning journey for everyone involved.-->
<!--      As individuals progress within the PSDS framework, they have the chance to earn badges and certifications. These achievements serve as tangible evidence of their growth and proficiency in specific areas. The recognition adds a layer of motivation, encouraging users to strive for excellence and continuously advance their professional capabilities.-->
<!--      In conclusion, the Professional Skills Development System (PSDS) stands as a pioneering platform that transcends traditional assessment methods. By combining collaborative teamwork, objective evaluations, and a wealth of resources, PSDS empowers individuals to take control of their professional development journey. This innovative approach not only assesses current skills but also propels users towards ongoing growth and excellence in their respective fields.-->
<!--    </div>-->
<!--    <div class="title">-->
<!--      <p class="gradient-text">psds</p>-->

<!--      <div class="description">-->
<!--        Professional skills development system-->
<!--      </div>-->
<!--    </div>-->

<!--  <div class="container">-->
<!--    <div class="empty"></div>-->

<!--    <div class="navigate">-->

<!--      <div class="team card card2" @click="$router.push('/team')">-->
<!--        <div class="internal_card">-->
<!--          <div class="opacity_card">-->
<!--            <p>my team</p>-->
<!--            <img src="`@/components/images/team.png`">-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="plan card">-->
<!--        <div class="internal_card">-->
<!--          <div class="opacity_card">-->
<!--            <p>my study plan</p>-->
<!--            <img src="`@/components/images/book.png`">-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="profiles card card2" @click="$router.push('/profile')">-->
<!--        <div class="internal_card">-->
<!--          <div class="opacity_card">-->
<!--            <p>profiles of specialists</p>-->
<!--            <img src="`@/components/images/prof.png`">-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="reference">-->
<!--        <div class="card card_mini">-->
<!--          <div class="internal_card" @click="goToUrl('https://github.com/Response418')">-->
<!--            <div class="opacity_card">-->
<!--              <p>GitHub</p>-->
<!--              <img src="`@/components/images/git.png`">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="card card_mini">-->
<!--          <div class="internal_card" @click="goToUrl('https://glaze-calliandra-121.notion.site/Response418-52082344235a44fbaa8125b1e628f686')">-->
<!--            <div class="opacity_card">-->
<!--              <p>Notion</p>-->
<!--              <img src="`@/components/images/notion.png`">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="card card_mini" >-->
<!--          <div class="internal_card" @click="goToUrl('https://miro.com/app/board/uXjVNF-lhH8=/')">-->
<!--            <div class="opacity_card">-->
<!--              <p>Miro</p>-->
<!--              <img src="`@/components/images/miro.png`">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

<!--  </div>-->

  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Profile from "@/components/Profile.vue";
import Plan from "@/components/Plan.vue";
import Team from "@/components/Team.vue";

import HeaderUser from "@/components/HeaderUser.vue";
import miroLessonPlanningImg from "@/components/images/miro-lesson-planning.jpeg";
import materialImg from "@/components/images/material.jpg";
import userImg from "@/components/images/user.png";

export default {
  name: "HomeMain",
  components: {HeaderUser, Plan, Profile, AuthForm, AlertMessages, Team },
  data() {
    return {
      width: window.innerWidth,
      profileSearch: "",
      cards: [
        {
          imgSrc: miroLessonPlanningImg,
          title: "Учебные материалы",
          description: "Поиск, просмотр и добавление учебных материалов, необходимых для усвоения технологии!",
          route: "/profile",
        },
        {
          imgSrc: materialImg,
          title: "Учебный план",
          description: "Добавление тем, необходимых для обучения специалистов, создание уроков и добавление материалов для обеспечения эффективного обучения!",
          route: "/api/groups/moderator",
        },
      ],

      profiles: [
        {
          title: "Front-end разработчик",
          description: "Очень крутое описание про специальность и профиль специалиста",
          level: 1
        },
        {
          title: "Back-end разработчик",
          description: "Очень крутое описание про специальность и профиль специалиста",
          level: 2
        },
        {
          title: "Аналитик",
          description: "Очень крутое описание про специальность и профиль специалиста",
          level: 3
        },
      ],

      plan: {

      }
    }
  }
}
</script>

<style scoped>

</style>
