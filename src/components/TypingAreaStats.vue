<template>
  <div class="typing-area__stats">
    <span class="typing-area__stats-accuracy">{{formattedTypingAccuracy}} </span>
    <span class="typing-area__stats-speed"> {{formattedPureTypingSpeed}}</span>
  </div>
</template>

<script>
export default {
  name: 'TypingAreaStats',
  props: {
    formattedTypingAccuracy: String,
    formattedPureTypingSpeed: String
  }
}
</script>

<style>
.typing-area__stats {
  margin-left: 40px;
}

.typing-area__stats-accuracy {

}

.typing-area__stats-speed {
  margin-left: 20px;

}
</style>