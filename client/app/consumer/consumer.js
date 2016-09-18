'use strict';

angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('consumer', {
        url: '/consumer',
        templateUrl: 'app/consumer/consumer.html',
        controller: 'ConsumerCtrl'
      });
  });