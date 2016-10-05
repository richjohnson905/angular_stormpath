'use strict';
// ORDER MATTERS - Put NEW before VIEW!!!!
angular.module('yoStormApp')
  .config(function ($stateProvider) {
     $stateProvider
    //   /* Group Open Edit */
    //   .state('provider.pview.sview.dayViewGroupOpen',{
    //     url: '/:day',
    //     templateUrl: 'app/provider/providerType/partial-provider-schedule-group-day-view.html',
    //     controller: 'GroupOpenHourCtrl',
    //     sp: {
    //         authenticate: true
    //     }
    // })
    /* Group Open Edit */
   .state('provider.pview.sview.groupopen',{
        url: '/:day/edit',
        templateUrl: 'app/provider/providerType/partial-provider-schedule-day-edit.html',
        controller: 'ProviderScheduleHourEditCtrl',
        sp: {
            authenticate: true
        }
    });
  });