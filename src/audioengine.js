'use strict';

var AudioEngine = function (mediaPlayer) {

    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.audioData = null;
    this.audioBuffer = null;
    this.audioSource = this.context.createBufferSource();
    this.onBootEvent = null;

};

AudioEngine.prototype = {
    boot: function (audioData) {
        this.audioData = audioData;

        this.context.decodeAudioData(this.audioData).then(function (buffer) {

            this.audioBuffer = buffer;
            this.audioSource.buffer = buffer;
            this.audioSource.connect(this.context.destination);
            this.onBootEvent.call();
            
        }.bind(this));

    },
    
    setBootEvent: function (callback) {
        this.onBootEvent = callback;
    },
    
    play: function (){
        this.audioSource.start(0);
    }
};



AudioEngine.prototype.constructor = AudioEngine;
module.exports = AudioEngine; // Finally we export the audio engine class