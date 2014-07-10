/**
 * Created by jinwyp on 6/30/14.
 */

'use strict';

/* jasmine specs for controllers go here */

describe('chartController', function(){

    /********************  load the controller's module  ********************/
    beforeEach(module('marksimos'), ['angularCharts', 'nvd3ChartDirectives', 'marksimos.component', 'marksimos.factory', 'marksimos.filters' ]);

    var controller;
    var scope;
    var serviceApi;


    /********************  Initialize the controller and a mock scope  ********************/
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('chartController', {
            $scope: scope
        });
    }));


    /********************  Initially critical  ********************/
    it('Initially scope.css.menu has default value ', function() {
        expect(scope.css.menu).toEqual("Report");
    });

    it('Initially scope.css.chartMenu has default value ', function() {
        expect(scope.css.chartMenu).toEqual("A1");
    });

    it('Initially scope.css.tableReportTab has default value ', function() {
        expect(scope.css.tableReportTab).toEqual("SKU");
    });

//    it('Initially scope.data.currentSku has default value ', function() {
//        expect(scope.data.currentSku.d_SKUName).toBe("_1");
//    });


    it('Initially scope.data.tableA1CompanyStatus has default value ', function() {
        expect(scope.data.tableA1CompanyStatus.currentCompany.companyName).toEqual("Company List");
    });
    it('Initially scope.data.tableA2FinancialData has default value ', function() {
        expect(scope.data.tableA2FinancialData.currentPeriod.period).toEqual("Select Period");
    });
    it('Initially scope.data.tableA4ProfitabilityEvolution has default value ', function() {
        expect(scope.data.tableA4ProfitabilityEvolution.title).toEqual("Profitability Evolution");
    });



    /********************  Function critical  ********************/
    it('Should switch menu and scope.css.menu to "Decision"', function() {
        scope.switchHeaderMenu('Decision');
        expect(scope.css.menu).toEqual("Decision");
    });

    it('Should switch currentSku and scope.data.currentSku to simple sku' , function() {
        scope.clickCurrentSku({});
        expect(scope.data.currentSku).toEqual({});
    });


//    it('should ....', inject(function($controller) {
//        //spec body
//        var myCtrl2 = $controller('MyCtrl2', { $scope: {} });
//        expect(myCtrl2).toBeDefined();
//    }));
//


    /********************  nice-to-haves  ********************/
    it('ensure client-side helper shown for empty fields', function() { });



});