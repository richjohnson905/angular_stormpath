'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function($scope, $http, $state) {
    $scope.providers = $scope.providers || {name : "xxx"};
    
  }).controller('ProviderIndexCtrl', function($scope, $http) {
    $scope.message = 'Index';
    $scope.providers = $scope.providers || {name : "xxx"};

    $http.get('/api/providers').success(function(providers){
      $scope.providers = providers
    });
  }).controller('ProviderViewCtrl', function($scope, $http, $stateParams) {
    $scope.message = 'View';

    $http.get('/api/providers/' + $stateParams.id).success(function(provider){
      $http.get('api/provider/' + provider.id + '/schedules').success(function(schedules) {
        $scope.providers = provider;
        $scope.schedules = schedules;
      });
    });
  }).controller('ProviderEditCtrl', function($scope, $http, $stateParams, $state) {
    $scope.processForm = function() {
      alert("process22");
      $state.go("provider.index");
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
    $http.get('/api/providers/' + $stateParams.id).success(function(provider){
      $http.get('api/provider/' + provider.id + '/schedules').success(function(schedules) {
        $scope.providers = provider;
        $scope.schedules = schedules;
      });
    });
  }).controller('ProviderNewCtrl', function($scope, $state) {
    $scope.processForm = function() {
      alert("process33");
      $state.go("provider.index");
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
  });