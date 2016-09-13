'use strict';

angular.module('yoStormApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.todos = [];

    $http.get('/api/todos').success(function(todos) {
      $scope.todos = todos;
    });

  });
