<template>
  <div>
    <span>{{formattedTypingAccuracy}} </span>
    <br>
    <span> {{formattedPureTypingSpeed}}</span>
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