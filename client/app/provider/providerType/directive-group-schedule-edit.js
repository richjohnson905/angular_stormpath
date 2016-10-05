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
                    case "groupOpen":
                        scope.template = 'app/provider/providerType/group-open/group.html';
                        break;
                    case "groupClosed":
                        scope.template = 'app/provider/providerType/group-closed/group.closed.html';
                        break;
                    case "oneTime":
                        scope.template = 'app/provider/providerType/once/oneTime.html';
                        break;
                    case "oneOnOne":
                        scope.template = 'app/provider/providerType/one-on-one/oneOnOne.html';
                        break;
                    }
                }
            },
            template: '<ng-include src="template"></ng-include>',
        };
    });