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
        getDayHours($http, pid, sid, "wednesday", function(hours){
          $scope.wednesday = hours;
        });
        getDayHours($http, pid, sid, "thursday", function(hours){
          $scope.thursday = hours;
        });
        getDayHours($http, pid, sid, "friday", function(hours){
          $scope.friday = hours;
        });
        getDayHours($http, pid, sid, "saturday", function(hours){
          $scope.saturday = hours;
        });

      });
    });
    $scope.pick = function(available) {
      alert(available);
    }
    
    // DATEPICKER BEGIN
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.$watch("dt", function(newValue, oldValue) {
    //console.log("I've changed : ", $scope.dt);
    if ($scope.dt.getDay() == 0) {
      $scope.all = getTodayFromDatepick($scope.sunday);
    } else if ($scope.dt.getDay() == 1) {
      $scope.all = getTodayFromDatepick($scope.monday);
    } else if ($scope.dt.getDay() == 2) {
      $scope.all = getTodayFromDatepick($scope.tuesday);
    } else if ($scope.dt.getDay() == 3) {
      $scope.all = getTodayFromDatepick($scope.wednesday);
    } else if ($scope.dt.getDay() == 4) {
      $scope.all = getTodayFromDatepick($scope.thursday);
    } else if ($scope.dt.getDay() == 5) {
      $scope.all = getTodayFromDatepick($scope.friday);
    } else if ($scope.dt.getDay() == 6) {
      $scope.all = getTodayFromDatepick($scope.saturday);
    }

  });

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
  };

  $scope.toggleMin();

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
  // DATEPICKER END
  });

function getTodayFromDatepick(dayArray) {
  var all = [];
  for (var i = 0; i < dayArray.length; i++) {
    all.push(dayArray[i].hour);
  }
  return all;
}

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