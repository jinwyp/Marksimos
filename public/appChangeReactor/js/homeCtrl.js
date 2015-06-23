var changeReactorApp = angular.module('changeReactorApp', ['ngSanitize', 'com.2fdevs.videogular']);

changeReactorApp.controller('homeCtrl', [
    '$scope',
    '$location',
    '$rootScope',
    '$log',
    '$http',
    '$window',
    '$sce',
    function($scope, $location, $rootScope, $log, $http, $window, $sce) {
        this.config = {
            preload: "none",
            sources: [{
                src: $sce.trustAsResourceUrl("/appchangeReactor/video/CHANGERECTOER.mp4"),
                type: "video/mp4"
            }, {
                src: $sce.trustAsResourceUrl("/appchangeReactor/video/CHANGERECTOER.webm"),
                type: "video/webm"
            }],
            tracks: [{
                src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                kind: "subtitles",
                srclang: "en",
                label: "English",
                default: ""
            }],
            theme: {
                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            }
        };

        this.css = {
            home: true,
            features: false,
            help: false,
            contract: false
        }

        this.clickBar = function(name) {
            this.css.home = false;
            this.css.features = false;
            this.css.help = false;
            this.css.contract = false;

            switch (name) {
                case 'home':
                    this.css.home = true;
                    break;
                case 'features':
                    this.css.features = true;
                    break;
                case 'help':
                    this.css.help = true;
                    break;
                case 'contract':
                    this.css.contract = true;
                    break;
                default:
                    this.css.home = true;
                    break;
            }

        }

    }
])