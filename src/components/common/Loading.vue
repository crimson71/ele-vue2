<template>
  <div class="loading-container">
    <div class="loading-img" :style="{backgroundPositionY:-(positionY%7)*2.5+'rem'}">
      <svg-icon icon-class="ellipse" class="icon-ellipase"></svg-icon>
    </div>
    
  </div>
</template>

<script>
export default {
  name:'LoadingAnima',
  data() {
    return {
      positionY:0,
      timer:null
    }
  },
  mounted() {
    this.timer= setInterval(() => {
      this.positionY++
    },600)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }

}
</script>

<style lang="scss">
@import '../../style/mixin.scss';

@keyframes load {
  0% {transform:translateY(0px);}
  50% {transform:translateY(-50px);}  
  100% {transform:translateY(0px);}
    
}

@keyframes ellipase {
  0% {transform: scale(1);}
  50% {transform: scale(.3);}
  100% {transform: scale(1);}
}
.loading-container {
  @include wh(2.5rem,2.5rem);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .loading-img {
    width: 100%;
    height: 100%;
    background: url(../../assets/images/icon_loading.png) no-repeat 0 0;
    background-size: 2.5rem auto;
    transform: translateY(-50px);
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 11;
    .icon-ellipase {
      position: absolute;
      top: 2.5rem;
      left: 0rem;
      @include wh(2.5rem,1.6rem);
      z-index: 11;
      animation: ellipase .6s infinite ease-in-out;
    }
  }

}


</style>