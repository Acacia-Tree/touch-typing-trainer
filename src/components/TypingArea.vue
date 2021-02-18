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
  <div ref="typing-accuracy">{{formattedTypingAccuracy}}</div>
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
      numberOfTypos: 0,
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

    this.$refs['typing-accuracy'].textContent = "100%";
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
    },
    handleTypo() {
      this.typedTextArray.pop();
      this.numberOfTypos++;
    }
  },
  computed: {
    textArray() {
      return this.text.split('');
    },
    isTypedTextCorrect() {
      let i = this.typedTextArray.length;
      if (this.typedTextArray[i - 1] !== this.textArray[i - 1]) {
        this.handleTypo();
        return false;
      } else {
        return true;
      }
    },
    typingAccuracy() {
      this.isTypedTextCorrect;
      console.log("typos: " + this.numberOfTypos);
      console.log("typedTextlength: " + this.typedTextArray.length);
      console.log("typedText: " + this.typedTextArray);
      if ((this.typedTextArray.length - this.numberOfTypos) <= 0) {
        return 0;
      } else {
        return (((this.typedTextArray.length - this.numberOfTypos + 1) / (this.typedTextArray.length + 1)) * 100);
      } 
    },
    formattedTypingAccuracy() {
      return (this.typingAccuracy % 1 === 0)? (this.typingAccuracy + '%') : (this.typingAccuracy.toFixed(1) + '%');
    }

    
  }
}
</script>

<style>
.typing-area__input {
  
}
</style>