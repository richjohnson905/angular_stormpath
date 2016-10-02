'use strict';

angular.module('yoStormApp')
  .controller('NavbarCtrl', function ($scope, $location, md5, $http) {
    $scope.menu = [{
      'title': 'Dashboard',
      'link': '/'
    }];

    $http.get('api/storm', function(email) {
      $scope.email = email;
    });

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.gravatar = function(email) {
      return "http://www.gravatar.com/avatar/" + md5.createHash(email) + "?s=32&d=identicon&r=PG";
    }
  });