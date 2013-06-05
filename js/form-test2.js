'use strict';
var app = angular.module('myApp', []);

app.config(function ($routeProvider) {
  // Configure the routes
  $routeProvider
    .when('/', {
      // List the form
      templateUrl: 'form.html'
    })
    .when('/timer', {
      // Setup the Timer
      templateUrl: 'test-template.html'
    });

    

}); 


app.controller( 'FormCtrl', function FormCtrl($scope, $http, storage) {

	$scope.defaults = {
											name: 'Test',
											boilTime: 65,
											boilSchedule: [],
											vibrate: 'y',
											getSchedule: function() { return this.boilSchedule; }
										};

	$scope.addDefaults = {
                          unit: true,
													evTime: $scope.defaults.boilTime
												};

  $scope.user 		= $scope.defaults;
  $scope.master   = storage.getItem('master');



  $scope.save = function(user) {
    $scope.master= angular.copy(user);
    storage.setItem('master', $scope.master);
  };

  $scope.reset = function() {
    $scope.user   = $scope.defaults;
    $scope.master = {};
    storage.clear();
  };


  // BOIL EVENTS
  $scope.addEvent = function(user) {
   
    var unit;
    var amt  = $scope.amount;

    if(amt != undefined) {
       unit = $scope.addDefaults.unit === true ? 'oz' : 'g';
    } else {
      unit = '';
    }

    $scope.user.boilSchedule.push({ 
       amt: amt,
      unit: unit,
      name: $scope.searchHops.name, 
      time: $scope.addDefaults.evTime, 
      done: false
    });
    
    $scope.evName = '';
  };

  $scope.deleteEvent = function(user, index){
    $scope.user.boilSchedule.splice(index, 1);
  };
  

  
  // HOPS
  $http.get('json/hops.json').success(function(data) {
    $scope.hops = data;
  });

  // hopChange() is setup to reshow the ul of the hop matches! 
  $scope.hopChange = function() {
    $scope.clicked = false;
  };

  // hopMatch() a user clicks on the hop they want, hides the list.
  $scope.hopMatch = function(hop){
    $scope.searchHops.name = hop;
    $scope.clicked = true;
  };


});




app.service('storage', function() {

  this.setItem    = function(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  };

  this.getItem    = function(key) {
    return JSON.parse(localStorage.getItem(key));
  };

  this.clear      = function() {
    localStorage.clear();
  };

  this.removeItem = function(key) {
    localStorage.removeItem(key);
  }
});