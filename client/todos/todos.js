'use strict';

angular.module('exampleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todos', {
        url: '/todos',
        templateUrl: 'todos/todos.html',
        controller: 'TodosCtrl',
        /**
         * The Stormpath Angular SDK provides a configuration block that informs
         * UI router about protected routes.  When we use `authenticate: true`,
         * the user will be redirected to the login page if they try to access
         * this view but are not logged in.
         */
        sp: {
          authenticate: true
        }
      });
  })
  .controller('TodosCtrl', function ($scope, $http, $timeout, $user) {
	  $scope.formData = {};
      $scope.todoData = {};

      // Get all todos
      $http.get('/todos')
          .success(function(data) {
              $scope.todoData = data;
              console.log(data);
          })
          .error(function(error) {
              console.log('Error: ' + error);
          });

      // Create a new todo
      $scope.createTodo = function(todoID) {
          $http.post('/todos', $scope.formData)
              .success(function(data) {
                  $scope.formData = {};
                  $scope.todoData = data;
                  console.log(data);
              })
              .error(function(error) {
                  console.log('Error: ' + error);
              });
      };

      // Delete a todo
      $scope.deleteTodo = function(todoID) {
          $http.delete('/todos/' + todoID)
              .success(function(data) {
                  $scope.todoData = data;
                  console.log(data);
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
      };
  });