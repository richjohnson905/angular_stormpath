'use strict';

angular.module('yoStormApp')
  .controller('ConsumerCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  .controller('ConsumerIndexCtrl', function($scope, $http, $state) {

    $scope.deleteConsumer = function(cid) {
      $http.delete('api/consumer/' + cid).success(function(){
        alert("Successfully deleted record");
        $state.go("consumer.index");
      });
    },
    $http.get('/api/consumers').success(function(consumers){
      $scope.consumers = consumers
    });
  })
  .controller('ConsumerAddCtrl', function($scope, $http, $state) {
    $scope.processForm = function() {
      $http.post('/api/consumer/', {pid: $scope.providerId, name: $scope.name}).success(function(){
        alert("Success setting up provider");
      });
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
