<template>
  <header id="header-top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="goBack" v-if="goBack" @click="$router.go(-1)" >
      <svg-icon icon-class="goBack" class="icons" ></svg-icon>
    </section>
    <router-link :to="{name:'login'}" class="head-login">
      <span class="login-span">登陆 | 注册</span>

    </router-link>
    <section v-if="headTitle" class="title-header ellipsis">
      <span >{{headTitle}}</span>
    </section>
    <slot name="changeCity"></slot>
    <slot name="msite-title"></slot>

  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderTop',
  props: ['headTitle', 'goBack', 'changeCity'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

#header-top {
  position: fixed;
  position: absolute;
  left: 0;
  top: 0;
  background-color: $blue;

   .goBack {
  float: left;
  color:$fc;

  .icons {
  position: absolute;
  top:0.581rem;
  left:0.4rem;

}
}

  @include wh(100%, 1.95rem);
  & .head-login{
    position: fixed;
    right: 0.55rem;
    .login-span {
    @include sc(0.7rem, #fff);

  }

  }
  .title-header {
    position: absolute;
    top:50%;
    left:50%;
    transform: translateY(-50%) translateX(-50%);
    text-align: center;

    span {
      @include sc(0.8rem, #fff);
      font-weight: bold;

    }

  }

}
.ellipsis {
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>
