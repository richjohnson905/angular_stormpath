'use strict';

angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('provider', {
        abstract: true,
        url: '/provider',
        templateUrl: 'app/provider/provider.html',
        
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.index',{
        url: '/index',
        templateUrl: 'app/provider/partial-provider-index.html',
        controller: 'ProviderIndexCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.view',{
        url: '/:id',
        templateUrl: 'app/provider/partial-provider-view.html',
        controller: 'ProviderViewCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.new',{
        url: '/new',
        templateUrl: 'app/provider/partial-provider-edit.html',
        controller: 'ProviderNewCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.edit',{
        url: '/:id/edit',
        templateUrl: 'app/provider/partial-provider-edit.html',
        controller: 'ProviderEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.view.schedules',{
        url: '/schedule',
        templateUrl: 'app/provider/partial-provider-schedule-list.html',
        controller: 'ProviderScheduleCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.view.scheduleNew',{
        url: '/schedule',
        templateUrl: 'app/provider/partial-provider-schedule.html',
        controller: 'ProviderScheduleCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.view.schedule.list',{
        url: '/schedules',
        templateUrl: 'app/provider/partial-provider-schedule-list.html',
        controller: 'ProviderScheduleCtrl',
        sp: {
	        authenticate: true
	      }
      })
      .state('provider.schedule.hours',{
        url: '/:id/edit',
        templateUrl: 'app/provider/partial-provider-schedule-hours.html',
        controller: 'ProviderScheduleCtrl',
        sp: {
	        authenticate: true
	      }
      });
  });