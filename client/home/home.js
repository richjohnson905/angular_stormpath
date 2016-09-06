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
	  $http.get('/dashboard')
	      .success(function(data) {
	          $scope.scheduleData = data;
	      })
	      .error(function(error) {
	          console.log('Error: ' + error);
	      });
		  
      // Delete a schedule
      $scope.deleteSchedule = function(scheduleID) {
          $http.delete('/dashboard/' + scheduleID)
              .success(function(data) {
                  $scope.scheduleData = data;
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
      };
  });