'use strict';
/**
 * This will be a base class for the different types of audio players
 */
class AudioEngine {

    constructor() {

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.audioData = null;
        this.audioBuffer = null;
        this.audioSource = this.context.createBufferSource();
        this.buffering = true;

        this.stateCodes = {
            0: "new",
            1: "buffering",
            2: "ready",
            3: "playing"
        };

        this.state = {
            readyState: this.stateCodes[0]
        };

        this.eventQueue = [];

    }

    boot(audioData) {
        this.state.readyState = this.stateCodes[1];
        this.audioData = audioData;

        this.context.decodeAudioData(this.audioData).then(function (buffer) {

            this.audioBuffer = buffer;
            this.audioSource.buffer = buffer;
            this.audioSource.connect(this.context.destination);
            this.state.readyState = this.stateCodes[2];
            //this.processEventQueue();

        }.bind(this));

    }

    play() {

        if (this.state.readyState === this.stateCodes[2]) {
            this.audioSource.start(0);
        } else {
            this.eventQueue.push(this.play);
        }

    }

    togglePlay() {

    }

    pause() {

    }

    stop() {

    }

    processEventQueue() {
        
         var callback;
         for(var i = 0; i < this.eventQueue.length; i++){
         callback = this.eventQueue.shift();
         callback.call();
         }
    }

}

/**
 * This player will act like a simple audio player. It will behave similar to the html5 Audio player
 */
var basicPlayer = class BasicPlayer extends AudioEngine {

    constructor(url) {
        super();
        this.buffering = true;

        //Now we hide the getting of the audio file 

        var request = new XMLHttpRequest();
        request.open('GET', "intro.m4a", true);
        request.responseType = 'arraybuffer';
        request.send();
        request.onload = this.processRequestData.bind(this);
    }

    processRequestData(e) {
        this.boot(e.target.response);
    }

}
;
        module.exports = basicPlayer; // Finally we export the audio engine class