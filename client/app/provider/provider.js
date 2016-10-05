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
      .state('provider.pview',{
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
      /* Provider Invite */
      .state('provider.invite',{
        url: '/:pid/invite',
        templateUrl: 'app/provider/partial-provider-invite.html',
        controller: 'ProviderInviteCtrl',
        sp: {
	        authenticate: true
	      }
      })
        /* Provider > Schedule Index */
        .state('provider.pview.schedule', {
          // abstract: true,
          url: '/schedule',
          templateUrl: 'app/provider/providerType/partial-provider-schedule-index.html',
          controller: 'ProviderScheduleCtrl',
          sp: {
            authenticate: true
          }
        })
        /* Provider > Schedule New */
        .state('provider.pview.create',{
          url: '/create',
          templateUrl: 'app/provider/providerType/partial-provider-schedule-edit.html',
          controller: 'ProviderScheduleNewCtrl',
          sp: {
            authenticate: true
          }
        })
        /* Provider > Schedule View */
        .state('provider.pview.sview',{
          url: '/:sid',
          templateUrl: 'app/provider/providerType/partial-provider-schedule-view.html',
          controller: 'ProviderScheduleViewCtrl',
          sp: {
            authenticate: true
          }
        })
        /* Provider > Schedule Edit */
        .state('provider.pview.edit',{
          url: '/:sid/edit',
          templateUrl: 'app/provider/providerType/partial-provider-schedule-edit.html',
          controller: 'ProviderScheduleEditCtrl',
          sp: {
            authenticate: true
          }
        });
          /* Provider > Schedule > dayViewGroupOpen */
          // .state('provider.pview.sview.dayViewGroupOpen',{
          //   url: '/:day',
          //   templateUrl: 'app/provider/providerType/partial-provider-schedule-group-day-view.html',
          //   controller: 'ProviderScheduleHourCtrl',
          //   sp: {
          //     authenticate: true
          //   }
          // })
          /* Provider > Schedule > dayViewOnceEdit */
          // .state('provider.pview.sview.dayViewOnceEdit',{
          //   url: '/:day',
          //   templateUrl: 'app/provider/providerType/partial-provider-schedule-day-once-edit.html',
          //   controller: 'ProviderScheduleHourCtrl',
          //   sp: {
          //     authenticate: true
          //   }
          // })
          /* Provider > Schedule > dayEdit */
          // .state('provider.pview.sview.dayEdit',{
          //   url: '/:day/edit',
          //   templateUrl: 'app/provider/providerType/partial-provider-schedule-day-edit.html',
          //   controller: 'ProviderScheduleHourEditCtrl',
          //   sp: {
          //     authenticate: true
          //   }
          // });
  }).run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});