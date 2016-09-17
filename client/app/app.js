'use strict';

angular.module('yoStormApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',
  'stormpath',
  'stormpath.templates'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    

    $urlRouterProvider.when("/provider", "provider/index");
    $urlRouterProvider.otherwise('/');
    
    $locationProvider.html5Mode(true);
  })
  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'main'
    });
  });  // <-- make sure to move the semicolon to here!