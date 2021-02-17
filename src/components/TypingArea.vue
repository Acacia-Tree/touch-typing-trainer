<template>
  <input 
  type="text" 
  ref="typing-input" 
  class="typing-area__input"
  @keydown="keyMonitor"
  >
  <div>
    <span 
    v-for="(letter, index) in text" 
    :key="index"
    >{{letter}}</span>
  </div>
  <div>{{isTypedTextCorrect}}</div>
  <TypingAreaMenu @on-start="focusOnInput"/>
</template>

<script>
import TypingAreaMenu from '../components/TypingAreaMenu.vue';

export default {
  name: 'TypingArea',
  components: {
    TypingAreaMenu
  },
  data() {
    return {
      text: '',
      typedTextArray: [],
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
  },
  methods: {
    focusOnInput() {
      //focus on hidden input
      this.$refs['typing-input'].focus();    
    },
    keyMonitor(event) {
      if (event.key != "Shift" && event.key != "Enter") {//не ошибка
        this.typedTextArray.push(event.key);
      }
    }
  },
  computed: {
    textArray() {
      return this.text.split('');
    },
    isTypedTextCorrect() {
      let i = this.typedTextArray.length;
      if (this.typedTextArray[i - 1] !== this.textArray[i - 1]) {
        return false;
      } else {
        return true;
      }
    }
    
  }
}
</script>

<style>
.typing-area__input {
  
}
</style>