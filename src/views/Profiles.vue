<template>
  <AuthForm/>
  <GoPrev :path="'/'"/>

  <div class="empty"></div>

  <div class="search">
    <input type="text"
           :class="{'searchShow': showSearch, 'searchHide': !showSearch}">
    <div class="buttonEmpty"></div>
    <button @click="showSearch = !showSearch">🔍</button>
  </div>
  <div class="profiles">
    <div v-for="(profile,key) in profiles" :key="key">
      <Profile :profile="profile" />
    </div>
  </div>

  <AlertMessages ref="AddAlertMess"/>
</template>


<script>
import AuthForm from "@/components/AuthForm.vue";
import AlertMessages from "@/components/AlertMessages.vue";
import Profile from "@/components/Profile.vue";
import GoPrev from "@/components/GoPrev.vue";

export default {
  name: "Profiles",
  components: {GoPrev, Profile, AuthForm, AlertMessages },
  data() {
    return {
      profiles: [
        {
          title: "Front-end разработчик",
          description: "Очень крутое описание про специальность и профиль специалиста",
        },
        {
          title: "Back-end разработчик",
          description: "Очень крутое описание про специальность и профиль специалиста",
        },
        {
          title: "Аналитик",
          description: "Очень крутое описание про специальность и профиль специалиста",
        },
      ],
      showSearch: false,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.buttonEmpty{
  width: 44px;
  height: 100%;
}

.search button:hover {
  background: rgba(255, 255, 255, 0.93);
}

.search{
  display: flex;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, var(--color-main-second), var(--color-main));
  padding: 1px;
  border-radius: 30px;
  height: 50px;
}

.search input {
  box-sizing: border-box;
  border: none;
  background: transparent;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  outline: none;
  font-size: 35px;
  margin: 0 10px;
  transition: width 1s ease;
}

.searchShow {
  width: 400px;
}

.searchHide {
  width: 0;
}

.search button {
  position: absolute;
  right: 0;
  border: var(--color-main) 1px solid;
  background: rgba(255, 255, 255, 0.78);
  float:right;
  cursor: pointer;
  border-radius: 30px;
  font-size: 34px;
  width: 70px;
}

.empty{
  height: 70px;
  width: 100%;
}

.profiles{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
