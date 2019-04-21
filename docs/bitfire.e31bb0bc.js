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
  id: 'wind',
  type: 'range',
  min: 0,
  max: 100,
  step: 1,
  value: 50
}, {
  id: 'rain',
  type: 'range',
  min: 0,
  max: 100,
  step: 1,
  value: 50
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
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils.js");

var _gui = require("./gui.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  input.addEventListener('change', function (event) {
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
/*





const svg = createNode("svg");
document.getElementById('js-paper').appendChild(svg);

window.addEventListener("hashchange", event => {
  const options = getQueryStringObjectFromHash();
  render({svg, ...options});
  Object.keys(options).forEach(key => {
    const input = document.getElementById(key);
    if (input) {
      input.value = options[key];
    }
  });
});

const options = Array.from(document.querySelectorAll('input'))
    .map(({id, value}) => ({[id]: value}))
    .reduce((memo, item) => Object.assign(memo, item), {});
render({svg, ...options});


const downloadButton = document.createElement('button');
downloadButton.innerText = "Download SVG";
downloadButton.addEventListener('click', event => {
  const options = Array.from(document.querySelectorAll('input'))
      .map(({id, value}) => ({[id]: value}))
      .reduce((memo, item) => Object.assign(memo, item), {});
  render({svg, ...options});
  const values = Object.values(options).join('-');
  downloadContent(`mandala-${values}.svg`, svg.outerHTML);
});
target.appendChild(downloadButton);

function render(options) {

  const {svg} = options;

  const size = 540;
  const table = parseInt(options.table);
  const modulo = parseInt(options.modulo);
  const rotation = parseInt(options.rotation);
  const start = parseInt((options.start || 0) / 100 * modulo);
  const end = parseInt((options.end || 100) / 100 * modulo);

  const width = size;
  const height = size;

  emptyElement(svg);
  svg.setAttribute("viewBox", `0, 0, ${size}, ${size}`);
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);


  // Create an array of circle coordinates.
  const circle = new Array(modulo).fill(0).map((_, index) => index * (Math.PI * 2) / modulo).map(angle => {
    const x = width / 2 * Math.cos(angle + (Math.PI / 180 * rotation)) + width / 2;
    const y = height / 2 * Math.sin(angle + (Math.PI / 180 * rotation)) + height / 2;
    return {x, y};
  });

  // Create the lines.
  const lines = new Array(end - start).fill(0).map((_, index) => start + index).map(i => {
    const p1 = parseInt(i % modulo, 10);
    const p2 = parseInt((table * i) % modulo, 10);

    const start = circle[p1];
    const end = circle[p2];

    const {x: x1, y: y1} = start;
    const {x: x2, y: y2} = end;

    if (options.center === "1") {
      const w = Math.abs(x1 - x2);
      const h = Math.abs(y1 - y2);

      const x = x1 < x2 ? x1 : x2;
      const y = y1 < y2 ? y1 : y2;
      const diffx = size / 2 - x;
      const diffy = size / 2 - y;

      const res = {
        x1: x1 + diffx - w / 2,
        x2: x2 + diffx - w / 2,
        y1: y1 + diffy - h / 2,
        y2: y2 + diffy - h / 2
      };

      return res;
    }

    return {x1, y1, x2, y2};
  });

  const filteredLines = lines.filter((_, index) => {
    return index % parseInt(options.keepEveryNLines) === parseInt(options.keepEveryNLinesShift);
  });

  const filteredLines2 = parseInt(options.minLength) === 0 ? filteredLines : filteredLines.filter(line => {
    const a = line.x1 - line.x2;
    const b = line.y1 - line.y2;
    const length = Math.sqrt(a * a + b * b);
    return length > options.minLength
  });


  // Append lines to svg element.
  filteredLines2.forEach(coordinates => {
    const line = createNode("line", {
      strokeWidth: 0.4,
      stroke: "#FFFFFF", ...coordinates
    });
    svg.appendChild(line);
  });

}

* */

var SIZE = 256;
var CENTER = SIZE / 2;
var selectedColorScheme = 0;
var tick = 0;
var mouse = {
  x: 0.5,
  y: 0.4
}; // A gray-scale height-map.

var COLORS = [[[255, 255, 255], [240, 240, 240], [217, 217, 217], [189, 189, 189], [150, 150, 150], [115, 115, 115], [82, 82, 82], [37, 37, 37], [0, 0, 0]], [[255, 255, 204], [255, 237, 160], [254, 217, 118], [254, 178, 76], [253, 141, 60], [252, 78, 42], [227, 26, 28], [189, 0, 38], [128, 0, 38]], [[255, 247, 251], [236, 231, 242], [208, 209, 230], [166, 189, 219], [116, 169, 207], [54, 144, 192], [5, 112, 176], [4, 90, 141], [2, 56, 88]]]; // Setup the canvas.

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

function rain(tick) {
  var w = canvas.offsetWidth;
  canvas.style.height = w;

  for (var y = 0; y < SIZE; y += tick % 2 + 1) {
    for (var x = 0; x < SIZE; x += tick % 2 + 1) {
      var index = y * SIZE + x; // Generate rain in the top of the image.

      var isRain = y < 2; // Generate a flooded street in the bottom of the image.

      var isStreet = y > Math.round(CENTER * 1.53) && y < Math.round(CENTER * 1.57); // Mask out the silhouette of an umbrella in the middle of the image.

      var isUmbrella = Math.random() > 0.8 && isInsideCircle(CENTER, CENTER, x, y, 32) && !isInsideCircle(CENTER, CENTER - 10, x - 1, y, 40);

      if (isRain || isStreet || isUmbrella) {
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

  var horizontalMovement = Math.random() > 0.8 ? src - rand + Math.floor(mouse.x * 8 - 3) : src; // Every 1 in 5 the rain will move up-wards and create the
  // street splash effect.

  var verticalMovement = Math.floor(Math.random() * (4 + Math.floor(mouse.y * 4))) * (Math.random() > 0.2 ? 1 : -1);
  levelBufferViewInt8[horizontalMovement + SIZE * verticalMovement] = nextLevel - (rand & 1);
  var nextColor = COLORS[selectedColorScheme][nextLevel] || 11; // Set the new pixel value.

  bufferViewInt32[src - SIZE] = 255 << 24 | // Alpha
  nextColor[2] << 16 | // Blue
  nextColor[1] << 8 | // Green
  nextColor[0]; // Red
}

function render() {
  rain(tick++); // Go again!
  // setTimeout(function () {

  requestAnimationFrame(function () {
    return render();
  }); // }, 1000);
} // Go!


render();

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

var handleMousemove = function handleMousemove(event) {
  var target = event.target;
  mouse.x = target.value / 100;
};

var handleRainChange = function handleRainChange(event) {
  var target = event.target;
  mouse.y = target.value / 100;
};

var handleColorChange = function handleColorChange(event) {
  var target = event.target;
  selectedColorScheme = parseInt(target.value);
  console.log(selectedColorScheme);
};

var handleSoundChange = function handleSoundChange(event) {
  var target = event.target;

  if (target.value === "1") {
    Noise.play();
  } else {
    Noise.stop();
  }
};

var wind = document.getElementById('wind');
wind.addEventListener('input', handleMousemove);
var rainRangeElement = document.getElementById('rain');
rainRangeElement.addEventListener('input', handleRainChange);
var soundRangeElement = document.getElementById('sound');
soundRangeElement.addEventListener('input', handleSoundChange);
var colorRangeElement = document.getElementById('color');
colorRangeElement.addEventListener('input', handleColorChange);
},{"./utils.js":"utils.js","./gui.js":"gui.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64598" + '/');

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