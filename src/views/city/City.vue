<template>
  <div class="city-container">
    <header-top :head-title="currentCity" :go-back="true" class="header-top">
    <router-link slot="changeCity" :to="{name:'home'}" class="change-city">
    <span>切换城市</span>
  </router-link>
    </header-top>
    <!-- 地址搜索 -->
    <form class="city-form" @submit.prevent>
      <div class="form-inner">
        <div>
        <input type="search" placeholder="输入学校、商务楼、地址" class="city-input input-style" required name="city" v-model="inputValue">
      </div>
      <div>
        <input type="submit" value="提交" class="input-submit input-style" @click="getPosiSearch({city_id:$route.cityid,keyword :inputValue })">
      </div>

      </div>

    </form>
    <!-- 搜索历史 -->
    <header class="search-history" >搜索历史</header>
    <ul class="poisearchul">
      <li v-for="(item,index) in placeList" :key="index" @click="nextPage">
      <h4 class="search-name">{{item.name}}</h4>
      <span class="search-addr">{{item.address}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import HeaderTop from '@/components/header/Header.vue'
import {
  currentCity,
  posiSearch
} from '@/service/getData.js'
import { setStorage, getStorage } from '@/config/utils.js'
export default {
  name: 'MyCity',
  components: {
    HeaderTop
  },
  data () {
    return {
      currrentCityId: '',
      currentCity: '',
      inputValue: '',
      placeList: [] // 搜索结果列表
    }
  },
  mounted () {
    // 从路由中获取城市id
    this.getCurrentCity({ id: this.$route.params.cityid })
    this.getPosiSearch()
  },
  methods: {
    // 获取当前定位城市
    async getCurrentCity (obj) {
      const { data } = await currentCity(obj)
      this.currentCity = data.name
      console.log(this.currentCity)
    },
    // 搜索地址
    async getPosiSearch (obj) {
      if (this.inputValue) {
        const { data } = await posiSearch(obj)
        this.placeList = data
        console.log(this.placeList, 'poisearch')
      }
    },
    /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
    nextPage () {

    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin.scss';
.city-container {
  padding-top: 2.35rem;
  .header-top {
    margin-bottom: 0.4rem;
  }
::v-deep .change-city {

    position: absolute;
    top: 0;
    right: 0.4rem;
    @include ct;
    span {
      @include sc(0.6rem, #fff) ;

    }

}
.city-form {

  padding-top: 0.4rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  .form-inner {
    margin: 0 auto;
    width: 90%;
    .city-input {
    border:1px solid #e4e4e4;
    padding:0 0.3rem;
    margin-bottom: 0.4rem;
    @include sc(0.65rem,#333);
  }
  .input-submit {
    background: $blue;
    margin-bottom: 0.4rem;
    @include sc(0.65rem,#fff)
  }
  }

}
.search-history {
  padding-left: 0.5rem;
  border-bottom: 1px solid #e4e4e4;
  @include font(0.475rem,0.8rem)
}
.poisearchul {
  background: #fff;
  border-top: 1px solid #e4e4e4;
  li {
    width: 90%;
    margin:0 auto 0.55rem;
    border-bottom: 1px solid #e4e4e4;
    .search-name {
      @include sc(0.65rem,#333)
    }
    .search-addr {
      @include sc(0.45rem,#999)
    }
  }
}

}
.input-style {
  border-radius: 0.1rem;
  width: 100%;
  height: 1.4rem;
}

</style>
