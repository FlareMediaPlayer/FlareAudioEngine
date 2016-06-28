'use strict';

var engine = class AudioEngine {

    constructor() {

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.audioData = null;
        this.audioBuffer = null;
        this.audioSource = this.context.createBufferSource();
        this.onBootEvent = null;

    }
    
    boot(audioData) {

        this.audioData = audioData;

        this.context.decodeAudioData(this.audioData).then(function (buffer) {

            this.audioBuffer = buffer;
            this.audioSource.buffer = buffer;
            console.log(buffer);
            this.audioSource.connect(this.context.destination);
            this.onBootEvent.call();

        }.bind(this));

    }

    setBootEvent(callback) {
        this.onBootEvent = callback;
    }

    play() {
        this.audioSource.start(0);
    }

    pause() {

    }

}




module.exports = engine; // Finally we export the audio engine class