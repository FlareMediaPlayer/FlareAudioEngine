(function () {
    
    var FlareAudioEngine = require('../src/audioengine.js'); // import the audio engine
    var playButton = document.getElementById("playButton");
    
    initPlayer = function () {
        playButton.disabled = false; //ready to play!
    };

    
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
    
    var playButton2 = document.getElementById("playButton2"); 
    var audioTest = new Audio("intro.m4a");
    playButton2.onclick = function(){
        audioTest.play();
    }

})();
