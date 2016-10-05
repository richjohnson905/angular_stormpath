'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      /* One On One Edit */
      .state('provider.pview.sview.oneOnOneEdit', {
        url: '/once',
        templateUrl: 'app/provider/providerType/once/partial-provider-schedule-oneOnOne-edit.html',
        controller: 'OneOnOneEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
  });