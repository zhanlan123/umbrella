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
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeObject = exports.getQueryStringObjectFromHash = exports.getQueryStringObject = exports.getParameterByName = exports.emptyElement = exports.downloadContent = exports.createNode = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createNode = function createNode(n, v) {
  n = document.createElementNS("http://www.w3.org/2000/svg", n);

  for (var p in v) {
    n.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) {
      return "-" + m.toLowerCase();
    }), v[p]);
  }

  return n;
};

exports.createNode = createNode;

var downloadContent = function downloadContent(filename, content) {
  var blob = new Blob([content]);
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var a = document.createElement("a");
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.dispatchEvent(event);
};

exports.downloadContent = downloadContent;

var emptyElement = function emptyElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  return element;
};

exports.emptyElement = emptyElement;

var getParameterByName = function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

exports.getParameterByName = getParameterByName;

var getQueryStringObject = function getQueryStringObject() {
  return window.location.search.substring(1).split('&').map(function (str) {
    var _str$split = str.split('='),
        _str$split2 = _slicedToArray(_str$split, 2),
        key = _str$split2[0],
        value = _str$split2[1];

    return _defineProperty({}, key, decodeURI(value));
  }).reduce(function (prev, curr) {
    return Object.assign(prev, curr);
  });
};

exports.getQueryStringObject = getQueryStringObject;

var getQueryStringObjectFromHash = function getQueryStringObjectFromHash() {
  return window.location.hash.substring(1).split('&').map(function (str) {
    var _str$split3 = str.split('='),
        _str$split4 = _slicedToArray(_str$split3, 2),
        key = _str$split4[0],
        value = _str$split4[1];

    return _defineProperty({}, key, decodeURI(value));
  }).reduce(function (prev, curr) {
    return Object.assign(prev, curr);
  });
};

exports.getQueryStringObjectFromHash = getQueryStringObjectFromHash;

var serializeObject = function serializeObject(obj) {
  return "#".concat(Object.keys(obj).map(function (k) {
    return "".concat(k, "=").concat(obj[k]);
  }).join('&'));
};

exports.serializeObject = serializeObject;
},{}],"gui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controls = void 0;
var controls = [{
  id: 'mask',
  type: 'range',
  min: 0,
  max: 3,
  step: 1,
  value: 0
}, {
  id: 'horizontalMovementOffset',
  type: 'range',
  min: -2,
  max: 2,
  step: 0.1,
  value: 0
}, {
  id: 'horizontalMovementMax',
  type: 'range',
  min: 0,
  max: 10,
  step: 1,
  value: 1
}, {
  id: 'verticalMovementOffset',
  type: 'range',
  min: -100,
  max: 100,
  step: 1,
  value: -1
}, {
  id: 'verticalMovementMax',
  type: 'range',
  min: -100,
  max: 100,
  step: 1,
  value: 5
}, {
  id: 'sound',
  type: 'range',
  min: 0,
  max: 1,
  step: 1,
  value: 0
}, {
  id: 'color',
  type: 'range',
  min: 0,
  max: 2,
  step: 1,
  value: 0
}];
exports.controls = controls;
},{}],"sound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Noise = void 0;

var Noise = function () {
  var track = {};
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();

  function createNoise(track) {
    var lastOut = 0.0;
    var bufferSize = 2 * audioContext.sampleRate;
    var noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    var output = noiseBuffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    track.audioSource.buffer = noiseBuffer;
  }

  function stopNoise() {
    if (track.audioSource) {
      track.audioSource.stop();
    }
  }

  function buildTrack(track) {
    track.audioSource = audioContext.createBufferSource();
    track.gainNode = audioContext.createGain();
    track.audioSource.connect(track.gainNode);
    track.gainNode.connect(audioContext.destination);
  }

  function setGain(track) {
    track.volume = 0.1;
    track.gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    track.gainNode.gain.linearRampToValueAtTime(track.volume / 4, audioContext.currentTime / 2);
    track.gainNode.gain.linearRampToValueAtTime(track.volume, audioContext.currentTime);
  }

  function playNoise() {
    stopNoise(track);
    buildTrack(track);
    createNoise(track);
    setGain(track);
    track.audioSource.loop = true;
    track.audioSource.start();
  } // Expose functions:


  return {
    play: playNoise,
    stop: stopNoise
  };
}();

