import {getQueryStringObjectFromHash, serializeObject} from './utils.js';


import {controls} from "./gui.js";
import {Noise} from './sound';
import {COLORS} from "./colors";

let settings = {};

const setSettings = options => {
    settings = options;
    if (settings.sound === "1") {
        Noise.play();
    } else {
        Noise.stop();
    }
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

window.addEventListener("hashchange", event => {
    const options = getQueryStringObjectFromHash();
    setSettings(options);
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

setSettings(options);


const SIZE = 256;
const CENTER = SIZE / 2;

let tick = 0;


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
    // const horizontalMovement = Math.random() > 0.8
    //     ? src - rand + Math.floor((settings.wind * 8 - 3))
    //     : src;
    const horizontalMovement = src + Math.floor(parseFloat(settings.horizontalMovementOffset) + Math.random()*parseFloat(settings.horizontalMovementMax));


    // Every 1 in 5 the rain will move up-wards and create the
    // street splash effect.
    const verticalMovement = Math.floor(parseFloat(settings.verticalMovementOffset) + Math.random()*parseFloat(settings.verticalMovementMax));

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
    rain(tick++);

    // Go again!
    // setTimeout(function () {
    requestAnimationFrame(() => render());
    // }, 100);
}

// Go!
render();




// const wind = document.getElementById('wind');
// wind.addEventListener('input', handleMousemove);

// const rainRangeElement = document.getElementById('rain');
// rainRangeElement.addEventListener('input', handleRainChange);


// const soundRangeElement = document.getElementById('sound');
// soundRangeElement.addEventListener('input', handleSoundChange);

// const colorRangeElement = document.getElementById('color');
// colorRangeElement.addEventListener('input', handleColorChange);
