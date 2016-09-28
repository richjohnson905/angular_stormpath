'use strict';

angular.module('yoStormApp')
  .controller('ConsumerCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  /* Consumer Index */
  .controller('ConsumerIndexCtrl', function($scope, $http, $state) {

    $scope.deleteConsumer = function(cid) {
      $http.delete('api/consumer/' + cid).success(function(){
        alert("Successfully deleted record");
        $state.go("consumer.index", {}, {reload: true});
      });
    },
    $http.get('/api/consumer').success(function(consumers){
      $scope.consumers = consumers
    });
  })
  /* Consumer Add */
  .controller('ConsumerAddCtrl', function($scope, $http, $state) {
    $scope.processForm = function() {
      $http.post('/api/consumer/', {pid: $scope.providerId, name: $scope.name}).success(function(){
        
      });
      $state.go("consumer.index");
    }
  })
  /* Schedule Sessions */
  .controller('ConsumerScheduleCtrl', function($scope, $http, $state, $stateParams) {
    $http.get('/api/consumer/' + $stateParams.cid).success(function(consumer) {
      var pid = consumer.Providers[0].id;
      $scope.consumer = consumer;
      getSchedules($http, pid, function(schedules) {
        $scope.schedules = schedules;
      });
    });
    $scope.processForm = function() {
      alert("process77");
      $state.go("consumer.index");
    },
    $scope.discard = function() {
      $state.go("consumer.index");
    }
  })
  .controller('ConsumerScheduleEditCtrl', function($stateParams, $http, $scope) {
    $http.get('/api/consumer/' + $stateParams.cid).success(function(consumer) {
      var pid = consumer.Providers[0].id;
      $http.get('/api/provider/' + pid + '/schedule/' + $stateParams.sid).success(function(schedule){
        $scope.schedule = schedule;
        var sid = schedule.id;
        getDayHours($http, pid, sid, "sunday", function(hours){
          $scope.sunday = hours;
        });
        getDayHours($http, pid, sid, "monday", function(hours){
          $scope.monday = hours;
        });
        getDayHours($http, pid, sid, "tuesday", function(hours){
          $scope.tuesday = hours;
        });

      });
    });
  });

function getDayHours($http, pid, sid, dayName, callback) {
  $http.get('/api/provider/' + pid + '/schedule/' + sid + '/' + dayName).success(function(hours){
    callback(hours);
  });
}

function getSchedules($http, pid, callback) {
  $http.get('/api/provider/' + pid + '/schedule').success(function(schedules){
    callback(schedules);
  });
}