'use strict'

angular.module('yoStormApp')
    .directive('rjProviderType', function() {
         return {
            restrict: 'A',
            scope: {
                provider:'='
            },
            link: function (scope, element, attrs) {
                if (scope.provider) {
                    switch(scope.provider.providerType) {
                    case "group":
                        scope.template = 'app/provider/providerType/group.html';
                        break;
                    case "oneTime":
                        scope.template = 'app/provider/providerType/oneTime.html';
                        break;
                    case "oneOnOne":
                        scope.template = 'app/provider/providerType/oneOnOne.html';
                        break;
                    }
                }
            },
            template: '<ng-include src="template"></ng-include>',
        };
    });