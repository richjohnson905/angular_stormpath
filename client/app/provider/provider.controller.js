'use strict';

angular.module('yoStormApp')
  /* PROVIDER INDEX */
  .controller('ProviderIndexCtrl', function($scope, $http) {
    $scope.providers = $scope.providers || {name : "xxx"};
    
    $http.get('/api/provider').success(function(providers){
      $scope.providers = providers
    });
    $scope.deleteProvider = function(provider) {
      $http.delete('/api/provider/' + provider.id).success(function(result){
        $state.reload("provider.index");
      });
    }
  })
  /* PROVIDER NEW */
  .controller('ProviderNewCtrl', function($scope, $http, $state) {
    $scope.processForm = function() {
      $http.post('/api/provider/', {name: $scope.provider.name, address: $scope.provider.address, phone: $scope.provider.phone})
        .success(function(){
          $state.go('provider.index');
        })
        .error(function(err) {
          console.log('Error: ' + err);
        });
    }
  })
  /* PROVIDER VIEW */
  .controller('ProviderViewCtrl', function($scope, $http, $stateParams, $state) {
    defaultRoute($scope, $http, $stateParams, $state);
  })
  /* PROVIDER EDIT */
  .controller('ProviderEditCtrl', function($scope, $http, $stateParams, $state) {
    $scope.processForm = function() {
      $http.put('/api/provider/' + $stateParams.pid, $scope.provider)
          .success(function(data) {
              $scope.provider = data;
              console.log(data);
          })
          .error(function(error) {
              console.log('Error: ' + error);
          });
      defaultRoute($scope, $http, $stateParams, $state);
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
    $http.get('/api/provider/' + $stateParams.pid).success(function(provider){
      $scope.provider = provider;
    });
  })
  /* SCHEDULE INDEX */
  .controller('ProviderScheduleCtrl', function($scope, $http, $stateParams, $state) {
    var pid = $stateParams.pid;

    $scope.deleteSchedule = function(schedule) {
      $http.delete('/api/provider/' + pid + '/schedule/' + schedule.id).success(function(result){
        $state.go("provider.pview.schedule({pid: pid})");
      });
    }
    $scope.newValue = function(value) {
      alert(value);
    }
  })
  /* SCHEDULE NEW */
  .controller('ProviderScheduleNewCtrl', function($scope, $http, $state, $stateParams) {
    $scope.providerId = $stateParams.pid;
    $scope.processForm = function(providerId) {
      $http.post('/api/provider/' + providerId + '/schedule', {name: $scope.schedule.name, pid: providerId})
        .success(function(){
          $state.go('provider.pview.schedule({pid: providerId})');
        })
        .error(function(err) {
          console.log('Error: ' + err);
        });
    }
  })
  /* SCHEDULE VIEW */
  .controller('ProviderScheduleViewCtrl', function($scope, $http, $stateParams) {
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
    });
  })
  /* SCHEDULE EDIT */
  .controller('ProviderScheduleEditCtrl', function($scope, $http, $stateParams) {
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
      $scope.providerId = $stateParams.pid;
    });
    $scope.processForm = function(pid, sid) {
      $http.put('/api/provider/' + pid + '/schedule/sid', $scope.schedule)
        .success(function(data) {
          $scope.schedule = data;
          console.log("Schedule Edit Success");
          $state.go('provider.pview.schedule({pid})');
        })
        .error(function(error) {
          console.log('Error editing schedule ' + error);
        });
    }
  })
  /* HOUR */
  .controller('ProviderScheduleHourCtrl', function($scope, $http, $stateParams) {
    $scope.dayName = "fooday";
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
      $scope.providerId = $stateParams.pid;
      
    });
  });

// default provider view route is /provider/:pid/schedule/:sid 
// else if no schedule /provider/:pid/schedule/create
function defaultRoute($scope, $http, $stateParams, $state) {
  $http.get('/api/provider/' + $stateParams.pid).success(function(provider){
      $scope.provider = provider;
      $http.get('/api/provider/' + $stateParams.pid + '/schedule').success(function(schedules) {
        if (schedules.length > 0) {
          $scope.schedules = schedules;
          $scope.value = schedules[0].name;
          //$state.go("provider.pview.schedule.list"); //({pid:$stateParams.pid, sid: schedules[0].id})
          //$state.go("provider.pview.schedule.view({sid: schedules[0].id})"); //({pid:$stateParams.pid, sid: schedules[0].id})
        } else {
          $state.go("provider.pview.schedule");
        }
      });
    })
}
