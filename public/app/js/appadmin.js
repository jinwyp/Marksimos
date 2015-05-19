/**
 * Created by jinwyp on 4/28/14.
 */


(function() {
    'use strict';

    /********************  Create New Module For Controllers ********************/
    angular.module('marksimosadmin', ['pascalprecht.translate', 'angularCharts', 'nvd3ChartDirectives', 'notifications', 'angularFileUpload', 'ngTagsInput',
        'marksimos.websitecomponent', 'marksimos.commoncomponent', 'marksimos.filter', 'marksimos.socketmodel', 'marksimos.b2ccomponent', 'b2c.config']);





    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('marksimosadmin').controller('adminLoginController', ['$scope', '$timeout', '$http', '$window', 'Admin', function($scope, $timeout, $http, $window, Admin) {

        $scope.data = {
            admin: {
                username : '',
                email: '',
                password: ''
            }
        };

        $scope.login = function(form) {
            if (form.$valid) {

                Admin.login($scope.data.admin).then(function() {

                    $window.location.href = "/marksimos/adminhome";

                }).catch(function (data) {
                    console.log(data.status);
                    if (data.status === 401 || data.status === 403) {
                        form.password.$valid = false;
                        form.password.$invalid = true;
                    }
                });
            }
        };
    }]);







    angular.module('marksimosadmin').controller('adminHomeController', ['$scope', '$http', '$notification', 'FileUploader', 'Admin', function($scope, $http, $notification, FileUploader, Admin) {
        var fileUploaderOptions = {
            url : '/marksimos/api/admin/campaigns/upload',
            onSuccessItem : onSuccessItem,
            onErrorItem : onErrorItem,
            formData:[{campaignId:''}]
        };

        $scope.css = {
            leftmenu: 11,
            menuTabShow: [false, false, false, false, false, false, false, false, false], //从第二个false 开始第1个菜单
            editMenuStatus : false,
            seminarId: 0,
            campaignIdAddSeminar: 0,
            campaignIdAddTeam: 0,
            runButtonDisabled: false,
            showConfirm : false,
            currentRunSeminarId : 0,

            showCreateSeminarTimeInput : false
        };

        $scope.data = {
            cgiStatus : {status:true},
            currentUser: null,
            currentStudent: null,

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
                numOfLicense: 0,
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
                numOfLicense: 0
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
                qq: "",

                country: 'China',
                state: "shanghai",
                city: "shanghai",

                firstName: "",
                lastName: "",
                gender: '',
                studentGenderRadioOptions : [
                    {value : 1, text : 'Male'},
                    {value : 2, text : 'Female'}
                ],

                occupation: "",
                organizationOrUniversity: "",
                studentType: "", //10 B2B students,  20 B2C students, 30 Both B2C and B2B students

                studentTypeRadioOptions : [
                    {value : 10, text : 'B2B Student'},
                    {value : 20, text : 'B2C(E4E) Student'}
                ]

            },
            searchStudent: {
                username: '',
                email: '',
                user_status: 'true',
                //add for e4e
                student_type: "",
                role: 4
            },
            students: [],

            updateSeminar : {},
            newSeminar: {
                description: "",
                country: null,
                state: "shanghai",
                city: "shanghai",
                venue: "",
                simulation_span: 4,
                roundTime:[],
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
                studentemail : "",
                teamcreatoremail : ""
            },
            removedStudent: {
                seminar_id: 0,
                studentemail : "",
                teamid : ""
            },
            updateCampaign :{},
            newCampaign: {
                id : '',
                name: '',
                description: '',
                location: '',
                memberNumberBase: 0,
                matchDate: '',
                activated : '',
                pictures : {},
                firstCoverBackgroundColor : '',
                processBackgroundColor : '',
                uploadListCover : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadListCover'})),
                uploadFirstCover : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadFirstCover'})),
                uploadBenefit1 : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadBenefit1'})),
                uploadBenefit2 : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadBenefit2'})),
                uploadBenefit3 : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadBenefit3'})),
                uploadQualification : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadQualification'})),
                uploadProcess : new FileUploader(angular.extend(fileUploaderOptions, {alias: 'uploadProcess'})),
                campaignActivatedRadioOptions : [
                    {value : 1, text : 'Active'},
                    {value : 0, text : 'Disable'}
                ]
            },
            searchCampaign: {
                keyword: '',
                activated: 'all'
            },
            campaigns: [],
            addSeminarToCampaign: {
                seminarId: 0,
                campaignId: 0
            },
            addTeamToCampaign: {
                username: 0,
                campaignId: 0
            },

            updateGlossary : {},
            newGlossary : {
                id : '',
                name : '',
                description : '',
                question : '',
                answer : '',
                type : '',
                typeRadioOptions : [
                    {value : 10, text : 'Glossary'},
                    {value : 20, text : 'FAQ'}
                ],
                tagList : []
            },
            glossaries : [],
            searchGlossary: {
                keyword: '',
                type: 'all'
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

        function onSuccessItem() {
            $notification.success('Save success', 'Upload success');
        }

        function onErrorItem() {
            $notification.error('Failed', 'Upload failed');
        }

        var app = {
            initOnce: function() {
                var that = this;
                this.getAdminInfo();
            },

            reRun: function() {

            },

            getAdminInfo : function(){
                Admin.userInfo().success(function(data, status, headers, config) {
                    $scope.data.currentUser = data;

                    if ($scope.data.currentUser.role === 1) {
                        // Role Admin
                        app.getDistributorsInit();
                        app.getFacilitatorsInit();
                        app.getStudentsInit();
                        app.getStudentsByDay();
                        app.getTeamCount();
                        app.getScore();
                        $scope.css.menuTabShow = [false, true, true, true, true, true, true, true, true];

                    } else if ($scope.data.currentUser.role === 2) {
                        // Role Distributor
                        app.getFacilitatorsInit();
                        $scope.css.menuTabShow = [false, true, false, true, false, false, false, false];

                    } else if ($scope.data.currentUser.role === 3) {
                        // Role Facilitator
                        app.getStudentsByDay();
                        app.getTeamCount();
                        app.getStudentsInit();
                        app.getSeminarInit();
                        app.getCgiStatus();
                        app.getCampaignInit();
                        app.getGlossaryInit();
                        app.getScore();
                        $scope.css.menuTabShow = [false, true, false, false, true, true, true, true];
                    }

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
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

            getStudentsByDay: function() {
                Admin.getStudentsByDay().success(function(data) {
                    $scope.data.studentsCount = data;
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            getTeamCount: function() {
                Admin.getTeamCount().success(function(data) {
                    $scope.data.teamCount = data;
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            getScore: function() {
                Admin.getScore().success(function(data) {
                    $scope.data.score = data;
                    console.log(data);
                }).error(function(data) {
                    console.log(data);
                });
            },

            getCgiStatus: function() {
                Admin.getCgiStatus().success(function(data, status, headers, config) {
                    $scope.data.cgiStatus = data.status;
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
            },

            getCampaignInit: function() {
                Admin.getCampaigns().success(function(data, status, headers, config) {
                    $scope.data.campaigns = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            },

            getGlossaryInit: function() {
                Admin.getGlossaries().success(function(data, status, headers, config) {
                    $scope.data.glossaries = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            }


        };

        app.initOnce();

        $scope.changeMenu = function() {
            $scope.css.editMenuStatus = false;
        };

        /********************  dashboard  ********************/
        $scope.getTeamMemberCount = function(teamList) {
            if (!teamList) return 0;
            return teamList.reduce(function(count, team) {
                return count + team.memberList.length;
            }, 0);
        };


        /********************  搜索 Distributor  ********************/
        $scope.searchDistributor = function(form) {
            if (form.$valid) {
                Admin.getDistributors($scope.data.searchDistributor).success(function(data, status, headers, config) {

                    $scope.data.distributors = data;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  创建新的 Distributor  ********************/
        $scope.createNewDistributor = function(form) {
            if (form.$valid) {
                Admin.addDistributor( $scope.data.newDistributor).success(function(data, status, headers, config) {

                    app.getDistributorsInit();
                    $scope.css.leftmenu = 21;

                    $notification.success('Save success', 'Create Distributor success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
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
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  创建新的 Facilitator  ********************/
        $scope.createNewFacilitator = function(form) {
            if (form.$valid) {
                Admin.addFacilitator( $scope.data.newFacilitator).success(function(data, status, headers, config) {

                    app.getFacilitatorsInit();
                    $scope.css.leftmenu = 31;

                    $notification.success('Save success', 'Create Facilitator success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
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
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  创建新的 Student  ********************/
        $scope.createNewStudent = function(form) {
            if (form.$valid) {
                Admin.addStudent($scope.data.newStudent).success(function(data, status, headers, config) {

                    app.getStudentsInit();
                    $scope.css.leftmenu = 41;

                    $notification.success('Save success', 'Create Student success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  Student 重置密码为hcd1234  ********************/
        $scope.resetStudentPassword = function(id) {
            var postData = {
                student_id: id,
                passwordNew: 'hcd1234'
            };
            Admin.resetStudentPassword( postData).success(function(data, status, headers, config) {
                $scope.css.leftmenu = 41;
                $notification.success('Save success', 'Reset Student Password success, Password is hcd1234');

            }).error(function(data, status, headers, config) {
                console.log(data);
                $notification.error('Failed', Admin.errorHandler(data.message));
            });
        };


        /********************  Search Campaign  ********************/
        $scope.searchCampaign = function(form) {
            if (form.$valid) {
                console.log($scope.data.searchCampaign);
                Admin.getCampaigns($scope.data.searchCampaign).success(function(data, status, headers, config) {
                    $scope.data.campaigns = data;

                }).error(function(data, status, headers, config) {
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  Create New Campaign  ********************/
        $scope.createNewCampaign = function(form) {
            if (form.$valid) {
                Admin.addCampaign($scope.data.newCampaign).success(function(data, status, headers, config) {

                    app.getCampaignInit();
                    $scope.css.leftmenu = 61;

                    $notification.success('Save success', 'Create Campaign success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  add Marksimos Seminar Into Campaign  ********************/
        $scope.addSeminarIntoCampaign = function(campaignid, seminarid) {

            if ( angular.isUndefined(seminarid) || seminarid === "") {
                $scope.css.campaignIdAddSeminar = campaignid;
            }else{
                $scope.css.campaignIdAddSeminar = 0;
                $scope.data.addSeminarToCampaign.campaignId = campaignid;
                $scope.data.addSeminarToCampaign.seminarId = seminarid;

                Admin.addSeminarToCampaign( $scope.data.addSeminarToCampaign).success(function(data, status, headers, config) {

                    app.getCampaignInit();
                    $notification.success('Save success', 'Add Seminar to Campaign success');

                    $scope.data.addSeminarToCampaign.campaignId = 0;
                    $scope.data.addSeminarToCampaign.seminarId = 0;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  Remove Marksimos Seminar From Campaign  ********************/
        $scope.removeSeminarFromCampaign = function(campaignid, seminarid) {

            if (campaignid === "" || seminarid === "") {

            }else{
                Admin.removeSeminarFromCampaign({campaignId : campaignid, seminarId : seminarid } ).success(function(data, status, headers, config) {
                    app.getCampaignInit();
                    $notification.success('Save success', 'Remove Seminar From Campaign success.');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };

        /********************  add Team Into Campaign  ********************/
        $scope.addTeamIntoCampaign = function(campaignid, teamcreatorusername) {

            if ( angular.isUndefined(teamcreatorusername) || teamcreatorusername === "") {
                $scope.css.campaignIdAddTeam = campaignid;
            }else{
                $scope.css.campaignIdAddTeam = 0;
                $scope.data.addTeamToCampaign.campaignId = campaignid;
                $scope.data.addTeamToCampaign.username = teamcreatorusername;

                Admin.addTeamToCampaign( $scope.data.addTeamToCampaign).success(function(data, status, headers, config) {

                    app.getCampaignInit();
                    $notification.success('Save success', 'Add Seminar to Campaign success');

                    $scope.data.addTeamToCampaign.campaignId = 0;
                    $scope.data.addTeamToCampaign.username = 0;

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  Remove Team From Campaign  ********************/
        $scope.removeTeamFromCampaign = function(campaignid, teamid) {

            if (campaignid === "" || teamid === "") {

            }else{
                Admin.removeTeamFromCampaign({campaignId : campaignid, teamId : teamid } ).success(function(data, status, headers, config) {
                    app.getCampaignInit();
                    $notification.success('Save success', 'Remove Seminar From Campaign success.');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };

        $scope.showEditCampaignMenu = function(campaign) {
            $scope.data.newCampaign.id = campaign._id;
            $scope.data.newCampaign.name = campaign.name;
            $scope.data.newCampaign.description = campaign.description;
            $scope.data.newCampaign.location = campaign.location;
            $scope.data.newCampaign.matchDate = campaign.matchDate;
            $scope.data.newCampaign.activated = campaign.activated;
            $scope.data.newCampaign.memberNumberBase = campaign.memberNumberBase;


            $scope.data.newCampaign.firstCoverBackgroundColor = campaign.pictures.firstCoverBackgroundColor || '';
            $scope.data.newCampaign.processBackgroundColor = campaign.pictures.processBackgroundColor || '';
            $scope.data.newCampaign.pictures = campaign.pictures;

            $scope.data.newCampaign.uploadListCover.formData = [{campaignId:$scope.data.newCampaign.id}];
            $scope.data.newCampaign.uploadFirstCover.formData = [{campaignId:$scope.data.newCampaign.id}];
            $scope.data.newCampaign.uploadBenefit1.formData = [{campaignId:$scope.data.newCampaign.id}];
            $scope.data.newCampaign.uploadBenefit2.formData = [{campaignId:$scope.data.newCampaign.id}];
            $scope.data.newCampaign.uploadBenefit3.formData = [{campaignId:$scope.data.newCampaign.id}];
            $scope.data.newCampaign.uploadQualification.formData = [{campaignId:$scope.data.newCampaign.id}];
            $scope.data.newCampaign.uploadProcess.formData = [{campaignId:$scope.data.newCampaign.id}];

            $scope.css.editMenuStatus = true;
            $scope.css.leftmenu = 62;

        };

        /********************  Update Campaign  ********************/
        $scope.updateCampaign = function(form) {
            if (form.$valid) {

                $scope.data.updateCampaign = {
                    id : $scope.data.newCampaign.id,
                    name : $scope.data.newCampaign.name,
                    description: $scope.data.newCampaign.description,
                    location: $scope.data.newCampaign.location,
                    matchDate: $scope.data.newCampaign.matchDate,
                    activated : $scope.data.newCampaign.activated,
                    memberNumberBase : $scope.data.newCampaign.memberNumberBase,
                    firstCoverBackgroundColor : $scope.data.newCampaign.firstCoverBackgroundColor,
                    processBackgroundColor: $scope.data.newCampaign.processBackgroundColor
                };

                Admin.updateCampaign($scope.data.updateCampaign).success(function(data, status, headers, config) {

                    app.getCampaignInit();
                    $scope.css.leftmenu = 61;

                    $notification.success('Save success', 'Update Campaign success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };



        /********************  搜索 Seminars  ********************/
        $scope.searchSeminar = function(form) {
            if (form.$valid) {
                Admin.getSeminars($scope.data.searchSeminar).success(function(data, status, headers, config) {
                    $scope.data.seminars = data;

                }).error(function(data, status, headers, config) {                   
                    $notification.error('Failed', Admin.errorHandler(data.message));
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
                Admin.addSeminar($scope.data.newSeminar).success(function(data, status, headers, config) {

                    app.getSeminarInit();
                    $scope.css.leftmenu = 51;

                    $notification.success('Save success', 'Create Seminar success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        $scope.createNewSeminarRoundTime = function() {
            var round = Number($scope.data.newSeminar.simulation_span);

            for (var i = 1; i <= round; i++) {
                var time ={
                    period : i,
                    hour : 0
                };

                $scope.data.newSeminar.roundTime.push(time);
            }
            $scope.css.showCreateSeminarTimeInput = true;
        };

        $scope.$watch('data.newSeminar.simulation_span', function (newValue, oldValue) {
            $scope.data.newSeminar.roundTime = [];

            $scope.css.showCreateSeminarTimeInput = false;
        }, true);



        /********************  Select Company/Team for StudentB2B  ********************/
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
                $scope.data.addStudentToSeminar.studentemail = studentemail;
                $scope.data.addStudentToSeminar.teamcreatoremail = '';

                Admin.addStudentToSeminar( $scope.data.addStudentToSeminar).success(function(data, status, headers, config) {

                    app.getSeminarInit();
                    $notification.success('Save success', 'Add Student to Seminar success');

                    $scope.data.addStudentToSeminar.seminar_id = 0;
                    $scope.data.addStudentToSeminar.company_id = 0;
                    $scope.data.addStudentToSeminar.studentemail = '';
                    $scope.data.addStudentToSeminar.teamcreatoremail = '';

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  Remove Student To Seminar  ********************/
        $scope.removeStudentFromSeminar = function(seminarid, studentemail) {

            if (seminarid === "" || angular.isUndefined(studentemail) || studentemail === "") {
            } else {

                $scope.data.removedStudent.seminar_id = seminarid;
                $scope.data.removedStudent.studentemail = studentemail;
                $scope.data.removedStudent.teamid = '';

                Admin.removeStudentFromSeminar(  $scope.data.removedStudent).success(function(data, status, headers, config) {
                    app.getSeminarInit();
                    $notification.success('Save success', 'Remove Student to Seminar success');

                    $scope.data.removedStudent.seminar_id = 0;
                    $scope.data.removedStudent.studentemail = '';
                    $scope.data.removedStudent.teamid = '';

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };

        /********************  Add Team To Seminar  ********************/
        $scope.addTeamToSeminar = function(seminarid, teamcreatorusername) {

            if ($scope.data.addStudentToSeminar.company_id === 0 || angular.isUndefined(teamcreatorusername) || teamcreatorusername === "") {
                $scope.css.seminarId = seminarid;
            }else{
                $scope.css.seminarId = 0;
                $scope.data.addStudentToSeminar.studentemail = '';
                $scope.data.addStudentToSeminar.teamcreatoremail = teamcreatorusername;

                Admin.addStudentToSeminar( $scope.data.addStudentToSeminar).success(function(data, status, headers, config) {

                    app.getSeminarInit();
                    $notification.success('Save success', 'Add Team to Seminar success');

                    $scope.data.addStudentToSeminar.seminar_id = 0;
                    $scope.data.addStudentToSeminar.company_id = 0;
                    $scope.data.addStudentToSeminar.studentemail = '';
                    $scope.data.addStudentToSeminar.teamcreatoremail = '';

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };

        /********************  Remove Team To Seminar  ********************/
        $scope.removeTeamFromSeminar = function(seminarid, teamid) {

            if (seminarid === "" || angular.isUndefined(teamid) || teamid === "") {
            } else {

                $scope.data.removedStudent.seminar_id = seminarid;
                $scope.data.removedStudent.studentemail = '';
                $scope.data.removedStudent.teamid = teamid;

                Admin.removeStudentFromSeminar(  $scope.data.removedStudent).success(function(data, status, headers, config) {
                    app.getSeminarInit();
                    $notification.success('Save success', 'Remove Team to Seminar success');

                    $scope.data.removedStudent.seminar_id = 0;
                    $scope.data.removedStudent.studentemail = '';
                    $scope.data.removedStudent.teamid = '';

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
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
                $notification.error('Failed', Admin.errorHandler(data.message));
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
                $notification.error('Failed', Admin.errorHandler(data.message));
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

        /********************  Show Final Score  ********************/
        $scope.showFinalScore = function(seminar){
            $scope.data.updateSeminar = {
                id : seminar._id,
                showLastPeriodScore : true
            };

            Admin.updateSeminar($scope.data.updateSeminar).success(function(data, status, headers, config) {
                app.getSeminarInit();
                $notification.success('Save success', 'Update Seminar success');

            }).error(function(data, status, headers, config) {
                console.log(data);
                $notification.error('Failed', Admin.errorHandler(data.message));
            });
        };
        $scope.hideFinalScore = function(seminar){
            $scope.data.updateSeminar = {
                id : seminar._id,
                showLastPeriodScore : false
            };

            Admin.updateSeminar($scope.data.updateSeminar).success(function(data, status, headers, config) {
                app.getSeminarInit();
                $notification.success('Save success', 'Update Seminar success');

            }).error(function(data, status, headers, config) {
                console.log(data);
                $notification.error('Failed', Admin.errorHandler(data.message));
            });
        };



        /********************  搜索 Tags  ********************/
        $scope.loadTag = function(query) {
            console.log(query);
            return Admin.getTags(query);
        };

        /********************  搜索 Glossary  ********************/
        $scope.searchGlossary = function(form) {
            if (form.$valid) {
                Admin.getGlossaries($scope.data.searchGlossary).success(function(data, status, headers, config) {
                    $scope.data.glossaries = data;

                }).error(function(data, status, headers, config) {
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };
        /********************  Create New Glossary  ********************/
        $scope.createNewGlossary = function(form) {
            if (form.$valid) {
                Admin.addGlossary($scope.data.newGlossary).success(function(data, status, headers, config) {

                    app.getGlossaryInit();
                    $scope.css.leftmenu = 71;

                    $notification.success('Save success', 'Create Glossary success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };

        $scope.showEditGlossaryMenu = function(glossary) {
            $scope.data.newGlossary.id = glossary._id;
            $scope.data.newGlossary.name = glossary.name;
            $scope.data.newGlossary.description = glossary.description;
            $scope.data.newGlossary.type = glossary.type;
            $scope.data.newGlossary.question = glossary.question;
            $scope.data.newGlossary.answer = glossary.answer;

            $scope.data.newGlossary.tagList = [];
            glossary.tagList.forEach(function(tag){
                $scope.data.newGlossary.tagList.push(tag.name);
            });

            $scope.css.editMenuStatus = true;
            $scope.css.leftmenu = 72;

        };

        /********************  Update Glossary  ********************/
        $scope.updateGlossary = function(form) {
            if (form.$valid) {

                $scope.data.updateGlossary = {
                    id : $scope.data.newGlossary.id,
                    name : $scope.data.newGlossary.name,
                    description: $scope.data.newGlossary.description,
                    type: $scope.data.newGlossary.type,
                    question: $scope.data.newGlossary.question,
                    answer : $scope.data.newGlossary.answer,
                    tagList : $scope.data.newGlossary.tagList
                };

                Admin.updateGlossary($scope.data.updateGlossary).success(function(data, status, headers, config) {

                    app.getGlossaryInit();
                    $scope.css.leftmenu = 71;

                    $notification.success('Save success', 'Update Campaign success');

                }).error(function(data, status, headers, config) {
                    console.log(data);
                    $notification.error('Failed', Admin.errorHandler(data.message));
                });
            }
        };

    }]);










    angular.module('marksimosadmin').controller('adminMarksimosReportController',
    ['$scope', '$http', '$notification', '$translate', 'Admin', 'AdminTable', 'chartReport', 'AdminChart', 'Socket',
    function($scope, $http, $notification,$translate, Admin,  AdminTable, chartReport, AdminChart, Socket) {

        $scope.css = {
            showReportMenu : true,
            currentReportMenu : 'AllDecisions',
            tableReportTab : 'SKU',
            tableReportTabC2 : 'SKU',
            currentSeminarId : 0
        };

        $scope.data = {
            currentUser: null,

            seminarChatMessages : [],

            allDecisions: {
                data           : [],
                allCompanyId   : [1, 2, 3, 4, 5, 6, 7, 8, 9],
                allPeriod      : [1, 2, 3, 4, 5, 6, 7, 8, 9],
                currentCompanyId : '!!',
                currentPeriod  : 1
            },

            reRunCompanies : [false, false, false, false, false, false, false, false, false],
            unlockCompanyDecisions : [false, false, false, false, false, false, false, false, false],
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
            questionnaireQuestion: {},
            questionnaireList: [],
            currentQuestionnaire : null,

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

                Socket.setup($scope.css.currentSeminarId);

                Socket.socket.on('marksimosChatMessageSeminarUpdate', function(data){
                    $scope.data.seminarChatMessages.push(data);
                });

                that.getAdminInfo();

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

                /********************  Chat Messages ********************/


                $scope.sendSeminarMessage = function(messageInput) {
                    Admin.sendSeminarChatMessage(messageInput, $scope.css.currentSeminarId).success(function(data, status, headers, config) {
                        //$notification.success('Save success', 'Send Message Success');

                    }).error(function(data, status, headers, config) {
                        console.log(data);
                        $notification.error('Failed', Admin.errorHandler(data.message));
                    });

                };



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


                /********************  Unlock Decisions  ********************/
                $scope.unlockDecisions = function() {

                    Admin.unlockDecisions($scope.css.currentSeminarId, $scope.data.unlockCompanyDecisions).success(function(data, status, headers, config) {
                        $notification.success('Save success', 'Unlock Seminar Decisions Success');

                    }).error(function(data, status, headers, config) {
                        console.log(data);
                        $notification.error('Failed', Admin.errorHandler(data.message));
                    });
                };

                /********************  Run Seminar  ********************/
                $scope.reRunSeminar = function() {

                    Admin.runSeminar($scope.css.currentSeminarId, false, $scope.data.reRunCompanies).success(function(data, status, headers, config) {
                        $notification.success('Save success', 'Rerun Seminar Decisions Success');

                    }).error(function(data, status, headers, config) {
                        console.log(data);
                        $notification.error('Failed', Admin.errorHandler(data.message));
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
                            $notification.error('Failed', Admin.errorHandler(data.message));
                        });


                    }else if( $scope.data.reRunDecision.type === 'Company'){
                        $scope.data.reRunDecision.company_data[$scope.data.reRunDecision.sku_fieldname] = $scope.data.reRunDecision.sku_fieldvalue;

                        Admin.updateCompanyDecision($scope.data.reRunDecision).success(function(data, status, headers, config) {
                            $notification.success('Save success', 'Update SKU Decision Success');
                            app.loadingAllDecisions();

                        }).error(function(data, status, headers, config) {
                            console.log(data);
                            $notification.error('Failed', Admin.errorHandler(data.message));
                        });

                    }else{
                        $scope.data.reRunDecision.brand_data[$scope.data.reRunDecision.sku_fieldname] = $scope.data.reRunDecision.sku_fieldvalue;

                        Admin.updateBrandDecision($scope.data.reRunDecision).success(function(data, status, headers, config) {
                            $notification.success('Save success', 'Update SKU Decision Success');
                            app.loadingAllDecisions();

                        }).error(function(data, status, headers, config) {
                            console.log(data);
                            $notification.error('Failed', Admin.errorHandler(data.message));
                        });
                    }

                };

            },

            getAdminInfo : function(){
                Admin.userInfo().success(function(data, status, headers, config) {
                    $scope.data.currentUser = data;
                });
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
                    $scope.data.questionnaireList = data;
                    if (data[0].studentList.length > 0) {
                        $scope.data.currentQuestionnaire = data[0].studentList[0].questionnaire;
                    }

                    $scope.data.questionnaireQuestion.radio_OverallSatisfactionWithThePrograms = {
                        info: ['ChallengeStrategicThinkingAbility', 'DevelopAnIntegratedPerspective', 'TestPersonalAbilityOfBalancingRisks', 'ChallengeLeadershipAndTeamworkAbility', 'ChallengeAnalysisAndDecisionMakingAbility', 'SimulationInteresting']
                    };
                    $scope.data.questionnaireQuestion.radio_TeachingTeams = {
                        info: ['FeedbackOnSimulationDecisions', 'ExpandingViewAndInspireThinking', 'Lectures']
                    };
                    $scope.data.questionnaireQuestion.radio_Products = {
                        info: ['OverallProductUsageExperience', 'UserInterfaceExperience', 'EaseOfNavigation', 'ClarityOfWordsUsed']
                    };
                    $scope.data.questionnaireQuestion.radio_TeachingSupports = {
                        info: ['Helpfulness', 'QualityOfTechnicalSupport']
                    };
                    $scope.data.questionnaireQuestion.radio_MostBenefits = {
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