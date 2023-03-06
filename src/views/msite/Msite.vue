<template>
  <div class="msite-container">
    <header-top>
      <router-link :to="{ name: 'home' }" slot="msite-title">
        <span class="msite-title">{{ msiteTitle }}</span>
      </router-link>
    </header-top>
    <!-- msite导航 -->
    <nav class=" msite-nav" >
      <swiper ref="mySwiper"  :options="swiperOptions" >
        <swiper-slide v-for="(item,index) in foodType" :key="index" class="food-container">
          <router-link to="#" class="food-link " v-for="foodItem in item" :key="foodItem.id" >
            <figure>
              <img :src="imgBaseUrl + foodItem.image_url">
              <figcaption>{{foodItem.title}}</figcaption>
            </figure>

          </router-link>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white">1</div>

      </swiper>
    
    </nav>
    <!-- 附近商家 -->
    <div class="shoplist-container">
      <div class="shoplist-header">
        <svg-icon icon-class="shop"></svg-icon>
        <span class="shop-title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>

    <!-- 底部导航 -->
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import HeaderTop from '@/components/header/Header.vue'
import ShopList from '@/components/common/ShopList.vue'
import FooterBottom from '@/components/footer/Footer.vue'
import { msiteFoodType, guessCity } from '@/service/getData.js'
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import "swiper/css/swiper.min.css";
import {msiteAddress} from '@/service/getData.js'




export default {
  name: 'MyMsite',
  components: {
    HeaderTop,
    ShopList,
    FooterBottom,
    Swiper,
    SwiperSlide
    
  },
  data() {
    return {
      swiperOptions:{
        loop:true,
        pagination:{
          el:'.swiper-pagination',
          clickable: true
        }
      },
      msiteTitle: '请选择地址……', // msite头部
      geohash: '', // 页面传来的geohash
      foodType: [], //食品分类列表
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await guessCity()
      this.geohash = address.latitude + ',' + address.longitude
    } else {
      this.geohash = this.$route.query.geohash
    }
    const {data} =  await msiteAddress(this.geohash)
    
    this.msiteTitle = data.name
    const latitude = '28.15894'
    const longitude = '112.986899'
    this.RECORD_ADDRESS({latitude,longitude})
    
  },
  mounted() {
    this.getFoodType(this.geohash)
    
   
  },
  computed:{
    // 初始化swiper
    customswiper() {
      let swiper = this.$refs.mySwiper.$swiper
      console.log(this.foodType,'this.foodType');
      return swiper

    }
  },
  methods: {
    ...mapMutations([
    'RECORD_ADDRESS',

    ]),
    async getFoodType(geohash) {
      const { data } = await msiteFoodType(geohash)
      let resLength = data.length
      let resArr = data
      let foodArr = []
      // 将导航分成两页，每页8个
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8)
      }
      this.foodType = foodArr
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.msite-container {
  // food标题部分
  .msite-title {
    @include sc(0.8rem, #fff);
    text-align: center;
  }
  // food导航部分
  .msite-nav {
    padding-top: 2.1rem;
    width: 100%;
    height: 10.6rem;    
      position: relative;
   .swiper-pagination {
        position: absolute;
        left: 7.5rem;
        bottom: 0.2rem;
       
       
      }

      .food-container {
        display: flex;
        flex-wrap: wrap;
        

        .food-link {
          width: 25%;
          padding: 0.3rem 0;
          @include fj(center);

          figure {
            img {
              @include wh(1.8rem, 1.8rem);
              margin-bottom: 0.3rem;
            }
            figcaption {
              @include sc(0.55rem, #666);
              text-align: center;
              margin-bottom: 0.3rem;
            }
          }
        }
      }
    
  }
}
</style>
