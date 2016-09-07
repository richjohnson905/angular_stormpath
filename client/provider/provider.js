'use strict';

angular.module('exampleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('provider', {
        url: '/provider',
        templateUrl: 'provider/provider.html',
        controller: 'ProviderCtrl',
        /**
         * The Stormpath Angular SDK provides a configuration block that informs
         * UI router about protected routes.  When we use `authenticate: true`,
         * the user will be redirected to the login page if they try to access
         * this view but are not logged in.
         */
        sp: {
          authenticate: true
        }
      });
  })
  .controller('ProviderCtrl', function ($scope, $http, $timeout, $user) {
	  $scope.formData = {};
      $scope.todoData = {};
	  
  });