<template>
  <div class="CardObject" @click="$router.push('/team/special')">
    <div class="internal_card">
      <div class="opacity_card">
        <p class="title">{{profile.title}}</p>

        <div class="description">
          {{profile.description}}
        </div>

        <div class="descriptionBack">
          &#128366;
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Team",
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
  margin: 0 10px;
  position: absolute;
  bottom: 20px;
}

.descriptionBack{
  position: absolute;
  opacity: 0.05;
  font-size: 200px;
  bottom: 0;
  right: 0;
}

.CardObject{
  position: relative;
  width: 300px;
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
  opacity: 0.1;
  transition: opacity 1s ease;
}

.CardObject:hover::before {
  opacity: 1;
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
  opacity: 0.6;
  height: 100%;
  width: 100%;
}

.opacity_card:hover{
  opacity: 1;
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