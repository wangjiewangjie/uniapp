(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"uView-demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"uView-demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"uView-demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"uView-demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"uView-demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*******************************************!*\
  !*** E:/project/uView_default/pages.json ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!**************************************************!*\
  !*** E:/project/uView_default/uview-ui/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 12 */
/*!*************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/mixin/mixin.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!***************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/request/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/deepMerge.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),
/* 15 */
/*!********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/deepClone.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/test.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),
/* 17 */
/*!**********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/queryParams.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),
/* 18 */
/*!****************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/route.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 19 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),
/* 20 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 21 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 22 */
/*!*********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/timeFormat.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),
/* 23 */
/*!*******************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/timeFrom.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),
/* 24 */
/*!************************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/colorGradient.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),
/* 25 */
/*!***************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/guid.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),
/* 26 */
/*!****************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/color.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),
/* 27 */
/*!********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/type2icon.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),
/* 28 */
/*!**********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/randomArray.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),
/* 29 */
/*!******************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/addUnit.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 30 */
/*!*****************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/random.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),
/* 31 */
/*!***************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/trim.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),
/* 32 */
/*!****************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/toast.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 33 */
/*!********************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/getParent.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),
/* 34 */
/*!******************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/$parent.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 35 */
/*!**************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/sys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 36 */
/*!*******************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/debounce.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 37 */
/*!*******************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/function/throttle.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),
/* 38 */
/*!***************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/config/config.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),
/* 39 */
/*!***************************************************************!*\
  !*** E:/project/uView_default/uview-ui/libs/config/zIndex.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 40 */
/*!***********************************************!*\
  !*** E:/project/uView_default/util/router.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "RouterMount", { enumerable: true, get: function get() {return _uniSimpleRouter.RouterMount;} });exports.router = void 0;
var _uniSimpleRouter = __webpack_require__(/*! uni-simple-router */ 41);function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var router = (0, _uniSimpleRouter.createRouter)({
  platform: "mp-weixin",
  routes: _toConsumableArray([{"path":"/pages/index/index","aliasPath":"/"},{"path":"/pages/center/center"}]) });

//全局路由前置守卫
exports.router = router;router.beforeEach(function (to, from, next) {
  next();
});
// 全局路由后置守卫
router.afterEach(function (to, from) {
  console.log('跳转结束');
});

