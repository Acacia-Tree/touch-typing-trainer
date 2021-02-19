<template>
  <menu class="typing-area__menu">
    <button 
    v-if="!hasTypingTestStarted && !isTypingTestFinished"
    class="typing-area__menu-button"
    type="button" 
    name="start" 
    ref="start-button"
    @click="onStart"
    >Начать</button>

    <button 
    v-if="hasTypingTestStarted || isTypingTestFinished"
    class="typing-area__menu-button"
    type="button" 
    name="restart" 
    @click="onRestart"
    >Заново</button>
  </menu>
</template>

<script>
export default {
  name: 'TypingAreaMenu',
  props: {
    isTypingTestFinished: Boolean,
    hasTypingTestStarted: Boolean
  },
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
    background: green;
    color: white;
    border-radius: 20px;
  }
  .typing-area__menu-button:hover {
    background: darkgreen;
  }
</style>