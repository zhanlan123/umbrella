export const Noise = (function () {

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