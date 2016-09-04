'use strict';

angular.module('exampleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
		controller: 'DashboardCtrl'
      });
  })
  .controller('DashboardCtrl', function ($scope, $http, $timeout, $user) {
	  $scope.formData = {};
      $scope.scheduleData = {};
	  
	  // Get all todos
	  $http.get('/home')
	      .success(function(data) {
	          $scope.scheduleData = data;
	          console.log(data);
	      })
	      .error(function(error) {
	          console.log('Error: ' + error);
	      });
  });