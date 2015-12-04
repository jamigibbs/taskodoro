(function() {
  'use strict';

  angular.module('taskodoroApp', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // Firebase
    'firebase'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$animateProvider'];

  function config($urlProvider, $locationProvider, $animateProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    // http://goo.gl/HgA1Em
    $animateProvider.classNameFilter(/animate-/);

  }

  function run() {
    FastClick.attach(document.body);
  }

})();

angular.module('taskodoroApp')

  .controller('mainCtrl', function($scope, $firebaseArray) {
    var ref = new Firebase("https://glaring-inferno-4633.firebaseio.com");

    // create a synchronized array
    $scope.messages = $firebaseArray(ref);

    // add new items to the array
    // the message is automatically added to our Firebase database
    // $scope.addMessage = function() {
    //   $scope.messages.$add({
    //     text: $scope.newMessageText
    //   });
    // };

  });

angular.module('taskodoroApp')

  .directive('timer', ['$rootScope', '$interval', 'SoundPlayer', function($rootScope, $interval, SoundPlayer) {

    return {
      restrict: 'E',
      //scope: {},
      link: function(scope, element, attrs) {

        // Set our base times
        var workTime = 1500; // 25 min = 1500
        var breakTime = 300; // 5 min = 300
        var longBreakTime = 1800; // 30 min == 1800;
        scope.time = workTime;

        // To cancel the time updates
        var stopTimer;

        // Set our booleans
        scope.timerActive = false;
        scope.workTimer = true;
        scope.breakTimer = false;
        scope.milestone = false;

        // For counting our total work sessions
        scope.workSessions = 0;

        // Our view text
        scope.btnStart = 'Start';
        scope.btnReset = 'Reset';
        scope.btnBreak = 'Take a break';

        // Timer
        scope.timerStart = function(){
          scope.timerActive = true;
          stopTimer = $interval(function () {
            scope.time--;
          }, 1000);
        };

        // Reset timer with ngClick
        scope.resetTime = function(event){
          scope.time = workTime;
          scope.timerActive = false;
          $interval.cancel(stopTimer);
        };

        // Checking timer status and adjusting variable states
        var timerStatus = function(){
          // Stop the timer at zero
          if(scope.time === 0){
            $interval.cancel(stopTimer);
          }
          // Handle the completed work timer
          if(scope.workTimer && (scope.time === 0)){

            // Play work ding sound
            SoundPlayer.setSound('work-ding');
            SoundPlayer.play();

            scope.workSessions++;
            scope.breakTimer = true;
            scope.workTimer = false;
            scope.timerActive = false;

            // If 4 work sessions have completed
            if( scope.workSessions === 4){
              scope.time = longBreakTime; // 30 min
              scope.workSessions = 0;
            } else {
              scope.time = breakTime; // 5 min
            }
          // Handle the completed break timer
          } else if(scope.breakTimer && (scope.time === 0) ){

            // Play break ding sound
            SoundPlayer.setSound('break-ding');
            SoundPlayer.play();

            scope.breakTimer = false;
            scope.workTimer = true;
            scope.timerActive = false;
            scope.time = workTime; // 25 min
          }
        };

        // Watch the timer changes and update the status
        scope.$watch(function() {
          timerStatus();
        });

      }

    };

  }]);

angular.module('taskodoroApp')

  // Converts seconds into hour:min:sec format
  .filter('secondsTime', [function() {
      return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
      };
  }]);

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
