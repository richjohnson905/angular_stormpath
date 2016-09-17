'use strict';

angular.module('yoStormApp')
  .controller('ProviderIndexCtrl', function($scope, $http) {
    $scope.message = 'Index';
    $scope.Model = $scope.Model || {Name : "xxx"};

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
  });
