<template>
  <main class="typing-area-wrapper">
    <div class="typing-area">

    <TypingAreaResultSign 
    v-if="isTypingTestFinished" 
    :formattedTypingAccuracy="formattedTypingAccuracy" 
    :formattedPureTypingSpeed="formattedPureTypingSpeed"/>
    
    <input 
    class="typing-area__input"
    type="text" 
    disabled
    ref="typing-input" 
    @keydown="keyMonitor">
    
    <article 
    class="typing-area__text">
      <span 
      class="typing-area__text-span"
      v-for="(letter, index) in text" 
      :key="index"
      >{{letter}}</span>
    </article>

    <TypingAreaStats 
    v-if="!isTypingTestFinished" 
    :formattedTypingAccuracy="formattedTypingAccuracy" 
    :formattedPureTypingSpeed="formattedPureTypingSpeed"/>

    <TypingAreaMenu 
    @on-start="startTypingTest" 
    @on-restart="restartTypingTest"/>
    </div>
  </main>
  
</template>

<script>
import TypingAreaMenu from '../components/TypingAreaMenu.vue';
import TypingAreaStats from '../components/TypingAreaStats.vue';
import TypingAreaResultSign from '../components/TypingAreaResultSign.vue';

export default {
  name: 'TypingArea',
  components: {
    TypingAreaMenu,
    TypingAreaStats,
    TypingAreaResultSign
  },
  data() {
    return {
      text: '',
      typedTextArray: [],
      numberOfSentences: 8,
      numberOfTypos: 0,
      typingTimer: null,
      minutesSpentTyping: 0,
      isTypingTestFinished: true,//false
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
    },
    finishedTypingTest() {
      clearInterval(this.typingTimer);
      this.$refs['typing-input'].readonly = true;
      this.isTypingTestFinished = true;
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
    noTypingDataYet() {
      return (this.minutesSpentTyping === 0 || !(this.typedTextArray.length > 0));
    },
    typingAccuracy() {
      if (this.isTypedTextCorrect == true && this.text.length != 0 && this.typedTextArray.length === this.text.length) {
        this.finishedTypingTest();
      }
      if (this.noTypingDataYet) {
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
      if (this.noTypingDataYet) {
        return 0;
      } else {
        return (this.typingSpeed - (this.numberOfTypos / this.minutesSpentTyping));
      }
    },
    formattedPureTypingSpeed() {
      return Math.round(this.pureTypingSpeed) + ' зн./мин'
    },
    
  }
}
</script>

<style>
.typing-area-wrapper {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.typing-area {
  min-height: 450px;
  min-width: 320px;
  display: flex;
  flex-wrap: wrap;
  background: #F3F8F1; 
  background-clip: content-box;
  justify-content: center;
  border: 30px solid transparent;
  border-image: url('../assets/grass-border.svg') 10% round;
  margin: 0 auto;
}

.typing-area__input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.typing-area__text {
  max-width: 500px;
  text-align: left;
}

.typing-area__text-span {

}
</style>