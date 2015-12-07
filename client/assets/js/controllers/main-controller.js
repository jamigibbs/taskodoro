angular.module('taskodoroApp')

  .controller('mainCtrl', ['$scope', 'Tasks', function($scope, Tasks) {

    $scope.tasks = Tasks.all;

  }]);
