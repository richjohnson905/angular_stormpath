'use strict';

angular.module('yoStormApp')
    /* ONCE Create */
    // .controller('OnceNewCtrl', function($scope, $http, $state) {
    //     $scope.isCreate = true;
    //   $scope.processForm = function() {
    //       $http.post('/api/provider/' + $stateParams.pid + '/' + $stateParams.sid + '/once', {pid: $stateParams.pid, sid: $stateParams.sid, dt: $scope.dt}).success(function(evt) {
    //           $state.go('provider.pview.sview.onceView', {eid: evt.id}, {reload: true});
    //       });
    //   }
    // })
    /* ONCE VIEW */
    .controller('OnceViewCtrl', function($scope, $http, $state, $stateParams) {
        $http.get('/api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid + '/pevent').success(function(evt){
            $scope.event = evt;
            if (evt.length > 0) {
                $scope.isEdit = true;
                $http.get('/api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid + '/pevent/' + evt[0].id).success(function(evt){
                    // this works but don't think we need it'
                });
            } else {
                $scope.isCreate = true;
            }
        });
    })
  /* ONCE EDIT */
  .controller('OnceEditCtrl', function($scope, $http, $state, $stateParams) {
      $scope.dt = new Date();
    $http.get('api/provider/' + $stateParams.pid + '/invite').success(function(invites) {
        $scope.consumers = invites;
    });
    if ($stateParams.eid) {
        $scope.isEdit = true;
        $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid + '/pevent/' + $stateParams.eid).success(function(evt) {
            $scope.activeConsumer = {}
            for (var i = 0; i < $scope.consumers.length; i++) {
                if ($scope.consumers[i].name == evt.Consumer.name) {
                    $scope.activeConsumer.consumer = $scope.consumers[i];
                }
            }
            $scope.evt = evt;
            $scope.dt = evt.date;
        });
        $scope.processForm = function() {
            $http.put('/api/provider/' + $stateParams.pid + '/' + $stateParams.sid + '/once/' + $stateParams.eid, $scope.event)
            .success(function(data) {
                $scope.event = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        }
    } else {
        $scope.isCreate = true;
        
        $scope.consumers = invites;
        $scope.processForm = function() {
            var cid = $scope.consumerId;
            $http.post('/api/consumer/' + cid + '/cevent', {cid: cid, sid: $stateParams.sid, dt: $scope.dt, message: $scope.message}).success(function(evt) {
                $state.go('provider.pview.sview.onceView', {eid: evt.id}, {reload: true});
            });
        }
    }
    
    $scope.dt.setMinutes(0);

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.dt = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.dt);
    };

    $scope.clear = function() {
        $scope.dt = null;
    };
    // END Time

    // DATEPICKER BEGIN
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
  });
  // DATEPICKER END
});