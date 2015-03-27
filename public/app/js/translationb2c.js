/**
 * recommended
 *
 * no globals are left behind
 */

(function () {
    'use strict';


    angular.module('b2c.translation', ['ngCookies']);


    angular.module('b2c.translation').config(['$translateProvider',  function($translateProvider){

        // Adding a translation table for the English language
        $translateProvider.translations('en_US', {

            //profile page
            //Header Title
            ProfilePageHeaderTitle: "Personal Info",

            //Labels for Navigator
            ProfilePageTabUploadAvatar: 'Upload Avatar',
            ProfilePageTabBasicInfo: 'Basic Info',
            ProfilePageTabSecurityInfo: 'Security Info',
            ProfilePageTabSchoolInfo: 'School Info',
            ProfilePageTabTeamInfo: 'Team Info',
            ProfilePageTabContactInfo: 'Contact Info',

            //Labels for Info Details
            ProfilePageEditButton: 'Edit',
            ProfilePageCancelButton: 'Cancel',
            ProfilePageChangeButton: 'Change',
            ProfilePageSaveButton: 'Save',
            ProfilePageUploadAvatarSelectionButton: 'Upload',
            ProfilePageBasicInfoName: 'Name',
            ProfilePageBasicInfoGender: 'Gender',
            ProfilePageBasicInfoGenderMale: 'Male',
            ProfilePageBasicInfoGenderFemale: 'Female',
            ProfilePageBasicInfoBirthday: 'Birthday',
            ProfilePageSecurityInfoCurrentPassword: 'Current Password',
            ProfilePageSecurityInfoNewPassword: 'New Password',
            ProfilePageSecurityInfoReTypeNewPassword: 'Confirm Password',
            ProfilePageSchoolInfoCollege: 'College',
            ProfilePageSchoolInfoEnterDate: 'Enter Date',
            ProfilePageSchoolInfoDegree: 'Degree',
            ProfilePageTeamInfoTeamName: 'Team Name',
            ProfilePageTeamInfoMember: 'Member',
            ProfilePageTeamInfoNewMember: 'New Member',
            ProfileContactInfoMobilePhone: 'Mobile Phone',

            //Error Tips for Validation
            ProfilePagePasswordError: 'Please input password 6-20 characters',
            ProfilePageNewPasswordError: 'Please input new password 6-20 characters',
            ProfilePageTwoPasswordSameError: "New password can't be same as current password",
            ProfilePageConfirmPasswordError: 'Please input new password again',
            ProfilePageTwoPasswordsNotConsistent: 'Inconsistent passwords',
            ProfilePageDateFormatError: 'Date format error',
            ProfilePageTeamNameRequiredError: "Please input team's name",
            ProfilePageNewMemberNameError: "Please input new member's name",
            ProfilePageInvalidQQ: 'Invalid qq account',
            ProfilePageInvalidMobilePhoneNumber: 'Invalid mobile phone number',

            //Input Control Placeholder
            ProfilePageNewMemberInputPlaceholder: 'Username/email',




            //Labels for Login
            "LoginPageLabelWelcome"           : "Welcome !",
            "LoginPageLabelSignIn"            : "Sign In",
            "LoginPageLabelEmail"             : "Username / Email :",
            "LoginPageLabelPassword"          : "Password :",
            "LoginPageLabelPasswordErrorInfo" : "Password Incorrect !",
            "LoginPageButtonSignIn"           : "Sign In"


        });




        // Adding a translation table for the Chinese language
        $translateProvider.translations('zh_CN', {


            //profile page
            //Header Title
            ProfilePageHeaderTitle                   : "个人信息",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : '上传头像',
            ProfilePageTabBasicInfo                  : '基本信息',
            ProfilePageTabSecurityInfo               : '安全信息',
            ProfilePageTabSchoolInfo                 : '学校信息',
            ProfilePageTabTeamInfo                   : '团队信息',
            ProfilePageTabContactInfo                : '联系方式',

            //Labels for Info Details
            ProfilePageEditButton                    : '编辑',
            ProfilePageCancelButton                  : '取消',
            ProfilePageChangeButton                  : '修改',
            ProfilePageSaveButton                    : '保存',
            ProfilePageUploadAvatarSelectionButton   : '上传图片',
            ProfilePageBasicInfoName                 : '姓名',
            ProfilePageBasicInfoGender               : '性别',
            ProfilePageBasicInfoGenderMale           : '男',
            ProfilePageBasicInfoGenderFemale         : '女',
            ProfilePageBasicInfoBirthday             : '生日',
            ProfilePageSecurityInfoCurrentPassword   : '原始密码',
            ProfilePageSecurityInfoNewPassword       : '新密码',
            ProfilePageSecurityInfoReTypeNewPassword : '再输入新密码',
            ProfilePageSchoolInfoCollege             : '大学',
            ProfilePageSchoolInfoEnterDate           : '入学时间',
            ProfilePageSchoolInfoDegree              : '学历',
            ProfilePageTeamInfoTeamName              : '战队名称',
            ProfilePageTeamInfoMember                : '队员',
            ProfilePageTeamInfoNewMember             : '新队员',
            ProfileContactInfoMobilePhone            : '手机',

            //Error Tips for Validation
            ProfilePagePasswordError: '请输入密码 6-20个字符',
            ProfilePageNewPasswordError: '请输入新密码 6-20个字符',
            ProfilePageTwoPasswordSameError: '新密码不能与老密码相同',
            ProfilePageConfirmPasswordError: '请再次输入新密码',
            ProfilePageTwoPasswordsNotConsistent: '两次密码不一致',
            ProfilePageDateFormatError: '日期格式错误',
            ProfilePageTeamNameRequiredError: '请输入正确的战队名称',
            ProfilePageNewMemberNameError: '请输入正确的用户名',
            ProfilePageInvalidQQ: '无效的QQ号码',
            ProfilePageInvalidMobilePhoneNumber: '无效的手机号码',

            //Input Control Placeholder
            ProfilePageNewMemberInputPlaceholder: '用户名/邮箱',

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