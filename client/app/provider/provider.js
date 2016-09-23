'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      /* Provider */
      .state('provider', {
        abstract: true,
        url: '/provider',
        templateUrl: 'app/provider/provider.html',
        sp: {
	        authenticate: true
	      }
      })
        /* Provider Index */
      .state('provider.index',{
        url: '/index',
        templateUrl: 'app/provider/partial-provider-index.html',
        controller: 'ProviderIndexCtrl',
        sp: {
	        authenticate: true
	      }
      })
      /* Provider New */
      .state('provider.create',{
        url: '/create',
        templateUrl: 'app/provider/partial-provider-edit.html',
        controller: 'ProviderNewCtrl',
        sp: {
	        authenticate: true
	      }
      })
      /* Provider View */
      .state('provider.view',{
        url: '/:pid',
        templateUrl: 'app/provider/partial-provider-view.html',
        controller: 'ProviderViewCtrl',
        sp: {
	        authenticate: true
	      }
      })
      /* Provider Edit */
      .state('provider.edit',{
        url: '/:pid/edit',
        templateUrl: 'app/provider/partial-provider-edit.html',
        controller: 'ProviderEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
        /* Provider > Schedules */
        .state('provider.view.schedule', {
          abstract: true,
          templateUrl: 'app/provider/provider-schedule.html',
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
        /* Provider > Schedules New */
        .state('provider.view.schedule.new',{
          url: '/schedule',
          templateUrl: 'app/provider/partial-provider-schedule.html',
          controller: 'ProviderScheduleCtrl',
          sp: {
            authenticate: true
          }
        })
        /* Provider > Schedules View */
        .state('provider.view.schedule.view',{
          url: '/schedule/:sid',
          templateUrl: 'app/provider/partial-provider-schedule-view.html',
          controller: 'ProviderScheduleViewCtrl',
          sp: {
            authenticate: true
          }
        })
        /* Provider > Schedules Edit */
        .state('provider.view.schedule.edit',{
          url: '/schedule/:sid/edit',
          templateUrl: 'app/provider/partial-provider-schedule-edit.html',
          controller: 'ProviderScheduleEditCtrl',
          sp: {
            authenticate: true
          }
        })
          /* Provider > Schedule > Hours */
          .state('provider.view.schedule.hours',{
            url: '/:sid/edit',
            templateUrl: 'app/provider/partial-provider-schedule-hours.html',
            controller: 'ProviderScheduleCtrl',
            sp: {
              authenticate: true
            }
          });
  }).run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});