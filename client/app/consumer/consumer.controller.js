'use strict';

angular.module('yoStormApp')
  .controller('ConsumerCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  /* Consumer Index */
  .controller('ConsumerIndexCtrl', function($scope, $http, $state) {

    $scope.deleteConsumer = function(cid) {
      $http.delete('api/consumer/' + cid).success(function(result){
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
      $http.post('/api/consumer/', {pid: $scope.providerId, name: $scope.name}).success(function(result){
        $state.go("consumer.index", {}, {reload: true});
      });
    }
  })
  /* View Schedule Sessions */
  .controller('ConsumerScheduleCtrl', function($scope, $http, $state, $stateParams) {
    $http.get('/api/consumer/' + $stateParams.cid).success(function(consumer) {
      var pid = consumer.Providers[0].id;
      $scope.consumer = consumer;
      getSchedules($http, pid, function(schedules) {
        $scope.schedules = schedules;
      });
    });
  })
  /* Pick Schedule Sessions */
  .controller('ConsumerScheduleEditCtrl', function($stateParams, $http, $scope, $state, HourFormat) {
    var pid;
    var sid;
    var cid = $stateParams.cid;
    $http.get('/api/consumer/' + cid).success(function(consumer) {
      pid = consumer.Providers[0].id;
      $scope.pid = pid;
    });
    // WIRE NUT CREATE
    $scope.pick = function(nut) {
      $http.post('api/consumer/' + cid + '/wired', {date: $scope.dt, NutId: nut.id, ConsumerId: cid}).success(function(result) {
        $state.go("consumer.schedule", {cid: cid}, {reload: true});
      });
    }
    
    // DATEPICKER BEGIN
    $scope.dt = new Date();
    $scope.minDate = new Date();
    $scope.format = "EEEE, MMMM d, y";
    $scope.altInputFormats = ['d!/M!/yyyy'];
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    
    $scope.popup1 = {
      opened: false
    };
    
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.$watch("dt", function(newValue, oldValue) {
      var sid = $stateParams.sid;
      $http.get('/api/provider/' + pid + '/schedule/' + sid).success(function(schedule){
          $scope.schedule = schedule;
          var dayName;
          if ($scope.dt.getDay() == 0) {
            dayName = "sunday";
          } else if ($scope.dt.getDay() == 1) {
            dayName = "monday";
          } else if ($scope.dt.getDay() == 2) {
            dayName = "tuesday";
          } else if ($scope.dt.getDay() == 3) {
            dayName = "wednesday";
          } else if ($scope.dt.getDay() == 4) {
            dayName = "thursday";
          } else if ($scope.dt.getDay() == 5) {
            dayName = "friday";
          } else if ($scope.dt.getDay() == 6) {
            dayName = "saturday";
          }
          getNuts($http, pid, sid, dayName, function(nuts){
            for (var i = 0; i < nuts.length; i++) {
              nuts[i].hour = HourFormat.apply(nuts[i].hour);
            }
            $scope.nuts = nuts;
          });
      });
  });
  
  // DATEPICKER END
  });

function getNuts($http, pid, sid, dayName, callback) {
  $http.get('/api/provider/' + pid + '/schedule/' + sid + '/nut/' + dayName).success(function(nuts){
    callback(nuts);
  });
}

function getSchedules($http, pid, callback) {
  $http.get('/api/provider/' + pid + '/schedule').success(function(schedules){
    callback(schedules);
  });
}