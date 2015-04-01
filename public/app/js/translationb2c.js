/**
 * recommended
 *
 * no globals are left behind
 */

(function() {
    'use strict';


    angular.module('b2c.translation', ['ngCookies']);


    angular.module('b2c.translation').config(['$translateProvider', function($translateProvider) {

        // Adding a translation table for the English language
        $translateProvider.translations('en_US', {

            //profile page
            //Header Title
            ProfilePageHeaderTitle                   : "Personal Info",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : 'Upload Avatar',
            ProfilePageTabBasicInfo                  : 'Basic Info',
            ProfilePageTabSecurityInfo               : 'Security Info',
            ProfilePageTabSchoolInfo                 : 'Education Background',
            ProfilePageTabTeamInfo                   : 'Team Info',
            ProfilePageTabContactInfo                : 'Contact Info',

            //Labels for Info Details
            ProfilePageEditButton                    : 'Edit',
            ProfilePageCancelButton                  : 'Cancel',
            ProfilePageChangeButton                  : 'Change',
            ProfilePageSaveButton                    : 'Save',
            ProfilePageUploadAvatarSelectionButton   : 'Upload',
            ProfilePageBasicInfoName                 : 'Name',
            ProfilePageBasicInfoGender               : 'Gender',
            ProfilePageBasicInfoGenderMale           : 'Male',
            ProfilePageBasicInfoGenderFemale         : 'Female',
            ProfilePageBasicInfoBirthday             : 'Birthday',
            ProfilePageSecurityInfoCurrentPassword   : 'Current Password',
            ProfilePageSecurityInfoNewPassword       : 'New Password',
            ProfilePageSecurityInfoReTypeNewPassword : 'Confirm Password',
            ProfilePageSchoolInfoCollege             : 'College',
            ProfilePageSchoolInfoEnterDate           : 'Enter Date',
            ProfilePageSchoolInfoDegree              : 'Degree',
            ProfilePageTeamInfoTeamName              : 'Team Name',
            ProfilePageTeamInfoMember                : 'Member',
            ProfilePageTeamInfoNewMember             : 'New Member',
            ProfileContactInfoMobilePhone            : 'Mobile Phone',

            //Error Tips for Validation
            ProfilePagePasswordError                 : 'Please input password 6-20 characters',
            ProfilePageNewPasswordError              : 'Please input new password 6-20 characters',
            ProfilePageTwoPasswordSameError          : "New password can't be same as current password",
            ProfilePageConfirmPasswordError          : 'Please input new password again',
            ProfilePageTwoPasswordsNotConsistent     : 'Inconsistent passwords',
            ProfilePageDateFormatError               : 'Date format error',
            ProfilePageTeamNameRequiredError         : "Please input team's name",
            ProfilePageNewMemberNameError            : "Please input new member's name",
            ProfilePageInvalidQQ                     : 'Invalid qq account',
            ProfilePageInvalidMobilePhoneNumber      : 'Invalid mobile phone number',

            //Input Control Placeholder
            ProfilePageNewMemberInputPlaceholder     : 'Username/Email',

            //Tips for alerts in javascript
            ProfilePageAlertSaveSuccessful           : 'Save successful',
            ProfilePageAlertSaveFailed               : 'Save failed',
            ProfilePageAlertInvalidPassword          : 'Invalid password!',



            //Campaign Page
            //Labels for Navigator
            CampaignPageNavEnterMatch                 : 'Enter Match',
            CampaignPageNavSchedules                  : 'Schedules',
            CampaignPageNavGains                      : 'Gains',
            CampaignPageNavConditions                 : 'Conditions',
            CampaignPageNavProcess                    : 'Process',
            CampaignPageNavWinner                     : 'Winner',

            //Labels for Enter Campaign Section
            CampaignPageEnterCampaignEnterButton      : 'Enter',
            CampaignPageEnterCampaignHasEnteredButton : 'Already Entered',
            CampaignPageEnterCampaignIntroduce        : 'Introduce',
            CampaignPageEnterCampaignCountPrefix      : 'Has Entered ',
            CampaignPageEnterCampaignCountSuffix      : ' People',
            CampaignPageEnterCampaignCountPlural      : 's',

            //Labels for Enter Successful popup window
            CampaignPageEnterSuccessTip1              : 'Enter Successful！',
            CampaignPageEnterSuccessTip2              : 'Play The Game',
            //Labels for Enter Failed popup window
            CampaignPageEnterFailedTip1               : 'Tip',
            CampaignPageEnterFailedTip2               : "Please Complete Your Team's Info",
            CampaignPageEnterFailedCompleteInfoButton : 'Complete Info',

            //Labels for Schedules
            CampaignPageSchedulesEnter                : 'Enter',

            //Labels for Conditions
            CampaignPageCondition1                    : 'Share',
            CampaignPageCondition1Detail              : 'Having Sharing Spirit, Be Willing to Share Your Knowledge',
            CampaignPageCondition2                    : 'Challenge',
            CampaignPageCondition2Detail              : 'Optimistic，Dare to Challenge Yourself',
            CampaignPageCondition3                    : 'Focus',
            CampaignPageCondition3Detail              : 'Targeted, Have Enough Focus',

            //Labels for Winner
            CampaignPageRound1                        : 'The first round result',
            CampaignPageRound2                        : 'The second round result',
            CampaignPageRound3                        : 'The third round result',
            //Labels for winner popup window
            //todo, the Round number should be a variable
            CampaignPageRoundWinnerLabel              : 'The first round winner is',
            CampaignPageTeamName                      : 'Team Name',
            CampaignPageMember                        : 'Member',
            CampaignPageCheckScores                   : 'Check Scores',
            CampaignPageRound1Score                   : 'The first round score',
            CampaignPageRound2Score                   : 'The second round score',
            CampaignPageRound3Score                   : 'The third round score',



            //Campaign List Page
            CampaignListPageMatches                 : 'Matches & Campaigns',
            CampaignListPageJoinedCountPrefix       : 'people',
            CampaignListPageJoinedCountSuffix       : 'joined',
            CampaignListPageJoinedCountPlural       : 's',
            CampaignListPageJoin                    : 'Join',
            CampaignListPageHotGames                : 'Hot Games',
            CampaignListPageBusinessSimulationMatch : 'Business Simulation Match'
        });


        // Adding a translation table for the Chinese language
        $translateProvider.translations('zh_CN', {

            //Profile Page
            //Header Title
            ProfilePageHeaderTitle                   : "个人信息",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : '上传头像',
            ProfilePageTabBasicInfo                  : '基本信息',
            ProfilePageTabSecurityInfo               : '安全信息',
            ProfilePageTabSchoolInfo                 : '教育背景',
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
            ProfilePagePasswordError                 : '请输入密码 6-20个字符',
            ProfilePageNewPasswordError              : '请输入新密码 6-20个字符',
            ProfilePageTwoPasswordSameError          : '新密码不能与老密码相同',
            ProfilePageConfirmPasswordError          : '请再次输入新密码',
            ProfilePageTwoPasswordsNotConsistent     : '两次密码不一致',
            ProfilePageDateFormatError               : '日期格式错误',
            ProfilePageTeamNameRequiredError         : '请输入正确的战队名称',
            ProfilePageNewMemberNameError            : '请输入正确的用户名',
            ProfilePageInvalidQQ                     : '无效的QQ号码',
            ProfilePageInvalidMobilePhoneNumber      : '无效的手机号码',

            //Placeholder for Input Control
            ProfilePageNewMemberInputPlaceholder     : '用户名/邮箱',

            //Tips for alerts in javascript
            ProfilePageAlertSaveSuccessful           : '保存成功',
            ProfilePageAlertSaveFailed               : '保存失败',
            ProfilePageAlertInvalidPassword          : '密码信息无效！',



            //Campaign Page
            //Labels for Navigator
            CampaignPageNavEnterMatch                 : '比赛报名',
            CampaignPageNavSchedules                  : '大赛赛程',
            CampaignPageNavGains                      : '你能获得',
            CampaignPageNavConditions                 : '加入条件',
            CampaignPageNavProcess                    : '比赛流程',
            CampaignPageNavWinner                     : '获胜团队',

            //Labels for Enter Campaign Section
            CampaignPageEnterCampaignEnterButton      : '马上报名',
            CampaignPageEnterCampaignHasEnteredButton : '您已报名',
            CampaignPageEnterCampaignIntroduce        : '游戏介绍',
            CampaignPageEnterCampaignCountPrefix      : '已有',
            CampaignPageEnterCampaignCountSuffix      : '人参加',
            CampaignPageEnterCampaignCountPlural      : '',
            //Labels for Enter Successful popup window
            CampaignPageEnterSuccessTip1              : '报名成功！',
            CampaignPageEnterSuccessTip2              : '快来体验游戏吧',
            //Labels for Enter Failed popup window
            CampaignPageEnterFailedTip1               : '温馨提示',
            CampaignPageEnterFailedTip2               : '请先完成你的队伍信息',
            CampaignPageEnterFailedCompleteInfoButton : '完善信息',

            //Labels for Schedules
            CampaignPageSchedulesEnter                : '点击进入',

            //Labels for Conditions
            CampaignPageCondition1                    : '乐于分享',
            CampaignPageCondition1Detail              : '具有分享精神，愿意分享自己的知识',
            CampaignPageCondition2                    : '敢于挑战',
            CampaignPageCondition2Detail              : '乐观向上，敢于向自己发起挑战',
            CampaignPageCondition3                    : '有专注力',
            CampaignPageCondition3Detail              : '目标明确，有足够专注力',

            //Labels for Winner
            CampaignPageRound1                        : '第一轮结果',
            CampaignPageRound2                        : '第二轮结果',
            CampaignPageRound3                        : '第三轮结果',
            //Labels for winner popup window
            //todo, the Round number should be a variable
            CampaignPageRoundWinnerLabel              : '第一轮优胜团队为',
            CampaignPageTeamName                      : '战队名称',
            CampaignPageMember                        : '成员',
            CampaignPageCheckScores                   : '查看我的得分',
            CampaignPageRound1Score                   : '第一轮得分',
            CampaignPageRound2Score                   : '第二轮得分',
            CampaignPageRound3Score                   : '第三轮得分',



            //Campaign List Page
            CampaignListPageMatches                 : '赛事&活动',
            CampaignListPageJoinedCountPrefix       : '人',
            CampaignListPageJoinedCountSuffix       : '参加',
            CampaignListPageJoinedCountPlural       : '',
            CampaignListPageJoin                    : '参加',
            CampaignListPageHotGames                : '热门游戏',
            CampaignListPageBusinessSimulationMatch : '商战模拟大赛'
        });

        // Tell the module what language to use by default
//        $translateProvider.preferredLanguage('en_US');
        $translateProvider.preferredLanguage('zh_CN');

        $translateProvider.useCookieStorage();
    }]);


})();