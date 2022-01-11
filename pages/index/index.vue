<template>
  <view class="content">
    <u-navbar :is-back="false" :background="navbarBackground">
      <view class="slot-wrap">
        <view class="navbar-search_wrap">
          <view
            class="navbar-location"
            :class="city == '定位中' ? 'loading' : ''"
            ><text class="navbar-city_text">{{ city }}</text></view
          >
          <view class="navbar-search_btn">
            <text class="iconfont iconsousuo"></text>
            <text class="navbar-search_placeholder">请输入商品名称</text>
          </view>
        </view>
        <view class="navbar-info_btn">
          <text class="iconfont iconmessage"></text>
          <text class="navbar-info_text">消息</text>
        </view>
      </view>
    </u-navbar>
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
.slot-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
  width: 100%;

  .navbar-search_wrap {
    display: flex;
    align-items: center;
    width: 606rpx;
    height: 64rpx;
    border-radius: 32rpx;
    background: #fff;
  }

  .navbar-location {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10rpx 32rpx;
    border-right: 1rpx solid $u-type-primary;
    width: 200rpx;
    height: 44rpx;
    font-size: 32rpx;
    color: #333333;
    .navbar-city_text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .navbar-search_btn {
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    .iconfont {
      margin-right: 8rpx;
    }
    .navbar-search_placeholder {
      color: #cccccc;
    }
  }

  .navbar-info_btn {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    .iconfont {
      margin-bottom: 6rpx;
    }
    .navbar-info_text {
      font-size: 24rpx;
    }
  }

  /* loading动画 */
  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis 2s infinite;
    content: '\2026';
  }

  @keyframes ellipsis {
    from {
      width: 4rpx;
    }

    to {
      width: 36rpx;
    }
  }
}
</style>
