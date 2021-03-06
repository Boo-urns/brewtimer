'use strict';
var app = angular.module('brewApp', []);

app.config(function ($routeProvider) {
  // Configure the routes
  $routeProvider
    .when('/', {
      // List the form to setup your brew schedule
      templateUrl: 'setup.html'
    })

    .when('/schedule', {
      // Display Boil Schedule with Timer
      templateUrl: 'schedule.html',
      controller: 'TimerCtrl'
    })

    

}); 


app.controller( 'FormCtrl', function FormCtrl($scope, $http, storage) {

	$scope.defaults = {
											name: 'Test',
											boilTime: 60,
											boilSchedule: [],
											vibrate: 'y',
											getSchedule: function() { return this.boilSchedule; }
										};

	$scope.addDefaults = {
                          amt: null,
                          unit: true,
													evTime: $scope.defaults.boilTime
												};

  $scope.user 		= $scope.defaults;
  $scope.master   = storage.getItem('master');



  $scope.save = function(user) {
    $scope.master = angular.copy(user);
    storage.setItem('master', $scope.master);
  };

  $scope.reset = function() {
    $scope.user   = $scope.defaults;
    $scope.master = {};
    storage.clear();
  };


  // BOIL EVENTS
  $scope.addEvent = function(user) {
   
    var amount  = $scope.addDefaults.amt;
    var unit    = $scope.addDefaults.unit === true ? 'oz' : 'g';

    $scope.user.boilSchedule.push({ 
       amt: amount,
      unit: unit,
      name: $scope.hops.name, 
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
      $scope.hops.name = hop;
      $scope.clicked = true;
  };



});
