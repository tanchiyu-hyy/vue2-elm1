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
  </div>
</template>

<script>
  import HeadTop from 'src/components/header/headTop'
  import { msiteAddress, msiteFoodTypes, cityGuess } from 'src/service/getData'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'
  export default {
    data() {
      return {
        geohash: '', // city页面传递过来的地址geohash
        foodTypes: [], // 食品分类列表
        msiteTitle: '请选择地址...', // msite页面头部标题
      }
    },
    methods: {
      // 解码url地址，求去restaurant_category_id值
      getCategoryId(url) {
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
        console.log(urlData);
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";
  .food_types_container {
    display: flex;
    flex-wrap: wrap;
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