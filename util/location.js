import config from '@/config/config';

/**
 * 定位uniapp定位返回位置信息仅支持app端,故使用高德api获取位置信息
 */
function getLocationFn() {
  return new Promise((resolve) => {
    uni.getLocation({
      type: 'wgs84',
      success: (res) => {
        /* 高德逆向解析地址 */
        uni.request({
          url: `https://restapi.amap.com/v3/geocode/regeo?key=${config.gaodeMap}&location=${res.longitude},${res.latitude}`,
          success: (res) => {
            resolve(res.data.regeocode);
          },
          fail: (err) => {
            console.error(`gaodeMap:${err}`);
          },
        });
      },
      fail: (err) => {
        console.error(`getLocation:${err}`);
      },
    });
  });
}

export { getLocationFn };
