let commonInfo = {};
import storage from './storageutil';
import config from '../config/config';

commonInfo.reLogin = () => {
  commonInfo.setToken('');
  commonInfo.setProfile('');
  uni.navigateTo({ url: '/pages/login/login' });
};

commonInfo.delLastHref = () => {
  storage.set('lastHref', '');
};

commonInfo.getToken = () => {
  return config.jwtjson || storage.get('token');
};
commonInfo.setToken = (token) => {
  storage.set('token', token);
};

commonInfo.setProfile = (profile) => {
  storage.set('profile', profile);
};
commonInfo.getProfile = () => {
  return storage.get('profile');
};

commonInfo.setAccount = (account) => {
  storage.set('account', account);
};
commonInfo.getAccount = () => {
  return storage.get('account');
};

export default commonInfo;
