<template>
  <view>
    <map :style="mapStyle" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
  </view>
</template>

<script>
import config from '@/config/config';
export default {
  data() {
    return {
      mapStyle: '',
      id: 0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../../static/image/map/map-markers.png',
          width: 40,
          height: 40,
        },
        {
          latitude: 39.9,
          longitude: 116.39,
          iconPath: '../../../static/image/map/map-markers.png',
          width: 40,
          height: 40,
        },
      ],
    };
  },
  onShow() {
    const { screenWidth, screenHeight } = config;
    this.mapStyle = `width:${screenWidth}px;height:${screenHeight}px`;

    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('当前位置的经度：' + res.longitude);
        console.log('当前位置的纬度：' + res.latitude);
      },
    });
  },
  methods: {},
};
</script>