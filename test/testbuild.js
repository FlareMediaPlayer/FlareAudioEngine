(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
(function () {
    
    var FlareAudioEngine = require('../src/audioengine.js'); // import the audio engine
    var playButton = document.getElementById("playButton");
    
    initPlayer = function () {
        playButton.disabled = false; //ready to play!
    }

    
    var audioengine = new FlareAudioEngine(); // create new engine	
    audioengine.setBootEvent(initPlayer);														// audio engine


    playButton.disabled = true;

    var sound;
    var request = new XMLHttpRequest();
    request.open('GET', "intro.m4a", true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        audioengine.boot(this.response);
    }



    request.send();
    
    playButton.onclick = function(){
        audioengine.play();
    };

})();

},{"../src/audioengine.js":1}]},{},[2]);
