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
            <text class="navbar-search_placeholder">请输入商品名称</text>
          </view>
        </view>
        <view class="navbar-info_btn">
          <text class="custom-icon custom-icon-xiaoxi"></text>
          <text class="navbar-info_text">消息</text>
        </view>
      </view>
    </u-navbar>
    <!--/ nav -->

    <view class="banner-wrap">
      <view class="banner">
        <u-swiper :list="list" :height="320" :border-radius="16"></u-swiper>
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
      list: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
        },
      ],

      tabbarList: [
        {
          iconPath: '/static/image/tabbar/index.png',
          selectedIconPath: '/static/image/tabbar/index_active.png',
          text: '首页',
          isDot: false,
          customIcon: true,
          pagePath:'/pages/index/index'
        },
        {
          iconPath: '/static/image/tabbar/mine.png',
          selectedIconPath: '/static/image/tabbar/mine_active.png',
          text: '我的',
          isDot: false,
          customIcon: true,
          pagePath:'/pages/center/center'
        },
      ],
      current: 0,
    };
  },
  onLoad() {
    this.getlocation();
  },
  methods: {
    async getlocation() {
      let result = await location.getLocationFn();
      let addressComponent = result.addressComponent;
      console.log(JSON.stringify(addressComponent));
      this.city =
        typeof addressComponent.city === 'string'
          ? `${addressComponent.city}${addressComponent.district}`
          : addressComponent.province;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
