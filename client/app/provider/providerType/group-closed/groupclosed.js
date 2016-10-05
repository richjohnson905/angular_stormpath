'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      /* Group Closed Edit */
      .state('provider.pview.sview.groupclosed', {
        url: '/groupclosed',
        templateUrl: 'app/provider/providerType/group-closed/partial-provider-schedule-day-groupclosed-edit.html',
        controller: 'GroupClosedEditCtrl',
        sp: {
	        authenticate: true
	      }
      })
  });