'use strict';

angular.module('yoStormApp')
  .controller('MainCtrl', function ($scope, $http, $state) {

    $http.get('api/wire').success(function(wires){
      $scope.wires = wires;
    });

    $scope.deleteWire = function(wid) {
      $http.delete('api/wire/' + wid).success(function(result) {
        $state.go('main', {}, {reload: true});
      });
    }

    // $scope.todos = [];
    //$scope.message = account.username;

    // $scope.isCollapsed = false;
    // $scope.isCollapsedHorizontal = false;

    // $http.get('/api/todos').success(function(todos) {
    //   $scope.todos = todos;
    // });

    // Create a new todo
    // $scope.createTodo = function() {
    //     $http.post('/api/todos', $scope.formData)
    //         .success(function(data) {
    //             $scope.formData = {};
    //             $scope.todos = data;
    //             console.log(data);
    //         })
    //         .error(function(error) {
    //             console.log('Error: ' + error);
    //         });
    // };

    // $scope.deleteTodo = function(todoId) {
    //     $http.delete('/api/todos/' + todoId)
    //       .success(function(data) {
    //         $scope.todos = data;
    //         console.log(data);
    //       })
    //       .error(function(error) {
    //         console.log('Error: ' + error);
    //       });
    //     }
    

  });
