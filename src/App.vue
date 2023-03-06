<template>
  <div>
    <!-- mode="out-in" 先离开再出现， in-out先出现再离开 -->
    <transition name="router-fade" mode="out-in">
      <!-- keepalive设置页面缓存 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />        
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">     
      <!-- keepalive设置页面缓存 -->
      <keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />        
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import './style/comm.scss';
.router-fade-enter-active,
.router-fade-leave-active{
  transition: opacity .3s;;
}
.router-fade-enter ,
.router-fade-leave-active {
  opacity: 0;
}
</style>
