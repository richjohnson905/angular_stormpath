'use strict';

angular.module('yoStormApp')
  .controller('MainCtrl', function ($scope, $http, $state, HourFormat) {

    $http.get('api/wire').success(function(wires){
      $scope.foo = wires;
      var allWires = [];
      for (var i = 0; i < wires.length; i++) {
        var newWire = new Object();
        newWire.date = new Date(wires[i].date);
        newWire.hour = HourFormat.apply(wires[i].Nut.hour);
        newWire.name = wires[i].Consumers[0].name;
        newWire.cid = wires[i].Consumers[0].id;
        allWires.push(newWire);
      }
      $scope.wires = allWires;
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
