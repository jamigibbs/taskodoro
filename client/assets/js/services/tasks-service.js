angular.module('taskodoroApp')

  .factory('Tasks', [ '$firebaseArray', function($firebaseArray){

    var ref = new Firebase("https://glaring-inferno-4633.firebaseio.com");

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    return {
      all: tasks
    };

  }]);
