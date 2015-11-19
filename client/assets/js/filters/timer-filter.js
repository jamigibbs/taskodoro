angular.module('taskodoroApp')

  // Converts seconds into hour:min:sec format
  .filter('secondsTime', [function() {
      return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
      };
  }]);
