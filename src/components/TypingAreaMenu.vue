<template>
  <menu class="typing-area__menu">
    <button 
    class="btn btn-primary typing-area__menu-button"
    type="button" 
    name="start" 
    ref="start-button"
    @click="onStart"
    >Начать</button>

    <button 
    class="btn btn-primary typing-area__menu-button"
    type="button" 
    name="restart" 
    @click="onRestart"
    >Заново</button>
  </menu>
</template>

<script>
export default {
  name: 'TypingAreaMenu',
  data() {
    return {
      h1: "Тренажер слепой печати"
    }
  },
  methods: {
    onStart() {
      this.$emit('on-start');
    },
    onRestart() {
      this.$emit('on-restart');
    }
  }
}
</script>

<style>
  .typing-area__menu {

  }

  .typing-area__menu-button {
    margin-left: 20px; 
  }
</style>