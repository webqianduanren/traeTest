<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style lang="scss">
body {
  margin: 0;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
