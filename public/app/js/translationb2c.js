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

            // Education Degree
            educationDegreeSeniorHighSchool : 'Senior High School',
            educationDegreeJuniorCollege    : 'Junior College',
            educationDegreeBachelor         : 'Bachelor',
            educationDegreeMaster           : 'Master',
            educationDegreeMBA              : 'MBA',
            educationDegreeDoctor           : 'Doctor',
            educationDegreeOther            : 'Other',


            // Education Major
            educationMajorPhilosophy  : 'Philosophy',
            educationMajorEconomics   : 'Economics',
            educationMajorManagement  : 'Management',
            educationMajorLiterature  : 'Literature',
            educationMajorEngineering : 'Engineering',
            educationMajorLaw         : 'Law',
            educationMajorHistory     : 'History',
            educationMajorScience     : 'Science',
            educationMajorEducation   : 'Education',
            educationMajorMedicine    : 'Medicine',
            educationMajorAgriculture : 'Agriculture',


            educationMajorPhilosophy01  : 'Philosophy',

            educationMajorEconomics01  : 'Economics',

            educationMajorManagement01  : 'Management Science and Engineering',
            educationMajorManagement02  : 'Business Administration',
            educationMajorManagement03  : 'Administrative Management Public Management',
            educationMajorManagement04  : 'Library Science',

            educationMajorLiterature01  : 'Languages And Literature',
            educationMajorLiterature02  : 'Journalism and Communication',
            educationMajorLiterature03  : 'Arts',

            educationMajorEngineering01 : 'Electrical and Information Science',
            educationMajorEngineering02 : 'Computer Science and Technology',
            educationMajorEngineering03 : 'Mechanical Engineering',
            educationMajorEngineering04 : 'Civil Engineering/Architect',
            educationMajorEngineering05 : 'Materials Science',
            educationMajorEngineering06 : 'Apparatus and instrument',
            educationMajorEngineering07 : 'Energy Dynamics',
            educationMajorEngineering08 : 'Water Resources',
            educationMajorEngineering09 : 'Surveying',
            educationMajorEngineering10 : 'Pharmaceutical Engineering',
            educationMajorEngineering11 : 'Transportation',
            educationMajorEngineering12 : 'Shipping/Oceanicographic Engineering',
            educationMajorEngineering13 : 'Aviation and Aerospace',
            educationMajorEngineering14 : 'Light industry, Textile and Food',
            educationMajorEngineering15 : 'Weapons',
            educationMajorEngineering16 : 'Public Security Technology',
            educationMajorEngineering17 : 'Biomedical Engineering',

            educationMajorLaw01         : 'Law',

            educationMajorHistory01     : 'History',

            educationMajorScience01     : 'Mathematics',
            educationMajorScience02     : 'Physics',
            educationMajorScience03     : 'Chemistry and Chemical Engineering',
            educationMajorScience04     : 'Biological Science and Technology',
            educationMajorScience05     : 'Astronomy/Geology/Geography ',
            educationMajorScience06     : 'Mechanics',
            educationMajorScience07     : 'Electronic Information Science',
            educationMajorScience08     : 'Systems Science',
            educationMajorScience09     : 'Environmental Science and Safety',

            educationMajorEducation01   : 'Education',

            educationMajorMedicine01    : 'Medicine',
            educationMajorMedicine02    : 'Psychological Studies ',

            educationMajorAgriculture01 : 'Agriculture',


            // Society Experiences Position
            societyExperiencesPositionChairman     : 'Chairman',
            societyExperiencesPositionViceChairman : 'Vice Chairman',
            societyExperiencesPositionMinister     : 'Minister',
            societyExperiencesPositionViceMinister : 'Vice Minister',
            societyExperiencesPositionTeamLeader   : 'Team Leader',
            societyExperiencesPositionMember       : 'Member',

            // Profile Work Experience
            jobTypeFullTime      : 'Full-time',
            jobTypePartTime      : 'Par-time ',
            jobTypeIntern        : 'Intern',

            jobCompanySize20 : 'Less than 20 Employees',
            jobCompanySize50 : '20-50 Employees',
            jobCompanySize80 : '50-80 Employees',
            jobCompanySize100 : '80-100 Employees',
            jobCompanySize200 : '100-200 Employees',
            jobCompanySize500 : '200-500 Employees',
            jobCompanySize1000 : '500-1000 Employees',
            jobCompanySize2000 : '1000-2000 Employees',
            jobCompanySize5000 : '2000-5000 Employees',
            jobCompanySize10000 : 'Above 5000 Employees',


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
            jobIndustryComputer07      : 'Online Game',
            jobIndustryComputer08      : 'Electronics/Semiconductor/IC',
            jobIndustryComputer09      : 'Instrument/Industry Automation',


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

            jobIndustryBiotechnology01   : 'Pharmaceuticals/Biotechnology',
            jobIndustryBiotechnology02   : 'Medical Care/Healthcare/Public Health',
            jobIndustryBiotechnology03   : 'Medical Facilities/Equipment',

            jobIndustryAdvertising01     : 'Advertising',
            jobIndustryAdvertising02     : 'Public Relations/Marketing/Exhibitions',
            jobIndustryAdvertising03     : 'Flim & Television/Media/Arts/Communication',
            jobIndustryAdvertising04     : 'Print Media/Publishing',
            jobIndustryAdvertising05     : 'Printing/Packaging/Paper',

            jobIndustryConstruction01    : 'Real Estate Development',
            jobIndustryConstruction02    : 'Architectural Services/Building Materials/Construction',
            jobIndustryConstruction03    : 'Interior Design/Decoration',
            jobIndustryConstruction04    : 'Property Management',

            jobIndustryEducation01       : 'Agency',
            jobIndustryEducation02       : 'Professional Services (Consulting, HR, Finance/Accounting)',
            jobIndustryEducation03       : 'Outsourcing Services',
            jobIndustryEducation04       : 'Testing, Certification',
            jobIndustryEducation05       : 'Legal',
            jobIndustryEducation06       : 'Education/Training/Universities and Colleges',
            jobIndustryEducation07       : 'Science/Research',
            jobIndustryEducation08       : 'Leasing Service',

            jobIndustryCustomerService01 : 'Restaurant & Food Services',
            jobIndustryCustomerService02 : 'Hospitality/Tourism',
            jobIndustryCustomerService03 : 'Entertainment/Leisure/Sports & Fitness',
            jobIndustryCustomerService04 : 'Beauty/Health',
            jobIndustryCustomerService05 : 'Personal Care & Services',

            jobIndustryTransportation01  : 'Transportation/Logistic/Distribution',
            jobIndustryTransportation02  : 'Aerospace/Aviation/Airlines',

            jobIndustryEnergy01          : 'Oils/Chemicals/Mines/Geology',
            jobIndustryEnergy02          : 'Mining/Metallurgy',
            jobIndustryEnergy03          : 'Electricity/Utilities/Energy',
            jobIndustryEnergy04          : 'New Energy',
            jobIndustryEnergy05          : 'Raw Materials & Processing',

            jobIndustryOthers01          : 'Government/Public Service',
            jobIndustryOthers02          : 'Non-Profit Organizations',
            jobIndustryOthers03          : 'Environmental Protection',
            jobIndustryOthers04          : 'Agriculture/Forestry/Husbandry/Fishery',
            jobIndustryOthers05          : 'Conglomerates',
            jobIndustryOthers06          : 'Others',











            //profile page validation
            ProfilePageRequiredError: 'Required',

            //Header Title
            ProfilePageHeaderTitle                   : "Personal Info",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : 'Upload Picture',
            ProfilePageTabBasicInfo                  : 'Basic Details',
            ProfilePageTabSecurityInfo               : 'Security Details',
            ProfilePageTabSchoolInfo                 : 'Education Background',
            ProfilePageTabTeamInfo                   : 'Team Details',
            ProfilePageTabChangePassword: 'Change Password',
            ProfilePageTabMobilePhoneInfo: 'Mobile Phone',
            ProfilePageTabExperienceInfo: 'Work Experience',
            ProfilePageTabSocietyExperienceInfo: 'Society Experience',


            //Labels for Info Details
            ProfilePageEditButton                    : 'Update',
            ProfilePageCancelButton                  : 'Cancel',
            ProfilePageChangeButton                  : 'Change',
            ProfilePageSaveButton                    : 'Save',
            ProfilePageUploadAvatarSelectionButton   : 'Upload',
            ProfilePageUploadAvatarSelectionButtonInfo   : ' (200px * 200px)',

            ProfilePageBasicInfoName                 : 'Name',
            ProfilePageBasicInfoGender               : 'Gender',
            ProfilePageBasicInfoGenderMale           : 'Male',
            ProfilePageBasicInfoGenderFemale         : 'Female',
            ProfilePageBasicInfoBirthday             : 'Date of Birth',
            ProfilePageCurrentLocation               : 'Current Location',
            ProfilePageEmail                         : 'Email',

            ProfilePageSchoolInfoMajor: 'Major',
            ProfilePageSchoolInfoGraduationDate: 'Graduation Date',
            ProfilePageSchoolInfoAbroad: 'Did you go abroad for exchange?',
            ProfilePageSchoolInfoAbroadInfo: '(If yes, mention the University, country and time period)',
            ProfilePageSchoolInfoAchievements: 'Achievements',
            ProfilePageAchievementPlaceholder: 'Achievements(certificates, awards, achievements)',
            ProfilePageTabLanguageSkills: 'Language Skills',
            ProfilePageEducation: 'Education',
            ProfilePageLabelYes: 'Yes',
            ProfilePageLabelNo: 'No',
            ProfilePageAddEducation: 'Add Education',
            ProfilePageAddLanguage: 'Add Language',

            ProfilePageExperience: 'Experience',
            ProfilePageExperienceInfoCompany: 'Company',
            ProfilePageExperienceInfoJobType: 'Job Type',
            ProfilePageExperienceInfoIndustry: 'Industry',
            ProfilePageExperienceInfoPosition: 'Position',
            ProfilePageExperienceInfoSizeOfCompany: 'Size of Company',
            ProfilePageExperienceInfoStartDate: 'Start Date',
            ProfilePageExperienceInfoEndDate: 'End Date',
            ProfilePageExperienceInfoJobExperience: 'Job Experience',
            ProfilePageAddExperience: 'Add Experience',

            ProfilePageSocietyExperience: 'Experience',
            ProfilePageExperienceInfoSociety: 'Society',
            ProfilePageExperienceInfoSizeOfSociety: 'Size of Society',
            ProfilePageExperienceInfoSocietyExperience: 'Job Experience',
            ProfilePageAddSocietyExperience: 'Add Society Experience',

            ProfilePageSecurityInfoCurrentPassword   : 'Current Password',
            ProfilePageSecurityInfoNewPassword       : 'New Password',
            ProfilePageSecurityInfoReTypeNewPassword : 'Confirm Password',
            ProfilePageSchoolInfoCollege             : 'University',
            ProfilePageSchoolInfoEnterDate           : 'Enter Date',
            ProfilePageSchoolInfoDegree              : 'Degree',

            // team
            ProfilePageYourTitle: 'Your title',
            ProfilePageInfoTitle: 'Title',
            ProfilePageTeamInfoTeamName              : 'Team Name',
            ProfilePageTeamInfoMember                : 'Member',
            ProfilePageTeamInfoNewMember             : 'New Member',
            ProfilePageJoinedCampaigns: 'Joined campaigns',
            ProfilePageCancelEnter: 'Cancel',
            ProfilePageGoToCampaigns: 'I want to join!',
            ProfilePageJoinedNoCampaign: 'You have not joined any campaigns yet.',
            ProfilePageJoinedTeams: 'Joined teams',
            ProfilePageJoinedNoTeam: 'You have not joined any other teams yet.',
            ProfilePageYourTeam: 'Your team',
            ProfilePageTeamName: 'Team name',
            ProfilePageTeamCreator: 'Team creator',
            ProfilePageAlreadyJoinedCampaignLabel: '/ Joined campaign: ',

            ProfileContactInfoMobilePhone            : 'Mobile Phone',
            ProfileContactInfoMobilePhoneVerify      : 'Verify',
            ProfileContactInfoMobilePhoneVerifySend  : 'Get verify code for free',

            ProfileContactInfoMobilePhoneVerifyReSend : 'Resend verify code',
            ProfileContactInfoMobileVerified          : 'Verified',
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
            ProfilePageNameLengthError                    : "The length of username should be 6-20",
            ProfilePageInvalidQQ                          : 'Invalid qq account',
            ProfilePageInvalidMobilePhoneNumber           : 'Invalid mobile phone number',
            ProfilePageInvalidMobilePhoneNumberVerifyCode : 'Mobile verify code wrong',

            //Input Control Placeholder
            ProfilePageNewMemberInputPlaceholder     : 'Username/Email',

            //Tips for alerts in javascript
            ProfilePageAlertSaveSuccessful           : 'Save successful',
            ProfilePageAlertSaveFailed               : 'Save failed',
            ProfilePageAlertUserNotFound: 'This user is not exist',
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
            CampaignPageEnterCampaignHasEnteredButton : 'Cancel',
            CampaignPageEnterCampaignIntroduce        : 'Introduce',
            CampaignPageEnterCampaignCountPrefix      : 'Has Entered ',
            CampaignPageEnterCampaignCountSuffix      : ' People',
            CampaignPageEnterCampaignCountPlural      : 's',
            ProfilePageSelectButton: 'Select',

            //Labels for Enter Successful popup window
            CampaignPageEnterSuccessTip1              : 'Enter Successful！',
            CampaignPageEnterSuccessTip2              : 'Play The Game',
            //Labels for Cancel Enter Successful popup window
            CampaignPageCancelEnterSuccessTip1              : 'Canceled！',
            CampaignPageCancelEnterSuccessTip2              : '',
            //Labels for Enter Failed popup window
            CampaignPageEnterFailedTip1               : 'Tip',
            CampaignPageEnterFailedTip2               : "Please Confirm Your Team's basic info and education background",
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




            //Page Header
            PageHeaderLoginUsernameLabel : 'Username/Email',
            PageHeaderLoginPasswordLabel : 'Password',
            PageHeaderLoginButton        : 'Sign In',
            PageHeaderRememberMe         : 'RememberMe',
            PageHeaderForgetPassword     : 'ForgetPassword',
            PageHeaderLogOut             : 'Log Out',



            //Register Page Form
            RegisterPageRegisterLabel             : 'Register',
            RegisterPageUsernamePlaceholder       : 'Username',
            RegisterPageEmailPlaceholder          : 'Email',
            RegisterPageMobilePhonePlaceholder    : 'Phone number',
            RegisterPagePasswordPlaceholder       : 'Password',
            RegisterPageReTypePasswordPlaceholder : 'Re-enter password',
            RegisterPageCaptchaPlaceholder        : 'Captcha',
            RegisterPageMaleLabel                 : 'Male',
            RegisterPageFemale                    : 'Female',
            RegisterPageRegisterButton            : 'Sign Up',
            
            //Error Tips for Validation
            RegisterPageInputNameTip              : 'Please enter your username!',
            RegisterPageNameLengthTip             : "Username should be 6-20 characters",
            RegisterPageNameExistTip              : 'This username is already exist',
            RegisterPageInputEmailTip             : "Please enter your email",
            RegisterPageEmailExistTip             : "This email is already exist",
            RegisterPageInputPasswordTip          : 'Please enter your correct password, 6-20 characters!',
            RegisterPageReTypePasswordTip         : 'Please re-enter your password!',
            RegisterPageInputCaptchaTip           : 'Please enter the captcha!',
            RegisterPageSelectGenderTip           : 'Please select your gender！',

            //Check Email
            RegisterPageGreet                     : 'hi:',
            RegisterPageCheckEmailText1           : 'Thanks for registering for Bridge+!',
            RegisterPageCheckEmailText2           : 'We send an email to your email box: ',
            RegisterPageCheckEmailText3           : 'Please open your email, and click the link in the email to complete your registering.',
            RegisterPageCheckEmailText4           : 'Open immediately',

            //Introduction
            RegisterPageIntroduction1             : 'What is Bridge+?',
            RegisterPageIntroduction2             : 'What can we provide to you?',



            // Login page
            LoginPageLoginLabel          : 'Login',
            LoginPageUsernameErrorTip    : 'Your username/email or password is wrong!',
            LoginPageUsernamePlaceholder : 'Username/Email',
            LoginPagePasswordPlaceholder : 'Password',
            LoginPageRememberMe          : 'Remember me',
            LoginPageLoginButton         : 'Login',
            LoginPageRegisterButton      : 'or register an account',
            LoginPageForgetPassword      : 'Forget password?',



            // Register Success Page
            LoginSuccessGreet: 'hi:',
            LoginSuccessText1: 'You has successfully activated your',
            LoginSuccessText2: 'email!',
            LoginSuccessText3: 'Thanks for your registration.',
            LoginSuccessText4: 'Enter user center.',
            LoginSuccessText5: 'Scan the QR code on the right to join the discussion.',



            // Page Footer
            FooterEnterpriseEntry: 'Enterprise Entry',
            FooterMainPageLink: 'HCDLearning Education',
            FooterGovernmentRecord: '沪ICP 13045400号',



            // Forgot Password Page
            ForgotPasswordForgotPasswordTitle: 'Security Center',
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


            // Education Degree
            educationDegreeSeniorHighSchool : '高中',
            educationDegreeJuniorCollege    : '大专',
            educationDegreeBachelor         : '本科',
            educationDegreeMaster           : '硕士',
            educationDegreeMBA              : 'MBA',
            educationDegreeDoctor           : '博士',
            educationDegreeOther            : '其他',

            // Education Major
            educationMajorPhilosophy  : '哲学',
            educationMajorEconomics   : '经济学',
            educationMajorManagement  : '管理学',
            educationMajorLiterature  : '文学',
            educationMajorEngineering : '工学',
            educationMajorLaw         : '法学',
            educationMajorHistory     : '历史学',
            educationMajorScience     : '理学',
            educationMajorEducation   : '教育学',
            educationMajorMedicine    : '医学',
            educationMajorAgriculture : '农学',


            educationMajorPhilosophy01  : '哲学类',

            educationMajorEconomics01  : '经济学类',

            educationMajorManagement01  : '管理科学与工程类',
            educationMajorManagement02  : '工商管理类',
            educationMajorManagement03  : '行政管理、公共管理类',
            educationMajorManagement04  : '图书档案学类',

            educationMajorLiterature01  : '语言文学类',
            educationMajorLiterature02  : '新闻传播学类',
            educationMajorLiterature03  : '艺术类',

            educationMajorEngineering01 : '电气信息类',
            educationMajorEngineering02 : '计算机科学及技术类',
            educationMajorEngineering03 : '机械类',
            educationMajorEngineering04 : '土建类',
            educationMajorEngineering05 : '材料类',
            educationMajorEngineering06 : '仪器仪表类',
            educationMajorEngineering07 : '能源动力类',
            educationMajorEngineering08 : '水利类',
            educationMajorEngineering09 : '测绘类',
            educationMajorEngineering10 : '制药工程类',
            educationMajorEngineering11 : '交通运输类',
            educationMajorEngineering12 : '船舶与海洋工程类',
            educationMajorEngineering13 : '航空航天类',
            educationMajorEngineering14 : '轻工纺织食品类',
            educationMajorEngineering15 : '武器类',
            educationMajorEngineering16 : '公安技术类',
            educationMajorEngineering17 : '生物医学工程类',

            educationMajorLaw01         : '法学类',

            educationMajorHistory01     : '历史学类',

            educationMajorScience01     : '数学类',
            educationMajorScience02     : '物理学类',
            educationMajorScience03     : '化学类及化学工程类',
            educationMajorScience04     : '生物科学及生物技术类',
            educationMajorScience05     : '天文地质地理类',
            educationMajorScience06     : '力学类',
            educationMajorScience07     : '电子信息科学类',
            educationMajorScience08     : '系统科学类',
            educationMajorScience09     : '环境科学与安全类',

            educationMajorEducation01   : '教育学类',

            educationMajorMedicine01    : '医学类',
            educationMajorMedicine02    : '心理学类',

            educationMajorAgriculture01 : '农业类',



            // Society Experiences Position
            societyExperiencesPositionChairman     : '主席',
            societyExperiencesPositionViceChairman : '副主席',
            societyExperiencesPositionMinister     : '部长',
            societyExperiencesPositionViceMinister : '副部长',
            societyExperiencesPositionTeamLeader   : '组长',
            societyExperiencesPositionMember       : '成员',



            // Profile Work Experience
            jobTypeFullTime      : '全职',
            jobTypePartTime      : '兼职',
            jobTypeIntern        : '实习',

            jobCompanySize20 : '少于20人',
            jobCompanySize50 : '20-50人',
            jobCompanySize80 : '50-80人',
            jobCompanySize100 : '80-100人',
            jobCompanySize200 : '100-200人',
            jobCompanySize500 : '200-500人',
            jobCompanySize1000 : '500-1000人',
            jobCompanySize2000 : '1000-2000人',
            jobCompanySize5000 : '2000-5000人',
            jobCompanySize10000 : '5000人以上',



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

            jobIndustryComputer01      : '计算机软件',
            jobIndustryComputer02      : '计算机硬件',
            jobIndustryComputer03      : '计算机服务(系统、数据服务、维修)',
            jobIndustryComputer04      : '通信/电信/网络设备',
            jobIndustryComputer05      : '通信/电信运营、增值服务',
            jobIndustryComputer06      : '互联网/电子商务',
            jobIndustryComputer07      : '网络游戏',
            jobIndustryComputer08      : '电子技术/半导体/集成电路',
            jobIndustryComputer09      : '仪器仪表/工业自动化',

            jobIndustryFinance01         : '会计/审计',
            jobIndustryFinance02         : '金融/投资/证券',
            jobIndustryFinance03         : '银行',
            jobIndustryFinance04         : '保险',
            jobIndustryFinance05         : '信托/担保/拍卖/典当',

            jobIndustryManufacturing01   : '贸易/进出口',
            jobIndustryManufacturing02   : '批发/零售',
            jobIndustryManufacturing03   : '快速消费品(食品、饮料、化妆品)',
            jobIndustryManufacturing04   : '服装/纺织/皮革',
            jobIndustryManufacturing05   : '家具/家电/玩具/礼品',
            jobIndustryManufacturing06   : '奢侈品/收藏品/工艺品/珠宝',
            jobIndustryManufacturing07   : '办公用品及设备',
            jobIndustryManufacturing08   : '机械/设备/重工',
            jobIndustryManufacturing09   : '汽车及零配件',

            jobIndustryBiotechnology01   : '制药/生物工程',
            jobIndustryBiotechnology02   : '医疗/护理/卫生',
            jobIndustryBiotechnology03   : '医疗设备/器械',

            jobIndustryAdvertising01     : '广告',
            jobIndustryAdvertising02     : '公关/市场推广/会展',
            jobIndustryAdvertising03     : '影视/媒体/艺术/文化传播',
            jobIndustryAdvertising04     : '文字媒体/出版',
            jobIndustryAdvertising05     : '印刷/包装/造纸',

            jobIndustryConstruction01    : '房地产开发',
            jobIndustryConstruction02    : '建筑/建材/工程',
            jobIndustryConstruction03    : '家居/室内设计/装潢',
            jobIndustryConstruction04    : '物业管理/商业中心',

            jobIndustryEducation01       : '中介服务',
            jobIndustryEducation02       : '专业服务(咨询、人力资源、财会)',
            jobIndustryEducation03       : '外包服务',
            jobIndustryEducation04       : '检测，认证',
            jobIndustryEducation05       : '法律',
            jobIndustryEducation06       : '教育/培训/院校',
            jobIndustryEducation07       : '学术/科研',
            jobIndustryEducation08       : '租赁服务',

            jobIndustryCustomerService01 : '餐饮业',
            jobIndustryCustomerService02 : '酒店/旅游',
            jobIndustryCustomerService03 : '娱乐/休闲/体育',
            jobIndustryCustomerService04 : '美容/保健',
            jobIndustryCustomerService05 : '生活服务',

            jobIndustryTransportation01  : '交通/运输/物流',
            jobIndustryTransportation02  : '航天/航空',

            jobIndustryEnergy01          : '石油/化工/矿产/地质',
            jobIndustryEnergy02          : '采掘业/冶炼',
            jobIndustryEnergy03          : '电气/电力/水利',
            jobIndustryEnergy04          : '新能源',
            jobIndustryEnergy05          : '原材料和加工',

            jobIndustryOthers01          : '政府/公共事业',
            jobIndustryOthers02          : '非盈利机构',
            jobIndustryOthers03          : '环保',
            jobIndustryOthers04          : '农/林/牧/渔',
            jobIndustryOthers05          : '多元化业务集团公司',
            jobIndustryOthers06          : '其他行业',






            //Profile Page
            //validation Error Tip
            ProfilePageRequiredError: '必填',


            //Header Title
            ProfilePageHeaderTitle                   : "个人信息",

            //Labels for Navigator
            ProfilePageTabUploadAvatar               : '上传头像',
            ProfilePageTabBasicInfo                  : '基本信息',
            ProfilePageTabSecurityInfo               : '安全信息',
            ProfilePageTabSchoolInfo                 : '教育背景',
            ProfilePageTabTeamInfo                   : '团队信息',
            ProfilePageTabChangePassword: '修改密码',
            ProfilePageTabMobilePhoneInfo: '手机',
            ProfilePageTabExperienceInfo: '工作经历',
            ProfilePageTabSocietyExperienceInfo: '社团经历',


            //Labels for Info Details
            ProfilePageEditButton                    : '编辑',
            ProfilePageCancelButton                  : '取消',
            ProfilePageChangeButton                  : '修改',
            ProfilePageSaveButton                    : '保存',
            ProfilePageUploadAvatarSelectionButton   : '上传图片',
            ProfilePageUploadAvatarSelectionButtonInfo   : ' (200px * 200px)',
            ProfilePageSelectButton: '选择',

            ProfilePageBasicInfoName                 : '姓名',
            ProfilePageBasicInfoGender               : '性别',
            ProfilePageBasicInfoGenderMale           : '男',
            ProfilePageBasicInfoGenderFemale         : '女',
            ProfilePageBasicInfoBirthday             : '生日',
            ProfilePageCurrentLocation               : '当前所在地',
            ProfilePageEmail                         : '邮件',
            ProfilePageSchoolInfoMajor: '专业',
            ProfilePageSchoolInfoGraduationDate: '毕业日期',
            ProfilePageSchoolInfoAbroad: '是否有国外留学经历?',
            ProfilePageSchoolInfoAbroadInfo: '(如果是，请填写大学，国家以及时间)',
            ProfilePageSchoolInfoAchievements: '成就',
            ProfilePageAchievementPlaceholder: '成就（证书、获奖情况、项目成就）',
            ProfilePageTabLanguageSkills: '外语技能',
            ProfilePageEducation:'教育经历',
            ProfilePageLabelYes: '是',
            ProfilePageLabelNo: '否',
            ProfilePageAddEducation:'添加教育经历',
            ProfilePageAddLanguage: '添加语言',

            ProfilePageExperience: '工作经验',
            ProfilePageExperienceInfoCompany: '公司',
            ProfilePageExperienceInfoJobType: '工作类型',
            ProfilePageExperienceInfoIndustry: '行业',
            ProfilePageExperienceInfoPosition: '职位',
            ProfilePageExperienceInfoSizeOfCompany: '公司规模',
            ProfilePageExperienceInfoStartDate: '开始日期',
            ProfilePageExperienceInfoEndDate: '结束日期',
            ProfilePageExperienceInfoJobExperience: '经历介绍',
            ProfilePageAddExperience: '添加新的工作经验',

            ProfilePageSocietyExperience: '社团经验',
            ProfilePageExperienceInfoSociety: '社团',
            ProfilePageExperienceInfoSizeOfSociety: '社团规模',
            ProfilePageExperienceInfoSocietyExperience: '社团经验',
            ProfilePageAddSocietyExperience: '添加新的社团经验',

            ProfilePageSecurityInfoCurrentPassword   : '原始密码',
            ProfilePageSecurityInfoNewPassword       : '新密码',
            ProfilePageSecurityInfoReTypeNewPassword : '再输入新密码',
            ProfilePageSchoolInfoCollege             : '大学',
            ProfilePageSchoolInfoEnterDate           : '入学时间',
            ProfilePageSchoolInfoDegree              : '学历',

            //Team
            ProfilePageYourTitle: '您的职位',
            ProfilePageInfoTitle: '职位',
            ProfilePageTeamInfoTeamName              : '战队名称',
            ProfilePageTeamInfoMember                : '队员',
            ProfilePageTeamInfoNewMember             : '新队员',
            ProfilePageJoinedCampaigns: '已报名的活动',
            ProfilePageCancelEnter: '取消报名',
            ProfilePageGoToCampaigns: '我要报名',
            ProfilePageJoinedNoCampaign: '您尚未加入任何活动',
            ProfilePageJoinedTeams: '您已加入的团队',
            ProfilePageJoinedNoTeam: '您尚未加入其他团队',
            ProfilePageYourTeam: '您的团队',
            ProfilePageTeamName: '团队名称',
            ProfilePageTeamCreator: '团队创建者',
            ProfilePageAlreadyJoinedCampaignLabel: '/ 已加入活动：',



            //Mobile Phone
            ProfileContactInfoMobilePhone             : '手机',
            ProfileContactInfoMobilePhoneVerify       : '验证手机',
            ProfileContactInfoMobilePhoneVerifySend   : '免费获取验证码',
            ProfileContactInfoMobilePhoneVerifyReSend : '重新发送验证码',
            ProfileContactInfoMobileVerified          : '已验证',
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
            ProfilePageNameLengthError                    : "用户名长度应在6-20之间",
            ProfilePageInvalidQQ                          : '无效的QQ号码',
            ProfilePageInvalidMobilePhoneNumber           : '无效的手机号码',
            ProfilePageInvalidMobilePhoneNumberVerifyCode : '验证码错误',


            //Placeholder for Input Control
            ProfilePageNewMemberInputPlaceholder     : '用户名/邮箱',

            //Tips for alerts in javascript
            ProfilePageAlertSaveSuccessful           : '保存成功',
            ProfilePageAlertSaveFailed               : '保存失败',
            ProfilePageAlertUserNotFound: '该用户不存在',
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
            CampaignPageEnterCampaignHasEnteredButton : '取消报名',
            CampaignPageEnterCampaignIntroduce        : '游戏介绍',
            CampaignPageEnterCampaignCountPrefix      : '已有',
            CampaignPageEnterCampaignCountSuffix      : '人参加',
            CampaignPageEnterCampaignCountPlural      : '',
            //Labels for Enter Successful popup window
            CampaignPageEnterSuccessTip1              : '报名成功！',
            CampaignPageEnterSuccessTip2              : '快来体验游戏吧',
            //Labels for Enter Successful popup window
            CampaignPageCancelEnterSuccessTip1              : '取消成功！',
            CampaignPageCancelEnterSuccessTip2              : '',
            //Labels for Enter Failed popup window
            CampaignPageEnterFailedTip1               : '温馨提示',
            CampaignPageEnterFailedTip2               : '请完善不少于5个组员的基本信息和教育背景',
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



            //Page Header
            PageHeaderLoginUsernameLabel : '用户名/邮箱',
            PageHeaderLoginPasswordLabel : '密码',
            PageHeaderLoginButton        : '登录',
            PageHeaderRememberMe         : '下次自动登录',
            PageHeaderForgetPassword     : '忘记密码',
            PageHeaderLogOut             : '退出登录',



            //Register Page Form
            RegisterPageRegisterLabel             : '注册',
            RegisterPageUsernamePlaceholder       : '用户名',
            RegisterPageEmailPlaceholder          : '邮箱',
            RegisterPageMobilePhonePlaceholder    : '手机号',
            RegisterPagePasswordPlaceholder       : '密码',
            RegisterPageReTypePasswordPlaceholder : '再次输入密码',
            RegisterPageCaptchaPlaceholder        : '验证码',
            RegisterPageMaleLabel                 : '男',
            RegisterPageFemale                    : '女',
            RegisterPageRegisterButton            : '立即注册',

            //Error Tips for Validation
            RegisterPageInputNameTip              : '请输入正确的用户名',
            RegisterPageNameLengthTip             : '用户名长度为6-20个字符',
            RegisterPageNameExistTip              : '用户名已经存在！',
            RegisterPageInputEmailTip             : "请输入正确的邮箱",
            RegisterPageEmailExistTip             : "邮箱已经存在",
            RegisterPageInputPasswordTip          : '密码长度 6-20个字符',
            RegisterPageReTypePasswordTip         : '请再次输入密码',
            RegisterPageInputCaptchaTip           : '请输入正确的验证码',
            RegisterPageSelectGenderTip           : '请选择性别！',

            //Check Email
            RegisterPageGreet                     : '您好:',
            RegisterPageCheckEmailText1           : '感谢您注册Bridge+ !',
            RegisterPageCheckEmailText2           : '我们发送了一封邮件到您的邮箱: ',
            RegisterPageCheckEmailText3           : '请打开您的邮箱, 点击邮件中链接即可完成注册.',
            RegisterPageCheckEmailText4           : '立即查看',

            //Introduction
            RegisterPageIntroduction1             : '什么是Bridge+?',
            RegisterPageIntroduction2             : '我们可以为你带来什么?',



            //Login Page
            LoginPageLoginLabel          : '登录',
            LoginPageUsernameErrorTip    : '您输入的用户名/邮箱或密码错误!',
            LoginPageUsernamePlaceholder : '用户名/邮箱',
            LoginPagePasswordPlaceholder : '密码',
            LoginPageRememberMe          : '记住密码 自动登录',
            LoginPageLoginButton         : '登  录',
            LoginPageRegisterButton      : '或注册账号',
            LoginPageForgetPassword      : '忘记密码？',



            // Register Success Page
            LoginSuccessGreet: '您好:',
            LoginSuccessText1: '您已经成功激活',
            LoginSuccessText2: '邮箱!',
            LoginSuccessText3: '感谢您已完成注册. 请完善个人及团队信息完成比赛报名.',
            LoginSuccessText4: '进入用户中心',
            LoginSuccessText5: '您可以扫描右边的微信群二维码寻找队友或提出您的问题.',



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