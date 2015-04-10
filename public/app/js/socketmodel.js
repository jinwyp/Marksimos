(function () {
    'use strict';

    angular.module('marksimos.socketmodel', ['btford.socket-io', 'LocalStorageModule']);

    angular.module('marksimos.socketmodel').factory('socket', function (socketFactory, localStorageService) {
        var socket = null;

        var setup = function() {
            var token = localStorageService.get('logintoken');
            var ioSocket = io.connect('', {
//              'force new connection': true,
//              'max reconnection attempts': Infinity,
//              'reconnection limit': 10 * 1000
                // Send auth token on connection, you will need to DI the Auth service above
                'query': 'token=' + token
            });

            socket = socketFactory({
                ioSocket: ioSocket
            });
        };

        var close = function() {
            if (socket !== null){
                socket.removeAllListeners();
                socket.disconnect();
                socket = null;
            }
        };

        setup();
        //socket.emit('debugInfo', { my: 'data' });

        return {
            socket: socket
        };
    });


})();