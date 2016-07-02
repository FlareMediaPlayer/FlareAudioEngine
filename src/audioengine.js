'use strict';
/**
 * This will be a base class for the different types of audio players
 */
class AudioEngine {

    constructor() {

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.audioData = null;
        this.audioBuffer = null;
        this.audioSource = null;



        this.state = 0;

       
    }

    play(buffer) {

            this.audioSource = this.context.createBufferSource();
            this.audioSource.buffer = buffer;
            this.audioSource.connect(this.context.destination);
            //bind the handlers
            this.audioSource.onended = this.handlePlayEnd.bind(this);

            this.audioSource.start(0);
            this.startTime = this.context.currentTime;

    }
    
    getCurrentTime(){
        return this.context.currentTime;
    }
    
    getStartTime(){
        return this.startTime;
    }

    togglePlay() {

    }

    pause() {

    }

    stop() {

    }

    handlePlayEnd() {
        this.onEndedCallback.call();
    }

}

/**
 * This player will act like a simple audio player. It will behave similar to the html5 Audio player
 */
var basicPlayer = class BasicPlayer extends AudioEngine {

    constructor(url) {
        super();
    
    }
    
    registerEndFunction(onEndedCallback){
        this.onEndedCallback = onEndedCallback;
    }

}

module.exports = basicPlayer; // Finally we export the audio engine class