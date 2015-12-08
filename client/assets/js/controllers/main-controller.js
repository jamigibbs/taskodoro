angular.module('taskodoroApp')

  .controller('mainCtrl', ['$scope', 'Tasks', function($scope, Tasks) {

    $scope.tasks = Tasks.all;

    $scope.addTask = function() {
      Tasks.all.$add({
        description: this.task,
        created_at: Date.now()
      });

      this.task = null;

    };

  }]);
