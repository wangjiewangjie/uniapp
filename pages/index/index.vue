<template>
  <view class="page">
    <u-navbar
      :is-back="false"
      :background="navbarBackground"
      :border-bottom="false"
    >
    </u-navbar>
    <!--/ nav -->

    <view class="banner">
      <u-swiper
        :list="bannerList"
        name="pic"
        :height="320"
        :border-radius="16"
      ></u-swiper>
    </view>

    <u-tabbar v-model="current" :list="tabbarList"></u-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navbarBackground: {
        background: '#fff',
      },
      city: '定位中',
      bannerList: [],

      tabbarList: [
        {
          iconPath: 'listing-content',
          selectedIconPath: 'listing-content-fill',
          isDot: false,
          customIcon: true,
          pagePath: '/pages/index/index',
        },
        {
          iconPath: 'smile',
          selectedIconPath: 'smile-fill',
          isDot: false,
          customIcon: true,
          pagePath: '/pages/center/center',
        },
      ],
      current: 0,
    };
  },
  onLoad() {
    this.bannerApi();
  },
  methods: {
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
