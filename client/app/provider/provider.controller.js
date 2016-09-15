'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.Model = $scope.Model || {Name : "xxx"};

    $http.get('/api/providers').success(function(providers){
      $scope.providers = providers
    });

    // Create a new todo
    $scope.createProvider = function() {
        $http.post('/api/providers', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.Model = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

  });
