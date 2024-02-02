<template>
  <div class="CardProfile">
    <div>
      <p class="title">{{profile.title}}</p>

      <div class="description">
        {{profile.description}}
      </div>
    </div>
    <div class="levelBlock">
      <p>Level </p>
      <div class="level">
        <div v-for="index in 5" :key="index" :class="{ 'filled': index <= profile.level }" class="square"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    profile: {
      type: Object,
    }
  }
}
</script>

<style scoped>

.title{
  font-size: 40px;
  margin: 10px;
}

.description {
  font-size: 20px;
  margin: 0 25px;
}

.CardProfile{
  border: var(--color-back-gradient-main) 2px solid;
  border-radius: 20px;
  margin: 10px;
  padding: 0 10px;
  width: 900px;
  display: flex;
  justify-content: space-between;
  height: 200px;
  color: #000;
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

.filled {
  background-color: var(--color-main-second);
}

</style>
