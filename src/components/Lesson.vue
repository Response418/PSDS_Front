<template>
  <div class="CardLesson">
    <div class="internal_card">
      <div class="opacity_card">
        <p class="title">{{lesson.title}}</p>

        <div class="description">
          {{lesson.description}}
        </div>

        <div class="grade">
          <div class="triangle"
               :class="{
                  'gradeBad': lesson.grade > 0 && lesson.grade < 4,
                  'gradeMid': lesson.grade >= 4 && lesson.grade < 8,
                  'gradeGood': lesson.grade >= 8 && lesson.grade < 11
              }"
          ></div>
          <p>{{lesson.grade}}</p>
        </div>

        <div class="bottomBlock">

          <div class="levelBlock">
            <div class="level">
              <div v-for="index in 5" :key="index" :class="{ 'filled': index <= lesson.level }" class="square"></div>
            </div>
          </div>

          <div class="material">
            <div class="materialOne" v-for="(material,key) in lesson.materials" :key="key">
              <p @click="goToUrl(material.description)">{{material.title}}</p>
            </div>
          </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Lesson",
  props: {
    lesson: {
      type: Object,
    }
  },
  methods: {
    goToUrl(url){
      window.location.href= url
    }
  }
}
</script>

<style scoped>

.triangle{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 197px 0 0 197px;
  border-color: transparent transparent transparent gray;
  z-index: -2;
  opacity: 0.2;
}

.grade{
  position: absolute;
  bottom: -30px;
  left: 0;
  z-index: -1;
  color: white;
}

.grade p{
  font-size: 160px;
  margin: 0;
}

.gradeBad{
  border-color: transparent transparent transparent #ff0000;
}
.gradeMid{
  border-color: transparent transparent transparent #ffff00;
}
.gradeGood{
  border-color: transparent transparent transparent #86ff86;
}

.bottomBlock{
  position: absolute;
  bottom: 0;
  right: 0;
}

.material{
  display: flex;
  justify-content: right;
  flex-wrap: wrap;
}

.materialOne {
  background: var(--color-main);
  margin: 2px;
  padding: 3px;
  border-radius: 20px;
  opacity: 0.8;
}

.materialOne:hover {
  opacity: 0.5;
  cursor: pointer;
}

.materialOne p {
  color: white;
  margin: 0;
}

.title{
  font-size: 40px;
  margin: 10px;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 15px;
  margin: 0 10px;
}

.CardLesson{
  position: relative;
  width: 300px;
  height: 300px;
  margin: 10px 10px;
}

.CardLesson::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--color-main), var(--color-main-second));
  opacity: 1;
  transition: opacity 1s ease;
}

.level {
  display: flex;
  justify-content: right;
}

.levelBlock{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.levelBlock p{
  margin: 0;
}

.square {
  width: 15px;
  height: 15px;
  background-color: #d5d4d4;
  margin: 5px;
  border-radius: 40%;
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

.opacity_card{
  height: 100%;
  width: 100%;
}

.CardObject p{
  margin: 0 10px;
  font-size: 30px;
  text-transform: uppercase;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.filled{
  background: var(--color-main-second);
}

</style>
