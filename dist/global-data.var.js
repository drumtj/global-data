!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.GD=n():e.GD=n().default}("undefined"!=typeof self?self:this,function(){return window.GD=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}t.r(n),t.d(n,"default",function(){return p});var u={},i={},f={},a=[],l=function(e,n){return e+"_"+n},c=function(e,n,t){var r=d(e),o=l(r,n);return void 0!==t&&(i[o]=t),Object.defineProperty(e,n,{set:function(n){f[o]&&(f[o](n,i[o]),function(e,n,t,r){for(var o=0;o<a.length;o++)a[o](e,n,t,r)}(e,o,n,i[o])),i[o]=n},get:function(){return i[o]},enumerable:!0,configurable:!0}),e._datakey},y=function(e){return!(!e||"string"!=typeof e||e.indexOf("..")>-1)},d=function(e){return e._datakey||Object.defineProperty(e,"_datakey",{value:Date.now(),writable:!1,enumerable:!1,configurable:!1}),e._datakey},s=function(e){if(""===e);else if(!y(e))throw new Error("wrong domain");var n=u;return e.split(".").forEach(function(e){e&&(n[e]&&"object"===o(n[e])||(n[e]={}),n=n[e])}),n},b=function(e){if(void 0===e||""===e)return u;if(!y(e))throw new Error("wrong domain");if(-1==e.lastIndexOf("."))return u[e];for(var n=u,t=e.split("."),r=0;r<t.length;r++)if(t[r]){if(!n[t[r]])return;n=n[t[r]]}return n},p=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,t,d;return n=e,d=[{key:"addSomeChangeListener",value:function(e){a.push(e)}},{key:"removeSomeChangeListener",value:function(e){for(var n=0;n<a.length;n++)return a[n],void a.splice(n,1)}},{key:"toJSON",value:function(e){var n=b(e);return n?JSON.stringify(n):null}},{key:"toObject",value:function(n){var t=e.toJSON(n);return t?JSON.parse(t):null}},{key:"clearCallback",value:function(){for(var e in f)delete f[e]}},{key:"clear",value:function(){for(var n in u)delete u[n];for(var t in i)delete i[t];e.clearCallback()}},{key:"watch",value:function(e,n,t){var r,o;if(void 0===e||""==e)e=u;else if(!e)throw new Error("object is null");return"string"==typeof e?void 0===(r=b(e))?(r=s(e),o=l(c(r,n),n)):o=l(c(r,n,r[n]),n):o=l(c(r=e,n,r[n]),n),f[o]=t,r}},{key:"create",value:function(n){return e.set(n,{})}},{key:"set",value:function(e,n){var t=function(e,n){if(!y(e))throw new Error("wrong domain");var t,r,i=function(e){var n,t,r=e.lastIndexOf(".");return-1==r?(n="",t=e):(n=e.substring(0,r),t=e.substring(r+1)),{dm:n,key:t}}(e);return""==i.dm?t=u:(t=b(i.dm))&&"object"===o(t)||(t=s(i.dm)),t[r=i.key]=n,{obj:t,key:r}}(e,n);return c(t.obj,t.key,n),n}},{key:"get",value:function(e){return b(e)}}],(t=null)&&r(n.prototype,t),d&&r(n,d),e}()}])});
//# sourceMappingURL=global-data.var.js.map