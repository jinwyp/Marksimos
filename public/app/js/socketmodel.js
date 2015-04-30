(function () {
    'use strict';

    angular.module('marksimos.socketmodel', ['btford.socket-io', 'LocalStorageModule']);

    angular.module('marksimos.socketmodel').factory('Socket', function (socketFactory, localStorageService) {
        var ret = {};

        ret.setup = function(seminarId) {
            var token = localStorageService.get('logintoken');
            if (token === null){
                return;
            }

            var queryString = 'token=' + token;
            if(seminarId) {
                queryString = queryString + '&seminarId=' + seminarId;
            }

            var ioSocket = io.connect('', {
//              'force new connection': true,
//              'max reconnection attempts': Infinity,
//              'reconnection limit': 10 * 1000
                // Send auth token on connection, you will need to DI the Auth service above
                'query': queryString
            });

            ret.socket = socketFactory({
                ioSocket: ioSocket
            });
        };

        ret.close = function() {
            if (ret.socket !== null){
                ret.socket.removeAllListeners();
                ret.socket.disconnect();
                ret.socket = null;
            }
        };

        //call setup in controller
        //setup();
        //socket.emit('debugInfo', { my: 'data' });

        return ret;
    });


})();