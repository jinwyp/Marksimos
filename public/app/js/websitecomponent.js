/**
 * Created by jinwyp on 5/20/14.
 */


var app = angular.module('marksimos.component', []);

app.directive('headerUser', function() {
    return {
        scope: {
            login : '='
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/headeruser.html'
    };
});


