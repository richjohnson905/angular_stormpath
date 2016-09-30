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
    // $scope.processForm = function() {
    //   alert("process77");
    //   $state.go("consumer.index");
    // },
    // $scope.discard = function() {
    //   $state.go("consumer.index");
    // }
  })
  /* Pick Schedule Sessions */
  .controller('ConsumerScheduleEditCtrl', function($stateParams, $http, $scope, $state) {
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
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

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
            $scope.nuts = nuts;//getNutsFromDatepick(hours);
          });
      });
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

// function getNutsFromDatepick(nutArray) {
//   var nuts = [];
//   for (var i = 0; i < nutArray.length; i++) {
//     nuts.push(nutArray[i].hour);
//   }
//   return nuts;  
// }

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