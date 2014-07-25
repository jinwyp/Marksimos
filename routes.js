var userModel = require('./api/models/user.js');
var logger = require('./common/logger.js');
var authMiddleware = require('./middleware/auth.js');

module.exports = function(app){

    /**********   Routes for User/Student   **********/

     app.get('/', function(req, res, next){
        res.render('user/userlogin.ejs', { title : 'MarkSimos - Welcome to the MarkSimos Game'});
    });
     
    app.get('/login', function(req, res, next){
        res.render('user/userlogin.ejs', { title : 'MarkSimos - User Sign In'});
    });

    app.get('/introduction', authMiddleware.needLogin, function(req, res, next){
        res.render('user/userintroduction.ejs', { title : 'MarkSimos - Introduction Videos'});
    });

    // authMiddleware.needLogin,
    app.get('/home', authMiddleware.needLogin, function(req, res, next){
        res.render('user/userhome.ejs', { title : 'MarkSimos - User Home'});
    });

    // app.get('/activate', function(req, res, next){
    //     var email = req.query.email;
    //     var token = req.query.token;

    //     if(!email){
    //         return res.send(400, {message: 'email is required.'})
    //     }

    //     if(!token){
    //         return res.send(400, {message: 'token is required.'})
    //     }

    //     userModel.findByEmailAndToken(email, token)
    //         .then(function(result){
    //             if(result){
    //                 return userModel.updateByEmail(email, {
    //                     isActivated: true
    //                 })
    //                     .then(function(numAffected){
    //                         if(numAffected === 1){
    //                             return res.redirect('/login');
    //                         }
    //                         throw new Error('more or less than 1 record is updated. it should be only one.')
    //                     });
    //             }else{
    //                 throw new Error('User does not exist.');
    //             }
    //         })
    //         .fail(function(err){
    //             logger.error(err);
    //             res.send(500, {message: 'activate failed.'})
    //         })
    //         .done();
    // });




    /**********   Routes for Administrator   **********/



    app.get('/admin', function(req, res, next){
        res.render('admin/adminlogin.ejs', {title : 'Admin | Log in'});
    });

    app.get('/adminhome', authMiddleware.adminNeedLogin, function(req, res, next){
        res.render('admin/adminhome.ejs', {title : 'Admin | Dashboard'});
    });
};