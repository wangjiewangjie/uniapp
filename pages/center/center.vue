<template>
  <view class="container">
    <view class="ul">
      <view
        class="li"
        v-for="(item, index) in menuList"
        :key="index"
        @click="router(item.url)"
      >{{ item.url }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      menuList: [{ url: '/pages/center/editor/editor' }, { url: '/pages/center/upload/upload' },{ url: '/pages/center/map/map' }],
    };
  },
  methods: {
    router(url) {
      console.log(url)
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
