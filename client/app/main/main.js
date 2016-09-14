'use strict';

angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })

      // nested list with custom controller
    .state('main.list', {
        url: 'list',
        templateUrl: 'app/main/partial-main-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })

    // nested list with just some random string data
    .state('main.paragraph', {
        url: 'paragraph',
        template: 'I could sure use a drink right now.'
    });
  });