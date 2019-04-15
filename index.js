const SIZE = 270;
const CENTER = SIZE / 2;

let mouse = {
    x: 0.5,
    y: 0.4
};

// A gray-scale height-map.
const COLORS = [
    [255, 255, 255],
    [240, 240, 240],
    [217, 217, 217],
    [189, 189, 189],
    [150, 150, 150],
    [115, 115, 115],
    [82, 82, 82],
    [37, 37, 37],
    [0, 0, 0]
];


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

    const nextColor = COLORS[nextLevel] || 11;

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
    // }, 1000);
}

// Go!
render();


var Noise = (function () {

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

// canvas.addEventListener('click', () => Noise.play());
