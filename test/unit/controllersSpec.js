'use strict';

/* jasmine specs for controllers go here */

describe('Controllers', function(){
	var $scope, ctrl = null;

  /* A mocked version of our service, someService
   * we're mocking this so we have total control and we're
   * testing this in isolation from any calls it might
   * be making.
   */
  var mockService = {
    someAsyncCall: function (x){
      return 'weee';
    }
  }

  //you need to indicate your module in a test
  beforeEach(module("brewApp"));

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function($rootScope, $controller) {
    //create a scope object for us to use.
    $scope = $rootScope.$new();

    //now run that scope through the controller function,
    //injecting any services or other injectables we need.
    ctrl = $controller('FormCtrl', {
      $scope: $scope,
      someService: mockService
    });
  }));

  describe('Defaults', function(){
  	it("should create scope defaults", inject(function() {
  	
	  	expect($scope.defaults.name).toEqual('Test');
	  	expect($scope.defaults.boilTime).toEqual(60);
	  	expect($scope.defaults.boilSchedule).toEqual([]);
	  	expect($scope.defaults.vibrate).toEqual('y');
	  	
		}));

		it("should create a user scope object from defaults", inject(function() {
			expect($scope.defaults).toEqual($scope.user);

		}));



  });
	

  
  // describe('Form actions', function () {
  // 	it("should set the master object equal to user", inject(function() {
  // 	  $scope.save();
  // 	  $scope.apply();
  // 	  expect($scope.master).toEqual($scope.user);
  // 	}));
  // });

});