'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.Model = $scope.Model || {Name : "xxx"};

    $http.get('/api/providers').success(function(providers){
      $scope.Model = providers
    });

    // Create a new todo
    $scope.createProvider = function() {
        $http.post('/api/providers', $scope.Model)
            .success(function(data) {
                $scope.Model = {};
                $scope.Model = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

  });
