<script>
</script>
<span class="chargeur"></span>
<style lang="scss">

  .chargeur {
    width: 50px;
    height: 165px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      width: 16px;
      height: 16px;
      background: #c76131;
      border-radius: 50%;
      animation: bounce 2s linear infinite;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      height: 48px;
      width: 48px;
      background: #015335;
      border-radius: 4px;
      animation: rotate 2s linear infinite;
    }
  }

  @keyframes bounce {
    0%, 50%, 100% {
      transform: translate(-50%, 0px);
      height: 20px;
    }
    20% {
      transform: translate(-25%, 85px);
      height: 28px;
    }
    25% {
      transform: translate(-25%, 110px);
      height: 12px;
    }
    70% {
      transform: translate(-75%, 85px);
      height: 28px;
    }
    75% {
      transform: translate(-75%, 108px);
      height: 12px;
    }
  }

  @keyframes rotate {
    0%, 50%, 100% {
      transform: rotate(0deg)
    }
    25% {
      transform: rotate(90deg)
    }
    75% {
      transform: rotate(-90deg)
    }
  }

</style>