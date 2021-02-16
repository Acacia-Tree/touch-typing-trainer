<template>
  <input type="text">
  <div>
    {{info}}
  </div>
</template>

<script>

export default {
  name: 'TypingArea',
  data() {
    return {
      h1: "Тренажер слепой печати",
      info: null
    }
  },
  mounted() {
    this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response));
  }
  //Обработка ошибок
  
}
</script>

<style>

</style>