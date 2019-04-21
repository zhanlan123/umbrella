// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/iframe-resizer/js/iframeResizer.min.js":[function(require,module,exports) {
var define;
/*! iFrame Resizer (iframeSizer.min.js ) - v4.1.1 - 2019-04-10
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */
!function (f) {
  if ("undefined" != typeof window) {
    var e,
        l = 0,
        m = !1,
        n = !1,
        p = "message".length,
        b = "[iFrameSizer]",
        y = b.length,
        v = null,
        r = window.requestAnimationFrame,
        g = {
      max: 1,
      scroll: 1,
      bodyScroll: 1,
      documentElementScroll: 1
    },
        F = {},
        i = null,
        h = {
      autoResize: !0,
      bodyBackground: null,
      bodyMargin: null,
      bodyMarginV1: 8,
      bodyPadding: null,
      checkOrigin: !0,
      inPageLinks: !1,
      enablePublicMethods: !0,
      heightCalculationMethod: "bodyOffset",
      id: "iFrameResizer",
      interval: 32,
      log: !1,
      maxHeight: 1 / 0,
      maxWidth: 1 / 0,
      minHeight: 0,
      minWidth: 0,
      resizeFrom: "parent",
      scrolling: !1,
      sizeHeight: !0,
      sizeWidth: !1,
      warningTimeout: 5e3,
      tolerance: 0,
      widthCalculationMethod: "scroll",
      onClosed: function () {},
      onInit: function () {},
      onMessage: function () {
        O("onMessage function not defined");
      },
      onResized: function () {},
      onScroll: function () {
        return !0;
      }
    },
        I = {};
    window.jQuery && ((e = window.jQuery).fn ? e.fn.iFrameResize || (e.fn.iFrameResize = function (i) {
      return this.filter("iframe").each(function (e, n) {
        d(n, i);
      }).end();
    }) : z("", "Unable to bind to jQuery, it is not fully loaded.")), "function" == typeof define && define.amd ? define([], B) : "object" == typeof module && "object" == typeof module.exports && (module.exports = B()), window.iFrameResize = window.iFrameResize || B();
  }

  function w() {
    return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  }

  function M(e, n, i) {
    e.addEventListener(n, i, !1);
  }

  function x(e, n, i) {
    e.removeEventListener(n, i, !1);
  }

  function o(e) {
    return b + "[" + (i = "Host page: " + (n = e), window.top !== window.self && (i = window.parentIFrame && window.parentIFrame.getId ? window.parentIFrame.getId() + ": " + n : "Nested host page: " + n), i) + "]";
    var n, i;
  }

  function t(e) {
    return F[e] ? F[e].log : m;
  }

  function k(e, n) {
    a("log", e, n, t(e));
  }

  function z(e, n) {
    a("info", e, n, t(e));
  }

  function O(e, n) {
    a("warn", e, n, !0);
  }

  function a(e, n, i, t) {
    !0 === t && "object" == typeof window.console && console[e](o(n), i);
  }

  function s(n) {
    function a() {
      e("Height"), e("Width"), j(function () {
        S(h), N(w), l("onResized", h);
      }, h, "init");
    }

    function e(e) {
      var n = Number(F[w]["max" + e]),
          i = Number(F[w]["min" + e]),
          t = e.toLowerCase(),
          o = Number(h[t]);
      k(w, "Checking " + t + " is in range " + i + "-" + n), o < i && (o = i, k(w, "Set " + t + " to min value")), n < o && (o = n, k(w, "Set " + t + " to max value")), h[t] = "" + o;
    }

    function s(e) {
      return g.substr(g.indexOf(":") + p + e);
    }

    function d(i, t) {
      var e, n, o;
      e = function () {
        var e, n;
        P("Send Page Info", "pageInfo:" + (e = document.body.getBoundingClientRect(), n = h.iframe.getBoundingClientRect(), JSON.stringify({
          iframeHeight: n.height,
          iframeWidth: n.width,
          clientHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
          clientWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
          offsetTop: parseInt(n.top - e.top, 10),
          offsetLeft: parseInt(n.left - e.left, 10),
          scrollTop: window.pageYOffset,
          scrollLeft: window.pageXOffset,
          documentHeight: document.documentElement.clientHeight,
          documentWidth: document.documentElement.clientWidth,
          windowHeight: window.innerHeight,
          windowWidth: window.innerWidth
        })), i, t);
      }, n = 32, I[o = t] || (I[o] = setTimeout(function () {
        I[o] = null, e();
      }, n));
    }

    function c(e) {
      var n = e.getBoundingClientRect();
      return W(w), {
        x: Math.floor(Number(n.left) + Number(v.x)),
        y: Math.floor(Number(n.top) + Number(v.y))
      };
    }

    function u(e) {
      var n = e ? c(h.iframe) : {
        x: 0,
        y: 0
      },
          i = {
        x: Number(h.width) + n.x,
        y: Number(h.height) + n.y
      };
      k(w, "Reposition requested from iFrame (offset x:" + n.x + " y:" + n.y + ")"), window.top !== window.self ? window.parentIFrame ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](i.x, i.y) : O(w, "Unable to scroll to requested position, window.parentIFrame not found") : (v = i, f(), k(w, "--"));
    }

    function f() {
      !1 !== l("onScroll", v) ? N(w) : C();
    }

    function l(e, n) {
      return R(w, e, n);
    }

    var i,
        t,
        o,
        r,
        m,
        g = n.data,
        h = {},
        w = null;
    "[iFrameResizerChild]Ready" === g ? function () {
      for (var e in F) P("iFrame requested init", A(e), document.getElementById(e), e);
    }() : b === ("" + g).substr(0, y) && g.substr(y).split(":")[0] in F ? (m = g.substr(y).split(":"), h = {
      iframe: F[m[0]] && F[m[0]].iframe,
      id: m[0],
      height: m[1],
      width: m[2],
      type: m[3]
    }, w = h.id, F[w] && (F[w].loaded = !0), (r = h.type in {
      true: 1,
      false: 1,
      undefined: 1
    }) && k(w, "Ignoring init message from meta parent page"), !r && (o = !0, F[t = w] || (o = !1, O(h.type + " No settings for " + t + ". Message was: " + g)), o) && (k(w, "Received: " + g), i = !0, null === h.iframe && (O(w, "IFrame (" + h.id + ") not found"), i = !1), i && function () {
      var e,
          i = n.origin,
          t = F[w] && F[w].checkOrigin;
      if (t && "" + i != "null" && !(t.constructor === Array ? function () {
        var e = 0,
            n = !1;

        for (k(w, "Checking connection is from allowed list of origins: " + t); e < t.length; e++) if (t[e] === i) {
          n = !0;
          break;
        }

        return n;
      }() : (e = F[w] && F[w].remoteHost, k(w, "Checking connection is from: " + e), i === e))) throw new Error("Unexpected message received from: " + i + " for " + h.iframe.id + ". Message was: " + n.data + ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");
      return !0;
    }() && function () {
      switch (F[w] && F[w].firstRun && F[w] && (F[w].firstRun = !1), h.type) {
        case "close":
          F[w].closeRequeston ? R(w, "onCloseRequest", F[w].iframe) : T(h.iframe);
          break;

        case "message":
          r = s(6), k(w, "onMessage passed: {iframe: " + h.iframe.id + ", message: " + r + "}"), l("onMessage", {
            iframe: h.iframe,
            message: JSON.parse(r)
          }), k(w, "--");
          break;

        case "scrollTo":
          u(!1);
          break;

        case "scrollToOffset":
          u(!0);
          break;

        case "pageInfo":
          d(F[w] && F[w].iframe, w), function () {
            function e(n, i) {
              function t() {
                F[r] ? d(F[r].iframe, r) : o();
              }

              ["scroll", "resize"].forEach(function (e) {
                k(r, n + e + " listener for sendPageInfo"), i(window, e, t);
              });
            }

            function o() {
              e("Remove ", x);
            }

            var r = w;
            e("Add ", M), F[r] && (F[r].stopPageInfo = o);
          }();
          break;

        case "pageInfoStop":
          F[w] && F[w].stopPageInfo && (F[w].stopPageInfo(), delete F[w].stopPageInfo);
          break;

        case "inPageLink":
          e = s(9), i = e.split("#")[1] || "", t = decodeURIComponent(i), (o = document.getElementById(t) || document.getElementsByName(t)[0]) ? (n = c(o), k(w, "Moving to in page link (#" + i + ") at x: " + n.x + " y: " + n.y), v = {
            x: n.x,
            y: n.y
          }, f(), k(w, "--")) : window.top !== window.self ? window.parentIFrame ? window.parentIFrame.moveToAnchor(i) : k(w, "In page link #" + i + " not found and window.parentIFrame not found") : k(w, "In page link #" + i + " not found");
          break;

        case "reset":
          H(h);
          break;

        case "init":
          a(), l("onInit", h.iframe);
          break;

        default:
          a();
      }

      var e, n, i, t, o, r;
    }())) : z(w, "Ignored: " + g);
  }

  function R(e, n, i) {
    var t = null,
        o = null;

    if (F[e]) {
      if ("function" != typeof (t = F[e][n])) throw new TypeError(n + " on iFrame[" + e + "] is not a function");
      o = t(i);
    }

    return o;
  }

  function E(e) {
    var n = e.id;
    delete F[n];
  }

  function T(e) {
    var n = e.id;
    k(n, "Removing iFrame: " + n);

    try {
      e.parentNode && e.parentNode.removeChild(e);
    } catch (e) {
      O(e);
    }

    R(n, "onClosed", n), k(n, "--"), E(e);
  }

  function W(e) {
    null === v && k(e, "Get page position: " + (v = {
      x: window.pageXOffset !== f ? window.pageXOffset : document.documentElement.scrollLeft,
      y: window.pageYOffset !== f ? window.pageYOffset : document.documentElement.scrollTop
    }).x + "," + v.y);
  }

  function N(e) {
    null !== v && (window.scrollTo(v.x, v.y), k(e, "Set page position: " + v.x + "," + v.y), C());
  }

  function C() {
    v = null;
  }

  function H(e) {
    k(e.id, "Size reset requested by " + ("init" === e.type ? "host page" : "iFrame")), W(e.id), j(function () {
      S(e), P("reset", "reset", e.iframe, e.id);
    }, e, "reset");
  }

  function S(i) {
    function t(e) {
      n || "0" !== i[e] || (n = !0, k(o, "Hidden iFrame detected, creating visibility listener"), function () {
        function n() {
          Object.keys(F).forEach(function (e) {
            !function (n) {
              function e(e) {
                return "0px" === (F[n] && F[n].iframe.style[e]);
              }

              F[n] && (i = F[n].iframe, null !== i.offsetParent) && (e("height") || e("width")) && P("Visibility change", "resize", F[n].iframe, n);
              var i;
            }(F[e]);
          });
        }

        function e(e) {
          k("window", "Mutation observed: " + e[0].target + " " + e[0].type), c(n, 16);
        }

        var i = w();
        i && (t = document.querySelector("body"), o = {
          attributes: !0,
          attributeOldValue: !1,
          characterData: !0,
          characterDataOldValue: !1,
          childList: !0,
          subtree: !0
        }, new i(e).observe(t, o));
        var t, o;
      }());
    }

    function e(e) {
      var n;
      n = e, i.id ? (i.iframe.style[n] = i[n] + "px", k(i.id, "IFrame (" + o + ") " + n + " set to " + i[n] + "px")) : k("undefined", "messageData id not set"), t(e);
    }

    var o = i.iframe.id;
    F[o] && (F[o].sizeHeight && e("height"), F[o].sizeWidth && e("width"));
  }

  function j(e, n, i) {
    i !== n.type && r ? (k(n.id, "Requesting animation frame"), r(e)) : e();
  }

  function P(e, n, i, t, o) {
    var r,
        a = !1;
    t = t || i.id, F[t] && (i && "contentWindow" in i && null !== i.contentWindow ? (r = F[t] && F[t].targetOrigin, k(t, "[" + e + "] Sending msg to iframe[" + t + "] (" + n + ") targetOrigin: " + r), i.contentWindow.postMessage(b + n, r)) : O(t, "[" + e + "] IFrame(" + t + ") not found"), o && F[t] && F[t].warningTimeout && (F[t].msgTimeout = setTimeout(function () {
      !F[t] || F[t].loaded || a || (a = !0, O(t, "IFrame has not responded within " + F[t].warningTimeout / 1e3 + " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."));
    }, F[t].warningTimeout)));
  }

  function A(e) {
    return e + ":" + F[e].bodyMarginV1 + ":" + F[e].sizeWidth + ":" + F[e].log + ":" + F[e].interval + ":" + F[e].enablePublicMethods + ":" + F[e].autoResize + ":" + F[e].bodyMargin + ":" + F[e].heightCalculationMethod + ":" + F[e].bodyBackground + ":" + F[e].bodyPadding + ":" + F[e].tolerance + ":" + F[e].inPageLinks + ":" + F[e].resizeFrom + ":" + F[e].widthCalculationMethod;
  }

  function d(i, e) {
    function n(e) {
      var n = e.split("Callback");

      if (2 === n.length) {
        var i = "on" + n[0].charAt(0).toUpperCase() + n[0].slice(1);
        this[i] = this[e], delete this[e], O(u, "Deprecated: '" + e + "' has been renamed '" + i + "'. The old method will be removed in the next major version.");
      }
    }

    var t,
        o,
        r,
        a,
        s,
        d,
        c,
        u = ("" === (t = i.id) && (i.id = (o = e && e.id || h.id + l++, null !== document.getElementById(o) && (o += l++), t = o), m = (e || {}).log, k(t, "Added missing iframe ID: " + t + " (" + i.src + ")")), t);
    u in F && "iFrameResizer" in i ? O(u, "Ignored iFrame, already setup.") : (d = (d = e) || {}, F[u] = {
      firstRun: !0,
      iframe: i,
      remoteHost: i.src.split("/").slice(0, 3).join("/")
    }, function (e) {
      if ("object" != typeof e) throw new TypeError("Options is not an object");
    }(d), Object.keys(d).forEach(n, d), function (e) {
      for (var n in h) Object.prototype.hasOwnProperty.call(h, n) && (F[u][n] = Object.prototype.hasOwnProperty.call(e, n) ? e[n] : h[n]);
    }(d), F[u] && (F[u].targetOrigin = !0 === F[u].checkOrigin ? "" === (c = F[u].remoteHost) || "file://" === c ? "*" : c : "*"), function () {
      switch (k(u, "IFrame scrolling " + (F[u] && F[u].scrolling ? "enabled" : "disabled") + " for " + u), i.style.overflow = !1 === (F[u] && F[u].scrolling) ? "hidden" : "auto", F[u] && F[u].scrolling) {
        case "omit":
          break;

        case !0:
          i.scrolling = "yes";
          break;

        case !1:
          i.scrolling = "no";
          break;

        default:
          i.scrolling = F[u] ? F[u].scrolling : "no";
      }
    }(), function () {
      function e(e) {
        1 / 0 !== F[u][e] && 0 !== F[u][e] && (i.style[e] = F[u][e] + "px", k(u, "Set " + e + " = " + F[u][e] + "px"));
      }

      function n(e) {
        if (F[u]["min" + e] > F[u]["max" + e]) throw new Error("Value for min" + e + " can not be greater than max" + e);
      }

      n("Height"), n("Width"), e("maxHeight"), e("minHeight"), e("maxWidth"), e("minWidth");
    }(), "number" != typeof (F[u] && F[u].bodyMargin) && "0" !== (F[u] && F[u].bodyMargin) || (F[u].bodyMarginV1 = F[u].bodyMargin, F[u].bodyMargin = F[u].bodyMargin + "px"), r = A(u), (s = w()) && (a = s, i.parentNode && new a(function (e) {
      e.forEach(function (e) {
        Array.prototype.slice.call(e.removedNodes).forEach(function (e) {
          e === i && T(i);
        });
      });
    }).observe(i.parentNode, {
      childList: !0
    })), M(i, "load", function () {
      var e, n;
      P("iFrame.onload", r, i, f, !0), e = F[u] && F[u].firstRun, n = F[u] && F[u].heightCalculationMethod in g, !e && n && H({
        iframe: i,
        height: 0,
        width: 0,
        type: "init"
      });
    }), P("init", r, i, f, !0), F[u] && (F[u].iframe.iFrameResizer = {
      close: T.bind(null, F[u].iframe),
      removeListeners: E.bind(null, F[u].iframe),
      resize: P.bind(null, "Window resize", "resize", F[u].iframe),
      moveToAnchor: function (e) {
        P("Move to anchor", "moveToAnchor:" + e, F[u].iframe, u);
      },
      sendMessage: function (e) {
        P("Send Message", "message:" + (e = JSON.stringify(e)), F[u].iframe, u);
      }
    }));
  }

  function c(e, n) {
    null === i && (i = setTimeout(function () {
      i = null, e();
    }, n));
  }

  function u() {
    "hidden" !== document.visibilityState && (k("document", "Trigger event: Visiblity change"), c(function () {
      q("Tab Visable", "resize");
    }, 16));
  }

  function q(i, t) {
    Object.keys(F).forEach(function (e) {
      var n;
      F[n = e] && "parent" === F[n].resizeFrom && F[n].autoResize && !F[n].firstRun && P(i, t, document.getElementById(e), e);
    });
  }

  function L() {
    M(window, "message", s), M(window, "resize", function () {
      var e;
      k("window", "Trigger event: " + (e = "resize")), c(function () {
        q("Window " + e, "resize");
      }, 16);
    }), M(document, "visibilitychange", u), M(document, "-webkit-visibilitychange", u);
  }

  function B() {
    function t(e, n) {
      n && (!function () {
        if (!n.tagName) throw new TypeError("Object is not a valid DOM element");
        if ("IFRAME" !== n.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + n.tagName + ">");
      }(), d(n, e), o.push(n));
    }

    var o;
    return function () {
      var e,
          n = ["moz", "webkit", "o", "ms"];

      for (e = 0; e < n.length && !r; e += 1) r = window[n[e] + "RequestAnimationFrame"];

      r || k("setup", "RequestAnimationFrame not supported");
    }(), L(), function (e, n) {
      var i;

      switch (o = [], (i = e) && i.enablePublicMethods && O("enablePublicMethods option has been removed, public methods are now always available in the iFrame"), typeof n) {
        case "undefined":
        case "string":
          Array.prototype.forEach.call(document.querySelectorAll(n || "iframe"), t.bind(f, e));
          break;

        case "object":
          t(e, n);
          break;

        default:
          throw new TypeError("Unexpected data type (" + typeof n + ")");
      }

      return o;
    };
  }
}();
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53910" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","node_modules/iframe-resizer/js/iframeResizer.min.js"], null)
//# sourceMappingURL=/iframeResizer.min.42a083e7.js.map