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
})({"index.js":[function(require,module,exports) {
var SIZE = 270;
var CENTER = SIZE / 2;
var mouse = {
  x: 0.5,
  y: 0.4
}; // A gray-scale height-map.

var COLORS = [[255, 255, 255], [240, 240, 240], [217, 217, 217], [189, 189, 189], [150, 150, 150], [115, 115, 115], [82, 82, 82], [37, 37, 37], [0, 0, 0]]; // Setup the canvas.

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
  var nextColor = COLORS[nextLevel] || 11; // Set the new pixel value.

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
soundRangeElement.addEventListener('input', handleSoundChange); // canvas.addEventListener('click', () => Noise.play());
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61815" + '/');

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
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bitfire.e31bb0bc.js.map