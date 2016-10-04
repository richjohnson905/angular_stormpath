'use strict';

angular.module('yoStormApp')
  .controller('MainCtrl', function ($scope, $http, $state, HourFormat) {

    $http.get('api/wire').success(function(wires){
      $scope.wiredgroup = wires;
      var allWires = [];
      for (var i = 0; i < wires.length; i++) {
        var newWire = new Object();
        newWire.wid = wires[i].id;
        newWire.date = new Date(wires[i].date);
        newWire.hour = HourFormat.apply(wires[i].Nut.hour);
        newWire.name = wires[i].Consumers[0].Providers[0].name;
        newWire.cid = wires[i].Consumers[0].id;
        allWires.push(newWire);
      }
      $scope.wires = allWires;
    });

    $scope.deleteWire = function(wid) {
      $http.delete('api/wire/' + wid).success(function(result) {
        $state.go('main', {}, {reload: true});
      });
    }

  });
