/**
 * Socket.io configuration
 */

'use strict';

var seminarModel = require('../api/models/marksimos/seminar');
var Token = require('../api/models/user/authenticationtoken');
var _ = require('lodash');

var logger = require('./logger.js');


// When the user disconnects.. perform this
function onDisconnect() {
    logger.log('User DISCONNECTED SocketIO');
}



// When the user connects.. perform this
function onConnect(socket) {

    // When the client emits 'debuginfo', this listens and executes
    socket.on('debugInfo', function (data) {
        console.info('[%s] %s', socket.handshake.address, JSON.stringify(data, null, 2));
    });


    // Insert sockets below
//  require('../api/thing/thing.socket').register(socket);
}




exports.init = function (socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));

    socketio.on('connection', function (socket) {
        var token = socket.handshake.query.token;
        var roomMarksimosCompany;

        Token.verifyToken(token, function(err, user) {

            if(err){
                logger.error(err);
            }else{
                seminarModel.findSeminarByUserId(user._id).then(function(seminarResult){
                    var company = _.find(seminarResult.companyAssignment, function(company) {
                        return company.studentList.indexOf(user.email) > -1;
                    });

                    roomMarksimosCompany = seminarResult.seminarId.toString() + company.companyId.toString();
                    socket.join(roomMarksimosCompany);

                }).fail(function(err){
                    logger.error(err);
                }).done();
            }

        });

        //socket.address = socket.handshake.address + ':' + socket.handshake.address.port;
        //socket.connectedAt = new Date();


        // Call onDisconnect.
        socket.on('disconnect', onDisconnect);

        logger.log('User CONNECTED SocketIO: ' + token + '. Address: ' + socket.handshake.address + '. Time: ' + socket.handshake.time);

        // Call onConnect. API routes for Socket.IO

        onConnect(socket);

    });


};



exports.emitMarksimosDecisionUpdate = function(roomName, message){
    gsocketio.to(roomName).emit('marksimosDecisionUpdate', message);
};