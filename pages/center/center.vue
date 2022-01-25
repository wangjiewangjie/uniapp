<template>
  <view class="page">
    个人中心
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
      tabbarList: config.tabbarList,
      current: 1,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
