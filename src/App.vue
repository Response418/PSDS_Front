<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

:root {
  --color-back: #ffffff;
  --color-main: #a281d2;
  --color-main-second: #e84918;
  --color-second: #ffffff;
  --color-back-second: #282828;
  --color-back-gradient-main: #5301b2;
  --color-back-gradient-second: #a9350d;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #ffffff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
