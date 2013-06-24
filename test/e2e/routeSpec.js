'use strict';

describe("E2E: Testing Routes", function(){
	beforeEach(function() {
		browser().navigateTo('../../app/index.html');
	});

	it('should have a working /timer route', function() {
		browser().navigateTo('#/timer');
		expect(browser().location().path()).toBe('/timer');
	});

	 it("should have a link Let's get Brewing!", function() {
      expect(element('a:first').text()).
        toMatch(/Let's get Brewing!/);
    });

});


