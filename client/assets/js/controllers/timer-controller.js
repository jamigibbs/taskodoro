angular.module('taskodoroApp')

  .controller('firebaseCtrl', function($scope, $firebaseArray) {
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

  })

  .controller('counterCtrl',['$scope', '$timeout', function($scope, $timeout){

    // Initial values for counter
    var timerAction;
    var baseTime = 1500; // 25 min
    $scope.counter = baseTime;
    $scope.timerRunning = false;

    $scope.countdown = function() {

      $scope.timerRunning = true;

      //Cancels a task associated with the promise. As a result of this, the
      //promise will be resolved with a rejection.
      timerAction = $timeout(function() {
        $scope.counter--;
        $scope.countdown();
      }, 1000);

      if( $scope.counter === 0 ) {
        $timeout.cancel(timerAction);
        $scope.timerRunning = false;
      }

    };

    $scope.stop = function(){
      $timeout.cancel(timerAction);
      $scope.timerRunning = false;
    };

    $scope.reset = function(){
      $timeout.cancel(timerAction);
      $scope.counter = baseTime;
    };

  }]);
