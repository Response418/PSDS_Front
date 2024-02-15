<template>
  <section class="vh-100" style="background-color: #7804e0;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Авторизация</p>
                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" v-model="Email" class="form-control" placeholder="Введите email"/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" v-model="Password" class="form-control" placeholder="Введите пароль"/>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn btn-primary btn-lg"
                              style="padding-left: 2.5rem; padding-right: 2.5rem;background-color: #7804e0;"
                              @click="Login">{{ ModeViewAuthForm }}</button>
                    </div>
                    <div class="text-center">
                      <p class="small fw-bold mt-2 pt-1 mb-0" style="font-size: 1.2em;">Нет аккаунта?
                        <a href="#" class="link-danger" @click="$router.push('/auth/registration')" style="font-size: 1.2em;">Зарегистрируйся</a>

                      </p>
                    </div>

                  </form>
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <div class="mx-auto d-flex align-items-center">
                    <img src="@/components/images/RTK.png" style="max-width: 15%; height: auto;" class="w-100 mb-3" alt="Sample image 1">
                    <div data-v-2dc54a20="" class="title">
                      <p data-v-2dc54a20="" class="gradient-text">psds</p>

                      <div data-v-2dc54a20="" class="description text-center"> Professional skills development system </div>

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!--  <div class="backAuth">-->
<!--    <div class="container">-->
<!--      <div class='window'>-->
<!--        <div class='backfield'></div>-->
<!--        <div class='content'>-->
<!--          <div class='welcome'>Приветсвуем!</div>-->
<!--          <div class='subtitle'>Прежде чем воспользоваться нашими услугами, вам необходимо создать учетную запись.</div>-->
<!--          <div class='input-fields'>-->
<!--            <div v-if="ModeViewAuthForm === 'Регистрация'">-->
<!--              <input type="text" class='input-line full-width' v-model="Name" placeholder="Имя">-->
<!--            </div>-->
<!--            <input type="text" class='input-line full-width' v-model="Email" placeholder="Почта">-->
<!--            <input type="password" class='input-line full-width' v-model="Password" placeholder="Пароль">-->
<!--            <div v-if="ModeViewAuthForm === 'Регистрация'">-->
<!--              <input type="password" class='input-line full-width' v-model="Repassword" placeholder="Повторите пароль">-->
<!--            </div>-->

<!--            <div class="control-group imgPicker" v-if="ModeViewAuthForm === 'Регистрация'">-->
<!--              <input type="file" id="fileUpload" @change="onFileChange" hidden/>-->
<!--              <button class='ghost-round full-width' @click="chooseFiles()">Выберите картинку</button>-->
<!--              <p v-if="file">Картинка загружена</p>-->
<!--            </div>-->

<!--          </div>-->
<!--          <div>-->
<!--            <button class='ghost-round full-width' v-if="ModeViewAuthForm === 'Регистрация'" @click="Sign">{{ ModeViewAuthForm }}</button>-->
<!--            <button class='ghost-round full-width' v-else @click="Login">{{ ModeViewAuthForm }}</button>-->
<!--          </div>-->
<!--          <div class='spacing'><span class='highlight' @click="ChangeModeAuthForm">{{ ReverseModeViewAuthForm }}</span></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
// import Concurs from "@/services/Concurs";
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";

export default {
  name: "AuthPage",
  components: { AlertMessages },
  data() {
    return {
      authId: 0,
      userName: '',
      PAuthStatus: 'Авторизация',
      ModeViewAuthForm: 'Вход',
      ReverseModeViewAuthForm: 'Регистрация',
      Name: "",
      Email: "",
      Password: "",
      Repassword: "",
      file: null,
    };
  },
//   beforeRouteEnter(to, from, next) {
//     next(vm => {
//       vm.previousPage = from.fullPath
//     })
//   },
//   beforeRouteLeave(to, from, next) {
//     this.previousPage = from.fullPath;
//     next();
//   },
//   created() {
//     this.CheckSession();
//   },
  methods: {
    AddAlert(mess){
      this.$refs.AddAlertMess.AddAlertMess(mess);
    },
//     chooseFiles: function() {
//       document.getElementById("fileUpload").click()
//     },
//     onFileChange(e) {
//       this.file = e.target.files[0];
//     },
//     ChangeModeAuthForm(){
//       this.Name = "";
//       this.Email = "";
//       this.Password = "";
//       this.Repassword = "";
//       const temp = this.ModeViewAuthForm;
//       this.ModeViewAuthForm = this.ReverseModeViewAuthForm;
//       this.ReverseModeViewAuthForm = temp;
//     },
//     CheckSession() {
//       Concurs.isAuthenticated().then((res) => {
//         if (res.data.login)
//           this.$router.push({ path: this.$route.query.redirect || '/' });
//       })
//     },
    async Login() {

      const user = {
        email: this.Email,
        password: this.Password
      };

      console.log(user)

      await Psds.loginUser(this.Email, this.Password)
          .then(token => {
            console.log(token)
            localStorage.setItem('token', token.token);
            this.$router.push('/api/groups');
          })
    },
//     Sign(){
//       if (this.Password === this.Repassword) {
//         const data = {
//           email: this.Email,
//         };
//         Concurs.findUserByEmail(data)
//             .then(response => {
//               if (response.data.name) {
//                 this.AddAlert({ status: false, message: "Почта занята" });
//                 return;
//               }
//               else {
//                 let formData = new FormData();
//                 formData.append("filedata", this.file);
//                 formData.append("name", this.Name);
//                 formData.append("email", this.Email);
//                 formData.append("password", this.Password);
//                 Concurs.CreateUser(formData)
//                     .then(response => {
//                       if(response.statusText === "OK"){
//                         this.AddAlert({ status: true, message: "Успешная регистрация" });
//                         this.Login();
//                         this.Name = "";
//                         this.Email = "";
//                         this.Password = "";
//                         this.Repassword = "";
//                         this.viewAuthForm = false;
//                       }
//                       else this.AddAlert({ status: false, message: "Ошибка в регистрации" });
//                     })
//                     .catch(() => {
//                       this.AddAlert({ status: false, message: "Ошибка в регистрации" });
//                     });
//               }
//             });
//       }
//       else
//         this.AddAlert({ status: false, message: "Пароли не совпадают" });
//     },
  },
}
</script>

<style scoped>
.gradient-text {
  font-size: 150px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 -20px 0;
}
</style>
