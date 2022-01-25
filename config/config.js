const DEVELOPER_TYPE = process.env.NODE_ENV;

let apiHost;

const DEVELOPMENT_CONFIG = {
  apiHost: 'http://121.5.127.6:3000', //生产环境
};

const PRODUCTION_CONFIG = {
  apiHost: 'http://121.5.127.6:3000', //生产环境
};

if (DEVELOPER_TYPE === 'development') {
  console.log('开发环境');
  apiHost = DEVELOPMENT_CONFIG.apiHost;
} else {
  console.log('生产环境');
  apiHost = PRODUCTION_CONFIG.apiHost;
}

function changeDeveloperType(type) {
  console.log(type);
  if (type) {
    
  }
}

export default {
  gaodeMap: '59a6fb7f653d601c03543cbe92be8513',
  brand: '', //设备品牌
  model: '', //设备型号
  screenWidth: '', //可使用窗口宽度
  screenHeight: '', //可使用窗口高度
  system: '', //操作系统版本
  statusBarHeight: '', //状态栏的高度
  deviceId: '', //设备 id
  apiHost, //接口地址
  changeDeveloperType,
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
};
