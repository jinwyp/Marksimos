var userModel = require('./api/models/user.js');
var logger = require('./common/logger.js');
var authMiddleware = require('./middleware/auth.js');




module.exports = function(app){


    /**********   Routes for HCD Learning Website   **********/


    /**********   Routes for E4E Website   **********/

    app.get('/e4e', function(req, res, next){
        res.send(200, {message: 'E4E website'});
    });

    /**********   Routes for MarkSimos User/Student   **********/

    app.get('/marksimos', authMiddleware.needLogin, function(req, res, next){
        res.redirect('/marksimos/intro');
    });

    app.get('/marksimos/login', function(req, res, next){
        res.render('user/userlogin.ejs', { title : 'MarkSimos - Sign In'});
    });

    app.get('/marksimos/intro', authMiddleware.needLogin, function(req, res, next){
        res.render('user/userintroduction.ejs', { title : 'MarkSimos - Introduction Videos'});
    });

    // authMiddleware.needLogin,
    app.get('/marksimos/home', authMiddleware.needLogin, function(req, res, next){
        res.render('user/userhome.ejs', { title : 'MarkSimos - User Home'});
    });



    app.get('/marksimos/help', function(req, res, next){
        res.render('user/userhelp.ejs', { title : 'MarkSimos - Help'});
    });

    //download file
    app.get('/marksimos/download/manual', function(req, res, next){
        res.download('./public/app/file/MarkSimos_Participants_Manual.pdf');
    });

    app.get('/marksimos/manual/zh_CN',function(req,res,next){
        res.render('user/help/manual_cn.md',{layout:false});
    });
    app.get('/marksimos/manual/en_US',function(req,res,next){
        res.render('user/help/manual_en.md',{layout:false});
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



    app.get('/marksimos/admin', function(req, res, next){
        res.render('admin/adminlogin.ejs', {title : 'Admin | Log in'});
    });

    app.get('/marksimos/adminhome', authMiddleware.adminNeedLogin, function(req, res, next){
        res.render('admin/adminhome.ejs', {title : 'Admin | Dashboard'});
    });
};