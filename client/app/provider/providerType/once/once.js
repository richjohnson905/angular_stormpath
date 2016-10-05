'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      /* Once */
      .state('provider.pview.sview.dayViewOnceEdit', {
        url: '/once',
        templateUrl: 'app/provider/providerType/once/partial-provider-schedule-day-once-edit.html',
        controller: 'OnceEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
  });