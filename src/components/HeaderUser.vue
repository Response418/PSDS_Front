<template>
  <header>
    <div class="px-3 py-2 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img src="@/components/images/RTK.png" alt="Логотип" class="me-2" style="width: 100%; max-width: 50px;">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">

            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          </a>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/')" >
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#speedometer2" ></use></svg>
                Главная
              </a>
            </li>
              <li>
                <a href="#" class="nav-link text-white" @click="$router.push('/group-leader')" v-if="roles && ifRoleAccess('ROLE_DIRECTOR')">
                  <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#speedometer2"></use></svg>
                  Руководитель группы
                </a>
              </li>
              <li>
                <a href="#" class="nav-link text-white" @click="$router.push('/mentor/plan')" v-if="roles && ifRoleAccess('ROLE_MENTOR')">
                  <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#table"></use></svg>
                  Наставник
                </a>
              </li>
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/profile')" v-if="roles && ifRoleAccess('ROLE_STUDENT')">
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#grid"></use></svg>
                Учебные материалы
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/plan')" v-if="roles && ifRoleAccess('ROLE_STUDENT')">
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#people-circle"></use></svg>
                Учебный план
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white" @click="$router.push('/groups')">
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#people-circle"></use></svg>
                Выбор учебной группы
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
  roles: [],


  created() {
    this.roles = localStorage.getItem('role');
  },

  methods: {
    logout() {
      Psds.logoutUser().then(() => {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push('/auth/login');
      })
    },

    ifRoleAccess(role) {
      return this.roles.includes(role);
    },
  }
};
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>