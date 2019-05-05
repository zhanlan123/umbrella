import {getQueryStringObjectFromHash, serializeObject} from './utils.js';


import {controls} from "./gui.js";
import {Noise} from './sound';
import {COLORS} from "./colors";

let settings = {
    mask: []
};

const setSettings = options => {
    if (options.sound !== settings.sound) {
        if (settings.sound === "1") {
            Noise.play();
        } else {
            Noise.stop();
        }
    }

    if (settings.mask !== options.mask) {
        const mask = document.createElement('img');
        mask.onload = function () {

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = mask.width;
            canvas.height = mask.height;
            context.drawImage(mask, 0, 0);
            settings.mask = context.getImageData(0, 0, mask.width, mask.height).data;

        };
        mask.src = `masks/${options.mask}.gif`;

    }

    settings = Object.assign(settings, options);
};

const setAttributes = (element, attributes) => Object.entries(attributes)
    .forEach(([key, val]) =>
        element.setAttribute(key, val));

const elements = controls.map(control => {
    const label = document.createElement('label');
    const text = document.createTextNode(control.id);
    const input = document.createElement('input');

    setAttributes(input, control);

    const val = document.createElement('span');
    val.id = `label-${control.id}`;
    val.innerHTML = ` (${control.value})`;

    label.appendChild(text);
    label.appendChild(val);
    label.appendChild(input);

    input.addEventListener('input', event => {
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

window.addEventListener("hashchange", event => {
    const options = getQueryStringObjectFromHash();
    setSettings(options);
    Object.keys(options).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = options[key];
            const labelId = `label-${key}`;
            document.getElementById(labelId).innerHTML = ` (${options[key]})`;
        }
    });
});

const options = Array.from(document.querySelectorAll('input'))
    .map(({id, value}) => ({[id]: value}))
    .reduce((memo, item) => Object.assign(memo, item), {});

setSettings(options);

const SIZE = 256;

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

function rain() {

    const w = canvas.offsetWidth;
    canvas.style.height = w;

    for (let y = 0; y < SIZE; y += 1) {
        for (let x = 0; x < SIZE; x += 1) {

            const index = (y) * SIZE + x;
            const alpha = settings.mask[index * 4] || 0;

            const odds = 1 / 255 * (255 - alpha);
            if (alpha && Math.random() > odds) {
                levelBufferViewInt8[index] = 0;
            }

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
    // const horizontalMovement = Math.random() > 0.8
    //     ? src - rand + Math.floor((settings.wind * 8 - 3))
    //     : src;
    const horizontalMovement = src + Math.floor(parseFloat(settings.horizontalMovementOffset) + Math.random() * parseFloat(settings.horizontalMovementMax));


    // Every 1 in 5 the rain will move up-wards and create the
    // street splash effect.
    const verticalMovement = Math.floor(parseFloat(settings.verticalMovementOffset) + Math.random() * parseFloat(settings.verticalMovementMax));

    levelBufferViewInt8[horizontalMovement + (SIZE * verticalMovement)] = nextLevel - (rand & 1);

    const nextColor = COLORS[settings.color][nextLevel] || 11;

    // Set the new pixel value.
    bufferViewInt32[src - SIZE] =
        (255 << 24) |           // Alpha
        (nextColor[2] << 16) |  // Blue
        (nextColor[1] << 8) |   // Green
        nextColor[0];           // Red
}

function render() {
    rain();

    // Go again!
    // setTimeout(function () {
    requestAnimationFrame(() => render());
    // }, 100);
}

// Go!
const mask = document.createElement('img');
mask.onload = function () {

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = mask.width;
    canvas.height = mask.height;
    context.drawImage(mask, 0, 0);
    settings.mask = context.getImageData(0, 0, mask.width, mask.height).data;

};
mask.src = `masks/${options.mask}.gif`;

render();