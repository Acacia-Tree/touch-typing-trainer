<template> 
  <div class="typing-area__result-sign-wrapper">
    <button
    class="typing-area__result-sign-button" 
    data-bs-target="#collapseTarget" 
    data-bs-toggle="collapse">
    Результаты</button>
    <div 
    class="typing-area__result-sign collapse show" 
    id="collapseTarget"
    ref="collapse-sign" >
      <div class="typing-area__result-sign-text ">
          <span class="typing-area__result-text-span typing-area__result-text-main">Поздравляем с результатами!</span>
          <span class="typing-area__result-text-span">У вас точность {{formattedTypingAccuracy}}</span>
          <span class="typing-area__result-text-span">А скорость аж {{formattedPureTypingSpeed}} !</span> 
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
  .typing-area__result-sign-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .typing-area__result-sign-button {
    
  }

  .typing-area__result-sign {
    width: 50%;
    height: 100%;
    min-width: 320px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .typing-area__result-sign-text {
    min-height: 400px;
    max-width: 957px;
    max-height: 1111px;
    background: url('../assets/wood-sign.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .typing-area__result-text-span {
    display: block;
    font-weight: bold;
    font-size: max(16px, 1.2vmax);
    line-height: 120%;
    letter-spacing: 0.05em;
    color: rgb(18, 78, 36);
    margin-top: min(13.5%, 45px);
    margin-bottom: 25px;
    margin-left: 12%;
    margin-right: 6.5%;
  }
  .collapsing .typing-area__result-text-span {
    color: transparent;
  }
  .typing-area__result-text-main {
    font-weight: bold;
    font-size: max(19px, 1.65vmax);
    line-height: 145%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgb(18, 78, 36);
    margin-top: max(12%, 70px);
    margin-bottom: 10%;
    margin-left: 12%;
    margin-right: 6.5%;
  }

</style>