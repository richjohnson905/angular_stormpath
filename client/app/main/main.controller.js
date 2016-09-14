'use strict';

angular.module('yoStormApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.todos = [];

    $http.get('/api/todos').success(function(todos) {
      $scope.todos = todos;
    });

    // Create a new todo
      $scope.createTodo = function(todoID) {
          $http.post('/api/todos', $scope.formData)
              .success(function(data) {
                  $scope.formData = {};
                  $scope.todos = data;
                  console.log(data);
              })
              .error(function(error) {
                  console.log('Error: ' + error);
              });

      };

  });
