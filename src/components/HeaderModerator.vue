<template>
  <header>
    <div class="px-3 py-2 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img src="@/components/images/beaverswork1.jpg" alt="Логотип" class="me-2" style="width: 100%; max-width: 150px;">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">

            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          </a>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/moderator')" >
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#speedometer2" ></use></svg>
                Панель администратора
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/moderator/groups')" >
<!--              <a href="#" class="nav-link text-white">-->
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#speedometer2"></use></svg>
               Учебные группы
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/moderator/materials')" >
<!--              <a href="#" class="nav-link text-white">-->
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#table"></use></svg>
                Учебный материал
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/moderator/work')" >
<!--              <a href="#" class="nav-link text-white">-->
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#grid"></use></svg>
                Пользователи
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white" @click=logout>
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#people-circle"></use></svg>
                Выход
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
    <div class="px-3 py-2 border-bottom mb-3">
      <div class="container d-flex flex-wrap justify-content-center">
      </div>
    </div>
  </header>
</template>

<script>
import Psds from "@/services/Psds.js";

export default {
  name: "Header",

  methods: {
    logout() {
      Psds.logoutUser().then(() => {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push('/auth/login');
      })
    }
  }
};
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>