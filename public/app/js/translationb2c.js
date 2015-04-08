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

            // Language
            LanguageChinese   : 'Chinese',
            LanguageEnglish   : 'English',
            LanguageFrench    : 'French',
            LanguageGerman    : 'German',
            LanguageGreek     : 'Greek',
            LanguageHindi     : 'Hindi',
            LanguageItalian   : 'Italian',
            LanguageJapanese  : 'Japanese',
            LanguageKorean    : 'Korean',
            LanguageRussian   : 'Russian',
            LanguageSpanish   : 'Spanish',
            LanguageSwedish   : 'Swedish',
            LanguageTibetan   : 'Tibetan',
            LanguageTurkish   : 'Turkish',
            LanguageUkrainian : 'Ukrainian',

            // Language Proficiency
            LanguageBeginner     : 'Beginner',
            LanguageIntermediate : 'Intermediate',
            LanguageFluent       : 'Fluent',
            LanguageNative       : 'Native',

            // Profile Work Experience
            jobTypeFullTime      : 'Full-time',
            jobTypePartTime      : 'Par-time ',
            jobTypeIntern        : 'Intern',

            jobIndustryComputer        : 'Computer, Internet, Telecom, Electronics',
            jobIndustryFinance         : 'Accounting, Finance, Banking, Insurance',
            jobIndustryManufacturing   : 'Trade, Sales, Manufacturing, Operations',
            jobIndustryBiotechnology   : 'Biotechnology, Pharmaceuticals, Healthcare',
            jobIndustryAdvertising     : 'Advertising, Marketing, Media, Design',
            jobIndustryConstruction    : 'Construction, Real Estate',
            jobIndustryEducation       : 'Professional Services, Education, Training',
            jobIndustryCustomerService : 'Customer Services',
            jobIndustryTransportation  : 'Logistics, Transportation',
            jobIndustryEnergy          : 'Energy, Utilities and Raw Materials Related',
            jobIndustryOthers          : 'Government, Non Profit, Others',

            jobIndustryComputer01      : 'Computers,Software',
            jobIndustryComputer02      : 'Computers, Hardware',
            jobIndustryComputer03      : 'Computer Services',
            jobIndustryComputer04      : 'Telecom & Network Equipment',
            jobIndustryComputer05      : 'Telecom Operators/Service Providers',
            jobIndustryComputer06      : 'Internet/E-commerce',
            jobIndustryComputer07      : 'Electronics/Semiconductor/IC',
            jobIndustryComputer08      : 'Instrument/Industry Automation',

            jobIndustryFinance01         : 'Accounting, Auditing',
            jobIndustryFinance02         : 'Finance/Investments/Securities',
            jobIndustryFinance03         : 'Banking',
            jobIndustryFinance04         : 'Insurance',
            jobIndustryFinance05         : 'Trust/Auction/Guarantee/Pawn',

            jobIndustryManufacturing01   : 'Trading/Import & Export',
            jobIndustryManufacturing02   : 'Wholesale/Retail',
            jobIndustryManufacturing03   : 'FMCG( Food,Beverage,Cosmetics)',
            jobIndustryManufacturing04   : 'Apparel/Textiles/Leather Goods',
            jobIndustryManufacturing05   : 'Furniture/Home Appliances/Toys/Gifts',
            jobIndustryManufacturing06   : 'Luxury/Collectibles/Arts&Craft/Jewelry',
            jobIndustryManufacturing07   : 'Office Supplies & Equipment',
            jobIndustryManufacturing08   : 'Machinery, Equipment, Heavy Industries',
            jobIndustryManufacturing09   : 'Automobile & Components',




            //profile page
            //Header Title
            ProfilePageHeaderTitle                   : "Personal Info",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : 'Upload Picture',
            ProfilePageTabBasicInfo                  : 'Basic Details',
            ProfilePageTabSecurityInfo               : 'Security Details',
            ProfilePageTabSchoolInfo                 : 'Education Background',
            ProfilePageTabTeamInfo                   : 'Team Details',
            ProfilePageTabWorkInfo: 'Work Experience',

            //Labels for Info Details
            ProfilePageEditButton                    : 'Update',
            ProfilePageCancelButton                  : 'Cancel',
            ProfilePageChangeButton                  : 'Change',
            ProfilePageSaveButton                    : 'Save',
            ProfilePageUploadAvatarSelectionButton   : 'Upload',

            ProfilePageBasicInfoName                 : 'Name',
            ProfilePageBasicInfoGender               : 'Gender',
            ProfilePageBasicInfoGenderMale           : 'Male',
            ProfilePageBasicInfoGenderFemale         : 'Female',
            ProfilePageBasicInfoBirthday             : 'Date of Birth',
            ProfilePageCurrentLocation               : 'Current Location',
            ProfilePageEmail                         : 'Email',
            ProfilePageSchoolInfoMajor: 'Major',
            ProfilePageSchoolInfoGraduationDate: 'Graduation Date',
            ProfilePageSchoolInfoAbroad: 'Did you go abroad for exchange? (If yes, mention the University, country and time period)',
            ProfilePageSchoolInfoAchievements: 'Achievements',
            ProfilePageTabLanguageSkills: 'Language Skills',
            ProfilePageEducation: 'Education',
            ProfilePageAddEducation: 'Add Education',
            ProfilePageAddLanguage: 'Add Language',

            ProfilePageSecurityInfoCurrentPassword   : 'Current Password',
            ProfilePageSecurityInfoNewPassword       : 'New Password',
            ProfilePageSecurityInfoReTypeNewPassword : 'Confirm Password',
            ProfilePageSchoolInfoCollege             : 'University',
            ProfilePageSchoolInfoEnterDate           : 'Enter Date',
            ProfilePageSchoolInfoDegree              : 'Degree',
            ProfilePageTeamInfoTeamName              : 'Team Name',
            ProfilePageTeamInfoMember                : 'Member',
            ProfilePageTeamInfoNewMember             : 'New Member',
            ProfileContactInfoMobilePhone            : 'Mobile Phone',
            ProfileContactInfoMobilePhoneVerify      : 'Verify Mobile',
            ProfileContactInfoMobilePhoneVerifySend  : 'Get verify code for free',

            ProfileContactInfoMobilePhoneVerifyReSend : 'Resend verify code',
            ProfileContactInfoMobileVerified          : 'Verified',
            ProfileContactInfoMobileUnverified        : 'Unverified',
            ProfileContactInfoMobileVerifiedButton        : 'Verify',

            //Error Tips for Validation
            ProfilePagePasswordError                      : 'Please input password 6-20 characters',
            ProfilePageNewPasswordError                   : 'Please input new password 6-20 characters',
            ProfilePageTwoPasswordSameError               : "New password can't be same as current password",
            ProfilePageConfirmPasswordError               : 'Please input new password again',
            ProfilePageTwoPasswordsNotConsistent          : 'Inconsistent passwords',
            ProfilePageDateFormatError                    : 'Date format error',
            ProfilePageTeamNameRequiredError              : "Please input team's name",
            ProfilePageNewMemberNameError                 : "Please input new member's name",
            ProfilePageInvalidQQ                          : 'Invalid qq account',
            ProfilePageInvalidMobilePhoneNumber           : 'Invalid mobile phone number',
            ProfilePageInvalidMobilePhoneNumberVerifyCode : 'Mobile verify code wrong',

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
            CampaignListPageBusinessSimulationMatch : 'Business Simulation Match',



            //Register Page
            //Register Form
            RegisterPageRegisterLabel             : 'Register',
            RegisterPageUsernamePlaceholder       : 'Username',
            RegisterPageEmailPlaceholder          : 'Email',
            RegisterPagePasswordPlaceholder       : 'Password',
            RegisterPageReTypePasswordPlaceholder : 'Re-enter password',
            RegisterPageCaptchaPlaceholder        : 'Captcha',
            RegisterPageMaleLabel                 : 'Male',
            RegisterPageFemale                    : 'Female',
            RegisterPageRegisterButton            : 'Register',
            //Error Tips for Validation
            RegisterPageInputNameTip              : 'Please enter your username!',
            RegisterPageNameLengthTip             : "Username's length should be 6-20 characters",
            RegisterPageNameExistTip              : 'This username is already exist',
            RegisterPageInputEmailTip             : "Please enter your email",
            RegisterPageEmailExistTip             : "This email is already exist",
            RegisterPageInputPasswordTip          : 'Please enter your correct password, 6-20 characters!',
            RegisterPageReTypePasswordTip         : 'Please re-enter your password!',
            RegisterPageInputCaptchaTip           : 'Please enter the captcha!',
            RegisterPageSelectGenderTip           : 'Please select your gender！',

            //Check Email
            RegisterPageGreet                     : 'hi:',
            RegisterPageCheckEmailText1           : 'Thanks for registering for E4E!',
            RegisterPageCheckEmailText2           : 'We send an email to your email box: ',
            RegisterPageCheckEmailText3           : 'Please open your email, and click the link in the email to complete your registering.',
            RegisterPageCheckEmailText4           : 'Open immediately',

            //Introduction
            RegisterPageIntroduction1             : 'What is E4E?',
            RegisterPageIntroduction2             : 'What can we provide to you?',



            // Login page
            LoginPageLoginLabel          : 'Login',
            LoginPageUsernameErrorTip    : 'Your username/email or password is wrong!',
            LoginPageUsernamePlaceholder : 'Username/Email',
            LoginPagePasswordPlaceholder : 'Password',
            LoginPageRememberMe          : 'Remember me',
            LoginPageLoginButton         : 'Login',
            LoginPageRegisterButton      : 'or register an E4E account',
            LoginPageForgetPassword      : 'Forget password?',



            // Register Success Page
            LoginSuccessGreet: 'hi:',
            LoginSuccessText1: 'You has successfully activated your',
            LoginSuccessText2: 'email!',
            LoginSuccessText3: 'Thanks for completing register.',
            LoginSuccessText4: 'Enter user center.',



            // Page Footer
            FooterEnterpriseEntry: 'Enterprise Entry',
            FooterMainPageLink: 'HCDLearning Education',
            FooterGovernmentRecord: '沪ICP 13045400号',



            // Forgot Password Page
            ForgotPasswordTitle: 'Security Center',
            ForgotPasswordFindPassword: 'Find password',
            ForgotPasswordEnterEmail: 'Enter mail',
            ForgotPasswordResetPassword: 'Reset password',
            ForgotPasswordDone: "Done",

            ForgotPasswordEnterRegisterEmail: "Enter your registering email：",
            ForgotPasswordErrorTip: "Email not exist",
            ForgotPasswordGreet: "Hi:",
            ForgotPasswordOpenEmailText1: "We have send a email to you for resetting your password:",
            ForgotPasswordOpenEmailText2: "Please open your email, and click the link in the email to reset your password.",
            ForgotPasswordOpenEmailText3: "Open immediately",

            ForgotPasswordNoEmailText1: "Didn't receive an email？",
            ForgotPasswordNoEmailText2: "Check your trash and spam box.",
            ForgotPasswordNoEmailText3: "Re-sender an email.",



            // Reset Password Page
            ResetPasswordEnterPasswordText1: 'Please open your ',
            ResetPasswordEnterPasswordText2: 'email, and enter the following verifying code',
            ResetPasswordEnterPasswordText3: "verifying code is wrong",
            ResetPasswordEnterPasswordText4: 'containing 6 characters!',
            ResetPasswordEnterPasswordText5: 'confirm',

            ResetPasswordResetNewPassword: "Reset new password:",
            ResetPasswordErrorTip: "verifying code is wrong",
            ResetPasswordPasswordPlaceholder: "Password",
            ResetPasswordPasswordErrorTip1: 'Please enter the right password containing 6-20 characters!',
            ResetPasswordReEnterPasswordPlaceholder: "Please re-enter the password",
            ResetPasswordReEnterPasswordErrorTip: "Please re-enter the correct password！",
            ResetPasswordResetPassword: "Reset password",
            ResetPasswordGreet: 'Hi：',
            ResetPasswordResetSuccessTip: 'Reset password successfully, please login.',
            ResetPasswordLoginButton:  'login immediately'
        });








        // Adding a translation table for the Chinese language
        $translateProvider.translations('zh_CN', {
            
            // Language 
            LanguageChinese   : 'Chinese',
            LanguageEnglish   : 'English',
            LanguageFrench    : 'French',
            LanguageGerman    : 'German',
            LanguageGreek     : 'Greek',
            LanguageHindi     : 'Hindi',
            LanguageItalian   : 'Italian',
            LanguageJapanese  : 'Japanese',
            LanguageKorean    : 'Korean',
            LanguageRussian   : 'Russian',
            LanguageSpanish   : 'Spanish',
            LanguageSwedish   : 'Swedish',
            LanguageTibetan   : 'Tibetan',
            LanguageTurkish   : 'Turkish',
            LanguageUkrainian : 'Ukrainian',


            // Proficiency
            LanguageBeginner: '初级',
            LanguageIntermediate: '中等',
            LanguageFluent: '精通',
            LanguageNative: '母语',

            // Profile Work Experience
            jobTypeFullTime      : '全职',
            jobTypePartTime      : '兼职',
            jobTypeIntern        : '实习',


            jobIndustryComputer      : '计算机/互联网/通信/电子',
            jobIndustryFinance       : '会计/金融/银行/保险',
            jobIndustryManufacturing : '贸易/消费/制造/营运',
            jobIndustryBiotechnology : '制药/医疗',
            jobIndustryAdvertising   : '广告/媒体',
            jobIndustryConstruction  : '房地产/建筑',
            jobIndustryEducation     : '专业服务/教育/培训',
            jobIndustryService       : '服务业',
            jobIndustryTransport     : '物流/运输',
            jobIndustryEnergy        : '能源/原材料',
            jobIndustryOthers        : '政府/非赢利机构/其他',




            //Profile Page
            //Header Title
            ProfilePageHeaderTitle                   : "个人信息",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : '上传头像',
            ProfilePageTabBasicInfo                  : '基本信息',
            ProfilePageTabSecurityInfo               : '安全信息',
            ProfilePageTabSchoolInfo                 : '教育背景',
            ProfilePageTabTeamInfo                   : '团队信息',
            ProfilePageTabWorkInfo: '工作经历',


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
            ProfilePageCurrentLocation               : '当前所在地',
            ProfilePageEmail                         : '邮件',
            ProfilePageSchoolInfoMajor: '专业',
            ProfilePageSchoolInfoGraduationDate: '毕业日期',
            ProfilePageSchoolInfoAbroad: '是否有国外留学经历? (如果是，请填写大学，国家以及时间)',
            ProfilePageSchoolInfoAchievements: '成就',
            ProfilePageTabLanguageSkills: '外语技能',
            ProfilePageEducation:'教育经历',
            ProfilePageAddEducation:'添加教育经历',
            ProfilePageAddLanguage: '添加语言',
            ProfilePageSecurityInfoCurrentPassword   : '原始密码',
            ProfilePageSecurityInfoNewPassword       : '新密码',
            ProfilePageSecurityInfoReTypeNewPassword : '再输入新密码',
            ProfilePageSchoolInfoCollege             : '大学',
            ProfilePageSchoolInfoEnterDate           : '入学时间',
            ProfilePageSchoolInfoDegree              : '学历',
            ProfilePageTeamInfoTeamName              : '战队名称',
            ProfilePageTeamInfoMember                : '队员',
            ProfilePageTeamInfoNewMember             : '新队员',
            ProfileContactInfoMobilePhone             : '手机',
            ProfileContactInfoMobilePhoneVerify       : '验证手机',
            ProfileContactInfoMobilePhoneVerifySend   : '免费获取验证码',
            ProfileContactInfoMobilePhoneVerifyReSend : '重新发送验证码',
            ProfileContactInfoMobileVerified          : '已验证',
            ProfileContactInfoMobileUnverified        : '未验证',
            ProfileContactInfoMobileVerifiedButton    : '点击验证',

            //Error Tips for Validation
            ProfilePagePasswordError                      : '请输入密码 6-20个字符',
            ProfilePageNewPasswordError                   : '请输入新密码 6-20个字符',
            ProfilePageTwoPasswordSameError               : '新密码不能与老密码相同',
            ProfilePageConfirmPasswordError               : '请再次输入新密码',
            ProfilePageTwoPasswordsNotConsistent          : '两次密码不一致',
            ProfilePageDateFormatError                    : '日期格式错误',
            ProfilePageTeamNameRequiredError              : '请输入正确的战队名称',
            ProfilePageNewMemberNameError                 : '请输入正确的用户名',
            ProfilePageInvalidQQ                          : '无效的QQ号码',
            ProfilePageInvalidMobilePhoneNumber           : '无效的手机号码',
            ProfilePageInvalidMobilePhoneNumberVerifyCode : '验证码错误',


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
            CampaignListPageBusinessSimulationMatch : '商战模拟大赛',



            //Register Page
            //Register Form
            RegisterPageRegisterLabel             : '注册',
            RegisterPageUsernamePlaceholder       : '用户名',
            RegisterPageEmailPlaceholder          : '邮箱',
            RegisterPagePasswordPlaceholder       : '密码',
            RegisterPageReTypePasswordPlaceholder : '再次输入密码',
            RegisterPageCaptchaPlaceholder        : '验证码',
            RegisterPageMaleLabel                 : '男',
            RegisterPageFemale                    : '女',
            RegisterPageRegisterButton            : '注  册',
            //Error Tips for Validation
            RegisterPageInputNameTip              : '请输入正确的用户名！',
            RegisterPageNameLengthTip             : '用户名长度为6-20个字符',
            RegisterPageNameExistTip              : '用户名已经存在！',
            RegisterPageInputEmailTip             : "请输入正确的邮箱",
            RegisterPageEmailExistTip             : "邮箱已经存在",
            RegisterPageInputPasswordTip          : '请输入正确的密码 6-20个字符!',
            RegisterPageReTypePasswordTip         : '请输入正确的再次输入密码!',
            RegisterPageInputCaptchaTip           : '请输入正确的验证码!',
            RegisterPageSelectGenderTip           : '请选择性别！',

            //Check Email
            RegisterPageGreet                     : '您好:',
            RegisterPageCheckEmailText1           : '感谢您注册E4E !',
            RegisterPageCheckEmailText2           : '我们发送了一封邮件到您的邮箱: ',
            RegisterPageCheckEmailText3           : '请打开您的邮箱, 点击邮件中链接即可完成注册.',
            RegisterPageCheckEmailText4           : '立即查看',

            //Introduction
            RegisterPageIntroduction1             : '什么是E4E?',
            RegisterPageIntroduction2             : '我们可以为你带来什么?',



            //Login Page
            LoginPageLoginLabel          : '登录',
            LoginPageUsernameErrorTip    : '您输入的用户名/邮箱或密码错误!',
            LoginPageUsernamePlaceholder : '用户名/邮箱',
            LoginPagePasswordPlaceholder : '密码',
            LoginPageRememberMe          : '记住密码 自动登录',
            LoginPageLoginButton         : '登  录',
            LoginPageRegisterButton      : '或注册E4E账号',
            LoginPageForgetPassword      : '忘记密码？',



            // Register Success Page
            LoginSuccessGreet: '您好:',
            LoginSuccessText1: '您已经成功激活你的',
            LoginSuccessText2: '邮箱!',
            LoginSuccessText3: '感谢您已完成注册.',
            LoginSuccessText4: '进入用户中心',



            // Page Footer
            FooterEnterpriseEntry: '企业入口',
            FooterMainPageLink: '合得教育',
            FooterGovernmentRecord: '沪ICP 13045400号',



            // Forgot Password Page
            ForgotPasswordForgotPasswordTitle: '安全中心',
            ForgotPasswordFindPassword: '找回密码',
            ForgotPasswordEnterEmail: '输入邮箱',
            ForgotPasswordResetPassword: '重设密码',
            ForgotPasswordDone: "完成",

            ForgotPasswordEnterRegisterEmail: "输入你的注册邮箱：",
            ForgotPasswordErrorTip: "邮箱不存在!",
            ForgotPasswordGreet: "您好:",
            ForgotPasswordOpenEmailText1: "我们发送了一封重置密码的邮件到您的邮箱:",
            ForgotPasswordOpenEmailText2: "请打开您的邮箱, 点击邮件中链接即可进行重置密码.",
            ForgotPasswordOpenEmailText3: "立即查看",

            ForgotPasswordNoEmailText1: "没有收到邮件？",
            ForgotPasswordNoEmailText2: "查看邮箱回收站、垃圾邮件",
            ForgotPasswordNoEmailText3: "重新发送邮件",



            // Reset Password Page
            ResetPasswordEnterPasswordText1: '请查看您',
            ResetPasswordEnterPasswordText2: '的邮箱, 并填入以下验证码',
            ResetPasswordEnterPasswordText3: "验证码不正确",
            ResetPasswordEnterPasswordText4: '长度为6个字符!',
            ResetPasswordEnterPasswordText5: '确 认',

            ResetPasswordResetNewPassword: "重置新密码:",
            ResetPasswordErrorTip: "上一步输入的验证码不正确！",
            ResetPasswordPasswordPlaceholder: "密码",
            ResetPasswordPasswordErrorTip1: '请输入正确的密码 6-20个字符!',
            ResetPasswordReEnterPasswordPlaceholder: "再次输入密码",
            ResetPasswordReEnterPasswordErrorTip: "请再次输入正确的密码！",
            ResetPasswordResetPassword: "重置密码",
            ResetPasswordGreet: '您好：',
            ResetPasswordResetSuccessTip: '重置密码成功，请返回登录.',
            ResetPasswordLoginButton: '立即登录'
        });

        // Tell the module what language to use by default
//        $translateProvider.preferredLanguage('en_US');
        $translateProvider.preferredLanguage('zh_CN');

        $translateProvider.useCookieStorage();
    }]);


})();