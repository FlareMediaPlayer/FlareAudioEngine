'use strict';
/**
 * This will be a base class for the different types of audio players
 */
class AudioEngine {

    constructor() {

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.context.destination);
        this.audioData = null;
        this.audioBuffer = null;
        this.audioSource = null;



        this.state = 0;

       
    }

    play(buffer, offset) {

            this.audioSource = this.context.createBufferSource();
            this.audioSource.buffer = buffer;
            this.audioSource.connect(this.gainNode);
            //bind the handlers
            this.audioSource.onended = this.handlePlayEnd.bind(this);

            this.audioSource.start(0, offset);
            this.startTime = this.context.currentTime;
            return this.startTime;
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
        
        this.stopTime = this.context.currentTime;
        this.audioSource.stop();
        return this.stopTime;
        
    }

    handlePlayEnd(e) {
        console.log(e);
        //this.onEndedCallback.call();
    }
    
    handleVolumeChanged(valueData){

        this.gainNode.gain.value = valueData.percent;
        
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