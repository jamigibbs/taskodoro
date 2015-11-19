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
