<template>
  
  <div>
    <button 
    type="button" 
    name="start" 
    @click="onStart"
    >Начать</button>
    
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
    }
  }
}
</script>

<style>

</style>