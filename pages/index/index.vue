<template>
  <view class="page">
    <u-navbar :is-back="false" :background="navbarBackground" :border-bottom="false" title="首页">
      <u-icon
        name="SanMiAppglyphico4"
        custom-prefix="custom-icon"
        size="50"
        color="#27C087"
        @click="show = true"
      ></u-icon>
    </u-navbar>
    <!--/ nav -->

    <u-popup class="sidebar-wrap" v-model="show">
      <view class="sidebar-item">
        <u-section title="今日热门" sub-title="更多" :right="false" :show-line="false" :arrow="true"></u-section>
      </view>
    </u-popup>
    <!-- /弹窗 -->

    <view class="banner">
      <u-swiper :list="bannerList" name="pic" :height="275" :border-radius="0"></u-swiper>
    </view>

    <u-tabbar
      v-model="current"
      :list="tabbarList"
      :icon-size="50"
      active-color="#27C087"
      inactive-color="#333"
    ></u-tabbar>
  </view>
</template>

<script>
import config from '@/config/config';
export default {
  data() {
    return {
      navbarBackground: {
        background: '#fff',
      },
      bannerList: [],

      show: false,

      tabbarList: config.tabbarList,
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
