(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"donotsmile-wx","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
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
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
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

/***/ 10:
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

/***/ 11:
/*!******************************************************************************!*\
  !*** C:/Users/huwei/Desktop/网易云信/donotsmile/common/configUniCloudRequest.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 15);function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _beforeProcess() {
  // let globalData = getApp().globalData
  // uniCloud._header = {authorization:globalData.id_token}
}

function _postProcessResult(r) {
  if (r.success || r.success == undefined) {
    console.log(r);
    if (r.result.status == 200) {
      return r.result.data;
    } else {
      uni.showToast({
        icon: 'none',
        title: r.result.msg || r.result.status });

      throw new Error(r.result.msg || r.result.status);
    }
  } else {
    console.log("云请求出现错误");
    return false;
  }
}


uniCloud.get = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url, postData) {var r;return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            _beforeProcess();_context.next = 3;return (
              uniCloud.callFunction({
                name: "api",
                data: {
                  url: url,
                  method: "get",
                  header: uniCloud._header,
                  data: postData } }));case 3:r = _context.sent;return _context.abrupt("return",


            _postProcessResult(r));case 5:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();



uniCloud.post = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(url, postData) {var r;return _regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            _beforeProcess();_context2.next = 3;return (
              uniCloud.callFunction({
                name: "api",
                data: {
                  url: url,
                  method: "post",
                  header: uniCloud._header,
                  data: postData } }));case 3:r = _context2.sent;return _context2.abrupt("return",


            _postProcessResult(r));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}();


uniCloud.delete = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(url, postData) {var r;return _regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            _beforeProcess();_context3.next = 3;return (
              uniCloud.callFunction({
                name: "api",
                data: {
                  url: url,
                  method: "delete",
                  header: uniCloud._header,
                  data: postData } }));case 3:r = _context3.sent;return _context3.abrupt("return",


            _postProcessResult(r));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}();


uniCloud.patch = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(url, postData) {var r;return _regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            _beforeProcess();_context4.next = 3;return (
              uniCloud.callFunction({
                name: "api",
                data: {
                  url: url,
                  method: "patch",
                  header: uniCloud._header,
                  data: postData } }));case 3:r = _context4.sent;return _context4.abrupt("return",


            _postProcessResult(r));case 5:case "end":return _context4.stop();}}}, _callee4);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 12)["default"]))

/***/ }),

/***/ 12:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 15));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 18);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} }), n.algo = {});return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],v = e[t + 8],w = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],A = e[t + 14],I = e[t + 15],E = o[0],O = o[1],U = o[2],D = o[3];E = u(E, O, U, D, i, 7, a[0]), D = u(D, E, O, U, c, 12, a[1]), U = u(U, D, E, O, f, 17, a[2]), O = u(O, U, D, E, p, 22, a[3]), E = u(E, O, U, D, g, 7, a[4]), D = u(D, E, O, U, m, 12, a[5]), U = u(U, D, E, O, y, 17, a[6]), O = u(O, U, D, E, _, 22, a[7]), E = u(E, O, U, D, v, 7, a[8]), D = u(D, E, O, U, w, 12, a[9]), U = u(U, D, E, O, S, 17, a[10]), O = u(O, U, D, E, k, 22, a[11]), E = u(E, O, U, D, T, 7, a[12]), D = u(D, E, O, U, P, 12, a[13]), U = u(U, D, E, O, A, 17, a[14]), E = h(E, O = u(O, U, D, E, I, 22, a[15]), U, D, c, 5, a[16]), D = h(D, E, O, U, y, 9, a[17]), U = h(U, D, E, O, k, 14, a[18]), O = h(O, U, D, E, i, 20, a[19]), E = h(E, O, U, D, m, 5, a[20]), D = h(D, E, O, U, S, 9, a[21]), U = h(U, D, E, O, I, 14, a[22]), O = h(O, U, D, E, g, 20, a[23]), E = h(E, O, U, D, w, 5, a[24]), D = h(D, E, O, U, A, 9, a[25]), U = h(U, D, E, O, p, 14, a[26]), O = h(O, U, D, E, v, 20, a[27]), E = h(E, O, U, D, P, 5, a[28]), D = h(D, E, O, U, f, 9, a[29]), U = h(U, D, E, O, _, 14, a[30]), E = l(E, O = h(O, U, D, E, T, 20, a[31]), U, D, m, 4, a[32]), D = l(D, E, O, U, v, 11, a[33]), U = l(U, D, E, O, k, 16, a[34]), O = l(O, U, D, E, A, 23, a[35]), E = l(E, O, U, D, c, 4, a[36]), D = l(D, E, O, U, g, 11, a[37]), U = l(U, D, E, O, _, 16, a[38]), O = l(O, U, D, E, S, 23, a[39]), E = l(E, O, U, D, P, 4, a[40]), D = l(D, E, O, U, i, 11, a[41]), U = l(U, D, E, O, p, 16, a[42]), O = l(O, U, D, E, y, 23, a[43]), E = l(E, O, U, D, w, 4, a[44]), D = l(D, E, O, U, T, 11, a[45]), U = l(U, D, E, O, I, 16, a[46]), E = d(E, O = l(O, U, D, E, f, 23, a[47]), U, D, i, 6, a[48]), D = d(D, E, O, U, _, 10, a[49]), U = d(U, D, E, O, A, 15, a[50]), O = d(O, U, D, E, m, 21, a[51]), E = d(E, O, U, D, T, 6, a[52]), D = d(D, E, O, U, p, 10, a[53]), U = d(U, D, E, O, S, 15, a[54]), O = d(O, U, D, E, c, 21, a[55]), E = d(E, O, U, D, v, 6, a[56]), D = d(D, E, O, U, I, 10, a[57]), U = d(U, D, E, O, y, 15, a[58]), O = d(O, U, D, E, P, 21, a[59]), E = d(E, O, U, D, g, 6, a[60]), D = d(D, E, O, U, k, 10, a[61]), U = d(U, D, E, O, f, 15, a[62]), O = d(O, U, D, E, w, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + O | 0, o[2] = o[2] + U | 0, o[3] = o[3] + D | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var i = /*#__PURE__*/function (_Error) {_inherits(i, _Error);var _super = _createSuper(i);function i(e) {var _this;_classCallCheck(this, i);_this = _super.call(this, e.message), _this.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this;}return i;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e2 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),a = _e2.t,c = _e2.setLocale,u = _e2.getLocale;var h, l, d;try {h = __webpack_require__(/*! uni-stat-config */ 19).default || __webpack_require__(/*! uni-stat-config */ 19);} catch (e) {h = { appid: "" };}function f() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function p() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: "mp-weixin", OS: d, APPID: h.appid, LOCALE: u(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.2" };}function g() {if ("n" === m()) {try {l = plus.runtime.getDCloudId();} catch (e) {l = "";}return l;}return l || (l = f(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: l })), l;}function m() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)["mp-weixin"];}var y = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}),  false && false;var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new i({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new i({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var _ = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var v = /*#__PURE__*/function () {function v(e) {_classCallCheck(this, v);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(a("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = _;}_createClass(v, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return y.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this2 = this;return Promise.resolve().then(function () {return _this2.hasAccessToken ? t ? _this2.requestWrapped(e) : _this2.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this2.getAccessToken();}).then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});}) : _this2.getAccessToken().then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = y.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = y.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this3 = this;return this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this3.setAccessToken(e.result.accessToken), t(_this3.accessToken)) : s(new i({ code: "AUTH_FAILED", message: "获取accessToken失败" }));});});} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this4 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (a, c) {var u = _this4.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? a(e) : c(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {c(new i({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this5 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new i({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this5.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this5.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: c }) : n(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new i({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return v;}();var w = { init: function init(e) {var t = new v(e);["deleteFile", "getTempFileURL"].forEach(function (e) {t[e] = o(t[e]).bind(t);});var s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} },S = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:",k = "undefined" != typeof process && "e2e" === "development" && "pre" === Object({"NODE_ENV":"development","VUE_APP_NAME":"donotsmile-wx","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).END_POINT ? "//tcb-pre.tencentcloudapi.com/web" : "//tcb-api.tencentcloudapi.com/web";var T;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(T || (T = {}));var P = function P() {};s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [],c = [];!function () {function t(t) {for (var s = e.sqrt(t), n = 2; n <= s; n++) {if (!(t % n)) return !1;}return !0;}function s(e) {return 4294967296 * (e - (0 | e)) | 0;}for (var n = 2, r = 0; r < 64;) {t(n) && (r < 8 && (a[r] = s(e.pow(n, .5))), c[r] = s(e.pow(n, 1 / 3)), r++), n++;}}();var u = [],h = i.SHA256 = o.extend({ _doReset: function _doReset() {this._hash = new r.init(a.slice(0));}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = this._hash.words, n = s[0], r = s[1], o = s[2], i = s[3], a = s[4], h = s[5], l = s[6], d = s[7], f = 0; f < 64; f++) {if (f < 16) u[f] = 0 | e[t + f];else {var p = u[f - 15],g = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,m = u[f - 2],y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;u[f] = g + u[f - 7] + y + u[f - 16];}var _ = n & r ^ n & o ^ r & o,v = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),w = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & h ^ ~a & l) + c[f] + u[f];d = l, l = h, h = a, a = i + w | 0, i = o, o = r, r = n, n = w + (v + _) | 0;}s[0] = s[0] + n | 0, s[1] = s[1] + r | 0, s[2] = s[2] + o | 0, s[3] = s[3] + i | 0, s[4] = s[4] + a | 0, s[5] = s[5] + h | 0, s[6] = s[6] + l | 0, s[7] = s[7] + d | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;return s[r >>> 5] |= 128 << 24 - r % 32, s[14 + (r + 64 >>> 9 << 4)] = e.floor(n / 4294967296), s[15 + (r + 64 >>> 9 << 4)] = n, t.sigBytes = 4 * s.length, this._process(), this._hash;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });t.SHA256 = o._createHelper(h), t.HmacSHA256 = o._createHmacHelper(h);}(Math), s.SHA256);}), s(function (e, t) {e.exports = n.HmacSHA256;}), s(function (e, t) {var s, r, o;e.exports = (r = (s = o = n).lib.WordArray, s.enc.Base64 = { stringify: function stringify(e) {var t = e.words,s = e.sigBytes,n = this._map;e.clamp();for (var r = [], o = 0; o < s; o += 3) {for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < s; a++) {r.push(n.charAt(i >>> 6 * (3 - a) & 63));}}var c = n.charAt(64);if (c) for (; r.length % 4;) {r.push(c);}return r.join("");}, parse: function parse(e) {var t = e.length,s = this._map,n = this._reverseMap;if (!n) {n = this._reverseMap = [];for (var o = 0; o < s.length; o++) {n[s.charCodeAt(o)] = o;}}var i = s.charAt(64);if (i) {var a = e.indexOf(i);-1 !== a && (t = a);}return function (e, t, s) {for (var n = [], o = 0, i = 0; i < t; i++) {if (i % 4) {var a = s[e.charCodeAt(i - 1)] << i % 4 * 2,c = s[e.charCodeAt(i)] >>> 6 - i % 4 * 2;n[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++;}}return r.create(n, o);}(e, t, n);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, o.enc.Base64);}), s(function (e, t) {e.exports = n.enc.Utf8;});var A = function A() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, s) {e = function e(_e3, n) {return _e3 ? s(_e3) : t(n);};});return e.promise = t, e;};function I(e) {return void 0 === e;}function E(e) {return "[object Null]" === Object.prototype.toString.call(e);}var O;function U(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e4 = _step.value;var _t2 = _e4.isMatch,_s = _e4.genAdapter,_n = _e4.runtime;if (_t2()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(O || (O = {}));var D = { adapter: null, runtime: void 0 },b = ["anonymousUuidKey"];var C = /*#__PURE__*/function (_P) {_inherits(C, _P);var _super2 = _createSuper(C);function C() {var _this6;_classCallCheck(this, C);_this6 = _super2.call(this), D.adapter.root.tcbObject || (D.adapter.root.tcbObject = {});return _this6;}_createClass(C, [{ key: "setItem", value: function setItem(e, t) {D.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return D.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete D.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete D.adapter.root.tcbObject;} }]);return C;}(P);function x(e, t) {switch (e) {case "local":return t.localStorage || new C();case "none":return new C();default:return t.sessionStorage || new C();}}var R = /*#__PURE__*/function () {function R(e) {_classCallCheck(this, R);if (!this._storage) {this._persistence = D.adapter.primaryStorage || e.persistence, this._storage = x(this._persistence, D.adapter);var _t3 = "access_token_" + e.env,_s2 = "access_token_expire_" + e.env,_n2 = "refresh_token_" + e.env,_r = "anonymous_uuid_" + e.env,_o = "login_type_" + e.env,_i = "user_info_" + e.env;this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(R, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = x(e, D.adapter);for (var _e5 in this.keys) {var _n3 = this.keys[_e5];if (t && b.includes(_e5)) continue;var _r2 = this._storage.getItem(_n3);I(_r2) || E(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return R;}();var q = {},F = {};function L(e) {return q[e];}var N = function N(e, t) {_classCallCheck(this, N);this.data = t || null, this.name = e;};var M = /*#__PURE__*/function (_N) {_inherits(M, _N);var _super3 = _createSuper(M);function M(e, t) {var _this7;_classCallCheck(this, M);_this7 = _super3.call(this, "error", { error: e, data: t }), _this7.error = e;return _this7;}return M;}(N);var $ = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof M) return console.error(e.error), this;var s = "string" == typeof e ? new N(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e6 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e6),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function K(e, t) {$.on(e, t);}function j(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};$.fire(e, t);}function B(e, t) {$.off(e, t);}var H = "loginStateChanged",W = "loginStateExpire",V = "loginTypeChanged",z = "anonymousConverted",J = "refreshAccessToken";var Y;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Y || (Y = {}));var X = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],G = { "X-SDK-Version": "1.3.5" };function Q(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e7 in r) {i.append(_e7, r[_e7]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function Z() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, G), {}, { "x-seqid": e }) };}var ee = /*#__PURE__*/function () {function ee() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, ee);var t;this.config = e, this._reqClass = new D.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = L(this.config.env), this._localCache = (t = this.config.env, F[t]), Q(this._reqClass, "post", [Z]), Q(this._reqClass, "upload", [Z]), Q(this._reqClass, "download", [Z]);}_createClass(ee, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e8, _e9, _t5, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e8 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e8 || "REFRESH_TOKEN_EXPIRED" === _e8 || "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === Y.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 19;break;}_e9 = this._cache.getStore(r);_t5 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e9, refresh_token: _t5 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:j(W), this._cache.removeStore(s);case 20:throw new Error("刷新access token失败：" + a.data.code);case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (j(J), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e10, i, _e11, _e12, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_" + this.config.env;r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === X.indexOf(e))) {_context7.next = 10;break;}_e10 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e10);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e11 in i) {i.hasOwnProperty(_e11) && void 0 !== i[_e11] && i.append(_e11, o[_e11]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e12 in o) {void 0 !== o[_e12] && (i[_e12] = o[_e12]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e13 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e13, "=").concat(encodeURIComponent(s[_e13]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(S, k, d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === X.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return ee;}();var te = {};function se(e) {return te[e];}var ne = /*#__PURE__*/function () {function ne(e) {_classCallCheck(this, ne);this.config = e, this._cache = L(e.env), this._request = se(e.env);}_createClass(ne, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return ne;}();var re = /*#__PURE__*/function () {function re(e) {_classCallCheck(this, re);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = L(this._envId), this._request = se(this._envId), this.setUserInfo();}_createClass(re, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this8 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this8[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return re;}();var oe = /*#__PURE__*/function () {function oe(e) {_classCallCheck(this, oe);if (!e) throw new Error("envId is not defined");this._cache = L(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new re(e);}_createClass(oe, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Y.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Y.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Y.WECHAT || this.loginType === Y.WECHAT_OPEN || this.loginType === Y.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return oe;}();var ie = /*#__PURE__*/function (_ne) {_inherits(ie, _ne);var _super4 = _createSuper(ie);function ie() {_classCallCheck(this, ie);return _super4.apply(this, arguments);}_createClass(ie, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e14;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:j(H);j(V, { env: this.config.env, loginType: Y.ANONYMOUS, persistence: "local" });_e14 = new oe(this.config.env);_context13.next = 19;return _e14.user.refresh();case 19:return _context13.abrupt("return", _e14);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:j(z, { env: this.config.env });j(V, { loginType: Y.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, Y.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return ie;}(ne);var ae = /*#__PURE__*/function (_ne2) {_inherits(ae, _ne2);var _super5 = _createSuper(ae);function ae() {_classCallCheck(this, ae);return _super5.apply(this, arguments);}_createClass(ae, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:j(H);j(V, { env: this.config.env, loginType: Y.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new oe(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ae;}(ne);var ce = /*#__PURE__*/function (_ne3) {_inherits(ce, _ne3);var _super6 = _createSuper(ce);function ce() {_classCallCheck(this, ce);return _super6.apply(this, arguments);}_createClass(ce, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:j(H);j(V, { env: this.config.env, loginType: Y.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new oe(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return ce;}(ne);var ue = /*#__PURE__*/function (_ne4) {_inherits(ue, _ne4);var _super7 = _createSuper(ue);function ue() {_classCallCheck(this, ue);return _super7.apply(this, arguments);}_createClass(ue, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Y.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:j(H);j(V, { env: this.config.env, loginType: Y.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new oe(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ue;}(ne);var he = /*#__PURE__*/function () {function he(e) {_classCallCheck(this, he);this.config = e, this._cache = L(e.env), this._request = se(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), K(V, this._onLoginTypeChanged);}_createClass(he, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new ie(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ae(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new ce(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ue(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new ie(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new ce(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ue(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new ie(this.config)), K(z, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Y.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), j(H), j(V, { env: this.config.env, loginType: Y.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this9 = this;K(H, function () {var t = _this9.hasLoginState();e.call(_this9, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {K(W, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {K(J, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {K(z, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this10 = this;K(V, function () {var t = _this10.hasLoginState();e.call(_this10, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new oe(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ae(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return he;}();var le = function le(e, t) {t = t || A();var s = se(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},de = function de(e, t) {t = t || A();var s = se(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},fe = function fe(_ref5, t) {var e = _ref5.fileList;if (t = t || A(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return se(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},pe = function pe(_ref6, t) {var e = _ref6.fileList;t = t || A(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return se(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},ge = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return pe.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = se(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function ge(_x26, _x27) {return _ref8.apply(this, arguments);};}(),me = function me(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || A();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return se(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (n) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},ye = { timeout: 15e3, persistence: "session" },_e = {};var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);this.config = e || this.config, this.authObj = void 0;}_createClass(ve, [{ key: "init", value: function init(e) {switch (D.adapter || (this.requestClient = new D.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, ye), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new ve(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || D.adapter.primaryStorage || ye.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;q[t] = new R(e), F[t] = new R(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, te[s.env] = new ee(s), this.authObj = new he(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return K.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return B.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return me.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return fe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return pe.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return ge.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return le.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return de.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {_e[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = _e[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = U(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (D.adapter = t), s && (D.runtime = s);} }]);return ve;}();var we = new ve();function Se(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var ke = /*#__PURE__*/function () {function ke() {_classCallCheck(this, ke);}_createClass(ke, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {_.request({ url: Se("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = _.uploadFile({ url: Se("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) { false && false, s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return ke;}();var Te = { setItem: function setItem(e, t) {_.setStorageSync(e, t);}, getItem: function getItem(e) {return _.getStorageSync(e);}, removeItem: function removeItem(e) {_.removeStorageSync(e);}, clear: function clear() {_.clearStorageSync();} };var Pe = { genAdapter: function genAdapter() {return { root: {}, reqClass: ke, localStorage: Te, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };we.useAdapters(Pe);var Ae = we,Ie = Ae.init;Ae.init = function (e) {e.env = e.spaceId;var t = Ie.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;}, t.customAuth = t.auth;return ["deleteFile", "getTempFileURL", "downloadFile"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;};var Ee = /*#__PURE__*/function (_v) {_inherits(Ee, _v);var _super8 = _createSuper(Ee);function Ee() {_classCallCheck(this, Ee);return _super8.apply(this, arguments);}_createClass(Ee, [{ key: "getAccessToken", value: function getAccessToken() {var _this11 = this;return new Promise(function (e, t) {_this11.setAccessToken("Anonymous_Access_token"), e("Anonymous_Access_token");});} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };"auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = y.sign(s, this.config.clientSecret);var r = p(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return n["x-client-platform"] = i, n["x-client-appid"] = o, n["x-client-device-id"] = a, n["x-client-version"] = c, n["x-client-token"] = _.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: JSON.parse(JSON.stringify(n)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this12 = this;var e = _ref12.url,t = _ref12.formData,s = _ref12.name,n = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (a, c) {var u = _this12.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, success: function success(e) {e && e.statusCode < 400 ? a(e) : c(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {c(new i({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this13 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,s = _ref13$fileType === void 0 ? "image" : _ref13$fileType,n = _ref13.onUploadProgress;if (!t) throw new i({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: s };return _this13.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: n }));}).then(function () {return _this13.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: r }) : n(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }]);return Ee;}(v);var Oe = { init: function init(e) {var t = new Ee(e);["deleteFile", "getTempFileURL"].forEach(function (e) {t[e] = o(t[e]).bind(t);});var s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} };var Ue, De;function be(_ref14) {var e = _ref14.name,t = _ref14.data,s = _ref14.spaceId,n = _ref14.provider;Ue || (Ue = p(), De = { ak: h.appid, p: "android" === d ? "a" : "i", ut: m(), uuid: g() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = s,a = { tencent: "t", aliyun: "a" }[n];{var _e15 = Object.assign({}, De, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: Ue, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e15)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e16 = _.getStorageSync("uni_id_token") || _.getStorageSync("uniIdToken");_e16 && (r.uniIdToken = _e16);}return r;}function Ce(_ref15) {var _this14 = this;var e = _ref15.name,t = _ref15.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,a = "http://".concat(s, ":").concat(n, "/system/check-function"),c = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {_.request({ method: "POST", url: a, data: { name: e, platform: "mp-weixin", provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,s = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref18) {var s = _ref18.code,n = _ref18.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e17 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e17), new Error(_e17);}case "SWITCH_TO_CLOUD":break;default:{var _e18 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e18), new Error(_e18);}}return _this14.originCallFunction({ name: e, data: t });}return new Promise(function (s, n) {var a = be({ name: e, data: t, provider: _this14.config.provider, spaceId: o });_.request({ method: "POST", url: c, data: { provider: r, platform: "mp-weixin", param: a }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? n(new i({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : s({ result: t });}, fail: function fail(e) {n(new i({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var xe = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Re = /[\\^$.*+?()[\]{}|]/g,qe = RegExp(Re.source);function Fe(e, t, s) {return e.replace(new RegExp((n = t) && qe.test(n) ? n.replace(Re, "\\$&") : n, "g"), s);var n;}function Le(e) {var t = e.callFunction;e.callFunction = function (e) {var _this15 = this;var s;s = this.isReady ? Promise.resolve() : this.initUniCloud;var n = e.name;return s.then(function () {e.data = be({ name: n, data: e.data, provider: _this15.config.provider, spaceId: _this15.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[_this15.config.provider];return new Promise(function (r, o) {t.call(_this15, e).then(function (e) {if (_this15.config.useDebugFunction && e && e.requestId) {var _t9 = JSON.stringify({ spaceId: _this15.config.spaceId, functionName: n, requestId: e.requestId });console.log("[".concat(s, "-request]").concat(_t9, "[/").concat(s, "-request]"));}r(e);}).catch(function (t) {if (_this15.config.useDebugFunction && t && t.requestId) {var _e19 = JSON.stringify({ spaceId: _this15.config.spaceId, functionName: n, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_e19, "[/").concat(s, "-request]"));}t && t.message && (t.message = function () {var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref20$message = _ref20.message,e = _ref20$message === void 0 ? "" : _ref20$message,_ref20$extraInfo = _ref20.extraInfo,t = _ref20$extraInfo === void 0 ? {} : _ref20$extraInfo,_ref20$formatter = _ref20.formatter,s = _ref20$formatter === void 0 ? [] : _ref20$formatter;for (var _n7 = 0; _n7 < s.length; _n7++) {var _s$_n = s[_n7],_r3 = _s$_n.rule,_o2 = _s$_n.content,_i2 = _s$_n.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Fe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Fe(_c, "{".concat(_e21, "}"), t[_e21]);}switch (_i2) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: xe, extraInfo: { functionName: n } })), o(t);});});});};var s = e.callFunction;e.originCallFunction = e.callFunction, e.callFunction = function (t) {return o(function (t) {var _this16 = this;var n;n = e.isReady ? Promise.resolve() : e.initUniCloud;var r = n.then(function () {return  true && e.debugInfo && !e.debugInfo.forceRemote && [{"provider":"aliyun","spaceName":"ne-app","spaceId":"07ea9678-83a3-4e64-8aad-b0d01316832a","clientSecret":"KVuWx8IFn1SR5CEW8QeYaQ==","endpoint":"https://api.bspapp.com"}] ? Ce.call(_this16, t) : s.call(_this16, t);});return Object.defineProperty(r, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), r;}).call(this, t);};}var Ne = Symbol("CLIENT_DB_INTERNAL");function Me(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ne, new Proxy(e, { get: function get(e, s, n) {return function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}(e, s) || e[s] || "string" != typeof s ? e[s] : t.get(e, s, n);} });}var $e = /*#__PURE__*/function (_Error2) {_inherits($e, _Error2);var _super9 = _createSuper($e);function $e(e, t) {var _this17;_classCallCheck(this, $e);_this17 = _super9.call(this, e), _this17.code = t;return _this17;}return $e;}( /*#__PURE__*/_wrapNativeSuper(Error));function Ke(e) {switch (t = e, Object.prototype.toString.call(t).slice(8, -1).toLowerCase()) {case "array":return e.map(function (e) {return Ke(e);});case "object":return e._internalType === Ne || Object.keys(e).forEach(function (t) {e[t] = Ke(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}var t;}function je() {var e = _.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(atob(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var n;return s.tokenExpired = 1e3 * s.exp, delete s.exp, delete s.iat, s;}var Be = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:fail";function n(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref21) {var s = _ref21.onChooseFile,n = _ref21.onUploadProgress;return t.then(function (e) {if (s) {var _t10 = s(e);if (void 0 !== _t10) return Promise.resolve(_t10).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: "chooseAndUploadFile:ok", tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var n = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = "chooseAndUploadFile:ok";var r = t.tempFiles,o = r.length;var i = 0;return new Promise(function (a) {for (; i < s;) {c();}function c() {var s = i++;if (s >= o) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && a(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, n && n(e);} }).then(function (e) {u.url = e.fileID, s < o && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < o && c();});}});}(e, t, 5, n);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,r = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: r, sourceType: o, extension: i, success: function success(t) {e(n(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,r = e.compressed,o = e.maxDuration,i = e.sourceType,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: r, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,r = t.duration,o = t.size,i = t.height,a = t.width;e(n({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: r, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,r = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: r, success: function success(t) {e(n(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var He = "manual";function We(_x30, _x31) {return _We.apply(this, arguments);}function _We() {_We = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e28, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {_.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context32.sent;return _context32.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _We.apply(this, arguments);}var Ve = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && "development" === "development" && ( false || "app-plus" === "mp-weixin");switch (e.provider) {case "tencent":t = Ae.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = w.init(Object.assign(e, { useDebugFunction: s }));break;case "private":t = Oe.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("未提供正确的provider参数");}var n = {
    "address": [
        "127.0.0.1",
        "10.192.179.67",
        "172.22.0.1"
    ],
    "debugPort": 61810,
    "initialLaunchType": "local",
    "servePort": 61811
}
; true && n && !n.code && (t.debugInfo = n), t.isReady = !1;var r = t.auth();return t.initUniCloud = r.getLoginState().then(function (e) {return e ? Promise.resolve() : r.signInAnonymously();}).then(function () {if ( true && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e22 = _t$debugInfo.address,_s4 = _t$debugInfo.servePort;return function () {var _ref22 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n8, _r4;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n8 = 0;case 1:if (!(_n8 < e.length)) {_context31.next = 11;break;}_r4 = e[_n8];_context31.next = 5;return We(_r4, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r4;return _context31.abrupt("break", 11);case 8:_n8++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref22.apply(this, arguments);};}()(_e22, _s4);}return Promise.resolve();}).then(function () {var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref23.address,s = _ref23.port;if (e) t.localAddress = e, t.localPort = s;else if (t.debugInfo) {var _e23 =  false ? undefined : "warn",_s5 = console[_e23];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _s5("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试")) : _s5("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试");}}).then(function () {return function () {if (true) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === h.appid) return;uni.setStorageSync("__LAST_DCLOUD_APPID", h.appid), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) { false ? (undefined) : setTimeout(function () {d = uni.getSystemInfoSync().platform, l = uni.getStorageSync("__DC_CLOUD_UUID") || f(32), e();}, 0);});}).then(function () {t.isReady = !0;}), Le(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this18 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {return t.call(_this18, e);});};var s = e.uploadFile;e.uploadFile = function (e) {return o(s).call(this, e);};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {},s = {};var n = /*#__PURE__*/function () {function n(e, t, s) {_classCallCheck(this, n);this.content = e, this.prevStage = t, this.actionName = s;}_createClass(n, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: e.$param };}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(n, r) {var o = this.toJSON();return o.$db.push({ $method: n, $param: Ke(r) }), e.callFunction({ name: "DCloud-clientDB", data: { action: this.actionName, command: o } }).then(function (e) {var _e$result = e.result,n = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,a = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (a) for (var _e24 = 0; _e24 < a.length; _e24++) {var _a$_e = a[_e24],_t11 = _a$_e.level,_s6 = _a$_e.message,_n9 = _a$_e.detail,_r5 =  false ? undefined : _t11,_o3 = console[_r5] || console.log;var _i3 = "[System Info]" + _s6;_n9 && (_i3 = "".concat(_i3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_n9)), _o3(_i3);}if (n) return Promise.reject(new $e(r, n));o && i && t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), o && i && s.refreshToken && s.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });});var c = e.result.affectedDocs;return "number" == typeof c && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), c;} }), Promise.resolve(e);}).catch(function (e) {var t = new $e(e.message, e.code || "SYSTEM_ERROR");return s.error && s.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), Promise.reject(e);});} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s7 = e.content.$method;if ("aggregate" === _s7 || "pipeline" === _s7) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return i({ $method: "count", $param: Ke(Array.from(arguments)) }, e, e.actionName);};} }]);return n;}();var r = ["db.Geo", "db.command", "command.aggregate"];function o(e, t) {return r.indexOf("".concat(e, ".").concat(t)) > -1;}function i(e, t, s) {return Me(new n(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), o(n, t) ? i({ $method: t }, e, s) : function () {return i({ $method: t, $param: Ke(Array.from(arguments)) }, e, s);};} });}function a(_ref24) {var e = _ref24.path,t = _ref24.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var c = { auth: { on: function on(e, s) {t[e] = t[e] || [], t[e].indexOf(s) > -1 || t[e].push(s);}, off: function off(e, s) {t[e] = t[e] || [];var n = t[e].indexOf(s);-1 !== n && t[e].splice(n, 1);} }, on: function on(e, t) {s[e] = s[e] || [], s[e].indexOf(t) > -1 || s[e].push(t);}, off: function off(e, t) {s[e] = s[e] || [];var n = s[e].indexOf(t);-1 !== n && s[e].splice(n, 1);}, env: Me({}, { get: function get(e, t) {return { $env: t };} }), action: function action(e) {return Me({}, { get: function get(t, s) {return o("db", s) ? i({ $method: s }, null, e) : function () {return i({ $method: s, $param: Ke(Array.from(arguments)) }, null, e);};} });}, Geo: Me({}, { get: function get(e, t) {return a({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, get serverDate() {return a({ path: [], method: "serverDate" });}, get RegExp() {return a({ path: [], method: "RegExp" });} },u = Me(c, { get: function get(e, t) {return o("db", t) ? i({ $method: t }) : function () {return i({ $method: t, $param: Ke(Array.from(arguments)) });};} });return this._database = u, u;};}(t), function (e) {e.getCurrentUserInfo = je, e.chooseAndUploadFile = o(Be.initChooseAndUploadFile(e));}(t), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = {};if (1 === [{"provider":"aliyun","spaceName":"ne-app","spaceId":"07ea9678-83a3-4e64-8aad-b0d01316832a","clientSecret":"KVuWx8IFn1SR5CEW8QeYaQ==","endpoint":"https://api.bspapp.com"}].length) e = [{"provider":"aliyun","spaceName":"ne-app","spaceId":"07ea9678-83a3-4e64-8aad-b0d01316832a","clientSecret":"KVuWx8IFn1SR5CEW8QeYaQ==","endpoint":"https://api.bspapp.com"}][0], Ve = Ve.init(e);else {var _e25 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var t;t =  true && [{"provider":"aliyun","spaceName":"ne-app","spaceId":"07ea9678-83a3-4e64-8aad-b0d01316832a","clientSecret":"KVuWx8IFn1SR5CEW8QeYaQ==","endpoint":"https://api.bspapp.com"}].length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" :  true ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : undefined, _e25.forEach(function (e) {Ve[e] = function () {return console.error(t), Promise.reject(new i({ code: "SYS_ERR", message: t }));};});}Object.assign(Ve, { get mixinDatacom() {return e = Ve, { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this19 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this19[t]);}), e;}, function (e, t) {if (_this19.loadtime === He) return;var s = !1;var n = [];for (var _r6 = 2; _r6 < e.length; _r6++) {e[_r6] !== t[_r6] && (n.push(e[_r6]), s = !0);}e[0] !== t[0] && (_this19.mixinDatacomPage.current = _this19.pageCurrent), _this19.mixinDatacomPage.size = _this19.pageSize, _this19.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this20 = this;var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref25$getone = _ref25.getone,e = _ref25$getone === void 0 ? !1 : _ref25$getone,t = _ref25.success,s = _ref25.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this20.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this20.getcount && (_this20.mixinDatacomPage.count = r), _this20.mixinDatacomHasMore = n.length < _this20.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this20.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this20.mixinDatacomLoading = !1, _this20.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database();var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.foreignKey || this.foreignKey;a && (s = s.foreignKey(a));var c = t.groupby || this.groupby;c && (s = s.groupBy(c));var u = t.groupField || this.groupField;u && (s = s.groupField(u)), !0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var h = t.orderby || this.orderby;h && (s = s.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), s = s.skip(d * (l - 1)).limit(d).get(m), s;} } };var e;} });}})();var ze = Ve;var _default2 = ze;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../node-libs-browser/mock/process.js */ 13)))

/***/ }),

/***/ 13:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 14);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 14:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 13)))

/***/ }),

/***/ 15:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 16);

/***/ }),

/***/ 16:
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

module.exports = __webpack_require__(/*! ./runtime */ 17);

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

/***/ 17:
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

/***/ 18:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initVueI18n = initVueI18n;exports.I18n = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isObject = function isObject(val) {return val !== null && typeof val === 'object';};var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else
    if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else
    {
      text += _char;
    }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans';
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant';
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  var lang = startsWith(locale, ['en', 'fr', 'es']);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref) {var locale = _ref.locale,fallbackLocale = _ref.fallbackLocale,messages = _ref.messages,watcher = _ref.watcher,formater = _ref.formater;_classCallCheck(this, I18n);
    this.locale = 'en';
    this.fallbackLocale = 'en';
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      this.message = this.messages[this.locale];
      this.watchers.forEach(function (watcher) {
        watcher(_this.locale, oldLocale);
      });
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function initLocaleWatcher(appVm, i18n) {
  appVm.$i18n &&
  appVm.$i18n.vm.$watch('locale', function (newLocale) {
    i18n.setLocale(newLocale);
  }, {
    immediate: true });

}
function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== 'undefined') {
    // TODO 待调整为最新的获取语言代码
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages) {var fallbackLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';var locale = arguments.length > 2 ? arguments[2] : undefined;
  var i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: messages });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale());
        }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          return i18n.t(key, values);
        };
      } else
      {
        initLocaleWatcher(appVm, i18n);
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    t: function t(key, values) {
      return _t(key, values);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    },
    mixin: {
      beforeCreate: function beforeCreate() {var _this3 = this;
        var unwatch = i18n.watchLocale(function () {
          _this3.$forceUpdate();
        });
        this.$once('hook:beforeDestroy', function () {
          unwatch();
        });
      },
      methods: {
        $$t: function $$t(key, values) {
          return _t(key, values);
        } } } };



}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!*************************************************************************!*\
  !*** C:/Users/huwei/Desktop/网易云信/donotsmile/pages.json?{"type":"stat"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__D245BFC" };exports.default = _default;

/***/ }),

/***/ 2:
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
                    if (currentValue != pre[key]) {
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
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"donotsmile-wx","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"donotsmile-wx","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"donotsmile-wx","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"donotsmile-wx","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 3:
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

/***/ 4:
/*!*********************************************************!*\
  !*** C:/Users/huwei/Desktop/网易云信/donotsmile/pages.json ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 62:
/*!****************************************************************!*\
  !*** C:/Users/huwei/Desktop/网易云信/donotsmile/common/init-im.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var NIM = __webpack_require__(/*! ./NIM_Web_NIM_miniapp_v8.4.0 */ 63);






var initNIM = function initNIM() {
  var userInfo = getApp().globalData.userInfo;

  function onConnect() {
    console.log('连接成功');
  }
  function onWillReconnect(obj) {
    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log('即将重连', obj);
  }
  function onDisconnect(error) {
    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log('连接断开', error);
    if (error) {
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          break;
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
          break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
          break;
        default:
          break;}

    }
  }
  function onError(error, obj) {
    console.log('发生错误', error, obj);
  }

  function onLoginPortsChange(loginPorts) {
    console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
  }

  function onBlacklist(blacklist) {
    console.log('收到黑名单', blacklist);
    getApp().globalData.blacklist = nim.mergeRelations(getApp().globalData.blacklist, blacklist);
    getApp().globalData.blacklist = nim.cutRelations(getApp().globalData.blacklist, blacklist.invalid);
    refreshBlacklistUI();
  }
  function onMarkInBlacklist(obj) {
    console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '黑名单', obj);
    if (obj.isAdd) {
      addToBlacklist(obj);
    } else {
      removeFromBlacklist(obj);
    }
  }
  function addToBlacklist(obj) {
    getApp().globalData.blacklist = nim.mergeRelations(getApp().globalData.blacklist, obj.record);
    refreshBlacklistUI();
  }
  function removeFromBlacklist(obj) {
    getApp().globalData.blacklist = nim.cutRelations(getApp().globalData.blacklist, obj.record);
    refreshBlacklistUI();
  }
  function refreshBlacklistUI() {
    // 刷新界面
  }
  function onMutelist(mutelist) {
    console.log('收到静音列表', mutelist);
    getApp().globalData.mutelist = nim.mergeRelations(getApp().globalData.mutelist, mutelist);
    getApp().globalData.mutelist = nim.cutRelations(getApp().globalData.mutelist, mutelist.invalid);
    refreshMutelistUI();
  }
  function onMarkInMutelist(obj) {
    console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表', obj);
    if (obj.isAdd) {
      addToMutelist(obj);
    } else {
      removeFromMutelist(obj);
    }
  }
  function addToMutelist(obj) {
    getApp().globalData.mutelist = nim.mergeRelations(getApp().globalData.mutelist, obj.record);
    refreshMutelistUI();
  }
  function removeFromMutelist(obj) {
    getApp().globalData.mutelist = nim.cutRelations(getApp().globalData.mutelist, obj.record);
    refreshMutelistUI();
  }
  function refreshMutelistUI() {
    // 刷新界面
  }

  function onFriends(friends) {
    console.log('收到好友列表', friends);
    getApp().globalData.friends = nim.mergeFriends(getApp().globalData.friends, friends);
    getApp().globalData.friends = nim.cutFriends(getApp().globalData.friends, friends.invalid);
  }
  function onSyncFriendAction(obj) {
    console.log('收到好友操作', obj);
    switch (obj.type) {
      case 'addFriend':
        console.log('你在其它端直接加了一个好友' + obj);
        onAddFriend(obj.friend);
        break;
      case 'applyFriend':
        console.log('你在其它端申请加了一个好友' + obj);
        break;
      case 'passFriendApply':
        console.log('你在其它端通过了一个好友申请' + obj);
        onAddFriend(obj.friend);
        break;
      case 'rejectFriendApply':
        console.log('你在其它端拒绝了一个好友申请' + obj);
        break;
      case 'deleteFriend':
        console.log('你在其它端删了一个好友' + obj);
        onDeleteFriend(obj.account);
        break;
      case 'updateFriend':
        console.log('你在其它端更新了一个好友', obj);
        onUpdateFriend(obj.friend);
        break;}

  }
  function onAddFriend(friend) {
    console.log('添加friend ' + friend);
    getApp().globalData.friends = nim.mergeFriends(getApp().globalData.friends, friend);
  }
  function onDeleteFriend(account) {
    getApp().globalData.friends = nim.cutFriendsByAccounts(getApp().globalData.friends, account);
    localStorage.setItem("friends", getApp().globalData.friends);
    refreshFriendsUI();
  }
  function onUpdateFriend(friend) {
    getApp().globalData.friends = nim.mergeFriends(getApp().globalData.friends, friend);
    localStorage.setItem("friends", getApp().globalData.friends);
    refreshFriendsUI();
  }
  function refreshFriendsUI() {
    // 刷新界面
  }

  function onMyInfo(user) {
    console.log('收到我的名片', user);
    getApp().globalData.myInfo = user;
    updateMyInfoUI();
  }
  function onUpdateMyInfo(user) {
    console.log('我的名片更新了', user);
    getApp().globalData.myInfo = NIM.util.merge(getApp().globalData.myInfo, user);
    updateMyInfoUI();
  }
  function updateMyInfoUI() {
    // 刷新界面
  }
  function onUsers(users) {
    console.log('收到用户名片列表', users);
    getApp().globalData.users = nim.mergeUsers(getApp().globalData.users, users);
  }
  function onUpdateUser(user) {
    console.log('用户名片更新了', user);
    getApp().globalData.users = nim.mergeUsers(getApp().globalData.users, user);
  }

  function onSuperTeams(superTeams) {
    console.log('收到超大群列表', superTeams);
    getApp().globalData.superTeams = nim.mergeTeams(getApp().globalData.superTeams, superTeams);
    onInvalidSuperTeams(superTeams.invalid);
  }
  function onInvalidSuperTeams(teams) {
    getApp().globalData.superTeams = nim.cutTeams(getApp().globalData.superTeams, teams);
    getApp().globalData.invalidSuperTeams = nim.mergeTeams(getApp().globalData.invalidSuperTeams, teams);
    refreshSuperTeamsUI();
  }

  function onSyncCreateSuperTeam(team, owner) {
    console.log('创建了一个超大群 onSyncCreateSuperTeam ', team, owner);
    getApp().globalData.superTeams = nim.mergeTeams(getApp().globalData.superTeams, team);
    refreshSuperTeamsUI();
    onSuperTeamMembers({
      teamId: team.teamId,
      members: owner });

  }
  function onAddSuperTeamMembers(team, accounts, members) {
    console.log('添加群成员 onAddSuperTeamMembers ', team, accounts, members);
    if (!accounts && !members) {
      accounts = team.accounts || [];
      members = team.members || [];
      team = team.team || {};
    }
    var teamId = team.teamId;

    // 如果是别人被拉进来了，那么拼接群成员列表
    // 如果是自己被拉进来了，那么同步一次群成员列表

    if (accounts.indexOf(getApp().globalData.account) === -1) {
      onSuperTeamMembers({
        teamId: teamId,
        members: members });

    } else {
      // ...
    }
    onSuperTeams(team);
  }
  function onDismissSuperTeam(obj) {
    console.log('解散超大群 onDismissSuperTeam', obj);
    var teamId = obj.teamId;
    removeAllSuperTeamMembers(teamId);
    getApp().globalData.superTeams = nim.cutTeams(getApp().globalData.superTeams, obj);
    refreshSuperTeamsUI();
    refreshSuperTeamMembersUI();
  }
  function onRemoveSuperTeamMembers(obj) {
    console.log('移除了群成员 onRemoveSuperTeamMembers ', obj.accounts, obj);
    var teamId = obj.team.teamId;
    var accounts = obj.accounts;
    var team;
    if (!teamId && !accounts) {
      accounts = obj.accounts || [];
    }
    // 如果是别人被踢了，那么移除群成员
    // 如果是自己被踢了，那么离开该群
    if (accounts.indexOf(getApp().globalData.account) === -1) {
      if (team) {
        onSuperTeams(team);
      }
      if (!getApp().globalData.superTeamMembers) {
        getApp().globalData.superTeamMembers = {};
      }
      getApp().globalData.superTeamMembers[teamId] = nim.cutTeamMembersByAccounts(
      getApp().globalData.superTeamMembers[teamId],
      teamId,
      accounts);

      refreshSuperTeamMembersUI();
    } else {
      leaveSuperTeam(teamId);
    }
  }
  function onUpdateSuperTeam(err, msg) {
    console.log('更新了超大群 teamId', err, msg);
  }
  function onUpdateSuperTeamMember(member) {
    console.log('群成员信息更新了', member);
  }
  function leaveSuperTeam(teamId) {
    onInvalidSuperTeams({
      teamId: teamId });

    removeAllSuperTeamMembers(teamId);
  }
  function refreshSuperTeamsUI() {
  }
  function refreshSuperTeamMembersUI() {
  }
  function removeAllSuperTeamMembers() {
  }
  function onTeams(teams) {
    console.log('群列表', teams);
    getApp().globalData.teams = nim.mergeTeams(getApp().globalData.teams, teams);
    onInvalidTeams(teams.invalid);
  }
  function onInvalidTeams(teams) {
    getApp().globalData.teams = nim.cutTeams(getApp().globalData.teams, teams);
    getApp().globalData.invalidTeams = nim.mergeTeams(getApp().globalData.invalidTeams, teams);
    refreshTeamsUI();
  }
  function onCreateTeam(team) {
    console.log('你创建了一个群', team);
    getApp().globalData.teams = nim.mergeTeams(getApp().globalData.teams, team);
    refreshTeamsUI();
    onTeamMembers({
      teamId: team.teamId,
      members: owner });

  }
  function refreshTeamsUI() {
    // 刷新界面
  }
  function onTeamMembers(obj) {
    console.log('收到群成员', obj);
    var teamId = obj.teamId;
    var members = obj.members;
    getApp().globalData.teamMembers = getApp().globalData.teamMembers || {};
    getApp().globalData.teamMembers[teamId] = nim.mergeTeamMembers(getApp().globalData.teamMembers[teamId], members);
    getApp().globalData.teamMembers[teamId] = nim.cutTeamMembers(getApp().globalData.teamMembers[teamId], members.invalid);
    refreshTeamMembersUI();
  }
  function onSyncTeamMembersDone() {
    console.log('同步群列表完成');
  }
  function onUpdateTeamMember(teamMember) {
    console.log('群成员信息更新了', teamMember);
    onTeamMembers({
      teamId: teamMember.teamId,
      members: teamMember });

  }
  function refreshTeamMembersUI() {
    // 刷新界面
  }

  function onSessions(sessions) {
    console.log('收到会话列表', sessions);
    getApp().globalData.sessions = nim.mergeSessions(getApp().globalData.sessions, sessions);
    localStorage.setItem("sessions", getApp().globalData.sessions);
    updateSessionsUI();
  }
  function onUpdateSession(session) {
    console.log('会话更新了', session);
    getApp().globalData.sessions = nim.mergeSessions(getApp().globalData.sessions, session);
    localStorage.setItem("sessions", getApp().globalData.sessions);
    updateSessionsUI();
  }
  function updateSessionsUI() {
    // 刷新界面
  }

  function onRoamingMsgs(obj) {
    console.log('漫游消息', obj);
    pushMsg(obj.msgs);
  }
  function onOfflineMsgs(obj) {
    console.log('离线消息', obj);
    pushMsg(obj.msgs);
  }
  function onMsg(msg) {
    console.log('收到消息', msg.scene, msg.type, msg);
    pushMsg(msg);
  }
  function pushMsg(msgs) {
    if (!Array.isArray(msgs)) {msgs = [msgs];}
    var sessionId = msgs[0].sessionId;
    getApp().globalData.msgs = getApp().globalData.msgs || {};
    getApp().globalData.msgs[sessionId] = nim.mergeMsgs(getApp().globalData.msgs[sessionId], msgs);
  }

  function onOfflineSysMsgs(sysMsgs) {
    console.log('收到离线系统通知', sysMsgs);
    pushSysMsgs(sysMsgs);
  }
  function onSysMsg(sysMsg) {
    console.log('收到系统通知', sysMsg);
    pushSysMsgs(sysMsg);
  }
  function onUpdateSysMsg(sysMsg) {
    pushSysMsgs(sysMsg);
  }
  function pushSysMsgs(sysMsgs) {
    getApp().globalData.sysMsgs = nim.mergeSysMsgs(getApp().globalData.sysMsgs, sysMsgs);
    refreshSysMsgsUI();
  }
  function onSysMsgUnread(obj) {
    console.log('收到系统通知未读数', obj);
    getApp().globalData.sysMsgUnread = obj;
    refreshSysMsgsUI();
  }
  function onUpdateSysMsgUnread(obj) {
    console.log('系统通知未读数更新了', obj);
    getApp().globalData.sysMsgUnread = obj;
    refreshSysMsgsUI();
  }
  function refreshSysMsgsUI() {
    // 刷新界面
  }
  function onOfflineCustomSysMsgs(sysMsgs) {
    console.log('收到离线自定义系统通知', sysMsgs);
  }
  function onCustomSysMsg(sysMsg) {
    console.log('收到自定义系统通知', sysMsg);
  }

  function onSyncDone() {
    console.log('同步完成');
  }

  var nim = NIM.getInstance({
    // 初始化SDK
    // debug: true
    appKey: '338f742de66a8283293644c990b7bbf6',
    account: userInfo.im_info.name,
    token: userInfo.im_info.token,
    onconnect: onConnect,
    onerror: onError,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    // 多端
    onloginportschange: onLoginPortsChange,
    // 用户关系
    onblacklist: onBlacklist,
    onsyncmarkinblacklist: onMarkInBlacklist,
    onmutelist: onMutelist,
    onsyncmarkinmutelist: onMarkInMutelist,
    // 好友关系
    onfriends: onFriends,
    onsyncfriendaction: onSyncFriendAction,
    onAddFriend: onAddFriend,
    // 用户名片
    onmyinfo: onMyInfo,
    onupdatemyinfo: onUpdateMyInfo,
    onusers: onUsers,
    onupdateuser: onUpdateUser,
    // 超大群
    onSuperTeams: onSuperTeams,
    onSyncCreateSuperTeam: onSyncCreateSuperTeam,
    onDismissSuperTeam: onDismissSuperTeam,
    onUpdateSuperTeamMember: onUpdateSuperTeamMember,
    onUpdateSuperTeam: onUpdateSuperTeam, // 更新超大群的回调
    onAddSuperTeamMembers: onAddSuperTeamMembers, // 新成员入超大群的回调
    onRemoveSuperTeamMembers: onRemoveSuperTeamMembers,
    // 群组
    onteams: onTeams,
    onsynccreateteam: onCreateTeam,
    onteammembers: onTeamMembers,
    onsyncteammembersdone: onSyncTeamMembersDone,
    onupdateteammember: onUpdateTeamMember,
    // 会话
    onsessions: onSessions,
    onupdatesession: onUpdateSession,
    // 消息
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg,
    // 系统通知
    onofflinesysmsgs: onOfflineSysMsgs,
    onsysmsg: onSysMsg,
    onupdatesysmsg: onUpdateSysMsg,
    onsysmsgunread: onSysMsgUnread,
    onupdatesysmsgunread: onUpdateSysMsgUnread,
    onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
    oncustomsysmsg: onCustomSysMsg,
    // 同步完成
    onsyncdone: onSyncDone });

  return nim;
};var _default =
initNIM;exports.default = _default;

/***/ }),

/***/ 63:
/*!***********************************************************************************!*\
  !*** C:/Users/huwei/Desktop/网易云信/donotsmile/common/NIM_Web_NIM_miniapp_v8.4.0.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports;}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r});},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0});},n.n=function(e){var t=e&&e.__esModule?function(){return e.default;}:function(){return e;};return n.d(t,"a",t),t;},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t);},n.p="",n(n.s=506);}([function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(97),a=n(96);n(153);var c,u,m=n(23),l=m.getGlobal(),d=/\s+/;m.deduplicate=function(e){var t=[];return e.forEach(function(e){-1===t.indexOf(e)&&t.push(e);}),t;},m.capFirstLetter=function(e){return e?(e=""+e).slice(0,1).toUpperCase()+e.slice(1):"";},m.guid=(c=function c(){return(65536*(1+Math.random())|0).toString(16).substring(1);},function(){return c()+c()+c()+c()+c()+c()+c()+c();}),m.extend=function(e,t,n){for(var r in t){void 0!==e[r]&&!0!==n||(e[r]=t[r]);}},m.filterObj=function(e,t){var n={};return m.isString(t)&&(t=t.split(d)),t.forEach(function(t){e.hasOwnProperty(t)&&(n[t]=e[t]);}),n;},m.replaceLastMsg=function(e,t){if(t)return e.map(function(e){return e.lastMsg?Object.assign({},e,{lastMsg:e.lastMsg.idServer||e.lastMsg.idClient}):e;});var n=e.lastMsg;return n?Object.assign({},e,{lastMsg:n.idServer||n.idClient}):e;},m.copy=function(e,t){return t=t||{},e?(Object.keys(e).forEach(function(n){m.exist(e[n])&&(t[n]=e[n]);}),t):t;},m.copyWithNull=function(e,t){return t=t||{},e?(Object.keys(e).forEach(function(n){(m.exist(e[n])||m.isnull(e[n]))&&(t[n]=e[n]);}),t):t;},m.findObjIndexInArray=function(e,t){e=e||[];var n=t.keyPath||"id",r=-1;return e.some(function(e,s){if(a(e,n)===t.value)return r=s,!0;}),r;},m.findObjInArray=function(e,t){var n=m.findObjIndexInArray(e,t);return-1===n?null:e[n];},m.mergeObjArray=function(){var e=[],t=[].slice.call(arguments,0,-1),n=arguments[arguments.length-1];m.isArray(n)&&(t.push(n),n={});var r,s=n.keyPath=n.keyPath||"id";for(n.sortPath=n.sortPath||s;!e.length&&t.length;){e=(e=t.shift()||[]).slice(0);}return t.forEach(function(t){t&&t.forEach(function(t){-1!==(r=m.findObjIndexInArray(e,{keyPath:s,value:a(t,s)}))?e[r]=m.merge({},e[r],t):e.push(t);});}),n.notSort||(e=m.sortObjArray(e,n)),e;},m.cutObjArray=function(e){var t=e.slice(0),n=arguments.length,r=[].slice.call(arguments,1,n-1),s=arguments[n-1];m.isObject(s)||(r.push(s),s={});var i,o=s.keyPath=s.keyPath||"id";return r.forEach(function(e){m.isArray(e)||(e=[e]),e.forEach(function(e){e&&(s.value=a(e,o),-1!==(i=m.findObjIndexInArray(t,s))&&t.splice(i,1));});}),t;},m.sortObjArray=function(e,t){var n=(t=t||{}).sortPath||"id";o.insensitive=!!t.insensitive;var r,s,i,c=!!t.desc;return i=m.isFunction(t.compare)?t.compare:function(e,t){return r=a(e,n),s=a(t,n),c?o(s,r):o(r,s);},e.sort(i);},m.emptyFunc=function(){},m.isEmptyFunc=function(e){return e===m.emptyFunc;},m.notEmptyFunc=function(e){return e!==m.emptyFunc;},m.splice=function(e,t,n){return[].splice.call(e,t,n);},m.reshape2d=function(e,t){if(Array.isArray(e)){m.verifyParamType("type",t,"number","util::reshape2d");var n=e.length;if(n<=t)return[e];for(var r=Math.ceil(n/t),s=[],i=0;i<r;i++){s.push(e.slice(i*t,(i+1)*t));}return s;}return e;},m.flatten2d=function(e){if(Array.isArray(e)){var t=[];return e.forEach(function(e){t=t.concat(e);}),t;}return e;},m.dropArrayDuplicates=function(e){if(Array.isArray(e)){for(var t={},n=[];e.length>0;){t[e.shift()]=!0;}for(var r in t){!0===t[r]&&n.push(r);}return n;}return e;},m.onError=function(e){throw new function(e){"object"===(void 0===e?"undefined":(0,i.default)(e))?(this.callFunc=e.callFunc||null,this.message=e.message||"UNKNOW ERROR"):this.message=e,this.time=new Date(),this.timetag=+this.time;}(e);},m.verifyParamPresent=function(e,t,n,r){n=n||"";var s=!1;switch(m.typeOf(t)){case"undefined":case"null":s=!0;break;case"string":""===t&&(s=!0);break;case"StrStrMap":case"object":Object.keys(t).length||(s=!0);break;case"array":t.length?t.some(function(e){if(m.notexist(e))return s=!0,!0;}):s=!0;}s&&m.onParamAbsent(n+e,r);},m.onParamAbsent=function(e,t){m.onParamError("缺少参数 "+e+", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined",t);},m.verifyParamAbsent=function(e,t,n,r){n=n||"",void 0!==t&&m.onParamPresent(n+e,r);},m.onParamPresent=function(e,t){m.onParamError("多余的参数 "+e,t);},m.verifyParamType=function(e,t,n,r){var s=m.typeOf(t).toLowerCase();m.isArray(n)||(n=[n]);var i=!0;switch(-1===(n=n.map(function(e){return e.toLowerCase();})).indexOf(s)&&(i=!1),s){case"number":isNaN(t)&&(i=!1);break;case"string":"numeric or numeric string"===n.join("")&&(i=!!/^[0-9]+$/.test(t));}i||m.onParamInvalidType(e,n,"",r);},m.onParamInvalidType=function(e,t,n,r){n=n||"",t=m.isArray(t)?(t=t.map(function(e){return'"'+e+'"';})).join(", "):'"'+t+'"',m.onParamError('参数"'+n+e+'"类型错误, 合法的类型包括: ['+t+"]",r);},m.verifyParamValid=function(e,t,n,r){m.isArray(n)||(n=[n]),-1===n.indexOf(t)&&m.onParamInvalidValue(e,n,r);},m.onParamInvalidValue=function(e,t,n){m.isArray(t)||(t=[t]),t=t.map(function(e){return'"'+e+'"';}),m.isArray(t)&&(t=t.join(", ")),m.onParamError("参数 "+e+"值错误, 合法的值包括: ["+JSON.stringify(t)+"]",n);},m.verifyParamMin=function(e,t,n,r){t<n&&m.onParamError("参数"+e+"的值不能小于"+n,r);},m.verifyParamMax=function(e,t,n,r){t>n&&m.onParamError("参数"+e+"的值不能大于"+n,r);},m.verifyArrayMax=function(e,t,n,r){t.length>n&&m.onParamError("参数"+e+"的长度不能大于"+n,r);},m.verifyEmail=(u=/^\S+@\S+$/,function(e,t,n){u.test(t)||m.onParamError("参数"+e+"邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符",n);}),m.verifyTel=function(){var e=/^[+\-()\d]+$/;return function(t,n,r){e.test(n)||m.onParamError("参数"+t+"电话号码格式错误, 合法字符包括+、-、英文括号和数字",r);};}(),m.verifyBirth=function(){var e=/^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;return function(t,n,r){e.test(n)||m.onParamError("参数"+t+'生日格式错误, 合法为"yyyy-MM-dd"',r);};}(),m.onParamError=function(e,t){m.onError({message:e,callFunc:t});},m.verifyOptions=function(e,t,n,r,s){if(e=e||{},t&&(m.isString(t)&&(t=t.split(d)),m.isArray(t))){"boolean"!=typeof n&&(s=n||null,n=!0,r="");var i=n?m.verifyParamPresent:m.verifyParamAbsent;t.forEach(function(t){i.call(m,t,e[t],r,s);});}return e;},m.verifyParamAtLeastPresentOne=function(e,t,n){t&&(m.isString(t)&&(t=t.split(d)),m.isArray(t)&&(t.some(function(t){return m.exist(e[t]);})||m.onParamError("以下参数["+t.join(", ")+"]至少需要传入一个",n)));},m.verifyParamPresentJustOne=function(e,t,n){t&&(m.isString(t)&&(t=t.split(d)),m.isArray(t)&&1!==t.reduce(function(t,n){return m.exist(e[n])&&t++,t;},0)&&m.onParamError("以下参数["+t.join(", ")+"]必须且只能传入一个",n));},m.verifyBooleanWithDefault=function(e,t,n,r,s){m.undef(n)&&(n=!0),d.test(t)&&(t=t.split(d)),m.isArray(t)?t.forEach(function(t){m.verifyBooleanWithDefault(e,t,n,r,s);}):void 0===e[t]?e[t]=n:m.isBoolean(e[t])||m.onParamInvalidType(t,"boolean",r,s);},m.verifyFileInput=function(e,t){return m.verifyParamPresent("fileInput",e,"",t),m.isString(e)&&((e="undefined"==typeof document?void 0:document.getElementById(e))||m.onParamError("找不到要上传的文件对应的input, 请检查fileInput id "+e,t)),e.tagName&&"input"===e.tagName.toLowerCase()&&"file"===e.type.toLowerCase()||m.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:"+e.tagName+", filetype:"+e.type,t),e;},m.verifyFileType=function(e,t){m.verifyParamValid("type",e,m.validFileTypes,t);},m.verifyCallback=function(e,t,n){d.test(t)&&(t=t.split(d)),m.isArray(t)?t.forEach(function(t){m.verifyCallback(e,t,n);}):e[t]?m.isFunction(e[t])||m.onParamInvalidType(t,"function","",n):e[t]=m.emptyFunc;},m.verifyFileUploadCallback=function(e,t){m.verifyCallback(e,"uploadprogress uploaddone uploaderror uploadcancel",t);},m.validFileTypes=["image","audio","video","file"],m.validFileExts={image:["bmp","gif","jpg","jpeg","jng","png","webp"],audio:["mp3","wav","aac","wma","wmv","amr","mp2","flac","vorbis","ac3"],video:["mp4","rm","rmvb","wmv","avi","mpg","mpeg","mov"]},m.filterFiles=function(e,t){var n,r,s="file"===(t=t.toLowerCase()),i=[];return[].forEach.call(e,function(e){if(s)i.push(e);else if(n=e.name.slice(e.name.lastIndexOf(".")+1),(r=e.type.split("/"))[0]&&r[1]){(r[0].toLowerCase()===t||-1!==m.validFileExts[t].indexOf(n))&&i.push(e);}}),i;};var p,f,g=m.supportFormData=m.notundef(l.FormData);m.getFileName=function(e){return e=m.verifyFileInput(e),g?e.files[0].name:e.value.slice(e.value.lastIndexOf("\\")+1);},m.getFileInfo=(p={ppt:1,pptx:2,pdf:3,doc:6,docx:7},function(e){var t={};if(!(e=m.verifyFileInput(e)).files)return t;var n=e.files[0];return g&&(t.name=n.name,t.size=n.size,t.type=n.name.match(/\.(\w+)$/),t.type=t.type&&t.type[1].toLowerCase(),t.transcodeType=p[t.type]||0),t;}),m.sizeText=(f=["B","KB","MB","GB","TB","PB","EB","ZB","BB"],function(e){var t,n=0;do{t=(e=Math.floor(100*e)/100)+f[n],e/=1024,n++;}while(e>1);return t;}),m.promises2cmds=function(e){return e.map(function(e){return e.cmd;});},m.objs2accounts=function(e){return e.map(function(e){return e.account;});},m.teams2ids=function(e){return e.map(function(e){return e.teamId;});},m.objs2ids=function(e){return e.map(function(e){return e.id;});},m.getMaxUpdateTime=function(e){var t=e.map(function(e){return+e.updateTime;});return Math.max.apply(Math,t);},m.genCheckUniqueFunc=function(e,t){return e=e||"id",t=t||1e3,function(t){this.uniqueSet=this.uniqueSet||{},this.uniqueSet[e]=this.uniqueSet[e]||{};var n=this.uniqueSet[e],r=t[e];return!n[r]&&(n[r]=!0,!0);};},m.fillPropertyWithDefault=function(e,t,n){return!!m.undef(e[t])&&(e[t]=n,!0);},m.throttle=function(e,t,n){var r,s,i,o=null,a=0;n||(n={});var c=function c(){a=!1===n.leading?0:new Date().getTime(),o=null,i=e.apply(r,s),o||(r=s=null);};return function(){var u=new Date().getTime();a||!1!==n.leading||(a=u);var m=t-(u-a);return r=this,s=arguments,m<=0||m>t?(clearTimeout(o),o=null,a=u,i=e.apply(r,s),o||(r=s=null)):o||!1===n.trailing||(o=setTimeout(c,m)),i;};},m.get=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,r=t.replace(/\[(\d+)\]/g,".$1").split("."),s=e,i=!0,o=!1,a=void 0;try{for(var c,u=r[Symbol.iterator]();!(i=(c=u.next()).done);i=!0){var m=c.value;if(void 0===(s=Object(s)[m]))return n;}}catch(e){o=!0,a=e;}finally{try{!i&&u.return&&u.return();}finally{if(o)throw a;}}return s;},e.exports=m;},,,function(e,t,n){"use strict";n(0);var r=!1;try{"function"==typeof localStorage.setItem&&"function"==typeof localStorage.getItem&&(localStorage.setItem("nim_localstorage_exist_test","1"),r="1"===localStorage.getItem("nim_localstorage_exist_test"),localStorage.removeItem("nim_localstorage_exist_test"));}catch(e){r=!1;}var s={nodeEnv:"production",info:{hash:"986f02b0cc1f8134035d034b36d0bb0b618f356b",shortHash:"986f02b0c",version:"8.4.0",sdkVersion:"180",sdkHumanVersion:"8.4.0",nrtcVersion:"5.1.0",nrtcSdkVersion:"1",protocolVersion:1},agentVersion:"3.0.1",lbsUrl:"https://lbs.netease.im/lbs/webconf.jsp",roomserver:"roomserver.netease.im",connectTimeout:8e3,xhrTimeout:8e3,socketTimeout:8e3,reconnectionDelay:1600,reconnectionDelayMax:8e3,reconnectionJitter:.01,reconnectiontimer:null,heartbeatInterval:3e4,cmdTimeout:8e3,hbCmdTimeout:5e3,defaultReportUrl:"https://dr.netease.im/1.gif",isWeixinApp:!1,isNodejs:!1,isRN:!1,ipVersion:0,PUSHTOKEN:"",PUSHCONFIG:{},CLIENTTYPE:16,PushPermissionAsked:!1,iosPushConfig:null,androidPushConfig:null,netDetectAddr:"https://roomserver-dev.netease.im/v1/sdk/detect/local",optionDefaultLinkUrl:"",defaultLinkUrl:"weblink.netease.im",ipv6DefaultLinkUrl:"weblink.netease.im",optionIpv6DefaultLinkUrl:"",wxDefaultLinkUrl:"wlnimsc0.netease.im",serverNosConfig:r?{cdnDomain:localStorage.getItem("nim_cdn_domain")||"",objectPrefix:localStorage.getItem("nim_object_prefix")||""}:{},hasLocalStorage:r,getDefaultLinkUrl:function getDefaultLinkUrl(e){var t,n;1===s.ipVersion?(t=s.optionIpv6DefaultLinkUrl,n=s.ipv6DefaultLinkUrl):(t=s.optionDefaultLinkUrl,n=s.defaultLinkUrl);var r=t||(s.isWeixinApp?s.wxDefaultLinkUrl:n);if(!r)return!1;var i=e?"https":"http",o=e?"443":"80",a=r;return-1===r.indexOf("http")&&(a=i+"://"+a),-1===r.indexOf(":")&&(a=a+":"+o),a;}};s.weixinNetcall=s.nrtcNetcall={checkSumUrl:"https://nrtc.netease.im/demo/getChecksum.action",getChannelInfoUrl:"https://nrtc.netease.im/nrtc/getChannelInfos.action"},s.ipProbeAddr={ipv4:"https://detect4.netease.im/test/",ipv6:"https://detect6.netease.im/test/"},s.nrtcWebRTC2={checkSumUrl:"",getChannelInfoUrl:""},s.formatSocketUrl=function(e){var t=e.url,n=e.secure?"https":"http";return-1===t.indexOf("http")?n+"://"+t:t;},s.uploadUrl="https://nos.netease.com",s.chunkUploadUrl="https://wanproxy-web.127.net",s.commonMaxSize=104857600,s.chunkSize=4194304,s.chunkMaxSize=4194304e4,s.replaceUrl="https://{bucket}-nosdn.netease.im/{object}",s.downloadHost="nos.netease.com",s.downloadHostList=["nos.netease.com"],s.nosCdnEnable=!0,s.downloadUrl="https://{bucket}-nosdn.netease.im/{object}",s.httpsEnabled=!1,s.threshold=0,s.nosLbsUrls=["http://wanproxy.127.net/lbs","http://wanproxy-bj.127.net/lbs","http://wanproxy-hz.127.net/lbs","http://wanproxy-oversea.127.net/lbs"],s.genUploadUrl=function(e){return s.uploadUrl+"/"+e;},s.genChunkUploadUrl=function(e){return s.chunkUploadUrl?s.chunkUploadUrl+"/"+e.bucket+"/"+e.objectName:"";},s.genDownloadUrl=function(e,t,n){var r=e.bucket,i=(e.tag,e.expireSec),o=+new Date(),a=i?"&survivalTime="+i:"";if(n)return"https://"+n+"/"+t+"?createTime="+o+a;var c=s.replaceUrl+"?createTime="+o+a;return(c=s.genNosProtocolUrl(c)).replace("{bucket}",r).replace("{object}",t);},s.genFileUrl=function(e){var t=e.bucket,n=e.objectName;return s.genNosProtocolUrl(s.replaceUrl).replace("{bucket}",t).replace("{object}",n);},s.genNosProtocolUrl=function(e){return /^http/.test(e)?s.httpsEnabled&&0!==e.indexOf("https://")&&(e=e.replace("http","https")):e=s.httpsEnabled?"https://"+e:"http://"+e,e;},e.exports=s;},,,function(e,t,n){"use strict";t.__esModule=!0;var r=o(n(175)),s=o(n(164)),i="function"==typeof s.default&&"symbol"==typeof r.default?function(e){return typeof e;}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e;};function o(e){return e&&e.__esModule?e:{default:e};}t.default="function"==typeof s.default&&"symbol"===i(r.default)?function(e){return void 0===e?"undefined":i(e);}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":void 0===e?"undefined":i(e);};},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(e,t,n){"use strict";var r=n(29),s=n(36),i=n(3),o=n(0),a=o.undef,c=n(150),u=n(62),m=n(69);function l(e){var t=this;o.verifyOptions(e,"appKey account token","protocol::IMProtocol"),o.verifyCallback(e,["onconnect","onerror","onwillreconnect","ondisconnect","onloginportschange","onmyinfo","onblacklist","onmutelist","onfriends","onusers","onrobots","onteams","onSuperTeams","onsessions","onSessionsWithMoreRoaming","onStickTopSessions","onroamingmsgs","onofflinemsgs","onofflinefiltermsgs","onroamingsysmsgs","onofflinesysmsgs","onofflinefiltersysmsgs","onofflinecustomsysmsgs","onofflinefiltercustomsysmsgs","onbroadcastmsg","onbroadcastmsgs","onsysmsgunread","onsyncdone","onteammembers","onsyncteammembersdone","onmsg","onsysmsg","oncustomsysmsg","onupdatemyinfo","onupdateuser","onSyncUpdateServerSession","onUpdateSuperTeamMember","onCreateSuperTeam","onUpdateSuperTeam","onAddSuperTeamMembers","onRemoveSuperTeamMembers","onUpdateSuperTeamManagers","onDismissSuperTeam","onTransferSuperTeam","onUpdateSuperTeamMembersMute","onupdateteammember","onCreateTeam","onUpdateTeam","onAddTeamMembers","onRemoveTeamMembers","onUpdateTeamManagers","onDismissTeam","onTransferTeam","onUpdateTeamMembersMute","onTeamMsgReceipt","onupdatesession","onQuickComment","onDeleteQuickComment","onPinMsgChange","onupdatesysmsgunread","onupdatesysmsg","onsynccreateteam","onsyncsupercreateteam","onsyncmarkinblacklist","onsyncmarkinmutelist","onsyncfriendaction","shouldIgnoreNotification","shouldIgnoreMsg","onDeleteMsgSelf","shouldCountNotifyUnread","onPushNotificationMultiportConfig","onPushNotificationMultiportConfigUpdate","onpushevents"],"protocol::IMProtocol"),t.db=e.api.db=new r({logger:e.logger,notifyError:function notifyError(e){t.notifyError&&t.notifyError("DB error",e);}}),s.call(t,e);}var d=s.fn,p=l.fn=l.prototype=Object.create(d);p.init=function(){d.init.call(this),u.IM.setProtocol(this),this.parser=u.IM,this.sendCmd.bind(this),this.socketUrls=[],this.syncing=!0,this.hasSynced=!1,this.hasSyncedTeamMembers=!1,this.syncPromiseArray=[],this.syncResult={},this.syncTeamMembersPromiseArray=[],this.syncSuperTeamMembersPromiseArray=[],this.syncTeamMembersResult={},this.timetags={},this.superTeamMembersData={},this.saveAck={},this.sysMsgUnread=m.completeUnread({}),this.resetUnsettledMsgs(),this.resetUnsettledSysMsgs(),this.msgPromise=Promise.resolve(),this.sysMsgPromise=Promise.resolve(),this.msgDelayArr=[],this.msgDelayTimer=null,this.msgStatEnable=!1,this.nosCdnHostTimer=null,this.relativeServerTime=0,this.sessionSet={},this.msgReceiptTasks={},this.userSet={},this.pushNotificationMultiportConfig=c.getDefaultConfig();},p.reset=function(){d.reset.call(this);var e=this.options;this.db.reset(e.db),a(e.lbsUrl)&&(e.lbsUrl=i.lbsUrl),a(e.thumbnailToStatic)&&(e.thumbnailToStatic=!0),e.autoconnect&&(this.autoconnect=!0),this.resetAutoMarkRead();},p.resetAutoMarkRead=function(){var e=this.options;o.verifyBooleanWithDefault(e,"autoMarkRead",!0,"","protocol::resetAutoMarkRead");},p.resetUnsettledMsgs=function(){this.unhandledMsgs=[],this.unupdatedMsgs=[];},p.resetUnsettledSysMsgs=function(){this.unhandledSysMsgs=[],this.unupdatedSysMsgs=[];},p.packetFromSync=function(e){return!e.obj||!!e.obj.sync;},e.exports=l,n(493),n(492),n(491),n(485),n(483),n(481),n(480),n(479),n(478),n(477),n(476),n(475),n(474),n(460),n(459),n(452),n(451),n(450),n(449),n(448);},function(e,t,n){var r=n(56)("wks"),s=n(40),i=n(7).Symbol,o="function"==typeof i;(e.exports=function(e){return r[e]||(r[e]=o&&i[e]||(o?i:s)("Symbol."+e));}).store=r;},,function(e,t){var n=e.exports={version:"2.5.5"};"number"==typeof __e&&(__e=n);},function(e,t,n){"use strict";var r=n(26),s=n(8),i=n(3),o=n(447),a=n(62).IM;function c(e){return this.subType="im",this.nosScene=e.nosScene||"im",this.nosSurvivalTime=e.nosSurvivalTime,e.Protocol=s,e.Message=o,e.constructor=c,this.init(e);}c.Protocol=s,c.parser=a,c.use=r.use,c.getInstance=r.getInstance,c.rmAllInstances=r.rmAllInstances,c.genInstanceName=function(e){return"NIM-account-"+e.account;};var u=c.fn=c.prototype=Object.create(r.prototype);c.info=u.info=i.info,e.exports=c,n(436),n(435),n(434),n(433),n(432),n(431),n(430),n(429),n(428),n(427),n(426),n(425),n(424),n(423),n(422),n(421),n(420),n(419),n(418),n(415);},function(e,t){var n;n=function(){return this;}();try{n=n||Function("return this")()||(0,eval)("this");}catch(e){"object"==typeof window&&(n=window);}e.exports=n;},,function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.message=e||n.message||"","object"===(void 0===t?"undefined":(0,i.default)(t))?(this.event=t,this.code="Other_Error"):void 0!==t&&(this.code=t),this.timetag=+new Date(),void 0!==n&&(this.event=n),this.event&&(this.callFunc=this.event.callFunc||null,delete this.event.callFunc);}o.prototype=Object.create(Error.prototype),o.prototype.name="NIMError";var a={201:"客户端版本不对, 需升级sdk",302:"用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配",403:"非法操作或没有权限",404:"对象(用户/群/聊天室)不存在",405:"参数长度过长",408:"客户端请求超时",414:"参数错误",415:"服务不可用/没有聊天室服务器可分配",416:"频率控制",417:"重复操作",422:"帐号被禁用",500:"服务器内部错误",501:"数据库操作失败",503:"服务器繁忙",508:"删除有效期过了",509:"已失效",7101:"被拉黑",700:"批量操作部分失败",801:"群人数达到上限",802:"没有权限",803:"群不存在或未发生变化",804:"用户不在群里面",805:"群类型不匹配",806:"创建群数量达到限制",807:"群成员状态不对",809:"已经在群里",811:"强推列表中帐号数量超限",812:"群被禁言",813:"因群数量限制，部分拉人成功",814:"禁止使用群组消息已读服务",815:"群管理员人数上限",816:"批量操作部分失败",997:"协议已失效",998:"解包错误",999:"打包错误",9102:"通道失效",9103:"已经在其他端接听/拒绝过这通电话",11001:"对方离线, 通话不可送达",13002:"聊天室状态异常",13003:"在黑名单中",13004:"在禁言名单中",13006:"聊天室处于整体禁言状态,只有管理员能发言",Connect_Failed:"无法建立连接, 请确保能 ping/telnet 到云信服务器; 如果是IE8/9, 请确保项目部署在 HTTPS 环境下",Error_Internet_Disconnected:"网断了",Error_Connection_is_not_Established:"连接未建立",Error_Connection_Socket_State_not_Match:"socket状态不对",Error_Timeout:"超时",Param_Error:"参数错误",No_File_Selected:"请选择文件",Wrong_File_Type:"文件类型错误",File_Too_Large:"文件过大",Cross_Origin_Iframe:"不能获取跨域Iframe的内容",Not_Support:"不支持",NO_DB:"无数据库",DB:"数据库错误",Still_In_Team:"还在群里",Session_Exist:"会话已存在",Session_Not_Exist:"会话不存在",Error_Unknown:"未知错误",Operation_Canceled:"操作取消"};[200,406,808,810].forEach(function(e){a[e]=null;}),o.genError=function(e){var t=a[e];return void 0===t&&(t="操作失败"),null===t?null:new o(t,e);},o.multiInstance=function(e){return new o("不允许初始化多个实例","Not_Allow_Multi_Instance",e);},o.newNetworkError=function(e){var t="Error_Internet_Disconnected";return new o(a[t],t,e);},o.newConnectError=function(e){var t="Connect_Failed";return new o(a[t]||null,t,e);},o.newConnectionError=function(e){var t="Error_Connection_is_not_Established";return new o(a[t],t,e);},o.newSocketStateError=function(e){var t="Error_Connection_Socket_State_not_Match";return new o(a[t],t,e);},o.newTimeoutError=function(e){var t="Error_Timeout";return new o(a[t],t,e);},o.newFrequencyControlError=function(e){var t=new o(a[416],416,e);return t.from="local",t;},o.newParamError=function(e,t){return new o(e||a.Param_Error,"Param_Error",t);},o.newNoFileError=function(e,t){var n="No_File_Selected";return new o(e||a[n],n,t);},o.newWrongFileTypeError=function(e,t){var n="Wrong_File_Type";return new o(e||a[n],n,t);},o.newFileTooLargeError=function(e,t){var n="File_Too_Large";return new o(e||a[n],n,t);},o.newCORSIframeError=function(e){var t="Cross_Origin_Iframe";return new o(a[t],t,e);},o.newSupportError=function(e,t,n){return new o("不支持"+e,"Not_Support_"+t,n);},o.newSupportDBError=function(e){return o.newSupportError("数据库","DB",e);},o.noDBError=function(e){return new o(a.NO_DB,"NO_DB",e);},o.newDBError=function(e){return new o(a.DB,"DB",e);},o.newUnknownError=function(e){var t="Error_Unknown";return new o(a[t],t,e);},o.stillInTeamError=function(e){var t="Still_In_Team";return new o(a[t],t,e);},o.sessionExist=function(e){var t="Session_Exist";return new o(a[t],t,e);},o.sessionNotExist=function(e){var t="Session_Not_Exist";return new o(a[t],t,e);},o.cancel=function(e){var t="Operation_Canceled";return new o(a[t],t,e);},o.customError=function(e,t){e=e||"Other_Error";var n="";return(t=t||{}).message||(n=a[e]||e),"object"!==(void 0===e?"undefined":(0,i.default)(e))?new o(n,e,t):new o(n,"Other_Error",void 0===t?e:t);},e.exports=o;},function(e,t,n){var r=n(19),s=n(93),i=n(58),o=Object.defineProperty;t.f=n(17)?Object.defineProperty:function(e,t,n){if(r(e),t=i(t,!0),r(n),s)try{return o(e,t,n);}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e;};},function(e,t,n){e.exports=!n(34)(function(){return 7!=Object.defineProperty({},"a",{get:function get(){return 7;}}).a;});},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t);};},function(e,t,n){var r=n(24);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e;};},,function(e,t,n){var r=n(16),s=n(38);e.exports=n(17)?function(e,t,n){return r.f(e,t,s(1,n));}:function(e,t,n){return e[t]=n,e;};},function(e,t,n){"use strict";var r=n(0),s={init:function init(){s.deviceId=r.guid();}};s.init(),s.clientTypeMap={1:"Android",2:"iOS",4:"PC",8:"WindowsPhone",16:"Web",32:"Server",64:"Mac"},s.db={open:function open(){}},s.rnfs=null,e.exports=s;},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.url2origin=t.uniqueID=t.off=t.removeEventListener=t.on=t.addEventListener=t.format=t.regWhiteSpace=t.regBlank=t.emptyFunc=t.f=t.emptyObj=t.o=void 0;var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};t.getGlobal=o,t.detectCSSFeature=function(e){var t=!1,n="Webkit Moz ms O".split(" ");if("undefined"==typeof document)return void console.log("error:fn:detectCSSFeature document is undefined");var r=document.createElement("div"),s=null;e=e.toLowerCase(),void 0!==r.style[e]&&(t=!0);if(!1===t){s=e.charAt(0).toUpperCase()+e.substr(1);for(var i=0;i<n.length;i++){if(void 0!==r.style[n[i]+s]){t=!0;break;}}}return t;},t.fix=a,t.getYearStr=c,t.getMonthStr=u,t.getDayStr=m,t.getHourStr=l,t.getMinuteStr=d,t.getSecondStr=p,t.getMillisecondStr=f,t.dateFromDateTimeLocal=function(e){return e=""+e,new Date(e.replace(/-/g,"/").replace("T"," "));},t.getClass=y,t.typeOf=v,t.isString=b,t.isNumber=T,t.isInt=function(e){return T(e)&&e%1==0;},t.isBoolean=function(e){return"boolean"===v(e);},t.isArray=S,t.isFunction=M,t.isDate=k,t.isRegExp=function(e){return"regexp"===v(e);},t.isError=function(e){return"error"===v(e);},t.isnull=P,t.notnull=C,t.undef=I,t.notundef=x,t.exist=w,t.notexist=_,t.isObject=O,t.isEmpty=function(e){return _(e)||(b(e)||S(e))&&0===e.length;},t.containsNode=function(e,t){if(e===t)return!0;for(;t.parentNode;){if(t.parentNode===e)return!0;t=t.parentNode;}return!1;},t.calcHeight=function(e){var t=e.parentNode||("undefined"==typeof document?null:document.body);if(!t)return 0;(e=e.cloneNode(!0)).style.display="block",e.style.opacity=0,e.style.height="auto",t.appendChild(e);var n=e.offsetHeight;return t.removeChild(e),n;},t.remove=function(e){e.parentNode&&e.parentNode.removeChild(e);},t.dataset=function(e,t,n){if(!w(n))return e.getAttribute("data-"+t);e.setAttribute("data-"+t,n);},t.target=function(e){return e.target||e.srcElement;},t.createIframe=function(e){if("undefined"==typeof document)return;var t;if((e=e||{}).name)try{(t=document.createElement('<iframe name="'+e.name+'"></iframe>')).frameBorder=0;}catch(n){(t=document.createElement("iframe")).name=e.name;}else t=document.createElement("iframe");e.visible||(t.style.display="none");M(e.onload)&&E(t,"load",function n(r){if(!t.src)return;e.multi||R(t,"load",n);e.onload(r);});(e.parent||document.body).appendChild(t);var n=e.src||"about:blank";return setTimeout(function(){t.src=n;},0),t;},t.html2node=function(e){if("undefined"==typeof document)return;var t=document.createElement("div");t.innerHTML=e;var n=[],r=void 0,s=void 0;if(t.children)for(r=0,s=t.children.length;r<s;r++){n.push(t.children[r]);}else for(r=0,s=t.childNodes.length;r<s;r++){var i=t.childNodes[r];1===i.nodeType&&n.push(i);}return n.length>1?t:n[0];},t.scrollTop=function(e){"undefined"!=typeof document&&w(e)&&(document.documentElement.scrollTop=document.body.scrollTop=e);return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;},t.forOwn=U,t.mixin=N,t.isJSON=L,t.parseJSON=function e(t){try{L(t)&&(t=JSON.parse(t)),O(t)&&U(t,function(n,r){switch(v(r)){case"string":case"object":t[n]=e(r);}});}catch(e){console.log("error:",e);}return t;},t.simpleClone=function(e){var t=[],n=JSON.stringify(e,function(e,n){if("object"===(void 0===n?"undefined":(0,i.default)(n))&&null!==n){if(-1!==t.indexOf(n))return;t.push(n);}return n;});return JSON.parse(n);},t.merge=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++){n[r-1]=arguments[r];}return n.forEach(function(t){N(e,t);}),e;},t.fillUndef=function(e,t){return U(t,function(t,n){I(e[t])&&(e[t]=n);}),e;},t.checkWithDefault=function(e,t,n){var r=e[t]||e[t.toLowerCase()];_(r)&&(r=n,e[t]=r);return r;},t.fetch=function(e,t){return U(e,function(n,r){w(t[n])&&(e[n]=t[n]);}),e;},t.string2object=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n={};return e.split(t).forEach(function(e){var t=e.split("="),r=t.shift();r&&(n[decodeURIComponent(r)]=decodeURIComponent(t.join("=")));}),n;},t.object2string=F,t.genUrlSep=function(e){return e.indexOf("?")<0?"?":"&";},t.object2query=function(e){return F(e,"&",!0);},t.isFileInput=B,t.getKeys=function(e,t){var n=Object.keys(e);t&&n.sort(function(t,n){var r=B(e[t]),s=B(e[n]);return r===s?0:r?1:-1;});return n;},t._get=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,r=t.replace(/\[(\d+)\]/g,".$1").split("."),s=e,i=!0,o=!1,a=void 0;try{for(var c,u=r[Symbol.iterator]();!(i=(c=u.next()).done);i=!0){var m=c.value;if(void 0===(s=Object(s)[m]))return n;}}catch(e){o=!0,a=e;}finally{try{!i&&u.return&&u.return();}finally{if(o)throw a;}}return s;};t.o={},t.emptyObj={},t.f=function(){},t.emptyFunc=function(){},t.regBlank=/\s+/gi,t.regWhiteSpace=/\s+/gi;function o(){return"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{};}function a(e,t){t=t||2;for(var n=""+e;n.length<t;){n="0"+n;}return n;}function c(e){return""+e.getFullYear();}function u(e){return a(e.getMonth()+1);}function m(e){return a(e.getDate());}function l(e){return a(e.getHours());}function d(e){return a(e.getMinutes());}function p(e){return a(e.getSeconds());}function f(e){return a(e.getMilliseconds(),3);}var g,h;t.format=(g=/yyyy|MM|dd|hh|mm|ss|SSS/g,h={yyyy:c,MM:u,dd:m,hh:l,mm:d,ss:p,SSS:f},function(e,t){return e=new Date(e),isNaN(+e)?"invalid date":(t=t||"yyyy-MM-dd").replace(g,function(t){return h[t](e);});});function y(e){return Object.prototype.toString.call(e).slice(8,-1);}function v(e){return y(e).toLowerCase();}function b(e){return"string"===v(e);}function T(e){return"number"===v(e);}function S(e){return"array"===v(e);}function M(e){return"function"===v(e);}function k(e){return"date"===v(e);}function P(e){return null===e;}function C(e){return null!==e;}function I(e){return void 0===e;}function x(e){return void 0!==e;}function w(e){return x(e)&&C(e);}function _(e){return I(e)||P(e);}function O(e){return w(e)&&"object"===v(e);}var A=t.addEventListener=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n);},E=t.on=A,j=t.removeEventListener=function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n);},R=t.off=j;function U(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n=arguments[2];for(var r in e){e.hasOwnProperty(r)&&t.call(n,r,e[r]);}}function N(e,t){U(t,function(t,n){e[t]=n;});}var D;t.uniqueID=(D=0,function(){return""+D++;});function L(e){return b(e)&&0===e.indexOf("{")&&e.lastIndexOf("}")===e.length-1;}function F(e,t,n){if(!e)return"";var r=[];return U(e,function(e,t){M(t)||(k(t)?t=t.getTime():S(t)?t=t.join(","):O(t)&&(t=JSON.stringify(t)),n&&(t=encodeURIComponent(t)),r.push(encodeURIComponent(e)+"="+t));}),r.join(t||",");}t.url2origin=function(){var e=/^([\w]+?:\/\/.*?(?=\/|$))/i;return function(t){return e.test(t||"")?RegExp.$1.toLowerCase():"";};}();function B(e){var t=o();return e.tagName&&"INPUT"===e.tagName.toUpperCase()||t.Blob&&e instanceof t.Blob;}}).call(this,n(13));},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e;};},function(e,t,n){var r=n(7),s=n(11),i=n(50),o=n(21),a=n(18),c=function c(e,t,n){var u,m,l,d=e&c.F,p=e&c.G,f=e&c.S,g=e&c.P,h=e&c.B,y=e&c.W,v=p?s:s[t]||(s[t]={}),b=v.prototype,T=p?r:f?r[t]:(r[t]||{}).prototype;for(u in p&&(n=t),n){(m=!d&&T&&void 0!==T[u])&&a(v,u)||(l=m?T[u]:n[u],v[u]=p&&"function"!=typeof T[u]?n[u]:h&&m?i(l,r):y&&T[u]==l?function(e){var t=function t(_t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e();case 1:return new e(_t);case 2:return new e(_t,n);}return new e(_t,n,r);}return e.apply(this,arguments);};return t.prototype=e.prototype,t;}(l):g&&"function"==typeof l?i(Function.call,l):l,g&&((v.virtual||(v.virtual={}))[u]=l,e&c.R&&b&&!b[u]&&o(b,u,l)));}};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c;},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(277),a=n(0),c=a.notundef,u=n(276),m=n(3);function l(){}var d={};l.getInstance=function(e){e=f(e),a.verifyOptions(e,"account","api::Base.getInstance");var t=this.genInstanceName(e),n=d[t];return n?l.updateInstance(n,e):n=d[t]=new this(e),n;},l.updateInstance=function(e,t){e.setOptions(t),e.connect();};var p=l.fn=l.prototype=Object.create(new o()),f=function f(e){return e.nosSurvivalTime?(a.verifyParamType("nosSurvivalTime",e.nosSurvivalTime,"number","api::Base.getInstance"),a.verifyParamMin("nosSurvivalTime",e.nosSurvivalTime,86400,"api::Base.getInstance")):e.nosSurvivalTime=1/0,e;};p.updatePrivateConf=function(e){if(e&&"object"===(0,i.default)(e.privateConf)){var t=e.privateConf;"string"==typeof t.lbs_web&&(e.lbsUrl=t.lbs_web),"boolean"==typeof t.link_ssl_web&&(e.secure=t.link_ssl_web),"boolean"==typeof t.https_enabled&&(e.httpsEnabled=t.https_enabled),e.uploadUrl=t.nos_uploader_web?t.nos_uploader_web:null,e.chunkUploadUrl=t.nos_uploader_web?t.nos_uploader_web:null,e.replaceUrl=t.nos_downloader?t.nos_downloader:null,e.downloadUrl=t.nos_accelerate?t.nos_accelerate:null,e.downloadHost=t.nos_accelerate_host?t.nos_accelerate_host:null,e.downloadHostList=t.nos_accelerate_host_list||[],e.downloadHost&&e.downloadHostList.push(e.downloadHost),e.nosCdnEnable=!1!==t.nos_cdn_enable,e.ntServerAddress=t.nt_server||null,e.kibanaServer=t.kibana_server,e.statisticServer=t.statistic_server,e.reportGlobalServer=t.report_global_server,e.ipVersion=t.ip_protocol_version,e.defaultLink=t.link_web||e.defaultLink,e.ipv6DefaultLink=t.link_ipv6_web||e.ipv6DefaultLink,"string"==typeof t.nos_lbs?e.nosLbsUrls=[t.nos_lbs]:e.nosLbsUrls=[];}return null===e.ntServerAddress||""===e.ntServerAddress?m.ntServerAddress=null:m.ntServerAddress=e.ntServerAddress||m.defaultReportUrl,m.uploadUrl=e.uploadUrl||m.uploadUrl,m.chunkUploadUrl=e.chunkUploadUrl||m.chunkUploadUrl,m.downloadUrl=e.downloadUrl||m.downloadUrl,m.downloadHost=e.downloadHost||m.downloadHost,m.downloadHostList=e.downloadHostList&&e.downloadHostList.length>0?e.downloadHostList:m.downloadHostList,m.nosCdnEnable=!1!==e.nosCdnEnable,m.replaceUrl=e.replaceUrl||m.replaceUrl,m.httpsEnabled=e.httpsEnabled||m.httpsEnabled,e.probe_ipv4_url&&(m.ipProbeAddr.ipv4=e.probe_ipv4_url),e.probe_ipv6_url&&(m.ipProbeAddr.ipv6=e.probe_ipv6_url),e;},p.init=function(e){a.verifyOptions(e,"account","api::Base.init"),e=this.updatePrivateConf(e),e=function(e){var t=this,n=Object.keys(e);return(n=n.filter(function(t){return 0===t.indexOf("on")&&"[object Function]"===Object.prototype.toString.call(e[t]);})).forEach(function(n){var r,s,i,o=e[n];e[n]=(r=o,s=n,i=t,function(){try{r.apply(void 0,arguments);}catch(e){throw i.logger.error("Execute customer callback "+s+" fail: ",e),e;}});}),e;}.call(this,e),a.verifyBooleanWithDefault(e,"exifOrientation",!0,"","api::Base.init"),e.lbsBackup=void 0===e.lbsBackup||e.lbsBackup;var t=this.account=e.account=e.account+"",n=e.constructor.genInstanceName(e),r=d[n];if(e._disableSingleton&&(r=null),r)return l.updateInstance(r,e),r;this.name=n,d[n]=this,this.logger=e.logger=new u({debug:e.debug,logFunc:e.logFunc,prefix:this.subType,dbLog:!1!==e.dbLog,account:e.account,expire:e.expire}),e.api=this;var s=this.protocol=new e.Protocol(e);return s.name="Protocol-"+n,s.account=t,s.api=this,s.message=this.message=new e.Message({account:t}),this.options=a.copy(e),this;},p.destroy=function(e){var t,n,r=this;e=e||{};var s=this.name;this.logger.warn("destroy::start"),s?(this.protocol&&(t=this.protocol.connectTimer,n=this.protocol.onlineListener),this.protocol&&this.protocol.resetPush&&this.protocol.resetPush(),this.disconnect({done:function done(i){r.logger.warn("ApiBase::destroy: instance destroyed ..."),Object.getOwnPropertyNames(r).forEach(function(e){delete r[e];}),d&&(d[s]=null,clearTimeout(t),n&&"undefined"!=typeof window&&a.isFunction(window.removeEventListener)&&window.removeEventListener("online",n)),e.done instanceof Function&&e.done(i);}})):this.logger.warn("destroy::no instanceName");},p.setOptions=function(e){this.protocol.setOptions(e);},p.processCallback=function(e,t){g(e,t);},p.processCallbackPromise=function(e,t){return new Promise(function(n,r){g(e,t,!0,n,r);});};var g=function g(e,t,n,r,s){var i="api::processCallback";n&&(i="api::processCallbackPromise"),a.verifyCallback(e,"done",i),e.callback=function(o,u,m){var l=e.callback.options;if(u=u||l,t&&(u=l),a.isFunction(e.cbaop)){var d=e.cbaop(o,u);c(d)&&(u=d);}var p=e.done;a.isObject(u)&&(delete u.done,delete u.cb,delete u.callback),n?o?s({message:"生成接口回调错误",callFunc:i,event:o}):r(u):p(o,u,m);},e.callback.options=a.copy(e);};p.processPs=function(e){a.notexist(e.ps)&&(e.ps=""),a.verifyArrayMax("ps",e.ps,5e3);},p.processCustom=function(e){a.notexist(e.custom)&&(e.custom="");},p.sendCmd=function(){this.protocol.sendCmd.apply(this.protocol,arguments);},p.sendCmdWithResp=function(e,t,n){this.sendCmd(e,t,function(e,t,r){a.isFunction(n)&&(e?n(e,t):n(null,r));});},p.cbAndSendCmd=function(e,t){var n=this.processCallbackPromise(t);return this.sendCmd(e,t),n;},p.sendCmdUsePromise=function(e,t){var n=this;return new Promise(function(r,s){n.sendCmd(e,t,function(e,t,n){if(e)s(e);else{var i=a.merge({},t,n);r(i);}});});},l.use=function(e,t){e&&e.install&&a.isFunction(e.install)&&e.install(this,t);},l.rmAllInstances=function(){for(var e in d){d[e].destroy();}d={};},p.logout=function(e){e=e||{},this.protocol.shouldReconnect=!1,this.protocol.doLogout=!0,this.processCallback(e),this.sendCmd("logout",e,e.callback);},e.exports=l,n(270),n(269),n(259),n(258),n(257),n(256),n(255);},function(e,t,n){var r=n(99),s=n(59);e.exports=function(e){return r(s(e));};},,function(e,t,n){"use strict";var r=n(505);r.fn=r.prototype,e.exports=r,n(504),n(503),n(502),n(501),n(500),n(499),n(498),n(497),n(496),n(495),n(494);},function(e,t,n){"use strict";var r=n(63),s=n(262),i=n(261),o=n(260);r.json=s,r.upload=i,r.chunkUpload=o,e.exports=r;},function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(98),i=(r=s)&&r.__esModule?r:{default:r};t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t;};}();},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");};},function(e,t,n){"use strict";e.exports={description:"weixin micro app",layout:null,manufacturer:null,name:"weixin",prerelease:null,product:null,ua:"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Weixin/1.9.1",version:"1.9.1",os:{architecture:64,family:"Windows",version:"1.9.1"}};},function(e,t){e.exports=function(e){try{return!!e();}catch(e){return!0;}};},,function(e,t,n){"use strict";var r=n(0),s=n(3),i=n(95),o=n(15);function a(e){r.undef(e.secure)&&(e.secure=!0),this.options=r.copy(e),this.keepNosSafeUrl=this.options.keepNosSafeUrl||!1;var t=e.defaultLink||e.defaultLinkUrl;r.notundef(t)&&r.isString(t)&&(s.optionDefaultLinkUrl=t.trim()),r.notundef(e.ipv6DefaultLink)&&r.isString(e.ipv6DefaultLink)&&(s.optionIpv6DefaultLinkUrl=e.ipv6DefaultLink),"number"==typeof e.heartbeatInterval&&(s.heartbeatInterval=e.heartbeatInterval),Array.isArray(e.nosLbsUrls)&&(s.nosLbsUrls=e.nosLbsUrls),this.init(),this.connect();}var c=a.fn=a.prototype;c.init=function(){this.logger=this.options.logger,this.getNosOriginUrlReqNum=0,this.checkNosReqNum=0,this.cmdTaskArray=[],this.timerMap={},this.cmdCallbackMap={},this.cmdContentMap={},this.initConnect(),this.reset();},c.reset=function(){this.resetConnect();},c.setOptions=function(e){var t=this.options,n=Object.keys(t),s=n.indexOf("account");this.logger.info("setOptions::",e),-1!==s&&n.splice(s,1),e=r.filterObj(e,n),this.options=r.merge(t,e),this.reset();},c.sendCmd=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments[2];this.heartbeat();var r,s=e,i=(e=this.parser.createCmd(e,t)).SER;t=t||{},this.cmdContentMap[i]=t,t.single&&(delete t.single,1===(r=Object.keys(t)).length&&(this.cmdContentMap[i]=t[r[0]])),t.NOTSTORE&&((r=t.NOTSTORE.split(" ")).forEach(function(e){delete t[e];}),delete t.NOTSTORE),(n=n||t.callback)&&(this.cmdCallbackMap[i]=n),this.cmdTaskArray.push({cmdName:s,cmd:JSON.stringify(e)}),this.startCmdTaskTimer();},c.startCmdTaskTimer=function(){var e=this;e.cmdTaskTimer||(e.cmdTaskTimer=setTimeout(function(){var t=e.cmdTaskArray.shift();e.cmdTaskTimer=null,t&&e.executeCmdTask(t),e.cmdTaskArray.length&&e.startCmdTaskTimer();},0));},c.executeCmdTask=function(e){var t=e.cmdName,n=e.cmd,r=(n=JSON.parse(n)).SER;this.isFrequencyControlled(t)?(this.logger.warn("protocol::executeCmdTask: "+t+" hit freq control"),this.markCallbackInvalid(r,o.newFrequencyControlError({callFunc:"protocol::executeCmdTask",message:t+" hit freq control"}))):this.hasLogin?(/send\w*msg$/i.test(t)?this.logger.info("protocol::sendCmd: "+t+" "+JSON.stringify(n).replace(/9":"[\s\S]*","/,'9":"***","')):"heartbeat"!==t&&this.logger.info("protocol::sendCmd: "+t+" "+JSON.stringify(n)),this.doSendCmd(n)):"login"===t&&this.isConnected()?(this.logger.info("protocol::sendCmd: "+t+" "+JSON.stringify(n)),this.doSendCmd(n)):(this.logger.warn("protocol::executeCmdTask: "+t+" not connected or login"),this.markCallbackInvalid(r,o.newSocketStateError({callFunc:"protocol::executeCmdTask",message:t+" not connected or not login"})));},c.isFrequencyControlled=function(e){var t=this.frequencyControlMap&&this.frequencyControlMap[e];if(t){if(Date.now()<t.from+t.duration)return!0;delete this.frequencyControlMap[e];}},c.doSendCmd=function(e){var t=this,n=e.SER,r=0===n?s.hbCmdTimeout:s.cmdTimeout;function i(){t.markCallbackInvalid(n,o.newSocketStateError({callFunc:"protocol::doSendCmd",message:"ser "+n+" socketSendJson Error"})),t.onDisconnect(!0,"protocol::doSendCmd:socketSendJson");}t.timerMap[n]=setTimeout(function(){t.markCallbackInvalid(n,o.newTimeoutError({callFunc:"protocol::doSendCmd",message:"ser "+n+" Timeout Error"}));},r);try{t.socket&&t.socket.send?t.socket.send(JSON.stringify(e)):i();}catch(e){i();}},c.getObjWithSer=function(e){var t=this.cmdContentMap[e];return t&&!t.isImSyncDataObj&&delete this.cmdContentMap[e],t&&r.copy(t);},c.getCallbackWithSer=function(e){var t=this.cmdCallbackMap[e];return t&&!t.isImSyncDataCb&&delete this.cmdCallbackMap[e],t;},c.getTimerWithSer=function(e){var t=this.timerMap[e];return delete this.timerMap[e],t;},c.clearTimerWithSer=function(e){var t=this.getTimerWithSer(e);t&&clearTimeout(t);},c.markCallbackInvalid=function(e,t){this.getObjWithSer(e),this.clearTimerWithSer(e);var n=this.getCallbackWithSer(e);if(n){var r=n.options;setTimeout(function(){n(t||o.newUnknownError({ser:e}),r);},0);}},c.markAllCallbackInvalid=function(e){var t=this;Object.keys(this.cmdCallbackMap).forEach(function(n){t.markCallbackInvalid(n,e);}),t.cmdTaskArray=[];},c.getPacketObj=function(e){var t=null;if(e&&e.raw){var n=e.raw.ser;r.notundef(n)&&(t=this.getObjWithSer(n));}return t;},c.callPacketAckCallback=function(e){var t=this;if(e&&e.raw){var n=e.raw.ser;if(r.notundef(n)){t.clearTimerWithSer(n);var s=t.getCallbackWithSer(n);s&&(s.originUrl&&e.obj&&e.obj.file&&(e.obj.file._url_safe=e.obj.file.url,e.obj.file.url=s.originUrl,"audio"===e.obj.type&&(e.obj.file.mp3Url=s.originUrl+(~s.originUrl.indexOf("?")?"&":"?")+"audioTrans&type=mp3")),e.promise?e.promise.then(function(){s(e.error,e.obj);},function(r){r.callFunc="protocol::callPacketAckCallback",r.message="Resp Promoise Error: cmd: "+e.cmd+", ser: "+n;var i=o.customError("CALLBACK_ACK_ERR",r);t.logger.error("protocol::callPacketAckCallback: promise error "+JSON.stringify(r)),s(i,e.obj,e.content);}):s(e.error,e.obj,e.content));}}},c.onMessage=function(e){var t=this;t.heartbeat(),t.parser.parseResponse(e).then(function(e){if(e.notFound&&t.logger.warn("protocol::onMessage: packet not found "+JSON.stringify(e)),e.error){e.error.message=e.cmd+" error: "+e.error.message,t.logger.error("protocol::onMessage: packet error "+JSON.stringify(e.error)+"，raw cmd "+e.rawStr);var n=e.raw||{};408!==n.code&&415!==n.code&&500!==n.code||i.saveErrEvent({code:n.code,module:e.cmd,accid:t.account});}else e.content||"heartbeat"===e.cmd||t.logger.info("protocol::onMessage: packet.content undefined "+JSON.stringify(e));e.frequencyControlDuration&&(t.logger.error("protocol::onMessage: server freq control "+JSON.stringify(e.cmd)),t.frequencyControlMap=t.frequencyControlMap||{},t.frequencyControlMap[e.cmd]={from:+new Date(),duration:e.frequencyControlDuration}),e.obj=t.getPacketObj(e),/^getServerSessions?$|msgs?$/gi.test(e.cmd)?t.logger.info("protocol::recvCmd: "+e.cmd+" "+e.rawStr.replace(/"9\\?":\\?"[\s\S]*?\\?",\\?"/g,'"9":"***","')):"heartbeat"!==e.cmd&&"getClientAntispam"!==e.cmd&&t.logger.info("protocol::recvCmd: "+e.cmd+" "+e.rawStr);var s="process"+r.capFirstLetter(e.service);if(t[s]){if("syncDone"===e.cmd){if(t.cmdCallbackMap[e.raw.ser]&&t.cmdCallbackMap[e.raw.ser].isImSyncDataCb){t.cmdCallbackMap[e.raw.ser].isImSyncDataCb=!1;var o=function(e,t){this.checkNosReqNum++,this.getNosOriginUrlReqNum<=0||this.checkNosReqNum>=20?this[e](t):setTimeout(o,300);}.bind(t,s,e);setTimeout(function(){o.call(t,s,e);},10);}}else t[s](e);}else t.logger.warn("protocol::onMessage: "+s+" not found");t.callPacketAckCallback(e);});},c.onMiscError=function(e,t,n){t&&this.notifyError(e,t,n);},c.onCustomError=function(e,t){var n=o.customError(e,t),r=t.message||"未知错误";this.onMiscError(r,n);},c.notifyError=function(e,t,n){this.isConnected()&&(this.logger.error((e||"")+" "+this.name,t,n),this.options.onerror(t,n));},c.emitAPI=function(e){var t=e.type,n=e.obj;this.api.emit(t,n);},e.exports=a,n(254),n(252),n(247),n(246),n(245);},function(e,t){e.exports={};},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t};};},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(0),a=o.undef,c=o.notundef,u=o.exist,m=n(84),l=n(116),d="#%@all@%#",p={p2p:0,team:1,superTeam:5},f={0:"p2p",1:"team",5:"superTeam"},g=Object.keys(p),h=l.typeMap,y=l.validTypes;function v(e){o.verifyOptions(e,"scene to type","msg::Message"),o.verifyParamValid("scene",e.scene,g,"msg::Message");this.scene=p[e.scene],this.to=""+e.to,this.type=h[e.type],this.resend=e.resend?1:0,e.resend?(o.verifyOptions(e,"idClient","msg::Message"),this.idClient=e.idClient):this.idClient=o.guid(),c(e.subType)&&(o.isInt(+e.subType)&&+e.subType>0?this.subType=+e.subType:o.onParamError("subType只能是大于0的整数","msg::Message"));var t=e.replyMsg;t&&t.idServer&&t.from&&t.to&&t.time&&(this.replyMsgFromAccount=t.from,this.replyMsgToAccount=t.to,this.replyMsgTime=t.time,this.replyMsgIdServer=t.idServer,this.replyMsgIdClient=t.idClient,t.threadMsgFromAccount&&t.threadMsgIdServer&&t.threadMsgTime&&t.threadMsgToAccount?(this.threadMsgFromAccount=t.threadMsgFromAccount,this.threadMsgToAccount=t.threadMsgToAccount,this.threadMsgTime=t.threadMsgTime,this.threadMsgIdServer=t.threadMsgIdServer,this.threadMsgIdClient=t.threadMsgIdClient):(this.threadMsgFromAccount=t.from,this.threadMsgToAccount=t.to,this.threadMsgTime=t.time,this.threadMsgIdServer=t.idServer,this.threadMsgIdClient=t.idClient)),c(e.text)&&(this.body=""+e.text),c(e.custom)&&("object"===(0,i.default)(e.custom)?this.custom=JSON.stringify(e.custom):this.custom=""+e.custom),c(e.body)&&(this.body=""+e.body),c(e.pushContent)&&(this.pushContent=""+e.pushContent),c(e.pushPayload)&&(this.pushPayload=""+e.pushPayload);var n=e.apns;if(c(n)&&"team"===e.scene){var r=n.accounts;c(r)&&o.verifyParamType("apns.accounts",r,"array","msg::Message"),this.apnsAccounts=r?JSON.stringify(r):d,this.apnsContent=n.content||e.pushContent||"",o.verifyBooleanWithDefault(n,"forcePush",!0,"options.apns","msg::Message"),this.apnsForcePush=n.forcePush?1:0;}c(e.isHistoryable)&&(this.isHistoryable=e.isHistoryable?1:0),c(e.isRoamingable)&&(this.isRoamingable=e.isRoamingable?1:0),c(e.isSyncable)&&(this.isSyncable=e.isSyncable?1:0),c(e.cc)&&(this.cc=e.cc?1:0),c(e.env)&&(this.env=e.env),c(e.isPushable)&&(this.isPushable=e.isPushable?1:0),c(e.isOfflinable)&&(this.isOfflinable=e.isOfflinable?1:0),c(e.isUnreadable)&&(this.isUnreadable=e.isUnreadable?1:0),c(e.needPushNick)&&(this.needPushNick=e.needPushNick?1:0),c(e.needMsgReceipt)&&(this.needMsgReceipt=e.needMsgReceipt?1:0),c(e.yidunEnable)&&(this.yidunEnable=e.yidunEnable?1:0),c(e.needUpdateSession)&&(this.needUpdateSession=!1===e.needUpdateSession?0:1),c(e.antiSpamUsingYidun)&&(this.antiSpamUsingYidun=e.antiSpamUsingYidun?1:0),c(e.clientAntiSpam)&&(this.clientAntiSpam=e.clientAntiSpam?1:0),c(e.antiSpamContent)&&("object"===(0,i.default)(e.antiSpamContent)?this.antiSpamContent=JSON.stringify(e.antiSpamContent):this.antiSpamContent=""+e.antiSpamContent),c(e.antiSpamBusinessId)&&("object"===(0,i.default)(e.antiSpamBusinessId)?this.antiSpamBusinessId=JSON.stringify(e.antiSpamBusinessId):this.antiSpamBusinessId=""+e.antiSpamBusinessId),c(e.yidunAntiCheating)&&(this.yidunAntiCheating=e.yidunAntiCheating);}o.merge(v.prototype,l.prototype),v.prototype.getScene=function(){return f[this.scene];},v.getType=l.getType,v.reverse=function(e){var t,n=f[e.scene];if(t="1"===e.delete?{delete:!0,scene:n||e.scene,from:e.from,time:+e.time,to:""+e.to}:{scene:n||e.scene,from:e.from,fromNick:e.fromNick,fromClientType:m.reverseType(e.fromClientType),fromDeviceId:e.fromDeviceId,to:""+e.to,time:+e.time,type:v.getType(e),text:u(e.body)?e.body:e.text||"",isHistoryable:a(e.isHistoryable)||1==+e.isHistoryable,isRoamingable:a(e.isRoamingable)||1==+e.isRoamingable,isSyncable:a(e.isSyncable)||1==+e.isSyncable,cc:a(e.cc)||1==+e.cc,isPushable:a(e.isPushable)||1==+e.isPushable,isOfflinable:a(e.isOfflinable)||1==+e.isOfflinable,isUnreadable:a(e.isUnreadable)||1==+e.isUnreadable,isReplyMsg:a(e.isReplyMsg)||1==+e.isReplyMsg,needPushNick:a(e.needPushNick)||1==+e.needPushNick,needMsgReceipt:1==+e.needMsgReceipt,isLocal:!1},e.isInBlackList&&(t.isInBlackList=1==+e.isInBlackList),c(e.isMuted)&&(t.isMuted=1==+e.isMuted),c(e.resend)&&(t.resend=1==+e.resend),c(e.idClient)&&(t.idClient=e.idClient),c(e.idServer)&&(t.idServer=""+e.idServer),c(e.userUpdateTime)&&(t.userUpdateTime=+e.userUpdateTime),c(e.custom)&&(t.custom=e.custom),c(e.callbackExt)&&(t.callbackExt=e.callbackExt),c(e.subType)&&(t.subType=+e.subType),c(e.pushContent)&&(t.pushContent=e.pushContent),c(e.pushPayload)&&(t.pushPayload=e.pushPayload),c(e.tempTeamMemberCount)&&(t.tempTeamMemberCount=+e.tempTeamMemberCount),c(e.apnsAccounts)){if(t.apns={},e.apnsAccounts!==d){var r=e.apnsAccounts;try{t.apns.accounts=JSON.parse(r);}catch(e){t.apns.accounts=[];}}t.apns.content=e.apnsContent||"",t.apns.forcePush=1==+e.apnsForcePush;}if(t.status=e.status||"success",c(e.filter)&&(t.filter=e.filter),e.replyMsgIdServer&&e.threadMsgIdServer){["replyMsgFromAccount","replyMsgToAccount","replyMsgTime","replyMsgIdServer","replyMsgIdClient","threadMsgFromAccount","threadMsgToAccount","threadMsgTime","threadMsgIdServer","threadMsgIdClient"].forEach(function(n){t[n]=e[n];}),t.replyMsgTime=+t.replyMsgTime,t.threadMsgTime=+t.threadMsgTime;}return t;},v.setExtra=function(e,t){e.target=v.getMsgTarget(e,t),e.sessionId=e.scene+"-"+e.target,l.setFlow(e,t);},v.getMsgTarget=function(e,t){return"p2p"===e.scene?e.to===t?e.from:e.to:"team"===e.scene||"superTeam"===e.scene?e.to:void 0;},v.deduplication=function(e){var t,n={},r=[];return e.forEach(function(e){t=e.idClient,n[t]||(n[t]=!0,r.push(e));}),r;},v.sortMsgs=function(e){return e=e.slice(0),o.sortObjArray(e,{sortPath:"time"}),e;},v.getLastMsg=function(e){return(e=v.sortMsgs(e))[e.length-1];},v.getLastNotIgnoredMsg=function(e){for(var t=null,n=(e=v.sortMsgs(e)).length-1;n>=0;n--){if(!(t=e[n]).ignore)return t;}return null;},v.getMaxTimetag=function(e){return v.getLastMsg(e).time;},v.validScenes=g,v.validTypes=y,v.sceneMap=p,v.sceneReverseMap=f,e.exports=v;},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36));};},function(e,t,n){"use strict";var r=n(3),s={genUrlSep:function genUrlSep(e){return-1===(e=""+e).indexOf("?")?"?imageView&":"&";},urlQuery2Object:function urlQuery2Object(e){if("[object String]"!==Object.prototype.toString.call(e)||""===e)return{};var t=e.indexOf("?");if(-1!==t){var n=e.slice(t+1).split("&"),r={};return n.forEach(function(e){if(~e.indexOf("=")){var t=e.split("=");r[t[0]]=decodeURIComponent(t[1]);}else r[e]="";}),r;}},url2object:function url2object(e){"[object String]"!==Object.prototype.toString.call(e)&&(e="");var t=(e=e||"").indexOf("https")>=0?"https://":"http://",n=e.replace(t,"");n.indexOf("?")>=0&&(n=n.substring(0,n.indexOf("?")));var r=n.split("/");n=r[0];var s="";if(r.length>0&&(s=r.slice(1).join("/")),-1===e.indexOf("?"))return{protocol:t,hostname:n,path:s,query:{}};var i=e.substr(e.indexOf("?")+1).split("&"),o={};return i.forEach(function(e){if(e.indexOf("=")>0){var t=e.split("=");o[t[0]]=decodeURIComponent(t[1]);}else o[e]="";}),{protocol:t,hostname:n,path:s,query:o};},object2url:function object2url(e){var t=e.protocol,n=e.hostname,r=e.path,s=e.query;t=t||"http://",n=n||"",r&&(n=n+"/"+r),s=s||{};var i=[];for(var o in s){"imageView"!==o&&i.push(o+"="+encodeURIComponent(s[o]));}return i.length>0?""+t+n+"?imageView&"+i.join("&"):""+t+n;},genPrivateUrl:function genPrivateUrl(e){var t=s.url2object(e),n=t.hostname,i=t.path,o=r.downloadUrl,a=r.downloadHostList,c=r.nosCdnEnable,u=r.serverNosConfig.cdnDomain,m=decodeURIComponent(r.serverNosConfig.objectPrefix),l=decodeURIComponent(i),d=l.indexOf(m);if(u&&d>-1&&c)return""+t.protocol+u+"/"+l.slice(d);if(a.includes(n)&&i.includes("/")){var p=i.indexOf("/"),f=i.substring(0,p),g=i.substring(p+1);return o.replace("{bucket}",f).replace("{object}",g);}var h=a.filter(function(e){return"string"==typeof n&&n.includes(e);})[0],y=h?n.replace(h,"").replace(/\W/g,""):null;return y?o.replace("{bucket}",y).replace("{object}",i):e;}};e.exports=s;},function(e,t){t.f={}.propertyIsEnumerable;},function(e,t,n){var r=n(91),s=n(55);e.exports=Object.keys||function(e){return r(e,s);};},,,,function(e,t,n){var r=n(16).f,s=n(18),i=n(9)("toStringTag");e.exports=function(e,t,n){e&&!s(e=n?e:e.prototype,i)&&r(e,i,{configurable:!0,value:t});};},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1);};},function(e,t){e.exports=!0;},function(e,t,n){var r=n(73);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n);};case 2:return function(n,r){return e.call(t,n,r);};case 3:return function(n,r,s){return e.call(t,n,r,s);};}return function(){return e.apply(t,arguments);};};},,,function(e,t,n){var r=n(7),s=n(11),i=n(49),o=n(54),a=n(16).f;e.exports=function(e){var t=s.Symbol||(s.Symbol=i?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||a(t,e,{value:o.f(e)});};},function(e,t,n){t.f=n(9);},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},function(e,t,n){var r=n(7),s=r["__core-js_shared__"]||(r["__core-js_shared__"]={});e.exports=function(e){return s[e]||(s[e]={});};},function(e,t,n){var r=n(56)("keys"),s=n(40);e.exports=function(e){return r[e]||(r[e]=s(e));};},function(e,t,n){var r=n(24);e.exports=function(e,t){if(!r(e))return e;var n,s;if(t&&"function"==typeof(n=e.toString)&&!r(s=n.call(e)))return s;if("function"==typeof(n=e.valueOf)&&!r(s=n.call(e)))return s;if(!t&&"function"==typeof(n=e.toString)&&!r(s=n.call(e)))return s;throw TypeError("Can't convert object to primitive value");};},function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e;};},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e);};},function(e,t,n){"use strict";var r=n(173)(!0);n(94)(String,"String",function(e){this._t=String(e),this._i=0;},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1});});},function(e,t,n){"use strict";var r,s=n(41),i=n(0),o=n(15),a=n(149),c=n(244),u=n(243),m=n(242),l=n(241),d=n(240);function p(e){this.mixin(e);}p.prototype=Object.create(function(){}.prototype,{protocol:{value:null,writable:!0,enumerable:!0,configurable:!0}}),p.prototype.setProtocol=function(e){this.protocol=e;},p.prototype.mixin=function(e){var t=this;this.configMap=this.configMap||{},["idMap","cmdConfig","packetConfig"].forEach(function(n){t.configMap[n]=i.merge({},t.configMap[n],e.configMap&&e.configMap[n]);}),["serializeMap","unserializeMap"].forEach(function(n){t[n]=i.merge({},t[n],e[n]);});},p.prototype.createCmd=(r=1,function(e,t){var n=this,s=this.configMap.cmdConfig[e],o="heartbeat"===e?0:r++;return o>32767&&(o=1,r=2),e={SID:s.sid,CID:s.cid,SER:o},s.params&&(e.Q=[],s.params.forEach(function(r){var s=r.type,o=r.name,a=r.entity,c=t[o];if(!i.undef(c)){switch(s){case"PropertyArray":s="ArrayMable",c=c.map(function(e){return{t:"Property",v:n.serialize(e,a)};});break;case"Property":c=n.serialize(c,o);break;case"bool":c=c?"true":"false";}e.Q.push({t:s,v:c});}})),e;}),p.prototype.parseResponse=function(e){var t=this;return new Promise(function(n,r){var s=JSON.parse(e),a={raw:s,rawStr:e,error:o.genError(s.code)},c=t.configMap.packetConfig[s.sid+"_"+s.cid];if(!c)return a.notFound={sid:s.sid,cid:s.cid},void n(a);var u=s.r,m="notify"===c.service&&!c.cmd;if(a.isNotify=m,m){var l=s.r[1].headerPacket;if(c=t.configMap.packetConfig[l.sid+"_"+l.cid],u=s.r[1].body,!c)return a.notFound={sid:l.sid,cid:l.cid},void n(a);}if(a.service=c.service,a.cmd=c.cmd,a.error){var d=s.sid+"_"+s.cid;if(m&&(d=l.sid+"_"+l.cid),a.error.cmd=a.cmd,a.error.callFunc="protocol::parseResponse: "+d,416===a.error.code){var p=u[0];p&&(a.frequencyControlDuration=1e3*p);}}var f=!1;a.error&&c.trivialErrorCodes&&(f=-1!==c.trivialErrorCodes.indexOf(a.error.code));var g=[];if((!a.error||f)&&c.response){a.content={};var h=function h(e,t,n,r){if(e&&"msg"===r||"sysMsg"===r){var s=n.content[r];i.isObject(s)&&!s.idServer&&(s.idServer=""+t.r[0]);}};c.response.forEach(function(e,n){var r=u[n];if(!i.undef(r)){var o=e.type,c=e.name,l=e.entity||c;switch(o){case"Property":g.push(t.unserialize(r,l).then(function(e,t,n,r,s){n.content[r]=s,h(e,t,n,r);}.bind(this,m,s,a,c)));break;case"PropertyArray":a.content[c]=[],r.forEach(function(e,n){g.push(t.unserialize(e,l).then(function(e,t,r){e.content[t][n]=r;}.bind(this,a,c)));});break;case"KVArray":a.content[c]=r,h(m,s,a,c);break;case"long":case"Long":case"byte":case"Byte":case"Number":a.content[c]=+r;break;default:a.content[c]=r,h(m,s,a,c);}}});}Promise.all(g).then(function(){n(a);});});},p.prototype.serialize=function(e,t){var n=this.serializeMap[t],r={};for(var s in n){e.hasOwnProperty(s)&&(r[n[s]]=e[s]);}return r;},p.prototype.matchNosSafeUrl=function(e){if(!i.isString(e)||!~e.indexOf("_im_url=1"))return!1;var t=(0,s.urlQuery2Object)(e);return!(!t||!t._im_url||1!=t._im_url);},p.prototype.getOneNosOriginUrl=function(e,t,n){var r=this;return new Promise(function(s,i){r.protocol.getNosOriginUrlReqNum++,r.protocol.sendCmd("getNosOriginUrl",{nosFileUrlTag:{safeUrl:e}},function(e,i,o){r.protocol.getNosOriginUrlReqNum--,e?console.warn("error: get nos originUrl failed",e):(t["_"+n+"_safe"]=t[n],t[n]=o.nosFileUrlTag&&o.nosFileUrlTag.originUrl),s();});});},p.prototype.checkObjSafeUrl=function(e,t,n){var r=this;for(var s in e){if(e.hasOwnProperty(s)){var o=e[s];if(i.isString(o)){if(this.matchNosSafeUrl(o)){var a=this.getOneNosOriginUrl(o,e,s);t.push(a),n.push(a);}}else i.isObject(o)?this.checkObjSafeUrl(o,t,n):i.isArray(o)&&o.forEach(function(e){i.isObject(e)&&r.checkObjSafeUrl(e,t,n);});}}};var f=["url","avatar","fromAvatar","chatroomAvatar"];p.prototype.unserialize=function(e,t){var n=this;return new Promise(function(r,s){var i=n.unserializeMap[t],o={},a=[];if(e)for(var c in i){var u=[];if(e.hasOwnProperty(c)&&(o[i[c]]=e[c],!n.protocol.keepNosSafeUrl))if("attach"===i[c]&&e[c]&&e[c].indexOf&&~e[c].indexOf("_im_url=1"))try{var m=JSON.parse(e[c]);n.checkObjSafeUrl(m,u,a),Promise.all(u).then(function(e,t){e.attach=JSON.stringify(t);}.bind(n,o,m));}catch(e){console.warn(e);}else~f.indexOf(i[c])&&e[c]&&n.matchNosSafeUrl(e[c])&&a.push(n.getOneNosOriginUrl(e[c],o,i[c]));}Promise.all(a).then(function(e){r(o);});});},p.prototype.syncUnserialize=function(e,t){var n=this.unserializeMap[t],r={};if(e)for(var s in n){e.hasOwnProperty(s)&&(r[n[s]]=e[s]);}return r;};var g=new p({configMap:a,serializeMap:c,unserializeMap:u}),h=new p({configMap:m,serializeMap:l,unserializeMap:d});e.exports={IM:g,Chatroom:h};},function(e,t,n){"use strict";var r=n(23),s=n(266),i=n(264),o=n(263),a={},c=r.f;function u(e){var t=e.upload="multipart/form-data"===(e.headers||r.o)["Content-Type"],n=!1;try{n=(location.protocol+"//"+location.host).toLowerCase()!==r.url2origin(e.url);}catch(e){}return e.cors=n,t||n||e.mode?function(e){var t=e.mode,n=s,a=r.getGlobal();return!a.FormData&&a.document&&(t="iframe"),"iframe"===t&&(n=e.upload?i:o),new n(e);}(e):new s(e);}function m(e,t,n){var r=a[e];if(r){"onload"===t&&r.result&&(n=function(e,t){t={data:t};var n=e.result.headers;return n&&(t.headers=e.req.header(n)),t;}(r,n)),function(e){var t=a[e];t&&(t.req.destroy(),delete a[e]);}(e);var s={type:t,result:n};c(s),s.stopped||r[t](s.result);}}function l(e,t){var n=r.genUrlSep(e);return t=t||"",r.isObject(t)&&(t=r.object2query(t)),t&&(e+=n+t),e;}function d(e,t){t=t||{};var n=r.uniqueID(),s={result:t.result,onload:t.onload||r.f,onerror:t.onerror||r.f};a[n]=s,t.onload=function(e,t){m(e,"onload",t);}.bind(null,n),t.onerror=function(e,t){m(e,"onerror",t);}.bind(null,n),t.query&&(e=l(e,t.query));var i=t.method||"";return i&&!/get/i.test(i)||!t.data||(e=l(e,t.data),t.data=null),t.url=e,s.req=u(t),n;}d.filter=function(e){r.isFunction(e)&&(c=e);},d.abort=function(e){var t=a[e];t&&t.req&&t.req.abort();},e.exports=d;},function(e,t){t.f=Object.getOwnPropertySymbols;},,,,,function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(0),a=o.undef,c=o.notundef,u=n(62).IM,m=n(85),l=n(70),d={customP2p:100,customTeam:101,customSuperTeam:103,deleteMsgP2p:7,deleteMsgTeam:8,deleteMsgSuperTeam:12,deleteOnewayMsgP2p:13,deleteOnewayMsgTeam:14},p={0:"applyTeam",1:"rejectTeamApply",2:"teamInvite",3:"rejectTeamInvite",5:"friendRequest",6:"deleteFriend",7:"deleteMsgP2p",8:"deleteMsgTeam",12:"deleteMsgSuperTeam",13:"deleteMsgP2pOneWay",14:"deleteMsgTeamOneWay",15:"applySuperTeam",16:"rejectSuperTeamApply",17:"superTeamInvite",18:"rejectSuperTeamInvite",100:"customP2p",101:"customTeam",103:"customSuperTeam",102:"customP2p"},f={1:"addFriend",2:"applyFriend",3:"passFriendApply",4:"rejectFriendApply"},g=["team","superTeam","friend","msg"],h={applyTeam:"team",rejectTeamApply:"team",teamInvite:"team",rejectTeamInvite:"team",applySuperTeam:"superTeam",rejectSuperTeamApply:"superTeam",superTeamInvite:"superTeam",rejectSuperTeamInvite:"superTeam",addFriend:"friend",applyFriend:"friend",passFriendApply:"friend",rejectFriendApply:"friend",deleteFriend:"friend",deleteMsg:"msg"};function y(e){o.verifyOptions(e,"type to","sysmsg::SystemMessage"),o.verifyParamValid("type",e.type,y.validTypes,"sysmsg::SystemMessage"),-1!==e.type.indexOf("custom")&&(o.verifyOptions(e,"content","sysmsg::SystemMessage"),this.attach=e.content,c(e.apnsText)&&(this.apnsText=""+e.apnsText),c(e.pushPayload)&&("object"===(0,i.default)(e.pushPayload)?this.pushPayload=JSON.stringify(e.pushPayload):this.pushPayload=""+e.pushPayload),c(e.sendToOnlineUsersOnly)&&(this.sendToOnlineUsersOnly=e.sendToOnlineUsersOnly?0:1),c(e.cc)&&(this.cc=e.cc?1:0),c(e.isPushable)&&(this.isPushable=e.isPushable?1:0),c(e.isUnreadable)&&(this.isUnreadable=e.isUnreadable?1:0),c(e.needPushNick)&&(this.needPushNick=e.needPushNick?1:0)),0===e.type.indexOf("deleteMsg")&&(e.apnsText&&(this.apnsText=e.apnsText),e.pushPayload&&(this.pushPayload=e.pushPayload),e.attach&&(this.attach=e.attach)),this.time=e.time||+new Date(),this.type=d[e.type],this.to=e.to,c(e.from)&&(this.from=e.from),c(e.ps)&&(this.ps=e.ps),c(e.deletedIdClient)&&(this.deletedIdClient=e.deletedIdClient),c(e.deletedIdServer)&&(this.deletedIdServer=e.deletedIdServer),c(e.opeAccount)&&(this.opeAccount=e.opeAccount),c(e.yidunEnable)&&(this.yidunEnable=e.yidunEnable?1:0),c(e.antiSpamContent)&&("object"===(0,i.default)(e.antiSpamContent)?this.antiSpamContent=JSON.stringify(e.antiSpamContent):this.antiSpamContent=""+e.antiSpamContent),c(e.antiSpamBusinessId)&&("object"===(0,i.default)(e.antiSpamBusinessId)?this.antiSpamBusinessId=JSON.stringify(e.antiSpamBusinessId):this.antiSpamBusinessId=""+e.antiSpamBusinessId),c(e.env)&&(this.env=e.env),this.idClient=e.idClient||o.guid();}y.validTypes=Object.keys(d).concat(Object.keys(h)),y.validCategories=["team","friend"],y.isCustom=function(e){return"custom"===e.type;},y.reverse=function(e){var t={time:+e.time,to:e.to,type:p[e.type]};if(c(e.from)&&(t.from=e.from),c(e.idServer)&&(t.idServer=""+e.idServer),c(e.deletedIdClient)&&(t.deletedIdClient=e.deletedIdClient),c(e.deletedIdServer)&&(t.deletedIdServer=""+e.deletedIdServer),c(e.deletedMsgTime)&&(t.deletedMsgTime=+e.deletedMsgTime),c(e.deletedMsgFromNick)&&(t.deletedMsgFromNick=""+e.deletedMsgFromNick),c(e.opeAccount)&&(t.opeAccount=e.opeAccount),c(e.ps)&&(t.ps=e.ps),c(e.callbackExt)&&(t.callbackExt=e.callbackExt),e.attach=e.attach?""+e.attach:"","customP2p"===t.type||"customTeam"===t.type||"customSuperTeam"===t.type)t.content=e.attach,c(e.apnsText)&&(t.apnsText=e.apnsText),c(e.pushPayload)&&(t.pushPayload=e.pushPayload),o.merge(t,{sendToOnlineUsersOnly:a(e.sendToOnlineUsersOnly)||0==+e.sendToOnlineUsersOnly,cc:a(e.cc)||1==+e.cc,isPushable:a(e.isPushable)||1==+e.isPushable,isUnreadable:a(e.isUnreadable)||1==+e.isUnreadable,needPushNick:c(e.needPushNick)&&1==+e.needPushNick}),t.scene=t.type.slice(6).toLowerCase(),t.type="custom";else if(0===t.type.indexOf("deleteMsg")){e.apnsText&&(t.apnsText=e.apnsText),e.pushPayload&&(t.pushPayload=e.pushPayload),e.attach&&(t.attach=e.attach);var n=t.type.toLowerCase();n.indexOf("p2p")>-1?t.scene="p2p":n.indexOf("superteam")>-1?t.scene="superTeam":n.indexOf("team")>-1&&(t.scene="team"),t.type="deleteMsg";}else{if(e.attach){t.attach={};var r=JSON.parse(e.attach);c(r.vt)?(t.type=f[r.vt],r.serverex&&1===r.serverex[0]&&(t.serverex=r.serverex[1]),delete t.attach):(c(r.tinfo)&&(t.attach.team=m.reverse(u.syncUnserialize(r.tinfo,"team"))),c(r.tlist)&&(t.attach.member=l.reverse(u.syncUnserialize(r.tlist,"teamMember"))),c(r.attach)&&(t.attach.custom=r.attach));}t.category=h[t.type],t.read=!1,t.state="init";}return c(e.cc)&&(t.cc=1==+e.cc),t.status=e.status||"success",c(e.filter)&&(t.filter=e.filter),t;},y.reverseSysMsgs=function(e,t){var n=(t=t||{}).mapper,r=o.isFunction(n);return e.map(function(e){return e=y.reverse(e),r&&(e=n(e)),e;});},y.completeUnread=function(e){var t;return e=e||{},g.forEach(function(t){delete e[t];}),Object.keys(h).forEach(function(n){e[n]=e[n]||0,e[n]<0&&(e[n]=0),e[t=h[n]]=e[t]||0,e[t]=e[t]+e[n];}),e.total=0,g.forEach(function(t){e.total+=e[t];}),e;},e.exports=y;},function(e,t,n){"use strict";var r=n(0),s=r.notundef,i=r.fillPropertyWithDefault,o={0:"normal",1:"owner",2:"manager"};function a(e){r.verifyOptions(e,"teamId","team::TeamMember"),r.verifyParamAtLeastPresentOne(e,"nickInTeam muteTeam muteNotiType custom","team::TeamMember"),this.teamId=e.teamId,s(e.account)&&(this.account=e.account),s(e.nickInTeam)&&(this.nickInTeam=e.nickInTeam),s(e.muteNotiType)?this.bits=e.muteNotiType:s(e.muteTeam)&&(this.bits=0,e.muteTeam&&(this.bits+=1)),s(e.mute)&&(this.mute=e.mute?1:0),s(e.custom)&&(this.custom=""+e.custom);}a.reverse=function(e){var t=r.copy(e);if(s(t.teamId)&&(t.teamId=""+t.teamId),s(t.type)&&(t.type=o[t.type]),s(t.active)&&(t.active=1==+t.active),s(t.valid)&&(t.valid=1==+t.valid),s(t.mute)&&(t.mute=1==+t.mute),s(t.joinTime)&&(t.joinTime=+t.joinTime),s(t.updateTime)&&(t.updateTime=+t.updateTime),s(t.bits)){var n=t.bits;delete t.bits,t.muteTeam=!!(1&n),t.muteNotiType=n;}return s(t.teamId)&&s(t.account)&&(t.id=a.genId(t.teamId,t.account)),t;},a.reverseMembers=function(e){return e.map(function(e){return a.reverse(e);});},a.fillProperties=function(e){var t=i(e,"mute",!1),n=i(e,"custom","");return t||n;},a.genId=function(e,t){return e+"-"+t;},a.accounts2ids=function(e,t){return t.map(function(t){return a.genId(e,t);});},a.assembleMembers=function(e,t){return r.isArray(t)||(t=[t]),t.map(function(t){return a.assembleMember(e,t);});},a.assembleMember=function(e,t){return{id:a.genId(e.teamId,t),account:t,teamId:e.teamId,type:"normal",nickInTeam:"",muteTeam:!1,mute:!1,joinTime:e.memberUpdateTime,updateTime:e.memberUpdateTime,active:!0,valid:!0,invitorAccid:""};},a.assembleOwner=function(e){var t=a.assembleMember(e,e.owner);return t.type="owner",t;},e.exports=a;},function(e,t,n){n(167);for(var r=n(7),s=n(21),i=n(37),o=n(9)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<a.length;c++){var u=a[c],m=r[u],l=m&&m.prototype;l&&!l[o]&&s(l,o,u),i[u]=i.Array;}},function(e,t,n){var r=n(24),s=n(7).document,i=r(s)&&r(s.createElement);e.exports=function(e){return i?s.createElement(e):{};};},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e;};},function(e,t,n){var r=n(59);e.exports=function(e){return Object(r(e));};},function(e,t,n){var r=n(19),s=n(171),i=n(55),o=n(57)("IE_PROTO"),a=function a(){},_c=function c(){var e,t=n(72)("iframe"),r=i.length;for(t.style.display="none",n(114).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),_c=e.F;r--;){delete _c.prototype[i[r]];}return _c();};e.exports=Object.create||function(e,t){var n;return null!==e?(a.prototype=r(e),n=new a(),a.prototype=null,n[o]=e):n=_c(),void 0===t?n:s(n,t);};},,,,,,,,function(e,t,n){"use strict";var r=n(0);function s(){}s.parse=function(e){var t=e.split("|");return{scene:t[0],to:t[1]};},s.genSessionByMsg=function(e){return{id:e.sessionId,scene:e.scene,to:e.target,updateTime:e.time,lastMsg:e};},s.appendLastMsg=function(e){var t=e.lastMsg;e["last"+r.capFirstLetter(t.type)+"Msg"]=t,e["last"+r.capFirstLetter(t.flow)+"Msg"]=t;},s.genSessionByMsgs=function(e,t){var n=e.getLastNotIgnoredMsg(t);return n?s.genSessionByMsg(n):null;},s.trim=function(e){delete e.msgReceiptSendTime,delete e.msgReceiptServerTime,delete e.ack,delete e.unreadMsgs,delete e.isDeleted;},s.isComplete=function(e){return e.id&&e.scene&&e.to;},e.exports=s;},function(e,t,n){"use strict";var r,s=n(22);var i=((r=s)&&r.__esModule?r:{default:r}).default.clientTypeMap;function o(){}o.reverse=function(e){var t=e;return t.type=i[t.type],t;},o.reverseType=function(e){return i[e]||e;},e.exports=o;},function(e,t,n){"use strict";var r=n(0),s=r.notundef,i=r.fillPropertyWithDefault,o=Object.keys,a={},c={},u=[],m={},l={normal:0,advanced:1},d={0:"normal",1:"advanced"},p=o(l),f=a.joinMode={noVerify:0,needVerify:1,rejectAll:2};c.joinMode={0:"noVerify",1:"needVerify",2:"rejectAll"},u.push("join"),m.joinMode=o(f);var g=a.beInviteMode={needVerify:0,noVerify:1};c.beInviteMode={0:"needVerify",1:"noVerify"},u.push("beInvite"),m.beInviteMode=o(g);var h=a.inviteMode={manager:0,all:1};c.inviteMode={0:"manager",1:"all"},u.push("invite"),m.inviteMode=o(h);var y=a.updateTeamMode={manager:0,all:1};c.updateTeamMode={0:"manager",1:"all"},u.push("updateTeam"),m.updateTeamMode=o(y);var v=a.updateCustomMode={manager:0,all:1};function b(e){switch(r.verifyOptions(e,"action","team::Team"),e.action){case"create":r.verifyOptions(e,"teamId",!1,"team::Team"),r.verifyOptions(e,"type name","team::Team"),r.verifyParamValid("type",e.type,p,"team::Team"),s(e.level)&&(r.verifyParamType("level",e.level,"number","team::Team"),this.level=e.level);break;case"update":r.verifyOptions(e,"teamId","team::Team"),r.verifyOptions(e,"type",!1,"team::Team");}s(e.teamId)&&(this.teamId=e.teamId),s(e.type)&&(this.type=l[e.type]),s(e.avatar)&&(this.avatar=""+e.avatar),s(e.name)&&(this.name=""+e.name),s(e.intro)&&(this.intro=""+e.intro),s(e.announcement)&&(this.announcement=""+e.announcement),u.forEach(this.setMode.bind(this,e)),s(e.custom)&&(this.custom=""+e.custom);}c.updateCustomMode={0:"manager",1:"all"},u.push("updateCustom"),m.updateCustomMode=o(v),b.prototype.setMode=function(e,t){s(e[t+="Mode"])&&(r.verifyParamValid(t,e[t],m[t],"team::Team"),this[t]=a[t][e[t]]);},b.reverse=function(e,t){var n=r.copy(e);if(s(n.teamId)&&(n.teamId=""+n.teamId),s(n.type)&&(n.type=d[n.type]),s(n.level)&&(n.level=+n.level),s(n.valid)&&(n.valid=1==+n.valid),s(n.memberNum)&&(n.memberNum=+n.memberNum),s(n.memberUpdateTime)&&(n.memberUpdateTime=+n.memberUpdateTime),s(n.createTime)&&(n.createTime=+n.createTime),s(n.updateTime)&&(n.updateTime=+n.updateTime),s(n.validToCurrentUser)&&(n.validToCurrentUser="1"===n.validToCurrentUser),s(n.mute)&&(n.mute="1"===n.mute),s(n.muteType))switch(n.muteType){case"0":n.mute=!1,n.muteType="none";break;case"1":n.mute=!0,n.muteType="normal";break;case"3":n.mute=!0,n.muteType="all";}else s(n.mute)&&(1===n.mute?(n.mute=!0,n.muteType="normal"):(n.mute=!1,n.muteType="none"));return u.forEach(function(e,t){s(e[t+="Mode"])&&(e[t]=c[t][e[t]]);}.bind(null,n)),delete n.bits,t||b.fillProperties(n),n;},b.fillProperties=function(e){var t=i(e,"beInviteMode","needVerify"),n=i(e,"inviteMode","manager"),r=i(e,"updateTeamMode","manager"),s=i(e,"updateCustomMode","manager"),o=i(e,"avatar","");return t||n||r||s||o;},e.exports=b;},function(e,t,n){"use strict";var r={link:{id:1,heartbeat:2,negotiateTransport:5,initTransport:6},sync:{id:5,sync:1,syncTeamMembers:2},misc:{id:6,getSimpleNosToken:1,getNosToken:2,notifyUploadLog:3,uploadSdkLogUrl:4,audioToText:5,processImage:6,getNosTokenTrans:7,notifyTransLog:8,fetchFile:9,fetchFileList:10,removeFile:11,getClientAntispam:17,fileQuickTransfer:18,getNosOriginUrl:22,getServerTime:23,getNosAccessToken:24,deleteNosAccessToken:25,getNosCdnHost:26},avSignal:{id:15,signalingCreate:1,signalingDelay:2,signalingClose:3,signalingJoin:4,signalingLeave:5,signalingInvite:6,signalingCancel:7,signalingReject:8,signalingAccept:9,signalingControl:10,signalingNotify:11,signalingMutilClientSyncNotify:12,signalingUnreadMessageSyncNotify:13,signalingChannelsSyncNotify:14,signalingGetChannelInfo:15}},s={heartbeat:{sid:r.link.id,cid:r.link.heartbeat},negotiateTransport:{sid:r.link.id,cid:r.link.negotiateTransport,params:[{type:"int",name:"sdkVersion"},{type:"Property",name:"negotiateTransportTag"}]},initTransport:{sid:r.link.id,cid:r.link.initTransport,params:[{type:"Property",name:"initTransportTag"}]},getSimpleNosToken:{sid:r.misc.id,cid:r.misc.getSimpleNosToken,params:[{type:"int",name:"num"}]},getNosToken:{sid:r.misc.id,cid:r.misc.getNosToken,params:[{type:"String",name:"responseBody"},{type:"Property",name:"nosToken",entity:"nosToken"}]},uploadSdkLogUrl:{sid:r.misc.id,cid:r.misc.uploadSdkLogUrl,params:[{type:"string",name:"url"}]},audioToText:{sid:r.misc.id,cid:r.misc.audioToText,params:[{type:"Property",name:"audioToText"}]},processImage:{sid:r.misc.id,cid:r.misc.processImage,params:[{type:"String",name:"url"},{type:"PropertyArray",name:"imageOps",entity:"imageOp"}]},getClientAntispam:{sid:r.misc.id,cid:r.misc.getClientAntispam,params:[{type:"Property",name:"clientAntispam"}]},fileQuickTransfer:{sid:r.misc.id,cid:r.misc.fileQuickTransfer,params:[{type:"Property",name:"fileQuickTransfer"}]},getNosOriginUrl:{sid:r.misc.id,cid:r.misc.getNosOriginUrl,params:[{type:"Property",name:"nosFileUrlTag"}]},getServerTime:{sid:r.misc.id,cid:r.misc.getServerTime,params:[]},getNosAccessToken:{sid:r.misc.id,cid:r.misc.getNosAccessToken,params:[{type:"Property",name:"nosAccessTokenTag"}]},deleteNosAccessToken:{sid:r.misc.id,cid:r.misc.deleteNosAccessToken,params:[{type:"Property",name:"nosAccessTokenTag"}]},getNosTokenTrans:{sid:r.misc.id,cid:r.misc.getNosTokenTrans,params:[{type:"Property",name:"transToken"}]},fetchFile:{sid:r.misc.id,cid:r.misc.fetchFile,params:[{type:"String",name:"docId"}]},fetchFileList:{sid:r.misc.id,cid:r.misc.fetchFileList,params:[{type:"Property",name:"fileListParam"}]},removeFile:{sid:r.misc.id,cid:r.misc.removeFile,params:[{type:"String",name:"docId"}]},getNosCdnHost:{sid:r.misc.id,cid:r.misc.getNosCdnHost,params:[]},signalingCreate:{sid:r.avSignal.id,cid:r.avSignal.signalingCreate,params:[{type:"Property",name:"avSignalTag"}]},signalingDelay:{sid:r.avSignal.id,cid:r.avSignal.signalingDelay,params:[{type:"Property",name:"avSignalTag"}]},signalingClose:{sid:r.avSignal.id,cid:r.avSignal.signalingClose,params:[{type:"Property",name:"avSignalTag"}]},signalingJoin:{sid:r.avSignal.id,cid:r.avSignal.signalingJoin,params:[{type:"Property",name:"avSignalTag"}]},signalingLeave:{sid:r.avSignal.id,cid:r.avSignal.signalingLeave,params:[{type:"Property",name:"avSignalTag"}]},signalingInvite:{sid:r.avSignal.id,cid:r.avSignal.signalingInvite,params:[{type:"Property",name:"avSignalTag"}]},signalingCancel:{sid:r.avSignal.id,cid:r.avSignal.signalingCancel,params:[{type:"Property",name:"avSignalTag"}]},signalingReject:{sid:r.avSignal.id,cid:r.avSignal.signalingReject,params:[{type:"Property",name:"avSignalTag"}]},signalingAccept:{sid:r.avSignal.id,cid:r.avSignal.signalingAccept,params:[{type:"Property",name:"avSignalTag"}]},signalingControl:{sid:r.avSignal.id,cid:r.avSignal.signalingControl,params:[{type:"Property",name:"avSignalTag"}]},signalingGetChannelInfo:{sid:r.avSignal.id,cid:r.avSignal.signalingGetChannelInfo,params:[{type:"Property",name:"avSignalTag"}]}};e.exports={idMap:r,cmdConfig:s,packetConfig:{"1_2":{service:"link",cmd:"heartbeat"},"1_5":{service:"link",cmd:"negotiateTransport",response:[{type:"Property",name:"negotiateTransportTag"}]},"1_6":{service:"link",cmd:"initTransport",response:[{type:"Property",name:"initTransportTag"}]},"6_1":{service:"misc",cmd:"getSimpleNosToken",response:[{type:"PropertyArray",name:"nosTokens",entity:"nosToken"}]},"6_2":{service:"misc",cmd:"getNosToken",response:[{type:"Property",name:"nosToken"}]},"6_3":{service:"misc",cmd:"notifyUploadLog"},"6_4":{service:"misc",cmd:"uploadSdkLogUrl"},"6_5":{service:"misc",cmd:"audioToText",response:[{type:"String",name:"text"}]},"6_6":{service:"misc",cmd:"processImage",response:[{type:"String",name:"url"}]},"6_7":{service:"misc",cmd:"getNosTokenTrans",response:[{type:"Property",name:"nosToken"},{type:"String",name:"docId"}]},"6_8":{service:"misc",cmd:"notifyTransLog",response:[{type:"Property",name:"transInfo"}]},"6_9":{service:"misc",cmd:"fetchFile",response:[{type:"Property",name:"info",entity:"transInfo"}]},"6_10":{service:"misc",cmd:"fetchFileList",response:[{type:"PropertyArray",name:"list",entity:"transInfo"},{type:"Number",name:"totalCount"}]},"6_11":{service:"misc",cmd:"removeFile",response:[{type:"String",name:"res"}]},"6_17":{service:"misc",cmd:"getClientAntispam",response:[{type:"Property",name:"clientAntispam"}]},"6_18":{service:"misc",cmd:"fileQuickTransfer",response:[{type:"Property",name:"fileQuickTransfer"}]},"6_22":{service:"misc",cmd:"getNosOriginUrl",response:[{type:"Property",name:"nosFileUrlTag"}]},"6_23":{service:"misc",cmd:"getServerTime",response:[{type:"Number",name:"time"}]},"6_24":{service:"misc",cmd:"getNosAccessToken",response:[{type:"Property",name:"nosAccessTokenTag"}]},"6_25":{service:"misc",cmd:"deleteNosAccessToken"},"6_26":{service:"misc",cmd:"getNosCdnHost",response:[{type:"Property",name:"nosConfigTag"}]},"15_1":{service:"avSignal",cmd:"signalingCreate",response:[{type:"Property",name:"avSignalTag"}]},"15_2":{service:"avSignal",cmd:"signalingDelay",response:[{type:"Property",name:"avSignalTag"}]},"15_3":{service:"avSignal",cmd:"signalingClose",response:[{type:"Property",name:"avSignalTag"}]},"15_4":{service:"avSignal",cmd:"signalingJoin",response:[{type:"Property",name:"avSignalTag"}]},"15_5":{service:"avSignal",cmd:"signalingLeave",response:[]},"15_6":{service:"avSignal",cmd:"signalingInvite",response:[]},"15_7":{service:"avSignal",cmd:"signalingCancel",response:[]},"15_8":{service:"avSignal",cmd:"signalingReject",response:[]},"15_9":{service:"avSignal",cmd:"signalingAccept",response:[]},"15_10":{service:"avSignal",cmd:"signalingControl",response:[]},"15_11":{service:"avSignal",cmd:"signalingNotify",response:[{type:"Property",name:"avSignalTag"}]},"15_12":{service:"avSignal",cmd:"signalingMutilClientSyncNotify",response:[{type:"Property",name:"avSignalTag"}]},"15_13":{service:"avSignal",cmd:"signalingUnreadMessageSyncNotify",response:[{type:"PropertyArray",name:"avSignalTag"}]},"15_14":{service:"avSignal",cmd:"signalingChannelsSyncNotify",response:[{type:"PropertyArray",name:"avSignalTag"}]},"15_15":{service:"avSignal",cmd:"signalingGetChannelInfo",response:[{type:"Property",name:"avSignalTag"}]}}};},function(e,t,n){"use strict";var r=n(23),s=r.f,i=n(265);function o(e){e.onload&&this.once("load",e.onload),e.onerror&&this.once("error",e.onerror),e.onbeforesend&&this.once("beforesend",e.onbeforesend),e.onaftersend&&this.once("aftersend",e.onaftersend);var t=(e=this.options=r.fetch({method:"GET",url:"",sync:!1,data:null,headers:{},cookie:!1,timeout:6e4,type:"text",form:null,input:null,putFileAtEnd:!1,proxyUrl:""},e)).headers;r.notexist(t["Content-Type"])&&(t["Content-Type"]="application/x-www-form-urlencoded"),this.send();}var a=o.prototype=Object.create(i.prototype);a.send=function(){var e=this,t=e.options;setTimeout(function(){try{try{e.emit("beforesend",t);}catch(e){console.log("error:","ignore error ajax beforesend,",e);}e.doSend();}catch(t){console.log("error:","ignore error server error,",t),e.onError("serverError","请求失败:"+t.message);}},0);},a.doSend=s,a.afterSend=function(){var e=this;setTimeout(function(){e.emit("aftersend",e.options);},0);},a.onLoad=function(e){var t=this.options,n=e.status,r=e.result;if(0===(""+n).indexOf("2")){if("json"===t.type)try{r=JSON.parse(r);}catch(e){return console.log("error:","ignore error parse json,",e),void this.onError("parseError",r);}this.emit("load",r);}else this.onError("serverError","服务器返回异常状态",{status:n,result:r,date:e.date});},a.onError=function(e,t,n){var s=r.isObject(n)?n:{};s.code=e||"error",s.message=t||"发生错误",this.emit("error",s);},a.onTimeout=function(){this.onError("timeout","请求超时");},a.abort=function(){this.onError("abort","客户端中止");},a.header=function(e){var t=this;if(!r.isArray(e))return t.getResponseHeader(e||"");var n={};return e.forEach(function(e){n[e]=t.header(e);}),n;},a.getResponseHeader=s,a.destroy=s,e.exports=o;},function(e,t,n){"use strict";var r=o(n(6)),s=o(n(32)),i=o(n(31));function o(e){return e&&e.__esModule?e:{default:e};}var a=function(){function e(){(0,s.default)(this,e),this._entries=[];}return(0,i.default)(e,[{key:"append",value:function value(e,t){if("string"!=typeof e)throw new TypeError("FormData name must be a string");if("string"!=typeof t&&("object"!==(void 0===t?"undefined":(0,r.default)(t))||"string"!=typeof t.uri))throw new TypeError("FormData value must be a string or { uri: tempFilePath }");this._entries.push([e,t]);}},{key:"set",value:function value(e,t){var n=this.get(e);n?n[1]=t:this.append(e,t);}},{key:"delete",value:function value(e){this._entries=this._entries.filter(function(t){return t[0]!==e;});}},{key:"entries",value:function value(){return this._entries;}},{key:"get",value:function value(e){return this._entries.find(function(t){return t[0]===e;});}},{key:"getAll",value:function value(e){return this._entries.filter(function(t){return t[0]===e;});}},{key:"has",value:function value(e){return this._entries.some(function(t){return t[0]===e;});}},{key:"keys",value:function value(){return this._entries.map(function(e){return e[0];});}},{key:"values",value:function value(){return this._entries.map(function(e){return e[1];});}}]),e;}();e.exports=a;},function(e,t,n){var r=n(91),s=n(55).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s);};},function(e,t,n){var r=n(60),s=Math.min;e.exports=function(e){return e>0?s(r(e),9007199254740991):0;};},function(e,t,n){var r=n(18),s=n(27),i=n(170)(!1),o=n(57)("IE_PROTO");e.exports=function(e,t){var n,a=s(e),c=0,u=[];for(n in a){n!=o&&r(a,n)&&u.push(n);}for(;t.length>c;){r(a,n=t[c++])&&(~i(u,n)||u.push(n));}return u;};},function(e,t,n){e.exports=n(21);},function(e,t,n){e.exports=!n(17)&&!n(34)(function(){return 7!=Object.defineProperty(n(72)("div"),"a",{get:function get(){return 7;}}).a;});},function(e,t,n){"use strict";var r=n(49),s=n(25),i=n(92),o=n(21),a=n(37),c=n(172),u=n(47),m=n(168),l=n(9)("iterator"),d=!([].keys&&"next"in[].keys()),p=function p(){return this;};e.exports=function(e,t,n,f,g,h,y){c(n,t,f);var v,b,T,S=function S(e){if(!d&&e in C)return C[e];switch(e){case"keys":case"values":return function(){return new n(this,e);};}return function(){return new n(this,e);};},M=t+" Iterator",k="values"==g,P=!1,C=e.prototype,I=C[l]||C["@@iterator"]||g&&C[g],x=I||S(g),w=g?k?S("entries"):x:void 0,_="Array"==t&&C.entries||I;if(_&&(T=m(_.call(new e())))!==Object.prototype&&T.next&&(u(T,M,!0),r||"function"==typeof T[l]||o(T,l,p)),k&&I&&"values"!==I.name&&(P=!0,x=function x(){return I.call(this);}),r&&!y||!d&&!P&&C[l]||o(C,l,x),a[t]=x,a[M]=p,g)if(v={values:k?x:S("values"),keys:h?x:S("keys"),entries:w},y)for(b in v){b in C||i(C,b,v[b]);}else s(s.P+s.F*(d||P),t,v);return v;};},function(e,t,n){"use strict";var r=n(30),s=n(33),i="https://statistic.live.126.net/statics/report/common/form",o="nimErrEvent",a={reportErrEventUrl:i,localKey:o,reportErrEvent:function reportErrEvent(e){try{var t=localStorage.getItem(o);if(!t)return;t=JSON.parse(t);var n=[];Object.keys(t).forEach(function(e){n.push(t[e]);});var a={app_key:e.appKey,sdk_ver:e.sdk_ver,platform:"Web",os_ver:s.os.family+" "+s.os.version,manufacturer:s.manufacturer,model:s.name};r(i,{method:"POST",timeout:2e3,headers:{"Content-Type":"application/json"},data:JSON.stringify({common:{device_id:e.deviceId,sdk_type:"IM"},event:{logReport:n,deviceinfo:a}}),onload:function onload(){localStorage.removeItem(o);},onerror:function onerror(e){}});}catch(e){}},saveErrEvent:function saveErrEvent(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e.code&&e.module)try{var t=localStorage.getItem(o)||"{}";t=JSON.parse(t);var n=e.code+e.module+e.accid;t[n]?t[n].count++:t[n]={errorCode:e.code,module:e.module,accid:e.accid,timestamp:new Date().getTime(),count:1},localStorage.setItem(o,JSON.stringify(t));}catch(e){}}};a.sendBeacon=navigator&&navigator.sendBeacon&&navigator.sendBeacon.bind(navigator)||function(e,t){var n=new XMLHttpRequest();n.open("POST",e,!0),n.send(t);},e.exports=a;},function(e,t){e.exports=function(e,t){var n=t.split(".");for(;n.length;){var r=n.shift(),s=!1;if("?"==r[r.length-1]&&(r=r.slice(0,-1),s=!0),!(e=e[r])&&s)return e;}return e;};},function(e,t){e.exports=function e(t,n){"use strict";var r,s,i=/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,o=/(^[ ]*|[ ]*$)/g,a=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,c=/^0x[0-9a-f]+$/i,u=/^0/,m=function m(t){return e.insensitive&&(""+t).toLowerCase()||""+t;},l=m(t).replace(o,"")||"",d=m(n).replace(o,"")||"",p=l.replace(i,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),f=d.replace(i,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),g=parseInt(l.match(c),16)||1!==p.length&&l.match(a)&&Date.parse(l),h=parseInt(d.match(c),16)||g&&d.match(a)&&Date.parse(d)||null;if(h){if(g<h)return-1;if(g>h)return 1;}for(var y=0,v=Math.max(p.length,f.length);y<v;y++){if(r=!(p[y]||"").match(u)&&parseFloat(p[y])||p[y]||0,s=!(f[y]||"").match(u)&&parseFloat(f[y])||f[y]||0,isNaN(r)!==isNaN(s))return isNaN(r)?1:-1;if(typeof r!=typeof s&&(r+="",s+=""),r<s)return-1;if(r>s)return 1;}return 0;};},function(e,t,n){e.exports={default:n(155),__esModule:!0};},function(e,t,n){var r=n(48);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e);};},,,,,,,,,,function(e,t,n){"use strict";var r=n(41),s=n(39),i=n(0),o=n(3);function a(e){switch(i.notundef(e.type)?i.verifyFileType(e.type,"msg::FileMessage"):e.type="file",i.verifyOptions(e,"file","msg::FileMessage"),i.verifyOptions(e.file,"url ext size",!0,"file.","msg::FileMessage"),e.type){case"image":c.verifyFile(e.file,"msg::FileMessage");break;case"audio":u.verifyFile(e.file,"msg::FileMessage");break;case"video":m.verifyFile(e.file,"msg::FileMessage");}s.call(this,e),this.attach=JSON.stringify(e.file);}a.prototype=Object.create(s.prototype),a.reverse=function(e){var t=s.reverse(e);return e.attach=e.attach?""+e.attach:"",t.file=e.attach?JSON.parse(e.attach):{},t.file.url=(0,r.genPrivateUrl)(t.file.url),"audio"!==t.type||t.file.mp3Url||(t.file.mp3Url=t.file.url+(~t.file.url.indexOf("?")?"&":"?")+"audioTrans&type=mp3"),o.httpsEnabled&&0!==t.file.url.indexOf("https://")&&(t.file.url=t.file.url.replace("http","https")),t;},e.exports=a;var c=n(445),u=n(444),m=n(443);},function(e,t,n){"use strict";var r=n(41),s=n(0),i={unknown:0,male:1,female:2},o={0:"unknown",1:"male",2:"female"};function a(e){s.merge(this,e),s.notundef(this.gender)&&(s.verifyParamValid("gender",this.gender,a.validGenders,"user::User"),this.gender=i[this.gender]),s.notundef(this.email)&&""!==this.email&&s.verifyEmail("email",this.email,"user::User"),s.notundef(this.birth)&&""!==this.birth&&s.verifyBirth("birth",this.birth,"user::User"),s.notundef(this.tel)&&""!==this.tel&&s.verifyTel("tel",this.tel,"user::User");}a.reverse=function(e){var t=s.filterObj(e,"account nick avatar _avatar_safe sign gender email birth tel custom createTime updateTime");return s.notundef(t.avatar)&&(t.avatar=(0,r.genPrivateUrl)(t.avatar)),s.notundef(t.gender)&&(t.gender=o[t.gender]),s.notundef(t.createTime)&&(t.createTime=+t.createTime),s.notundef(t.updateTime)&&(t.updateTime=+t.updateTime),t;},a.reverseUsers=function(e){return e.map(function(e){return a.reverse(e);});},a.validGenders=Object.keys(i),e.exports=a;},function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(251),i=(r=s)&&r.__esModule?r:{default:r};t.default=i.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n){Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}}return e;};},function(e,t,n){"use strict";var r=n(0),s=r.notundef,i=r.fillPropertyWithDefault,o={0:"normal",1:"owner",2:"manager"};function a(e){r.verifyOptions(e,"teamId","superTeam::TeamMember"),r.verifyParamAtLeastPresentOne(e,"nickInTeam muteTeam custom","superTeam::SuperTeamMember"),this.teamId=e.teamId,s(e.account)&&(this.account=e.account),s(e.nickInTeam)&&(this.nickInTeam=e.nickInTeam),s(e.muteTeam)&&(this.bits=0,e.muteTeam&&(this.bits+=1)),s(e.mute)&&(this.mute=e.mute?1:0),s(e.custom)&&(this.custom=""+e.custom);}a.reverse=function(e){var t=r.copy(e);if(s(t.teamId)&&(t.teamId=""+t.teamId),s(t.type)&&(t.type=o[t.type]),s(t.active)&&(t.active=1==+t.active),s(t.valid)&&(t.valid=1==+t.valid),s(t.mute)&&(t.mute=1==+t.mute),s(t.joinTime)&&(t.joinTime=+t.joinTime),s(t.updateTime)&&(t.updateTime=+t.updateTime),s(t.bits)){var n=t.bits;delete t.bits,t.muteTeam=!!(1&n);}return s(t.teamId)&&s(t.account)&&(t.id=a.genId(t.teamId,t.account)),t;},a.reverseMembers=function(e){return e.map(function(e){return a.reverse(e);});},a.fillProperties=function(e){var t=i(e,"mute",!1),n=i(e,"custom","");return t||n;},a.genId=function(e,t){return e+"-"+t;},a.accounts2ids=function(e,t){return t.map(function(t){return a.genId(e,t);});},a.assembleMembers=function(e,t){return r.isArray(t)||(t=[t]),t.map(function(t){return a.assembleMember(e,t);});},a.assembleMember=function(e,t){return{id:a.genId(e.teamId,t),account:t,teamId:e.teamId,type:"normal",nickInTeam:"",muteTeam:!1,mute:!1,joinTime:e.memberUpdateTime,updateTime:e.memberUpdateTime,active:!0,valid:!0};},a.assembleOwner=function(e){var t=a.assembleMember(e,e.owner);return t.type="owner",t;},e.exports=a;},function(e,t){},function(e,t,n){var r=n(7).document;e.exports=r&&r.documentElement;},function(e,t){e.exports=function(e){var t=n.call(e);return"[object Function]"===t||"function"==typeof e&&"[object RegExp]"!==t||"undefined"!=typeof window&&(e===window.setTimeout||e===window.alert||e===window.confirm||e===window.prompt);};var n=Object.prototype.toString;},function(e,t,n){"use strict";var r=n(22);function s(){}s.typeMap={text:0,image:1,audio:2,video:3,geo:4,notification:5,file:6,tip:10,robot:11,g2:12,custom:100};var i=s.typeReverseMap={0:"text",1:"image",2:"audio",3:"video",4:"geo",5:"notification",6:"file",10:"tip",11:"robot",12:"g2",100:"custom"};s.validTypes=Object.keys(s.typeMap),s.setFlow=function(e,t){var n=t===e.from;n&&t===e.to&&(n=r.deviceId===e.fromDeviceId),e.flow=n?"out":"in","robot"===e.type&&e.content&&e.content.msgOut&&(e.flow="in");},s.getType=function(e){var t=e.type;return i[t]||t;},e.exports=s;},function(module,exports,__webpack_require__){(function(global,module){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*! Socket.IO.js build:0.9.11, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */function getGlobal(){return"undefined"!=typeof window?window:"undefined"!=typeof self?self:void 0!==global?global:{};}var root=getGlobal(),io=module.exports;void 0===root.location&&(root.location=null),root.io?module&&(module.exports=io=root.io):root.io=io,function(){!function(e,t){var n=e;n.version="0.9.11",n.protocol=1,n.transports=[],n.j=[],n.sockets={},n.connect=function(e,r){var s,i,o=n.util.parseUri(e);t&&t.location&&(o.protocol=o.protocol||t.location.protocol.slice(0,-1),o.host=o.host||(t.document?t.document.domain:t.location.hostname),o.port=o.port||t.location.port),s=n.util.uniqueUri(o);var a={host:o.ipv6uri?"["+o.host+"]":o.host,secure:"https"===o.protocol,port:o.port||("https"===o.protocol?443:80),query:o.query||""};return n.util.merge(a,r),!a["force new connection"]&&n.sockets[s]||(i=new n.Socket(a)),!a["force new connection"]&&i&&(n.sockets[s]=i),(i=i||n.sockets[s]).of(o.path.length>1?o.path:"");};}(module.exports,root),function(e,t){var n=e.util={},r=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,s=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];n.parseUri=function(e){var t=e,n=e.indexOf("["),i=e.indexOf("]");-1!=n&&-1!=i&&(e=e.substring(0,n)+e.substring(n,i).replace(/:/g,";")+e.substring(i,e.length));for(var o=r.exec(e||""),a={},c=14;c--;){a[s[c]]=o[c]||"";}return-1!=n&&-1!=i&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a;},n.uniqueUri=function(e){var n=e.protocol,r=e.host,s=e.port;return"document"in t&&t.document?(r=r||document.domain,s=s||("https"==n&&"https:"!==document.location.protocol?443:document.location.port)):(r=r||"localhost",s||"https"!=n||(s=443)),(n||"http")+"://"+r+":"+(s||80);},n.query=function(e,t){var r=n.chunkQuery(e||""),s=[];for(var i in n.merge(r,n.chunkQuery(t||"")),r){r.hasOwnProperty(i)&&s.push(i+"="+r[i]);}return s.length?"?"+s.join("&"):"";},n.chunkQuery=function(e){for(var t,n={},r=e.split("&"),s=0,i=r.length;s<i;++s){(t=r[s].split("="))[0]&&(n[t[0]]=t[1]);}return n;};var i=!1;n.load=function(e){if("undefined"!=typeof document&&document&&"complete"===document.readyState||i)return e();n.on(t,"load",e,!1);},n.on=function(e,t,n,r){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener&&e.addEventListener(t,n,r);},n.request=function(e){if(e&&"undefined"!=typeof XDomainRequest&&!n.ua.hasCORS)return new XDomainRequest();if("undefined"!=typeof XMLHttpRequest&&(!e||n.ua.hasCORS))return new XMLHttpRequest();if(!e)try{return new root[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");}catch(e){}return null;},void 0!==root&&n.load(function(){i=!0;}),n.defer=function(e){if(!n.ua.webkit||"undefined"!=typeof importScripts)return e();n.load(function(){setTimeout(e,100);});},n.merge=function(e,t,r,s){var i,o=s||[],a=void 0===r?2:r;for(i in t){t.hasOwnProperty(i)&&n.indexOf(o,i)<0&&("object"==typeof e[i]&&a?n.merge(e[i],t[i],a-1,o):(e[i]=t[i],o.push(t[i])));}return e;},n.mixin=function(e,t){n.merge(e.prototype,t.prototype);},n.inherit=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n();},n.isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e);},n.intersect=function(e,t){for(var r=[],s=e.length>t.length?e:t,i=e.length>t.length?t:e,o=0,a=i.length;o<a;o++){~n.indexOf(s,i[o])&&r.push(i[o]);}return r;},n.indexOf=function(e,t,n){var r=e.length;for(n=n<0?n+r<0?0:n+r:n||0;n<r&&e[n]!==t;n++){;}return r<=n?-1:n;},n.toArray=function(e){for(var t=[],n=0,r=e.length;n<r;n++){t.push(e[n]);}return t;},n.ua={},n.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var e=new XMLHttpRequest();}catch(e){return!1;}return null!=e.withCredentials;}(),n.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),n.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent);}(void 0!==io?io:module.exports,root),function(e,t){function n(){}e.EventEmitter=n,n.prototype.on=function(e,n){return this.$events||(this.$events={}),this.$events[e]?t.util.isArray(this.$events[e])?this.$events[e].push(n):this.$events[e]=[this.$events[e],n]:this.$events[e]=n,this;},n.prototype.addListener=n.prototype.on,n.prototype.once=function(e,t){var n=this;function r(){n.removeListener(e,r),t.apply(this,arguments);}return r.listener=t,this.on(e,r),this;},n.prototype.removeListener=function(e,n){if(this.$events&&this.$events[e]){var r=this.$events[e];if(t.util.isArray(r)){for(var s=-1,i=0,o=r.length;i<o;i++){if(r[i]===n||r[i].listener&&r[i].listener===n){s=i;break;}}if(s<0)return this;r.splice(s,1),r.length||delete this.$events[e];}else(r===n||r.listener&&r.listener===n)&&delete this.$events[e];}return this;},n.prototype.removeAllListeners=function(e){return void 0===e?(this.$events={},this):(this.$events&&this.$events[e]&&(this.$events[e]=null),this);},n.prototype.listeners=function(e){return this.$events||(this.$events={}),this.$events[e]||(this.$events[e]=[]),t.util.isArray(this.$events[e])||(this.$events[e]=[this.$events[e]]),this.$events[e];},n.prototype.emit=function(e){if(!this.$events)return!1;var n=this.$events[e];if(!n)return!1;var r=Array.prototype.slice.call(arguments,1);if("function"==typeof n)n.apply(this,r);else{if(!t.util.isArray(n))return!1;for(var s=n.slice(),i=0,o=s.length;i<o;i++){s[i].apply(this,r);}}return!0;};}(void 0!==io?io:module.exports,void 0!==io?io:module.parent.exports),function(exports,nativeJSON){"use strict";if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={};function f(e){return e<10?"0"+e:e;}function date(e,t){return isFinite(e.valueOf())?e.getUTCFullYear()+"-"+f(e.getUTCMonth()+1)+"-"+f(e.getUTCDate())+"T"+f(e.getUTCHours())+":"+f(e.getUTCMinutes())+":"+f(e.getUTCSeconds())+"Z":null;}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+e+'"';}function str(e,t){var n,r,s,i,o,a=gap,c=t[e];switch(c instanceof Date&&(c=date(e)),"function"==typeof rep&&(c=rep.call(t,e,c)),typeof c){case"string":return quote(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(gap+=indent,o=[],"[object Array]"===Object.prototype.toString.apply(c)){for(i=c.length,n=0;n<i;n+=1){o[n]=str(n,c)||"null";}return s=0===o.length?"[]":gap?"[\n"+gap+o.join(",\n"+gap)+"\n"+a+"]":"["+o.join(",")+"]",gap=a,s;}if(rep&&"object"==typeof rep)for(i=rep.length,n=0;n<i;n+=1){"string"==typeof rep[n]&&(s=str(r=rep[n],c))&&o.push(quote(r)+(gap?": ":":")+s);}else for(r in c){Object.prototype.hasOwnProperty.call(c,r)&&(s=str(r,c))&&o.push(quote(r)+(gap?": ":":")+s);}return s=0===o.length?"{}":gap?"{\n"+gap+o.join(",\n"+gap)+"\n"+a+"}":"{"+o.join(",")+"}",gap=a,s;}}JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1){indent+=" ";}else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("socket.io:: replacer cannot JSON.stringify");return str("",{"":e});},JSON.parse=function(text,reviver){var j;function walk(e,t){var n,r,s=e[t];if(s&&"object"==typeof s)for(n in s){Object.prototype.hasOwnProperty.call(s,n)&&(void 0!==(r=walk(s,n))?s[n]=r:delete s[n]);}return reviver.call(e,t,s);}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4);})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("socket.io:: reviver cannot JSON.parse");};}(void 0!==io?io:module.exports,"undefined"!=typeof JSON?JSON:void 0),function(e,t){var n=e.parser={},r=n.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],s=n.reasons=["transport not supported","client not handshaken","unauthorized"],i=n.advice=["reconnect"],o=t.JSON,a=t.util.indexOf;n.encodePacket=function(e){var t=a(r,e.type),n=e.id||"",c=e.endpoint||"",u=e.ack,m=null;switch(e.type){case"error":var l=e.reason?a(s,e.reason):"",d=e.advice?a(i,e.advice):"";""===l&&""===d||(m=l+(""!==d?"+"+d:""));break;case"message":""!==e.data&&(m=e.data);break;case"event":var p={name:e.name};e.args&&e.args.length&&(p.args=e.args),m=o.stringify(p);break;case"json":m=o.stringify(e.data);break;case"connect":e.qs&&(m=e.qs);break;case"ack":m=e.ackId+(e.args&&e.args.length?"+"+o.stringify(e.args):"");}var f=[t,n+("data"==u?"+":""),c];return null!=m&&f.push(m),f.join(":");},n.encodePayload=function(e){var t="";if(1==e.length)return e[0];for(var n=0,r=e.length;n<r;n++){t+="�"+e[n].length+"�"+e[n];}return t;};var c=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;n.decodePacket=function(e){if(!(a=e.match(c)))return{};var t=a[2]||"",n=(e=a[5]||"",{type:r[a[1]],endpoint:a[4]||""});switch(t&&(n.id=t,a[3]?n.ack="data":n.ack=!0),n.type){case"error":var a=e.split("+");n.reason=s[a[0]]||"",n.advice=i[a[1]]||"";break;case"message":n.data=e||"";break;case"event":try{var u=o.parse(e);n.name=u.name,n.args=u.args;}catch(e){}n.args=n.args||[];break;case"json":try{n.data=o.parse(e);}catch(e){}break;case"connect":n.qs=e||"";break;case"ack":if((a=e.match(/^([0-9]+)(\+)?(.*)/))&&(n.ackId=a[1],n.args=[],a[3]))try{n.args=a[3]?o.parse(a[3]):[];}catch(e){}}return n;},n.decodePayload=function(e){var t=function t(e,_t2){for(var n=0,r=e;r<_t2.length;r++){if("�"==_t2.charAt(r))return n;n++;}return n;};if("�"==e.charAt(0)){for(var r=[],s=1,i="";s<e.length;s++){if("�"==e.charAt(s)){var o=e.substr(s+1).substr(0,i);if("�"!=e.charAt(s+1+Number(i))&&s+1+Number(i)!=e.length){var a=Number(i);l=t(s+a+1,e),o=e.substr(s+1).substr(0,a+l),s+=l;}r.push(n.decodePacket(o)),s+=Number(i)+1,i="";}else i+=e.charAt(s);}return r;}return[n.decodePacket(e)];};}(void 0!==io?io:module.exports,void 0!==io?io:module.parent.exports),function(e,t){function n(e,t){this.socket=e,this.sessid=t;}e.Transport=n,t.util.mixin(n,t.EventEmitter),n.prototype.heartbeats=function(){return!0;},n.prototype.onData=function(e){if(this!==this.socket.transport)return this;if(this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout(),""!==e){var n=t.parser.decodePayload(e);if(n&&n.length)for(var r=0,s=n.length;r<s;r++){this.onPacket(n[r]);}}return this;},n.prototype.onPacket=function(e){return this.socket.setHeartbeatTimeout(),"heartbeat"==e.type?this.onHeartbeat():("connect"==e.type&&""==e.endpoint&&this.onConnect(),"error"==e.type&&"reconnect"==e.advice&&(this.isOpen=!1),this.socket.onPacket(e),this);},n.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var e=this;this.closeTimeout=setTimeout(function(){e.onDisconnect();},this.socket.closeTimeout);}},n.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket?(this.socket.transport===this?this.socket.onDisconnect():this.socket.setBuffer(!1),this):this;},n.prototype.onConnect=function(){return this.socket.onConnect(),this;},n.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null);},n.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout);},n.prototype.packet=function(e){this.send(t.parser.encodePacket(e));},n.prototype.onHeartbeat=function(e){this.packet({type:"heartbeat"});},n.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen();},n.prototype.onClose=function(){this.isOpen=!1,this.socket.transport===this?this.socket.onClose():this.socket.setBuffer(!1),this.onDisconnect(),this.onDisconnectDone instanceof Function&&this.onDisconnectDone(null),this.onConnectionOver instanceof Function&&this.onConnectionOver(null);},n.prototype.onDisconnectDone=function(){},n.prototype.onConnectionOver=function(){},n.prototype.prepareUrl=function(){var e=this.socket.options;return this.scheme()+"://"+e.host+":"+e.port+"/"+e.resource+"/"+t.protocol+"/"+this.name+"/"+this.sessid;},n.prototype.ready=function(e,t){t.call(this);};}(void 0!==io?io:module.exports,void 0!==io?io:module.parent.exports),function(e,t,n){function r(e){if(this.options={port:80,secure:!1,document:"document"in n&&document,resource:"socket.io",transports:e.transports||t.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":1/0,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},t.util.merge(this.options,e),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1,this.options["sync disconnect on unload"]&&(!this.isXDomain()||t.util.ua.hasCORS)){var r=this;t.util.on(n,"beforeunload",function(){r.disconnectSync();},!1);}this.options["auto connect"]&&this.connect();}function s(){}e.Socket=r,t.util.mixin(r,t.EventEmitter),r.prototype.of=function(e){return this.namespaces[e]||(this.namespaces[e]=new t.SocketNamespace(this,e),""!==e&&this.namespaces[e].packet({type:"connect"})),this.namespaces[e];},r.prototype.publish=function(){var e;for(var t in this.emit.apply(this,arguments),this.namespaces){this.namespaces.hasOwnProperty(t)&&(e=this.of(t)).$emit.apply(e,arguments);}},r.prototype.handshake=function(e){var n=this,r=this.options;function i(t){t instanceof Error?(n.connecting=!1,n.onError(t.message)):e.apply(null,t.split(":"));}var o=["http"+(r.secure?"s":"")+":/",r.host+":"+r.port,r.resource,t.protocol,t.util.query(this.options.query,"t="+ +new Date())].join("/");if(this.isXDomain()&&!t.util.ua.hasCORS&&"undefined"!=typeof document&&document&&document.getElementsByTagName&&document.getElementsByTagName("script")&&document.getElementsByTagName("script")[0]){var a=document.getElementsByTagName("script")[0],c=document.createElement("script");c.src=o+"&jsonp="+t.j.length,c.onreadystatechange=function(){"loaded"==this.readyState&&c.parentNode&&(c.parentNode.removeChild(c),n.connecting=!1,!n.reconnecting&&n.onError("Server down or port not open"),n.publish("handshake_failed"));},a.parentNode.insertBefore(c,a),t.j.push(function(e){i(e),c.parentNode.removeChild(c);});}else{var u=t.util.request();u.open("GET",o,!0),u.timeout=1e4,this.isXDomain()&&(u.withCredentials=!0),u.onreadystatechange=function(){4==u.readyState&&(u.onreadystatechange=s,200==u.status?i(u.responseText):403==u.status?(n.connecting=!1,n.onError(u.responseText),n.publish("handshake_failed")):(n.connecting=!1,!n.reconnecting&&n.onError(u.responseText),n.publish("handshake_failed")));},u.ontimeout=function(e){n.connecting=!1,!n.reconnecting&&n.onError(u.responseText),n.publish("handshake_failed");},u.send(null);}},r.prototype.connect=function(e){if(this.connecting)return this;var n=this;return n.connecting=!0,this.handshake(function(r,s,i,o){n.sessionid=r,n.closeTimeout=1e3*i,n.heartbeatTimeout=1e3*s,n.transports||(n.transports=n.origTransports=o?t.util.intersect(o.split(","),n.options.transports):n.options.transports),n.setHeartbeatTimeout(),n.once("connect",function(){clearTimeout(n.connectTimeoutTimer),n.connectTimeoutTimer=null,e&&"function"==typeof e&&e();}),n.doConnect();}),this;},r.prototype.doConnect=function(){var e=this;if(e.transport&&e.transport.clearTimeouts(),e.transport=e.getTransport(e.transports),!e.transport)return e.publish("connect_failed");e.transport.ready(e,function(){e.connecting=!0,e.publish("connecting",e.transport.name),e.transport.open(),e.options["connect timeout"]&&(e.connectTimeoutTimer&&clearTimeout(e.connectTimeoutTimer),e.connectTimeoutTimer=setTimeout(e.tryNextTransport.bind(e),e.options["connect timeout"]));});},r.prototype.getTransport=function(e){for(var n,r=e||this.transports,s=0;n=r[s];s++){if(t.Transport[n]&&t.Transport[n].check(this)&&(!this.isXDomain()||t.Transport[n].xdomainCheck(this)))return new t.Transport[n](this,this.sessionid);}return null;},r.prototype.tryNextTransport=function(){if(!this.connected&&(this.connecting=!1,this.options["try multiple transports"])){for(var e=this.transports;e.length>0&&e.splice(0,1)[0]!=this.transport.name;){;}e.length?this.doConnect():this.publish("connect_failed");}},r.prototype.setHeartbeatTimeout=function(){if(clearTimeout(this.heartbeatTimeoutTimer),!this.transport||this.transport.heartbeats()){var e=this;this.heartbeatTimeoutTimer=setTimeout(function(){e.transport&&e.transport.onClose();},this.heartbeatTimeout);}},r.prototype.packet=function(e){return this.connected&&!this.doBuffer?this.transport.packet(e):this.buffer.push(e),this;},r.prototype.setBuffer=function(e){this.doBuffer=e,!e&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer());},r.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[];},r.prototype.disconnect=function(){return(this.connected||this.connecting)&&(this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted")),this;},r.prototype.disconnectSync=function(){var e=t.util.request(),n=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,t.protocol,"",this.sessionid].join("/")+"/?disconnect=1";e.open("GET",n,!1),e.send(null),this.onDisconnect("booted");},r.prototype.isXDomain=function(){var e=n&&n.location||{},t=e.port||("https:"==e.protocol?443:80);return this.options.host!==e.hostname||this.options.port!=t;},r.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"));},r.prototype.onOpen=function(){this.open=!0;},r.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer);},r.prototype.onPacket=function(e){this.of(e.endpoint).onPacket(e);},r.prototype.onError=function(e){e&&e.advice&&"reconnect"===e.advice&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",e&&e.reason?e.reason:e);},r.prototype.onDisconnect=function(e){var t=this.connected,n=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1,(t||n)&&(this.transport.close(),this.transport.clearTimeouts(),t&&(this.publish("disconnect",e),"booted"!=e&&this.options.reconnect&&!this.reconnecting&&this.reconnect()),n&&(this.connectTimeoutTimer&&clearTimeout(this.connectTimeoutTimer),this.tryNextTransport()));},r.prototype.reconnect=function(){this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var e=this,t=this.options["max reconnection attempts"],n=this.options["try multiple transports"],r=this.options["reconnection limit"];function s(){if(e.connected){for(var t in e.namespaces){e.namespaces.hasOwnProperty(t)&&""!==t&&e.namespaces[t].packet({type:"connect"});}e.publish("reconnect",e.transport.name,e.reconnectionAttempts);}clearTimeout(e.reconnectionTimer),e.removeListener("connect_failed",i),e.removeListener("connect",i),e.reconnecting=!1,delete e.reconnectionAttempts,delete e.reconnectionDelay,delete e.reconnectionTimer,delete e.redoTransports,e.options["try multiple transports"]=n;}function i(){if(e.reconnecting)return e.connected?s():e.connecting&&e.reconnecting?e.reconnectionTimer=setTimeout(i,1e3):void(e.reconnectionAttempts++>=t?e.redoTransports?(e.publish("reconnect_failed"),s()):(e.on("connect_failed",i),e.options["try multiple transports"]=!0,e.transports=e.origTransports,e.transport=e.getTransport(),e.redoTransports=!0,e.connect()):(e.reconnectionDelay<r&&(e.reconnectionDelay*=2),e.connect(),e.publish("reconnecting",e.reconnectionDelay,e.reconnectionAttempts),e.reconnectionTimer=setTimeout(i,e.reconnectionDelay)));}this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(i,this.reconnectionDelay),this.on("connect",i);};}(void 0!==io?io:module.exports,void 0!==io?io:module.parent.exports,root),function(e,t){function n(e,t){this.socket=e,this.name=t||"",this.flags={},this.json=new r(this,"json"),this.ackPackets=0,this.acks={};}function r(e,t){this.namespace=e,this.name=t;}e.SocketNamespace=n,t.util.mixin(n,t.EventEmitter),n.prototype.$emit=t.EventEmitter.prototype.emit,n.prototype.of=function(){return this.socket.of.apply(this.socket,arguments);},n.prototype.packet=function(e){return e.endpoint=this.name,this.socket.packet(e),this.flags={},this;},n.prototype.send=function(e,t){var n={type:this.flags.json?"json":"message",data:e};return"function"==typeof t&&(n.id=++this.ackPackets,n.ack=!0,this.acks[n.id]=t),this.packet(n);},n.prototype.emit=function(e){var t=Array.prototype.slice.call(arguments,1),n=t[t.length-1],r={type:"event",name:e};return"function"==typeof n&&(r.id=++this.ackPackets,r.ack="data",this.acks[r.id]=n,t=t.slice(0,t.length-1)),r.args=t,this.packet(r);},n.prototype.disconnect=function(){return""===this.name?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this;},n.prototype.onPacket=function(e){var n=this;function r(){n.packet({type:"ack",args:t.util.toArray(arguments),ackId:e.id});}switch(e.type){case"connect":this.$emit("connect");break;case"disconnect":""===this.name?this.socket.onDisconnect(e.reason||"booted"):this.$emit("disconnect",e.reason);break;case"message":case"json":var s=["message",e.data];"data"==e.ack?s.push(r):e.ack&&this.packet({type:"ack",ackId:e.id}),this.$emit.apply(this,s);break;case"event":s=[e.name].concat(e.args);"data"==e.ack&&s.push(r),this.$emit.apply(this,s);break;case"ack":this.acks[e.ackId]&&(this.acks[e.ackId].apply(this,e.args),delete this.acks[e.ackId]);break;case"error":console.error("SocketIO on packet error: ",e),e.advice?this.socket.onError(e):"unauthorized"===e.reason?this.$emit("connect_failed",e.reason):this.$emit("error",e.reason);}},r.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments);},r.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments);};}(void 0!==io?io:module.exports,void 0!==io?io:module.parent.exports),function(e,t,n){function r(e){t.Transport.apply(this,arguments);}e.websocket=r,t.util.inherit(r,t.Transport),r.prototype.name="websocket",r.prototype.open=function(){var e,r=t.util.query(this.socket.options.query),s=this;return e||(e=n.MozWebSocket||n.WebSocket),this.websocket=new e(this.prepareUrl()+r),this.websocket.onopen=function(){s.onOpen(),s.socket.setBuffer(!1);},this.websocket.onmessage=function(e){s.onData(e.data);},this.websocket.onclose=function(){s.socket.setBuffer(!0),s.onClose();},this.websocket.onerror=function(e){s.onError(e);},this;},t.util.ua.iDevice?r.prototype.send=function(e){var t=this;return setTimeout(function(){t.websocket.send(e);},0),this;}:r.prototype.send=function(e){return this.websocket.send(e),this;},r.prototype.payload=function(e){for(var t=0,n=e.length;t<n;t++){this.packet(e[t]);}return this;},r.prototype.close=function(){return this.websocket.close(),this;},r.prototype.onError=function(e){this.socket.onError(e);},r.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws";},r.check=function(){return"WebSocket"in n&&!("__addTask"in WebSocket)||"MozWebSocket"in n;},r.xdomainCheck=function(){return!0;},t.transports.push("websocket");}(void 0!==io?io.Transport:module.exports,void 0!==io?io:module.parent.exports,root),function(e,t,n){function r(e){e&&(t.Transport.apply(this,arguments),this.sendBuffer=[]);}function s(){}e.XHR=r,t.util.inherit(r,t.Transport),r.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this;},r.prototype.payload=function(e){for(var n=[],r=0,s=e.length;r<s;r++){n.push(t.parser.encodePacket(e[r]));}this.send(t.parser.encodePayload(n));},r.prototype.send=function(e){return this.post(e),this;},r.prototype.post=function(e){var t=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),n.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=function(){this.onload=s,t.socket.setBuffer(!1);}:this.sendXHR.onreadystatechange=function(){4==this.readyState&&(this.onreadystatechange=s,t.posting=!1,200==this.status?t.socket.setBuffer(!1):t.onClose());},this.sendXHR.send(e);},r.prototype.close=function(){return this.onClose(),this;},r.prototype.request=function(e){var n=t.util.request(this.socket.isXDomain()),r=t.util.query(this.socket.options.query,"t="+ +new Date());if(n.open(e||"GET",this.prepareUrl()+r,!0),"POST"==e)try{n.setRequestHeader?n.setRequestHeader("Content-type","text/plain;charset=UTF-8"):n.contentType="text/plain";}catch(e){}return n;},r.prototype.scheme=function(){return this.socket.options.secure?"https":"http";},r.check=function(e,r){try{var s=t.util.request(r),i=n.XDomainRequest&&s instanceof XDomainRequest,o=e&&e.options&&e.options.secure?"https:":"http:",a=n.location&&o!=n.location.protocol;if(s&&(!i||!a))return!0;}catch(e){}return!1;},r.xdomainCheck=function(e){return r.check(e,!0);};}(void 0!==io?io.Transport:module.exports,void 0!==io?io:module.parent.exports,root),function(e,t,n){function r(){t.Transport.XHR.apply(this,arguments);}function s(){}e["xhr-polling"]=r,t.util.inherit(r,t.Transport.XHR),t.util.merge(r,t.Transport.XHR),r.prototype.name="xhr-polling",r.prototype.heartbeats=function(){return!1;},r.prototype.open=function(){return t.Transport.XHR.prototype.open.call(this),!1;},r.prototype.get=function(){if(this.isOpen){var e=this;this.xhr=this.request(),n.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=function(){this.onload=s,this.onerror=s,e.retryCounter=1,e.onData(this.responseText),e.get();},this.xhr.onerror=function(){e.retryCounter++,!e.retryCounter||e.retryCounter>3?e.onClose():e.get();}):this.xhr.onreadystatechange=function(){4==this.readyState&&(this.onreadystatechange=s,200==this.status?(e.onData(this.responseText),e.get()):e.onClose());},this.xhr.send(null);}},r.prototype.onClose=function(){if(t.Transport.XHR.prototype.onClose.call(this),this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=s;try{this.xhr.abort();}catch(e){}this.xhr=null;}},r.prototype.ready=function(e,n){var r=this;t.util.defer(function(){n.call(r);});},t.transports.push("xhr-polling");}(void 0!==io?io.Transport:module.exports,void 0!==io?io:module.parent.exports,root),__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return io;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__);}();}).call(this,__webpack_require__(13),__webpack_require__(151)(module));},function(e,t,n){"use strict";var r={1:"ROOM_CLOSE",2:"ROOM_JOIN",3:"INVITE",4:"CANCEL_INVITE",5:"REJECT",6:"ACCEPT",7:"LEAVE",8:"CONTROL"},s={1:"accid",2:"uid",3:"createTime",4:"expireTime",5:"web_uid"},i={10404:"ROOM_NOT_EXISTS",10405:"ROOM_HAS_EXISTS",10406:"ROOM_MEMBER_NOT_EXISTS",10407:"ROOM_MEMBER_HAS_EXISTS",10408:"INVITE_NOT_EXISTS",10409:"INVITE_HAS_REJECT",10410:"INVITE_HAS_ACCEPT",10201:"PEER_NIM_OFFLINE",10202:"PEER_PUSH_OFFLINE",10419:"ROOM_MEMBER_EXCEED",10420:"ROOM_MEMBER_HAS_EXISTS_OTHER_CLIENT",10417:"UID_CONFLICT"};e.exports={parseAvSignalType:function parseAvSignalType(e){return r[e]||e;},parseAvSignalMember:function parseAvSignalMember(e){var t={};return Object.keys(e).forEach(function(n){t[s[n]]=e[n];}),t;},parseAvSignalError:function parseAvSignalError(e){return e.message=i[e.code]||e.message||e,e;}};},function(e,t,n){"use strict";var r=n(0),s={stripmeta:0,blur:2,quality:3,crop:4,rotate:5,thumbnail:7,interlace:9},i={0:"stripmeta",1:"type",2:"blur",3:"quality",4:"crop",5:"rotate",6:"pixel",7:"thumbnail",8:"watermark",9:"interlace",10:"tmp"};function o(e){r.verifyOptions(e,"type","image::ImageOp"),r.verifyParamValid("type",e.type,o.validTypes,"image::ImageOp"),r.merge(this,e),this.type=s[e.type];}o.validTypes=Object.keys(s),o.reverse=function(e){var t=r.copy(e);return t.type=i[t.type],t;},o.reverseImageOps=function(e){return e.map(function(e){return o.reverse(e);});},e.exports=o;},function(e,t,n){"use strict";var r=n(0),s={fromDataURL:function fromDataURL(e){var t=r.getGlobal(),n=void 0;n=e.split(",")[0].indexOf("base64")>=0?t.atob(e.split(",")[1]):t.decodeURIComponent(e.split(",")[1]);for(var s=e.split(",")[0].split(":")[1].split(";")[0],i=new Uint8Array(n.length),o=0;o<n.length;o++){i[o]=n.charCodeAt(o);}return new t.Blob([i],{type:s});}};e.exports=s;},function(e,t,n){"use strict";var r=n(23),s=r.getGlobal(),i={},o=s.name||"_parent",a=[],c=[];i.addMsgListener=function(e){a.push(e);};var u,m,l,d,p=(u=/^([\w]+?:\/\/.*?(?=\/|$))/i,function(e){return e=e||"",u.test(e)?RegExp.$1:"*";}),f=function f(){var e=unescape(s.name||"").trim();if(e&&0===e.indexOf("MSG|")){s.name="";var t=r.string2object(e.replace("MSG|",""),"|"),n=(t.origin||"").toLowerCase();n&&"*"!==n&&0!==location.href.toLowerCase().indexOf(n)||function(e){for(var t=0,n=a.length;t<n;t++){try{a[t].call(null,e);}catch(e){}}}({data:JSON.parse(t.data||"null"),source:s.frames[t.self]||t.self,origin:p(t.ref||("undefined"==typeof document?"":document.referrer))});}},g=(l=function l(e,t){for(var n=0,r=e.length;n<r;n++){if(e[n]===t)return!0;}return!1;},function(){if(c.length){m=[];for(var e,t=c.length-1;t>=0;t--){e=c[t],l(m,e.w)||(m.push(e.w),c.splice(t,1),e.w.name=e.d);}m=null;}}),h=i.startTimer=(d=!1,function(){d||(d=!0,s.postMessage||(setInterval(g,100),setInterval(f,20)));});i.postMessage=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r.fillUndef(t,{origin:"*",source:o}),s.postMessage){var n=t.data;s.FormData||(n=JSON.stringify(n)),e.postMessage(n,t.origin);}else{if(h(),r.isObject(t)){var i={};i.origin=t.origin||"",i.ref=location.href,i.self=t.source,i.data=JSON.stringify(t.data),t="MSG|"+r.object2string(i,"|",!0);}c.unshift({w:e,d:escape(t)});}},e.exports=i;},function(e,t,n){"use strict";var r=n(0),s={file:{md5:"$(Etag)",size:"$(ObjectSize)"},image:{md5:"$(Etag)",size:"$(ObjectSize)",w:"$(ImageInfo.Width)",h:"$(ImageInfo.Height)",orientation:"$(ImageInfo.Orientation)"},audio:{md5:"$(Etag)",size:"$(ObjectSize)",dur:"$(AVinfo.Audio.Duration)"},video:{md5:"$(Etag)",size:"$(ObjectSize)",dur:"$(AVinfo.Video.Duration)",w:"$(AVinfo.Video.Width)",h:"$(AVinfo.Video.Height)"}},i={genResponseBody:function genResponseBody(e){return s[e=e||"file"];},parseResponse:function parseResponse(e,t){r.notundef(e.size)&&(e.size=+e.size),r.notundef(e.w)&&(e.w=+e.w),r.notundef(e.h)&&(e.h=+e.h),r.notundef(e.dur)&&(e.dur=+e.dur);var n=e.orientation;if(r.notundef(n)&&(delete e.orientation,t&&("right, top"===n||"left, bottom"===n))){var s=e.w;e.w=e.h,e.h=s;}return e;}};e.exports=i;},function(e,t,n){"use strict";e.exports={};},function(e,t,n){"use strict";var r=i(n(32)),s=i(n(31));function i(e){return e&&e.__esModule?e:{default:e};}var o=n(125),a=0,c=1,u=3,m=function(){function e(t,n){var s=this;if((0,r.default)(this,e),!t)throw new TypeError("Failed to construct 'WebSocket': url required");if(n&&(!wx.canIUse||!wx.canIUse("connectSocket.object.protocols")))throw new Error("subprotocal not supported in weapp");t=t.replace(/:443(\/|$)/,"$1"),this._url=t,this._protocal=n||"",this._readyState=a,this._socketTask=wx.connectSocket({url:t,protocals:this._protocal,fail:function fail(e){console.info("wx::ws: sockets build failed ..."),s.errorHandler(e);},success:function success(e){console.log("wx::ws: sockets build succeed ...");}}),this._socketTask.onOpen(function(e){s._readyState=c,console.log("wx::ws: onopen ",e),s.dispatchEvent({type:"open"});}),this._socketTask.onError(function(e){s.errorHandler(e);}),this._socketTask.onClose(function(e){s._readyState=u,console.log("wx::ws: onclose ",e);var t=e.code,n=e.reason,r=e.wasClean;s.dispatchEvent({code:t,reason:n,wasClean:r,type:"close"}),s._socketTask=null;}),this._socketTask.onMessage(function(e){var t=e.data,n=e.origin,r=e.ports,i=e.source;s.dispatchEvent({data:t,origin:n,ports:r,source:i,type:"message"});});}return(0,s.default)(e,[{key:"dispatchEvent",value:function value(e){var t="on"+e.type;"function"==typeof this[t]&&this[t](e);}},{key:"close",value:function value(){try{console.log("wx::ws:close WebSocket force close: readystate "+this._readyState),this._socketTask.close({code:1e3,reason:"wx::ws:user force close websocket",complete:function complete(){}});}catch(e){console.warn("wx::ws:close WebSocket force error",e);}}},{key:"send",value:function value(e){if(this._readyState!==c)throw new Error("wx:ws: sendMsg when readyState="+this._readyState);if(!("string"==typeof e||e instanceof ArrayBuffer))throw new TypeError("wx:ws: sendMsg only String/ArrayBuffer supported");this._socketTask.send({data:e});}},{key:"errorHandler",value:function value(e){console.error("wx::ws: onerror ",e),this._readyState=u,this.dispatchEvent({type:"error",message:e.errMsg}),e.errMsg&&"[object Array]"===Object.prototype.toString.call(e.errMsg)&&(e.errMsg.indexOf("断裂管道")>0||e.errMsg.indexOf("broken pipe")>0)&&this.dispatchEvent({code:1006,reason:e.errMsg,type:"close"}),this._socketTask=null;}},{key:"url",get:function get(){return this._url;}},{key:"protocal",get:function get(){return this._protocal;}},{key:"readyState",get:function get(){return this._readyState;}}]),e;}();o(m,{CONNECTING:a,OPEN:c,CLOSING:2,CLOSED:u}),e.exports=m;},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++){t["_"+String.fromCharCode(n)]=n;}if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e];}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e;}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("");}catch(e){return!1;}}()?Object.assign:function(e,t){for(var n,o,a=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e);}(e),c=1;c<arguments.length;c++){for(var u in n=Object(arguments[c])){s.call(n,u)&&(a[u]=n[u]);}if(r){o=r(n);for(var m=0;m<o.length;m++){i.call(n,o[m])&&(a[o[m]]=n[o[m]]);}}}return a;};},function(e,t,n){"use strict";var r=o(n(278)),s=o(n(32)),i=o(n(31));function o(e){return e&&e.__esModule?e:{default:e};}var a=n(125),c=n(88),u=0,m=4;function l(e){this.status=e.statusCode,this.statusText=e.statusCode,e.header&&(this._responseHeaders=Object.keys(e.header).reduce(function(t,n){return t[n.toLowerCase()]=e.header[n],t;},{}));var t=e.data;"string"!=typeof t&&(t=JSON.stringify(t)),this.responseText=this.response=t,this.readyState=m,this.dispatchEvent({type:"readystatechange"});}var d=function(){function e(){(0,s.default)(this,e);}return(0,i.default)(e,[{key:"dispatchEvent",value:function value(e){var t="on"+e.type;"function"==typeof this[t]&&this[t](e);}}]),e;}(),p=function(){function e(){(0,s.default)(this,e),this.readyState=u,this._headers={},this.upload=new d();}return(0,i.default)(e,[{key:"dispatchEvent",value:function value(e){var t="on"+e.type;"function"==typeof this[t]&&this[t](e);}},{key:"abort",value:function value(){if(!this._request||this._request.abort)return this.status=0,this.readyState=m,this._request.abort();throw new Error("该版本基础库不支持 abort request");}},{key:"getAllResponseHeaders",value:function value(){var e=this;return this._responseHeaders?Object.keys(this._responseHeaders).map(function(t){return t+": "+e._responseHeaders[t];}).join("\r\n"):"";}},{key:"getResponseHeader",value:function value(e){var t=e.toLowerCase();return this._responseHeaders&&this._responseHeaders[t]?this._responseHeaders[t]:null;}},{key:"overrideMimeType",value:function value(){throw new Error("not supported in weapp");}},{key:"open",value:function value(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(this.readyState!==u)throw new Error("request is already opened");if(!n)throw new Error("sync request is not supported");this._method=e,t=t.replace(/:443(\/|$)/,"$1"),this._url=t,this.readyState=1,this.dispatchEvent({type:"readystatechange"});}},{key:"setRequestHeader",value:function value(e,t){if(1!==this.readyState)throw new Error("request is not opened");this._headers[e.toLowerCase()]=t;}},{key:"send",value:function value(e){var t=this;if(1!==this.readyState)throw new Error("request is not opened");if(e instanceof c){var n=e.entries(),s=n.filter(function(e){return"string"!=typeof e[1];});if(0===s.length)throw new Error("Must specify a Blob field in FormData");s.length>1&&console.warn("Only the first Blob will be send in Weapp");var i=n.filter(function(e){return"string"==typeof e[1];}).reduce(function(e,t){return a(e,(0,r.default)({},t[0],t[1]));},{});this._request=wx.uploadFile({url:this._url,name:s[0][0],filePath:s[0][1].uri,formData:i,header:this._headers,success:l.bind(this),fail:function fail(e){t.status=0,t.readyState=m,t.dispatchEvent({type:"readystatechange"}),t.dispatchEvent({type:"error"});}}),this._request&&this._request.onProgressUpdate&&this._request.onProgressUpdate(function(e){var n=e.totalBytesSent,r=e.totalBytesExpectedToSend;t.upload.dispatchEvent({type:"progress",loaded:n,total:r});});}else this._request=wx.request({url:this._url,data:e||"",method:this._method.toUpperCase(),header:this._headers,success:l.bind(this),fail:function fail(e){t.status=0,t.readyState=m,t.dispatchEvent({type:"readystatechange"}),t.dispatchEvent({type:"error"});}});}}]),e;}();a(p,{UNSENT:u,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:m}),e.exports=p;},function(e,t,n){"use strict";var r=i(n(32)),s=i(n(31));function i(e){return e&&e.__esModule?e:{default:e};}var o=function(){function e(){(0,r.default)(this,e);}return(0,s.default)(e,[{key:"getItem",value:function value(e){return wx.getStorageSync(e);}},{key:"setItem",value:function value(e,t){return wx.setStorageSync(e,t);}},{key:"removeItem",value:function value(e){return this.setItem(e,"");}},{key:"clear",value:function value(){return wx.clearStorageSync();}}]),e;}();e.exports=new o();},function(e,t,n){var r=n(42),s=n(38),i=n(27),o=n(58),a=n(18),c=n(93),u=Object.getOwnPropertyDescriptor;t.f=n(17)?u:function(e,t){if(e=i(e),t=o(t,!0),c)try{return u(e,t);}catch(e){}if(a(e,t))return s(!r.f.call(e,t),e[t]);};},,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=n(33),s=n(226),i=n(117),o=n(97),a=n(96),c=n(0),u=n(220),m=n(120),l=n(30),d=n(219),p=n(218);e.exports=function(e){c.merge(e,{platform:r,xhr:s,io:i,naturalSort:o,deepAccess:a,util:c,support:u,blob:m,ajax:l,LoggerPlugin:d,usePlugin:p});};},function(e,t,n){"use strict";var r=n(73);e.exports.f=function(e){return new function(e){var t,n;this.promise=new e(function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r;}),this.resolve=r(t),this.reject=r(n);}(e);};},function(e,t,n){var r=n(48),s=n(9)("toStringTag"),i="Arguments"==r(function(){return arguments;}());e.exports=function(e){var t,n,o;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t];}catch(e){}}(t=Object(e),s))?n:i?r(t):"Object"==(o=r(t))&&"function"==typeof t.callee?"Arguments":o;};},function(e,t,n){var r=n(147),s=n(9)("iterator"),i=n(37);e.exports=n(11).getIteratorMethod=function(e){if(null!=e)return e[s]||e["@@iterator"]||i[r(e)];};},function(e,t,n){"use strict";var r=n(0),s=n(86),i=r.merge({},s.idMap,{auth:{id:2,login:3,kicked:5,logout:6,multiPortLogin:7,kick:8},user:{id:3,updatePushToken:1,appBackground:2,markInBlacklist:3,getBlacklist:4,markInMutelist:5,getMutelist:6,getRelations:8,getUsers:7,updateMyInfo:10,updateDonnop:15,syncMyInfo:109,syncUpdateMyInfo:110},notify:{id:4,markRead:3,syncOfflineMsgs:4,batchMarkRead:5,syncOfflineSysMsgs:6,syncOfflineNetcallMsgs:8,syncRoamingMsgs:9,syncMsgReceipts:12,syncRobots:15,syncBroadcastMsgs:16,syncSuperTeamRoamingMsgs:17,syncOfflineSuperTeamSysMsgs:18,syncDeleteSuperTeamMsgOfflineRoaming:19,syncDeleteMsgSelf:21,syncSessionsWithMoreRoaming:22,syncStickTopSessions:23,syncSessionHistoryMsgsDelete:24},sync:{id:5,sync:1,syncTeamMembers:2,syncSuperTeamMembers:3},msg:{id:7,sendMsg:1,msg:2,sysMsg:3,getHistoryMsgs:6,sendCustomSysMsg:7,searchHistoryMsgs:8,deleteSessions:9,getSessions:10,syncSendMsg:101,sendMsgReceipt:11,msgReceipt:12,deleteMsg:13,msgDeleted:14,markSessionAck:16,markSessionAckBatch:25,broadcastMsg:17,clearServerHistoryMsgs:18,getServerSessions:19,getServerSession:20,updateServerSession:21,deleteServerSessions:22,deleteMsgSelf:23,deleteMsgSelfBatch:24,onClearServerHistoryMsgs:118,syncUpdateServerSession:121,onDeleteMsgSelf:123,onDeleteMsgSelfBatch:124},msgExtend:{id:23,getThreadMsgs:1,getMsgsByIdServer:2,addQuickComment:3,deleteQuickComment:4,onQuickComment:5,onDeleteQuickComment:6,getQuickComments:7,addCollect:8,deleteCollects:9,updateCollect:10,getCollects:11,addStickTopSession:12,deleteStickTopSession:13,updateStickTopSession:14,addMsgPin:15,updateMsgPin:16,deleteMsgPin:17,onAddMsgPin:18,onUpdateMsgPin:19,onDeleteMsgPin:20,getMsgPins:21,syncAddQuickComment:103,syncDeleteQuickComment:104,syncAddStickTopSession:112,syncDeleteStickTopSession:113,syncUpdateStickTopSession:114,syncAddMsgPin:115,syncUpdateMsgPin:116,syncDeleteMsgPin:117},team:{id:8,createTeam:1,sendTeamMsg:2,teamMsg:3,teamMsgs:4,addTeamMembers:5,removeTeamMembers:6,updateTeam:7,leaveTeam:8,getTeam:9,getTeams:10,getTeamMembers:11,dismissTeam:12,applyTeam:13,passTeamApply:14,rejectTeamApply:15,addTeamManagers:16,removeTeamManagers:17,transferTeam:18,updateInfoInTeam:19,updateNickInTeam:20,acceptTeamInvite:21,rejectTeamInvite:22,getTeamHistoryMsgs:23,searchTeamHistoryMsgs:24,updateMuteStateInTeam:25,getMyTeamMembers:26,getMutedTeamMembers:27,sendTeamMsgReceipt:28,getTeamMsgReads:29,getTeamMsgReadAccounts:30,notifyTeamMsgReads:31,muteTeamAll:32,getTeamMemberInvitorAccid:33,getTeamsById:34,syncMyTeamMembers:126,syncTeams:109,syncTeamMembers:111,syncCreateTeam:101,syncSendTeamMsg:102,syncUpdateTeamMember:119},superTeam:{id:21,sendSuperTeamMsg:2,superTeamMsg:3,addSuperTeamMembers:5,removeSuperTeamMembers:6,leaveSuperTeam:7,updateSuperTeam:8,getSuperTeam:9,getSuperTeams:12,updateInfoInSuperTeam:10,getMySuperTeamMembers:11,getSuperTeamMembers:13,getSuperTeamHistoryMsgs:14,getSuperTeamMembersByJoinTime:15,sendSuperTeamCustomSysMsg:16,deleteSuperTeamMsg:17,superTeamMsgDelete:18,superTeamCustomSysMsg:19,applySuperTeam:20,passSuperTeamApply:21,rejectSuperTeamApply:22,acceptSuperTeamInvite:23,rejectSuperTeamInvite:24,markSuperTeamSessionAck:25,addSuperTeamManagers:26,removeSuperTeamManagers:27,updateSuperTeamMute:28,updateSuperTeamMembersMute:29,updateNickInSuperTeam:30,transferSuperTeam:31,markSuperTeamSessionsAck:32,getSuperTeamMembersByAccounts:33,getMutedSuperTeamMembers:34,syncMySuperTeamMembers:111,syncSuperTeams:109,syncSuperTeamMembers:113,syncCreateSuperTeam:101,syncSendSuperTeamMsg:102,syncUpdateSuperTeamMember:110,syncDeleteSuperTeamMsg:117},friend:{id:12,friendRequest:1,syncFriendRequest:101,deleteFriend:2,syncDeleteFriend:102,updateFriend:3,syncUpdateFriend:103,getFriends:4},chatroom:{id:13,getChatroomAddress:1},filter:{id:101,sendFilterMsg:1,filterMsg:2,filterSysMsg:3,sendFilterCustomSysMsg:7},eventService:{id:14,publishEvent:1,pushEvent:2,subscribeEvent:3,unSubscribeEventsByAccounts:4,unSubscribeEventsByType:5,querySubscribeEventsByAccounts:6,querySubscribeEventsByType:7,pushEvents:9},proxyService:{id:22,httpProxy:1,onProxyMsg:2}}),o=r.merge({},s.cmdConfig,{login:{sid:i.auth.id,cid:i.auth.login,params:[{type:"Property",name:"login"}]},logout:{sid:i.auth.id,cid:i.auth.logout},kick:{sid:i.auth.id,cid:i.auth.kick,params:[{type:"StrArray",name:"deviceIds"}]},updatePushToken:{sid:i.user.id,cid:i.user.updatePushToken,params:[{type:"String",name:"tokenName"},{type:"String",name:"token"},{type:"int",name:"pushkit"}]},appBackground:{sid:i.user.id,cid:i.user.appBackground,params:[{type:"bool",name:"isBackground"},{type:"Int",name:"badge"}]},markInBlacklist:{sid:i.user.id,cid:i.user.markInBlacklist,params:[{type:"String",name:"account"},{type:"bool",name:"isAdd"}]},getBlacklist:{sid:i.user.id,cid:i.user.getBlacklist,params:[{type:"long",name:"time"}]},markInMutelist:{sid:i.user.id,cid:i.user.markInMutelist,params:[{type:"String",name:"account"},{type:"bool",name:"isAdd"}]},getMutelist:{sid:i.user.id,cid:i.user.getMutelist,params:[{type:"long",name:"time"}]},getRelations:{sid:i.user.id,cid:i.user.getRelations,params:[{type:"long",name:"timetag"}]},getUsers:{sid:i.user.id,cid:i.user.getUsers,params:[{type:"StrArray",name:"accounts"}]},updateMyInfo:{sid:i.user.id,cid:i.user.updateMyInfo,params:[{type:"Property",name:"user"}]},updateDonnop:{sid:i.user.id,cid:i.user.updateDonnop,params:[{type:"Property",name:"donnop"}]},markRead:{sid:i.notify.id,cid:i.notify.markRead,params:[{type:"long",name:"id"},{type:"ph",name:"ph"}]},batchMarkRead:{sid:i.notify.id,cid:i.notify.batchMarkRead,params:[{type:"byte",name:"sid"},{type:"byte",name:"cid"},{type:"LongArray",name:"ids"}]},sync:{sid:i.sync.id,cid:i.sync.sync,params:[{type:"Property",name:"sync"}]},syncTeamMembers:{sid:i.sync.id,cid:i.sync.syncTeamMembers,params:[{type:"LongLongMap",name:"sync"}]},syncSuperTeamMembers:{sid:i.sync.id,cid:i.sync.syncSuperTeamMembers,params:[{type:"LongLongMap",name:"sync"}]},sendMsg:{sid:i.msg.id,cid:i.msg.sendMsg,params:[{type:"Property",name:"msg"}]},getHistoryMsgs:{sid:i.msg.id,cid:i.msg.getHistoryMsgs,params:[{type:"String",name:"to"},{type:"long",name:"beginTime"},{type:"long",name:"endTime"},{type:"long",name:"lastMsgId"},{type:"int",name:"limit"},{type:"bool",name:"reverse"},{type:"LongArray",name:"msgTypes"}]},sendCustomSysMsg:{sid:i.msg.id,cid:i.msg.sendCustomSysMsg,params:[{type:"Property",name:"sysMsg"}]},searchHistoryMsgs:{sid:i.msg.id,cid:i.msg.searchHistoryMsgs,params:[{type:"String",name:"to"},{type:"long",name:"beginTime"},{type:"long",name:"endTime"},{type:"String",name:"keyword"},{type:"int",name:"limit"},{type:"bool",name:"reverse"}]},getSessions:{sid:i.msg.id,cid:i.msg.getSessions,params:[{type:"long",name:"time"}]},deleteSessions:{sid:i.msg.id,cid:i.msg.deleteSessions,params:[{type:"StrArray",name:"sessions"}]},sendMsgReceipt:{sid:i.msg.id,cid:i.msg.sendMsgReceipt,params:[{type:"Property",name:"msgReceipt"}]},deleteMsg:{sid:i.msg.id,cid:i.msg.deleteMsg,params:[{type:"Property",name:"sysMsg"}]},markSessionAck:{sid:i.msg.id,cid:i.msg.markSessionAck,params:[{type:"byte",name:"scene"},{type:"String",name:"to"},{type:"long",name:"timetag"}]},markSessionAckBatch:{sid:i.msg.id,cid:i.msg.markSessionAckBatch,params:[{type:"PropertyArray",name:"sessionAckTags",entity:"sessionAckTag"}]},clearServerHistoryMsgs:{sid:i.msg.id,cid:i.msg.clearServerHistoryMsgs,params:[{type:"Property",name:"clearMsgsParams"}]},clearServerHistoryMsgsWithSync:{sid:i.msg.id,cid:i.msg.clearServerHistoryMsgs,params:[{type:"Property",name:"clearMsgsParamsWithSync"}]},onClearServerHistoryMsgs:{sid:i.msg.id,cid:i.msg.clearServerHistoryMsgs},getServerSessions:{sid:i.msg.id,cid:i.msg.getServerSessions,params:[{type:"Property",name:"sessionReqTag"}]},getServerSession:{sid:i.msg.id,cid:i.msg.getServerSession,params:[{type:"Property",name:"session"}]},updateServerSession:{sid:i.msg.id,cid:i.msg.updateServerSession,params:[{type:"Property",name:"session"}]},deleteServerSessions:{sid:i.msg.id,cid:i.msg.deleteServerSessions,params:[{type:"PropertyArray",name:"sessions",entity:"session"}]},deleteMsgSelf:{sid:i.msg.id,cid:i.msg.deleteMsgSelf,params:[{type:"Property",name:"deleteMsgSelfTag"}]},deleteMsgSelfBatch:{sid:i.msg.id,cid:i.msg.deleteMsgSelfBatch,params:[{type:"PropertyArray",name:"deleteMsgSelfTags",entity:"deleteMsgSelfTag"}]},onDeleteMsgSelf:{sid:i.msg.id,cid:i.msg.onDeleteMsgSelf},onDeleteMsgSelfBatch:{sid:i.msg.id,cid:i.msg.onDeleteMsgSelfBatch},sendSuperTeamMsg:{sid:i.superTeam.id,cid:i.superTeam.sendSuperTeamMsg,params:[{type:"Property",name:"msg"}]},addSuperTeamMembers:{sid:i.superTeam.id,cid:i.superTeam.addSuperTeamMembers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"},{type:"String",name:"ps"}]},removeSuperTeamMembers:{sid:i.superTeam.id,cid:i.superTeam.removeSuperTeamMembers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},leaveSuperTeam:{sid:i.superTeam.id,cid:i.superTeam.leaveSuperTeam,params:[{type:"long",name:"teamId"}]},updateSuperTeam:{sid:i.superTeam.id,cid:i.superTeam.updateSuperTeam,params:[{type:"Property",name:"team"}]},getSuperTeam:{sid:i.superTeam.id,cid:i.superTeam.getSuperTeam,params:[{type:"long",name:"teamId"}]},getSuperTeams:{sid:i.superTeam.id,cid:i.superTeam.getSuperTeams,params:[{type:"long",name:"timetag"}]},getSuperTeamMembers:{sid:i.superTeam.id,cid:i.superTeam.getSuperTeamMembers,params:[{type:"long",name:"teamId"},{type:"long",name:"timetag"}]},updateInfoInSuperTeam:{sid:i.superTeam.id,cid:i.superTeam.updateInfoInSuperTeam,params:[{type:"Property",name:"superTeamMember"}]},getSuperTeamHistoryMsgs:{sid:i.superTeam.id,cid:i.superTeam.getSuperTeamHistoryMsgs,params:[{type:"long",name:"to"},{type:"long",name:"beginTime"},{type:"long",name:"endTime"},{type:"long",name:"lastMsgId"},{type:"int",name:"limit"},{type:"bool",name:"reverse"},{type:"LongArray",name:"msgTypes"}]},applySuperTeam:{sid:i.superTeam.id,cid:i.superTeam.applySuperTeam,params:[{type:"long",name:"teamId"},{type:"String",name:"ps"}]},passSuperTeamApply:{sid:i.superTeam.id,cid:i.superTeam.passSuperTeamApply,params:[{type:"long",name:"teamId"},{type:"String",name:"from"}]},rejectSuperTeamApply:{sid:i.superTeam.id,cid:i.superTeam.rejectSuperTeamApply,params:[{type:"long",name:"teamId"},{type:"String",name:"from"},{type:"String",name:"ps"}]},acceptSuperTeamInvite:{sid:i.superTeam.id,cid:i.superTeam.acceptSuperTeamInvite,params:[{type:"long",name:"teamId"},{type:"String",name:"from"}]},rejectSuperTeamInvite:{sid:i.superTeam.id,cid:i.superTeam.rejectSuperTeamInvite,params:[{type:"long",name:"teamId"},{type:"String",name:"from"},{type:"String",name:"ps"}]},markSuperTeamSessionAck:{sid:i.superTeam.id,cid:i.superTeam.markSuperTeamSessionAck,params:[{type:"long",name:"to"},{type:"long",name:"timetag"}]},addSuperTeamManagers:{sid:i.superTeam.id,cid:i.superTeam.addSuperTeamManagers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},removeSuperTeamManagers:{sid:i.superTeam.id,cid:i.superTeam.removeSuperTeamManagers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},updateSuperTeamMute:{sid:i.superTeam.id,cid:i.superTeam.updateSuperTeamMute,params:[{type:"long",name:"teamId"},{type:"int",name:"mute"}]},updateSuperTeamMembersMute:{sid:i.superTeam.id,cid:i.superTeam.updateSuperTeamMembersMute,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"},{type:"int",name:"mute"}]},updateNickInSuperTeam:{sid:i.superTeam.id,cid:i.superTeam.updateNickInSuperTeam,params:[{type:"Property",name:"superTeamMember"}]},transferSuperTeam:{sid:i.superTeam.id,cid:i.superTeam.transferSuperTeam,params:[{type:"long",name:"teamId"},{type:"String",name:"account"},{type:"bool",name:"leave"}]},markSuperTeamSessionsAck:{sid:i.superTeam.id,cid:i.superTeam.markSuperTeamSessionsAck,params:[{type:"PropertyArray",name:"sessionAckTags",entity:"sessionAckTag"}]},getSuperTeamMembersByJoinTime:{sid:i.superTeam.id,cid:i.superTeam.getSuperTeamMembersByJoinTime,params:[{type:"long",name:"teamId"},{type:"long",name:"joinTime"},{type:"int",name:"limit"},{type:"bool",name:"reverse"}]},getSuperTeamMembersByAccounts:{sid:i.superTeam.id,cid:i.superTeam.getSuperTeamMembersByAccounts,params:[{type:"StrArray",name:"memberIds"}]},getMutedSuperTeamMembers:{sid:i.superTeam.id,cid:i.superTeam.getMutedSuperTeamMembers,params:[{type:"long",name:"teamId"},{type:"long",name:"joinTime"},{type:"int",name:"limit"},{type:"bool",name:"reverse"}]},sendSuperTeamCustomSysMsg:{sid:i.superTeam.id,cid:i.superTeam.sendSuperTeamCustomSysMsg,params:[{type:"Property",name:"sysMsg"}]},deleteSuperTeamMsg:{sid:i.superTeam.id,cid:i.superTeam.deleteSuperTeamMsg,params:[{type:"Property",name:"sysMsg"}]},getMySuperTeamMembers:{sid:i.superTeam.id,cid:i.superTeam.getMySuperTeamMembers,params:[{type:"LongArray",name:"teamIds"}]},createTeam:{sid:i.team.id,cid:i.team.createTeam,params:[{type:"Property",name:"team"},{type:"StrArray",name:"accounts"},{type:"String",name:"ps"}]},sendTeamMsg:{sid:i.team.id,cid:i.team.sendTeamMsg,params:[{type:"Property",name:"msg"}]},addTeamMembers:{sid:i.team.id,cid:i.team.addTeamMembers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"},{type:"String",name:"ps"},{type:"String",name:"attach"}]},removeTeamMembers:{sid:i.team.id,cid:i.team.removeTeamMembers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},updateTeam:{sid:i.team.id,cid:i.team.updateTeam,params:[{type:"Property",name:"team"}]},leaveTeam:{sid:i.team.id,cid:i.team.leaveTeam,params:[{type:"long",name:"teamId"}]},getTeam:{sid:i.team.id,cid:i.team.getTeam,params:[{type:"long",name:"teamId"}]},getTeams:{sid:i.team.id,cid:i.team.getTeams,params:[{type:"long",name:"timetag"}]},getTeamsById:{sid:i.team.id,cid:i.team.getTeamsById,params:[{type:"longArray",name:"teamIds"}]},getTeamMembers:{sid:i.team.id,cid:i.team.getTeamMembers,params:[{type:"long",name:"teamId"},{type:"long",name:"timetag"}]},dismissTeam:{sid:i.team.id,cid:i.team.dismissTeam,params:[{type:"long",name:"teamId"}]},applyTeam:{sid:i.team.id,cid:i.team.applyTeam,params:[{type:"long",name:"teamId"},{type:"String",name:"ps"}]},passTeamApply:{sid:i.team.id,cid:i.team.passTeamApply,params:[{type:"long",name:"teamId"},{type:"String",name:"from"}]},rejectTeamApply:{sid:i.team.id,cid:i.team.rejectTeamApply,params:[{type:"long",name:"teamId"},{type:"String",name:"from"},{type:"String",name:"ps"}]},addTeamManagers:{sid:i.team.id,cid:i.team.addTeamManagers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},removeTeamManagers:{sid:i.team.id,cid:i.team.removeTeamManagers,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},transferTeam:{sid:i.team.id,cid:i.team.transferTeam,params:[{type:"long",name:"teamId"},{type:"String",name:"account"},{type:"bool",name:"leave"}]},updateInfoInTeam:{sid:i.team.id,cid:i.team.updateInfoInTeam,params:[{type:"Property",name:"teamMember"}]},updateNickInTeam:{sid:i.team.id,cid:i.team.updateNickInTeam,params:[{type:"Property",name:"teamMember"}]},acceptTeamInvite:{sid:i.team.id,cid:i.team.acceptTeamInvite,params:[{type:"long",name:"teamId"},{type:"String",name:"from"}]},rejectTeamInvite:{sid:i.team.id,cid:i.team.rejectTeamInvite,params:[{type:"long",name:"teamId"},{type:"String",name:"from"},{type:"String",name:"ps"}]},getTeamHistoryMsgs:{sid:i.team.id,cid:i.team.getTeamHistoryMsgs,params:[{type:"long",name:"to"},{type:"long",name:"beginTime"},{type:"long",name:"endTime"},{type:"long",name:"lastMsgId"},{type:"int",name:"limit"},{type:"bool",name:"reverse"},{type:"LongArray",name:"msgTypes"}]},searchTeamHistoryMsgs:{sid:i.team.id,cid:i.team.searchTeamHistoryMsgs,params:[{type:"long",name:"to"},{type:"long",name:"beginTime"},{type:"long",name:"endTime"},{type:"String",name:"keyword"},{type:"int",name:"limit"},{type:"bool",name:"reverse"}]},updateMuteStateInTeam:{sid:i.team.id,cid:i.team.updateMuteStateInTeam,params:[{type:"long",name:"teamId"},{type:"String",name:"account"},{type:"int",name:"mute"}]},getMyTeamMembers:{sid:i.team.id,cid:i.team.getMyTeamMembers,params:[{type:"LongArray",name:"teamIds"}]},getMutedTeamMembers:{sid:i.team.id,cid:i.team.getMutedTeamMembers,params:[{type:"long",name:"teamId"}]},sendTeamMsgReceipt:{sid:i.team.id,cid:i.team.sendTeamMsgReceipt,params:[{type:"PropertyArray",name:"teamMsgReceipts",entity:"teamMsgReceipt"}]},getTeamMsgReads:{sid:i.team.id,cid:i.team.getTeamMsgReads,params:[{type:"PropertyArray",name:"teamMsgReceipts",entity:"teamMsgReceipt"}]},getTeamMsgReadAccounts:{sid:i.team.id,cid:i.team.getTeamMsgReadAccounts,params:[{type:"Property",name:"teamMsgReceipt"}]},muteTeamAll:{sid:i.team.id,cid:i.team.muteTeamAll,params:[{type:"long",name:"teamId"},{type:"int",name:"mute"}]},getTeamMemberInvitorAccid:{sid:i.team.id,cid:i.team.getTeamMemberInvitorAccid,params:[{type:"long",name:"teamId"},{type:"StrArray",name:"accounts"}]},friendRequest:{sid:i.friend.id,cid:i.friend.friendRequest,params:[{type:"String",name:"account"},{type:"byte",name:"type"},{type:"String",name:"ps"}]},deleteFriend:{sid:i.friend.id,cid:i.friend.deleteFriend,params:[{type:"String",name:"account"},{type:"Property",name:"delFriendParams"}]},updateFriend:{sid:i.friend.id,cid:i.friend.updateFriend,params:[{type:"Property",name:"friend"}]},getFriends:{sid:i.friend.id,cid:i.friend.getFriends,params:[{type:"long",name:"timetag"}]},getChatroomAddress:{sid:i.chatroom.id,cid:i.chatroom.getChatroomAddress,params:[{type:"long",name:"chatroomId"},{type:"bool",name:"isWeixinApp"},{type:"number",name:"type"}]},sendFilterMsg:{sid:i.filter.id,cid:i.filter.sendFilterMsg,params:[{type:"Property",name:"msg"}]},sendFilterCustomSysMsg:{sid:i.filter.id,cid:i.filter.sendFilterCustomSysMsg,params:[{type:"Property",name:"sysMsg"}]},publishEvent:{sid:i.eventService.id,cid:i.eventService.publishEvent,params:[{type:"Property",name:"msgEvent"}]},pushEvent:{sid:i.eventService.id,cid:i.eventService.pushEvent},subscribeEvent:{sid:i.eventService.id,cid:i.eventService.subscribeEvent,params:[{type:"Property",name:"msgEventSubscribe"},{type:"StrArray",name:"accounts"}]},unSubscribeEventsByAccounts:{sid:i.eventService.id,cid:i.eventService.unSubscribeEventsByAccounts,params:[{type:"Property",name:"msgEventSubscribe"},{type:"StrArray",name:"accounts"}]},unSubscribeEventsByType:{sid:i.eventService.id,cid:i.eventService.unSubscribeEventsByType,params:[{type:"Property",name:"msgEventSubscribe"}]},querySubscribeEventsByAccounts:{sid:i.eventService.id,cid:i.eventService.querySubscribeEventsByAccounts,params:[{type:"Property",name:"msgEventSubscribe"},{type:"StrArray",name:"accounts"}]},querySubscribeEventsByType:{sid:i.eventService.id,cid:i.eventService.querySubscribeEventsByType,params:[{type:"Property",name:"msgEventSubscribe"}]},pushEvents:{sid:i.eventService.id,cid:i.eventService.pushEvents},getThreadMsgs:{sid:i.msgExtend.id,cid:i.msgExtend.getThreadMsgs,params:[{type:"Property",name:"msg"},{type:"Property",name:"threadMsgReq"}]},getMsgsByIdServer:{sid:i.msgExtend.id,cid:i.msgExtend.getMsgsByIdServer,params:[{type:"PropertyArray",name:"reqMsgs",entity:"msg"}]},addQuickComment:{sid:i.msgExtend.id,cid:i.msgExtend.addQuickComment,params:[{type:"Property",name:"msg"},{type:"Property",name:"comment"}]},deleteQuickComment:{sid:i.msgExtend.id,cid:i.msgExtend.deleteQuickComment,params:[{type:"Property",name:"msg"},{type:"Property",name:"comment"}]},getQuickComments:{sid:i.msgExtend.id,cid:i.msgExtend.getQuickComments,params:[{type:"PropertyArray",name:"commentReq",entity:"commentReq"}]},addCollect:{sid:i.msgExtend.id,cid:i.msgExtend.addCollect,params:[{type:"Property",name:"collect"}]},deleteCollects:{sid:i.msgExtend.id,cid:i.msgExtend.deleteCollects,params:[{type:"PropertyArray",name:"collectList",entity:"collect"}]},updateCollect:{sid:i.msgExtend.id,cid:i.msgExtend.updateCollect,params:[{type:"Property",name:"collect"}]},getCollects:{sid:i.msgExtend.id,cid:i.msgExtend.getCollects,params:[{type:"Property",name:"collectQuery"}]},addStickTopSession:{sid:i.msgExtend.id,cid:i.msgExtend.addStickTopSession,params:[{type:"Property",name:"stickTopSession"}]},updateStickTopSession:{sid:i.msgExtend.id,cid:i.msgExtend.updateStickTopSession,params:[{type:"Property",name:"stickTopSession"}]},deleteStickTopSession:{sid:i.msgExtend.id,cid:i.msgExtend.deleteStickTopSession,params:[{type:"Property",name:"stickTopSession"}]},addMsgPin:{sid:i.msgExtend.id,cid:i.msgExtend.addMsgPin,params:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"}]},updateMsgPin:{sid:i.msgExtend.id,cid:i.msgExtend.updateMsgPin,params:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"}]},deleteMsgPin:{sid:i.msgExtend.id,cid:i.msgExtend.deleteMsgPin,params:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"}]},getMsgPins:{sid:i.msgExtend.id,cid:i.msgExtend.getMsgPins,params:[{type:"Property",name:"msgPinReq"}]},httpProxy:{sid:i.proxyService.id,cid:i.proxyService.httpProxy,params:[{type:"Property",name:"proxyTag"}]}}),a=r.merge({},s.packetConfig,{"2_3":{service:"auth",cmd:"login",response:[{type:"Property",name:"loginRes"},{type:"PropertyArray",name:"loginPorts",entity:"loginPort"},{type:"Property",name:"aosPushInfo"}]},"2_5":{service:"auth",cmd:"kicked",response:[{type:"Number",name:"from"},{type:"Number",name:"reason"},{type:"String",name:"custom"},{type:"Number",name:"customClientType"}]},"2_6":{service:"auth",cmd:"logout"},"2_7":{service:"auth",cmd:"multiPortLogin",response:[{type:"Number",name:"state"},{type:"PropertyArray",name:"loginPorts",entity:"loginPort"}]},"2_8":{service:"auth",cmd:"kick",response:[{type:"StrArray",name:"deviceIds"}]},"3_1":{service:"user",cmd:"updatePushToken"},"3_2":{service:"user",cmd:"appBackground"},"3_3":{service:"user",cmd:"markInBlacklist"},"3_103":{service:"user",cmd:"syncMarkInBlacklist",response:[{type:"String",name:"account"},{type:"Boolean",name:"isAdd"}]},"3_4":{service:"user",cmd:"getBlacklist",response:[{type:"StrArray",name:"blacklist"}]},"3_5":{service:"user",cmd:"markInMutelist"},"3_105":{service:"user",cmd:"syncMarkInMutelist",response:[{type:"String",name:"account"},{type:"Boolean",name:"isAdd"}]},"3_6":{service:"user",cmd:"getMutelist",response:[{type:"StrArray",name:"mutelist"}]},"3_8":{service:"user",cmd:"getRelations",response:[{type:"PropertyArray",name:"specialRelations",entity:"specialRelation"},{type:"Number",name:"timetag"}]},"3_7":{service:"user",cmd:"getUsers",response:[{type:"PropertyArray",name:"users",entity:"user"}]},"3_10":{service:"user",cmd:"updateMyInfo",response:[{type:"Number",name:"timetag"}]},"3_15":{service:"user",cmd:"updateDonnop",response:[{type:"Number",name:"timetag"}]},"3_115":{service:"user",cmd:"syncUpdateDonnop",response:[{type:"Property",name:"donnop"},{type:"Number",name:"timetag"}]},"3_109":{service:"user",cmd:"syncMyInfo",response:[{type:"Property",name:"user"},{type:"Number",name:"timetag"}]},"3_110":{service:"user",cmd:"syncUpdateMyInfo",response:[{type:"Property",name:"user"}]},"4_1":{service:"notify"},"4_2":{service:"notify"},"4_3":{service:"notify",cmd:"markRead"},"4_4":{service:"notify",cmd:"syncOfflineMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"4_5":{service:"notify",cmd:"batchMarkRead"},"4_6":{service:"notify",cmd:"syncOfflineSysMsgs",response:[{type:"PropertyArray",name:"sysMsgs",entity:"sysMsg"}]},"4_8":{service:"notify",cmd:"syncOfflineNetcallMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"4_9":{service:"notify",cmd:"syncRoamingMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"4_12":{service:"notify",cmd:"syncMsgReceipts",response:[{type:"PropertyArray",name:"msgReceipts",entity:"msgReceipt"},{type:"Number",name:"timetag"}]},"4_13":{service:"notify",cmd:"syncDonnop",response:[{type:"Property",name:"donnop"},{type:"Number",name:"timetag"}]},"4_14":{service:"notify",cmd:"syncSessionAck",response:[{type:"StrLongMap",name:"p2p"},{type:"LongLongMap",name:"team"},{type:"Number",name:"timetag"}]},"4_15":{service:"notify",cmd:"syncRobots",response:[{type:"PropertyArray",name:"robots",entity:"robot"}]},"4_16":{service:"notify",cmd:"syncBroadcastMsgs",response:[{type:"PropertyArray",name:"broadcastMsgs",entity:"broadcastMsg"}]},"4_17":{service:"notify",cmd:"syncSuperTeamRoamingMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"4_18":{service:"notify",cmd:"syncOfflineSuperTeamSysMsgs",response:[{type:"PropertyArray",name:"sysMsgs",entity:"sysMsg"}]},"4_19":{service:"notify",cmd:"syncDeleteSuperTeamMsgOfflineRoaming",response:[{type:"PropertyArray",name:"sysMsgs",entity:"sysMsg"},{type:"Number",name:"timetag"},{type:"Number",name:"type"}]},"4_20":{service:"notify",cmd:"syncSuperTeamSessionAck",response:[{type:"LongLongMap",name:"superTeam"},{type:"Number",name:"timetag"}]},"4_21":{service:"notify",cmd:"syncDeleteMsgSelf",response:[{type:"PropertyArray",name:"deletedMsgs",entity:"deleteMsgSelfTag"}]},"4_22":{service:"notify",cmd:"syncSessionsWithMoreRoaming",response:[{type:"PropertyArray",name:"sessions",entity:"msg"}]},"4_23":{service:"notify",cmd:"syncStickTopSessions",response:[{type:"Number",name:"timetag"},{type:"boolean",name:"modify"},{type:"PropertyArray",name:"sessions",entity:"stickTopSession"}]},"4_24":{service:"notify",cmd:"syncSessionHistoryMsgsDelete",response:[{type:"PropertyArray",name:"sessionHistoryMsgsDeleteTags",entity:"clearMsgsParamsWithSync"}]},"4_100":{service:"notify",cmd:"syncOfflineFilterMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"4_101":{service:"notify",cmd:"syncOfflineFilterSysMsgs",response:[{type:"PropertyArray",name:"sysMsgs",entity:"sysMsg"}]},"5_1":{service:"sync",cmd:"syncDone",response:[{type:"Number",name:"timetag"}]},"5_2":{service:"sync",cmd:"syncTeamMembersDone",response:[{type:"Number",name:"timetag"}]},"5_3":{service:"sync",cmd:"syncSuperTeamMembersDone",response:[{type:"Number",name:"timetag"}]},"7_1":{service:"msg",cmd:"sendMsg",response:[{type:"Property",name:"msg"}],trivialErrorCodes:[7101]},"7_2":{service:"msg",cmd:"msg",response:[{type:"Property",name:"msg"}]},"7_3":{service:"msg",cmd:"sysMsg",response:[{type:"Property",name:"sysMsg"}]},"7_6":{service:"msg",cmd:"getHistoryMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"7_7":{service:"msg",cmd:"sendCustomSysMsg",trivialErrorCodes:[7101]},"7_8":{service:"msg",cmd:"searchHistoryMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"7_9":{service:"msg",cmd:"deleteSessions"},"7_10":{service:"msg",cmd:"getSessions",response:[{type:"StrArray",name:"sessions"}]},"7_101":{service:"msg",cmd:"syncSendMsg",response:[{type:"Property",name:"msg"}]},"7_11":{service:"msg",cmd:"sendMsgReceipt",response:[{type:"Property",name:"msgReceipt"}]},"7_12":{service:"msg",cmd:"msgReceipt",response:[{type:"Property",name:"msgReceipt"}]},"7_13":{service:"msg",cmd:"onDeleteMsg"},"7_14":{service:"msg",cmd:"onMsgDeleted",response:[{type:"Property",name:"sysMsg"}]},"7_15":{service:"msg",cmd:"onDeleteMsgOfflineRoaming",response:[{type:"PropertyArray",name:"sysMsgs",entity:"sysMsg"},{type:"Number",name:"timetag"},{type:"Number",name:"type"}]},"7_16":{service:"msg",cmd:"onMarkSessionAck"},"7_17":{service:"msg",cmd:"broadcastMsg",response:[{type:"Property",name:"broadcastMsg"}]},"7_18":{service:"msg",cmd:"clearServerHistoryMsgs",response:[{type:"Long",name:"timetag"}]},"7_19":{service:"session",cmd:"getServerSessions",response:[{type:"Property",name:"sessionReqTag"},{type:"PropertyArray",name:"sessionList",entity:"session"}]},"7_20":{service:"session",cmd:"getServerSession",response:[{type:"Property",name:"session"}]},"7_21":{service:"session",cmd:"updateServerSession"},"7_22":{service:"session",cmd:"deleteServerSessions"},"7_23":{service:"msg",cmd:"deleteMsgSelf",response:[{type:"Long",name:"timetag"}]},"7_24":{service:"msg",cmd:"deleteMsgSelfBatch",response:[{type:"Long",name:"timetag"}]},"7_25":{service:"msg",cmd:"onMarkSessionAckBatch"},"7_118":{service:"msg",cmd:"onClearServerHistoryMsgs",response:[{type:"Property",name:"sessionHistoryMsgsDeleteTag",entity:"clearMsgsParamsWithSync"}]},"7_123":{service:"msg",cmd:"onDeleteMsgSelf",response:[{type:"Property",name:"deleteMsgSelfTag"}]},"7_124":{service:"msg",cmd:"onDeleteMsgSelfBatch",response:[{type:"PropertyArray",name:"deleteMsgSelfTags",entity:"deleteMsgSelfTag"}]},"7_116":{service:"msg",cmd:"syncMarkSessionAck",response:[{type:"Number",name:"scene"},{type:"String",name:"to"},{type:"Number",name:"timetag"}]},"7_121":{service:"msg",cmd:"syncUpdateServerSession",response:[{type:"Property",name:"session"}]},"23_1":{service:"msgExtend",cmd:"getThreadMsgs",response:[{type:"Property",name:"threadMsg",entity:"msg"},{type:"Property",name:"threadMsgsMeta"},{type:"PropertyArray",name:"msgs",entity:"msg"}]},"23_2":{service:"msgExtend",cmd:"getMsgsByIdServer",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"23_3":{service:"msgExtend",cmd:"addQuickComment",response:[{type:"Number",name:"timetag"}]},"23_4":{service:"msgExtend",cmd:"deleteQuickComment",response:[{type:"Number",name:"timetag"}]},"23_5":{service:"msgExtend",cmd:"onQuickComment",response:[{type:"Property",name:"msg"},{type:"Property",name:"comment"}]},"23_6":{service:"msgExtend",cmd:"onDeleteQuickComment",response:[{type:"Property",name:"msg"},{type:"Property",name:"comment"}]},"23_7":{service:"msgExtend",cmd:"getQuickComments",response:[{type:"PropertyArray",name:"commentRes",entity:"commentRes"}]},"23_8":{service:"msgExtend",cmd:"addCollect",response:[{type:"Property",name:"collect"}]},"23_9":{service:"msgExtend",cmd:"deleteCollects",response:[{type:"Number",name:"deleteNum"}]},"23_10":{service:"msgExtend",cmd:"updateCollect",response:[{type:"Property",name:"collect"}]},"23_11":{service:"msgExtend",cmd:"getCollects",response:[{type:"Number",name:"total"},{type:"PropertyArray",name:"collectList",entity:"collect"}]},"23_12":{service:"msgExtend",cmd:"addStickTopSession",response:[{type:"Property",name:"stickTopSession"}]},"23_13":{service:"msgExtend",cmd:"deleteStickTopSession",response:[{type:"Number",name:"timetag"}]},"23_14":{service:"msgExtend",cmd:"updateStickTopSession",response:[{type:"Property",name:"stickTopSession"}]},"23_15":{service:"msgExtend",cmd:"addMsgPin",response:[{type:"Number",name:"timetag"}]},"23_16":{service:"msgExtend",cmd:"updateMsgPin",response:[{type:"Number",name:"timetag"}]},"23_17":{service:"msgExtend",cmd:"deleteMsgPin",response:[{type:"Number",name:"timetag"}]},"23_18":{service:"msgExtend",cmd:"onAddMsgPin",response:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"},{type:"Number",name:"timetag"}]},"23_19":{service:"msgExtend",cmd:"onUpdateMsgPin",response:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"},{type:"Number",name:"timetag"}]},"23_20":{service:"msgExtend",cmd:"onDeleteMsgPin",response:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"},{type:"Number",name:"timetag"}]},"23_21":{service:"msgExtend",cmd:"getMsgPins",response:[{type:"Number",name:"timetag"},{type:"Boolean",name:"modify"},{type:"PropertyArray",name:"pins",entity:"msgPinRes"}]},"23_103":{service:"msgExtend",cmd:"syncAddQuickComment",response:[{type:"Property",name:"msg"},{type:"Property",name:"comment"}]},"23_104":{service:"msgExtend",cmd:"syncDeleteQuickComment",response:[{type:"Property",name:"msg"},{type:"Property",name:"comment"}]},"23_112":{service:"msgExtend",cmd:"syncAddStickTopSession",response:[{type:"Property",name:"stickTopSession"}]},"23_113":{service:"msgExtend",cmd:"syncDeleteStickTopSession",response:[{type:"Number",name:"timetag"},{type:"Property",name:"stickTopSession"}]},"23_114":{service:"msgExtend",cmd:"syncUpdateStickTopSession",response:[{type:"Property",name:"stickTopSession"}]},"23_115":{service:"msgExtend",cmd:"syncAddMsgPin",response:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"},{type:"Number",name:"timetag"}]},"23_116":{service:"msgExtend",cmd:"syncUpdateMsgPin",response:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"},{type:"Number",name:"timetag"}]},"23_117":{service:"msgExtend",cmd:"syncDeleteMsgPin",response:[{type:"Property",name:"msg"},{type:"Property",name:"pinTag"},{type:"Number",name:"timetag"}]},"21_2":{service:"superTeam",cmd:"sendSuperTeamMsg",response:[{type:"Property",name:"msg"}]},"21_3":{service:"superTeam",cmd:"superTeamMsg",response:[{type:"Property",name:"msg"}]},"21_5":{service:"superTeam",cmd:"addSuperTeamMembers",response:[{type:"StrArray",name:"abortedAccidList"},{type:"long",name:"timetag"}]},"21_6":{service:"superTeam",cmd:"removeSuperTeamMembers"},"21_7":{service:"superTeam",cmd:"leaveSuperTeam"},"21_8":{service:"superTeam",cmd:"updateSuperTeam",response:[{type:"long",name:"teamId"},{type:"long",name:"timetag"}]},"21_9":{service:"superTeam",cmd:"getSuperTeam",response:[{type:"Property",name:"team"}]},"21_12":{service:"superTeam",cmd:"getSuperTeams",response:[{type:"PropertyArray",name:"teams",entity:"superTeam"},{type:"bool",name:"isAll"},{type:"long",name:"timetag"}]},"21_10":{service:"superTeam",cmd:"updateInfoInSuperTeam"},"21_13":{service:"superTeam",cmd:"getSuperTeamMembers",response:[{type:"long",name:"timetag"}]},"21_11":{service:"superTeam",cmd:"getMySuperTeamMembers",response:[{type:"PropertyArray",name:"members",entity:"superTeamMember"}]},"21_14":{service:"superTeam",cmd:"getSuperTeamHistoryMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"21_15":{service:"superTeam",cmd:"getSuperTeamMembersByJoinTime",response:[{type:"PropertyArray",name:"members",entity:"superTeamMember"}]},"21_16":{service:"superTeam",cmd:"sendSuperTeamCustomSysMsg",trivialErrorCodes:[7101]},"21_17":{service:"superTeam",cmd:"onDeleteSuperTeamMsg"},"21_18":{service:"superTeam",cmd:"onSuperTeamMsgDelete",response:[{type:"Property",name:"sysMsg"}]},"21_19":{service:"superTeam",cmd:"superTeamCustomSysMsg",response:[{type:"Property",name:"sysMsg"}]},"21_20":{service:"superTeam",cmd:"applySuperTeam",response:[{type:"Property",name:"team"}]},"21_21":{service:"superTeam",cmd:"passSuperTeamApply"},"21_22":{service:"superTeam",cmd:"rejectSuperTeamApply"},"21_23":{service:"superTeam",cmd:"acceptSuperTeamInvite",response:[{type:"Property",name:"team"}]},"21_24":{service:"superTeam",cmd:"rejectSuperTeamInvite"},"21_25":{service:"superTeam",cmd:"onMarkSuperTeamSessionAck"},"21_26":{service:"superTeam",cmd:"addSuperTeamManagers"},"21_27":{service:"superTeam",cmd:"removeSuperTeamManagers"},"21_28":{service:"superTeam",cmd:"updateSuperTeamMute"},"21_29":{service:"superTeam",cmd:"updateSuperTeamMembersMute",response:[{type:"long",name:"timetag"}]},"21_30":{service:"superTeam",cmd:"updateNickInSuperTeam"},"21_31":{service:"superTeam",cmd:"transferSuperTeam"},"21_32":{service:"superTeam",cmd:"onMarkSuperTeamSessionsAck"},"21_33":{service:"superTeam",cmd:"getSuperTeamMembersByAccounts",response:[{type:"PropertyArray",name:"members",entity:"superTeamMember"}]},"21_34":{service:"superTeam",cmd:"getMutedSuperTeamMembers",response:[{type:"PropertyArray",name:"members",entity:"superTeamMember"}]},"21_113":{service:"superTeam",cmd:"syncSuperTeamMembers",response:[{type:"Number",name:"teamId"},{type:"PropertyArray",name:"members",entity:"superTeamMember"},{type:"bool",name:"isAll"},{type:"long",name:"timetag"}]},"21_111":{service:"superTeam",cmd:"syncMySuperTeamMembers",response:[{type:"PropertyArray",name:"teamMembers",entity:"superTeamMember"},{type:"long",name:"timetag"}]},"21_109":{service:"superTeam",cmd:"syncSuperTeams",response:[{type:"PropertyArray",name:"teams",entity:"superTeam"},{type:"bool",name:"isAll"},{type:"long",name:"timetag"}]},"21_101":{service:"superTeam",cmd:"syncCreateSuperTeam",response:[{type:"Property",name:"team"}]},"21_102":{service:"superTeam",cmd:"syncSendSuperTeamMsg",response:[{type:"Property",name:"msg"}]},"21_110":{service:"superTeam",cmd:"syncUpdateSuperTeamMember",response:[{type:"Property",name:"teamMember",entity:"superTeamMember"}]},"21_117":{service:"superTeam",cmd:"syncDeleteSuperTeamMsg",response:[{type:"Property",name:"sysMsg"}]},"21_125":{service:"superTeam",cmd:"syncMarkSuperTeamSessionAck",response:[{type:"Long",name:"to"},{type:"Long",name:"timetag"}]},"8_1":{service:"team",cmd:"createTeam",response:[{type:"Property",name:"team"},{type:"StrArray",name:"abortedAccidList"}]},"8_2":{service:"team",cmd:"sendTeamMsg",response:[{type:"Property",name:"msg"}]},"8_3":{service:"team",cmd:"teamMsg",response:[{type:"Property",name:"msg"}]},"8_4":{service:"team",cmd:"teamMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"8_5":{service:"team",cmd:"addTeamMembers",response:[{type:"long",name:"time"},{type:"StrArray",name:"abortedAccidList"}]},"8_6":{service:"team",cmd:"removeTeamMembers"},"8_7":{service:"team",cmd:"updateTeam",response:[{type:"Number",name:"id"},{type:"Number",name:"time"}]},"8_8":{service:"team",cmd:"leaveTeam"},"8_9":{service:"team",cmd:"getTeam",response:[{type:"Property",name:"team"}]},"8_10":{service:"team",cmd:"getTeams",response:[{type:"PropertyArray",name:"teams",entity:"team"},{type:"Number",name:"timetag"}]},"8_11":{service:"team",cmd:"getTeamMembers",response:[{type:"Number",name:"teamId"},{type:"PropertyArray",name:"members",entity:"teamMember"},{type:"Number",name:"timetag"}]},"8_12":{service:"team",cmd:"dismissTeam"},"8_13":{service:"team",cmd:"applyTeam",response:[{type:"Property",name:"team"}]},"8_14":{service:"team",cmd:"passTeamApply"},"8_15":{service:"team",cmd:"rejectTeamApply"},"8_16":{service:"team",cmd:"addTeamManagers"},"8_17":{service:"team",cmd:"removeTeamManagers"},"8_18":{service:"team",cmd:"transferTeam"},"8_19":{service:"team",cmd:"updateInfoInTeam"},"8_20":{service:"team",cmd:"updateNickInTeam"},"8_21":{service:"team",cmd:"acceptTeamInvite",response:[{type:"Property",name:"team"}]},"8_22":{service:"team",cmd:"rejectTeamInvite"},"8_23":{service:"team",cmd:"getTeamHistoryMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"8_24":{service:"team",cmd:"searchTeamHistoryMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"8_25":{service:"team",cmd:"updateMuteStateInTeam"},"8_26":{service:"team",cmd:"getMyTeamMembers",response:[{type:"PropertyArray",name:"teamMembers",entity:"teamMember"}]},"8_27":{service:"team",cmd:"getMutedTeamMembers",response:[{type:"Number",name:"teamId"},{type:"PropertyArray",name:"teamMembers",entity:"teamMember"}]},"8_28":{service:"team",cmd:"sendTeamMsgReceipt",response:[{type:"PropertyArray",name:"teamMsgReceipts",entity:"teamMsgReceipt"}]},"8_29":{service:"team",cmd:"getTeamMsgReads",response:[{type:"PropertyArray",name:"teamMsgReceipts",entity:"teamMsgReceipt"}]},"8_30":{service:"team",cmd:"getTeamMsgReadAccounts",response:[{type:"Property",name:"teamMsgReceipt"},{type:"StrArray",name:"readAccounts"},{type:"StrArray",name:"unreadAccounts"}]},"8_31":{service:"team",cmd:"notifyTeamMsgReads",response:[{type:"PropertyArray",name:"teamMsgReceipts",entity:"teamMsgReceipt"}]},"8_32":{service:"team",cmd:"muteTeamAll",response:[]},"8_33":{service:"team",cmd:"getTeamMemberInvitorAccid",response:[{type:"object",name:"accountsMap"}]},"8_34":{service:"team",cmd:"getTeamsById",response:[{type:"PropertyArray",name:"teams",entity:"team"},{type:"StrArray",name:"tids"}],trivialErrorCodes:[816]},"8_126":{service:"team",cmd:"syncMyTeamMembers",response:[{type:"PropertyArray",name:"teamMembers",entity:"teamMember"},{type:"Number",name:"timetag"}]},"8_109":{service:"team",cmd:"syncTeams",response:[{type:"Number",name:"timetag"},{type:"PropertyArray",name:"teams",entity:"team"}]},"8_111":{service:"team",cmd:"syncTeamMembers",response:[{type:"Number",name:"teamId"},{type:"PropertyArray",name:"members",entity:"teamMember"},{type:"Number",name:"timetag"}]},"8_101":{service:"team",cmd:"syncCreateTeam",response:[{type:"Property",name:"team"}]},"8_102":{service:"team",cmd:"syncSendTeamMsg",response:[{type:"Property",name:"msg"}]},"8_119":{service:"team",cmd:"syncUpdateTeamMember",response:[{type:"Property",name:"teamMember"}]},"12_1":{service:"friend",cmd:"friendRequest"},"12_101":{service:"friend",cmd:"syncFriendRequest",response:[{type:"String",name:"account"},{type:"Number",name:"type"},{type:"String",name:"ps"}]},"12_2":{service:"friend",cmd:"deleteFriend"},"12_102":{service:"friend",cmd:"syncDeleteFriend",response:[{type:"String",name:"account"}]},"12_3":{service:"friend",cmd:"updateFriend"},"12_103":{service:"friend",cmd:"syncUpdateFriend",response:[{type:"Property",name:"friend"}]},"12_4":{service:"friend",cmd:"getFriends",response:[{type:"PropertyArray",name:"friends",entity:"friend"},{type:"Number",name:"timetag"}]},"12_5":{service:"friend",cmd:"syncFriends",response:[{type:"PropertyArray",name:"friends",entity:"friend"},{type:"Number",name:"timetag"}]},"12_6":{service:"friend",cmd:"syncFriendUsers",response:[{type:"PropertyArray",name:"users",entity:"user"},{type:"Number",name:"timetag"}]},"13_1":{service:"chatroom",cmd:"getChatroomAddress",response:[{type:"StrArray",name:"address"}]},"14_1":{service:"eventService",cmd:"publishEvent",response:[{type:"Property",name:"msgEvent"}]},"14_2":{service:"eventService",cmd:"pushEvent",response:[{type:"Property",name:"msgEvent"}]},"14_3":{service:"eventService",cmd:"subscribeEvent",response:[{type:"StrArray",name:"accounts"}]},"14_4":{service:"eventService",cmd:"unSubscribeEventsByAccounts",response:[{type:"StrArray",name:"accounts"}]},"14_5":{service:"eventService",cmd:"unSubscribeEventsByType"},"14_6":{service:"eventService",cmd:"querySubscribeEventsByAccounts",response:[{type:"PropertyArray",name:"msgEventSubscribes",entity:"msgEventSubscribe"}]},"14_7":{service:"eventService",cmd:"querySubscribeEventsByType",response:[{type:"PropertyArray",name:"msgEventSubscribes",entity:"msgEventSubscribe"}]},"14_9":{service:"eventService",cmd:"pushEvents",response:[{type:"PropertyArray",name:"msgEvents",entity:"msgEvent"}]},"22_1":{service:"proxyService",cmd:"httpProxy",response:[{type:"Property",name:"proxyTag"}]},"22_2":{service:"proxyService",cmd:"onProxyMsg",response:[{type:"Property",name:"proxyMsg",entity:"proxyMsgTag"}]},"101_1":{service:"filter",cmd:"sendFilterMsg",response:[{type:"Property",name:"msg"}]},"101_2":{service:"filter",cmd:"filterMsg",response:[{type:"Property",name:"msg"}]},"101_3":{service:"filter",cmd:"filterSysMsg",response:[{type:"Property",name:"sysMsg"}]},"101_7":{service:"filter",cmd:"sendFilterCustomSysMsg"}});e.exports={idMap:i,cmdConfig:o,packetConfig:a};},function(e,t,n){"use strict";var r=n(0).notundef;function s(e){r(e.shouldPushNotificationWhenPCOnline)&&(this.open=e.shouldPushNotificationWhenPCOnline?2:1);}s.getDefaultConfig=function(){return{shouldPushNotificationWhenPCOnline:!0};},s.reverse=function(e){return{shouldPushNotificationWhenPCOnline:1!=+e.open};},e.exports=s;},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function get(){return e.l;}}),Object.defineProperty(e,"id",{enumerable:!0,get:function get(){return e.i;}}),e.webpackPolyfill=1),e;};},function(e,t,n){"use strict";var r=n(0),s=r.notundef,i=r.fillPropertyWithDefault,o=Object.keys,a={},c={},u={},m=[],l={normal:0,advanced:1},d={0:"normal",1:"advanced"},p=a.joinMode={noVerify:0,needVerify:1,rejectAll:2};c.joinMode={0:"noVerify",1:"needVerify",2:"rejectAll"},u.joinMode=o(p),m.push("join");var f=a.beInviteMode={needVerify:0,noVerify:1};function g(e){r.verifyOptions(e,"action","superTeam::SuperTeam"),r.verifyOptions(e,"teamId","superTeam::SuperTeam"),s(e.teamId)&&(this.teamId=e.teamId),s(e.type)&&(this.type=l[e.type]),s(e.avatar)&&(this.avatar=""+e.avatar),s(e.name)&&(this.name=""+e.name),s(e.intro)&&(this.intro=""+e.intro),s(e.announcement)&&(this.announcement=""+e.announcement),s(e.custom)&&(this.custom=""+e.custom),m.forEach(this.setMode.bind(this,e));}c.beInviteMode={0:"needVerify",1:"noVerify"},m.push("beInvite"),u.beInviteMode=o(f),g.prototype.setMode=function(e,t){s(e[t+="Mode"])&&(r.verifyParamValid(t,e[t],u[t],"Superteam::Team"),this[t]=a[t][e[t]]);},g.reverse=function(e,t){var n=r.copy(e);if(s(n.teamId)&&(n.teamId=""+n.teamId),s(n.type)&&(n.type=d[n.type]),s(n.level)&&(n.level=+n.level),s(n.valid)&&(n.valid=1==+n.valid),s(n.memberNum)&&(n.memberNum=+n.memberNum),s(n.memberUpdateTime)&&(n.memberUpdateTime=+n.memberUpdateTime),s(n.createTime)&&(n.createTime=+n.createTime),s(n.updateTime)&&(n.updateTime=+n.updateTime),s(n.validToCurrentUser)&&(n.validToCurrentUser="1"===n.validToCurrentUser),s(n.mute)&&(n.mute="1"===n.mute),s(n.muteType))switch(n.muteType){case"0":n.mute=!1,n.muteType="none";break;case"1":n.mute=!0,n.muteType="normal";break;case"3":n.mute=!0,n.muteType="all";}else s(n.mute)&&(1===n.mute?(n.mute=!0,n.muteType="normal"):(n.mute=!1,n.muteType="none"));return m.forEach(function(e,t){s(e[t+="Mode"])&&(e[t]=c[t][e[t]]);}.bind(null,n)),delete n.bits,t||g.fillProperties(n),n;},g.fillProperties=function(e){return i(e,"avatar","");},e.exports=g;},function(e,t,n){"use strict";var r=n(3);"undefined"!=typeof window&&(window.console||r.isWeixinApp||(window.console={log:function log(){},info:function info(){},warn:function warn(){},error:function error(){}}));},function(e,t,n){var r=n(25);r(r.S+r.F*!n(17),"Object",{defineProperty:n(16).f});},function(e,t,n){n(154);var r=n(11).Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n);};},function(e,t,n){n(53)("observable");},function(e,t,n){n(53)("asyncIterator");},function(e,t,n){var r=n(27),s=n(89).f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return o&&"[object Window]"==i.call(e)?function(e){try{return s(e);}catch(e){return o.slice();}}(e):s(r(e));};},function(e,t,n){var r=n(48);e.exports=Array.isArray||function(e){return"Array"==r(e);};},function(e,t,n){var r=n(43),s=n(64),i=n(42);e.exports=function(e){var t=r(e),n=s.f;if(n)for(var o,a=n(e),c=i.f,u=0;a.length>u;){c.call(e,o=a[u++])&&t.push(o);}return t;};},function(e,t,n){var r=n(40)("meta"),s=n(24),i=n(18),o=n(16).f,a=0,c=Object.isExtensible||function(){return!0;},u=!n(34)(function(){return c(Object.preventExtensions({}));}),m=function m(e){o(e,r,{value:{i:"O"+ ++a,w:{}}});},l=e.exports={KEY:r,NEED:!1,fastKey:function fastKey(e,t){if(!s(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,r)){if(!c(e))return"F";if(!t)return"E";m(e);}return e[r].i;},getWeak:function getWeak(e,t){if(!i(e,r)){if(!c(e))return!0;if(!t)return!1;m(e);}return e[r].w;},onFreeze:function onFreeze(e){return u&&l.NEED&&c(e)&&!i(e,r)&&m(e),e;}};},function(e,t,n){"use strict";var r=n(7),s=n(18),i=n(17),o=n(25),a=n(92),c=n(161).KEY,u=n(34),m=n(56),l=n(47),d=n(40),p=n(9),f=n(54),g=n(53),h=n(160),y=n(159),v=n(19),b=n(24),T=n(27),S=n(58),M=n(38),k=n(75),P=n(158),C=n(128),I=n(16),x=n(43),w=C.f,_=I.f,O=P.f,_A=r.Symbol,E=r.JSON,j=E&&E.stringify,R=p("_hidden"),U=p("toPrimitive"),N={}.propertyIsEnumerable,D=m("symbol-registry"),L=m("symbols"),F=m("op-symbols"),B=Object.prototype,q="function"==typeof _A,H=r.QObject,W=!H||!H.prototype||!H.prototype.findChild,J=i&&u(function(){return 7!=k(_({},"a",{get:function get(){return _(this,"a",{value:7}).a;}})).a;})?function(e,t,n){var r=w(B,t);r&&delete B[t],_(e,t,n),r&&e!==B&&_(B,t,r);}:_,V=function V(e){var t=L[e]=k(_A.prototype);return t._k=e,t;},z=q&&"symbol"==typeof _A.iterator?function(e){return"symbol"==typeof e;}:function(e){return e instanceof _A;},Q=function Q(e,t,n){return e===B&&Q(F,t,n),v(e),t=S(t,!0),v(n),s(L,t)?(n.enumerable?(s(e,R)&&e[R][t]&&(e[R][t]=!1),n=k(n,{enumerable:M(0,!1)})):(s(e,R)||_(e,R,M(1,{})),e[R][t]=!0),J(e,t,n)):_(e,t,n);},G=function G(e,t){v(e);for(var n,r=h(t=T(t)),s=0,i=r.length;i>s;){Q(e,n=r[s++],t[n]);}return e;},X=function X(e){var t=N.call(this,e=S(e,!0));return!(this===B&&s(L,e)&&!s(F,e))&&(!(t||!s(this,e)||!s(L,e)||s(this,R)&&this[R][e])||t);},$=function $(e,t){if(e=T(e),t=S(t,!0),e!==B||!s(L,t)||s(F,t)){var n=w(e,t);return!n||!s(L,t)||s(e,R)&&e[R][t]||(n.enumerable=!0),n;}},K=function K(e){for(var t,n=O(T(e)),r=[],i=0;n.length>i;){s(L,t=n[i++])||t==R||t==c||r.push(t);}return r;},Y=function Y(e){for(var t,n=e===B,r=O(n?F:T(e)),i=[],o=0;r.length>o;){!s(L,t=r[o++])||n&&!s(B,t)||i.push(L[t]);}return i;};q||(a((_A=function A(){if(this instanceof _A)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function t(n){this===B&&t.call(F,n),s(this,R)&&s(this[R],e)&&(this[R][e]=!1),J(this,e,M(1,n));};return i&&W&&J(B,e,{configurable:!0,set:t}),V(e);}).prototype,"toString",function(){return this._k;}),C.f=$,I.f=Q,n(89).f=P.f=K,n(42).f=X,n(64).f=Y,i&&!n(49)&&a(B,"propertyIsEnumerable",X,!0),f.f=function(e){return V(p(e));}),o(o.G+o.W+o.F*!q,{Symbol:_A});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;Z.length>ee;){p(Z[ee++]);}for(var te=x(p.store),ne=0;te.length>ne;){g(te[ne++]);}o(o.S+o.F*!q,"Symbol",{for:function _for(e){return s(D,e+="")?D[e]:D[e]=_A(e);},keyFor:function keyFor(e){if(!z(e))throw TypeError(e+" is not a symbol!");for(var t in D){if(D[t]===e)return t;}},useSetter:function useSetter(){W=!0;},useSimple:function useSimple(){W=!1;}}),o(o.S+o.F*!q,"Object",{create:function create(e,t){return void 0===t?k(e):G(k(e),t);},defineProperty:Q,defineProperties:G,getOwnPropertyDescriptor:$,getOwnPropertyNames:K,getOwnPropertySymbols:Y}),E&&o(o.S+o.F*(!q||u(function(){var e=_A();return"[null]"!=j([e])||"{}"!=j({a:e})||"{}"!=j(Object(e));})),"JSON",{stringify:function stringify(e){for(var t,n,r=[e],s=1;arguments.length>s;){r.push(arguments[s++]);}if(n=t=r[1],(b(t)||void 0!==e)&&!z(e))return y(t)||(t=function t(e,_t3){if("function"==typeof n&&(_t3=n.call(this,e,_t3)),!z(_t3))return _t3;}),r[1]=t,j.apply(E,r);}}),_A.prototype[U]||n(21)(_A.prototype,U,_A.prototype.valueOf),l(_A,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0);},function(e,t,n){n(162),n(113),n(157),n(156),e.exports=n(11).Symbol;},function(e,t,n){e.exports={default:n(163),__esModule:!0};},function(e,t){e.exports=function(e,t){return{value:t,done:!!e};};},function(e,t){e.exports=function(){};},function(e,t,n){"use strict";var r=n(166),s=n(165),i=n(37),o=n(27);e.exports=n(94)(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t;},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,s(1)):s(0,"keys"==t?n:"values"==t?e[n]:[n,e[n]]);},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries");},function(e,t,n){var r=n(18),s=n(74),i=n(57)("IE_PROTO"),o=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=s(e),r(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null;};},function(e,t,n){var r=n(60),s=Math.max,i=Math.min;e.exports=function(e,t){return(e=r(e))<0?s(e+t,0):i(e,t);};},function(e,t,n){var r=n(27),s=n(90),i=n(169);e.exports=function(e){return function(t,n,o){var a,c=r(t),u=s(c.length),m=i(o,u);if(e&&n!=n){for(;u>m;){if((a=c[m++])!=a)return!0;}}else for(;u>m;m++){if((e||m in c)&&c[m]===n)return e||m||0;}return!e&&-1;};};},function(e,t,n){var r=n(16),s=n(19),i=n(43);e.exports=n(17)?Object.defineProperties:function(e,t){s(e);for(var n,o=i(t),a=o.length,c=0;a>c;){r.f(e,n=o[c++],t[n]);}return e;};},function(e,t,n){"use strict";var r=n(75),s=n(38),i=n(47),o={};n(21)(o,n(9)("iterator"),function(){return this;}),e.exports=function(e,t,n){e.prototype=r(o,{next:s(1,n)}),i(e,t+" Iterator");};},function(e,t,n){var r=n(60),s=n(59);e.exports=function(e){return function(t,n){var i,o,a=String(s(t)),c=r(n),u=a.length;return c<0||c>=u?e?"":void 0:(i=a.charCodeAt(c))<55296||i>56319||c+1===u||(o=a.charCodeAt(c+1))<56320||o>57343?e?a.charAt(c):i:e?a.slice(c,c+2):o-56320+(i-55296<<10)+65536;};};},function(e,t,n){n(61),n(71),e.exports=n(54).f("iterator");},function(e,t,n){e.exports={default:n(174),__esModule:!0};},function(e,t,n){"use strict";n(280);var r=n(3);r.lbsUrl=r.lbsUrl.replace("/webconf.jsp","/wxwebconf.jsp"),r.defaultReportUrl=null,r.isWeixinApp=!0;},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=n(22);e.exports=function(e){var t,n,s,i;e.db&&(r.db=e.db),e.rnfs&&(r.rnfs=e.rnfs,r.rnfs.size||(r.rnfs.size=1048576),r.rnfs.nimPromise=(t=r.rnfs,n=t.size/2-256,i=0,s=r.rnfs.DocumentDirectoryPath+"/nimlog_"+i+".log",t.exists(s).then(function(e){return e?t.stat(s):Promise.reject(0);}).then(function(e){return e&&e.size>n?Promise.reject(1):Promise.reject(0);}).catch(function(e){return"number"==typeof e?t.nimIndex=e:console.error("initRnfs::ERROR",e),Promise.resolve();})));};},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};function o(e){var t=this,n=e.url||null;t.level={debug:0,log:1,info:2,warn:3,error:4}[e.level]||0,t.logCache=[],t.logNum=1,t.timeInterval=5e3,window.onerror=function(e,n,r,s,i){t.error(i);},setInterval(function(){t.logCache.length>0&&n&&t.postLogs(n,t.logCache);},t.timeInterval);}o.prototype.debug=function(){this.level>0||(console.debug.apply(this,arguments),this.cacheLogs.apply(this,["[degbug]"].concat(arguments)));},o.prototype.log=function(){this.level>1||(console.log.apply(this,arguments),this.cacheLogs.apply(this,["[log]"].concat(arguments)));},o.prototype.info=function(){this.level>2||(console.info.apply(this,arguments),this.cacheLogs.apply(this,["[info]"].concat(arguments)));},o.prototype.warn=function(){this.level>3||(console.warn.apply(this,arguments),this.cacheLogs.apply(this,["[warn]"].concat(arguments)));},o.prototype.error=function(){this.level>4||(console.error.apply(this,arguments),this.cacheLogs.apply(this,["[error]"].concat(arguments)));},o.prototype.cacheLogs=function(e,t){for(var n=[],r=0;r<t.length;r++){var s=t[r];"object"===(void 0===s?"undefined":(0,i.default)(s))?n.push(JSON.stringify(s)):n.push(s);}var o=this.logNum++ +" "+e+" "+n.join("; ");this.logCache.push(o.replace("%c",""));},o.prototype.postLogs=function(e,t){var n=this,r=new XMLHttpRequest();r.onreadystatechange=function(){4===r.readyState&&(200===r.status?(console.info("LoggerPlugin::日志上报完成"),n.logCache=[],n.timeInterval=5e3):n.timeInterval+=5e3);},r.open("POST",e),r.setRequestHeader("Content-Type","plain/text;charset=utf-8"),r.timeout=360,r.send(t.join("\n"));},e.exports=o;},function(e,t,n){"use strict";var r={set:function set(e,t,n){r[e]=t,n&&(n.support=t);}};e.exports=r;},function(e,t){e.exports=function(){for(var e={},t=0;t<arguments.length;t++){var r=arguments[t];for(var s in r){n.call(r,s)&&(e[s]=r[s]);}}return e;};var n=Object.prototype.hasOwnProperty;},function(e,t,n){var r=n(115);e.exports=function(e,t,n){if(!r(t))throw new TypeError("iterator must be a function");arguments.length<3&&(n=this);"[object Array]"===s.call(e)?function(e,t,n){for(var r=0,s=e.length;r<s;r++){i.call(e,r)&&t.call(n,e[r],r,e);}}(e,t,n):"string"==typeof e?function(e,t,n){for(var r=0,s=e.length;r<s;r++){t.call(n,e.charAt(r),r,e);}}(e,t,n):function(e,t,n){for(var r in e){i.call(e,r)&&t.call(n,e[r],r,e);}}(e,t,n);};var s=Object.prototype.toString,i=Object.prototype.hasOwnProperty;},function(e,t){(t=e.exports=function(e){return e.replace(/^\s*|\s*$/g,"");}).left=function(e){return e.replace(/^\s*/,"");},t.right=function(e){return e.replace(/\s*$/,"");};},function(e,t,n){var r=n(223),s=n(222);e.exports=function(e){if(!e)return{};var t={};return s(r(e).split("\n"),function(e){var n,s=e.indexOf(":"),i=r(e.slice(0,s)).toLowerCase(),o=r(e.slice(s+1));void 0===t[i]?t[i]=o:(n=t[i],"[object Array]"===Object.prototype.toString.call(n)?t[i].push(o):t[i]=[t[i],o]);}),t;};},function(e,t,n){(function(t){var n;n="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},e.exports=n;}).call(this,n(13));},function(e,t,n){"use strict";var r=n(225),s=n(115),i=n(224),o=n(221);function a(e,t,n){var r=e;return s(t)?(n=t,"string"==typeof e&&(r={uri:e})):r=o(t,{uri:e}),r.callback=n,r;}function c(e,t,n){return u(t=a(e,t,n));}function u(e){if(void 0===e.callback)throw new Error("callback argument missing");var t=!1,n=function n(_n,r,s){t||(t=!0,e.callback(_n,r,s));};function r(e){return clearTimeout(m),e instanceof Error||(e=new Error(""+(e||"Unknown XMLHttpRequest Error"))),e.statusCode=0,n(e,y);}function s(){if(!a){var t;clearTimeout(m),t=e.useXDR&&void 0===u.status?200:1223===u.status?204:u.status;var r=y,s=null;return 0!==t?(r={body:function(){var e=void 0;if(e=u.response?u.response:u.responseText||function(e){try{if("document"===e.responseType)return e.responseXML;var t=e.responseXML&&"parsererror"===e.responseXML.documentElement.nodeName;if(""===e.responseType&&!t)return e.responseXML;}catch(e){}return null;}(u),h)try{e=JSON.parse(e);}catch(e){}return e;}(),statusCode:t,method:d,headers:{},url:l,rawRequest:u},u.getAllResponseHeaders&&(r.headers=i(u.getAllResponseHeaders()))):s=new Error("Internal XMLHttpRequest Error"),n(s,r,r.body);}}var o,a,u=e.xhr||null;u||(u=e.cors||e.useXDR?new c.XDomainRequest():new c.XMLHttpRequest());var m,l=u.url=e.uri||e.url,d=u.method=e.method||"GET",p=e.body||e.data,f=u.headers=e.headers||{},g=!!e.sync,h=!1,y={body:void 0,headers:{},statusCode:0,method:d,url:l,rawRequest:u};if("json"in e&&!1!==e.json&&(h=!0,f.accept||f.Accept||(f.Accept="application/json"),"GET"!==d&&"HEAD"!==d&&(f["content-type"]||f["Content-Type"]||(f["Content-Type"]="application/json"),p=JSON.stringify(!0===e.json?p:e.json))),u.onreadystatechange=function(){4===u.readyState&&setTimeout(s,0);},u.onload=s,u.onerror=r,u.onprogress=function(){},u.onabort=function(){a=!0;},u.ontimeout=r,u.open(d,l,!g,e.username,e.password),g||(u.withCredentials=!!e.withCredentials),!g&&e.timeout>0&&(m=setTimeout(function(){if(!a){a=!0,u.abort("timeout");var e=new Error("XMLHttpRequest timeout");e.code="ETIMEDOUT",r(e);}},e.timeout)),u.setRequestHeader)for(o in f){f.hasOwnProperty(o)&&u.setRequestHeader(o,f[o]);}else if(e.headers&&!function(e){for(var t in e){if(e.hasOwnProperty(t))return!1;}return!0;}(e.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in e&&(u.responseType=e.responseType),"beforeSend"in e&&"function"==typeof e.beforeSend&&e.beforeSend(u),u.send(p||null),u;}e.exports=c,c.XMLHttpRequest=r.XMLHttpRequest||function(){},c.XDomainRequest="withCredentials"in new c.XMLHttpRequest()?c.XMLHttpRequest:r.XDomainRequest,function(e,t){for(var n=0;n<e.length;n++){t(e[n]);}}(["get","put","post","patch","head","delete"],function(e){c["delete"===e?"del":e]=function(t,n,r){return(n=a(t,n,r)).method=e.toUpperCase(),u(n);};});},function(e,t,n){"use strict";t.__esModule=!0;var r=i(n(458)),s=i(n(455));function i(e){return e&&e.__esModule?e:{default:e};}t.default=function(){return function(e,t){if(Array.isArray(e))return e;if((0,r.default)(Object(e)))return function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=(0,s.default)(e);!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0){;}}catch(e){i=!0,o=e;}finally{try{!r&&c.return&&c.return();}finally{if(i)throw o;}}return n;}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance");};}();},function(e,t,n){var r=n(19),s=n(24),i=n(146);e.exports=function(e,t){if(r(e),s(t)&&t.constructor===e)return t;var n=i.f(e);return(0,n.resolve)(t),n.promise;};},function(e,t){e.exports=function(e){try{return{e:!1,v:e()};}catch(e){return{e:!0,v:e};}};},function(e,t,n){var r,s,i,o=n(50),a=n(466),c=n(114),u=n(72),m=n(7),l=m.process,d=m.setImmediate,p=m.clearImmediate,f=m.MessageChannel,g=m.Dispatch,h=0,y={},v=function v(){var e=+this;if(y.hasOwnProperty(e)){var t=y[e];delete y[e],t();}},b=function b(e){v.call(e.data);};d&&p||(d=function d(e){for(var t=[],n=1;arguments.length>n;){t.push(arguments[n++]);}return y[++h]=function(){a("function"==typeof e?e:Function(e),t);},r(h),h;},p=function p(e){delete y[e];},"process"==n(48)(l)?r=function r(e){l.nextTick(o(v,e,1));}:g&&g.now?r=function r(e){g.now(o(v,e,1));}:f?(i=(s=new f()).port2,s.port1.onmessage=b,r=o(i.postMessage,i,1)):m.addEventListener&&"function"==typeof postMessage&&!m.importScripts?(r=function r(e){m.postMessage(e+"","*");},m.addEventListener("message",b,!1)):r="onreadystatechange"in u("script")?function(e){c.appendChild(u("script")).onreadystatechange=function(){c.removeChild(this),v.call(e);};}:function(e){setTimeout(o(v,e,1),0);}),e.exports={set:d,clear:p};},function(e,t,n){var r=n(19),s=n(73),i=n(9)("species");e.exports=function(e,t){var n,o=r(e).constructor;return void 0===o||null==(n=r(o)[i])?t:s(n);};},function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(471),i=(r=s)&&r.__esModule?r:{default:r};t.default=function(e){return function(){var t=e.apply(this,arguments);return new i.default(function(e,n){return function r(s,o){try{var a=t[s](o),c=a.value;}catch(e){return void n(e);}if(!a.done)return i.default.resolve(c).then(function(e){r("next",e);},function(e){r("throw",e);});e(c);}("next");});};};},function(e,t,n){e.exports=n(473);},function(e,t,n){"use strict";var r=n(0);function s(e,t){Number.isInteger(e.type)||r.onParamError("Collect.type只能是整数",t),r.notundef(e.uniqueId)&&(this.uniqueId=e.uniqueId),this.type=e.type,this.data=e.data||"",this.custom=e.custom||"";}s.reverse=function(e){var t=Object.assign({},e);return t.type=+t.type,t.createTime=+t.createTime,t.updateTime=+t.updateTime,t;},e.exports=s;},function(e,t,n){"use strict";var r=n(0),s=r.notundef;function i(e,t){Number.isInteger(e.body)||r.onParamError("body只能是整数",t),this.body=e.body,this.from=e.from||"",this.custom=e.custom||"",s(e.pushTitle)&&(this.pushTitle=e.pushTitle),s(e.apnsText)&&(this.apnsText=e.apnsText),s(e.pushPayload)&&(this.pushPayload=e.pushPayload),s(e.needPush)&&(this.needPush=!0===e.needPush?1:0),s(e.needBadge)&&(this.needBadge=!0===e.needBadge?1:0);}i.reverse=function(e){var t=Object.assign({},e);return s(e.needBadge)&&(t.needBadge=1==+e.needBadge),s(e.needPush)&&(t.needPush=1==+e.needPush),t.body=+e.body,t.time=+e.time,t;},e.exports=i;},function(e,t,n){"use strict";var r=n(0),s=r.notundef,i={addFriend:1,applyFriend:2,passFriendApply:3,rejectFriendApply:4},o={1:"addFriend",2:"applyFriend",3:"passFriendApply",4:"rejectFriendApply"};function a(e){r.verifyOptions(e,"account","friend::Friend"),r.verifyParamAtLeastPresentOne(e,"alias custom","friend::Friend"),this.account=e.account,s(e.alias)&&(this.alias=e.alias),s(e.custom)&&(this.custom=e.custom);}a.reverse=function(e){var t=r.filterObj(e,"account alias custom createTime updateTime serverex");return s(e.flag)&&(t.valid="1"===e.flag),s(t.createTime)&&(t.createTime=+t.createTime),s(t.updateTime)&&(t.updateTime=+t.updateTime),t;},a.validTypes=function(){return Object.keys(i);},a.getByteFromType=function(e){return i[e];},a.getTypeFromByte=function(e){return o[e];},a.assembleFriend=function(e){var t=+new Date();return Object.assign({},e,{alias:"",createTime:t,custom:"",updateTime:t,valid:!0});},e.exports=a;},function(e,t,n){var r=n(9)("iterator"),s=!1;try{var i=[7][r]();i.return=function(){s=!0;},Array.from(i,function(){throw 2;});}catch(e){}e.exports=function(e,t){if(!t&&!s)return!1;var n=!1;try{var i=[7],o=i[r]();o.next=function(){return{done:n=!0};},i[r]=function(){return o;},e(i);}catch(e){}return n;};},function(e,t,n){var r=n(37),s=n(9)("iterator"),i=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||i[s]===e);};},function(e,t,n){var r=n(19);e.exports=function(e,t,n,s){try{return s?t(r(n)[0],n[1]):t(n);}catch(t){var i=e.return;throw void 0!==i&&r(i.call(e)),t;}};},function(e,t,n){"use strict";e.exports={imLogin:{3:"clientType",4:"os",6:"sdkVersion",8:"appLogin",9:"protocolVersion",10:"pushTokenName",11:"pushToken",13:"deviceId",18:"appKey",19:"account",24:"browser",26:"session",32:"deviceInfo",38:"customTag",112:"isReactNative",1000:"token"},nosToken:{1:"objectName",2:"token",3:"bucket",4:"expireTime",7:"expireSec",8:"tag",9:"shortUrl"},audioToText:{2:"url"},imageOp:{0:"type",1:"stripmeta",2:"typeType",3:"blurRadius",4:"blurSigma",5:"qualityQuality",6:"cropX",7:"cropY",8:"cropWidth",9:"cropHeight",10:"rotateAngle",11:"pixelPixel",12:"thumbnailMode",13:"thumbnailWidth",14:"thumbnailHeight",15:"thumbnailAxisX",16:"thumbnailAxisY",17:"thumbnailCenterX",18:"thumbnailCenterY",19:"thumbnailEnlarge",20:"thumbnailToStatic",21:"watermarkType",22:"watermarkGravity",23:"watermarkDissolve",24:"watermarkDx",25:"watermarkDy",26:"watermarkImage",27:"watermarkText",28:"watermarkFont",29:"watermarkFontSize",30:"watermarkFontColor",31:"interlace"},robot:{4:"account",5:"nick",6:"avatar",7:"intro",8:"config",9:"valid",10:"createTime",11:"updateTime",12:"custid",13:"botid",14:"bindTime",_6_safe:"_avatar_safe"},clientAntispam:{1:"version",2:"md5",3:"nosurl",4:"thesaurus"},fileQuickTransfer:{1:"md5",2:"url",3:"size",4:"threshold",_2_safe:"_url_safe"},transToken:{1:"name",2:"type",3:"transType",4:"size",5:"extra",6:"body"},transInfo:{1:"docId",2:"name",3:"prefix",4:"size",5:"type",6:"state",7:"transType",8:"transSize",9:"pageCount",10:"picInfo",11:"extra",12:"flag"},nosFileUrlTag:{0:"safeUrl",1:"originUrl"},nosAccessTokenTag:{0:"token",1:"url",2:"userAgent",3:"ext"},fileListParam:{1:"fromDocId",2:"limit"},avSignalTag:{1:"type",2:"channelName",3:"channelId",4:"channelCreateTime",5:"channelExpireTime",6:"creator",7:"ext",8:"channelInValid",10:"from",11:"to",12:"requestId",13:"needPush",14:"pushTitle",15:"pushContent",16:"pushPayload",17:"needBadge",18:"members",19:"attach",20:"attachExt",21:"isSave",22:"msgid",23:"uid",24:"time"},login:{1:"appKey",2:"account",3:"deviceId",5:"chatroomId",8:"appLogin",20:"chatroomNick",21:"chatroomAvatar",22:"chatroomCustom",23:"chatroomEnterCustom",26:"session",38:"isAnonymous",39:"tags",40:"notifyTargetTags",_21_safe:"_chatroomAvatar_safe"},chatroom:{1:"id",3:"name",4:"announcement",5:"broadcastUrl",12:"custom",14:"createTime",15:"updateTime",16:"queuelevel",100:"creator",101:"onlineMemberNum",102:"mute"},msg:{1:"idClient",2:"type",3:"attach",4:"custom",5:"resend",6:"userUpdateTime",7:"fromNick",8:"fromAvatar",9:"fromCustom",10:"yidunEnable",11:"antiSpamContent",12:"skipHistory",13:"body",14:"antiSpamBusinessId",15:"clientAntiSpam",16:"antiSpamUsingYidun",20:"time",21:"from",22:"chatroomId",23:"fromClientType",25:"highPriority",27:"callbackExt",28:"subType",29:"yidunAntiCheating",30:"env",31:"notifyTargetTags",_8_safe:"_fromAvatar_safe"},chatroomMember:{1:"chatroomId",2:"account",3:"type",4:"level",5:"nick",6:"avatar",7:"custom",8:"online",9:"guest",10:"enterTime",12:"blacked",13:"gaged",14:"valid",15:"updateTime",16:"tempMuted",17:"tempMuteDuration",_6_safe:"_avatar_safe"},chatroomCdnInfo:{1:"enable",2:"cdnUrls",3:"timestamp",4:"interval",5:"decryptType",6:"decryptKey",7:"timeout"},nosConfigTag:{1:"bucket",2:"cdnDomain",3:"expire",4:"objectNamePrefix"}};},function(e,t,n){"use strict";e.exports={imLogin:{clientType:3,os:4,sdkVersion:6,appLogin:8,protocolVersion:9,pushTokenName:10,pushToken:11,deviceId:13,appKey:18,account:19,browser:24,session:26,deviceInfo:32,isReactNative:112,token:1e3,customTag:38},nosToken:{objectName:1,token:2,bucket:3,expireTime:4,expireSec:7,tag:8,shortUrl:9},audioToText:{url:2},imageOp:{type:0,stripmeta:1,typeType:2,blurRadius:3,blurSigma:4,qualityQuality:5,cropX:6,cropY:7,cropWidth:8,cropHeight:9,rotateAngle:10,pixelPixel:11,thumbnailMode:12,thumbnailWidth:13,thumbnailHeight:14,thumbnailAxisX:15,thumbnailAxisY:16,thumbnailCenterX:17,thumbnailCenterY:18,thumbnailEnlarge:19,thumbnailToStatic:20,watermarkType:21,watermarkGravity:22,watermarkDissolve:23,watermarkDx:24,watermarkDy:25,watermarkImage:26,watermarkText:27,watermarkFont:28,watermarkFontSize:29,watermarkFontColor:30,interlace:31},robot:{account:4,nick:5,avatar:6,intro:7,config:8,valid:9,createTime:10,updateTime:11,custid:12,botid:13,bindTime:14},clientAntispam:{version:1,md5:2,nosurl:3,thesaurus:4},fileQuickTransfer:{md5:1,url:2,size:3,threshold:4},transToken:{name:1,type:2,transType:3,size:4,extra:5,body:6},transInfo:{docId:1,name:2,prefix:3,size:4,type:5,state:6,transType:7,transSize:8,pageCount:9,picInfo:10,extra:11,flag:12},nosFileUrlTag:{safeUrl:0,originUrl:1},nosAccessTokenTag:{token:0,url:1,userAgent:2,ext:3},fileListParam:{fromDocId:1,limit:2},avSignalTag:{type:1,channelName:2,channelId:3,channelCreateTime:4,channelExpireTime:5,creator:6,ext:7,channelInValid:8,from:10,to:11,requestId:12,needPush:13,pushTitle:14,pushContent:15,pushPayload:16,needBadge:17,members:18,attach:19,attachExt:20,isSave:21,msgid:22,uid:23,time:24},login:{appKey:1,account:2,deviceId:3,chatroomId:5,appLogin:8,chatroomNick:20,chatroomAvatar:21,chatroomCustom:22,chatroomEnterCustom:23,session:26,isAnonymous:38,tags:39,notifyTargetTags:40},chatroom:{id:1,name:3,announcement:4,broadcastUrl:5,custom:12,createTime:14,updateTime:15,queuelevel:16,creator:100,onlineMemberNum:101,mute:102},msg:{idClient:1,type:2,attach:3,custom:4,resend:5,userUpdateTime:6,fromNick:7,fromAvatar:8,fromCustom:9,yidunEnable:10,antiSpamContent:11,skipHistory:12,body:13,antiSpamBusinessId:14,clientAntiSpam:15,antiSpamUsingYidun:16,time:20,from:21,chatroomId:22,fromClientType:23,highPriority:25,callbackExt:27,subType:28,yidunAntiCheating:29,env:30,notifyTargetTags:31},chatroomMember:{chatroomId:1,account:2,type:3,level:4,nick:5,avatar:6,custom:7,online:8,guest:9,enterTime:10,blacked:12,gaged:13,valid:14,updateTime:15,tempMuted:16,tempMuteDuration:17},chatroomCdnInfo:{enable:1,cdnUrls:2,timestamp:3,interval:4,decryptType:5,decryptKey:6,timeout:7},tagMemberReq:{tag:1,time:2,limit:3},tagMuteReq:{tag:1,duration:2,needNotify:3,custom:4,notifyTargetTags:5}};},function(e,t,n){"use strict";var r=n(0),s=n(86),i=r.merge({},s.idMap,{chatroom:{id:13,login:2,kicked:3,logout:4,sendMsg:6,msg:7,getChatroomMembers:8,getHistoryMsgs:9,markChatroomMember:11,closeChatroom:12,getChatroom:13,updateChatroom:14,updateMyChatroomMemberInfo:15,getChatroomMembersInfo:16,kickChatroomMember:17,updateChatroomMemberTempMute:19,queueOffer:20,queuePoll:21,queueList:22,peak:23,queueDrop:24,queueInit:25,queueChange:26,updateTagMembersTempMute:30,getChatroomMembersByTag:31,getChatroomMemberCountByTag:32,notifyCdnInfo:99},user:{id:3,syncRobot:16}}),o=r.merge({},s.cmdConfig,{login:{sid:i.chatroom.id,cid:i.chatroom.login,params:[{type:"byte",name:"type"},{type:"Property",name:"login"},{type:"Property",name:"imLogin"}]},logout:{sid:i.chatroom.id,cid:i.chatroom.logout},sendMsg:{sid:i.chatroom.id,cid:i.chatroom.sendMsg,params:[{type:"Property",name:"msg"}]},getChatroomMembers:{sid:i.chatroom.id,cid:i.chatroom.getChatroomMembers,params:[{type:"byte",name:"type"},{type:"long",name:"time"},{type:"int",name:"limit"}]},getHistoryMsgs:{sid:i.chatroom.id,cid:i.chatroom.getHistoryMsgs,params:[{type:"long",name:"timetag"},{type:"int",name:"limit"},{type:"bool",name:"reverse"},{type:"LongArray",name:"msgTypes"}]},markChatroomMember:{sid:i.chatroom.id,cid:i.chatroom.markChatroomMember,params:[{type:"string",name:"account"},{type:"int",name:"type"},{type:"bool",name:"isAdd"},{type:"int",name:"level"},{type:"string",name:"custom"}]},closeChatroom:{sid:i.chatroom.id,cid:i.chatroom.closeChatroom,params:[{type:"string",name:"custom"}]},getChatroom:{sid:i.chatroom.id,cid:i.chatroom.getChatroom},updateChatroom:{sid:i.chatroom.id,cid:i.chatroom.updateChatroom,params:[{type:"Property",name:"chatroom"},{type:"bool",name:"needNotify"},{type:"String",name:"custom"}]},updateMyChatroomMemberInfo:{sid:i.chatroom.id,cid:i.chatroom.updateMyChatroomMemberInfo,params:[{type:"Property",name:"chatroomMember"},{type:"bool",name:"needNotify"},{type:"String",name:"custom"},{type:"bool",name:"needSave"}]},getChatroomMembersInfo:{sid:i.chatroom.id,cid:i.chatroom.getChatroomMembersInfo,params:[{type:"StrArray",name:"accounts"}]},kickChatroomMember:{sid:i.chatroom.id,cid:i.chatroom.kickChatroomMember,params:[{type:"string",name:"account"},{type:"string",name:"custom"}]},updateChatroomMemberTempMute:{sid:i.chatroom.id,cid:i.chatroom.updateChatroomMemberTempMute,params:[{type:"String",name:"account"},{type:"long",name:"duration"},{type:"bool",name:"needNotify"},{type:"String",name:"custom"}]},queueOffer:{sid:i.chatroom.id,cid:i.chatroom.queueOffer,params:[{type:"string",name:"elementKey"},{type:"string",name:"elementValue"},{type:"bool",name:"transient"}]},queuePoll:{sid:i.chatroom.id,cid:i.chatroom.queuePoll,params:[{type:"string",name:"elementKey"}]},queueList:{sid:i.chatroom.id,cid:i.chatroom.queueList},peak:{sid:i.chatroom.id,cid:i.chatroom.peak},queueDrop:{sid:i.chatroom.id,cid:i.chatroom.queueDrop},queueInit:{sid:i.chatroom.id,cid:i.chatroom.queueInit,params:[{type:"int",name:"limit"}]},queueChange:{sid:i.chatroom.id,cid:i.chatroom.queueChange,params:[{type:"StrStrMap",name:"elementMap"},{type:"bool",name:"needNotify"},{type:"string",name:"notifyExt"}]},updateTagMembersTempMute:{sid:i.chatroom.id,cid:i.chatroom.updateTagMembersTempMute,params:[{type:"Property",name:"tagMuteReq"}]},getChatroomMemberCountByTag:{sid:i.chatroom.id,cid:i.chatroom.getChatroomMemberCountByTag,params:[{type:"String",name:"tag"}]},getChatroomMembersByTag:{sid:i.chatroom.id,cid:i.chatroom.getChatroomMembersByTag,params:[{type:"Property",name:"tagMemberReq"}]},notifyCdnInfo:{sid:i.chatroom.id,cid:i.chatroom.notifyCdnInfo},syncRobot:{sid:i.user.id,cid:i.user.syncRobot,params:[{type:"long",name:"timetag"}]}}),a=r.merge({},s.packetConfig,{"4_10":{service:"notify"},"4_11":{service:"notify"},"3_16":{service:"chatroom",cmd:"syncRobot",response:[{type:"PropertyArray",name:"robots",entity:"robot"}]},"13_2":{service:"chatroom",cmd:"login",response:[{type:"Property",name:"chatroom"},{type:"Property",name:"chatroomMember"},{type:"Property",name:"chatroomCdnInfo"}]},"13_3":{service:"chatroom",cmd:"kicked",response:[{type:"Number",name:"reason"},{type:"String",name:"custom"}]},"13_4":{service:"chatroom",cmd:"logout"},"13_6":{service:"chatroom",cmd:"sendMsg",response:[{type:"Property",name:"msg"}]},"13_7":{service:"chatroom",cmd:"msg",response:[{type:"Property",name:"msg"}]},"13_8":{service:"chatroom",cmd:"getChatroomMembers",response:[{type:"PropertyArray",name:"members",entity:"chatroomMember"}]},"13_9":{service:"chatroom",cmd:"getHistoryMsgs",response:[{type:"PropertyArray",name:"msgs",entity:"msg"}]},"13_11":{service:"chatroom",cmd:"markChatroomMember",response:[{type:"Property",name:"chatroomMember"}]},"13_12":{service:"chatroom",cmd:"closeChatroom"},"13_13":{service:"chatroom",cmd:"getChatroom",response:[{type:"Property",name:"chatroom"}]},"13_14":{service:"chatroom",cmd:"updateChatroom"},"13_15":{service:"chatroom",cmd:"updateMyChatroomMemberInfo"},"13_16":{service:"chatroom",cmd:"getChatroomMembersInfo",response:[{type:"PropertyArray",name:"members",entity:"chatroomMember"}]},"13_17":{service:"chatroom",cmd:"kickChatroomMember"},"13_19":{service:"chatroom",cmd:"updateChatroomMemberTempMute"},"13_20":{service:"chatroom",cmd:"queueOffer"},"13_21":{service:"chatroom",cmd:"queuePoll",response:[{type:"String",name:"elementKey"},{type:"String",name:"elementValue"}]},"13_22":{service:"chatroom",cmd:"queueList",response:[{type:"KVArray",name:"queueList"}]},"13_23":{service:"chatroom",cmd:"peak",response:[{type:"String",name:"elementKey"},{type:"String",name:"elementValue"}]},"13_24":{service:"chatroom",cmd:"queueDrop"},"13_25":{service:"chatroom",cmd:"queueInit"},"13_26":{service:"chatroom",cmd:"queueChange",response:[{type:"StrArray",name:"elementKeyArray"}]},"13_30":{service:"chatroom",cmd:"updateTagMembersTempMute"},"13_31":{service:"chatroom",cmd:"getChatroomMembersByTag",response:[{type:"PropertyArray",name:"members",entity:"chatroomMember"}]},"13_32":{service:"chatroom",cmd:"getChatroomMemberCountByTag",response:[{type:"long",name:"count"}]},"13_99":{service:"chatroom",cmd:"notifyCdnInfo",response:[{type:"Property",name:"chatroomCdnInfo"}]}});e.exports={idMap:i,cmdConfig:o,packetConfig:a};},function(e,t,n){"use strict";e.exports={negotiateTransportTag:{"-1":"version",1:"serializeList",101:"serialize"},initTransportTag:{},nosToken:{1:"objectName",2:"token",3:"bucket",4:"expireTime",7:"expireSec",8:"tag",9:"shortUrl"},audioToText:{2:"url"},imageOp:{0:"type",1:"stripmeta",2:"typeType",3:"blurRadius",4:"blurSigma",5:"qualityQuality",6:"cropX",7:"cropY",8:"cropWidth",9:"cropHeight",10:"rotateAngle",11:"pixelPixel",12:"thumbnailMode",13:"thumbnailWidth",14:"thumbnailHeight",15:"thumbnailAxisX",16:"thumbnailAxisY",17:"thumbnailCenterX",18:"thumbnailCenterY",19:"thumbnailEnlarge",20:"thumbnailToStatic",21:"watermarkType",22:"watermarkGravity",23:"watermarkDissolve",24:"watermarkDx",25:"watermarkDy",26:"watermarkImage",27:"watermarkText",28:"watermarkFont",29:"watermarkFontSize",30:"watermarkFontColor",31:"interlace"},robot:{4:"account",5:"nick",6:"avatar",7:"intro",8:"config",9:"valid",10:"createTime",11:"updateTime",12:"custid",13:"botid",14:"bindTime",_6_safe:"_avatar_safe"},clientAntispam:{1:"version",2:"md5",3:"nosurl",4:"thesaurus"},fileQuickTransfer:{1:"md5",2:"url",3:"size",4:"threshold",_2_safe:"_url_safe"},transToken:{1:"name",2:"type",3:"transType",4:"size",5:"extra",6:"body"},transInfo:{1:"docId",2:"name",3:"prefix",4:"size",5:"type",6:"state",7:"transType",8:"transSize",9:"pageCount",10:"picInfo",11:"extra",12:"flag"},nosFileUrlTag:{0:"safeUrl",1:"originUrl"},nosAccessTokenTag:{0:"token",1:"url",2:"userAgent",3:"ext"},nosConfigTag:{1:"bucket",2:"cdnDomain",3:"expire",4:"objectNamePrefix"},fileListParam:{1:"fromDocId",2:"limit"},avSignalTag:{1:"type",2:"channelName",3:"channelId",4:"channelCreateTime",5:"channelExpireTime",6:"creator",7:"ext",8:"channelInValid",10:"from",11:"to",12:"requestId",13:"needPush",14:"pushTitle",15:"pushContent",16:"pushPayload",17:"needBadge",18:"members",19:"attach",20:"attachExt",21:"isSave",22:"msgid",23:"uid",24:"time"},login:{3:"clientType",4:"os",6:"sdkVersion",8:"appLogin",9:"protocolVersion",10:"pushTokenName",11:"pushToken",13:"deviceId",18:"appKey",19:"account",24:"browser",26:"session",32:"deviceInfo",38:"customTag",39:"customClientType",40:"sdkHumanVersion",112:"isReactNative",115:"authType",116:"loginExt",1000:"token"},loginRes:{17:"lastLoginDeviceId",38:"customTag",102:"connectionId",103:"ip",104:"port",106:"country",111:"hasXMPush"},loginPort:{3:"type",4:"os",5:"mac",13:"deviceId",19:"account",32:"deviceInfo",38:"customTag",102:"connectionId",103:"ip",109:"time"},aosPushInfo:{110:"pushType",111:"hasTokenPreviously"},sync:{1:"myInfo",2:"offlineMsgs",3:"teams",6:"netcallMsgs",7:"roamingMsgs",9:"relations",11:"friends",12:"sessions",13:"friendUsers",14:"msgReceipts",15:"myTeamMembers",16:"donnop",17:"deleteMsg",18:"sessionAck",19:"robots",20:"broadcastMsgs",21:"avSignal",22:"superTeams",23:"myInfoInSuperTeams",24:"superTeamRoamingMsgs",25:"deleteSuperTeamMsg",26:"superTeamSessionAck",27:"deleteMsgSelf",28:"stickTopSessions",29:"sessionHistoryMsgsDelete",100:"filterMsgs"},donnop:{1:"open"},sessionReqTag:{1:"minTimestamp",2:"maxTimestamp",3:"needLastMsg",4:"limit",5:"hasMore"},session:{1:"id",2:"updateTime",3:"ext",4:"lastMsg",5:"lastMsgType"},superTeam:{1:"teamId",3:"name",4:"type",5:"owner",6:"level",7:"selfCustom",8:"valid",9:"memberNum",10:"memberUpdateTime",11:"createTime",12:"updateTime",13:"validToCurrentUser",14:"intro",15:"announcement",16:"joinMode",17:"bits",18:"custom",19:"serverCustom",20:"avatar",21:"beInviteMode",22:"inviteMode",23:"updateTeamMode",24:"updateCustomMode",100:"mute",101:"muteType",_20_safe:"_avatar_safe"},superTeamMember:{1:"teamId",3:"account",4:"type",5:"nickInTeam",7:"bits",8:"active",9:"valid",10:"createTime",11:"updateTime",12:"custom",13:"mute",14:"invitoraccid",15:"joinTime"},team:{1:"teamId",3:"name",4:"type",5:"owner",6:"level",7:"selfCustom",8:"valid",9:"memberNum",10:"memberUpdateTime",11:"createTime",12:"updateTime",13:"validToCurrentUser",14:"intro",15:"announcement",16:"joinMode",17:"bits",18:"custom",19:"serverCustom",20:"avatar",21:"beInviteMode",22:"inviteMode",23:"updateTeamMode",24:"updateCustomMode",100:"mute",101:"muteType",_20_safe:"_avatar_safe"},teamMember:{1:"teamId",3:"account",4:"type",5:"nickInTeam",7:"bits",8:"active",9:"valid",10:"joinTime",11:"updateTime",12:"custom",13:"mute",14:"invitorAccid"},msg:{0:"scene",1:"to",2:"from",4:"fromClientType",5:"fromDeviceId",6:"fromNick",7:"time",8:"type",9:"body",10:"attach",11:"idClient",12:"idServer",13:"resend",14:"userUpdateTime",15:"custom",16:"pushPayload",17:"pushContent",18:"apnsAccounts",19:"apnsContent",20:"apnsForcePush",21:"yidunEnable",22:"antiSpamContent",23:"antiSpamBusinessId",24:"clientAntiSpam",25:"antiSpamUsingYidun",26:"needMsgReceipt",28:"needUpdateSession",29:"replyMsgFromAccount",30:"replyMsgToAccount",31:"replyMsgTime",32:"replyMsgIdServer",33:"replyMsgIdClient",34:"threadMsgFromAccount",35:"threadMsgToAccount",36:"threadMsgTime",37:"threadMsgIdServer",38:"threadMsgIdClient",39:"delete",40:"callbackExt",41:"subType",42:"yidunAntiCheating",43:"env",100:"isHistoryable",101:"isRoamingable",102:"isSyncable",104:"isMuted",105:"cc",106:"isInBlackList",107:"isPushable",108:"isOfflinable",109:"isUnreadable",110:"needPushNick",111:"isReplyMsg",112:"tempTeamMemberCount"},threadMsgReq:{1:"beginTime",2:"endTime",3:"lastMsgId",4:"limit",5:"reverse"},threadMsgsMeta:{1:"total",2:"lastMsgTime"},comment:{1:"from",2:"body",3:"time",4:"custom",5:"needPush",6:"needBadge",7:"pushTitle",8:"apnsText",9:"pushPayload"},commentReq:{1:"scene",2:"from",3:"to",4:"time",5:"idServer",6:"idClient",100:"timestamp"},commentRes:{1:"scene",2:"from",3:"to",4:"time",5:"idServer",6:"idClient",7:"detail",8:"modify",100:"timestamp"},collect:{1:"id",2:"type",3:"data",4:"custom",5:"uniqueId",6:"createTime",7:"updateTime"},collectQuery:{1:"beginTime",2:"endTime",3:"lastMsgId",4:"limit",5:"reverse",6:"type"},stickTopSession:{1:"id",2:"topCustom",3:"createTime",4:"updateTime"},pinTag:{1:"pinFrom",2:"pinCustom",3:"createTime",4:"updateTime"},msgPinReq:{1:"sessionId",2:"timetag"},msgPinRes:{1:"scene",2:"from",3:"to",4:"time",5:"idServer",6:"idClient",7:"pinFrom",8:"pinCustom"},msgReceipt:{1:"to",2:"from",7:"time",11:"idClient"},teamMsgReceipt:{0:"teamId",1:"idServer",100:"read",101:"unread",102:"idClient",103:"account"},deleteMsgSelfTag:{1:"scene",2:"from",3:"to",4:"idServer",5:"idClient",6:"time",7:"deletedTime",8:"custom"},sysMsg:{0:"time",1:"type",2:"to",3:"from",4:"ps",5:"attach",6:"idServer",7:"sendToOnlineUsersOnly",8:"apnsText",9:"pushPayload",10:"deletedIdClient",11:"deletedIdServer",12:"yidunEnable",13:"antiSpamContent",14:"deletedMsgTime",15:"deletedMsgFromNick",16:"opeAccount",21:"env",22:"callbackExt",105:"cc",107:"isPushable",109:"isUnreadable",110:"needPushNick"},broadcastMsg:{1:"broadcastId",2:"fromAccid",3:"fromUid",4:"timestamp",5:"body"},friend:{4:"account",5:"flag",6:"beflag",7:"source",8:"alias",9:"bits",10:"custom",11:"createTime",12:"updateTime",13:"serverex"},user:{1:"account",3:"nick",4:"avatar",5:"sign",6:"gender",7:"email",8:"birth",9:"tel",10:"custom",12:"createTime",13:"updateTime",_4_safe:"_avatar_safe"},specialRelation:{0:"account",1:"isMuted",2:"isBlacked",3:"createTime",4:"updateTime"},msgType:{0:"text",1:"picture",2:"audio",3:"video",4:"location",5:"notification",6:"file",7:"netcall_audio",8:"netcall_vedio",9:"datatunnel_new",10:"tips",11:"robot",100:"custom"},msgEvent:{1:"type",2:"value",3:"idClient",4:"custom",5:"validTime",6:"broadcastType",7:"sync",8:"validTimeType",9:"durable",10:"time",11:"idServer",12:"clientType",13:"serverConfig",14:"serverCustom",101:"appid",103:"account",104:"enableMultiClient",106:"consid"},msgEventSubscribe:{1:"type",2:"subscribeTime",3:"sync",102:"to",104:"from",105:"time"},clearMsgsParams:{1:"account",2:"delRoam"},clearMsgsParamsWithSync:{0:"type",1:"otherAccid",2:"delRoam",3:"toTid",4:"isSyncSelf",5:"fromAccid",6:"time",7:"ext"},delFriendParams:{1:"delAlias"},proxyTag:{1:"zone",2:"path",3:"method",4:"header",5:"body"},proxyMsgTag:{1:"from",2:"body",3:"time"}};},function(e,t,n){"use strict";e.exports={negotiateTransportTag:{version:-1,serializeList:1,serialize:101},initTransportTag:{},nosToken:{objectName:1,token:2,bucket:3,expireTime:4,expireSec:7,tag:8,shortUrl:9},audioToText:{url:2},imageOp:{type:0,stripmeta:1,typeType:2,blurRadius:3,blurSigma:4,qualityQuality:5,cropX:6,cropY:7,cropWidth:8,cropHeight:9,rotateAngle:10,pixelPixel:11,thumbnailMode:12,thumbnailWidth:13,thumbnailHeight:14,thumbnailAxisX:15,thumbnailAxisY:16,thumbnailCenterX:17,thumbnailCenterY:18,thumbnailEnlarge:19,thumbnailToStatic:20,watermarkType:21,watermarkGravity:22,watermarkDissolve:23,watermarkDx:24,watermarkDy:25,watermarkImage:26,watermarkText:27,watermarkFont:28,watermarkFontSize:29,watermarkFontColor:30,interlace:31},robot:{account:4,nick:5,avatar:6,intro:7,config:8,valid:9,createTime:10,updateTime:11,custid:12,botid:13,bindTime:14},clientAntispam:{version:1,md5:2,nosurl:3,thesaurus:4},fileQuickTransfer:{md5:1,url:2,size:3,threshold:4},transToken:{name:1,type:2,transType:3,size:4,extra:5,body:6},transInfo:{docId:1,name:2,prefix:3,size:4,type:5,state:6,transType:7,transSize:8,pageCount:9,picInfo:10,extra:11,flag:12},nosFileUrlTag:{safeUrl:0,originUrl:1},nosAccessTokenTag:{token:0,url:1,userAgent:2,ext:3},fileListParam:{fromDocId:1,limit:2},avSignalTag:{type:1,channelName:2,channelId:3,channelCreateTime:4,channelExpireTime:5,creator:6,ext:7,channelInValid:8,from:10,to:11,requestId:12,needPush:13,pushTitle:14,pushContent:15,pushPayload:16,needBadge:17,members:18,attach:19,attachExt:20,isSave:21,msgid:22,uid:23,time:24},login:{clientType:3,os:4,sdkVersion:6,appLogin:8,protocolVersion:9,pushTokenName:10,pushToken:11,deviceId:13,appKey:18,account:19,browser:24,session:26,deviceInfo:32,isReactNative:112,token:1e3,customTag:38,customClientType:39,sdkHumanVersion:40,authType:115,loginExt:116},loginRes:{lastLoginDeviceId:17,customTag:38,connectionId:102,ip:103,port:104,country:106,hasXMPush:111},loginPort:{type:3,os:4,mac:5,deviceId:13,account:19,deviceInfo:32,connectionId:102,ip:103,time:109,customTag:38},aosPushInfo:{pushType:110,hasTokenPreviously:111},sync:{myInfo:1,offlineMsgs:2,teams:3,netcallMsgs:6,roamingMsgs:7,relations:9,friends:11,sessions:12,friendUsers:13,msgReceipts:14,myTeamMembers:15,donnop:16,deleteMsg:17,sessionAck:18,robots:19,broadcastMsgs:20,avSignal:21,superTeams:22,myInfoInSuperTeams:23,superTeamRoamingMsgs:24,deleteSuperTeamMsg:25,superTeamSessionAck:26,deleteMsgSelf:27,stickTopSessions:28,sessionHistoryMsgsDelete:29,filterMsgs:100},donnop:{open:1},sessionReqTag:{minTimestamp:1,maxTimestamp:2,needLastMsg:3,limit:4,hasMore:5},session:{id:1,updateTime:2,ext:3,lastMsg:4},superTeam:{teamId:1,name:3,type:4,owner:5,level:6,selfCustom:7,valid:8,memberNum:9,memberUpdateTime:10,createTime:11,updateTime:12,validToCurrentUser:13,intro:14,announcement:15,joinMode:16,bits:17,custom:18,serverCustom:19,avatar:20,beInviteMode:21,inviteMode:22,updateTeamMode:23,updateCustomMode:24,mute:100,muteType:101},superTeamMember:{teamId:1,account:3,type:4,nickInTeam:5,bits:7,active:8,valid:9,createTime:10,updateTime:11,custom:12,mute:13,invitoraccid:14,joinTime:15},team:{teamId:1,name:3,type:4,owner:5,level:6,selfCustom:7,valid:8,memberNum:9,memberUpdateTime:10,createTime:11,updateTime:12,validToCurrentUser:13,intro:14,announcement:15,joinMode:16,bits:17,custom:18,serverCustom:19,avatar:20,beInviteMode:21,inviteMode:22,updateTeamMode:23,updateCustomMode:24,mute:100,muteType:101},teamMember:{teamId:1,account:3,type:4,nickInTeam:5,bits:7,active:8,valid:9,joinTime:10,updateTime:11,custom:12,mute:13,invitorAccid:14},msg:{scene:0,to:1,from:2,fromClientType:4,fromDeviceId:5,fromNick:6,time:7,type:8,body:9,attach:10,idClient:11,idServer:12,resend:13,userUpdateTime:14,custom:15,pushPayload:16,pushContent:17,apnsAccounts:18,apnsContent:19,apnsForcePush:20,yidunEnable:21,antiSpamContent:22,antiSpamBusinessId:23,clientAntiSpam:24,antiSpamUsingYidun:25,needMsgReceipt:26,needUpdateSession:28,replyMsgFromAccount:29,replyMsgToAccount:30,replyMsgTime:31,replyMsgIdServer:32,replyMsgIdClient:33,threadMsgFromAccount:34,threadMsgToAccount:35,threadMsgTime:36,threadMsgIdServer:37,threadMsgIdClient:38,delete:39,callbackExt:40,subType:41,yidunAntiCheating:42,env:43,isHistoryable:100,isRoamingable:101,isSyncable:102,isMuted:104,cc:105,isInBlackList:106,isPushable:107,isOfflinable:108,isUnreadable:109,needPushNick:110,isReplyMsg:111,tempTeamMemberCount:112},threadMsgReq:{beginTime:1,endTime:2,lastMsgId:3,limit:4,reverse:5},threadMsgsMeta:{total:1,lastMsgTime:2},comment:{from:1,body:2,time:3,custom:4,needPush:5,needBadge:6,pushTitle:7,apnsText:8,pushPayload:9},commentReq:{scene:1,from:2,to:3,time:4,idServer:5,idClient:6,timestamp:100},commentRes:{scene:1,from:2,to:3,time:4,idServer:5,idClient:6,detail:7,modify:8,timestamp:100},collect:{id:1,type:2,data:3,custom:4,uniqueId:5,createTime:6,updateTime:7},collectQuery:{beginTime:1,endTime:2,lastMsgId:3,limit:4,reverse:5,type:6},stickTopSession:{id:1,topCustom:2,createTime:3,updateTime:4},pinTag:{pinFrom:1,pinCustom:2,createTime:3,updateTime:4},msgPinReq:{sessionId:1,timetag:2},msgPinRes:{scene:1,from:2,to:3,time:4,idServer:5,idClient:6,pinFrom:7,pinCustom:8},msgReceipt:{to:1,from:2,time:7,idClient:11},teamMsgReceipt:{teamId:0,idServer:1,read:100,unread:101,idClient:102,account:103},deleteMsgSelfTag:{scene:1,from:2,to:3,idServer:4,idClient:5,time:6,deletedTime:7,custom:8},sysMsg:{time:0,type:1,to:2,from:3,ps:4,attach:5,idServer:6,sendToOnlineUsersOnly:7,apnsText:8,pushPayload:9,deletedIdClient:10,deletedIdServer:11,yidunEnable:12,antiSpamContent:13,deletedMsgTime:14,deletedMsgFromNick:15,opeAccount:16,env:21,callbackExt:22,cc:105,isPushable:107,isUnreadable:109,needPushNick:110},broadcastMsg:{broadcastId:1,fromAccid:2,fromUid:3,timestamp:4,body:5},friend:{account:4,flag:5,beflag:6,source:7,alias:8,bits:9,custom:10,createTime:11,updateTime:12,serverex:13},user:{account:1,nick:3,avatar:4,sign:5,gender:6,email:7,birth:8,tel:9,custom:10,createTime:12,updateTime:13},specialRelation:{account:0,isMuted:1,isBlacked:2,createTime:3,updateTime:4},msgType:{text:0,picture:1,audio:2,video:3,location:4,notification:5,file:6,netcall_audio:7,netcall_vedio:8,datatunnel_new:9,tips:10,robot:11,custom:100},msgEvent:{type:1,value:2,idClient:3,custom:4,validTime:5,broadcastType:6,sync:7,validTimeType:8,durable:9,time:10,idServer:11,clientType:12,serverConfig:13,serverCustom:14,appid:101,account:103,enableMultiClient:104,consid:106},msgEventSubscribe:{type:1,subscribeTime:2,sync:3,to:102,from:104,time:105},clearMsgsParams:{account:1,delRoam:2},clearMsgsParamsWithSync:{type:0,otherAccid:1,isDeleteRoam:2,toTid:3,isSyncSelf:4,fromAccid:5,time:6,ext:7},delFriendParams:{delAlias:1},proxyTag:{zone:1,path:2,method:3,header:4,body:5},proxyMsgTag:{from:1,body:2,time:3},sessionAckTag:{scene:1,to:2,timetag:3}};},function(e,t,n){"use strict";var r=n(36).fn,s=n(0),i=n(118);r.processAvSignal=function(e){switch(e.cmd){case"signalingCreate":case"signalingDelay":case"signalingClose":case"signalingJoin":case"signalingLeave":case"signalingInvite":case"signalingCancel":case"signalingReject":case"signalingAccept":case"signalingControl":case"signalingSyncMsgRead":case"signalingGetChannelInfo":break;case"signalingNotify":this.onSignalingNotify(e);break;case"signalingMutilClientSyncNotify":this.onSignalingMutilClientSyncNotify(e);break;case"signalingUnreadMessageSyncNotify":this.onSignalingUnreadMessageSyncNotify(e);break;case"signalingChannelsSyncNotify":this.onSignalingMembersSyncNotify(e);break;default:this.logger.warn("avSignal::unhandled cmd:",e.cmd);}};var o=function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e.needPush&&(e.needPush="1"===e.needPush),e.needBadge&&(e.needBadge="1"===e.needBadge),e.channelInValid&&(e.channelInValid="1"===e.channelInValid),e.attach){var t=JSON.parse(e.attach);e.eventType=i.parseAvSignalType(t.type);}if(e.members){var n=JSON.parse(e.members);e.members=n.map(function(e){return i.parseAvSignalMember(e);});}return e;};r.onSignalingNotify=function(e){if(e.error){var t=e.error;this.logger.error("protocal::avSignal:onSignalingNotify error",t),this.emitAPI({type:"error",error:t}),this.options.onerror(t);}else{e.raw&&e.raw.r&&e.raw.r.length&&e.content&&e.content.avSignalTag&&(e.content.avSignalTag.msgid=e.raw.r[0]);var n=e.content.avSignalTag;n=Array.isArray(n)?n.map(function(e){return o(e);}):o(n),this.emitAPI({type:"signalingNotify",obj:n}),s.isFunction(this.options.onSignalingNotify)&&this.options.onSignalingNotify(n);}},r.onSignalingMutilClientSyncNotify=function(e){if(e.error){var t=e.error;this.logger.error("protocal::avSignal:onSignalingMutilClientSyncNotify error",t),this.emitAPI({type:"error",error:t}),this.options.onerror(t);}else{var n=e.content.avSignalTag;n=Array.isArray(n)?n.map(function(e){return o(e);}):o(n),this.emitAPI({type:"signalingMutilClientSyncNotify",obj:n}),s.isFunction(this.options.onSignalingMutilClientSyncNotify)&&this.options.onSignalingMutilClientSyncNotify(n);}},r.onSignalingUnreadMessageSyncNotify=function(e){if(e.error){var t=e.error;this.logger.error("protocal::avSignal:onSignalingUnreadMessageSyncNotify error",t),this.emitAPI({type:"error",error:t}),this.options.onerror(t);}else{var n=e.content.avSignalTag;Array.isArray(n)&&(n=n.map(function(e){return o(e);})),this.emitAPI({type:"signalingUnreadMessageSyncNotify",obj:n}),s.isFunction(this.options.onSignalingUnreadMessageSyncNotify)&&this.options.onSignalingUnreadMessageSyncNotify(n);}},r.onSignalingMembersSyncNotify=function(e){if(e.error){var t=e.error;this.logger.error("protocal::avSignal:onSignalingMembersSyncNotify error",t),this.emitAPI({type:"error",error:t}),this.options.onerror(t);}else{var n=e.content.avSignalTag;Array.isArray(n)||(n=[n]),n=n.map(function(e){return o(e);}),this.emitAPI({type:"signalingChannelsSyncNotify",obj:n}),s.isFunction(this.options.onSignalingMembersSyncNotify)&&this.options.onSignalingMembersSyncNotify(n);}};},function(e,t,n){"use strict";var r=n(36).fn,s=n(119),i=n(3),o=(n(0),n(22));r.processMisc=function(e){switch(e.cmd){case"getSimpleNosToken":e.error||(e.obj=e.content.nosTokens[0]);break;case"getNosToken":e.error||(e.obj=e.content.nosToken);break;case"uploadSdkLogUrl":e.error?this.logger.error("uploadSdkLogUrl::error",e.error):this.logger.info("uploadSdkLogUrl::success",e.obj&&e.obj.url);break;case"notifyUploadLog":e.error||(i.isRN?this.uploadLocalLogRN():i.isBrowser&&this.uploadLocalLogWeb(),this.emitAPI({type:"notifyUploadLog"}));break;case"audioToText":e.error||(e.obj.text=e.content.text);break;case"processImage":e.obj.imageOps=s.reverseImageOps(e.obj.imageOps),e.error||(e.obj={url:e.content.url});break;case"getNosTokenTrans":e.error||(e.obj={nosToken:e.content.nosToken,docId:e.content.docId});break;case"getNosOriginUrl":e.error||(e.obj=e.content.nosFileUrlTag.originUrl);break;case"notifyTransLog":e.error||this.emitAPI({type:"notifyTransLog",obj:e.content.transInfo});break;case"fetchFile":case"fetchFileList":case"removeFile":e.error||(e.obj=e.content);break;case"getServerTime":e.obj=e.content&&e.content.time;break;case"getNosCdnHost":this.getNosCdnHost(e);}},r.uploadLocalLogRN=function(e){if(i.isRN&&o.rnfs){var t=o.rnfs,n=this,r=t.nimIndex,s=(t.nimIndex+1)%2;t.nimPromise=t.nimPromise.then(function(){return Promise.all([t.exists(a(r)),t.exists(a(s))]);}).then(function(e){return e&&(e[0]||e[1])?e[0]&&e[1]?t.copyFile(a(s),a(2)).then(function(){return t.readFile(a(r));}).then(function(e){return t.appendFile(a(2),e);}):e[0]?t.copyFile(a(r),a(2)):void(e[1]&&t.copyFile(a(s),a(2))):Promise.reject();}).then(function(e){return new Promise(function(e,r){n.api.previewFile({filePath:a(2),done:function done(r,s){if(Promise.all([t.unlink(a(2)),t.unlink(a(1)),t.unlink(a(0))]).finally(function(){e();}),r)n.logger.error("nim::uploadLocalLogRN:previewFile:error",r);else{var i=s.url;i.indexOf("?")>0?i+="&":i+="?",i+="download="+new Date().getTime()+"_rn.log",n.api.uploadSdkLogUrl({url:i});}}});});}).catch(function(e){t.unlink(a(2)).catch(function(e){}),n.logger.error("nim::protocol::uploadLocalLogRN",e);});}function a(e){return t.DocumentDirectoryPath+"/nimlog_"+e+".log";}},r.uploadLocalLogWeb=function(){var e=this;!1!==this.options.dbLog&&this.logger._local?this.logger._local.fetchLog().then(function(t){e.api.previewFile({blob:new Blob([t.logs],{type:"text/plain"}),done:function done(n,r){if(n)e.logger.error("uploadLocalLogWeb::previewFile:error",n);else{e.logger.log("uploadLocalLogWeb::previewFile:success",r);var s=r.url;s+=(s.indexOf("?")>0?"&":"?")+"download="+new Date().getTime()+"_web.log",e.api.uploadSdkLogUrl({url:s}),e.logger._local.deleteLogs(t.time).then(function(){e.logger.log("uploadLocalLogWeb::deleteLogs success");}).catch(function(t){return e.logger.error("uploadLocalLogWeb::deleteLogs:error ,",t);});}}});}).catch(function(t){e.logger.error("uploadLocalLogWeb::fetchLog:error",t);}):this.logger.warn("uploadLocalLogWeb::no dbLog");},r.getNosCdnHost=function(e){var t=this,n=e.error;if(n&&(n.callFunc="events::getNosCdnHost",t.onCustomError("getNosCdnHost","EVENT_GET_NOS_CDN_HOST_ERROR",n)),e.content&&e.content.nosConfigTag){var r=e.content.nosConfigTag,s="",o="";0!==r.expire&&r.cdnDomain?-1===r.expire?(s=r.cdnDomain,o=r.objectNamePrefix):(s=r.cdnDomain,o=r.objectNamePrefix,t.nosCdnHostTimer&&clearTimeout(t.nosCdnHostTimer),t.nosCdnHostTimer=setTimeout(function(){t.sendCmd("getNosCdnHost",{});},800*parseInt(r.expire))):(s="",o=""),i.serverNosConfig.cdnDomain=s,i.serverNosConfig.objectPrefix=o,i.hasLocalStorage&&(localStorage.setItem("nim_cdn_domain",s),localStorage.setItem("nim_object_prefix",o));}};},function(e,t,n){"use strict";var r=n(36).fn,s=n(3);r.processLink=function(e){switch(e.cmd){case"heartbeat":this.startHeartbeat();}},r.startHeartbeat=function(){var e=this;e.stopHeartbeat(),e.heartbeatTimer=setTimeout(function(){e.sendCmd("heartbeat",null,e.onHeartbeat.bind(e));},s.heartbeatInterval);},r.stopHeartbeat=function(){this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null);},r.onHeartbeat=function(e,t){if(e){if(this.syncing)return this.logger.warn("onHeartbeat::ignore error in connecting"),void this.startHeartbeat();e.callFunc="link::onHeartbeat",this.onCustomError("heartbeat error",e),this.heartbeatFail++,this.logger.warn("onHeartbeat::error ",e.code,e),"Error_Timeout"===e.code&&(this.getOnlineStatus()?this.heartbeatFail>1?(this.forceDisconnect(),this.onDisconnect(1,"link::onHeartbeat")):this.sendCmd("heartbeat",null,this.onHeartbeat.bind(this)):this.startHeartbeat());}else this.heartbeatFail=0;},r.getOnlineStatus="undefined"==typeof navigator&&"boolean"==typeof navigator.onLine?function(){return!0;}:function(){return navigator.onLine;},r.heartbeat=function(){};},function(e,t,n){"use strict";var r=n(43),s=n(64),i=n(42),o=n(74),a=n(99),c=Object.assign;e.exports=!c||n(34)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e;}),7!=c({},e)[n]||Object.keys(c({},t)).join("")!=r;})?function(e,t){for(var n=o(e),c=arguments.length,u=1,m=s.f,l=i.f;c>u;){for(var d,p=a(arguments[u++]),f=m?r(p).concat(m(p)):r(p),g=f.length,h=0;g>h;){l.call(p,d=f[h++])&&(n[d]=p[d]);}}return n;}:c;},function(e,t,n){var r=n(25);r(r.S+r.F,"Object",{assign:n(248)});},function(e,t,n){n(249),e.exports=n(11).Object.assign;},function(e,t,n){e.exports={default:n(250),__esModule:!0};},function(e,t,n){"use strict";var r,s=n(111),i=(r=s)&&r.__esModule?r:{default:r};var o,a=n(36).fn,c=n(15),u=n(33),m=n(84),l=n(22),d=n(3),p=n(95),f=n(0),g=f.notundef;a.login=function(){this.doLogin();},a.doLogin=function(){var e=this,t=this;Promise.resolve().then(function(){return t.assembleLogin();}).then(function(n){var r=e.socket&&e.socket.socket&&e.socket.socket.sessionid;if(r){if(e.socketIds||(e.socketIds={}),e.socketIds[r])return void e.logger.warn("onConnect::repeat login",r);e.socketIds[r]=!0;}else e.logger.warn("onConnect:: no socketId ",e.socket&&e.socket.socket);e.logger.warn("link::doLogin: "+r),t.sendCmd("login",(0,i.default)({},n),t.onLogin.bind(t)),t.autoconnect=!1;});},a.genSessionKey=(o={},function(){var e=this.name;return o[e]=o[e]||f.guid();}),a.assembleIMLogin=function(){var e=this.options,t=e.account,n=this.autoconnect?0:1;this.sdkSession=this.genSessionKey();var r={appLogin:n,appKey:e.appKey,account:t,token:e.token,sdkVersion:d.info.sdkVersion,sdkHumanVersion:d.info.sdkHumanVersion,protocolVersion:d.info.protocolVersion,os:u.os.toString(),browser:u.name+" "+u.version,clientType:d.CLIENTTYPE||16,session:this.sdkSession,deviceId:l.deviceId,isReactNative:d.isRN?1:0,customTag:e.customTag||""};return e.customClientType&&(r.customClientType=+e.customClientType),e.authType&&(r.authType=+e.authType),e.loginExt&&(r.loginExt=e.loginExt),r;},a.onLogin=function(e,t){var n=this,r=0;n.loginResult=t,e?n.onAuthError(e,"link::onLogin"):(this.heartbeatFail=0,this.hasLogin=!0,n.startHeartbeat(),n.afterLogin(t),n.initOnlineListener(),r=5e3),!0===n.options.logReport&&setTimeout(function(){var e={appKey:n.options.appKey,sdk_ver:d.info.version,deviceId:l.deviceId};p.reportErrEvent(e);},r);},a.afterLogin=f.emptyFunc,a.notifyLogin=function(){var e=this.loginResult;this.logger.info("link::notifyLogin: on connect",e),this.options.onconnect(e);},a.logout=function(){var e="done disconnect";if(this.doLogout)return this.doLogout=!1,e="done logout",void this.onAuthError(new c(e,"logout"),"link::logout");if(this.isConnected()){var t=new c(e,"logout");this.onAuthError(t,"link::logout");}},a.onKicked=function(e){var t=e.content,n=t.from,r=t.reason,s=t.custom,i=t.customClientType,o={reason:this.kickedReasons[r]||"unknown",message:this.kickedMessages[r]||"未知原因"};if(g(n)&&(o.from=m.reverseType(n)),g(s)&&(o.custom=s),+i>0&&(o.customClientType=i),this.logger.warn("link::onKicked:",o),"silentlyKick"!==o.reason){var a=new c("被踢了","kicked");f.merge(a,o),this.onAuthError(a,"link::onKicked");}else this.logger.warn("link::onKicked: silentlyKick"),this.forceDisconnect(),this.onDisconnect(1,"link::onKicked");},a.onAuthError=function(e,t){var n=e&&e.code;if(this.logger.error("onAuthError ",t,n),/^(Error_Internet_Disconnected|Error_Timeout|Error_Connection_Socket_State_not_Match)$/.test(n))return this.forceDisconnect(),void this.onDisconnect(1,"link::onAuthError::"+n);(e=e||c.newConnectionError({callFunc:t})).callFunc=e.callFunc||t||null,this.shouldReconnect=!1,this.markAllCallbackInvalid(e),this.notifyDisconnect(e);};},function(e,t){function n(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0;}e.exports=n,n.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=0==(1&Math.floor(10*t))?e-n:e+n;}return 0|Math.min(e,this.max);},n.prototype.reset=function(){this.attempts=0;},n.prototype.setMin=function(e){this.ms=e;},n.prototype.setMax=function(e){this.max=e;},n.prototype.setJitter=function(e){this.jitter=e;};},function(e,t,n){"use strict";var r=n(36).fn,s=n(15),i=n(253),o=n(117),a=n(3),c=n(0);r.initConnect=function(){this.socket=null,this.retryCount=0,this.connecting=!1,this.shouldReconnect=!0,this.hasNotifyDisconnected=!1,this.doLogout=!1;},r.resetConnect=function(){var e=this.options;c.notundef(e.needReconnect)?(c.verifyParamType("needReconnect",e.needReconnect,"boolean","link::resetConnect"),this.needReconnect=e.needReconnect):this.needReconnect=!0,this.logger.info("link::resetConnect: needReconnect "+this.needReconnect),c.notundef(e.reconnectionAttempts)&&c.verifyParamType("reconnectionAttempts",e.reconnectionAttempts,"number","link::resetConnect"),c.notundef(e.noCacheLinkUrl)&&c.verifyParamType("noCacheLinkUrl",e.noCacheLinkUrl,"boolean","link::resetConnect"),this.reconnectionAttempts="number"==typeof e.reconnectionAttempts?e.reconnectionAttempts:1/0,this.backoff=new i({min:a.reconnectionDelay,max:a.reconnectionDelayMax,jitter:a.reconnectionJitter});},r.connect=function(e){if(clearTimeout(this.connectTimer),this.isConnected())this.logger.warn("link::connect: already connected");else if(this.connecting)this.logger.warn("link::connect: already connecting");else if(this.connecting=!0,this.hasNotifyDisconnected=!1,this.socket&&this.forceDisconnect(),this.logger.info("link::connect: connect to new socket。option autoconnect "+this.options.autoconnect+" "+this.autoconnect),"string"==typeof this.options.socketUrl)this.connectToUrl(this.options.socketUrl);else{var t=this.getNextSocketUrl();t&&!this.options.noCacheLinkUrl?this.connectToUrl(t):this.refreshSocketUrl();}},r.getNextSocketUrl=function(){return this.socketUrls.shift();},r.isConnected=function(){return!!this.socket&&!!this.socket.socket&&this.socket.socket.connected;},r.connectToUrl=function(e){var t=this;if(e=e||"",t.logger.info("link::connectToUrl: "+e),"undefined"==typeof window){var n=c.getGlobal(),r=e.split(":");n&&!n.location&&r.length>1&&(n.location={protocol:r.shift(),port:r.pop(),hostname:r.join("")}),this.options.transports=["websocket"];}var s=this.options.transports||["websocket","xhr-polling"];t.socket=o.connect(e,{transports:s,reconnect:!1,"force new connection":!0,"connect timeout":a.connectTimeout}),t.logger.info("link::connectToUrl: socket url: "+e+", transports: "+JSON.stringify(s)),t.socket.on("connect",t.onConnect.bind(t)),t.socket.on("handshake_failed",t.onHandshakeFailed.bind(t)),t.socket.on("connect_failed",t.onConnectFailed.bind(t)),t.socket.on("error",t.onError.bind(t)),t.socket.on("message",t.onMessage.bind(t)),t.socket.on("disconnect",function(n){t.logger.warn("link::connectToUrl: socket url: "+e+", disconnected"),t.hasLogin=!1,t.doLogout?t.logout():t.onDisconnect(!0,"link::socketDisconnect");});},r.disconnect=function(e){var t=this;function n(n){t.logger.info("link::disconnect: socket finally closed, ",n),clearTimeout(t.disconnectCallbackTimer),e(n);}e instanceof Function||(e=function e(){}),clearTimeout(t.connectTimer),t.disconnectCallbackTimer=setTimeout(function(){e.call(t,"mark disconnected due to timeout");},1e4),t.socket&&t.socket.socket&&t.socket.socket.transport?t.socket.socket.transport.onDisconnectDone=function(e){n(e);}:n(null),t.isConnected()?(t.logger.warn("link::disconnect: start disconnecting"),t.logout()):t.connecting?(t.logger.warn("link::disconnect: abort connecting"),t.disconnectSocket()):(t.logger.warn("link::disconnect: start otherwise"),t.connecting=!1,t.shouldReconnect=!1,t.needReconnect=!1,t.socket=null,t.options.ondisconnect({callFunc:"link::disconnect",message:"manually disconnect status"}));},r.onConnect=function(){this.backoff&&this.backoff.reset(),this.retryCount=0,this.connecting=!1,this.shouldReconnect=!0,this.hasNotifyDisconnected=!1,this.logger.info("link::onConnect: socket onconnected, start login"),this.login(),this.api.reportLogs({event:"ws_connected"});},r.onHandshakeFailed=function(){this.logger.warn("link::onHandshakeFailed: shandshake failed"),this.api.reportLogs({event:"ws_handshake_failed"}),this.onDisconnect(1,"link::onHandshakeFailed");},r.onConnectFailed=function(){this.api.reportLogs({event:"ws_connect_failed"}),this.onDisconnect(1,"link::onConnectFailed");},r.onError=function(){var e=arguments[0];if(e){if(this.api.reportLogs({event:"connect_timeout"}),void 0!==e.x5ImgDecodeStatus)return;if("[object Object]"===Object.prototype.toString.call(e)&&Object.keys(e).length<=0)return;this.onMiscError("连接错误",new s(e,"LINK_ERROR",{callFunc:"link::onError"}));}this.connecting=!1;},r.onDisconnect=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.logger.warn("socket::onDisconnect: "+t+" "+e),1!==e&&(this.connected=e),this.connecting=!1,this.markAllCallbackInvalid(s.newNetworkError({callFunc:t})),this.stopHeartbeat(),this.reconnect();},r.willReconnect=function(){return this.shouldReconnect&&this.needReconnect&&this.retryCount<this.reconnectionAttempts;},r.reconnect=function(){this.willReconnect()?(this.socket&&(this.logger.info("link::reconnect: try to force disconnect"),this.forceDisconnect()),this.doReconnect()):this.notifyDisconnect();},r.doReconnect=function(){var e=this;this.logger.warn("doReconnect"),e.socket=null,e.connected&&(e.autoconnect=!0),e.retryCount++,e.appLogin=1,e.hasLogin=!1;var t=e.backoff.duration();e.logger.info("link::reconnect: will retry after "+t+"ms, retryCount "+e.retryCount);var n=e.options.onwillreconnect({retryCount:e.retryCount,duration:t});clearTimeout(e.connectTimer),e.connectTimer=setTimeout(function(){1==+e.options.authType&&n instanceof Promise?(e.logger.info("link::reconnect: wait onwillreconnect promise"),n.finally(function(){return e.connect();})):e.connect();},t);},r.notifyConnectError=function(e){var t=s.newConnectError({message:e,callFunc:"link::notifyConnectError"});this.logger.error("link::notifyConnectError:",t),this.options.onerror(t);},r.notifyDisconnect=function(e){this.hasNotifyDisconnected?this.logger.warn("notifyDisconnect:: already notified"):(this.hasNotifyDisconnected=!0,this.disconnectSocket(),this.forceDisconnect(),(e=e||new s()).retryCount=this.retryCount,e.willReconnect=this.willReconnect(),this.backoff&&this.backoff.reset(),this.retryCount=0,this.logger.info("link::notifyDisconnect: ondisconnected",e),this.options.ondisconnect(e),this.onWbNotifyHangup instanceof Function&&this.onWbNotifyHangup({content:{account:this.account,channelId:null,timetag:+Date()}}));},r.disconnectSocket=function(){if(this.isConnected()||this.connecting){this.connecting=!1,this.shouldReconnect=!1;try{this.socket.disconnect();}catch(e){this.socket&&"function"==typeof this.socket.removeAllListeners&&this.socket.removeAllListeners(),this.logger.info("link::disconnectSocket: disconnect failed, error ",e);}}},r.initOnlineListener=function(e){this.needReconnect&&this.options&&this.options.quickReconnect?"undefined"!=typeof window&&c.isFunction(window.addEventListener)?this.onlineListener||(this.onlineListener=function(){var e=this;if(this.logger.log("onlineListener start"),!this||!this.isConnected()||this.connecting)return void this.logger.log("onlineListener disconnected or connecting",this&&this.isConnected(),this.connecting);this.stopHeartbeat(),this.sendCmd("heartbeat",null,function(t){if(t){e.logger.info("onlineListener heartbeat detect error",t);try{e.forceDisconnect(),e.onDisconnect(1,"link::onHeartbeat");}catch(t){e.logger.info("onlineListener heartbeat websocket.onclose",t);}}else e.logger.log("onlineListener heartbeat detect success");});}.bind(this),this.logger.info("initOnlineListener success"),window.addEventListener("online",this.onlineListener)):this.logger.warn("initOnlineListener no window.addEventListener"):this.logger.warn("initOnlineListener no quickReconnect");},r.forceDisconnect=function(){var e=this.socket||{};this.socket=null,"function"==typeof e.removeAllListeners&&e.removeAllListeners(),"function"==typeof e.disconnect&&e.disconnect(),this.hasLogin=!1;};},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(26).fn,a=n(0),c=n(86),u=n(118);o.signalingCreate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.type,n=e.channelName,r=e.ext;return a.verifyOptions(e,"type","api::signalling"),this.sendCmdUsePromise("signalingCreate",{avSignalTag:{type:t,channelName:n,ext:r}}).then(function(e){var t=e.avSignalTag;return Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingDelay=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a.verifyOptions(e,"channelId","api::signalling"),this.sendCmdUsePromise("signalingDelay",{avSignalTag:e}).then(function(e){var t=e.avSignalTag;return Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingClose=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.offlineEnabled;return a.verifyOptions(e,"channelId","api::signalling"),this.sendCmdUsePromise("signalingClose",{avSignalTag:a.merge(e,{isSave:!0===t?1:0})}).then(function(e){var t=e.avSignalTag;return t.offlineEnabled=1===t.isSave,delete t.isSave,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingJoin=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.offlineEnabled;return a.verifyOptions(e,"channelId","api::signalling"),this.sendCmdUsePromise("signalingJoin",{avSignalTag:a.merge(e,{isSave:!0===t?1:0})}).then(function(e){var t=e.avSignalTag,n=t.members;return"string"==typeof t.members&&(n=JSON.parse(t.members).map(function(e){return u.parseAvSignalMember(e);})),t.members=n,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingLeave=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.offlineEnabled;return a.verifyOptions(e,"channelId","api::signalling"),this.sendCmdUsePromise("signalingLeave",{avSignalTag:a.merge(e,{isSave:!0===t?1:0})}).then(function(e){var t=e.avSignalTag;return t.offlineEnabled=1===t.isSave,delete t.isSave,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingGetChannelInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.channelName;return a.verifyOptions(e,"channelName","api::signalling"),this.sendCmdUsePromise("signalingGetChannelInfo",{avSignalTag:{channelName:t}}).then(function(e){var t=e.avSignalTag,n=t.members;return"string"==typeof t.members&&(n=JSON.parse(t.members).map(function(e){return u.parseAvSignalMember(e);})),t.members=n,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingInvite=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.account,n=e.offlineEnabled,r=e.pushInfo,s=void 0===r?{}:r;a.verifyOptions(e,"channelId requestId account","api::signalling"),"object"===(0,i.default)(s.pushPayload)&&(s.pushPayload=JSON.stringify(s.pushPayload));var o=a.merge(e,s,{to:t,isSave:!0===n?1:0,needPush:!0===s.needPush?1:0,needBadge:!1===s.needBadge?0:1});return this.sendCmdUsePromise("signalingInvite",{avSignalTag:o}).then(function(e){var t=e.avSignalTag;return t.offlineEnabled=1===t.isSave,t.needBadge=1===t.needBadge,t.needPush=1===t.needPush,delete t.isSave,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingCancel=function(e){var t=e.account,n=e.offlineEnabled;return a.verifyOptions(e,"channelId requestId account","api::signalling"),this.sendCmdUsePromise("signalingCancel",{avSignalTag:a.merge(e,{to:t,isSave:!0===n?1:0})}).then(function(e){var t=e.avSignalTag;return t.offlineEnabled=1===t.isSave,delete t.isSave,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingCreateAndJoin=function(e){var t=this,n=e.channelName,r=e.uid,s=void 0===r?0:r,i=e.offlineEnabled,o=void 0===i||i,c=e.attachExt,u=void 0===c?"":c;return this.signalingCreate(e).catch(function(e){return 10405===e.code?(t.logger.warn("api::avSignal:signalingCall room already exists:",e),t.signalingGetChannelInfo({channelName:n})):Promise.reject(e);}).then(function(e){var n={channelId:e.channelId,offlineEnabled:o,attachExt:u};return s&&a.merge(n,{uid:s}),t.signalingJoin(n);});},o.signalingCall=function(e){var t=this,n=e.account,r=e.offlineEnabled,s=e.requestId;a.verifyOptions(e,"type requestId account","api::signalling");var i="";return this.signalingCreateAndJoin(e).then(function(o){t.logger.info("api::avSignal:signalingCall join:",o);var a={channelId:i=o.channelId||i,account:n,requestId:s,offlineEnabled:r,attachExt:e.attachExt||"",pushInfo:e.pushInfo||{}};return t.signalingInvite(a);});},o.signalingReject=function(e){var t=e.account,n=e.offlineEnabled;return a.verifyOptions(e,"channelId requestId account","api::signalling"),this.sendCmdUsePromise("signalingReject",{avSignalTag:a.merge(e,{to:t,isSave:!0===n?1:0})}).then(function(e){var t=e.avSignalTag;return t.offlineEnabled=1===t.isSave,delete t.isSave,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingAccept=function(e){var t=this,n=e.account,r=e.offlineEnabled;return a.verifyOptions(e,"channelId requestId account","api::signalling"),this.sendCmdUsePromise("signalingAccept",{avSignalTag:a.merge(e,{to:n,isSave:!0===r?1:0})}).then(function(e){var t=e.avSignalTag;return t.offlineEnabled=1===t.isSave,delete t.isSave,Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));}).then(function(n){if(e.autoJoin){var r={channelId:e.channelId,offlineEnabled:e.offlineEnabled,attachExt:e.joinAttachExt,uid:e.uid};return t.signalingJoin(r);}return n;});},o.signalingControl=function(e){var t=e.account;return a.verifyOptions(e,"channelId","api::signalling"),this.sendCmdUsePromise("signalingControl",{avSignalTag:a.merge(e,t?{to:t}:{})}).then(function(e){var t=e.avSignalTag;return Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingSync=function(){return this.sendCmdUsePromise("sync",{sync:{avSignal:0}}).then(function(e){var t=e.avSignalTag;return Promise.resolve(t);}).catch(function(e){return Promise.reject(u.parseAvSignalError(e));});},o.signalingMarkMsgRead=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a.verifyOptions(e,"msgid","api::signalling");var t=c.idMap.avSignal,n=void 0;return n="string"==typeof e.msgid?[e.msgid]:e.msgid,this.sendCmd("batchMarkRead",{sid:t.id,cid:t.signalingNotify,ids:n});};},function(e,t,n){"use strict";var r=n(26).fn,s=n(0),i=n(30),o=n(3),a=n(33);(a=a||{}).name=a.name||"",a.version=a.version||"",r.reportLogs=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,n=t.options,r=o.ntServerAddress;if(r){var c=o.info;e=s.merge(e,{appkey:n.appKey,uid:n.account,os:"web",session:t.protocol.sdkSession||"",ver:c.sdkVersion,type:t.subType,platform:""+a.name.toLowerCase()+a.version.replace(/(\.\d+)+$/,"")});var u=r+s.genUrlSep(r),m=[];for(var l in e){m.push(l+"="+e[l]);}u+=m.join("&"),i(u,{proxyUrl:s.url2origin(u)+"/lbs/res/cors/nej_proxy_frame.html",timeout:o.xhrTimeout,onload:function onload(){},onerror:function onerror(e){t.logger.error("report::ajax report error",e);}});}};},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(0),a=n(26).fn;function c(e,t,n,r){var s=!1,i="";if(1===n?e.indexOf(t)>=0&&(s=!0,i=t):2===n&&(i=new RegExp(t,"g")).test(e)&&(s=!0),s&&""!==i)switch(r){case 1:return e.replace(i,"**");case 2:return{code:2};case 3:return{code:3};}return e;}function u(e,t){for(var n=t.match,r=t.operate,s=e,o=0;o<t.keys.length;o++){var a=t.keys[o],u=a.match||n,m=a.operate||r;try{if("object"===(void 0===(s=c(s,a.key,u,m))?"undefined":(0,i.default)(s)))return s;}catch(e){this.logger.warn("misc::filterContent: js cannot parse this regexp ",e);}}return s;}a.uploadSdkLogUrl=function(e){return o.verifyOptions(e,"url","misc::uploadSdkLogUrl"),this.cbAndSendCmd("uploadSdkLogUrl",e);},a.getClientAntispamLexicon=function(e){var t=this,n=(e=e||{}).done;n instanceof Function||(n=function n(){}),e={clientAntispam:{version:0}};var r=this;return this.protocol.sendCmd("getClientAntispam",e,function(e,s,i){e?(r.protocol.logger.error("misc::getClientAntispamLexicon:",e),n.call(t,e,{})):(n.call(t,null,i),r.antispamLexicon=i.clientAntispam||{});});},a.filterClientAntispam=function(e){var t=e.content,n=e.antispamLexicon;if(!t)return{code:404,errmsg:"待反垃圾文本content不存在"};n=n||this.antispamLexicon||{};var r=this.antispamLexicon&&this.antispamLexicon.thesaurus;if(!r)return{code:404,errmsg:"没有反垃圾词库或者词库格式不合法"};try{r=JSON.parse(r).thesaurus;}catch(e){return this.protocol.logger.error("misc::filterClientAntispam: parse thesaurus error"),{code:500,errmsg:"反垃圾词库格式不合法"};}for(var s=t,o=0;o<r.length;o++){if("object"===(void 0===(s=u.call(this,s,r[o]))?"undefined":(0,i.default)(s))){if(2===s.code)return{code:200,type:2,errmsg:"建议拒绝发送",content:t,result:""};if(3===s.code)return{code:200,type:3,errmsg:"建议服务器处理反垃圾，发消息带上字段clientAntiSpam",content:t,result:t};}}return s===t?{code:200,type:0,errmsg:"",content:t,result:s}:{code:200,type:1,errmsg:"已对特殊字符做了过滤",content:t,result:s};},a.getServerTime=function(e){this.processCallback(e),this.sendCmd("getServerTime",{},e.callback);},a.getNosAccessToken=function(e){o.verifyOptions(e,"url","misc::getNosAccessToken"),this.processCallback(e);var t={url:e.url};e.userAgent&&(t.userAgent=e.userAgentv),e.ext&&(t.ext=e.ext),this.sendCmd("getNosAccessToken",{nosAccessTokenTag:t},function(t,n,r){var s=r&&r.nosAccessTokenTag&&r.nosAccessTokenTag.token,i=e.url,o=s?{token:s,resUrl:i.indexOf("?")?i+"&token="+s:i+"?token="+s}:{};e.done(t,o);});},a.deleteNosAccessToken=function(e){o.verifyOptions(e,"token","misc::deleteNosAccessToken"),this.processCallback(e),this.sendCmd("deleteNosAccessToken",{nosAccessTokenTag:{token:e.token}},e.callback);};},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r},o=n(41);var a,c=n(0),u=n(26).fn;u.viewImageSync=function(e){var t=this.options;c.verifyOptions(e,"url","nos::viewImageSync");var n=e.url,r=(0,o.url2object)(n),s=r.protocol,a=r.hostname,u=r.path,m=r.query;if("boolean"==typeof e.strip&&(m.stripmeta=e.strip?1:0),"number"==typeof e.quality&&(c.verifyParamMin("quality",e.quality,0,"nos::viewImageSync"),c.verifyParamMax("quality",e.quality,100,"nos::viewImageSync"),m.quality=Math.round(e.quality)),"boolean"==typeof e.interlace&&(m.interlace=e.interlace?1:0),"number"==typeof e.rotate&&(m.rotate=Math.round(e.rotate)),"object"===(0,i.default)(e.thumbnail)){var l=e.thumbnail.mode||"crop",d=e.thumbnail.width,p=e.thumbnail.height;if(d>=0&&p>=0&&d<4096&&p<4096&&(d>0||p>0)){switch(l){case"crop":l="y";break;case"contain":l="x";break;case"cover":l="z";break;default:l="x";}m.thumbnail=""+d+l+p;}}if(t.downloadUrl){var f=(0,o.url2object)(e.url),g=t.downloadUrl,h=f.path,y=h.indexOf("/");if(-1!==y){var v=h.substring(0,y),b=h.substring(y+1);g=g.replace("{bucket}",v).replace("{object}",b);}var T=(0,o.url2object)(g);return(0,o.object2url)({protocol:T.protocol,hostname:T.hostname,path:T.path,query:c.merge(T.query,m)});}return(0,o.object2url)({protocol:s,hostname:a,path:u,query:m});},u.viewImageStripMeta=function(e){c.verifyOptions(e,"url strip","nos::viewImageStripMeta"),c.verifyParamType("strip",e.strip,"boolean","nos::viewImageStripMeta");var t="stripmeta="+(e.strip?1:0),n=(0,o.genUrlSep)(e.url);return e.url+n+t;},u.viewImageQuality=function(e){c.verifyOptions(e,"url quality","nos::viewImageQuality"),c.verifyParamType("quality",e.quality,"number","nos::viewImageQuality"),c.verifyParamMin("quality",e.quality,0,"nos::viewImageQuality"),c.verifyParamMax("quality",e.quality,100,"nos::viewImageQuality");var t="quality="+Math.round(e.quality),n=(0,o.genUrlSep)(e.url);return e.url+n+t;},u.viewImageInterlace=function(e){c.verifyOptions(e,"url","nos::viewImageInterlace");var t=(0,o.genUrlSep)(e.url);return e.url+t+"interlace=1";},u.viewImageRotate=function(e){for(c.verifyOptions(e,"url angle","nos::viewImageRotate"),c.verifyParamType("angle",e.angle,"number","nos::viewImageRotate");e.angle<0;){e.angle=e.angle+360;}e.angle=e.angle%360;var t="rotate="+Math.round(e.angle),n=(0,o.genUrlSep)(e.url);return e.url+n+t;},u.viewImageBlur=function(e){c.verifyOptions(e,"url radius sigma","nos::viewImageBlur"),c.verifyParamType("radius",e.radius,"number","nos::viewImageBlur"),c.verifyParamMin("radius",e.radius,1,"nos::viewImageBlur"),c.verifyParamMax("radius",e.radius,50,"nos::viewImageBlur"),c.verifyParamType("sigma",e.sigma,"number","nos::viewImageBlur"),c.verifyParamMin("sigma",e.sigma,0,"nos::viewImageBlur");var t="blur="+Math.round(e.radius)+"x"+Math.round(e.sigma),n=(0,o.genUrlSep)(e.url);return e.url+n+t;},u.viewImageCrop=function(e){c.verifyOptions(e,"url x y width height","nos::viewImageCrop"),c.verifyParamType("x",e.x,"number","nos::viewImageCrop"),c.verifyParamMin("x",e.x,0,"nos::viewImageCrop"),c.verifyParamType("y",e.y,"number","nos::viewImageCrop"),c.verifyParamMin("y",e.y,0,"nos::viewImageCrop"),c.verifyParamType("width",e.width,"number","nos::viewImageCrop"),c.verifyParamMin("width",e.width,0,"nos::viewImageCrop"),c.verifyParamType("height",e.height,"number","nos::viewImageCrop"),c.verifyParamMin("height",e.height,0,"nos::viewImageCrop");var t="crop="+Math.round(e.x)+"_"+Math.round(e.y)+"_"+Math.round(e.width)+"_"+Math.round(e.height),n=(0,o.genUrlSep)(e.url);return e.url+n+t;},u.viewImageThumbnail=(a={cover:"z",contain:"x",crop:"y"},function(e){c.verifyOptions(e,"url mode","nos::viewImageThumbnail"),c.verifyParamValid("mode",e.mode,Object.keys(a),"nos::viewImageThumbnail"),"contain"===e.mode?c.verifyParamAtLeastPresentOne(e,"width height","nos::viewImageThumbnail"):c.verifyOptions(e,"width height","nos::viewImageThumbnail"),c.undef(e.width)&&(e.width=0),c.undef(e.height)&&(e.height=0),c.verifyParamType("width",e.width,"number","nos::viewImageThumbnail"),c.verifyParamMin("width",e.width,0,"nos::viewImageThumbnail"),c.verifyParamType("height",e.height,"number","nos::viewImageThumbnail"),c.verifyParamMin("height",e.height,0,"nos::viewImageThumbnail");var t=Math.round(e.width),n=Math.round(e.height),r="thumbnail="+t+a[e.mode]+n;"crop"===e.mode&&c.notundef(e.axis)&&(c.undef(e.axis.x)&&(e.axis.x=5),c.undef(e.axis.y)&&(e.axis.y=5),c.verifyParamMin("axis.x",e.axis.x,0,"nos::viewImageThumbnail"),c.verifyParamMax("axis.x",e.axis.x,10,"nos::viewImageThumbnail"),c.verifyParamMin("axis.y",e.axis.y,0,"nos::viewImageThumbnail"),c.verifyParamMax("axis.y",e.axis.y,10,"nos::viewImageThumbnail"),r=r+"&axis="+Math.round(e.axis.x)+"_"+Math.round(e.axis.y)),c.notundef(e.enlarge)&&(c.verifyParamType("enlarge",e.enlarge,"boolean","nos::viewImageThumbnail"),e.enlarge&&(r+="&enlarge=1"));var s=(0,o.genUrlSep)(e.url);return e.url+s+r;});},function(e,t,n){"use strict";var r,s=n(0),i=n(26).fn,o=n(119),a=n(122),c=n(15);i.transDoc=function(e){s.verifyOptions(e,"fileInput done","nos::transDoc");try{var t=e.fileInput.files[0],n=e.fileInputName=t.name,r={ppt:1,pptx:2,pdf:3,doc:6,docx:7},i=n.substring(n.lastIndexOf(".")+1);if(["ppt","pdf","pptx","doc","docx"].indexOf(i)<0)return void e.done(c.newNoFileError("请上传正确格式的文件【ppt, pptx, pdf, doc, docx】",{callFunc:"nos: transDoc",fileInput:e.fileInput}),e);}catch(t){return void e.done(c.newNoFileError("请上传正确的文件节点",{callFunc:"msg::previewFile",fileInput:e.fileInput}),e);}var o=JSON.stringify(a.genResponseBody("file")||{}).replace(/"/gi,'\\"'),u={transToken:{name:n,type:r[i],transType:"png"===e.transcode?11:10,size:t.size,body:o}};this.getNosTokenTrans({responseBody:u,nosToken:{nosScene:e.nosScene||this.nosScene,nosSurvivalTime:e.nosSurvivalTime},callback:function(t,n){t?e.done(t):(e.nosToken=n.nosToken,e.docId=n.docId,this._doPreviewFile(e));}.bind(this)});},i.getSimpleNosToken=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.num=1,s.verifyOptions(e),this.cbAndSendCmd("getSimpleNosToken",e);},i.getNosToken=function(e){var t=e.callback,n=e.nosToken,r=e.responseBody,s={tag:n.nosScene};n.nosSurvivalTime&&n.nosSurvivalTime!==1/0&&(s.expireSec=n.nosSurvivalTime),this.sendCmd("getNosToken",{responseBody:r,nosToken:s},t);},i.getNosTokenTrans=function(e){this.sendCmd("getNosTokenTrans",e.responseBody,e.callback);},i.packFileDownloadName=function(e){s.verifyOptions(e,"url name",!0,"","nos::packFileDownloadName");var t=e.url;return t+s.genUrlSep(t)+"download="+encodeURIComponent(e.name);},i.audioToMp3=function(e){s.verifyOptions(e,"url","nos::audioToMp3");var t=e.url;return t+s.genUrlSep(t)+"audioTrans&type=mp3";},i.removeFile=function(e){this.sendCmd("removeFile",e,e.callback);},i.fetchFile=function(e){this.sendCmd("fetchFile",e,e.callback);},i.fetchFileList=function(e){this.sendCmd("fetchFileList",e,e.callback);},i.stripImageMeta=function(e){return this.beforeProcessImage(e,"stripmeta");},i.qualityImage=function(e){return this.beforeProcessImage(e,"quality");},i.interlaceImage=function(e){return this.beforeProcessImage(e,"interlace");},i.rotateImage=function(e){return this.beforeProcessImage(e,"rotate");},i.blurImage=function(e){return this.beforeProcessImage(e,"blur");},i.cropImage=function(e){return this.beforeProcessImage(e,"crop");},i.thumbnailImage=function(e){return this.beforeProcessImage(e,"thumbnail");},i.beforeProcessImage=function(e,t){var n=s.copy(e);return n.type=t,e.ops=[n],this.processImage(e);},i.processImage=function(e){var t=this;s.verifyOptions(e,"url ops",!0,"","nos::processImage"),s.verifyParamType("ops",e.ops,"array","nos::processImage");var n=e.ops.map(function(e){return s.verifyOptions(e,"type",!0,"","nos::processImage"),s.verifyParamValid("type",e.type,o.validTypes,"nos::processImage"),t["gen"+e.type.slice(0,1).toUpperCase()+e.type.slice(1)+"Op"](e);});t.processCallback(e),t.sendCmd("processImage",{url:e.url,imageOps:n},e.callback);},i.genStripmetaOp=function(e){return new o({type:e.type,stripmeta:e.strip?1:0});},i.genQualityOp=function(e){s.verifyOptions(e,"quality",!0,"","nos::genQualityOp"),s.verifyParamType("quality",e.quality,"number","nos::genQualityOp"),s.verifyParamMin("quality",e.quality,0,"nos::genQualityOp"),s.verifyParamMax("quality",e.quality,100,"nos::genQualityOp");var t=Math.round(e.quality);return new o({type:e.type,qualityQuality:t});},i.genInterlaceOp=function(e){return new o({type:e.type});},i.genRotateOp=function(e){for(s.verifyOptions(e,"angle",!0,"","nos::genRotateOp"),s.verifyParamType("angle",e.angle,"number","nos::genRotateOp");e.angle<0;){e.angle=e.angle+360;}e.angle=e.angle%360;var t=Math.round(e.angle);return new o({type:e.type,rotateAngle:t});},i.genBlurOp=function(e){s.verifyOptions(e,"radius sigma","nos::genBlurOp"),s.verifyParamType("radius",e.radius,"number","nos::genBlurOp"),s.verifyParamMin("radius",e.radius,1,"nos::genBlurOp"),s.verifyParamMax("radius",e.radius,50,"nos::genBlurOp"),s.verifyParamType("sigma",e.sigma,"number","nos::genBlurOp"),s.verifyParamMin("sigma",e.sigma,0,"nos::genBlurOp");var t=Math.round(e.radius),n=Math.round(e.sigma);return new o({type:e.type,blurRadius:t,blurSigma:n});},i.genCropOp=function(e){s.verifyOptions(e,"x y width height","nos::genCropOp"),s.verifyParamType("x",e.x,"number","nos::genCropOp"),s.verifyParamMin("x",e.x,0,"nos::genCropOp"),s.verifyParamType("y",e.y,"number","nos::genCropOp"),s.verifyParamMin("y",e.y,0,"nos::genCropOp"),s.verifyParamType("width",e.width,"number","nos::genCropOp"),s.verifyParamMin("width",e.width,0,"nos::genCropOp"),s.verifyParamType("height",e.height,"number","nos::genCropOp"),s.verifyParamMin("height",e.height,0,"nos::genCropOp");var t=Math.round(e.x),n=Math.round(e.y),r=Math.round(e.width),i=Math.round(e.height);return new o({type:e.type,cropX:t,cropY:n,cropWidth:r,cropHeight:i});},i.genThumbnailOp=(r={cover:"z",contain:"x",crop:"y"},function(e){s.verifyOptions(e,"mode","nos::genThumbnailOp"),s.verifyParamValid("mode",e.mode,Object.keys(r),"nos::genThumbnailOp"),"contain"===e.mode?s.verifyParamAtLeastPresentOne(e,"width height","nos::genThumbnailOp"):s.verifyOptions(e,"width height","nos::genThumbnailOp"),s.undef(e.width)&&(e.width=0),s.undef(e.height)&&(e.height=0),s.verifyParamType("width",e.width,"number","nos::genThumbnailOp"),s.verifyParamMin("width",e.width,0,"nos::genThumbnailOp"),s.verifyParamType("height",e.height,"number","nos::genThumbnailOp"),s.verifyParamMin("height",e.height,0,"nos::genThumbnailOp");var t=Math.round(e.width),n=Math.round(e.height),i=new o({type:e.type,thumbnailMode:r[e.mode],thumbnailWidth:t,thumbnailHeight:n});if("crop"===e.mode&&s.notundef(e.axis)){s.undef(e.axis.x)&&(e.axis.x=5),s.undef(e.axis.y)&&(e.axis.y=5),s.verifyParamMin("axis.x",e.axis.x,0,"nos::genThumbnailOp"),s.verifyParamMax("axis.x",e.axis.x,10,"nos::genThumbnailOp"),s.verifyParamMin("axis.y",e.axis.y,0,"nos::genThumbnailOp"),s.verifyParamMax("axis.y",e.axis.y,10,"nos::genThumbnailOp");var a=Math.round(e.axis.x),c=Math.round(e.axis.y);i.thumbnailAxisX=a,i.thumbnailAxisY=c;}return s.notundef(e.enlarge)&&(s.verifyParamType("enlarge",e.enlarge,"boolean","nos::genThumbnailOp"),e.enlarge&&(i.thumbnailEnlarge=1)),i.thumbnailToStatic=this.options.thumbnailToStatic?1:0,i;}),i.getNosOriginUrl=function(e){s.verifyOptions(e,"safeShortUrl",!0,"","nos::getNosOriginUrl"),s.verifyParamType("safeShortUrl",e.safeShortUrl,"string","nos::getNosOriginUrl"),/^http(s)?:/.test(e.safeShortUrl)&&~e.safeShortUrl.indexOf("im_url=1")?(this.processCallback(e),this.sendCmd("getNosOriginUrl",{nosFileUrlTag:{safeUrl:e.safeShortUrl}},e.callback)):e.done(new c("参数 “safeShortUrl” 内容非文件安全短链",{callFunc:"nos: getNosOriginUrl"}),e);};},function(e,t,n){"use strict";var r=n(3),s=r.chunkSize,i=n(63),o={mp4:"video/mp4",avi:"video/x-msvideo",wmv:"video/x-ms-wmv",mpeg:"video/mpeg",mov:"video/quicktime",aac:"audio/x-aac",wma:"audio/x-ms-wma",wav:"audio/x-wav",mp3:"audio/mp3"};e.exports=function e(t,n,a,c){var u={file:t.data[n],fileSize:t.data[n].size,fileUploadedSize:0,percentage:0},m=t.url;function l(e){var n=u.fileUploadedSize+e.loaded,r=Math.floor(1e4*n/u.fileSize)/100;if(parseInt(r)>=100&&(r=100,l=function l(){}),u.percentage!==r){u.percentage=r;var s={docId:t.docId,total:u.fileSize,loaded:n,percentage:r,percentageText:r+"%"};t.fileInput&&(s.fileInput=t.fileInput),t.blob&&(s.blob=t.blob),t.uploadprogress(s);}}function d(e){try{e=JSON.parse(e);}catch(e){return void a.onError(e);}if(e.errMsg||e.errCode)a.onError(e);else if(e.offset<u.fileSize)delete h.onaftersend,u.fileUploadedSize=e.offset,a.sn=function(e,t,n,r){var o=e.offset,a=e.offset+s;return t.data=r.file.slice(o,a),t.query.offset=e.offset,t.query.complete=a>=r.fileSize,t.query.context=e.context,t.onuploading=l,t.onload=d,t.onerror=p,i(m,t);}(e,h,0,u);else{var n=r.genFileUrl(t.nosToken);"image"===t.type?i(n+"?imageInfo",{onload:function onload(n){try{n=JSON.parse(n),t.uploaddone(null,{docId:e.docId,w:n.Width,h:n.Height,orientation:n.Orientation||"",type:n.Type,size:n.Size||u.fileSize});}catch(e){o(e);}},onerror:function onerror(r){if("undefined"!=typeof Image){var s=new Image();s.src=n,s.onload=function(){t.uploaddone(null,{docId:e.docId,w:s.width,h:s.height,size:u.fileSize});};}else o(r);}}):"video"===t.type||"audio"===t.type?i(n+"?vinfo",{onload:function onload(n){try{(n=JSON.parse(n)).GetVideoInfo&&n.GetVideoInfo.VideoInfo&&(n=n.GetVideoInfo.VideoInfo),t.uploaddone(null,{docId:e.docId,w:n.Width,h:n.Height,dur:n.Duration,orientation:n.Rotate,audioCodec:n.AudioCodec,videoCodec:n.VideoCodec,container:n.Container,size:n.Size||u.fileSize});}catch(e){o(e);}},onerror:o}):t.uploaddone(null,{docId:e.docId,size:u.fileSize});}function o(e){a.onError(e);}}function p(r){var s,o,m,l=r&&r.code;function d(){try{if(r.result)var e=JSON.parse(r.result);else e=r;a.onError(e);}catch(e){a.onError(e);}}0===u.fileUploadedSize&&t.nosLbsUrls&&t.nosLbsUrls.length>0&&"abort"!==l?t.edgeList?c<t.edgeList.length-1?e(t,n,a,c+1):d():(s=0,o=t.nosToken.bucket,m=t.nosLbsUrls,new Promise(function(e,t){function n(){i(m[s],{query:{version:"1.0",bucketname:o},method:"GET",onerror:r,onload:function onload(t){try{(t=JSON.parse(t))&&t.upload&&t.upload.length?e(t.upload):r();}catch(e){r();}}});}function r(){s<m.length-1?(s++,n()):e([]);}n();})).then(function(r){r.length>0?(t.edgeList=r,t.updateNosEdgeList&&t.updateNosEdgeList(r),e(t,n,a,c+1)):d();}):d();}"number"!=typeof c&&(c=-1),t.edgeList&&t.edgeList.length&&(c=c>0?c:0,m=t.edgeList[c]),m+="/"+t.nosToken.bucket+"/"+t.nosToken.objectName;var f=t.data.file&&t.data.file.type;if(!f||f.indexOf("/")<0){var g=(t.fileInputName||"").split(".").pop();"image"===t.type?f="image/"+("jpg"===g?"jpeg":g):"audio"!==t.type&&"video"!==t.type||(f=o[g]);}var h={query:{offset:0,complete:s>=u.fileSize,version:"1.0"},headers:{"Content-Type":f||"application/octet-stream","x-nos-token":t.nosToken.token},method:"POST",timeout:0,onaftersend:function onaftersend(){t.beginupload(a);},onuploading:l,onload:d,onerror:p};return h.data=u.file.slice(0,s),i(m,h);};},function(e,t,n){"use strict";var r=n(63);e.exports=function(e,t){return t.method="POST",t.headers=t.headers||{},t.headers["Content-Type"]="multipart/form-data",t.timeout=0,t.type=t.type||"json",r(e,t);};},function(e,t,n){"use strict";var r,s,i=n(23),o=n(63),a=(r=/json/i,s=/post/i,function(e,t){var n=(t=t||{}).data=t.data||{},a=t.headers=t.headers||{},c=i.checkWithDefault(a,"Accept","application/json"),u=i.checkWithDefault(a,"Content-Type","application/json");return r.test(c)&&(t.type="json"),s.test(t.method)&&r.test(u)&&(t.data=JSON.stringify(n)),o(e,t);});e.exports=a;},function(e,t,n){"use strict";var r=n(23),s=n(121),i=n(87),o={};function a(e){this.init(),i.call(this,e);}var c=i.prototype,u=a.prototype=Object.create(c);u.init=function(){var e="NEJ-AJAX-DATA:",t=!1;function n(t){var n=t.data;if(0===n.indexOf(e)){var r=(n=JSON.parse(n.replace(e,""))).key,s=o[r];s&&(delete o[r],n.result=decodeURIComponent(n.result||""),s.onLoad(n));}}return function(){!function(){if(!t){t=!0;var e=r.getGlobal();e.postMessage?r.on(e,"message",n):s.addMsgListener(n);}}();};}(),u.doSend=function(){var e=this.options,t=r.url2origin(e.url),n=e.proxyUrl||t+"/res/nej_proxy_frame.html",i=o[n];if(r.isArray(i))i.push(this.doSend.bind(this,e));else{if(!i)return o[n]=[this.doSend.bind(this,e)],void r.createIframe({src:n,onload:function onload(e){var t=o[n];o[n]=r.target(e).contentWindow,t.forEach(function(e){try{e();}catch(e){console.log("error:",e);}});}});if(!this.aborted){var a=this.key=r.uniqueID();o[a]=this;var c=r.fetch({method:"GET",url:"",data:null,headers:{},timeout:0},e);c.key=a,s.postMessage(i,{data:c}),this.afterSend();}}},u.abort=function(){this.aborted=!0,delete o[this.key],c.abort.call(this);},e.exports=a;},function(e,t,n){"use strict";var r=n(23),s=n(87),i=n(121),o="NEJ-UPLOAD-RESULT:",a={};function c(e){this.init(),s.call(this,e);}var u=s.prototype,m=c.prototype=Object.create(u);m.init=function(){var e=!1;function t(e){var t=e.data;if(0===t.indexOf(o)){var n=(t=JSON.parse(t.replace(o,""))).key,r=a[n];r&&(delete a[n],t.result=decodeURIComponent(t.result||""),r.onLoad(t.result));}}return function(){!function(){if(!e){e=!0;var n=r.getGlobal();n.postMessage?r.on(n,"message",t):(i.addMsgListener(t),i.startTimer());}}();};}(),m.doSend=function(){var e=this,t=e.options,n=e.key="zoro-ajax-upload-iframe-"+r.uniqueID();a[n]=e;var s=e.form=r.html2node('<form style="display:none;"></form>');"undefined"==typeof document?console.log("error: document is undefined"):document.body.appendChild(s),s.target=n,s.method="POST",s.enctype="multipart/form-data",s.encoding="multipart/form-data";var i=t.url,o=r.genUrlSep(i);s.action=i+o+"_proxy_=form";var c=t.data,u=[],m=[];function l(){u.forEach(function(e,t){var n=m[t];n.parentNode&&(e.name=n.name,r.isFunction(e.setAttribute)&&e.setAttribute("form",n.getAttribute("form")),n.parentNode.replaceChild(e,n));});}c&&r.getKeys(c,t.putFileAtEnd).forEach(function(e){var t=c[e];if(t.tagName&&"INPUT"===t.tagName.toUpperCase()){if("file"===t.type){var n=t,i=n.cloneNode(!0);n.parentNode.insertBefore(i,n);var o=r.dataset(n,"name");o&&(n.name=o),s.appendChild(n),r.isFunction(n.setAttribute)&&(n.setAttribute("form",""),n.removeAttribute("form")),u.push(t),m.push(i);}}else{var a=r.html2node('<input type="hidden"/>');a.name=e,a.value=t,s.appendChild(a);}});var d=e.iframe=r.createIframe({name:n,onload:function onload(){e.aborted?l():(r.on(d,"load",e.checkResult.bind(e)),s.submit(),l(),e.afterSend());}});},m.checkResult=function(){var e,t;try{if((t=((e=this.iframe.contentWindow.document.body).innerText||e.textContent||"").trim()).indexOf(o)>=0||e.innerHTML.indexOf(o)>=0)return;}catch(e){return void console.log("error:","ignore error if not same domain,",e);}this.onLoad(t);},m.onLoad=function(e){u.onLoad.call(this,{status:200,result:e}),r.remove(this.form),r.remove(this.iframe),u.destroy.call(this);},m.destroy=function(){r.remove(this.iframe),r.remove(this.form);},m.abort=function(){this.aborted=!0,delete a[this.key],u.abort.call(this);},e.exports=c;},function(e,t,n){var r;
/*!
 * EventEmitter v5.2.4 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */!function(t){"use strict";function s(){}var i=s.prototype,o=t.EventEmitter;function a(e,t){for(var n=e.length;n--;){if(e[n].listener===t)return n;}return-1;}function c(e){return function(){return this[e].apply(this,arguments);};}i.getListeners=function(e){var t,n,r=this._getEvents();if(e instanceof RegExp)for(n in t={},r){r.hasOwnProperty(n)&&e.test(n)&&(t[n]=r[n]);}else t=r[e]||(r[e]=[]);return t;},i.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1){n.push(e[t].listener);}return n;},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&((t={})[e]=n),t||n;},i.addListener=function(e,t){if(!function e(t){return"function"==typeof t||t instanceof RegExp||!(!t||"object"!=typeof t)&&e(t.listener);}(t))throw new TypeError("listener must be a function");var n,r=this.getListenersAsObject(e),s="object"==typeof t;for(n in r){r.hasOwnProperty(n)&&-1===a(r[n],t)&&r[n].push(s?t:{listener:t,once:!1});}return this;},i.on=c("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0});},i.once=c("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this;},i.defineEvents=function(e){for(var t=0;t<e.length;t+=1){this.defineEvent(e[t]);}return this;},i.removeListener=function(e,t){var n,r,s=this.getListenersAsObject(e);for(r in s){s.hasOwnProperty(r)&&-1!==(n=a(s[r],t))&&s[r].splice(n,1);}return this;},i.off=c("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t);},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t);},i.manipulateListeners=function(e,t,n){var r,s,i=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(r=n.length;r--;){i.call(this,t,n[r]);}else for(r in t){t.hasOwnProperty(r)&&(s=t[r])&&("function"==typeof s?i.call(this,r,s):o.call(this,r,s));}return this;},i.removeEvent=function(e){var t,n=typeof e,r=this._getEvents();if("string"===n)delete r[e];else if(e instanceof RegExp)for(t in r){r.hasOwnProperty(t)&&e.test(t)&&delete r[t];}else delete this._events;return this;},i.removeAllListeners=c("removeEvent"),i.emitEvent=function(e,t){var n,r,s,i,o=this.getListenersAsObject(e);for(i in o){if(o.hasOwnProperty(i))for(n=o[i].slice(0),s=0;s<n.length;s++){!0===(r=n[s]).once&&this.removeListener(e,r.listener),r.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,r.listener);}}return this;},i.trigger=c("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t);},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this;},i._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue;},i._getEvents=function(){return this._events||(this._events={});},s.noConflict=function(){return t.EventEmitter=o,s;},void 0===(r=function(){return s;}.call(t,n,t,e))||(e.exports=r);}(this||{});},function(e,t,n){"use strict";var r=n(23),s=n(87);function i(e){e.onuploading&&this.on("uploading",e.onuploading),s.call(this,e);}var o=s.prototype,a=i.prototype=Object.create(o);a.doSend=function(){var e=this.options,t=e.headers,n=this.xhr=new XMLHttpRequest();if("multipart/form-data"===t["Content-Type"]){delete t["Content-Type"],n.upload.onprogress=this.onProgress.bind(this),n.upload.onload=this.onProgress.bind(this);var s=e.data;e.data=new window.FormData(),s&&r.getKeys(s,e.putFileAtEnd).forEach(function(t){var n=s[t];n.tagName&&"INPUT"===n.tagName.toUpperCase()?"file"===n.type&&[].forEach.call(n.files,function(t){e.data.append(r.dataset(n,"name")||n.name||t.name||"file-"+r.uniqueID(),t);}):e.data.append(t,n);});}else t["x-nos-token"]&&(n.upload.onprogress=this.onProgress.bind(this),n.upload.onload=this.onProgress.bind(this));n.onreadystatechange=this.onStateChange.bind(this),0!==e.timeout&&(this.timer=setTimeout(this.onTimeout.bind(this),e.timeout)),n.open(e.method,e.url,!e.sync),Object.keys(t).forEach(function(e){n.setRequestHeader(e,t[e]);}),e.cookie&&"withCredentials"in n&&(n.withCredentials=!0),n.send(e.data),this.afterSend();},a.onProgress=function(e){e.lengthComputable&&e.loaded<=e.total&&this.emit("uploading",e);},a.onStateChange=function(){var e,t=this.xhr;4===t.readyState&&(e={status:t.status,result:t.responseText||""},this.onLoad(e));},a.getResponseHeader=function(e){var t=this.xhr;return t?t.getResponseHeader(e):"";},a.destroy=function(){clearTimeout(this.timer);try{this.xhr.onreadystatechange=r.f,this.xhr.abort();}catch(e){console.log("error:","ignore error ajax destroy,",e);}o.destroy.call(this);},e.exports=i;},function(e,t,n){"use strict";var r=n(3),s=n(0),i=n(15),o=n(30).upload,a=n(30).chunkUpload,c=n(30).abort,u=s.supportFormData;function m(e){var t=this;t.options=s.copy(e),s.verifyOptions(e,"url fileName"),s.verifyParamPresentJustOne(e,"blob fileInput"),s.verifyCallback(e,"beginupload uploadprogress uploaddone"),e.fileInput&&(e.fileInput=s.verifyFileInput(e.fileInput)),e.type&&s.verifyFileType(e.type),e.timeout?s.verifyParamType("timeout",e.timeout,"number"):e.timeout=6e5,s.verifyFileUploadCallback(e),e.data={},e.params&&s.merge(e.data,e.params);var n=e.fileName,c=e.fileInput;if(u){if(c){var m=e.type?s.filterFiles(c.files,e.type):[].slice.call(c.files,0);if(!m||!m.length)return void e.uploaddone(i.newWrongFileTypeError("未读取到"+e.type+"类型的文件, 请确保文件选择节点的文件不为空, 并且请确保选择了"+e.type+"类型的文件"));e.data[n]=m[0];var l=c.files[0].size;}else if(e.blob){if(e.data[n]=e.blob,"file"!==e.type&&e.blob.type&&-1===e.blob.type.indexOf(e.type))return void e.uploaddone(i.newWrongFileTypeError("未读取到"+e.type+"类型的文件, 请确保选择了"+e.type+"类型的文件"));l=e.blob.size;}if(e.maxSize&&l>e.maxSize)return void e.uploaddone(i.newFileTooLargeError("上传文件大小超过"+e.maxSize+"限制"));if(!e.commonUpload)return l>r.chunkMaxSize?void e.uploaddone(i.newFileTooLargeError("直传文件大小超过"+r.chunkMaxSize+"限制")):void(t.sn=a(e,n,t,-1));if(l>r.commonMaxSize)return void e.uploaddone(i.newFileTooLargeError("普通上传文件大小超过"+r.commonMaxSize+"限制"));}else s.dataset(c,"name",n),e.data.input=c;var d={data:e.data,onaftersend:function onaftersend(){e.beginupload(t);},onuploading:function onuploading(t){var n=Math.floor(1e4*t.loaded/t.total)/100,r={docId:e.docId,total:t.total,loaded:t.loaded,percentage:n,percentageText:n+"%"};e.fileInput&&(r.fileInput=e.fileInput),e.blob&&(r.blob=e.blob),e.uploadprogress(r);},onload:function onload(n){n.docId=e.docId,n.Error?t.onError(n):e.uploaddone(null,n);},onerror:function onerror(n){try{if(n.result)var r=JSON.parse(n.result);else r=n;t.onError(r);}catch(r){console.log("error: ignore error if could not parse obj.result",r),e.uploaddone(new i(n.message,n.code),t.options);}}};u||(d.mode="iframe"),d.putFileAtEnd=!0,t.sn=o(e.url,d);}m.prototype.onError=function(e){var t,n,r,s=this.options;n=(t=(e=e||{}).Error||e||{}).Code||t.code||"unknown",r=t.Message||t.message||"未知错误",s.uploaddone(new i(n+"("+r+")",n));},m.prototype.abort=function(){c(this.sn);},e.exports=m;},function(e,t,n){var r,s,i;!function(n,o){"use strict";s=[],void 0===(i="function"==typeof(r=function r(e){return function(t){t=t||{},function(){t.arrayAccessForm=t.arrayAccessForm||"none",t.emptyNodeForm=t.emptyNodeForm||"text",t.jsAttributeFilter=t.jsAttributeFilter,t.jsAttributeConverter=t.jsAttributeConverter,t.attributeConverters=t.attributeConverters||[],t.datetimeAccessFormPaths=t.datetimeAccessFormPaths||[],t.arrayAccessFormPaths=t.arrayAccessFormPaths||[],void 0===t.enableToStringFunc&&(t.enableToStringFunc=!0);void 0===t.skipEmptyTextNodesForObj&&(t.skipEmptyTextNodesForObj=!0);void 0===t.stripWhitespaces&&(t.stripWhitespaces=!0);void 0===t.useDoubleQuotes&&(t.useDoubleQuotes=!0);void 0===t.ignoreRoot&&(t.ignoreRoot=!1);void 0===t.escapeMode&&(t.escapeMode=!0);void 0===t.attributePrefix&&(t.attributePrefix="_");void 0===t.selfClosingElements&&(t.selfClosingElements=!0);void 0===t.keepCData&&(t.keepCData=!1);void 0===t.jsDateUTC&&(t.jsDateUTC=!1);}(),function(){function e(e){var t=String(e);return 1===t.length&&(t="0"+t),t;}"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|^\n+|(\s|\n)+$/g,"");});"function"!=typeof Date.prototype.toISOString&&(Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z";});}();var n={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function r(e){var t=e.localName;return null==t&&(t=e.baseName),null!=t&&""!==t||(t=e.nodeName),t;}function s(e){return"string"==typeof e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"):e;}function i(e,n,r){switch(t.arrayAccessForm){case"property":e[n]instanceof Array?e[n+"_asArray"]=e[n]:e[n+"_asArray"]=[e[n]];}if(!(e[n]instanceof Array)&&t.arrayAccessFormPaths.length>0){for(var s=!1,i=0;i<t.arrayAccessFormPaths.length;i++){var o=t.arrayAccessFormPaths[i];if("string"==typeof o){if(o===r){s=!0;break;}}else if(o instanceof RegExp){if(o.test(r)){s=!0;break;}}else if("function"==typeof o&&o(n,r)){s=!0;break;}}s&&(e[n]=[e[n]]);}}function o(e){var t=e.split(/[-T:+Z]/g),n=new Date(t[0],t[1]-1,t[2]),r=t[5].split(".");if(n.setHours(t[3],t[4],r[0]),r.length>1&&n.setMilliseconds(r[1]),t[6]&&t[7]){var s=60*t[6]+Number(t[7]),i=/\d\d-\d\d:\d\d$/.test(e)?"-":"+";s=0+("-"===i?-1*s:s),n.setMinutes(n.getMinutes()-s-n.getTimezoneOffset());}else-1!==e.indexOf("Z",e.length-1)&&(n=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds())));return n;}function a(e,s){for(var a={__cnt:0},u=e.childNodes,m=0;m<u.length;m++){var l=u.item(m),d=r(l);l.nodeType!==n.COMMENT_NODE&&(a.__cnt++,null==a[d]?(a[d]=c(l,s+"."+d),i(a,d,s+"."+d)):(a[d]instanceof Array||(a[d]=[a[d]],i(a,d,s+"."+d)),a[d][a[d].length]=c(l,s+"."+d)));}for(var p=0;p<e.attributes.length;p++){var f=e.attributes.item(p);a.__cnt++;for(var g=f.value,h=0;h<t.attributeConverters.length;h++){var y=t.attributeConverters[h];y.test.call(null,f.name,f.value)&&(g=y.convert.call(null,f.name,f.value));}a[t.attributePrefix+f.name]=g;}var v=e.prefix;return v&&(a.__cnt++,a.__prefix=v),a["#text"]&&(a.__text=a["#text"],a.__text instanceof Array&&(a.__text=a.__text.join("\n")),t.escapeMode&&(a.__text=a.__text.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&amp;/g,"&")),t.stripWhitespaces&&(a.__text=a.__text.trim()),delete a["#text"],"property"===t.arrayAccessForm&&delete a["#text_asArray"],a.__text=function(e,n,r){if(t.datetimeAccessFormPaths.length>0)for(var s=r.split(".#")[0],i=0;i<t.datetimeAccessFormPaths.length;i++){var a=t.datetimeAccessFormPaths[i];if("string"==typeof a){if(a===s)return o(e);}else if(a instanceof RegExp){if(a.test(s))return o(e);}else if("function"==typeof a&&a(s))return o(e);}return e;}(a.__text,0,s+".#text")),a.hasOwnProperty("#cdata-section")&&(a.__cdata=a["#cdata-section"],delete a["#cdata-section"],"property"===t.arrayAccessForm&&delete a["#cdata-section_asArray"]),1===a.__cnt&&a.__text?a=a.__text:0===a.__cnt&&"text"===t.emptyNodeForm?a="":a.__cnt>1&&void 0!==a.__text&&t.skipEmptyTextNodesForObj&&(t.stripWhitespaces&&""===a.__text||""===a.__text.trim())&&delete a.__text,delete a.__cnt,t.keepCData||a.hasOwnProperty("__text")||!a.hasOwnProperty("__cdata")?(t.enableToStringFunc&&(a.__text||a.__cdata)&&(a.toString=function(){return(this.__text?this.__text:"")+(this.__cdata?this.__cdata:"");}),a):a.__cdata?a.__cdata:"";}function c(e,s){return e.nodeType===n.DOCUMENT_NODE?function(e){for(var s={},i=e.childNodes,o=0;o<i.length;o++){var a=i.item(o);if(a.nodeType===n.ELEMENT_NODE){var u=r(a);t.ignoreRoot?s=c(a,u):s[u]=c(a,u);}}return s;}(e):e.nodeType===n.ELEMENT_NODE?a(e,s):e.nodeType===n.TEXT_NODE||e.nodeType===n.CDATA_SECTION_NODE?e.nodeValue:null;}function u(e,n,r,i){var o="<"+(e&&e.__prefix?e.__prefix+":":"")+n;if(r)for(var a=0;a<r.length;a++){var c=r[a],u=e[c];t.escapeMode&&(u=s(u)),o+=" "+c.substr(t.attributePrefix.length)+"=",t.useDoubleQuotes?o+='"'+u+'"':o+="'"+u+"'";}return o+=i?" />":">";}function m(e,t){return"</"+(e&&e.__prefix?e.__prefix+":":"")+t+">";}function l(e,n){return"property"===t.arrayAccessForm&&(r=n.toString(),s="_asArray",-1!==r.indexOf(s,r.length-s.length))||0===n.toString().indexOf(t.attributePrefix)||0===n.toString().indexOf("__")||e[n]instanceof Function;var r,s;}function d(e){var t=0;if(e instanceof Object)for(var n in e){l(e,n)||t++;}return t;}function p(e){var n=[];if(e instanceof Object)for(var r in e){-1===r.toString().indexOf("__")&&0===r.toString().indexOf(t.attributePrefix)&&n.push(r);}return n;}function f(e){var n="";return e instanceof Object?n+=function(e){var n="";e.__cdata&&(n+="<![CDATA["+e.__cdata+"]]>");e.__text&&(t.escapeMode?n+=s(e.__text):n+=e.__text);return n;}(e):null!==e&&(t.escapeMode?n+=s(e):n+=e),n;}function g(e,n,r){var s="";if(t.jsAttributeFilter&&t.jsAttributeFilter.call(null,n,e))return s;if(t.jsAttributeConverter&&(e=t.jsAttributeConverter.call(null,n,e)),null!=e&&""!==e||!t.selfClosingElements){if("object"==typeof e){if("[object Array]"===Object.prototype.toString.call(e))s+=function(e,t,n){var r="";if(0===e.length)r+=u(e,t,n,!0);else for(var s=0;s<e.length;s++){r+=g(e[s],t,p(e[s]));}return r;}(e,n,r);else if(e instanceof Date)s+=u(e,n,r,!1),s+=t.jsDateUTC?e.toUTCString():e.toISOString(),s+=m(e,n);else{var i=d(e);i>0||e.__text||e.__cdata?(s+=u(e,n,r,!1),s+=h(e),s+=m(e,n)):t.selfClosingElements?s+=u(e,n,r,!0):(s+=u(e,n,r,!1),s+=m(e,n));}}else s+=u(e,n,r,!1),s+=f(e),s+=m(e,n);}else s+=u(e,n,r,!0);return s;}function h(e){var t="",n=d(e);if(n>0)for(var r in e){if(!l(e,r)){var s=e[r],i=p(s);t+=g(s,r,i);}}return t+=f(e);}function y(t){if(void 0===t)return null;if("string"!=typeof t)return null;var n=null,r=null;if(e)n=new e(),r=n.parseFromString(t,"text/xml");else if(window&&window.DOMParser){n=new window.DOMParser();var s=null,i=window.ActiveXObject||"ActiveXObject"in window;if(!i)try{s=n.parseFromString("INVALID","text/xml").childNodes[0].namespaceURI;}catch(e){s=null;}try{r=n.parseFromString(t,"text/xml"),null!==s&&r.getElementsByTagNameNS(s,"parsererror").length>0&&(r=null);}catch(e){r=null;}}else 0===t.indexOf("<?")&&(t=t.substr(t.indexOf("?>")+2)),(r=new ActiveXObject("Microsoft.XMLDOM")).async="false",r.loadXML(t);return r;}this.asArray=function(e){return null==e?[]:e instanceof Array?e:[e];},this.toXmlDateTime=function(e){return e instanceof Date?e.toISOString():"number"==typeof e?new Date(e).toISOString():null;},this.asDateTime=function(e){return"string"==typeof e?o(e):e;},this.xml2dom=function(e){return y(e);},this.dom2js=function(e){return c(e,null);},this.js2dom=function(e){var t=this.js2xml(e);return y(t);},this.xml2js=function(e){var t=y(e);return null!=t?this.dom2js(t):null;},this.js2xml=function(e){return h(e);},this.getVersion=function(){return"3.1.1";};};})?r.apply(t,s):r)||(e.exports=i);}();},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(26).fn,a=n(0),c=n(268),u=n(15),m=n(3),l=n(122),d=n(267),p=n(120);o.sendText=function(e){return this.processCallback(e),e.msg=new this.message.TextMessage(e),this.sendMsg(e);},o.previewFile=function(e){if(a.verifyOptions(e,"done","msg::previewFile"),e.type||(e.type="file"),a.verifyParamPresentJustOne(e,"dataURL blob fileInput filePath wxFilePath fileObject","msg::previewFile"),a.exist(e.maxSize)&&a.verifyParamType("maxSize",e.maxSize,"number","api::previewFile"),a.exist(e.commonUpload)&&a.verifyParamType("commonUpload",e.commonUpload,"boolean","api::previewFile"),e.nosSurvivalTime?(a.verifyParamType("nosSurvivalTime",e.nosSurvivalTime,"number","api::Base.getInstance"),a.verifyParamMin("nosSurvivalTime",e.nosSurvivalTime,86400,"api::Base.getInstance")):e.nosSurvivalTime=this.nosSurvivalTime,e.filePath=e.filePath||e.wxFilePath,delete e.wxFilePath,e.dataURL)e.blob=p.fromDataURL(e.dataURL);else if(e.blob);else if(e.fileInput){if(e.fileInput=a.verifyFileInput(e.fileInput,"msg::previewFile"),e.fileInput.files){if(!e.fileInput.files.length)return void e.done(u.newNoFileError("请选择"+e.type+"文件",{callFunc:"msg::previewFile",fileInput:e.fileInput}),e);e.fileSize=e.fileInput.files[0].size;}e.fileInputName=a.getFileName(e.fileInput);}this.processCallback(e);var t=JSON.stringify(l.genResponseBody(e.type)||{}).replace(/"/gi,'\\"'),n=null,r=e.transcode?"getNosTokenTrans":"getNosToken";if(e.transcode){a.verifyOptions(e,"fileInput","msg::previewFile");var s=a.getFileInfo(e.fileInput);n={transToken:{name:s.name,type:s.transcodeType,transType:"png"===e.transcode?11:10,size:s.size,body:t}};}else n=t;this[r]({responseBody:n,nosToken:{nosScene:e.nosScene||this.nosScene,nosSurvivalTime:e.nosSurvivalTime},callback:function(t,n){t?e.done(t):(e.transcode?(e.nosToken=n.nosToken,e.docId=n.docId):e.nosToken=n,this._doPreviewFile(e));}.bind(this)});},o._doPreviewFile=function(e){var t,n=this,r=e.uploaddone,s=m.genUploadUrl(e.nosToken.bucket),o=m.chunkUploadUrl;e.commonUpload||!o||m.isWeixinApp||m.isNodejs||m.isRN?(e.commonUpload=!0,t=s):(this.logger.info("use chunkUrl: ",o,m.nosLbsUrls),t=o,e.nosLbsUrls=m.nosLbsUrls,n.edgeList?e.edgeList=n.edgeList:e.updateNosEdgeList=function(e){n.edgeList=e;});var c=this.assembleUploadParams(e.nosToken);function p(t,s,i){if(e.uploaddone=r,t)e.done(t,e.callback.options);else{if(s=l.parseResponse(s,n.options.exifOrientation),i||(s.url=m.genDownloadUrl(e.nosToken,c.Object,m.serverNosConfig.cdnDomain),e.nosToken.shortUrl&&(s._url_safe=e.nosToken.shortUrl)),a.exist(e.fileInputName))s.name=e.fileInputName;else if(e.blob){var o=e.blob.name;if(s.name=o||"blob-"+s.md5,!o){var u=e.blob.type;s.ext=u.slice(u.lastIndexOf("/")+1);}}else e.filePath?s.name=e.filePath:e.fileObject&&(s.name=e.fileObject.fileName);if(!s.ext){var d=s.name.lastIndexOf(".");s.ext=-1===d?"unknown":s.name.slice(d+1);}s.size=s.size||0,e.done(null,a.copy(s));}}if(m.isWeixinApp)a.verifyOptions(e,"filePath","msg::_doPreviewFile"),n.fileQuickTransfer(e,p,function(){var r=wx.uploadFile({url:t,filePath:e.filePath,name:"file",formData:c,fail:function fail(e){p({code:"FAILED",msg:e}),n.protocol.logger.error("error:","api::msg:upload file failed",e);},success:function success(e){if(200===e.statusCode)try{p(null,JSON.parse(e.data));}catch(t){n.protocol.logger.error("error:","parse wx upload file res error",t),p({code:"PARSE_WX_UPLOAD_FILE_RES_ERROR",str:e.data,msg:e.errMsg});}else p({code:e.statusCode,msg:e.errMsg});}});"function"==typeof e.uploadprogress&&r&&r.onProgressUpdate(function(t){e.uploadprogress({total:t.totalBytesExpectedToSend,loaded:t.totalBytesSent,percentage:t.progress,percentageText:t.progress+"%"});});});else if(m.isNodejs){var f={url:t,name:"file",formData:c,success:function success(e){if(200===e.statusCode)try{p(null,JSON.parse(e.data));}catch(t){n.protocol.logger.error("error:","parse nodejs upload file res error",t),p({code:"PARSE_NODEJS_UPLOAD_FILE_RES_ERROR",str:e.data,msg:e.errMsg});}else p({code:e.statusCode,msg:e.errMsg});},fail:function fail(e){p({code:"FAILED",msg:e}),n.protocol.logger.error("error:","api::msg:upload file failed",e);}};if(e.filePath)f.filePath=e.filePath;else{if("object"!==(0,i.default)(e.fileObject))throw new u("Nodejs上传fileObject参数类型应如 {fileName:..,fileData:..} ");f.fileData=e.fileObject.fileData;}n.fileQuickTransfer(e,p,function(){d.uploadFile(f);});}else if(m.isRN){var g={url:t,name:"file",formData:c,filePath:e.filePath,success:function success(e){if(e.ok&&200===e.status)try{e.md5=e.headers.map&&e.headers.map.etag&&e.headers.map.etag[0]||"UNKNOWN",p(null,e);}catch(t){n.protocol.logger.error("error:","parse React Native upload file res error",t),p({code:"PARSE_React_Native_UPLOAD_FILE_RES_ERROR",res:e});}else p({code:e.status,msg:e.statusText});},fail:function fail(e){p({code:"FAILED",msg:e}),n.protocol.logger.error("error:","api::msg:upload file failed",e);}};n.fileQuickTransfer(e,p,function(){d.uploadFile(g);});}else e.uploaddone=p,e.url=t,e.params=c,e.fileName="file",n.fileQuickTransfer(e,p,function(){return new d(e);});},o.fileQuickTransfer=function(e,t,n){var r=this;e=e||{},t instanceof Function||(t=function t(){}),n instanceof Function||(n=function n(){});var s=e.fastPass;if(s)try{s=JSON.parse(s),e.fastPass=s;}catch(e){r.protocol.logger.error("快传参数解析失败");}var i=e.fileInputName||e.name||e.blob&&e.blob.name||"",o=e.fileSize||e.size||e.blob&&e.blob.size||0,a=s?((s.md5||e.digest||"")+"").trim():"",c=e.type||e.blob&&e.blob.type;if(a&&o>=m.threshold){var u=!0,l={name:i,md5:a,ext:i.slice(i.lastIndexOf(".")+1),type:c};switch(c){case"image":s&&s.w&&s.h?(l.w=s.w,l.h=s.h):(u=!1,r.protocol.logger.error("快传 image 文件缺少参数 w 或 h"));break;case"video":s&&s.w&&s.h&&s.dur?(l.w=s.w,l.h=s.h,l.dur=s.dur):(u=!1,r.protocol.logger.error("快传 video 文件缺少参数 w 或 h 或 dur"));break;case"audio":s&&s.dur?l.dur=s.dur:(u=!1,r.protocol.logger.error("快传 audio 文件缺少参数 dur"));}if(!u)return void n();var d={fileQuickTransfer:{md5:a}};return o&&(d.fileQuickTransfer.size=o),this.protocol.sendCmd("fileQuickTransfer",d,function(e,s,i){!e&&i&&i.fileQuickTransfer&&i.fileQuickTransfer.url||(r.protocol.logger.error("misc::fileQuickTransfer: not found",e,s,i),n()),i&&i.fileQuickTransfer&&i.fileQuickTransfer.threshold&&(m.threshold=i.fileQuickTransfer.threshold||0),i&&i.fileQuickTransfer&&i.fileQuickTransfer.url&&(l.size=o||i.fileQuickTransfer.size,l.url=i.fileQuickTransfer.url,i.fileQuickTransfer._url_safe&&(l._url_safe=i.fileQuickTransfer._url_safe),t(e,l,!0));});}n();},o.sendFile=function(e){if(e.type||(e.type="file"),a.verifyParamPresentJustOne(e,"dataURL blob fileInput file filePath wxFilePath fileObject","msg::sendFile"),a.exist(e.maxSize)&&a.verifyParamType("maxSize",e.maxSize,"number","api::previewFile"),a.exist(e.commonUpload)&&a.verifyParamType("commonUpload",e.commonUpload,"boolean","api::previewFile"),this.processCallback(e),e.filePath=e.filePath||e.wxFilePath,delete e.wxFilePath,e.dataURL)this._previewAndSendFile(e);else if(e.blob)this._previewAndSendFile(e);else if(e.fileInput){if(e.fileInput=a.verifyFileInput(e.fileInput,"msg::sendFile"),e.fileInput.files&&!e.fileInput.files.length)return void e.done(u.newNoFileError("请选择"+e.type+"文件",{callFunc:"msg::sendFile",fileInput:e.fileInput}),e.callback.options);this._previewAndSendFile(e);}else if(e.filePath||e.fileObject)this._previewAndSendFile(e);else if(e.file){var t,n=e.file._url_safe;return n&&(t=e.file.url,e.file.url=n,delete e.file._url_safe),e.msg=new this.message.FileMessage(e),this.sendMsg(e,t);}},o._previewAndSendFile=function(e){var t=this;a.verifyCallback(e,"uploaddone beforesend","msg::_previewAndSendFile");var n=e.done;e.done=function(r,s){if(e.done=n,r)e.uploaddone(r,e.callback.options),e.done(r,e.callback.options);else{if(/chatroom/.test(e.scene))return;var i;e.uploaddone(null,a.copy(s));var o=s._url_safe;o&&(i=s.url,s.url=o,delete s._url_safe),e.file=s,e.msg=new t.message.FileMessage(e),e.beforesend(t.sendMsg(e,i));}},t.previewFile(e);},o.assembleUploadParams=function(e){return e?{Object:decodeURIComponent(e.objectName),"x-nos-token":e.token,"x-nos-entity-type":"json"}:null;},o.deleteFile=function(e){a.verifyParamPresentJustOne(e,"docId","msg::deleteFile"),this.removeFile({docId:e.docId,callback:function callback(t,n){t?e.error&&e.error(t,n):e.success&&e.success(n);}});},o.getFile=function(e){a.verifyParamPresentJustOne(e,"docId","msg::getFile"),this.fetchFile({docId:e.docId,callback:function callback(t,n){t?e.error&&e.error(t,n):e.success&&e.success(n.info);}});},o.getFileList=function(e){var t=e.fromDocId,n=void 0===t?"":t,r=e.limit,s=void 0===r?10:r,i={limit:s};n&&(i.fromDocId=n),this.fetchFileList({fileListParam:i,callback:function callback(t,n){t?(s>30&&(t.message=t.message+"::文档条数超过限制:30"),e.error&&e.error(t,n)):e.success&&e.success(n);}});},o.sendGeo=function(e){return this.processCallback(e),e.msg=new this.message.GeoMessage(e),this.sendMsg(e);},o.sendTipMsg=function(e){return this.processCallback(e),e.msg=new this.message.TipMessage(e),this.sendMsg(e);},o.sendCustomMsg=function(e){return this.processCallback(e),e.msg=new this.message.CustomMessage(e),this.sendMsg(e);},o.sendRobotMsg=function(e){return this.processCallback(e),e.msg=new this.message.RobotMessage(e),this.sendMsg(e);},o.sendMsg=function(e,t){var n,r=this.protocol,s=e.msg,i={},o=!!e.isLocal;if(this.logger.warn("sendMsg::start: "+s.idClient),o&&(e.time&&(s.time=e.time),e.idClient&&(s.idClient=e.idClient),e.localFrom&&(n=e.localFrom+"")),e.resend&&("out"!==e.flow||"fail"!==e.status))return a.onError("只能重发发送失败的消息");e.callback.options.idClient=s.idClient,this.beforeSendMsg(e,i);var c=e.rtnMsg=this.formatReturnMsg(s,n);return t&&!this.options.keepNosSafeUrl&&c.file&&(c.file._url_safe=c.file.url,c.file.url=t,"audio"===c.type&&(c.file.mp3Url=t+(~t.indexOf("?")?"&":"?")+"audioTrans&type=mp3")),c.hasOwnProperty("chatroomId")&&!c.chatroomId?a.onError("聊天室未连接"):(o&&(c.status="success",c.isLocal=!0),r.storeSendMsg&&(i.promise=r.storeSendMsg(c)),e.cbaop=function(e){if(e)return 7101===e.code&&(c.isInBlackList=!0),"server"!==e.from?(c.status="fail",r.updateSendMsgError&&r.updateSendMsgError(c),c):void 0;},o||(t&&!this.options.keepNosSafeUrl&&e.callback&&(e.callback.originUrl=t),i.msg=s,this.sendCmd(e.cmd,i,e.callback)),this.afterSendMsg(e),o&&setTimeout(function(){c=a.simpleClone(c),e.done(null,c);},0),a.copy(c));},o.beforeSendMsg=function(){},o.afterSendMsg=function(){},o.formatReturnMsg=function(e,t){return e=a.copy(e),this.protocol.completeMsg(e),e.status="sending",t&&(e.from=t),e=this.message.reverse(e);},o.resendMsg=function(e){return a.verifyOptions(e,"msg","msg::resendMsg"),this.trimMsgFlag(e),e.resend=!0,this._sendMsgByType(e);},o.forwardMsg=function(e){return a.verifyOptions(e,"msg","msg::forwardMsg"),this.trimMsgFlag(e),this.beforeForwardMsg(e),e.forward=!0,e.msg.idClient=a.guid(),this._sendMsgByType(e);},o.trimMsgFlag=function(e){e&&e.msg&&(e.msg=a.copy(e.msg),delete e.msg.resend,delete e.msg.forward);},o.beforeForwardMsg=function(){},o._sendMsgByType=function(e){switch(a.verifyOptions(e,"msg","msg::_sendMsgByType"),a.verifyParamValid("msg.type",e.msg.type,this.message.validTypes,"msg::_sendMsgByType"),a.merge(e,e.msg),e.type){case"text":return this.sendText(e);case"image":case"audio":case"video":case"file":return this.sendFile(e);case"geo":return this.sendGeo(e);case"custom":return this.sendCustomMsg(e);case"tip":return this.sendTipMsg(e);default:throw new u("不能发送类型为 "+e.type+" 的消息");}},o.parseRobotTemplate=function(e){if(/<template[^>\/]+\/>/.test(e))return{raw:e,json:[{type:"text",name:"",text:""}]};if(!/<template[^>\/]+>/.test(e))return{raw:e,json:[{type:"text",name:"",text:e}]};var t=new c({escapeMode:!1});e=e.replace(/<template [^>]+>/,"<template>");var n=t.xml2js(e);n=n.template.LinearLayout,Array.isArray(n)||(n=[n]);var r=[];return n=n.forEach(function(e){e.image&&(r=r.concat(i(e))),e.text&&(r=r.concat(s(e))),e.link&&(r=r.concat(function(e){if(e.link){var t=e.link;Array.isArray(t)||(t=[t]),t=t.map(function(e){return e.image&&(e.image=i(e)),e.text&&(e.text=s(e)),"url"===e._type?(e.type="url",e.style=e._style||"",e.target=e._target,delete e._target,delete e._style):"block"===e._type&&(e.type="block",e.style=e._style||"",e.params=e._params||"",e.target=e._target,delete e._params,delete e._target,delete e._style),delete e._type,e;}),e.link=t;}return e.link;}(e)));}),{raw:e,json:r};function s(e){return Array.isArray(e.text)||(e.text=[e.text]),e.text=e.text.map(function(e){return{type:"text",name:e._name,text:e.__text};}),e.text;}function i(e){return Array.isArray(e.image)||(e.image=[e.image]),e.image=e.image.map(function(e){return{type:"image",name:e._name,url:e._url};}),e.image;}};},function(e,t,n){"use strict";var r=n(26).fn;r.isConnected=function(){return!!this.protocol&&this.protocol.isConnected();},r.connect=function(){this.protocol.appLogin=0,this.protocol.connect(!0);},r.disconnect=function(e){e=e||{},this.protocol.disconnect(e.done);};},function(e,t,n){"use strict";(function(r){var s,i,o=n(6),a=(i=o)&&i.__esModule?i:{default:i};!function(i,o){var c,u=(i=void 0!==i?i:"undefined"!=typeof self?self:void 0!==r?r:{}).IDBKeyRange||i.webkitIDBKeyRange,m="readonly",l="readwrite",d=Object.prototype.hasOwnProperty,p=function p(){if(!c&&!(c=i.indexedDB||i.webkitIndexedDB||i.mozIndexedDB||i.oIndexedDB||i.msIndexedDB||(null===i.indexedDB&&i.shimIndexedDB?i.shimIndexedDB:o)))throw"IndexedDB required";return c;},f=function f(e){return e;},g=function g(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase();},h=function h(e){return"function"==typeof e;},y=function y(e){return e===o;},v=function v(e,t){var n=this,r=!1;this.name=t,this.getIndexedDB=function(){return e;},this.add=function(t){if(r)throw"Database has been closed";for(var s=[],i=0,o=0;o<arguments.length-1;o++){if(Array.isArray(arguments[o+1]))for(var a=0;a<arguments[o+1].length;a++){s[i]=arguments[o+1][a],i++;}else s[i]=arguments[o+1],i++;}var c=e.transaction(t,l),u=c.objectStore(t);return new Promise(function(e,t){s.forEach(function(e){var t;if(e.item&&e.key){var n=e.key;e=e.item,t=u.add(e,n);}else t=u.add(e);t.onsuccess=function(t){var n=t.target,r=n.source.keyPath;null===r&&(r="__id__"),Object.defineProperty(e,r,{value:n.result,enumerable:!0});};}),c.oncomplete=function(){e(s,n);},c.onerror=function(e){e.preventDefault(),t(e);},c.onabort=function(e){t(e);};});},this.updateAndDelete=function(t,n,s){if(r)throw"Database has been closed";var i=e.transaction(t,l),o=i.objectStore(t),a=o.keyPath;return new Promise(function(e,t){n.forEach(function(e){if(e.item&&e.key){var t=e.key;e=e.item,o.put(e,t);}else o.put(e);}),s.forEach(function(e){o.delete(e[a]);}),i.oncomplete=function(){e([n,s]);},i.onerror=function(e){t(e);};});},this.update=function(t){if(r)throw"Database has been closed";for(var s,i=[],o=1;o<arguments.length;o++){s=arguments[o],Array.isArray(s)?i=i.concat(s):i.push(s);}var a=e.transaction(t,l),c=a.objectStore(t);c.keyPath;return new Promise(function(e,t){i.forEach(function(e){var t;if(e.item&&e.key){var n=e.key;e=e.item,t=c.put(e,n);}else t=c.put(e);t.onsuccess=function(e){},t.onerror=function(e){};}),a.oncomplete=function(){e(i,n);},a.onerror=function(e){t(e);},a.onabort=function(e){t(e);};});},this.remove=function(t,n,s,i,a,c,m){if(r)throw"Database has been closed";var d=e.transaction(t,l),p=d.objectStore(t);return new Promise(function(e,t){function r(e){return e===o||null===e;}if(r(i)&&(i=-1/0),r(a)&&(a=1/0),null===n||Array.isArray(n)||(n=[n]),r(s))null!==n?n.forEach(function(e){p.delete(e);}):p.delete(range=u.bound(i,a,c,m));else{var l=void 0;l=null!==n?u.only(n[0]):u.bound(i,a,c,m),p.index(s).openCursor(l).onsuccess=function(e){var t=e.target.result;t&&(t.delete(),t.continue());};}d.oncomplete=function(){e();},d.onerror=function(e){t(e);},d.onabort=function(e){t(e);};});},this.clear=function(t){if(r)throw"Database has been closed";var n=e.transaction(t,l);n.objectStore(t).clear();return new Promise(function(e,t){n.oncomplete=function(){e();},n.onerror=function(e){t(e);};});},this.close=function(){r||(e.close(),r=!0,delete S[t]);},this.get=function(t,n){if(r)throw"Database has been closed";var s=e.transaction(t),i=s.objectStore(t).get(n);return new Promise(function(e,t){i.onsuccess=function(t){e(t.target.result);},s.onerror=function(e){t(e);};});},this.query=function(t,n){if(r)throw"Database has been closed";return new b(t,e,n);},this.count=function(t,n){if(r)throw"Database has been closed";e.transaction(t).objectStore(t);};for(var s=0,i=e.objectStoreNames.length;s<i;s++){!function(e){for(var t in n[e]={},n){d.call(n,t)&&"close"!==t&&(n[e][t]=function(t){return function(){var r=[e].concat([].slice.call(arguments,0));return n[t].apply(n,r);};}(t));}}(e.objectStoreNames[s]);}},b=function b(e,t,n){var r=this,s=!1,i=!1,c=function c(r,_c2,d,p,f,g,y){return new Promise(function(v,b){var T=s||i?l:m,S=t.transaction(e,T),M=S.objectStore(e),k=n?M.index(n):M,P=r?u[r].apply(null,_c2):null,C=[],I=[P],x=0;f=f||null,g=g||[],"count"!==d&&I.push(p||"next");var w=!!s&&Object.keys(s);k[d].apply(k,I).onsuccess=function(e){var t=e.target.result;if((void 0===t?"undefined":(0,a.default)(t))===(0,a.default)(0))C=t;else if(t)if(null!==f&&f[0]>x)x=f[0],t.advance(f[0]);else if(null!==f&&x>=f[0]+f[1]);else{var n=!0,r="value"in t?t.value:t.key;g.forEach(function(e){e&&e.length&&(2===e.length?n=n&&r[e[0]]===e[1]:h(e[0])&&(n=n&&e[0].apply(o,[r])));}),n&&(x++,C.push(y(r)),i?t.delete():s&&(r=function(e){for(var t=0;t<w.length;t++){var n=w[t],r=s[n];r instanceof Function&&(r=r(e)),e[n]=r;}return e;}(r),t.update(r))),t.continue();}},S.oncomplete=function(){v(C);},S.onerror=function(e){b(e);},S.onabort=function(e){b(e);};});},d=function d(e,t){var n="next",r="openCursor",o=[],a=null,u=f,m=!1,l=function l(){return c(e,t,r,m?n+"unique":n,a,o,u);},d=function d(){return n=null,r="count",{execute:l};},p=function e(){var t;return t=arguments[0],1==(a="array"===g(t)?arguments[0]:Array.prototype.slice.call(arguments,0,2)).length&&a.unshift(0),function(e){return"number"===g(e);}(a[1])||(a=null),{execute:l,count:d,keys:v,filter:b,asc:T,desc:S,distinct:M,modify:k,limit:e,map:P,remove:C};},v=function e(t){return(t=!!y(t)||!!t)&&(r="openKeyCursor"),{execute:l,keys:e,filter:b,asc:T,desc:S,distinct:M,modify:k,limit:p,map:P,remove:C};},b=function e(){return o.push(Array.prototype.slice.call(arguments,0,2)),{execute:l,count:d,keys:v,filter:e,asc:T,desc:S,distinct:M,modify:k,limit:p,map:P,remove:C};},T=function e(t){return t=!!y(t)||!!t,n=t?"next":"prev",{execute:l,count:d,keys:v,filter:b,asc:e,desc:S,distinct:M,modify:k,limit:p,map:P,remove:C};},S=function e(t){return t=!!y(t)||!!t,n=t?"prev":"next",{execute:l,count:d,keys:v,filter:b,asc:T,desc:e,distinct:M,modify:k,limit:p,map:P,remove:C};},M=function e(t){return t=!!y(t)||!!t,m=t,{execute:l,count:d,keys:v,filter:b,asc:T,desc:S,distinct:e,modify:k,limit:p,map:P,remove:C};},k=function e(t){return s=t,{execute:l,count:d,keys:v,filter:b,asc:T,desc:S,distinct:M,modify:e,limit:p,map:P,remove:C};},P=function e(t){return h(t)&&(u=t),{execute:l,count:d,keys:v,filter:b,asc:T,desc:S,distinct:M,modify:k,limit:p,map:e,remove:C};},C=function e(t){return t=!!y(t)||!!t,i=t,{execute:l,count:d,keys:v,filter:b,asc:T,desc:S,distinct:M,modify:k,limit:p,map:P,remove:e};};return{execute:l,count:d,keys:v,filter:b,asc:T,desc:S,distinct:M,modify:k,limit:p,map:P,remove:C};};"only bound upperBound lowerBound".split(" ").forEach(function(e){r[e]=function(){return new d(e,arguments);};}),this.filter=function(){var e=new d(null,null);return e.filter.apply(e,arguments);},this.all=function(){return this.filter();};},T=function T(e,t,n,r){var s=e.target.result,i=new v(s,t);return S[t]=s,Promise.resolve(i);},S={},M={version:"0.10.2",open:function open(e){var t;return new Promise(function(n,r){if(S[e.server])T({target:{result:S[e.server]}},e.server,e.version,e.schema).then(n,r);else{try{t=p().open(e.server,e.version);}catch(e){r(e);}t.onsuccess=function(t){T(t,e.server,e.version,e.schema).then(n,r);},t.onupgradeneeded=function(t){!function(e,t,n){for(var r in"function"==typeof t&&(t=t()),t){var s,i=t[r];for(var o in s=!d.call(t,r)||n.objectStoreNames.contains(r)?e.currentTarget.transaction.objectStore(r):n.createObjectStore(r,i.key),i.indexes){var a=i.indexes[o];try{s.index(o);}catch(e){s.createIndex(o,a.key||o,Object.keys(a).length?a:{unique:!1});}}}}(t,e.schema,t.target.result);},t.onerror=function(e){r(e);};}});},remove:function remove(e){return new Promise(function(t,n){if(!e)return t();var r,s;(void 0===e?"undefined":(0,a.default)(e))===v&&(e=e.name),"string"==typeof e&&(r=S[e]),r&&"function"==typeof r.close&&r.close();try{s=p().deleteDatabase(e);}catch(e){n(e);}s.onsuccess=function(n){delete S[e],t(e);},s.onerror=function(e){n(e);},s.onblocked=function(e){n(e);};});}};void 0!==e&&void 0!==e.exports?e.exports=M:(s=function(){return M;}.call(t,n,t,e))===o||(e.exports=s);}(void 0);}).call(this,n(13));},function(e,t,n){"use strict";var r=n(271),s={log:{key:{keyPath:"time"},indexes:{level:{unique:!1},time:{unique:!0}}}};function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.server=null,this.expire=e.expire||72,this.name=e.name;}var o=i.prototype;o.init=function(){var e=this;if(!this.server)return r.open({server:"nim-log-"+this.name,version:1,schema:s}).then(function(t){e.server=t;});},o.putLog=function(e){var t=this;if(!this.server)return Promise.reject("no db server");var n=e.slice(-1)[0].time-36e5*this.expire;return this.deleteLogs(n).then(function(){return t.server.add("log",e);});},o.getAllLogs=function(){return this.server?this.server.query("log","time").all().execute().then(function(e){var t={},n=e.slice(-1)[0];return t.logs=e.map(function(e){return e.log;}).join("\r\n"),t.time=n&&n.time,t;}):Promise.reject("no db server");},o.deleteLogs=function(e){return this.server?this.server.remove("log",null,"time",0,e):Promise.reject("no db server");},e.exports=i;},function(e,t,n){"use strict";e.exports=function(e,t,n,r){try{try{var s;try{s=new window.Blob([e]);}catch(t){(s=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder)()).append(e),s=s.getBlob();}var i=window.URL||window.webkitURL,o=i.createObjectURL(s),a=new window[t](o,n);return i.revokeObjectURL(o),a;}catch(r){return new window[t]("data:application/javascript,".concat(encodeURIComponent(e)),n);}}catch(e){if(!r)throw Error("Inline worker is not supported");return new window[t](r,n);}};},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,i.default)('!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=70)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(17)("wks"),o=n(8),i=n(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e,n){var r=n(57),o=n(24);t.exports=function(t){return r(o(t))}},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(11),o=n(33),i=n(21),u=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(5),o=n(9);t.exports=n(4)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(0),o=n(22),i=n(23),u=n(14),c=n(5).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||c(e,t,{value:u.f(t)})}},function(t,e,n){e.f=n(2)},function(t,e,n){var r=n(5).f,o=n(1),i=n(2)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e,n){var r=n(17)("keys"),o=n(8);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(29),o=n(16);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports={}},function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can\'t convert object to primitive value")}},function(t,e){var n=t.exports={version:"2.5.5"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=!0},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can\'t call method on  "+t);return t}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(29),o=n(16).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(1),o=n(3),i=n(56)(!1),u=n(18)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),s=0,f=[];for(n in c)n!=u&&r(c,n)&&f.push(n);for(;e.length>s;)r(c,n=e[s++])&&(~i(f,n)||f.push(n));return f}},function(t,e,n){var r=n(11),o=n(58),i=n(16),u=n(18)("IE_PROTO"),c=function(){},s=function(){var t,e=n(32)("iframe"),r=i.length;for(e.style.display="none",n(53).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\\/script>"),t.close(),s=t.F;r--;)delete s.prototype[i[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=r(t),n=new c,c.prototype=null,n[u]=t):n=s(),void 0===e?n:o(n,e)}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(7),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(4)&&!n(10)(function(){return 7!=Object.defineProperty(n(32)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(0),o=n(22),i=n(61),u=n(6),c=n(1),s=function(t,e,n){var f,a,l,p=t&s.F,y=t&s.G,d=t&s.S,v=t&s.P,h=t&s.B,m=t&s.W,b=y?o:o[e]||(o[e]={}),g=b.prototype,x=y?r:d?r[e]:(r[e]||{}).prototype;for(f in y&&(n=e),n)(a=!p&&x&&void 0!==x[f])&&c(b,f)||(l=a?x[f]:n[f],b[f]=y&&"function"!=typeof x[f]?n[f]:h&&a?i(l,r):m&&x[f]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((b.virtual||(b.virtual={}))[f]=l,t&s.R&&g&&!g[f]&&u(g,f,l)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e,n){"use strict";var r=n(23),o=n(34),i=n(31),u=n(6),c=n(20),s=n(59),f=n(15),a=n(52),l=n(2)("iterator"),p=!([].keys&&"next"in[].keys()),y=function(){return this};t.exports=function(t,e,n,d,v,h,m){s(n,e,d);var b,g,x,w=function(t){if(!p&&t in _)return _[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",O="values"==v,j=!1,_=t.prototype,P=_[l]||_["@@iterator"]||v&&_[v],k=P||w(v),L=v?O?w("entries"):k:void 0,E="Array"==e&&_.entries||P;if(E&&(x=a(E.call(new t)))!==Object.prototype&&x.next&&(f(x,S,!0),r||"function"==typeof x[l]||u(x,l,y)),O&&P&&"values"!==P.name&&(j=!0,k=function(){return P.call(this)}),r&&!m||!p&&!j&&_[l]||u(_,l,k),c[e]=k,c[S]=y,v)if(b={values:O?k:w("values"),keys:h?k:w("keys"),entries:L},m)for(g in b)g in _||i(_,g,b[g]);else o(o.P+o.F*(p||j),e,b);return b}},function(t,e,n){n(13)("observable")},function(t,e,n){n(13)("asyncIterator")},function(t,e){},function(t,e,n){var r=n(12),o=n(9),i=n(3),u=n(21),c=n(1),s=n(33),f=Object.getOwnPropertyDescriptor;e.f=n(4)?f:function(t,e){if(t=i(t),e=u(e,!0),s)try{return f(t,e)}catch(t){}if(c(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(3),o=n(26).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(28);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(19),o=n(27),i=n(12);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,c=n(t),s=i.f,f=0;c.length>f;)s.call(t,u=c[f++])&&e.push(u);return e}},function(t,e,n){var r=n(8)("meta"),o=n(7),i=n(1),u=n(5).f,c=0,s=Object.isExtensible||function(){return!0},f=!n(10)(function(){return s(Object.preventExtensions({}))}),a=function(t){u(t,r,{value:{i:"O"+ ++c,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return"F";if(!e)return"E";a(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!s(t))return!0;if(!e)return!1;a(t)}return t[r].w},onFreeze:function(t){return f&&l.NEED&&s(t)&&!i(t,r)&&a(t),t}}},function(t,e,n){"use strict";var r=n(0),o=n(1),i=n(4),u=n(34),c=n(31),s=n(43).KEY,f=n(10),a=n(17),l=n(15),p=n(8),y=n(2),d=n(14),v=n(13),h=n(42),m=n(41),b=n(11),g=n(7),x=n(3),w=n(21),S=n(9),O=n(30),j=n(40),_=n(39),P=n(5),k=n(19),L=_.f,E=P.f,M=j.f,D=r.Symbol,A=r.JSON,T=A&&A.stringify,I=y("_hidden"),N=y("toPrimitive"),C={}.propertyIsEnumerable,F=a("symbol-registry"),B=a("symbols"),R=a("op-symbols"),G=Object.prototype,q="function"==typeof D,V=r.QObject,K=!V||!V.prototype||!V.prototype.findChild,W=i&&f(function(){return 7!=O(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=L(G,e);r&&delete G[e],E(t,e,n),r&&t!==G&&E(G,e,r)}:E,H=function(t){var e=B[t]=O(D.prototype);return e._k=t,e},J=q&&"symbol"==typeof D.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof D},z=function(t,e,n){return t===G&&z(R,e,n),b(t),e=w(e,!0),b(n),o(B,e)?(n.enumerable?(o(t,I)&&t[I][e]&&(t[I][e]=!1),n=O(n,{enumerable:S(0,!1)})):(o(t,I)||E(t,I,S(1,{})),t[I][e]=!0),W(t,e,n)):E(t,e,n)},Y=function(t,e){b(t);for(var n,r=h(e=x(e)),o=0,i=r.length;i>o;)z(t,n=r[o++],e[n]);return t},Q=function(t){var e=C.call(this,t=w(t,!0));return!(this===G&&o(B,t)&&!o(R,t))&&(!(e||!o(this,t)||!o(B,t)||o(this,I)&&this[I][t])||e)},U=function(t,e){if(t=x(t),e=w(e,!0),t!==G||!o(B,e)||o(R,e)){var n=L(t,e);return!n||!o(B,e)||o(t,I)&&t[I][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=M(x(t)),r=[],i=0;n.length>i;)o(B,e=n[i++])||e==I||e==s||r.push(e);return r},Z=function(t){for(var e,n=t===G,r=M(n?R:x(t)),i=[],u=0;r.length>u;)!o(B,e=r[u++])||n&&!o(G,e)||i.push(B[e]);return i};q||(c((D=function(){if(this instanceof D)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===G&&e.call(R,n),o(this,I)&&o(this[I],t)&&(this[I][t]=!1),W(this,t,S(1,n))};return i&&K&&W(G,t,{configurable:!0,set:e}),H(t)}).prototype,"toString",function(){return this._k}),_.f=U,P.f=z,n(26).f=j.f=X,n(12).f=Q,n(27).f=Z,i&&!n(23)&&c(G,"propertyIsEnumerable",Q,!0),d.f=function(t){return H(y(t))}),u(u.G+u.W+u.F*!q,{Symbol:D});for(var $="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;$.length>tt;)y($[tt++]);for(var et=k(y.store),nt=0;et.length>nt;)v(et[nt++]);u(u.S+u.F*!q,"Symbol",{for:function(t){return o(F,t+="")?F[t]:F[t]=D(t)},keyFor:function(t){if(!J(t))throw TypeError(t+" is not a symbol!");for(var e in F)if(F[e]===t)return e},useSetter:function(){K=!0},useSimple:function(){K=!1}}),u(u.S+u.F*!q,"Object",{create:function(t,e){return void 0===e?O(t):Y(O(t),e)},defineProperty:z,defineProperties:Y,getOwnPropertyDescriptor:U,getOwnPropertyNames:X,getOwnPropertySymbols:Z}),A&&u(u.S+u.F*(!q||f(function(){var t=D();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(g(e)||void 0!==t)&&!J(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,T.apply(A,r)}}),D.prototype[N]||n(6)(D.prototype,N,D.prototype.valueOf),l(D,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){n(44),n(38),n(37),n(36),t.exports=n(22).Symbol},function(t,e,n){t.exports={default:n(45),__esModule:!0}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e){t.exports=function(){}},function(t,e,n){"use strict";var r=n(48),o=n(47),i=n(20),u=n(3);t.exports=n(35)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){n(49);for(var r=n(0),o=n(6),i=n(20),u=n(2)("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<c.length;s++){var f=c[s],a=r[f],l=a&&a.prototype;l&&!l[u]&&o(l,u,f),i[f]=i.Array}},function(t,e,n){var r=n(24);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(1),o=n(51),i=n(18)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(25),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(25),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(3),o=n(55),i=n(54);t.exports=function(t){return function(e,n,u){var c,s=r(e),f=o(s.length),a=i(u,f);if(t&&n!=n){for(;f>a;)if((c=s[a++])!=c)return!0}else for(;f>a;a++)if((t||a in s)&&s[a]===n)return t||a||0;return!t&&-1}}},function(t,e,n){var r=n(28);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(5),o=n(11),i=n(19);t.exports=n(4)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),c=u.length,s=0;c>s;)r.f(t,n=u[s++],e[n]);return t}},function(t,e,n){"use strict";var r=n(30),o=n(9),i=n(15),u={};n(6)(u,n(2)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(60);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(25),o=n(24);t.exports=function(t){return function(e,n){var i,u,c=String(o(e)),s=r(n),f=c.length;return s<0||s>=f?t?"":void 0:(i=c.charCodeAt(s))<55296||i>56319||s+1===f||(u=c.charCodeAt(s+1))<56320||u>57343?t?c.charAt(s):i:t?c.slice(s,s+2):u-56320+(i-55296<<10)+65536}}},function(t,e,n){"use strict";var r=n(62)(!0);n(35)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){n(63),n(50),t.exports=n(14).f("iterator")},function(t,e,n){t.exports={default:n(64),__esModule:!0}},function(t,e,n){"use strict";e.__esModule=!0;var r=u(n(65)),o=u(n(46)),i="function"==typeof o.default&&"symbol"==typeof r.default?function(t){return typeof t}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":typeof t};function u(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof o.default&&"symbol"===i(r.default)?function(t){return void 0===t?"undefined":i(t)}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":void 0===t?"undefined":i(t)}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";(function(r){var o,i,u=n(66),c=(i=u)&&i.__esModule?i:{default:i};!function(i,u){var s,f=(i=void 0!==i?i:"undefined"!=typeof self?self:void 0!==r?r:{}).IDBKeyRange||i.webkitIDBKeyRange,a="readonly",l="readwrite",p=Object.prototype.hasOwnProperty,y=function(){if(!s&&!(s=i.indexedDB||i.webkitIndexedDB||i.mozIndexedDB||i.oIndexedDB||i.msIndexedDB||(null===i.indexedDB&&i.shimIndexedDB?i.shimIndexedDB:u)))throw"IndexedDB required";return s},d=function(t){return t},v=function(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()},h=function(t){return"function"==typeof t},m=function(t){return t===u},b=function(t,e){var n=this,r=!1;this.name=e,this.getIndexedDB=function(){return t},this.add=function(e){if(r)throw"Database has been closed";for(var o=[],i=0,u=0;u<arguments.length-1;u++)if(Array.isArray(arguments[u+1]))for(var c=0;c<arguments[u+1].length;c++)o[i]=arguments[u+1][c],i++;else o[i]=arguments[u+1],i++;var s=t.transaction(e,l),f=s.objectStore(e);return new Promise(function(t,e){o.forEach(function(t){var e;if(t.item&&t.key){var n=t.key;t=t.item,e=f.add(t,n)}else e=f.add(t);e.onsuccess=function(e){var n=e.target,r=n.source.keyPath;null===r&&(r="__id__"),Object.defineProperty(t,r,{value:n.result,enumerable:!0})}}),s.oncomplete=function(){t(o,n)},s.onerror=function(t){t.preventDefault(),e(t)},s.onabort=function(t){e(t)}})},this.updateAndDelete=function(e,n,o){if(r)throw"Database has been closed";var i=t.transaction(e,l),u=i.objectStore(e),c=u.keyPath;return new Promise(function(t,e){n.forEach(function(t){if(t.item&&t.key){var e=t.key;t=t.item,u.put(t,e)}else u.put(t)}),o.forEach(function(t){u.delete(t[c])}),i.oncomplete=function(){t([n,o])},i.onerror=function(t){e(t)}})},this.update=function(e){if(r)throw"Database has been closed";for(var o,i=[],u=1;u<arguments.length;u++)o=arguments[u],Array.isArray(o)?i=i.concat(o):i.push(o);var c=t.transaction(e,l),s=c.objectStore(e);s.keyPath;return new Promise(function(t,e){i.forEach(function(t){var e;if(t.item&&t.key){var n=t.key;t=t.item,e=s.put(t,n)}else e=s.put(t);e.onsuccess=function(t){},e.onerror=function(t){}}),c.oncomplete=function(){t(i,n)},c.onerror=function(t){e(t)},c.onabort=function(t){e(t)}})},this.remove=function(e,n,o,i,c,s,a){if(r)throw"Database has been closed";var p=t.transaction(e,l),y=p.objectStore(e);return new Promise(function(t,e){function r(t){return t===u||null===t}if(r(i)&&(i=-1/0),r(c)&&(c=1/0),null===n||Array.isArray(n)||(n=[n]),r(o))null!==n?n.forEach(function(t){y.delete(t)}):y.delete(range=f.bound(i,c,s,a));else{var l=void 0;l=null!==n?f.only(n[0]):f.bound(i,c,s,a),y.index(o).openCursor(l).onsuccess=function(t){var e=t.target.result;e&&(e.delete(),e.continue())}}p.oncomplete=function(){t()},p.onerror=function(t){e(t)},p.onabort=function(t){e(t)}})},this.clear=function(e){if(r)throw"Database has been closed";var n=t.transaction(e,l);n.objectStore(e).clear();return new Promise(function(t,e){n.oncomplete=function(){t()},n.onerror=function(t){e(t)}})},this.close=function(){r||(t.close(),r=!0,delete w[e])},this.get=function(e,n){if(r)throw"Database has been closed";var o=t.transaction(e),i=o.objectStore(e).get(n);return new Promise(function(t,e){i.onsuccess=function(e){t(e.target.result)},o.onerror=function(t){e(t)}})},this.query=function(e,n){if(r)throw"Database has been closed";return new g(e,t,n)},this.count=function(e,n){if(r)throw"Database has been closed";t.transaction(e).objectStore(e)};for(var o=0,i=t.objectStoreNames.length;o<i;o++)!function(t){for(var e in n[t]={},n)p.call(n,e)&&"close"!==e&&(n[t][e]=function(e){return function(){var r=[t].concat([].slice.call(arguments,0));return n[e].apply(n,r)}}(e))}(t.objectStoreNames[o])},g=function(t,e,n){var r=this,o=!1,i=!1,s=function(r,s,p,y,d,v,m){return new Promise(function(b,g){var x=o||i?l:a,w=e.transaction(t,x),S=w.objectStore(t),O=n?S.index(n):S,j=r?f[r].apply(null,s):null,_=[],P=[j],k=0;d=d||null,v=v||[],"count"!==p&&P.push(y||"next");var L=!!o&&Object.keys(o);O[p].apply(O,P).onsuccess=function(t){var e=t.target.result;if((void 0===e?"undefined":(0,c.default)(e))===(0,c.default)(0))_=e;else if(e)if(null!==d&&d[0]>k)k=d[0],e.advance(d[0]);else if(null!==d&&k>=d[0]+d[1]);else{var n=!0,r="value"in e?e.value:e.key;v.forEach(function(t){t&&t.length&&(2===t.length?n=n&&r[t[0]]===t[1]:h(t[0])&&(n=n&&t[0].apply(u,[r])))}),n&&(k++,_.push(m(r)),i?e.delete():o&&(r=function(t){for(var e=0;e<L.length;e++){var n=L[e],r=o[n];r instanceof Function&&(r=r(t)),t[n]=r}return t}(r),e.update(r))),e.continue()}},w.oncomplete=function(){b(_)},w.onerror=function(t){g(t)},w.onabort=function(t){g(t)}})},p=function(t,e){var n="next",r="openCursor",u=[],c=null,f=d,a=!1,l=function(){return s(t,e,r,a?n+"unique":n,c,u,f)},p=function(){return n=null,r="count",{execute:l}},y=function t(){var e;return e=arguments[0],1==(c="array"===v(e)?arguments[0]:Array.prototype.slice.call(arguments,0,2)).length&&c.unshift(0),function(t){return"number"===v(t)}(c[1])||(c=null),{execute:l,count:p,keys:b,filter:g,asc:x,desc:w,distinct:S,modify:O,limit:t,map:j,remove:_}},b=function t(e){return(e=!!m(e)||!!e)&&(r="openKeyCursor"),{execute:l,keys:t,filter:g,asc:x,desc:w,distinct:S,modify:O,limit:y,map:j,remove:_}},g=function t(){return u.push(Array.prototype.slice.call(arguments,0,2)),{execute:l,count:p,keys:b,filter:t,asc:x,desc:w,distinct:S,modify:O,limit:y,map:j,remove:_}},x=function t(e){return e=!!m(e)||!!e,n=e?"next":"prev",{execute:l,count:p,keys:b,filter:g,asc:t,desc:w,distinct:S,modify:O,limit:y,map:j,remove:_}},w=function t(e){return e=!!m(e)||!!e,n=e?"prev":"next",{execute:l,count:p,keys:b,filter:g,asc:x,desc:t,distinct:S,modify:O,limit:y,map:j,remove:_}},S=function t(e){return e=!!m(e)||!!e,a=e,{execute:l,count:p,keys:b,filter:g,asc:x,desc:w,distinct:t,modify:O,limit:y,map:j,remove:_}},O=function t(e){return o=e,{execute:l,count:p,keys:b,filter:g,asc:x,desc:w,distinct:S,modify:t,limit:y,map:j,remove:_}},j=function t(e){return h(e)&&(f=e),{execute:l,count:p,keys:b,filter:g,asc:x,desc:w,distinct:S,modify:O,limit:y,map:t,remove:_}},_=function t(e){return e=!!m(e)||!!e,i=e,{execute:l,count:p,keys:b,filter:g,asc:x,desc:w,distinct:S,modify:O,limit:y,map:j,remove:t}};return{execute:l,count:p,keys:b,filter:g,asc:x,desc:w,distinct:S,modify:O,limit:y,map:j,remove:_}};"only bound upperBound lowerBound".split(" ").forEach(function(t){r[t]=function(){return new p(t,arguments)}}),this.filter=function(){var t=new p(null,null);return t.filter.apply(t,arguments)},this.all=function(){return this.filter()}},x=function(t,e,n,r){var o=t.target.result,i=new b(o,e);return w[e]=o,Promise.resolve(i)},w={},S={version:"0.10.2",open:function(t){var e;return new Promise(function(n,r){if(w[t.server])x({target:{result:w[t.server]}},t.server,t.version,t.schema).then(n,r);else{try{e=y().open(t.server,t.version)}catch(t){r(t)}e.onsuccess=function(e){x(e,t.server,t.version,t.schema).then(n,r)},e.onupgradeneeded=function(e){!function(t,e,n){for(var r in"function"==typeof e&&(e=e()),e){var o,i=e[r];for(var u in o=!p.call(e,r)||n.objectStoreNames.contains(r)?t.currentTarget.transaction.objectStore(r):n.createObjectStore(r,i.key),i.indexes){var c=i.indexes[u];try{o.index(u)}catch(t){o.createIndex(u,c.key||u,Object.keys(c).length?c:{unique:!1})}}}}(e,t.schema,e.target.result)},e.onerror=function(t){r(t)}}})},remove:function(t){return new Promise(function(e,n){if(!t)return e();var r,o;(void 0===t?"undefined":(0,c.default)(t))===b&&(t=t.name),"string"==typeof t&&(r=w[t]),r&&"function"==typeof r.close&&r.close();try{o=y().deleteDatabase(t)}catch(t){n(t)}o.onsuccess=function(n){delete w[t],e(t)},o.onerror=function(t){n(t)},o.onblocked=function(t){n(t)}})}};void 0!==t&&void 0!==t.exports?t.exports=S:(o=function(){return S}.call(e,n,e,t))===u||(t.exports=o)}(void 0)}).call(this,n(67))},function(t,e,n){"use strict";var r=n(68),o={log:{key:{keyPath:"time"},indexes:{level:{unique:!1},time:{unique:!0}}}};function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.server=null,this.expire=t.expire||72,this.name=t.name}var u=i.prototype;u.init=function(){var t=this;if(!this.server)return r.open({server:"nim-log-"+this.name,version:1,schema:o}).then(function(e){t.server=e})},u.putLog=function(t){var e=this;if(!this.server)return Promise.reject("no db server");var n=t.slice(-1)[0].time-36e5*this.expire;return this.deleteLogs(n).then(function(){return e.server.add("log",t)})},u.getAllLogs=function(){return this.server?this.server.query("log","time").all().execute().then(function(t){var e={},n=t.slice(-1)[0];return e.logs=t.map(function(t){return t.log}).join("\\r\\n"),e.time=n&&n.time,e}):Promise.reject("no db server")},u.deleteLogs=function(t){return this.server?this.server.remove("log",null,"time",0,t):Promise.reject("no db server")},t.exports=i},function(t,e,n){const r=n(69);let o=null;function i(t){return t&&"string"!=typeof t?t.message?t.message:t.target&&t.target.error?t.target.error.message:"unknown error":t}self.onmessage=function(t){switch(t.data.type){case"init":n=t.data.msg,(o=new r(n)).init().catch(t=>{postMessage({type:"error",msg:{msg:"dbLog init error",error:i(t)}})});break;case"fetch":o.getAllLogs().then(t=>{postMessage({type:"fetchDone",code:200,msg:t})}).catch(t=>{postMessage({type:"fetchDone",code:500,msg:i(t)})});break;case"delete":o.deleteLogs(e).catch(t=>{postMessage({type:"deleteLogs",code:500,msg:i(t)})});break;default:!function(t){if(!o)return;o.putLog(t).then(t=>{postMessage(200)}).catch(t=>{postMessage({type:"error",msg:{msg:"putLog error",error:i(t)}})})}(t.data)}var e,n}}]);',"Worker",void 0,void 0);};var r,s=n(273),i=(r=s)&&r.__esModule?r:{default:r};e.exports=t.default;},function(e,t,n){"use strict";var r=n(274),s=n(272),i=n(0).getGlobal(),o=n(33).name,a="function"==typeof r,c=i.indexedDB&&!/^(IE)$/.test(o);function u(e,t){this.logWorker=null,this.db=null,this.logQueue=[],this.callbackList=[],this.preTime=null,this.lastTime=+new Date(),this.initLogLocal({name:e,expire:t});}var m=u.prototype;u.enable=!0,m.saveLog=function(e){var t=this.logQueue.length,n=this.logQueue[t-1];e.time!==this.preTime?((this.logQueue.length>50||e.time-this.lastTime>6e4&&this.logQueue.length>0)&&(this.doSaveLog(this.logQueue.slice(0)),this.lastTime=n.time,this.logQueue=[]),this.logQueue.push(e),this.preTime=e.time):n.log+="\r\n"+e.log;},m.doSaveLog=function(){},m.initLogLocal=function(){},m.fetchLog=function(){},m.deleteLogs=function(e){},m.logError=function(){},c?a?(m.doSaveLog=function(e){this.logWorker.postMessage(e);},m.initLogLocal=function(e){var t=this;this.logWorker=new r({}),this.logWorker.onmessage=function(e){var n=e.data||{};switch(n.type){case"fetchDone":t.fetchLogDone(n.code,n.msg);break;case"error":t.logError(n.msg);}},this.logWorker.postMessage({type:"init",msg:e});},m.fetchLog=function(){var e=this;return new Promise(function(t,n){0===e.callbackList.length&&e.logWorker.postMessage({type:"fetch"}),e.callbackList.push(t),e.callbackList.push(n);});},m.fetchLogDone=function(e,t){for(var n=200===e?0:1,r=0;r<this.callbackList.length/2;r++){this.callbackList[2*r+n](t);}this.callbackList=[];},m.deleteLogs=function(e){return this.logWorker.postMessage({type:"delete",msg:e}),Promise.resolve();}):(m.doSaveLog=function(e){var t=this;this.db.putLog(e).catch(function(e){t.logError({msg:"putLog error",error:e});});},m.initLogLocal=function(e){var t=this;this.db=new s(e),this.db.init().catch(function(e){t.logError({msg:"dbLog init error",error:e});});},m.fetchLog=function(){return this.db.getAllLogs();},m.deleteLogs=function(e){return this.db.deleteLogs(e);}):u.enable=!1,e.exports=u;},function(e,t,n){"use strict";var r=n(33),s=n(0),i=n(3),o=n(22),a=n(275);function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s.merge(this,{options:e,debug:!1,api:"log",style:"color:blue;",log:s.emptyFunc,info:s.emptyFunc,warn:s.emptyFunc,error:s.emptyFunc}),this.prefix=e.prefix||"",this.localEnable=a.enable&&e.dbLog&&e.account,this.setDebug(e.debug),this.localEnable&&(this._local=new a(e.account,e.expire),this._local.logError=this.error);}var u=c.prototype,m=["Chrome","Safari","Firefox"];u.setDebug=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this;if(t.debug=e,e.style&&(t.style=e.style),s.exist(console))if(t.debug){var n=console;t.debug=function(){var e=t.formatArgsAndSave(arguments,"debug");-1!==m.indexOf(r.name)&&s.isString(e[0])&&(e[0]="%c"+e[0],e.splice(1,0,t.style)),t._log("debug",e);},t.log=function(){var e=t.formatArgsAndSave(arguments,"log");-1!==m.indexOf(r.name)&&s.isString(e[0])&&(e[0]="%c"+e[0],e.splice(1,0,t.style)),t._log("log",e);},t.info=function(){var e=t.formatArgsAndSave(arguments,"info");-1!==m.indexOf(r.name)&&s.isString(e[0])&&(e[0]="%c"+e[0],e.splice(1,0,t.style)),t._log("info",e);},t.warn=function(){var e=t.formatArgsAndSave(arguments,"warn");-1!==m.indexOf(r.name)&&s.isString(e[0])&&(e[0]="%c"+e[0],e.splice(1,0,t.style)),t._log("warn",e);},t.error=function(){var e=t.formatArgsAndSave(arguments,"error");-1!==m.indexOf(r.name)&&s.isString(e[0])&&(e[0]="%c"+e[0],e.splice(1,0,t.style)),t._log("error",e);},t._log=function(e,r){var i=t.options.logFunc;if((!i||!s.isFunction(i[e]))&&n[e])try{n[e].apply?t.chrome(e,r):t.ie(e,r);}catch(e){}},t.chrome=function(e,s){-1!==m.indexOf(r.name)?n[e].apply(n,s):t.ie(e,s);},t.ie=function(e,t){t.forEach(function(t){n[e](JSON.stringify(t,null,4));});};}else if(i.isRN||this.localEnable||this.options.logFunc){var o=!i.isRN&&!this.localEnable;t.log=function(){t.formatArgsAndSave(arguments,"log",o);},t.info=function(){t.formatArgsAndSave(arguments,"info",o);},t.warn=function(){t.formatArgsAndSave(arguments,"warn",o);},t.error=function(){t.formatArgsAndSave(arguments,"error",o);};}},u.formatArgsAndSave=function(e,t,n){e=[].slice.call(e,0);var r=new Date(),i="[NIM LOG "+(l(r.getMonth()+1)+"-"+l(r.getDate())+" "+l(r.getHours())+":"+l(r.getMinutes())+":"+l(r.getSeconds())+":"+l(r.getMilliseconds(),3))+" "+this.prefix.toUpperCase()+"]  ",o="";s.isString(e[0])?e[0]=i+e[0]:e.splice(0,0,i),e.forEach(function(t,n){s.isArray(t)||s.isObject(t)?(e[n]=s.simpleClone(t),o+=JSON.stringify(e[n])+" "):o+=t+" ";});var a=this.options.logFunc;return a&&s.isFunction(a[t])&&a[t].apply(a,e),!n&&this.writeLocalLog(o,t,+r),e;},u.writeLocalLog=i.isRN?function(e,t){if(!(o.rnfs&&o.rnfs.writeFile&&o.rnfs.appendFile&&o.rnfs.DocumentDirectoryPath))return;if(!/error|warn|info/.test(t))return;var n=o.rnfs,r=void 0,s=n.size/2-256;function i(e){return o.rnfs.DocumentDirectoryPath+"/nimlog_"+e+".log";}e+="\r\n",n.nimPromise=n.nimPromise.then(function(){return r=i(n.nimIndex),n.exists(r);}).then(function(t){return t?n.appendFile(r,e):n.writeFile(r,e);}).then(function(){return n.stat(r);}).then(function(e){if(e.size>s)return n.nimIndex++,n.nimIndex>1&&(n.nimIndex=n.nimIndex%2),n.unlink(i(n.nimIndex)).catch(function(e){return Promise.resolve();});}).catch(function(e){console.error(e);});}:i.isBrowser?function(e,t,n){this._local&&this._local.saveLog({log:e,level:t,time:n});}:function(){};var l=function l(e,t){t=t||2;for(var n=""+e;n.length<t;){n="0"+n;}return n;};e.exports=c;},function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,s="~";function i(){}function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1;}function a(){this._events=new i(),this._eventsCount=0;}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(s=!1)),a.prototype.eventNames=function(){var e,t,n=[];if(0===this._eventsCount)return n;for(t in e=this._events){r.call(e,t)&&n.push(s?t.slice(1):t);}return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(e)):n;},a.prototype.listeners=function(e,t){var n=s?s+e:e,r=this._events[n];if(t)return!!r;if(!r)return[];if(r.fn)return[r.fn];for(var i=0,o=r.length,a=new Array(o);i<o;i++){a[i]=r[i].fn;}return a;},a.prototype.emit=function(e,t,n,r,i,o){var a=s?s+e:e;if(!this._events[a])return!1;var c,u,m=this._events[a],l=arguments.length;if(m.fn){switch(m.once&&this.removeListener(e,m.fn,void 0,!0),l){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,t),!0;case 3:return m.fn.call(m.context,t,n),!0;case 4:return m.fn.call(m.context,t,n,r),!0;case 5:return m.fn.call(m.context,t,n,r,i),!0;case 6:return m.fn.call(m.context,t,n,r,i,o),!0;}for(u=1,c=new Array(l-1);u<l;u++){c[u-1]=arguments[u];}m.fn.apply(m.context,c);}else{var d,p=m.length;for(u=0;u<p;u++){switch(m[u].once&&this.removeListener(e,m[u].fn,void 0,!0),l){case 1:m[u].fn.call(m[u].context);break;case 2:m[u].fn.call(m[u].context,t);break;case 3:m[u].fn.call(m[u].context,t,n);break;case 4:m[u].fn.call(m[u].context,t,n,r);break;default:if(!c)for(d=1,c=new Array(l-1);d<l;d++){c[d-1]=arguments[d];}m[u].fn.apply(m[u].context,c);}}}return!0;},a.prototype.on=function(e,t,n){var r=new o(t,n||this),i=s?s+e:e;return this._events[i]?this._events[i].fn?this._events[i]=[this._events[i],r]:this._events[i].push(r):(this._events[i]=r,this._eventsCount++),this;},a.prototype.once=function(e,t,n){var r=new o(t,n||this,!0),i=s?s+e:e;return this._events[i]?this._events[i].fn?this._events[i]=[this._events[i],r]:this._events[i].push(r):(this._events[i]=r,this._eventsCount++),this;},a.prototype.removeListener=function(e,t,n,r){var o=s?s+e:e;if(!this._events[o])return this;if(!t)return 0==--this._eventsCount?this._events=new i():delete this._events[o],this;var a=this._events[o];if(a.fn)a.fn!==t||r&&!a.once||n&&a.context!==n||(0==--this._eventsCount?this._events=new i():delete this._events[o]);else{for(var c=0,u=[],m=a.length;c<m;c++){(a[c].fn!==t||r&&!a[c].once||n&&a[c].context!==n)&&u.push(a[c]);}u.length?this._events[o]=1===u.length?u[0]:u:0==--this._eventsCount?this._events=new i():delete this._events[o];}return this;},a.prototype.removeAllListeners=function(e){var t;return e?(t=s?s+e:e,this._events[t]&&(0==--this._eventsCount?this._events=new i():delete this._events[t])):(this._events=new i(),this._eventsCount=0),this;},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prototype.setMaxListeners=function(){return this;},a.prefixed=s,a.EventEmitter=a,e.exports=a;},function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(98),i=(r=s)&&r.__esModule?r:{default:r};t.default=function(e,t,n){return t in e?(0,i.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e;};},function(e,t,n){"use strict";(function(t){var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(127),a=n(126),c=n(88),u=n(124),m=n(123);e.exports={polyfill:function polyfill(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t||window;if("object"!==(void 0===e?"undefined":(0,i.default)(e)))throw new Error("polyfill target is not an Object");var n={localStorage:o,XMLHttpRequest:a,FormData:c,WebSocket:u,Object:Object,navigator:m,location:Object.create(null)};for(var r in n){e[r]||(e[r]=n[r]);}e.navigator.product="WeixinApp";},localStorage:o,XMLHttpRequest:a,FormData:c,WebSocket:u};}).call(this,n(13));},function(e,t,n){"use strict";var r=n(279).polyfill;try{r();}catch(e){}try{r(GameGlobal);}catch(e){}try{window=window||{},r(window);}catch(e){}try{localStorage=localStorage||n(127);}catch(e){}try{XMLHttpRequest=XMLHttpRequest||n(126);}catch(e){}try{FormData=FormData||n(88);}catch(e){}try{WebSocket=WebSocket||n(124);}catch(e){}try{navigator=navigator||n(123);}catch(e){}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=n(12).fn,s=n(0);r.httpRequestProxy=function(e){s.verifyOptions(e,"path","misc::httpRequestProxy");var t=Object.assign({},e);delete t.done,this.processCallback(e),this.sendCmd("httpProxy",{proxyTag:t},e.callback);};},function(e,t,n){"use strict";var r=n(0),s=r.notundef;function i(e){r.verifyOptions(e,"type","event::MsgEventSubscribe"),r.verifyParamType("type",e.type,"number","event::MsgEventSubscribe"),r.findObjIndexInArray([1,2,3],e.type)<0&&r.verifyParamMin("type",e.type,1e5,"event::MsgEventSubscribe"),this.type=e.type,s(e.subscribeTime)?(r.verifyParamType("subscribeTime",e.subscribeTime,"number","event::MsgEventSubscribe"),r.verifyParamMin("subscribeTime",e.subscribeTime,60,"event::MsgEventSubscribe"),r.verifyParamMax("subscribeTime",e.subscribeTime,2592e3,"event::MsgEventSubscribe"),this.subscribeTime=e.subscribeTime):this.subscribeTime=2592e3,s(e.sync)?(r.verifyParamType("sync",e.sync,"boolean","event::MsgEventSubscribe"),this.sync=e.sync):this.sync=!0;}i.prototype.assembleEvent=function(e){return{type:this.type,subscribeTime:this.subscribeTime,sync:!0===this.sync?1:0};},e.exports=i;},function(e,t,n){"use strict";var r=n(0),s=r.notundef,i=n(15);function o(e){if(r.verifyOptions(e,"type value","event::MsgEvent"),r.verifyParamType("type",e.type,"number","event::MsgEvent"),r.verifyParamType("value",e.value,"number","event::MsgEvent"),this.type=e.type,this.value=e.value,this.idClient=r.guid(),s(e.custom)&&(this.custom=""+e.custom),this.validTime=e.validTime||604800,r.verifyParamType("validTime",this.validTime,"number","event::MsgEvent"),r.verifyParamMin("validTime",this.validTime,60,"event::MsgEvent"),r.verifyParamMax("validTime",this.validTime,604800,"event::MsgEvent"),s(e.broadcastType)){if(r.verifyParamType("broadcastType",e.broadcastType,"number","event::MsgEvent"),[1,2].indexOf(e.broadcastType)<0)throw new i('参数错误"broadcastType":只能为1或2');this.broadcastType=e.broadcastType;}else this.broadcastType=2;s(e.sync)?(r.verifyParamType("sync",e.sync,"boolean","event::MsgEvent"),this.sync=e.sync):this.sync=!1;}o.prototype.assembleEvent=function(){return{type:this.type,value:this.value,idClient:this.idClient,custom:this.custom||"",validTime:this.validTime,broadcastType:this.broadcastType,sync:!0===this.sync?1:0};},e.exports=o;},function(e,t,n){"use strict";var r,s=n(6),i=(r=s)&&r.__esModule?r:{default:r};var o=n(12).fn,a=n(0),c=n(417),u=n(416);function m(e){return"object"===(void 0===e?"undefined":(0,i.default)(e))&&(e.msgEventSubscribes?e=e.msgEventSubscribes:e.msgEventSubscribe?e=e.msgEventSubscribe:e.accounts?e=e.accounts:e.msgEvent&&(e=e.msgEvent).time&&(e.time=+e.time),1===e.sync?e.sync=!0:0===e.sync&&(e.sync=!1)),e;}o.batchSendEventsCmds=function(e,t,n){var r=this,s=a.dropArrayDuplicates(t.accounts);s=a.reshape2d(s,100);var i=[];s.forEach(function(n){i.push(new Promise(function(s,i){var o=a.simpleClone(t);o.accounts=n,r.sendCmdWithResp(e,o,function(e,t){e?i(e):s(m(t));});}));}),Promise.all(i).then(function(e){var t=null;if(e.length>0)if(e[0].msgEventSubscribe){var r=e[0].msgEventSubscribe;r=m(r);var s=[];e.forEach(function(e){s=s.concat(e.accounts);}),t={accounts:s,msgEventSubscribe:r};}else t=[],e.forEach(function(e){t=t.concat(e);});n(null,t);},function(e){n(e,null);});},o.publishEvent=function(e){var t=new c(e);t=t.assembleEvent(),this.processCallback(e),this.sendCmdWithResp("publishEvent",{msgEvent:t},function(t,n){t||(n=m(n)),e.callback(t,n);});},o.subscribeEvent=function(e){a.verifyOptions(e,"accounts","event::subscribeEvent");var t=new u(e);a.verifyParamType("accounts",e.accounts,"array","event::subscribeEvent"),this.processCallback(e),t=t.assembleEvent(),this.batchSendEventsCmds("subscribeEvent",{msgEventSubscribe:t,accounts:e.accounts},function(t,n){!t&&n&&(n={failedAccounts:n}),e.callback(t,n);});},o.unSubscribeEventsByAccounts=function(e){a.verifyOptions(e,"accounts","event::unSubscribeEventsByAccounts"),a.verifyParamType("accounts",e.accounts,"array","event::unSubscribeEventsByAccounts");var t=new u(e);t=t.assembleEvent(),this.processCallback(e),this.batchSendEventsCmds("unSubscribeEventsByAccounts",{msgEventSubscribe:t,accounts:e.accounts},function(t,n){!t&&n&&(n={failedAccounts:n}),e.callback(t,n);});},o.unSubscribeEventsByType=function(e){var t=new u(e);t=t.assembleEvent(),this.processCallback(e),this.sendCmdWithResp("unSubscribeEventsByType",{msgEventSubscribe:t},function(t,n){e.callback(t);});},o.querySubscribeEventsByAccounts=function(e){a.verifyOptions(e,"accounts","event::querySubscribeEventsByAccounts"),a.verifyParamType("accounts",e.accounts,"array","event::querySubscribeEventsByAccounts");var t=new u(e);t=t.assembleEvent(),this.processCallback(e),this.batchSendEventsCmds("querySubscribeEventsByAccounts",{msgEventSubscribe:t,accounts:e.accounts},function(t,n){!t&&n&&(n={msgEventSubscribes:n}),e.callback(t,n);});},o.querySubscribeEventsByType=function(e){var t=new u(e);t=t.assembleEvent(),this.processCallback(e),this.sendCmdWithResp("querySubscribeEventsByType",{msgEventSubscribe:t},function(t,n){t||(n={msgEventSubscribes:m(n)}),e.callback(t,n);});};},function(e,t,n){"use strict";var r=n(12).fn,s=n(150),i=n(0),o=i.undef;r.getPushNotificationMultiportConfig=function(){return this.protocol.getPushNotificationMultiportConfig();},r.updatePushNotificationMultiportConfig=function(e){i.verifyOptions(e),o(e.shouldPushNotificationWhenPCOnline)&&(e.shouldPushNotificationWhenPCOnline=!0),e.donnop=new s(e),this.processCallback(e),this.sendCmd("updateDonnop",e);};},function(e,t,n){"use strict";var r=n(12).fn;r.clearDB=function(e){var t=this.db;this.processCallback(e);var n=e.done;t.enable?t.clear().then(n,n):n();},r.removeDB=function(e){var t=this.db;this.processCallback(e);var n=e.done;t.enable?t.destroy().then(n,n):n();},r.closeDB=function(e){var t=this.db;this.processCallback(e);var n=e.done;t.enable?t.close().then(n,n):n();};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0);r.audioToText=function(e){s.verifyOptions(e,"url","audio::audioToText"),e.audioToText=s.filterObj(e,"url");this.processCallback(e),this.sendCmd("audioToText",e);};},function(e,t,n){"use strict";},function(e,t,n){"use strict";},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=n(3);r.getChatroomAddress=function(e){s.verifyOptions(e,"chatroomId","chatroom::getChatroomAddress");e.isWeixinApp=i.isWeixinApp,e.type=i.ipVersion,this.processCallback(e),this.sendCmd("getChatroomAddress",e);};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=s.undef,o=s.notundef,a=n(69);r.markSysMsgRead=function(e){var t,n=this.db,r=Promise.resolve(),i=this.protocol;s.verifyOptions(e,"sysMsgs","sysmsg::markSysMsgRead");var o=e.sysMsgs;function a(){e.done(t,e);}s.isArray(o)||(o=[o]),n.enable?r=n.markSysMsgRead(o).then(function(e){o=e,i.onUpdateSysMsg(e);}):(o=o.filter(function(e){return!e.read;})).length&&(i.options.autoMarkRead||i.markSysMsgRead(o,!0),o.forEach(function(e){e.read=!0;}),i.onUpdateSysMsg(o)),r.then(function(){return i.reduceSysMsgUnread(o);}).then(a,function(e){t=e,a();});},r.sendCustomSysMsg=function(e){s.verifyOptions(e,"scene to content","sysmsg::sendCustomSysMsg"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"sysmsg::sendCustomSysMsg"),this.processCallback(e);var t="sendCustomSysMsg";return"p2p"===e.scene?e.type="customP2p":"superTeam"===e.scene?(e.type="customSuperTeam",t="sendSuperTeamCustomSysMsg"):e.type="customTeam",e.sysMsg=new a(e),e.filter&&(t="sendFilterCustomSysMsg"),this.sendCmd(t,{sysMsg:e.sysMsg,single:!0},e.callback),this.formatReturnSysMsg(e.sysMsg);},r.formatReturnSysMsg=function(e){return e=s.copy(e),this.protocol.completeSysMsg(e),e.status="sending",e=a.reverse(e);},r.getLocalSysMsgs=function(e){var t,n=this.db,r=[];function c(){e.sysMsgs=r,e.done(t,e);}s.verifyOptions(e),e.category&&s.verifyParamValid("category",e.category,a.validCategories,"sysmsg::getLocalSysMsgs"),e.type&&s.verifyParamValid("type",e.type,a.validTypes,"sysmsg::getLocalSysMsgs"),i(e.limit)&&(e.limit=100),s.verifyParamType("limit",e.limit,"number","sysmsg::getLocalSysMsgs"),s.verifyParamMax("limit",e.limit,100,"sysmsg::getLocalSysMsgs"),o(e.reverse)?s.verifyParamType("reverse",e.reverse,"boolean","sysmsg::getLocalSysMsgs"):e.reverse=!1,this.processCallback(e),n.enable?n.getSysMsgs(e).then(function(e){r=e,c();},function(e){t=e,c();}):c();},r.updateLocalSysMsg=function(e){var t,n=this.db,r=null;if(s.verifyOptions(e,"idServer","sysmsg::updateLocalSysMsg"),this.processCallback(e),n.enable){var i=s.filterObj(e,"idServer state localCustom");n.updateSysMsg(i).then(function(e){r=e,o();},function(e){t=e,o();});}else o();function o(){e.sysMsg=r,e.done(t,e);}},r.deleteLocalSysMsg=function(e){var t,n=this.db;function r(){e.done(t,e);}s.verifyOptions(e,"idServer","sysmsg::deleteLocalSysMsg"),this.processCallback(e),n.enable?n.deleteSysMsg(e.idServer).then(function(){r();},function(e){t=e,r();}):r();},r.deleteAllLocalSysMsgs=function(e){var t,n=this,r=n.db;function s(){n.protocol.onUpdateSysMsgUnread({}),e.done(t,e);}n.processCallback(e),r.enable&&r.deleteAllSysMsgs().then(function(){s();},function(e){t=e,s();});};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=n(235),o=n(234),a=s.notundef;function c(e,t,n,r){n=n||"",s.verifyParamType(n+"from",e.from,"string",t),s.verifyParamType(n+"to",e.to,"string",t),s.verifyParamType(n+"idServer",e.idServer,"string",t),s.verifyParamType(n+"time",e.time,"number",t),s.verifyParamValid(n+"scene",e.scene,this.message.validScenes,t),r||s.verifyParamType(n+"idClient",e.idClient,"string",t);}r.getThreadMsgs=function(e){s.verifyCallback(e,"done","msg::getThreadMsgs"),s.verifyOptions(e,"scene threadMsgFromAccount threadMsgToAccount threadMsgIdServer threadMsgTime","msg::getThreadMsgs"),s.verifyParamType("threadMsgFromAccount",e.threadMsgFromAccount,"string","msg::getThreadMsgs"),s.verifyParamType("threadMsgToAccount",e.threadMsgToAccount,"string","msg::getThreadMsgs"),s.verifyParamType("threadMsgIdServer",e.threadMsgIdServer,"string","msg::getThreadMsgs"),s.verifyParamType("threadMsgTime",e.threadMsgTime,"number","msg::getThreadMsgs"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"msg::getThreadMsgs"),this.processCallback(e);var t={scene:this.message.sceneMap[e.scene],from:e.threadMsgFromAccount,to:e.threadMsgToAccount,time:e.threadMsgTime,idServer:e.threadMsgIdServer},n={limit:e.limit<100?e.limit:100,beginTime:"number"==typeof e.beginTime?e.beginTime:0,reverse:!0===e.reverse?1:0};e.endTime&&e.endTime<=n.beginTime&&s.onParamError("endTime应该大于beginTime","msg::getThreadMsgs"),e.lastMsgId&&(n.lastMsgId=e.lastMsgId),this.sendCmd("getThreadMsgs",{msg:t,threadMsgReq:n,NOTSTORE:"msg threadMsgReq"},e.callback);},r.getMsgsByIdServer=function(e){var t=this,n=this,r="msg::getMsgsByIdServer";s.verifyCallback(e,"done",r),(!Array.isArray(e.reqMsgs)||0===e.reqMsgs.length||e.reqMsgs.length>100)&&s.onParamError("reqMsgs应该是数组且数据长度应大于0小于等于100",r),e.reqMsgs=e.reqMsgs.slice(0),e.reqMsgs.forEach(function(e,s){c.call(n,e,r,"reqMsgs["+s+"].",!0),e.scene=t.message.sceneMap[e.scene];}),this.processCallback(e),this.sendCmd("getMsgsByIdServer",{reqMsgs:e.reqMsgs},e.callback);},r.addQuickComment=function(e){s.verifyOptions(e,"msg body","msg::addQuickComment"),c.call(this,e.msg,"msg::addQuickComment");var t=new i(e,"msg::addQuickComment");t.from=this.account;var n={scene:this.message.sceneMap[e.msg.scene],from:e.msg.from,to:e.msg.to,time:e.msg.time,idServer:e.msg.idServer,idClient:e.msg.idClient};this.processCallback(e),this.sendCmd("addQuickComment",{msg:n,comment:t},e.callback);},r.deleteQuickComment=function(e){s.verifyOptions(e,"msg body","msg::deleteQuickComment"),c.call(this,e.msg,"msg::deleteQuickComment");var t=new i(e,"msg::addQuickComment");t.from=this.account;var n={scene:this.message.sceneMap[e.msg.scene],from:e.msg.from,to:e.msg.to,time:e.msg.time,idServer:e.msg.idServer,idClient:e.msg.idClient};this.processCallback(e),this.sendCmd("deleteQuickComment",{msg:n,comment:t},e.callback);},r.getQuickComments=function(e){var t=this,n="msg::getQuickComments",r=this,i={},o={};s.verifyOptions(e,"msgs","msg::getQuickComments"),(!Array.isArray(e.msgs)||0===e.msgs.length||e.msgs.length>20)&&s.onParamError("msgs应该是数组且数据长度应大于0小于等于20",n);var a=[];try{a=JSON.parse(JSON.stringify(e.msgs));}catch(e){s.onParamError("msgs 不是合法的对象",n);}a.forEach(function(e,s){c.call(r,e,n,"msgs["+s+"].",!0),e.scene=t.message.sceneMap[e.scene],i[e.idClient]=null,o[e.idClient]=s;}),this.processCallback(e),this.getLocalMsgsByIdClients({idClients:Object.keys(i),done:function done(t,n){var s=r.protocol.timetags.sync;!t&&n.msgs&&n.msgs.length&&s&&(n.msgs.forEach(function(e){i[e.idClient]=e;}),a=a.filter(function(e){var t=i[e.idClient];return!t||(t.commentTimetag&&(e.timestamp=t.commentTimetag),!(t.commentTimetag>s));})),r.sendCmd("getQuickComments",{commentReq:a,idMap:i,indexMap:o},e.callback);}});},r.addCollect=function(e){s.verifyOptions(e,"type data","msg::addCollect");var t=new o(e,"msg::addCollect");this.processCallback(e),this.sendCmd("addCollect",{collect:t},e.callback);},r.deleteCollects=function(e){s.verifyOptions(e,"collectList","msg::deleteCollects"),(!Array.isArray(e.collectList)||0===e.collectList.length||e.collectList.length>100)&&s.onParamError("collectList应该是数组且数据长度应大于0小于等于100","msg::deleteCollects"),e.collectList.forEach(function(e,t){s.verifyParamType("collectList["+t+"].id",e.id,"string","msg::deleteCollects"),s.verifyParamType("collectList["+t+"].createTime",e.createTime,"number","msg::deleteCollects");}),this.processCallback(e),this.sendCmd("deleteCollects",{collectList:e.collectList},e.callback);},r.updateCollect=function(e){s.verifyOptions(e,"collect","msg::updateCollect"),s.verifyParamType("collect.id",e.collect.id,"string","msg::updateCollect"),s.verifyParamType("collect.createTime",e.collect.createTime,"number","msg::updateCollect"),this.processCallback(e),this.sendCmd("updateCollect",{collect:e.collect},e.callback);},r.getCollects=function(e){s.verifyCallback(e,"done","msg::getCollects");var t={};["type","beginTime","endTime","limit"].forEach(function(n){a(e[n])&&(s.verifyParamType(n,e[n],"number","msg::getCollects"),t[n]=e[n]);}),e.limit>100&&s.onParamError("limit不能大于100","msg::getCollects"),e.beginTime>e.endTime&&s.onParamError("beginTime不能大于endTime","msg::getCollects"),a(e.lastId)&&(s.verifyParamType("lastId",e.lastId,"string","msg::getCollects"),t.lastId=e.lastId),a(e.reverse)&&(t.reverse=!0===e.reverse),this.processCallback(e),this.sendCmd("getCollects",{collectQuery:t,NOTSTORE:"collectQuery"},e.callback);},r.addStickTopSession=function(e){s.verifyOptions(e,"id","msg::addStickTopSession");var t=e.id.split("-");s.verifyParamValid("id的前半部分",t[0],this.message.validScenes,"msg::addStickTopSession"),s.verifyParamType("id的后半部分",t[1],"string","msg::addStickTopSession"),"superTeam"===t[0]&&(t[0]="super_team");var n={id:t=t.join("|")};e.topCustom&&(s.verifyParamType("topCustom",e.topCustom,"string","msg::addStickTopSession"),n.topCustom=e.topCustom),this.processCallback(e),this.sendCmd("addStickTopSession",{stickTopSession:n},e.callback);},r.deleteStickTopSession=function(e){s.verifyOptions(e,"id","msg::deleteStickTopSession");var t=e.id.split("-");s.verifyParamValid("id的前半部分",t[0],this.message.validScenes,"msg::deleteStickTopSession"),s.verifyParamType("id的后半部分",t[1],"string","msg::deleteStickTopSession"),"superTeam"===t[0]&&(t[0]="super_team"),t=t.join("|"),this.processCallback(e),this.sendCmd("deleteStickTopSession",{stickTopSession:{id:t}},e.callback);},r.updateStickTopSession=function(e){s.verifyOptions(e,"id","msg::updateStickTopSession");var t=e.id.split("-");s.verifyParamValid("id的前半部分",t[0],this.message.validScenes,"msg::updateStickTopSession"),s.verifyParamType("id的后半部分",t[1],"string","msg::updateStickTopSession"),"superTeam"===t[0]&&(t[0]="super_team");var n={id:t=t.join("|")};e.topCustom&&(s.verifyParamType("topCustom",e.topCustom,"string","msg::updateStickTopSession"),n.topCustom=e.topCustom),this.processCallback(e),this.sendCmd("updateStickTopSession",{stickTopSession:n},e.callback);},r.getStickTopSessions=function(e){s.verifyOptions(e,"done","msg::getStickTopSessions"),this.processCallback(e);var t=this.protocol.sessionSet,n=[],r=void 0;for(var i in t){(r=this.protocol.findSession(i))&&r.isTop&&n.push(t[i]);}e.callback(null,n);},r.addMsgPin=function(e){s.verifyOptions(e,"msg","msg::addMsgPin"),c.call(this,e.msg,"msg::addMsgPin");var t={pinFrom:this.account};a(e.pinCustom)&&(s.verifyParamType("pinCustom",e.pinCustom,"string","msg::addMsgPin"),t.pinCustom=e.pinCustom);var n={scene:this.message.sceneMap[e.msg.scene],from:e.msg.from,to:e.msg.to,time:e.msg.time,idServer:e.msg.idServer,idClient:e.msg.idClient};this.processCallback(e),this.sendCmd("addMsgPin",{msg:n,pinTag:t},e.callback);},r.updateMsgPin=function(e){s.verifyOptions(e,"msg","msg::updateMsgPin"),c.call(this,e.msg,"msg::updateMsgPin");var t={pinFrom:this.account};a(e.pinCustom)&&(s.verifyParamType("pinCustom",e.pinCustom,"string","msg::updateMsgPin"),t.pinCustom=e.pinCustom);var n={scene:this.message.sceneMap[e.msg.scene],from:e.msg.from,to:e.msg.to,time:e.msg.time,idServer:e.msg.idServer,idClient:e.msg.idClient};this.processCallback(e),this.sendCmd("updateMsgPin",{msg:n,pinTag:t},e.callback);},r.deleteMsgPin=function(e){s.verifyOptions(e,"msg","msg::deleteMsgPin"),c.call(this,e.msg,"msg::deleteMsgPin");var t={pinFrom:this.account},n={scene:this.message.sceneMap[e.msg.scene],from:e.msg.from,to:e.msg.to,time:e.msg.time,idServer:e.msg.idServer,idClient:e.msg.idClient};this.processCallback(e),this.sendCmd("deleteMsgPin",{msg:n,pinTag:t},e.callback);},r.getMsgPins=function(e){var t=this;s.verifyOptions(e,"id","msg::getMsgPins");var n=this.db,r=e.id.split("-");s.verifyParamValid("id的前半部分",r[0],this.message.validScenes,"msg::getMsgPins"),s.verifyParamType("id的后半部分",r[1],"string","msg::getMsgPins"),"superTeam"===r[0]&&(r[0]="super_team");var i={sessionId:r=r.join("|"),timetag:0};if(this.processCallback(e),n.enable){var o=this.protocol.timetags.sync;n.getTimetag("pin-"+e.id).then(function(r){r>o?n.getMsgPins(e.id).then(function(t){return e.callback(null,{pins:t||[]});}).catch(function(t){return e.callback(t);}):(i.timetag=r,a.call(t));});}else a.call(this);function a(){this.sendCmd("getMsgPins",{msgPinReq:i,id:e.id,NOTSTORE:"msgPinReq"},e.callback);}};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=s.undef,o=s.notundef,a=n(22),c=n(83),u=n(69),m=n(15);r.sendG2Msg=function(e){return this.processCallback(e),e.msg=new this.message.G2Message(e),this.sendMsg(e);},r.beforeSendMsg=function(e){var t,n=this.protocol,r=e.msg;switch(r.to===this.account&&(r.fromDeviceId=a.deviceId),r.userUpdateTime=n.myInfo&&n.myInfo.updateTime,r.getScene()){case"p2p":t="sendMsg";break;case"team":t="sendTeamMsg";break;case"superTeam":t="sendSuperTeamMsg";}e.filter&&(t="sendFilterMsg",r.filter=!0),e.cmd=t;},r.afterSendMsg=function(e){var t=e.rtnMsg;if(!t||!t.ignore){var n=this.protocol.findSession(t.sessionId);e.isLocal&&n&&n.lastMsg&&t.time<n.lastMsg.time||this.protocol.onUpdateSession(c.genSessionByMsg(t));}},r.beforeForwardMsg=function(e){s.verifyOptions(e,"msg scene to","msg::beforeForwardMsg"),e.msg.scene=e.scene,e.msg.to=e.to;},r.markMsgRead=function(e){var t=this.protocol;!e||this.db.enable||t.options.autoMarkRead?this.logger.warn("api::markMsgRead: 不需要标记消息为已收到 (没有消息, 或者启用了数据库, 或者启用了自动标记已收到)"):t.markMsgRead(e,!0);},r.sendMsgReceipt=function(e){if(s.verifyOptions(e),this.processCallback(e),e.msg){s.verifyOptions(e,"msg","msg::sendMsgReceipt");var t=e.msg;s.verifyOptions(t,"target idClient time",!0,"msg.","msg::sendMsgReceipt"),this.protocol.shouldSendMsgReceipt(t)?this.sendCmd("sendMsgReceipt",{msgReceipt:{to:t.target,idClient:t.idClient,time:t.time}},e.callback):e.done();}else e.done();},r.isMsgRemoteRead=function(e){return this.protocol.isMsgRemoteRead(e);},r.deleteMsg=function(e){s.verifyOptions(e,"msg","msg::deleteMsg");var t=e.msg;if("team"!==t.scene&&"out"!==t.flow||"success"!==t.status||t.from===t.to||t.isLocal)return e.done(m.newParamError("只能删除自己发送给别人的, 并且发送成功的非本地消息",{callFunc:"msg::deleteMsg"}),e);s.verifyOptions(t,["scene","to","from","time","idClient","idServer"],!0,"msg.","msg::deleteMsg"),s.verifyParamValid("msg.scene",t.scene,this.message.validScenes,"msg::deleteMsg"),this.processPs(e),this.processCallback(e);var n={deletedIdClient:t.idClient,deletedIdServer:t.idServer,time:t.time,from:t.from,to:t.to,opeAccount:t.from},r="superTeam"===t.scene?"deleteSuperTeamMsg":"deleteMsg";n.type="deleteMsg"+t.scene[0].toUpperCase()+t.scene.slice(1);["ps","apnsText","pushPayload","env","opeAccount","attach"].forEach(function(t){e[t]&&(n[t]=e[t]);}),n=new u(n),this.sendCmd(r,{sysMsg:n,msg:t},e.callback);},r.deleteMsgSelf=function(e){s.verifyOptions(e,"msg","msg::deleteMsgSelf");var t=e.msg;if("superTeam"===t.scene)return e.done(m.newParamError("单向删除暂不支持超大群场景",{callFunc:"msg::deleteMsgSelf"}),e);s.verifyOptions(t,["scene","to","from","time","idClient","idServer"],!0,"msg.","msg::deleteMsgSelf"),s.verifyParamValid("msg.scene",t.scene,this.message.validScenes,"msg::deleteMsgSelf"),this.processCallback(e);var n={scene:"p2p"===t.scene?1:2,from:t.from,to:t.to,time:t.time,idClient:t.idClient,idServer:t.idServer,custom:e.custom};this.sendCmd("deleteMsgSelf",{deleteMsgSelfTag:n},e.callback);},r.deleteMsgSelfBatch=function(e){var t=this;if(s.verifyOptions(e,"msgs","msg::deleteMsgSelfBatch"),(!Array.isArray(e.msgs)||0===e.msgs.length||e.msgs.length>100)&&s.onParamError("msgs应该是数组且数据长度应大于0小于等于100","msg::deleteMsgSelfBatch"),e.msgs.some(function(e){return"superTeam"===e.scene;}))return e.done(m.newParamError("消息列表中存在超大群消息，单向删除暂不支持超大群场景",{callFunc:"msg::deleteMsgSelfBatch"}),e);e.msgs.forEach(function(e){s.verifyOptions(e,["scene","to","from","time","idClient","idServer"],!0,"msg.","msg::deleteMsgSelfBatch"),s.verifyParamValid("msg.scene",e.scene,t.message.validScenes,"msg::deleteMsgSelfBatch");}),this.processCallback(e);var n=e.msgs.map(function(t){return{scene:"p2p"===t.scene?1:2,from:t.from,to:t.to,time:t.time,idClient:t.idClient,idServer:t.idServer,sessionId:t.sessionId||t.scene+"-"+t.to,custom:e.custom};});this.sendCmd("deleteMsgSelfBatch",{deleteMsgSelfTags:n},e.callback);};var l={text:0,image:1,audio:2,video:3,geo:4,notification:5,file:6,tip:10,robot:11,custom:100};r.getHistoryMsgs=function(e){s.verifyOptions(e,"scene to","msg::getHistoryMsgs"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"msg::getHistoryMsgs"),void 0===e.beginTime&&(e.beginTime=0);var t,n=this.protocol.findSession(e.scene+"-"+e.to),r=n&&n.lastEmptyTime;switch(r>e.beginTime&&(e.beginTime=r),s.verifyParamType("beginTime",e.beginTime,"number","msg::getHistoryMsgs"),void 0===e.endTime&&(e.endTime=0),s.verifyParamType("endTime",e.endTime,"number","msg::getHistoryMsgs"),e.lastMsgId=e.lastMsgId&&+e.lastMsgId?e.lastMsgId:"0",void 0===e.limit&&(e.limit=100),s.verifyParamType("limit",e.limit,"number","msg::getHistoryMsgs"),s.verifyParamMax("limit",e.limit,100,"msg::getHistoryMsgs"),o(e.reverse)?s.verifyParamType("reverse",e.reverse,"boolean","msg::getHistoryMsgs"):e.reverse=!1,o(e.asc)?s.verifyParamType("asc",e.asc,"boolean","msg::getHistoryMsgs"):e.asc=!1,i(e.msgTypes)?e.msgTypes=[]:Array.isArray(e.msgTypes)?(e.msgTypes=e.msgTypes.map(function(e){return l[e];}),e.msgTypes=e.msgTypes.filter(function(e){return"number"==typeof e;})):"number"==typeof l[e.msgTypes]?e.msgTypes=[l[e.msgTypes]]:e.msgTypes=[],this.processCallback(e),e.asc&&(e.cbaop=function(e,t){e||(t.msgs=t.msgs.reverse());}),e.scene){case"p2p":t="getHistoryMsgs";break;case"team":t="getTeamHistoryMsgs";break;case"superTeam":t="getSuperTeamHistoryMsgs";}var a={scene:e.scene,to:e.to,beginTime:e.beginTime,endTime:e.endTime,lastMsgId:e.lastMsgId,limit:e.limit,reverse:e.reverse,msgTypes:e.msgTypes};this.sendCmd(t,a,e.callback);},r.searchHistoryMsgs=function(e){s.verifyOptions(e,"scene to keyword","msg::searchHistoryMsgs"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"msg::searchHistoryMsgs"),void 0===e.beginTime&&(e.beginTime=0);var t,n=this.protocol.findSession(e.scene+"-"+e.to),r=n&&n.lastEmptyTime;switch(r>e.beginTime&&(e.beginTime=r),s.verifyParamType("beginTime",e.beginTime,"number","msg::searchHistoryMsgs"),void 0===e.endTime&&(e.endTime=0),s.verifyParamType("endTime",e.endTime,"number","msg::searchHistoryMsgs"),void 0===e.limit&&(e.limit=100),s.verifyParamType("limit",e.limit,"number","msg::searchHistoryMsgs"),s.verifyParamMax("limit",e.limit,100,"msg::searchHistoryMsgs"),o(e.reverse)?s.verifyParamType("reverse",e.reverse,"boolean","msg::searchHistoryMsgs"):e.reverse=!1,o(e.asc)?s.verifyParamType("asc",e.asc,"boolean","msg::searchHistoryMsgs"):e.asc=!1,this.processCallback(e),e.asc&&(e.cbaop=function(e,t){e||(t.msgs=t.msgs.reverse());}),e.scene){case"p2p":t="searchHistoryMsgs";break;case"team":t="searchTeamHistoryMsgs";}var i=s.filterObj(e,"scene to beginTime endTime keyword limit reverse");this.sendCmd(t,i,e.callback);},r.getLocalMsgs=function(e){var t=this,n=t.db,r=null,a=[];s.verifyOptions(e);var c=!1;o(e.start)&&(c=!0,s.verifyParamType("start",e.start,"number","msg::getLocalMsgs"));var u=!1;if(o(e.end)&&(u=!0,s.verifyParamType("end",e.end,"number","msg::getLocalMsgs")),c&&u&&e.end<=e.start&&s.onParamError("参数 end 必须晚于 start"),o(e.subTypes)&&s.verifyParamType("subTypes",e.subTypes,"array","msg::getLocalMsgs"),i(e.limit)&&(e.limit=100),s.verifyParamType("limit",e.limit,"number","msg::getLocalMsgs"),s.verifyParamMin("limit",e.limit,1,"msg::getLocalMsgs"),t.processCallback(e),n.enable){var m=new Date().getTime();n.getMsgs(e).then(function(n){a=n,t.logger.info("api::getLocalMsgs: query db cost "+(new Date().getTime()-m)+" ms and the conditions is "+JSON.stringify(e)),l();},function(e){(e=e||{}).message=e.message||"msg::getLocalMsgs:db error",l();});}else l();function l(){var t=s.simpleClone(e);t.msgs=a,delete t.callback,delete t.done,e.done(r,t);}},r.getLocalMsgByIdClient=function(e){var t=this.db,n=null,r=null;function i(){e.msg=r,e.done(n,e);}s.verifyOptions(e,"idClient","msg::getLocalMsgByIdClient"),this.processCallback(e),t.enable?t.getMsgByIdClient(e.idClient).then(function(e){e&&(r=e),i();},function(e){n=e,i();}):i();},r.getLocalMsgsByIdClients=function(e){var t,n=this.db,r=[];function i(){e.msgs=r,e.done(t,e);}s.verifyOptions(e,"idClients","msg::getLocalMsgByIdClient"),s.verifyParamType("idClients",e.idClients,"array","msg::getLocalMsgByIdClient"),this.processCallback(e),n.enable?n.getMsgsByIdClients(e.idClients).then(function(e){r=e.filter(function(e){return!!e;}),i();},function(e){t=e,i();}):i();},r.updateLocalMsg=function(e){var t,n=this.db,r=null;if(s.verifyOptions(e,"idClient","msg::updateLocalMsg"),this.processCallback(e),n.enable){var i=s.filterObj(e,"idClient localCustom");n.updateMsg(i).then(function(e){r=e,o();},function(e){t=e,o();});}else o();function o(){e.msg=r,e.done(t,e);}},r.deleteLocalMsg=function(e){var t;s.verifyOptions(e,"msg","msg::deleteLocalMsg");var n=e.msg;function r(){e.done(t,e);}s.verifyOptions(n,"idClient sessionId",!0,"msg.","msg::deleteLocalMsg"),this.processCallback(e),this.protocol.deleteLocalMsg(n).then(r,function(e){t=e,r();});},r.deleteLocalMsgsBySession=function(e){var t,n=this,r=n.db;s.verifyOptions(e,"scene to","msg::deleteLocalMsgsBySession"),s.verifyParamValid("scene",e.scene,n.message.validScenes,"msg::deleteLocalMsgsBySession"),e.sessionId=e.scene+"-"+e.to,e.delLastMsg=!0===e.delLastMsg,e.isTag=!0===e.isTag;var i=new Date().getTime();function o(){e.done(t,e);}n.processCallback(e);var a={id:e.sessionId};e.delLastMsg&&(a.lastMsg=null),e.isTag&&(a.lastEmptyTime=i),r.enable?r.deleteMsgsBySessionId(e).then(function(){e.delLastMsg||e.isTag?r.updateSession(a).then(function(t){n.protocol.onUpdateSession(t),e.session=t,o();}):o();}).catch(function(e){t=e,o();}):(o(),(e.delLastMsg||e.isTag)&&n.protocol.onUpdateSession(a));},r.deleteLocalMsgs=function(e){var t,n=this,r=n.db,i=!1!==e.updateSession;function a(){e.done(t,e);}s.verifyOptions(e,"sessionId","msg::deleteLocalMsgsBySession"),o(e.start)&&s.verifyParamType("start",e.start,"number","msg::deleteLocalMsgs"),o(e.end)&&s.verifyParamType("end",e.end,"number","msg::deleteLocalMsgs"),o(e.end)&&o(e.start)&&e.end<=e.start&&s.onParamError("参数 end 必须大于 start"),n.processCallback(e),r.enable?r.deleteMsgsBySessionId(e).then(function(){a(),i&&n.protocol.checkAndUpdateLocalSessionByMsg(e.sessionId);},function(e){t=e,a();}):a();},r.deleteAllLocalMsgs=function(e){var t,n=this.db;function r(){e.done(t,e);}this.processCallback(e),n.enable&&n.deleteAllMsgs().then(function(){r();},function(e){t=e,r();});},r.saveMsgsToLocal=function(e){this.db.enable||e.done(null,[]),s.verifyOptions(e,"msgs done","msg::saveMsgsToLocal"),s.verifyParamType("msgs",e.msgs,"Array","msg::saveMsgsToLocal"),this.db.putMsg(e.msgs).then(function(t,n){n?e.done(n):e.done(null,t);});},r.clearServerHistoryMsgs=function(e){s.verifyOptions(e,"account","msg::clearServerHistoryMsgs");var t=!1!==e.delRoam;this.processCallback(e),this.sendCmd("clearServerHistoryMsgs",{clearMsgsParams:{account:e.account,delRoam:t?1:0}},e.callback);},r.clearServerHistoryMsgsWithSync=function(e){s.verifyOptions(e,"scene to","msg::clearServerHistoryMsgsWithSync");var t={type:"team"===e.scene?2:1,isDeleteRoam:1,isSyncSelf:!0===e.isSyncSelf?1:0};t[2===t.type?"toTid":"otherAccid"]=e.to,void 0!==e.ext&&(t.ext=e.ext),this.processCallback(e),this.sendCmd("clearServerHistoryMsgsWithSync",{clearMsgsParamsWithSync:t},e.callback);};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=s.undef,o=s.notundef,a=n(116);r.setCurrSession=function(e){this.resetSessionUnread(e),this.protocol.setCurrSession(e);},r.resetAllSessionUnread=function(){for(var e in this.protocol.sessionSet){this.protocol.sessionSet[e].unread>0&&this.resetSessionUnread(e);}},r.resetSessionsUnread=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n=this,r=function r(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n?t(n,e):t(null);};if(n.logger.info("resetSessionsUnread::",e),n.protocol.resetSessionsUnread(e),n.options.syncSessionUnread){if((e=e.filter(function(e){var t=n.protocol.findSession(e);if(t){if(t.lastMsg){if(t.scene&&t.to){var r=t.lastMsg.time;if(!(t&&t.ack&&t.ack>=r))return!0;n.logger.warn("api::resetSessionsUnread: session ack not needs "+e);}else n.logger.warn("api::resetSessionsUnread: session.scene|to undefined "+e);}else n.logger.warn("api::resetSessionsUnread: session.lastMsg undefined "+e);}else n.logger.warn("api::resetSessionsUnread: session undefined "+e);})).length>0){var s=e.map(function(e){var t=n.protocol.findSession(e);return{scene:"p2p"===t.scene?0:1,to:t.to,timetag:t.lastMsg.time};});n.sendCmd("markSessionAckBatch",{sessionAckTags:s},function(e){r(e||null);});}else r();}else r();},r.resetSessionUnread=function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=this,s=!1!==r.options.resetUnreadMode,i={},o=function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t?n(t,e):n(null);};if(r.logger.info("resetSessionUnread::use reset mode",s),!r.options.syncSessionUnread)return r.protocol.resetSessionUnread(e),o();s&&r.protocol.resetSessionUnread(e),i.done=function(n){n?(t.logger.error({message:n||"mark ack failed",callFunc:"resetSessionUnread"}),o(n||"mark ack failed")):(s||r.protocol.resetSessionUnread(e),o());},this.processCallback(i);var a=r.protocol.findSession(e);if(!a)return r.logger.warn("api::resetSessionUnread: session undefined "+e),o();if(!a.lastMsg)return r.logger.warn("api::resetSessionUnread: session.lastMsg undefined "+e),o();if(!a.scene||!a.to)return r.logger.warn("api::resetSessionUnread: session.scene|to undefined "+e),o();var c=a.lastMsg.time;if(a&&a.ack&&a.ack>=c)return r.logger.warn("api::resetSessionUnread: session ack not needs "+e),o();if("superTeam"===a.scene)this.sendCmd("markSuperTeamSessionAck",{to:a.to,timetag:c},i.callback);else{var u={scene:"p2p"===a.scene?0:1,to:a.to,timetag:c};r.sendCmd("markSessionAck",u,i.callback);}},r.resetCurrSession=function(){this.protocol.setCurrSession("");},r.insertLocalSession=function(e){var t,n;function r(){e.session=n,e.done(t,e);}s.verifyOptions(e,"scene to","scene::insertLocalSession"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"scene::insertLocalSession"),this.protocol.insertLocalSession(e).then(function(e){n=e,r();},function(e){t=e,r();});},r.getLocalSessions=function(e){var t,n=this,r=n.db,a=[];function c(){e.sessions=a,delete e.callback,e.done(t,e);}s.verifyOptions(e),i(e.limit)&&(e.limit=100),s.verifyParamType("limit",e.limit,"number","scene::getLocalSessions"),s.verifyParamMax("limit",e.limit,100,"scene::getLocalSessions"),o(e.reverse)?s.verifyParamType("reverse",e.reverse,"boolean","scene::getLocalSessions"):e.reverse=!1,n.processCallback(e),r.enable?r.getSessions(e).then(function(e){a=e,n.protocol.mergeSessions(a),c();},function(e){t=e,c();}):c();},r.getLocalSession=function(e){var t,n=this.db,r=null;if(s.verifyOptions(e,"sessionId","scene::getLocalSession"),s.verifyParamType("sessionId",e.sessionId,"string","scene::getLocalSession"),n.enable)return this.processCallback(e),void n.getSession(e.sessionId).then(function(e){e&&(r=e),i();},function(e){t=e,i();});function i(){e.done(t,r);}r=this.protocol.findSession(e.sessionId),i();},r.getLocalSessionsByMsgType=function(e){var t=this.db,n=e.exclude,r=[],i=a.validTypes.slice(0);if(o(n)){if("string"==typeof n)n=[n];else if(!Array.isArray(n))return void s.onParamInvalidType("exclude",["string","string array"],"","exclude::getLocalSessionsByMsgType");n=n.filter(function(e){return i.indexOf(e)>-1;}),i=i.filter(function(e){return-1===n.indexOf(e);});}this.processCallback(e),t.enable?t.getSessions().then(function(s){n&&0!==n.length?i&&0!==i.length?(s.forEach(function(e,o){var a,c,u;e.lastMsg&&n.indexOf(e.lastMsg.type)>-1&&(a=o,c=e.id,u=t.getMsgs({sessionId:c,limit:1,types:i}).then(function(e){return e&&e[0]?s[a].lastMsg=e[0]:s[a].lastMsg=null,Promise.resolve();}),r.push(u));}),Promise.all(r).then(function(t){e.done(null,{exclude:n,sessions:s});})):e.done(null,{exclude:n,sessions:s.map(function(e){e.lastMsg=null;})}):e.done(null,{exclude:n,sessions:s});}):e.done(null,{exclude:n,sessions:[]});},r.updateLocalSession=function(e){var t,n=this,r=n.db;s.verifyOptions(e,"id","scene::updateLocalSession"),n.processCallback(e);var i=s.filterObj(e,"id localCustom");function o(){n.protocol.onUpdateSession(i),e.session=i,e.done(t,e);}r.enable?r.updateSession(i).then(function(e){i=e,o();},function(e){t=e,o();}):o();},r.deleteLocalSession=function(e){var t,n=this,r=n.db;if(s.verifyOptions(e,"id","session::deleteLocalSession"),n.processCallback(e),r.enable?(e.isLogic?r.deleteSessionLogic(e.id):r.deleteSession(e.id)).then(function(){n.protocol.deleteLocalSession(e.id,e.isLogic),o();},function(e){t=e,o();}):o(),e.isDeleteRoaming){var i="string"==typeof e.id?[e.id]:e.id;i=i.map(function(e){return e.replace("-","|");}),this.sendCmd("deleteSessions",{sessions:i},function(){});}function o(){e.done(t,e);}},r.deleteSession=function(e){s.verifyOptions(e,"scene to","session::deleteSession"),this.processCallback(e),e.sessions=[{scene:e.scene,to:e.to}],this.deleteSessions(e);},r.deleteSessions=function(e){s.verifyOptions(e,"sessions","session::deleteSessions"),s.verifyParamType("sessions",e.sessions,"array","session::deleteSessions"),e.sessions.forEach(function(e,t){s.verifyOptions(e,"scene to",!0,"sessions["+t+"].","session::deleteSessions");}),this.processCallback(e),this.sendCmd("deleteSessions",{sessions:e.sessions.map(function(e){return e.scene+"|"+e.to;})},e.callback);},r.getServerSessions=function(e){o(e.minTimestamp)&&s.verifyParamType("minTimestamp",e.minTimestamp,"number","session::deleteSessions"),o(e.maxTimestamp)&&s.verifyParamType("maxTimestamp",e.maxTimestamp,"number","session::deleteSessions"),o(e.needLastMsg)&&(e.needLastMsg=!1===e.needLastMsg?0:1),o(e.limit)&&(s.verifyParamType("limit",e.limit,"number","session::deleteSessions"),s.verifyParamMax("limit",e.limit,100,"scene::getLocalSessions")),this.processCallback(e),this.sendCmd("getServerSessions",{sessionReqTag:e},e.callback);},r.getServerSession=function(e){s.verifyOptions(e,"scene to","scene::getServerSession"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"scene::getServerSession"),s.verifyParamType("to",e.to,"string","to::getServerSession");var t=e.scene+"|"+e.to;"superTeam"===e.scene&&(t="super_team|"+e.to),this.processCallback(e),this.sendCmd("getServerSession",{session:{id:t}},e.callback);},r.updateServerSession=function(e){s.verifyOptions(e,"scene to","scene::updateServerSession"),s.verifyParamValid("scene",e.scene,this.message.validScenes,"scene::updateServerSession"),s.verifyParamType("to",e.to,"string","to::updateServerSession"),o(e.extra)&&s.verifyParamType("extra",e.extra,"string","extra::updateServerSession");var t=e.scene+"|"+e.to;"superTeam"===e.scene&&(t="super_team|"+e.to),this.processCallback(e),this.sendCmd("updateServerSession",{session:{id:t,ext:e.extra||""}},e.callback);},r.deleteServerSessions=function(e){var t=this;s.verifyOptions(e,"sessions","scene::deleteServerSessions"),s.verifyParamType("sessions",e.sessions,"array","sessions::deleteServerSessions");var n=[];e.sessions.forEach(function(e){s.verifyParamValid("scene",e.scene,t.message.validScenes,"scene::deleteServerSessions"),s.verifyParamType("to",e.to,"string","to::deleteServerSessions");var r=e.scene+"|"+e.to;"superTeam"===e.scene&&(r="super_team|"+e.to),n.push({id:r});}),this.processCallback(e),this.sendCmd("deleteServerSessions",{sessions:n},e.callback);},r.updateSessionsWithMoreRoaming=function(e){if(s.verifyOptions(e,"msg","session::updateSessionsWithMoreRoaming"),s.verifyCallback(e,"done","session::updateSessionsWithMoreRoaming"),!this.db.enable)return e.done(null,"db is disable");var t={time:e.msg.time,idServer:e.msg.idServer,to:e.msg.to,from:e.msg.from};s.verifyParamType("msg.time",e.msg.time,"number","time::updateSessionsWithMoreRoaming"),s.verifyParamType("msg.idServer",e.msg.idServer,"string","idServer::updateSessionsWithMoreRoaming"),s.verifyParamType("msg.from",e.msg.from,"string","from::updateSessionsWithMoreRoaming"),s.verifyParamType("msg.to",e.msg.to,"string","to::updateSessionsWithMoreRoaming"),s.verifyParamValid("scene",e.msg.scene,this.message.validScenes,"scene::updateSessionsWithMoreRoaming");var n=t.to===this.account?t.from:t.to;t.id=e.msg.scene+"-"+n,console.log(t),this.db.updateSessionsWithMoreRoaming(t).then(function(t){e.done(null,t);}).catch(function(t){e.done(t);});},r.deleteSessionsWithMoreRoaming=function(e){if(s.verifyOptions(e,"id","session::deleteSessionsWithMoreRoaming"),s.verifyCallback(e,"done","session::deleteSessionsWithMoreRoaming"),!this.db.enable)return e.done(null,"db is disable");this.db.deleteSessionsWithMoreRoaming(e.id).then(function(t){e.done(null,t);}).catch(function(t){e.done(t);});},r.getSessionsWithMoreRoaming=function(e){if(s.verifyCallback(e,"done","session::getSessionsWithMoreRoaming"),!this.db.enable)return e.done(null,"db is disable");this.db.getSessionsWithMoreRoaming(e.id).then(function(t){e.done(null,t);}).catch(function(t){e.done(t);});};},function(e,t,n){"use strict";var r,s=n(227),i=(r=s)&&r.__esModule?r:{default:r};var o=n(12).fn,a=n(0),c=a.undef,u=n(152),m=n(112);function l(e){var t=this.db;if(!t.enable)return Promise.resolve({valid:!1});var n=t.getSuperTeam(e),r=t.getSuperTeamMembersTimetag(e);return Promise.all([n,r]).then(function(e){var t=(0,i.default)(e,2),n=t[0],r=t[1],s=n&&n.memberUpdateTime,o={timetag:r=r||0};return s&&r>=s&&(o.valid=!0),Promise.resolve(o);}).catch(function(){return Promise.resolve({timetag:0});});}o.addSuperTeamMembers=function(e){a.verifyOptions(e,"teamId accounts","superTeam::addSuperTeamMembers"),a.verifyParamType("accounts",e.accounts,"array","superTeam::addSuperTeamMembers");var t=a.deduplicate(e.accounts);this.processPs(e),this.processCallback(e);var n={teamId:e.teamId,accounts:t,ps:e.ps};this.sendCmd("addSuperTeamMembers",n,e.callback);},o.removeSuperTeamMembers=function(e){a.verifyOptions(e,"teamId accounts","team::removeSuperTeamMembers"),a.verifyParamType("accounts",e.accounts,"array","team::removeSuperTeamMembers");var t=a.deduplicate(e.accounts);this.processCallback(e);var n={teamId:e.teamId,accounts:t};this.sendCmd("removeSuperTeamMembers",n,e.callback);},o.leaveSuperTeam=function(e){a.verifyOptions(e,"teamId","superTeam::leaveSuperTeam"),this.processCallback(e);var t={teamId:e.teamId};this.sendCmd("leaveSuperTeam",t,e.callback);},o.getSuperTeam=function(e){var t,n=this,r=n.db;function s(){n.sendCmd("getSuperTeam",{teamId:e.teamId},e.callback);}a.verifyOptions(e,"teamId","team::getSuperTeam"),n.processCallback(e),e.cbaop=function(e,r){e||n.logger.info("api::getSuperTeam: cbaop "+t,r);},t=e.teamId,r.enable&&!e.sync?r.getSuperTeam(t).then(function(r){r&&r.validToCurrentUser?(n.logger.log("api::getSuperTeam: db.getSuperTeam "+t,r),e.done(null,r)):s();}).catch(function(e){s();}):s();},o.getSuperTeams=function(e){var t=this,n=t.db,r=0;function s(){t.sendCmd("getSuperTeams",{timetag:r,NOTSTORE:"timetag"},e.callback);}a.verifyOptions(e),t.processCallback(e),n.enable?n.getSuperTeamsTimetag().then(function(e){r=e,s();},s):s();},o.updateSuperTeam=function(e){a.verifyOptions(e,"teamId","superTeam::updateSuperTeam"),e.action="update",this.processCallback(e),e.team=new u(e),this.sendCmd("updateSuperTeam",{team:e.team,single:!0},e.callback);},o.updateInfoInSuperTeam=function(e){a.verifyOptions(e,"teamId","superTeam::updateInfoInSuperTeam"),this.processCallback(e),this.sendCmd("updateInfoInSuperTeam",{superTeamMember:new m(e),single:!0},e.callback);},o.getSuperTeamMembersByJoinTime=function(e){var t=this,n=(t.db,e.joinTime),r=e.reverse,s=e.limit,i=e.teamId;r=!!r,c(n)&&(n=0),c(s)&&(s=100),a.verifyOptions(e,"teamId","superTeam::getSuperTeamMembersByJoinTime"),a.verifyParamType("joinTime",n,"number","api::superTeam::getSuperTeamMembersByJoinTime"),a.verifyParamType("limit",s,"number","api::superTeam::getSuperTeamMembersByJoinTime"),t.processCallback(e),t.sendCmd("getSuperTeamMembersByJoinTime",{teamId:i,limit:s,joinTime:n,reverse:r,timetag:0,NOTSTORE:"timetag"},e.callback);},o.getAllSuperTeamMembers=function(e){var t=this,n=this.db;function r(n){n=n||0,t.sendCmd("getSuperTeamMembers",{teamId:e.teamId,timetag:n,NOTSTORE:"timetag"},e.callback);}a.verifyOptions(e,"teamId","superTeam::getAllSuperTeamMembers"),t.processCallback(e),l.bind(this)(e.teamId).then(function(s){var i=s.valid,o=s.timetag;i?(t.logger.info("getAllSuperTeamMembers from local db"),n.getSuperTeamMembers(e.teamId).then(function(t){var n={teamId:e.teamId,members:t};e.done(null,n);},function(){return r();})):r(o);});},o.applySuperTeam=function(e){a.verifyOptions(e,"teamId","team::applySuperTeam"),a.verifyOptions(e,"teamId","team::applySuperTeam"),this.processPs(e),this.processCallback(e);var t={teamId:e.teamId,ps:e.ps};this.sendCmd("applySuperTeam",t,e.callback);},o.passSuperTeamApply=function(e){a.verifyOptions(e,"idServer teamId from","team::passSuperTeamApply"),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from};this.sendCmd("passSuperTeamApply",t,e.callback);},o.rejectSuperTeamApply=function(e){a.verifyOptions(e,"idServer teamId from","team::rejectSuperTeamApply"),this.processPs(e),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from,ps:e.ps};this.sendCmd("rejectSuperTeamApply",t,e.callback);},o.acceptSuperTeamInvite=function(e){a.verifyOptions(e,"idServer teamId from","team::acceptSuperTeamInvite"),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from};this.sendCmd("acceptSuperTeamInvite",t,e.callback);},o.rejectSuperTeamInvite=function(e){a.verifyOptions(e,"idServer teamId from","team::rejectSuperTeamInvite"),this.processPs(e),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from,ps:e.ps};this.sendCmd("rejectSuperTeamInvite",t,e.callback);},o.addSuperTeamManagers=function(e){a.verifyOptions(e,"teamId accounts","team::addSuperTeamManagers"),a.verifyParamType("accounts",e.accounts,"array","team::addSuperTeamManagers"),this.processCallback(e);var t={teamId:e.teamId,accounts:e.accounts.slice(0)};this.sendCmd("addSuperTeamManagers",t,e.callback);},o.removeSuperTeamManagers=function(e){a.verifyOptions(e,"teamId accounts","team::removeSuperTeamManagers"),a.verifyParamType("accounts",e.accounts,"array","team::removeSuperTeamManagers"),this.processCallback(e);var t={teamId:e.teamId,accounts:e.accounts.slice(0)};this.sendCmd("removeSuperTeamManagers",t,e.callback);},o.updateSuperTeamMembersMute=function(e){a.verifyOptions(e,"teamId accounts mute","team::updateSuperTeamMembersMute"),a.verifyParamType("accounts",e.accounts,"array","team::updateSuperTeamMembersMute"),a.verifyArrayMax("accounts",e.accounts,10),this.processCallback(e),e.mute=e.mute?1:0,this.sendCmd("updateSuperTeamMembersMute",e);},o.updateSuperTeamMute=function(e){a.verifyOptions(e,"teamId mute","team::updateSuperTeamMute"),e.mute=e.mute?1:0,this.processCallback(e),this.sendCmd("updateSuperTeamMute",e);},o.updateNickInSuperTeam=function(e){a.verifyOptions(e,"teamId account","team::updateNickInSuperTeam"),this.processCallback(e),this.sendCmd("updateNickInSuperTeam",{superTeamMember:new m(e),single:!0},e.callback);},o.transferSuperTeam=function(e){a.verifyOptions(e,"teamId account leave","team::transferSuperTeam"),a.verifyParamType("leave",e.leave,"boolean","team::transferSuperTeam"),this.processCallback(e);var t={teamId:e.teamId,account:e.account,leave:e.leave};this.sendCmd("transferSuperTeam",t,e.callback);},o.resetSuperTeamSessionsUnread=function(e,t){var n=this,r=function r(n){n?t(n,e):t(null);};if(n.logger.info("resetSuperTeamsUnread::use reset mode",e),n.protocol.resetSessionsUnread(e),n.options.syncSessionUnread){if((e=e.filter(function(e){var t=n.protocol.findSession(e);if(t){if(t.lastMsg){if(t.scene&&t.to){var r=t.lastMsg.time;if(!(t&&t.ack&&t.ack>=r))return!0;n.logger.warn("api::resetSuperTeamsUnread: session ack not needs "+e);}else n.logger.warn("api::resetSuperTeamsUnread: session.scene|to undefined "+e);}else n.logger.warn("api::resetSuperTeamsUnread: session.lastMsg undefined "+e);}else n.logger.warn("api::resetSuperTeamsUnread: session undefined "+e);})).length>0){var s=e.map(function(e){var t=n.protocol.findSession(e);return{to:t.to,timetag:t.lastMsg.time};});n.sendCmd("markSuperTeamSessionsAck",{sessionAckTags:s},function(e){r(e||null);});}else r();}else r();},o.getSuperTeamMembersByAccounts=function(e){var t=this,n=this.db,r=e.teamId,s=e.accounts;if(a.verifyOptions(e,"teamId accounts","superTeam::getSuperTeamMembersByAccounts"),a.verifyParamType("accounts",s,"array","superTeam::getSuperTeamMembersByAccounts"),a.verifyArrayMax("accounts",s,20),s.length<=0)return a.onParamError("参数accounts不能为空数组","superTeam::getSuperTeamMembersByAccounts");function i(){var n=s.map(function(e){return r+"|"+e;});t.processCallback(e),t.sendCmd("getSuperTeamMembersByAccounts",{memberIds:n},function(e,t){return console.log("====",e,t);});}l.call(this,r).then(function(t){var o,a,c;return t.valid?(o=[],a=[],c=[],s.forEach(function(e){var t=n.getSuperTeamMemberById(r+"-"+e).then(function(e){a.push(e);}).catch(function(){c.push(e);});o.push(t);}),void Promise.all(o).then(function(){e.done(null,{accounts:s,members:a,invaldAccounts:c});})):i();}).catch(function(){return i();});},o.getMutedSuperTeamMembers=function(e){var t=this,n=e.joinTime,r=e.reverse,s=e.limit,i=e.teamId;r=!!r,c(n)&&(n=0),c(s)&&(s=100),a.verifyOptions(e,"teamId","superTeam::getSuperTeamMembersByJoinTime"),a.verifyParamType("joinTime",n,"number","api::superTeam::getSuperTeamMembersByJoinTime"),a.verifyParamType("limit",s,"number","api::superTeam::getSuperTeamMembersByJoinTime"),this.processCallback(e),t.sendCmd("getMutedSuperTeamMembers",{teamId:i,limit:s,joinTime:n,reverse:r},e.callback);};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=s.undef,o=n(85),a=n(70);r.createTeam=function(e){s.verifyOptions(e,"type name","team::createTeam"),i(e.accounts)?e.accounts=[]:s.verifyParamType("accounts",e.accounts,"array","team::createTeam"),e.action="create",this.processPs(e),this.processCallback(e),e.team=new o(e);var t={team:e.team,accounts:e.accounts.slice(0),ps:e.ps};this.sendCmd("createTeam",t,e.callback);},r.updateTeam=function(e){s.verifyOptions(e,"teamId","team::updateTeam"),e.action="update",this.processCallback(e),e.team=new o(e),this.sendCmd("updateTeam",{team:e.team,single:!0},e.callback);},r.addTeamMembers=function(e){s.verifyOptions(e,"teamId accounts","team::addTeamMembers"),s.verifyParamType("accounts",e.accounts,"array","team::addTeamMembers"),this.processPs(e),s.notexist(e.custom)&&(e.custom=""),this.processCallback(e);var t={teamId:e.teamId,accounts:e.accounts.slice(0),ps:e.ps,attach:e.custom};this.sendCmd("addTeamMembers",t,e.callback);},r.removeTeamMembers=function(e){s.verifyOptions(e,"teamId accounts","team::removeTeamMembers"),s.verifyParamType("accounts",e.accounts,"array","team::removeTeamMembers"),this.processCallback(e);var t={teamId:e.teamId,accounts:e.accounts.slice(0)};this.sendCmd("removeTeamMembers",t,e.callback);},r.acceptTeamInvite=function(e){s.verifyOptions(e,"idServer teamId from","team::acceptTeamInvite"),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from};this.sendCmd("acceptTeamInvite",t,e.callback);},r.rejectTeamInvite=function(e){s.verifyOptions(e,"idServer teamId from","team::rejectTeamInvite"),this.processPs(e),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from,ps:e.ps};this.sendCmd("rejectTeamInvite",t,e.callback);},r.applyTeam=function(e){s.verifyOptions(e,"teamId","team::applyTeam"),this.processPs(e),this.processCallback(e);var t={teamId:e.teamId,ps:e.ps};this.sendCmd("applyTeam",t,e.callback);},r.passTeamApply=function(e){s.verifyOptions(e,"idServer teamId from","team::passTeamApply"),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from};this.sendCmd("passTeamApply",t,e.callback);},r.rejectTeamApply=function(e){s.verifyOptions(e,"idServer teamId from","team::rejectTeamApply"),this.processPs(e),this.processCallback(e);var t={idServer:e.idServer,teamId:e.teamId,from:e.from,ps:e.ps};this.sendCmd("rejectTeamApply",t,e.callback);},r.addTeamManagers=function(e){s.verifyOptions(e,"teamId accounts","team::addTeamManagers"),s.verifyParamType("accounts",e.accounts,"array","team::addTeamManagers"),this.processCallback(e);var t={teamId:e.teamId,accounts:e.accounts.slice(0)};this.sendCmd("addTeamManagers",t,e.callback);},r.removeTeamManagers=function(e){s.verifyOptions(e,"teamId accounts","team::removeTeamManagers"),s.verifyParamType("accounts",e.accounts,"array","team::removeTeamManagers"),this.processCallback(e);var t={teamId:e.teamId,accounts:e.accounts.slice(0)};this.sendCmd("removeTeamManagers",t,e.callback);},r.updateInfoInTeam=function(e){s.verifyOptions(e,"teamId","team::updateInfoInTeam"),this.processCallback(e),this.sendCmd("updateInfoInTeam",{teamMember:new a(e),single:!0},e.callback);},r.updateNickInTeam=function(e){s.verifyOptions(e,"teamId account","team::updateNickInTeam"),this.processCallback(e),this.sendCmd("updateNickInTeam",{teamMember:new a(e),single:!0},e.callback);},r.updateMuteStateInTeam=function(e){s.verifyOptions(e,"teamId account mute","team::updateMuteStateInTeam"),this.processCallback(e),e.mute=e.mute?1:0,this.sendCmd("updateMuteStateInTeam",e);},r.getMutedTeamMembers=function(e){s.verifyOptions(e,"teamId","team::getMutedTeamMembers"),this.processCallback(e),this.sendCmd("getMutedTeamMembers",e);},r.leaveTeam=function(e){s.verifyOptions(e,"teamId","team::leaveTeam"),this.processCallback(e);var t={teamId:e.teamId};this.sendCmd("leaveTeam",t,e.callback);},r.transferTeam=function(e){s.verifyOptions(e,"teamId account leave","team::transferTeam"),s.verifyParamType("leave",e.leave,"boolean","team::transferTeam"),this.processCallback(e);var t={teamId:e.teamId,account:e.account,leave:e.leave};this.sendCmd("transferTeam",t,e.callback);},r.dismissTeam=function(e){s.verifyOptions(e,"teamId","team::dismissTeam"),this.processCallback(e);var t={teamId:e.teamId};this.sendCmd("dismissTeam",t,e.callback);},r.getTeam=function(e){var t,n=this,r=n.db;function i(){n.sendCmd("getTeam",{teamId:e.teamId},e.callback);}s.verifyOptions(e,"teamId","team::getTeam"),n.processCallback(e),e.cbaop=function(e,r){e||n.logger.info("api::getTeam: cbaop "+t,r);},t=e.teamId,r.enable&&!e.sync?r.getTeam(t).then(function(r){r&&r.validToCurrentUser?(n.logger.log("api::getTeam: db.getTeam "+t),e.done(null,r)):i();},i):i();},r.getTeams=function(e){var t=this,n=t.db,r=0;function i(){t.sendCmd("getTeams",{timetag:r,NOTSTORE:"timetag"},e.callback);}s.verifyOptions(e),t.processCallback(e),n.enable?n.getTeamsTimetag().then(function(e){r=e,i();},i):i();},r.getTeamsById=function(e){s.verifyOptions(e,"teamIds","teams::getTeamsById"),this.processCallback(e),this.sendCmd("getTeamsById",{teamIds:e.teamIds},e.callback);},r.getTeamMembers=function(e){var t=this,n=0;s.verifyOptions(e,"teamId","team::getTeamMembers"),t.processCallback(e),t.sendCmd("getTeamMembers",{teamId:e.teamId,timetag:n,NOTSTORE:"timetag"},e.callback);},r.getTeamMemberByTeamIdAndAccount=function(e){var t=this,n=0;s.verifyParamType("teamId",e.teamId,"numeric or numeric string","team::getTeamMemberByTeamIdAndAccount"),s.verifyOptions(e,"account","team::getTeamMemberByTeamIdAndAccount"),t.processCallback(e),t.sendCmd("getTeamMembers",{teamId:e.teamId,timetag:n,NOTSTORE:"timetag"},function(t,n,r){var s={};if(n&&n.members&&n.members.length)for(var i=0;i<n.members.length;i++){if(n.members[i].account===e.account){s[e.account]=n.members[i];break;}}e.callback(t,s,r);});},r.getTeamMemberInvitorAccid=function(e){s.verifyParamType("teamId",e.teamId,"numeric or numeric string","team::getTeamMemberInvitorAccid"),i(e.accounts)||(s.verifyParamType("accounts",e.accounts,"array","team::getTeamMemberInvitorAccid"),e.accounts.length>200&&s.onParamError("accounts 参数数组长度不能超过200","team::getTeamMemberInvitorAccid"));var t={teamId:e.teamId};e.accounts.length&&(t.accounts=e.accounts.slice(0)),this.processCallback(e),this.sendCmd("getTeamMemberInvitorAccid",t,function(t,n,r){e.callback(t,r&&r.accountsMap||{});});},r.notifyForNewTeamMsg=function(e){s.verifyOptions(e,"teamIds","team::notifyForNewTeamMsg"),this.protocol.notifyForNewTeamMsg(e.teamIds).then(function(t){e.done(t.error||null,t.map,t.miss);},function(t){e.done(t);});},r.getMyTeamMembers=function(e){s.verifyOptions(e,"teamIds","team::getMyTeamMembers");var t=this.processCallbackPromise(e);return this.sendCmd("getMyTeamMembers",e),t;},r.getLocalTeams=function(e){var t,n=this.db,r=[];function i(){e.teams=r,e.done(t,e);}s.verifyOptions(e,"teamIds","team::getLocalTeams"),s.verifyParamType("teamIds",e.teamIds,"array","team::getLocalTeams"),this.processCallback(e),n.enable?n.getTeamsByTeamIds(e.teamIds).then(function(e){r=e.filter(function(e){return!!e;}),i();},function(e){t=e,i();}):i();},r.getLocalTeamMembers=function(e){var t,n=this.db,r=[];function i(){e.members=r,e.done(t,e);}s.verifyOptions(e,"teamId accounts","team::getLocalTeamMembers"),s.verifyParamType("accounts",e.accounts,"array","team::getLocalTeamMembers"),this.processCallback(e),n.enable?n.getInvalidTeamMembers(e.teamId,e.accounts).then(function(e){r=e.filter(function(e){return!!e;}),i();},function(e){t=e,i();}):i();},r.deleteLocalTeam=function(e){var t,n=this.db;function r(){e.done(t,e);}s.verifyOptions(e,"teamId","team::deleteLocalTeam"),this.processCallback(e),n.enable?n.deleteTeam(e.teamId).then(function(){r();},function(e){t=e,r();}):r();},r.muteTeamAll=function(e){s.verifyOptions(e,"teamId mute","team::muteTeamAll"),e.mute=e.mute?1:0,this.processCallback(e),this.sendCmd("muteTeamAll",e);},r.sendTeamMsgReceipt=function(e){s.verifyOptions(e,"teamMsgReceipts","team::sendTeamMsgReceipt"),e.teamMsgReceipts.length>50?this.logger.error("team::sendTeamMsgReceipt：teamMsgReceipts length over 50"):(this.processCallback(e),this.sendCmd("sendTeamMsgReceipt",e));},r.getTeamMsgReads=function(e){s.verifyOptions(e,"teamMsgReceipts","team::getTeamMsgReads"),this.processCallback(e),this.sendCmd("getTeamMsgReads",e);},r.getTeamMsgReadAccounts=function(e){var t=this,n=this;s.verifyOptions(e,"teamMsgReceipt","team::getTeamMsgReadAccounts");var r=void 0;e.callback=function(t,n,s){t&&r?(n=n||{teamMsgReceipt:e.teamMsgReceipt},e.done(t,n,{teamMsgReceipt:e.teamMsgReceipt,unreadAccounts:r.unreadAccounts,readAccounts:r.readAccounts})):e.done(t,n,s);},this.db.enable&&e.teamMsgReceipt.idClient?this.db.getMsgReadDetail(e.teamMsgReceipt.idClient).then(function(t){if(r=t,!t)return Promise.reject("no record");if(t.unreadAccounts&&t.unreadAccounts.length>0)return Promise.reject("unreadAccounts.length > 0");var s={teamMsgReceipt:e.teamMsgReceipt,unreadAccounts:t.unreadAccounts,readAccounts:t.readAccounts};n.logger.info("getTeamMsgReadAccounts from db"),e.done(null,{teamMsgReceipt:e.teamMsgReceipt},s);}).catch(function(r){t.logger.warn("db.getMsgReadDetail invalid",r),n.sendCmd("getTeamMsgReadAccounts",e);}):n.sendCmd("getTeamMsgReadAccounts",e);};},function(e,t,n){"use strict";n(12).fn.getRobots=function(e){(e=e||{}).type="getRobots",this.processCallback(e),this.sendCmd("sync",{sync:{robots:0}},e.callback);};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=s.notundef,o=n(236);r.friendRequest=function(e){s.verifyOptions(e,"type account","friend::friendRequest"),s.verifyParamValid("type",e.type,o.validTypes(),"friend::friendRequest"),this.processPs(e),this.processCallback(e);var t={account:e.account,type:o.getByteFromType(e.type),ps:e.ps};i(e.idServer)&&(t.idServer=e.idServer),this.sendCmd("friendRequest",t,e.callback);},r.addFriend=function(e){e.type="addFriend",this.friendRequest(e);},r.applyFriend=function(e){e.type="applyFriend",this.friendRequest(e);},r.passFriendApply=function(e){s.verifyOptions(e,"idServer","friend::passFriendApply"),e.type="passFriendApply",this.friendRequest(e);},r.rejectFriendApply=function(e){s.verifyOptions(e,"idServer","friend::rejectFriendApply"),e.type="rejectFriendApply",this.friendRequest(e);},r.deleteFriend=function(e){s.verifyOptions(e,"account","friend::deleteFriend");var t=!0===e.delAlias;this.processCallback(e),this.sendCmd("deleteFriend",{account:e.account,delFriendParams:{delAlias:t?1:0}},e.callback);},r.updateFriend=function(e){this.processCallback(e);var t=new o(e);this.sendCmd("updateFriend",{friend:t,single:!0},e.callback);},r.getFriends=function(e){var t=this,n=t.db,r=0;function i(){t.sendCmd("getFriends",{timetag:r,NOTSTORE:"timetag"},e.callback);}s.verifyOptions(e),t.processCallback(e),n.enable?n.getFriendsTimetag().then(function(e){r=e,i();},i):i();};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0),i=s.objs2accounts,o=n(110);r.updateMyInfo=function(e){s.verifyOptions(e),this.processCallback(e),e.user=new o(e),delete e.user.account,this.sendCmd("updateMyInfo",{user:e.user,single:!0},e.callback);},r.getMyInfo=function(e){return(e=e||{}).account=this.account,this.getUser(e);},r.getUser=function(e){var t,n=this,r=n.db;function i(){n.sendCmd("getUsers",{accounts:[t],single:!0},e.callback);}s.verifyOptions(e,"account","user::getUser"),n.processCallback(e),e.cbaop=function(e,r){if(!e)return r=r[0]||null,n.logger.info("api::getUser: cbaop "+t,r),r;},t=e.account,e.sync?i():r.enable?r.getUser(t).then(function(r){r?(n.logger.log("api::getUser: db.getUser "+t,r),e.done(null,r)):i();},i):i();},r.getUsers=function(e){var t,n=this,r=n.db,o=[];function a(){n.sendCmd("getUsers",{accounts:t,single:!0},e.callback);}s.verifyOptions(e,"accounts","user::getUsers"),s.verifyParamType("accounts",e.accounts,"array","user::getUsers"),n.processCallback(e),e.cbaop=function(e,r){if(!e)return r=r.concat(o),n.logger.info("api::getUsers: cbaop "+t),r;},t=s.deduplicate(e.accounts),s.verifyArrayMax("accounts",e.accounts,150,"user::getUsers"),e.sync?a():r.enable?r.getUsers(t).then(function(r){if(r&&r.length===t.length)n.logger.log("api::getUsers: db.getUsers",t),e.done(null,r);else{o=r;var s=i(r),c=[];t.forEach(function(e){-1===s.indexOf(e)&&c.push(e);}),t=c,a();}},a):a();};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0);r.markInBlacklist=function(e){s.verifyOptions(e,"account isAdd","relation::markInBlacklist"),s.verifyParamType("isAdd",e.isAdd,"boolean","relation::markInBlacklist"),this.processCallback(e),this.sendCmd("markInBlacklist",{account:e.account,isAdd:e.isAdd},e.callback);},r.addToBlacklist=function(e){return e.isAdd=!0,this.markInBlacklist(e);},r.removeFromBlacklist=function(e){return e.isAdd=!1,this.markInBlacklist(e);},r.markInMutelist=function(e){s.verifyOptions(e,"account","relation::markInMutelist"),s.verifyParamType("isAdd",e.isAdd,"boolean","relation::markInMutelist"),this.processCallback(e),this.sendCmd("markInMutelist",{account:e.account,isAdd:e.isAdd},e.callback);},r.addToMutelist=function(e){return e.isAdd=!0,this.markInMutelist(e);},r.removeFromMutelist=function(e){return e.isAdd=!1,this.markInMutelist(e);},r.getRelations=function(e){var t=this,n=t.db,r=0;function i(){t.sendCmd("getRelations",{timetag:r,NOTSTORE:"timetag"},e.callback);}e=s.verifyOptions(e),t.processCallback(e),n.enable?n.getRelationsTimetag().then(function(e){r=e,i();},i):i();};},function(e,t,n){"use strict";var r=n(12).fn,s=n(0);r.kick=function(e){s.verifyOptions(e,"deviceIds","link::kick"),this.processCallback(e),this.sendCmd("kick",{deviceIds:e.deviceIds.slice(0)},e.callback);};},function(e,t,n){"use strict";var r=a(n(6)),s=a(n(111)),i=a(n(233)),o=a(n(232));function a(e){return e&&e.__esModule?e:{default:e};}var c=n(12).fn,u=n(0),m=u.isArray,l=n(70);c.mergeObjArray=function(e,t,n){return e||(e=[]),t?(m(t)||(t=[t]),t.length?(n=n||{},u.mergeObjArray(e,t,n)):e):e;},c.cutObjArray=function(e,t,n){return e&&t?(m(t)||(t=[t]),t.length?(n=n||{},u.cutObjArray(e,t,n)):e):e;},c.mergeLoginPorts=function(e,t){return this.mergeObjArray(e,t,{keyPath:"deviceId"});},c.cutLoginPorts=function(e,t){return this.cutObjArray(e,t,{keyPath:"deviceId",sortPath:"type"});},c.mergeRelations=function(e,t){return this.mergeObjArray(e,t,{keyPath:"account"});},c.cutRelations=function(e,t){return this.cutObjArray(e,t,{keyPath:"account"});},c.findRelation=function(e,t){return u.findObjInArray(e,{keyPath:"account",value:t});},c.mergeFriends=function(e,t){return this.mergeObjArray(e,t,{keyPath:"account"});},c.cutFriends=function(e,t){return this.cutObjArray(e,t,{keyPath:"account"});},c.cutFriendsByAccounts=function(e,t){m(t)||(t=[t]);var n=t.map(function(e){return{account:e};});return this.cutFriends(e,n);},c.findFriend=function(e,t){return u.findObjInArray(e,{keyPath:"account",value:t});},c.mergeUsers=function(e,t){return this.mergeObjArray(e,t,{keyPath:"account"});},c.findUser=function(e,t){return u.findObjInArray(e,{keyPath:"account",value:t});},c.mergeTeams=function(e,t){return this.mergeObjArray(e,t,{keyPath:"teamId"});},c.cutTeams=function(e,t){return this.cutObjArray(e,t,{keyPath:"teamId"});},c.findTeam=function(e,t){return u.findObjInArray(e,{keyPath:"teamId",value:t});},c.assembleTeamOwner=l.assembleOwner,c.assembleTeamMembers=l.assembleMembers,c.genTeamMemberId=l.genId,c.mergeTeamMembers=function(e,t){return this.mergeObjArray(e,t);},c.cutTeamMembers=function(e,t){return this.cutObjArray(e,t);},c.cutTeamMembersByAccounts=function(e,t,n){m(n)||(n=[n]);var r=l.assembleMembers({teamId:t},n);return this.cutTeamMembers(e,r);},c.findTeamMember=function(e,t){return u.findObjInArray(e,{keyPath:"id",value:t});},c.mergeSessions=function(e,t){return this.mergeObjArray(e,t,{sortPath:"updateTime",desc:!0});},c.cutSessions=function(e,t){return this.cutObjArray(e,t);},c.cutSessionsByIds=function(e,t){m(t)||(t=[t]);var n=t.map(function(e){return{id:e};});return this.cutSessions(e,n);},c.findSession=function(e,t){return u.findObjInArray(e,{keyPath:"id",value:t});},c.mergeMsgs=function(e,t){return this.mergeObjArray(e,t,{keyPath:"idClient",sortPath:"time"});},c.cutMsgs=function(e,t){return this.cutObjArray(e,t,{keyPath:"idClient"});},c.cutMsgsByIdClients=function(e,t){m(t)||(t=[t]);var n=t.map(function(e){return{idClient:e};});return this.cutMsgs(e,n);},c.findMsg=function(e,t){return u.findObjInArray(e,{keyPath:"idClient",value:t});},c.mergeSysMsgs=function(e,t){return this.mergeObjArray(e,t,{keyPath:"idServer",desc:!0});},c.cutSysMsgs=function(e,t){return this.cutObjArray(e,t,{keyPath:"idServer"});},c.cutSysMsgsByIdServers=function(e,t){m(t)||(t=[t]);var n=t.map(function(e){return{idServer:e};});return this.cutSysMsgs(e,n);},c.findSysMsg=function(e,t){return u.findObjInArray(e,{keyPath:"idServer",value:t});},c.searchLocal=function(e){var t,n,a,c=(t=(0,o.default)(i.default.mark(function e(t,n){var r;return i.default.wrap(function(e){for(;;){switch(e.prev=e.next){case 0:return r=n?[p.getSessions(),l(),p.getTeams(),p.getSuperTeams()]:[p.getSessions()],e.abrupt("return",Promise.all(r).then(function(e){var r=e[0]||[],s={p2p:e[1]||[],team:e[2]||[],superTeam:e[3]||[]},i={};return n&&(Object.keys(s).forEach(function(e){s[e].forEach(function(t){var n=t.teamId||t.account;i[e+"-"+n]=t;});}),r.forEach(function(e){e.target=i[e.id];})),T(t,r);}));case 2:case"end":return e.stop();}}},e,this);})),function(e,n){return t.apply(this,arguments);}),m=(n=(0,o.default)(i.default.mark(function e(t){var n;return i.default.wrap(function(e){for(;;){switch(e.prev=e.next){case 0:return e.next=2,l();case 2:return n=e.sent,e.abrupt("return",T(t,n));case 4:case"end":return e.stop();}}},e,this);})),function(e){return n.apply(this,arguments);}),l=(a=(0,o.default)(i.default.mark(function e(){var t,n;return i.default.wrap(function(e){for(;;){switch(e.prev=e.next){case 0:if(!b){e.next=2;break;}return e.abrupt("return",b);case 2:return e.next=4,d.db.getFriends();case 4:if(e.t0=e.sent,e.t0){e.next=7;break;}e.t0=[];case 7:return t=e.t0,n=d.protocol.userSet||{},b=t.map(function(e){return(0,s.default)({},e,n[e.account]);}),e.abrupt("return",b);case 11:case"end":return e.stop();}}},e,this);})),function(){return a.apply(this,arguments);});if(u.verifyOptions(e,"keyword","searchLocal"),this.db.enable){var d=this,p=this.db,f=e.keyword+"",g=["account","nick","alias"],h=["id","scene","lastMsg.type","lastMsg.text","localCustom","target.account","target.nick","target.alias","target.name"],y="",v=e.keyPath,b=void 0;switch(v?(y=(v=(v+"").split(".")).shift(),v=v.join(".")):y="all",y){case"user":v&&(g=g.filter(function(e){return e===v||0===e.indexOf(v+".");})),m(g).then(function(t){e.done(null,{sessions:[],users:t});});break;case"session":v&&(h=h.filter(function(e){return e===v||0===e.indexOf(v+".");})),c(h,!v||v.indexOf("target")>-1).then(function(t){e.done(null,{sessions:t,users:[]});});break;case"all":l().then(function(){Promise.all([c(h,!0),m(g)]).then(function(t){e.done(null,{sessions:t[0],users:t[1]});});});break;default:e.done(null,{sessions:[],users:[],msg:'keyPath must start with "user" or "session"'});}}else e.done(null,{sessions:[],users:[],msg:"no db"});function T(e,t){var n=[];return t.forEach(function(t){for(var r=0;r<e.length;r++){var s=S(t,e[r].split("."));if(s&&s.indexOf(f)>-1){n.push(Object.assign({},t));break;}}}),n;}function S(e,t){if("object"===(void 0===e?"undefined":(0,r.default)(e))&&e)return 1===t.length?e[t[0]]:S(e[t.shift()],t);}};},function(e,t,n){"use strict";var r=n(39),s=n(0);function i(e){s.verifyOptions(e,"attach","msg::G2Message"),e.type="g2",r.call(this,e),this.attach=JSON.stringify(e.attach);}i.prototype=Object.create(r.prototype),i.reverse=function(e){var t=r.reverse(e);return e.attach&&(t.attach=JSON.parse(e.attach)),t;},e.exports=i;},function(e,t,n){"use strict";var r=n(39),s=n(0),i={welcome:"00",text:"01",link:"03"},o={"01":"text","02":"image","03":"answer",11:"template"};function a(e){s.verifyOptions(e,"content","msg::RobotMessage"),s.undef(e.robotAccid)&&(e.robotAccid=e.to);var t=e.content;switch(t.type){case"welcome":s.undef(e.body)&&(this.body="欢迎消息");break;case"text":s.verifyOptions(t,"content","msg::RobotMessage"),s.undef(e.body)&&(this.body=t.content);break;case"link":s.verifyOptions(t,"target","msg::RobotMessage");}t.type&&(t.type=i[t.type]),t={param:t,robotAccid:e.robotAccid},this.attach=JSON.stringify(t),e.type="robot",r.call(this,e);}a.prototype=Object.create(r.prototype),a.reverse=function(e){var t=r.reverse(e);if("robot"===t.type){var n=JSON.parse(e.attach);if(n.param&&(n.param.type=o[n.param.type]||"unknown"),n.robotMsg){var i=(n=s.merge(n,n.robotMsg)).message;"bot"===n.flag?n.message=i.map(function(e){return e.type=o[e.type]||"unknown",e;}):n.flag,delete n.robotMsg;}t.content=n;}return t;},e.exports=a;},function(e,t,n){"use strict";var r=n(39),s=n(0);function i(e){s.verifyOptions(e,"tip","msg::TipMessage"),e.type="tip",r.call(this,e),this.body=e.tip;}i.prototype=Object.create(r.prototype),i.reverse=function(e){var t=r.reverse(e);return t.text="",t.tip=e.body,e.attach&&(t.attach=e.attach),t;},e.exports=i;},function(e,t,n){"use strict";var r=n(39),s=n(0);function i(e){s.verifyOptions(e,"content","msg::CustomMessage"),e.type="custom",r.call(this,e),this.attach=e.content;}i.prototype=Object.create(r.prototype),i.reverse=function(e){var t=r.reverse(e);return t.content=e.attach,t;},e.exports=i;},function(e,t,n){"use strict";var r=n(0).notundef,s=n(39),i=n(62).IM,o=n(85),a=n(110),c={0:"addTeamMembers",1:"removeTeamMembers",2:"leaveTeam",3:"updateTeam",4:"dismissTeam",5:"passTeamApply",6:"transferTeam",7:"addTeamManagers",8:"removeTeamManagers",9:"acceptTeamInvite",10:"updateTeamMute",101:"netcallMiss",102:"netcallBill",103:"netcallReject",401:"addSuperTeamMembers",402:"removeSuperTeamMembers",403:"leaveSuperTeam",404:"updateSuperTeam",405:"dismissSuperTeam",406:"transferSuperTeam",407:"addSuperTeamManagers",408:"removeSuperTeamManagers",409:"updateSuperTeamMembersMute",410:"passSuperTeamApply",411:"acceptSuperTeamInvite"};function u(){}u.prototype=Object.create(s.prototype),u.reverse=function(e){var t=s.reverse(e);if(e.attach=e.attach?""+e.attach:"",e.attach){var n=JSON.parse(e.attach);if(t.attach={type:c[n.id]||n.id},r(n.data)){var u=n.data;r(u.tinfo)&&(t.attach.team=o.reverse(i.syncUnserialize(u.tinfo,"team"),!0)),r(u.ids)&&(t.attach.accounts=u.ids),r(u.id)&&(t.attach.account=u.id),r(u.uinfos)&&(t.attach.users=u.uinfos.map(function(e){return a.reverse(i.syncUnserialize(e,"user"));})),r(u.mute)&&(t.attach.mute=1==+u.mute),r(u.attach)&&(t.attach.custom=u.attach),r(u.channel)&&(t.attach.channelId=u.channel),r(u.calltype)&&(t.attach.netcallType=u.calltype),r(u.duration)&&(t.attach.duration=u.duration),r(u.time)&&(t.attach.time=u.time),r(u.from)&&(t.attach.from=u.from),r(u.ext)&&(t.attach.ext=u.ext),t.attach.accounts&&t.attach.accounts.length<=2&&t.from===t.to&&t.attach.accounts.some(function(e){if(e!==t.to)return t.to=e,!0;});}}else t.attach={};return t;},e.exports=u;},function(e,t,n){"use strict";var r=n(39),s=n(0);function i(e){e.type="geo",s.verifyOptions(e,"geo","msg::GeoMessage"),s.verifyOptions(e.geo,"lng lat title",!0,"geo.","msg::GeoMessage"),s.verifyParamType("geo.lng",e.geo.lng,"number","msg::GeoMessage"),s.verifyParamType("geo.lat",e.geo.lat,"number","msg::GeoMessage"),s.verifyParamType("geo.title",e.geo.title,"string","msg::GeoMessage"),r.call(this,e),this.attach=JSON.stringify(e.geo);}i.prototype=Object.create(r.prototype),i.reverse=function(e){var t=r.reverse(e);return e.attach=e.attach?""+e.attach:"",t.geo=e.attach?JSON.parse(e.attach):{},t;},e.exports=i;},function(e,t,n){"use strict";var r=n(109),s=n(0);function i(){}i.prototype=Object.create(r.prototype),i.verifyFile=function(e,t){s.verifyOptions(e,"dur w h",!0,"file.",t);},e.exports=i;},function(e,t,n){"use strict";var r=n(109),s=n(0);function i(){}i.prototype=Object.create(r.prototype),i.verifyFile=function(e,t){s.verifyOptions(e,"dur",!0,"file.",t);},e.exports=i;},function(e,t,n){"use strict";var r=n(0),s=n(109);function i(){}i.prototype=Object.create(s.prototype),i.verifyFile=function(e,t){r.verifyOptions(e,"w h",!0,"file.",t);},e.exports=i;},function(e,t,n){"use strict";var r=n(39),s=n(0);function i(e){s.verifyOptions(e,"text","msg::TextMessage"),e.type="text",r.call(this,e);}i.prototype=Object.create(r.prototype),i.reverse=function(e){return r.reverse(e);},e.exports=i;},function(e,t,n){"use strict";var r=n(0),s=function s(e){this.account=e.account;},i=s.prototype,o=i.Message=n(39),a=i.TextMessage=n(446),c=i.FileMessage=n(109),u=i.GeoMessage=n(442),m=i.NotificationMessage=n(441),l=i.CustomMessage=n(440),d=i.TipMessage=n(439),p=i.RobotMessage=n(438),f=i.G2Message=n(437);i.validScenes=o.validScenes,i.validTypes=o.validTypes,i.sceneMap=o.sceneMap,i.sceneReverseMap=o.sceneReverseMap,i.reverse=function(e){var t;switch(o.getType(e)){case"text":t=a.reverse(e);break;case"image":case"audio":case"video":case"file":t=c.reverse(e);break;case"geo":t=u.reverse(e);break;case"notification":t=m.reverse(e);break;case"custom":t=l.reverse(e);break;case"tip":t=d.reverse(e);break;case"g2":t=f.reverse(e);break;case"robot":t=p.reverse(e);break;default:t=o.reverse(e);}return o.setExtra(t,this.account),t;},i.reverseMsgs=function(e,t){var n,s,i=this;return e.map(function(e){return e=i.reverse(e),t&&((n=t.modifyObj)&&(e=r.merge(e,n)),s=t.mapper,r.isFunction(s)&&(e=s(e))),e;});},e.exports=s;},function(e,t,n){"use strict";var r=n(8).fn,s=n(0);r.processProxyService=function(e){var t=e.error;switch(t&&(t.callFunc="events::processProxyService",this.onCustomError("proxyService","EVENT_PROXY_SERVICE_ERROR",t)),e.cmd){case"onProxyMsg":if(s.isFunction(this.options.onProxyMsg)){var n=e.content.proxyMsg||{};n.time&&(n.time=+n.time),this.options.onProxyMsg(n);}break;case"httpProxy":e.obj=e.content&&e.content.proxyTag;}};},function(e,t,n){"use strict";var r,s=n(22),i=(r=s)&&r.__esModule?r:{default:r};var o=n(8).fn,a=n(0),c=i.default.clientTypeMap;function u(e){e=e||{};var t=a.copy(e);return t.clientType&&(t.clientType=c[t.clientType]||""),t.serverCustom&&(t.custom=JSON.parse(t.serverCustom),"string"==typeof t.custom[0]&&(t.custom=t.custom[0]),delete t.serverCustom),t;}o.processEventService=function(e){var t=e.content,n=e.error,r=this.options||{};switch(n&&(n.callFunc="events::processsEventService",this.onCustomError("事件服务解包失败","EVENT_SERVICE_ERROR",n)),e.cmd){case"pushEvent":if(a.isFunction(r.onpushevents)){var s={msgEvents:[u(t.msgEvent)]};r.onpushevents(s);}break;case"pushEvents":if(a.isFunction(r.onpushevents)){var i=t.msgEvents;i={msgEvents:i.map(function(e){return u(e);})},r.onpushevents(i);}}};},function(e,t,n){"use strict";n(8).fn.processFilter=function(e){switch(e.cmd){case"sendFilterMsg":this.onSendMsg(e,!0);break;case"filterMsg":this.onMsg(e,!0);break;case"filterSysMsg":this.onSysMsg(e,!0);break;case"sendFilterCustomSysMsg":this.onSendSysMsg(e,!0);}};},function(e,t,n){"use strict";var r=n(8).fn;r.processChatroom=function(e){switch(e.cmd){case"getChatroomAddress":this.onChatroomAddress(e);}},r.onChatroomAddress=function(e){e.error||(e.obj.address=e.content.address);};},function(e,t,n){"use strict";var r=n(8).fn;r.syncSessionAck=function(e){var t=this;if(t.syncing&&t.syncResult){t.saveAck.p2pTeam=e.content.timetag;var n={};[[e.content.p2p,"p2p"],[e.content.team.m_map,"team"]].forEach(function(e){var r=e[0],s=e[1];Object.keys(r).forEach(function(e){n[s+"-"+e]=r[e];var i={id:s+"-"+e,ack:r[e]};t.cacheSyncedSession(i);});}),t.syncResult.ackMap?t.syncResult.ackMap=Object.assign(t.syncResult.ackMap,n):t.syncResult.ackMap=n;}else t.logger.warn("sessionAck::syncSessionAck: not in syncing or no syncResult",t.syncing,!!t.syncResult);},r.syncSuperTeamSessionAck=function(e){var t=this;if(t.syncResult){t.saveAck.superTeam=e.content.timetag;var n={},r=e.content.superTeam.m_map;Object.keys(r).forEach(function(e){n["superTeam-"+e]=r[e];var s={id:"superTeam-"+e,ack:r[e]};t.cacheSyncedSession(s);}),t.syncResult.ackMap?t.syncResult.ackMap=Object.assign(t.syncResult.ackMap,n):t.syncResult.ackMap=n;}},r.onMarkSessionAck=function(e){e.error||this.storeSessionAck(e.obj);},r.syncMarkSessionAck=function(e){this.storeSessionAck(e.content,!0);},r.storeSessionAck=function(e,t){if(this.options.syncSessionUnread&&e){var n;switch(e.scene){case 0:n="p2p";break;case 1:n="team";break;case void 0:default:n="superTeam";}var r=n+"-"+e.to,s=e.timetag;if(s<=((this.findSession(r)||{}).ack||0))this.logger.warn("session::storeSessionAck: ack <= ackInMemory",s);else{var i={id:r,ack:s};this.mergeSession(i),this.logger.info("session::storeSessionAck:",i),this.markUnreadBySessionAck({sessionId:r,ack:i.ack},t);}}},r.markUnreadBySessionAck=function(e,t){var n=e.sessionId,r=e.ack,s=this,i=s.db;if(i.enable)s.pushMsgTask(function(){return i.getMsgCountAfterAck({shouldCountNotifyUnread:s.options.shouldCountNotifyUnread,sessionId:n,ack:r}).then(function(e){var o={id:n,unread:e,ack:r};return s.logger.info("session::markUnreadBySessionAck: db.getMsgCountAfterAck done",o),s.syncing?s.cacheSyncedSession(o):t&&s.onUpdateSession(o),i.updateSession(o);});});else{var o=s.findSession(n);if(o){var a=o.unreadMsgs;if(a&&a.length){for(var c=0,u=[],m=a.length-1;m>=0;m--){var l=a[m];if(!(l.time>r))break;c++,u.push(l);}o.unreadMsgs=u,o.unread=c,s.logger.info("session::markUnreadBySessionAck: unread "+c),s.syncing?s.cacheSyncedSession(o):t&&s.onUpdateSession(o);}}}};},function(e,t,n){var r=n(19),s=n(148);e.exports=n(11).getIterator=function(e){var t=s(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e));};},function(e,t,n){n(71),n(61),e.exports=n(453);},function(e,t,n){e.exports={default:n(454),__esModule:!0};},function(e,t,n){var r=n(147),s=n(9)("iterator"),i=n(37);e.exports=n(11).isIterable=function(e){var t=Object(e);return void 0!==t[s]||"@@iterator"in t||i.hasOwnProperty(r(t));};},function(e,t,n){n(71),n(61),e.exports=n(456);},function(e,t,n){e.exports={default:n(457),__esModule:!0};},function(e,t,n){"use strict";var r,s=n(227),i=(r=s)&&r.__esModule?r:{default:r};var o=n(8).fn,a=n(0),c=n(83),u=n(15),m=n(69);o.processSession=function(e){if(!e.error)switch(e.cmd){case"getServerSessions":this.onGetServerSessions(e);break;case"getServerSession":this.onGetServerSession(e);break;case"updateServerSession":this.onUpdateServerSession(e);}},o.onGetServerSessions=function(e){var t=this,n=e.content&&e.content.sessionReqTag,r=e.content&&e.content.sessionList,s=[];r.forEach(function(e){if(e.id=e.id.split("|").join("-"),0===e.id.indexOf("super_team")&&(e.id="superTeam"+e.id.slice(10)),e.updateTime=+e.updateTime,e.lastMsg){var n="1"===e.lastMsgType?"sysMsg":"msg";s.push(t.parser.unserialize(JSON.parse(e.lastMsg),n).then(function(r){e.lastMsg="msg"===n?t.message.reverse(r):m.reverse(r);}));}}),e.promise=Promise.all(s).then(function(){e.obj={sessionList:r,hasMore:"1"===n.hasMore},n.minTimestamp&&(e.obj.minTimestamp=+n.minTimestamp);});},o.onGetServerSession=function(e){var t=this,n=e.content&&e.content.session;if(n)if(n.id=n.id.split("|").join("-"),0===n.id.indexOf("super_team")&&(n.id="superTeam"+n.id.slice(10)),n.updateTime=+n.updateTime,n.lastMsg){var r=e.content.session&&"1"===e.content.session.lastMsgType?"sysMsg":"msg";e.promise=t.parser.unserialize(JSON.parse(n.lastMsg),r).then(function(s){n.lastMsg="msg"===r?t.message.reverse(s):m.reverse(s),e.obj=n;});}else e.obj=n;},o.onUpdateServerSession=function(e){e.obj={};},o.onSyncUpdateServerSession=function(e){var t=this,n=this,r=e.content&&e.content.session;r&&(r.id=r.id.split("|").join("-"),0===r.id.indexOf("super_team")&&(r.id="superTeam"+r.id.slice(10)),r.updateTime=+r.updateTime,r.lastMsg?n.parser.unserialize(JSON.parse(r.lastMsg),"msg").then(function(e){r.lastMsg=n.message.reverse(e),t.options.onSyncUpdateServerSession(a.simpleClone(r));}):this.options.onSyncUpdateServerSession(a.simpleClone(r)));},o.mergeSession=function(e){e=a.copyWithNull(e);var t=this.sessionSet,n=e.id,r=t[n]||{},s=!1;return c.isComplete(e)?delete r.isDeleted:r.isDeleted&&(s=!0),t[n]=a.merge(r,e),e=s?e:t[n],a.undef(e.unread)&&(e.unread=0),e;},o.mergeSessions=function(e){var t=this;return(e=e||[]).map(function(e){return t.mergeSession(e);});},o.deleteLocalSession=function(e,t){var n=this;a.isArray(e)||(e=[e]),t?e.forEach(function(e){n.sessionSet[e]&&(n.sessionSet[e].isDeleted=!0);}):e.forEach(function(e){return delete n.sessionSet[e];});},o.onDeleteSessions=function(e){e.obj=e.obj.sessions.map(function(e){return c.parse(e);});},o.onUpdateSession=function(e){if(e){if(e=this.mergeSession(e),e=a.simpleClone(e),c.trim(e),c.isComplete(e))return this.logger.info("session::onUpdateSession:",e.id,a.replaceLastMsg(e)),this.options.onupdatesessions?this.options.onupdatesessions([e]):this.options.onupdatesession(e),e;this.logger.warn("session::onUpdateSession::session is not complete",e);}},o.onUpdateSessions=function(e){var t=this;if(e){e=t.mergeSessions(e),(e=a.simpleClone(e)).forEach(function(e){c.trim(e);});var n=e.filter(function(e){return c.isComplete(e);}),r=e.filter(function(e){return!c.isComplete(e);});if(r&&r.length>0&&t.logger.warn("session::onUpdateSessions::sessions is not complete",r.map(function(e){return e.id;}),a.simpleClone(r)),0!==n.length)return t.logger.info("session::onUpdateSessions:",a.replaceLastMsg(n,!0)),t.options.onupdatesessions?t.options.onupdatesessions(n):n.forEach(function(e){t.options.onupdatesession(e);}),n;t.logger.warn("session::onUpdateSessions::completeSessions is empty");}},o.setCurrSession=function(e){e=""+e,this.currSessionId=e,this.logger.info("session::setCurrSession:",e);},o.findSession=function(e){var t=this.sessionSet[e];return t&&t.isDeleted?void 0:t;},o.resetSessionUnread=function(e){e=""+e;var t=this.db;if(this.findSession(e)){if(t.enable&&t.resetSessionUnread(e),!this.options.autoMarkRead&&this.sessionUnreadMsgs&&this.sessionUnreadMsgs[e]){var n=this.sessionUnreadMsgs[e];this.markMsgRead(n,!0),this.sessionUnreadMsgs[e]=[];}this.onUpdateSession({id:e,unread:0});}else this.logger.warn("session::resetSessionUnread: no session "+e);},o.resetSessionsUnread=function(e){e=e.map(function(e){return e.toString();});var t=this,n=t.db,r=e.filter(function(e){return t.findSession(e);}),s=e.filter(function(e){return!t.findSession(e);});s.length>0&&t.logger.warn("session::resetSessiosnUnread: no session "+s.join(",")),0!==r.length&&(r.forEach(function(e){if(n.enable&&n.resetSessionUnread(e),!t.options.autoMarkRead&&t.sessionUnreadMsgs&&t.sessionUnreadMsgs[e]){var r=t.sessionUnreadMsgs[e];t.markMsgRead(r,!0),t.sessionUnreadMsgs[e]=[];}}),t.onUpdateSessions(r.map(function(e){return{id:e,unread:0};})));},o.insertLocalSession=function(e){var t=this,n=t.db,r=e.scene+"-"+e.to,s=t.findSession(r);return s&&c.isComplete(s)?Promise.reject(u.sessionExist({callFunc:"session::insertLocalSession",session:s})):(n.enable?n.getMsgs({sessionId:r,limit:1}):Promise.resolve()).then(function(i){if(a.isArray(i)&&1===i.length){var o=i[0];(s=c.genSessionByMsg(o)).updateTime=o.time;}else s={id:r,scene:e.scene,to:e.to,updateTime:+e.updateTime||+new Date(),lastMsg:null};return t.onUpdateSession(s),n.enable?n.putSession(s):Promise.resolve(s);});},o.updateLocalSession=function(e,t){var n=this;return new Promise(function(r,s){var i=n.db;if(n.findSession(e.id)){var o=Promise.resolve(),c=a.filterObj(e,"id lastMsg localCustom unread");i.enable&&(o=i.updateSession(c)),o.then(function(e){return n.onUpdateSession(e,t);}).then(r,function(e){s({callFunc:"session::updateLocalSession",event:e});});}else s(u.sessionNotExist({sessionId:e.id,callFunc:"session::updateLocalSession"}));});},o.checkAndUpdateLocalSessionByMsg=function(e){var t,n=this.db,r=this,s=this.options.syncSessionUnread&&e!==this.currSessionId,o=n.getMsgs({sessionId:e,limit:1}),a=n.getSession(e).then(function(i){if(i)return t=Object.assign({},i),i.ack=i.ack||0,s?n.getMsgs({sessionId:e,start:i.ack}):Promise.resolve();r.logger.error("can't find session that sessionId = "+e);});return Promise.all([o,a]).then(function(s){var o,a,c=(0,i.default)(s,2),u=c[0],m=c[1],l={id:e};if(o=t.lastMsg?t.lastMsg.idClient:null,u&&u[0]?a=(u=u[0]).idClient:(a=null,u=null),o!==a&&(l.lastMsg=u),void 0!==m){var d=0;(m=m||[]).forEach(function(e){e.isUnreadable&&"in"===e.flow&&("notification"!==e.type||r.options.shouldCountNotifyUnread(e))&&d++;}),d!==t.unread&&(l.unread=d);}return Object.keys(l).length>1?(r.logger.info("session::checkAndUpdateLocalSessionByMsg::needUpdate newSession:",l),n.updateSession(l).then(function(e){return r.onUpdateSession(l);})):Promise.resolve(200);});},o.syncSessionsWithMoreRoaming=function(e){var t=this,n=e&&e.content&&e.content.sessions;if(n&&n.length){var r={0:"p2p",1:"team",5:"superTeam"};if(n.forEach(function(e){var n=e.to===t.options.account?e.from:e.to;e.scene=r[e.scene],e.id=e.scene+"-"+n,e.time=+e.time;}),this.db.enable){var s=this.db.putSessionsWithMoreRoaming(n);s.cmd="syncSessionsWithMoreRoaming",this.syncPromiseArray.push(s);}this.syncing&&this.syncResult?this.syncResult.sessionsWithMoreRoaming=n:this.logger.warn("syncSessionsWithMoreRoaming::not in syncing or no syncResult");}},o.syncStickTopSessions=function(e){var t=this,n=this.db,r=[],s=[],i=Promise.resolve(),o=e.content.sessions||[];this.syncing&&this.syncResult?(o.forEach(function(e){var t=e.id.split("|");"super_team"===t[0]&&(t[0]="superTeam"),e.id=t.join("-"),e.scene=t[0],e.to=t[1],e.isTop=!0,r.push(t.join("-")),delete e.createTime,delete e.updateTime,n.enable&&s.push(n.putSession(e));}),n.enable&&(i=n.updateTimetag("stickTopSessions",e.content.timetag)),i.then(function(){return n.enable?n.getStickTopSessions():[];}).then(function(i){if(e.content.modify){var o=[];i.forEach(function(e){r.indexOf(e.id)>-1||(o.push(e.id),e.isTop=!1,e.topCustom="",s.push(n.putSession(e)));});}else t.syncResult.stickTopSessions=i;return Promise.all(s);}),this.syncResult.stickTopSessions=o,i.cmd="syncStickTopSessions",this.syncPromiseArray.push(i)):this.logger.warn("syncSessionsWithMoreRoaming::not in syncing or no syncResult");};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0),i=n(69);r.splitSysMsgs=function(e,t){for(var n,r=e.length-1;r>=0;r--){n=e[r],i.isCustom(n)&&(e.splice(r,1),t.push(n));}},r.onOfflineSysMsgs=function(e,t){var n=this,r=e.content.sysMsgs.map(function(e){return e=i.reverse(e),t&&(e.filter=!0),e;});r=r.reverse(),n.markSysMsgRead(r);var s=[];n.splitSysMsgs(r,s);var o=t?"offlineFilterSysMsgs":"offlineSysMsgs",a=t?"offlineFilterCustomSysMsgs":"offlineCustomSysMsgs";if(r.length){var c=n.putSysMsg(r,"offlineSysMsgs").then(function(e){(r=e).length&&(n.logger.info("sysmsg::onOfflineSysMsgs: ",o,r.length,r),n.syncResult[o]=n.syncResult[o]||[],n.syncResult[o]=n.syncResult[o].concat(r));}).catch(function(e){return n.logger.error("sysMsg::onOfflineSysMsgs: ",e),Promise.reject(e);});c.cmd="sysMsgs",n.syncPromiseArray.push(c);}s.length&&(n.logger.info("sysmsg::onOfflineSysMsgs: ",a,s),n.syncResult[a]=n.syncResult[a]||[],n.syncResult[a]=n.syncResult[a].concat(s));},r.onSendSysMsg=function(e,t){var n=e.obj||{};n?(this.completeSysMsg(n),e.error?n.status="fail":n.status="success",n=i.reverse(n),t&&(e.obj.filter=!0),e.obj=n):this.logger.warn("onSendSysMsg::no obj");},r.completeSysMsg=function(e){return e.from=this.account,e;},r.onSysMsg=function(e,t){var n=i.reverse(e.content.sysMsg);this.markSysMsgRead(n),t&&(n.filter=!0),i.isCustom(n)?(this.logger.info("sysmsg::onSysMsg: on customSysMsg",n),this.options.oncustomsysmsg(n)):this.syncing?this.unhandledSysMsgs.push(n):this.handleSysMsg(n);},r.handleSysMsg=function(e){var t=this,n=e.type,r=e.from,s=e.serverex;t.sysMsgPromise=t.sysMsgPromise.then(function(){return t.putSysMsg(e,"onSysMsg");}).then(function(t){e=t[0];}).then(function(){if(e){var i,o=Promise.resolve();switch(n){case"addFriend":i={type:"addFriend",account:r},s&&(i.serverex=s),o=t.onFriendRequest(i);break;case"passFriendApply":i={type:"passFriendApply",account:r},o=t.onFriendRequest(i);break;case"deleteFriend":o=t.onDeleteFriend({account:r});}return i&&i.friend&&(e.friend=i.friend),o;}}).then(function(){e&&(t.logger.info("sysmsg::handleSysMsg: ",n,e),setTimeout(function(){t.options.onsysmsg(e);},0));});},r.putSysMsg=function(e,t){if(s.isArray(e)||(e=[e]),e[0].filter)return Promise.resolve(e);var n=this,r=n.db,i=r.enable,o=Promise.resolve(),a=[];return(o=(o=o.then(function(){return i?r.putSysMsg(e):e;}).then(function(t){var r=[];e.forEach(function(e){n.checkSysMsgUnique(e)&&r.push(e);}),e=r,a=i?t:e;})).then(function(){return n.getSysMsgUnread().then(function(r){return a.length||((a=e).backward=!0),n.updateSysMsgUnread(a,r,1).then(function(e){"offlineSysMsgs"===t&&(n.syncResult.sysMsgUnread=e),"onSysMsg"===t&&n.onUpdateSysMsgUnread(e);});});})).then(function(){return e;});},r.checkSysMsgUnique=s.genCheckUniqueFunc("idServer"),r.getSysMsgUnread=function(){var e=this,t=e.db;return new Promise(function(n){t.enable?t.getSysMsgUnread().then(function(e){n(e);},function(){n(e.sysMsgUnread);}):n(e.sysMsgUnread);});},r.updateSysMsgUnread=function(e,t,n){if(s.isArray(e)||(e=[e]),!e.length)return Promise.resolve(t);t=t||{};var r,o=this.db;return e.forEach(function(e){(n>0&&!e.read||n<0&&e.read)&&(r=e.type,t[r]=(t[r]||0)+n);}),t=i.completeUnread(t),this.sysMsgUnread=t,o.enable&&!e.backward?o.updateSysMsgUnread(t):Promise.resolve(t);},r.reduceSysMsgUnread=function(e){var t=this;return t.getSysMsgUnread().then(function(n){return t.updateSysMsgUnread(e,n,-1);}).then(function(e){t.onUpdateSysMsgUnread(e);});},r.onUpdateSysMsgUnread=function(e){var t=this;setTimeout(function(){t.logger.info("sysmsg::onUpdateSysMsgUnread:",e),t.options.onupdatesysmsgunread(e);},0);},r.updateSysMsg=function(e){var t=this,n=t.db;(n.enable?n.updateSysMsg(e):Promise.resolve(e)).then(function(e){t.onUpdateSysMsg(e);});},r.onUpdateSysMsg=function(e){var t=this;setTimeout(function(){s.isArray(e)||(e=[e]),e.forEach(function(e){t.logger.info("sysmsg::onUpdateSysMsg:",e),t.options.onupdatesysmsg(e);});},0);},r.processUnsettledSysMsgs=function(){var e=this;e.unhandledSysMsgs.forEach(function(t){e.handleSysMsg(t);}),e.resetUnsettledSysMsgs();};},function(e,t,n){"use strict";var r=n(25),s=n(146),i=n(229);r(r.S,"Promise",{try:function _try(e){var t=s.f(this),n=i(e);return(n.e?t.reject:t.resolve)(n.v),t.promise;}});},function(e,t,n){"use strict";var r=n(25),s=n(11),i=n(7),o=n(231),a=n(228);r(r.P+r.R,"Promise",{finally:function _finally(e){var t=o(this,s.Promise||i.Promise),n="function"==typeof e;return this.then(n?function(n){return a(t,e()).then(function(){return n;});}:e,n?function(n){return a(t,e()).then(function(){throw n;});}:e);}});},function(e,t,n){"use strict";var r=n(7),s=n(11),i=n(16),o=n(17),a=n(9)("species");e.exports=function(e){var t="function"==typeof s[e]?s[e]:r[e];o&&t&&!t[a]&&i.f(t,a,{configurable:!0,get:function get(){return this;}});};},function(e,t,n){var r=n(21);e.exports=function(e,t,n){for(var s in t){n&&e[s]?e[s]=t[s]:r(e,s,t[s]);}return e;};},function(e,t,n){var r=n(7),s=n(230).set,i=r.MutationObserver||r.WebKitMutationObserver,o=r.process,a=r.Promise,c="process"==n(48)(o);e.exports=function(){var e,t,n,u=function u(){var r,s;for(c&&(r=o.domain)&&r.exit();e;){s=e.fn,e=e.next;try{s();}catch(r){throw e?n():t=void 0,r;}}t=void 0,r&&r.enter();};if(c)n=function n(){o.nextTick(u);};else if(!i||r.navigator&&r.navigator.standalone){if(a&&a.resolve){var m=a.resolve();n=function n(){m.then(u);};}else n=function n(){s.call(r,u);};}else{var l=!0,d=document.createTextNode("");new i(u).observe(d,{characterData:!0}),n=function n(){d.data=l=!l;};}return function(r){var s={fn:r,next:void 0};t&&(t.next=s),e||(e=s,n()),t=s;};};},function(e,t){e.exports=function(e,t,n){var r=void 0===n;switch(t.length){case 0:return r?e():e.call(n);case 1:return r?e(t[0]):e.call(n,t[0]);case 2:return r?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return r?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return r?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3]);}return e.apply(n,t);};},function(e,t,n){var r=n(50),s=n(239),i=n(238),o=n(19),a=n(90),c=n(148),u={},m={};(t=e.exports=function(e,t,n,l,d){var p,f,g,h,y=d?function(){return e;}:c(e),v=r(n,l,t?2:1),b=0;if("function"!=typeof y)throw TypeError(e+" is not iterable!");if(i(y)){for(p=a(e.length);p>b;b++){if((h=t?v(o(f=e[b])[0],f[1]):v(e[b]))===u||h===m)return h;}}else for(g=y.call(e);!(f=g.next()).done;){if((h=s(g,v,f.value,t))===u||h===m)return h;}}).BREAK=u,t.RETURN=m;},function(e,t){e.exports=function(e,t,n,r){if(!(e instanceof t)||void 0!==r&&r in e)throw TypeError(n+": incorrect invocation!");return e;};},function(e,t,n){"use strict";var r,s,i,o,a=n(49),c=n(7),u=n(50),m=n(147),l=n(25),d=n(24),p=n(73),f=n(468),g=n(467),h=n(231),y=n(230).set,v=n(465)(),b=n(146),T=n(229),S=n(228),M=c.TypeError,k=c.process,_P=c.Promise,C="process"==m(k),I=function I(){},x=s=b.f,w=!!function(){try{var e=_P.resolve(1),t=(e.constructor={})[n(9)("species")]=function(e){e(I,I);};return(C||"function"==typeof PromiseRejectionEvent)&&e.then(I)instanceof t;}catch(e){}}(),_=function _(e){var t;return!(!d(e)||"function"!=typeof(t=e.then))&&t;},O=function O(e,t){if(!e._n){e._n=!0;var n=e._c;v(function(){for(var r=e._v,s=1==e._s,i=0,o=function o(t){var n,i,o,a=s?t.ok:t.fail,c=t.resolve,u=t.reject,m=t.domain;try{a?(s||(2==e._h&&j(e),e._h=1),!0===a?n=r:(m&&m.enter(),n=a(r),m&&(m.exit(),o=!0)),n===t.promise?u(M("Promise-chain cycle")):(i=_(n))?i.call(n,c,u):c(n)):u(r);}catch(e){m&&!o&&m.exit(),u(e);}};n.length>i;){o(n[i++]);}e._c=[],e._n=!1,t&&!e._h&&A(e);});}},A=function A(e){y.call(c,function(){var t,n,r,s=e._v,i=E(e);if(i&&(t=T(function(){C?k.emit("unhandledRejection",s,e):(n=c.onunhandledrejection)?n({promise:e,reason:s}):(r=c.console)&&r.error&&r.error("Unhandled promise rejection",s);}),e._h=C||E(e)?2:1),e._a=void 0,i&&t.e)throw t.v;});},E=function E(e){return 1!==e._h&&0===(e._a||e._c).length;},j=function j(e){y.call(c,function(){var t;C?k.emit("rejectionHandled",e):(t=c.onrejectionhandled)&&t({promise:e,reason:e._v});});},R=function R(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),O(t,!0));},U=function U(e){var t,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===e)throw M("Promise can't be resolved itself");(t=_(e))?v(function(){var r={_w:n,_d:!1};try{t.call(e,u(U,r,1),u(R,r,1));}catch(e){R.call(r,e);}}):(n._v=e,n._s=1,O(n,!1));}catch(e){R.call({_w:n,_d:!1},e);}}};w||(_P=function P(e){f(this,_P,"Promise","_h"),p(e),r.call(this);try{e(u(U,this,1),u(R,this,1));}catch(e){R.call(this,e);}},(r=function r(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1;}).prototype=n(464)(_P.prototype,{then:function then(e,t){var n=x(h(this,_P));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=C?k.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&O(this,!1),n.promise;},catch:function _catch(e){return this.then(void 0,e);}}),i=function i(){var e=new r();this.promise=e,this.resolve=u(U,e,1),this.reject=u(R,e,1);},b.f=x=function x(e){return e===_P||e===o?new i(e):s(e);}),l(l.G+l.W+l.F*!w,{Promise:_P}),n(47)(_P,"Promise"),n(463)("Promise"),o=n(11).Promise,l(l.S+l.F*!w,"Promise",{reject:function reject(e){var t=x(this);return(0,t.reject)(e),t.promise;}}),l(l.S+l.F*(a||!w),"Promise",{resolve:function resolve(e){return S(a&&this===o?_P:this,e);}}),l(l.S+l.F*!(w&&n(237)(function(e){_P.all(e).catch(I);})),"Promise",{all:function all(e){var t=this,n=x(t),r=n.resolve,s=n.reject,i=T(function(){var n=[],i=0,o=1;g(e,!1,function(e){var a=i++,c=!1;n.push(void 0),o++,t.resolve(e).then(function(e){c||(c=!0,n[a]=e,--o||r(n));},s);}),--o||r(n);});return i.e&&s(i.v),n.promise;},race:function race(e){var t=this,n=x(t),r=n.reject,s=T(function(){g(e,!1,function(e){t.resolve(e).then(n.resolve,r);});});return s.e&&r(s.v),n.promise;}});},function(e,t,n){n(113),n(61),n(71),n(469),n(462),n(461),e.exports=n(11).Promise;},function(e,t,n){e.exports={default:n(470),__esModule:!0};},function(e,t){!function(t){"use strict";var n,r=Object.prototype,s=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag",u="object"==typeof e,m=t.regeneratorRuntime;if(m)u&&(e.exports=m);else{(m=t.regeneratorRuntime=u?e.exports:{}).wrap=T;var l="suspendedStart",d="suspendedYield",p="executing",f="completed",g={},h={};h[o]=function(){return this;};var y=Object.getPrototypeOf,v=y&&y(y(A([])));v&&v!==r&&s.call(v,o)&&(h=v);var b=P.prototype=M.prototype=Object.create(h);k.prototype=b.constructor=P,P.constructor=k,P[c]=k.displayName="GeneratorFunction",m.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===k||"GeneratorFunction"===(t.displayName||t.name));},m.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,P):(e.__proto__=P,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(b),e;},m.awrap=function(e){return{__await:e};},C(I.prototype),I.prototype[a]=function(){return this;},m.AsyncIterator=I,m.async=function(e,t,n,r){var s=new I(T(e,t,n,r));return m.isGeneratorFunction(t)?s:s.next().then(function(e){return e.done?e.value:s.next();});},C(b),b[c]="Generator",b[o]=function(){return this;},b.toString=function(){return"[object Generator]";},m.keys=function(e){var t=[];for(var n in e){t.push(n);}return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n;}return n.done=!0,n;};},m.values=A,O.prototype={constructor:O,reset:function reset(e){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(_),!e)for(var t in this){"t"===t.charAt(0)&&s.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=n);}},stop:function stop(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval;},dispatchException:function dispatchException(e){if(this.done)throw e;var t=this;function r(r,s){return a.type="throw",a.arg=e,t.next=r,s&&(t.method="next",t.arg=n),!!s;}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],a=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=s.call(o,"catchLoc"),u=s.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc);}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc);}}}},abrupt:function abrupt(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&s.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break;}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(o);},complete:function complete(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g;},finish:function finish(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),_(n),g;}},catch:function _catch(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var s=r.arg;_(n);}return s;}}throw new Error("illegal catch attempt");},delegateYield:function delegateYield(e,t,r){return this.delegate={iterator:A(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=n),g;}};}function T(e,t,n,r){var s=t&&t.prototype instanceof M?t:M,i=Object.create(s.prototype),o=new O(r||[]);return i._invoke=function(e,t,n){var r=l;return function(s,i){if(r===p)throw new Error("Generator is already running");if(r===f){if("throw"===s)throw i;return E();}for(n.method=s,n.arg=i;;){var o=n.delegate;if(o){var a=x(o,n);if(a){if(a===g)continue;return a;}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=f,n.arg;n.dispatchException(n.arg);}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var c=S(e,t,n);if("normal"===c.type){if(r=n.done?f:d,c.arg===g)continue;return{value:c.arg,done:n.done};}"throw"===c.type&&(r=f,n.method="throw",n.arg=c.arg);}};}(e,n,o),i;}function S(e,t,n){try{return{type:"normal",arg:e.call(t,n)};}catch(e){return{type:"throw",arg:e};}}function M(){}function k(){}function P(){}function C(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e);};});}function I(e){var t;this._invoke=function(n,r){function i(){return new Promise(function(t,i){!function t(n,r,i,o){var a=S(e[n],e,r);if("throw"!==a.type){var c=a.arg,u=c.value;return u&&"object"==typeof u&&s.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,i,o);},function(e){t("throw",e,i,o);}):Promise.resolve(u).then(function(e){c.value=e,i(c);},o);}o(a.arg);}(n,r,t,i);});}return t=t?t.then(i,i):i();};}function x(e,t){var r=e.iterator[t.method];if(r===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=n,x(e,t),"throw"===t.method))return g;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method");}return g;}var s=S(r,e.iterator,t.arg);if("throw"===s.type)return t.method="throw",t.arg=s.arg,t.delegate=null,g;var i=s.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=n),t.delegate=null,g):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,g);}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t);}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t;}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0);}function A(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;){if(s.call(e,r))return t.value=e[r],t.done=!1,t;}return t.value=n,t.done=!0,t;};return i.next=i;}}return{next:E};}function E(){return{value:n,done:!0};}}(function(){return this;}()||Function("return this")());},function(e,t,n){var r=function(){return this;}()||Function("return this")(),s=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=s&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,e.exports=n(472),s)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime;}catch(e){r.regeneratorRuntime=void 0;}},function(e,t,n){"use strict";var r,s=a(n(233)),i=a(n(232)),o=(r=(0,i.default)(s.default.mark(function e(t,n){var r,i,o,a,c,u,m,l,d,p,f,g,h=this;return s.default.wrap(function(e){for(;;){switch(e.prev=e.next){case 0:if(i=(r=this).db,o=[],t.forEach(function(e){h.revokeMsgUniqueCheck(e.idClient),o.push(e.idClient);}),r.options.rollbackDelMsgUnread){e.next=14;break;}return e.next=7,i.deleteMsg(o);case 7:if(e.t0=e.sent,e.t0){e.next=10;break;}e.t0=[];case 10:return a=e.t0,a="[object Array]"===Object.prototype.toString.call(a)?a:[a],r.logger.info("msg::_deleteMsgSelfBatchInDb, rollback false, affect: "+a.length+" rows"),e.abrupt("return");case 14:return c=!1,u=r.options.cbUpdateSession||r.updateLocalSession.bind(r),m=r.findSession(n)||{id:n},l=m.lastMsg||{},o.includes(l.idClient)&&(c=!0),r.logger.info("msg::_deleteMsgSelfBatchInDb session change before:",n,c,m.unread),e.next=22,i.deleteMsg(o);case 22:if(e.t1=e.sent,e.t1){e.next=25;break;}e.t1=[];case 25:if(d=e.t1,d="[object Array]"===Object.prototype.toString.call(d)?d:[d],r.logger.info("msg::_deleteMsgSelfBatchInDb affect:",d.length," rows"),!c){e.next=34;break;}return e.next=31,i.getMsgs({sessionId:n,limit:1});case 31:p=e.sent,l=p&&p[0]?p[0]:l,m.lastMsg=l;case 34:if(f=!1,m&&m.unread&&(g=m&&m.ack||0,d.forEach(function(e){g<e.time&&"in"===e.flow&&(m.unread=m.unread-1,f=!0);})),!c&&!f){e.next=39;break;}return r.logger.info("msg::_deleteMsgSelfBatchInDb session change after:",n,m.unread),e.abrupt("return",u(m));case 39:case"end":return e.stop();}}},e,this);})),function(e,t){return r.apply(this,arguments);});function a(e){return e&&e.__esModule?e:{default:e};}var c,u=n(8).fn,m=n(69),l=n(83),d=n(0);function p(e,t){t=t||new Date().getTime();var n=this.db,r=this.findSession(e),s=!1!==this.options.rollbackClearMsgsUnread,i=[];return n.enable&&i.push(n.deleteMsgsBySessionId({sessionId:e,end:t})),s&&r&&(r=this.mergeSession({id:r.id,unread:0,lastMsg:null}),r=this.onUpdateSession(r)),n.enable&&s&&r&&i.push(n.updateSession(r)),Promise.all(i);}u.onDeleteMsg=function(e){var t=this.db;if(delete e.obj.sysMsg,!e.error){var n=e.obj.msg;e.promise=this.deleteLocalMsg(n).then(function(){if(t.enable){var e="superTeam"===n.scene?"deleteSuperTeamMsg":"deleteMsg";t.getTimetag(e).then(function(n){n=n||0,Date.now()+1>=n&&t.updateTimetag(e,Date.now()+1);});}});}},u.onMsgDeleted=function(e,t){if(!e.error){var n=this,r=n.db,s=m.reverse(e.content.sysMsg);s=n.processDeleteMsgSysMsg(s),t||n.markSysMsgRead(s),n.deleteLocalMsg(s.msg).then(function(){if(r.enable){var e=t?"deleteSuperTeamMsg":"deleteMsg";r.updateTimetag(e,s.time+1);}n.handleSysMsg(s);});}},u.processDeleteMsgSysMsg=function(e){return e.msg={},["scene","from","to"].forEach(function(t){e.msg[t]=e[t];}),e.msg.idClient=e.deletedIdClient,e.msg.idServer=e.deletedIdServer,e.msg.time=e.deletedMsgTime,e.msg.fromNick=e.deletedMsgFromNick,e.opeAccount=e.opeAccount||e.from,e.msg.opeAccount=e.opeAccount,this.message.Message.setExtra(e.msg,this.account),e;},u.onDeleteMsgOfflineRoaming=function(e){if(!e.error){var t=this,n=1==+e.content.type?"offline":"roaming",r=m.reverseSysMsgs(e.content.sysMsgs,{mapper:function mapper(e){return t.processDeleteMsgSysMsg(e);}}),s=r&&r[0]&&"superTeam"===r[0].scene;t.logger.info("msg::onDeleteMsgOfflineRoaming: on delete "+n+" "+(s?"superTeam":""),r),"offline"===n&&t.markSysMsgRead(r);var i=e.content.timetag;s?(t.timetags.deleteSuperTeamMsg=i,t.syncResult.deleteSuperTeamMsgTimetag=i):(t.timetags.deleteMsg=i,t.syncResult.deleteMsgTimetag=i);var o=t.putSysMsg(r,"offlineSysMsgs").catch(function(e){return t.logger.error("msgDelete::onDeleteMsgOfflineRoaming: ",e),Promise.reject(e);});o.cmd="deleteMsgSysMsgs "+n,t.syncPromiseArray.push(o),t.syncResult.deleteMsgSysMsgs=t.syncResult.deleteMsgSysMsgs||[],t.syncResult.deleteMsgSysMsgs.push({type:n,sysMsgs:r});}},u.deleteMsgOfflineRoaming=function(e,t){if(!e)return Promise.resolve();var n=this;n.logger.info("msg::deleteMsgOfflineRoaming: ",e,t);var r=n.db,s=[];return e.forEach(function(e){e.sysMsgs.forEach(function(e){var i=n.deleteLocalMsg(e.msg,{cbUpdateSession:function cbUpdateSession(e){e=n.mergeSession(e),e=d.simpleClone(e),l.trim(e);var s=d.findObjIndexInArray(t,{value:e.id});if(-1!==s&&(t[s]=d.merge({},t[s],e)),r.enable)return r.updateSession(e);}});s.push(i);});}),Promise.all(s).then(function(){r.enable&&(n.syncResult.deleteMsgTimetag&&r.updateTimetag("deleteMsg",n.syncResult.deleteMsgTimetag),n.syncResult.deleteSuperTeamMsgTimetag&&r.updateTimetag("deleteSuperTeamMsg",n.syncResult.deleteSuperTeamMsgTimetag));});},u.deleteMsgSelf=function(e){if(!e.error){var t=this.db,n=e.obj&&e.obj.deleteMsgSelfTag;if(n){var r=e.content&&e.content.timetag;n.scene=n.scene+""=="1"?"p2p":"team";var s=[this.deleteLocalMsg(n)];r<=this.timetags.deleteMsgSelf||(this.timetags.deleteMsgSelf=r,t.enable&&s.push(t.updateDeleteMsgSelf(r))),e.promise=Promise.all(s);}}},u.deleteMsgSelfBatch=(c=(0,i.default)(s.default.mark(function e(t){var n,r,i,a,c,u;return s.default.wrap(function(e){for(;;){switch(e.prev=e.next){case 0:if(!t.error){e.next=2;break;}return e.abrupt("return");case 2:if(n=this,r=this.db,(i=t.obj&&t.obj.deleteMsgSelfTags)&&i.length>0){e.next=7;break;}return e.abrupt("return");case 7:if(a=i.reduce(function(e,t){var n=t.sessionId;return e[n]=e[n]||[],e[n].push(t),e;},{}),r.enable){e.next=11;break;}return Object.keys(a).forEach(function(e){var t=a[e],r=n.findSession(e);if(n.options.rollbackDelMsgUnread&&r){var s=r.ack||0,i=t.filter(function(e){return s<e.time&&"in"===e.flow;});i.length>0&&r.unread&&(r.unread=r.unread?r.unread-i.length:0,n.onUpdateSession(r));}}),e.abrupt("return",Promise.resolve());case 11:c=Object.keys(a).map(function(e){var t=a[e];return o.call(n,t,e);}),(u=t.content&&t.content.timetag)<=n.timetags.deleteMsgSelf||(n.timetags.deleteMsgSelf=u,c.push(r.updateDeleteMsgSelf(u))),t.promise=Promise.all(c);case 15:case"end":return e.stop();}}},e,this);})),function(e){return c.apply(this,arguments);}),u.onDeleteMsgSelf=function(e){var t=this,n=this.db,r=e.content.deleteMsgSelfTag;r.scene=r.scene+""=="1"?"p2p":"team",t.options.onDeleteMsgSelf([r]),t.deleteLocalMsg(r).then(function(){var e=r.deletedTime;return e<=t.timetags.deleteMsgSelf||!n.enable?Promise.resolve():(t.timetags.deleteMsgSelf=e,n.updateDeleteMsgSelf(e));}).catch(function(e){t.logger.error("onDeleteMsgSelf error",e);});},u.onDeleteMsgSelfBatch=function(e){if(!e.error){var t=this,n=this.db,r=e.content&&e.content.deleteMsgSelfTags;if(r&&r.length>0){t.options.onDeleteMsgSelf(r);var s=r[0].deletedTime,i=[];r.forEach(function(e){e.scene=e.scene+""=="1"?"p2p":"team",i.push(t.deleteLocalMsg(e));}),s<=t.timetags.deleteMsgSelf||(t.timetags.deleteMsgSelf=s,n.enable&&i.push(n.updateDeleteMsgSelf(s))),Promise.all(i);}}},u.clearServerHistoryMsgs=function(e){if(!e.error){var t=this.db,n=e.obj&&e.obj.clearMsgsParamsWithSync;if(n){var r="p2p"===(n.type&&"2"===n.type.toString()?"team":"p2p")?"p2p-"+n.otherAccid:"team-"+n.toTid,s=e.content&&parseInt(e.content.timetag);s&&s>this.timetags.sessionHistoryMsgsDelete&&(this.timetags.sessionHistoryMsgsDelete=s,t.enable&&t.updateTimetag("sessionHistoryMsgsDelete",this.timetags.sessionHistoryMsgsDelete)),p.call(this,r,s);}}},u.onClearServerHistoryMsgs=function(e){if(!e.error){var t=this.db,n=e.content&&e.content.sessionHistoryMsgsDeleteTag;if(n){var r="p2p"===(n.type&&"2"===n.type.toString()?"team":"p2p")?"p2p-"+n.otherAccid:"team-"+n.toTid,s=parseInt(n.time);this.options.onClearServerHistoryMsgs&&this.options.onClearServerHistoryMsgs([{sessionId:r,time:s}]),s<=this.timetags.sessionHistoryMsgsDelete||(this.timetags.sessionHistoryMsgsDelete=s,t.enable&&t.updateTimetag("sessionHistoryMsgsDelete",this.timetags.sessionHistoryMsgsDelete)),p.call(this,r,s);}}},u.syncSessionHistoryMsgsDelete=function(e){if(!e.error){var t=this.db,n=e.content&&e.content.sessionHistoryMsgsDeleteTags;if(n&&n.length>0){var r=n.map(function(e){return{sessionId:"p2p"===(e.type&&"2"===e.type.toString()?"team":"p2p")?"p2p-"+e.otherAccid:"team-"+e.toTid,time:parseInt(e.time)};});this.options.onClearServerHistoryMsgs&&this.options.onClearServerHistoryMsgs(r),this.syncResult.clearServerHistoryMsgs=r;var s=0;r.forEach(function(e){e.time>s&&(s=e.time);}),t.enable&&t.updateTimetag("sessionHistoryMsgsDelete",s);}}},u.syncDeleteMsgSelf=function(e){var t=this,n=this.db,r=e.content.deletedMsgs;if(r&&0!==r.length){var s=[];r.forEach(function(e){e.scene="1"===e.scene?"p2p":"team",e.deletedTime=+e.deletedTime,e.time=+e.time,s.push(t.deleteLocalMsg(e));}),t.options.onDeleteMsgSelf(r),Promise.all(s).then(function(){var e=r.slice(-1)[0].deletedTime;if(!(t.timetags.deleteMsgSelf>=e))return t.timetags.deleteMsgSelf=e,n.enable?n.updateDeleteMsgSelf(e):void 0;}).catch(function(e){t.logger.error("syncDeleteMsgSelf error",e);});}},u.deleteLocalMsg=function(e,t){var n=this,r=n.db,s=(t=t||{}).cbUpdateSession||n.updateLocalSession.bind(n);if(this.revokeMsgUniqueCheck(e&&e.idClient),r.enable&&e){var i=!1,o=null,a=null,c=e.sessionId||e.scene+"-"+this.message.Message.getMsgTarget(e,this.account);return r.getMsgs({sessionId:c,limit:1}).then(function(t){t&&t[0]&&t[0].idClient===e.idClient&&(i=!0);}).then(function(){return r.getMsgByIdClient(e.idClient);}).then(function(t){return a=t,r.deleteMsg(e.idClient);}).then(function(){if(i)return r.getMsgs({sessionId:c,limit:1});}).then(function(e){i&&e&&e[0]&&(o=e[0]);}).then(function(){if(n.options.rollbackDelMsgUnread)return r.getSession(c);}).then(function(e){var t=e||{id:c};i&&(t.lastMsg=o);var r=e&&e.ack||0,u=!1;return e&&a&&r<a.time&&"in"===a.flow&&e.unread&&(n.logger.info("msgDelete::deleteLocalMsg:db.getSessions: ",e),t.unread=e.unread-1,u=!0),i||u?s(t):Promise.resolve();});}var u=n.findSession(e.sessionId);if(n.options.rollbackDelMsgUnread&&e&&e.sessionId&&u){var m=u.ack||0;u&&m<e.time&&"in"===e.flow&&u.unread&&(n.logger.info("msgDelete::deleteLocalMsg::no db: ",u),u.unread=u.unread-1,n.onUpdateSession(u));}return Promise.resolve();};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0);r.onOfflineMsgReceipts=function(e){var t,n=this,r=n.db,s=e.content.msgReceipts,i=[],o=Promise.resolve();s.forEach(function(e){t={id:"p2p-"+e.from,msgReceiptTime:+e.time},n.cacheSyncedSession(t);}),n.syncResult.msgReceipts=i,r.enable&&(o=r.updateMsgReceiptsTimetag(e.content.timetag)),o.cmd=i,n.syncPromiseArray.push(o);},r.shouldUpdateSessionFromMsgReceipt=function(e,t){return!e||!e.msgReceiptServerTime||t.time>e.msgReceiptServerTime;},r.genSessionFromMsgReceipt=function(e,t){var n=t.time,r={id:t.sessionId,msgReceiptTime:n,msgReceiptServerTime:n};return e&&e.id===t.sessionId&&(r=s.merge({},e,r)),e&&e.updateTime||(r.updateTime=n),r;},r.onMsgReceipt=function(e){var t=this,n=t.db,r=e.content.msgReceipt;r.time=+r.time;var s=r.idClient,i=Promise.resolve();n.enable&&s&&(i=n.getMsgByIdClient(s)),i.then(function(e){var n;if(e){if(!e.idServer)return void(t.msgReceiptTasks[s]=r);n=e.time;}else n=r.time;r.msgReceiptTime=n,t.updateSessionMsgReceiptTime(r);});},r.resolveMsgReceiptTask=function(e){var t=this.msgReceiptTasks[e.idClient];t&&(t.msgReceiptTime=e.time,this.updateSessionMsgReceiptTime(t));},r.updateSessionMsgReceiptTime=function(e){var t=this.db,n={id:"p2p-"+e.from,msgReceiptTime:e.msgReceiptTime,msgReceiptServerTime:e.time};this.findSession(n.id).msgReceiptTime>=n.msgReceiptTime?this.logger.warn("receive old msgReceiptTime",e):(t.enable&&t.putSession(n),this.onUpdateSession(n));},r.onSendMsgReceipt=function(e){if(!e.error){var t=e.obj.msgReceipt,n=+t.time,r=+e.content.msgReceipt.time;this.findSession("p2p-"+t.to).msgReceiptSendTime=Math.min(n,r);}},r.shouldSendMsgReceipt=function(e){if(e&&"p2p"===e.scene&&"success"===e.status){var t=this.findSession(e.sessionId);if(t){var n=t.msgReceiptSendTime;return!n||n<e.time;}}return!1;},r.isMsgRemoteRead=function(e){if(e&&"p2p"===e.scene&&"out"===e.flow&&"success"===e.status){var t=this.findSession(e.sessionId);if(t&&t.msgReceiptTime)return e.time<=t.msgReceiptTime;}return!1;};},function(e,t,n){"use strict";var r,s=n(111),i=(r=s)&&r.__esModule?r:{default:r};var o=n(8).fn,a=(n(0),n(235)),c=n(234);function u(e,t,n){var r=this,s=this.timetags&&this.timetags.sync;this.db.enable&&s&&t&&this.db.getMsgByIdClient(e).then(function(e){if(e&&(e.commentTimetag>s||e.time>s)){if(e.commentTimetag=t.time,e.comments=e.comments||[],n)e.comments=e.comments.filter(function(e){return e.body!==t.body||e.from!==t.from;});else{for(var i=void 0,o=0;o<e.comments.length;o++){if(e.comments[o].body===t.body){e.comments[o]=t,i=!0;break;}}i||e.comments.push(t);}r.db.updateMsg(e);}});}function m(e){e.scene=this.message.sceneReverseMap[+e.scene]||e.scene,e.time=+e.time;}o.processMsgExtend=function(e){switch(e.cmd){case"getThreadMsgs":this.onGetThreadMsgs(e);break;case"getMsgsByIdServer":this.onGetMsgsByIdServer(e);break;case"addQuickComment":this.changeQuickComment(e);break;case"deleteQuickComment":this.changeQuickComment(e,!0);break;case"onQuickComment":case"syncAddQuickComment":this.onQuickComment(e);break;case"onDeleteQuickComment":case"syncDeleteQuickComment":this.onQuickComment(e,!0);break;case"getQuickComments":this.getQuickComments(e);break;case"addCollect":case"updateCollect":this.addCollect(e);break;case"deleteCollects":this.deleteCollects(e);break;case"getCollects":this.getCollects(e);break;case"addStickTopSession":case"syncAddStickTopSession":this.onChangeStickTopSession(e,"add");break;case"updateStickTopSession":case"syncUpdateStickTopSession":this.onChangeStickTopSession(e,"update");break;case"deleteStickTopSession":case"syncDeleteStickTopSession":this.onChangeStickTopSession(e,"delete");break;case"addMsgPin":case"onAddMsgPin":case"syncAddMsgPin":this.pinMsgChange(e,"add");break;case"updateMsgPin":case"onUpdateMsgPin":case"syncUpdateMsgPin":this.pinMsgChange(e,"update");break;case"deleteMsgPin":case"onDeleteMsgPin":case"syncDeleteMsgPin":this.pinMsgChange(e,"delete");break;case"getMsgPins":this.getMsgPins(e);}},o.onGetThreadMsgs=function(e){if(!e.error){e.obj.msgs=this.message.reverseMsgs(e.content.msgs),e.obj.threadMsg=this.message.reverse(e.content.threadMsg);var t=e.content.threadMsgsMeta||{};e.obj.total=t.total,e.obj.timetag=t.lastMsgTime;}},o.onGetMsgsByIdServer=function(e){e.error||(e.obj.msgs=this.message.reverseMsgs(e.content.msgs));},o.changeQuickComment=function(e,t){e.error||(e.obj.comment.time=e.content.timetag,e.obj.comment=a.reverse(e.obj.comment),m.call(this,e.obj.msg),u.call(this,e.obj.msg.idClient,e.obj.comment,t));},o.onQuickComment=function(e,t){if(e.content){var n=e.content,r=n.comment,s=n.msg;r&&s&&(m.call(this,s),r=a.reverse(r),t?this.options.onDeleteQuickComment(e.content.msg,r):this.options.onQuickComment(e.content.msg,r),u.call(this,s.idClient,r,t));}},o.getQuickComments=function(e){var t=this;if(!e.error){var n=e.obj.idMap,r=e.obj.indexMap;(e.content&&e.content.commentRes||[]).forEach(function(e){var r=[],s=t.parser.unserializeMap.comment;if(1==+e.modify)try{r=JSON.parse(e.detail);}catch(e){t.logger.warn("getQuickComments parse detail error",e);}r.forEach(function(e,t){var n={};Object.keys(e).forEach(function(t){n[s[t]]=e[t];}),n=a.reverse(n),r[t]=n;}),e.timestamp=+e.timestamp,n[e.idClient]?(n[e.idClient].commentTimetag=e.timestamp,1==+e.modify&&(n[e.idClient].comments=r),t.db.enable&&t.db.updateMsg(n[e.idClient])):n[e.idClient]={idServer:e.idServer,idClient:e.idClient,comments:r,commentTimetag:e.timestamp};}),e.obj=[],Object.keys(r).forEach(function(t){e.obj[r[t]]=n[t];});}},o.addCollect=function(e){e.error||(e.obj.collect=c.reverse(e.content.collect));},o.deleteCollects=function(e){e.error||(e.obj.deleteNum=e.content.deleteNum);},o.getCollects=function(e){if(!e.error){var t=[];(e.content.collectList||[]).forEach(function(e){t.push(c.reverse(e));}),e.obj.collectList=t,e.obj.total=e.content.total;}},o.onChangeStickTopSession=function(e,t){var n=this;if(!e.error){var r=e.content.stickTopSession||e.obj.stickTopSession||{},s=e.content.timetag||+r.updateTime,i=r.id.split("|");"super_team"===i[0]&&(i[0]="superTeam"),r={id:i.join("-"),scene:i[0],to:i[1],topCustom:r.topCustom||""},"delete"===t?r.isTop=!1:"add"===t&&(r.isTop=!0),r=this.onUpdateSession(r),e.obj&&(e.obj.stickTopSession=r),this.db.enable&&(this.db.updateSession(r).then(function(e){e||n.db.putSession(r);}),this.db.updateTimetag("stickTopSessions",s));}},o.pinMsgChange=function(e,t){var n=this;if(!e.error){e.content=e.content||{};var r=this,s=this.db,o=e.obj&&e.obj.msg,a=e.content.msg||o||{},c=e.content.pinTag||e.obj.pinTag,u=e.content.timetag||+c.updateTime,l=Promise.resolve();m.call(this,a),s.enable&&(l=s.getMsgByIdClient(a.idClient)),c.createTime&&(c.createTime=+c.createTime),c.updateTime&&(c.updateTime=+c.updateTime),l.then(function(m){return a=m||a,m?a=m:a.sessionId=a.scene+"-"+n.message.Message.getMsgTarget(a,n.account),o?(e.obj.msg=a,e.obj.pinTag=c):n.options.onPinMsgChange({msg:a,pinTag:c},t),function(){if(!s.enable)return;s["delete"===t?"deleteMsgPin":"putMsgPin"]((0,i.default)({},a,{pinFrom:c.pinFrom,pinCustom:c.pinCustom})).then(function(){var e="pin-"+a.sessionId,t=r.timetags.sync;return s.getTimetag(e).then(function(n){return n>t?s.updateTimetag(e,u):Promise.resolve();});}).catch(function(e){r.logger.error("msgExtend::pinMsgChange:error",e);});}(),Promise.resolve;}).then(function(){}),e.promise=l;}},o.getMsgPins=function(e){var t=this;if(!e.error){var n=this.db,r=e.content||{};if(r.pins=r.pins||[],r.modify){var s=[];n.enable&&(n.updateTimetag("pin-"+e.obj.id,r.timetag),r.pins.forEach(function(t){t.sessionId=e.obj.id,s.push(n.getMsgByIdClient(t.idClient));})),e.promise=Promise.all(s).then(function(s){r.pins.forEach(function(n,r){s[r]?Object.assign(n,s[r]):(n.sessionId=e.obj.id,m.call(t,n));}),e.obj.pins=r.pins,n.enable&&n.deleteMsgPins(e.obj.id).then(function(){return n.putMsgPins(r.pins);}).catch(function(e){t.logger.error("msgExtend::getMsgPins:change db error",e);});});}else n.enable?(n.updateTimetag("pin-"+e.obj.id,r.timetag),e.promise=n.getMsgPins(e.obj.id).then(function(t){e.obj.pins=t||[];})):e.obj.pins=[];}};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0),i=s.undef,o=n(22),a=n(70),c=n(112),u=n(83),m=n(149),l=n(95),d=n(3),p=n(33);r.processMsg=function(e){switch(e.cmd){case"sendMsg":this.onSendMsg(e);break;case"msg":this.onMsg(e);break;case"sysMsg":this.onSysMsg(e);break;case"broadcastMsg":this.onBroadcastMsg(e);break;case"sendCustomSysMsg":this.onSendSysMsg(e);break;case"getHistoryMsgs":case"searchHistoryMsgs":this.onHistoryMsgs(e);break;case"syncSendMsg":this.onMsg(e);break;case"deleteSessions":this.onDeleteSessions(e);break;case"sendMsgReceipt":this.onSendMsgReceipt(e);break;case"msgReceipt":this.onMsgReceipt(e);break;case"onDeleteMsg":this.onDeleteMsg(e);break;case"onMsgDeleted":this.onMsgDeleted(e);break;case"onDeleteMsgOfflineRoaming":this.onDeleteMsgOfflineRoaming(e);break;case"onMarkSessionAck":this.onMarkSessionAck(e);break;case"syncMarkSessionAck":this.syncMarkSessionAck(e);break;case"syncUpdateServerSession":this.onSyncUpdateServerSession(e);break;case"deleteMsgSelf":this.deleteMsgSelf(e);break;case"deleteMsgSelfBatch":this.deleteMsgSelfBatch(e);break;case"onDeleteMsgSelf":this.onDeleteMsgSelf(e);break;case"onDeleteMsgSelfBatch":this.onDeleteMsgSelfBatch(e);break;case"clearServerHistoryMsgs":this.clearServerHistoryMsgs(e);break;case"onClearServerHistoryMsgs":this.onClearServerHistoryMsgs(e);}},r.checkIgnore=function(e){var t=this;e.forEach(function(e){e.ignore||(t.options.shouldIgnoreMsg(e)&&(e.ignore=!0),"notification"===e.type&&t.options.shouldIgnoreNotification(e)&&(e.ignore=!0));});},r.filterIgnore=function(e){return e.filter(function(e){return!e.ignore;});},r.genSessionByMsgs=function(e){return this.checkIgnore(e),u.genSessionByMsgs(this.message.Message,e);},r.onRoamingMsgs=function(e){var t=this,n=t.message,r=n.Message,s=r.getMaxTimetag,i=n.reverseMsgs(e.content.msgs),o=s(i);i=r.sortMsgs(i);var a=(i=r.deduplication(i))[0],c=a.sessionId,u=t.genSessionByMsgs(i);t.cacheSyncedSession(u);var m=t.putMsg(i,"roamingMsgs").then(function(e){i=e,(i=t.filterIgnore(i)).length&&(t.logger.info("msg::onRoamingMsgs: putRoamingMsgs",c,i.length),t.syncResult.roamingMsgs=t.syncResult.roamingMsgs||[],t.syncResult.roamingMsgs.push({sessionId:c,scene:a.scene,to:a.target,msgs:i,timetag:o}),t.syncing||t.onSyncDone());}).catch(function(e){return t.logger.error("msg::onRoamingMsgs: ",e),Promise.reject(e);});m.cmd="roamingMsgs-"+c,t.syncPromiseArray.push(m);},r.onOfflineMsgs=function(e,t){var n=this,r=n.message,s=r.Message,i=null;t&&(i={filter:!0});var o,a,c=r.reverseMsgs(e.content.msgs,{modifyObj:i}),u=[],m="",l=t?"offlineFilterMsgs":"offlineMsgs";function d(e){if(u.length){var t=s.getMaxTimetag(u),r=u[0].scene,i=u[0].target;n.markMsgRead(u),u=s.sortMsgs(u),u=s.deduplication(u);var o=n.genSessionByMsgs(u);n.cacheSyncedSession(o),(a=n.putMsg(u,"offlineMsgs").then(function(s){u=s,(u=n.filterIgnore(u)).length&&(n.logger.info("msg::onOfflineMsgs： toreLastSession",l,e,u.length,u),n.syncResult[l]=n.syncResult[l]||[],n.syncResult[l].push({sessionId:e,scene:r,to:i,msgs:u,timetag:t}));}).catch(function(e){return n.logger.error("msg::onOfflineMsgs: ",e),Promise.reject(e);})).cmd="offlineMsgs-"+e,n.syncPromiseArray.push(a);}}c.forEach(function(e){(o=e.sessionId)!==m?(d(m),(u=[]).push(e),m=o):u.push(e);}),d(m);},r.completeMsg=function(e){return e.from=this.account,e.fromNick=this.myInfo&&this.myInfo.nick,e.fromClientType="Web",e.fromDeviceId=o.deviceId,e.time||(e.time=+new Date()),e;},r.onMsgs=function(e){var t=this,n=t.message.reverseMsgs(e.content.msgs,{mapper:function mapper(e){t.handleMsg(e);}});t.pushMsgDelay(n);},r.onMsg=function(e,t){var n=this.message.reverse(e.content.msg);t&&(n.filter=!0),"syncSendMsg"!==e.cmd||n.from!==n.to?(this.pushMsgDelay([n]),this.syncing?(this.logger.info("msg::onMsg:is in syncing ..."),this.unhandledMsgs.push({type:"onMsg",msg:n})):this.handleMsg(n)):this.logger.warn("onMsg::syncSendMsg to self, so ignore",n.idClient,n.idServer);},r.onBroadcastMsgs=function(e){var t=e.content.broadcastMsgs;t=t.sort(function(e,t){return e.broadcastId-t.broadcastId;}),this.putBroadcastMsgs(t);},r.onBroadcastMsg=function(e){var t=e.content.broadcastMsg;t.time=t.timestamp,this.syncing?this.unhandledMsgs.push({type:"onBroadcastMsg",msg:t}):t&&this.putBroadcastMsg(t);},r.pushMsgTask=function(e){this.msgPromise=this.msgPromise.then(function(){return e();});},r.pushMsgDelay=function(e){if(e&&e.length>0){var t=this;if(t.msgStatEnable&&!d.isWeixinApp&&void 0!==t.relativeSeverTime){var n=e.map(function(e){return{appkey:t.options.appKey,accid:e.to,fromAccid:e.from,msgId:e.idServer,serverTime:e.time,receiveTime:Date.now()-t.relativeSeverTime,sessionId:t.sdkSession,platform:"web",sdk_ver:d.info.version,manufactor:p.name+" "+p.version};});t.msgDelayArr=t.msgDelayArr.concat(n),t.msgDelayArr.length>5&&t.doReportMsgDelay();}}},r.doReportMsgDelay=function(){var e=JSON.stringify(this.msgDelayArr);this.msgDelayArr&&this.msgDelayArr.length>0&&(l.sendBeacon("https://statistic.live.126.net/statics/report/im/sdk/msgreceived",e),this.msgDelayArr=[]),this.msgDelayTimer&&clearTimeout(this.msgDelayTimer),this.socket&&(this.msgDelayTimer=setTimeout(this.doReportMsgDelay.bind(this),1e4));},r.handleMsg=function(e){var t=this,n=t.db,r=e.time;t.markMsgRead(e),t.msgPromise=t.msgPromise.then(function(){return t.putMsg(e,"onMsg");}).then(function(s){return t.logger.info("msg::handleMsg:putMsg: done",e.idClient),n.enable?"superTeam"===e.scene?n.updateSuperTeamRoamingMsgTimetag(r):n.updateRoamingMsgTimetag(r):(t.timetags["superTeam"===e.scene?"superTeamRoamingMsgs":"roamingMsgs"]=r,Promise.resolve());}).then(function(){if(e)return t.checkUserUpdate(e);}).then(function(){if(e){var n=e.type;switch(t.logger.info("msg::handleMsg:checkUserUpdate: "+e.scene+" "+n+" msg"+("notification"===n?" "+e.attach.type:"")),n){case"notification":return t.onTeamNotificationMsg(e);}}}).then(function(){e&&!e.ignore&&(t.logger.info("msg::handleMsg:onmsg: ",Object.assign({},e,{text:"***"})),setTimeout(function(){t.options.onmsg(s.copy(e));},0));}).then(void 0,function(e){e.callFunc="msg::handleMsg",t.onCustomError("消息处理错误",e);});},r.putMsg=function(e,t){if(s.isArray(e)||(e=[e]),e[0].filter)return Promise.resolve(e);var n,r=this,o=r.db,a=o.enable,c=Promise.resolve(),u=r.message.Message.getLastMsg(e),m=u.flow,l=r.genSessionByMsgs(e);f(l);var d=!1,p=[];function f(e){"roamingMsgs"!==t&&"offlineMsgs"!==t||r.cacheSyncedSession(e);}return c=(c=(c=c.then(function(){return a||r.options.autoMarkRead||"roamingMsgs"===t||!l||(r.sessionUnreadMsgs=r.sessionUnreadMsgs||{},r.sessionUnreadMsgs[l.id]=r.sessionUnreadMsgs[l.id]||[],r.sessionUnreadMsgs[l.id]=r.sessionUnreadMsgs[l.id].concat(e.filter(function(e){return r.options.shouldCountNotifyUnread(e);}))),"offlineMsgs"===t||"roamingMsgs"===t?Promise.reject(e):a?o.putMsg(e):e;}).then(function(t){var n=[];return e.forEach(function(e){r.checkMsgUnique(e)&&n.push(e);}),e=n,p=a?t:e,Promise.resolve(e);})).then(function(e){return e.length&&a&&l?new Promise(function(t,n){o.getSessions({sessionId:l.id}).then(function(n){if(n&&n.lastMsg){var r=n.lastMsg;l.lastMsg&&l.lastMsg.time<r.time&&(l.lastMsg=r);}p&&p.length?l?o.putSession(l).then(function(e){t(e);}):t(n):(d=!0,p=e,t(n));});}):Promise.resolve(l);})).then(function(e){if(l&&p.length){n=u.sessionId!==r.currSessionId;var c="roamingMsgs"===t,g=r.options.syncSessionUnread,h=l.id,y=r.findSession(h)||{},v=y.ack||0;if("offlineMsgs"===t||c&&g||"onMsg"===t&&"in"===m&&n){a&&e?(l=e,v=v||l.ack||0):(e=y)&&(l.unread=e.unread||0),f(l),l.unread=l.unread||0;var b=0;p.forEach(function(e){var t=r.options.shouldCountNotifyUnread(e),n=("notification"!==e.type||"notification"===e.type&&t)&&(i(e.isUnreadable)||e.isUnreadable);if(n&&g&&(n=e.time>v&&"out"!==e.flow),n&&(b++,g&&!a)){var s=y.unreadMsgs||[];s.push(e),l.unreadMsgs=s;}}),l.unread+=b;var T=s.replaceLastMsg(l);if(T.unreadMsgs&&(T.unreadMsgs=T.unreadMsgs.map(function(e){return e&&e.idServer;})),r.logger.info("msg::putMsg:updateSession: ",T),f(l),a&&!d)return o.updateSession({id:l.id,unread:l.unread});}}}),"onMsg"===t&&(c=c.then(function(){e.length&&l&&(r.onUpdateSession(l),r.options.syncSessionUnread&&!n&&r.api.resetSessionUnread(r.currSessionId));})),c.then(function(){return Promise.resolve(e);}).catch(function(e){return e&&e.length?Promise.resolve(e):Promise.reject(e);});},r.putBroadcastMsgs=function(e){var t=this,n=t.db,r=e.length;if(r>0){if(t.doMarkBroadcastMsgsRead(e),n.enable){var i=e[r-1].broadcastId;return n.updateBroadcastMsgTimetag(i),n.putBroadcastMsg(e).then(function(){return setTimeout(function(){t.doMarkMsgsRead(),t.options.onbroadcastmsgs(s.copy(e));},0),Promise.resolve(e);});}setTimeout(function(){t.options.onbroadcastmsgs(s.copy(e));},0);}return e;},r.putBroadcastMsg=function(e){var t=this,n=t.db;return t.doMarkBroadcastMsgsRead([e]),n.enable?(e.broadcastId&&n.updateBroadcastMsgTimetag(e.broadcastId),n.putBroadcastMsg(e).then(function(){return setTimeout(function(){t.options.onbroadcastmsg(s.copy(e));},0),Promise.resolve(e);})):(setTimeout(function(){t.options.onbroadcastmsg(s.copy(e));},0),e);},r.doMarkBroadcastMsgsRead=function(e){e=e.map(function(e){return e.broadcastId;}),this.sendCmd("batchMarkRead",{sid:7,cid:17,ids:e});},r.cacheSyncedSession=function(e){if(e&&this.syncResult){e=s.merge({},e),this.syncResult.sessions=this.syncResult.sessions||{};var t=e.id,n=this.syncResult.sessions[t];n&&n.ack<e.ack&&delete e.ack,n&&n.msgReceiptTime<e.msgReceiptTime&&delete e.msgReceiptTime,this.syncResult.sessions[t]=s.merge(n,e),this.mergeSession(this.syncResult.sessions[t]);}},r.checkMsgUnique=s.genCheckUniqueFunc("idClient"),r.revokeMsgUniqueCheck=function(e){this.uniqueSet&&this.uniqueSet.idClient&&(this.uniqueSet.idClient[e]=!1);},r.storeSendMsg=function(e){if(!this.syncing){var t=this.putMsg(e,"sendMsg");return this.msgPromise=this.msgPromise.then(function(){return t;}),t;}this.unhandledMsgs.push({type:"sendMsg",msg:e});},r.updateSendMsgError=function(e){if(!this.syncing){var t=this.updateMsg(e);return this.msgPromise=this.msgPromise.then(function(){return t;}),t;}this.unupdatedMsgs.push(e);},r.onSendMsg=function(e,t){var n=this,r=e.content&&e.content.msg,s=e.obj&&e.obj.msg||r;if(this.logger.warn("sendMsg::end: "+s.idClient),e.obj)o();else{var i=n.db;i&&i.enable&&i.getMsgByIdClient(s.idClient).then(function(e){e&&(s=e,o());}).catch(function(e){return o();});}function o(){n.completeMsg(s);var i=e.error&&7101===e.error.code;e.error&&!i||(s.idServer=r.idServer,s.time=+r.time,r.callbackExt&&(s.callbackExt=r.callbackExt)),i&&(s.isInBlackList=!0),e.error?s.status="fail":s.status="success",s=n.message.reverse(s),t&&(s.filter=!0),e.obj=s,n.syncing?n.unupdatedMsgs.push(s):n.msgPromise=Promise.all([n.msgPromise,e.obj.promise]).then(function(e){return e.length||(s.resend=!0),n.updateMsg(s).then(function(){return n.options.syncSessionUnread&&n.currSessionId===s.sessionId&&n.api.resetSessionUnread(n.currSessionId),n.resolveMsgReceiptTask(s),s;});});}},r.updateLocalMsg=function(e){var t=this.updateMsg(e);return this.msgPromise=this.msgPromise.then(function(){return t;}),t;},r.updateMsg=function(e){if(e.filter||this.options.shouldIgnoreMsg(e))return Promise.resolve(e);var t=this,n=t.db,r="success"===e.status,s=u.genSessionByMsg(e),i=!!e.isLocal;return n.enable?n.updateMsg(e).then(function(o){var a=n.updateSession(s),c=Promise.resolve();return r&&o&&!i&&(c="superTeam"===e.scene?n.updateSuperTeamRoamingMsgTimetag(o.time):n.updateRoamingMsgTimetag(o.time)),t.onUpdateSession(s),Promise.all([a,c]);}):(r&&!i&&(t.timetags.roamingMsgs=e.time),t.onUpdateSession(s),Promise.resolve(e));},r.updateRoamingMsgTimetag=function(e){var t=this.db;return t.enable?t.updateRoamingMsgTimetag(e):(this.timetags.roamingMsgs=e,Promise.resolve(e));},r.checkUserUpdate=function(e){var t=this,n=e.from;return t.logger.info("handleMsg::checkUserUpdate: ",n,t.account),n===t.account?Promise.resolve():new Promise(function(r){var i=t.userSet[n];if(i){var o=+i.updateTime,a=+e.userUpdateTime;!isNaN(o)&&!isNaN(a)&&s.isNumber(o)&&s.isNumber(a)&&o<a?c():r();}else c();function c(){t.api.getUser({account:n,sync:!0,done:function done(e,n){e||setTimeout(function(){t.logger.log("user::checkUserUpdate: onupdateuser",n),t.options.onupdateuser(n);},0),r();}});}});},r.processUnsettledMsgs=function(){var e=this;e.unhandledMsgs.forEach(function(t){var n=t.msg;switch(t.type){case"onMsg":e.handleMsg(n);break;case"sendMsg":e.msgPromise=e.msgPromise.then(function(){return e.putMsg(n);});break;case"onBroadcastMsg":e.msgPromise=e.msgPromise.then(function(){return e.putBroadcastMsg(n);});}}),e.unupdatedMsgs.forEach(function(t){e.msgPromise=e.msgPromise.then(function(){return e.updateMsg(t);});}),e.resetUnsettledMsgs();},r.onTeamNotificationMsg=function(e){this.db;var t=e.attach,n=t.type,r=e.from,s=e.to,i=e.time,o=t.team,a=t.account,c=t.accounts;switch(n){case"updateTeam":return o.updateTime=i,this.onUpdateTeam(o);case"addTeamMembers":return this.onAddTeamMembers(e,o,c);case"removeTeamMembers":return this.onRemoveTeamMembers(o,s,c);case"acceptTeamInvite":return this.onAddTeamMembers(e,o,[r]);case"passTeamApply":return this.onAddTeamMembers(e,o,[a]);case"addTeamManagers":return this.updateTeamManagers(e,s,c,!0,i);case"removeTeamManagers":return this.updateTeamManagers(e,s,c,!1,i);case"leaveTeam":return this.onRemoveTeamMembers(o,s,[r]);case"dismissTeam":return this.onDismissTeam(s,i);case"transferTeam":return this.transferTeam(e,o,r,a);case"updateTeamMute":return this.onUpdateTeamMembersMute(e,o,[a],t.mute);case"updateSuperTeam":return o.updateTime=i,this.onUpdateSuperTeam(o);case"addSuperTeamMembers":return this.onAddSuperTeamMembers(e,o,c);case"passSuperTeamApply":return this.onAddSuperTeamMembers(e,o,[a]);case"removeSuperTeamMembers":return this.onRemoveSuperTeamMembers(o,s,c);case"leaveSuperTeam":return this.onRemoveSuperTeamMembers(o,s,[r]);case"dismissSuperTeam":return this.onDismissSuperTeam(s,i);case"transferSuperTeam":return this.transferSuperTeam(e,o,r,a);case"addSuperTeamManagers":return this.updateSuperTeamManagers(e,s,c,!0,i);case"removeSuperTeamManagers":return this.updateSuperTeamManagers(e,s,c,!1,i);case"updateSuperTeamMembersMute":return this.onUpdateSuperTeamMembersMute(e,o,c,t.mute);}},r.onAddSuperTeamMembers=function(e,t,n){var r=this.db,i=c.assembleMembers(t,n);e.attach.members=i;var o={team:t,accounts:n,members:i};if(this.logger.info("team::onAddSuperTeamMembers: ",o),this.options.onAddSuperTeamMembers(s.simpleClone(o)),r.enable){var a=r.putSuperTeamMembers(i),u=r.putSuperTeam(t);return Promise.all([a,u]);}},r.onRemoveSuperTeamMembers=function(e,t,n){var r=this.db,i={team:e,accounts:n};if(this.logger.info("team::onRemoveSuperTeamMembers:",i),this.options.onRemoveSuperTeamMembers(s.simpleClone(i)),r.enable){if(-1===n.indexOf(this.account)){var o=r.removeSuperTeamMembersByAccounts(t,n),a=Promise.resolve();return e&&(a=r.putSuperTeam(e)),Promise.all([o,a]);}return r.leaveSuperTeam(t);}},r.onDismissSuperTeam=function(e,t){var n=this.db,r={teamId:e};if(this.logger.info("team::onDismissSuperTeam:",r),this.options.onDismissSuperTeam(r),n.enable)return n.dismissSuperTeam(e,t);},r.onAddTeamMembers=function(e,t,n){var r=this,i=r.db,o=t.teamId,c=a.assembleMembers(t,n);e.attach.members=c;var u={team:t,accounts:n,members:c};if(r.logger.info("team::onAddTeamMembers: ",u),r.options.onAddTeamMembers(s.simpleClone(u)),i.enable){var m,l=i.putTeam(t);return-1===n.indexOf(r.account)?m=i.putTeamMembers(c):(r.logger.log("team::onAddTeamMembers: user join team",o),l=new Promise(function(e){r.api.getTeamMembers({teamId:o,sync:!0,done:function done(){e();}});})),Promise.all([m,l]);}},r.onRemoveTeamMembers=function(e,t,n){var r=this.db,i={team:e,accounts:n};if(this.logger.info("team::onRemoveTeamMembers:",i),this.options.onRemoveTeamMembers(s.simpleClone(i)),r.enable){if(-1===n.indexOf(this.account)){var o=r.removeTeamMembersByAccounts(t,n),a=Promise.resolve();return e&&(a=r.putTeam(e)),Promise.all([o,a]);}return r.leaveTeam(t);}},r.updateTeamManagers=function(e,t,n,r,i){var o=this.db,c=e.attach.members=n.map(function(e){return{id:a.genId(t,e),type:r?"manager":"normal",updateTime:i};}),u={teamId:""+t,memberUpdateTime:i};e.attach.team=u;var m={team:u,accounts:n,isManager:r,members:c};if(this.logger.info("team::updateTeamManagers:",m),this.options.onUpdateTeamManagers(s.simpleClone(m)),o.enable){var l=o.updateTeam(u),d=o.updateTeamManagers(t,n,r,i);return Promise.all([l,d]);}},r.updateSuperTeamManagers=function(e,t,n,r,i){var o=this.db,c=e.attach.members=n.map(function(e){return{id:a.genId(t,e),teamId:t,account:e,type:r?"manager":"normal",updateTime:i};}),u={teamId:""+t,memberUpdateTime:i};e.attach.team=u;var m={team:u,accounts:n,isManager:r,members:c};if(this.logger.info("team::updateSuperTeamManagers:",m),this.options.onUpdateSuperTeamManagers(s.simpleClone(m)),o.enable){var l=o.updateSuperTeam(u),d=o.updateSuperTeamMembers(c);return Promise.all([l,d]);}},r.onDismissTeam=function(e,t){var n=this.db,r={teamId:e};if(this.logger.info("team::onDismissTeam:",r),this.options.onDismissTeam(r),n.enable)return n.dismissTeam(e,t);},r.transferTeam=function(e,t,n,r){var i=this.db,o=t.teamId,c=t.memberUpdateTime,u={id:a.genId(o,n),type:"normal",updateTime:c},m={id:a.genId(o,r),type:"owner",updateTime:c};e.attach.members=[u,m];var l={team:t,from:u,to:m};if(this.logger.info("team::transferTeam:",l),this.options.onTransferTeam(s.simpleClone(l)),i.enable)return i.transferTeam(t,n,r);},r.transferSuperTeam=function(e,t,n,r){var i=this.db,o=t.teamId,a=t.memberUpdateTime,c={teamId:o,type:"normal",account:n,updateTime:a},u={teamId:o,type:"owner",account:r,updateTime:a};e.attach.members=[c,u];var m={team:t,from:c,to:u};if(this.logger.info("team::transferSuperTeam:",m),this.options.onTransferSuperTeam(s.simpleClone(m)),i.enable)return i.transferSuperTeam(t,c,u);},r.onUpdateTeamMembersMute=function(e,t,n,r){var i=this.db,o=n.map(function(e){return{id:a.genId(t.teamId,e),account:e,teamId:t.teamId,mute:r,updateTime:t.memberUpdateTime};});e.attach.members=o;var c={team:t,accounts:n,members:o,mute:r};if(this.logger.info("team::onUpdateTeamMembersMute:",c),this.options.onUpdateTeamMembersMute(s.simpleClone(c)),i.enable){var u=i.updateTeamMembers(o),m=i.putTeam(t);return Promise.all([u,m]);}},r.onUpdateSuperTeamMembersMute=function(e,t,n,r){var i=this.db,o=n.map(function(e){return{id:c.genId(t.teamId,e),account:e,teamId:t.teamId,mute:r,updateTime:t.memberUpdateTime};});e.attach.members=o;var a={team:t,accounts:n,members:o,mute:r};if(this.logger.info("team::onUpdateSuperTeamMembersMute:",a),this.options.onUpdateSuperTeamMembersMute(s.simpleClone(a)),i.enable){var u=i.updateSuperTeamMembers(o),m=i.putSuperTeam(t);return Promise.all([u,m]);}},r.onHistoryMsgs=function(e){e.error||(e.obj.msgs=this.message.reverseMsgs(e.content.msgs));},r.isFilterMsgs=function(e){return!!e[0].filter;},r.splitMsgs=function(e,t,n,r){e.forEach(function(e){if(e.filter)r.push(e);else switch(e.scene){case"p2p":t.push(e);break;case"team":n.push(e);}});},r.markMsgRead=function(e,t){s.isArray(e)||(e=[e]);if(this.db.enable||this.options.autoMarkRead||t){var n=[],r=[],i=[];this.splitMsgs(e,n,r,i),this.markP2pMsgsRead(n),this.markTeamMsgsRead(r),this.markFilterMsgsRead(i);}},r.markP2pMsgsRead=function(e){if(e.length){var t=m.idMap.msg.id,n=m.idMap.msg.msg;this.doMarkMsgsRead(t,n,e);}},r.markTeamMsgsRead=function(e){if(e.length){var t=m.idMap.team.id,n=m.idMap.team.teamMsg;this.doMarkMsgsRead(t,n,e);}},r.markFilterMsgsRead=function(e){if(e.length){var t=m.idMap.filter.id,n=m.idMap.filter.filterMsg;this.doMarkMsgsRead(t,n,e);}},r.markSysMsgRead=function(e,t){s.isArray(e)||(e=[e]);var n,r;(this.db.enable||this.options.autoMarkRead||t)&&(this.isFilterMsgs(e)?(n=m.idMap.filter.id,r=m.idMap.filter.filterSysMsg):"superTeam"===e[0].scene?(n=m.idMap.superTeam.id,r=m.idMap.superTeam.superTeamCustomSysMsg):(n=m.idMap.msg.id,r=m.idMap.msg.sysMsg),this.doMarkMsgsRead(n,r,e));},r.doMarkMsgsRead=function(e,t,n){n&&n.length&&(/^(netcallBill|netcallMiss|netcallReject)$/.test(n[0].attach&&n[0].attach.type)&&(e=9,t=11),this.sendCmd("batchMarkRead",{sid:e,cid:t,ids:n.map(function(e){return e.idServer;})}));};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0),i=n(150);r.processNotify=function(e){switch(e.cmd){case"syncOfflineNetcallMsgs":case"syncOfflineMsgs":this.onOfflineMsgs(e);break;case"batchMarkRead":break;case"syncOfflineSysMsgs":case"syncOfflineSuperTeamSysMsgs":this.onOfflineSysMsgs(e);break;case"syncRoamingMsgs":case"syncSuperTeamRoamingMsgs":this.onRoamingMsgs(e);break;case"syncOfflineFilterMsgs":this.onOfflineMsgs(e,!0);break;case"syncOfflineFilterSysMsgs":this.onOfflineSysMsgs(e,!0);break;case"syncMsgReceipts":this.onOfflineMsgReceipts(e);break;case"syncDonnop":this.onDonnop(e,!0);break;case"syncSessionAck":this.syncSessionAck(e);break;case"syncSuperTeamSessionAck":this.syncSuperTeamSessionAck(e);break;case"syncRobots":this.onRobots(e);break;case"syncBroadcastMsgs":this.onBroadcastMsgs(e);break;case"syncDeleteSuperTeamMsgOfflineRoaming":this.onDeleteMsgOfflineRoaming(e);break;case"syncDeleteMsgSelf":this.syncDeleteMsgSelf(e);break;case"syncSessionsWithMoreRoaming":this.syncSessionsWithMoreRoaming(e);break;case"syncStickTopSessions":this.syncStickTopSessions(e);break;case"syncSessionHistoryMsgsDelete":this.syncSessionHistoryMsgsDelete(e);}},r.onDonnop=function(e,t){if(!e.error){var n=this,r=n.db,s=i.reverse(e.content.donnop);n.mergeDonnop(s);var o=n.dbDonnop();if(t){var a=e.content.timetag;n.timetags.donnop=a,r.enable&&(o=o.then(function(){return n.db.updateDonnopTimetag(a);}).catch(function(e){return n.logger.error("notify::onDonnop: ",e),Promise.reject(e);})),o.cmd="donnop",n.syncPromiseArray.push(o);}else n.onPushNotificationMultiportConfigUpdate();}},r.onUpdateDonnop=function(e){if(!e.error){var t=e.obj;t&&(this.mergeDonnop(s.filterObj(t,["shouldPushNotificationWhenPCOnline"])),this.dbDonnop(),this.onPushNotificationMultiportConfigUpdate());}},r.getPushNotificationMultiportConfig=function(){return s.merge({},this.pushNotificationMultiportConfig);},r.mergeDonnop=function(e){this.pushNotificationMultiportConfig=s.merge({},this.pushNotificationMultiportConfig,e);},r.dbDonnop=function(){return this.db.enable?this.db.setDonnop(this.pushNotificationMultiportConfig):Promise.resolve();},r.onPushNotificationMultiportConfigUpdate=function(){var e=this;setTimeout(function(){var t=e.getPushNotificationMultiportConfig();e.logger.info("link::onPushNotificationMultiportConfigUpdate:",t),e.options.onPushNotificationMultiportConfigUpdate(t);});};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0),i=(s.objs2accounts,s.teams2ids),o=n(152),a=n(112);r.processSuperTeam=function(e){var t,n,r,s=e.error;switch(void 0===e.obj&&(e.obj={}),e.cmd){case"sendSuperTeamMsg":this.onSendMsg(e);break;case"superTeamMsg":this.onMsg(e);break;case"sendSuperTeamCustomSysMsg":this.onSendSysMsg(e);break;case"superTeamCustomSysMsg":this.onSysMsg(e);break;case"syncSuperTeams":this.onSuperTeams(e);break;case"syncCreateSuperTeam":t=o.reverse(e.content.team),r=a.assembleOwner(t),this.logger.info("team::processTeam: sync createTeam",t,r),this.options.onSyncCreateSuperTeam(t,r),this.onCreateSuperTeam(t,r);break;case"getSuperTeamHistoryMsgs":case"searchSuperTeamHistoryMsgs":this.onHistoryMsgs(e);break;case"syncSendSuperTeamMsg":this.onMsg(e);break;case"addSuperTeamMembers":case"removeSuperTeamMembers":case"leaveSuperTeam":case"addSuperTeamManagers":case"removeSuperTeamManagers":case"transferSuperTeam":break;case"updateInfoInSuperTeam":s||((n=e.obj).account=this.account,n.id=a.genId(n.teamId,n.account),n=a.reverse(n),e.obj=n,this.onUpdateSuperTeamMember(n));break;case"updateNickInTeam":e.obj=a.reverse(e.obj);break;case"syncUpdateSuperTeamMember":n=a.reverse(e.content.teamMember),this.onUpdateSuperTeamMember(n);break;case"updateSuperTeam":e.obj=o.reverse(e.obj,!0);break;case"getSuperTeam":e.error||(e.obj=o.reverse(e.content.team));break;case"getSuperTeams":this.onSuperTeams(e);break;case"syncSuperTeamMembers":this.onSyncSuperTeamMembers(e);break;case"getSuperTeamMembers":e.error||this.onGetAllSuperTeamMembers(e);break;case"getSuperTeamMembersByJoinTime":case"getSuperTeamMembersByAccounts":case"getMutedSuperTeamMembers":e.error||this.onSuperTeamMembers(e);break;case"onDeleteSuperTeamMsg":this.onDeleteMsg(e);break;case"onSuperTeamMsgDelete":case"syncDeleteSuperTeamMsg":this.onMsgDeleted(e,!0);break;case"onMarkSuperTeamSessionAck":this.onMarkSessionAck(e);break;case"syncMarkSuperTeamSessionAck":this.syncMarkSessionAck(e);}},r.onSuperTeams=function(e){e.content=e.content||{};var t,n=this,r=n.db,s=n.packetFromSync(e),a=e.content.teams||[],c=!0,u=[],m=[];if(e.error)switch(e.error.code){case 803:e.error=null,c=!1;}var l=new Promise(function(i,l){var p,f;e.error?s&&l(e.error):(!function(){c&&a.forEach(function(e){(e=o.reverse(e)).validToCurrentUser?u.push(e):m.push(e);});a.length?(c=!0,t=e.content.timetag):c=!1;}(),r.enable?(p=i,f=l,e.promise=new Promise(function(e,i){function o(){s?(d(),e(),p()):r.getSuperTeams().then(function(t){u=t,d(),e(),p();}).then(void 0,function(e){e.message="db.getSuperTeams error",e.callFunc="superTeam::afterMergeData",i(e),f(e);});}c?r.mergeSuperTeams(u,m,t).then(function(){o();}).then(void 0,function(e){var t={callFunc:"superTeam::onSuperTeams:mergeData",message:"db.mergeSuperTeams error",event:e};i(t),f(t);}):(n.logger.warn("superTeam::onSuperTeams:mergeData: no teams need merge"),o());}).then(void 0,function(e){throw e.message="merge teams data error",e.callFunc="superTeam::mergeData",f(e),e;})):(d(),i()));}).catch(function(e){return n.logger.error("superTeam::onSuperTeams: ",e),Promise.reject(e);});function d(){n.timetags.superTeams=t,u.invalid=m,s?(n.syncResult.superTeams=u,n.syncResult.invalidSuperTeams=m):(n.logger.info("superTeam::onSuperTeams: not in syncing, get teams",i(u),u),e.obj=u);}s&&(l.cmd="superteams",n.syncPromiseArray.push(l));},r.onCreateSuperTeam=function(e,t){var n=this.db;n.enable&&(n.putSuperTeam(e),n.putSuperTeamMembers(t));},r.onGetAllSuperTeamMembers=function(e){var t=this,n=this.db,r=e.raw.ser,s=this.superTeamMembersData[r]||{},i=s.teamId||e.obj&&e.obj.teamId;if(n.enable){var o=e.content&&e.content.timetag,a=200===e.raw.code?Promise.all(s.pArr):Promise.resolve();e.promise=a.then(function(){return n.getSuperTeamMembers(i).then(function(t){o&&n.updateSuperTeamMemberTimetag(i,o),e.obj={members:t,invalid:[],teamId:i};});}).catch(function(e){return t.logger.error(e);});}else e.obj={members:s.members,invalid:s.invalid,teamId:i};this.superTeamMembersData[r]=void 0;},r.onSyncSuperTeamMembers=function(e){var t,n=this.db,r=[],s=[],i=e.content.members||[],o=e.raw.ser;if(e.obj&&(t=e.obj.teamId),t||(t=e.content.teamId),i.forEach(function(e){(e=a.reverse(e)).valid?s.push(e):r.push(e);}),n.enable){this.superTeamMembersData[o]=this.superTeamMembersData[o]||{teamId:t,pArr:[]};var c=Promise.resolve();e.content&&e.content.isAll&&(c=n.deleteSuperTeamMembers(t));var u=c.then(function(){return n.mergeSuperTeamMembers(t,s,r);}).then(function(){return Promise.resolve();});this.superTeamMembersData[o].pArr.push(u);}else this.superTeamMembersData[o]=this.superTeamMembersData[o]||{teamId:t,members:[],invalid:[]},s.length&&(this.superTeamMembersData[o].members=this.api.mergeTeamMembers(this.superTeamMembersData[o].members,s)),r.length&&(this.superTeamMembersData[o].invalid=this.api.mergeTeamMembers(this.superTeamMembersData[o].invalid,r));e.raw=void 0;},r.onSuperTeamMembers=function(e,t){var n,r=this.db,s=[],i=[];(e.content.members||[]).forEach(function(e){(e=a.reverse(e)).valid?i.push(e):s.push(e);}),e.obj&&(n=e.obj.teamId),n||(n=e.content.teamId||i[0]&&i[0].teamId),r.enable&&!t&&r.mergeSuperTeamMembers(n,i,s),e.obj={members:i,invalid:s,teamId:n};},r.onUpdateSuperTeamMember=function(e){e.updateTime||(e.updateTime=+new Date()),this.logger.info("superTeam::onUpdateSuperTeamMember: ",e),this.options.onUpdateSuperTeamMember(s.simpleClone(e));var t={teamId:e.teamId,memberUpdateTime:e.updateTime};this.onUpdateSuperTeam(t);var n=this.db;n.enable&&n.updateSuperTeamMember(e);},r.onUpdateSuperTeam=function(e){this.logger.info("superteam::onUpdateSuperTeam:",e),this.options.onUpdateSuperTeam(s.simpleClone(e));var t=this.db;t.enable&&t.updateSuperTeam(e);};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0),i=s.objs2accounts,o=s.teams2ids,a=n(85),c=n(70);r.processTeam=function(e){var t=e.error,n=void 0,r=void 0,s=void 0;switch(void 0===e.obj&&(e.obj={}),e.cmd){case"createTeam":if(n=e.obj.team,t||(n=e.content.team),n=a.reverse(n),e.obj.team=n,s=c.assembleOwner(n),e.obj.owner=s,!t){var i={team:n,owner:s};this.logger.info("team::processTeam: create team",i),this.onCreateTeam(n,s);}break;case"syncCreateTeam":n=a.reverse(e.content.team),s=c.assembleOwner(n),this.logger.info("team::processTeam: sync createTeam",n,s),this.options.onsynccreateteam(n,s),this.onCreateTeam(n,s);break;case"sendSuperTeamMsg":case"sendTeamMsg":this.onSendMsg(e);break;case"teamMsg":this.onMsg(e);break;case"teamMsgs":this.onMsgs(e);break;case"addTeamMembers":case"removeTeamMembers":case"leaveTeam":case"dismissTeam":case"addTeamManagers":case"removeTeamManagers":case"transferTeam":break;case"updateInfoInTeam":t||((r=e.obj).account=this.account,r.id=c.genId(r.teamId,r.account),r=c.reverse(r),e.obj=r,this.mergeMyTeamMembers(r),this.onUpdateTeamMember(r));break;case"updateNickInTeam":e.obj=c.reverse(e.obj);break;case"updateTeam":e.obj=a.reverse(e.obj,!0);break;case"applyTeam":e.error||(e.obj=a.reverse(e.content.team));break;case"passTeamApply":this.updateTeamSysMsgState(e,"passed");break;case"rejectTeamApply":this.updateTeamSysMsgState(e,"rejected");break;case"acceptTeamInvite":this.updateTeamSysMsgState(e,"passed"),e.error||(e.obj=a.reverse(e.content.team));break;case"rejectTeamInvite":this.updateTeamSysMsgState(e,"rejected");break;case"getTeam":e.error||(e.obj=a.reverse(e.content.team));break;case"getTeams":this.onTeams(e);break;case"getTeamMembers":this.onTeamMembers(e);break;case"syncTeams":this.onTeams(e);break;case"syncTeamMembers":this.onTeamMembers(e);break;case"getTeamHistoryMsgs":case"searchTeamHistoryMsgs":this.onHistoryMsgs(e);break;case"syncSendTeamMsg":this.onMsg(e);break;case"notifyTeamMsgReads":this.onTeamMsgReceipt(e);break;case"syncUpdateTeamMember":r=c.reverse(e.content.teamMember),this.onUpdateTeamMember(r),r.account===this.account&&this.mergeMyTeamMembers(r);break;case"updateMuteStateInTeam":break;case"getMyTeamMembers":e.error||(e.obj=c.reverseMembers(e.content.teamMembers));break;case"getMutedTeamMembers":e.error||(e.obj={teamId:e.obj.teamId,members:c.reverseMembers(e.content.teamMembers)});break;case"syncMyTeamMembers":this.onSyncMyTeamMembers(e);break;case"sendTeamMsgReceipt":this.sendTeamMsgReceipt(e);break;case"getTeamMsgReads":this.getTeamMsgReads(e);break;case"getTeamMsgReadAccounts":this.getTeamMsgReadAccounts(e);break;case"getTeamsById":this.getTeamsById(e);}},r.getTeamMsgReads=function(e){var t=this;if(e.error)this.logger.error("team::sendTeamMsgReceipt: ",e.error);else{var n=s._get(e,"content.teamMsgReceipts")||[];if(this.db.enable){var r=[];n.forEach(function(e){e.idClient&&r.push({idClient:e.idClient,unread:+e.unread,read:+e.read});}),r.length>0&&setTimeout(function(){return t.db.updateMsgBatch(r);},0);}}},r.getTeamMsgReadAccounts=function(e){if(e.error)this.logger.error("team::getTeamMsgReadAccounts: ",e.error);else{var t=s._get(e,"content.readAccounts")||[],n=s._get(e,"content.unreadAccounts")||[],r=s._get(e,"content.teamMsgReceipt.idClient")||[];this.db.putMsgReadDetail({idClient:r,readAccounts:t,unreadAccounts:n});}},r.sendTeamMsgReceipt=function(e){var t=this;if(e.error)this.logger.error("team::sendTeamMsgReceipt: ",e.error);else{var n=s._get(e,"obj.teamMsgReceipts")||[],r=s._get(e,"content.teamMsgReceipts")||[];if(this.db.enable){var i=[];n.forEach(function(e){r.some(function(t){return e.idServer===t.idServer;})||i.push({idClient:e.idClient,hasRead:!0});}),i.length>0&&(this.logger.log("sendTeamMsgReceipt::updateMsgBatch"),setTimeout(function(){return t.db.updateMsgBatch(i);},0));}}},r.onCreateTeam=function(e,t){var n=this.db;n.enable&&(n.putTeam(e),n.putTeamMembers(t)),this.options.onCreateTeam(e,t);},r.onTeams=function(e){e.content=e.content||{};var t,n=this,r=n.db,s=n.packetFromSync(e),i=e.content.teams||[],c=!0,u=[],m=[];if(e.error)switch(e.error.code){case 803:e.error=null,c=!1;}var l=new Promise(function(o,l){var p,f;e.error?s&&l(e.error):(!function(){c&&i.forEach(function(e){(e=a.reverse(e)).validToCurrentUser?u.push(e):m.push(e);});i.length?(c=!0,t=e.content.timetag):c=!1;}(),r.enable?(p=o,f=l,e.promise=new Promise(function(e,i){function o(){s?(d(),e(),p()):r.getTeams().then(function(t){u=t,d(),e(),p();}).catch(function(e){e.message="db.getTeams error",e.callFunc="team::afterMergeData",i(e),f(e);});}c?r.mergeTeams(u,m,t).then(function(){o();}).catch(function(e){var t={callFunc:"team::onTeams:mergeData",message:"db.mergeTeams error",event:e};i(t),f(t);}):(n.logger.warn("team::onTeams:mergeData: no teams need merge"),o());}).then(void 0,function(e){throw e.message="merge teams data error",e.callFunc="team::mergeData",f(e),e;})):(d(),o()));}).catch(function(e){return n.logger.error("team::onTeams: ",e),Promise.reject(e);});function d(){n.timetags.teams=t,u.invalid=m,s?(n.syncResult.teams=u,n.syncResult.invalidTeams=m,n.syncing||n.onSyncDone()):(n.logger.info("team::onTeams: not in syncing, get teams",o(u),u),e.obj=u);}s&&(l.cmd="teams",n.syncPromiseArray.push(l));},r.getTeamsById=function(e){if(e.error){if(816!==e.error.code)return;this.logger.error("team::getTeamsById: ",e.error),e.error=null;}e.content.teams=e.content.teams.map(function(e){return a.reverse(e);}),e.obj=e.content;},r.onTeamMembers=function(e){e.content=e.content||{};var t,n,r=this,s=(r.db,r.packetFromSync(e)),o=e.content.members||[],a=!0,u=[],m=[];if(e.obj&&(n=e.obj.teamId),n||(n=e.content.teamId),n=""+n,e.error)switch(e.error.code){case 406:e.error=null,a=!1;}var l=new Promise(function(l,d){e.error?s&&(r.logger.error("team::onTeamMember: team error:",n,e.error),d({callFunc:"team::onTeamMembers",event:e.error,message:"teamId-"+n+" 获取群成员错误"})):(!function(){a&&o.forEach(function(e){(e=c.reverse(e)).valid?u.push(e):m.push(e);});o.length?(a=!0,t=e.content.timetag):a=!1;}(),u.invalid=m,s?(r.syncTeamMembersResult[n]=u,r.syncTeamMembersResult[n+"-invalid"]=m,r.timetags["team-"+n]=t):(r.logger.info("team::onTeamMembers: not syncing, get members",n,i(u)),e.obj={teamId:n,members:u}),l());});s&&(l.cmd=n,r.syncTeamMembersPromiseArray.push(l));},r.onUpdateTeamMember=function(e){e.updateTime||(e.updateTime=+new Date()),this.logger.info("team::onUpdateTeamMember: ",e),this.options.onupdateteammember(s.simpleClone(e));var t={teamId:e.teamId,memberUpdateTime:e.updateTime};this.onUpdateTeam(t);var n=this.db;n.enable&&n.updateTeamMember(e);},r.onUpdateTeam=function(e){this.logger.info("team::onUpdateTeam:",e),this.options.onUpdateTeam(s.simpleClone(e));var t=this.db;t.enable&&t.updateTeam(e);},r.onSyncMyTeamMembers=function(e){var t=this,n=t.db,r=c.reverseMembers(e.content.teamMembers);if(n.enable){var s=n.putTeamMembers(r).then(function(){return n.updateMyTeamMembersTimetag(e.content.timetag);}).catch(function(e){return t.logger.error("team::syncMyTeamMember: ",e),Promise.reject(e);});s.cmd="myTeamMembers",t.syncTeamMembersPromiseArray.push(s);}t.mergeMyTeamMembers(r);},r.mergeMyTeamMembers=function(e){s.isArray(e)||(e=[e]);var t=this.myTeamMembersMap=this.myTeamMembersMap||{};e.forEach(function(e){var n=e.teamId;t[n]=s.merge(t[n],e);}),this.logger.info("team::mergeMyTeamMembers:",t);},r.notifyForNewTeamMsg=function(e){s.isArray(e)||(e=[e]);var t=this,n=this.myTeamMembersMap||{},r={},i=[];e.forEach(function(e){s.exist(n[e])?r[e]=n[e].muteNotiType:i.push(e);});var o=Promise.resolve({map:r});return i.length&&(o=t.api.getMyTeamMembers({teamIds:i,promise:!0}).then(function(n){t.mergeMyTeamMembers(n),n.forEach(function(e){r[e.teamId]=e.muteNotiType;});var s=e.filter(function(e){return!r[e];});return Promise.resolve({map:r,miss:s});}).catch(function(e){return Object.keys(r).length>0?Promise.resolve({map:r,miss:i,error:e}):Promise.reject(e);})),o;},r.updateTeamSysMsgState=function(e,t){var n,r=e.error;r&&(t="error",r=s.filterObj(r,"code message")),n={idServer:e.obj.idServer,state:t},r&&(n.error=r),this.updateSysMsg(n);},r.onTeamMsgReceipt=function(e){var t=e.content,n=e.error;n&&this.logger.error("team::onTeamMsgReceipt:",n),t&&t.teamMsgReceipts&&this.options.onTeamMsgReceipt(t);};},function(e,t,n){"use strict";var r=n(8).fn,s=n(0);r.onRobots=function(e){var t=e.content;if(s.isFunction(this.options.onrobots)&&Array.isArray(t.robots)){var n=t.robots.filter(function(e){return!!e.botid;});n.length>0&&this.options.onrobots(n||[]);}};},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){var n={};for(var r in e){t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);}return n;};},function(e,t,n){"use strict";var r,s=n(482),i=(r=s)&&r.__esModule?r:{default:r};var o=n(8).fn,a=n(0),c=a.objs2accounts,u=n(236),m=n(110);o.processFriend=function(e){var t=e.obj,n=e.content,r=e.error;switch(e.cmd){case"friendRequest":this.updateFriendSysMsg(e),r||this.onFriendRequest(t);break;case"syncFriendRequest":this.onFriendRequest(n,!0);break;case"deleteFriend":r||this.onDeleteFriend(t);break;case"syncDeleteFriend":this.onDeleteFriend(n,!0);break;case"updateFriend":r||this.onUpdateFriend(t);break;case"syncUpdateFriend":this.onUpdateFriend(n.friend,!0);break;case"getFriends":case"syncFriends":this.onFriends(e);break;case"syncFriendUsers":this.onFriendUsers(e);}},o.onFriends=function(e){var t,n=this,r=n.db,s=e.error,i=n.packetFromSync(e),o=e.content.friends,a=!0,m=[],l=[],d=new Promise(function(d,f){var g,h;s?i&&f(s):(!function(){a&&o.forEach(function(e){(e=u.reverse(e)).valid?m.push(e):l.push(e);});n.logger.info("friend::onFriends: parse friends",c(m),"delete",c(l)),o.length?(a=!0,t=e.content.timetag):a=!1;}(),r.enable?(g=d,h=f,e.promise=new Promise(function(e,s){function o(){i?(p(),e(),g()):r.getFriends().then(function(t){m=t,p(),e(),g();}).then(void 0,function(e){e._msg="get friends error",s(e),h(e);});}a?r.mergeFriends(m,l,t).then(function(){o();}).then(void 0,function(e){e._msg="merge friends error",s(e),h(e);}):(n.logger.info("friend::onFriends: no merge friends"),o());}).then(void 0,function(e){throw e._msg="merge friends data error",h(e),e;})):(p(),d()));}).catch(function(e){return n.logger.error("friend::onFriends: ",e),Promise.reject(e);});function p(){n.timetags.friends=t,m.invalid=l,i?(n.syncResult.friends=m,n.syncResult.invalidFriends=l):(n.logger.info("friend::onFriends: get friends bingo",c(m)),n.logger.log("friends",m),e.obj=m);}i&&(d.cmd="friends",n.syncPromiseArray.push(d));},o.onFriendRequest=function(e,t){var n=Promise.resolve(),r=this.db,s=e.type,o=(0,i.default)(e,["type"]);if("addFriend"===(s=e.type=u.getTypeFromByte(s)||s)||"passFriendApply"===s){var a=e.friend=u.assembleFriend(o);r.enable&&(n=r.putFriend(a));}return t&&this.onSyncFriendAction(e),n;},o.onSyncFriendAction=function(e){this.logger.info("friend::onSyncFriendActionon:",e),this.options.onsyncfriendaction(e);},o.onDeleteFriend=function(e,t){var n=Promise.resolve(),r=this.db;return r.enable&&(n=r.deleteFriend(e.account)),t&&(e.type="deleteFriend",this.onSyncFriendAction(e)),n;},o.onUpdateFriend=function(e,t){var n=this.db,r=u.reverse(e);n.enable&&n.updateFriend(r),t&&this.onSyncFriendAction({type:"updateFriend",friend:r});},o.onFriendUsers=function(e){var t=this.db,n=e.content,r=n.users.map(function(e){return m.reverse(e);});this.logger.info("friend::onFriendUsers: parse users",c(r));var s=n.timetag,i=Promise.resolve();t.enable&&(i=t.mergeFriendUsers(r,s)),this.timetags.friendUsers=s,i.cmd="friendUsers",this.syncPromiseArray.push(i),this.syncResult.users=r,this.syncing||this.onSyncDone();},o.updateFriendSysMsg=function(e){var t,n,r=e.obj,s=e.error;if(e.obj.idServer){if(s)t="error",s=a.filterObj(s,"code message");else{var i=r.type;switch(i=u.getTypeFromByte(i)||i){case"passFriendApply":t="passed";break;case"rejectFriendApply":t="rejected";}}n={idServer:r.idServer,state:t},s&&(n.error=s),this.updateSysMsg(n);}};},function(e,t,n){"use strict";var r=n(0);function s(){}s.parse=function(e){var t=r.copy(e);return t.isBlacked="1"===t.isBlacked,t.isMuted="1"===t.isMuted,t.createTime=+t.createTime,t.updateTime=+t.updateTime,t;},e.exports=s;},function(e,t,n){"use strict";var r=n(8).fn,s=n(0),i=s.objs2accounts,o=n(484),a=n(110);r.processUser=function(e){var t,n=this,r=n.db,s=e.obj,i=e.error,o=e.content;switch(e.cmd){case"markInBlacklist":i||n.markInBlacklist(s);break;case"syncMarkInBlacklist":n.markInBlacklist(o,!0);break;case"markInMutelist":i||n.markInMutelist(s);break;case"syncMarkInMutelist":n.markInMutelist(o,!0);break;case"getRelations":i||n.onRelations(e);break;case"syncMyInfo":n.onMyInfo(e,!0);break;case"updateMyInfo":i||(s.updateTime=o.timetag,n.onUpdateMyInfo(e,s));break;case"syncUpdateMyInfo":n.onUpdateMyInfo(e,o.user,!0);break;case"getUsers":i||(t=o.users.map(function(e){return e=a.reverse(e),n.mergeUser(e),e;}),e.obj=t,r.enable&&r.putUsers(t));break;case"updateDonnop":n.onUpdateDonnop(e);break;case"syncUpdateDonnop":n.onDonnop(e,!1);}},r.onMyInfo=function(e){var t=this,n=t.db,r=e.error,s=e.content,i=!0,o=void 0,c=new Promise(function(e,c){var m,l;r?i&&(r&&(r.callFunc="user::onMyInfo"),e(r),t.syncData()):(o=a.reverse(s.user),n.enable?(m=e,l=c,n.mergeMyInfo(o,i).then(function(){u(),m();}).then(void 0,function(e){e.message="db.mergeMyInfo error",e.callFunc="user::onMyInfo",l(e);})):(u(),e()));}).catch(function(e){return t.logger.error("user::onMyInfo: ",e),Promise.reject(e);});function u(){t.timetags.myInfo=o.updateTime,i&&(t.syncResult.myInfo=o);}i&&(c.cmd="myInfo",t.syncPromiseArray.push(c));},r.onUpdateMyInfo=function(e,t,n){var r=this.db,i=a.reverse(t),o=s.merge(this.myInfo,i);this.myInfo=o,n?(this.logger.info("user::onUpdateMyInfo:",o),this.options.onupdatemyinfo(o)):e.obj=o,r.enable&&(i.account=this.account,r.updateUser(i));},r.onRelations=function(e){var t=this,n=t.db,r=e.error,s=t.packetFromSync(e),a=e.content.specialRelations,c=!0,u=void 0,m=[],l=[],d=[],p=[],f=new Promise(function(f,h){var y,v;r?s&&(f(r),t.syncData()):(a.forEach(function(e){var t={account:(e=o.parse(e)).account,createTime:e.createTime,updateTime:e.updateTime};e.isBlacked?m.push(t):l.push(t),e.isMuted?d.push(t):p.push(t);}),t.logger.info("user::onRelations: parse blacklist",i(m),m,"delete",i(l),l),t.logger.info("user::onRelations: parse mutelist",i(d),d,"delete",i(p),p),a.length?(c=!0,u=e.content.timetag):c=!1,n.enable?(y=f,v=h,e.promise=new Promise(function(e,r){function i(){s?(g(),e(),y()):n.getRelations().then(function(t){m=t[0],d=t[1],g(),e(),y();}).then(void 0,function(e){e.message="db.getRelations error",e.callFunc="user::onRelations",r(e),v(e);});}c?n.mergeRelations(m,l,d,p,u).then(function(){i();}).then(void 0,function(e){e.message="db.mergeRelations error",e.callFunc="user::onRelations",r(e),v(e);}):(t.logger.warn("user::onRelations: no relations need merge"),i());}).then(void 0,function(e){throw e.message="merge relations data error",e.callFunc="user::onRelations",v(e),e;})):(g(),f()));}).catch(function(e){return t.logger.error("user::onRelations: ",e),Promise.reject(e);});function g(){t.timetags.relations=u,m.invalid=l,d.invalid=p,s?(t.syncResult.blacklist=m,t.syncResult.mutelist=d,t.syncResult.invalidBlacklist=l,t.syncResult.invalidMutelist=p):(t.logger.info("user::onRelations: get relations",m,d),e.obj.blacklist=m,e.obj.mutelist=d);}s&&(f.cmd="relations",t.syncPromiseArray.push(f));},r.markInBlacklist=function(e,t){var n=this.db;e.record={account:e.account,updateTime:+new Date()},n.enable&&n.markInBlacklist(e),t&&(this.logger.info("user::markInBlacklist:",e),this.options.onsyncmarkinblacklist(e));},r.markInMutelist=function(e,t){var n=this.db;e.record={account:e.account,updateTime:+new Date()},n.enable&&n.markInMutelist(e),t&&(this.logger.info("user::markInMutelist:",e),this.options.onsyncmarkinmutelist(e));},r.mergeUser=function(e){this.userSet[e.account]=e;};},function(e,t,n){"use strict";var r=n(16),s=n(38);e.exports=function(e,t,n){t in e?r.f(e,t,s(0,n)):e[t]=n;};},function(e,t,n){"use strict";var r=n(50),s=n(25),i=n(74),o=n(239),a=n(238),c=n(90),u=n(486),m=n(148);s(s.S+s.F*!n(237)(function(e){Array.from(e);}),"Array",{from:function from(e){var t,n,s,l,d=i(e),p="function"==typeof this?this:Array,f=arguments.length,g=f>1?arguments[1]:void 0,h=void 0!==g,y=0,v=m(d);if(h&&(g=r(g,f>2?arguments[2]:void 0,2)),null==v||p==Array&&a(v))for(n=new p(t=c(d.length));t>y;y++){u(n,y,h?g(d[y],y):d[y]);}else for(l=v.call(d),n=new p();!(s=l.next()).done;y++){u(n,y,h?o(l,g,[s.value,y],!0):s.value);}return n.length=y,n;}});},function(e,t,n){n(61),n(487),e.exports=n(11).Array.from;},function(e,t,n){e.exports={default:n(488),__esModule:!0};},function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(489),i=(r=s)&&r.__esModule?r:{default:r};t.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++){n[t]=e[t];}return n;}return(0,i.default)(e);};},function(e,t,n){"use strict";var r,s=n(490),i=(r=s)&&r.__esModule?r:{default:r};var o=n(8).fn,a=n(0),c=n(15),u=a.undef,m=a.objs2ids,l=a.objs2accounts,d=a.teams2ids,p=n(83),f=a.getGlobal();o.beforeSync=function(){var e=this.db;return e.enable?e.clearSendingMsgs():Promise.resolve();},o.syncData=function(){var e=this,t=e.db,n=e.options,r=t.enable;function s(t){e.syncPromiseArray=[],e.syncResult={},e.syncTeamMembersPromiseArray=[],e.syncSuperTeamMembersPromiseArray=[],e.syncTeamMembersResult={},e.checkNosReqNum=0,e.getNosOriginUrlReqNum=0,a.verifyBooleanWithDefault(n,"syncRelations syncFriends syncFriendUsers syncTeams syncSuperTeams syncRoamingMsgs syncSuperTeamRoamingMsgs syncMsgReceipts syncExtraTeamInfo",!0,"","sync::syncData"),a.verifyBooleanWithDefault(n,"syncFilter syncTeamMembers syncSuperTeamMembers",!1,"","sync::syncData");var s={};t=t||{},f._nimForceSyncIM&&(e.logger.warn("sync::syncData: nimForceSyncIM"),delete t.teams,f._nimForceSyncIM=!1),s.myInfo=t.myInfo||0,s.deleteMsgSelf=t.deleteMsgSelf||0,s.offlineMsgs=0,n.syncRelations&&(s.relations=t.relations||0),n.syncFriends&&(s.friends=t.friends||0),n.syncFriendUsers&&(s.friendUsers=t.friendUsers||0),n.syncRobots&&(s.robots=t.robots||0),n.syncTeams&&(s.teams=t.teams||0),n.syncSuperTeams&&(s.superTeams=t.superTeams||0),n.syncStickTopSessions&&(s.stickTopSessions=t.stickTopSessions||0),n.syncSessionUnread&&(s.sessionAck=r&&t.sessionAck||0,s.superTeamSessionAck=r&&t.superTeamSessionAck||0),n.syncRoamingMsgs&&(s.roamingMsgs=r&&t.roamingMsgs||0),n.syncSuperTeamRoamingMsgs&&(s.superTeamRoamingMsgs=r&&t.superTeamRoamingMsgs||0),n.syncMsgReceipts&&(s.msgReceipts=t.msgReceipts||0),n.syncExtraTeamInfo&&(s.myTeamMembers=t.myTeamMembers||0),n.syncBroadcastMsgs&&(s.broadcastMsgs=t.broadcastMsg||0),s.donnop=t.donnop||0,s.deleteMsg=t.deleteMsg||0,s.deleteSuperTeamMsg=t.deleteSuperTeamMsg||0,s.sessionHistoryMsgsDelete=t.sessionHistoryMsgsDelete||0,s.netcallMsgs=0,n.syncFilter&&(s.filterMsgs=0);var i=e.onSyncData.bind(e);i.isImSyncDataCb=!0,e.sendCmd("sync",{sync:s,isImSyncDataObj:!0},i);}e.syncing=!0,r?e.beforeSync().then(function(){return e.db.getTimetags();}).then(function(e){s(e);},function(){s();}):s(e.timetags);},o.onSyncData=function(e,t){e&&this.syncRetryTimes>3&&(this.syncRetryTimes=0,e.callFunc="sync::onSyncData",this.onCustomError("SYNC_DATA_ERROR",e));},o.processSync=function(e){switch(this.syncRetryTimes=this.syncRetryTimes||0,this.syncRetryTimes++,e.cmd){case"syncDone":e.error?this.syncRetryTimes>3||this.syncData():(this.timetags.sync=e.content.timetag,this.onSyncDone());break;case"syncTeamMembersDone":this.onSyncTeamMembersDone();}},o.onSyncDone=function(e){var t,n,r,s,o,f,g,h,y,v,b,T,S,M,k,P,C,I,x,w,_,O,A,E,j,R,U,N=this,D=N.db,L=D.enable,F=N.options,B=N.syncPromiseArray,q=N.syncResult;function H(){if(B){N.logger.info("sync::onSyncDone: after sync",a.promises2cmds(B)),B=[],n=q.blacklist||[],r=q.invalidBlacklist||[],s=q.mutelist||[],o=q.invalidMutelist||[],f=q.friends,g=q.invalidFriends||[],h=q.myInfo,y=q.users,b=q.superTeams,S=q.invalidSuperTeams,v=q.teams,T=q.invalidTeams||[],M=q.sessions||{},k=q.ackMap,q.msgReceipts,P=q.roamingMsgs,C=q.offlineMsgs,I=q.offlineFilterMsgs,w=q.offlineSysMsgs,_=q.offlineCustomSysMsgs,O=q.offlineFilterSysMsgs,A=q.offlineFilterCustomSysMsgs,q.broadcastMsgs,E=q.sysMsgUnread,j=q.sessionsWithMoreRoaming,U=q.clearServerHistoryMsgs||[];var e=Promise.resolve();!function(){if(L){var t=[function(){var e=[];P&&P.forEach(function(t){e=[].concat((0,i.default)(e),(0,i.default)(t.msgs));});C&&C.forEach(function(t){e=[].concat((0,i.default)(e),(0,i.default)(t.msgs));});return e.length?D.putMsg(e).then(function(){return e;}):Promise.resolve(e);}()];M&&Object.keys(M).forEach(function(e){t.push(D.putSession(M[e]));}),e=Promise.all(t).then(function(){var e=[].concat((0,i.default)(Object.keys(k||{})),(0,i.default)(Object.keys(M||{})));e=e.filter(function(e,t,n){return n.indexOf(e)===t;});var t=[];return e.forEach(function(e){var n=M[e],r=void 0;(n.lastMsg||n.ack)&&(r=(r=n.ack?Promise.resolve(n):D.getSession(n.id)).then(function(t){var n=t.ack||0;return D.getMsgCountAfterAck({shouldCountNotifyUnread:N.options.shouldCountNotifyUnread,sessionId:e,ack:n}).then(function(n){return t.unread=n||0,M[e]=N.mergeSession(t),D.updateSession(t);});}),t.push(r));}),Promise.all(t);}).then(function(){var e=[];return N.saveAck.p2pTeam&&e.push(D.updateSessionAck(N.saveAck.p2pTeam).catch(function(e){return N.logger.error("sessionAck::syncSessionAck::updatetimetag db",e),Promise.reject(e);})),N.saveAck.superTeam&&e.push(D.updateSuperTeamSessionAck(N.saveAck.superTeam).catch(function(e){return N.logger.error("sessionAck::syncSuperTeamSessionAck::updatetimetag db",e),Promise.reject(e);})),Promise.all(e);});}else if(M){var n,r;[P,C].forEach(function(e){e&&e.forEach(function(e){(n=M[e.sessionId]).unread=n.unread||0,n.unreadMsgs=n.unreadMsgs||[],r=n.ack||0,e.msgs.forEach(function(e){r>=e.time||("notification"===e.type?N.options.shouldCountNotifyUnread(e)&&n.unread++:"in"===e.flow&&!1!==e.isUnreadable&&(n.unread++,n.unreadMsgs.push(e)));}),N.mergeSession(n);});});}}(),e.then(function(){if(L&&!N.hasSynced)N.hasSynced=!0,function(){F.syncRelations&&(t=D.getRelations().then(function(e){n=e[0],s=e[1],n.invalid=r,s.invalid=o;}).catch(function(e){return e._msg="on relations error",N.logger.error("sync::syncRelation: ",e),Promise.reject(e);}),B.push(t));F.syncFriends&&(t=D.getFriends().then(function(e){(f=e).invalid=g;}).catch(function(e){return e._msg="on friends error",N.logger.error("sync::syncFriends: ",e),Promise.reject(e);}),B.push(t));u(h)&&(t=D.getUser(N.account).then(function(e){h=e;}).catch(function(e){return e._msg="on myInfo error",N.logger.error("sync::syncMyInfo: ",e),Promise.reject(e);}),B.push(t));F.syncFriendUsers&&(t=D.getFriends().then(function(e){return e.map(function(e){return e.account;});}).then(function(e){return D.getUsers(e);}).then(function(e){y=e;}).catch(function(e){return e._msg="on users error",N.logger.error("sync::syncFriendUser: ",e),Promise.reject(e);}),B.push(t));F.syncTeams&&(t=D.getTeams().then(function(e){(v=e).invalid=T;}).catch(function(e){return e._msg="on teams error",N.logger.error("sync::syncTeams: ",e),Promise.reject(e);}),B.push(t));F.syncSuperTeams&&(t=D.getSuperTeams().then(function(e){(b=e).invalid=S;}).catch(function(e){return e._msg="on superteams error",N.logger.error("sync::syncSuperTeams: ",e),Promise.reject(e);}),B.push(t));t=D.getTeamMembersByAccount(N.account).then(function(e){N.mergeMyTeamMembers(e);}).catch(function(e){return N.logger.error("sync::getTeamMembersByAccount: ",e),Promise.reject(e);}),B.push(t),t=D.getDonnop().then(function(e){N.mergeDonnop(e);}).catch(function(e){return N.logger.error("sync::donnop: ",e),Promise.reject(e);}),B.push(t),t=D.getSessions({limit:500,includeDeleted:!0}).then(function(e){M=e;}).catch(function(e){return N.logger.error("sync::getSession: ",e),Promise.reject(e);}),B.push(t),t=D.getSysMsgUnread().then(function(e){E=e;}).catch(function(e){return e._msg="on sysMsgUnread error",N.logger.error("sync::getSysMsgUnread: ",e),Promise.reject(e);}),B.push(t),B.push(D.getSessionsWithMoreRoaming().then(function(e){j=e;}));}();else{var e=[],i=void 0;Object.keys(M).forEach(function(t){(i=M[t]).lastMsg&&e.push(i);}),M=e.sort(function(e,t){return t.updateTime-e.updateTime;});}Promise.all(B).then(W).then(J,function(e){e.callFunc="sync::onSyncDone",e.message="taskAfterSync syncDBDataPromise 出错",N.onCustomError("SYNC_SESSION_ACK_ERROR",e);});});}else N.logger.warn("sync::onSyncDone: after sync --no promiseArray");}function W(){N.logger.info("sync::onSyncDone: taskAfterSync"),function(){if(q.deleteMsgSysMsgs){var e={};P&&P.forEach(function(t){e[t.sessionId]=t;});var t={};C&&C.forEach(function(e){t[e.sessionId]=e;});var n=N.api;q.deleteMsgSysMsgs.forEach(function(r){r.sysMsgs.forEach(function(r){var s=r.msg,i=s.sessionId;[e,t].forEach(function(e){e[i]&&(e[i].msgs=n.cutMsgs(e[i].msgs,s));});});}),D.enable||[P,C].forEach(function(e){e&&e.forEach(function(e){if(e.msgs.length){var t=N.genSessionByMsgs(e.msgs);N.cacheSyncedSession(t),M=n.mergeSessions(M,t);}else M=n.cutSessions(M,{id:e.sessionId});});});}}(),(R=N.syncResult.stickTopSessions||[]).forEach(function(e,t){R[t]=N.mergeSession(e);});var e=[N.deleteMsgOfflineRoaming(q.deleteMsgSysMsgs,M)];return U&&U.forEach(function(t){e.push(function(e,t){var n;N.logger.info("sync::taskAfterSync:sessionHistoryMsgsDelete "+e),t=t||new Date().getTime();var r=M.filter(function(t){return t.id===e;}),s=N.findSession(e);n=s||r[0];var i=!1!==F.rollbackClearMsgsUnread,o=[];D.enable&&o.push(D.deleteMsgsBySessionId({sessionId:e,end:t}));i&&n&&(n.lastMsg=null,n.unread=0,n=N.mergeSession(n),D.enable&&o.push(D.updateSession(n)));return Promise.all(o);}(t.sessionId,t.time));}),Promise.all(e);}function J(){setTimeout(V,0);}function V(){var e,t,r=[],i=[];n&&(N.logger.info("sync::notifyDataAsync: on blacklist",l(n)),F.onblacklist(n)),s&&(N.logger.info("sync::notifyDataAsync: on mutelist",l(s)),F.onmutelist(s)),f&&(N.logger.info("sync::notifyDataAsync: on friends",l(f)),F.onfriends(f)),h&&(N.logger.info("sync::notifyDataAsync: on myInfo",h),N.myInfo=h,F.onmyinfo(a.copy(h))),y&&(y.forEach(function(e){N.mergeUser(e);}),N.logger.info("sync::notifyDataAsync: on users",l(y)),F.onusers(y)),v&&(N.logger.info("sync::notifyDataAsync: on teams",d(v)),F.onteams(v)),b&&(N.logger.info("sync::notifyDataAsync: onSuperTeams",d(b)),F.onSuperTeams(b)),M&&M.length&&(M=M.filter(function(e){return N.mergeSession(e),!e.isDeleted&&(p.trim(e),!0);}),N.logger.info("sync::notifyDataAsync: on sessions",m(M),a.replaceLastMsg(M,!0)),F.onsessions(M)),R&&R.length&&(R.forEach(function(e){N.mergeSession(e),p.trim(e);}),N.logger.info("sync::notifyDataAsync: onStickTopSessions",m(R),a.replaceLastMsg(R,!0)),F.onStickTopSessions(R)),P&&P.forEach(function(e){"superTeam"===e.scene?i.push(e.timetag):r.push(e.timetag),(t=e.msgs).length&&(N.logger.info("sync::notifyDataAsync: on roaming msgs",e.sessionId,t.length),F.onroamingmsgs(e));}),C&&C.forEach(function(e){"superTeam"===e.scene?i.push(e.timetag):r.push(e.timetag),(t=e.msgs).length&&(N.logger.info("sync::notifyDataAsync: on offline msgs",e.sessionId,t.length),F.onofflinemsgs(e));}),I&&I.forEach(function(e){r.push(e.timetag),(t=e.msgs).length&&(N.logger.info("sync::notifyDataAsync: on offline filter msgs",e.sessionId,t.length),F.onofflinefiltermsgs(t));}),j&&(N.logger.info("sync::notifyDataAsync: on sessionsWithMoreRoaming",m(j)),F.onSessionsWithMoreRoaming(j));var o=[],c=[];q.deleteMsgSysMsgs&&q.deleteMsgSysMsgs.forEach(function(e){"roaming"===e.type?o=o.concat(e.sysMsgs):c=c.concat(e.sysMsgs);}),o.length&&(x=(x=x||[]).concat(o)),c.length&&(w=(w=w||[]).concat(c)),x&&(N.logger.info("sync::notifyDataAsync: on roaming sys msgs",x.length),F.onroamingsysmsgs(x)),w&&(N.logger.info("sync::notifyDataAsync: on offline sys msgs",w.length),F.onofflinesysmsgs(w)),O&&(N.logger.info("sync::notifyDataAsync: on offline filter sys msgs",O.length),F.onofflinefiltersysmsgs(O)),_&&(N.logger.info("sync::notifyDataAsync: on offline custom sys msgs",_.length),F.onofflinecustomsysmsgs(_)),A&&(N.logger.info("sync::notifyDataAsync: on offline filter custom sys msgs",A.length),F.onofflinefiltercustomsysmsgs(A)),E&&(E=a.merge({},N.sysMsgUnread,E),N.sysMsgUnread=a.merge({},E),N.logger.info("sync::notifyDataAsync: on sysMsgUnread",E),F.onsysmsgunread(E));var u=N.getPushNotificationMultiportConfig();N.logger.info("sync::notifyDataAsync: on pushNotificationMultiportConfig",u),F.onPushNotificationMultiportConfig(u);var g=i.length&&Math.max.apply(Math,i);if(e=r.length&&Math.max.apply(Math,r),D.enable){var T=[];g&&T.push(N.db.updateSuperTeamRoamingMsgTimetag(g)),e&&T.push(N.db.updateRoamingMsgTimetag(e)),Promise.all(T).then(z).catch(z);}else N.timetags.superTeamRoamingMsgs=g,N.timetags.roamingMsgs=e,z();N.syncPromiseArray=[],N.syncResult={};}function z(){if(N.processUnsettledMsgs(),N.processUnsettledSysMsgs(),N.syncing&&F.onsyncdone(),N.syncing=!1,F.syncTeamMembers&&v&&v.length)throw new c("sync team members api deprecated!");}B&&B.length?Promise.all(B).then(H).catch(function(e){H(),N.logger.error(e),e.callFunc="sync::onSyncDone",e.message="afterSync syncNormalPromise 出错",N.onCustomError("SYNC_promiseArray_ERROR",e);}):H();},o.syncTeamMembers=function(e){var t,n,r=this;t=r.timetags,n={},t=t||{},e.forEach(function(e){n[e.teamId]=0;},r),r.sendCmd("syncTeamMembers",{sync:n},r.onSyncTeamMembers.bind(r));},o.onSyncTeamMembers=function(e,t){e.callFunc="sync::onSyncTeamMembers",e.message="同步群成员错误",this.onCustomError("SYNC_TEAM_MEMBERS_ERROR",e);},o.onSyncTeamMembersDone=function(){var e,t=this,n=t.db,r=t.options,s=t.syncTeamMembersResult,i=t.syncTeamMembersPromiseArray;function o(){t.logger.log("sync::onSyncTeamMembersDone: afterSync",a.promises2cmds(i)),i=[],n.enable&&!t.hasSyncedTeamMembers?(t.hasSyncedTeamMembers=!0,function(){if(!r.syncTeams||!r.syncTeamMembers)return m();n.getTeams().then(function(n){n.forEach(function(n){var r=n.teamId;e=new Promise(function(e,n){t.api.getTeamMembers({teamId:r,done:function done(t,i){t&&n({callFunc:"sync::getTeamMembers: teamId-"+r,message:"sync team members error"}),s[r]=i.members||[],e();}});}),i.push(e);}),i.length?Promise.all(i).then(c,function(e){e.callFunc="sync::onSyncTeamMembersDone",e.message="pullFullData promiseArray notifyData 错误",t.onCustomError("SYNC_TEAM_MEMBERS_ERROR",e);}):c();},function(e){e.callFunc="sync::onSyncTeamMembersDone",e.message="pullFullData getTeams 错误",t.onCustomError("SYNC_TEAM_MEMBERS_ERROR",e);});}()):c();}function c(){setTimeout(u,0);}function u(){var e,n;Object.keys(s).forEach(function(i){-1===i.indexOf("invalid")&&(e=s[i],n=s[i+"-invalid"]||[],e.invalid=n,function(e,n){t.logger.info("sync::onSyncTeamMembersDone: onTeamMembers",e,l(n),n),r.onteammembers({teamId:e,members:n});}(i,e));}),m();}function m(){t.logger.info("sync::onSyncTeamMembersDone: bingo"),r.onsyncteammembersdone(),t.syncTeamMembersResult=null,t.syncTeamMembersPromiseArray=null;}i.length?Promise.all(i).then(o,function(e){e.callFunc="sync::onSyncTeamMembersDone",e.message="同步群成员 syncTeamMembersPromiseArray 错误",t.onCustomError("SYNC_TEAM_MEMBERS_ERROR",e);}).catch(function(e){t.logger.log("sync::onSyncTeamMembersDone: syncTeamMembersPromiseArray promise ",e),o();}):o();};},function(e,t,n){"use strict";var r=n(8).fn,s=n(84);r.assembleLogin=function(){var e=this.assembleIMLogin();return this.addPushInfo instanceof Function?this.addPushInfo(e):Promise.resolve({login:e});},r.afterLogin=function(){var e=this,t=this;t.sendCmd("getNosCdnHost",{});var n=new Date().getTime();t.sendCmd("getServerTime",{},function(e,r){if(e)t.logger.error("Calculate Delay time, getServerTime error",e);else if(r){var s=new Date().getTime(),i=(s-n)/2,o=r.getTime?r.getTime():r;t.relativeSeverTime=parseInt(s-o-i);}else t.logger.warn("Calculate Delay time, getServerTime not correct");}),this.initPush instanceof Function&&this.initPush();var r=this.db;if(r.enable){var s=this.account;this.options.appendAppKeyForDBName&&(s+="-"+this.options.appKey),this.db.init(s).then(function(){e.notifyLogin(),e.syncData();},function(t){e.logger.warn("link::afterLogin: no db",t),r.reset(!1),e.notifyLogin(),e.syncData();});}else this.logger.info("link::afterLogin: no db"),this.notifyLogin(),this.syncData();},r.processAuth=function(e){switch(e.cmd){case"login":e.error||(e.content=e.content||{},this.loginAndroidPush&&this.loginAndroidPush(e.content.aosPushInfo||{}),e.obj=e.content.loginRes,this.connectionId=e.content.loginRes.connectionId,this.onLoginPortsChange(e,2));break;case"kicked":return void this.onKicked(e);case"multiPortLogin":this.onLoginPortsChange(e,e.content.state);break;case"kick":e.error||(e.obj.deviceIds=e.content.deviceIds);}},r.onLoginPortsChange=function(e,t){var n=this,r=e.content.loginPorts;if(r&&r.length){var i=!0;switch(t){case 2:i=!0;break;case 3:i=!1;}r.forEach(function(e){e.type=s.reverseType(e.type),e.time=+e.time,e.online=i;}),(r=r.filter(function(e){return e.connectionId!==n.connectionId;})).length&&(n.logger.info("link::onLoginPortsChange:",r),n.options.onloginportschange(r));}},r.kickedReasons=["","samePlatformKick","serverKick","otherPlatformKick","silentlyKick"],r.kickedMessages=["","不允许同一个帐号在多个地方同时登录","被服务器踢了","被其它端踢了","悄悄被踢"];},function(e,t,n){"use strict";var r=n(8).fn,s=n(3),i=n(0),o=n(30);function a(e){return new Promise(function(t,n){s.isWeixinApp?wx.request({url:e,success:function success(e){var r=e&&e.statusCode,s=e&&e.data;200===r?t(s):n(s);},fail:function fail(e){n(e);}}):o(e,{proxyUrl:i.url2origin(e)+"/lbs/res/cors/nej_proxy_frame.html",timeout:s.xhrTimeout,onload:function onload(e){t(JSON.parse(e));},onerror:function onerror(e){n(e);}});});}function c(e,t){var n=this;n.socketUrls=[],n.msgStatEnable=!!e.common["msg.stat.enable"],n.msgStatEnable&&(n.msgDelayTimer=setTimeout(n.doReportMsgDelay.bind(n),1e4)),e.common.link.forEach(function(e){n.socketUrls.push(s.formatSocketUrl({url:e,secure:n.options.secure}));}),e.common["link.default"].forEach(function(e){e=s.formatSocketUrl({url:e,secure:n.options.secure}),-1===n.socketUrls.indexOf(e)&&n.socketUrls.push(e);});try{s.uploadUrl=e.nosup[0];}catch(e){}if(s.chunkUploadUrl=s.chunkUploadUrl||e["nos-chunk"]||"",n.logger.info("link::refreshSocketUrl: "+t+" ajax load , got socket urls ",n.socketUrls),n.connectToUrl(n.getNextSocketUrl()),s.hasLocalStorage){e.common["lbs.backup"]&&n.options.lbsBackup&&localStorage.setItem("nim_lbs_backup",JSON.stringify(e.common["lbs.backup"]));var r=i.get(e,"common.report.apierror.on");e.common.report&&localStorage.setItem("nim_lbs_fail_report_on",!1===r?"0":"1");var o=i.get(e,"common.report.apierror.threshold.time");o&&localStorage.setItem("nim_lbs_fail_report_time",o);}}r.probeIp=function(){var e=this,t=s.ipProbeAddr,n=0,r=-1;function i(t){2===++n&&(n=-1,e.doRefreshSocketUrl(r));}o(t.ipv4,{timeout:2e3,onerror:i,onload:function onload(e){r++,i();}}),o(t.ipv6,{timeout:2e3,onerror:i,onload:function onload(e){r+=2,i();}}),setTimeout(function(){n||-1===r||(n=-1,e.doRefreshSocketUrl(r));},100);},r.refreshSocketUrl=function(){s.isWeixinApp?this.doRefreshSocketUrl(2):2===this.options.ipVersion?this.probeIp():this.doRefreshSocketUrl(this.options.ipVersion);},r.doRefreshSocketUrl=function(e){var t=this,n=t.options,r=s.info,o=n.lbsUrl;1!==e&&2!==e&&(e=0),s.ipVersion=e,o=o+i.genUrlSep(o)+"k="+n.appKey+"&id="+n.account+"&sv="+r.sdkVersion+"&pv="+r.protocolVersion+"&networkType="+e,t.logger.info("link::refreshSocketUrl: ajax "+o);var u=new Date().getTime();a(o).then(function(e){c.call(t,e,o);}).catch(function(m){if(t.logger.error("link::refreshSocketUrl: "+o+" ajax lbs error",m),d.call(t,o,m,u),t.options.lbsBackup){var l=t.options.lbsBackupUrlsCustomer||[],f=[];s.hasLocalStorage&&(f=(f=localStorage.getItem("nim_lbs_backup"))?JSON.parse(f):[]);var g=f.concat(l);g=g.map(function(t){return t+i.genUrlSep(t)+"k="+n.appKey+"&id="+n.account+"&sv="+r.sdkVersion+"&pv="+r.protocolVersion+"&networkType="+e;}),function(e){var t=this;if(!(e&&e.length>0))return void p.call(t);t.logger.info("link::refreshSocketUrl: use backup lbs url",e);var n=0,r=0,s=!1,i=setInterval(function(){var o,u;n<e.length?(t.logger.info("link::refreshSocketUrl: backup lbs ajax "+e[n]),o=e[n],u=new Date().getTime(),a(o).then(function(e){i&&clearInterval(i),!1===s&&c.call(t,e,o),s=!0;}).catch(function(n){if(r+=1,t.logger.error("link::refreshSocketUrl: "+o+" ajax lbs error",n),d.call(t,o,n,u),s)return i&&clearInterval(i),void t.logger.info("link::refreshSocketUrl: "+o+" ajax lbs error, but it has been successful",n);r>=e.length&&(i&&clearInterval(i),t.logger.warn("link::refreshSocketUrl backup lbs all failed attempts，now attempt to connect socket url"),p.call(t));})):(i&&clearInterval(i),t.logger.warn("link::refreshSocketUrl backup lbs all tried")),n+=1;},2e3);}.call(t,g);}else p.call(t);});};var u=[],m=null;if(s.hasLocalStorage){var l=localStorage.getItem("nim_lbs_fail_report_time");l=l?parseInt(l):6e4,m=i.throttle(function(){if(u.length>0){var e=JSON.stringify(u);o("https://statistic.live.126.net/statics/report/im/api/error",{method:"POST",timeout:2e3,headers:{"Content-Type":"application/json"},data:e,onload:function onload(){},onerror:function onerror(){var t=JSON.parse(e).concat(u);u=t.reduce(function(e,t){return e.some(function(e){return e.request_url===t.url&&e.error_code===t.code;})?e:(e.push(t),e);},[]);}}),u=[];}},l,{leading:!1});}function d(e,t,n){var r=new Date().getTime(),i=t.status||10001;(this.api.reportLogs({event:"nimlb",code:3001}),u.some(function(t){return t.request_url===e&&t.error_code===i;})||u.push({request_url:e,appkey:this.options.appKey,accid:this.options.account,timestamp:r,error_code:i,platform:"web",send_time:r-n}),s.hasLocalStorage)&&"0"!==localStorage.getItem("nim_lbs_fail_report_on")&&m&&m();}function p(){var e=s.getDefaultLinkUrl(this.options.secure);e?(this.logger.warn("link::refreshSocketUrl: use default link url",e),this.connectToUrl(e)):this.onDisconnect(1,"link::refreshSocketUrl");}},function(e,t,n){"use strict";var r=n(29).fn,s=n(0),i=s.notundef;r.putSession=function(e){var t=this,n=e.unread;return void 0===(e=s.merge({},e)).updateTime&&e.lastMsg&&e.lastMsg.time&&(e.updateTime=e.lastMsg.time),(e.lastMsg||!e.ack&&!e.msgReceiptTime)&&(e.isDeleted=!1),delete e.unread,this.modifyOrPut({table:"session",obj:e,key:"id",modifyObjWhenPut:{unread:0}}).catch(function(r){return t.notifyError&&t.notifyError(r),e.unread=n,Promise.resolve(e);});},r.getSessions=function(e){var t=!(e=e||{}).reverse,n=e.limit||100,r=e.lastSessionId,s=e.sessionId,o=!1,a=this,c=function c(){return!0;},u=function u(){return!0;};return i(s)?this.getSession(s,e.isDeleted):(i(r)&&(c=function c(e){return e.id===r&&(o=!0),o;}),e.includeDeleted||(u=function u(e){return!e.isDeleted;}),this.getAll("session",{index:"updateTime",desc:t,limit:n,filter:function filter(e){return c(e)&&u(e);}}).catch(function(e){a.notifyError&&a.notifyError(e);}));},r.getSession=function(e,t){var n=this;return this.get("session",e).then(function(e){return Promise.resolve(!t&&e&&e.isDeleted?void 0:e);}).catch(function(e){n.notifyError&&n.notifyError(e);});},r.updateSession=function(e){var t=this,n=e.id,r=s.filterObj(e,"ack unread lastMsg localCustom msgReceiptTime msgReceiptServerTime isTop topCustom isDeleted");return e.lastMsg&&(r.lastMsg=e.lastMsg),this.getOne("session",null,n,{modifyObj:r}).then(function(e){return e?t.logger.info("db::updateSession: "+n,s.replaceLastMsg(r)):t.logger.warn("db::updateSession: no record "+n),e;}).catch(function(e){t.notifyError&&t.notifyError(e);});},r.resetSessionUnread=function(e){return this.updateSession({id:e,unread:0});},r.getStickTopSessions=function(){var e=this;return this.getAll("session",{filter:function filter(e){return e&&e.isTop;}}).catch(function(t){e.notifyError&&e.notifyError(t);});},r.deleteSession=function(e){return this.remove("session",e);},r.deleteSessionLogic=function(e){var t=this;if(!Array.isArray(e))return this.getOne("session",null,e,{modifyObj:{isDeleted:!0}});var n=[];return e.forEach(function(e){n.push(t.getOne("session",null,e,{modifyObj:{isDeleted:!0}}));}),Promise.all(n);},r.putSessionsWithMoreRoaming=function(e){return this.put("sessionsWithMoreRoaming",e);},r.updateSessionsWithMoreRoaming=function(e){var t=e.id;return delete e.id,this.getOne("sessionsWithMoreRoaming",null,t,{modifyObj:e});},r.deleteSessionsWithMoreRoaming=function(e){return this.remove("sessionsWithMoreRoaming",e);},r.getSessionsWithMoreRoaming=function(e){return e?this.get("sessionsWithMoreRoaming",e):this.getAll("sessionsWithMoreRoaming");};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0);s.notundef;r.putBroadcastMsg=function(e){var t=this;return new Promise(function(n){s.isArray(e)||(e=[e]);var r=[],i=e.length;function o(){0===--i&&n(r);}e.forEach(function(e){e=s.copy(e),t.put("broadcastMsg",e).then(function(e){r.push(e[0]),o();},o);});});},r.getBroadcastMsgs=function(e){return e=e||{},this.getAll("broadcastMsg",e);};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0),i=s.notundef;r.putSysMsg=function(e){var t=this;return new Promise(function(n){if(s.isArray(e)||(e=[e]),!e[0].filter){var r=[],i=e.length;e.forEach(function(e){e=s.copy(e),t.put("sysMsg",e).then(function(e){r.push(e[0]),o();},o);});}function o(){0===--i&&n(r);}});},r.getSysMsgs=function(e){var t=!(e=e||{}).reverse,n=e.limit||100,r=null,s=null;e.category&&(r="category",s=e.category),e.type&&(r="type",s=e.type);var o,a=e.lastIdServer,c=!1,u=e.read;return(i(a)||i(u))&&(o=function o(e){return i(a)?(a=""+a,c?t():(e.idServer===a&&(c=!0),!1)):t();function t(){return!i(u)||e.read===u;}}),e={filter:o,desc:t,limit:n},r?this.getOnly("sysMsg",r,s,e):this.getAll("sysMsg",e);},r.getSysMsgByIdServer=function(e){return this.getOne("sysMsg","idServer",e);},r.updateSysMsg=function(e){var t=this;if(!e.filter){var n=""+e.idServer,r=s.filterObj(e,"read state error localCustom");return this.getOne("sysMsg","idServer",n,{modifyObj:r}).then(function(e){return e?t.logger.log("db::updateSysMsg: "+n,r):t.logger.warn("db::updateSession: "+n),e;});}},r.markSysMsgRead=function(e){var t=this;return new Promise(function(n,r){s.isArray(e)||(e=[e]);var i,o,a=[],c=[];e.forEach(function(e){i=t.getSysMsgByIdServer(e.idServer).then(function(e){e&&!e.read&&(o=t.updateSysMsg({idServer:e.idServer,read:!0}),c.push(o));},r),a.push(i);}),Promise.all(a).then(function(){Promise.all(c).then(function(e){n(e);},r);},r);});},r.deleteSysMsg=function(e){var t,n=this,r=[];return s.isArray(e)||(e=[e]),e.forEach(function(e){e=""+e,t=n.getOne("sysMsg","idServer",e,{remove:!0}),r.push(t);}),1===r.length?r[0]:Promise.all(r);},r.deleteAllSysMsgs=function(){var e=this.clearTable("sysMsg"),t=this.clearTable("sysMsgUnread");return Promise.all([e,t]);},r.getSysMsgUnread=function(){return this.getAll("sysMsgUnread").then(function(e){var t={};return e.forEach(function(e){t[e.type]=e.num;}),t;});},r.updateSysMsgUnread=function(e){var t=this;e=s.copy(e);var n=[];return Object.keys(e).forEach(function(t){n.push({type:t,num:e[t]});}),this.put("sysMsgUnread",n).then(function(){return t.logger.info("db::updateSysMsgUnread: ",e),e;});};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0),i=n(3);r.putMsg=function(e){var t=this;return s.isArray(e)||(e=[e]),!e.length||e[0].filter?Promise.resolve():(e=e.filter(function(e){return!e.ignore;}),t.put("msg1",e).catch(function(n){return t.notifyError&&t.notifyError(n),Promise.resolve(e,n);}));},r.putMsgReadDetail=function(e){var t=this;if(e.idClient)return this.put("msgReadDetail",e).catch(function(e){t.logger.error("putMsgReadDetail error",e);});},r.getMsgReadDetail=function(e){return this.getOne("msgReadDetail",null,e);},r.updateMsg=function(e){var t=this;if(!e.filter){var n=e.idClient,r=s.filterObj(e,"resend status idServer time localCustom commentTimetag comments hasSendAck");return t.getOne("msg1",null,n,{modifyObj:r}).then(function(e){return e?t.logger.info("db::updateMsg: "+n,r):t.logger.warn("db::updateMsg: no record "+n),e;}).catch(function(n){return t.notifyError&&t.notifyError(n),Promise.resolve(e);});}},r.updateMsgBatch=function(e){var t=this;if(i.isRN)this.logger.warn("react native can not support updateMsgBatch");else{this.checkDB();var n=this.server.getIndexedDB().transaction(["msg1"],"readwrite").objectStore("msg1");e.forEach(function(e){if(e.idClient){var r=n.get(e.idClient);r.onerror=function(e){t.logger.error("updateMsgBatch::store.get:error",e);},r.onsuccess=function(s){var i=r.result||e;n.put(Object.assign({},i,e)).onerror=function(e){t.logger.error("updateMsgBatch::store.put:error",e);};};}});}},r.getMsgs=function(e){return i.isBrowser?this.getMsgsIndexedDB(e):i.isRN?this.getMsgsRN(e):Promise.resolve();},r.getMsgsRN=function(e){var t={};return"number"==typeof e.start&&(t.lowerBound=["time",e.start]),"number"==typeof e.end&&e.end!==1/0&&(t.upperBound=["time",e.end]),t.desc=!1,t.index="time","boolean"==typeof e.desc&&(t.desc=e.desc),"number"==typeof e.limit&&(t.limit=e.limit),t.searchIndex=[],e.sessionId&&t.searchIndex.push(["sessionId",e.sessionId]),"string"==typeof e.type&&t.searchIndex.push(["type",e.type]),this.getAll("msg1",t);},r.getMsgsIndexedDB=function(e){this.checkDB();var t="time",n=!1,r=!1,i=(e=e||{}).sessionId||[],o=e.sessionIds||[];s.isString(i)?i=[i]:Array.isArray(i)||(i=[]),s.isString(o)?o=[o]:Array.isArray(o)||(o=[]);var a=i.concat(o);1===a.length?(n=!0,t="sessionTime",i=a[0]):a.length>1&&(n=!0,r=!0,o=a);var c=e.start||0,u=e.end||1/0,m=c,l=u;n&&!r&&(m=[i,c],l=[i,u]);var d=!1!==e.desc,p=e.limit||100,f=!1,g=!1,h=e.type||[],y=e.types||[];s.isString(h)?h=[h]:Array.isArray(h)||(h=[]),s.isString(y)?y=[y]:Array.isArray(y)||(y=[]);var v=h.concat(y);1===v.length?(f=!0,h=v[0]):v.length>1&&(f=!0,g=!0,y=v);var b=e.subTypes&&e.subTypes.length,T=e.keyword||"",S=e.filterFunc,M=void 0;return(r||f||T||b||s.isFunction(S))&&(M=function M(t){if(r&&-1===o.indexOf(t.sessionId))return!1;if(f)if(g){if(-1===y.indexOf(t.type))return!1;}else if(h!==t.type)return!1;if(b&&-1===e.subTypes.indexOf(t.subType))return!1;if(T&&-1===(t.text||t.tip||"").indexOf(T))return!1;return!S||S(t);}),this.server.query("msg1",t).bound(m,l,!0,!0).desc(d).limit(p).filter(M).execute();},r.getMsgCountAfterAck=function(e){return i.isBrowser?this.getMsgCountAfterAckIndexedDB(e):i.isRN?this.getMsgCountAfterAckRN(e):Promise.resolve();},r.getMsgCountAfterAckRN=function(e){var t=e=e||{},n=t.sessionId,r=t.ack;return this.checkDB(),this.getAll("msg1",{searchIndex:["sessionId",n],lowerBound:["time",r]}).then(function(t){var n=t.filter(function(t){return"out"!==t.flow&&!1!==t.isUnreadable&&("notification"!==t.type||e.shouldCountNotifyUnread(t));});return Promise.resolve(n.length);});},r.getMsgCountAfterAckIndexedDB=function(e){var t=(e=e||{}).sessionId;return this.checkDB(),this.server.query("msg1","sessionTime").bound([t,e.ack],[t,1/0],!0,!0).execute().then(function(t){var n=t.filter(function(t){return"out"!==t.flow&&!1!==t.isUnreadable&&("notification"!==t.type||e.shouldCountNotifyUnread(t));});return Promise.resolve(n.length);});},r.amendMsg=function(e){return e?(s.notexist(e.text)&&(e.text=""),e):null;},r.getMsgByIdClient=function(e){var t=this;return t.getOne("msg1",null,e).then(function(e){return t.amendMsg(e);});},r.getMsgsByIdClients=function(e){var t,n=this,r=[];return e.forEach(function(e){t=n.getMsgByIdClient(e),r.push(t);}),Promise.all(r);},r.clearSendingMsgs=function(){var e=this;return e.getOnly("msg1","status","sending",{modifyObj:{status:"fail"}}).then(function(t){e.logger.info("db::clearSendingMsgs: msgs send failed",t.map(function(e){return e.idClient;}));});},r.deleteMsg=function(e){var t,n=this,r=[];return s.isArray(e)||(e=[e]),e.forEach(function(e){t=n.getOne("msg1",null,e,{remove:!0}).then(function(e){return n.logger.info("db::deleteMsg:",Object.assign({},e,{text:"***"})),e;}),r.push(t);}),1===r.length?r[0]:Promise.all(r);},r.deleteMsgsBySessionId=function(e){var t=this,n=null,r=e.start,s=e.end;return void 0!==r&&void 0!==s?n=function n(e){return e>r&&e<s;}:void 0!==r?n=function n(e){return e>r;}:void 0!==s&&(n=function n(e){return e<s;}),n?t.getOnly("msg1","sessionId",e.sessionId).then(function(e){var r=[];return(e=e||[]).map(function(e){n(e.time)&&r.push(e.idClient);}),t.logger.info("db::deleteMsgsBySessionId: session results",r),t.deleteMsg(r);}):t.getOnly("msg1","sessionId",e.sessionId,{remove:!0});},r.deleteMsgsByTime=function(e){return this.remove("msg1",null,"time",e.start,e.end,!0,!0);},r.deleteAllMsgs=function(){var e=this.clearTable("msg1"),t=this.clearTable("session");return Promise.all([e,t]);},r.getMsgPins=function(e){return this.getOnly("msgPin","sessionId",e);},r.deleteMsgPins=function(e){return this.getOnly("msgPin","sessionId",e,{remove:!0});},r.putMsgPin=function(e){var t=this;return this.modifyOrPut({table:"msgPin",obj:e,key:"idClient"}).catch(function(e){t.notifyError&&t.notifyError(e);});},r.putMsgPins=function(e){return this.put("msgPin",e);},r.deleteMsgPin=function(e){var t=this;return this.getOne("msgPin",null,e.idClient,{remove:!0}).then(function(e){return t.logger.info("db::deleteMsgPin:",Object.assign({},e,{text:"***"})),e;});};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0);r.mergeMyInfo=function(e,t){var n=this;return n.put("user",e).then(function(){return t?n.updateMyInfoTimetag(e.updateTime):e;});},r.mergeFriendUsers=function(e,t){var n=this;return n.putUsers(e).then(function(){n.updateFriendUserTimetag(t);});},r.putUsers=function(e){return this.put("user",e);},r.putUser=function(e){return this.put("user",e);},r.updateUser=function(e){var t=this,n=(e=s.copy(e)).account;return this.getOne("user",null,n,{modifyObj:e}).then(function(r){return r?t.logger.log("db::updateUser: "+n,e):t.logger.warn("db::updateUser: no record "+n),r;});},r.putUsersIfIsFriend=function(e){var t,n=this,r=[],s=[];return e.forEach(function(e){t=n.getFriend(e.account).then(function(r){return r&&(t=n.putUser(e),s.push(t)),r;}),r.push(t);}),Promise.all(r).then(function(){return Promise.all(s).then(function(e){return e;});});},r.deleteUser=function(e){return this.remove("user",e);},r.getUser=function(e){return this.getOne("user",null,e);},r.getUsers=function(e){return this.getAll("user",{filter:function filter(t){return-1!==e.indexOf(t.account);}});},r.getAllUsers=function(){return this.getAll("user");};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0),i=n(15),o=n(152),a=n(112);function c(e){return e.valid&&e.validToCurrentUser;}function u(e){return e&&s.fillUndef(e,{mute:!1,custom:""}),e;}r.mergeSuperTeams=function(e,t,n){var r=this,s=r.put("superTeam",e),i=r.leaveTeams(t,n);return Promise.all([s,i]).then(function(){return r.logger.log("db::mergeSuperTeams:"),r.updateSuperTeamTimetag(n),[e,t,n];});},r.putSuperTeam=function(e){if(e)return s.isArray(e)||(e=[e]),e.forEach(function(e){e.validToCurrentUser=!0;}),this.put("superTeam",e);},r.updateSuperTeam=function(e){var t=this,n=(e=s.copy(e)).teamId;return t.getOne("superTeam",null,n,{modifyObj:e}).then(function(r){return r?(t.logger.info("db::updateSuperTeam: "+n,e),r):(t.logger.warn("db::updateSuperTeam: no record "+n),t.putSuperTeam(e));});},r.leaveSuperTeam=function(e){var t=this;return t.updateSuperTeam({teamId:e,validToCurrentUser:!1}).then(function(){return t.removeAllSuperTeamMembers(e);});},r.dismissSuperTeam=function(e,t){var n=this,r={teamId:e,valid:!1,validToCurrentUser:!1,updateTime:t};return n.updateSuperTeam(r).then(function(){return n.removeAllSuperTeamMembers(e);});},r.leaveSuperTeams=function(e,t){var n,r=this,s=[];return e.forEach(function(e){n=r.leaveSuperTeam(e.teamId,t),s.push(n);}),Promise.all(s);},r.getSuperTeamsByTeamIds=function(e){var t,n=this,r=[];return e.forEach(function(e){t=n.getSuperTeam(e),r.push(t);}),Promise.all(r);},r.getSuperTeam=function(e){e=""+e;var t=this;return t.getOne("superTeam",null,e).then(function(e){return e?(t.updateSuperTeamProperties([e]),e):null;});},r.getSuperTeams=function(){var e=this;return e.getAll("superTeam",{filter:c}).then(function(t){return e.updateSuperTeamProperties(t),t;});},r.updateSuperTeamProperties=function(e){e.forEach(function(e){e&&o.fillProperties(e);});},r.mergeSuperTeamMembers=function(e,t,n,r){var s=this,i=s.putSuperTeamMembers(t),o=s.updateSuperTeamMembers(n);return Promise.all([i,o]).then(function(){return s.logger.log("db::mergeSuperTeamMembers: "+e),null!=r?s.updateSuperTeamMemberTimetag(e,r):Promise.resolve();});},r.putSuperTeamMembers=function(e){return this.put("superTeamMember",e);},r.getSuperTeamMemberById=function(e){return this.get("superTeamMember",e);},r.getSuperTeamMembers=function(e,t){var n=this;e=""+e;var r={filter:function filter(e){return e.valid;},mapper:u};if(t){if("number"!=typeof t.joinTime)return void n.logger.error("db::getSuperTeamMembers::params.joinTime should be number, not ",t.joinTime);t.limit&&(r.limit=t.limit),t.reverse?r.filter=function(e){return e.valid&&e.joinTime<=t.joinTime;}:r.filter=function(e){return e.valid&&e.joinTime>=t.joinTime;};}return n.getOnly("superTeamMember","teamId",e,r).then(function(e){return n.updateSuperTeamMemberProperties(e).then(function(){return e;});});},r.updateSuperTeamMemberProperties=function(e){var t,n=this,r=[];return e.forEach(function(e){a.fillProperties(e)&&(t=n.updateSuperTeamMember(e),r.push(t));}),Promise.all(r);},r.getInvalidSuperTeamMembers=function(e,t){var n=this;e=""+e;var r,s=[];return t.forEach(function(t){r=n.getOne("superTeamMember","id",a.genId(e,t)).then(function(e){return u(e);}),s.push(r);}),Promise.all(s);},r.updateSuperTeamMember=function(e){var t=this,n=e.teamId,r=e.account,i=a.genId(n,r),o=s.filterObj(e,"nickInTeam muteTeam mute custom updateTime type valid");return this.getOne("superTeamMember","id",i,{modifyObj:o,mapper:u}).then(function(e){return e?t.logger.log("db::updateSuperTeamMember: "+n+" "+r,o):t.logger.warn("db::updateSuperTeam: no record "+n+" "+r),e;});},r.updateSuperTeamMembers=function(e){var t=this;if(!e.length)return Promise.resolve();var n,r=[];return e.forEach(function(e){n=t.updateSuperTeamMember(e),r.push(n);}),Promise.all(r);},r.removeSuperTeamMembersByAccounts=function(e,t){var n=t.map(function(t){return{teamId:e,account:t,valid:!1};});return this.updateSuperTeamMembers(n);},r.removeAllSuperTeamMembers=function(e){var t=this;return t.getOnly("superTeamMember","teamId",e,{modifyObj:{valid:!1}}).then(function(){return t.logger.warn("db::removeAllSuperTeamMembers: "+e),t.deleteSuperTeamMemberTimetag(e);});},r.deleteSuperTeamMembers=function(e){var t=this;return t.getOnly("superTeamMember","teamId",e,{remove:!0}).then(function(){t.logger.warn("db::deleteSuperTeamMembers: "+e),t.deleteSuperTeamMemberTimetag(e);});},r.deleteSuperTeam=function(e){var t,n=this,r=[];return s.isArray(e)||(e=[e]),e.forEach(function(e){e=""+e,t=n.get("superTeam",e).then(function(t){if(t&&c(t))throw i.stillInTeamError({callFunc:"team::deleteTeam",team:t});var r=n.remove("superTeam",e),s=n.deleteSuperTeamMembers(e);return Promise.all([r,s]);}),r.push(t);}),1===r.length?r[0]:Promise.all(r);},r.transferSuperTeam=function(e,t,n){var r=this;return r.updateSuperTeamMembers([t,n]).then(function(){return r.putSuperTeam(e).then(function(){return r.logger.info("db::transferSuperTeam: "+e.teamId+" "+t.account+" -> "+n.account),[e,t,n];});});};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0),i=n(15),o=n(85),a=n(70);function c(e){return e.valid&&e.validToCurrentUser;}function u(e){return e&&e.valid;}function m(e){return e&&s.fillUndef(e,{mute:!1,custom:""}),e;}r.mergeTeams=function(e,t,n){var r=this,s=r.put("team",e),i=r.leaveTeams(t,n);return Promise.all([s,i]).then(function(){return r.logger.log("db::mergeTeams:"),r.updateTeamTimetag(n),[e,t,n];});},r.putTeam=function(e){if(e)return s.isArray(e)||(e=[e]),e.forEach(function(e){e.validToCurrentUser=!0;}),this.put("team",e);},r.updateTeam=function(e){var t=this,n=(e=s.copy(e)).teamId;return t.getOne("team",null,n,{modifyObj:e}).then(function(r){if(r)t.logger.log("db::updateTeam: "+n,e);else if(t.logger.warn("db::updateTeam: no record "+n),e.validToCurrentUser)return t.putTeam(e);return r;});},r.transferTeam=function(e,t,n){var r=this,s=e.teamId,i=e.memberUpdateTime,o={teamId:s,account:t,type:"normal",updateTime:i},a={teamId:s,account:n,type:"owner",updateTime:i};return r.updateTeamMembers([o,a]).then(function(){return r.putTeam(e).then(function(){return r.logger.info("db::transferTeam: "+e.teamId+" "+t+" -> "+n),[e,t,n];});});},r.leaveTeam=function(e){var t=this;return t.updateTeam({teamId:e,validToCurrentUser:!1}).then(function(){return t.removeAllTeamMembers(e);});},r.dismissTeam=function(e,t){var n=this,r={teamId:e,valid:!1,validToCurrentUser:!1,updateTime:t};return n.updateTeam(r).then(function(){return n.removeAllTeamMembers(e);});},r.leaveTeams=function(e,t){var n,r=this,s=[];return e.forEach(function(e){n=r.leaveTeam(e.teamId,t),s.push(n);}),Promise.all(s);},r.getTeamsByTeamIds=function(e){var t,n=this,r=[];return e.forEach(function(e){t=n.getTeam(e),r.push(t);}),Promise.all(r);},r.getTeam=function(e){e=""+e;var t=this;return t.getOne("team",null,e).then(function(e){return e?(t.updateTeamProperties([e]),e):null;});},r.getTeams=function(){var e=this;return e.getAll("team",{filter:c}).then(function(t){return e.updateTeamProperties(t),t;});},r.updateTeamProperties=function(e){e.forEach(function(e){e&&o.fillProperties(e);});},r.mergeTeamMembers=function(e,t,n,r){var s=this,i=s.putTeamMembers(t),o=s.updateTeamMembers(n);return Promise.all([i,o]).then(function(){return s.logger.log("db::mergeTeamMembers: "+e),s.updateTeamMemberTimetag(e,r);});},r.putTeamMembers=function(e){return this.put("teamMember",e);},r.getTeamMembersByAccount=function(e){return this.getOnly("teamMember","account",e,{filter:u,mapper:m}).then();},r.getTeamMembers=function(e){var t=this;e=""+e;return t.getOnly("teamMember","teamId",e,{filter:function filter(e){return e.valid;},mapper:m}).then(function(e){return t.updateTeamMemberProperties(e).then(function(){return e;});});},r.updateTeamMemberProperties=function(e){var t,n=this,r=[];return e.forEach(function(e){a.fillProperties(e)&&(t=n.updateTeamMember(e),r.push(t));}),Promise.all(r);},r.getInvalidTeamMembers=function(e,t){var n=this;e=""+e;var r,s=[];return t.forEach(function(t){r=n.getOne("teamMember",null,a.genId(e,t)).then(function(e){return m(e);}),s.push(r);}),Promise.all(s);},r.updateTeamMember=function(e){var t=this,n=e.teamId,r=e.account,i=a.genId(n,r),o=s.filterObj(e,"nickInTeam muteTeam mute custom updateTime type valid");return this.getOne("teamMember",null,i,{modifyObj:o,mapper:m}).then(function(e){return e?t.logger.log("db::updateTeamMember: "+n+" "+r,o):t.logger.warn("db::updateTeam: no record "+n+" "+r),e;});},r.updateTeamMembers=function(e){var t=this;if(!e.length)return Promise.resolve();var n,r=[];return e.forEach(function(e){n=t.updateTeamMember(e),r.push(n);}),Promise.all(r);},r.updateTeamManagers=function(e,t,n,r){var s=t.map(function(t){return{teamId:e,account:t,type:n?"manager":"normal",updateTime:r};});return this.updateTeamMembers(s);},r.removeTeamMembersByAccounts=function(e,t){var n=t.map(function(t){return{teamId:e,account:t,valid:!1};});return this.updateTeamMembers(n);},r.removeAllTeamMembers=function(e){var t=this;return t.getOnly("teamMember","teamId",e,{modifyObj:{valid:!1}}).then(function(){return t.logger.warn("db::removeAllTeamMembers: "+e),t.deleteTeamMemberTimetag(e);});},r.deleteTeamMembers=function(e){var t=this;return t.getOnly("teamMember","teamId",e,{remove:!0}).then(function(){t.logger.warn("db::deleteTeamMembers: "+e),t.deleteTeamMemberTimetag(e);});},r.deleteTeam=function(e){var t,n=this,r=[];return s.isArray(e)||(e=[e]),e.forEach(function(e){e=""+e,t=n.get("team",e).then(function(t){if(t&&c(t))throw i.stillInTeamError({callFunc:"team::deleteTeam",team:t});var r=n.remove("team",e),s=n.deleteTeamMembers(e);return Promise.all([r,s]);}),r.push(t);}),1===r.length?r[0]:Promise.all(r);};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0);r.mergeFriends=function(e,t,n){var r=this;return r.updateAndDelete("friend",e,t).then(function(){return r.logger.log("db::mergeFriends: updateAndDelete done",e),n&&r.updateFriendTimetag(n),[e,t,n];});},r.putFriend=function(e){return this.put("friend",e);},r.updateFriend=function(e){var t=this,n=(e=s.copy(e)).account;return this.getOne("friend",null,n,{modifyObj:e}).then(function(r){return r?t.logger.log("db::updateFriend: "+n,e):t.logger.warn("db::updateFriend: no record "+n),r;});},r.deleteFriend=function(e){var t=this.remove("friend",e),n=this.deleteUser(e);return Promise.all([t,n]);},r.getFriends=function(){return this.getAll("friend",{filter:function filter(e){return e.valid;}});},r.getFriend=function(e){return this.getOne("friend",null,e);};},function(e,t,n){"use strict";var r=n(29).fn,s=n(0);r.mergeRelations=function(e,t,n,r,s){var i=this,o=i.updateAndDelete("blacklist",e,t),a=i.updateAndDelete("mutelist",n,r);return Promise.all([o,a]).then(function(){return i.logger.info("db::mergeRelations: timetag "+s),i.updateRelationTimetag(s),[e,t,n,r,s];});},r.getRelations=function(){var e=this.getAll("blacklist"),t=this.getAll("mutelist");return Promise.all([e,t]);},r.markInBlacklist=function(e){if((e=s.copy(e)).isAdd){var t=e.record;return this.put("blacklist",t);}var n=e.account;return this.remove("blacklist",n);},r.markInMutelist=function(e){if((e=s.copy(e)).isAdd){var t=e.record;return this.put("mutelist",t);}var n=e.account;return this.remove("mutelist",n);};},function(e,t,n){"use strict";var r=n(29).fn;r.getTimetags=function(e){var t={};return this.getAll("timetag",{filter:e,mapper:function mapper(e){return-1!==e.name.indexOf("team-")?t[e.name]=0:t[e.name]=e.value,e;}}).then(function(){return t;});},r.getTeamMemberTimetags=function(){return this.getTimetags(function(e){return-1!==e.name.indexOf("team-");});},r.getTimetag=function(e){return this.getOne("timetag",null,e).then(function(e){return(e=e||{value:0}).value;});},r.getTeamMemberTimetag=function(e){return 0;},r.updateTimetag=function(e,t){var n=this,r={name:e,value:t};return this.put("timetag",r).catch(function(e){n.notifyError&&n.notifyError(e);});},r.updateMyInfoTimetag=function(e){return this.updateTimetag("myInfo",e);},r.updateRelationTimetag=function(e){return this.updateTimetag("relations",e);},r.getRelationsTimetag=function(){return this.getTimetag("relations");},r.updateFriendTimetag=function(e){return this.updateTimetag("friends",e);},r.getFriendsTimetag=function(){return this.getTimetag("friends");},r.updateFriendUserTimetag=function(e){return this.updateTimetag("friendUsers",e);},r.updateTeamTimetag=function(e){return this.updateTimetag("teams",e);},r.getTeamsTimetag=function(){return this.getTimetag("teams");},r.updateSuperTeamTimetag=function(e){return this.updateTimetag("superTeams",e);},r.getSuperTeamsTimetag=function(){return this.getTimetag("superTeams");},r.updateTeamMemberTimetag=function(e,t){return this.updateTimetag("team-"+e,t);},r.getTeamMembersTimetag=function(e){return this.getTimetag("team-"+e);},r.updateSuperTeamMemberTimetag=function(e,t){return this.updateTimetag("superTeam-"+e,t);},r.getSuperTeamMembersTimetag=function(e){return this.getTimetag("superTeam-"+e);},r.updateMyTeamMembersTimetag=function(e){return this.updateTimetag("myTeamMembers",e);},r.getBroadcastMsgTimetag=function(e){return this.getTimetag("broadcastMsg");},r.updateBroadcastMsgTimetag=function(e){return this.updateTimetag("broadcastMsg",parseInt(e));},r.updateRoamingMsgTimetag=function(e){return this.updateTimetag("roamingMsgs",e);},r.updateSuperTeamRoamingMsgTimetag=function(e){return this.updateTimetag("superTeamRoamingMsgs",e);},r.updateMsgReceiptsTimetag=function(e){return this.updateTimetag("msgReceipts",e);},r.updateDonnopTimetag=function(e){return this.updateTimetag("donnop",e);},r.updateSessionAck=function(e){return this.updateTimetag("sessionAck",e);},r.updateDeleteMsgSelf=function(e){return this.updateTimetag("deleteMsgSelf",e);},r.updateSuperTeamSessionAck=function(e){return this.updateTimetag("superTeamSessionAck",e);},r.deleteTimetag=function(e){return this.remove("timetag",e);},r.deleteTeamMemberTimetag=function(e){return this.deleteTimetag("team-"+e);},r.deleteSuperTeamMemberTimetag=function(e){return this.deleteTimetag("superTeam-"+e);};},function(e,t,n){"use strict";var r=n(29).fn;r.setKey=function(e,t){return this.put("kv",{key:e,value:t});},r.getKey=function(e){return this.get("kv",e).then(function(e){return e&&e.value;});},r.setDonnop=function(e){return this.setKey("donnop",e);},r.getDonnop=function(){return this.getKey("donnop");};},function(e,t,n){"use strict";function r(e){this.concurrency=0,this.pendingTasks=[],this.queue=Promise.resolve(),this.logger=e.logger,this.notifyError=e.notifyError,this.enable=!1,this.server=null,this.name=null;}var s=r.prototype;s.reset=function(e){this.enable=!1;},s.clear=s.destroy=s.close=s.remove=s.init=function(e){return Promise.resolve();},e.exports=r;},function(e,t,n){"use strict";n(176);var r=n(12);n(145)(r),e.exports=r;}]);

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map