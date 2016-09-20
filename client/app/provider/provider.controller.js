'use strict';

angular.module('yoStormApp')
  .controller('ProviderCtrl', function($scope, $http, $state) {
    $scope.providers = $scope.providers || {name : "xxx"};
    
  }).controller('ProviderIndexCtrl', function($scope, $http) {
    $scope.message = 'Index';
    $scope.providers = $scope.providers || {name : "xxx"};

    $http.get('/api/providers').success(function(providers){
      $scope.providers = providers
    });
  }).controller('ProviderViewCtrl', function($scope, $http, $stateParams) {
    $scope.message = 'View';

    $http.get('/api/providers/' + $stateParams.id).success(function(provider){
      $http.get('api/provider/' + provider.id + '/schedules').success(function(schedules) {
        $http.get('api/provider/' + provider.id + '/schedule/' + schedules[0].id + '/sundays').success(function(sundays) {
          $scope.sundays = sundays;
        });
        $scope.schedules = schedules;
      });
      $scope.providers = provider;
    });
  }).controller('ProviderEditCtrl', function($scope, $http, $stateParams, $state) {
    
    $scope.processForm = function() {
      alert("process22");
      $state.go("provider.index");
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
    $http.get('/api/providers/' + $stateParams.id).success(function(provider){
      $http.get('api/provider/' + provider.id + '/schedules').success(function(schedules) {
        $http.get('api/provider/' + $stateParams.pid + '/schedule/' + $stateParams.sid + '/sundays').success(function(sundays) {
          $scope.sundays = sundays;
        });
        $scope.schedules = schedules;
      });
      $scope.providers = provider;
    });
  }).controller('ProviderNewCtrl', function($scope, $state) {
    
    $scope.select = function(item) {
      $scope.selected = item;
    }
    $scope.selected = {};

    $scope.processForm = function() {
      $scope.itemDetails = getData();
      //$state.go("provider.index");
    },
    $scope.processForm2 = function() {
      alert("save");
      $scope.itemDetails = getData();
      //$state.go("provider.index");
    },
    $scope.discard = function() {
      $state.go("provider.index");
    }
  });

  function getData() {
    var obj = new Object();
    obj.id = 1;
    obj.name = "Test itemName 1";
    obj.themeName = "ASD";
    obj.addressLine1 = "18 Banksia Street";
    obj.addressLine2 = "cc";
    obj.suburb = "Heidelberg";
    obj.state = "VIC";
    obj.postalCode = "3084";
    obj.contactPhone = "+61 3 123456";
    obj.emailAddress = "qwerty.it@xyz.com";
    var obj2 = new Object();
    obj2.id = 2;
    obj2.name = "Test itemName 2";
    obj2.themeName = "ASD2";
    obj2.addressLine1 = "18 Banksia Street2";
    obj2.addressLine2 = "cc2";
    obj2.suburb = "Heidelberg2";
    obj2.state = "VIC2";
    obj2.postalCode = "30842";
    obj2.contactPhone = "+61 3 1234562";
    obj2.emailAddress = "2qwerty.it@xyz.com";
    var obj3 = new Object();
    obj3.id = 3;
    obj3.name = "Test itemName 3";
    obj3.themeName = "ASD3";
    obj3.addressLine1 = "138 Banksia Street";
    obj3.addressLine2 = "c3c";
    obj3.suburb = "Heidelb3erg";
    obj3.state = "V3IC";
    obj3.postalCode = "3384";
    obj3.contactPhone = "+613 3 123456";
    obj3.emailAddress = "qwe3rty.it@xyz.com";
    var all = [obj, obj2, obj3];
    return createJSON(all);
  //   {
  //       "$id":"2",
  //       "name":"Test itemName 2",
  //       "themeName":"WER",
  //       "addressLine1":"11 Riverview Place",
  //       "addressLine2":"Metroplex on Gateway",
  //       "suburb":"Murarrie",
  //       "state":"QLD",
  //       "postalCode":"4172",
  //       "contactPhone":"1300 73123456",
  //       "emailAddress":"asdfg.it@xyz.com"
  //   },
  //   {
  //       "$id":"3",
  //       "name":"Test itemName 3",
  //       "themeName":"ERT",
  //       "addressLine1":"60 Waterloo Road",
  //       "addressLine2":null,
  //       "suburb":"North Ryde",
  //       "state":"NSW",
  //       "postalCode":"2113",
  //       "contactPhone":"123456",
  //       "emailAddress":"zxcvb.it@xyz.com"
  //   }
  // ]);
}

function createJSON(all) {
    var jsonObj = [];
    for (var i = 0; i < all.length; i++) {
      var id = all[i]['id'];
      var name = all[i]['name'];
      var addressLine1 = all[i]['addressLine1'];
      var addressLine2 = all[i]['addressLine2'];
      var suburb = all[i]['suburb'];
      var contactPhone = all[i]['contactPhone'];

        var item = {}
        item ["id"] = id;
        item ["name"] = name;
        item ["addressLine1"] = addressLine1;
        item ["addressLine2"] = addressLine2;
        item ["suburb"] = suburb;
        item ["contactPhone"] = contactPhone;

        jsonObj.push(item);
    }

    console.log(jsonObj);
    return jsonObj;
}