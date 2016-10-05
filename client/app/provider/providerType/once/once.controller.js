'use strict';

angular.module('yoStormApp')
  /* ONCE EDIT */
  .controller('OnceEditCtrl', function($scope, $http, $state) {
      $scope.mytime = new Date();

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
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
    // END Time

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
      //var sid = $stateParams.sid;
    //   $http.get('/api/provider/' + pid + '/schedule/' + sid).success(function(schedule){
    //       $scope.schedule = schedule;
    //       var dayName;
        //   if ($scope.dt.getDay() == 0) {
        //     dayName = "sunday";
        //   } else if ($scope.dt.getDay() == 1) {
        //     dayName = "monday";
        //   } else if ($scope.dt.getDay() == 2) {
        //     dayName = "tuesday";
        //   } else if ($scope.dt.getDay() == 3) {
        //     dayName = "wednesday";
        //   } else if ($scope.dt.getDay() == 4) {
        //     dayName = "thursday";
        //   } else if ($scope.dt.getDay() == 5) {
        //     dayName = "friday";
        //   } else if ($scope.dt.getDay() == 6) {
        //     dayName = "saturday";
        //   }
        //   getNuts($http, pid, sid, dayName, function(nuts){
        //     for (var i = 0; i < nuts.length; i++) {
        //       nuts[i].hour = HourFormat.apply(nuts[i].hour);
        //     }
        //     $scope.nuts = nuts;
        //   });
    //   });
  });
  
  // DATEPICKER END


  });