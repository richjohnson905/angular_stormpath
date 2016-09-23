'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function($scope, $http) {
    $scope.providers = $scope.providers || {name : "xxx"};
    alert("AND NEVER HERE??");
    $http.get('/api/provider').success(function(providers){
      alert("NEVER HERE??");
      $scope.providers = providers
    });
  })
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
  .controller('ProviderViewCtrl', function($scope, $http, $stateParams, $state) {
    defaultRoute($scope, $http, $stateParams, $state);
    // $http.get('/api/provider/' + $stateParams.pid)
    //   .success(function(provider){
    //     $scope.provider = provider;
    //   })
    //   .error(function(err) {
    //     console.log('Error: ' + err);
    //   });
  })
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
      $state.go("provider.index");
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
    $http.get('/api/provider/' + $stateParams.pid).success(function(provider){
      $scope.provider = provider;
    });
  })
  .controller('ProviderScheduleViewCtrl', function($scope, $http, $stateParams) {
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
    });
  })
  .controller('ProviderScheduleEditCtrl', function($scope, $http, $stateParams) {
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
    });
  })
  .controller('ProviderScheduleCtrl', function($scope, $http, $stateParams) {
    var hourValues = [];
    $scope.providerId = $stateParams.pid;
    $http.get('api/provider/' + $stateParams.pid + '/schedule').success(function(schedules) {
      $scope.schedules = schedules
    });
    $scope.select = function(item) {
      $scope.selected = item;
      $http.get('api/provider/' + $scope.providerId + '/schedule/' + item.id + '/sundays').success(function(sundays) {
          var allSundays = [];
          for (var i = 0; i < sundays.length; i++) {
            allSundays.push(sundays[i].hour);
          }
          for (var i = 0; i < 24; i++) {
            hourValues[i] = allSundays.indexOf(i) != -1;
          }
          $scope.hourValues = hourValues;
        });
    };
    
  });

// default provider view route is /provider/:pid/schedule/:sid 
// else if no schedule /provider/:pid/schedule/create
function defaultRoute($scope, $http, $stateParams, $state) {
  $http.get('/api/provider/' + $stateParams.pid).success(function(provider){
      $scope.provider = provider;
      $http.get('/api/provider/' + $stateParams.pid + '/schedule').success(function(schedules) {
        if (schedules.length > 0) {
          $scope.schedules = schedules;
          $state.go("provider.view.schedules");
        } else {
          $state.go("provider.view.schedules");
        }
      });
    })
}
