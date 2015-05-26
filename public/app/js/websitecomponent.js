/**
 * Created by jinwyp on 5/20/14.
 */


/**
 * recommended
 *
 * no globals are left behind
 */



(function () {
    'use strict';

    angular.module('marksimos.websitecomponent', ['marksimos.templates', 'marksimos.model', 'pascalprecht.translate', 'marksimos.translation', 'b2c.translation']);


    angular.module('marksimos.websitecomponent').directive('b2cHeader', ['$window', '$translate', '$timeout', 'Student', b2cHeaderComponent ]);
    angular.module('marksimos.websitecomponent').directive('b2cSubMenu', ['$location' ,b2cSubMenuComponent]);

    angular.module('marksimos.websitecomponent').directive('userHeader', ['$window', '$translate', 'Student', userHeaderComponent ]);
    angular.module('marksimos.websitecomponent').directive('mutiSelect', ['$window', '$translate', '$filter', mutiSelectComponent ]);

    angular.module('marksimos.websitecomponent').directive('headerAdmin', ['$window', '$translate', 'Student', adminHeaderComponent]);
    angular.module('marksimos.websitecomponent').directive('menuAdmin', [adminMenuComponent]);

    angular.module('marksimos.websitecomponent').directive('chatWindow', ['$q', chatWindowComponent]);




    function b2cSubMenuComponent($location){
        return {
            restrict   : 'AE',
            templateUrl: 'b2csubmenu.html',
            link       : function (scope, element, attrs) {
                scope.menu = [
                    {
                        title: '关于我们',
                        link : 'about'
                    },
                    {
                        title: '项目介绍',
                        link : 'intro'
                    },
                    {
                        title: '最新活动',
                        link : 'activity'
                    },
                    {
                        title: '媒体报道',
                        link : 'media'
                    },
                    {
                        title: '企业合作',
                        link : 'cooperate'
                    },
                    {
                        title: '联系我们',
                        link : 'contact'
                    }
                ];

                scope.isActive = function (route) {
                    return $location.$$absUrl.indexOf(route) >= 1;
                };
            }
        };
    }

    function b2cHeaderComponent($window, $translate, $timeout, Student){
        return {
            scope: {
                showlogin  : '=',
                currentuser   : '='
            },
            restrict: 'AE',
            templateUrl: 'b2cheader.html',

            link: function (scope, element, attrs) {

                //scope.clickHelpMenu = function(){
                //    if($window.location.href.indexOf('/marksimos/help')==-1)
                //        $window.location.href='/marksimos/help';
                //};

                scope.css = {
                    language : 'zh_CN'
                };

                scope.css.language = $translate.use();


                scope.changeLanguage = function (langKey) {
                    scope.css.language = langKey;
                    $translate.use(langKey);

                    if(!angular.isUndefined(scope.currentuser)){
                        Student.updateStudentB2CInfo({ 'websiteLanguage':langKey });
                    }
                };

                scope.newUser = {
                    username : '',
                    password : '',
                    rememberMe : false
                };

                //scope.$watch('currentuser', function(newValue, oldValue) {
                //    if ( newValue !== oldValue ) {
                //        // Only increment the counter if the value changed
                //        //scope.currentuser = newValue;
                //        console.log(scope.currentuser);
                //    }
                //
                //}, true);


                scope.clickLogin = function () {

                    if(typeof scope.newUser.username === 'undefined' || typeof scope.newUser.password === 'undefined' ){
                        return false;
                    }else {
                        if(scope.newUser.username !== '' && scope.newUser.password !== ''){

                            Student.login(scope.newUser).then(function(){

                                $window.location.href = "/e4e/profile" ;

                            }, function(err){
                                $window.location.href = "/e4e/login#!/?username=" + scope.newUser.username ;
                            });
                        }
                    }


                };

                scope.clickLogout = function () {
                    Student.logOut().then(function(data){
                        $window.location.href = "/e4e/login" ;
                    });
                };

            }
        };
    }


    function userHeaderComponent($window, $translate, Student){
        return {
            scope: {
                showmenu     : '=',
                showlogout   : '=',
                menuhome     : '&clickHome',
                menureport   : '&clickReport',
                menuscore    : '&clickScore',
                menudecision : '&clickDecision',
                currentMenu : '=',
                seminarFinished : '=',
                currentRound : '='
            },
            restrict: 'AE',
            templateUrl: 'userheader.html',
            link: function (scope, element, attrs) {

                scope.clickMenu = function(currentmenu){
                    scope.currentMenu = currentmenu;
                };

                scope.clickHelpMenu = function(){
                    if($window.location.href.indexOf('/marksimos/help')==-1)
                        $window.location.href='/marksimos/help';
                };

                scope.changeLanguage = function (langKey) {

                    $translate.use(langKey);
                    Student.updateStudentB2CInfo({ 'websiteLanguage':langKey });

                };

                scope.clickLogout = function () {
                    Student.logOut().then(function(data){
                        $window.location.href = "/marksimos/login" ;
                    });
                };

            }
        };
    }


    function mutiSelectComponent($window, $translate, $filter){
        return {
            scope: {
                selectstyle : '=',
                show        : '=',
                datasource  : '=',
                selectclick : '&',
                close : '&',
                ngModel : '=',
                selectfitler : '@'
            },
            restrict: 'AE',
            templateUrl: 'mutiselect.html',
            link: function (scope, element, attrs) {

                scope.selectLevel2 = function (level2) {
                    scope.selectclick({current:level2});
                    scope.ngModel = level2.id;
                };

            }
        };
    }



    function adminHeaderComponent($window, $translate, Student){
        return {
            scope: {
                currentuser : '='
            },
            restrict: 'AE',
            templateUrl: 'adminheader.html',
            link: function (scope, element, attrs) {
                scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                };

                scope.clickLogout = function () {
                    Student.logOut().then(function(data){

                        $window.location.href = "/marksimos/admin/" ;

                    });
                };

            }
        };
    }


    function adminMenuComponent(){
        return {
            scope: {
                currentMenu : '=',
                showtab : '=',
                currentuser : '=',
                changemenu : '&'
            },
            restrict: 'AE',
            templateUrl: 'adminmenu.html',
            link : function(scope, element){

                scope.css = {
                    menuexpand : [false, false, true, true, true, true, true, true, true, true] // menus control expand
                };

                scope.clickTab = function(tab){

                    scope.css.menuexpand[tab] = !scope.css.menuexpand[tab];
                };

                scope.clickMenu = function(currentmenu){
                    scope.currentMenu = currentmenu;
                    scope.changemenu();
                };

            }
        };
    }



    function chatWindowComponent($q) {
        return {
            restrict: 'E',
            scope: {
                me: '=username',
                seminarMessages: '=',
                companyMessages: '=',
                dictionaryMessages: '=',
                sendSeminarMessage: '&',
                sendCompanyMessage: '&',
                sendDictionaryMessage: '&',
                hideChatHeader: '='
            },
            templateUrl: 'chatwindow.html',
            link: function(scope, elem, attrs, ctrl) {
                scope.data = {
                    seminarInput: null,
                    companyInput: null,
                    dictionaryInput: null
                };
                scope.css = {
                    currentChatTab: 'seminar',
                    showChat: false,
                    newMessage: false,
                    currentTab: 'chat'
                };

                var chatWindow = elem[0];
                chatWindow.addEventListener('keydown', function(event) {
                    // todo: handle line break?

                    if (event.keyCode != 13 || event.target.tagName.toUpperCase() != 'TEXTAREA' || (!scope.data.seminarInput && !scope.data.companyInput && !scope.data.dictionaryInput) ) return;

                    var target = angular.element(event.target);
                    //var matches = target.matches || target.msMatchesSelector;
                    //matches = matches.bind(target);

                    if (target.hasClass('seminar')) {
                        $q.when(scope.sendSeminarMessage({messageInput: scope.data.seminarInput})).then(function() {
                            console.log(scope.data.seminarInput);
                            scope.data.seminarInput = '';
                        });
                    } else if(target.hasClass('company')) {
                        $q.when(scope.sendCompanyMessage({messageInput: scope.data.companyInput})).then(function() {
                            scope.data.companyInput = '';
                        });
                    } else if(target.hasClass('dictionary')) {
                        $q.when(scope.sendDictionaryMessage({messageInput: scope.data.dictionaryInput})).then(function() {
                            scope.data.dictionaryInput = '';
                        });
                    }
                });

                scope.$watchCollection('seminarMessages', scrollToBottom);
                scope.$watchCollection('companyMessages', scrollToBottom);
                scope.$watchCollection('dictionaryMessages', scrollToBottom);

                function scrollToBottom() {
                    if (scope.seminarMessages.length || (scope.companyMessages && scope.companyMessages.length)) {
                        scope.css.newMessage = true;
                    }

                    scope.$$postDigest(function() {
                        if (!scope.css.showChat) return;
                        var messagesWindow = chatWindow.querySelector('.messages');
                        messagesWindow.scrollTop = messagesWindow.scrollHeight;
                    });
                }

                scope.clickToggleWindow = function(tab) {
                    if (tab) scope.css.currentTab = tab;
                    scope.css.showChat = !scope.css.showChat;
                    scope.css.newMessage = false;
                };
            }
        };
    }
























    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusSku', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompanystatussku.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompanystatusbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusGlobal', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompanystatusglobal.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportFinancialReportBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportfinancialreportbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportFinancialReportAllBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportfinancialreportallbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionSku', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportprofitabilityevolutionsku.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportprofitabilityevolutionbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionGlobal', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportprofitabilityevolutionglobal.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompetitorIntelligence', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompetitorintelligence.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }else if (scope.unit === "%"){
                    scope.plus = 1;
                }

                scope.display = 'line';

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportSegmentDistribution', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '=',
                showAllSegments : '=allsegments'
            },
            restrict: 'AE',
            templateUrl: 'tablereportsegmentdistribution.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }else if (scope.unit === "%"){
                    scope.plus = 1;
                }

                attrs.$observe('showAllSegments', function(value){
                    if (angular.isUndefined(value)) {
                        value = false;
                    }
                });

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsSku', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarkettrendssku.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsBrand', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarkettrendsbrand.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }
            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsGlobal', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarkettrendsglobal.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketIndicator', [ function() {
        return {
            scope: {
                data : '=',
                unit : '@'
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarketindicator.html',
            link: function (scope, element, attrs) {

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }

            }
        };
    }]);


    angular.module('marksimos.websitecomponent').directive('tableReportFinalScore', [function() {
        return {
            scope: {
                data: '=',
                showScaled:'='
            },

            restrict: 'AEC',
            templateUrl: 'tablereportfinalscore.html',
            link: function(scope, element, attrs) {

                if (scope.data && scope.data.length) {
                    scope.selectedIndex = scope.data.length - 1;
                }

                attrs.$observe('showScaled', function(value){
                    if (value === undefined) {
                        value = true;
                    }
                });

                scope.changeIndex = function(index) {
                    scope.selectedIndex = index;
                };
            }
        }; 
    }]);







    angular.module('marksimos.websitecomponent').directive('genParseMd', ['mdParse', 'sanitize', 'pretty', 'isVisible', '$timeout',
        function (mdParse, sanitize, pretty, isVisible, $timeout) {
            // <div gen-parse-md="document"></div>
            // document是Markdown格式或一般文档字符串，解析成DOM后插入<div>
            return function (scope, element, attr) {
                scope.$watch(attr.genParseMd, function (value) {
                    if (isVisible(element)) {
                        parseDoc(value);
                    } else {
                        $timeout(function () {
                            parseDoc(value);
                        }, 500);
                    }
                });

                function parseDoc(value) {
                    if (angular.isDefined(value)) {
                        value = mdParse(value);
                        value = sanitize(value);
                        element.html(value);
                        angular.forEach(element.find('code'), function (value) {
                            value = angular.element(value);
                            if (!value.parent().is('pre')) {
                                value.addClass('prettyline');
                            }
                        });
                        element.find('pre').addClass('prettyprint'); // linenums have bug!
                        element.find('a').attr('target', function () {
                            if (this.host !== location.host) {
                                return '_blank';
                            }
                        });
                        pretty();
                    }
                }
            };
        }
    ]);


    angular.module('marksimos.websitecomponent').directive('highlightKey', function () {        
        return {
            scope: {
                key:'=highlightKey'
            }, 
            restrict: 'AE',
            compile: function (tElement, tAttrs) {
                return function (scope, tElement, tAttrs) {                  
                    scope.$watch(tAttrs, function (newValue, oldValue) {
                        if (scope.key) {
                            var keys = angular.isArray(scope.key) ? scope.key.slice() : [scope.key];
                            keys.forEach(function(key, i) {
                                // use [] to escape some meta chars, like '+!' .
                                keys[i] = '[' + key.split('').join('][') + ']';
                            });
                            keys = keys.join('|');
                            var re = new RegExp(keys, "ig");
                            replace(tElement[0], re);
                        }
                    });
                };

                function replace(node, re) {
                    var childNodes = node.childNodes,
                        textNodes = [],
                        elements = [];

                    for (var i = 0; i < childNodes.length; i++) {
                        var childNode = childNodes[i];
                        if (childNode.nodeType == 3) {
                            textNodes.push(childNode);
                        } else if (childNode.nodeType == 1) {
                            elements.push(childNode);
                        }
                    }

                    for (i = 0; i < textNodes.length; i++) {
                        var html = textNodes[i].nodeValue.replace(re, function(match) {
                            return "<span class='text-danger'>" + match + "</span>";
                        });
                        if (html != textNodes[i].nodeValue) {
                            var div = document.createElement('div');
                            div.innerHTML = html;
                            node.replaceChild(div, textNodes[i]);
                            div.outerHTML = div.innerHTML;
                        }
                    }

                    for (i = 0; i < elements; i++) replace(elements[i], re);
                }
            }
        };
    });

    angular.module('marksimos.websitecomponent').directive('circleProgressBar', ['$compile', function($compile) {
        // http://spencermortensen.com/articles/bezier-circle/
        var factor = 0.5519;

        var xmlns = 'http://www.w3.org/2000/svg';

        /**
         *  To fill a target square(L * L) with the circle, confirm the constraint: L = 2r + s.
         *  Ex.: Given 200 * 200 svg, stroke width is 10, then r = (L - s)/2 = 95, and cx(cy) = 100,
         *  so call getCirclePath(100, 100, 95)
         */
        function getCirclePath(cx, cy, r) {
            var d = factor * r;
            return  'M' + point(cx, cy - r) +
                ' c' + [
                    // top
                    point(d, 0),
                    // right
                    point(r, r - d),
                    point(r, r)
                ].join(', ') +
                ' c' + [
                    point(0, d),
                    // bottom
                    point(d - r, r),
                    point(-r, r)
                ].join(', ') +
                ' c' + [
                    point(-d, 0),
                    // left
                    point(-r, d - r),
                    point(-r, -r)
                ].join(', ') +
                ' c' + [
                    point(0, -d),
                    // top
                    point(r - d, -r),
                    point(r, -r)
                ].join(', ') + 'Z';
        }

        function point(x, y) {
            return x + ' ' + y;
        }

        return {
            scope: {
                progress: '=',
                cx: '@',
                cy: '@',
                r: '@',
                strokeWidth: '@'
            },
            restrict: 'E',
            link: function(scope, elem) {
                var cx = +scope.cx,
                    cy = +scope.cy,
                    r = +scope.r,
                    w = +scope.strokeWidth,
                    perimeter = 2 * Math.PI * r; //todo: may be should use path.getTotalLength to replace it.

                if (!isFinite(cx + cy + r + w)) throw Error('cx, cy, r and stroke-width should be number');

                var svg = document.createElementNS(xmlns, 'svg'),
                    path = document.createElementNS(xmlns, 'path'),
                    width = 2 * r + w,
                    d = getCirclePath(cx, cy, r);

                svg.setAttribute('width', width);
                svg.setAttribute('height', width);

                path.setAttribute('d', getCirclePath(cx, cy, r));
                path.setAttribute('stroke-width', w);
                path.setAttribute('stroke-dasharray', perimeter);
                path.setAttribute('stroke-dashoffset', '{{(1 - progress) * ' + perimeter + '}}');
                path.setAttribute('fill', 'transparent');

                svg.appendChild(path);
                elem.append(svg);

                $compile(svg)(scope);
            }
        };
    }]);

})();




