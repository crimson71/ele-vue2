<template>
  <div class="rate-container">
    <div class="star-container">
      <svg-icon
        icon-class="star"
        v-for="num in 5"
        :key="num"
        class="grey-star"
      ></svg-icon>
    </div>
    <div :style="'width:' + (rating * 2) / 5 + 'rem'" class="star-overflow">
      <div class="star-container">
        <svg-icon
          icon-class="star"
          v-for="num in 5"
          :key="num"
          class="orange-star"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingStar',
  props: ['rating'],
  created() {
    // console.log(this.rating, 'rating')
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.rate-container {
  position: relative;
  @include wh(2rem, 0.4rem);
  .star-overflow {
    position: relative;
    overflow: hidden;
    height: 100%;
    top:0.01rem
  }
  .star-container {
    position: absolute;
    display: flex;
    width: 2rem;
    height: 0.4rem;
    top: -0.04rem;
    left: 0rem;
    
    .orange-star {
      fill: #ff9a0d;
    }
    .grey-star {
      fill: #d1d1d1;
    }
  }
}
</style>
