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
        controller: 'ProviderIndexCtrl'
      })
      .state('provider.view',{
        url: '/:id/view',
        templateUrl: 'app/provider/partial-provider-view.html',
        controller: 'ProviderViewCtrl',
        resolve: {
          provider: function($http, $stateParams){
            var url = "/api/providers/" + $stateParams.id;
            return $http.get(url).then(function(res){return res.data;});
          }
        }
      })
      .state('provider.new',{
        url: '/new',
        templateUrl: 'app/provider/partial-provider-new.html'
      })
      .state('provider.edit',{
        url: '/:id/edit',
        templateUrl: 'app/provider/partial-provider-edit.html',
        controller: 'ProviderViewCtrl',
        resolve: {
          provider: function($http, $stateParams){
            var url = "/api/providers/" + $stateParams.id;
            return $http.get(url).then(function(res){return res.data;});
          }
        }
      })
      .state('provider.info',{
        url: '/info',
        templateUrl: 'app/provider/partial-provider-info.html'
      })
      .state('provider.schedule', {
        url: '/schedule',
        templateUrl: 'app/provider/partial-provider-schedule.html'
      });
  });