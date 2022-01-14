<template>
  <view class="container">
    <view class="ul">
      <view
        class="li"
        v-for="(item, index) in menuList"
        :key="index"
        @click="router(item.url)"
        >{{ item.url }}</view
      >
    </view>
    <u-tabbar v-model="current" :list="tabbarList"></u-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { url: '/pages/center/editor/editor' },
        { url: '/pages/center/upload/upload' },
        { url: '/pages/center/map/map' },
      ],
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
      current: 1,
    };
  },
  methods: {
    router(url) {
      console.log(url);
      this.$u.route({
        url: url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ul {
  .li {
    padding: 32rpx;
    border-bottom: 1rpx solid #e0e0e0;
  }
}
</style>
