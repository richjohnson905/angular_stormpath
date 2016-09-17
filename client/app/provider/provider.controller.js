'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function ($scope, $http, $state) {
    $scope.message = 'Main';

    $scope.Model = $scope.Model || {Name : "xxx"};
    $state.go(".index");
    // $http.get('/api/providers').success(function(providers){
    //   $scope.providers = [{id: 1, name: 'Excel'},{id: 2, name: 'Doran'}];
    //   $state.go(".index");
    // });

    // // Create a new todo
    // $scope.createProvider = function() {
    //     $http.post('/api/providers', $scope.Model)
    //         .success(function(data) {
    //             $scope.Model = {};
    //             $scope.Model = data;
    //             console.log(data);
    //         })
    //         .error(function(error) {
    //             console.log('Error: ' + error);
    //         });
    // };

    // $scope.showProvider = function(id) {
    //   $http.get(id).success(function(provider){
    //     alert("here we are");
    //     $scope.providers = [{name: 'Excel'}];
    //   });
    // }

    // $scope.deleteProvider = function() {
    //   alert("hello");
    // }

  })
  .controller('ProviderIndexCtrl', function($scope, $http) {
    $scope.message = 'Index';
    $scope.Model = $scope.Model || {Name : "xxx"};

    $http.get('/api/providers').success(function(providers){
      $scope.providers = providers
    });
  }).controller('ProviderViewCtrl', function($scope, $http, $stateParams) {
    $scope.message = 'View';
    $scope.Model = $scope.Model || {Name : "xxx"};

    $http.get('/api/providers/' + $stateParams.id).success(function(provider){
      $scope.providers = provider;
    });
  }).controller('ProviderEditCtrl', function($scope, $http) {
    $scope.message = 'Edit';
    $scope.Model = $scope.Model || {Name : "xxx"};

    $http.get('/api/providers' + $stateParams.id).success(function(providers){
      $scope.providers = provider;
    });
  });
