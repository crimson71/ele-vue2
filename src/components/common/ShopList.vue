<template>
  <div class="shoplist-container">
    <ul class="shoplist-ul">
      <router-link
        :to="{ name: 'home' }"
        v-for="item in shopList"
        :key="item.id"
        class="shop-li"
      >
        <section class="img-left">
          <img :src="imgBaseUrl + item.image_path" class="shop-img " />
        </section>
        <hgroup class="shoplist-right">
          <header class="shop-detail-header">
            <!-- 判断是否是品牌，是就添加品牌标志 -->
            <h4 :class="item.is_premium ? 'premium' : ''" class="shop-name ellipse ">
              {{ item.name }}
            </h4>
            <ul class="support-ul">
              <li
                v-for="supportItem in item.supports"
                :key="supportItem.id"
                class="supports"
              >
                {{ supportItem.icon_name }}
              </li>
            </ul>
          </header>
          <h5 class="rating-order-num">
            <section class="rate-section-left">
              <!-- 引入星级组件 -->
              <rating-star :rating="item.rating"></rating-star>
              <span class="rate-num">{{item.rating}}</span>
              <span class="sale-num">月售{{item.recent_order_num}}单</span>
            </section>
            <section class="rate-section-right">
              <span v-if="item.delivery_mode" class="delivery-left delivery-style">{{item.delivery_mode.text}}</span>
              <span v-if="zhunState(item.support)" class="delivery-right delivery-style">准时达</span>
            </section>
          </h5>
          <h5 class="fee-distance">
            <div class="fee">￥{{item.float_minimum_order_amount}}起送/配送费约￥{{item.float_delivery_fee
}}</div>
            <div class="distance">
              <span>{{item.distance}}</span>/
              <span>{{item.order_lead_time}}</span>
            </div>
          </h5>
        </hgroup>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { imgBaseUrl } from '@/config';
import { shopList } from '@/service/getData.js'
import RatingStar from './RatingStar.vue'
export default {
  name: 'ShopList',
  components: {
    RatingStar
  },
  data() {
    return {
      shopList: [], //店铺列表
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20,
      imgBaseUrl: 'https://elm.cangdu.org/img/'
    }
  },
  props: ['restaurantCategoryId'],
  computed: {
    ...mapState(['latitude', 'longitude'])
  },
  mounted() {
    // 一次性获取20条数据
    this.offset = 20
    this.initiDate({
      latitude: '28.15894',
      longitude: '112.986899',
      offset: this.offset,
      restaurant_category_id: this.restaurantCategoryId
    })
  },
  methods: {
    // 初始化店铺列表数据
    async initiDate(obj) {
      const { data } = await shopList(obj)
      this.shopList = data
      // console.log(this.shopList, 'shoplist')
    },
    zhunState(support) {
      let zhunshi = true
      if((support instanceof Array) && support.length) {
        let index = support.indexOf(item => item.icon_name === '准')
        if(index !== -1) {
          zhunshi = true
        }else {
          zhunshi = false
        }
      }
      return zhunshi

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.shoplist-container {
  .shoplist-container {
    .shop-li {
      display: flex;
      border-bottom: 0.025rem solid grey;
      padding: 0.7rem 0.4rem;
      .img-left {
        .shop-img {
          @include wh(2.7rem, 2.7rem);
          padding-right: 0.4rem;
        }
      }
      .shoplist-right {
        flex:auto;
        .premium::before {
          content: '品牌';
          background: #ffd930;
          @include font(0.5rem, 0.6rem);
          padding: 0 0.1rem;
          margin-right: 0.2rem;
          color: #333;
        }
        .shop-detail-header {
          display: flex;
          justify-content: space-between;
          .shop-name {
            width: 8.5rem;
            @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
            font-weight: 700;
          }
          .support-ul {
            .supports {
              float: left;
              font-size: 0.5rem;
              color: #999;
              border: 0.025rem solid #f1f1f1;
              padding: 0 0.04rem;
              margin-left: 0.05rem;
            }
          }
        }
        .rating-order-num {
          display: flex;
          justify-content: space-between;
          .rate-section-left {
          display: flex;
          margin-top: 0.5rem;
          .rate-num {
          font-size: 0.4rem;
          color:#ff6000;
          margin: 0 0.2rem;
        }
        .sale-num {
          @include sc(0.4rem,#666)
        }

        }
        .rate-section-right {
          align-items: center;
          margin-top: 0.52rem;
          min-width: 5rem;
          display: flex;
          justify-content: flex-end;
          .delivery-left {
            color:#fff;
            background: #3190e8;
            
          }

        }
        }
        .fee-distance {
          display: flex;
          margin-top: 0.52rem;
          justify-content: space-between;
          @include sc(0.5rem,#666);
         
          .distance {
            span:nth-child(2) {
              color:$blue;
            }


          }

        }
       
        
      }
    }
  }
}
.delivery-style {
  font-size: 0.4rem;
  padding:0rem 0.08rem ;
  border-radius: 0.08rem;
  margin-left: 0.08rem;
  border:1px solid #3190e8;
}
.ellipse {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
