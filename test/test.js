(function () {
    
    var FlareAudioEngine = require('../src/audioengine.js'); // import the audio engine
    var playButton = document.getElementById("playButton");
    


    
    var audioengine = new FlareAudioEngine("intro.m4a"); // create new engine	
 


    
    
    playButton.onclick = function(){
        audioengine.play();
    };

    


})();
