<template>
  <div id="home-container">
    <!-- 头部 -->
    <header-top>
      <span slot="logo" class="header-logo" @click="reload">elm.digua</span>
    </header-top>
    <!-- 当前定位城市 -->
    <div>
      <nav class="city-nav">
        <div class="city-nav-header">
          <span class="city-tip">当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="`/city/${guessCityId}`"  class="guess-city">
          <span>{{ guessCity }}</span>
          <svg-icon icon-class="arrowRight" class="icons" />
        </router-link>
      </nav>
    </div>
    <!-- 热门城市 -->
    <div class="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear" >
        <router-link tag='li' v-for="item in hotCity" :key="item.id" :to="`/city/${item.id}`" class="ellipsis">{{item.name}}</router-link>
      </ul>
    </div>
    <!-- 所有城市 -->
    <section class="group-city-container clear">

      <ul class="letter-classify clear">
        <li v-for="(value,key,index) in sortGroupCity" :key="key">
          <h4 class="city_title" >{{ key }} <span v-if="index === 0">（按字母排序）</span></h4>

          <ul class="letter-classify-ul citylistul clear">
            <router-link tag='li' v-for="item in value" :key="item.id" :to="`/city/${item.id}`" class="letter-classify-li ellipsis">{{item.name}}</router-link>
          </ul>

        </li>

      </ul>

    </section>
    <loading-vue v-show="showLoading"></loading-vue>
  </div>
</template>

<script>
import HeaderTop from '@/components/header/Header.vue'
import { guessCity } from '@/service/getData.js'
import store from '@/store'

export default {
  name: 'MyHome',
  components: {
    HeaderTop
  },
  data () {
    return {
      guessCityId: '',
      guessCity: '',
      hotCity: [],
      groupCity: {},
      showLoading:true
    
    }
  },
  mounted () {
    this.getGuessCity({ type: 'guess' })
    this.getGuessCity({ type: 'hot' })
    this.getGuessCity({ type: 'group' })
  },
  methods: {
    async getGuessCity (obj) {
      const { data } = await guessCity(obj)
      if(data) {
        store.commit('handleLoading',false)
        

      }else {
        store.commit('handleLoading',true)
       
      }
      this.showLoading = store.state.showLoading
      if (obj.type === 'guess') {
        this.guessCityId = data.id
        this.guessCity = data.name
      } else if (obj.type === 'hot') {
        this.hotCity = data
      } else {
        this.groupCity = data
      }
    },
    reload () {
      window.location.reload()
    }
  },
  computed: {
    sortGroupCity () {
      const sortObj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)]
        }
      }

      return sortObj
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
#home-container {

  padding-top: 1.95rem;
  .header-logo {
    @include sc(0.7rem, #fff);
    padding-left: 0.4rem;
  }
}
.city-nav {
  background-color: #fff;
  @include sc(0.55rem, #666);

margin-bottom: 0.4rem;
  .city-nav-header {
    display: flex;
    justify-content: space-between;
    height: 1.45rem;
    line-height: 1.45rem;
    border-bottom: 2px solid #e4e4e4;
    padding: 0 0.45rem;
    span:nth-child(2) {
      @include sc(0.475rem, #9f9f9f);
      font-weight: 900;
    }
  }
  .guess-city {
    display: flex;
    justify-content: space-between;
    height: 1.8rem;
    line-height: 1.8rem;
    border-bottom: 2px solid $bc;
    padding: 0 0.45rem;

    & span {
      @include sc(0.75rem, #3190e8);
    }
  }
  .icons {
    fill: #999;
    padding-top: 0.45rem;
  }
}
.hot_city_container {
  background: #fff;
  margin-bottom: 0.4rem;

}
.city_title {
    padding: 0 0.45rem;
    @include sc(0.55rem, #666);
    border-bottom: 2px solid $bc;
    height: 1.4888rem;
    line-height: 1.4888rem;
    background: #fff;
    border-top: 2px solid $bc;

  }
  .citylistul {
    margin-bottom: 0.4rem;
    background: #fff;

    li {
      cursor: pointer;
      background: #fff;
      float:left;
      text-align: center;
      color:$blue;
      border-bottom: 2px solid $bc;
      border-right: 2px solid $bc;
      @include font(0.6rem, 1.75rem);
      @include wh(25%,1.75rem);
      overflow: hidden;

    }
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
.letter-classify-ul {
  .letter-classify-li {
    color: #666;
  }

}

</style>
