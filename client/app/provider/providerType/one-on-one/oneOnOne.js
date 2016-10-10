'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      /* One On One Edit */
      .state('provider.pview.sview.oneOnOneEdit', {
        url: '/one-on-one',
        templateUrl: 'app/provider/providerType/one-on-one/partial-provider-schedule-oneOnOne-edit.html',
        controller: 'OneOnOneEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
  });