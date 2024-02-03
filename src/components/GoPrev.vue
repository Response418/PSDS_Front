<template>
  <div class="goPrev" @click="$router.push(path)">
    <div class="goPrevBack">
      ❰
    </div>
  </div>
</template>

<script>
export default {
  name: "GoPrev",
  props: {
    path: {
      type: String,
    }
  }
}
</script>

<style scoped>
.goPrev{
  position: fixed;
  top: 20px;
  left: 40px;
  z-index: 7;
  background: linear-gradient(45deg, var(--color-main-second), var(--color-main));
  border-radius: 50px;
}

.goPrevBack:hover{
  opacity: 0.9;
  cursor: pointer;
}

.goPrevBack {
  width: 50px;
  height: 50px;
  background: white;
  opacity: 0.8;
  font-size: 34px;
  text-align: center;
  margin: 1px;
  border-radius: 50px;
  color: #351242;
}

.goPrev img{
  width: 50px;
  height: 50px;
}

</style>
