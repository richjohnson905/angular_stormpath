'use strict';

angular.module('yoStormApp')
  /* PROVIDER INDEX */
  .controller('ProviderIndexCtrl', function($scope, $http, $state) {
    $scope.providers = $scope.providers || {name : "xxx"};
    
    $http.get('/api/provider').success(function(providers){
      $scope.providers = providers
    });
    $scope.deleteProvider = function(provider) {
      $http.delete('/api/provider/' + provider.id).success(function(result){
        $state.go("provider.index", {}, {reload: true});
      });
    }
  })
  /* PROVIDER NEW */
  .controller('ProviderNewCtrl', function($scope, $http, $state) {
    $scope.processForm = function() {
      $http.post('/api/provider/', {name: $scope.provider.name, address: $scope.provider.address, phone: $scope.provider.phone, providerType: $scope.provider.type})
        .success(function(){
          $state.go('provider.index', {}, {reload: true});
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
      $state.go('provider.index', {}, {reload: true});
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
    $http.get('/api/provider/' + $stateParams.pid).success(function(provider){
      $scope.provider = provider;
    });
  })
  /* PROVIDER INVITE */
  .controller('ProviderInviteCtrl', function($scope, $http, $stateParams, $state, md5){
    var pid = $stateParams.pid;
    $scope.gravatar = function(email) {
      return "http://www.gravatar.com/avatar/" + md5.createHash(email) + "?s=32&d=identicon&r=PG";
    }
    $http.get('api/provider/' + pid + '/invite').success(function(invites) {
      $scope.consumers = invites;
    });
    $scope.processForm = function() {
      $http.post('/api/provider/' + pid + '/invite', {pid: pid, name: $scope.fullname, email: $scope.inviteEmail}).success(function(result){
        $state.go("provider.invite", {}, {reload: true});
      });
    }
  })
  /* SCHEDULE INDEX */
  .controller('ProviderScheduleCtrl', function($scope, $http, $stateParams, $state) {
    var pid = $stateParams.pid;

    $scope.deleteSchedule = function(schedule) {
      $http.delete('/api/provider/' + pid + '/schedule/' + schedule.id).success(function(result){
        $state.go("provider.pview.schedule", {pid: pid}, {reload: true});
      });
    }
    $scope.newValue = function(value) {
      alert(value);
    }
  })
  /* SCHEDULE NEW */
  .controller('ProviderScheduleNewCtrl', function($scope, $http, $state, $stateParams) {
    $scope.pid = $stateParams.pid;
    $scope.processForm = function(pid) {
      $http.post('/api/provider/' + $scope.pid + '/schedule', {name: $scope.schedule.name, pid: $scope.pid})
        .success(function(schedule){
          $state.go('provider.pview.schedule', {pid: pid}, {reload: true});
        })
        .error(function(err) {
          console.log('Error: ' + err);
        });
    }
  })
  /* SCHEDULE VIEW */
  .controller('ProviderScheduleViewCtrl', function($scope, $http, $stateParams, $state) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.dayModel = days;
    
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
      if ($scope.provider.providerType == 'oneTime') {
        $state.go("provider.pview.sview.onceView", {sid: $stateParams.sid});
      } else if ($scope.provider.providerType == 'oneOnOne') {
        $state.go("provider.pview.sview.oneOnOneEdit", {sid: $stateParams.sid});
      }
    });
  })
  /* SCHEDULE EDIT */
  .controller('ProviderScheduleEditCtrl', function($scope, $http, $stateParams, $state) {
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
      $scope.pid = $stateParams.pid;
    });
    $scope.processForm = function(pid, sid) {
      $http.put('/api/provider/' + pid + '/schedule/sid', $scope.schedule).success(function(data) {
          $scope.schedule = data;
          console.log("Schedule Edit Success");
          $state.go('provider.pview.schedule', {pid: pid}, {reload: true});
        })
        .error(function(error) {
          console.log('Error editing schedule ' + error);
        });
    }
  })
  /* HOUR */
  .controller('ProviderScheduleHourCtrl', function($scope, $http, $stateParams) {
    $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid).success(function(schedule) {
      $scope.schedule = schedule;
      $scope.providerId = $stateParams.pid;
      // if ($scope.provider.providerType == 'groupOpen') {
      //   alert("group Open");
      // } else if ($scope.provider.providerType == 'groupClosed') {
      //   alert("group Closed");
      // } else if ($scope.provider.providerType == 'oneOnOne') {
      //   alert("one on one");
      // } else {
      //   alert("one time");
      // }
    });
  }) 
  /* HOUR EDIT*/
  .controller('ProviderScheduleHourEditCtrl', function($scope, $http, $stateParams, $state) {
    var pid = $stateParams.pid;
    var sid = $stateParams.sid;
    var day = $stateParams.day;
    $scope.saveButtonLabel = day;
    $http.get('api/provider/' + pid + '/schedule/' + sid + '/nut/' + day.toLowerCase()).success(function(hours){
      $scope.hours = getHours(hours);
    });
    $scope.saveHours = function(day) {
      $http.post('api/provider/' + pid + '/schedule/' + sid + '/nut', {day: day.toLowerCase(), hours: $scope.hours, sid: sid})
        .success(function(){
          $state.go('provider.pview.sview.dayViewGroupOpen', {}, {reload: true});
        })
        .error(function(err) {
          console.log('Error: ' + err);
        });
    }
  });

  function getHours(data) {
    var hours = [];
    for (var i = 0; i < 24; i++) {
      hours.push(false);
    }
    for (var i = 0; i < data.length; i++) {
        hours[data[i].hour] = true;
    }
    return hours;
  }

// default provider view route is /provider/:pid/schedule/:sid 
// else if no schedule /provider/:pid/schedule/create
function defaultRoute($scope, $http, $stateParams, $state) {
  $http.get('/api/provider/' + $stateParams.pid).success(function(provider){
      $scope.provider = provider;
      $http.get('/api/provider/' + $stateParams.pid + '/schedule').success(function(schedules) {
        if (schedules.length > 0) {
          $scope.schedules = schedules;
          $scope.value = schedules[0].name;
          //$state.go("provider.pview");//({pid:$stateParams.pid, sid: schedules[0].id})");
          //$state.go("provider.pview.schedule.view({sid: schedules[0].id})"); //({pid:$stateParams.pid, sid: schedules[0].id})
        } else {
          $state.go("provider.pview.schedule");
        }
      });
    })
}
