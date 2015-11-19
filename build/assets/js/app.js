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

  .directive('timer', ['$interval', function($interval) {

    return {
      restrict: 'E',
      scope: {
        value: "="
      },
      template: '<h1 ng-bind=" time | secondsTime | date:\'m:ss\' "></h1>' +
      '<a ng-hide="timerActive" class="button success expand timer-button" ng-click="updateTime($event)" ng-bind="btnStart"></a>' +
      '<a ng-show="timerActive" class="button secondary expand timer-button" ng-bind="btnReset" ng-click="resetClick($event)"></a>',
      link: function(scope, element, attrs) {

        var timerActive;
        var internalPromise;
        scope.time = scope.value;
        scope.btnStart = 'Start';
        scope.btnReset = 'Reset';

        scope.updateTime = function(){
          scope.timerActive = true;
          internalPromise = $interval(function () {
            scope.time--;
            if ( scope.time === 0){
              $interval.cancel(internalPromise);
            }
          }, 1000);
        };

        scope.resetClick = function(event){
          scope.time = scope.value;
          scope.timerActive = false;
          $interval.cancel(internalPromise);
        };

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

    $scope.workTime = 1500; // 25 min

  });
