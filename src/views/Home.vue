<template>
  <AuthForm/>

    <div class="lapsha">
      The Professional Skills Development System, abbreviated as PSDS, is a comprehensive platform designed for the assessment of professional competencies. In this innovative system, individuals have the opportunity to join teams where they can collaborate with friends and mentors to evaluate their knowledge and skills.
      PSDS goes beyond a traditional assessment framework by fostering a collaborative environment that promotes continuous learning and skill development. The platform enables users to form teams, creating a supportive network of peers and mentors who actively participate in the evaluation process. This dynamic approach not only enhances the individual's understanding of their strengths and weaknesses but also provides valuable insights for improvement.
      One of the distinctive features of PSDS is its focus on teamwork. Users can choose their team members, consisting of both friends and mentors, creating a diverse group with varied perspectives. This collaborative effort ensures a well-rounded evaluation process, where different viewpoints contribute to a comprehensive understanding of the individual's professional capabilities.
      The platform's evaluation process involves a systematic and objective assessment of the user's knowledge and skills. Through a series of targeted exercises, projects, and assessments, individuals can showcase their expertise in specific domains. The evaluators, comprising friends and mentors, bring a wealth of experience to the process, providing constructive feedback and valuable insights for growth.
      Participating in a PSDS team offers numerous benefits. It encourages a sense of camaraderie and shared goals, motivating individuals to excel in their professional development. The diverse backgrounds of team members contribute to a rich learning experience, fostering an environment where knowledge-sharing and skill enhancement become integral components.
      The PSDS platform incorporates a user-friendly interface, making it accessible and intuitive for individuals of varying technological backgrounds. The seamless navigation enhances the overall user experience, ensuring that the focus remains on skill development rather than struggling with the platform itself.
      In addition to assessments and evaluations, PSDS offers a range of resources to support continuous learning. These resources include tutorials, articles, and webinars covering various professional domains. The goal is to empower users with the tools they need to enhance their knowledge and skills, ultimately contributing to their overall professional growth.
      The PSDS community plays a crucial role in the success of the system. Users can engage in forums, discussions, and networking opportunities, creating a vibrant ecosystem of professionals dedicated to their ongoing development. The exchange of ideas and experiences within the community enriches the learning journey for everyone involved.
      As individuals progress within the PSDS framework, they have the chance to earn badges and certifications. These achievements serve as tangible evidence of their growth and proficiency in specific areas. The recognition adds a layer of motivation, encouraging users to strive for excellence and continuously advance their professional capabilities.
      In conclusion, the Professional Skills Development System (PSDS) stands as a pioneering platform that transcends traditional assessment methods. By combining collaborative teamwork, objective evaluations, and a wealth of resources, PSDS empowers individuals to take control of their professional development journey. This innovative approach not only assesses current skills but also propels users towards ongoing growth and excellence in their respective fields.
      The Professional Skills Development System, abbreviated as PSDS, is a comprehensive platform designed for the assessment of professional competencies. In this innovative system, individuals have the opportunity to join teams where they can collaborate with friends and mentors to evaluate their knowledge and skills.
      PSDS goes beyond a traditional assessment framework by fostering a collaborative environment that promotes continuous learning and skill development. The platform enables users to form teams, creating a supportive network of peers and mentors who actively participate in the evaluation process. This dynamic approach not only enhances the individual's understanding of their strengths and weaknesses but also provides valuable insights for improvement.
      One of the distinctive features of PSDS is its focus on teamwork. Users can choose their team members, consisting of both friends and mentors, creating a diverse group with varied perspectives. This collaborative effort ensures a well-rounded evaluation process, where different viewpoints contribute to a comprehensive understanding of the individual's professional capabilities.
      The platform's evaluation process involves a systematic and objective assessment of the user's knowledge and skills. Through a series of targeted exercises, projects, and assessments, individuals can showcase their expertise in specific domains. The evaluators, comprising friends and mentors, bring a wealth of experience to the process, providing constructive feedback and valuable insights for growth.
      Participating in a PSDS team offers numerous benefits. It encourages a sense of camaraderie and shared goals, motivating individuals to excel in their professional development. The diverse backgrounds of team members contribute to a rich learning experience, fostering an environment where knowledge-sharing and skill enhancement become integral components.
      The PSDS platform incorporates a user-friendly interface, making it accessible and intuitive for individuals of varying technological backgrounds. The seamless navigation enhances the overall user experience, ensuring that the focus remains on skill development rather than struggling with the platform itself.
      In addition to assessments and evaluations, PSDS offers a range of resources to support continuous learning. These resources include tutorials, articles, and webinars covering various professional domains. The goal is to empower users with the tools they need to enhance their knowledge and skills, ultimately contributing to their overall professional growth.
      The PSDS community plays a crucial role in the success of the system. Users can engage in forums, discussions, and networking opportunities, creating a vibrant ecosystem of professionals dedicated to their ongoing development. The exchange of ideas and experiences within the community enriches the learning journey for everyone involved.
      As individuals progress within the PSDS framework, they have the chance to earn badges and certifications. These achievements serve as tangible evidence of their growth and proficiency in specific areas. The recognition adds a layer of motivation, encouraging users to strive for excellence and continuously advance their professional capabilities.
      In conclusion, the Professional Skills Development System (PSDS) stands as a pioneering platform that transcends traditional assessment methods. By combining collaborative teamwork, objective evaluations, and a wealth of resources, PSDS empowers individuals to take control of their professional development journey. This innovative approach not only assesses current skills but also propels users towards ongoing growth and excellence in their respective fields.
    </div>
    <div class="title">
      <p class="gradient-text">psds</p>

      <div class="description">
        Professional skills development system
      </div>
    </div>

  <div class="container">
    <div class="empty"></div>

    <div class="navigate">

      <div class="team card card2">
        <div class="internal_card">
          <div class="opacity_card">
            <p>my team</p>
            <img src="`@/components/images/team.png`">
          </div>
        </div>
      </div>

      <div class="plan card">
        <div class="internal_card">
          <div class="opacity_card">
            <p>my study plan</p>
            <img src="`@/components/images/book.png`">
          </div>
        </div>
      </div>

      <div class="profiles card card2" @click="$router.push('/profile')">
        <div class="internal_card">
          <div class="opacity_card">
            <p>profiles of specialists</p>
            <img src="`@/components/images/prof.png`">
          </div>
        </div>
      </div>

      <div class="reference">
        <div class="card card_mini">
          <div class="internal_card" @click="goToUrl('https://github.com/Response418')">
            <div class="opacity_card">
              <p>GitHub</p>
              <img src="`@/components/images/git.png`">
            </div>
          </div>
        </div>

        <div class="card card_mini">
          <div class="internal_card" @click="goToUrl('https://glaze-calliandra-121.notion.site/Response418-52082344235a44fbaa8125b1e628f686')">
            <div class="opacity_card">
              <p>Notion</p>
              <img src="`@/components/images/notion.png`">
            </div>
          </div>
        </div>

        <div class="card card_mini" >
          <div class="internal_card" @click="goToUrl('https://miro.com/app/board/uXjVNF-lhH8=/')">
            <div class="opacity_card">
              <p>Miro</p>
              <img src="`@/components/images/miro.png`">
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Profile from "@/components/Profile.vue";
import Plan from "@/components/Plan.vue";

