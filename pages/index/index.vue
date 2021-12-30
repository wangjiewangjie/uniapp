<template>
  <view class="content">
    <CityPicker />
  </view>
</template>

<script>
import CityPicker from '@/components/CityPicker/CityPicker';
export default {
  components: {
    CityPicker,
  },
  data() {
    return {};
  },
  onLoad() {
    this.fn()
  },
  methods: {
    async fn() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('开始');
          resolve();
        }, 3000);
      });
      console.log(1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
