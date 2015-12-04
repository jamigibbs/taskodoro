angular.module('taskodoroApp')

  .factory('SoundPlayer', function(){

    var audioPath = '/assets/sounds/';
    var soundFile = null;
    var currentSoundFile = null;

    return {

      setSound: function(name) {

        soundFile = name;

        currentSoundFile = new buzz.sound(audioPath + soundFile, {
          formats: [ 'mp3' ],
          preload: true,
          autoplay: true,
          loop: false
        });

      },

      play: function(){
	      currentSoundFile.play();
	    }

    };

  });
