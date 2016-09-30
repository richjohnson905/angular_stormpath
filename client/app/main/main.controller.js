'use strict';

angular.module('yoStormApp')
  .controller('MainCtrl', function ($scope, $http, $state) {

    $http.get('api/wire').success(function(wires){
      var allWires = [];
      for (var i = 0; i < wires.length; i++) {
        var newWire = new Object();
        var date = wires[i].date;
        var hour = wires[i].Nut.hour;
        var name = wires[i].Consumers[0].name;
        newWire.date = new Date(date);
        newWire.hour = hourFormat(hour);
        newWire.name = name;
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

function hourFormat(hour) {
  var hourFormatted; 
  switch (hour) {
    case 6:
      hourFormatted = "6 am";
      break;
    case 7:
      hourFormatted = "7 am";
      break;
    case 8:
      hourFormatted = "8 am";
      break;
    case 9:
      hourFormatted = "9 am";
      break;
    case 10:
      hourFormatted = "10 am";
      break;
    case 11:
      hourFormatted = "11 am";
      break;
    case 12:
      hourFormatted = "12 pm";
      break;
    case 13:
      hourFormatted = "1 pm";
      break;
    case 14:
      hourFormatted = "2 pm";
      break;
    case 15:
      hourFormatted = "3 pm";
      break;
    case 16:
      hourFormatted = "4 pm";
      break;
    case 17:
      hourFormatted = "5 pm";
      break;
    case 18:
      hourFormatted = "6 pm";
      break;
    case 19:
      hourFormatted = "7 pm";
      break;
    case 20:
      hourFormatted = "8 pm";
      break;
    case 21:
      hourFormatted = "9 pm";
      break;
    case 22:
      hourFormatted = "10 pm";
      break;
  }
  return hourFormatted;
}