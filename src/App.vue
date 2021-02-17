<template>
  <header>
    <h1>Тренажер слепой печати</h1>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