exports.Noise = Noise;
},{}],"colors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLORS = void 0;
// A gray-scale height-map.
var COLORS = [[[255, 255, 255], [240, 240, 240], [217, 217, 217], [189, 189, 189], [150, 150, 150], [115, 115, 115], [82, 82, 82], [37, 37, 37], [0, 0, 0]], [[255, 255, 204], [255, 237, 160], [254, 217, 118], [254, 178, 76], [253, 141, 60], [252, 78, 42], [227, 26, 28], [189, 0, 38], [128, 0, 38]], [[255, 247, 251], [236, 231, 242], [208, 209, 230], [166, 189, 219], [116, 169, 207], [54, 144, 192], [5, 112, 176], [4, 90, 141], [2, 56, 88]]];
exports.COLORS = COLORS;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils.js");

var _gui = require("./gui.js");

var _sound = require("./sound");

var _colors = require("./colors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var settings = {
  mask: []
};

var setSettings = function setSettings(options) {
  if (options.sound !== settings.sound) {
    if (settings.sound === "1") {
      _sound.Noise.play();
    } else {
      _sound.Noise.stop();
    }
  }

  if (settings.mask !== options.mask) {
    var _mask = document.createElement('img');

    _mask.onload = function () {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = _mask.width;
      canvas.height = _mask.height;
      context.drawImage(_mask, 0, 0);
      settings.mask = context.getImageData(0, 0, _mask.width, _mask.height).data;
    };

    _mask.src = "masks/".concat(options.mask, ".gif");
  }

  settings = Object.assign(settings, options);
};

var setAttributes = function setAttributes(element, attributes) {
  return Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return element.setAttribute(key, val);
  });
};

var elements = _gui.controls.map(function (control) {
  var label = document.createElement('label');
  var text = document.createTextNode(control.id);
  var input = document.createElement('input');
  setAttributes(input, control);
  var val = document.createElement('span');
  val.innerHTML = " (".concat(control.value, ")");
  label.appendChild(text);
  label.appendChild(val);
  label.appendChild(input);
  input.addEventListener('input', function (event) {
    val.innerHTML = " (".concat(event.target.value, ")");
    var options = Array.from(document.querySelectorAll('input')).map(function (_ref3) {
      var id = _ref3.id,
          value = _ref3.value;
      return _defineProperty({}, id, value);
    }).reduce(function (memo, item) {
      return Object.assign(memo, item);
    }, {});
    location.hash = (0, _utils.serializeObject)(options);
  });
  return label;
});

var target = document.getElementById('controls');
elements.forEach(function (element) {
  return target.appendChild(element);
}); // const search = window.location.search;

var params = (0, _utils.getQueryStringObjectFromHash)();
Object.keys(params).forEach(function (key) {
  var input = document.getElementById(key);

  if (input) {
    input.value = params[key];
  }
});
window.addEventListener("hashchange", function (event) {
  var options = (0, _utils.getQueryStringObjectFromHash)();
  setSettings(options);
  Object.keys(options).forEach(function (key) {
    var input = document.getElementById(key);

    if (input) {
      input.value = options[key];
    }
  });
});
var options = Array.from(document.querySelectorAll('input')).map(function (_ref5) {
  var id = _ref5.id,
      value = _ref5.value;
  return _defineProperty({}, id, value);
}).reduce(function (memo, item) {
  return Object.assign(memo, item);
}, {});
setSettings(options);
var SIZE = 256;
var CENTER = SIZE / 2;
var tick = 0; // Setup the canvas.

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = SIZE;
canvas.height = SIZE;
var imageData = context.getImageData(0, 0, SIZE, SIZE); // One buffer to hold the color data for each pixel.

