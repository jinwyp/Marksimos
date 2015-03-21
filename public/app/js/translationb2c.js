/**
 * recommended
 *
 * no globals are left behind
 */

(function () {
    'use strict';


    angular.module('marksimos.translationb2c', ['ngCookies']);


    angular.module('marksimos.translationb2c').config(['$translateProvider',  function($translateProvider){

        // Adding a translation table for the English language
        $translateProvider.translations('en_US', {

            //Labels for Login
            "LoginPageLabelWelcome"           : "Welcome !",
            "LoginPageLabelSignIn"            : "Sign In",
            "LoginPageLabelEmail"             : "Username / Email :",
            "LoginPageLabelPassword"          : "Password :",
            "LoginPageLabelPasswordErrorInfo" : "Password Incorrect !",
            "LoginPageButtonSignIn"           : "Sign In",


            //Labels for Introduction
            "IntroPageSeminarListTitle" : "List of the Game Enrolled :",
            "IntroPageSeminarListLabelSeminarID" : "Seminar ID",
            "IntroPageSeminarListLabelSeminarDescription" : "Seminar Description",
            "IntroPageSeminarListLabelTotalRound" : "Total Round",
            "IntroPageSeminarListLabelCompetitor" : "Competitor",
            "IntroPageSeminarListLabelDateOfCommencement" : "Date of Commencement",
            "IntroPageSeminarListLabelSeminarStatus" : "Seminar Status",
            "IntroPageSeminarListLabelCountry" : "Country",
            "IntroPageSeminarListLabelProvince" : "Province(State)",
            "IntroPageSeminarListLabelCity" : "City",
            "IntroPageSeminarListLabelVenue" : "Venue"



        });










        // Adding a translation table for the Chinese language
        $translateProvider.translations('zh_CN', {


            //Labels for Login
            "LoginPageLabelWelcome" : "欢迎使用MarkSimos !",
            "LoginPageLabelSignIn" : "登录",
            "LoginPageLabelEmail" : "用户名 / 邮箱 :",
            "LoginPageLabelPassword" : "密码 :",
            "LoginPageLabelPasswordErrorInfo" : "邮箱或密码错误 !",
            "LoginPageButtonSignIn" : "点击登录",


            //Labels for Introduction
            "IntroPageSeminarListTitle"                   : "目前已有的游戏列表",
            "IntroPageSeminarListLabelSeminarID"          : "课程号",
            "IntroPageSeminarListLabelSeminarDescription" : "课程说明",
            "IntroPageSeminarListLabelTotalRound"         : "总阶段数",
            "IntroPageSeminarListLabelCompetitor"         : "参与竞争者",
            "IntroPageSeminarListLabelDateOfCommencement" : "开始时间",
            "IntroPageSeminarListLabelSeminarStatus"      : "课程状态",
            "IntroPageSeminarListLabelCountry"            : "国家",
            "IntroPageSeminarListLabelProvince"           : "省(州)",
            "IntroPageSeminarListLabelCity"               : "城市",
            "IntroPageSeminarListLabelVenue"              : "地点或场所"




        });

        // Tell the module what language to use by default
//        $translateProvider.preferredLanguage('en_US');
        $translateProvider.preferredLanguage('zh_CN');

        $translateProvider.useCookieStorage();
    }]);


})();