/**
 * Created by jinwyp on 6/30/14.
 */

'use strict';

/* jasmine specs for controllers go here */

describe('chartController', function(){

    // load the controller's module
    beforeEach(module('marksimos'), ['angularCharts', 'nvd3ChartDirectives', 'marksimos.component', 'marksimos.factory', 'marksimos.filters' ]);

    var controller;
    var scope;
    var serviceApi;



    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('chartController', {
            $scope: scope
        });
    }));



    // critical
    it('Initially scope.css.menu has default value ', function() {
        expect(scope.css.menu).toBe("Decision");
    });

    it('Initially scope.css.chartMenu has default value ', function() {
        expect(scope.css.chartMenu).toBe("A3");
    });

//    it('should ....', inject(function($controller) {
//        //spec body
//        var myCtrl2 = $controller('MyCtrl2', { $scope: {} });
//        expect(myCtrl2).toBeDefined();
//    }));
//


    // nice-to-haves
    it('ensure client-side helper shown for empty fields', function() { });



});