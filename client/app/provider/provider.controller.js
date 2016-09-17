'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function($scope, $http, $state) {
    $scope.providers = $scope.providers || {name : "xxx"};
    //alert("here");
    $scope.processForm = function() {
      alert("process");
      $state.go("provider.index");
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
  })
  .controller('ProviderIndexCtrl', function($scope, $http) {
    $scope.message = 'Index';
    $scope.providers = $scope.providers || {name : "xxx"};

    $http.get('/api/providers').success(function(providers){
      $scope.providers = providers
    });
  }).controller('ProviderViewCtrl', function($scope, provider) {
    $scope.message = 'View';
    $scope.providers = provider;

    // $http.get('/api/providers/' + $stateParams.id).success(function(provider){
    //   $scope.providers = provider;
    // });
  }).controller('ProviderEditCtrl', function($scope, provider) {
    $scope.message = 'Edit';
    $scope.providers = provider;
    alert("EDIT");

    // $http.get('/api/providers' + $stateParams.id).success(function(providers){
    //   $scope.providers = provider;
    // });
  }).controller('ProviderNewCtrl', function($scope) {
    $scope.providers = $scope.providers || {name : "xxx"};
  });