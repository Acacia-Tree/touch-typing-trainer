<template>
  <header class="header">
    <h1 class="header__h1">Тренажер слепой печати</h1>
  </header>
  
  <TypingArea/>
</template>

<script>
import TypingArea from './components/TypingArea.vue'

export default {
  name: 'App',
  components: {
    TypingArea
  }
}
</script>

<style>
html {
  background: #96D447;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #96D447;
}
.header {

}
.header__h1 {
  color: darkgreen;
  border-top: 30px solid transparent;
  border-image: url('./assets/grass-border.svg') 10% round;
  width: 50%;
  margin: 0 auto;
}
</style>
