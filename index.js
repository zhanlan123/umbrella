const SIZE = 270;
const CENTER = SIZE / 2;

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
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = SIZE;
canvas.height = SIZE;

// Append the canvas to the dom.
document.body.appendChild(canvas);

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

    for (let y = 0; y < SIZE; y += 1) {
        for (let x = 0; x < SIZE; x += 1) {

            const index = (y) * SIZE + x;

            // Generate rain in the top of the image.
            const isRain = y < 2;

            // Generate a flooded street in the bottom of the image.
            const isStreet = y > Math.round(CENTER*1.53) && y < Math.round(CENTER*1.57);

            // Mask out the silhouette of an umbrella in the middle of the image.
            const isUmbrella = Math.random() > 0.8
                && isInsideCircle(CENTER, CENTER, x, y, 32)
                && !isInsideCircle(CENTER, CENTER - 10, x, y, 40);

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

    // Wind alternatives...
    // A little bit of wind.
    // const horizontalMovement = src - rand + 1;

    // No wind.
    // const horizontalMovement = src;

    // A lot of wind.
    // const horizontalMovement = src - rand - 2;

    // A little bit of both.
    const horizontalMovement = Math.random() > 0.8
        ? src - rand + 1
        : src;

    // Every 1 in 5 the rain will move up-wards and create the
    // street splash effect.
    const verticalMovement = Math.floor(Math.random() * 4.5) * (Math.random() > 0.2
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
    requestAnimationFrame(() => render());
}

// Go!
render();
