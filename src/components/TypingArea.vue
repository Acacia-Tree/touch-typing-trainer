<template>
  <input 
  type="text" 
  disabled
  ref="typing-input" 
  class="typing-area__input"
  @keydown="keyMonitor">
  
  <div>
    <span 
    v-for="(letter, index) in text" 
    :key="index"
    >{{letter}}</span>
  </div>
  <div>{{formattedTypingAccuracy}}</div>
  <div>typing speed: {{formattedPureTypingSpeed}}</div>
  <TypingAreaMenu @on-start="startTypingTest" @on-restart="restartTypingTest"/>
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
      minutesSpentTyping: 0,/////
      loading: true,
      errored: false
    }
  },
  mounted() {
    this.getText();
  },
  beforeUnmount() {
    clearInterval(this.typingTimer);
  },
  methods: {
    getText() {
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
    startTypingTest() {
      this.typingTimer = setInterval(() => {
        this.minutesSpentTyping += 1/60;
      }, 1000); 
      this.$refs['typing-input'].disabled = false;
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
    },
    restartTypingTest() {
      this.getText();
      clearInterval(this.typingTimer);
      this.$refs['typing-input'].value = ''; 
      this.typedTextArray = [];
      this.numberOfTypos = 0;
      this.minutesSpentTyping = 0;
      this.typingTimer = null,
      this.startTypingTest();
      
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
      if (this.minutesSpentTyping === 0 || !(this.typedTextArray.length > 0) ) {
        return 100;
      } else if ((this.typedTextArray.length - this.numberOfTypos) <= 0) {
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
      if (this.minutesSpentTyping === 0 || !(this.typedTextArray.length > 0) ) {
        return 0;
      } else {
        return (this.typingSpeed - (this.numberOfTypos / this.minutesSpentTyping));
      }
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