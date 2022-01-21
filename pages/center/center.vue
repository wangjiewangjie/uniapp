<template>
  <view class="page">
    个人中心
    <u-tabbar v-model="current" :list="tabbarList"></u-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
      current: 1,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
