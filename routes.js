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

    app.get('/mainhome', function(req, res, next){
        res.render('usermainhome.ejs', { title : 'MarkSimos - User Home'});
    });





    app.get('/admin', function(req, res, next){
        res.render('adminhome.ejs', {});
    });
};