<template>
  <div class="footer-container">
    <div
      class="footer-item"
      @click="gotoAddress({ name: 'msite' ,query:{geohash}})"
    >
      <svg-icon icon-class="home" 
      :class="$route.path.indexOf('msite') !== -1 ? 'icon-style icon-active':'icon-style'">
       
    </svg-icon>
      <span>外卖</span>
    </div>
    <div class="footer-item" @click="gotoAddress({ name: 'search' })">
      <svg-icon icon-class="search" class="icon-style"
      :class="$route.path.indexOf('search') !== -1 ? 'icon-style icon-active':'icon-style'">
        
      </svg-icon>
      <span>搜索</span>
    </div>
    <div class="footer-item" @click="gotoAddress({ name: 'order' })">
      <svg-icon icon-class="order" 
      :class="$route.path.indexOf('order') !== -1 ? 'icon-style icon-active':'icon-style'"></svg-icon>
      <span>订单</span>
    </div>
    <div class="footer-item" @click="gotoAddress({ name: 'profile' })">
      <svg-icon icon-class="person" class="icon-style"></svg-icon>
      <span>我们</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MyFooter',
  methods: {
    gotoAddress(path) {
      this.$router.push(path)
    }
   
  },
  computed:{
     ...mapState([
      'geohash'
     ])
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.footer-container {
  background: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  .footer-item {
    display: flex;
    width: 25%;
    text-align: center;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .icon-style {
    @include wh(0.8rem, 0.8rem);
  }
  .icon-active {
    fill:#007aff;
  }
  span {
    @include sc(0.45rem, #666);
  }
}
</style>