export default {
  name: "HomeMain",
  components: {Plan, Profile, AuthForm, AlertMessages },
  data() {
    return {
      width: window.innerWidth,
      profileSearch: "",
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
  },
  methods: {
    AddAlert(mess){
      this.$refs.AddAlertMess.AddAlertMess(mess);
    },
    goToUrl(url){
      window.location.href= url
    }
  }
}
</script>

<style scoped>

.card p{
  margin: 0 10px;
  font-size: 60px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.reference p{
  margin: 10px;
  font-size: 30px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.internal_card {
  position: absolute;
  background: #f2f2f2;
  height: calc(100% - 5px);
  width: calc(100% - 5px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

.card {
  position: relative;
  width: 58vw;
  height: 25vh;
  margin: 10px 10px;
}

.card img {
  position: absolute;
  width: auto;
  height: 20vh;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.reference img {
  width: auto;
  height: 10vh;
  opacity: 0.1;
}

.opacity_card{
  opacity: 0.1;
  height: 100%;
  width: 100%;
}

.opacity_card:hover{
  opacity: 1;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--color-main), var(--color-main-second));
  opacity: 0.1;
  transition: opacity 1s ease;
}

.card:hover::before {
  opacity: 1;
}

.card2::before {
  background: linear-gradient(var(--color-main-second), var(--color-main));
}

.card_mini{
  height: 12vh;
}

.reference{
  display: flex;
  justify-content: space-between;
}

.navigate{
  width: 60vw;
  height: 100vh;
}

.title{
  top: 50%;
  transform: translateY(-50%);
  width: 40vw;
  text-align: center;
  position: fixed;
  z-index: 2;
}

.empty{
  width: 40vw;
  height: 100vh;
}

.container{
  display: flex;
  justify-content: space-between;
}

.gradient-text {
  font-size: 150px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 -20px 0;
}

.description{
  width: 386px;
  margin-left: 50%;
  margin-top: -25px;
  transform: translateX(-50%);
  font-size: 15px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main-second), var(--color-main));
  color: white;
}

.lapsha{
  position: fixed;
  width: 40%;
  height: 100vh;
  top: 0;
  left: 0;
  text-align: justify;
  opacity: 0.1;
  z-index: 1;
  text-transform: uppercase;
}

</style>