var buffer = new ArrayBuffer(imageData.data.length);
var bufferViewInt8 = new Uint8ClampedArray(buffer);
var bufferViewInt32 = new Uint32Array(buffer); // One buffer to hold the height map level for each pixel.

var levelBuffer = new ArrayBuffer(imageData.data.length);
var levelBufferViewInt8 = new Uint8ClampedArray(levelBuffer); // Check if a coordinate is inside a circle with center x1, y1 and radius r.

function isInsideCircle(x1, y1, x2, y2, r) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < r;
}

function rain() {
  var w = canvas.offsetWidth;
  canvas.style.height = w;

  for (var y = 0; y < SIZE; y += 1) {
    for (var x = 0; x < SIZE; x += 1) {
      var index = y * SIZE + x;
      var alpha = settings.mask[index * 4] || 0; // console.log(index*4 + 3);
      // console.log(alpha);
      // Generate rain in the top of the image.
      // const isRain = y < 2;
      // Generate a flooded street in the bottom of the image.
      // const isStreet = y > Math.round(CENTER * 1.53) && y < Math.round(CENTER * 1.57);
      // Mask out the silhouette of an umbrella in the middle of the image.
      // const isUmbrella = Math.random() > 0.8
      //     && isInsideCircle(CENTER, CENTER, x, y, 32)
      //     && !isInsideCircle(CENTER, CENTER - 10, x - 1, y, 40);

      var odds = 1 / 255 * (255 - alpha);

      if (alpha && Math.random() > odds) {
        levelBufferViewInt8[index] = 0;
      } // Bring it to life.


      moveDroplet(index);
    }
  } // Update the canvas with the new pixel values.


  imageData.data.set(bufferViewInt8);
  context.putImageData(imageData, 0, 0);
}

function moveDroplet(src) {
  var nextLevel = levelBufferViewInt8[src] + Math.round(Math.random() * 1.3); // Generate a 0, 1 or 2.

  var rand = Math.round(Math.random() * 2.0); // Add horizontal movement to create a wind effect.
  // const horizontalMovement = Math.random() > 0.8
  //     ? src - rand + Math.floor((settings.wind * 8 - 3))
  //     : src;

  var horizontalMovement = src + Math.floor(parseFloat(settings.horizontalMovementOffset) + Math.random() * parseFloat(settings.horizontalMovementMax)); // Every 1 in 5 the rain will move up-wards and create the
  // street splash effect.

  var verticalMovement = Math.floor(parseFloat(settings.verticalMovementOffset) + Math.random() * parseFloat(settings.verticalMovementMax));
  levelBufferViewInt8[horizontalMovement + SIZE * verticalMovement] = nextLevel - (rand & 1);
  var nextColor = _colors.COLORS[settings.color][nextLevel] || 11; // Set the new pixel value.

  bufferViewInt32[src - SIZE] = 255 << 24 | // Alpha
  nextColor[2] << 16 | // Blue
  nextColor[1] << 8 | // Green
  nextColor[0]; // Red
}

function render() {
  rain(); // Go again!
  // setTimeout(function () {

  requestAnimationFrame(function () {
    return render();
  }); // }, 100);
} // Go!


var mask = document.createElement('img');

mask.onload = function () {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = mask.width;
  canvas.height = mask.height;
  context.drawImage(mask, 0, 0);
  settings.mask = context.getImageData(0, 0, mask.width, mask.height).data;
};

mask.src = 'masks/0.gif';
render(); // const wind = document.getElementById('wind');
// wind.addEventListener('input', handleMousemove);
// const rainRangeElement = document.getElementById('rain');
// rainRangeElement.addEventListener('input', handleRainChange);
// const soundRangeElement = document.getElementById('sound');
// soundRangeElement.addEventListener('input', handleSoundChange);
// const colorRangeElement = document.getElementById('color');
// colorRangeElement.addEventListener('input', handleColorChange);
},{"./utils.js":"utils.js","./gui.js":"gui.js","./sound":"sound.js","./colors":"colors.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60765" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bitfire.e31bb0bc.js.map