/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimosadmin', ['pascalprecht.translate', 'notifications', 'marksimos.websitecomponent', 'marksimos.commoncomponent']);






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
marksimosapp.controller('adminHomeController', ['$scope', '$http', '$notification', function($scope, $http, $notification) {

    $scope.css = {
        leftmenu : 11,
        menuTabShow : [false,false,false,false,false,false], //从第二个false 开始第1个菜单
        seminarId : 0
    };

    $scope.data = {
        currentUser : null,
        newDistributor : {
            username : "",
            email : "",
            password : "",
            phone : "",
            pincode : "",
            country : null,
            state : "shanghai",
            city : "shanghai",
            district : "",
            street : "",
            num_of_license_granted : 0,
            gameType : ""
        },
        searchDistributor : {
            username :'',
            email :'',
            user_status :'false'
        },
        distributors : [],

        newFacilitator : {
            username : "",
            email : "",
            password : "",
            phone : "",
            pincode : "",
            country : null,
            state : "shanghai",
            city : "shanghai",
            district : "",
            street : "",
            num_of_license_granted : 0
        },
        searchFacilitator : {
            username :'',
            email :'',
            user_status :'false'
        },
        facilitators : [],

        newStudent : {
            username : "",
            email : "",
            password : "",
            phone : "",
            country : null,
            state : "shanghai",
            city : "shanghai",
            occupation : "",
            university : "",
            organization : "",
            firstname : "",
            lastname : ""
        },
        searchStudent : {
            username :'',
            email :'',
            user_status :'false'
        },
        students : [],


        newSeminar : {
            description : "",
            country : null,
            state : "shanghai",
            city : "shanghai",
            venue : "",
            simulation_span : 4,
            company_num : 3
        },
        searchSeminar : {
            id :'',
            status :'false'
        },
        seminars : [],

        addStudentToSeminar : {
            seminar_id : 0,
            student_id : "",
            company_id : 0,
            email : ""
        },

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
    $scope.data.newStudent.country = $scope.data.country[20].name;
    $scope.data.newSeminar.country = $scope.data.country[20].name;


    /********************  获取信息  ********************/
    $scope.adminInit = function(){

        $http.get('/api/admin/user').success(function(data, status, headers, config){
            $scope.data.currentUser = data;

            if($scope.data.currentUser.role === 1){
                $scope.getDistributorsInit();
                $scope.getFacilitatorsInit();
                $scope.getStudentsInit();
                $scope.css.menuTabShow = [false, true, true, true, true, true, true];

            }else if($scope.data.currentUser.role === 2){
                $scope.getFacilitatorsInit();
                $scope.css.menuTabShow = [false, true, false, true, false, false, false];

            }else if($scope.data.currentUser.role === 3){
                $scope.getStudentsInit();
                $scope.getSeminarInit();
                $scope.css.menuTabShow = [false, true, false, false ,true, true, false];
            }

        }).error(function(data, status, headers, config) {
            console.log(data);
        });

    };

    $scope.getDistributorsInit = function(){
        $http.get('/api/admin/distributors').success(function(data, status, headers, config){
            $scope.data.distributors = data;

        }).error(function(data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.getFacilitatorsInit = function() {
        $http.get('/api/admin/facilitators').success(function (data, status, headers, config) {
            $scope.data.facilitators = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.getStudentsInit = function() {
        $http.get('/api/admin/students').success(function (data, status, headers, config) {
            $scope.data.students = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.getSeminarInit = function() {
        $http.get('/api/admin/facilitator/seminar').success(function (data, status, headers, config) {
            $scope.data.seminars = data;
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };



    $scope.adminInit();






    /********************  搜索 Distributor  ********************/
    $scope.searchDistributor = function(form){
        if(form.$valid){
            $http.get('/api/admin/distributors', {params : $scope.data.searchDistributor}).success(function(data, status, headers, config){

                $scope.data.distributors = data;

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };
    /********************  创建新的 Distributor  ********************/
    $scope.createNewDistributor = function(form){
        if(form.$valid){
            console.log($scope.data.newDistributor);
            $http.post('/api/admin/distributors', $scope.data.newDistributor).success(function(data, status, headers, config){

                $scope.getDistributorsInit();
                $scope.css.leftmenu = 21;

                $notification.success('Save success', 'Create Distributor success');

            }).error(function(data, status, headers, config){
                console.log(data);
                $notification.error('Save failed', data.message);
            });
        }
    };


    /********************  搜索 Facilitator  ********************/
    $scope.searchFacilitator = function(form){
        if(form.$valid){
            $http.get('/api/admin/facilitators', {params : $scope.data.searchFacilitator}).success(function(data, status, headers, config){
                $scope.data.facilitators = data;

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };
    /********************  创建新的 Facilitator  ********************/
    $scope.createNewFacilitator = function(form){
        if(form.$valid){
            console.log($scope.data.newFacilitator);
            $http.post('/api/admin/facilitators', $scope.data.newFacilitator).success(function(data, status, headers, config){

                $scope.getFacilitatorsInit();
                $scope.css.leftmenu = 31;

                $notification.success('Save success', 'Create Facilitator success');

            }).error(function(data, status, headers, config){
                console.log(data);
                $notification.error('Save failed', data.message);
            });
        }
    };

    /********************  搜索 Students  ********************/
    $scope.searchStudent = function(form){
        if(form.$valid){
            $http.get('/api/admin/students', {params : $scope.data.searchStudent}).success(function(data, status, headers, config){
                $scope.data.students = data;

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };
    /********************  创建新的 Student  ********************/
    $scope.createNewStudent = function(form){
        if(form.$valid){
            console.log($scope.data.newStudent);
            $http.post('/api/admin/students', $scope.data.newStudent).success(function(data, status, headers, config){

                $scope.getStudentsInit();
                $scope.css.leftmenu = 41;

                $notification.success('Save success', 'Create Student success');

            }).error(function(data, status, headers, config){
                console.log(data);
                $notification.error('Save failed', data.message);
            });
        }
    };


    /********************  搜索 Seminars  ********************/
    $scope.searchSeminar = function(form){
        if(form.$valid){
            $http.get('/api/admin/facilitator/seminar', {params : $scope.data.searchSeminar}).success(function(data, status, headers, config){
                $scope.data.seminars = data;

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };
    /********************  创建新的 Seminar  ********************/
    $scope.createNewSeminar = function(form){
        if(form.$valid){
            console.log($scope.data.newSeminar);
            $http.post('/api/admin/seminar', $scope.data.newSeminar).success(function(data, status, headers, config){

                $scope.getSeminarInit();
                $scope.css.leftmenu = 51;

                $notification.success('Save success', 'Create Seminar success');

            }).error(function(data, status, headers, config){
                console.log(data);
                $notification.error('Save failed', data.message);
            });
        }
    };

    /********************  选择公司  ********************/
    $scope.chooseCompany = function(seminar, company){
        seminar.currentCompanyName = company.companyName;
        $scope.data.addStudentToSeminar.seminar_id = seminar.seminarId ;
        $scope.data.addStudentToSeminar.company_id = company.companyId ;
    };
    /********************  Add Student To Seminar  ********************/
    $scope.addStudentToSeminar = function(seminarid, studentemail){

        if($scope.data.addStudentToSeminar.company_id === 0 || angular.isUndefined(studentemail) || studentemail === "" ){
            $scope.css.seminarId = seminarid;
        }else{
            $scope.css.seminarId = 0;
            $scope.data.addStudentToSeminar.email = studentemail;

            $http.post('/api/admin/assign_student_to_seminar', $scope.data.addStudentToSeminar).success(function(data, status, headers, config){
                $scope.getSeminarInit();
                $notification.success('Save success', 'Add Student to Seminar success');

                $scope.data.addStudentToSeminar.seminar_id = 0 ;
                $scope.data.addStudentToSeminar.company_id = 0 ;
                $scope.data.addStudentToSeminar.student_id = 0 ;

            }).error(function(data, status, headers, config){
                console.log(data);
                $notification.error('Save failed', data.message);
            });
        }



    };

    /********************  Init Seminar  ********************/
    $scope.initSeminar = function(seminarid){
        $http.post('/api/admin/init', {seminar_id:seminarid}).success(function(data, status, headers, config){
            $scope.getSeminarInit();
            $notification.success('Save success', 'Init Seminar success');

        }).error(function(data, status, headers, config){
            console.log(data);
            $notification.error('Save failed', data.message);
        });
    };

    /********************  Run Seminar  ********************/
    $scope.runSeminar = function(seminarid){
        $http.post('/api/admin/runsimulation', {seminar_id:seminarid}).success(function(data, status, headers, config){
            $scope.getSeminarInit();
            $notification.success('Save success', 'Run Seminar success');

        }).error(function(data, status, headers, config){
            console.log(data);
            $notification.error('Save failed', data.message);
        });
    };




}]);