/**
 * Created by jinwyp on 4/28/14.
 */


(function() {
    'use strict';

    /********************  Create New Module For Controllers ********************/
    angular.module('marksimosadmin', ['pascalprecht.translate', 'angularCharts', 'nvd3ChartDirectives', 'notifications', 'marksimos.websitecomponent', 'marksimos.commoncomponent', 'marksimos.filter']);





    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('marksimosadmin').controller('adminLoginController', ['$scope', '$timeout', '$http', '$window', 'Admin', function($scope, $timeout, $http, $window, Admin) {

        $scope.data = {
            admin: {
                email: '',
                password: ''
            }
        };

        $scope.login = function(form) {
            if (form.$valid) {

                Admin.login($scope.data.admin).success(function(data, status, headers, config) {

                    $window.location.href = "/marksimos/adminhome";

                    }).error(function (data, status, headers, config) {
                        console.log(data, status);
                        if (status == 400) {
                            form.password.$valid = false;
                            form.password.$invalid = true;
                        }
                        else if (status == 403) {
                            form.email.$valid = false;
                            form.email.$invalid = true;
                        }
                });
            }
        };
    }]);







    angular.module('marksimosadmin').controller('adminHomeController', ['$scope', '$http', '$notification', 'Admin', function($scope, $http, $notification, Admin) {

        $scope.css = {
            leftmenu: 11,
            menuTabShow: [false, false, false, false, false, false], //从第二个false 开始第1个菜单
            seminarId: 0,
            runButtonDisabled: false,
            showConfirm : false,
            currentRunSeminarId : 0
        };

        $scope.data = {
            currentUser: null,
            newDistributor: {
                username: "",
                email: "",
                password: "",
                mobilePhone: "",
                idcardNumber: "",
                country: null,
                state: "shanghai",
                city: "shanghai",
                district: "",
                street: "",
                num_of_license_granted: 0,
                gameType: ""
            },
            searchDistributor: {
                username: '',
                email: '',
                user_status: 'true'
            },
            distributors: [],

            newFacilitator: {
                username: "",
                email: "",
                password: "",
                mobilePhone: "",
                idcardNumber: "",
                country: null,
                state: "shanghai",
                city: "shanghai",
                district: "",
                street: "",
                num_of_license_granted: 0
            },
            searchFacilitator: {
                username: '',
                email: '',
                user_status: 'true'
            },
            facilitators: [],

            newStudent: {
                username: "",
                email: "",
                password: "",
                mobilePhone: "",
                country: null,
                state: "shanghai",
                city: "shanghai",
                occupation: "",
                university: "",
                firstname: "",
                lastname: "",
                student_type: 10 //10 B2B students,  20 B2C students, 30 Both B2C and B2B students
            },
            searchStudent: {
                username: '',
                email: '',
                user_status: 'true',
                //add for e4e
                student_type: ""
            },
            students: [],


            newSeminar: {
                description: "",
                country: null,
                state: "shanghai",
                city: "shanghai",
                venue: "",
                simulation_span: 4,
                company_num: 3
            },
            searchSeminar: {
                filterKey: '',
                status: 'all'
            },
            seminars: [],


            addStudentToSeminar: {
                seminar_id: 0,
                company_id: 0,
                email: ""
            },
            removedStudent: {
                seminar_id: 0,
                student_id: "",
                email: ""
            },

            country: [
                { id: "DZ2", name: "Algeria" },
                { id: "AI2", name: "Anguilla" },
                { id: "AG2", name: "Antigua" },
                { id: "AR2", name: "Argentina" },
                { id: "AU2", name: "Australia" },
                { id: "AT2", name: "Austria" },
                { id: "BS2", name: "Bahamas" },
                { id: "BH2", name: "Bahrain" },
                { id: "BB2", name: "Barbados" },
                { id: "BY2", name: "Belarus" },
                { id: "BE2", name: "Belgium" },
                { id: "BM2", name: "Bermuda" },
                { id: "BW2", name: "Botswana" },
                { id: "BR2", name: "Brazil" },
                { id: "VG2", name: "British Virgin Islands" },
                { id: "BN2", name: "Brunei" },
                { id: "BG2", name: "Bulgaria" },
                { id: "CA2", name: "Canada" },
                { id: "KY2", name: "Cayman Islands" },
                { id: "CL2", name: "Chile" },
                { id: "CN2", name: "China" },
                { id: "CO2", name: "Colombia" },
                { id: "HR2", name: "Croatia" },
                { id: "CY2", name: "Cyprus" },
                { id: "CZ2", name: "Czech Republic" },
                { id: "DK2", name: "Denmark" },
                { id: "DM2", name: "Dominica" },
                { id: "DO2", name: "Dominican Republic" },
                { id: "EG2", name: "Egypt" },
                { id: "SV2", name: "El Salvador" },
                { id: "EE2", name: "Estonia" },
                { id: "FI2", name: "Finland" },
                { id: "FR2", name: "France" },
                { id: "GY2", name: "French Guiana" },
                { id: "GE2", name: "Georgia" },
                { id: "DE2", name: "Germany" },
                { id: "GI2", name: "Gibraltar" },
                { id: "GR2", name: "Greece" },
                { id: "GD2", name: "Grenada" },
                { id: "GP2", name: "Guadeloupe" },
                { id: "GT2", name: "Guatemala" },
                { id: "HK2", name: "Hong Kong" },
                { id: "HU2", name: "Hungary" },
                { id: "IS2", name: "Iceland" },
                { id: "IN2", name: "India" },
                { id: "ID2", name: "Indonesia" },
                { id: "IR2", name: "Iran" },
                { id: "IE2", name: "Ireland" },
                { id: "IL2", name: "Israel" },
                { id: "IT2", name: "Italy" },
                { id: "JM2", name: "Jamaica" },
                { id: "JP2", name: "Japan" },
                { id: "JO2", name: "Jordan" },
                { id: "KZ2", name: "Kazakhstan" },
                { id: "KR2", name: "Korea, South" },
                { id: "KG2", name: "Kyrgyzstan" },
                { id: "LV2", name: "Latvia" },
                { id: "LT2", name: "Lithuania" },
                { id: "LU2", name: "Luxembourg" },
                { id: "MO2", name: "Macau" },
                { id: "MY2", name: "Malaysia" },
                { id: "MT2", name: "Malta" },
                { id: "MQ2", name: "Martinique" },
                { id: "MX2", name: "Mexico" },
                { id: "MD2", name: "Moldova" },
                { id: "MC2", name: "Monaco" },
                { id: "MS2", name: "Montserrat" },
                { id: "NL2", name: "Netherlands" },
                { id: "NZ2", name: "New Zealand" },
                { id: "NO2", name: "Norway" },
                { id: "OM2", name: "Oman" },
                { id: "PA2", name: "Panama" },
                { id: "PE2", name: "Peru" },
                { id: "PH2", name: "Philippines" },
                { id: "PL2", name: "Poland" },
                { id: "PT2", name: "Portugal" },
                { id: "PR2", name: "Puerto Rico" },
                { id: "QA2", name: "Qatar" },
                { id: "RE2", name: "Reunion" },
                { id: "RO2", name: "Romania" },
                { id: "RU2", name: "Russian Federation" },
                { id: "LC2", name: "Saint Lucia" },
                { id: "VC2", name: "Saint Vincent and the Grenadines" },
                { id: "SA2", name: "Saudi Arabia" },
                { id: "RS2", name: "Serbia" },
                { id: "SG2", name: "Singapore" },
                { id: "SK2", name: "Slovakia" },
                { id: "SI2", name: "Slovenia" },
                { id: "ZA2", name: "South Africa" },
                { id: "ES2", name: "Spain" },
                { id: "LK2", name: "Sri Lanka" },
                { id: "KN2", name: "St.Kitts and Nevis" },
                { id: "SE2", name: "Sweden" },
                { id: "CH2", name: "Switzerland" },
                { id: "TW2", name: "Taiwan" },
                { id: "TJ2", name: "Tajikistan" },
                { id: "TH2", name: "Thailand" },
                { id: "TT2", name: "Trinidad and Tobago" },
                { id: "TR2", name: "Turkey" },
                { id: "UA2", name: "Ukraine" },
                { id: "AE2", name: "United Arab Emirates" },
                { id: "UK2", name: "United Kingdom" },
                { id: "UI2", name: "Universal Toll Free" },
                { id: "UY2", name: "Uruguay" },
                { id: "US2", name: "USA" },
                { id: "VE2", name: "Venezuela" },
                { id: "VN2", name: "Vietnam" }

            ]

        };

        $scope.data.newDistributor.country = $scope.data.country[20].name;
        $scope.data.newFacilitator.country = $scope.data.country[20].name;
        $scope.data.newStudent.country = $scope.data.country[20].name;
        $scope.data.newSeminar.country = $scope.data.country[20].name;

        $scope.data.newDistributor.country = $scope.data.country[20].name;
        $scope.data.newFacilitator.country = $scope.data.country[20].name;
        $scope.data.newStudent.country = $scope.data.country[20].name;
        $scope.data.newSeminar.country = $scope.data.country[20].name;

        /********************  初始化获取信息  ********************/


        function showCompanyName(fieldname) {
            var names = {
                '0': function() {
                    return "A";
                },
                '1': function() {
                    return "B";
                },
                '2': function() {
                    return "C";
                },
                '3': function() {
                    return "D";
                },
                '4': function() {
                    return "E";
                },
                '5': function() {
                    return "F";
                }

            };
            if (typeof names[fieldname] !== 'function') {
                return false;
            }
            return names[fieldname]();
        }


        var app = {
            initOnce: function() {
                var that = this;
                Admin.userInfo().success(function(data, status, headers, config) {
                    $scope.data.currentUser = data;

                    if ($scope.data.currentUser.role === 1) {
                        that.getDistributorsInit();
                        that.getFacilitatorsInit();
                        that.getStudentsInit();
                        $scope.css.menuTabShow = [false, true, true, true, true, true, true];

                    } else if ($scope.data.currentUser.role === 2) {
                        that.getFacilitatorsInit();
                        $scope.css.menuTabShow = [false, true, false, true, false, false, false];

                    } else if ($scope.data.currentUser.role === 3) {
                        that.getStudentsInit();
                        that.getSeminarInit();
                        $scope.css.menuTabShow = [false, true, false, false, true, true, false];
                    }

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            reRun: function() {

            },


            getDistributorsInit: function() {
                Admin.getDistributors().success(function(data, status, headers, config) {
                    $scope.data.distributors = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            getFacilitatorsInit: function() {
                Admin.getFacilitators().success(function(data, status, headers, config) {
                    $scope.data.facilitators = data;
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            getStudentsInit: function() {
                Admin.getStudents().success(function(data, status, headers, config) {
                    $scope.data.students = data;
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            getSeminarInit: function() {
                Admin.getSeminars().success(function(data, status, headers, config) {

                    $scope.data.seminars = data;
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            }


        };

        app.initOnce();





        /********************  搜索 Distributor  ********************/
        $scope.searchDistributor = function(form) {
            if (form.$valid) {
                Admin.getDistributors($scope.data.searchDistributor).success(function(data, status, headers, config) {

                    $scope.data.distributors = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };
        /********************  创建新的 Distributor  ********************/
        $scope.createNewDistributor = function(form) {
            if (form.$valid) {
                $http.post('/marksimos/api/admin/distributors', $scope.data.newDistributor).success(function(data, status, headers, config) {

                    app.getDistributorsInit();
                    $scope.css.leftmenu = 21;

                    $notification.success('Save success', 'Create Distributor success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };


        /********************  搜索 Facilitator  ********************/
        $scope.searchFacilitator = function(form) {
            if (form.$valid) {
                Admin.getFacilitators($scope.data.searchFacilitator).success(function(data, status, headers, config) {
                    $scope.data.facilitators = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };
        /********************  创建新的 Facilitator  ********************/
        $scope.createNewFacilitator = function(form) {
            if (form.$valid) {
                console.log($scope.data.newFacilitator);
                $http.post('/marksimos/api/admin/facilitators', $scope.data.newFacilitator).success(function(data, status, headers, config) {

                    app.getFacilitatorsInit();
                    $scope.css.leftmenu = 31;

                    $notification.success('Save success', 'Create Facilitator success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };


        /********************  搜索 Students  ********************/
        $scope.searchStudent = function(form) {
            if (form.$valid) {
                Admin.getStudents($scope.data.searchStudent).success(function(data, status, headers, config) {
                    $scope.data.students = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };
        /********************  创建新的 Student  ********************/
        $scope.createNewStudent = function(form) {
            if (form.$valid) {
                $http.post('/marksimos/api/admin/students', $scope.data.newStudent).success(function(data, status, headers, config) {

                    app.getStudentsInit();
                    $scope.css.leftmenu = 41;

                    $notification.success('Save success', 'Create Student success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };
        /********************  Student 重置密码为hcd1234  ********************/
        $scope.resetStudentPassword = function(id) {
            var postData = {
                student_id: id
            };
            $http.post('/marksimos/api/admin/resetPassword', postData).success(function(data, status, headers, config) {
                $scope.css.leftmenu = 41;
                $notification.success('Save success', 'Reset Student Password success');

            }).error(function(data, status, headers, config) {
                console.log(data);
                $notification.error('Failed', data.message);
            });
        };


        /********************  搜索 Seminars  ********************/
        $scope.searchSeminar = function(form) {
            if (form.$valid) {
                Admin.getSeminars($scope.data.searchSeminar).success(function(data, status, headers, config) {
                    $scope.data.seminars = data;

                }).error(function(data, status, headers, config) {                   
                    $notification.error('Failed', data.message);
                });
            }
        };
        $scope.resetSeminar = function (form) {
            $scope.data.searchSeminar.filterKey = "";
            $scope.data.searchSeminar.status = "all";
            $scope.searchSeminar(form);
        };
        /********************  创建新的 Seminar  ********************/
        $scope.createNewSeminar = function(form) {
            if (form.$valid) {
                $http.post('/marksimos/api/admin/seminar', $scope.data.newSeminar).success(function(data, status, headers, config) {

                    app.getSeminarInit();
                    $scope.css.leftmenu = 51;

                    $notification.success('Save success', 'Create Seminar success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };
        /********************  选择公司  ********************/
        $scope.chooseCompany = function(seminar, company) {
            seminar.currentCompanyName = company.companyName;
            $scope.data.addStudentToSeminar.seminar_id = seminar.seminarId;
            $scope.data.addStudentToSeminar.company_id = company.companyId;
        };
        /********************  Add Student To Seminar  ********************/
        $scope.addStudentToSeminar = function(seminarid, studentemail) {

            if ($scope.data.addStudentToSeminar.company_id === 0 || angular.isUndefined(studentemail) || studentemail === "") {
                $scope.css.seminarId = seminarid;
            }else{
                $scope.css.seminarId = 0;
                $scope.data.addStudentToSeminar.email = studentemail;

                $http.post('/marksimos/api/admin/assign_student_to_seminar', $scope.data.addStudentToSeminar).success(function(data, status, headers, config) {

                    app.getSeminarInit();
                    $notification.success('Save success', 'Add Student to Seminar success');

                    $scope.data.addStudentToSeminar.seminar_id = 0;
                    $scope.data.addStudentToSeminar.company_id = 0;
                    $scope.data.addStudentToSeminar.email = "";

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };
        /********************  Remove Student To Seminar  ********************/
        $scope.removeStudentToSeminar = function(seminarid, studentemail) {

            if (seminarid === "" || angular.isUndefined(studentemail) || studentemail === "") {
            } else {
                $scope.data.removedStudent.email = studentemail;
                $scope.data.removedStudent.seminar_id = seminarid;

                $http.post('/marksimos/api/admin/remove_student_from_seminar', $scope.data.removedStudent).success(function(data, status, headers, config) {
                    app.getSeminarInit();
                    $notification.success('Save success', 'Remove Student to Seminar success');

                    $scope.data.removedStudent.seminar_id = 0;
                    $scope.data.removedStudent.email = "";

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', data.message);
                });
            }
        };


        /********************  Init Seminar  ********************/
        $scope.initSeminar = function(seminarId) {
            $scope.css.runButtonDisabled = true;
            Admin.initSeminar(seminarId).success(function(data, status, headers, config) {
                app.getSeminarInit();
                $notification.success('Save success', 'Init Seminar success');
                $scope.css.runButtonDisabled = false;

            }).error(function(data, status, headers, config) {
                console.log(data);
                $notification.error('Failed', data.message);
                $scope.css.runButtonDisabled = false;
            });
        };
        /********************  Run Seminar  ********************/
        $scope.runSeminar = function(seminarId) {
            $scope.css.runButtonDisabled = true;


            Admin.runSeminar(seminarId, true, []).success(function(data, status, headers, config) {
                app.getSeminarInit();
                $notification.success('Save success', 'Run Seminar success');
                $scope.css.runButtonDisabled = false;
                $scope.css.showConfirm = false;
                $scope.css.currentRunSeminarId = 0;

            }).error(function(data, status, headers, config) {
                console.log(data);
                $notification.error('Failed', data.message);
                $scope.css.runButtonDisabled = false;
                $scope.css.showConfirm = false;
                $scope.css.currentRunSeminarId = 0;

            });
        };
        $scope.showRunSeminarConfirm = function(seminarId){
            $scope.css.currentRunSeminarId = seminarId;
            $scope.css.showConfirm = true;
        };
        $scope.showRunSeminarConfirmNo = function(seminarId){
            $scope.css.currentRunSeminarId = 0;
            $scope.css.showConfirm = false;
        };


    }]);





    angular.module('marksimosadmin').controller('adminMarksimosReportController', ['$scope', '$http', '$notification', '$translate', 'Admin', 'AdminTable', 'chartReport', 'AdminChart', function($scope, $http, $notification,$translate, Admin,  AdminTable, chartReport, AdminChart) {
        $scope.css = {
            showReportMenu : true,
            currentReportMenu : 'AllDecisions',
            tableReportTab : 'SKU',
            tableReportTabC2 : 'SKU',
            currentSeminarId : 0
        };

        $scope.data = {

            allDecisions: {
                data           : [],
                allCompanyId   : [1, 2, 3, 4, 5, 6, 7, 8, 9],
                allPeriod      : [1, 2, 3, 4, 5, 6, 7, 8, 9],
                currentCompanyId : '!!',
                currentPeriod  : 1
            },

            reRunCompanies : [false, false, false, false, false, false, false, false, false],
            reRunDecision : {
                type : '',
                seminarId : '',
                periodId : 1,
                companyId : 1,
                brand_id : '',
                sku : {},
                sku_id : '',
                sku_fieldname : '',
                sku_fieldvalue : '',
                sku_data : {},
                brand_data : {},
                company_data : {}
            },

            tableFinalScore: {
                data: [],
                showScaled: true
            },
            questionnaire: {
                data: [],
                currentQuestionnaire:null
            },

            //A1 Company Status
            tableA1CompanyStatus: {
                allCompanyData: [],
                currentCompany: {
                    companyName: 'Company List'
                },
                currentSKU: {},
                currentBrand: {},
                currentGlobal: {}
            },
            //A2 Financial Data
            tableA2FinancialData: {
                allData: [],
                currentCompany: {},
                currentPeriod: {
                    period: 'Select Period'
                },
                currentBrand: {}
            },
            //A4 Profitability Evolution
            tableA4ProfitabilityEvolution: {
                allData: [],
                currentSKU: {},
                currentBrand: {},
                currentGlobal: {}
            },
            //B2 Competitor Intelligence
            tableB2CompetitorIntelligence: {
                allData: [],
                currentTable: 1,
                currentTableData: {},
                currentTableUnit: "%",
                chartConfig: chartReport.getChartConfig1(),
                chartData: $scope.dataChartSimple,
                tableReportMenu : 1
            },
            //C3 Segment Distribution
            tableC3SegmentDistribution: {
                allData: [],
                currentTable: 1,
                currentTableData: {},
                currentTableUnit: "%",
                currentTableShowAllSegments : false,
                chartConfig: chartReport.getChartConfig1(),
                chartData: $scope.dataChartSimple
            },
            tableC5MarketTrends: {
                allData: [],
                currentTable: 1,
                currentTableData: {},
                currentTableUnit: "",
                chartConfig: chartReport.getChartConfig1(),
                chartData: $scope.dataChartSimple,
                tableReportTab   : 'Global',
                tableReportMenu : 1
            },
            //C6 Market Indicators
            tableC6MarketIndicators: {
                allData: {}
            },

            //A3 Inventory Report
            chartA3InventoryReport: {
                allData: [],
                currentCompany: {},
                data: [],
                //            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000'] // QIFEI 's color
                //            color : ['#004CE5', '#BB0000', '#FFBC01', '#339933', '#990099', '#FF5200', '#000000'] //Windows color
                //            color : ['#999999', '#BB0000', '#99CC00', '#339933', '#990099', '#FF5200', '#000000']
                color: ['#999999', '#99CC00', '#BB0000', '#339933', '#990099', '#FF5200', '#000000']
            },

            //B11 Market Share In Value
            chartB11MarketShareInValue: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B12 Market Share In Volume
            chartB12MarketShareInVolume: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B13 Mind Space Share
            chartB13MindSpaceShare: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B14 Shelf Space Share
            chartB14ShelfSpaceShare: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B3-1 Total Investment
            chartB31TotalInvestment: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B3-2 Net Profit By Companies
            chartB32NetProfitByCompanies: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B3-3 Return On Investment
            chartB33ReturnOnInvestment: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B3-4 Investments Versus Budget
            chartB34InvestmentsVersusBudget: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B4-1 Market Sales Value
            chartB41MarketSalesValue: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B4-2 Market Sales Volume
            chartB42MarketSalesVolume: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B4-2 Total Inventory At Factory
            chartB43TotalInventoryAtFactory: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //B4-2 Total Inventory At Trade
            chartB44TotalInventoryAtTrade: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },

            //C1-1 Segments Leader By Value Price Sensitive
            chartC11SegmentsLeadersByValuePriceSensitive: {
                config: chartReport.getChartConfig2(),
                currentPeriod: 0,
                allData: [],
                data: $scope.dataChartSimple
            },
            //C1-2 Segments Leaders By Value Pretenders
            chartC12SegmentsLeadersByValuePretenders: {
                config: chartReport.getChartConfig2(),
                allData: [],
                data: $scope.dataChartSimple
            },
            //C1-3 Segments Leaders By Value Moderate
            chartC13SegmentsLeadersByValueModerate: {
                config: chartReport.getChartConfig2(),
                allData: [],
                data: $scope.dataChartSimple
            },
            //C1-4 Segments Leaders By Value Good Life
            chartC14SegmentsLeadersByValueGoodLife: {
                config: chartReport.getChartConfig2(),
                allData: [],
                data: $scope.dataChartSimple
            },
            //C1-5 Segments Leaders By Value Ultimate
            chartC15SegmentsLeadersByValueUltimate: {
                config: chartReport.getChartConfig2(),
                allData: [],
                data: $scope.dataChartSimple
            },
            //C1-6 Segments Leaders By Value Pragmatic
            chartC16SegmentsLeadersByValuePragmatic: {
                config: chartReport.getChartConfig2(),
                allData: [],
                data: $scope.dataChartSimple
            },
            //C2
            chartC21PerceptionMap : {
                allData : [],
                data : [],
                dataChart : [],
                currentPeriod : 0,
                color : ['#004CE5', '#BB0000', '#FFBC01', '#339933', '#990099', '#FF5200', '#000000']
            },
            //C4-1 Growth Rate In Volume
            chartC41GrowthRateInVolume: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //C4-2 Growth rate In Value
            chartC42GrowthRateInValue: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //C4-3 Net market Price
            chartC43NetMarketPrice: {
                config: chartReport.getChartConfig1(),
                data: $scope.dataChartSimple
            },
            //C4-4 Segment Value Share Total Market
            chartC44SegmentValueShareTotalMarket: {
                config: chartReport.getChartConfig3(),
                data: $scope.dataChartSimple
            }
        };

        $scope.clickChartMenu = function(report) {
            $scope.css.currentReportMenu = report;
        };


        var app = {
            init: function() {

                var that = this;
                $scope.css.currentSeminarId = /.+\/adminhomereport\/(\d+).*/.exec(window.location.href)[1] || 0;

                //加载 All Comapany Decisions
                that.loadingAllDecisions();

                //加载final scores
                that.loadingFinalScoresData();

                //加载Questionnaire
                that.loadingQuestionnaireData();
                chartReport.initTranslate().then(function() {
                    //添加事件
                    that.runOnce();
                    //加载A1 Company Status
                    that.loadingCompanyData();
                    //加载A2 Financial Data
                    that.loadingFinancialData();
                    //加载A4 Profitability Evolution
                    that.loadingProfitabilityData();
                    //加载B2 Competitor Intelligence
                    that.loadingCompetitorIntelligenceData();
                    //加载C3 Segment Distribution
                    that.loadingSegmentDistributionData();
                    //加载C5 Market Trends
                    that.loadingMarketTrendsData();
                    //加载C6 Market Indicators
                    that.loadingMarketIndicatorsData();

                    //加载A3 Inventory Report
                    that.loadingChartA3InventoryReportData();
                    //加载B1 Market Share In Value,Market Share In Volume,Mind SpaceShare,Shelf SpaceShare
                    that.loadingChartB1Data();
                    //加载B3
                    that.loadingChartB3Data();
                    //加载B4
                    that.loadingChartB4Data();
                    //加载C1
                    that.loadingChartC1Data();
                    //加载C2
                    that.loadingChartC2Data();
                    //加载C4
                    that.loadingChartC4Data();

                });
            },
            runOnce: function() {
                /********************  Table A1 Company Status  *******************/
                $scope.switchTableReportA1Company = function(company) {
                    $scope.data.tableA1CompanyStatus.currentCompany = company;
                    $scope.data.tableA1CompanyStatus.currentSKU = $scope.data.tableA1CompanyStatus.currentCompany.SKU[0];
                    $scope.data.tableA1CompanyStatus.currentBrand = $scope.data.tableA1CompanyStatus.currentCompany.brand[0];
                    $scope.data.tableA1CompanyStatus.currentGlobal = $scope.data.tableA1CompanyStatus.currentCompany.global;
                };
                $scope.switchTableReportA1SKU = function(SKU) {
                    $scope.data.tableA1CompanyStatus.currentSKU = SKU;
                };
                $scope.switchTableReportA1Brand = function(brand) {
                    $scope.data.tableA1CompanyStatus.currentBrand = brand;
                };


                /********************  Table A2 Financial Data  *******************/
                $scope.switchTableReportPeriod = function(period) {
                    $scope.data.tableA2FinancialData.currentPeriod = period;
                    $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
                };
                $scope.switchTableReportA2Brand = function(brand) {
                    $scope.data.tableA2FinancialData.currentBrand = brand;
                };
                $scope.switchTableReportA2Company = function(index) {
                    $scope.data.tableA2FinancialData.currentCompany = $scope.data.tableA2FinancialData.allData[index];
                    $scope.data.tableA2FinancialData.currentPeriod = $scope.data.tableA2FinancialData.currentCompany.periods[$scope.data.tableA2FinancialData.currentCompany.periods.length - 1];
                    $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
                };


                /********************  Table A4 Profitability Evolution  *******************/
                $scope.switchTableReportA4SKU = function(SKU) {
                    $scope.data.tableA4ProfitabilityEvolution.currentSKU = SKU;
                };
                $scope.switchTableReportA4Brand = function(brand) {
                    $scope.data.tableA4ProfitabilityEvolution.currentBrand = brand;
                };
                $scope.switchTableReportA4Company = function(index) {
                    $scope.data.tableA4ProfitabilityEvolution.currentData = $scope.data.tableA4ProfitabilityEvolution.allData[index];
                    $scope.data.tableA4ProfitabilityEvolution.currentSKU = $scope.data.tableA4ProfitabilityEvolution.allData[index].SKU[0];
                    $scope.data.tableA4ProfitabilityEvolution.currentBrand = $scope.data.tableA4ProfitabilityEvolution.allData[index].brand[0];
                    $scope.data.tableA4ProfitabilityEvolution.currentGlobal = $scope.data.tableA4ProfitabilityEvolution.allData[index].global;
                };


                /********************  Table B2 Competitor Intelligence  *******************/
                $scope.switchTableMenuLevel1B2 = function(menu, field, unit) {
                    $scope.data.tableB2CompetitorIntelligence.tableReportMenu = menu;
                    $scope.switchTableReportB2(1, field, unit);
                };
                $scope.switchTableReportB2 = function(order, field, unit) {
                    $scope.data.tableB2CompetitorIntelligence.currentTable = order;
                    $scope.data.tableB2CompetitorIntelligence.currentTableData = $scope.data.tableB2CompetitorIntelligence.allData[field];
                    $scope.data.tableB2CompetitorIntelligence.chartData = chartReport.formatChartData($scope.data.tableB2CompetitorIntelligence.currentTableData);
                    $scope.data.tableB2CompetitorIntelligence.currentTableUnit = unit;
                };


                /********************  Table C3 Segment Distribution  *******************/
                $scope.switchTableReportC3 = function(order, field, unit, showAllSegments) {
                    $scope.data.tableC3SegmentDistribution.currentTable = order;
                    $scope.data.tableC3SegmentDistribution.currentTableShowAllSegments = showAllSegments;
                    $scope.data.tableC3SegmentDistribution.currentTableData = $scope.data.tableC3SegmentDistribution.allData[field];
                    $scope.data.tableC3SegmentDistribution.chartData = chartReport.formatChartData($scope.data.tableC3SegmentDistribution.currentTableData);
                    $scope.data.tableC3SegmentDistribution.currentTableUnit = unit;
                };


                /********************  Table C5 Market Trends  *******************/
                $scope.switchTableCategoryC5 = function(category, field, unit) {
                    $scope.data.tableC5MarketTrends.tableReportTab = category;
                    if (category === 'SKU') {
                        $scope.switchTableMenuLevel1C5(1, 'SKU', field, unit);
                    } else if (category === 'Brand') {
                        $scope.switchTableMenuLevel1C5(1, 'Brand', field, unit);
                    } else {
                        $scope.switchTableMenuLevel1C5(1, 'Global', field, unit);
                    }
                };
                $scope.switchTableMenuLevel1C5 = function(menu, category, field, unit) {
                    $scope.data.tableC5MarketTrends.tableReportMenu = menu;
                    if (category === 'SKU') {
                        $scope.switchTableReportC5(1, 'SKU', field, unit);
                    }else if (category === 'Brand') {
                        $scope.switchTableReportC5(1, 'brand', field, unit);
                    }else {
                        if(menu === 1){
                            $scope.switchTableReportC5(1, 'global', 'averageNetMarketPriceStdPack', unit);
                        }else{
                            $scope.switchTableReportC5(1, 'global', field, unit);
                        }
                    }
                };
                $scope.switchTableReportC5 = function(order, category, field, unit) {
                    $scope.data.tableC5MarketTrends.currentTable = order;
                    $scope.data.tableC5MarketTrends.currentTableData = $scope.data.tableC5MarketTrends.allData[category][field];
                    $scope.data.tableC5MarketTrends.currentTableUnit = unit;
                    $scope.data.tableC5MarketTrends.chartData = chartReport.formatChartData($scope.data.tableC5MarketTrends.currentTableData);
                };



                /********************  Chart A3 Inventory Report  *******************/
                $scope.A3ColorFunction = function() {
                    return function(d, i) {
                        return $scope.data.chartA3InventoryReport.color[i];
                    };
                };

                $scope.A3ToolTipContent = function() {
                    return function(key, x, y, e, graph) {
                        return '<h5>' + y + '</h5>';
                    };
                };

                $scope.switchChartA3Company = function(index) {
                    $scope.data.chartA3InventoryReport.currentCompany = $scope.data.chartA3InventoryReport.allData[index];
                    $scope.data.chartA3InventoryReport.data = $scope.data.chartA3InventoryReport.currentCompany.data;
                };

                /********************  Chart C1 Segments Leaders  ********************/
                $scope.switchTableReportC1Period = function(period) {
                    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod = period.period;
                    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.data = $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    $scope.data.chartC12SegmentsLeadersByValuePretenders.data = $scope.data.chartC12SegmentsLeadersByValuePretenders.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    $scope.data.chartC13SegmentsLeadersByValueModerate.data = $scope.data.chartC13SegmentsLeadersByValueModerate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    $scope.data.chartC14SegmentsLeadersByValueGoodLife.data = $scope.data.chartC14SegmentsLeadersByValueGoodLife.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    $scope.data.chartC15SegmentsLeadersByValueUltimate.data = $scope.data.chartC15SegmentsLeadersByValueUltimate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    $scope.data.chartC16SegmentsLeadersByValuePragmatic.data = $scope.data.chartC16SegmentsLeadersByValuePragmatic.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                };

                /********************  Chart C2  ********************/
                $scope.switchPerceptionMapsData = function(flag) {
                    $scope.css.tableReportTabC2 = flag;
                    if (flag === 'SKU') {
                        $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
                    } else {
                        $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataBrand;
                    }
                };
                $scope.switchTableReportC2Period = function(period) {
                    $scope.data.chartC21PerceptionMap.currentPeriod = period.period;
                    $scope.data.chartC21PerceptionMap.data = period;
                    $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
                };
                $scope.C2ColorFunction = function() {
                    return function(d, i) {
                        return $scope.data.chartC21PerceptionMap.color[i];
                    };
                };


                $scope.C2shapeFunction = function() {
                    return function(d) {
                        return d.shape;
                    };
                };
                // 处理当前的公司名称的颜色
                function C2TooltipContentShowCompanyNameColor(fieldname) {
                    var names = {
                        'A': function() {
                            return $scope.data.chartC21PerceptionMap.color[0];
                        },
                        'B': function() {
                            return $scope.data.chartC21PerceptionMap.color[1];
                        },
                        'C': function() {
                            return $scope.data.chartC21PerceptionMap.color[2];
                        },
                        'D': function() {
                            return $scope.data.chartC21PerceptionMap.color[3];
                        },
                        'E': function() {
                            return $scope.data.chartC21PerceptionMap.color[4];
                        },
                        'F': function() {
                            return $scope.data.chartC21PerceptionMap.color[5];
                        }

                    };
                    if (typeof names[fieldname] !== 'function') {
                        return false;
                    }
                    return names[fieldname]();
                }

                $scope.C2TooltipContent = function() {
                    return function(key, x, y, e, graph) {

                        var iconColor;
                        var htmlResult = '';

                        var arrow0 = 'perception_arrow_right';
                        var arrow1 = 'perception_arrow_right';
                        var arrow2 = 'perception_arrow_right';
                        var arrow3 = 'perception_arrow_right';
                        var arrow4 = 'perception_arrow_right';
                        var arrow5 = 'perception_arrow_right';
                        var arrow6 = 'perception_arrow_right';
                        var arrow7 = 'perception_arrow_right';

                        if (e.point.tooltips.length > 0) {
                            iconColor = C2TooltipContentShowCompanyNameColor(e.point.CompanyName);

                            if (e.point.tooltips[0].compareWithPreviousPeriod === 1) {
                                arrow0 = 'perception_arrow_up';
                            } else if (e.point.tooltips[0].compareWithPreviousPeriod === -1) {
                                arrow0 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[1].compareWithPreviousPeriod === 1) {
                                arrow1 = 'perception_arrow_up';
                            } else if (e.point.tooltips[1].compareWithPreviousPeriod === -1) {
                                arrow1 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[2].compareWithPreviousPeriod === 1) {
                                arrow2 = 'perception_arrow_up';
                            } else if (e.point.tooltips[2].compareWithPreviousPeriod === -1) {
                                arrow2 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[3].compareWithPreviousPeriod === 1) {
                                arrow3 = 'perception_arrow_up';
                            } else if (e.point.tooltips[3].compareWithPreviousPeriod === -1) {
                                arrow3 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[4].compareWithPreviousPeriod === 1) {
                                arrow4 = 'perception_arrow_up';
                            } else if (e.point.tooltips[4].compareWithPreviousPeriod === -1) {
                                arrow4 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[5].compareWithPreviousPeriod === 1) {
                                arrow5 = 'perception_arrow_up';
                            } else if (e.point.tooltips[5].compareWithPreviousPeriod === -1) {
                                arrow5 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[6].compareWithPreviousPeriod === 1) {
                                arrow6 = 'perception_arrow_up';
                            } else if (e.point.tooltips[6].compareWithPreviousPeriod === -1) {
                                arrow6 = 'perception_arrow_down';
                            }

                            if (e.point.tooltips[7].compareWithPreviousPeriod === 1) {
                                arrow7 = 'perception_arrow_up';
                            } else if (e.point.tooltips[7].compareWithPreviousPeriod === -1) {
                                arrow7 = 'perception_arrow_down';
                            }

                            htmlResult = '<div class="panel panel-default perception_panel"> <div class="panel-heading"><span class="perception_logo" style="background-color:' + iconColor + '"></span>' + key + ' - ' + e.point.name + '  </div>' +
                                '<ul class="list-group">' +
                                '<li class="list-group-item perception_list"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipMarketShareValue') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[0].value * 10000) / 100 +
                                '%</span><span class=" ' + arrow0 + ' "></span></li>' +
                                '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipAverageDisplayPrice') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[1].value * 100) / 100 +
                                '</span><span class=" ' + arrow1 + ' "></span></li>' +
                                '<li class="list-group-item perception_list"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipAppliedTechnologyIndex') + '</span><span class="perception_info_number">' + e.point.tooltips[2].value +
                                '</span><span class=" ' + arrow2 + ' "></span></li>' +
                                '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipIngredientsQualityIndex') + '</span><span class="perception_info_number">' + e.point.tooltips[3].value +
                                '</span><span class=" ' + arrow3 + ' "></span></li>' +
                                '<li class="list-group-item perception_list"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipAwareness') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[4].value * 10000) / 100 +
                                '%</span><span class=" ' + arrow4 + ' "></span></li>' +
                                '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipShelfSpace') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[5].value * 10000) / 100 +
                                '%</span><span class=" ' + arrow5 + ' "></span></li>' +
                                '<li class="list-group-item perception_list"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipValuePerceptionChange') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[6].value * 100) / 100 +
                                '</span><span class=" ' + arrow6 + ' "></span></li>' +
                                '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' + $translate.instant('ReportPerceptionMapHoverTooltipImagePerceptionChange') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[7].value * 100) / 100 +
                                '</span><span class=" ' + arrow7 + ' "></span></li>' +
                                '</ul></div>';

                        } else {
                            iconColor = $scope.data.chartC21PerceptionMap.color[6];
                            htmlResult = '<h5><span class="perception_logo" style="background-color:' + iconColor + '"></span>' + ' ' + e.point.name + '</h5>';
                        }


                        return htmlResult;
                    };
                };


                /********************  Run Seminar  ********************/
                $scope.reRunSeminar = function() {

                    Admin.runSeminar($scope.css.currentSeminarId, false, $scope.data.reRunCompanies).success(function(data, status, headers, config) {
                        $notification.success('Save success', 'Rerun Seminar Decisions Success');

                    }).error(function(data, status, headers, config) {
                        console.log(data);
                        $notification.error('Failed', data.message);
                    });
                };

                $scope.clickSkuField = function(type, period, company_id, brand_id, sku, sku_id, skuFieldName, skuValue) {
                    $scope.data.reRunDecision.type = type;
                    $scope.data.reRunDecision.seminarId = $scope.css.currentSeminarId;
                    $scope.data.reRunDecision.periodId = period;
                    $scope.data.reRunDecision.companyId = company_id;

                    if(type === 'SKU'){
                        $scope.data.reRunDecision.brand_id = brand_id;
                        $scope.data.reRunDecision.sku = sku;
                        $scope.data.reRunDecision.sku_id = sku_id;
                    }else if(type === 'Company'){
                        $scope.data.reRunDecision.brand_id = '';
                        $scope.data.reRunDecision.sku = '';
                        $scope.data.reRunDecision.sku_id = '';
                    }else{
                        $scope.data.reRunDecision.brand_id = brand_id;
                        $scope.data.reRunDecision.sku = '';
                        $scope.data.reRunDecision.sku_id = '';
                    }

                    $scope.data.reRunDecision.sku_fieldname = skuFieldName;
                    $scope.data.reRunDecision.sku_fieldvalue = skuValue;

                };

                $scope.updateSkuDecision = function() {
                    $scope.data.reRunDecision.sku_data = {};
                    $scope.data.reRunDecision.brand_data = {};
                    $scope.data.reRunDecision.company_data = {};


                    if( $scope.data.reRunDecision.type === 'SKU'){
                        $scope.data.reRunDecision.sku_data[$scope.data.reRunDecision.sku_fieldname] = $scope.data.reRunDecision.sku_fieldvalue;

                        if($scope.data.reRunDecision.sku_fieldname === 'd_PromotionalEpisodes'){
                            //if(!angular.isUndefined(weekindex)){
                            //    // 针对d_PromotionalEpisodes 字段需要特殊处理
                            //    $scope.data.currentModifiedSku.sku_data[$scope.data.reRunDecision.sku_fieldname][weekindex] = segmentOrWeek;
                            //}

                        }else if($scope.data.reRunDecision.sku_fieldname === 'd_FactoryPrice'){
                            // 针对 d_FactoryPrice 字段需要特殊处理
                            $scope.data.reRunDecision.sku_data[$scope.data.reRunDecision.sku_fieldname] = $scope.data.reRunDecision.sku[$scope.data.reRunDecision.sku_fieldname];
                            $scope.data.reRunDecision.sku_data[$scope.data.reRunDecision.sku_fieldname][0] = Number($scope.data.reRunDecision.sku_fieldvalue);

                        }

                        Admin.updateSkuDecision($scope.data.reRunDecision).success(function(data, status, headers, config) {
                            $notification.success('Save success', 'Update SKU Decision Success');
                            app.loadingAllDecisions();

                        }).error(function(data, status, headers, config) {
                            console.log(data);
                            $notification.error('Failed', data.message);
                        });


                    }else if( $scope.data.reRunDecision.type === 'Company'){
                        $scope.data.reRunDecision.company_data[$scope.data.reRunDecision.sku_fieldname] = $scope.data.reRunDecision.sku_fieldvalue;

                        Admin.updateCompanyDecision($scope.data.reRunDecision).success(function(data, status, headers, config) {
                            $notification.success('Save success', 'Update SKU Decision Success');
                            app.loadingAllDecisions();

                        }).error(function(data, status, headers, config) {
                            console.log(data);
                            $notification.error('Failed', data.message);
                        });

                    }else{
                        $scope.data.reRunDecision.brand_data[$scope.data.reRunDecision.sku_fieldname] = $scope.data.reRunDecision.sku_fieldvalue;

                        Admin.updateBrandDecision($scope.data.reRunDecision).success(function(data, status, headers, config) {
                            $notification.success('Save success', 'Update SKU Decision Success');
                            app.loadingAllDecisions();

                        }).error(function(data, status, headers, config) {
                            console.log(data);
                            $notification.error('Failed', data.message);
                        });
                    }








                };


            },


            loadingAllDecisions: function() {

                if($scope.css.currentSeminarId){
                    Admin.getAllCompanyDecisionsOfAllPeriods($scope.css.currentSeminarId).success(function(data, status, headers, config) {
                        $scope.data.allDecisions.data = data;

                        $scope.data.allDecisions.allCompanyId = $scope.data.allDecisions.allCompanyId.slice(0, data[data.length - 1].d_CID);
                        $scope.data.reRunCompanies = $scope.data.reRunCompanies.slice(0, data[data.length - 1].d_CID);
                        $scope.data.allDecisions.allPeriod = $scope.data.allDecisions.allPeriod.slice(0, data[data.length - 1].period);

                        $scope.data.allDecisions.currentPeriod = $scope.data.allDecisions.allPeriod[$scope.data.allDecisions.allPeriod.length - 1];

                    });
                }

            },
            loadingFinalScoresData: function() {
                Admin.getFinalScores($scope.css.currentSeminarId).success(function(data, status, headers, config) {
                    $scope.data.tableFinalScore.data = data;                   
                });
            },
            loadingQuestionnaireData: function() {
                Admin.getQuestionnaire($scope.css.currentSeminarId).success(function(data, status, headers, config) {
                    $scope.data.questionnaire.data = data;
                    if (data[0].studentList.length) {
                        $scope.data.questionnaire.currentQuestionnaire = data[0].studentList[0].questionnaire;
                    }                    
                    $scope.data.questionnaire.radio_OverallSatisfactionWithThePrograms = {
                        info: ['ChallengeStrategicThinkingAbility', 'DevelopAnIntegratedPerspective', 'TestPersonalAbilityOfBalancingRisks', 'ChallengeLeadershipAndTeamworkAbility', 'ChallengeAnalysisAndDecisionMakingAbility', 'SimulationInteresting']
                    };
                    $scope.data.questionnaire.radio_TeachingTeams = {
                        info: ['FeedbackOnSimulationDecisions', 'ExpandingViewAndInspireThinking', 'Lectures']
                    };
                    $scope.data.questionnaire.radio_Products = {
                        info: ['OverallProductUsageExperience', 'UserInterfaceExperience', 'EaseOfNavigation', 'ClarityOfWordsUsed']
                    };
                    $scope.data.questionnaire.radio_TeachingSupports = {
                        info: ['Helpfulness', 'QualityOfTechnicalSupport']
                    };
                    $scope.data.questionnaire.radio_MostBenefits = {
                        info: ["JoinProgram", "CompanyInHouse", "OpenClass"]
                    };
                });
            },
            loadingCompanyData: function() {
                /********************  Table A1 Company Status  *******************/
                //获取数据
                AdminTable.getCompany($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableA1CompanyStatus.allCompanyData = data;
                    //设置默认公司
                    $scope.switchTableReportA1Company(data[0]);
                });
            },
            loadingFinancialData: function() {
                /********************  Table A2 Financial Data  *******************/
                //获取数据
                AdminTable.getFinancial($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableA2FinancialData.allData = data;
                    //设置默认的公司
                    $scope.switchTableReportA2Company(0);
                });
            },

            loadingProfitabilityData: function() {
                /********************  Table A4 Profitability Evolution  *******************/
                //获取数据
                AdminTable.getProfitability($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableA4ProfitabilityEvolution.allData = data;
                    //设置默认的公司
                    $scope.switchTableReportA4Company(0);
                });
            },
            loadingCompetitorIntelligenceData: function() {
                /********************  Table B2 Competitor Intelligence  *******************/
                //获取数据
                AdminTable.getCompetitorIntelligence($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableB2CompetitorIntelligence.allData = data;
                    $scope.data.tableB2CompetitorIntelligence.currentTableData = $scope.data.tableB2CompetitorIntelligence.allData.acquiredProductionAndLogisticsEfficiency;
                    $scope.data.tableB2CompetitorIntelligence.chartData = chartReport.formatChartData($scope.data.tableB2CompetitorIntelligence.allData.acquiredProductionAndLogisticsEfficiency);
                });
            },
            loadingSegmentDistributionData: function() {
                /********************  Table C3 Segment Distribution  *******************/
                //获取数据
                AdminTable.getSegmentDistribution($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableC3SegmentDistribution.allData = data;
                    $scope.data.tableC3SegmentDistribution.currentTableData = $scope.data.tableC3SegmentDistribution.allData.marketShareVolume;
                    $scope.data.tableC3SegmentDistribution.chartData = chartReport.formatChartData($scope.data.tableC3SegmentDistribution.currentTableData);
                });
            },
            loadingMarketTrendsData: function() {
                /********************  Table C5 Market Trends  *******************/
                //获取数据
                AdminTable.getMarketTrends($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableC5MarketTrends.allData = data;
                    $scope.switchTableMenuLevel1C5(1, $scope.css.tableReportTab, 'averageDisplayPriceStdPack', '');
                });
            },
            loadingMarketIndicatorsData: function() {
                /********************  Table C6 Market Indicators  *******************/
                //获取数据
                AdminTable.getMarketIndicators($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.tableC6MarketIndicators.allData = data;
                });
            },


            loadingChartA3InventoryReportData: function() {
                /********************  Chart A3  ********************/
                AdminChart.getInventoryReport($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartA3InventoryReport.allData = data;
                    $scope.data.chartA3InventoryReport.currentCompany = $scope.data.chartA3InventoryReport.allData[0];
                    $scope.data.chartA3InventoryReport.data = $scope.data.chartA3InventoryReport.allData[0].data;
                });
            },


            loadingChartB1Data: function() {
                /********************  Table B1  *******************/
                //Chart B1 1 Market Share In Value
                AdminChart.getMarketShareInValue($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB11MarketShareInValue.data = data;
                });
                //Chart B1 2 Market Share In Volume
                AdminChart.getMarketShareInVolume($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB12MarketShareInVolume.data = data;
                });
                //Chart B1 3 Mind Space Share
                AdminChart.getMindSpaceShare($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB13MindSpaceShare.data = data;
                });
                //Chart B1 4 Shelf Space Share
                AdminChart.getShelfSpaceShare($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB14ShelfSpaceShare.data = data;
                });
            },
            loadingChartB3Data: function() {
                /********************  Table B3  *******************/
                //Table B3-1 Total Investment
                AdminChart.getTotalInvestment($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB31TotalInvestment.data = data;
                });
                //Table B3-2 Net Profit By Companies
                AdminChart.getNetProfitByCompanies($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB32NetProfitByCompanies.data = data;
                });
                //Table B3-3 Return On Investment
                AdminChart.getReturnOnInvestment($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB33ReturnOnInvestment.data = data;
                });
                //Table B3-4 Investments Versus Budget
                AdminChart.getInvestmentsVersusBudget($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB34InvestmentsVersusBudget.data = data;
                });

            },
            loadingChartB4Data: function() {

                //Table B4-1 Market Salues Value
                AdminChart.getMarketSalesValue($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB41MarketSalesValue.data = data;
                });
                //Table B4-2 Market Salues Volume
                AdminChart.getMarketSalesVolume($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB42MarketSalesVolume.data = data;
                });
                //Table B4-3 Total Inventory At Facotry
                AdminChart.getTotalInventoryAtFactory($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB43TotalInventoryAtFactory.data = data;
                });
                //Table B4-4 Total Inventory At Trade
                AdminChart.getTotalInventoryAtTrade($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartB44TotalInventoryAtTrade.data = data;
                });
            },
            loadingChartC1Data: function() {
                //Chart C1-1 Segments Leader By Value Price Sensitive
                AdminChart.getSegmentsLeadersByValuePriceSensitive($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData = data.data;
                    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod = $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData.length - 4;
                    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.data = $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                });
                //Chart C1-2 Segments Leaders By Value Pretenders
                AdminChart.getSegmentsLeadersByValuePretenders($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC12SegmentsLeadersByValuePretenders.allData = data.data;
                    $scope.data.chartC12SegmentsLeadersByValuePretenders.data = $scope.data.chartC12SegmentsLeadersByValuePretenders.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                });
                //Chart C1-3 Segments Leaders By Value Moderate
                AdminChart.getSegmentsLeadersByValueModerate($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC13SegmentsLeadersByValueModerate.allData = data.data;
                    $scope.data.chartC13SegmentsLeadersByValueModerate.data = $scope.data.chartC13SegmentsLeadersByValueModerate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                });
                //Chart C1-4 Segments Leaders By Value Good Life
                AdminChart.getSegmentsLeadersByValueGoodLife($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC14SegmentsLeadersByValueGoodLife.allData = data.data;
                    $scope.data.chartC14SegmentsLeadersByValueGoodLife.data = $scope.data.chartC14SegmentsLeadersByValueGoodLife.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                });
                //Chart C1-5 Segments Leaders By Value Ultimate
                AdminChart.getSegmentsLeadersByValueUltimate($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC15SegmentsLeadersByValueUltimate.allData = data.data;
                    $scope.data.chartC15SegmentsLeadersByValueUltimate.data = $scope.data.chartC15SegmentsLeadersByValueUltimate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                });
                //Chart C1-6 Segments Leaders By Value Pragmatic
                AdminChart.getSegmentsLeadersByValuePragmatic($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC16SegmentsLeadersByValuePragmatic.allData = data.data;
                    $scope.data.chartC16SegmentsLeadersByValuePragmatic.data = $scope.data.chartC16SegmentsLeadersByValuePragmatic.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                });
            },           
            loadingChartC2Data: function() {
                //Chart C2 Perception Map
                AdminChart.getPerceptionMap($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC21PerceptionMap.allData = data.data;
                    $scope.data.chartC21PerceptionMap.currentPeriod = $scope.data.chartC21PerceptionMap.allData.length - 4;
                    $scope.data.chartC21PerceptionMap.data = $scope.data.chartC21PerceptionMap.allData[$scope.data.chartC21PerceptionMap.currentPeriod + 3];
                    $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
                });
            },
            loadingChartC4Data: function() {
                //Table C4-1 Growth Rate In Volume
                AdminChart.getGrowthRateInVolume($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC41GrowthRateInVolume.data = data;
                });
                //Table C4-2 Growth rate In Value
                AdminChart.getGrowthRateInValue($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC42GrowthRateInValue.data = data;
                });
                //Table C4-3 Net market Price
                AdminChart.getNetMarketPrice($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC43NetMarketPrice.data = data;
                });
                //Table C4-4 Segment Value Share Total Market
                AdminChart.getSegmentValueShareTotalMarket($scope.css.currentSeminarId).then(function(data, status, headers, config) {
                    $scope.data.chartC44SegmentValueShareTotalMarket.data = data;
                });
            }
        };

        //初始化程序
        app.init();

    }]);

}());