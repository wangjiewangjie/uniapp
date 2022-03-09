let api = {
  /* 短信登录 */
  sentCaptcha: '/captcha/sent', // 发送验证码
  verifyCaptcha: '/captcha/verify', // 验证验证码
  loginCellphone:'/login/cellphone',//手机登录
  banner: '/banner',
};

module.exports = api;
