<template>
  <section class="vh-100" style="background-color: #7804e0;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Регистрация</p>
                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" v-model="lastName" class="form-control" placeholder="Введите фамилию"/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" v-model="firstName" class="form-control" placeholder="Введите имя"/>
<!--                        <label class="form-label" for="form3Example1c">Имя</label>-->
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" v-model="fatherName" class="form-control" placeholder="Введите отчество"/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" v-model="city" class="form-control" placeholder="Введите город"/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" v-model="phoneNumber" class="form-control" placeholder="Введите номер телефона"/>
                       </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" v-model="email" class="form-control" placeholder="Введите email"/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" v-model="password" class="form-control" placeholder="Введите пароль"/>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" v-model="repeatPassword" class="form-control" placeholder="Повторите пароль"/>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn mt-2 my-custom-button btn-lg" @click="Registration">{{ ModeViewAuthForm }}</button>
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
  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
import AlertMessages from "@/components/AlertMessages.vue";
import Psds from "@/services/Psds.js";
export default {
  name: "Registration",
  components: { AlertMessages },
  data() {
    return {
      ModeViewAuthForm: 'Регистрация',
      lastName: '',
      firstName: '',
      fatherName: '',
      city: '',
      phoneNumber: '',
      email: '',
      password: '',
      repeatPassword: ''
    };
  },
  methods: {
    AddAlert(mess) {
      this.$refs.AddAlertMess.AddAlertMess(mess);
    },

    async Registration() {
      // const user = {
      //   lastName: this.lastName,
      //   firstName: this.firstName,
      //   fatherName: this.fatherName,
      //   city: this.city,
      //   phoneNumber: this.phoneNumber,
      //   email: this.email,
      //   password: this.password
      // };
      //
      // console.log(user)

      if (this.password !== this.repeatPassword) {
        // Если пароли не совпадают, выведите сообщение и завершите функцию
        this.AddAlert('Пароли не совпадают');
        return;
      }

      try {
        await Psds.registerUser(this.lastName, this.firstName, this.fatherName, this.city, this.phoneNumber, this.email, this.password)
        this.$router.push('/auth/login');
      } catch (error) {
        console.error('Ошибка при регистрации пользователя', error);
        this.AddAlert('Ошибка при регистрации пользователя');
      }

      // const response = await Psds.registerUser(this.lastName, this.firstName, this.fatherName, this.city, this.phoneNumber, this.email, this.password)
      //     // .then(token => {
      //     //   console.log(token)
      //     //   localStorage.setItem('token', token.token);
      //     // })
      //   if (response.status === 200) {
      //     // Успешная регистрация, перенаправляем пользователя
      //
      //   } else { this.AddAlert('Ошибка регистрации: ' + response.data.message);}

    },
  }
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

.my-custom-button {
  background-color: #6623cc;
  color: white;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: #ee6738; /* Замените на оранжевый цвет при наведении */
}
</style>