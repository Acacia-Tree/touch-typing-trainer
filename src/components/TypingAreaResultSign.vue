<template>
  <div class="typing-area__result-sign-wrapper">
    <div class="typing-area__result-sign">
      <div class="typing-area__result-sign-text">
          <span>Поздравляем с результатами!</span>
          <span>У вас точность {{formattedTypingAccuracy}}</span>
          <span>А скорость аж {{formattedPureTypingSpeed}} !</span> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypingAreaResultSign',
  props: {
    formattedTypingAccuracy: String,
    formattedPureTypingSpeed: String
  }
}
</script>

<style>

</style>