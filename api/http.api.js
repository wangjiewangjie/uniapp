import api from './api.js';

const install = (Vue, vm) => {
  Vue.prototype.$api = {
    sentCaptcha: (params = {}) => vm.$u.get(api.sentCaptcha, params), // 发送验证码
    verifyCaptcha: (params = {}) => vm.$u.get(api.verifyCaptcha, params), // 验证验证码
    loginCellphone: (params = {}) => vm.$u.get(api.loginCellphone, params), // 手机号登录

    banner: (params = {}) => vm.$u.get(api.banner, params), // banner
  };
};

export default {
  install,
};
