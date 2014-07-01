/**
 * Created by jinwyp on 6/30/14.
 */

'use strict';

/* jasmine specs for controllers go here */

describe('chartController', function(){
    beforeEach(module('myApp.controllers'));


    it('should ....', inject(function($controller) {
        //spec body
        var myCtrl1 = $controller('MyCtrl1', { $scope: {} });
        expect(myCtrl1).toBeDefined();
    }));

    it('should ....', inject(function($controller) {
        //spec body
        var myCtrl2 = $controller('MyCtrl2', { $scope: {} });
        expect(myCtrl2).toBeDefined();
    }));
});