<template>
<div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
  <div class="bounce4"></div>
  <div class="bounce5"></div>
</div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped>
  .spinner {
    width: 120px;
    text-align: center;
    position: relative;
    left: 400px;
  }
  .spinner>div {
    position: relative;
    width: 12px;
    height: 12px;
    background-color: #67CF22;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 2.8s infinite ease-in-out;
    animation: bouncedelay 2.8s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    background-color: #67CF22;
  }
  .spinner .bounce2 {
    animation-delay: 0.15s;
    left: -35px;
    background-color: #b07da8;
  }
  .spinner .bounce3 {
    animation-delay: 0.3s;
    left: -70px;
    background-color: #f1b428;
  }
  .spinner .bounce4 {
    animation-delay: 0.45s;
    left: -105px;
    background-color: #95c0ea;
  }
  .spinner .bounce5 {
    animation-delay: 0.6s;
    left: -140px;
    background-color: #46b646;
  }
  @keyframes bouncedelay {
      0%{
          transform: translate(-400px,0);
      }
      30%, 70% {
        transform: translateX(0);
      }
      100% {
          transform: translate(400px, 0);
      }
    }
</style>