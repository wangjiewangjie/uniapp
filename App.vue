<script>
import config from '@/config/config';
export default {
  onLaunch() {
    console.log('App Launch:当uni-app 初始化完成时触发（全局只触发一次）');
    uni.getSystemInfo({
      success: (res) => {
        const {
          brand,
          model,
          screenWidth,
          screenHeight,
          statusBarHeight,
          system,
          deviceId,
        } = res;
        config.brand = brand;
        config.model = model;
        config.screenWidth = screenWidth;
        config.screenHeight = screenHeight;
        config.statusBarHeight = statusBarHeight;
        config.system = system;
        config.deviceId = deviceId;
      },
    });
  },
  onShow() {
    console.log('App Show:当 uni-app 启动，或从后台进入前台显示');
  },
  onHide() {
    console.log('App Hide:当 uni-app 从前台进入后台');
  },
  onThemeChange() {
    uni.onThemeChange((res) => {
      console.log(res.theme);
    });
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';
@import '/static/styles/main.scss';
</style>
