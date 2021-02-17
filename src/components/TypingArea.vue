<template>
  <input type="text">
  <div>
    <span v-for="(letter, index) in text" :key="index">{{letter}}</span>
  </div>
</template>

<script>

export default {
  name: 'TypingArea',
  data() {
    return {
      text: '',
      numberOfSentences: 8,
      loading: true,
      errored: false
    }
  },
  mounted() {
    this.axios
      .get('http://metaphorpsum.com/sentences/' + this.numberOfSentences)
      .then(response => {
        this.text = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      }) 
      .finally(() => (this.loading = false));
  }
}
</script>

<style>

</style>