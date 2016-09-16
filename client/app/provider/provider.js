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
      .state('provider.index',{
        url: '/index',
        templateUrl: 'app/provider/partial-provider-index.html'
      })
      .state('provider.view',{
        url: '/:id/view',
        templateUrl: 'app/provider/partial-provider-view.html'
      })
      .state('provider.new',{
        url: 'new',
        templateUrl: 'app/provider/partial-provider-new.html'
      })
      .state('provider.edit',{
        url: '/:id/edit',
        templateUrl: 'app/provider/partial-provider-edit.html'
      })
      .state('provider.info',{
        url: 'info',
        templateUrl: 'app/provider/partial-provider-info.html'
      })
      .state('provider.schedule', {
        url: 'schedule',
        templateUrl: 'app/provider/partial-provider-schedule.html'
      });
  });