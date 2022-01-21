<template>
  <view class="content">
    <u-navbar
      :is-back="false"
      :background="navbarBackground"
      :border-bottom="false"
    >
      <view class="slot-wrap">
        <view class="navbar-search_wrap">
          <view
            class="navbar-location"
            :class="city == '定位中' ? 'loading' : ''"
          >
            <text class="navbar-city_text">{{ city }}</text>
          </view>
          <view class="navbar-search_btn">
            <text class="custom-icon custom-icon-icon-search"></text>
            <text class="navbar-search_placeholder"></text>
          </view>
        </view>

      </view>
    </u-navbar>
    <!--/ nav -->

    <view class="banner-wrap">
      <view class="banner">
        <u-swiper
          :list="bannerList"
          name="pic"
          :height="320"
          :border-radius="16"
        ></u-swiper>
      </view>
    </view>

    <u-tabbar v-model="current" :list="tabbarList"></u-tabbar>
  </view>
</template>

<script>
import * as location from '@/util/location';
export default {
  data() {
    return {
      navbarBackground: {
        background: '#ff6600',
      },
      city: '定位中',
      bannerList: [],

      tabbarList: [
        {
          iconPath: '/static/image/tabbar/index.png',
          selectedIconPath: '/static/image/tabbar/index_active.png',
          text: '首页',
          isDot: false,
          customIcon: true,
          pagePath: '/pages/index/index',
        },
        {
          iconPath: '/static/image/tabbar/mine.png',
          selectedIconPath: '/static/image/tabbar/mine_active.png',
          text: '我的',
          isDot: false,
          customIcon: true,
          pagePath: '/pages/center/center',
        },
      ],
      current: 0,
    };
  },
  onLoad() {
    this.getlocation();

    this.bannerApi();
  },
  methods: {
    async getlocation() {
      let result = await location.getLocationFn();
      let addressComponent = result.addressComponent;
      // console.log(JSON.stringify(addressComponent));
      this.city =
        typeof addressComponent.city === 'string'
          ? `${addressComponent.city}${addressComponent.district}`
          : addressComponent.province;
    },
    async bannerApi() {
      let params = { type: 2 };
      let result = await this.$api.banner(params);
      this.bannerList = result.banners;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
