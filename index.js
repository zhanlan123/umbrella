import {
    createNode,
    downloadContent,
    emptyElement,
    getQueryStringObjectFromHash,
    serializeObject
} from './utils.js';

import {controls} from "./gui.js";


const setAttributes = (element, attributes) => Object.entries(attributes)
    .forEach(([key, val]) =>
        element.setAttribute(key, val));

const elements = controls.map(control => {
    const label = document.createElement('label');
    const text = document.createTextNode(control.id);
    const input = document.createElement('input');

    setAttributes(input, control);

    const val = document.createElement('span');
    val.innerHTML = ` (${control.value})`;

    label.appendChild(text);
    label.appendChild(val);
    label.appendChild(input);

    input.addEventListener('change', event => {
        val.innerHTML = ` (${event.target.value})`;
        const options = Array.from(document.querySelectorAll('input'))
            .map(({id, value}) => ({[id]: value}))
            .reduce((memo, item) => Object.assign(memo, item), {});
        location.hash = serializeObject(options);
    });

    return label;
});

const target = document.getElementById('controls');
elements.forEach(element => target.appendChild(element));

// const search = window.location.search;
const params = getQueryStringObjectFromHash();
Object.keys(params).forEach(key => {
    const input = document.getElementById(key);
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

const SIZE = 256;
const CENTER = SIZE / 2;

let selectedColorScheme = 0;
let tick = 0;
let mouse = {
    x: 0.5,
    y: 0.4
};

// A gray-scale height-map.
const COLORS = [[
    [255, 255, 255],
    [240, 240, 240],
    [217, 217, 217],
    [189, 189, 189],
    [150, 150, 150],
    [115, 115, 115],
    [82, 82, 82],
    [37, 37, 37],
    [0, 0, 0]
], [
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
], [
    [255, 247, 251],
    [236, 231, 242],
    [208, 209, 230],
    [166, 189, 219],
    [116, 169, 207],
    [54, 144, 192],
    [5, 112, 176],
    [4, 90, 141],
    [2, 56, 88]
]];


// Setup the canvas.
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = SIZE;
canvas.height = SIZE;

const imageData = context.getImageData(0, 0, SIZE, SIZE);

// One buffer to hold the color data for each pixel.
const buffer = new ArrayBuffer(imageData.data.length);
const bufferViewInt8 = new Uint8ClampedArray(buffer);
const bufferViewInt32 = new Uint32Array(buffer);

// One buffer to hold the height map level for each pixel.
const levelBuffer = new ArrayBuffer(imageData.data.length);
const levelBufferViewInt8 = new Uint8ClampedArray(levelBuffer);

// Check if a coordinate is inside a circle with center x1, y1 and radius r.
function isInsideCircle(x1, y1, x2, y2, r) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < r
}

function rain(tick) {

    const w = canvas.offsetWidth;
    canvas.style.height = w;

    for (let y = 0; y < SIZE; y += (tick % 2) + 1) {
        for (let x = 0; x < SIZE; x += (tick % 2) + 1) {

            const index = (y) * SIZE + x;

            // Generate rain in the top of the image.
            const isRain = y < 2;

            // Generate a flooded street in the bottom of the image.
            const isStreet = y > Math.round(CENTER * 1.53) && y < Math.round(CENTER * 1.57);

            // Mask out the silhouette of an umbrella in the middle of the image.
            const isUmbrella = Math.random() > 0.8
                && isInsideCircle(CENTER, CENTER, x, y, 32)
                && !isInsideCircle(CENTER, CENTER - 10, x - 1, y, 40);

            if (isRain || isStreet || isUmbrella) {
                levelBufferViewInt8[index] = 0;
            }

            // Bring it to life.
            moveDroplet(index);
        }
    }

    // Update the canvas with the new pixel values.
    imageData.data.set(bufferViewInt8);
    context.putImageData(imageData, 0, 0);
}

function moveDroplet(src) {

    const nextLevel = levelBufferViewInt8[src] + Math.round(Math.random() * 1.3);

    // Generate a 0, 1 or 2.
    const rand = Math.round(Math.random() * 2.0);

    // Add horizontal movement to create a wind effect.
    const horizontalMovement = Math.random() > 0.8
        ? src - rand + Math.floor((mouse.x * 8 - 3))
        : src;

    // Every 1 in 5 the rain will move up-wards and create the
    // street splash effect.
    const verticalMovement = Math.floor(Math.random() * (4 + Math.floor((mouse.y * 4)))) * (Math.random() > 0.2
        ? 1
        : -1);

    levelBufferViewInt8[horizontalMovement + (SIZE * verticalMovement)] = nextLevel - (rand & 1);

    const nextColor = COLORS[selectedColorScheme][nextLevel] || 11;

    // Set the new pixel value.
    bufferViewInt32[src - SIZE] =
        (255 << 24) |           // Alpha
        (nextColor[2] << 16) |  // Blue
        (nextColor[1] << 8) |   // Green
        nextColor[0];           // Red
}

function render() {
    rain(tick++);

    // Go again!
    // setTimeout(function () {
    requestAnimationFrame(() => render());
    // }, 1000);
}

// Go!
render();


const Noise = (function () {

    const track = {};
    const audioContext = new (window.AudioContext || window.webkitAudioContext);

    function createNoise(track) {
        var lastOut = 0.0;
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
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
    }

    // Expose functions:
    return {
        play: playNoise,
        stop: stopNoise
    }

}());


let handleMousemove = (event) => {
    const {target} = event;
    mouse.x = target.value / 100;
};

const handleRainChange = (event) => {
    const {target} = event;
    mouse.y = target.value / 100;
};

const handleColorChange = (event) => {
    const {target} = event;
    selectedColorScheme = parseInt(target.value);
    console.log(selectedColorScheme);
};

const handleSoundChange = (event) => {
    const {target} = event;
    if (target.value === "1") {
        Noise.play();
    } else {
        Noise.stop();
    }
};


const wind = document.getElementById('wind');
wind.addEventListener('input', handleMousemove);

const rainRangeElement = document.getElementById('rain');
rainRangeElement.addEventListener('input', handleRainChange);


const soundRangeElement = document.getElementById('sound');
soundRangeElement.addEventListener('input', handleSoundChange);

const colorRangeElement = document.getElementById('color');
colorRangeElement.addEventListener('input', handleColorChange);
