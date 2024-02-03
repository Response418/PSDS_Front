<template>

  <div class="theme">

    <div class="themeInfo" @click="ShowLesson = !ShowLesson">

      <p class="title">{{theme.title}}</p>

      <div class="arrow">
        <p v-if="ShowLesson">△</p>
        <p v-else>▽</p>
      </div>

    </div>

    <div v-if="ShowLesson">
      <div class="description">
        {{theme.description}}
      </div>

      <div class="lessons">
        <div v-for="(lesson,key) in theme.lessons" :key="key">
          <Lesson :lesson="lesson"/>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Lesson from "@/components/Lesson.vue";

export default {
  name: "Theme",
  components: {Lesson},
  data() {
    return {
      ShowLesson: false,
    }
  },
  props: {
    theme: {
      type: Object,
    }
  }
}
</script>

<style scoped>

.arrow p{
  font-size: 40px;
  margin: 10px 0;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.themeInfo{
  display: flex;
}

.lessons{
  display: flex;
  flex-wrap: wrap;
}

.title{
  font-size: 40px;
  background: linear-gradient(45deg, var(--color-main), var(--color-main-second));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px 0 0 20px;
}

.description {
  font-size: 25px;
  margin: 0 30px;
}

.CardObject{
  position: relative;
  width: 1300px;
  height: 300px;
  margin: 10px 10px;
}

.CardObject::before {
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
  align-items: center;
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

</style>
