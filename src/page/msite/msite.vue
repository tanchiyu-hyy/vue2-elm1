<template>
  <div>
    <HeadTop signin-up='msite'>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </HeadTop>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <ShopList v-if="hasGetData" :geohash="geohash"></ShopList>
    </div>
    <FootGuide></FootGuide>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import ShopList from 'src/components/common/shoplist'
  import HeadTop from 'src/components/header/headTop'
  import FootGuide from 'src/components/footer/footGuide'
  import { msiteAddress, msiteFoodTypes, getCity } from 'src/service/getData'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'
  export default {
    data() {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
        geohash: '', // city页面传递过来的地址geohash
        foodTypes: [], // 食品分类列表
        msiteTitle: '请选择地址...', // msite页面头部标题
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ]),
      // 解码url地址，求去restaurant_category_id值
      getCategoryId(url) {
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id
        } else {
          return ''
        }
      }
    },
    mounted() {
      //获取导航食品类型列表
      msiteFoodTypes(this.geohash).then(res => {
        let resLength = res.data.length;
        let resArr = [...res.data]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      }).then(() => {
        //初始化swiper
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true
        });
      })
    },
    components: {
      HeadTop,
      FootGuide,
      ShopList
    },
    async beforeMount() {
      if (!this.$route.query.geohash) {
        // 获取首页默认地址
        const res = await getCity('guess');
        const address = res.data;
        this.geohash = address.latitude + ',' + address.longitude;
      } else {
        this.geohash = this.$route.query.geohash
      }
      //获取位置信息
      let res = await msiteAddress(this.geohash);
      this.msiteTitle = res.data.name;
      //保存geohash 到vuex
      this.SAVE_GEOHASH(this.geohash);
      this.RECORD_ADDRESS(res.data);

      this.hasGetData = true;
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";
  .shop_list_container {
    margin-top: 0.4rem;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
    .shop_header {
      .shop_icon {
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;
        @include wh(0.6rem, 0.6rem);
      }
      .shop_header_title {
        color: #999;
        @include font(0.55rem, 1.6rem);
      }
    }
  }
  .food_types_container {
    display: flex;
    flex-wrap: wrap;
    .link_to_food {
      width: 25%;
      padding: 0.3rem 0rem;
      @include fj(center);
      figure {
        img {
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption {
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }
  .msite_nav {
    padding-top: 2.1rem;
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 10.6rem;
    .swiper-container {
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination {
        bottom: 0.2rem;
      }
    }
  }
  .msite_title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text {
      @include sc(0.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
</style>