/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimosadmin', []);

marksimosapp.directive('headerAdmin', [function() {
    return {
        scope: {},
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/adminheader.html'
    };
}]);


marksimosapp.directive('menuAdmin', [function() {
    return {
        scope: {
            currentMenu : '='
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/adminmenu.html',
        link : function(scope, element){


            scope.css = {
                currentTab : 2,
//                currentMenu : 'DistributorList',
                menuexpand : [false, false, true, true, true, true, false, false] // menus control expand
            };


            scope.clickTab = function(tab){

                scope.css.menuexpand[tab] = !scope.css.menuexpand[tab];
                scope.css.currentTab = tab;

            };

            scope.clickMenu = function(currentmenu){
                scope.currentMenu = currentmenu;

                if(currentmenu === 1){
                    scope.clickTab(1);
                }
            };

        }
    };
}]);





// controller business logic
marksimosapp.controller('adminLoginController', ['$scope', '$timeout', '$http', '$window', function($scope, $timeout, $http, $window) {

    $scope.data = {
        admin : {
            email : '',
            password : ''
        }
    };

    $scope.login = function(form){
        if(form.$valid){
            $http.post('/api/login', $scope.data.admin).success(function(data, status, headers, config){

                $window.location.href = "/adminhome" ;

            }).error(function(data, status, headers, config){
                if(status == 400){
                    console.log(data, status);

                    form.password.$valid = false;
                    form.password.$invalid = true;
                }
            });
        }
    };
}]);




// controller business logic
marksimosapp.controller('adminHomeController', ['$scope', '$http', function($scope, $http) {

    $scope.css = {
        leftmenu : 2,
        updatestatus : false
    };

    $scope.data = {
        newDistributor : {
            username : "",
            email : "",
            password : "",
            phone : "",
            pincode : "",
            password : "",
            country : null,
            state : "shanghai",
            city : "shanghai",
            district : "",
            street : "",
            num_of_license_granted : 0,
            gameType : ""
        },
        searchDistributor : {
            username :''
        },
        distributors : [],

        newFacilitator : {
            name : "",
            email : "",
            password : "",
            country : {},
            province : "",
            city : "",
            licence : ""
        },
        facilitators : [],


        country : [
            {id:"DZ2", name:"Algeria"},
            {id:"AI2", name:"Anguilla"},
            {id:"AG2", name:"Antigua"},
            {id:"AR2", name:"Argentina"},
            {id:"AU2", name:"Australia"},
            {id:"AT2", name:"Austria"},
            {id:"BS2", name:"Bahamas"},
            {id:"BH2", name:"Bahrain"},
            {id:"BB2", name:"Barbados"},
            {id:"BY2", name:"Belarus"},
            {id:"BE2", name:"Belgium"},
            {id:"BM2", name:"Bermuda"},
            {id:"BW2", name:"Botswana"},
            {id:"BR2", name:"Brazil"},
            {id:"VG2", name:"British Virgin Islands"},
            {id:"BN2", name:"Brunei"},
            {id:"BG2", name:"Bulgaria"},
            {id:"CA2", name:"Canada"},
            {id:"KY2", name:"Cayman Islands"},
            {id:"CL2", name:"Chile"},
            {id:"CN2", name:"China"},
            {id:"CO2", name:"Colombia"},
            {id:"HR2", name:"Croatia"},
            {id:"CY2", name:"Cyprus"},
            {id:"CZ2", name:"Czech Republic"},
            {id:"DK2", name:"Denmark"},
            {id:"DM2", name:"Dominica"},
            {id:"DO2", name:"Dominican Republic"},
            {id:"EG2", name:"Egypt"},
            {id:"SV2", name:"El Salvador"},
            {id:"EE2", name:"Estonia"},
            {id:"FI2", name:"Finland"},
            {id:"FR2", name:"France"},
            {id:"GY2", name:"French Guiana"},
            {id:"GE2", name:"Georgia"},
            {id:"DE2", name:"Germany"},
            {id:"GI2", name:"Gibraltar"},
            {id:"GR2", name:"Greece"},
            {id:"GD2", name:"Grenada"},
            {id:"GP2", name:"Guadeloupe"},
            {id:"GT2", name:"Guatemala"},
            {id:"HK2", name:"Hong Kong"},
            {id:"HU2", name:"Hungary"},
            {id:"IS2", name:"Iceland"},
            {id:"IN2", name:"India"},
            {id:"ID2", name:"Indonesia"},
            {id:"IR2", name:"Iran"},
            {id:"IE2", name:"Ireland"},
            {id:"IL2", name:"Israel"},
            {id:"IT2", name:"Italy"},
            {id:"JM2", name:"Jamaica"},
            {id:"JP2", name:"Japan"},
            {id:"JO2", name:"Jordan"},
            {id:"KZ2", name:"Kazakhstan"},
            {id:"KR2", name:"Korea, South"},
            {id:"KG2", name:"Kyrgyzstan"},
            {id:"LV2", name:"Latvia"},
            {id:"LT2", name:"Lithuania"},
            {id:"LU2", name:"Luxembourg"},
            {id:"MO2", name:"Macau"},
            {id:"MY2", name:"Malaysia"},
            {id:"MT2", name:"Malta"},
            {id:"MQ2", name:"Martinique"},
            {id:"MX2", name:"Mexico"},
            {id:"MD2", name:"Moldova"},
            {id:"MC2", name:"Monaco"},
            {id:"MS2", name:"Montserrat"},
            {id:"NL2", name:"Netherlands"},
            {id:"NZ2", name:"New Zealand"},
            {id:"NO2", name:"Norway"},
            {id:"OM2", name:"Oman"},
            {id:"PA2", name:"Panama"},
            {id:"PE2", name:"Peru"},
            {id:"PH2", name:"Philippines"},
            {id:"PL2", name:"Poland"},
            {id:"PT2", name:"Portugal"},
            {id:"PR2", name:"Puerto Rico"},
            {id:"QA2", name:"Qatar"},
            {id:"RE2", name:"Reunion"},
            {id:"RO2", name:"Romania"},
            {id:"RU2", name:"Russian Federation"},
            {id:"LC2", name:"Saint Lucia"},
            {id:"VC2", name:"Saint Vincent and the Grenadines"},
            {id:"SA2", name:"Saudi Arabia"},
            {id:"RS2", name:"Serbia"},
            {id:"SG2", name:"Singapore"},
            {id:"SK2", name:"Slovakia"},
            {id:"SI2", name:"Slovenia"},
            {id:"ZA2", name:"South Africa"},
            {id:"ES2", name:"Spain"},
            {id:"LK2", name:"Sri Lanka"},
            {id:"KN2", name:"St.Kitts and Nevis"},
            {id:"SE2", name:"Sweden"},
            {id:"CH2", name:"Switzerland"},
            {id:"TW2", name:"Taiwan"},
            {id:"TJ2", name:"Tajikistan"},
            {id:"TH2", name:"Thailand"},
            {id:"TT2", name:"Trinidad and Tobago"},
            {id:"TR2", name:"Turkey"},
            {id:"UA2", name:"Ukraine"},
            {id:"AE2", name:"United Arab Emirates"},
            {id:"UK2", name:"United Kingdom"},
            {id:"UI2", name:"Universal Toll Free"},
            {id:"UY2", name:"Uruguay"},
            {id:"US2", name:"USA"},
            {id:"VE2", name:"Venezuela"},
            {id:"VN2", name:"Vietnam"}

        ]

    };

    $scope.data.newDistributor.country = $scope.data.country[20].name;
    $scope.data.newFacilitator.country = $scope.data.country[20].name;


    /********************  获取信息  ********************/
    $scope.adminInit = function(){
        $http.get('/api/admin/distributors').success(function(data, status, headers, config){
            $scope.data.distributors = data;
        }).error(function(data, status, headers, config) {
            console.log(data);
        });
    };


    $scope.adminInit();


    /********************  创建新的 Distributor  ********************/
    $scope.searchDistributor = function(form){
        if(form.$valid){
            console.log($scope.data.searchDistributor);
            $http.get('/api/admin/distributors', {params : $scope.data.searchDistributor}).success(function(data, status, headers, config){

                $scope.data.distributors = data;

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };

    $scope.createNewDistributor = function(form){
        if(form.$valid){
            console.log($scope.data.newDistributor);
            $http.post('/api/admin/distributors', $scope.data.newDistributor).success(function(data, status, headers, config){

                $scope.adminInit();
                $scope.css.leftmenu = 21;

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };


}]);