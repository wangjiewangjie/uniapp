<template>
  <view class="page">
    <view class="mine-bg">
      <u-image width="100%" height="750rpx" :src="profile.backgroundUrl"></u-image>
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
import commonInfo from '@/util/commonInfo';
export default {
  data() {
    return {
      profile: {},

      tabbarList: config.tabbarList,
      current: 1,
    };
  },
  onLoad() {
    this.profile = commonInfo.getProfile();
    console.log(commonInfo.getProfile());
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