/***/ }),
/* 41 */
/*!*****************************************************************************************!*\
  !*** E:/project/uView_default/node_modules/uni-simple-router/dist/uni-simple-router.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {!function (e, t) { true ? module.exports = t() : undefined;}(self, function () {return e = { 779: function _(e, t, r) {var o = r(173);e.exports = function e(t, r, n) {return o(r) || (n = r || n, r = []), n = n || {}, t instanceof RegExp ? function (e, t) {var r = e.source.match(/\((?!\?)/g);if (r) for (var o = 0; o < r.length; o++) {t.push({ name: o, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });}return c(e, t);}(t, r) : o(t) ? function (t, r, o) {for (var n = [], a = 0; a < t.length; a++) {n.push(e(t[a], r, o).source);}return c(new RegExp("(?:" + n.join("|") + ")", s(o)), r);}(t, r, n) : function (e, t, r) {return f(a(e, r), t, r);}(t, r, n);}, e.exports.parse = a, e.exports.compile = function (e, t) {return u(a(e, t), t);}, e.exports.tokensToFunction = u, e.exports.tokensToRegExp = f;var n = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");function a(e, t) {for (var r, o = [], a = 0, i = 0, u = "", c = t && t.delimiter || "/"; null != (r = n.exec(e));) {var s = r[0],f = r[1],h = r.index;if (u += e.slice(i, h), i = h + s.length, f) u += f[1];else {var v = e[i],y = r[2],g = r[3],d = r[4],m = r[5],b = r[6],O = r[7];u && (o.push(u), u = "");var P = null != y && null != v && v !== y,k = "+" === b || "*" === b,j = "?" === b || "*" === b,w = r[2] || c,R = d || m;o.push({ name: g || a++, prefix: y || "", delimiter: w, optional: j, repeat: k, partial: P, asterisk: !!O, pattern: R ? p(R) : O ? ".*" : "[^" + l(w) + "]+?" });}}return i < e.length && (u += e.substr(i)), u && o.push(u), o;}function i(e) {return encodeURI(e).replace(/[\/?#]/g, function (e) {return "%" + e.charCodeAt(0).toString(16).toUpperCase();});}function u(e, t) {for (var r = new Array(e.length), n = 0; n < e.length; n++) {"object" == typeof e[n] && (r[n] = new RegExp("^(?:" + e[n].pattern + ")$", s(t)));}return function (t, n) {for (var a = "", u = t || {}, l = (n || {}).pretty ? i : encodeURIComponent, p = 0; p < e.length; p++) {var c = e[p];if ("string" != typeof c) {var s,f = u[c.name];if (null == f) {if (c.optional) {c.partial && (a += c.prefix);continue;}throw new TypeError('Expected "' + c.name + '" to be defined');}if (o(f)) {if (!c.repeat) throw new TypeError('Expected "' + c.name + '" to not repeat, but received `' + JSON.stringify(f) + "`");if (0 === f.length) {if (c.optional) continue;throw new TypeError('Expected "' + c.name + '" to not be empty');}for (var h = 0; h < f.length; h++) {if (s = l(f[h]), !r[p].test(s)) throw new TypeError('Expected all "' + c.name + '" to match "' + c.pattern + '", but received `' + JSON.stringify(s) + "`");a += (0 === h ? c.prefix : c.delimiter) + s;}} else {if (s = c.asterisk ? encodeURI(f).replace(/[?#]/g, function (e) {return "%" + e.charCodeAt(0).toString(16).toUpperCase();}) : l(f), !r[p].test(s)) throw new TypeError('Expected "' + c.name + '" to match "' + c.pattern + '", but received "' + s + '"');a += c.prefix + s;}} else a += c;}return a;};}function l(e) {return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");}function p(e) {return e.replace(/([=!:$\/()])/g, "\\$1");}function c(e, t) {return e.keys = t, e;}function s(e) {return e && e.sensitive ? "" : "i";}function f(e, t, r) {o(t) || (r = t || r, t = []);for (var n = (r = r || {}).strict, a = !1 !== r.end, i = "", u = 0; u < e.length; u++) {var p = e[u];if ("string" == typeof p) i += l(p);else {var f = l(p.prefix),h = "(?:" + p.pattern + ")";t.push(p), p.repeat && (h += "(?:" + f + h + ")*"), i += h = p.optional ? p.partial ? f + "(" + h + ")?" : "(?:" + f + "(" + h + "))?" : f + "(" + h + ")";}}var v = l(r.delimiter || "/"),y = i.slice(-v.length) === v;return n || (i = (y ? i.slice(0, -v.length) : i) + "(?:" + v + "(?=$))?"), i += a ? "$" : n && y ? "" : "(?=" + v + "|$)", c(new RegExp("^" + i, s(r)), t);}}, 173: function _(e) {e.exports = Array.isArray || function (e) {return "[object Array]" == Object.prototype.toString.call(e);};}, 844: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.buildVueRouter = t.buildVueRoutes = void 0;var n = r(366),a = r(883),i = r(789),u = r(169);t.buildVueRoutes = function (e, t) {for (var r = e.routesMap, o = r.pathMap, l = r.finallyPathList, p = Object.keys(t), c = 0; c < p.length; c++) {var s = p[c],f = o[s],h = t[s];if (f) {var v = i.getRoutePath(f, e).finallyPath;if (v instanceof Array) throw new Error("非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ " + JSON.stringify(f));null != f.name && (h.name = f.name);var y = h.path,g = h.alias;delete h.alias, h.path = v, "/" === y && null != g && (h.alias = g, h.path = y), f.beforeEnter && (h.beforeEnter = function (t, r, o) {u.onTriggerEachHook(t, r, e, n.hookToggle.enterHooks, o);});} else a.warn(s + " 路由地址在路由表中未找到，确定是否传递漏啦", e, !0);}return l.includes("*") && (t["*"] = o["*"]), t;}, t.buildVueRouter = function (e, t, r) {var n;n = "[object Array]" === i.getDataType(r) ? r : Object.values(r);var a = e.options.h5,u = a.scrollBehavior,l = a.fallback,p = t.options.scrollBehavior;t.options.scrollBehavior = function (e, t, r) {return p && p(e, t, r), u(e, t, r);}, t.fallback = l;var c = new t.constructor(o(o({}, e.options.h5), { base: t.options.base, mode: t.options.mode, routes: n }));t.matcher = c.matcher;};}, 147: function _(e, t) {"use strict";var _r,o = this && this.__extends || (_r = function r(e, t) {return (_r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}})(e, t);}, function (e, t) {function o() {this.constructor = e;}_r(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());});Object.defineProperty(t, "__esModule", { value: !0 }), t.proxyH5Mount = t.proxyEachHook = t.MyArray = void 0;var n = function (e) {function t(r, o, n, a) {var i = e.call(this) || this;return i.router = r, i.vueEachArray = o, i.myEachHook = n, i.hookName = a, Object.setPrototypeOf(i, t.prototype), i;}return o(t, e), t.prototype.push = function (e) {var t = this;this.vueEachArray.push(e);var r = this.length;this[this.length] = function (e, o, n) {r > 0 ? t.vueEachArray[r](e, o, function () {n && n();}) : t.myEachHook(e, o, function (a) {!1 === a ? n(!1) : t.vueEachArray[r](e, o, function (e) {n(a);});}, t.router, !0);};}, t;}(Array);t.MyArray = n, t.proxyEachHook = function (e, t) {for (var r = ["beforeHooks", "afterHooks"], o = 0; o < r.length; o++) {var a = r[o],i = e.lifeCycle[a][0];if (i) {var u = t[a];t[a] = new n(e, u, i, a);}}}, t.proxyH5Mount = function (e) {var t;if (0 === e.mount.length) {if (null === (t = e.options.h5) || void 0 === t ? void 0 : t.vueRouterDev) return;navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && setTimeout(function () {if (document.getElementsByTagName("uni-page").length > 0) return !1;window.location.reload();}, 0);} else e.mount[0].app.$mount(), e.mount = [];};}, 814: function _(e, t) {"use strict";var r = this && this.__assign || function () {return (r = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.runtimeQuit = t.registerLoddingPage = void 0;var o = null;t.registerLoddingPage = function (e) {if (e.options.registerLoadingPage) {var t = e.options.APP,o = t.loadingPageHook,n = t.loadingPageStyle;o(new plus.nativeObj.View("router-loadding", r({ top: "0px", left: "0px", height: "100%", width: "100%" }, n())));}}, t.runtimeQuit = function (e) {void 0 === e && (e = "再按一次退出应用");var t = +new Date();o ? t - o < 1e3 && plus.runtime.quit() : (o = t, uni.showToast({ title: e, icon: "none", position: "bottom", duration: 1e3 }), setTimeout(function () {o = null;}, 1e3));};}, 334: function _(e, t) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.getEnterPath = void 0, t.getEnterPath = function (e, t) {switch (t.options.platform) {case "mp-alipay":case "mp-weixin":case "mp-toutiao":case "mp-qq":return e.$options.mpInstance.route;case "mp-baidu":return e.$options.mpInstance.is || e.$options.mpInstance.pageinstance.route;}return e.$options.mpInstance.route;};}, 282: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);},n = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;};Object.defineProperty(t, "__esModule", { value: !0 }), t.notCallProxyHook = t.proxyVueSortHookName = t.indexProxyHook = t.appProxyHook = t.lifeCycle = t.baseConfig = t.mpPlatformReg = t.keyword = void 0;var a = r(883),i = r(789);t.keyword = ["query"], t.mpPlatformReg = "(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)", t.baseConfig = { h5: { paramsToQuery: !1, vueRouterDev: !1, vueNext: !1, mode: "hash", base: "/", linkActiveClass: "router-link-active", linkExactActiveClass: "router-link-exact-active", scrollBehavior: function scrollBehavior(e, t, r) {return { x: 0, y: 0 };}, fallback: !0 }, APP: { registerLoadingPage: !0, loadingPageStyle: function loadingPageStyle() {return JSON.parse('{"backgroundColor":"#FFF"}');}, loadingPageHook: function loadingPageHook(e) {e.show();}, launchedHook: function launchedHook() {plus.navigator.closeSplashscreen();}, animation: {} }, applet: { animationDuration: 300 }, platform: "h5", keepUniOriginNav: !1, debugger: !1, routerBeforeEach: function routerBeforeEach(e, t, r) {r();}, routerAfterEach: function routerAfterEach(e, t) {}, routerErrorEach: function routerErrorEach(e, t) {t.$lockStatus = !1, a.err(e, t, !0);}, detectBeforeLock: function detectBeforeLock(e, t, r) {}, routes: [{ path: "/choose-location" }, { path: "/open-location" }, { path: "/preview-image" }] }, t.lifeCycle = { beforeHooks: [], afterHooks: [], routerBeforeHooks: [], routerAfterHooks: [], routerErrorHooks: [] }, t.appProxyHook = { app: { created: [], beforeMount: [], mounted: [], onLaunch: [], onShow: [], onHide: [], beforeDestroy: [], destroyed: [] } }, t.indexProxyHook = { app: t.appProxyHook.app, page: function (e) {e.onLaunch;var t = n(e, ["onLaunch"]);return o(o({}, t), { onLoad: [], onReady: [], onUnload: [], onResize: [] });}(i.copyData(t.appProxyHook.app)), component: [] }, t.proxyVueSortHookName = { app: ["created", "beforeMount", "mounted", "onLaunch", "onShow", "onHide", "beforeDestroy", "destroyed"], page: ["created", "beforeMount", "mounted", "onLoad", "onReady", "onShow", "onResize", "onHide", "beforeDestroy", "destroyed", "onUnload"], component: ["created", "beforeMount", "mounted", "beforeDestroy", "destroyed"] }, t.notCallProxyHook = ["onHide", "beforeDestroy", "destroyed", "destroyed", "onUnload", "onResize"];}, 801: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.createRouteMap = void 0;var o = r(883),n = r(789);t.createRouteMap = function (e, t) {var r = { finallyPathList: [], finallyPathMap: Object.create(null), aliasPathMap: Object.create(null), pathMap: Object.create(null), vueRouteMap: Object.create(null), nameMap: Object.create(null) };return t.forEach(function (t) {var a = n.getRoutePath(t, e),i = a.finallyPath,u = a.aliasPath,l = a.path;if (null == l) throw new Error("请提供一个完整的路由对象，包括以绝对路径开始的 ‘path’ 字符串 " + JSON.stringify(t));if (i instanceof Array && !e.options.h5.vueRouterDev && "h5" === e.options.platform) throw new Error("非 vueRouterDev 模式下，route.alias 目前无法提供数组类型！ " + JSON.stringify(t));var p = i,c = u;"h5" !== e.options.platform && 0 !== p.indexOf("/") && "*" !== l && o.warn("当前路由对象下，route：" + JSON.stringify(t) + " 是否缺少了前缀 ‘/’", e, !0), r.finallyPathMap[p] || (r.finallyPathMap[p] = t, r.aliasPathMap[c] = t, r.pathMap[l] = t, r.finallyPathList.push(p), null != t.name && (r.nameMap[t.name] = t));}), r;};}, 662: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.registerEachHooks = t.registerRouterHooks = t.registerHook = void 0;var o = r(366),n = r(169);function a(e, t) {e[0] = t;}t.registerHook = a, t.registerRouterHooks = function (e, t) {return a(e.routerBeforeHooks, function (e, r, o) {t.routerBeforeEach(e, r, o);}), a(e.routerAfterHooks, function (e, r) {t.routerAfterEach(e, r);}), a(e.routerErrorHooks, function (e, r) {t.routerErrorEach(e, r);}), e;}, t.registerEachHooks = function (e, t, r) {a(e.lifeCycle[t], function (e, a, i, u, l) {l ? n.onTriggerEachHook(e, a, u, o.hookToggle[t], i) : r(e, a, i);});};}, 460: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.initMixins = t.getMixins = void 0;var n = r(801),a = r(844),i = r(147),u = r(814),l = r(845),p = r(890),c = r(789),s = r(334),f = r(282),h = !1,v = !1,y = { app: !1, page: "" };function g(e, t) {var r = t.options.platform;return new RegExp(f.mpPlatformReg, "g").test(r) && (r = "app-lets"), { h5: { beforeCreate: function beforeCreate() {var e;if (this.$options.router) {t.$route = this.$options.router;var r = [];(null === (e = t.options.h5) || void 0 === e ? void 0 : e.vueRouterDev) ? r = t.options.routes : (r = n.createRouteMap(t, this.$options.router.options.routes).finallyPathMap, t.routesMap.vueRouteMap = r, a.buildVueRoutes(t, r)), a.buildVueRouter(t, this.$options.router, r), i.proxyEachHook(t, this.$options.router);}} }, "app-plus": { beforeCreate: function beforeCreate() {h || (h = !0, l.proxyPageHook(this, t, "appProxyHook", "app"), u.registerLoddingPage(t));} }, "app-lets": { beforeCreate: function beforeCreate() {var e = this.$options.mpType;"component" !== e || v ? "component" !== e && (y[e] || ("page" === e ? (y[e] = s.getEnterPath(this, t), t.enterPath = y[e]) : y[e] = !0, l.proxyPageHook(this, t, "appletsProxyHook", e))) : c.assertParentChild(y.page, this) && l.proxyPageHook(this, t, "appletsProxyHook", e);}, onLoad: function onLoad() {!v && c.assertParentChild(y.page, this) && (v = !0, p.forceGuardEach(t));} } }[r];}t.getMixins = g, t.initMixins = function (e, t) {var r = n.createRouteMap(t, t.options.routes);t.routesMap = r, e.mixin(o({}, g(0, t)));};}, 789: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);},n = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;},a = this && this.__spreadArrays || function () {for (var e = 0, t = 0, r = arguments.length; t < r; t++) {e += arguments[t].length;}var o = Array(e),n = 0;for (t = 0; t < r; t++) {for (var a = arguments[t], i = 0, u = a.length; i < u; i++, n++) {o[n] = a[i];}}return o;};Object.defineProperty(t, "__esModule", { value: !0 }), t.resolveAbsolutePath = t.assertParentChild = t.reservedWord = t.resetPageHook = t.callHook = t.replaceHook = t.lockDetectWarn = t.deepClone = t.baseClone = t.assertDeepObject = t.paramsToQuery = t.forMatNextToFrom = t.urlToJson = t.getUniCachePage = t.copyData = t.getDataType = t.routesForMapRoute = t.notRouteTo404 = t.getWildcardRule = t.assertNewOptions = t.getRoutePath = t.notDeepClearNull = t.mergeConfig = t.timeOut = t.def = t.voidFun = void 0;var i = r(282),u = r(169),l = r(883),p = r(890),c = r(779);function s(e, t) {for (var r = Object.create(null), n = Object.keys(e).concat(["resolveQuery", "parseQuery"]), i = 0; i < n.length; i += 1) {var u = n[i];null != t[u] ? t[u].constructor === Object ? r[u] = o(o({}, e[u]), t[u]) : r[u] = "routes" === u ? a(e[u], t[u]) : t[u] : r[u] = e[u];}return r;}function f(e, t) {var r = e.aliasPath || e.alias || e.path;return "h5" !== t.options.platform && (r = e.path), { finallyPath: r, aliasPath: e.aliasPath || e.path, path: e.path, alias: e.alias };}function h(e, t) {var r = e.routesMap.finallyPathMap["*"];if (r) return r;throw t && u.ERRORHOOK[0](t, e), new Error("当前路由表匹配规则已全部匹配完成，未找到满足的匹配规则。你可以使用 '*' 通配符捕捉最后的异常");}function v(e) {return Object.prototype.toString.call(e);}function y(e) {return JSON.parse(JSON.stringify(e));}function g(e, t) {for (var r = 0, o = Object.keys(e); r < o.length; r++) {var n = o[r],a = n;e[n] !== e && ("object" == typeof e[n] ? (t[a] = "[object Array]" === v(e[n]) ? [] : {}, g(e[n], t[a])) : t[a] = e[n]);}}function d(e) {var t = "[object Array]" === v(e) ? [] : {};return g(e, t), t;}function m(e, t) {for (var r = [], o = 0, n = Object.entries(e); o < n.length; o++) {var a = n[o][1][0];a && a.hook && r.push(a.hook(t));}return r;}t.voidFun = function () {}, t.def = function (e, t, r) {Object.defineProperty(e, t, { get: function get() {return r();} });}, t.timeOut = function (e) {return new Promise(function (t) {setTimeout(function () {t();}, e);});}, t.mergeConfig = s, t.notDeepClearNull = function (e) {for (var t in e) {null == e[t] && delete e[t];}return e;}, t.getRoutePath = f, t.assertNewOptions = function (e) {var t,r = e.platform,o = e.routes;if (null == r) throw new Error("你在实例化路由时必须传递 'platform'");if (null == o || 0 === o.length) throw new Error("你在实例化路由时必须传递 routes 为空，这是无意义的。");return "h5" === e.platform && (null === (t = e.h5) || void 0 === t ? void 0 : t.vueRouterDev) && (i.baseConfig.routes = []), s(i.baseConfig, e);}, t.getWildcardRule = h, t.notRouteTo404 = function (e, t, r, o) {if ("*" !== t.path) return t;var n = t.redirect;if (void 0 === n) throw new Error(" *  通配符必须配合 redirect 使用。redirect: string | Location | Function");var a = n;return "function" == typeof a && (a = a(r)), p.navjump(a, e, o, void 0, void 0, void 0, !1);}, t.routesForMapRoute = function (e, t, r) {var o;if (null === (o = e.options.h5) || void 0 === o ? void 0 : o.vueRouterDev) return { path: t };for (var n = t.split("?")[0], a = "", i = e.routesMap, u = 0; u < r.length; u++) {for (var l = i[r[u]], p = 0, s = Object.entries(l); p < s.length; p++) {var f = s[p],y = f[0],g = f[1];if ("*" !== y) {var d = g,m = y;if ("[object Array]" === v(l) && (m = d), null != c(m).exec(n)) return "[object String]" === v(d) ? i.finallyPathMap[d] : d;} else "" === a && (a = "*");}}if ("" !== a) return h(e);throw new Error(t + " 路径无法在路由表中找到！检查跳转路径及路由表");}, t.getDataType = v, t.copyData = y, t.getUniCachePage = function (e) {var t = getCurrentPages();if (null == e) return t;if (0 === t.length) return t;var r = t.reverse()[e];return null == r ? [] : r;}, t.urlToJson = function (e) {var t = {},r = e.split("?"),o = r[0],n = r[1];if (null != n) for (var a = 0, i = n.split("&"); a < i.length; a++) {var u = i[a].split("=");t[u[0]] = u[1];}return { path: o, query: t };}, t.forMatNextToFrom = function (e, t, r) {var o = [t, r],n = o[0],a = o[1];if ("h5" === e.options.platform) {var i = e.options.h5,u = i.vueNext,l = i.vueRouterDev;u || l || (n = p.createRoute(e, void 0, n), a = p.createRoute(e, void 0, a));} else n = p.createRoute(e, void 0, d(n)), a = p.createRoute(e, void 0, d(a));return { matTo: n, matFrom: a };}, t.paramsToQuery = function (e, t) {var r;if ("h5" === e.options.platform && !(null === (r = e.options.h5) || void 0 === r ? void 0 : r.paramsToQuery)) return t;if ("[object Object]" === v(t)) {var a = t,i = a.name,l = a.params,p = n(a, ["name", "params"]),c = l;if ("h5" !== e.options.platform && null == c && (c = {}), null != i && null != c) {var s = e.routesMap.nameMap[i];null == s && (s = h(e, { type: 2, msg: "命名路由为：" + i + " 的路由，无法在路由表中找到！", toRule: t }));var y = f(s, e).finallyPath;if (!y.includes(":")) return o(o({}, p), { path: y, query: c });u.ERRORHOOK[0]({ type: 2, msg: "动态路由：" + y + " 无法使用 paramsToQuery！", toRule: t }, e);}}return t;}, t.assertDeepObject = function (e) {var t = null;try {t = JSON.stringify(e).match(/\{|\[|\}|\]/g);} catch (e) {l.warnLock("传递的参数解析对象失败。" + e);}return null != t && t.length > 3;}, t.baseClone = g, t.deepClone = d, t.lockDetectWarn = function (e, t, r, o, n) {if ("afterHooks" === n) o();else {var a = e.options.detectBeforeLock;a && a(e, t, r), e.$lockStatus ? e.options.routerErrorEach({ type: 2, msg: "当前页面正在处于跳转状态，请稍后再进行跳转...." }, e) : o();}}, t.replaceHook = function (e, t, r, o) {var n = t.$options,a = e[r][o],u = {};if ("[object Array]" === v(a) && (u = { beforeCreate: [], created: [], beforeMount: [], mounted: [], beforeDestroy: [], destroyed: [] }), null != a) {for (var l = i.proxyVueSortHookName[o], p = function p(r) {var p = l[r],c = n[p];if ("[object Array]" === v(c)) {var s = { options: [], hook: Function },f = c.splice(c.length - 1, 1, function () {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}return s.options = e;})[0];s.hook = function (r) {return e.enterPath.replace(/^\//, "") !== r.replace(/^\//, "") && "app" !== o ? function () {} : (i.notCallProxyHook.includes(p) || f.apply(t, s.options), function () {c.splice(c.length - 1, 1, f);});}, Object.keys(u).length > 0 ? u[p] = [s] : a[p] = [s];}}, c = 0; c < l.length; c++) {p(c);}Object.keys(u).length > 0 && a.push(u);}}, t.callHook = m, t.resetPageHook = function (e, t) {var r = t.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);if (null == r) throw new Error("还原hook失败。请检查 【" + t + "】 路径是否正确。");t = r[1];var o = "appletsProxyHook";"app-plus" === e.options.platform && (o = "appProxyHook");for (var n = [], a = 0, i = Object.entries(e[o]); a < i.length; a++) {var u = i[a][1];if ("[object Array]" === v(u)) for (var l = 0; l < u.length; l++) {n = n.concat(m(u[l], t));} else n = n.concat(m(u, t));}setTimeout(function () {for (var e = 0; e < n.length; e++) {n[e]();}}, 500);}, t.reservedWord = function (e) {if ("string" == typeof e) return e;for (var t = o(o({}, y(e.params || {})), y(e.query || {})), r = 0; r < i.keyword.length; r++) {var n = i.keyword[r];Reflect.has(t, n) && ("[object Object]" === v(e.query) && delete e.query[n], "[object Object]" === v(e.params) && delete e.params[n], l.warnLock(JSON.stringify(i.keyword) + " 作为插件的保留字，在参数传递中不允许使用。已自动被过滤掉！换个参数名试试吧！ "));}return e;}, t.assertParentChild = function (e, t) {for (; null != t.$parent;) {var r = t.$parent.$mp;if (r.page && r.page.is === e) return !0;t = t.$parent;}try {if (t.$mp.page.is === e || t.$mp.page.route === e) return !0;} catch (e) {return !1;}return !1;}, t.resolveAbsolutePath = function (e, t) {var r = /^\/?([^\?\s]+)(\?.+)?$/,o = e.trim();if (!r.test(o)) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10001)。");var n = o.match(r);if (null == n) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10002)。");var a = n[2] || "";if (/^\.\/[^\.]+/.test(o)) return (t.currentRoute.path + e).replace(/[^\/]+\.\//, "");var i = n[1].replace(/\//g, "\\/").replace(/\.\./g, "[^\\/]+").replace(/\./g, "\\."),u = new RegExp("^\\/" + i + "$"),l = t.options.routes.filter(function (e) {return u.test(e.path);});if (1 !== l.length) throw new Error("【" + e + "】 路径错误，尝试转成绝对路径失败，请手动转成绝对路径(10003)。");return l[0].path + a;};}, 883: function _(e, t) {"use strict";function r(e, t, r, o) {if (void 0 === o && (o = !1), !o) {var n = "[object Object]" === t.toString();if (!1 === t) return !1;if (n && !1 === t[e]) return !1;}return console[e](r), !0;}Object.defineProperty(t, "__esModule", { value: !0 }), t.warnLock = t.log = t.warn = t.err = t.isLog = void 0, t.isLog = r, t.err = function (e, t, o) {r("error", t.options.debugger, e, o);}, t.warn = function (e, t, o) {r("warn", t.options.debugger, e, o);}, t.log = function (e, t, o) {r("log", t.options.debugger, e, o);}, t.warnLock = function (e) {console.warn(e);};}, 607: function _(e, t, r) {"use strict";var o = this && this.__createBinding || (Object.create ? function (e, t, r, o) {void 0 === o && (o = r), Object.defineProperty(e, o, { enumerable: !0, get: function get() {return t[r];} });} : function (e, t, r, o) {void 0 === o && (o = r), e[o] = t[r];}),n = this && this.__exportStar || function (e, t) {for (var r in e) {"default" === r || Object.prototype.hasOwnProperty.call(t, r) || o(t, e, r);}};Object.defineProperty(t, "__esModule", { value: !0 }), t.createRouter = t.RouterMount = t.runtimeQuit = void 0, n(r(366), t), n(r(309), t);var a = r(814);Object.defineProperty(t, "runtimeQuit", { enumerable: !0, get: function get() {return a.runtimeQuit;} });var i = r(963);Object.defineProperty(t, "RouterMount", { enumerable: !0, get: function get() {return i.RouterMount;} }), Object.defineProperty(t, "createRouter", { enumerable: !0, get: function get() {return i.createRouter;} });}, 366: function _(e, t) {"use strict";var r, o, n;Object.defineProperty(t, "__esModule", { value: !0 }), t.rewriteMethodToggle = t.navtypeToggle = t.hookToggle = void 0, (n = t.hookToggle || (t.hookToggle = {})).beforeHooks = "beforeEach", n.afterHooks = "afterEach", n.enterHooks = "beforeEnter", (o = t.navtypeToggle || (t.navtypeToggle = {})).push = "navigateTo", o.replace = "redirectTo", o.replaceAll = "reLaunch", o.pushTab = "switchTab", o.back = "navigateBack", (r = t.rewriteMethodToggle || (t.rewriteMethodToggle = {})).navigateTo = "push", r.navigate = "push", r.redirectTo = "replace", r.reLaunch = "replaceAll", r.switchTab = "pushTab", r.navigateBack = "back";}, 309: function _(e, t) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });}, 169: function _(e, t, r) {"use strict";var o = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;};Object.defineProperty(t, "__esModule", { value: !0 }), t.loopCallHook = t.transitionTo = t.onTriggerEachHook = t.callHook = t.callBeforeRouteLeave = t.HOOKLIST = t.ERRORHOOK = void 0;var n = r(789),a = r(890),i = r(147);function u(e, t, r, o) {var a,i = n.getUniCachePage(0);if (Object.keys(i).length > 0) {var u = void 0;switch ("h5" === e.options.platform ? u = i.$options.beforeRouteLeave : null != i.$vm && (u = i.$vm.$options.beforeRouteLeave), n.getDataType(u)) {case "[object Array]":a = (a = u[0]).bind(i);break;case "[object Function]":a = u.bind(i.$vm);}}return l(a, t, r, e, o);}function l(e, t, r, o, n, a) {void 0 === a && (a = !0), null != e && e instanceof Function ? !0 === a ? e(t, r, n, o, !1) : (e(t, r, function () {}, o, !1), n()) : n();}function p(e, t, r, o, a, i) {var u = n.forMatNextToFrom(e, t, r),l = u.matTo,p = u.matFrom;"h5" === e.options.platform ? c(a, 0, i, e, l, p, o) : c(a.slice(0, 4), 0, function () {i(function () {c(a.slice(4), 0, n.voidFun, e, l, p, o);});}, e, l, p, o);}function c(e, r, i, u, l, p, s) {var f = n.routesForMapRoute(u, l.path, ["finallyPathMap", "pathMap"]);if (e.length - 1 < r) return i();var h = e[r],v = t.ERRORHOOK[0];h(u, l, p, f, function (t) {if (!1 === t) "h5" === u.options.platform && i(!1), v({ type: 0, msg: "管道函数传递 false 导航被终止!", matTo: l, matFrom: p, nextTo: t }, u);else if ("string" == typeof t || "object" == typeof t) {var n = s,f = t;if ("object" == typeof t) {var h = t.NAVTYPE;f = o(t, ["NAVTYPE"]), null != h && (n = h);}a.navjump(f, u, n, { from: p, next: i });} else null == t ? (r++, c(e, r, i, u, l, p, s)) : v({ type: 1, msg: "管道函数传递未知类型，无法被识别。导航被终止！", matTo: l, matFrom: p, nextTo: t }, u);});}t.ERRORHOOK = [function (e, t) {return t.lifeCycle.routerErrorHooks[0](e, t);}], t.HOOKLIST = [function (e, t, r, o, n) {return l(e.lifeCycle.routerBeforeHooks[0], t, r, e, n);}, function (e, t, r, o, n) {return u(e, t, r, n);}, function (e, t, r, o, n) {return l(e.lifeCycle.beforeHooks[0], t, r, e, n);}, function (e, t, r, o, n) {return l(o.beforeEnter, t, r, e, n);}, function (e, t, r, o, n) {return l(e.lifeCycle.afterHooks[0], t, r, e, n, !1);}, function (e, t, r, o, n) {return e.$lockStatus = !1, "h5" === e.options.platform && i.proxyH5Mount(e), l(e.lifeCycle.routerAfterHooks[0], t, r, e, n, !1);}], t.callBeforeRouteLeave = u, t.callHook = l, t.onTriggerEachHook = function (e, r, o, n, a) {var i = [];switch (n) {case "beforeEach":i = t.HOOKLIST.slice(0, 3);break;case "afterEach":i = t.HOOKLIST.slice(4);break;case "beforeEnter":i = t.HOOKLIST.slice(3, 4);}p(o, e, r, "push", i, a);}, t.transitionTo = p, t.loopCallHook = c;}, 890: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.createRoute = t.forceGuardEach = t.backOptionsBuild = t.navjump = t.lockNavjump = void 0;var n = r(366),a = r(99),i = r(789),u = r(169),l = r(845),p = r(169);function c(e, t, r, o, n) {i.lockDetectWarn(t, e, r, function () {"h5" !== t.options.platform && (t.$lockStatus = !0), s(e, t, r, void 0, o, n);});}function s(e, t, r, c, s, h, v) {if (void 0 === v && (v = !0), "back" === r) {var y;if (y = "string" == typeof e ? +e : e.delta || 1, "h5" === t.options.platform) {t.$route.go(-y);var g = (h || { success: i.voidFun }).success || i.voidFun,d = (h || { complete: i.voidFun }).complete || i.voidFun;return g({ errMsg: "navigateBack:ok" }), void d({ errMsg: "navigateBack:ok" });}e = f(t, y, h);}e = i.reservedWord(e);var m = a.queryPageToMap(e, t).rule;m.type = n.navtypeToggle[r];var b = i.paramsToQuery(t, m),O = a.resolveQuery(b, t);if ("h5" === t.options.platform) {if ("push" !== r && (r = "replace"), null != c) c.next(o({ replace: "push" !== r }, O));else if ("push" === r && Reflect.has(O, "events")) {if (Reflect.has(O, "name")) throw new Error("在h5端上使用 'push'、'navigateTo' 跳转时，如果包含 events 不允许使用 name 跳转，因为 name 实现了动态路由。请更换为 path 或者 url 跳转！");uni.navigateTo(O, !0, i.voidFun, s);} else t.$route[r](O, O.success || i.voidFun, O.fail || i.voidFun);} else {var P = { path: "" };if (null == c) {var k = i.routesForMapRoute(t, O.path, ["finallyPathMap", "pathMap"]);k = i.notRouteTo404(t, k, O, r), O = o(o(o(o({}, k), { params: {} }), O), { path: k.path }), P = l.createToFrom(O, t);} else P = c.from;if (l.createFullPath(O, P), !1 === v) return O;u.transitionTo(t, O, P, r, p.HOOKLIST, function (e) {uni[n.navtypeToggle[r]](O, !0, e, s);});}}function f(e, t, r) {var n = h(e, t),a = o(o({}, r || {}), { path: n.path, query: n.query, delta: t });if ("[object Object]" === i.getDataType(r)) {var u = r,l = u.animationDuration,p = u.animationType;null != l && (a.animationDuration = l), null != p && (a.animationType = p);var c = r.from;null != c && (a.BACKTYPE = c);}return a;}function h(e, t, r) {void 0 === t && (t = 0);var u = { name: "", meta: {}, path: "", fullPath: "", NAVTYPE: "", query: {}, params: {}, BACKTYPE: (r || { BACKTYPE: "" }).BACKTYPE || "" };if (19970806 === t) return u;if ("h5" === e.options.platform) {var l = { path: "" };l = null != r ? r : e.$route.currentRoute;var p = i.copyData(l.params);delete p.__id__;var c = a.parseQuery(o(o({}, p), i.copyData(l.query)), e);l = o(o({}, l), { query: c }), u.path = l.path, u.fullPath = l.fullPath || "", u.query = l.query || {}, u.NAVTYPE = n.rewriteMethodToggle[l.type || "reLaunch"];} else {var s = {};if (null != r) s = o(o({}, r), { openType: r.type });else {var f = i.getUniCachePage(t);if (0 === Object.keys(f).length) throw e.options.routerErrorEach({ type: 3, msg: "不存在的页面栈，请确保有足够的页面可用，当前 level:" + t }, e), new Error("不存在的页面栈，请确保有足够的页面可用，当前 level:" + t);var h = f.options || {},v = h.query;null != v && 1 === Object.keys(h).length && (h = JSON.parse(decodeURIComponent(v)));var y = JSON.parse(decodeURIComponent(JSON.stringify(h)));s = o(o({}, f.$page || {}), { query: y, fullPath: decodeURIComponent((f.$page || {}).fullPath || "/" + f.route) }), "app-plus" !== e.options.platform && (s.path = "/" + f.route);}var g = s.openType;u.query = s.query, u.path = s.path, u.fullPath = s.fullPath, u.NAVTYPE = n.rewriteMethodToggle[g || "reLaunch"];}var d = i.routesForMapRoute(e, u.path, ["finallyPathMap", "pathMap"]),m = o(o({}, u), d);return m.query = a.parseQuery(m.query, e), m;}t.lockNavjump = c, t.navjump = s, t.backOptionsBuild = f, t.forceGuardEach = function (e, t, r) {if (void 0 === t && (t = "replaceAll"), void 0 === r && (r = !1), "h5" === e.options.platform) throw new Error("在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用");var o = i.getUniCachePage(0);0 === Object.keys(o).length && e.options.routerErrorEach({ type: 3, msg: "不存在的页面栈，请确保有足够的页面可用，当前 level:0" }, e);var n = o;c({ path: "/" + n.route, query: n.options }, e, t, r);}, t.createRoute = h;}, 845: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.proxyPageHook = t.createFullPath = t.createToFrom = void 0;var o = r(789),n = r(890),a = r(99);t.createToFrom = function (e, t) {var r = o.getUniCachePage(0);return "[object Array]" === o.getDataType(r) ? o.deepClone(e) : n.createRoute(t);}, t.createFullPath = function (e, t) {if (null == e.fullPath) {var r = a.stringifyQuery(e.query);e.fullPath = e.path + r;}null == t.fullPath && (r = a.stringifyQuery(t.query), t.fullPath = t.path + r);}, t.proxyPageHook = function (e, t, r, n) {o.replaceHook(t, e, r, n);};}, 99: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.stringifyQuery = t.parseQuery = t.resolveQuery = t.queryPageToMap = void 0;var n = r(789),a = r(169),i = r(883),u = /[!'()*]/g,l = function l(e) {return "%" + e.charCodeAt(0).toString(16);},p = /%2C/g,c = function c(e) {return encodeURIComponent(e).replace(u, l).replace(p, ",");};t.queryPageToMap = function (e, t) {var r = {},i = "",u = e.success,l = e.fail;if ("[object Object]" === n.getDataType(e)) {var p = e;if (null != p.path) {var c = n.urlToJson(p.path),s = c.path,f = c.query;i = n.routesForMapRoute(t, s, ["finallyPathList", "pathMap"]), r = o(o({}, f), e.query || {}), p.path = s, p.query = r, delete e.params;} else null != p.name ? null == (i = t.routesMap.nameMap[p.name]) ? i = n.getWildcardRule(t, { type: 2, msg: "命名路由为：" + p.name + " 的路由，无法在路由表中找到！", toRule: e }) : (r = e.params || {}, delete e.query) : i = n.getWildcardRule(t, { type: 2, msg: e + " 解析失败，请检测当前路由表下是否有包含。", toRule: e });} else e = n.urlToJson(e), i = n.routesForMapRoute(t, e.path, ["finallyPathList", "pathMap"]), r = e.query;if ("h5" === t.options.platform) {n.getRoutePath(i, t).finallyPath.includes(":") && null == e.name && a.ERRORHOOK[0]({ type: 2, msg: "当有设置 alias或者aliasPath 为动态路由时，不允许使用 path 跳转。请使用 name 跳转！", route: i }, t);var h = e.complete,v = e.success,y = e.fail;if ("[object Function]" === n.getDataType(h)) {var g = function g(e, t) {"[object Function]" === n.getDataType(t) && t.apply(this, e), h.apply(this, e);};u = function u() {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}g.call(this, e, v);}, l = function l() {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}g.call(this, e, y);};}}var d = e;return "[object Function]" === n.getDataType(d.success) && (d.success = u), "[object Function]" === n.getDataType(d.fail) && (d.fail = l), { rule: d, route: i, query: r };}, t.resolveQuery = function (e, t) {var r = "query";null != e.params && (r = "params"), null != e.query && (r = "query");var o = n.copyData(e[r] || {}),a = t.options.resolveQuery;if (a) {var u = a(o);"[object Object]" !== n.getDataType(u) ? i.warn("请按格式返回参数： resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t) : e[r] = u;} else {if (!n.assertDeepObject(o)) return e;var l = JSON.stringify(o);e[r] = { query: l };}return e;}, t.parseQuery = function (e, t) {var r = t.options.parseQuery;if (r) e = r(n.copyData(e)), "[object Object]" !== n.getDataType(e) && i.warn("请按格式返回参数： parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t);else if (Reflect.get(e, "query")) {var o = Reflect.get(e, "query"),a = { query: decodeURIComponent(o) };try {if ("object" == typeof (a = JSON.parse(a.query))) return a;} catch (e) {i.warn("尝试解析深度对象失败，按原样输出。" + e, t);}}return e;}, t.stringifyQuery = function (e) {var t = e ? Object.keys(e).map(function (t) {var r = e[t];if (void 0 === r) return "";if (null === r) return c(t);if (Array.isArray(r)) {var o = [];return r.forEach(function (e) {void 0 !== e && (null === e ? o.push(c(t)) : o.push(c(t) + "=" + c(e)));}), o.join("&");}return c(t) + "=" + c(r);}).filter(function (e) {return e.length > 0;}).join("&") : null;return t ? "?" + t : "";};}, 314: function _(e, t, r) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.rewriteMethod = void 0;var o = r(366),n = r(789),a = r(883),i = r(809),u = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];t.rewriteMethod = function (e) {!1 === e.options.keepUniOriginNav && u.forEach(function (t) {var r = uni[t];uni[t] = function (u, l, p, c) {void 0 === l && (l = !1), l ? i.uniOriginJump(e, r, t, u, p, c) : ("app-plus" === e.options.platform && 0 === Object.keys(e.appMain).length && (e.appMain = { NAVTYPE: t, path: u.url }), function (e, t, r) {if ("app-plus" === r.options.platform) {var i = null;e && (i = e.openType), null != i && "appLaunch" === i && (t = "reLaunch");}if ("reLaunch" === t && '{"url":"/"}' === JSON.stringify(e) && (a.warn("uni-app 原生方法：reLaunch({url:'/'}) 默认被重写啦！你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch({url:'/?xxx=xxx'})", r, !0), t = "navigateBack", e = { from: "backbutton" }), "navigateBack" === t) {var u = 1;null == e && (e = { delta: 1 }), "[object Number]" === n.getDataType(e.delta) && (u = e.delta), r.back(u, e);} else {var l = o.rewriteMethodToggle[t],p = e.url;if (!p.startsWith("/")) {var c = n.resolveAbsolutePath(p, r);p = c, e.url = c;}if ("switchTab" === t) {var s = n.routesForMapRoute(r, p, ["pathMap", "finallyPathList"]),f = n.getRoutePath(s, r).finallyPath;if ("[object Array]" === n.getDataType(f) && a.warn("uni-app 原生方法跳转路径为：" + p + "。此路为是tab页面时，不允许设置 alias 为数组的情况，并且不能为动态路由！当然你可以通过通配符*解决！", r, !0), "*" === f && a.warn("uni-app 原生方法跳转路径为：" + p + "。在路由表中找不到相关路由表！当然你可以通过通配符*解决！", r, !0), "h5" === r.options.platform) {var h = e.success;e.success = function () {for (var t = [], r = 0; r < arguments.length; r++) {t[r] = arguments[r];}null == h || h.apply(null, t), n.timeOut(150).then(function () {var t = e.detail || {};if (Object.keys(t).length > 0 && Reflect.has(t, "index")) {var r = n.getUniCachePage(0);if (0 === Object.keys(r).length) return !1;var o = r,a = o.$options.onTabItemTap;if (a) for (var i = 0; i < a.length; i++) {a[i].call(o, t);}}});};}p = f;}var v = e,y = v.events,g = v.success,d = v.fail,m = v.complete,b = v.animationType,O = { path: p, events: y, success: g, fail: d, complete: m, animationDuration: v.animationDuration, animationType: b };r[l](n.notDeepClearNull(O));}}(u, t, e));};});};}, 963: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);};Object.defineProperty(t, "__esModule", { value: !0 }), t.createRouter = t.RouterMount = void 0;var n = r(282),a = r(789),i = r(662),u = r(460),l = r(890),p = r(314),c = function c() {},s = new Promise(function (e) {return c = e;});t.createRouter = function (e) {var t = a.assertNewOptions(e),r = { options: t, mount: [], Vue: null, appProxyHook: n.appProxyHook, appletsProxyHook: n.indexProxyHook, appMain: {}, enterPath: "", $route: null, $lockStatus: !1, routesMap: {}, lifeCycle: i.registerRouterHooks(n.lifeCycle, t), push: function push(e) {l.lockNavjump(e, r, "push");}, replace: function replace(e) {l.lockNavjump(e, r, "replace");}, replaceAll: function replaceAll(e) {l.lockNavjump(e, r, "replaceAll");}, pushTab: function pushTab(e) {l.lockNavjump(e, r, "pushTab");}, back: function back(e, t) {void 0 === e && (e = 1), "[object Object]" !== a.getDataType(t) ? t = { from: "navigateBack" } : Reflect.has(t, "from") || (t = o(o({}, t), { from: "navigateBack" })), l.lockNavjump(e + "", r, "back", void 0, t);}, forceGuardEach: function forceGuardEach(e, t) {l.forceGuardEach(r, e, t);}, beforeEach: function beforeEach(e) {i.registerEachHooks(r, "beforeHooks", e);}, afterEach: function afterEach(e) {i.registerEachHooks(r, "afterHooks", e);}, install: function install(e) {r.Vue = e, p.rewriteMethod(this), u.initMixins(e, this), Object.defineProperty(e.prototype, "$Router", { get: function get() {return r;} }), Object.defineProperty(e.prototype, "$Route", { get: function get() {return l.createRoute(r);} }), Object.defineProperty(e.prototype, "$AppReady", { get: function get() {return "h5" === r.options.platform ? Promise.resolve() : s;}, set: function set(e) {!0 === e && c();} });} };return a.def(r, "keyword", function () {return n.keyword;}), a.def(r, "currentRoute", function () {return l.createRoute(r);}), r.beforeEach(function (e, t, r) {return r();}), r.afterEach(function () {}), r;}, t.RouterMount = function (e, t, r) {if (void 0 === r && (r = "#app"), "[object Array]" !== a.getDataType(t.mount)) throw new Error("挂载路由失败，router.app 应该为数组类型。当前类型：" + typeof t.mount);if (t.mount.push({ app: e, el: r }), "h5" === t.options.platform) {var o = t.$route;o.replace({ path: o.currentRoute.fullPath });}};}, 809: function _(e, t, r) {"use strict";var o = this && this.__assign || function () {return (o = Object.assign || function (e) {for (var t, r = 1, o = arguments.length; r < o; r++) {for (var n in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}}return e;}).apply(this, arguments);},n = this && this.__awaiter || function (e, t, r, o) {return new (r || (r = Promise))(function (n, a) {function i(e) {try {l(o.next(e));} catch (e) {a(e);}}function u(e) {try {l(o.throw(e));} catch (e) {a(e);}}function l(e) {var t;e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {e(t);})).then(i, u);}l((o = o.apply(e, t || [])).next());});},a = this && this.__generator || function (e, t) {var r,o,n,a,i = { label: 0, sent: function sent() {if (1 & n[0]) throw n[1];return n[1];}, trys: [], ops: [] };return a = { next: u(0), throw: u(1), return: u(2) }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {return this;}), a;function u(a) {return function (u) {return function (a) {if (r) throw new TypeError("Generator is already executing.");for (; i;) {try {if (r = 1, o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, a[1])).done) return n;switch (o = 0, n && (a = [2 & a[0], n.value]), a[0]) {case 0:case 1:n = a;break;case 4:return i.label++, { value: a[1], done: !1 };case 5:i.label++, o = a[1], a = [0];continue;case 7:a = i.ops.pop(), i.trys.pop();continue;default:if (!((n = (n = i.trys).length > 0 && n[n.length - 1]) || 6 !== a[0] && 2 !== a[0])) {i = 0;continue;}if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {i.label = a[1];break;}if (6 === a[0] && i.label < n[1]) {i.label = n[1], n = a;break;}if (n && i.label < n[2]) {i.label = n[2], i.ops.push(a);break;}n[2] && i.ops.pop(), i.trys.pop();continue;}a = t.call(e, i);} catch (e) {a = [6, e], o = 0;} finally {r = n = 0;}}if (5 & a[0]) throw a[1];return { value: a[0] ? a[1] : void 0, done: !0 };}([a, u]);};}},i = this && this.__rest || function (e, t) {var r = {};for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);}if (null != e && "function" == typeof Object.getOwnPropertySymbols) {var n = 0;for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);}}return r;};Object.defineProperty(t, "__esModule", { value: !0 }), t.formatOriginURLQuery = t.uniOriginJump = void 0;var u = r(99),l = r(789),p = r(282),c = 0,s = "reLaunch";function f(e, t, r) {var n,a = t.url,i = t.path,p = t.query,c = t.animationType,s = t.animationDuration,f = t.events,h = t.success,v = t.fail,y = t.complete,g = t.delta,d = t.animation,m = u.stringifyQuery(p || {}),b = "" === m ? i || a : (i || a) + m,O = {};return "app-plus" === e.options.platform && "navigateBack" !== r && (O = (null === (n = e.options.APP) || void 0 === n ? void 0 : n.animation) || {}, O = o(o({}, O), d || {})), l.notDeepClearNull({ delta: g, url: b, animationType: c || O.animationType, animationDuration: s || O.animationDuration, events: f, success: h, fail: v, complete: y });}t.uniOriginJump = function (e, t, r, u, h, v) {var y = f(e, u, r),g = y.complete,d = i(y, ["complete"]),m = e.options.platform.trim();0 === c && "h5" !== m && l.resetPageHook(e, d.url), null != v && !1 === v ? (0 === c && (c++, "h5" !== m && (e.Vue.prototype.$AppReady = !0)), g && g.apply(null, { msg: "forceGuardEach强制触发并且不执行跳转" }), h && h.apply(null, { msg: "forceGuardEach强制触发并且不执行跳转" })) : t(o(o({}, d), { from: u.BACKTYPE, complete: function complete() {for (var t, o, i, u, f = [], v = 0; v < arguments.length; v++) {f[v] = arguments[v];}return n(this, void 0, void 0, function () {var n, v, y;return a(this, function (a) {switch (a.label) {case 0:return 0 === c && (c++, "h5" !== m && (e.Vue.prototype.$AppReady = !0), "app-plus" === m && ((n = plus.nativeObj.View.getViewById("router-loadding")) && n.close(), (v = null === (t = e.options.APP) || void 0 === t ? void 0 : t.launchedHook) && v())), y = 0, new RegExp(p.mpPlatformReg, "g").test(m) ? y = null === (o = e.options.applet) || void 0 === o ? void 0 : o.animationDuration : "app-plus" === m && "navigateBack" === r && "navigateTo" === s && (y = null === (u = null === (i = e.options.APP) || void 0 === i ? void 0 : i.animation) || void 0 === u ? void 0 : u.animationDuration), "navigateTo" !== r && "navigateBack" !== r || 0 === y ? [3, 2] : [4, l.timeOut(y)];case 1:a.sent(), a.label = 2;case 2:return s = r, g && g.apply(null, f), h && h.apply(null, f), [2];}});});} }));}, t.formatOriginURLQuery = f;} }, t = {}, function r(o) {if (t[o]) return t[o].exports;var n = t[o] = { exports: {} };return e[o].call(n.exports, n, n.exports, r), n.exports;}(607);var e, t;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/*!**************************************************************!*\
  !*** E:/project/uView_default/components/CityPicker/city.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.city = exports.hotCityList = void 0;var hotCityList = [
{
  adcode: "110000",
  name: "北京市",
  spell: "Beijing",
  lng: 116.405285,
  lat: 39.904989,
  areaCode: "010" },

{
  adcode: "310000",
  name: "上海市",
  spell: "Shanghai",
  lng: 121.472644,
  lat: 31.231706,
  areaCode: "021" },

{
  adcode: "440100",
  name: "广州市",
  spell: "Guangzhou",
  lng: 113.280637,
  lat: 23.125178,
  areaCode: "020" },

{
  adcode: "440300",
  name: "深圳市",
  spell: "Shenzhen",
  lng: 114.085947,
  lat: 22.547,
  areaCode: "0755" },

{
  adcode: "330100",
  name: "杭州市",
  spell: "Hangzhou",
  lng: 120.153576,
  lat: 30.287459,
  areaCode: "0571" },

{
  adcode: "500000",
  name: "重庆市",
  spell: "Chongqing",
  lng: 106.504962,
  lat: 29.533155,
  areaCode: "023" },

{
  adcode: "510100",
  name: "成都市",
  spell: "Chengdu",
  lng: 104.065735,
  lat: 30.659462,
  areaCode: "028" },

{
  adcode: "320100",
  name: "南京市",
  spell: "Nanjing",
  lng: 118.767413,
  lat: 32.041544,
  areaCode: "025" },

{
  adcode: "321000",
  name: "扬州市",
  spell: "Yangzhou",
  lng: 119.421003,
  lat: 32.393159,
  areaCode: "0514" }];exports.hotCityList = hotCityList;



var city = [
{
  "adcode": "110000",
  "name": "北京市",
  "spell": "Beijing",
  "lng": 116.405285,
  "lat": 39.904989,
  "areaCode": "010" },

{
  "adcode": "120000",
  "name": "天津市",
  "spell": "Tianjin",
  "lng": 117.190182,
  "lat": 39.125596,
  "areaCode": "022" },

{
  "adcode": "130100",
  "name": "石家庄市",
  "spell": "Shijiazhuang",
  "lng": 114.502461,
  "lat": 38.045474,
  "areaCode": "0311" },

{
  "adcode": "130200",
  "name": "唐山市",
  "spell": "Tangshan",
  "lng": 118.175393,
  "lat": 39.635113,
  "areaCode": "0315" },

{
  "adcode": "130300",
  "name": "秦皇岛市",
  "spell": "Qinhuangdao",
  "lng": 119.586579,
  "lat": 39.942531,
  "areaCode": "0335" },

{
  "adcode": "130400",
  "name": "邯郸市",
  "spell": "Handan",
  "lng": 114.490686,
  "lat": 36.612273,
  "areaCode": "0310" },

{
  "adcode": "130500",
  "name": "邢台市",
  "spell": "Xingtai",
  "lng": 114.508851,
  "lat": 37.0682,
  "areaCode": "0319" },

{
  "adcode": "130600",
  "name": "保定市",
  "spell": "Baoding",
  "lng": 115.482331,
  "lat": 38.867657,
  "areaCode": "0312" },

{
  "adcode": "130700",
  "name": "张家口市",
  "spell": "Zhangjiakou",
  "lng": 114.884091,
  "lat": 40.811901,
  "areaCode": "0313" },

{
  "adcode": "130800",
  "name": "承德市",
  "spell": "Chengde",
  "lng": 117.939152,
  "lat": 40.976204,
  "areaCode": "0314" },

{
  "adcode": "130900",
  "name": "沧州市",
  "spell": "Cangzhou",
  "lng": 116.857461,
  "lat": 38.310582,
  "areaCode": "0317" },

{
  "adcode": "131000",
  "name": "廊坊市",
  "spell": "Langfang",
  "lng": 116.713873,
  "lat": 39.529244,
  "areaCode": "0316" },

{
  "adcode": "131100",
  "name": "衡水市",
  "spell": "Hengshui",
  "lng": 115.665993,
  "lat": 37.735097,
  "areaCode": "0318" },

{
  "adcode": "140100",
  "name": "太原市",
  "spell": "Taiyuan",
  "lng": 112.549248,
  "lat": 37.857014,
  "areaCode": "0351" },

{
  "adcode": "140200",
  "name": "大同市",
  "spell": "Datong",
  "lng": 113.295259,
  "lat": 40.09031,
  "areaCode": "0352" },

{
  "adcode": "140300",
  "name": "阳泉市",
  "spell": "Yangquan",
  "lng": 113.583285,
  "lat": 37.861188,
  "areaCode": "0353" },

{
  "adcode": "140400",
  "name": "长治市",
  "spell": "Changzhi",
  "lng": 113.113556,
  "lat": 36.191112,
  "areaCode": "0355" },

{
  "adcode": "140500",
  "name": "晋城市",
  "spell": "Jincheng",
  "lng": 112.851274,
  "lat": 35.497553,
  "areaCode": "0356" },

{
  "adcode": "140600",
  "name": "朔州市",
  "spell": "Shuozhou",
  "lng": 112.433387,
  "lat": 39.331261,
  "areaCode": "0349" },

{
  "adcode": "140700",
  "name": "晋中市",
  "spell": "Jinzhong",
  "lng": 112.736465,
  "lat": 37.696495,
  "areaCode": "0354" },

{
  "adcode": "140800",
  "name": "运城市",
  "spell": "Yuncheng",
  "lng": 111.003957,
  "lat": 35.022778,
  "areaCode": "0359" },

{
  "adcode": "140900",
  "name": "忻州市",
  "spell": "Xinzhou",
  "lng": 112.733538,
  "lat": 38.41769,
  "areaCode": "0350" },

{
  "adcode": "141000",
  "name": "临汾市",
  "spell": "Linfen",
  "lng": 111.517973,
  "lat": 36.08415,
  "areaCode": "0357" },

{
  "adcode": "141100",
  "name": "吕梁市",
  "spell": "Lvliang",
  "lng": 111.134335,
  "lat": 37.524366,
  "areaCode": "0358" },

{
  "adcode": "150100",
  "name": "呼和浩特市",
  "spell": "Hohhot",
  "lng": 111.670801,
  "lat": 40.818311,
  "areaCode": "0471" },

{
  "adcode": "150200",
  "name": "包头市",
  "spell": "Baotou",
  "lng": 109.840405,
  "lat": 40.658168,
  "areaCode": "0472" },

{
  "adcode": "150300",
  "name": "乌海市",
  "spell": "Wuhai",
  "lng": 106.825563,
  "lat": 39.673734,
  "areaCode": "0473" },

{
  "adcode": "150400",
  "name": "赤峰市",
  "spell": "Chifeng",
  "lng": 118.956806,
  "lat": 42.275317,
  "areaCode": "0476" },

{
  "adcode": "150500",
  "name": "通辽市",
  "spell": "Tongliao",
  "lng": 122.263119,
  "lat": 43.617429,
  "areaCode": "0475" },

{
  "adcode": "150600",
  "name": "鄂尔多斯市",
  "spell": "Ordos",
  "lng": 109.99029,
  "lat": 39.817179,
  "areaCode": "0477" },

{
  "adcode": "150700",
  "name": "呼伦贝尔市",
  "spell": "Hulunber",
  "lng": 119.758168,
  "lat": 49.215333,
  "areaCode": "0470" },

{
  "adcode": "150800",
  "name": "巴彦淖尔市",
  "spell": "Bayan Nur",
  "lng": 107.416959,
  "lat": 40.757402,
  "areaCode": "0478" },

{
  "adcode": "150900",
  "name": "乌兰察布市",
  "spell": "Ulanqab",
  "lng": 113.114543,
  "lat": 41.034126,
  "areaCode": "0474" },

{
  "adcode": "152200",
  "name": "兴安盟",
  "spell": "Hinggan",
  "lng": 122.070317,
  "lat": 46.076268,
  "areaCode": "0482" },

{
  "adcode": "152500",
  "name": "锡林郭勒盟",
  "spell": "Xilin Gol",
  "lng": 116.090996,
  "lat": 43.944018,
  "areaCode": "0479" },

{
  "adcode": "152900",
  "name": "阿拉善盟",
  "spell": "Alxa",
  "lng": 105.706422,
  "lat": 38.844814,
  "areaCode": "0483" },

{
  "adcode": "210100",
  "name": "沈阳市",
  "spell": "Shenyang",
  "lng": 123.429096,
  "lat": 41.796767,
  "areaCode": "024" },

{
  "adcode": "210200",
  "name": "大连市",
  "spell": "Dalian",
  "lng": 121.618622,
  "lat": 38.91459,
  "areaCode": "0411" },

{
  "adcode": "210300",
  "name": "鞍山市",
  "spell": "Anshan",
  "lng": 122.995632,
  "lat": 41.110626,
  "areaCode": "0412" },

{
  "adcode": "210400",
  "name": "抚顺市",
  "spell": "Fushun",
  "lng": 123.921109,
  "lat": 41.875956,
  "areaCode": "0413" },

{
  "adcode": "210500",
  "name": "本溪市",
  "spell": "Benxi",
  "lng": 123.770519,
  "lat": 41.297909,
  "areaCode": "0414" },

{
  "adcode": "210600",
  "name": "丹东市",
  "spell": "Dandong",
  "lng": 124.383044,
  "lat": 40.124296,
  "areaCode": "0415" },

{
  "adcode": "210700",
  "name": "锦州市",
  "spell": "Jinzhou",
  "lng": 121.135742,
  "lat": 41.119269,
  "areaCode": "0416" },

{
  "adcode": "210800",
  "name": "营口市",
  "spell": "Yingkou",
  "lng": 122.235151,
  "lat": 40.667432,
  "areaCode": "0417" },

{
  "adcode": "210900",
  "name": "阜新市",
  "spell": "Fuxin",
  "lng": 121.648962,
  "lat": 42.011796,
  "areaCode": "0418" },

{
  "adcode": "211000",
  "name": "辽阳市",
  "spell": "Liaoyang",
  "lng": 123.18152,
  "lat": 41.269402,
  "areaCode": "0419" },

{
  "adcode": "211100",
  "name": "盘锦市",
  "spell": "Panjin",
  "lng": 122.06957,
  "lat": 41.124484,
  "areaCode": "0427" },

{
  "adcode": "211200",
  "name": "铁岭市",
  "spell": "Tieling",
  "lng": 123.844279,
  "lat": 42.290585,
  "areaCode": "0410" },

{
  "adcode": "211300",
  "name": "朝阳市",
  "spell": "Chaoyang",
  "lng": 120.451176,
  "lat": 41.576758,
  "areaCode": "0421" },

{
  "adcode": "211400",
  "name": "葫芦岛市",
  "spell": "Huludao",
  "lng": 120.856394,
  "lat": 40.755572,
  "areaCode": "0429" },

{
  "adcode": "220100",
  "name": "长春市",
  "spell": "Changchun",
  "lng": 125.3245,
  "lat": 43.886841,
  "areaCode": "0431" },

{
  "adcode": "220200",
  "name": "吉林市",
  "spell": "Jilin",
  "lng": 126.55302,
  "lat": 43.843577,
  "areaCode": "0432" },

{
  "adcode": "220300",
  "name": "四平市",
  "spell": "Siping",
  "lng": 124.370785,
  "lat": 43.170344,
  "areaCode": "0434" },

{
  "adcode": "220400",
  "name": "辽源市",
  "spell": "Liaoyuan",
  "lng": 125.145349,
  "lat": 42.902692,
  "areaCode": "0437" },

{
  "adcode": "220500",
  "name": "通化市",
  "spell": "Tonghua",
  "lng": 125.936501,
  "lat": 41.721177,
  "areaCode": "0435" },

{
  "adcode": "220600",
  "name": "白山市",
  "spell": "Baishan",
  "lng": 126.427839,
  "lat": 41.942505,
  "areaCode": "0439" },

{
  "adcode": "220700",
  "name": "松原市",
  "spell": "Songyuan",
  "lng": 124.823608,
  "lat": 45.118243,
  "areaCode": "0438" },

{
  "adcode": "220800",
  "name": "白城市",
  "spell": "Baicheng",
  "lng": 122.841114,
  "lat": 45.619026,
  "areaCode": "0436" },

{
  "adcode": "222400",
  "name": "延边朝鲜族自治州",
  "spell": "Yanbian",
  "lng": 129.513228,
  "lat": 42.904823,
  "areaCode": "1433" },

{
  "adcode": "230100",
  "name": "哈尔滨市",
  "spell": "Harbin",
  "lng": 126.642464,
  "lat": 45.756967,
  "areaCode": "0451" },

{
  "adcode": "230200",
  "name": "齐齐哈尔市",
  "spell": "Qiqihar",
  "lng": 123.953486,
  "lat": 47.348079,
  "areaCode": "0452" },

{
  "adcode": "230300",
  "name": "鸡西市",
  "spell": "Jixi",
  "lng": 130.975966,
  "lat": 45.300046,
  "areaCode": "0467" },

{
  "adcode": "230400",
  "name": "鹤岗市",
  "spell": "Hegang",
  "lng": 130.277487,
  "lat": 47.332085,
  "areaCode": "0468" },

{
  "adcode": "230500",
  "name": "双鸭山市",
  "spell": "Shuangyashan",
  "lng": 131.157304,
  "lat": 46.643442,
  "areaCode": "0469" },

{
  "adcode": "230600",
  "name": "大庆市",
  "spell": "Daqing",
  "lng": 125.11272,
  "lat": 46.590734,
  "areaCode": "0459" },

{
  "adcode": "230700",
  "name": "伊春市",
  "spell": "Yichun",
  "lng": 128.899396,
  "lat": 47.724775,
  "areaCode": "0458" },

{
  "adcode": "230800",
  "name": "佳木斯市",
  "spell": "Jiamusi",
  "lng": 130.361634,
  "lat": 46.809606,
  "areaCode": "0454" },

{
  "adcode": "230900",
  "name": "七台河市",
  "spell": "Qitaihe",
  "lng": 131.015584,
  "lat": 45.771266,
  "areaCode": "0464" },

{
  "adcode": "231000",
  "name": "牡丹江市",
  "spell": "Mudanjiang",
  "lng": 129.618602,
  "lat": 44.582962,
  "areaCode": "0453" },

{
  "adcode": "231100",
  "name": "黑河市",
  "spell": "Heihe",
  "lng": 127.499023,
  "lat": 50.249585,
  "areaCode": "0456" },

{
  "adcode": "231200",
  "name": "绥化市",
  "spell": "Suihua",
  "lng": 126.99293,
  "lat": 46.637393,
  "areaCode": "0455" },

{
  "adcode": "232700",
  "name": "大兴安岭地区",
  "spell": "Da Hinggan Ling",
  "lng": 124.711526,
  "lat": 52.335262,
  "areaCode": "0457" },

{
  "adcode": "310000",
  "name": "上海市",
  "spell": "Shanghai",
  "lng": 121.472644,
  "lat": 31.231706,
  "areaCode": "021" },

{
  "adcode": "320100",
  "name": "南京市",
  "spell": "Nanjing",
  "lng": 118.767413,
  "lat": 32.041544,
  "areaCode": "025" },

{
  "adcode": "320200",
  "name": "无锡市",
  "spell": "Wuxi",
  "lng": 120.301663,
  "lat": 31.574729,
  "areaCode": "0510" },

{
  "adcode": "320300",
  "name": "徐州市",
  "spell": "Xuzhou",
  "lng": 117.184811,
  "lat": 34.261792,
  "areaCode": "0516" },

{
  "adcode": "320400",
  "name": "常州市",
  "spell": "Changzhou",
  "lng": 119.946973,
  "lat": 31.772752,
  "areaCode": "0519" },

{
  "adcode": "320500",
  "name": "苏州市",
  "spell": "Suzhou",
  "lng": 120.619585,
  "lat": 31.299379,
  "areaCode": "0512" },

{
  "adcode": "320600",
  "name": "南通市",
  "spell": "Nantong",
  "lng": 120.864608,
  "lat": 32.016212,
  "areaCode": "0513" },

{
  "adcode": "320700",
  "name": "连云港市",
  "spell": "Lianyungang",
  "lng": 119.178821,
  "lat": 34.600018,
  "areaCode": "0518" },

{
  "adcode": "320800",
  "name": "淮安市",
  "spell": "Huai'an",
  "lng": 119.021265,
  "lat": 33.597506,
  "areaCode": "0517" },

{
  "adcode": "320900",
  "name": "盐城市",
  "spell": "Yancheng",
  "lng": 120.139998,
  "lat": 33.377631,
  "areaCode": "0515" },

{
  "adcode": "321000",
  "name": "扬州市",
  "spell": "Yangzhou",
  "lng": 119.421003,
  "lat": 32.393159,
  "areaCode": "0514" },

{
  "adcode": "321100",
  "name": "镇江市",
  "spell": "Zhenjiang",
  "lng": 119.452753,
  "lat": 32.204402,
  "areaCode": "0511" },

{
  "adcode": "321200",
  "name": "泰州市",
  "spell": "Taizhou",
  "lng": 119.915176,
  "lat": 32.484882,
  "areaCode": "0523" },

{
  "adcode": "321300",
  "name": "宿迁市",
  "spell": "Suqian",
  "lng": 118.293328,
  "lat": 33.945154,
  "areaCode": "0527" },

{
  "adcode": "330100",
  "name": "杭州市",
  "spell": "Hangzhou",
  "lng": 120.153576,
  "lat": 30.287459,
  "areaCode": "0571" },

{
  "adcode": "330200",
  "name": "宁波市",
  "spell": "Ningbo",
  "lng": 121.549792,
  "lat": 29.868388,
  "areaCode": "0574" },

{
  "adcode": "330300",
  "name": "温州市",
  "spell": "Wenzhou",
  "lng": 120.672111,
  "lat": 28.000575,
  "areaCode": "0577" },

{
  "adcode": "330400",
  "name": "嘉兴市",
  "spell": "Jiaxing",
  "lng": 120.750865,
  "lat": 30.762653,
  "areaCode": "0573" },

{
  "adcode": "330500",
  "name": "湖州市",
  "spell": "Huzhou",
  "lng": 120.102398,
  "lat": 30.867198,
  "areaCode": "0572" },

{
  "adcode": "330600",
  "name": "绍兴市",
  "spell": "Shaoxing",
  "lng": 120.582112,
  "lat": 29.997117,
  "areaCode": "0575" },

{
  "adcode": "330700",
  "name": "金华市",
  "spell": "Jinhua",
  "lng": 119.649506,
  "lat": 29.089524,
  "areaCode": "0579" },

{
  "adcode": "330800",
  "name": "衢州市",
  "spell": "Quzhou",
  "lng": 118.87263,
  "lat": 28.941708,
  "areaCode": "0570" },

{
  "adcode": "330900",
  "name": "舟山市",
  "spell": "Zhoushan",
  "lng": 122.106863,
  "lat": 30.016028,
  "areaCode": "0580" },

{
  "adcode": "331000",
  "name": "台州市",
  "spell": "Taizhou",
  "lng": 121.428599,
  "lat": 28.661378,
  "areaCode": "0576" },

{
  "adcode": "331100",
  "name": "丽水市",
  "spell": "Lishui",
  "lng": 119.921786,
  "lat": 28.451993,
  "areaCode": "0578" },

{
  "adcode": "340100",
  "name": "合肥市",
  "spell": "Hefei",
  "lng": 117.283042,
  "lat": 31.86119,
  "areaCode": "0551" },

{
  "adcode": "340200",
  "name": "芜湖市",
  "spell": "Wuhu",
  "lng": 118.376451,
  "lat": 31.326319,
  "areaCode": "0553" },

{
  "adcode": "340300",
  "name": "蚌埠市",
  "spell": "Bengbu",
  "lng": 117.36237,
  "lat": 32.934037,
  "areaCode": "0552" },

{
  "adcode": "340400",
  "name": "淮南市",
  "spell": "Huainan",
  "lng": 117.025449,
  "lat": 32.645947,
  "areaCode": "0554" },

{
  "adcode": "340500",
  "name": "马鞍山市",
  "spell": "Ma'anshan",
  "lng": 118.507906,
  "lat": 31.689362,
  "areaCode": "0555" },

{
  "adcode": "340600",
  "name": "淮北市",
  "spell": "Huaibei",
  "lng": 116.794664,
  "lat": 33.971707,
  "areaCode": "0561" },

{
  "adcode": "340700",
  "name": "铜陵市",
  "spell": "Tongling",
  "lng": 117.816576,
  "lat": 30.929935,
  "areaCode": "0562" },

{
  "adcode": "340800",
  "name": "安庆市",
  "spell": "Anqing",
  "lng": 117.053571,
  "lat": 30.524816,
  "areaCode": "0556" },

{
  "adcode": "341000",
  "name": "黄山市",
  "spell": "Huangshan",
  "lng": 118.317325,
  "lat": 29.709239,
  "areaCode": "0559" },

{
  "adcode": "341100",
  "name": "滁州市",
  "spell": "Chuzhou",
  "lng": 118.316264,
  "lat": 32.303627,
  "areaCode": "0550" },

{
  "adcode": "341200",
  "name": "阜阳市",
  "spell": "Fuyang",
  "lng": 115.819729,
  "lat": 32.896969,
  "areaCode": "1558" },

{
  "adcode": "341300",
  "name": "宿州市",
  "spell": "Suzhou",
  "lng": 116.984084,
  "lat": 33.633891,
  "areaCode": "0557" },

{
  "adcode": "341500",
  "name": "六安市",
  "spell": "Lu'an",
  "lng": 116.507676,
  "lat": 31.752889,
  "areaCode": "0564" },

{
  "adcode": "341600",
  "name": "亳州市",
  "spell": "Bozhou",
  "lng": 115.782939,
  "lat": 33.869338,
  "areaCode": "0558" },

{
  "adcode": "341700",
  "name": "池州市",
  "spell": "Chizhou",
  "lng": 117.489157,
  "lat": 30.656037,
  "areaCode": "0566" },

{
  "adcode": "341800",
  "name": "宣城市",
  "spell": "Xuancheng",
  "lng": 118.757995,
  "lat": 30.945667,
  "areaCode": "0563" },

{
  "adcode": "350100",
  "name": "福州市",
  "spell": "Fuzhou",
  "lng": 119.306239,
  "lat": 26.075302,
  "areaCode": "0591" },

{
  "adcode": "350200",
  "name": "厦门市",
  "spell": "Xiamen",
  "lng": 118.11022,
  "lat": 24.490474,
  "areaCode": "0592" },

{
  "adcode": "350300",
  "name": "莆田市",
  "spell": "Putian",
  "lng": 119.007558,
  "lat": 25.431011,
  "areaCode": "0594" },

{
  "adcode": "350400",
  "name": "三明市",
  "spell": "Sanming",
  "lng": 117.635001,
  "lat": 26.265444,
  "areaCode": "0598" },

{
  "adcode": "350500",
  "name": "泉州市",
  "spell": "Quanzhou",
  "lng": 118.589421,
  "lat": 24.908853,
  "areaCode": "0595" },

{
  "adcode": "350600",
  "name": "漳州市",
  "spell": "Zhangzhou",
  "lng": 117.661801,
  "lat": 24.510897,
  "areaCode": "0596" },

{
  "adcode": "350700",
  "name": "南平市",
  "spell": "Nanping",
  "lng": 118.178459,
  "lat": 26.635627,
  "areaCode": "0599" },

{
  "adcode": "350800",
  "name": "龙岩市",
  "spell": "Longyan",
  "lng": 117.02978,
  "lat": 25.091603,
  "areaCode": "0597" },

{
  "adcode": "350900",
  "name": "宁德市",
  "spell": "Ningde",
  "lng": 119.527082,
  "lat": 26.65924,
  "areaCode": "0593" },

{
  "adcode": "360100",
  "name": "南昌市",
  "spell": "Nanchang",
  "lng": 115.892151,
  "lat": 28.676493,
  "areaCode": "0791" },

{
  "adcode": "360200",
  "name": "景德镇市",
  "spell": "Jingdezhen",
  "lng": 117.214664,
  "lat": 29.29256,
  "areaCode": "0798" },

{
  "adcode": "360300",
  "name": "萍乡市",
  "spell": "Pingxiang",
  "lng": 113.852186,
  "lat": 27.622946,
  "areaCode": "0799" },

{
  "adcode": "360400",
  "name": "九江市",
  "spell": "Jiujiang",
  "lng": 115.992811,
  "lat": 29.712034,
  "areaCode": "0792" },

{
  "adcode": "360500",
  "name": "新余市",
  "spell": "Xinyu",
  "lng": 114.930835,
  "lat": 27.810834,
  "areaCode": "0790" },

{
  "adcode": "360600",
  "name": "鹰潭市",
  "spell": "Yingtan",
  "lng": 117.033838,
  "lat": 28.238638,
  "areaCode": "0701" },

{
  "adcode": "360700",
  "name": "赣州市",
  "spell": "Ganzhou",
  "lng": 114.940278,
  "lat": 25.85097,
  "areaCode": "0797" },

{
  "adcode": "360800",
  "name": "吉安市",
  "spell": "Ji'an",
  "lng": 114.986373,
  "lat": 27.111699,
  "areaCode": "0796" },

{
  "adcode": "360900",
  "name": "宜春市",
  "spell": "Yichun",
  "lng": 114.391136,
  "lat": 27.8043,
  "areaCode": "0795" },

{
  "adcode": "361000",
  "name": "抚州市",
  "spell": "Fuzhou",
  "lng": 116.358351,
  "lat": 27.98385,
  "areaCode": "0794" },

{
  "adcode": "361100",
  "name": "上饶市",
  "spell": "Shangrao",
  "lng": 117.971185,
  "lat": 28.44442,
  "areaCode": "0793" },

{
  "adcode": "370100",
  "name": "济南市",
  "spell": "Jinan",
  "lng": 117.000923,
  "lat": 36.675807,
  "areaCode": "0531" },

{
  "adcode": "370200",
  "name": "青岛市",
  "spell": "Qingdao",
  "lng": 120.369557,
  "lat": 36.094406,
  "areaCode": "0532" },

{
  "adcode": "370300",
  "name": "淄博市",
  "spell": "Zibo",
  "lng": 118.047648,
  "lat": 36.814939,
  "areaCode": "0533" },

{
  "adcode": "370400",
  "name": "枣庄市",
  "spell": "Zaozhuang",
  "lng": 117.557964,
  "lat": 34.856424,
  "areaCode": "0632" },

{
  "adcode": "370500",
  "name": "东营市",
  "spell": "Dongying",
  "lng": 118.4963,
  "lat": 37.461266,
  "areaCode": "0546" },

{
  "adcode": "370600",
  "name": "烟台市",
  "spell": "Yantai",
  "lng": 121.391382,
  "lat": 37.539297,
  "areaCode": "0535" },

{
  "adcode": "370700",
  "name": "潍坊市",
  "spell": "Weifang",
  "lng": 119.107078,
  "lat": 36.70925,
  "areaCode": "0536" },

{
  "adcode": "370800",
  "name": "济宁市",
  "spell": "Jining",
  "lng": 116.587245,
  "lat": 35.415393,
  "areaCode": "0537" },

{
  "adcode": "370900",
  "name": "泰安市",
  "spell": "Tai'an",
  "lng": 117.129063,
  "lat": 36.194968,
  "areaCode": "0538" },

{
  "adcode": "371000",
  "name": "威海市",
  "spell": "Weihai",
  "lng": 122.116394,
  "lat": 37.509691,
  "areaCode": "0631" },

{
  "adcode": "371100",
  "name": "日照市",
  "spell": "Rizhao",
  "lng": 119.461208,
  "lat": 35.428588,
  "areaCode": "0633" },

{
  "adcode": "371200",
  "name": "莱芜市",
  "spell": "Laiwu",
  "lng": 117.677736,
  "lat": 36.214397,
  "areaCode": "0634" },

{
  "adcode": "371300",
  "name": "临沂市",
  "spell": "Linyi",
  "lng": 118.326443,
  "lat": 35.065282,
  "areaCode": "0539" },

{
  "adcode": "371400",
  "name": "德州市",
  "spell": "Dezhou",
  "lng": 116.307428,
  "lat": 37.453968,
  "areaCode": "0534" },

{
  "adcode": "371500",
  "name": "聊城市",
  "spell": "Liaocheng",
  "lng": 115.980367,
  "lat": 36.456013,
  "areaCode": "0635" },

{
  "adcode": "371600",
  "name": "滨州市",
  "spell": "Binzhou",
  "lng": 118.016974,
  "lat": 37.383542,
  "areaCode": "0543" },

{
  "adcode": "371700",
  "name": "菏泽市",
  "spell": "Heze",
  "lng": 115.469381,
  "lat": 35.246531,
  "areaCode": "0530" },

{
  "adcode": "410100",
  "name": "郑州市",
  "spell": "Zhengzhou",
  "lng": 113.665412,
  "lat": 34.757975,
  "areaCode": "0371" },

{
  "adcode": "410200",
  "name": "开封市",
  "spell": "Kaifeng",
  "lng": 114.341447,
  "lat": 34.797049,
  "areaCode": "0378" },

{
  "adcode": "410300",
  "name": "洛阳市",
  "spell": "Luoyang",
  "lng": 112.434468,
  "lat": 34.663041,
  "areaCode": "0379" },

{
  "adcode": "410400",
  "name": "平顶山市",
  "spell": "Pingdingshan",
  "lng": 113.307718,
  "lat": 33.735241,
  "areaCode": "0375" },

{
  "adcode": "410500",
  "name": "安阳市",
  "spell": "Anyang",
  "lng": 114.352482,
  "lat": 36.103442,
  "areaCode": "0372" },

{
  "adcode": "410600",
  "name": "鹤壁市",
  "spell": "Hebi",
  "lng": 114.295444,
  "lat": 35.748236,
  "areaCode": "0392" },

{
  "adcode": "410700",
  "name": "新乡市",
  "spell": "Xinxiang",
  "lng": 113.883991,
  "lat": 35.302616,
  "areaCode": "0373" },

{
  "adcode": "410800",
  "name": "焦作市",
  "spell": "Jiaozuo",
  "lng": 113.238266,
  "lat": 35.23904,
  "areaCode": "0391" },

{
  "adcode": "410900",
  "name": "濮阳市",
  "spell": "Puyang",
  "lng": 115.041299,
  "lat": 35.768234,
  "areaCode": "0393" },

{
  "adcode": "411000",
  "name": "许昌市",
  "spell": "Xuchang",
  "lng": 113.826063,
  "lat": 34.022956,
  "areaCode": "0374" },

{
  "adcode": "411100",
  "name": "漯河市",
  "spell": "Luohe",
  "lng": 114.026405,
  "lat": 33.575855,
  "areaCode": "0395" },

{
  "adcode": "411200",
  "name": "三门峡市",
  "spell": "Sanmenxia",
  "lng": 111.194099,
  "lat": 34.777338,
  "areaCode": "0398" },

{
  "adcode": "411300",
  "name": "南阳市",
  "spell": "Nanyang",
  "lng": 112.540918,
  "lat": 32.999082,
  "areaCode": "0377" },

{
  "adcode": "411400",
  "name": "商丘市",
  "spell": "Shangqiu",
  "lng": 115.650497,
  "lat": 34.437054,
  "areaCode": "0370" },

{
  "adcode": "411500",
  "name": "信阳市",
  "spell": "Xinyang",
  "lng": 114.075031,
  "lat": 32.123274,
  "areaCode": "0376" },

{
  "adcode": "411600",
  "name": "周口市",
  "spell": "Zhoukou",
  "lng": 114.649653,
  "lat": 33.620357,
  "areaCode": "0394" },

{
  "adcode": "411700",
  "name": "驻马店市",
  "spell": "Zhumadian",
  "lng": 114.024736,
  "lat": 32.980169,
  "areaCode": "0396" },

{
  "adcode": "419001",
  "name": "济源市",
  "spell": "Jiyuan",
  "lng": 112.590047,
  "lat": 35.090378,
  "areaCode": "1391" },

{
  "adcode": "420100",
  "name": "武汉市",
  "spell": "Wuhan",
  "lng": 114.298572,
  "lat": 30.584355,
  "areaCode": "027" },

{
  "adcode": "420200",
  "name": "黄石市",
  "spell": "Huangshi",
  "lng": 115.077048,
  "lat": 30.220074,
  "areaCode": "0714" },

{
  "adcode": "420300",
  "name": "十堰市",
  "spell": "Shiyan",
  "lng": 110.785239,
  "lat": 32.647017,
  "areaCode": "0719" },

{
  "adcode": "420500",
  "name": "宜昌市",
  "spell": "Yichang",
  "lng": 111.290843,
  "lat": 30.702636,
  "areaCode": "0717" },

{
  "adcode": "420600",
  "name": "襄阳市",
  "spell": "Xiangyang",
  "lng": 112.144146,
  "lat": 32.042426,
  "areaCode": "0710" },

{
  "adcode": "420700",
  "name": "鄂州市",
  "spell": "Ezhou",
  "lng": 114.890593,
  "lat": 30.396536,
  "areaCode": "0711" },

{
  "adcode": "420800",
  "name": "荆门市",
  "spell": "Jingmen",
  "lng": 112.204251,
  "lat": 31.03542,
  "areaCode": "0724" },

{
  "adcode": "420900",
  "name": "孝感市",
  "spell": "Xiaogan",
  "lng": 113.926655,
  "lat": 30.926423,
  "areaCode": "0712" },

{
  "adcode": "421000",
  "name": "荆州市",
  "spell": "Jingzhou",
  "lng": 112.23813,
  "lat": 30.326857,
  "areaCode": "0716" },

{
  "adcode": "421100",
  "name": "黄冈市",
  "spell": "Huanggang",
  "lng": 114.879365,
  "lat": 30.447711,
  "areaCode": "0713" },

{
  "adcode": "421200",
  "name": "咸宁市",
  "spell": "Xianning",
  "lng": 114.328963,
  "lat": 29.832798,
  "areaCode": "0715" },

{
  "adcode": "421300",
  "name": "随州市",
  "spell": "Suizhou",
  "lng": 113.37377,
  "lat": 31.717497,
  "areaCode": "0722" },

{
  "adcode": "422800",
  "name": "恩施土家族苗族自治州",
  "spell": "Enshi",
  "lng": 109.48699,
  "lat": 30.283114,
  "areaCode": "0718" },

{
  "adcode": "429004",
  "name": "仙桃市",
  "spell": "Xiantao",
  "lng": 113.453974,
  "lat": 30.364953,
  "areaCode": "0728" },

{
  "adcode": "429005",
  "name": "潜江市",
  "spell": "Qianjiang",
  "lng": 112.896866,
  "lat": 30.421215,
  "areaCode": "2728" },

{
  "adcode": "429006",
  "name": "天门市",
  "spell": "Tianmen",
  "lng": 113.165862,
  "lat": 30.653061,
  "areaCode": "1728" },

{
  "adcode": "429021",
  "name": "神农架林区",
  "spell": "Shennongjia",
  "lng": 110.671525,
  "lat": 31.744449,
  "areaCode": "1719" },

{
  "adcode": "430100",
  "name": "长沙市",
  "spell": "Changsha",
  "lng": 112.982279,
  "lat": 28.19409,
  "areaCode": "0731" },

{
  "adcode": "430200",
  "name": "株洲市",
  "spell": "Zhuzhou",
  "lng": 113.151737,
  "lat": 27.835806,
  "areaCode": "0733" },

{
  "adcode": "430300",
  "name": "湘潭市",
  "spell": "Xiangtan",
  "lng": 112.925083,
  "lat": 27.846725,
  "areaCode": "0732" },

{
  "adcode": "430400",
  "name": "衡阳市",
  "spell": "Hengyang",
  "lng": 112.607693,
  "lat": 26.900358,
  "areaCode": "0734" },

{
  "adcode": "430500",
  "name": "邵阳市",
  "spell": "Shaoyang",
  "lng": 111.46923,
  "lat": 27.237842,
  "areaCode": "0739" },

{
  "adcode": "430600",
  "name": "岳阳市",
  "spell": "Yueyang",
  "lng": 113.132855,
  "lat": 29.37029,
  "areaCode": "0730" },

{
  "adcode": "430700",
  "name": "常德市",
  "spell": "Changde",
  "lng": 111.691347,
  "lat": 29.040225,
  "areaCode": "0736" },

{
  "adcode": "430800",
  "name": "张家界市",
  "spell": "Zhangjiajie",
  "lng": 110.479921,
  "lat": 29.127401,
  "areaCode": "0744" },

{
  "adcode": "430900",
  "name": "益阳市",
  "spell": "Yiyang",
  "lng": 112.355042,
  "lat": 28.570066,
  "areaCode": "0737" },

{
  "adcode": "431000",
  "name": "郴州市",
  "spell": "Chenzhou",
  "lng": 113.032067,
  "lat": 25.793589,
  "areaCode": "0735" },

{
  "adcode": "431100",
  "name": "永州市",
  "spell": "Yongzhou",
  "lng": 111.608019,
  "lat": 26.434516,
  "areaCode": "0746" },

{
  "adcode": "431200",
  "name": "怀化市",
  "spell": "Huaihua",
  "lng": 109.97824,
  "lat": 27.550082,
  "areaCode": "0745" },

{
  "adcode": "431300",
  "name": "娄底市",
  "spell": "Loudi",
  "lng": 112.008497,
  "lat": 27.728136,
  "areaCode": "0738" },

{
  "adcode": "433100",
  "name": "湘西土家族苗族自治州",
  "spell": "Xiangxi",
  "lng": 109.739735,
  "lat": 28.314296,
  "areaCode": "0743" },

{
  "adcode": "440100",
  "name": "广州市",
  "spell": "Guangzhou",
  "lng": 113.280637,
  "lat": 23.125178,
  "areaCode": "020" },

{
  "adcode": "440200",
  "name": "韶关市",
  "spell": "Shaoguan",
  "lng": 113.591544,
  "lat": 24.801322,
  "areaCode": "0751" },

{
  "adcode": "440300",
  "name": "深圳市",
  "spell": "Shenzhen",
  "lng": 114.085947,
  "lat": 22.547,
  "areaCode": "0755" },

{
  "adcode": "440400",
  "name": "珠海市",
  "spell": "Zhuhai",
  "lng": 113.552724,
  "lat": 22.255899,
  "areaCode": "0756" },

{
  "adcode": "440500",
  "name": "汕头市",
  "spell": "Shantou",
  "lng": 116.708463,
  "lat": 23.37102,
  "areaCode": "0754" },

{
  "adcode": "440600",
  "name": "佛山市",
  "spell": "Foshan",
  "lng": 113.122717,
  "lat": 23.028762,
  "areaCode": "0757" },

{
  "adcode": "440700",
  "name": "江门市",
  "spell": "Jiangmen",
  "lng": 113.094942,
  "lat": 22.590431,
  "areaCode": "0750" },

{
  "adcode": "440800",
  "name": "湛江市",
  "spell": "Zhanjiang",
  "lng": 110.405529,
  "lat": 21.195338,
  "areaCode": "0759" },

{
  "adcode": "440900",
  "name": "茂名市",
  "spell": "Maoming",
  "lng": 110.919229,
  "lat": 21.659751,
  "areaCode": "0668" },

{
  "adcode": "441200",
  "name": "肇庆市",
  "spell": "Zhaoqing",
  "lng": 112.472529,
  "lat": 23.051546,
  "areaCode": "0758" },

{
  "adcode": "441300",
  "name": "惠州市",
  "spell": "Huizhou",
  "lng": 114.412599,
  "lat": 23.079404,
  "areaCode": "0752" },

{
  "adcode": "441400",
  "name": "梅州市",
  "spell": "Meizhou",
  "lng": 116.117582,
  "lat": 24.299112,
  "areaCode": "0753" },

{
  "adcode": "441500",
  "name": "汕尾市",
  "spell": "Shanwei",
  "lng": 115.364238,
  "lat": 22.774485,
  "areaCode": "0660" },

{
  "adcode": "441600",
  "name": "河源市",
  "spell": "Heyuan",
  "lng": 114.697802,
  "lat": 23.746266,
  "areaCode": "0762" },

{
  "adcode": "441700",
  "name": "阳江市",
  "spell": "Yangjiang",
  "lng": 111.975107,
  "lat": 21.859222,
  "areaCode": "0662" },

{
  "adcode": "441800",
  "name": "清远市",
  "spell": "Qingyuan",
  "lng": 113.036779,
  "lat": 23.704188,
  "areaCode": "0763" },

{
  "adcode": "441900",
  "name": "东莞市",
  "spell": "Dongguan",
  "lng": 113.760234,
  "lat": 23.048884,
  "areaCode": "0769" },

{
  "adcode": "442000",
  "name": "中山市",
  "spell": "Zhongshan",
  "lng": 113.382391,
  "lat": 22.521113,
  "areaCode": "0760" },

{
  "adcode": "445100",
  "name": "潮州市",
  "spell": "Chaozhou",
  "lng": 116.632301,
  "lat": 23.661701,
  "areaCode": "0768" },

{
  "adcode": "445200",
  "name": "揭阳市",
  "spell": "Jieyang",
  "lng": 116.355733,
  "lat": 23.543778,
  "areaCode": "0663" },

{
  "adcode": "445300",
  "name": "云浮市",
  "spell": "Yunfu",
  "lng": 112.044439,
  "lat": 22.929801,
  "areaCode": "0766" },

{
  "adcode": "450100",
  "name": "南宁市",
  "spell": "Nanning",
  "lng": 108.320004,
  "lat": 22.82402,
  "areaCode": "0771" },

{
  "adcode": "450200",
  "name": "柳州市",
  "spell": "Liuzhou",
  "lng": 109.411703,
  "lat": 24.314617,
  "areaCode": "0772" },

{
  "adcode": "450300",
  "name": "桂林市",
  "spell": "Guilin",
  "lng": 110.299121,
  "lat": 25.274215,
  "areaCode": "0773" },

{
  "adcode": "450400",
  "name": "梧州市",
  "spell": "Wuzhou",
  "lng": 111.316229,
  "lat": 23.472309,
  "areaCode": "0774" },

{
  "adcode": "450500",
  "name": "北海市",
  "spell": "Beihai",
  "lng": 109.119254,
  "lat": 21.473343,
  "areaCode": "0779" },

{
  "adcode": "450600",
  "name": "防城港市",
  "spell": "Fangchenggang",
  "lng": 108.345478,
  "lat": 21.614631,
  "areaCode": "0770" },

{
  "adcode": "450700",
  "name": "钦州市",
  "spell": "Qinzhou",
  "lng": 108.624175,
  "lat": 21.967127,
  "areaCode": "0777" },

{
  "adcode": "450800",
  "name": "贵港市",
  "spell": "Guigang",
  "lng": 109.602146,
  "lat": 23.0936,
  "areaCode": "1755" },

{
  "adcode": "450900",
  "name": "玉林市",
  "spell": "Yulin",
  "lng": 110.154393,
  "lat": 22.63136,
  "areaCode": "0775" },

{
  "adcode": "451000",
  "name": "百色市",
  "spell": "Baise",
  "lng": 106.616285,
  "lat": 23.897742,
  "areaCode": "0776" },

{
  "adcode": "451100",
  "name": "贺州市",
  "spell": "Hezhou",
  "lng": 111.552056,
  "lat": 24.414141,
  "areaCode": "1774" },

{
  "adcode": "451200",
  "name": "河池市",
  "spell": "Hechi",
  "lng": 108.062105,
  "lat": 24.695899,
  "areaCode": "0778" },

{
  "adcode": "451300",
  "name": "来宾市",
  "spell": "Laibin",
  "lng": 109.229772,
  "lat": 23.733766,
  "areaCode": "1772" },

{
  "adcode": "451400",
  "name": "崇左市",
  "spell": "Chongzuo",
  "lng": 107.353926,
  "lat": 22.404108,
  "areaCode": "1771" },

{
  "adcode": "460100",
  "name": "海口市",
  "spell": "Haikou",
  "lng": 110.33119,
  "lat": 20.031971,
  "areaCode": "0898" },

{
  "adcode": "460200",
  "name": "三亚市",
  "spell": "Sanya",
  "lng": 109.508268,
  "lat": 18.247872,
  "areaCode": "0899" },

{
  "adcode": "460300",
  "name": "三沙市",
  "spell": "Sansha",
  "lng": 112.34882,
  "lat": 16.831039,
  "areaCode": "2898" },

{
  "adcode": "460321",
  "name": "西沙群岛",
  "spell": "Xisha Islands",
  "lng": 112.025528,
  "lat": 16.331342,
  "areaCode": "1895" },

{
  "adcode": "460322",
  "name": "南沙群岛",
  "spell": "Nansha Islands",
  "lng": 116.749998,
  "lat": 11.471888,
  "areaCode": "1891" },

{
  "adcode": "460323",
  "name": "中沙群岛的岛礁及其海域",
  "spell": "Zhongsha Islands",
  "lng": 117.740071,
  "lat": 15.112856,
  "areaCode": "2801" },

{
  "adcode": "460400",
  "name": "儋州市",
  "spell": "Danzhou",
  "lng": 109.576782,
  "lat": 19.517486,
  "areaCode": "0805" },

{
  "adcode": "469001",
  "name": "五指山市",
  "spell": "Wuzhishan",
  "lng": 109.516662,
  "lat": 18.776921,
  "areaCode": "1897" },

{
  "adcode": "469002",
  "name": "琼海市",
  "spell": "Qionghai",
  "lng": 110.466785,
  "lat": 19.246011,
  "areaCode": "1894" },

{
  "adcode": "469005",
  "name": "文昌市",
  "spell": "Wenchang",
  "lng": 110.753975,
  "lat": 19.612986,
  "areaCode": "1893" },

{
  "adcode": "469006",
  "name": "万宁市",
  "spell": "Wanning",
  "lng": 110.388793,
  "lat": 18.796216,
  "areaCode": "1898" },

{
  "adcode": "469007",
  "name": "东方市",
  "spell": "Dongfang",
  "lng": 108.653789,
  "lat": 19.10198,
  "areaCode": "0807" },

{
  "adcode": "469021",
  "name": "定安县",
  "spell": "Ding'an",
  "lng": 110.323959,
  "lat": 19.699211,
  "areaCode": "0806" },

{
  "adcode": "469022",
  "name": "屯昌县",
  "spell": "Tunchang",
  "lng": 110.102773,
  "lat": 19.362916,
  "areaCode": "1892" },

{
  "adcode": "469023",
  "name": "澄迈县",
  "spell": "Chengmai",
  "lng": 110.007147,
  "lat": 19.737095,
  "areaCode": "0804" },

{
  "adcode": "469024",
  "name": "临高县",
  "spell": "Lingao",
  "lng": 109.687697,
  "lat": 19.908293,
  "areaCode": "1896" },

{
  "adcode": "469025",
  "name": "白沙黎族自治县",
  "spell": "Baisha",
  "lng": 109.452606,
  "lat": 19.224584,
  "areaCode": "0802" },

{
  "adcode": "469026",
  "name": "昌江黎族自治县",
  "spell": "Changjiang",
  "lng": 109.053351,
  "lat": 19.260968,
  "areaCode": "0803" },

{
  "adcode": "469027",
  "name": "乐东黎族自治县",
  "spell": "Ledong",
  "lng": 109.175444,
  "lat": 18.74758,
  "areaCode": "2802" },

{
  "adcode": "469028",
  "name": "陵水黎族自治县",
  "spell": "Lingshui",
  "lng": 110.037218,
  "lat": 18.505006,
  "areaCode": "0809" },

{
  "adcode": "469029",
  "name": "保亭黎族苗族自治县",
  "spell": "Baoting",
  "lng": 109.70245,
  "lat": 18.636371,
  "areaCode": "0801" },

{
  "adcode": "469030",
  "name": "琼中黎族苗族自治县",
  "spell": "Qiongzhong",
  "lng": 109.839996,
  "lat": 19.03557,
  "areaCode": "1899" },

{
  "adcode": "500000",
  "name": "重庆市",
  "spell": "Chongqing",
  "lng": 106.504962,
  "lat": 29.533155,
  "areaCode": "023" },

{
  "adcode": "510100",
  "name": "成都市",
  "spell": "Chengdu",
  "lng": 104.065735,
  "lat": 30.659462,
  "areaCode": "028" },

{
  "adcode": "510300",
  "name": "自贡市",
  "spell": "Zigong",
  "lng": 104.773447,
  "lat": 29.352765,
  "areaCode": "0813" },

{
  "adcode": "510400",
  "name": "攀枝花市",
  "spell": "Panzhihua",
  "lng": 101.716007,
  "lat": 26.580446,
  "areaCode": "0812" },

{
  "adcode": "510500",
  "name": "泸州市",
  "spell": "Luzhou",
  "lng": 105.443348,
  "lat": 28.889138,
  "areaCode": "0830" },

{
  "adcode": "510600",
  "name": "德阳市",
  "spell": "Deyang",
  "lng": 104.398651,
  "lat": 31.127991,
  "areaCode": "0838" },

{
  "adcode": "510700",
  "name": "绵阳市",
  "spell": "Mianyang",
  "lng": 104.741722,
  "lat": 31.46402,
  "areaCode": "0816" },

{
  "adcode": "510800",
  "name": "广元市",
  "spell": "Guangyuan",
  "lng": 105.829757,
  "lat": 32.433668,
  "areaCode": "0839" },

{
  "adcode": "510900",
  "name": "遂宁市",
  "spell": "Suining",
  "lng": 105.571331,
  "lat": 30.513311,
  "areaCode": "0825" },

{
  "adcode": "511000",
  "name": "内江市",
  "spell": "Neijiang",
  "lng": 105.066138,
  "lat": 29.58708,
  "areaCode": "1832" },

{
  "adcode": "511100",
  "name": "乐山市",
  "spell": "Leshan",
  "lng": 103.761263,
  "lat": 29.582024,
  "areaCode": "0833" },

{
  "adcode": "511300",
  "name": "南充市",
  "spell": "Nanchong",
  "lng": 106.082974,
  "lat": 30.795281,
  "areaCode": "0817" },

{
  "adcode": "511400",
  "name": "眉山市",
  "spell": "Meishan",
  "lng": 103.831788,
  "lat": 30.048318,
  "areaCode": "1833" },

{
  "adcode": "511500",
  "name": "宜宾市",
  "spell": "Yibin",
  "lng": 104.630825,
  "lat": 28.760189,
  "areaCode": "0831" },

{
  "adcode": "511600",
  "name": "广安市",
  "spell": "Guang'an",
  "lng": 106.633369,
  "lat": 30.456398,
  "areaCode": "0826" },

{
  "adcode": "511700",
  "name": "达州市",
  "spell": "Dazhou",
  "lng": 107.502262,
  "lat": 31.209484,
  "areaCode": "0818" },

{
  "adcode": "511800",
  "name": "雅安市",
  "spell": "Ya'an",
  "lng": 103.001033,
  "lat": 29.987722,
  "areaCode": "0835" },

{
  "adcode": "511900",
  "name": "巴中市",
  "spell": "Bazhong",
  "lng": 106.753669,
  "lat": 31.858809,
  "areaCode": "0827" },

{
  "adcode": "512000",
  "name": "资阳市",
  "spell": "Ziyang",
  "lng": 104.641917,
  "lat": 30.122211,
  "areaCode": "0832" },

{
  "adcode": "513200",
  "name": "阿坝藏族羌族自治州",
  "spell": "Aba",
  "lng": 102.221374,
  "lat": 31.899792,
  "areaCode": "0837" },

{
  "adcode": "513300",
  "name": "甘孜藏族自治州",
  "spell": "Garze",
  "lng": 101.963815,
  "lat": 30.050663,
  "areaCode": "0836" },

{
  "adcode": "513400",
  "name": "凉山彝族自治州",
  "spell": "Liangshan",
  "lng": 102.258746,
  "lat": 27.886762,
  "areaCode": "0834" },

{
  "adcode": "520100",
  "name": "贵阳市",
  "spell": "Guiyang",
  "lng": 106.713478,
  "lat": 26.578343,
  "areaCode": "0851" },

{
  "adcode": "520200",
  "name": "六盘水市",
  "spell": "Liupanshui",
  "lng": 104.846743,
  "lat": 26.584643,
  "areaCode": "0858" },

{
  "adcode": "520300",
  "name": "遵义市",
  "spell": "Zunyi",
  "lng": 106.937265,
  "lat": 27.706626,
  "areaCode": "0852" },

{
  "adcode": "520400",
  "name": "安顺市",
  "spell": "Anshun",
  "lng": 105.932188,
  "lat": 26.245544,
  "areaCode": "0853" },

{
  "adcode": "520500",
  "name": "毕节市",
  "spell": "Bijie",
  "lng": 105.28501,
  "lat": 27.301693,
  "areaCode": "0857" },

{
  "adcode": "520600",
  "name": "铜仁市",
  "spell": "Tongren",
  "lng": 109.191555,
  "lat": 27.718346,
  "areaCode": "0856" },

{
  "adcode": "522300",
  "name": "黔西南布依族苗族自治州",
  "spell": "Qianxinan",
  "lng": 104.897971,
  "lat": 25.08812,
  "areaCode": "0859" },

{
  "adcode": "522600",
  "name": "黔东南苗族侗族自治州",
  "spell": "Qiandongnan",
  "lng": 107.977488,
  "lat": 26.583352,
  "areaCode": "0855" },

{
  "adcode": "522700",
  "name": "黔南布依族苗族自治州",
  "spell": "Qiannan",
  "lng": 107.517156,
  "lat": 26.258219,
  "areaCode": "0854" },

{
  "adcode": "530100",
  "name": "昆明市",
  "spell": "Kunming",
  "lng": 102.712251,
  "lat": 25.040609,
  "areaCode": "0871" },

{
  "adcode": "530300",
  "name": "曲靖市",
  "spell": "Qujing",
  "lng": 103.797851,
  "lat": 25.501557,
  "areaCode": "0874" },

{
  "adcode": "530400",
  "name": "玉溪市",
  "spell": "Yuxi",
  "lng": 102.543907,
  "lat": 24.350461,
  "areaCode": "0877" },

{
  "adcode": "530500",
  "name": "保山市",
  "spell": "Baoshan",
  "lng": 99.167133,
  "lat": 25.111802,
  "areaCode": "0875" },

{
  "adcode": "530600",
  "name": "昭通市",
  "spell": "Zhaotong",
  "lng": 103.717216,
  "lat": 27.336999,
  "areaCode": "0870" },

{
  "adcode": "530700",
  "name": "丽江市",
  "spell": "Lijiang",
  "lng": 100.233026,
  "lat": 26.872108,
  "areaCode": "0888" },

{
  "adcode": "530800",
  "name": "普洱市",
  "spell": "Pu'er",
  "lng": 100.972344,
  "lat": 22.777321,
  "areaCode": "0879" },

{
  "adcode": "530900",
  "name": "临沧市",
  "spell": "Lincang",
  "lng": 100.08697,
  "lat": 23.886567,
  "areaCode": "0883" },

{
  "adcode": "532300",
  "name": "楚雄彝族自治州",
  "spell": "Chuxiong",
  "lng": 101.546046,
  "lat": 25.041988,
  "areaCode": "0878" },

{
  "adcode": "532500",
  "name": "红河哈尼族彝族自治州",
  "spell": "Honghe",
  "lng": 103.384182,
  "lat": 23.366775,
  "areaCode": "0873" },

{
  "adcode": "532600",
  "name": "文山壮族苗族自治州",
  "spell": "Wenshan",
  "lng": 104.24401,
  "lat": 23.36951,
  "areaCode": "0876" },

{
  "adcode": "532800",
  "name": "西双版纳傣族自治州",
  "spell": "Xishuangbanna",
  "lng": 100.797941,
  "lat": 22.001724,
  "areaCode": "0691" },

{
  "adcode": "532900",
  "name": "大理白族自治州",
  "spell": "Dali",
  "lng": 100.240037,
  "lat": 25.592765,
  "areaCode": "0872" },

{
  "adcode": "533100",
  "name": "德宏傣族景颇族自治州",
  "spell": "Dehong",
  "lng": 98.578363,
  "lat": 24.436694,
  "areaCode": "0692" },

{
  "adcode": "533300",
  "name": "怒江傈僳族自治州",
  "spell": "Nujiang",
  "lng": 98.854304,
  "lat": 25.850949,
  "areaCode": "0886" },

{
  "adcode": "533400",
  "name": "迪庆藏族自治州",
  "spell": "Deqen",
  "lng": 99.706463,
  "lat": 27.826853,
  "areaCode": "0887" },

{
  "adcode": "540100",
  "name": "拉萨市",
  "spell": "Lhasa",
  "lng": 91.132212,
  "lat": 29.660361,
  "areaCode": "0891" },

{
  "adcode": "540200",
  "name": "日喀则市",
  "spell": "Shigatse",
  "lng": 88.885148,
  "lat": 29.267519,
  "areaCode": "0892" },

{
  "adcode": "540300",
  "name": "昌都市",
  "spell": "Qamdo",
  "lng": 97.178452,
  "lat": 31.136875,
  "areaCode": "0895" },

{
  "adcode": "542200",
  "name": "山南地区",
  "spell": "Shannan",
  "lng": 91.766529,
  "lat": 29.236023,
  "areaCode": "0893" },

{
  "adcode": "542400",
  "name": "那曲地区",
  "spell": "Nagqu",
  "lng": 92.060214,
  "lat": 31.476004,
  "areaCode": "0896" },

{
  "adcode": "542500",
  "name": "阿里地区",
  "spell": "Ngari",
  "lng": 80.105498,
  "lat": 32.503187,
  "areaCode": "0897" },

{
  "adcode": "542600",
  "name": "林芝市",
  "spell": "Nyingchi",
  "lng": 94.362348,
  "lat": 29.654693,
  "areaCode": "0894" },

{
  "adcode": "610100",
  "name": "西安市",
  "spell": "Xi'an",
  "lng": 108.948024,
  "lat": 34.263161,
  "areaCode": "029" },

{
  "adcode": "610200",
  "name": "铜川市",
  "spell": "Tongchuan",
  "lng": 108.963122,
  "lat": 34.90892,
  "areaCode": "0919" },

{
  "adcode": "610300",
  "name": "宝鸡市",
  "spell": "Baoji",
  "lng": 107.14487,
  "lat": 34.369315,
  "areaCode": "0917" },

{
  "adcode": "610400",
  "name": "咸阳市",
  "spell": "Xianyang",
  "lng": 108.705117,
  "lat": 34.333439,
  "areaCode": "0910" },

{
  "adcode": "610500",
  "name": "渭南市",
  "spell": "Weinan",
  "lng": 109.502882,
  "lat": 34.499381,
  "areaCode": "0913" },

{
  "adcode": "610600",
  "name": "延安市",
  "spell": "Yan'an",
  "lng": 109.49081,
  "lat": 36.596537,
  "areaCode": "0911" },

{
  "adcode": "610700",
  "name": "汉中市",
  "spell": "Hanzhong",
  "lng": 107.028621,
  "lat": 33.077668,
  "areaCode": "0916" },

{
  "adcode": "610800",
  "name": "榆林市",
  "spell": "Yulin",
  "lng": 109.741193,
  "lat": 38.290162,
  "areaCode": "0912" },

{
  "adcode": "610900",
  "name": "安康市",
  "spell": "Ankang",
  "lng": 109.029273,
  "lat": 32.6903,
  "areaCode": "0915" },

{
  "adcode": "611000",
  "name": "商洛市",
  "spell": "Shangluo",
  "lng": 109.939776,
  "lat": 33.868319,
  "areaCode": "0914" },

{
  "adcode": "620100",
  "name": "兰州市",
  "spell": "Lanzhou",
  "lng": 103.823557,
  "lat": 36.058039,
  "areaCode": "0931" },

{
  "adcode": "620200",
  "name": "嘉峪关市",
  "spell": "Jiayuguan",
  "lng": 98.277304,
  "lat": 39.786529,
  "areaCode": "1937" },

{
  "adcode": "620300",
  "name": "金昌市",
  "spell": "Jinchang",
  "lng": 102.187888,
  "lat": 38.514238,
  "areaCode": "0935" },

{
  "adcode": "620400",
  "name": "白银市",
  "spell": "Baiyin",
  "lng": 104.173606,
  "lat": 36.54568,
  "areaCode": "0943" },

{
  "adcode": "620500",
  "name": "天水市",
  "spell": "Tianshui",
  "lng": 105.724998,
  "lat": 34.578529,
  "areaCode": "0938" },

{
  "adcode": "620600",
  "name": "武威市",
  "spell": "Wuwei",
  "lng": 102.634697,
  "lat": 37.929996,
  "areaCode": "1935" },

{
  "adcode": "620700",
  "name": "张掖市",
  "spell": "Zhangye",
  "lng": 100.455472,
  "lat": 38.932897,
  "areaCode": "0936" },

{
  "adcode": "620800",
  "name": "平凉市",
  "spell": "Pingliang",
  "lng": 106.684691,
  "lat": 35.54279,
  "areaCode": "0933" },

{
  "adcode": "620900",
  "name": "酒泉市",
  "spell": "Jiuquan",
  "lng": 98.510795,
  "lat": 39.744023,
  "areaCode": "0937" },

{
  "adcode": "621000",
  "name": "庆阳市",
  "spell": "Qingyang",
  "lng": 107.638372,
  "lat": 35.734218,
  "areaCode": "0934" },

{
  "adcode": "621100",
  "name": "定西市",
  "spell": "Dingxi",
  "lng": 104.626294,
  "lat": 35.579578,
  "areaCode": "0932" },

{
  "adcode": "621200",
  "name": "陇南市",
  "spell": "Longnan",
  "lng": 104.929379,
  "lat": 33.388598,
  "areaCode": "2935" },

{
  "adcode": "622900",
  "name": "临夏回族自治州",
  "spell": "Linxia",
  "lng": 103.212006,
  "lat": 35.599446,
  "areaCode": "0930" },

{
  "adcode": "623000",
  "name": "甘南藏族自治州",
  "spell": "Gannan",
  "lng": 102.911008,
  "lat": 34.986354,
  "areaCode": "0941" },

{
  "adcode": "630100",
  "name": "西宁市",
  "spell": "Xining",
  "lng": 101.778916,
  "lat": 36.623178,
  "areaCode": "0971" },

{
  "adcode": "630200",
  "name": "海东市",
  "spell": "Haidong",
  "lng": 102.10327,
  "lat": 36.502916,
  "areaCode": "0972" },

{
  "adcode": "632200",
  "name": "海北藏族自治州",
  "spell": "Haibei",
  "lng": 100.901059,
  "lat": 36.959435,
  "areaCode": "0970" },

{
  "adcode": "632300",
  "name": "黄南藏族自治州",
  "spell": "Huangnan",
  "lng": 102.019988,
  "lat": 35.517744,
  "areaCode": "0973" },

{
  "adcode": "632500",
  "name": "海南藏族自治州",
  "spell": "Hainan",
  "lng": 100.619542,
  "lat": 36.280353,
  "areaCode": "0974" },

{
  "adcode": "632600",
  "name": "果洛藏族自治州",
  "spell": "Golog",
  "lng": 100.242143,
  "lat": 34.4736,
  "areaCode": "0975" },

{
  "adcode": "632700",
  "name": "玉树藏族自治州",
  "spell": "Yushu",
  "lng": 97.008522,
  "lat": 33.004049,
  "areaCode": "0976" },

{
  "adcode": "632800",
  "name": "海西蒙古族藏族自治州",
  "spell": "Haixi",
  "lng": 97.370785,
  "lat": 37.374663,
  "areaCode": "0977" },

{
  "adcode": "640100",
  "name": "银川市",
  "spell": "Yinchuan",
  "lng": 106.278179,
  "lat": 38.46637,
  "areaCode": "0951" },

{
  "adcode": "640200",
  "name": "石嘴山市",
  "spell": "Shizuishan",
  "lng": 106.376173,
  "lat": 39.01333,
  "areaCode": "0952" },

{
  "adcode": "640300",
  "name": "吴忠市",
  "spell": "Wuzhong",
  "lng": 106.199409,
  "lat": 37.986165,
  "areaCode": "0953" },

{
  "adcode": "640400",
  "name": "固原市",
  "spell": "Guyuan",
  "lng": 106.285241,
  "lat": 36.004561,
  "areaCode": "0954" },

{
  "adcode": "640500",
  "name": "中卫市",
  "spell": "Zhongwei",
  "lng": 105.189568,
  "lat": 37.514951,
  "areaCode": "1953" },

{
  "adcode": "650100",
  "name": "乌鲁木齐市",
  "spell": "Urumqi",
  "lng": 87.617733,
  "lat": 43.792818,
  "areaCode": "0991" },

{
  "adcode": "650200",
  "name": "克拉玛依市",
  "spell": "Karamay",
  "lng": 84.873946,
  "lat": 45.595886,
  "areaCode": "0990" },

{
  "adcode": "652100",
  "name": "吐鲁番市",
  "spell": "Turpan",
  "lng": 89.184078,
  "lat": 42.947613,
  "areaCode": "0995" },

{
  "adcode": "652200",
  "name": "哈密地区",
  "spell": "Kumul",
  "lng": 93.51316,
  "lat": 42.833248,
  "areaCode": "0902" },

{
  "adcode": "652300",
  "name": "昌吉回族自治州",
  "spell": "Changji",
  "lng": 87.304012,
  "lat": 44.014577,
  "areaCode": "0994" },

{
  "adcode": "652700",
  "name": "博尔塔拉蒙古自治州",
  "spell": "Bortala",
  "lng": 82.074778,
  "lat": 44.903258,
  "areaCode": "0909" },

{
  "adcode": "652800",
  "name": "巴音郭楞蒙古自治州",
  "spell": "Bayingol",
  "lng": 86.150969,
  "lat": 41.768552,
  "areaCode": "0996" },

{
  "adcode": "652900",
  "name": "阿克苏地区",
  "spell": "Aksu",
  "lng": 80.265068,
  "lat": 41.170712,
  "areaCode": "0997" },

{
  "adcode": "653000",
  "name": "克孜勒苏柯尔克孜自治州",
  "spell": "Kizilsu",
  "lng": 76.172825,
  "lat": 39.713431,
  "areaCode": "0908" },

{
  "adcode": "653100",
  "name": "喀什地区",
  "spell": "Kashgar",
  "lng": 75.989138,
  "lat": 39.467664,
  "areaCode": "0998" },

{
  "adcode": "653200",
  "name": "和田地区",
  "spell": "Hotan",
  "lng": 79.92533,
  "lat": 37.110687,
  "areaCode": "0903" },

{
  "adcode": "654000",
  "name": "伊犁哈萨克自治州",
  "spell": "Ili",
  "lng": 81.317946,
  "lat": 43.92186,
  "areaCode": "0999" },

{
  "adcode": "654200",
  "name": "塔城地区",
  "spell": "Qoqek",
  "lng": 82.985732,
  "lat": 46.746301,
  "areaCode": "0901" },

{
  "adcode": "654300",
  "name": "阿勒泰地区",
  "spell": "Altay",
  "lng": 88.13963,
  "lat": 47.848393,
  "areaCode": "0906" },

{
  "adcode": "659001",
  "name": "石河子市",
  "spell": "Shihezi",
  "lng": 86.041075,
  "lat": 44.305886,
  "areaCode": "0993" },

{
  "adcode": "659002",
  "name": "阿拉尔市",
  "spell": "Aral",
  "lng": 81.285884,
  "lat": 40.541914,
  "areaCode": "1997" },

{
  "adcode": "659003",
  "name": "图木舒克市",
  "spell": "Tumxuk",
  "lng": 79.077978,
  "lat": 39.867316,
  "areaCode": "1998" },

{
  "adcode": "659004",
  "name": "五家渠市",
  "spell": "Wujiaqu",
  "lng": 87.526884,
  "lat": 44.167401,
  "areaCode": "1994" },

{
  "adcode": "659005",
  "name": "北屯市",
  "spell": "Beitun",
  "lng": 87.824932,
  "lat": 47.353177,
  "areaCode": "1906" },

{
  "adcode": "659006",
  "name": "铁门关市",
  "spell": "Tiemenguan",
  "lng": 85.501218,
  "lat": 41.827251,
  "areaCode": "1996" },

{
  "adcode": "659007",
  "name": "双河市",
  "spell": "Shuanghe",
  "lng": 82.353656,
  "lat": 44.840524,
  "areaCode": "1909" },

{
  "adcode": "710000",
  "name": "台湾省",
  "spell": "Taiwan Province",
  "lng": 121.509062,
  "lat": 25.044332,
  "areaCode": "1886" },

{
  "adcode": "810000",
  "name": "香港特別行政區",
  "spell": "Hong Kong",
  "lng": 114.173355,
  "lat": 22.320048,
  "areaCode": "1852" },

{
  "adcode": "820000",
  "name": "澳門特別行政區",
  "spell": "Macau",
  "lng": 113.54909,
  "lat": 22.198951,
  "areaCode": "1853" }];exports.city = city;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map