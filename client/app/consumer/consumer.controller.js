'use strict';

angular.module('yoStormApp')
  .controller('ConsumerCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  .controller('ConsumerIndexCtrl', function($scope, $http) {
    $scope.message = 'Index';

    $http.get('/api/consumers').success(function(consumers){
      $scope.consumers = consumers
    });
  })
  .controller('ConsumerAddCtrl', function($scope, $http, $state) {
    $scope.message = 'Add';
    $scope.processForm = function() {
      alert("process66");
      $state.go("consumer.index");
    },
    $scope.discard = function() {
      $state.go("consumer.index");
    }
  })
  .controller('ConsumerScheduleCtrl', function($scope, $http, $state) {
    $scope.processForm = function() {
      alert("process77");
      $state.go("consumer.index");
    },
    $scope.discard = function() {
      $state.go("consumer.index");
    }
  });
