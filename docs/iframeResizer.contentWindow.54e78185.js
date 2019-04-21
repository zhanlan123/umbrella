parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pQz7":[function(require,module,exports) {
!function(e){if("undefined"!=typeof window){var t=!0,n=10,o="",i=0,r="",a=null,u="",c=!1,s={resize:1,click:1},d=128,l=!0,f=1,m="bodyOffset",h=m,g=!0,p="",v={},y=32,b=null,w=!1,T="[iFrameSizer]",E=T.length,O="",S={max:1,min:1,bodyScroll:1,documentElementScroll:1},M="child",I=!0,N=window.parent,A="*",C=0,k=!1,z=null,R=16,x=1,L="scroll",F=L,P=window,D=function(){ue("onMessage function not defined")},j=function(){},q=function(){},H={height:function(){return ue("Custom height calculation function not defined"),document.documentElement.offsetHeight},width:function(){return ue("Custom width calculation function not defined"),document.body.scrollWidth}},W={},B=!1;try{var U=Object.create({},{passive:{get:function(){B=!0}}});window.addEventListener("test",te,U),window.removeEventListener("test",te,U)}catch(Re){}var J,V,K,Q,X,Y,G,Z=Date.now||function(){return(new Date).getTime()},$={bodyOffset:function(){return document.body.offsetHeight+be("marginTop")+be("marginBottom")},offset:function(){return $.bodyOffset()},bodyScroll:function(){return document.body.scrollHeight},custom:function(){return H.height()},documentElementOffset:function(){return document.documentElement.offsetHeight},documentElementScroll:function(){return document.documentElement.scrollHeight},max:function(){return Math.max.apply(null,Te($))},min:function(){return Math.min.apply(null,Te($))},grow:function(){return $.max()},lowestElement:function(){return Math.max($.bodyOffset()||$.documentElementOffset(),we("bottom",Oe()))},taggedElement:function(){return Ee("bottom","data-iframe-height")}},_={bodyScroll:function(){return document.body.scrollWidth},bodyOffset:function(){return document.body.offsetWidth},custom:function(){return H.width()},documentElementScroll:function(){return document.documentElement.scrollWidth},documentElementOffset:function(){return document.documentElement.offsetWidth},scroll:function(){return Math.max(_.bodyScroll(),_.documentElementScroll())},max:function(){return Math.max.apply(null,Te(_))},min:function(){return Math.min.apply(null,Te(_))},rightMostElement:function(){return we("right",Oe())},taggedElement:function(){return Ee("right","data-iframe-width")}},ee=(J=Se,X=null,Y=0,G=function(){Y=Z(),X=null,Q=J.apply(V,K),X||(V=K=null)},function(){var e=Z();Y||(Y=e);var t=R-(e-Y);return V=this,K=arguments,t<=0||t>R?(X&&(clearTimeout(X),X=null),Y=e,Q=J.apply(V,K),X||(V=K=null)):X||(X=setTimeout(G,t)),Q});ne(window,"message",ke),ne(window,"readystatechange",ze),ze()}function te(){}function ne(e,t,n,o){e.addEventListener(t,n,!!B&&(o||{}))}function oe(e,t,n){e.removeEventListener(t,n,!1)}function ie(e){return e.charAt(0).toUpperCase()+e.slice(1)}function re(e){return T+"["+O+"] "+e}function ae(e){w&&"object"==typeof window.console&&console.log(re(e))}function ue(e){"object"==typeof window.console&&console.warn(re(e))}function ce(){var n;!function(){function n(e){return"true"===e}var a=p.substr(E).split(":");O=a[0],i=e!==a[1]?Number(a[1]):i,c=e!==a[2]?n(a[2]):c,w=e!==a[3]?n(a[3]):w,y=e!==a[4]?Number(a[4]):y,t=e!==a[6]?n(a[6]):t,r=a[7],h=e!==a[8]?a[8]:h,o=a[9],u=a[10],C=e!==a[11]?Number(a[11]):C,v.enable=e!==a[12]&&n(a[12]),M=e!==a[13]?a[13]:M,F=e!==a[14]?a[14]:F}(),ae("Initialising iFrame ("+location.href+")"),function(){function e(e,t){return"function"==typeof e&&(ae("Setup custom "+t+"CalcMethod"),H[t]=e,e="custom"),e}"iFrameResizer"in window&&Object===window.iFrameResizer.constructor&&(t=window.iFrameResizer,ae("Reading data from page: "+JSON.stringify(t)),Object.keys(t).forEach(se,t),D="onMessage"in t?t.onMessage:D,j="onReady"in t?t.onReady:j,A="targetOrigin"in t?t.targetOrigin:A,h="heightCalculationMethod"in t?t.heightCalculationMethod:h,F="widthCalculationMethod"in t?t.widthCalculationMethod:F,h=e(h,"height"),F=e(F,"width"));var t;ae("TargetOrigin for parent set to: "+A)}(),function(){e===r&&(r=i+"px");de("margin",function(e,t){-1!==t.indexOf("-")&&(ue("Negative CSS value ignored for "+e),t="");return t}("margin",r))}(),de("background",o),de("padding",u),(n=document.createElement("div")).style.clear="both",n.style.display="block",n.style.height="0",document.body.appendChild(n),he(),ge(),document.documentElement.style.height="",document.body.style.height="",ae('HTML & body height set to "auto"'),ae("Enable public methods"),P.parentIFrame={autoResize:function(e){return!0===e&&!1===t?(t=!0,pe()):!1===e&&!0===t&&(t=!1,ve()),t},close:function(){Ce(0,0,"close"),ae("Disable outgoing messages"),I=!1,ae("Remove event listener: Message"),oe(window,"message",ke),!0===t&&ve()},getId:function(){return O},getPageInfo:function(e){"function"==typeof e?(q=e,Ce(0,0,"pageInfo")):(q=function(){},Ce(0,0,"pageInfoStop"))},moveToAnchor:function(e){v.findTarget(e)},reset:function(){Ae("parentIFrame.reset")},scrollTo:function(e,t){Ce(t,e,"scrollTo")},scrollToOffset:function(e,t){Ce(t,e,"scrollToOffset")},sendMessage:function(e,t){Ce(0,0,"message",JSON.stringify(e),t)},setHeightCalculationMethod:function(e){h=e,he()},setWidthCalculationMethod:function(e){F=e,ge()},setTargetOrigin:function(e){ae("Set targetOrigin: "+e),A=e},size:function(e,t){var n=(e||"")+(t?","+t:"");Me("size","parentIFrame.size("+n+")",e,t)}},pe(),v=function(){function t(t){var n=t.getBoundingClientRect(),o={x:window.pageXOffset!==e?window.pageXOffset:document.documentElement.scrollLeft,y:window.pageYOffset!==e?window.pageYOffset:document.documentElement.scrollTop};return{x:parseInt(n.left,10)+parseInt(o.x,10),y:parseInt(n.top,10)+parseInt(o.y,10)}}function n(n){var o=n.split("#")[1]||n,i=decodeURIComponent(o),r=document.getElementById(i)||document.getElementsByName(i)[0];e!==r?function(e){var n=t(e);ae("Moving to in page link (#"+o+") at x: "+n.x+" y: "+n.y),Ce(n.y,n.x,"scrollToOffset")}(r):(ae("In page link (#"+o+") not found in iFrame, so sending to parent"),Ce(0,0,"inPageLink","#"+o))}function o(){""!==location.hash&&"#"!==location.hash&&n(location.href)}v.enable?Array.prototype.forEach&&document.querySelectorAll?(ae("Setting up location.hash handlers"),Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'),function(e){"#"!==e.getAttribute("href")&&ne(e,"click",function(e){e.preventDefault(),n(this.getAttribute("href"))})}),ne(window,"hashchange",o),setTimeout(o,d)):ue("In page linking not fully supported in this browser! (See README.md for IE8 workaround)"):ae("In page linking not enabled");return{findTarget:n}}(),Me("init","Init message from host page"),j()}function se(e){var t=e.split("Callback");if(2===t.length){var n="on"+t[0].charAt(0).toUpperCase()+t[0].slice(1);this[n]=this[e],delete this[e],ue("Deprecated: '"+e+"' has been renamed '"+n+"'. The old method will be removed in the next major version.")}}function de(t,n){e!==n&&""!==n&&"null"!==n&&(document.body.style[t]=n,ae("Body "+t+' set to "'+n+'"'))}function le(e){var t={add:function(t){function n(){Me(e.eventName,e.eventType)}W[t]=n,ne(window,t,n,{passive:!0})},remove:function(e){var t=W[e];delete W[e],oe(window,e,t)}};e.eventNames&&Array.prototype.map?(e.eventName=e.eventNames[0],e.eventNames.map(t[e.method])):t[e.method](e.eventName),ae(ie(e.method)+" event listener: "+e.eventType)}function fe(e){le({method:e,eventType:"Animation Start",eventNames:["animationstart","webkitAnimationStart"]}),le({method:e,eventType:"Animation Iteration",eventNames:["animationiteration","webkitAnimationIteration"]}),le({method:e,eventType:"Animation End",eventNames:["animationend","webkitAnimationEnd"]}),le({method:e,eventType:"Input",eventName:"input"}),le({method:e,eventType:"Mouse Up",eventName:"mouseup"}),le({method:e,eventType:"Mouse Down",eventName:"mousedown"}),le({method:e,eventType:"Orientation Change",eventName:"orientationchange"}),le({method:e,eventType:"Print",eventName:["afterprint","beforeprint"]}),le({method:e,eventType:"Ready State Change",eventName:"readystatechange"}),le({method:e,eventType:"Touch Start",eventName:"touchstart"}),le({method:e,eventType:"Touch End",eventName:"touchend"}),le({method:e,eventType:"Touch Cancel",eventName:"touchcancel"}),le({method:e,eventType:"Transition Start",eventNames:["transitionstart","webkitTransitionStart","MSTransitionStart","oTransitionStart","otransitionstart"]}),le({method:e,eventType:"Transition Iteration",eventNames:["transitioniteration","webkitTransitionIteration","MSTransitionIteration","oTransitionIteration","otransitioniteration"]}),le({method:e,eventType:"Transition End",eventNames:["transitionend","webkitTransitionEnd","MSTransitionEnd","oTransitionEnd","otransitionend"]}),"child"===M&&le({method:e,eventType:"IFrame Resized",eventName:"resize"})}function me(e,t,n,o){return t!==e&&(e in n||(ue(e+" is not a valid option for "+o+"CalculationMethod."),e=t),ae(o+' calculation method set to "'+e+'"')),e}function he(){h=me(h,m,$,"height")}function ge(){F=me(F,L,_,"width")}function pe(){var n;!0===t?(fe("add"),n=0>y,window.MutationObserver||window.WebKitMutationObserver?n?ye():a=function(){function t(e){function t(e){!1===e.complete&&(ae("Attach listeners to "+e.src),e.addEventListener("load",i,!1),e.addEventListener("error",r,!1),c.push(e))}"attributes"===e.type&&"src"===e.attributeName?t(e.target):"childList"===e.type&&Array.prototype.forEach.call(e.target.querySelectorAll("img"),t)}function n(e){ae("Remove listeners from "+e.src),e.removeEventListener("load",i,!1),e.removeEventListener("error",r,!1),function(e){c.splice(c.indexOf(e),1)}(e)}function o(t,o,i){n(t.target),Me(o,i+": "+t.target.src,e,e)}function i(e){o(e,"imageLoad","Image loaded")}function r(e){o(e,"imageLoadFailed","Image load failed")}function a(e){Me("mutationObserver","mutationObserver: "+e[0].target+" "+e[0].type),e.forEach(t)}var u,c=[],s=window.MutationObserver||window.WebKitMutationObserver,d=(u=document.querySelector("body"),d=new s(a),ae("Create body MutationObserver"),d.observe(u,{attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0}),d);return{disconnect:function(){"disconnect"in d&&(ae("Disconnect body MutationObserver"),d.disconnect(),c.forEach(n))}}}():(ae("MutationObserver not supported in this browser!"),ye())):ae("Auto Resize disabled")}function ve(){fe("remove"),null!==a&&a.disconnect(),clearInterval(b)}function ye(){0!==y&&(ae("setInterval: "+y+"ms"),b=setInterval(function(){Me("interval","setInterval: "+y)},Math.abs(y)))}function be(e,t){var o=0;return t=t||document.body,o=null!==(o=document.defaultView.getComputedStyle(t,null))?o[e]:0,parseInt(o,n)}function we(e,t){for(var n=t.length,o=0,i=0,r=ie(e),a=Z(),u=0;u<n;u++)(o=t[u].getBoundingClientRect()[e]+be("margin"+r,t[u]))>i&&(i=o);return a=Z()-a,ae("Parsed "+n+" HTML elements"),ae("Element position calculated in "+a+"ms"),function(e){e>R/2&&ae("Event throttle increased to "+(R=2*e)+"ms")}(a),i}function Te(e){return[e.bodyOffset(),e.bodyScroll(),e.documentElementOffset(),e.documentElementScroll()]}function Ee(e,t){var n=document.querySelectorAll("["+t+"]");return 0===n.length&&(ue("No tagged elements ("+t+") found on page"),document.querySelectorAll("body *")),we(e,n)}function Oe(){return document.querySelectorAll("body *")}function Se(t,n,o,i){var r,a;!function(){function t(e,t){return!(Math.abs(e-t)<=C)}return r=e!==o?o:$[h](),a=e!==i?i:_[F](),t(f,r)||c&&t(x,a)}()&&"init"!==t?t in{init:1,interval:1,size:1}||!(h in S||c&&F in S)?t in{interval:1}||ae("No change in size detected"):Ae(n):(Ie(),Ce(f=r,x=a,t))}function Me(e,t,n,o){k&&e in s?ae("Trigger event cancelled: "+e):(e in{reset:1,resetPage:1,init:1}||ae("Trigger event: "+t),"init"===e?Se(e,t,n,o):ee(e,t,n,o))}function Ie(){k||(k=!0,ae("Trigger event lock on")),clearTimeout(z),z=setTimeout(function(){k=!1,ae("Trigger event lock off"),ae("--")},d)}function Ne(e){f=$[h](),x=_[F](),Ce(f,x,e)}function Ae(e){var t=h;h=m,ae("Reset trigger event: "+e),Ie(),Ne("reset"),h=t}function Ce(t,n,o,i,r){var a;!0===I&&(e===r?r=A:ae("Message targetOrigin: "+r),ae("Sending message to host page ("+(a=O+":"+t+":"+n+":"+o+(e!==i?":"+i:""))+")"),N.postMessage(T+a,r))}function ke(e){var t={init:function(){p=e.data,N=e.source,ce(),l=!1,setTimeout(function(){g=!1},d)},reset:function(){g?ae("Page reset ignored by init"):(ae("Page size reset by host page"),Ne("resetPage"))},resize:function(){Me("resizeParent","Parent window requested size check")},moveToAnchor:function(){v.findTarget(o())},inPageLink:function(){this.moveToAnchor()},pageInfo:function(){var e=o();ae("PageInfoFromParent called from parent: "+e),q(JSON.parse(e)),ae(" --")},message:function(){var e=o();ae("onMessage called from parent: "+e),D(JSON.parse(e)),ae(" --")}};function n(){return e.data.split("]")[1].split(":")[0]}function o(){return e.data.substr(e.data.indexOf(":")+1)}function i(){return e.data.split(":")[2]in{true:1,false:1}}function r(){var o=n();o in t?t[o]():("undefined"==typeof module||!module.exports)&&"iFrameResize"in window||"jQuery"in window&&"iFrameResize"in window.jQuery.prototype||i()||ue("Unexpected message ("+e.data+")")}T===(""+e.data).substr(0,E)&&(!1===l?r():i()?t.init():ae('Ignored message of type "'+n()+'". Received before initialization.'))}function ze(){"loading"!==document.readyState&&window.parent.postMessage("[iFrameResizerChild]Ready","*")}}();
},{}]},{},["pQz7"], null)
//# sourceMappingURL=/iframeResizer.contentWindow.54e78185.js.map