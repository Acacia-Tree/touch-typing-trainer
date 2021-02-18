<template>
  
  <div>
    <button 
    type="button" 
    name="start" 
    ref="start-button"
    @click="onStart"
    >Начать</button>

    <button 
    type="button" 
    name="restart" 
    @click="onRestart"
    >Заново</button>
  </div>
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

</style>