<template>
  <input 
  type="text" 
  disabled
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
  <div ref="typing-speed">typing speed: {{formattedPureTypingSpeed}}</div>
  <TypingAreaMenu @on-start="startTypingTest"/>
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
      typingTimer: null,
      minutesSpentTyping: 0,
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
    this.$refs['typing-speed'].textContent = "0 зн./мин";
  },
  beforeUnmount() {
    clearInterval(this.typingTimer);
  },
  methods: {
    startTypingTest() {
      this.$refs['typing-input'].disabled = false;
      this.$refs['typing-input'].focus(); 
      this.typingTimer = setInterval(() => {
        this.minutesSpentTyping += 1/60;
      }, 1000); 
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
      if ((this.typedTextArray.length - this.numberOfTypos) <= 0) {
        return 0;
      } else {
        return (((this.typedTextArray.length - this.numberOfTypos + 1) / (this.typedTextArray.length + 1)) * 100);
      } 
    },
    formattedTypingAccuracy() {
      return (this.typingAccuracy % 1 === 0)? (this.typingAccuracy + '%') : (this.typingAccuracy.toFixed(1) + '%');
    },
    typingSpeed() {//CPM = ( Знаки без ошибки + Знаки с ошибками ) / Затраченное время в минутах
      return (this.typedTextArray.length + this.numberOfTypos) / this.minutesSpentTyping;
    },
    pureTypingSpeed() {//Чистая CPM = CPM - ( Знаки с ошибками / Затраченное время в минутах )
      return (this.typingSpeed - (this.numberOfTypos / this.minutesSpentTyping));
    },
    formattedPureTypingSpeed() {
      return Math.round(this.pureTypingSpeed) + ' зн./мин'
    }
    
  }
}
</script>

<style>
.typing-area__input {
  
}
</style>