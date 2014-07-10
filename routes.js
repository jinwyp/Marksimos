var userModel = require('./api/models/user.js');
var logger = require('./logger.js');
var authMiddleware = require('./middleware/auth.js');

module.exports = function(app){
     app.get('/', function(req, res, next){
        res.render('login.ejs', { title : 'MarkSimos - Welcome to the MarkSimos Game'});
    });
     
    app.get('/login', function(req, res, next){
        res.render('login.ejs', { title : 'MarkSimos - User Sign In'});
    });

    app.get('/introduction', function(req, res, next){
        res.render('userintroduction.ejs', { title : 'MarkSimos - Introduction Videos'});
    });

    app.get('/mainhome', authMiddleware.needLogin, function(req, res, next){
        res.render('usermainhome.ejs', { title : 'MarkSimos - User Home'});
    });

    app.get('/admin', authMiddleware.needLogin, function(req, res, next){
        res.render('adminhome.ejs', {});
    });

    app.get('/activate', function(req, res, next){
        var email = req.query.email;
        var token = req.query.token;

        if(!email){
            return res.send(400, {message: 'email is required.'})
        }

        if(!token){
            return res.send(400, {message: 'token is required.'})
        }

        userModel.findByEmailAndToken(email, token)
        .then(function(result){
            if(result){
                return userModel.updateByEmail(email, {
                    isActive: true
                })
                .then(function(numAffected){
                    if(numAffected === 1){
                        return res.redirect('/login');
                    }
                    throw new Error('more or less than 1 record is updated. it should be only one.')
                });
            }else{
                throw new Error('User does not exist.');
            }
        })
        .fail(function(err){
            logger.error(err);
            res.send(500, {message: 'activate failed.'})
        })
        .done();
    })
};