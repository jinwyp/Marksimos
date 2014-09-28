/**
 * Created by raven on 28/9/14 and.
 */

var app = angular.module('e4e.translation', []);


app.config(['$translateProvider', function($translateProvider){

// Adding a translation table for the English language
    $translateProvider.translations('en_US', {
        /*e4e register*/
        "e4eRegisterGetStart":"Get Start",
        "e4eRegisterFindStage":"We Help Students find their own stage",
        "e4eRegisterLetsStart":"Let's start",
        "e4eRegisterRightNow":"Right now",
        "e4eRegisterSignUp":"Sign Up",
        "e4eRegisterLogin":"LOGIN",



        "e4eCompanyRegisterTitle":"Company Registration",
        "e4eCompanyFirstPageTitle":"Company Details",
        "e4eCompanyUserName":"User Name",
        "e4eCompanyCompanyName":"Company Name",
		"e4eCompanyHoldingCompany":"Holding Company",
        "e4eCompanyDivision":"Division",
        "e4eCompanyNumberOfEmployees":"Number Of Employees",
        "e4eCompmayCountry":"Country",
        "e4eCompmayAddress":"Address",
        "e4eCompanyNext":"NEXT",

        "e4eCompanyNameOfContactPerson":"Name Of Contact Person",
        "e4eCompanyDesignation":"Designation",
        "e4eCompanyOfficalContactNumber":"Offical Contact Number",
        "e4eCompanyMobileNumber":"Mobile Number",
        "e4eCompanyEmailID":"Email ID",
        "e4eCompanySecondPageTitle":"Communication Details",

        "e4eCompanyThirdPageTitle":"Job Profiles",
        "e4eCompanyDivision":"Division",
        "e4eCompanyFunction":"Function",
        "e4eCompanyRole":"Role",
        "e4eCompanyNumberOfPositions":"Number Of Positions",
        "e4eCompanyJobDescription":"Job Description",
        "e4eCompanySubmit":"Submit",

        "e4eStudentRegisterTitle":"Student Registration",
        "e4eStudentFirstPageTitle":"Basic Details",
        "e4eStudentUserName":"User Name",
        "e4eStudentFirstName":"First Name",
        "e4eStudentLastName":"Last Name",
        "e4eStudentAge":"Age",
        "e4eStudentCountry":"Country",
        "e4eStudentAddress":"Address",
        "e4eStudentCommDetail":"Communication Details",
        "e4eStudentEmail":"Email ID",
        "e4eStudentQQ":"QQ ID",
        "e4eStudentNext":"Next",

        "e4eStudentSecondPageTitle":"Profile Details",
        "e4eStudentHighestEDU":"Highest Educational Degree",
        "e4eStudentMajors":"Majors",
        "e4eStudentUniversity":"University",
        "e4eStudentScoreGPA":"Score/GPA (out of 100)",
        "e4eStudentAchievements":"Achievements",
        "e4eStudentYearOfGraduation":"Year Of Graduation",
        "e4eStudentMonthOfGraduation":"Month Of Graduation",
        "e4eStudentCurrentYear":"Current Year in College",
        "e4eStudentUpload":"Upload your resume",
        "e4eStudentSubmit":"Submit",

        "e4eSuccessCon":"Congratulations",
        "e4eSuccessConInfo":"You have ssccessfully registered",
        "e4eSuccessConInfoLast":"with HCD Learning",
        "e4eSuccessPassword":"Password has been sent to your email",
        "e4eSuccessProceed":"Please proceed to",
        "e4eSuccessUpdate":"and update the jobprofiles and select winningstudents for your company",
        "e4eSuccessLogin":"to login and participate the MarkSimos game"


		
    });










    // Adding a translation table for the Chinese language
    $translateProvider.translations('zh_CN', {


        /*e4e register*/
        "e4eRegisterGetStart":"现在开始",
        "e4eRegisterFindStage":"我们帮助学生找到自己的舞台",
        "e4eRegisterLetsStart":"开始",
        "e4eRegisterRightNow":"现在",
        "e4eRegisterSignUp":"注册",
        "e4eRegisterLogin":"登录",


        "e4eCompanyRegisterTitle":"公司注册",
        "e4eCompanyFirstPageTitle":"公司基本信息",
        "e4eCompanyUserName":"User Name",
        "e4eCompanyCompanyName":"Company Name",
        "e4eCompanyHoldingCompany":"Holding Company",
        "e4eCompanyDivision":"Division",
        "e4eCompanyNumberOfEmployees":"Number Of Employees",
        "e4eCompmayCountry":"Country",
        "e4eCompmayAddress":"Address",
        "e4eCompanyNext":"下一步",

        "e4eCompanyNameOfContactPerson":"Name Of Contact Person",
        "e4eCompanyDesignation":"Designation",
        "e4eCompanyOfficalContactNumber":"Offical Contact Number",
        "e4eCompanyMobileNumber":"Mobile Number",
        "e4eCompanyEmailID":"Email ID",
        "e4eCompanySecondPageTitle":"通信细节",

        "e4eCompanyThirdPageTitle":"工作信息",
        "e4eCompanyDivision":"Division",
        "e4eCompanyFunction":"Function",
        "e4eCompanyRole":"Role",
        "e4eCompanyNumberOfPositions":"Number Of Positions",
        "e4eCompanyJobDescription":"Job Description",
        "e4eCompanySubmit":"提交",

        "e4eStudentRegisterTitle":"学生注册",
        "e4eStudentFirstPageTitle":"基本信息",
        "e4eStudentUserName":"User Name",
        "e4eStudentFirstName":"First Name",
        "e4eStudentLastName":"Last Name",
        "e4eStudentAge":"Age",
        "e4eStudentCountry":"Country",
        "e4eStudentAddress":"Address",
        "e4eStudentCommDetail":"Communication Details",
        "e4eStudentEmail":"Email ID",
        "e4eStudentQQ":"QQ ID",
        "e4eStudentNext":"下一步",

        "e4eStudentSecondPageTitle":"Profile Details",
        "e4eStudentHighestEDU":"Highest Educational Degree",
        "e4eStudentMajors":"Majors",
        "e4eStudentUniversity":"University",
        "e4eStudentScoreGPA":"Score/GPA (out of 100)",
        "e4eStudentAchievements":"Achievements",
        "e4eStudentYearOfGraduation":"Year Of Graduation",
        "e4eStudentMonthOfGraduation":"Month Of Graduation",
        "e4eStudentCurrentYear":"Current Year in College",
        "e4eStudentUpload":"Upload your resume",
        "e4eStudentSubmit":"提交",

        "e4eSuccessCon":"恭喜你",
        "e4eSuccessConInfo":"你已经成功注册",
        "e4eSuccessConInfoLast":"到 HCD Learning",
        "e4eSuccessPassword":"Password has been sent to your email",
        "e4eSuccessProceed":"Please proceed to",
        "e4eSuccessUpdate":"and update the jobprofiles and select winningstudents for your company",
        "e4eSuccessLogin":"to login and participate the MarkSimos game"
		

		
    });

    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en_US');
//    $translateProvider.preferredLanguage('zh_CN');
}]);