'use strict';

angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('provider', {
        url: '/provider',
        templateUrl: 'app/provider/provider.html',
        controller: 'ProviderCtrl',

        sp: {
	        authenticate: true
	      }
      })

      .state('provider.info',{
        url: '/info',
        templateUrl: 'app/provider/partial-provider-info.html'
      })
      
      .state('provider.schedule', {
        url: '/schedule',
        templateUrl: 'app/provider/partial-provider-schedule.html'
      });
  });