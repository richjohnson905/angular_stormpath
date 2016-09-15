'use strict';

describe('Controller: ProviderCtrl', function () {

  // load the controller's module
  beforeEach(module('yoStormApp'));

  var ProviderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProviderCtrl = $controller('ProviderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
