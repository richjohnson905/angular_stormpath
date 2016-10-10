'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      /* Once Create */
      .state('provider.pview.sview.onceCreate', {
        url: '/once/create',
        templateUrl: 'app/provider/providerType/once/partial-provider-schedule-day-once-edit.html',
        controller: 'OnceEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
      /* Once Edit */
      .state('provider.pview.sview.onceEdit', {
        url: '/once/:eid/edit',
        templateUrl: 'app/provider/providerType/once/partial-provider-schedule-day-once-edit.html',
        controller: 'OnceEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
      /* Once View */
      .state('provider.pview.sview.onceView', {
        url: '/once/:eid',
        templateUrl: 'app/provider/providerType/once/partial-provider-schedule-once-view.html',
        controller: 'OnceViewCtrl',
        sp: {
	        authenticate: true
	      }
      })
  });