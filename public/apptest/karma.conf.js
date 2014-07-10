// karma.conf.js

module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'libs/angular/angular.js',
//            'libs/angular-route/angular-route.js',
            'libs/angular-mocks/angular-mocks.js',
            'libs/angular-charts/dist/angular-charts.js',
            'libs/angular-translate/angular-translate.js',
            'libs/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
            'app/js/**/*.js',
            'apptest/unit/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },


        reporters: ["progress", "coverage"],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            "app/js/**/*.js": "coverage"
        }

    });
};