(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * class for handling audio engine
 * @author Fredrik Sigvartsen and Brian Parra
 * @memberOf Flare
 * @class Flare.AudioEngine
 * @constructor
 * @param {Flare.MediaPlayer} mediaPlayer a reference to the mediaPlayer
 * @return {Flare.AudioEngine} returns a Flare AudioEngine
 */

'use strict';

var audioEngine = function (mediaPlayer) {

    /**
     * @property {Flare.VideoPlayer} mediaPlayer - A reference to the mediaPlayer.
     */
    this.mediaPlayer = mediaPlayer;

    /**
     * @property {boolean} mute tells if audio playback is muted
     */
    this.mute;

    /**
     * @property {buffer} source this is the buffer source to play from
     */
    this.source = null;

    /**
     * @property {number} offset the offset in ms to start playing from 
     */
    this.offset;


    /**
     * @property {node} webAudio node for gain
     */
    this.gainNode;

    console.log("test");

    return this;
};

audioEngine.prototype = {
    /**
     * Initializes the audio engine
     * @memberof Flare.AudioEngine.prototype
     * @function boot
     */
    boot: function () {
        
        //this.gainNode = this.mediaPlayer.audioCtx.createGain();
        //this.playing = false;

    },
    /**
     * Creates a new buffer source. This needs to be updated because right now its decoding every time before playing
     * @memberof Flare.AudioEngine.prototype
     * @function createNewBufferSource
     */
    createNewBufferSource: function () {
        
        this.source = this.mediaPlayer.audioCtx.createBufferSource();
        this.mediaPlayer.audioCtx.decodeAudioData(this.mediaPlayer.buffer.getAudioSource(), function (decodedBuffer) {
            this.source.buffer = decodedBuffer;
            console.log("done loading buffer");
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.mediaPlayer.audioCtx.destination);
            console.log(this.offset);
            this.source.start(0, this.offset);
        }.bind(this));



    },
    /**
     * Starts the playback at the desired offset in ms
     * @memberof Flare.AudioEngine.prototype
     * @function playSound
     * @param {number} time offset in ms
     */
    playSound: function (time) {

        if (this.playing)
            return;

        this.offset = time / 1000;
        this.createNewBufferSource();


        this.playing = true;

    },
    /**
     * Stops playback
     * 
     * @memberof Flare.AudioEngine.prototype
     * @function stopSound
     */
    stopSound: function () {

        //if (!this.source.stop)
        //  this.source.stop = this.source.noteOff;

        this.source.stop();
        this.playing = false;

    },
    /**
     * toggles playback time
     * 
     * @memberof Flare.AudioEngine.prototype
     * @function toggle
     * @param {number} time offset to toggle at
     */
    toggle: function (time) {

        this.playing ? this.stop(time) : this.play(time);
        this.playing = !this.playing;

    },
    /**
     * mutes the audio
     * 
     * @memberof Flare.AudioEngine.prototype
     * @function muteAudio
     */
    muteAudio: function () {

        if (this.mute.id != "activated") {
            this.gainNode.gainvalue = 0; //Muting
            this.mute.id = "activated";
            this.mute.innerHTML = "Unmute"; //Will probably change to a different button in the mediaplayer
        } else {
            this.gainNode.gain.value = 1;
            this.mute.id = "deactivated";
            this.mute.innerHTML = "Mute";
        }

    },
    /**
     * Canges the audio volume
     * 
     * @memberof Flare.AudioEngine.prototype
     * @function changeVolume
     * @param {rangeElement} rangeElement range of volume slider
     */
    changeVolume: function (rangeElement) {

        var volume = element.value;
        var portion = parseInt(volume) / parseInt(element.max);

        this.gainNode.gain.value = portion * portion;

    }
};

audioEngine.prototype.constructor = audioEngine;
module.exports = audioEngine; // Finally we export the audio engine class
},{}],2:[function(require,module,exports){
(function() {
    var audioengine = require('../src/audioengine.js');
})();



},{"../src/audioengine.js":1}]},{},[2]);
