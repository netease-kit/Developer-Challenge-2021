(function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s="f28a")})({"00b0":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={navBar:n("4c4a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("nav-bar",{attrs:{_i:1}}),n("v-uni-view",{staticClass:t._$g(2,"sc"),attrs:{_i:2}},[t._l(t._$g(3,"f"),(function(e,r,i,a){return n("v-uni-view",{key:e,staticClass:t._$g("3-"+a,"sc"),attrs:{_i:"3-"+a},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v(t._$g("3-"+a,"t0-0"))])})),n("v-uni-view",{staticClass:t._$g(4,"sc"),attrs:{_i:4},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u56de\u5230\u9876\u90e8")])],2)],1)},a=[]},"0106":function(t,e,n){var r=n("b0f4");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("4a0b67bd",r,!0,{sourceMap:!1,shadowMode:!1})},"04a2":function(t,e,n){var r=n("d180");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("2fdea61e",r,!0,{sourceMap:!1,shadowMode:!1})},"0d5a":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".nav-bar[data-v-00360104]{width:100%;background-color:#333}.navbar-fixed[data-v-00360104]{position:fixed;left:0;right:0;top:0;z-index:991}.nav[data-v-00360104]{position:relative;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-bottom:1rpx solid silver;background-color:#333}.nav .title[data-v-00360104]{font-size:32rpx;color:#fff;font-weight:bolder}.nav .left[data-v-00360104]{position:absolute;left:40rpx}.nav .left uni-image[data-v-00360104]{width:30rpx;height:30rpx}",""]),t.exports=e},"158c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("4c4a"));function i(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{wxsProps:{}}},components:{NavBar:r.default}};e.default=a},"21dd":function(t,e,n){"use strict";n.r(e);var r=n("2258"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},2258:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"NavBar",props:["background","isBack","color","title","fixed"],data:function(){return{wxsProps:{}}},components:{}};e.default=r},2323:function(t,e,n){var r=n("ea76");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("f30ec3d0",r,!0,{sourceMap:!1,shadowMode:!1})},"24fb":function(t,e,n){"use strict";function r(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"===typeof btoa){var a=i(r),o=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(o).concat([a]).join("\n")}return[n].join("\n")}function i(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(n," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=r(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"===typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(i[o]=!0)}for(var u=0;u<t.length;u++){var c=[].concat(t[u]);r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}},2856:function(t,e,n){"use strict";var r=n("642c"),i=n.n(r);i.a},"31a3":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{attrs:{_i:0}})},a=[]},"31fa":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),class:t._$g(0,"c"),style:t._$g(0,"s"),attrs:{_i:0}},[n("v-uni-view",{staticClass:t._$g(1,"sc"),style:t._$g(1,"s"),attrs:{_i:1}}),n("v-uni-view",{staticClass:t._$g(2,"sc"),class:t._$g(2,"c"),style:t._$g(2,"s"),attrs:{_i:2}},[t._$g(3,"i")?n("v-uni-view",{staticClass:t._$g(3,"sc"),attrs:{_i:3},on:{click:function(e){return t.$handleViewEvent(e)}}},[n("v-uni-image",{staticStyle:{width:"30rpx",height:"30rpx"},attrs:{src:t._$g(4,"a-src"),_i:4}})],1):t._e(),n("v-uni-text",{staticClass:t._$g(5,"sc"),attrs:{_i:5}},[t._v(t._$g(5,"t0-0"))])],1)],1)},a=[]},"330e":function(t,e,n){"use strict";n.r(e);var r=n("c933"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"3a85":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".components[data-v-16834182]{width:100%;min-height:100%;background-color:#fff}.components .components-list[data-v-16834182]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}",""]),t.exports=e},"40f8":function(t,e,n){"use strict";n.r(e);var r=n("ba2b"),i=n("330e");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("5eb1");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},4247:function(t,e,n){"use strict";n.r(e);var r=n("db80"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"44ca":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("v-uni-scroll-view",{staticClass:t._$g(1,"sc"),staticStyle:{height:"1800rpx"},attrs:{"scroll-y":!0,_i:1}},t._l(20,(function(e,r,i,a){return n("v-uni-view",{key:e,staticClass:t._$g("2-"+a,"sc"),attrs:{_i:"2-"+a}},[n("v-uni-image",{staticClass:t._$g("3-"+a,"sc"),attrs:{src:"https://mahuapic.com/upload/vod/2019-10-01/15699382529.jpg",_i:"3-"+a}}),n("v-uni-view",{staticClass:t._$g("4-"+a,"sc"),attrs:{_i:"4-"+a}},[n("v-uni-text",{staticClass:t._$g("5-"+a,"sc"),attrs:{_i:"5-"+a}},[t._v("\u5f62\u5f0f\u641c\u5b9e\u6253\u5b9e")]),n("v-uni-text",{staticClass:t._$g("6-"+a,"sc"),attrs:{_i:"6-"+a}},[t._v("\u66f4\u65b0\u7b2c\u4e09\u8bdd")])],1)],1)})),1)],1)},a=[]},"44e4":function(t,e,n){"use strict";var r=n("0106"),i=n.n(r);i.a},4580:function(t,e,n){"use strict";n.r(e);var r=n("04a2"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},4768:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".movie{width:100%;background-color:#fff}.movie-list{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;background-color:#000;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap}.movie-item{width:220rpx;margin:8rpx;background-color:#fff}.pic{width:220rpx;height:310rpx;border-radius:10rpx}.movie-info{width:220rpx;padding-left:10rpx;padding-top:10rpx;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.name{width:220rpx;text-align:left;font-size:26rpx;color:#fff}.loa{width:220rpx;text-align:left;font-size:26rpx;color:silver}",""]),t.exports=e},"4a02":function(t,e,n){"use strict";n.r(e);var r=n("00b0"),i=n("76ff");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("e059");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},"4c4a":function(t,e,n){"use strict";n.r(e);var r=n("31fa"),i=n("21dd");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("5150");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"00360104",null,!1,r["a"],o);e["default"]=c.exports},5150:function(t,e,n){"use strict";var r=n("ea33"),i=n.n(r);i.a},"56d5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},"5eb1":function(t,e,n){"use strict";var r=n("2323"),i=n.n(r);i.a},"5fb7":function(t,e,n){"use strict";var r=n("f08c"),i=n.n(r);i.a},"642c":function(t,e,n){var r=n("3a85");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("0e97ea42",r,!0,{sourceMap:!1,shadowMode:!1})},6875:function(t,e,n){"use strict";n.r(e);var r=n("72cd"),i=n("4247");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},"71fe":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},7249:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={navBar:n("4c4a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("nav-bar",{attrs:{_i:1}})],1)},a=[]},"72cd":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{attrs:{_i:0}},[t._v("wode")])},a=[]},"76ff":function(t,e,n){"use strict";n.r(e);var r=n("bfd6"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"7f7e":function(t,e,n){"use strict";function r(t,e){for(var n=[],r={},i=0;i<e.length;i++){var a=e[i],o=a[0],u=a[1],c=a[2],s=a[3],f={id:t+":"+i,css:u,media:c,sourceMap:s};r[o]?r[o].parts.push(f):n.push(r[o]={id:o,parts:[f]})}return n}n.r(e),n.d(e,"default",(function(){return p}));var i="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},o=i&&(document.head||document.getElementsByTagName("head")[0]),u=null,c=0,s=!1,f=function(){},l=null,d="data-vue-ssr-id",v="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,n,i){s=n,l=i||{};var o=r(t,e);return b(o),function(e){for(var n=[],i=0;i<o.length;i++){var u=o[i],c=a[u.id];c.refs--,n.push(c)}e?(o=r(t,e),b(o)):o=[];for(i=0;i<n.length;i++){c=n[i];if(0===c.refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete a[c.id]}}}}function b(t){for(var e=0;e<t.length;e++){var n=t[e],r=a[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(g(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var o=[];for(i=0;i<n.parts.length;i++)o.push(g(n.parts[i]));a[n.id]={id:n.id,refs:1,parts:o}}}}function _(){var t=document.createElement("style");return t.type="text/css",o.appendChild(t),t}function g(t){var e,n,r=document.querySelector("style["+d+'~="'+t.id+'"]');if(r){if(s)return f;r.parentNode.removeChild(r)}if(v){var i=c++;r=u||(u=_()),e=w.bind(null,r,i,!1),n=w.bind(null,r,i,!0)}else r=_(),e=h.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function w(t,e,n,r){var i=n?"":P(r.css);if(t.styleSheet)t.styleSheet.cssText=x(e,i);else{var a=document.createTextNode(i),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}function h(t,e){var n=P(e.css),r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),l.ssrId&&t.setAttribute(d,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var m=/\b([+-]?\d+(\.\d+)?)[r|u]px\b/g,y=/var\(--status-bar-height\)/gi,k=/var\(--window-top\)/gi,$=/var\(--window-bottom\)/gi,C=/var\(--window-left\)/gi,j=/var\(--window-right\)/gi,M=!1;function P(t){if(!uni.canIUse("css.var")){!1===M&&(M=plus.navigator.getStatusbarHeight());var e={statusBarHeight:M,top:window.__WINDOW_TOP||0,bottom:window.__WINDOW_BOTTOM||0};t=t.replace(y,e.statusBarHeight+"px").replace(k,e.top+"px").replace($,e.bottom+"px").replace(C,"0px").replace(j,"0px")}return t.replace(/\{[\s\S]+?\}|@media.+\{/g,(function(t){return t.replace(m,(function(t,e){return uni.upx2px(e)+"px"}))}))}},"83dc":function(t,e,n){var r=n("b790");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("1d069d88",r,!0,{sourceMap:!1,shadowMode:!1})},"873e":function(t,e,n){"use strict";n.r(e);var r=n("158c"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},8893:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("4c4a"));function i(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{wxsProps:{}}},components:{NavBar:r.default}};e.default=a},9469:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={navBar:n("4c4a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("nav-bar",{attrs:{_i:1}}),n("v-uni-view",{staticClass:t._$g(2,"sc"),attrs:{_i:2}})],1)},a=[]},aa42:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={navBar:n("4c4a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("nav-bar",{attrs:{_i:1}}),n("v-uni-view",{staticClass:t._$g(2,"sc"),attrs:{_i:2},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("API")]),n("v-uni-view",{staticClass:t._$g(3,"sc"),attrs:{_i:3},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u7ec4\u4ef6")]),n("v-uni-view",{staticClass:t._$g(4,"sc"),attrs:{_i:4},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u63d2\u4ef6")])],1)},a=[]},ab0b:function(t,e,n){"use strict";n.r(e);var r=n("31a3"),i=n("ae7d");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},ab3c:function(t,e,n){"use strict";n.r(e);var r=n("7249"),i=n("873e");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},ae7d:function(t,e,n){"use strict";n.r(e);var r=n("56d5"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},b0f4:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".modules-api[data-v-2e245b26]{width:100%;min-height:100%;background-color:#fff}.modules-api .module[data-v-2e245b26]{width:100%;height:80rpx;line-height:80rpx;margin-bottom:20rpx;background-color:#f1f1f1;text-align:center;color:#666}",""]),t.exports=e},b6f7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},b790:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".content{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.func-list{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.func{width:100%;height:80rpx;margin-bottom:20rpx;background-color:#eee;text-align:center;line-height:80rpx}.top{background-color:#2589ff;color:#fff}",""]),t.exports=e},b8e5:function(t,e,n){"use strict";n.r(e);var r=n("71fe"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},ba2b:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={navBar:n("4c4a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{attrs:{_i:0}},[n("nav-bar",{attrs:{_i:1}}),n("v-uni-view",{staticClass:t._$g(2,"sc"),attrs:{_i:2}},[t._l(t._$g(3,"f"),(function(e,r,i,a){return n("v-uni-view",{key:e,staticClass:t._$g("3-"+a,"sc"),attrs:{_i:"3-"+a},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v(t._$g("3-"+a,"t0-0"))])})),n("v-uni-view",{staticClass:t._$g(4,"sc"),attrs:{_i:4},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u56de\u5230\u9876\u90e8")])],2)],1)},a=[]},bfd6:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("4c4a"));function i(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{wxsProps:{}}},components:{NavBar:r.default}};e.default=a},c0e7:function(t,e,n){"use strict";n.r(e);var r=n("aa42"),i=n("fd59");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("44e4");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"2e245b26",null,!1,r["a"],o);e["default"]=c.exports},c933:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},d180:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*\u6bcf\u4e2a\u9875\u9762\u516c\u5171css */",""]),t.exports=e},d268:function(t,e,n){"undefined"===typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){throw n}))}))}),window.__uniConfig={window:{navigationBarTextStyle:"black",navigationBarTitleText:"",navigationBarBackgroundColor:"#2b4b5b",backgroundColor:"#333333",animationType:"fade-in"}},uni.restoreGlobal&&uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),__definePage("pages/index/index",(function(){return Vue.extend(n("ab3c").default)})),__definePage("pages/community/community",(function(){return Vue.extend(n("ab0b").default)})),__definePage("pages/me/me",(function(){return Vue.extend(n("6875").default)})),__definePage("pages/modules/index/index",(function(){return Vue.extend(n("c0e7").default)})),__definePage("pages/modules/api/api",(function(){return Vue.extend(n("4a02").default)})),__definePage("pages/movie/movie",(function(){return Vue.extend(n("e411").default)})),__definePage("pages/modules/module/module",(function(){return Vue.extend(n("40f8").default)})),__definePage("pages/modules/components/components",(function(){return Vue.extend(n("ff97").default)}))},db80:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},e059:function(t,e,n){"use strict";var r=n("83dc"),i=n.n(r);i.a},e411:function(t,e,n){"use strict";n.r(e);var r=n("44ca"),i=n("f749");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("5fb7");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},ea33:function(t,e,n){var r=n("0d5a");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("a9977f28",r,!0,{sourceMap:!1,shadowMode:!1})},ea76:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".func-list{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.func{width:100%;height:80rpx;margin-bottom:20rpx;background-color:#eee;text-align:center;line-height:80rpx}.top{background-color:#2589ff;color:#fff}",""]),t.exports=e},f08c:function(t,e,n){var r=n("4768");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("94e959fe",r,!0,{sourceMap:!1,shadowMode:!1})},f0c5:function(t,e,n){"use strict";function r(t,e,n,r,i,a,o,u,c,s){var f,l="function"===typeof t?t.options:t;if(c){l.components||(l.components={});var d=Object.prototype.hasOwnProperty;for(var v in c)d.call(c,v)&&!d.call(l.components,v)&&(l.components[v]=c[v])}if(s&&((s.beforeCreate||(s.beforeCreate=[])).unshift((function(){this[s.__module]=this})),(l.mixins||(l.mixins=[])).push(s)),e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),o?(f=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=f):i&&(f=u?function(){i.call(this,this.$root.$options.shadowRoot)}:i),f)if(l.functional){l._injectStyles=f;var p=l.render;l.render=function(t,e){return f.call(e),p(t,e)}}else{var b=l.beforeCreate;l.beforeCreate=b?[].concat(b,f):[f]}return{exports:t,options:l}}n.d(e,"a",(function(){return r}))},f28a:function(t,e,n){"use strict";function r(){function t(t){var e=n("4580");e.__inject__&&e.__inject__(t)}"function"===typeof t&&t(),UniViewJSBridge.publishHandler("webviewReady")}n("d268"),"undefined"!==typeof plus?r():document.addEventListener("plusready",r)},f749:function(t,e,n){"use strict";n.r(e);var r=n("b6f7"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},fd59:function(t,e,n){"use strict";n.r(e);var r=n("8893"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},ff97:function(t,e,n){"use strict";n.r(e);var r=n("9469"),i=n("b8e5");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("2856");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"16834182",null,!1,r["a"],o);e["default"]=c.exports}});