'use strict';

describe("E2E: Form Testing", function(){

	beforeEach(function() {
		browser().navigateTo('../../app/index.html');
	});

	// it("should display the correct boilTime when adjusting the range", function() {
	//   // Adjust the slider
	//   input("user.boilTime").enter(30);

	//   expect(element('span.boilTime').text().toMatch(30));
	// });

	// it("should display the correct boilTime when adjusting the range", function() {
	//   // Adjust the slider
	//   input("user.boilTime").enter(30);

	//   expect(element('span.boilTime').text().toMatch(30));
	// });

	it("should copy user object to the master object on clicking save", function() {
		pause();
		// Enter Name
		input("user.name").enter("Awesome Brew");

		//expect($scope.user.name).toEqual('Awesome Brew');
		// Click on Save
		element('button.save').click();	  


	});

});