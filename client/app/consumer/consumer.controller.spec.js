'use strict';

describe('Controller: ConsumerCtrl', function () {

  // load the controller's module
  beforeEach(module('yoStormApp'));

  var ConsumerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsumerCtrl = $controller('ConsumerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
