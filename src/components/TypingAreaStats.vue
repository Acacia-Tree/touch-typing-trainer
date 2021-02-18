<template>
  <div>
    <span>{{formattedTypingAccuracy}}</span>
    <span>typing speed: {{formattedPureTypingSpeed}}</span>
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

<style >
</style>