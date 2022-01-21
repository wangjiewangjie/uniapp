import api from './api.js';

const install = (Vue, vm) => {
  Vue.prototype.$api = {
    banner: (params = {}) => vm.$u.get(api.banner, params), // banner
  };
};

export default {
  install,
};
