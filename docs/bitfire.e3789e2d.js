parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FO+Z":[function(require,module,exports) {
"use strict";function e(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function t(e,t){return o(e)||n(e,t)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function n(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}function o(e){if(Array.isArray(e))return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.serializeObject=exports.getQueryStringObjectFromHash=exports.getQueryStringObject=exports.getParameterByName=exports.emptyElement=exports.downloadContent=exports.createNode=void 0;var i=function(e,t){for(var r in e=document.createElementNS("http://www.w3.org/2000/svg",e),t)e.setAttributeNS(null,r.replace(/[A-Z]/g,function(e,t,r,n){return"-"+e.toLowerCase()}),t[r]);return e};exports.createNode=i;var a=function(e,t){var r=new Blob([t]),n=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0}),o=document.createElement("a");o.download=e,o.href=URL.createObjectURL(r),o.dispatchEvent(n)};exports.downloadContent=a;var c=function(e){for(;e.firstChild;)e.removeChild(e.firstChild);return e};exports.emptyElement=c;var u=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);if(r)return r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):""};exports.getParameterByName=u;var s=function(){return window.location.search.substring(1).split("&").map(function(r){var n=t(r.split("="),2),o=n[0],i=n[1];return e({},o,decodeURI(i))}).reduce(function(e,t){return Object.assign(e,t)})};exports.getQueryStringObject=s;var l=function(){return window.location.hash.substring(1).split("&").map(function(r){var n=t(r.split("="),2),o=n[0],i=n[1];return e({},o,decodeURI(i))}).reduce(function(e,t){return Object.assign(e,t)})};exports.getQueryStringObjectFromHash=l;var p=function(e){return"#".concat(Object.keys(e).map(function(t){return"".concat(t,"=").concat(e[t])}).join("&"))};exports.serializeObject=p;
},{}],"mVkx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.controls=void 0;var e=[{id:"wind",type:"range",min:0,max:100,step:1,value:50},{id:"rain",type:"range",min:0,max:100,step:1,value:50},{id:"sound",type:"range",min:0,max:1,step:1,value:0},{id:"color",type:"range",min:0,max:2,step:1,value:0}];exports.controls=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./utils.js"),t=require("./gui.js");function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){return u(e)||o(e,t)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(c){a=!0,o=c}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}function u(e){if(Array.isArray(e))return e}var i=function(e,t){return Object.entries(t).forEach(function(t){var n=r(t,2),a=n[0],o=n[1];return e.setAttribute(a,o)})},c=t.controls.map(function(t){var r=document.createElement("label"),a=document.createTextNode(t.id),o=document.createElement("input");i(o,t);var u=document.createElement("span");return u.innerHTML=" (".concat(t.value,")"),r.appendChild(a),r.appendChild(u),r.appendChild(o),o.addEventListener("change",function(t){u.innerHTML=" (".concat(t.target.value,")");var r=Array.from(document.querySelectorAll("input")).map(function(e){return n({},e.id,e.value)}).reduce(function(e,t){return Object.assign(e,t)},{});location.hash=(0,e.serializeObject)(r)}),r}),d=document.getElementById("controls");c.forEach(function(e){return d.appendChild(e)});var l=(0,e.getQueryStringObjectFromHash)();Object.keys(l).forEach(function(e){var t=document.getElementById(e);t&&(t.value=l[e])});var f=256,m=f/2,v=0,s=0,h={x:.5,y:.4},g=[[[255,255,255],[240,240,240],[217,217,217],[189,189,189],[150,150,150],[115,115,115],[82,82,82],[37,37,37],[0,0,0]],[[255,255,204],[255,237,160],[254,217,118],[254,178,76],[253,141,60],[252,78,42],[227,26,28],[189,0,38],[128,0,38]],[[255,247,251],[236,231,242],[208,209,230],[166,189,219],[116,169,207],[54,144,192],[5,112,176],[4,90,141],[2,56,88]]],p=document.getElementById("canvas"),y=p.getContext("2d");p.width=f,p.height=f;var E=y.getImageData(0,0,f,f),w=new ArrayBuffer(E.data.length),M=new Uint8ClampedArray(w),A=new Uint32Array(w),b=new ArrayBuffer(E.data.length),T=new Uint8ClampedArray(b);function B(e,t,n,r,a){return Math.sqrt((e-n)*(e-n)+(t-r)*(t-r))<a}function I(e){var t=p.offsetWidth;p.style.height=t;for(var n=0;n<f;n+=e%2+1)for(var r=0;r<f;r+=e%2+1){var a=n*f+r,o=n<2,u=n>Math.round(1.53*m)&&n<Math.round(1.57*m),i=Math.random()>.8&&B(m,m,r,n,32)&&!B(m,m-10,r-1,n,40);(o||u||i)&&(T[a]=0),S(a)}E.data.set(M),y.putImageData(E,0,0)}function S(e){var t=T[e]+Math.round(1.3*Math.random()),n=Math.round(2*Math.random()),r=Math.random()>.8?e-n+Math.floor(8*h.x-3):e,a=Math.floor(Math.random()*(4+Math.floor(4*h.y)))*(Math.random()>.2?1:-1);T[r+f*a]=t-(1&n);var o=g[v][t]||11;A[e-f]=255<<24|o[2]<<16|o[1]<<8|o[0]}function C(){I(s++),requestAnimationFrame(function(){return C()})}C();var j=function(){var e={},t=new(window.AudioContext||window.webkitAudioContext);function n(){e.audioSource&&e.audioSource.stop()}return{play:function(){n(),function(e){e.audioSource=t.createBufferSource(),e.gainNode=t.createGain(),e.audioSource.connect(e.gainNode),e.gainNode.connect(t.destination)}(e),function(e){for(var n=0,r=2*t.sampleRate,a=t.createBuffer(1,r,t.sampleRate),o=a.getChannelData(0),u=0;u<r;u++){var i=2*Math.random()-1;o[u]=(n+.02*i)/1.02,n=o[u],o[u]*=3.5}e.audioSource.buffer=a}(e),function(e){e.volume=.1,e.gainNode.gain.setValueAtTime(0,t.currentTime),e.gainNode.gain.linearRampToValueAtTime(e.volume/4,t.currentTime/2),e.gainNode.gain.linearRampToValueAtTime(e.volume,t.currentTime)}(e),e.audioSource.loop=!0,e.audioSource.start()},stop:n}}(),x=function(e){var t=e.target;h.x=t.value/100},L=function(e){var t=e.target;h.y=t.value/100},N=function(e){var t=e.target;v=parseInt(t.value),console.log(v)},O=function(e){"1"===e.target.value?j.play():j.stop()},q=document.getElementById("wind");q.addEventListener("input",x);var R=document.getElementById("rain");R.addEventListener("input",L);var D=document.getElementById("sound");D.addEventListener("input",O);var H=document.getElementById("color");H.addEventListener("input",N);
},{"./utils.js":"FO+Z","./gui.js":"mVkx"}]},{},["Focm"], null)
//# sourceMappingURL=/bitfire.e3789e2d.js.map