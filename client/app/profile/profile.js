'use strict';

angular.module('yoStormApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
		  
	    // SpStateConfig object:

	    sp: {
	      authenticate: true
	    }
	  
      });
  });