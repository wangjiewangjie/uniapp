<template>
  <view class="page">
    <view class="login-form">
      <u-form :model="form" ref="uForm" label-position="top" label-width="150">
        <u-form-item label="手机号码" prop="phone">
          <u-input
            placeholder="请输入手机号"
            v-model="form.phone"
            type="number"
          ></u-input>
        </u-form-item>
        <u-form-item label="验证码" prop="captcha">
          <u-input
            placeholder="请输入验证码"
            v-model="form.captcha"
            type="number"
          ></u-input>
          <u-button slot="right" type="success" size="mini" @click="getCode">{{
            codeTips
          }}</u-button>
        </u-form-item>
      </u-form>
      <u-button class="login-btn" type="success" shape="circle" @click="submit"
        >提交</u-button
      >
    </view>

    <u-verification-code
      seconds="60"
      ref="uCode"
      @change="codeChange"
    ></u-verification-code>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
import commonInfo from '@/util/commonInfo';
export default {
  data() {
    return {
      form: {
        phone: '',
        captcha: '',
      },

      codeTips: '',

      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur'],
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.mobile(value);
            },
            message: '手机号码不正确',
            trigger: ['change', 'blur'],
          },
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur'],
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.code(value, 4);
            },
            message: '验证码不正确',
            trigger: ['change', 'blur'],
          },
        ],
      },
    };
  },
  methods: {
    codeChange(text) {
      this.codeTips = text;
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
          mask: true,
        });
        let params = {
          phone: this.form.phone,
          ctcode: 86,
        };
        this.sentCaptchaApi(params);
        uni.hideLoading();
        // 这里此提示会被this.start()方法中的提示覆盖
        this.$u.toast('验证码已发送');
        // 通知验证码组件内部开始倒计时
        this.$refs.uCode.start();
      } else {
        this.$u.toast('倒计时结束后再发送');
      }
    },
    submit() {
      this.$refs.uForm.validate(async (valid) => {
        if (valid) {
          const params = this.form;
          const res = await this.$api.verifyCaptcha(params);
          console.log(res.data);
          if (res.code === 200) {
            this.loginCellphoneApi(params);
          } else {
            this.$refs.uToast.show({
              title: res.message,
              type: 'error',
            });
          }
        } else {
          console.log('验证失败');
        }
      });
    },

    /* api */
    async sentCaptchaApi(params) {
      let res = await this.$api.sentCaptcha(params);
      console.log(res);
    },
    async loginCellphoneApi(params) {
      let res = await this.$api.loginCellphone(params);
      if (res.code === 200) {
        commonInfo.setToken(res.token);
        commonInfo.setProfile(res.profile);
        commonInfo.setAccount(res.account);

        this.$refs.uToast.show({
          title: '登录成功',
          type: 'success',
          url: '/pages/index/index',
          isTab: true,
        });
      }
    },
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #fff;
}

.login-form {
  width: 100%;
  .u-form {
    margin: 64rpx;
  }

  .login-btn {
    margin: 0 64rpx;
    margin-bottom: 256rpx;
  }
}
</style>
